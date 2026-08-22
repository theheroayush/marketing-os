## 2026-08-22 - Prevent XSS in search input via DOM interpolation
**Vulnerability:** User-controlled input (`searchQ`) was directly interpolated into the `value` attribute of a search input field via `innerHTML` without escaping, enabling Cross-Site Scripting (XSS).
**Learning:** In vanilla JS applications using template literals to generate HTML, data bound to attributes must be escaped just as strictly as data rendered into the DOM text. The `app.escapeHtml()` utility was already available but overlooked in this specific input.
**Prevention:** Always wrap dynamic variables interpolated into HTML attributes within `innerHTML` template strings with `app.escapeHtml()` or similar sanitization functions.
