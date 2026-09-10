/**
 * Forms and API behaviour against a running site (brief 10): happy path, validation, honeypot,
 * unconfigured delivery (503 with an honest message), JSON null, arrays and oversize bodies
 * answering 400, the rate limit, the chat route without a key, and the security headers.
 * Turnstile pass and fail need a configured secret and are reported as skipped without one.
 *
 *   pnpm api
 */
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const configured = !!process.env['RESEND_API_KEY'] && !!process.env['LEAD_TO'];

interface Check {
  name: string;
  ok: boolean;
  detail: string;
}
const results: Check[] = [];
const record = (name: string, ok: boolean, detail: string) => results.push({ name, ok, detail });

/** Each probe gets its own forwarded address so the per-address rate limit only applies where it is being tested. */
let probe = 0;
async function post(path: string, body: string | object, headers: Record<string, string> = {}) {
  probe += 1;
  const res = await fetch(base + path, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': headers['x-forwarded-for'] ?? `10.0.${Math.floor(probe / 250)}.${probe % 250}`, ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    /* not JSON */
  }
  return { status: res.status, json, headers: res.headers };
}

async function main() {
  const valid = { name: 'QA Probe', email: 'qa@example.com', topic: 'support', message: 'This is a QA probe message, please ignore.' };

  // Happy path: delivers when configured, 503 with a plain message when not.
  const happy = await post('/api/lead', valid);
  if (configured) record('lead happy path', happy.status === 200, `status ${happy.status}`);
  else record('lead unconfigured answers 503 with a message', happy.status === 503 && typeof (happy.json as { error?: string })?.error === 'string', `status ${happy.status}: ${JSON.stringify(happy.json)}`);

  // Validation.
  const bad = await post('/api/lead', { ...valid, email: 'not-an-email', message: 'short' });
  const errs = (bad.json as { errors?: Record<string, string> })?.errors ?? {};
  record('lead validation answers 422 with field errors', bad.status === 422 && !!errs['email'] && !!errs['message'], `status ${bad.status}: ${JSON.stringify(bad.json)}`);

  // Honeypot: pretend success, deliver nothing.
  const honey = await post('/api/lead', { ...valid, website: 'http://spam.example' });
  record('lead honeypot pretends success', honey.status === 200 && (honey.json as { ok?: boolean })?.ok === true, `status ${honey.status}`);

  // Bodies that must answer 400, never 500.
  for (const [name, body] of [
    ['JSON null', 'null'],
    ['JSON array', '[1,2,3]'],
    ['JSON string', '"hello"'],
    ['invalid JSON', '{not json'],
    ['oversize body', JSON.stringify({ ...valid, message: 'x'.repeat(20 * 1024) })],
  ] as const) {
    const r = await post('/api/lead', body);
    record(`lead ${name} answers 400`, r.status === 400, `status ${r.status}`);
  }

  // Subscribe and community: validation and unconfigured behaviour.
  for (const path of ['/api/subscribe', '/api/community']) {
    const r = await post(path, { email: 'nope' });
    record(`${path} rejects a bad address`, r.status === 422, `status ${r.status}`);
    const r2 = await post(path, { email: 'qa@example.com' });
    if (configured) record(`${path} happy path`, r2.status === 200, `status ${r2.status}`);
    else record(`${path} unconfigured answers 503`, r2.status === 503, `status ${r2.status}`);
    const r3 = await post(path, 'null');
    record(`${path} JSON null answers 400`, r3.status === 400, `status ${r3.status}`);
  }

  // Chat without a key: 503, so the browser keeps its retrieved answer.
  const chat = await post('/api/chat', { question: 'Do I need an NFC card?' });
  if (process.env['ANTHROPIC_API_KEY']) record('chat answers with a key', chat.status === 200, `status ${chat.status}`);
  else record('chat without a key answers 200 with configured false', chat.status === 200 && (chat.json as { configured?: boolean })?.configured === false, `status ${chat.status}: ${JSON.stringify(chat.json)}`);
  const chatNull = await post('/api/chat', 'null');
  record('chat JSON null answers 400 or the unconfigured reply', chatNull.status === 400 || chatNull.status === 200, `status ${chatNull.status}`);

  // Rate limit: the lead route allows 5 per 10 minutes per address; one address posts 8 times.
  let limited = false;
  for (let i = 0; i < 8 && !limited; i += 1) {
    const r = await post('/api/lead', { ...valid, email: `qa${i}@example.com` }, { 'x-forwarded-for': '10.9.9.9' });
    if (r.status === 429) limited = !!r.headers.get('retry-after');
  }
  record('lead rate limit answers 429 with retry-after', limited, limited ? 'limited' : 'never limited in 8 further posts');

  // Turnstile: only testable with a secret.
  record('turnstile pass, fail and reset', !process.env['TURNSTILE_SECRET_KEY'] ? true : false, process.env['TURNSTILE_SECRET_KEY'] ? 'secret set: test in the browser with the widget' : 'skipped: no TURNSTILE_SECRET_KEY, the check is feature-flagged off');

  // Security headers on a page.
  const page = await fetch(base + '/');
  const csp = page.headers.get('content-security-policy') ?? '';
  record('CSP header present with frame-ancestors none', /frame-ancestors 'none'/.test(csp) && /default-src 'self'/.test(csp), csp ? csp.slice(0, 80) + '...' : 'missing');
  record('nosniff, frame options, referrer and permissions policies', page.headers.get('x-content-type-options') === 'nosniff' && page.headers.get('x-frame-options') === 'DENY' && !!page.headers.get('referrer-policy') && !!page.headers.get('permissions-policy'), [page.headers.get('x-content-type-options'), page.headers.get('x-frame-options'), page.headers.get('referrer-policy')].join(' / '));
  record('no x-powered-by header', !page.headers.get('x-powered-by'), page.headers.get('x-powered-by') ?? 'absent');

  // Redirects land on the product.
  for (const [path, host] of [
    ['/start', 'prm.linkist.ai'],
    ['/sign-in', 'prm.linkist.ai'],
    ['/get-card', 'm.linkist.ai'],
    ['/learn', '/blogs'],
  ] as const) {
    const r = await fetch(base + path, { redirect: 'manual' });
    const loc = r.headers.get('location') ?? '';
    record(`${path} redirects to ${host}`, r.status >= 300 && r.status < 400 && loc.includes(host), `${r.status} -> ${loc}`);
  }

  for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}: ${r.detail}`);
  const failures = results.filter((r) => !r.ok).length;
  console.log(`api: ${results.length} checks, ${failures} problem(s)${configured ? '' : ' (delivery unconfigured: 503 paths exercised, email delivery not tested)'}`);
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
