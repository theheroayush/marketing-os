## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-08-29 - [HIGH] Fix XSS in truncated UI previews
**Vulnerability:** Truncated UI previews relied solely on regex (`replace(/<[^>]*>/g, '')`) to strip tags, allowing malformed executable HTML to bypass mitigation and cause Stored XSS.
**Learning:** To mitigate XSS in truncated UI previews, operations must be performed in the exact order: strip tags, truncate/slice, and then escape. Slicing after escaping can split HTML entities, causing UI regressions or bypasses.
**Prevention:** Always combine regex tag stripping with a robust HTML escaping utility (e.g., `app.escapeHtml`), ensuring escaping is the final step after truncation.
