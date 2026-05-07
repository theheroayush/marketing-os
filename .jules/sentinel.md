## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-05-07 - Unsanitized profile name rendering via innerHTML
**Vulnerability:** Cross-Site Scripting (XSS) via unsanitized profile names and IDs being rendered directly into the DOM using `innerHTML`.
**Learning:** Even internal data like profile IDs and names from LocalStorage must be treated as untrusted if they can be influenced by users and then rendered into HTML.
**Prevention:** Always use `app.escapeHtml()` or similar sanitization when interpolating variables into HTML strings destined for `innerHTML`.
