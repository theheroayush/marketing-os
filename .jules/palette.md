## 2024-05-24 - Screen Reader Support for Interactive Icon-Only Buttons
**Learning:** Icon-only buttons used for primary actions like 'Search', 'Notifications', and 'Close' were frequently missing `aria-label`s, rendering them functionally invisible to screen readers despite being visibly critical interactions.
**Action:** Always verify that every `button` and `a` tag containing only an icon (like `material-symbols-outlined`) has an explicit, descriptive `aria-label` attribute to ensure equitable access.
