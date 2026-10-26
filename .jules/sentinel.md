## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-16 - [HIGH] Fix Stored XSS in Markdown Parser
**Vulnerability:** Markdown content parsed via the `parseMd` function in `app.js` was not being properly sanitized before being converted to HTML and injected into the DOM via `innerHTML`. The naive character replacements (`<` and `>`) were insufficient to prevent XSS payloads like `<img src=x onerror=alert(1)>` from executing.
**Learning:** Custom markdown parsing combined with `innerHTML` injection creates high-risk XSS vulnerabilities if robust HTML escaping is not applied to the source text before processing markdown tags.
**Prevention:** Always use the robust, comprehensive `app.escapeHtml` utility on user-provided strings before any markdown parsing logic that will output HTML strings to be inserted into the DOM.
