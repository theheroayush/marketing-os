## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-06-27 - Insufficient XSS Protection via Regex
**Vulnerability:** The application attempted to sanitize user messages in the history view using a naive regex replacement (`.replace(/<[^>]*>/g, '')`) before rendering via `innerHTML`.
**Learning:** Naive regex replacements are insufficient for XSS protection because they can be bypassed using malformed or unclosed tags (e.g., `<img src=x onerror=alert(1) //`).
**Prevention:** Always use robust HTML escaping utility functions (e.g., `app.escapeHtml()`) even when attempting to strip tags, ensuring all HTML entities are safely encoded.
