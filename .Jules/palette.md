## 2024-03-24 - Screen Reader Issue with Material Symbols
**Learning:** Material Symbols ligatures (e.g., `search`, `notifications`) inside icon-only buttons are announced literally by screen readers unless hidden, confusing users who expect descriptive labels instead of raw text strings.
**Action:** Always add `aria-hidden="true"` to the inner `<span>` containing the `material-symbols-outlined` ligature, and add a descriptive `aria-label` to the parent `<button>` element.
