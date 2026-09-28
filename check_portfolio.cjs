const { chromium } = require('./node_modules/@playwright/test');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({headless: true});
 fs.mkdirSync('review', {recursive: true});
 const results = [];
 for (const [width,height,theme] of [[1366,768,'dark'],[1366,768,'light'],[390,844,'dark']]) {
  const context=await browser.newContext({viewport:{width,height}, reducedMotion:'reduce'});
  await context.addInitScript(t=>{localStorage.setItem('theme',t);sessionStorage.setItem('skerdi-intro-played','true');},theme);
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await page.waitForTimeout(2000);
  await page.screenshot({path:`review/${theme}-${width}-hero.png`});
  const body=await page.locator('body').innerText();
  const sections=await page.locator('main section[id]').evaluateAll(es=>es.map(e=>e.id));
  const links=await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(!body.includes('Skerdi') || !body.includes('University of New York Tirana')) throw Error('Missing identity or education');
  if(links.some(l=>l.includes('/blog')||l.includes('mohan_resume')||l==='/developer')) throw Error('Old navigation remains');
  if(sections.includes('certifications')) throw Error('Old certifications remain');
  if(!links.includes('tel:+355676429267')) throw Error('Missing phone link');
  if(!links.some(l=>l.startsWith('mailto:skerdi.cacaj.dev@gmail.com'))) throw Error('Missing email link');
  if(theme==='dark' && width===1366) {
   await page.locator('[name="fi-sender-fullName"]').fill('Portfolio check');
   await page.locator('[name="fi-sender-email"]').fill('test@example.com');
   await page.locator('[name="fi-text-subject"]').fill('Portfolio form validation');
   await page.locator('[name="fi-text-message"]').fill('Checking the local contact draft and undo flow.');
   await page.getByRole('button',{name:'Prepare Email',exact:true}).click();
   await page.keyboard.press('Escape');
   if(await page.locator('[name="fi-text-message"]').inputValue()!=='Checking the local contact draft and undo flow.') throw Error('Undo did not retain message');
  }
  for(const id of ['about','skills','contact']) {
   await page.locator(`#${id}`).scrollIntoViewIfNeeded();
   await page.waitForTimeout(300);
   await page.screenshot({path:`review/${theme}-${width}-${id}.png`});
  }
  results.push({width,theme,sections,overflow,errors});
  if(width===1366 && theme==='dark') {
   for(const path of ['/about','/resume','/blog','/missing','/case-study/saveethahub','/case-study/univault']) {
    await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'networkidle'});
    if(!path.includes('case-study') && !(await page.title()).includes('Skerdi')) throw Error('Old page title: '+path);
    results.push({path,title:await page.title(),errors:[...errors]});
   }
  }
  if(errors.length) throw Error(errors.join('\n'));
  await context.close();
 }
 console.log(JSON.stringify(results,null,2));
 fs.writeFileSync('review/browser-checks.json',JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
