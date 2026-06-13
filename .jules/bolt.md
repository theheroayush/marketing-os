## 2026-06-13 - Array Iteration Inefficiencies in DOM Rendering
**Learning:** In the skills hub, filtering an array executed expensive string operations (`.toLowerCase()`, `.includes()`) on every item even if the inexpensive category check failed, unnecessarily blocking the main thread.
**Action:** Always structure array callbacks with early returns for inexpensive checks (like exact matches or booleans) before executing computationally expensive string allocations and searches.
