## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-28 - [HIGH] Fix XSS Vulnerability in innerHTML Interpolation
**Vulnerability:** User inputs like `config.title`, `searchQ`, `projectName`, and profile IDs (`p.id`) were being injected directly into the DOM via `innerHTML` template literals without HTML escaping.
**Learning:** In vanilla JavaScript apps utilizing template literals with `innerHTML` for rendering, any string interpolated into the literal that derives from user input, configuration, or local storage without explicit sanitization presents an XSS vulnerability vector.
**Prevention:** Systematically apply a global HTML escaping utility function (e.g., `app.escapeHtml`) to all dynamic, user-controlled data immediately before or during interpolation into `innerHTML` strings.
