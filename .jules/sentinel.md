## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-10-15 - Prevent XSS in History View via Naive Regex Bypass
**Vulnerability:** The `History` view in `app.js` stripped HTML tags from chat snippets using a naive regex (`/<[^>]*>/g`) before rendering via `innerHTML`. Malformed HTML (e.g., `<<img src=x onerror=alert(1)>` or missing a closing bracket) bypasses this regex. When injected via `innerHTML`, the browser corrects the malformed HTML, executing the payload and causing a Stored XSS vulnerability.
**Learning:** Naive regex tag stripping (e.g., `/<[^>]*>/g`) is fundamentally flawed because it relies on well-formed HTML (specifically closing brackets). The browser's HTML parser will fix malformed tags when assigning to `innerHTML`, resulting in successful exploitation.
**Prevention:** Never rely solely on regex for HTML sanitization. Always wrap any regex-stripped output in a robust HTML escaping function (e.g., `app.escapeHtml()`) before rendering dynamic content via `innerHTML`.
