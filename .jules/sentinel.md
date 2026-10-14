## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## $(date +%Y-%m-%d) - [HIGH] Fix Stored XSS via HTML Escaping in parseMd
**Vulnerability:** The `parseMd` function in `app.js` implemented weak, ad-hoc sanitization by only replacing `<` and `>` characters, failing to escape `&`, `"`, or `'`. This could allow XSS if user-controlled markdown was injected into attributes or context where other characters matter.
**Learning:** Manual regex replacements for HTML escaping are notorious for missing edge cases.
**Prevention:** Always rely on a robust, centralized HTML escaping utility (like `app.escapeHtml`) to sanitize input comprehensively before applying further text transformations like Markdown parsing.
