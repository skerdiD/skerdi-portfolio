# Project case studies

The homepage retains its scrolly stage, tablet cards, mobile stack and modal.
Each project now has a **View Project** link. GitHub and Live Demo actions remain.
The BugTriage stage preview uses the real screenshot from `public` and opens its
Live Demo in a new tab. Every case-study screenshot behaves the same way.

## Routes and links

| Route | Repository | Live Demo |
| --- | --- | --- |
| `/projects/bugtriage-ai` | https://github.com/skerdiD/BugTriage-AI | https://bug-triage-ai.vercel.app/ |
| `/projects/deliverflow` | https://github.com/skerdiD/deliver-flow | https://deliver-flow.vercel.app/ |
| `/projects/leadflow` | https://github.com/skerdiD/lead-flow | https://lead-flow-skerdid.vercel.app/ |
| `/projects/scopeflow-ai` | https://github.com/skerdiD/ScopeFlow-AI | https://scope-flow-ai.vercel.app/ |

All eight external URLs responded with HTTP 200 during verification. This verifies
availability of the public pages, not every authenticated workflow in those apps.
Invalid slugs render the existing Not Found page. Vercel rewrites serve `index.html`
for direct project navigation while leaving `/api` and static assets untouched.
Deployment itself was not performed.

## Files

Created:

- `src/data/projects.ts`: typed, shared project model and existing showcase data.
- `src/data/projectCaseStudies.ts`: case-study content, architecture, engineering details and screenshot metadata.
- `src/data/projectScreenshots.ts`: build-time discovery of optional screenshots.
- `src/pages/ProjectDetails.tsx`: slug lookup, existing navbar/footer/SEO and not-found handling.
- `src/components/projects/ProjectCaseStudy.tsx`: shared page layout and previous/next navigation.
- `src/components/projects/ProjectActions.tsx`: GitHub and optional Live Demo buttons.
- `src/components/projects/ProjectArchitecture.tsx`: responsive architecture cards.
- `src/components/projects/ProjectScreenshot.tsx`: accessible linked screenshot and load-error fallback.
- `src/components/projects/ProjectGallery.tsx`: optional multi-image gallery.
- `vercel.json`: direct-route SPA rewrites.
- `public/projects/README.md` and four project-folder `.gitkeep` files.
- `scripts/check-projects.mjs`: repeatable Playwright route/layout/navigation checks.
- `PROJECT_CASE_STUDIES.md`: this report.

Modified:

- `src/App.tsx`: lazy-loaded `/projects/:slug` route.
- `src/components/ProjectsSection.tsx`: shared data import and View Project labels.
- `src/components/MobileProjectStack.tsx`: View Project label for the existing internal action.
- `src/components/ProjectScrollyStage.tsx`: internal CTAs, shared URLs and clickable real BugTriage screenshot.

The four supplied `public/projects_screenshots/*.png` files were already present
as untracked user files. They are referenced directly and were not altered.

## Data and content

`Project` retains the homepage fields (`title`, `desc`, `link`, `githubLink`,
`techStack`, presentation styles, `problem`, `solution`, `impact`) and adds `slug`,
`caseStudyLink`, `name`, `tagline`, `category`, `overview`, `heroImage`,
`architecture` and `engineeringHighlights`. Existing descriptions and ordering
are preserved. Both showcase and case studies consume the same exported array.

Content was checked against the existing portfolio and local sibling repositories:

- BugTriage AI: README workflow, transactional outbox and BullMQ worker source.
- DeliverFlow: README architecture, access boundaries and private file delivery.
- Lead Flow: README architecture and lead qualification server action.
- ScopeFlow AI: README architecture and Express authentication middleware.

Architecture cards describe subsystem responsibilities. They do not imply that
unrelated services execute in a single linear chain. No performance or business
metrics were added. No required content was left unverified; deeper undocumented
implementation details were omitted.

## Screenshots

| Project | Current image in `public/projects_screenshots/` |
| --- | --- |
| BugTriage AI | `engineering-dashboard.png` |
| DeliverFlow | `owner-dashboard-light.png` |
| Lead Flow | `dashboard-overview.png` |
| ScopeFlow AI | `activity-timeline.png` |

No screenshots are required to complete the current pages. For additional images,
use `public/projects/<slug>/`. A `cover.webp` (or PNG/JPG/JPEG/AVIF equivalent)
overrides the current hero. Other supported images become gallery entries using
their filenames as captions. Rebuild and redeploy after adding files. See
`public/projects/README.md` for details.

## Verification

- Production build: passed (`npm.cmd run build`, the Windows equivalent of `npm run build`).
- TypeScript: passed (`npx.cmd tsc --noEmit -p tsconfig.app.json`).
- Existing Vitest suite: passed (1 test).
- New components/data/page: ESLint passed.
- Full repository lint: existing failures (44 errors and 10 warnings); unrelated code was left unchanged.
- Playwright: all four routes at 1440, 1366, 768 and 390 pixels, in dark and light themes (32 combinations), passed.
- Verified route titles/descriptions, loaded images, external link targets and attributes, no horizontal overflow, previous/next links, homepage-to-project navigation and invalid slugs.
- Additional checks passed: direct entry on the production build, all four desktop stage CTAs at 1366×768, mobile navbar navigation, actual theme toggling, screenshot popup destination and failed-image fallback.
- Gallery discovery was verified with a temporary copy of a real supplied screenshot, including a production build. The temporary fixture was then removed and the final build passed again.
- Browser screenshots are in ignored `test-results/projects/`.

To repeat browser checks, serve the application and run:

```sh
node scripts/check-projects.mjs http://127.0.0.1:5174
```

No dependencies were added. No commit or push was performed.
