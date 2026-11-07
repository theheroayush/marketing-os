## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-10-27 - Fix Stored XSS via HTML Escaping on Truncated Content
**Vulnerability:** When saving user's chat message to history view in `app.js`, the code was stripping HTML tags and truncating the content but not escaping it: `content.replace(/<[^>]*>/g, '').slice(0, 120)`. This allows XSS payloads without HTML tags to bypass the regex, such as `<img src=x onerror=alert(1)` (missing closing bracket) which gets saved and injected into `innerHTML`.
**Learning:** Regex tag stripping (`/<[^>]*>/g`) is inadequate for XSS protection, especially if the string is truncated afterwards which might result in incomplete HTML tags.
**Prevention:** Always wrap untrusted input in robust HTML escaping (e.g. `app.escapeHtml()`) before injecting into the DOM, and perform the HTML escaping AFTER any slicing or truncation to avoid splitting entities or premature truncation.
