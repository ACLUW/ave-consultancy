import { cp, mkdir, rm, readdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of [...(await readdir(root)).filter(file=>file.endsWith('.html')), 'styles.css', 'app.js', 'data', 'assets', '.nojekyll', 'sitemap.xml', 'robots.txt']) {
  await cp(new URL(file, root), new URL(file, output), { recursive: true });
}
console.log('Built static website in dist/');
