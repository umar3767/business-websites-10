import {test,expect} from '@playwright/test';
const sites={
  "01-dental": [
    "services.html",
    "approach.html",
    "contact.html"
  ],
  "02-barbershop": [
    "services.html",
    "lookbook.html",
    "booking.html"
  ],
  "03-beauty-salon": [
    "rituals.html",
    "gallery.html",
    "studio.html"
  ],
  "04-car-detailing": [
    "packages.html",
    "method.html",
    "estimate.html"
  ],
  "05-learning-center": [
    "courses.html",
    "learning.html",
    "trial.html"
  ],
  "06-cleaning": [
    "cleaning.html",
    "calculator.html",
    "request.html"
  ],
  "07-auto-service": [
    "services.html",
    "process.html",
    "request.html"
  ],
  "08-furniture": [
    "collection.html",
    "materials.html",
    "enquiry.html"
  ],
  "09-renovation": [
    "works.html",
    "concepts.html",
    "budget.html"
  ],
  "10-flower-shop": [
    "bouquets.html",
    "delivery.html",
    "basket.html"
  ]
};
for(const [site,pages] of Object.entries(sites)){
 test(site+' home loads, translates and displays photographic resources with SVG fallback',async({page})=>{
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('https://images.unsplash.com/**',route=>route.abort());
   const response=await page.goto('/'+site+'/index.html',{waitUntil:'domcontentloaded'});
   expect(response.ok()).toBeTruthy();
   await expect(page.locator('.hero-title')).toBeVisible();
   await expect(page.locator('.hero-image')).toHaveCount(1);
   await expect(page.locator('.service-card')).toHaveCount(3);
   await expect.poll(()=>page.locator('.hero-image').evaluate(el=>el.complete&&el.naturalWidth>0)).toBeTruthy();
   await expect(page.locator('.hero-image')).toHaveAttribute('src','assets/hero.svg');
   await page.locator('.lang-toggle').click();
   await expect(page.locator('.lang-toggle')).toHaveText('RU');
   expect(errors).toEqual([]);
 });
 test(site+' preserves all three internal pages and navigation',async({page})=>{
   await page.route('https://images.unsplash.com/**',route=>route.abort());
   for(const p of pages){
     const response=await page.goto('/'+site+'/'+p,{waitUntil:'domcontentloaded'});
     expect(response.ok()).toBeTruthy();
     await expect(page.locator('main h1')).toHaveCount(1);
     await expect(page.locator('nav a')).toHaveCount(4);
     await expect(page.locator('main')).toBeVisible();
   }
 });
 test(site+' mobile viewport has no horizontal scroll',async({page})=>{
   await page.route('https://images.unsplash.com/**',route=>route.abort());
   await page.setViewportSize({width:390,height:844});
   await page.goto('/'+site+'/index.html',{waitUntil:'domcontentloaded'});
   await expect(page.locator('.hero-title')).toBeVisible();
   const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(widths.scroll).toBeLessThanOrEqual(widths.client+3);
 });
}
