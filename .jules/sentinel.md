## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in History/Recent Sessions via innerHTML
**Vulnerability:** The session history view in `app.js` injected properties like `s.skillName` and `s.messages[...].content` directly into the DOM using template literals via `innerHTML` without sanitization. Although `s.messages[...].content` was run through a regex (`/<[^>]*>/g`) to strip tags, this is notoriously brittle and vulnerable to bypasses.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML`, relying solely on regex for tag stripping is insufficient to prevent XSS. All dynamic, untrusted user data—even partially sanitized strings—must be fully HTML-escaped before DOM injection.
**Prevention:** Consistently apply robust HTML escaping utility functions (e.g., `app.escapeHtml`) to all dynamic variables within template literals rendered via `innerHTML`, rather than trusting brittle regex operations.
