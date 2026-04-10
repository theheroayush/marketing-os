
## 2026-04-10 - Focus States and Icon-Only Buttons Accessibility
**Learning:** In this design system, standardizing keyboard navigation accessibility without breaking the touch/mouse experience requires a global `*:focus-visible` rule. Also, Material Symbols icon-only buttons need an explicit pattern: an `aria-label` on the parent `<button>` and `aria-hidden="true"` on the inner ligature `<span>`.
**Action:** Implemented a global `:focus-visible` outline using the `--primary` variable in `styles.css` and added proper ARIA attributes to header icon buttons in `index.html`. This pattern should be consistently applied to all new interactive elements.
