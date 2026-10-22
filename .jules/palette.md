## 2023-10-24 - Icon Button Accessibility
**Learning:** Icon-only buttons using Material Symbols require both an `aria-label` on the `<button>` for screen reader context and an `aria-hidden="true"` on the icon `<span>` itself to prevent screen readers from reading the ligature text (e.g., "search").
**Action:** Always verify icon-only buttons have an `aria-label` and the inner icon element has `aria-hidden="true"` when using icon ligatures.
