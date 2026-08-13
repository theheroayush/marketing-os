## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-25 - XSS Vulnerability in Truncated UI Previews
**Vulnerability:** Cross-Site Scripting (XSS) in UI message previews and report headers via unescaped string interpolation.
**Learning:** Stripping HTML tags with regex before truncating can still leave malicious content if the result is not subsequently HTML-escaped. Furthermore, escaping must occur *after* truncation to avoid slicing HTML entities in half, which can cause UI regressions or bypasses.
**Prevention:** Always apply HTML escaping as the final step after sanitizing and truncating user-provided text for UI rendering.
