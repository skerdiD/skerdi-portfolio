# Project screenshots

The existing hero screenshots live in `public/projects_screenshots/` and remain in use.
All project screenshots link to the corresponding Live Demo when one is configured.

Optional additional screenshots are discovered automatically on the next build:

```text
public/projects/bugtriage-ai/
public/projects/deliverflow/
public/projects/leadflow/
public/projects/scopeflow-ai/
```

Supported formats: `.webp`, `.png`, `.jpg`, `.jpeg`, `.avif` (lowercase extensions).
Add `cover.webp` (or another supported extension) to replace the existing hero image.
Any other images appear in an alphabetically ordered gallery. Use descriptive names
such as `ticket-details.webp`, `client-approvals.webp`, or `proposal-editor.webp`;
the filename supplies the caption and project-prefixed alt text. Use only real app
captures. No image editing or code change is needed. Rebuild and deploy to publish.

Missing optional images produce no empty gallery or broken image elements. If an
existing image fails to load, the case study displays a styled application link.
