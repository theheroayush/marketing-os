## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-08-04 - [HIGH] Fix Stored and Reflected XSS in UI rendering
**Vulnerability:** User inputs and chat history texts were interpolated into the DOM (e.g. `value="${searchQ}"` and history view) without proper HTML escaping, allowing for XSS payloads to execute.
**Learning:** In vanilla JavaScript with `innerHTML` rendering, text that is stripped of HTML tags using regex and sliced can still contain unescaped characters (like quotes) that break out of attributes. It must be explicitly escaped afterwards.
**Prevention:** Always use a utility function like `app.escapeHtml()` on all dynamic, user-controlled data before it is rendered, even if tags were previously stripped.
