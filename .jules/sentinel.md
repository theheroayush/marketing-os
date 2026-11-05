## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2025-02-27 - DOM-based XSS in Recent AI Sessions History
**Vulnerability:** Chat message previews rendered in the Recent AI Sessions History view (`renderHistoryView`) were not fully escaped. A regex tag stripper `replace(/<[^>]*>/g, '')` was used before string truncation, but stripping alone is insufficient (e.g. malformed tags bypass it) and leaves the output vulnerable to XSS.
**Learning:** Only stripping HTML tags (via regex) is brittle and insufficient for securing untrusted input injected into HTML template literals. In addition, when escaping content that will be truncated, truncation must occur *before* HTML escaping to prevent cutting entities (like `&lt;`) in half.
**Prevention:** Always wrap unescaped variable injections in a robust HTML escape function (like `app.escapeHtml`) even if the string has had tags ostensibly stripped. Order matters: truncate/strip first, then escape.
