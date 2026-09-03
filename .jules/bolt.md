## 2026-09-03 - Pre-computing complex search strings
**Learning:** In vanilla JS apps, repeatedly allocating strings and executing `.toLowerCase()` on multiple nested object properties inside an array `filter()` method (e.g., during live search typing) causes significant, unnecessary re-allocation and performance overhead.
**Action:** Pre-compute concatenated, lowercased search strings (e.g., `_searchString`) during application initialization or data loading, so the filter operation only performs a single, simple substring check (like `.includes()`).
