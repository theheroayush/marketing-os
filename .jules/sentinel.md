## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-20 - [HIGH] Fix Stored/Reflected XSS via HTML Escaping
**Vulnerability:** Untrusted variables from user input (`searchQ`) and local storage (`projectName`) were directly injected into template literals for `innerHTML` without HTML escaping, opening multiple Cross-Site Scripting (XSS) vectors.
**Learning:** In vanilla JS apps using `innerHTML` template literals, variables sourced from input boxes or `localStorage` are equally dangerous and prone to XSS if not explicitly wrapped in the escaping utility function.
**Prevention:** Always verify that every single dynamic variable injected via `${}` into an `innerHTML` string is wrapped in `app.escapeHtml()` or a similar robust sanitization function.
