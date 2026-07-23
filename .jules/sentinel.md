## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-24 - Cross-Site Scripting (XSS) in UI truncation
**Vulnerability:** Truncating HTML content with regex (`replace(/<[^>]*>/g, '')`) without escaping the output before inserting it into the DOM via `innerHTML` leads to XSS if malicious characters (like `&`, `<`, `>`, `"`, `'`) remain or if the truncation splits an HTML entity.
**Learning:** Truncation and basic tag stripping are not replacements for robust HTML escaping. Always escape content immediately before rendering it into the DOM.
**Prevention:** Ensure that dynamic, user-controlled data is strictly sanitized using a utility like `app.escapeHtml()` directly within the template literal before it is added via `innerHTML`. When combining truncation and escaping, strip tags, slice, and then escape.
