## 2024-05-19 - Screen Reader Accessibility for Material Icons
**Learning:** Screen readers will redundantly read the text ligature (e.g., "close" or "search") of Material Symbols icons inside buttons, even if the parent button has an `aria-label`.
**Action:** When adding `aria-label` to icon-only buttons containing Material Symbols, explicitly add `aria-hidden="true"` to the inner `<span>` element containing the text ligature to hide it from screen readers.
