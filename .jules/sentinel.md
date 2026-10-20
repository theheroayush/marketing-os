## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-10-20 - [HIGH] Prevent XSS Bypass via Malformed Tags
**Vulnerability:** Untrusted message content in the History View was being sanitized exclusively by stripping HTML tags with a regex (`/<[^>]*>/g`) and injected into the DOM via `innerHTML`. A malformed HTML tag without a closing bracket (e.g., `<img src=x onerror=alert(1)`) bypasses the regex, leaving the payload intact, which the browser's parser then executes.
**Learning:** Regex-based tag stripping is notoriously brittle and easily bypassed by malformed tags. When a vulnerability like this is coupled with direct DOM injection (e.g., `innerHTML`), it leads to severe Stored XSS.
**Prevention:** Always wrap untrusted content in a robust HTML escaping function (e.g., `app.escapeHtml()`) before rendering it to the DOM. If content must also be stripped or truncated, ensure those operations occur *before* escaping to prevent inadvertently splitting HTML entities or missing unescaped malformed tags.
