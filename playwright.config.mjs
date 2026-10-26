import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',testMatch:'browser.spec.mjs',timeout:45000,
 expect:{timeout:12000},retries:process.env.CI?1:0,workers:process.env.CI?3:undefined,
 reporter:process.env.CI?'github':'list',
 use:{baseURL:'http://127.0.0.1:4173'},
 webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1',url:'http://127.0.0.1:4173/01-dental/index.html',reuseExistingServer:!process.env.CI,timeout:30000},
 projects:[
 {name:'chromium-desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
 {name:'firefox-desktop',use:{...devices['Desktop Firefox'],viewport:{width:1366,height:768}}},
 {name:'webkit-desktop',use:{...devices['Desktop Safari'],viewport:{width:1280,height:800}}},
 {name:'chromium-android',use:{...devices['Pixel 5']}},
 {name:'webkit-iphone',use:{...devices['iPhone 13']}}
 ]
});
