## 2024-10-24 - XSS Mitigation in Truncated UI Previews
**Vulnerability:** Truncating HTML entities during XSS sanitization in UI previews.
**Learning:** Applying string truncation after HTML escaping can slice entities like \`&quot;\` in half (e.g., \`&qu\`), leading to UI regressions and potential XSS bypasses in the history view.
**Prevention:** Always perform operations in the exact order: strip tags, truncate/slice, and then apply \`app.escapeHtml()\` to ensure entities remain intact.
