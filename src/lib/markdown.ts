/**
 * A small Markdown subset for article and legal bodies: h2/h3 with anchors, paragraphs,
 * bullet and numbered lists, bold, italic, inline code, links, pipe tables and a ::note callout.
 * No dependency, no raw HTML pass-through, so content cannot inject markup.
 */
export interface Chapter {
  readonly id: string;
  readonly text: string;
  readonly level: 2 | 3;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s: string): string {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, href: string) => {
    const safe = /^(https?:\/\/|\/|#|mailto:)/.test(href) ? href : '#';
    const ext = /^https?:\/\//.test(safe) ? ' rel="noopener noreferrer" target="_blank"' : '';
    return `<a href="${safe}"${ext}>${text}</a>`;
  });
  return out;
}

export function renderMarkdown(md: string): { html: string; chapters: Chapter[]; words: number } {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  const chapters: Chapter[] = [];
  const seen = new Map<string, number>();
  let para: string[] = [];
  let list: { kind: 'ul' | 'ol'; items: string[] } | null = null;
  let note: string[] | null = null;
  let table: string[][] | null = null;
  let words = 0;

  const flushPara = () => {
    if (para.length) {
      const text = para.join(' ');
      words += text.split(/\s+/).filter(Boolean).length;
      html.push(`<p>${inline(text)}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      html.push(`<${list.kind}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.kind}>`);
      words += list.items.join(' ').split(/\s+/).length;
      list = null;
    }
  };
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...body] = table;
      html.push(
        `<div class="table-wrap" tabindex="0" role="region" aria-label="Table, scrolls sideways on small screens"><table><thead><tr>${head!.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table></div>`,
      );
      words += table.flat().join(' ').split(/\s+/).length;
    }
    table = null;
  };
  const uniqueId = (text: string) => {
    const base = slugify(text) || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (note) {
      if (line.trim() === '::') {
        html.push(`<aside class="note">${note.map((n) => `<p>${inline(n)}</p>`).join('')}</aside>`);
        note = null;
      } else if (line.trim()) note.push(line.trim());
      continue;
    }
    if (line.trim() === '::note') {
      flushPara();
      flushList();
      note = [];
      continue;
    }
    if (/^\|.*\|\s*$/.test(line)) {
      flushPara();
      flushList();
      const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
      (table ??= []).push(cells);
      continue;
    }
    flushTable();
    const h = /^(#{2,3})\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      flushList();
      const level = h[1]!.length as 2 | 3;
      const text = h[2]!.trim();
      const id = uniqueId(text);
      chapters.push({ id, text, level });
      html.push(`<h${level} id="${id}"><a href="#${id}" class="anchor">${inline(text)}</a></h${level}>`);
      continue;
    }
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+[.)]\s+(.+)$/.exec(line);
    if (ul || ol) {
      flushPara();
      const kind = ul ? 'ul' : 'ol';
      if (!list || list.kind !== kind) {
        flushList();
        list = { kind, items: [] };
      }
      list.items.push((ul ?? ol)![1]!);
      continue;
    }
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  flushTable();
  return { html: html.join('\n'), chapters, words };
}

export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 200));
