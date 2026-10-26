## 2026-05-18 - ARIA Labels and Material Symbols
**Learning:** Icon-only buttons using Material Symbols need not only an `aria-label` on the button itself but also `aria-hidden="true"` on the inner ligature `<span>` to prevent screen readers from reading out the text (e.g., "history" or "arrow_upward") unnecessarily.
**Action:** Always add `aria-hidden="true"` to icon ligature spans when they are inside buttons with `aria-label`s.
