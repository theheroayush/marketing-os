## 2025-02-12 - Accessibility improvement for Material Symbols
**Learning:** For Material Symbols icons, we should use aria-hidden="true" in icon span elements to prevent screen readers from reading decorative ligature texts like "history" or "search" aloud. Otherwise, if parent has an aria-label, the screen reader reads the parent aria-label and the icon text, causing repetitive/confusing behavior. And for icon-only buttons we need `aria-label`.
**Action:** Always add `aria-hidden="true"` to `<span class="material-symbols-outlined">` and `aria-label` to parent icon-only buttons.
