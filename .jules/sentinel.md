## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-04-25 - Fix XSS in app.js search and projectName
**Vulnerability:** User inputs (`searchQ` and `projectName`) were interpolated directly into `innerHTML` using template literals without being escaped, leading to Cross-Site Scripting (XSS).
**Learning:** Template literals do not automatically escape HTML. When dynamically generating DOM structures with `innerHTML`, variables derived from user input or LocalStorage must always be explicitly sanitized.
**Prevention:** Always use the provided `app.escapeHtml()` wrapper for user-controlled strings before inserting them into `innerHTML` templates.
