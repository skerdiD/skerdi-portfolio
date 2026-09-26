# Content migration handoff

The existing React components, page layouts, typography, spacing, colors, theme logic, and motion settings were retained. No stylesheet or Tailwind configuration was changed. Content lengths, the replacement avatar, and removal of unsupported content naturally affect the rendered result.

## Identity and content

- Skerdi Cacaj, Full-Stack Developer, Tirana, Albania.
- Updated email, phone, GitHub, LinkedIn, introductions, biography, skills, education, languages, footer, loading screens, 404 page, and printable resume.
- Education: Bachelor in Computer Science, University of New York Tirana (UNYT), 2023–2026.
- Languages: Albanian — Native; English — B2 (Upper-Intermediate).
- Removed unsupported grades, project counts, certification claims, and old profile statistics from the active personal content. GitHub widgets now use `skerdiD`; unavailable values do not reuse Mohan's statistics. Persistent caches are scoped to the new account.
- Updated static and dynamic SEO, OpenGraph, structured data, PWA metadata, knowledge bases, and the identity initial in the favicon. Removed old analytics and domain redirects.

## Hidden or removed

- Blog navigation, command-menu entry, footer and 404 links, routes, article data, and RSS feed.
- Certifications section and personal certification claims. Reusable certification components remain in source.
- The old developer/LeetCode statistics route and links. Its reusable page remains in source but is not routed.
- No professional experience, work experience, or internship section is visible or newly introduced.
- Old PDF download links now open the printable resume page. Print/PDF actions use the browser print dialog.
- The old sitemap and sitemap declaration were removed because a replacement production domain was not supplied. Runtime canonical URLs use the current origin.

## Remaining original references

Project replacement was expressly deferred. Project titles, descriptions, metrics, original repository links, screenshots, research assets, and author attribution remain in `ProjectsSection.tsx`, `ProjectScrollyStage.tsx`, `MobileProjectStack.tsx`, the two case-study pages, and the project portion of `Resume.tsx`. Project links also remain in About, the footer, the command menu, manifest, and service-worker precache. These include SaveethaHub, UniVault, and `ComradeMohan` URLs. They are inherited content, not verified Skerdi projects.

Other unused or historical references remain in:

- `src/pages/DeveloperProfile.tsx` (unrouted), `src/components/CertificationsSection.tsx`, and `src/components/OracleCertModal.tsx` (unmounted).
- `README-UPGRADE.md` and `WEBSITE_ARCHITECTURE_AND_UI_SPEC.md`, which describe the original template.
- Original public portrait images, `mohan_resume_.pdf`, certification files, presentation/project media, banners, stats SVGs, and `public/case stduy/`. Unlinked public files are still served if their exact URLs are requested.
- The existing decorative footer map remains unchanged; it is marked decorative, and its adjacent location/contact text now identifies Tirana, Albania.

## Integration details

- Portrait slots use the avatar from `https://github.com/skerdiD.png`. This is currently a square illustrated avatar, so it has a different silhouette from the original transparent portrait. Image-slot dimensions and effects remain unchanged.
- The contact form prepares a `mailto:` draft to `skerdi.cacaj.dev@gmail.com`. The user finishes sending in their email app. It no longer posts to the previous owner's hosted FormInit account. Validation and the existing undo animation remain; no email was sent during verification.
- No replacement hosted form endpoint, PDF resume, portfolio repository URL for the footer commit widget, or production hostname was invented.

## Verification

- Production build: `npm.cmd run build` passed. `npm.cmd` runs the requested npm build script on this Windows machine because PowerShell blocks `npm.ps1`.
- Browser checks: desktop 1366×768 in dark and light themes; mobile 390×844. No uncaught page errors or horizontal document overflow. Checked homepage, About, Resume, both case studies, removed Blog route, and 404.
- Verified current email/phone links, absence of Blog and old PDF navigation, removed certifications, and contact draft/undo retaining the message.
- Additional TypeScript check reports the two pre-existing issues in `ProgressiveImage.tsx` (`onDrag` props) and `SkillsSection.tsx` (`divideColor`). Both were confirmed in the original Git revision and left unchanged.
- Build emits the existing outdated Browserslist-data notice. No dependencies were changed.
- No commit or push performed.

## Files changed

Updated:

- `README.md`, `index.html`, `knowledge_base.txt`
- `public/_redirects`, `public/browserconfig.xml`, `public/knowledge_base.txt`, `public/robots.txt`, `public/site.webmanifest`, `public/sw.js`
- `src/App.tsx`
- `src/components/AboutSection.tsx`, `CommandMenu.tsx`, `ContactSection.tsx`, `EducationProgressionRoadmap.tsx`, `Footer.tsx`, `HeroSection.tsx`, `IntroAnimation.tsx`, `LoadingScreen.tsx`, `Navbar.tsx`, `SEO.tsx`, `SkillsSection.tsx`
- `src/data/developerProfileFallback.json`, `src/hooks/useDeveloperStats.ts`
- `src/pages/About.tsx`, `Index.tsx`, `NotFound.tsx`, `Resume.tsx`, `SaveethaHubCaseStudy.tsx`, `UniVaultCaseStudy.tsx`

Added:

- `public/favicon.svg`
- `CONTENT_MIGRATION.md`

Removed:

- `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/data/blogArticles.ts`
- `public/feed.xml`, `public/sitemap.xml`
