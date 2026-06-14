## 2026-06-14 - Adding ARIA labels to icon-only buttons
**Learning:** Icon-only buttons often lack accessible names, causing poor experiences for screen reader users. The application relies heavily on Material Symbols inside buttons (e.g., search, notifications, export, restart), and currently has no aria-labels on them.
**Action:** Consistently add descriptive `aria-label` or `title` attributes (which can also act as accessible names) to all buttons containing only icons.
