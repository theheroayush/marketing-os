## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix Stored/Reflected XSS in UI rendering
**Vulnerability:** User inputs like `searchQ`, message preview content, and project names in PDF exports were injected into the DOM via `innerHTML` without sanitization, leading to XSS vulnerabilities.
**Learning:** String manipulation functions like `.replace()` or `.slice()` do not sanitize HTML strings and can leave them vulnerable if malformed or chained incorrectly. Moreover, even internal state variables (like search queries) must be escaped when rendered.
**Prevention:** Apply the global HTML escaping utility function (e.g., `app.escapeHtml`) immediately before injecting dynamic content into the DOM, particularly wrapping the result of any string manipulations.
