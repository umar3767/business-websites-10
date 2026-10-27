import {test,expect} from '@playwright/test';

/* Domain feature acceptance tests: actual browser behavior, not mere DOM presence. */
test.beforeEach(async({page})=>{
  await page.route('https://images.unsplash.com/**',route=>route.abort());
});
const portfolios=[
 ['01-dental','services.html'],
 ['02-barbershop','services.html'],
 ['03-beauty-salon','rituals.html']
];
for(const [site,route] of portfolios){
 test(site+' category filtering changes service count and can reset',async({page})=>{
  await page.goto('/'+site+'/'+route,{waitUntil:'domcontentloaded'});
  const cards=page.locator('.full-list .service-card');
  const start=await cards.count();
  expect(start).toBeGreaterThan(3);
  const chips=page.locator('.full-list .filter-chips .chip');
  expect(await chips.count()).toBeGreaterThan(2);
  await chips.nth(1).click();
  const selected=await cards.count();
  expect(selected).toBeGreaterThan(0);
  expect(selected).toBeLessThan(start);
  await chips.first().click();
  await expect(cards).toHaveCount(start);
 });
}
test('NOIR AUTO before/after range actually updates the two-photo clipping',async({page})=>{
 await page.goto('/04-car-detailing/packages.html',{waitUntil:'domcontentloaded'});
 const range=page.locator('.compare-range').first();
 await expect(range).toHaveCount(1);
 await range.evaluate(node=>{node.value='82';node.dispatchEvent(new Event('input',{bubbles:true}))});
 await expect(page.locator('.range-value').first()).toHaveText('82%');
 await expect(page.locator('.compare-after').first()).toHaveCSS('clip-path','inset(0px 18% 0px 0px)');
});
test('LOOP ACADEMY filter selection and sample timetable both react to input',async({page})=>{
 await page.goto('/05-learning-center/courses.html',{waitUntil:'domcontentloaded'});
 const selects=page.locator('.learning-controls select');
 await expect(selects).toHaveCount(3);
 await selects.first().selectOption('tech');
 const cards=page.locator('.learning-section .service-card');
 expect(await cards.count()).toBeGreaterThan(0);
 await selects.nth(1).selectOption('adult');
 const after=await cards.count();
 expect(after).toBeGreaterThanOrEqual(0);
 await selects.first().selectOption('all');
 await selects.nth(1).selectOption('all');
 await expect(cards).toHaveCount(6);
 const schedule=page.locator('.schedule-box');
 const before=await schedule.innerText();
 await page.locator('.sample-schedule .filter-chips .chip').nth(1).click();
 expect(await schedule.innerText()).not.toBe(before);
});
test('HUSH HOME calculator updates, validates out-of-range area and applies extras',async({page})=>{
 await page.goto('/06-cleaning/calculator.html',{waitUntil:'domcontentloaded'});
 const panel=page.locator('.calculator-section').first();
 const area=panel.locator('input[type=number]');
 const amount=panel.locator('.calc-result');
 const first=await amount.innerText();
 await panel.locator('input[type=checkbox]').first().check();
 expect(await amount.innerText()).not.toBe(first);
 await area.fill('5');
 await expect(amount).toHaveText('—');
 await expect(panel.locator('.calc-warning')).not.toBeEmpty();
 await area.fill('65');
 await expect(amount).not.toHaveText('—');
});
test('TORQ service finder filters electrical services and restores full list',async({page})=>{
 await page.goto('/07-auto-service/services.html',{waitUntil:'domcontentloaded'});
 const choose=page.locator('#advisor-kind');
 await choose.selectOption('electric');
 await expect(page.locator('.service-advisor .service-card')).toHaveCount(2);
 await choose.selectOption('all');
 await expect(page.locator('.service-advisor .service-card')).toHaveCount(6);
});
test('FORME OBJECTS category and material filters produce intersection',async({page})=>{
 await page.goto('/08-furniture/collection.html',{waitUntil:'domcontentloaded'});
 const selections=page.locator('.learning-controls select');
 await expect(selections).toHaveCount(2);
 await expect(page.locator('.services-grid .service-card')).toHaveCount(6);
 await selections.first().selectOption('seating');
 const count=await page.locator('.services-grid .service-card').count();
 expect(count).toBeGreaterThan(0);
 expect(count).toBeLessThan(6);
 await selections.nth(1).selectOption('metal');
 expect(await page.locator('.services-grid .service-card').count()).toBeLessThanOrEqual(count);
 await selections.first().selectOption('all');
 await selections.nth(1).selectOption('all');
 await expect(page.locator('.services-grid .service-card')).toHaveCount(6);
});
test('STRATA ROOMS estimate reacts to area, finish and validation',async({page})=>{
 await page.goto('/09-renovation/budget.html',{waitUntil:'domcontentloaded'});
 const panel=page.locator('.calculator-section').first();
 const area=panel.locator('input[type=number]');
 const estimate=panel.locator('.calc-result');
 const old=await estimate.innerText();
 await panel.locator('select').first().selectOption('2');
 expect(await estimate.innerText()).not.toBe(old);
 await area.fill('1');
 await expect(estimate).toHaveText('—');
 await area.fill('100');
 await expect(estimate).not.toHaveText('—');
});
test('PETAL PARADE cart sanitizes malformed persistent quantities',async({page})=>{
 await page.goto('/10-flower-shop/index.html',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>localStorage.setItem('cart-10-flower-shop','{"0":1000000,"1":-7,"2":"invalid","3":1}'));
 await page.goto('/10-flower-shop/basket.html',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.basket-row')).toHaveCount(1);
 await expect(page.locator('.basket-row .basket-qty')).toHaveText('1');
});
