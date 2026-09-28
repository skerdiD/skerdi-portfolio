import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Run with the app served locally: node scripts/check-projects.mjs [base-url]
const base = process.argv[2] || "http://127.0.0.1:5174";
const projects = [
  ["bugtriage-ai", "BugTriage AI", "BugTriage-AI", "https://bug-triage-ai.vercel.app/"],
  ["deliverflow", "DeliverFlow", "deliver-flow", "https://deliver-flow.vercel.app/"],
  ["leadflow", "Lead Flow", "lead-flow", "https://lead-flow-skerdid.vercel.app/"],
  ["scopeflow-ai", "ScopeFlow AI", "ScopeFlow-AI", "https://scope-flow-ai.vercel.app/"],
];
const browser = await chromium.launch({ headless: true });
await mkdir("test-results/projects", { recursive: true });
let checked = 0;
try {
  for (const width of [1440, 1366, 768, 390]) {
    for (const theme of ["dark", "light"]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      await context.addInitScript(value => {
        localStorage.setItem("theme", value);
        sessionStorage.setItem("skerdi-intro-played", "true");
        sessionStorage.setItem("portfolio_has_loaded", "true");
      }, theme);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      for (const [slug, name, repo, live] of projects) {
        const response = await page.goto(`${base}/projects/${slug}`);
        assert.equal(response.status(), 200);
        await page.getByRole("heading", { level: 1, name, exact: true }).waitFor();
        await page.waitForFunction(() => [...document.querySelectorAll("main img")].every(img => img.complete && img.naturalWidth > 0));
        assert.equal(await page.title(), `${name} | Skerdi Cacaj`);
        assert.ok((await page.locator('meta[name="description"]').getAttribute("content")).length > 40);
        assert.equal(await page.locator("html").evaluate(el => el.classList.contains("light")), theme === "light");
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        for (const heading of ["Overview", "Architecture", "Key engineering", "Tech stack", "Explore the project"]) {
          assert.equal(await page.getByRole("heading", { name: heading, exact: true }).count(), 1);
        }
        const github = page.getByRole("link", { name: "GitHub Repository", exact: true }).first();
        assert.equal(await github.getAttribute("href"), `https://github.com/skerdiD/${repo}`);
        const demo = page.getByRole("link", { name: "Live Demo", exact: true }).first();
        assert.equal(await demo.getAttribute("href"), live);
        const screenshot = page.locator("main figure a").first();
        assert.equal(await screenshot.getAttribute("href"), live);
        assert.equal(await screenshot.getAttribute("target"), "_blank");
        assert.ok((await screenshot.getAttribute("rel")).includes("noopener"));
        await page.screenshot({ path: `test-results/projects/${slug}-${width}-${theme}.png`, fullPage: true });
        checked++;
      }
      // Back/next links are client-side, with the document preserved.
      await page.evaluate(() => { window.projectNavigationMarker = true; });
      await page.getByRole("link", { name: /Previous Project/ }).click();
      await page.getByRole("heading", { name: "Lead Flow", exact: true }).waitFor();
      assert.equal(await page.evaluate(() => window.projectNavigationMarker), true);
      await page.getByRole("link", { name: /Next Project/ }).click();
      await page.getByRole("heading", { name: "ScopeFlow AI", exact: true }).waitFor();
      await page.getByRole("link", { name: "Back to Projects", exact: true }).click();
      await page.locator("#projects").waitFor();
      assert.equal(await page.evaluate(() => window.projectNavigationMarker), true);
      assert.equal(await page.locator("#projects-stage-container").count(), 1);
      if (width >= 1024) {
        // Position the scroll-driven stage in its first project.
        await page.locator("#projects-stage-container").evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + 100, behavior: "instant" }));
        const preview = page.getByRole("link", { name: "Open BugTriage AI Live Demo (opens in a new tab)" });
        await preview.waitFor({ state: "visible" });
        assert.equal(await preview.getAttribute("href"), projects[0][3]);
        assert.ok(await preview.locator("img").evaluate(img => img.complete && img.naturalWidth > 0));
        assert.equal(await page.getByText("Preview unavailable", { exact: true }).count(), 0);
      }
      const homeLink = page.locator('a[href="/projects/bugtriage-ai"]').filter({ hasText: "View Project" }).locator("visible=true").first();
      await homeLink.click();
      await page.getByRole("heading", { level: 1, name: "BugTriage AI", exact: true }).waitFor();
      assert.equal(await page.evaluate(() => window.projectNavigationMarker), true);
      await page.goto(`${base}/projects/unknown-project`);
      await page.waitForFunction(() => document.title.includes("404") || document.body.innerText.includes("404"));
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`Passed ${width}px ${theme}: routes, images, metadata, links, navigation and overflow`);
    }
  }
  console.log(`Passed ${checked} case-study viewport/theme checks.`);
} finally {
  await browser.close();
}
