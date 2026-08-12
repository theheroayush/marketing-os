## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-08-12 - Cross-Site Scripting (XSS) in Search Input
**Vulnerability:** Unescaped interpolation of user input (`searchQ`) into HTML template literals (`value="${searchQ}"`).
**Learning:** Vanilla JS template literal rendering does not automatically escape variables, leading to XSS if inputs containing quotes or script tags are interpolated into HTML attributes.
**Prevention:** Always use `app.escapeHtml()` or similar sanitization functions when interpolating user-controlled variables into `innerHTML` strings.
