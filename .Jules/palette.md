## 2026-08-25 - Added ARIA labels to icon-only buttons
**Learning:** Icon-only buttons without ARIA labels are inaccessible to screen readers, preventing those users from understanding what the button does. This pattern was found across the app in both static HTML and dynamic JS.
**Action:** Adding explicit `aria-label` attributes to these icon-only buttons ensures their functionality is properly communicated.
