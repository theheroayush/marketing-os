## 2024-05-24 - Single-pass Regular Expressions for String Replacement
**Learning:** In JavaScript, replacing multiple chained `.replace()` calls with a single-pass regular expression and a dictionary lookup avoids intermediate string allocations, significantly improving execution speed.
**Action:** When optimizing string replacements (like HTML escaping), use a single regex with a mapped dictionary lookup instead of chaining `.replace()`. However, make sure not to break existing behavior for edge cases like `null` or `undefined`.
