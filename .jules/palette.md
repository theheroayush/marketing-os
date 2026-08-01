## 2024-11-20 - Global Keyboard Focus
**Learning:** This app's icon-only buttons lacked ARIA labels and title attributes, and the global keyboard focus state was missing, making keyboard navigation difficult and inaccessible for screen readers.
**Action:** Added ARIA labels/titles to `icon-btn` instances and applied a global `:focus-visible` outline using the primary brand color to ensure keyboard navigability without disrupting mouse interactions.
