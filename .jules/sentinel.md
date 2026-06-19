## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-06-19 - XSS in Global Search Variables
**Vulnerability:** User-controlled string variables (like `searchQ`) mapped directly into DOM templates using `innerHTML`.
**Learning:** Even internal variable tracking elements (like dynamic input search filters) must be sanitized since they are rendered back into the DOM using untrusted strings.
**Prevention:** Apply `app.escapeHtml()` (or equivalent escaping functions) when placing dynamic content like search queries into `innerHTML` templates.
