## 2026-10-15 - Adding aria-labels to icon-only buttons
**Learning:** Icon-only buttons lacking `aria-label` attributes cause screen readers to read the icon text (e.g., 'close' or 'search') inconsistently, or sometimes ignore them, making navigation difficult for users relying on assistive technologies.
**Action:** Always ensure that icon-only interactive elements (like `<button>` or `<a>`) have an explicit `aria-label` explaining their purpose or action to maintain accessibility across the application.
