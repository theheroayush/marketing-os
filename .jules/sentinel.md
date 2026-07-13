## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-07-13 - XSS Vulnerability in History View
**Vulnerability:** XSS vulnerability caused by naive regex tag stripping `.replace(/<[^>]*>/g, '')` in the history view truncated preview.
**Learning:** Naive regex tag stripping is insufficient as it can be bypassed by unclosed or malformed tags (e.g., `<img src=x onerror=alert(1) //`). It also must be performed before escaping to avoid truncating HTML entities mid-way.
**Prevention:** Always use robust HTML escaping utility functions (e.g., `app.escapeHtml()`) and perform operations in the correct order: strip tags, slice/truncate, then escape.
