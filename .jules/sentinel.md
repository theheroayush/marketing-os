## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-08 - Prevent XSS in Print Export View
**Vulnerability:** The `projectName` variable, which is derived from user input (profile name), was being injected directly into the DOM via `innerHTML` without sanitization in the print export view (`app.exportPDF`).
**Learning:** Dynamic user data injected into HTML content via `innerHTML` within template literals, including off-screen elements like print or PDF export views, must always be sanitized to prevent Stored XSS vulnerabilities.
**Prevention:** Always sanitize dynamic user data using a global HTML escaping utility function (e.g., `app.escapeHtml`) before rendering it to the DOM using `innerHTML`.
