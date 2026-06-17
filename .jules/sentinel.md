## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping bypasses
**Vulnerability:** User inputs and generated content like `searchQ`, `s.messages[...].content`, and `projectName` were injected into the DOM via `innerHTML` without using `app.escapeHtml`. Specifically, using regex like `/<[^>]*>/g` to strip tags is insufficient because malformed tags (e.g. `<img src=x onerror=alert(1)`) bypass the regex but are executed by the browser when inserted via `innerHTML`.
**Learning:** Never rely solely on regex to strip HTML tags for security because browsers are extremely permissive with malformed HTML. Combining regex stripping with a robust HTML escaping function ensures edge cases and malformed tags do not result in Stored XSS.
**Prevention:** Always wrap any dynamic, user-controlled data in an HTML escaping utility function (e.g., `app.escapeHtml()`) before it is rendered to the DOM using `innerHTML`, even if the data was supposedly sanitized by regular expressions.
