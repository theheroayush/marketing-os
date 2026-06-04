## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2025-05-18 - XSS in HTML Interpolation
**Vulnerability:** User-controlled input variables (`searchQ` and `projectName`) were interpolated directly into the HTML using template literals without sanitization.
**Learning:** In a vanilla JS architecture heavily relying on template strings for rendering (e.g., `element.innerHTML = \`...\``), standard dynamic inputs must be explicitly escaped before insertion. The framework lacks implicit escaping found in libraries like React or Vue.
**Prevention:** Always wrap dynamically generated HTML interpolations containing user input with a dedicated HTML escaping utility function, such as `app.escapeHtml()`.
