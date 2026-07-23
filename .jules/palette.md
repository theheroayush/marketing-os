## 2024-07-23 - Focus States for Buttons
**Learning:** The application lacks focus-visible styles for interactive elements, which is critical for keyboard accessibility.
**Action:** Add a `:focus-visible` outline to `.icon-btn`, `.btn`, `.sidebar-item`, and `.nav-item` classes.

## 2024-07-23 - ARIA Labels for Icon Buttons
**Learning:** Icon-only buttons (like search and notifications) lack accessible names, making them invisible to screen readers.
**Action:** Always add `aria-label` attributes to `<button>` elements that only contain icons.
