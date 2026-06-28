## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-10-24 - [HIGH] Fix XSS via Bypassed Regex HTML Stripping
**Vulnerability:** Chat message previews and markdown parsing used naive replacements (`.replace(/<[^>]*>/g, '')` and `.replace(/</g, "&lt;")`) which could be bypassed by malformed tags, allowing Stored XSS when rendered via `innerHTML`.
**Learning:** Naive regex replacements are insufficient for removing HTML tags securely, as they fail to account for malformed HTML or unclosed tags parsed by the browser.
**Prevention:** Always use robust HTML escaping utility functions (e.g., `app.escapeHtml()`) on text to neutralize potentially dangerous characters before rendering.
