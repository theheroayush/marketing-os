## 2024-05-24 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** The app's components (header, modals, chat interface) frequently use icon-only buttons (e.g., `<button class="icon-btn">`) without accompanying text or ARIA labels, creating a pervasive accessibility barrier for screen reader users.
**Action:** When auditing or adding new icon-only interactive elements in this design system, always ensure `aria-label` attributes are included to provide accessible names.
