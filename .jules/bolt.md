## 2025-05-18 - Optimize HTML escaping
**Learning:** Chaining `.replace` with Regex multiple times forces multiple iterations over a string and creates intermediate string allocations. A single-pass regex combined with a lookup object is significantly faster for HTML escaping, specifically in JavaScript engines like V8.
**Action:** Use a single-pass regex `/[&<>"']/g` and a lookup map (`{ '&': '&amp;', ... }`) instead of multiple chained `.replace()` calls for simple character substitutions in performance-critical string escaping.
