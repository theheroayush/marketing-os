## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-24 - HTML stripping with Regex can bypass XSS protections if malformed
**Vulnerability:** XSS vulnerability where user input containing malformed HTML tags bypassing regex-based stripping (e.g. `/<[^>]*>/g`) is injected directly into `innerHTML` without further escaping.
**Learning:** Regular expressions like `/<[^>]*>/g` used to strip HTML are easily bypassed if the closing `>` is omitted (e.g. `<img src=x onerror=alert(1) `). Stripped output still needs to be passed through an HTML escaper if rendered as innerHTML. When truncating, escaping must happen *after* `.slice()` to avoid breaking HTML entities (like turning `&quot;` into `&qu`).
**Prevention:** Always escape data right before it is injected into the DOM (e.g., using `app.escapeHtml()`), even if it was previously stripped of HTML via a regex.
