## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-14 - Inadequate XSS Protection Using Regex
**Vulnerability:** Found a Cross-Site Scripting (XSS) vulnerability in the History view where user-provided session messages were inserted directly into `innerHTML` after only undergoing a naive regex replacement (`.replace(/<[^>]*>/g, '')`).
**Learning:** Relying solely on regex replacement like `.replace(/<[^>]*>/g, '')` to strip HTML tags is insufficient for XSS mitigation because it fails to catch malformed but executable HTML.
**Prevention:** When injecting dynamic user data into HTML content via `innerHTML` within template literals, always sanitize the values using a robust HTML escaping utility (like `app.escapeHtml()`) to thoroughly mitigate Stored XSS vulnerabilities.
