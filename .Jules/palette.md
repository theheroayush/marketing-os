## 2026-04-06 - Accessible Material Symbols
**Learning:** Material Symbols ligatures (e.g., `<span class="material-symbols-outlined">home</span>`) are read verbatim by screen readers as the text "home", "picture_as_pdf", etc., which is bad UX when used in icon-only buttons. Screen readers need contextual labels.
**Action:** Always add `aria-hidden="true"` to the `<span class="material-symbols-outlined">` element and provide a descriptive `aria-label` on its parent `<button>` so screen readers ignore the ligature and announce the intended action instead.
