## 2024-05-18 - [Add ARIA labels to icon-only buttons]
**Learning:** Icon-only buttons using Material symbols across the `app.js` and `index.html` were lacking basic accessibility structure, meaning screen reader users wouldn't know what the buttons did (e.g. settings, notifications, delete). By observing this pattern we can improve the accessibility of the whole app quickly.
**Action:** When implementing or updating icon buttons in the future across the app, always include an `aria-label` attribute describing their function.
