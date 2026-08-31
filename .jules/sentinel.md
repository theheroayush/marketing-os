## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-08-31 - XSS Mitigation Order in Truncated Previews
**Vulnerability:** XSS vulnerability in UI preview due to incomplete mitigation. Relying solely on replace(/<[^>]*>/g, '') to strip HTML tags is insufficient.
**Learning:** To mitigate XSS in truncated UI previews, operations must be performed in the exact order: strip tags, truncate/slice, and then escape (e.g., app.escapeHtml(str.replace(/<[^>]*>/g, '').slice(0, 120))) to prevent slicing HTML entities (like &quot;), which causes UI regressions or bypasses.
**Prevention:** Use a robust HTML escaping utility combined with strip and truncate in the exact order.
