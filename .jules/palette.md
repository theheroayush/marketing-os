## 2026-03-01 - Adding ARIA labels to Material Symbols buttons
**Learning:** Screen readers read the ligature text inside `<span class="material-symbols-outlined">` (e.g., "search" or "close") when no `aria-label` is present on the button. This can be redundant or confusing.
**Action:** Always add `aria-label` to the parent `<button>` and `aria-hidden="true"` to the ligature `<span>` to prevent duplicate or literal reading by assistive technologies.
