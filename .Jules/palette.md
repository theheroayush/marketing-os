## 2024-06-09 - Accessibility of icon-only buttons
**Learning:** Found multiple icon-only buttons missing `aria-label` attributes and their inner span with icons missing `aria-hidden="true"`, which is important for screen readers.
**Action:** Always add descriptive `aria-label` on the parent `<button>` and add `aria-hidden="true"` to the inner `<span>` containing the Material icon for icon-only buttons.
