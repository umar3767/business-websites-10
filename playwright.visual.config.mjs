import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',testMatch:'visual.spec.mjs',timeout:60000,
 expect:{timeout:15000},retries:process.env.CI?1:0,workers:process.env.CI?2:undefined,
 reporter:process.env.CI?'github':'list',
 use:{baseURL:'http://127.0.0.1:4173'},
 webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1',url:'http://127.0.0.1:4173/01-dental/index.html',reuseExistingServer:!process.env.CI,timeout:30000},
 projects:[
 {name:'chromium-desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
 {name:'chromium-android',use:{...devices['Pixel 5']}}
 ]
});
