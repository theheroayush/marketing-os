## 2026-09-04 - Dynamic HTML Accessibility Pattern
**Learning:** When applying accessibility improvements in vanilla JS applications (like adding `aria-label`s to icon buttons), actively search and update dynamically generated HTML within JavaScript template literals (e.g., in `app.js`), as these are easily overlooked compared to root static HTML files.
**Action:** Always search JS template literals using regex for missing accessibility attributes when updating static HTML.
