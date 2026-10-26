/* Check whether all editorial photo IDs resolve to actual images.
   Run: node tests/photography-audit.mjs. Reports network failure separately. */
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const sites=['01-dental','02-barbershop','03-beauty-salon','04-car-detailing','05-learning-center','06-cleaning','07-auto-service','08-furniture','09-renovation','10-flower-shop'];
const references=sites.flatMap(site=>{
  const content=readFileSync(path.join(site,'content/photography.js'),'utf8');
  return [...content.matchAll(/"photo-[a-z0-9-]+"/g)].map(m=>({site,id:m[0].replace(/"/g,'')}));
});
async function inspect(ref){
  const url='https://images.unsplash.com/'+ref.id+'?auto=format&fit=crop&w=60&q=30';
  let error='';
  for(let attempt=0;attempt<2;attempt++){
    try{
      const result=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(12000)});
      if(result.ok && (result.headers.get('content-type')||'').startsWith('image/')){
         return {...ref,ok:true,status:result.status};
      }
      error='HTTP '+result.status+' '+result.headers.get('content-type');
      if(result.status===404)break;
    }catch(e){error=e.message}
  }
  return {...ref,ok:false,error};
}
const results=[];
const next=[...references];
async function worker(){
 while(next.length){const item=next.shift();results.push(await inspect(item));}
}
await Promise.all(Array.from({length:8},worker));
results.sort((a,b)=>a.site.localeCompare(b.site)||a.id.localeCompare(b.id));
const summary={checked:results.length,valid:results.filter(x=>x.ok).length,invalid:results.filter(x=>!x.ok).length,results};
writeFileSync('photo-audit-results.json',JSON.stringify(summary,null,2));
for(const issue of results.filter(x=>!x.ok))console.error(issue.site,issue.id,issue.error);
console.log('Unsplash photo links:',summary.valid+'/'+summary.checked,'valid');
if(summary.invalid)process.exitCode=1;
