## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-28 - [HIGH] Prevent Stored XSS in Markdown Parser
**Vulnerability:** The `parseMd` function used to render chat messages did not escape `&`, `"`, and `'` characters. If an attacker controlled the input, they could inject malicious attributes or manipulate entities, potentially leading to Stored XSS.
**Learning:** Naive string replacements for HTML escaping are dangerous if they do not cover all sensitive characters (`<`, `>`, `&`, `"`, `'`). Additionally, the order of replacement matters: `&` must be escaped first to prevent double-escaping other entities.
**Prevention:** Always escape the full set of HTML special characters (`&`, `<`, `>`, `"`, `'`) when writing custom Markdown parsers or sanitization utilities, and ensure `&` is escaped first.
