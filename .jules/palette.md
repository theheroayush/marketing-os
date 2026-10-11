## 2024-10-11 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Found several icon-only buttons in `app.js` (like back, export, delete) without `aria-label` attributes. Screen reader users would have no context for these buttons.
**Action:** Add `aria-label` attributes to icon-only buttons in dynamic HTML generation to improve accessibility.
