import { NextResponse } from 'next/server';
import { clientIp, rateLimit, readJsonObject, tooMany } from '@/lib/forms';
import { search } from '@/lib/knowledge';

/**
 * Optional Claude upgrade path for the assistant. With ANTHROPIC_API_KEY set, the help entries
 * that match the question are phrased into one short answer; the model is told to use only that
 * context. The context is retrieved here, on the server, from the same corpus the browser uses,
 * so a caller cannot supply their own (Grownz D31). Per-address rate limit, 500-character
 * questions, 16 KB bodies. Without the key the route answers 503 and the browser shows the
 * retrieved answer unchanged. Nothing is logged or stored.
 */
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const key = process.env['ANTHROPIC_API_KEY'];
  if (!key) return NextResponse.json({ error: 'assistant not configured' }, { status: 503 });
  const ip = clientIp(req);
  const rl = rateLimit(`chat:${ip}`, 20, 10 * 60 * 1000);
  if (!rl.ok) return tooMany(rl.retryAfter);
  const body = await readJsonObject(req);
  if (!body) return NextResponse.json({ error: 'bad request' }, { status: 400 });
  const question = (typeof body['question'] === 'string' ? body['question'] : '').trim().slice(0, 500);
  const context = search(question, 3).map((h) => ({ q: h.entry.q, a: h.entry.a }));
  if (!question || !context.length) return NextResponse.json({ answer: null });
  const system =
    'You are the Linkist website assistant. Answer in British English, under 90 words, plain and calm. Use ONLY the context entries given; if they do not answer the question, say you do not know and suggest the help centre or support@linkist.ai. Never invent features, prices or compliance claims. No em dashes.';
  let res: Response;
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: process.env['ANTHROPIC_MODEL']?.trim() || 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system,
        messages: [{ role: 'user', content: `Context:\n${context.map((c) => `Q: ${c.q}\nA: ${c.a}`).join('\n\n')}\n\nQuestion: ${question}` }],
      }),
    });
  } catch {
    return NextResponse.json({ answer: null }, { status: 502 });
  }
  if (!res.ok) return NextResponse.json({ answer: null }, { status: 502 });
  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  const answer = data.content?.find((c) => c.type === 'text')?.text?.trim() ?? null;
  return NextResponse.json({ answer });
}
