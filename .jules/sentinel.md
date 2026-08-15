## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix XSS in UI rendering templates
**Vulnerability:** User inputs within attributes (e.g., `value="${searchQ}"`) and dynamically generated content like history message previews or `projectName` in template strings were not escaped. Additionally, using regex like `.replace(/<[^>]*>/g, '')` before escaping could still allow XSS if malformed tags bypass the regex but are then rendered directly.
**Learning:** Regex-based HTML stripping is insufficient and often flawed. When injecting dynamic content into HTML template literals, especially inside attributes or even after basic sanitization, it must always be correctly escaped.
**Prevention:** Always wrap dynamically generated HTML or text from variables (like `searchQ`, message content, or project names) with the global `app.escapeHtml` function, even if they have been previously sanitized with regex.
