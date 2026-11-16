import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('dist/assets', {recursive: true});
let html = await readFile('dist/index.html', 'utf8');
const urls = [...new Set([...html.matchAll(/(?:src="|url\(&quot;)(https:[^"<>]+?)(?:"|&quot;)/g)].map(m => m[1]))];
const assets = [];
for (const url of urls) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const type = response.headers.get('content-type');
  const ext = type?.includes('png') ? 'png' : type?.includes('webp') ? 'webp' : 'jpg';
  const file = `assets/${createHash('sha256').update(url).digest('hex').slice(0,12)}.${ext}`;
  await writeFile(`dist/${file}`, Buffer.from(await response.arrayBuffer()));
  html = html.replaceAll(url, file);
  assets.push({url, file});
}
const fontUrl = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
const response = await fetch(fontUrl, { headers: {'User-Agent':'Mozilla/5.0'} });
if (!response.ok) throw new Error('Font CSS failed');
let css = await response.text();
for (const url of [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))]) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Font download failed');
  const file = `${createHash('sha256').update(url).digest('hex').slice(0,12)}.${new URL(url).pathname.split('.').pop()}`;
  await writeFile(`dist/assets/${file}`, Buffer.from(await response.arrayBuffer()));
  css = css.replaceAll(url, file);
  assets.push({url, file:`assets/${file}`});
}
await writeFile('dist/assets/fonts.css', css);
html = html.replace(fontUrl, 'assets/fonts.css').replace(/\s*<link rel="preconnect"[^>]+>/g, '');
await writeFile('dist/index.html', html);
await writeFile('assets-manifest.json', JSON.stringify(assets, null, 2));
console.log(`Localized ${assets.length} assets.`);
