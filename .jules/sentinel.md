## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - Fix XSS vulnerabilities in user input interpolation
**Vulnerability:** User input (`searchQ` and history preview snippet) was interpolated directly into the DOM using template literals, leading to potential Cross-Site Scripting (XSS).
**Learning:** Naive regex replacements like `.replace(/<[^>]*>/g, '')` for stripping HTML tags are insufficient and can leave entities unescaped. Always use a robust HTML escaping utility.
**Prevention:** Ensure all dynamic, user-controlled data is sanitized using `app.escapeHtml()` before interpolating it into DOM elements via `innerHTML`. When truncating UI previews, operations must follow the order: strip tags, slice/truncate, then escape to avoid truncating HTML entities midway.
