## 2026-10-09 - Adding aria-label to icon-only buttons
**Learning:** Found an accessibility issue pattern specific to this app's components where many icon-only buttons in modals and lists were missing `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Implemented a standard pattern to add descriptive `aria-label` attributes to all such buttons (e.g., "Close modal", "Add team member", "Delete session"). Next time, will enforce this accessibility standard during component creation.
