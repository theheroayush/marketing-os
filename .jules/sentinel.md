## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-04-24 - [HIGH] Fix XSS in Skills Search Input
**Vulnerability:** The search query (`searchQ`) was injected directly into the DOM via `innerHTML` without sanitization, allowing for Cross-Site Scripting (XSS).
**Learning:** In vanilla JS components utilizing template literals for rendering, all user input (even transient state like search queries) must be explicitly passed through `app.escapeHtml()` to prevent injection.
**Prevention:** Always escape dynamic user data before rendering it to the DOM using `innerHTML`.
