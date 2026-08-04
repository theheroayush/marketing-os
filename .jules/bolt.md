## 2024-05-24 - Unnecessary Regex Parsing on Historical Messages
**Learning:** In standard chat interfaces, appending a new message often triggers a full re-render of all historical messages in the view. When those messages rely on a custom Markdown parser doing multiple Regex replacements per message, the execution scales O(N²) unnecessarily.
**Action:** Always wrap heavy string formatters in an LRU cache when rendering iterative lists like chat logs.
