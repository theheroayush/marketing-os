## 2026-03-01 - Prevent Screen Readers from Reading Material Icons
**Learning:** Screen readers were reading out the literal ligature text (e.g. "search" or "settings") of the `.material-symbols-outlined` spans inside buttons, creating redundant and confusing announcements for screen reader users when combined with `aria-label`s.
**Action:** Always explicitly add `aria-hidden="true"` to icon spans containing Material Symbols ligatures when they are purely decorative or when their semantic meaning is already handled by the parent button's `aria-label`.
