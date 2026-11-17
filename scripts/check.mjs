import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),files=(await readdir(root)).filter(f=>f.endsWith('.html'));
const pages=new Map();
for(const file of files){const html=await readFile(new URL(file,root),'utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,`${file}: expected one H1`);assert(/<meta name="description"/.test(html)||file==='404.html',`${file}: missing description`);assert(!html.includes('contactEmail: \'\''),`${file}: unconfigured email`);pages.set(file,{html,ids});}
let links=0;
for(const [file,{html}] of pages){
 for(const [,kind,target] of html.matchAll(/\b(href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|tel:|data:)/.test(target))continue;
  if(target.startsWith('/')){assert(file==='404.html',`${file}: non-relative asset ${target}`);continue;}
  const [path,hash]=target.split('#');const clean=path.split('?')[0]||file;
  await access(new URL(clean,root));links++;
  if(hash&&pages.has(clean))assert(pages.get(clean).ids.includes(hash),`${file}: missing ${target}`);
 }
 if(file!=='404.html'){assert(html.includes('Skip to content'),`${file}: no skip link`);assert(html.includes('aria-controls="main-nav"'),`${file}: missing mobile menu relationship`);assert(html.includes('type="module" src="app.js"'),`${file}: missing interactive application`);}
 for(const image of html.matchAll(/<img\b([^>]+)>/g))assert(/\balt="[^"]*"/.test(image[1]),`${file}: image needs alt text`);
}
const app=await readFile(new URL('app.js',root),'utf8');assert(!/innerHTML\s*=/.test(app),'Render visitor input as text, not HTML');assert(!/fetch\(|XMLHttpRequest/.test(app),'Browser interactions should not submit data');
console.log(`Checked ${files.length} HTML pages and ${links} internal links/assets, unique IDs, image alternatives, metadata and local-only interactions.`);
