## 2026-08-20 - Dynamic HTML ARIA Labeling
**Learning:** In vanilla JavaScript apps where HTML is generated dynamically (via template literals in `app.js`), icon-only buttons often miss `aria-label`s, causing significant accessibility issues for screen readers. This pattern is easily overlooked compared to static HTML files.
**Action:** When working on accessibility improvements, always grep dynamically generated HTML blocks (like modal components, chat interfaces, etc.) for `button` tags and ensure they have `aria-label`s if they only contain an icon, not just checking the root `index.html`.
