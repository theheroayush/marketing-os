## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-10-01 - Fix XSS Vulnerabilities in DOM Insertion
**Vulnerability:** User-controlled message content and chat history summaries were inserted directly into the DOM using template literals and `innerHTML` without proper HTML entity encoding for `&`, `"`, and `'`, exposing the application to Cross-Site Scripting (XSS).
**Learning:** Even when basic tags like `<` and `>` are replaced (or a crude regex strips tags), failing to properly encode quotes and ampersands allows attackers to break out of attributes or leverage other contexts, especially in markdown parsers or snippet previews.
**Prevention:** Always use a comprehensive HTML escaping function (like `app.escapeHtml`) that handles all special characters (`&`, `<`, `>`, `"`, `'`) before inserting any untrusted content into `innerHTML` or within markdown parsers.
