## 2024-05-15 - [ARIA Labels on Icon Buttons]
**Learning:** Found a recurring pattern in the codebase where Material Symbols icon-only buttons lacked `aria-label`s on the button elements and `aria-hidden="true"` on the inner icons. This causes screen readers to redundantly announce literal icon ligature text (e.g., "picture as pdf").
**Action:** Always add descriptive `aria-label`s to the parent `<button>` and apply `aria-hidden="true"` to the inner text-based icons when using ligature fonts like Material Symbols.
