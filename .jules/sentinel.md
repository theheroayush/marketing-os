## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2025-07-03 - Avoid Broken Entities and UI Regressions with HTML Escaping
**Vulnerability:** HTML escaping logic replacing HTML tag stripping, introducing UI regressions or broken entities if truncated incorrectly.
**Learning:** When mitigating XSS by escaping HTML entities inside UI text previews, ensure the string is stripped of rich HTML formatting *before* being escaped, and slicing/truncation must occur *before* the escaping is applied to avoid cutting off HTML entities (like `&quot;`) midway.
**Prevention:** Always verify string operations order (strip -> slice -> escape) in text previews to prevent malformed text artifacts.
