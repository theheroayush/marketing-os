
## 2024-05-18 - Optimize localStorage JSON parsing bottleneck
**Learning:** Repeated synchronous `localStorage` reads containing JSON cause performance bottlenecks specifically due to `JSON.parse()`.
**Action:** Cache parsed JSON objects in memory and return shallow/deep copies when necessary to prevent reference mutation.
