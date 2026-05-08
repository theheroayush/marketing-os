
## 2024-05-08 - Object caching overhead
**Learning:** Do not optimize `localStorage` reads by caching parsed objects in memory and returning `deepClone`d copies on every read. Deep cloning in JS (via recursive loops) is generally slower than native `JSON.parse()`, and caching breaks cross-tab sync without `storage` event listeners. Furthermore, replacing `Array.filter` properties with a pre-calculated `_searchStr` provides a dramatic rendering speedup for large lists with $O(1)$ property access per iteration.
**Action:** When filtering static or mostly-static large lists, always compute a unified `_searchStr` to avoid repetitive string allocations or method calls (`.toLowerCase()`) inside the render/filter loop.
