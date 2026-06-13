## 2026-06-13 - Accessible icon-only buttons
**Learning:** When adding icon-only buttons using icon fonts (e.g., Material Symbols), it is required to set a descriptive `aria-label` on the parent `<button>` and add `aria-hidden="true"` to the inner `<span>` to prevent redundant screen reader announcements.
**Action:** Use `aria-label` on parent and `aria-hidden="true"` on inner icon tag for all icon-only buttons.
