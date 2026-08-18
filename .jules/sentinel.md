## 2026-08-18 - Fix XSS Vulnerability in UI Truncation
**Vulnerability:** XSS vulnerability exists when displaying recent messages in `app.js` using `.replace(/<[^>]*>/g, '').slice(0, 120)` because this allows malicious tags to be evaluated before stripping, or it might be improperly escaped. Additionally, `slice` then escape causes HTML entities (e.g. `&quot;`) to be broken, which can lead to layout breakages or bypasses.
**Learning:** Operations must be performed in the exact order: strip tags, truncate/slice, and then escape to mitigate XSS in truncated UI previews and prevent breaking HTML entities.
**Prevention:** Always use `app.escapeHtml()` on truncated strings after stripping HTML tags.
