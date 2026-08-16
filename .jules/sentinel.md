## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix Further Stored XSS in History & Report Views
**Vulnerability:** User-controlled values such as `projectName`, `searchQ`, and session message content were being directly interpolated into `innerHTML` strings without HTML escaping in the `renderSkillsHub`, `renderHistory`, and `renderPrintReport` methods of `app.js`.
**Learning:** Even when core inputs are sanitized on initial load, dynamic user input rendered across different application views (like print reports, history previews, or search bars) must consistently have `app.escapeHtml` applied to avoid Stored XSS vectors that can bypass initial sanitization steps.
**Prevention:** Strictly verify that `app.escapeHtml` is applied to every instance of dynamic data interpolation within template literals assigned to `innerHTML`.
