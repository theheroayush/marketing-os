## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## $(date +%Y-%m-%d) - Prevent XSS in HTML Template Literals
**Vulnerability:** User-controlled data (like skill names and project names) were being injected directly into HTML template literals assigned to `innerHTML` without sanitization.
**Learning:** In vanilla JS applications using template literals for DOM generation, any interpolated variable that can be influenced by a user or external source represents a Stored or Reflected XSS risk.
**Prevention:** Always use a robust escaping function (like `app.escapeHtml()`) to sanitize all variables before interpolating them into HTML strings that will be rendered via `innerHTML`.
