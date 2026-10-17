## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-10-17 - [HIGH] Fix XSS vulnerability in parseMd function
**Vulnerability:** The `parseMd` function in `app.js` was used to parse text to HTML using string replacements. It was vulnerable to XSS due to not escaping `&` before escaping `<` and `>`. If an attacker input something like `&lt;script&gt;alert(1)&lt;/script&gt;`, the `&` wouldn't be escaped, leaving the string as `&lt;script&gt;alert(1)&lt;/script&gt;`, which the browser could misinterpret or if it was decoded, might execute.
**Learning:** When implementing custom HTML escaping or markdown parsing via string replacements, always escape the `&` character first before `<`, `>`, `"`, and `'` to prevent double-escaping previously converted HTML entities or leaving malicious payloads intact.
**Prevention:** Use established sanitization libraries when possible, or strictly follow the correct order of escaping HTML entities (`&` must be first).
