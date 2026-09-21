/**
 * Legal documents supplied as Word files (owner, 21 September 2026: Terms of Service v1.2 and
 * Privacy Policy v1.3) into content/legal as Markdown with the JSON front matter the legal hub
 * reads. The text is kept verbatim; only structure is inferred: "N. Title" lines become h2,
 * "N.N Title" lines h3, short bold lines without a full stop bold paragraphs, numbered or
 * bulleted paragraphs list items, and Word tables Markdown tables. Line breaks inside a
 * paragraph (addresses, contact lines) become separate lines.
 *
 *   pnpm legal:docx <file.docx> <slug>      e.g. pnpm legal:docx ../legal/Linkist_Terms_of_Service_v1.2.docx terms
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const META: Record<string, { title: string; summary: string }> = {
  terms: { title: 'Terms and Privacy', summary: 'One document for the Essential, Enhanced, Pro and Teams plans: the short version, key words, Part 1 the terms of use, Part 2 privacy. It replaces all earlier Linkist terms of service and privacy policies.' },
  privacy: { title: 'Privacy', summary: 'Part 2 of the Linkist Terms and Privacy on its own: what personal data Linkist collects, why, your choices, who it is shared with, how long it is kept, and your rights.' },
};

/** Reads one entry out of a zip (a .docx is a zip) without a dependency: local headers, deflate or stored. */
function zipEntry(buf: Buffer, name: string): Buffer {
  let p = 0;
  while (p + 30 <= buf.length && buf.readUInt32LE(p) === 0x04034b50) {
    const method = buf.readUInt16LE(p + 8);
    const flags = buf.readUInt16LE(p + 6);
    let csize = buf.readUInt32LE(p + 18);
    const nlen = buf.readUInt16LE(p + 26);
    const xlen = buf.readUInt16LE(p + 28);
    const fname = buf.toString('utf8', p + 30, p + 30 + nlen);
    const start = p + 30 + nlen + xlen;
    if (flags & 8) {
      // Sizes live in a data descriptor after the data; take them from the central directory instead.
      const cd = buf.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
      let q = cd;
      while (q >= 0 && q + 46 <= buf.length && buf.readUInt32LE(q) === 0x02014b50) {
        const n2 = buf.readUInt16LE(q + 28);
        const x2 = buf.readUInt16LE(q + 30);
        const c2 = buf.readUInt16LE(q + 32);
        if (buf.toString('utf8', q + 46, q + 46 + n2) === fname) {
          csize = buf.readUInt32LE(q + 20);
          break;
        }
        q += 46 + n2 + x2 + c2;
      }
    }
    const data = buf.subarray(start, start + csize);
    if (fname === name) return method === 8 ? inflateRawSync(data) : Buffer.from(data);
    p = start + csize + (flags & 8 ? 16 : 0);
  }
  throw new Error(`${name} not found in zip`);
}

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_m, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

interface Para {
  text: string;
  bold: boolean;
  list: boolean;
  lines: string[];
  /** Word's Heading1, Heading2 or Heading3 style, when the paragraph has one. */
  heading: 1 | 2 | 3 | null;
}

function paragraph(xml: string): Para {
  const runs = xml.split(/(?=<w:r[ >])/);
  const segs: { t: string; b: boolean }[] = [];
  let boldChars = 0;
  let chars = 0;
  for (const r of runs) {
    const bold = /<w:b\/>|<w:b w:val="(1|true)"/.test(r) && !/<w:b w:val="(0|false)"/.test(r);
    const parts = r.match(/<w:t[^>]*>[^<]*<\/w:t>|<w:br\/>|<w:tab\/>/g) ?? [];
    for (const part of parts) {
      if (part === '<w:br/>') segs.push({ t: '\n', b: false });
      else if (part === '<w:tab/>') segs.push({ t: ' ', b: false });
      else {
        const t = decode(part.replace(/<[^>]+>/g, ''));
        segs.push({ t, b: bold });
        chars += t.trim().length;
        if (bold) boldChars += t.trim().length;
      }
    }
  }
  const allBold = chars > 0 && boldChars / chars > 0.9;
  // Merge runs, then mark bold stretches inline unless the whole paragraph is bold (a heading or label).
  const merged: { t: string; b: boolean }[] = [];
  for (const sg of segs) {
    const last = merged[merged.length - 1];
    if (last && last.b === sg.b) last.t += sg.t;
    else merged.push({ ...sg });
  }
  const text = merged
    .map((sg) => {
      if (allBold || !sg.b || !sg.t.trim()) return sg.t;
      const lead = /^\s*/.exec(sg.t)![0];
      const trail = /\s*$/.exec(sg.t)![0];
      return `${lead}**${sg.t.trim()}**${trail}`;
    })
    .join('');
  const lines = text
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const h = /<w:pStyle w:val="Heading([123])"/.exec(xml);
  return { text: lines.join('\n'), bold: allBold, list: /<w:numPr>/.test(xml), lines, heading: h ? (Number(h[1]) as 1 | 2 | 3) : null };
}

function table(xml: string): string {
  const rows = xml.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g) ?? [];
  const cells = rows.map((r) => (r.match(/<w:tc[ >][\s\S]*?<\/w:tc>/g) ?? []).map((c) => (c.match(/<w:p[ >][\s\S]*?<\/w:p>/g) ?? []).map((p) => paragraph(p).lines.join(' ')).filter(Boolean).join(' ')));
  if (!cells.length) return '';
  const [head, ...body] = cells;
  return [`| ${head!.join(' | ')} |`, `| ${head!.map(() => '---').join(' | ')} |`, ...body.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}

function convert(docx: Buffer): { body: string; version: string; effective: string } {
  const xml = zipEntry(docx, 'word/document.xml').toString('utf8');
  const bodyXml = xml.slice(xml.indexOf('<w:body>'), xml.indexOf('</w:body>'));
  // Top-level blocks only: paragraphs outside tables, and tables.
  const blocks = bodyXml.match(/<w:tbl>[\s\S]*?<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>/g) ?? [];
  const out: string[] = [];
  let version = '';
  let effective = '';
  const months: Record<string, string> = { january: '01', february: '02', march: '03', april: '04', may: '05', june: '06', july: '07', august: '08', september: '09', october: '10', november: '11', december: '12' };
  let first = true;
  let prevList = false;
  for (const b of blocks) {
    if (b.startsWith('<w:tbl>')) {
      out.push('', table(b), '');
      prevList = false;
      continue;
    }
    const p = paragraph(b);
    if (!p.text) continue;
    if (first) {
      first = false;
      continue; // the title; the front matter carries it
    }
    const v = /^Version:?\s*([\d.]+)$/i.exec(p.text);
    if (v) {
      version = v[1]!;
      continue;
    }
    const d = /^Last updated:\s*(\d{1,2})-([A-Za-z]+)-(\d{4})$/i.exec(p.text);
    if (d) {
      effective = `${d[3]}-${months[d[2]!.toLowerCase()] ?? '01'}-${d[1]!.padStart(2, '0')}`;
      continue;
    }
    // The 2026 format keeps the line in the body: "... Version 1.0. Effective date: [07 September 2026]."
    const v2 = /\bVersion\s+(\d+(?:\.\d+)*)\./.exec(p.text);
    const d2 = /Effective date:\s*\[?(\d{1,2}) ([A-Za-z]+) (\d{4})\]?/.exec(p.text);
    if (v2 && !version) version = v2[1]!;
    if (d2 && !effective) effective = `${d2[3]}-${months[d2[2]!.toLowerCase()] ?? '01'}-${d2[1]!.padStart(2, '0')}`;
    if (p.heading) {
      // Word heading styles: parts and sections both lead the contents list (h2); sub-sections are h3.
      if (prevList) out.push('');
      out.push(`${p.heading === 3 ? '###' : '##'} ${p.text}`, '');
      prevList = false;
      continue;
    }
    if (p.list) {
      out.push(`- ${p.lines.join(' ')}`);
      prevList = true;
      continue;
    }
    if (prevList) out.push('');
    prevList = false;
    if (/^\d+\.\s+\S/.test(p.text) && p.lines.length === 1 && p.text.length < 90) {
      out.push(`## ${p.text}`, '');
      continue;
    }
    if (/^\d+\.\d+\s+\S/.test(p.text) && p.lines.length === 1 && p.text.length < 90) {
      out.push(`### ${p.text}`, '');
      continue;
    }
    if (p.bold && p.lines.length === 1 && p.text.length < 70 && !/[.:]$/.test(p.text)) {
      out.push(`**${p.text}**`, '');
      continue;
    }
    // Multi-line paragraphs (addresses, contact lines) keep their breaks; a "Label: value" line is bold-labelled.
    const lines = p.lines.map((l) => {
      const m = /^([A-Z][A-Za-z ]{2,40}(?: contact| address| email| officer| Officer)?):\s+(\S.*)$/.exec(l);
      return m && l.length < 120 ? `**${m[1]}:** ${m[2]}` : l;
    });
    out.push(lines.join('  \n'), '');
  }
  return { body: out.join('\n').replace(/\n{3,}/g, '\n\n').trim(), version, effective };
}

function main() {
  const [file, slug] = process.argv.slice(2);
  if (!file || !slug || !META[slug]) throw new Error('usage: pnpm legal:docx <file.docx> <terms|privacy>');
  const { body, version, effective } = convert(readFileSync(file));
  const today = new Date().toISOString().slice(0, 10);
  const front = { slug, ...META[slug], status: 'published', version, effective, updated: effective, supplied: `${basename(file)}, from RatioX Labs, ${today}`, imported: today };
  const outPath = join(root, 'content/legal', `${slug}.md`);
  writeFileSync(outPath, `---json\n${JSON.stringify(front, null, 2)}\n---\n\n${body}\n`);
  console.log(`  ${slug}: version ${version}, effective ${effective}, ${body.split(/\s+/).length} words -> ${outPath}`);
}

main();
