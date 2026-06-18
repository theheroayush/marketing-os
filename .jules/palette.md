## 2026-05-20 - Adding ARIA labels to icon-only buttons
**Learning:** Icon-only buttons (like those using material-symbols-outlined) require aria-label attributes to be accessible to screen readers, as the icon text itself is not descriptive enough.
**Action:** Always ensure any `<button>` containing only an icon spans or images has an explicit `aria-label` describing its action.
