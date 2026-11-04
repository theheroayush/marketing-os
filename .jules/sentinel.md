## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-10-24 - [HIGH] Prevent XSS via Regex Bypass & Correct String Operation Order
**Vulnerability:** A chat message preview used `.replace(/<[^>]*>/g, '').slice(0, 120)` inside an HTML template literal without HTML escaping. Malformed tags (e.g. `<<img src=x onerror=alert(1)>` or `<img src=x onerror=alert(1) `) could bypass the simple regex strip and be rendered into the DOM, leading to XSS.
**Learning:** Simple regex for HTML tag stripping is insufficient and easily bypassed. Furthermore, when applying `escapeHtml` alongside `.slice(0, N)`, escaping *before* slicing can split HTML entities (like `&lt;`) in half resulting in broken rendering or truncated strings.
**Prevention:** Always wrap untrusted content rendered via template literals with an HTML escape function (`app.escapeHtml`). Ensure that when truncating strings, slicing is applied *before* HTML escaping to prevent slicing through entity representations.
