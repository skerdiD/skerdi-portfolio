# Skerdi Cacaj — Full-Stack Developer Portfolio

A responsive portfolio focused on backend-oriented full-stack engineering, real application architecture, APIs, relational data, background processing, and practical AI integrations.

## Live site

[skerdi-portfolio.vercel.app](https://skerdi-portfolio.vercel.app)

## Portfolio structure

- Hero and professional positioning
- About and engineering principles
- Professional experience
- Technical stack grouped by responsibility
- Featured and additional projects
- Education
- Contact

All portfolio content is centralized in `src/data/portfolio.ts`. Components render structured data from that module rather than duplicating personal information across the codebase.

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Vitest

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Content updates

Update personal information, navigation, experience, education, skills, and project data in `src/data/portfolio.ts`. LinkedIn and résumé links are intentionally not displayed until verified URLs or assets are supplied.
