## 2024-10-24 - Optimized escapeHtml string allocations
**Learning:** Chained `.replace()` calls on a string in a hot path (like escaping values during rapid UI updates) create excessive intermediate string allocations and traverse the string multiple times, which slows down the JS engine.
**Action:** Replaced chained RegExp replaces with a single-pass RegExp and dictionary lookup, and always documented the performance intent via an inline comment.
