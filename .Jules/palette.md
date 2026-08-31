
## 2024-05-15 - Accessible Material Symbols Icon-Only Buttons
**Learning:** Found a common pattern where icon-only buttons using `span` tags with the `material-symbols-outlined` class were missing screen-reader accessible names.
**Action:** When adding icon-only buttons that use ligature-based icon fonts like Material Symbols, always set `aria-label` on the parent `<button>` element to describe the action, and set `aria-hidden="true"` on the inner `<span>` to prevent screen readers from reading the ligature text.
