## 2026-10-11 - Pre-computing search strings for faster filtering
**Learning:** Repetitive string allocation and lowercasing inside render loops (like filtering a large array of objects on every keystroke) causes unnecessary garbage collection and CPU cycles, slowing down search responsiveness.
**Action:** When filtering objects based on multiple text fields, pre-compute and concatenate the lowercased search string during initialization and attach it to the object. Use this cached string for fast `.includes()` checks during filtering.
