## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-08-24 - [HIGH] Fix XSS in Truncated UI Previews
**Vulnerability:** Chat messages preview in the history view were truncated before HTML escaping, which could slice HTML entities in half, causing UI regressions or bypassing XSS filters.
**Learning:** When mitigating XSS in truncated UI previews, operations must be performed in the exact order: strip tags, truncate/slice, and then escape. This prevents the slicing of HTML entities.
**Prevention:** Always apply `app.escapeHtml` after truncation (e.g., `app.escapeHtml(str.replace(/<[^>]*>/g, '').slice(0, 120))`) rather than before or omitting it entirely.
