## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found multiple instances of icon-only buttons (using Material Symbols) that were missing ARIA labels or `aria-hidden="true"` on the icon itself, which breaks accessibility for screen reader users.
**Action:** When adding Material Symbols icons inside buttons, always ensure the button has an `aria-label` describing the action, and the icon `<span>` has `aria-hidden="true"`.
