#!/usr/bin/env node
// build-pages.js
// Renders manifesto.md -> manifesto.html and GIZMO.md -> law.html as
// standalone pages in the site style. Run after editing either .md:
//   node tools/build-pages.js
// The site itself stays build-free; this is a repo-side tool like
// inject-gizmos.js.

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { buf.push(esc(lines[i])); i++; }
      i++;
      out.push('<pre><code>' + buf.join('\n') + '</code></pre>');
    } else if (/^#{1,3} /.test(line)) {
      const level = line.match(/^#+/)[0].length;
      out.push(`<h${level}>` + inline(line.replace(/^#+ /, '')) + `</h${level}>`);
      i++;
    } else if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) { buf.push(lines[i].replace(/^> ?/, '')); i++; }
      const paras = buf.join('\n').split(/\n\s*\n/).map(p =>
        '<p>' + inline(p.trim()).replace(/\n/g, '<br>') + '</p>');
      out.push('<blockquote>' + paras.join('') + '</blockquote>');
    } else if (/^[-*] /.test(line)) {
      const buf = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) { buf.push('<li>' + inline(lines[i].replace(/^[-*] /, '')) + '</li>'); i++; }
      out.push('<ul>' + buf.join('') + '</ul>');
    } else if (/^---+$/.test(line.trim())) {
      out.push('<hr>');
      i++;
    } else if (line.trim() === '') {
      i++;
    } else {
      const buf = [];
      while (i < lines.length && lines[i].trim() !== '' && !/^(#|>|```|[-*] |---)/.test(lines[i])) { buf.push(lines[i]); i++; }
      const text = buf.join(' ').trim();
      // a paragraph that is only a code span renders as a citation row
      if (/^`[^`]+`$/.test(text)) out.push('<p class="cite">' + inline(text) + '</p>');
      else out.push('<p>' + inline(text) + '</p>');
    }
  }
  return out.join('\n');
}

function page(title, active, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Programmable Pixels</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --ground:#F6F6F4; --ink:#111111; --grey:#8C8C88; --line:#E3E3DF;
  --font-display:"Univers Next","Univers LT Std","Univers","Helvetica Neue",Helvetica,"Inter",Arial,sans-serif;
  --font-body:"Helvetica Neue",Helvetica,"Inter",Arial,sans-serif;
  --font-mono:"IBM Plex Mono",monospace;
  --col:min(680px,100%);
}
*{ box-sizing:border-box; margin:0; padding:0; }
html{ background:var(--ground); }
body{ font-family:var(--font-body); color:var(--ink); background:var(--ground);
  min-height:100vh; display:flex; flex-direction:column; align-items:center;
  -webkit-font-smoothing:antialiased; }
header{ width:var(--col); padding:22px 20px; display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; }
.wordmark{ font-family:var(--font-display); font-size:clamp(20px,5.6vw,28px); font-weight:800; letter-spacing:-.025em; text-transform:uppercase; }
.wordmark a{ color:var(--ink); text-decoration:none; }
.tabs{ display:flex; gap:16px; }
.tabs a{ font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase;
  color:var(--ink); text-decoration:none; border-bottom:1px solid transparent; padding-bottom:2px; }
.tabs a:hover,.tabs a.on{ border-bottom-color:var(--ink); }
main{ width:var(--col); padding:10px 20px 60px; }
main h1{ font-family:var(--font-display); font-weight:800; letter-spacing:-.02em; text-transform:uppercase;
  font-size:clamp(22px,5vw,30px); margin:18px 0 14px; }
main h2{ font-family:var(--font-display); font-weight:800; letter-spacing:-.01em;
  font-size:clamp(16px,3.6vw,20px); margin:30px 0 10px; }
main h3{ font-family:var(--font-mono); font-size:12px; letter-spacing:.06em; text-transform:uppercase; margin:22px 0 8px; }
main p{ font-size:15px; line-height:1.65; margin:0 0 14px; }
main em{ font-style:italic; }
main ul{ margin:0 0 14px 20px; }
main li{ font-size:15px; line-height:1.65; margin-bottom:4px; }
main blockquote{ border-left:1px solid var(--ink); padding:2px 0 2px 18px; margin:0 0 14px; }
main blockquote p{ margin-bottom:8px; }
main blockquote p:last-child{ margin-bottom:0; }
main code{ font-family:var(--font-mono); font-size:12px; }
main pre{ border:1px solid var(--line); padding:12px 14px; overflow-x:auto; margin:0 0 14px; }
main pre code{ font-size:12px; line-height:1.55; }
main hr{ border:0; border-top:1px solid var(--line); margin:26px 0; }
main .cite{ font-family:var(--font-mono); font-size:11px; color:var(--grey); letter-spacing:.02em; margin:-6px 0 14px; }
main .cite code{ font-size:11px; color:var(--grey); }
footer{ width:var(--col); padding:20px; margin-top:auto; border-top:1px solid var(--line);
  font-family:var(--font-mono); font-size:11px; color:var(--grey); letter-spacing:.04em; }
</style>
</head>
<body>

<header>
  <div class="wordmark"><a href="index.html">Programmable Pixels</a></div>
  <nav class="tabs">
    <a href="manifesto.html"${active === 'manifesto' ? ' class="on"' : ''}>Manifesto</a>
    <a href="law.html"${active === 'law' ? ' class="on"' : ''}>GIZMO.md</a>
  </nav>
</header>

<main>
${content}
</main>

<footer>
  Programmable Pixels — one operator
</footer>

</body>
</html>
`;
}

const jobs = [
  { src: 'manifesto.md', dst: 'manifesto.html', title: 'Manifesto', active: 'manifesto' },
  { src: 'GIZMO.md', dst: 'law.html', title: 'GIZMO.md', active: 'law' },
];

for (const j of jobs) {
  const md = fs.readFileSync(path.join(ROOT, j.src), 'utf8');
  fs.writeFileSync(path.join(ROOT, j.dst), page(j.title, j.active, mdToHtml(md)));
  console.log('wrote', j.dst);
}
