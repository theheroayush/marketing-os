## 2024-05-24 - [Add ARIA labels to icon-only buttons]
**Learning:** Material Symbols icon-only buttons require explicit `aria-label` attributes on the parent `<button>` and `aria-hidden="true"` on the inner `<span>` to be fully accessible to screen readers in this application's layout.
**Action:** Always add these attributes when creating or modifying icon-only buttons using Material Symbols.
