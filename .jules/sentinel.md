## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-15 - Prevent Stored XSS via HTML Escaping
**Vulnerability:** Unescaped AI session message content was inserted directly into the DOM via `innerHTML`. The regex `.replace(/<[^>]*>/g, '')` was used, but it's not sufficient to protect against incomplete tags (e.g., `<img src=x onerror=alert(1) `).
**Learning:** Relying solely on regex for HTML tag stripping is insufficient for XSS mitigation, as it fails to catch malformed but executable HTML. It must be combined with a robust HTML escaping utility.
**Prevention:** Always combine stripping mechanisms with a robust HTML escaping utility (e.g., `app.escapeHtml()`) when inserting untrusted content to neutralize remaining executable code.
