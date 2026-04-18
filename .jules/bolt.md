## 2024-04-18 - Caching parsed LocalStorage items
**Learning:** Frequent synchronous calls to `localStorage` holding arrays of objects (like chat sessions or profiles) can be a significant performance bottleneck primarily because of `JSON.parse()`, not just the `getItem()` I/O.
**Action:** When repeatedly reading lists from `localStorage` in critical rendering paths, cache the parsed JavaScript objects in memory. Return deep copies (or handle mutability properly) so callers don't accidentally mutate the cached reference and bypass future `JSON.stringify` logic.
