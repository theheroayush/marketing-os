## 2025-02-18 - Optimized String Escaping in `app.escapeHtml`
**Learning:** `app.escapeHtml` was heavily used in chat message rendering, executing 5 chained `.replace()` calls per string. Refactoring it to a single-pass regex replacement avoids multiple intermediate string allocations.
**Action:** When working on heavily-called formatting or sanitization functions, prefer single-pass `replace` with regex and mapping objects over chained replacements to reduce overhead.
