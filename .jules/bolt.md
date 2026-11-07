## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2023-11-13 - Eliminate Search Debounce Delay
**Learning:** Updating a localized DOM element (like `#skills-grid`) instead of fully rewriting its parent view `innerHTML` eliminates full-view re-renders that steal input focus, removing the necessity for hacky debounce timeouts on instantaneous searches.
**Action:** Always favor isolated DOM updates for elements actively engaged in rapid event loops (`oninput`) over full re-renders to bypass unnecessary focus hacks and debounce penalties.
