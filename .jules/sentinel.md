## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-06-09 - [HIGH] Fix additional XSS vectors via innerHTML
**Vulnerability:** User inputs like search queries (`searchQ`), profile names (`projectName`), and message contents were being injected unescaped into `innerHTML` in `renderSkillsHub()`, `exportPDF()`, and history views, allowing for XSS if malicious input is entered or saved.
**Learning:** Even internal variables populated by user input (like search strings or derived profile names) must be escaped when rendered via `innerHTML` templates. When truncating text that will be escaped, truncation must happen *before* escaping to prevent malformed HTML entities.
**Prevention:** Apply the global `app.escapeHtml` function to all dynamic user-controlled data embedded in `innerHTML` strings, not just obvious fields.
