## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-26 - Direct innerHTML interpolation in Template Literals
**Vulnerability:** XSS vulnerabilities found in `app.js` where `searchQ` and `projectName` variables were interpolated directly into `innerHTML` strings via template literals without being escaped.
**Learning:** In vanilla JS applications using template strings to generate HTML blocks, all user-controlled data or state variables retrieved from localStorage MUST be explicitly escaped before insertion, as they do not have the automatic protection afforded by frameworks like React.
**Prevention:** Always wrap dynamically interpolated variables (e.g., `${var}`) inside HTML-generating template literals with a sanitization function like `app.escapeHtml(var)`.
