## 2024-05-15 - Missing ARIA Labels on Icon Buttons
**Learning:** Icon-only buttons using Material Symbols are common in this app but completely lack ARIA labels, making them inaccessible to screen readers. Furthermore, the inner span should be hidden with aria-hidden.
**Action:** Add aria-label to the <button> and aria-hidden="true" to the inner <span> whenever implementing or fixing icon-only buttons.
