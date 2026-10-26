import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
const routes={
'01-dental':'services.html','02-barbershop':'services.html','03-beauty-salon':'rituals.html',
'04-car-detailing':'packages.html','05-learning-center':'courses.html','06-cleaning':'cleaning.html',
'07-auto-service':'services.html','08-furniture':'collection.html','09-renovation':'works.html',
'10-flower-shop':'bouquets.html'
};
mkdirSync('screenshots/premium',{recursive:true});
for(const [site,inner] of Object.entries(routes)){
 test(site+' renders full-page visual previews',async({page},testInfo)=>{
  const device=testInfo.project.name;
  for(const [kind,href] of [['home','index.html'],['collection',inner]]){
   const response=await page.goto('/'+site+'/'+href,{waitUntil:'domcontentloaded'});
   expect(response.ok()).toBeTruthy();
   await expect(page.locator('main h1')).toBeVisible();
   await page.locator('.hero-image').first().waitFor({state:'visible'});
   await expect.poll(()=>page.locator('.hero-image').first().evaluate(img=>img.complete&&img.naturalWidth>0),{timeout:25000}).toBeTruthy();
   await page.screenshot({path:'screenshots/premium/'+site+'-'+device+'-'+kind+'.png',fullPage:true,animations:'disabled'});
  }
 });
}
