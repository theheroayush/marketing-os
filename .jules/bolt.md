## 2024-07-08 - Bounded Memoization for Regex Parsing in Repetitive Renders
**Learning:** In a vanilla JS chat application, iterating over all messages and re-executing multiple global regex string replacements (like `parseMd`) during every UI re-render is a significant bottleneck, behaving like an O(N²) operation over chat history.
**Action:** Use a bounded memoization Map cache for pure parsing functions to skip expensive regex evaluation for unchanged inputs across renders.
