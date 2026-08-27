## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-08-27 - Fix XSS Vulnerabilities in DOM Injection
**Vulnerability:** User-controlled inputs like search queries (`searchQ`), project names (`projectName`), and chat message contents were interpolated directly into the DOM via `innerHTML` without sanitization. This allows for Reflected and Stored Cross-Site Scripting (XSS).
**Learning:** In vanilla JavaScript, dynamically generating HTML with `innerHTML` is prone to XSS if inputs aren't explicitly escaped. Even when stripping tags with regex before truncating (e.g., for previews), the remaining string must still be escaped to prevent bypasses and UI regressions.
**Prevention:** Always use a global escaping utility (`app.escapeHtml`) to wrap any untrusted data before interpolation into `innerHTML`. For truncated previews, follow the exact order: strip tags, truncate, and then escape.
