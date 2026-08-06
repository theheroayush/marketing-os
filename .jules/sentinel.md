## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-08-06 - [HIGH] Fix Stored/Reflected XSS via HTML Escaping in Search Input
**Vulnerability:** The search query (`searchQ`) was interpolated directly into the HTML string for the search input value via `innerHTML` without sanitization. This allows for Reflected/Stored XSS if an attacker can control the search query string or if it's saved in local state.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML`, variables that hold user input and are mapped to attribute values (e.g. `value="${searchQ}"`) must be sanitized, as they can break out of attributes and execute malicious scripts.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
