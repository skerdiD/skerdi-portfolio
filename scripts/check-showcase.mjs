import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.argv[2] || 'http://127.0.0.1:8080';
const projects = [
  ['BugTriage AI', 'https://bug-triage-ai.vercel.app/'],
  ['DeliverFlow', 'https://deliver-flow.vercel.app/'],
  ['LeadFlow', 'https://lead-flow-skerdid.vercel.app/'],
  ['ScopeFlow AI', 'https://scope-flow-ai.vercel.app/'],
];
const browser = await chromium.launch();
try {
  for (const [width, height] of [[1440, 900], [1366, 768], [1024, 768], [768, 900], [390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      sessionStorage.setItem('skerdi-intro-played', 'true');
      sessionStorage.setItem('portfolio_has_loaded', 'true');
    });
    // Verify the click destination without depending on external deployment availability.
    for (const [, url] of projects) await context.route(url, route => route.fulfill({ body: 'Live demo destination' }));
    const page = await context.newPage();
    await page.goto(base);
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const card = page.locator('#skills h3').filter({ hasText: 'AI & Infrastructure' }).locator('visible=true').first().locator('../..');
    const bounds = await card.locator('..').boundingBox();
    const section = await page.locator('#skills').boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, 'Infrastructure card fits horizontally');
    assert.ok(bounds.y + bounds.height <= section.y + section.height, 'Infrastructure card fits vertically');
    assert.equal(await card.locator('..').getByText('Render', { exact: true }).count(), 1);
    for (const [index, [name, url]] of projects.entries()) {
      if (width >= 1024) {
        await page.locator('#projects-stage-container').evaluate((el, index) => {
          window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - innerHeight) * ((index + 0.5) / 4), behavior: 'instant' });
        }, index);
      }
      const preview = page.getByRole('link', { name: `Open ${name} Live Demo (opens in a new tab)`, exact: true }).locator('visible=true').first();
      await preview.waitFor();
      await preview.locator('img').evaluate(img => img.decode());
      assert.equal(await preview.getAttribute('href'), url);
      assert.ok((await preview.locator('img').getAttribute('src')).startsWith('/projects_screenshots/'));
      // Sticky mobile cards intentionally stack, so use keyboard activation there.
      const popupPromise = context.waitForEvent('page');
      if (width < 640) { await preview.focus(); await preview.press('Enter'); }
      else await preview.click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      assert.equal(popup.url(), url);
      await popup.close();
    }
    console.log(`Passed ${width}x${height}: skills bounds, four screenshots and live navigation`);
    await context.close();
  }
} finally { await browser.close(); }
