
## 2026-04-10 - Single-Pass Array Operations in Render Loops
**Learning:** In vanilla JS apps using string template literal DOM building, chaining array methods (`.filter().map().join()`) forces multiple allocations of intermediate arrays before joining, causing unnecessary garbage collection pressure and main thread delays on every keystroke when rendering long lists.
**Action:** Replace chained array functions with single-pass `for` loops that simultaneously filter and accumulate the HTML string, to eliminate intermediate array creation and optimize rendering performance.
