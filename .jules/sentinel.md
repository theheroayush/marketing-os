## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix Stored XSS in History and PDF Export via HTML Escaping
**Vulnerability:** User inputs like skill names, emojis, and exported project names (`projectName`) were being interpolated directly into the DOM via `innerHTML` without sanitization in `app.js`. This allows for Stored Cross-Site Scripting (XSS) via manipulated data in `localStorage`.
**Learning:** Even internal data that seems safe, such as variables stored in localStorage, should be sanitized before being injected as HTML. It's also important to slice strings before escaping them to prevent malformed HTML entities from rendering improperly in previews.
**Prevention:** Always use a global escaping utility (e.g., `app.escapeHtml`) for user data or dynamically populated storage variables that will be passed into `innerHTML` statements.
