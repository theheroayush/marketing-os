const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ recordVideo: { dir: '/home/jules/verification/videos/' } });
  const page = await context.newPage();

  try {
    const indexPath = `file://${process.cwd()}/index.html`;
    await page.goto(indexPath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Take screenshot of the header
    await page.screenshot({ path: '/home/jules/verification/screenshots/verification.png' });
    console.log('Took screenshot of index.html');

    // Evaluate ARIA labels to ensure they exist
    const searchLabel = await page.evaluate(() => document.querySelector('.header-actions button:nth-child(1)').getAttribute('aria-label'));
    const notifLabel = await page.evaluate(() => document.querySelector('.header-actions button:nth-child(2)').getAttribute('aria-label'));

    console.log(`Search button aria-label: ${searchLabel}`);
    console.log(`Notifications button aria-label: ${notifLabel}`);

    if (searchLabel !== 'Search' || notifLabel !== 'Notifications') {
      throw new Error("ARIA labels are incorrect or missing");
    }

  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await context.close();
    await browser.close();
  }
})();
