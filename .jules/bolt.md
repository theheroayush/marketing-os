## 2024-05-28 - Optimize String Replaces with Regex Map
**Learning:** Chaining multiple `.replace()` calls on a string allocates intermediate strings for each pass, making it slower and more memory-intensive. Using a single-pass regex with a map dictionary (e.g., `replace(/[&<>"']/g, m => map[m])`) avoids this overhead, dramatically speeding up string formatting, especially for long inputs.
**Action:** Always prefer a single regex map over chained replaces when swapping out multiple distinct character sets or patterns in performance-sensitive logic, like HTML escaping or markdown parsing.
