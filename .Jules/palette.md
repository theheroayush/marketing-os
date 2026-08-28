## 2026-08-28 - Adding ARIA labels to dynamically generated HTML elements
**Learning:** In vanilla JavaScript applications, accessible elements (like buttons with ARIA labels) can often be overlooked when they are dynamically generated within JavaScript template literals (e.g., in `app.js`), rather than existing in the root static HTML files.
**Action:** Always search and update dynamically generated HTML within JavaScript template literals to ensure all icon-only buttons have `aria-label` attributes.
