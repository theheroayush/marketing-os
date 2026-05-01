## 2026-05-01 - Avoid synchronous JSON.parse bottlenecks for LocalStorage
**Learning:** When optimizing repeated synchronous `localStorage` reads containing JSON, the true performance bottleneck is `JSON.parse()`, as modern browsers already cache `getItem()` string results in memory.
**Action:** To achieve measurable performance gains, cache the parsed JavaScript objects rather than raw JSON strings. To handle state mutability safely, return a deep copy (e.g., using `Array.prototype.map()` with object spread `({ ...s, nestedArray: [...s.nestedArray] })`) rather than passing the direct cache reference or repeatedly parsing the JSON.

## 2026-05-01 - Pre-calculate static dataset search fields
**Learning:** Performing multiple string transformations like `.toLowerCase()` on several object properties inside an array `.filter()` during user interactions (like a keyup search event) causes an $O(N)$ processing overhead on every render that degrades performance.
**Action:** When filtering large static datasets (like the `SKILLS` array), perform string transformations once during initialization by concatenating the fields and saving them to a combined `searchStr` property. The `.filter()` can then check the pre-calculated string, reducing the time complexity of the search.
