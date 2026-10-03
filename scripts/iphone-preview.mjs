/* Opens the site in Playwright's WebKit (Safari engine) with the iPhone 13 Pro
   profile: 390x844 viewport, DPR 3, touch, mobile Safari UA.
   Usage: node scripts/iphone-preview.mjs [url]   (default http://localhost:3000)
   Not a real iOS Simulator: no URL-bar collapse and no on-screen keyboard.
   First-time setup: node --use-system-ca node_modules/playwright/cli.js install webkit */
import { devices, webkit } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:3000';
const browser = await webkit.launch({ headless: false });
const context = await browser.newContext({ ...devices['iPhone 13 Pro'] });
const page = await context.newPage();
page.on('close', () => browser.close());
await page.goto(url, { waitUntil: 'load' });
console.log(`iPhone 13 Pro (WebKit) open at ${url} — close the window to exit.`);
