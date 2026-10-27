import {test,expect} from '@playwright/test';

/* Regression suite for the October 27 editorial and accessibility pass.
   Tests exercise actual served URLs in every browser project. */
const sites={
 '01-dental':'approach.html',
 '02-barbershop':'lookbook.html',
 '03-beauty-salon':'gallery.html',
 '04-car-detailing':'method.html',
 '05-learning-center':'learning.html',
 '06-cleaning':'calculator.html',
 '07-auto-service':'process.html',
 '08-furniture':'materials.html',
 '09-renovation':'concepts.html',
 '10-flower-shop':'delivery.html'
};
for(const [site,story] of Object.entries(sites)){
 test(site+' renders three independently labelled editorial photos',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://images.unsplash.com/**',route=>route.abort());
  await page.goto('/'+site+'/'+story,{waitUntil:'domcontentloaded'});
  await expect(page.locator('.editorial-panel')).toHaveCount(3);
  await expect(page.locator('.editorial-panel figcaption')).toHaveCount(3);
  await expect(page.locator('.editorial-panel img')).toHaveCount(3);
  const images=page.locator('.editorial-panel img');
  for(let i=0;i<3;i++){
   const photo=images.nth(i);
   await photo.scrollIntoViewIfNeeded();
   await expect.poll(()=>photo.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
  }
  expect(errors).toEqual([]);
 });
 test(site+' mobile menu opens and closes accessibly using Escape',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.route('https://images.unsplash.com/**',route=>route.abort());
  await page.goto('/'+site+'/index.html',{waitUntil:'domcontentloaded'});
  const menu=page.locator('.menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('.site-header')).toHaveClass(/nav-open/);
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(page.locator('.site-header')).not.toHaveClass(/nav-open/);
  await expect(menu).toBeFocused();
 });
 test(site+' contact form labels reference real fields',async({page})=>{
  await page.route('https://images.unsplash.com/**',route=>route.abort());
  const routes={
    '01-dental':'contact.html','02-barbershop':'booking.html','03-beauty-salon':'studio.html',
    '04-car-detailing':'estimate.html','05-learning-center':'trial.html','06-cleaning':'request.html',
    '07-auto-service':'request.html','08-furniture':'enquiry.html','09-renovation':'budget.html',
    '10-flower-shop':'basket.html'
  };
  await page.goto('/'+site+'/'+routes[site],{waitUntil:'domcontentloaded'});
  for(const id of ['enquiry-name','enquiry-message','enquiry-output']){
    await expect(page.locator('.enquiry-form label[for="'+id+'"]')).toHaveCount(1);
    await expect(page.locator('#'+id)).toHaveCount(1);
  }
 });
}
test('flower shop cart adds and explicitly removes items with recalculated total',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 await page.goto('/10-flower-shop/bouquets.html',{waitUntil:'domcontentloaded'});
 await page.locator('.add-cart').first().click();
 await page.goto('/10-flower-shop/basket.html',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.basket-row')).toHaveCount(1);
 await expect(page.locator('.basket-remove')).toHaveCount(1);
 await page.locator('.basket-remove').click();
 await expect(page.locator('.basket-row')).toHaveCount(0);
 await expect(page.locator('.basket-list')).toContainText(/Корзина пока пуста|Savat hozircha bo‘sh/);
});

test('automotive service advisor filters by concern without claiming diagnosis',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 await page.goto('/07-auto-service/services.html',{waitUntil:'domcontentloaded'});
 const chooser=page.locator('#advisor-kind');
 await expect(chooser).toHaveCount(1);
 await chooser.selectOption('electric');
 await expect(page.locator('.service-advisor .service-card')).toHaveCount(2);
 await expect(page.locator('.service-advisor .contact-warning')).toContainText(/не является|специалист|mutaxassis|maʼlumotnoma/i);
 await chooser.selectOption('all');
 await expect(page.locator('.service-advisor .service-card')).toHaveCount(6);
});
test('ten story page galleries fit a 320px mobile viewport',async({page})=>{
 await page.setViewportSize({width:320,height:568});
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 for(const [site,story] of Object.entries(sites)){
  await page.goto('/'+site+'/'+story,{waitUntil:'domcontentloaded'});
  const sizes=await page.evaluate(()=>({document:document.documentElement.scrollWidth,screen:document.documentElement.clientWidth}));
  expect(sizes.document,site).toBeLessThanOrEqual(sizes.screen+3);
 }
});
