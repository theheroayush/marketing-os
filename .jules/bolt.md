## 2024-05-24 - [Micro-optimizing escapeHtml via Dictionary Lookup]
**Learning:** Chained string `.replace()` calls in frequently executed logic (like HTML escaping within render loops) allocate multiple intermediate string representations, slowing down execution time significantly.
**Action:** Consistently replace chained character replacements with a single-pass Regular Expression coupled with a dictionary lookup mapping for a noticeable performance boost in string parsing and HTML rendering tasks.
