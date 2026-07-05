## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - XSS Vulnerability in Search Input
**Vulnerability:** The search query string `searchQ` was injected directly into the DOM via `innerHTML` without sanitization in the skills search input.
**Learning:** Even simple search inputs rendered via template literals with `innerHTML` require proper HTML escaping to prevent Reflected Cross-Site Scripting (XSS).
**Prevention:** Always use the `app.escapeHtml()` utility function to sanitize user-controlled query strings before inserting them into `value` attributes or other DOM elements.
