## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-10-06 - [HIGH] Fix Stored XSS in History View Snippets
**Vulnerability:** The application stripped HTML tags from chat history snippets using `/<[^>]*>/g` before injecting them via `innerHTML`, but failed to escape HTML entities. An attacker could bypass the tag stripping regex by omitting the closing `>` character (e.g., `<img src=x onerror=alert(1) `), leading to Stored XSS.
**Learning:** Stripping HTML tags using regex without proper HTML entity escaping is flawed. Malformed tags that lack closing brackets will evade the regex and be executed by the browser when inserted into `innerHTML`.
**Prevention:** Always sanitize untrusted HTML content by first stripping tags and then properly escaping the remaining string using a utility like `app.escapeHtml()`.
