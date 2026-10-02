## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** Messages and markdown content rendered dynamically did not fully escape HTML entities (e.g. `&`, `'`, `"`), allowing potential XSS payloads to execute or break attributes when injected into the DOM.
**Learning:** In vanilla JavaScript apps relying on `innerHTML` for dynamic content rendering, partial HTML escaping (only `<` and `>`) is insufficient to prevent XSS. Escaping must be comprehensive and order-dependent (`&` first).
**Prevention:** Always ensure comprehensive string escaping covering `&`, `<`, `>`, `"`, and `'` is consistently applied before user inputs are interpolated and assigned to `innerHTML` or rendered as markdown.
