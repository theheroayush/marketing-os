## 2026-08-22 - Added Aria Labels to Icon Buttons
**Learning:** Icon-only buttons within dynamically rendered JavaScript templates frequently omit accessibility labels, causing issues for screen readers since automated DOM-scanning accessibility tools might miss them if they aren't rendered on initial load.
**Action:** When adding accessibility attributes to vanilla JS apps, always actively search for icon-only buttons embedded in template strings and dynamically injected HTML, as they require manual aria-label assignments.
