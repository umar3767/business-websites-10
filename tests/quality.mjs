import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=process.cwd();
const sites=["01-dental","02-barbershop","03-beauty-salon","04-car-detailing","05-learning-center","06-cleaning","07-auto-service","08-furniture","09-renovation","10-flower-shop"];
const read=file=>readFileSync(path.join(root,file),'utf8');
test('ten independent 4-page portfolios with error pages',()=>{
 assert.equal(sites.length,10);
 for(const site of sites){
  const d=read(site+'/content/site-data.js');
  const match=d.match(/"routes"\s*:\s*\[([\s\S]*?)\]/);
  assert.ok(match,site+' missing routes');
  const routes=[...match[1].matchAll(/"([^"]+\.html)"/g)].map(x=>x[1]);
  assert.equal(routes.length,3,site);
  for(const page of ['index.html',...routes,'404.html']){
   assert.ok(existsSync(path.join(root,site,page)),site+'/'+page);
  }
  assert.ok(existsSync(path.join(root,site,'assets/hero.svg')));
  assert.ok(existsSync(path.join(root,site,'assets/favicon.svg')));
 }
});
test('all site scripts are valid JavaScript',()=>{
 for(const site of sites)for(const file of ['app.js','content/site-data.js','content/photography.js']){
  const r=spawnSync(process.execPath,['--check',site+'/'+file],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,site+'/'+file+' '+r.stderr);
 }
});
test('80 unique thematic images with reliable fallback and responsive images',()=>{
 const all=[];
 for(const site of sites){
  const file=read(site+'/content/photography.js');
  const ids=[...file.matchAll(/"photo-[0-9a-z-]+"/g)].map(x=>x[0]);
  assert.equal(ids.length,8,site);
  assert.equal(new Set(ids).size,8,site);
  all.push(...ids);
  const app=read(site+'/app.js');
  assert.match(app,/import \{ photos \} from '\.\/content\/photography\.js'/);
  assert.ok(app.includes('image.srcset ='),site);
  assert.ok(app.includes("image.src = src;"),site);
  assert.ok(app.includes('src.match(/piece-(\\d+)\\.svg$/)'),site);
  assert.ok(app.includes("image.addEventListener('error'"),site);
  assert.match(app,/window\.localStorage\.getItem/);
 }
 assert.equal(new Set(all).size,80);
});
test('every site has a distinct premium theme and accessibility fallbacks',()=>{
 const signatures=new Set();
 for(const site of sites){
  const css=read(site+'/styles.css');
  assert.match(css,/PREMIUM DESIGN UPGRADE/,site);
  assert.match(css,/prefers-reduced-motion:reduce/,site);
  assert.match(css,/:focus-visible/,site);
  assert.match(css,/--paper:/,site);
  signatures.add(css.match(/--accent:(#[a-fA-F0-9]{6})/)?.[1]??'');
  assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length,site);
 }
 assert.equal(signatures.size,10);
});
test('original page routes and business demo disclosures still exist',()=>{
 for(const site of sites){
  const app=read(site+'/app.js');
  assert.match(app,/U\('demo'\)/,site);
  assert.match(app,/function contactBlock\(/,site);
  assert.match(app,/function beforeAfter\(/,site);
  assert.match(app,/function render\(/,site);
 }
});
