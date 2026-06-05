## 2024-05-24 - Screen Reader Compatibility with Material Symbols
**Learning:** When using Google Material Symbols (`<span class="material-symbols-outlined">icon_name</span>`) inside icon-only buttons, the literal ligature text (e.g., "search") can be read by screen readers if not properly hidden, causing confusion.
**Action:** Always add `aria-hidden="true"` to the inner `<span>` containing the icon ligature, and set a descriptive `aria-label` on the parent `<button>` element to ensure correct and clear screen reader announcements.
