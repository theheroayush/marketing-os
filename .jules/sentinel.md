## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-08-15 - XSS in Truncated Previews
**Vulnerability:** XSS via incomplete HTML tags during content truncation.
**Learning:** Operations must be performed in the exact order: strip tags, truncate/slice, and then escape to prevent UI regressions and bypasses.
**Prevention:** Ensure user-controlled content is always escaped after truncation or HTML tag stripping.
