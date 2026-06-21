## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2025-05-18 - XSS in HTML string injection
**Vulnerability:** XSS from unescaped user input (search query, user messages, project name) passed into `innerHTML`.
**Learning:** Even internal app state derived from user input or LocalStorage must be safely escaped before being rendered via `innerHTML`. In `app.js`, `searchQ` and `projectName` were vulnerable because they weren't passed through `app.escapeHtml`. Also, when dealing with partial text rendering, escaping must be done *after* string manipulations like `.slice()`, otherwise HTML entities might get truncated, leading to malformed UI.
**Prevention:** Always use `app.escapeHtml()` when generating HTML strings via template literals before assigning them to `innerHTML`.
