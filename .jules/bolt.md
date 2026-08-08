## 2026-08-08 - Storage Parsing Overhead
**Learning:** Repetitive \`JSON.parse()\` calls on large \`localStorage\` items (like sessions and profiles) during UI updates and renders create significant main-thread blocking bottlenecks in vanilla JS single-page applications.
**Action:** Implement an in-memory cache to store the parsed objects, returning the reference directly on subsequent reads instead of re-parsing, reducing overhead from milliseconds to sub-milliseconds.
