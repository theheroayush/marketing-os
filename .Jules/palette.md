## 2025-02-18 - Material Symbols Accessibility Pattern
**Learning:** Icon-only buttons using Material Symbols require specific aria-attributes to be accessible to screen readers, preventing them from reading the text ligature (e.g. "search") while providing the correct action label.
**Action:** Always add `aria-label` to the parent `<button>` and `aria-hidden="true"` to the inner `<span>` containing the Material Symbols ligature.
