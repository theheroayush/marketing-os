## 2026-06-12 - Adding ARIA labels to Material Symbols icon buttons
**Learning:** When using Material Symbols (or similar icon fonts) where the icon is defined by the text content of a `<span>`, screen readers will redundantly read the icon's text (e.g., "search") along with the button's accessible name if `aria-hidden="true"` is not applied to the inner `<span>`.
**Action:** Always add `aria-hidden="true"` to the inner `<span>` containing the icon text when adding `aria-label` to the parent `<button>` for icon-only buttons.
