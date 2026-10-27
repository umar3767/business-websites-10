import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';

// Real browser captures for every brand: the home, service collection,
// three-photograph editorial story and contact/order experience.
const routes={
 '01-dental':['services.html','approach.html','contact.html'],
 '02-barbershop':['services.html','lookbook.html','booking.html'],
 '03-beauty-salon':['rituals.html','gallery.html','studio.html'],
 '04-car-detailing':['packages.html','method.html','estimate.html'],
 '05-learning-center':['courses.html','learning.html','trial.html'],
 '06-cleaning':['cleaning.html','calculator.html','request.html'],
 '07-auto-service':['services.html','process.html','request.html'],
 '08-furniture':['collection.html','materials.html','enquiry.html'],
 '09-renovation':['works.html','concepts.html','budget.html'],
 '10-flower-shop':['bouquets.html','delivery.html','basket.html']
};
mkdirSync('screenshots/premium',{recursive:true});
for(const [site,pages] of Object.entries(routes)){
 test(site+' captures four real site pages',async({page},testInfo)=>{
  const device=testInfo.project.name;
  for(const [kind,href] of [['home','index.html'],['collection',pages[0]],['story',pages[1]],['contact',pages[2]]]){
   const response=await page.goto('/'+site+'/'+href,{waitUntil:'domcontentloaded'});
   expect(response.ok()).toBeTruthy();
   await expect(page.locator('main h1')).toBeVisible();
   if(kind==='story')await expect(page.locator('.editorial-panel')).toHaveCount(3);
   await expect.poll(()=>page.locator('.hero-image').first().evaluate(img=>img.complete&&img.naturalWidth>0),{timeout:25000}).toBeTruthy();
   await page.screenshot({path:'screenshots/premium/'+site+'-'+device+'-'+kind+'.png',fullPage:true,animations:'disabled'});
  }
 });
}
