## 2026-10-03 - [Fix Markdown Parser XSS]
**Vulnerability:** XSS in custom Markdown parser `parseMd` due to incomplete escaping (only `<` and `>`).
**Learning:** Even simple markdown to HTML converters need full entity escaping before formatting rules are applied. Furthermore, the `&` character must always be escaped first to prevent double-escaping other entities like `&lt;`.
**Prevention:** Implement a standard full HTML sanitization sweep (`&`, `<`, `>`, `"`, `'`) before applying any text replacements that output raw HTML tags.
