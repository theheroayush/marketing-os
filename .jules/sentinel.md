## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-04-26 - Prevent XSS in template literals via escapeHtml
**Vulnerability:** XSS vulnerabilities in UI rendering where unescaped state variables (`searchQ`), regex-stripped HTML content (in `renderHistoryView`), and dynamic values (`projectName` in `exportPDF`) were directly injected into `innerHTML` via template literals.
**Learning:** State variables derived from LocalStorage or user input and regex-stripped content must still be escaped before injection into `innerHTML` because malformed tags can bypass regex, and directly concatenated variables can contain executable scripts.
**Prevention:** Always use `app.escapeHtml` explicitly when creating HTML strings with template literals for `innerHTML` rendering, even if the content appears "safe" (like stripped text or project names).
