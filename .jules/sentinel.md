## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix XSS vulnerabilities in search and history preview
**Vulnerability:** Untrusted user input in search queries and AI session messages were improperly injected into the DOM, creating XSS vulnerabilities.
**Learning:** Even when stripping tags or using attributes, dynamic user input must always be explicitly HTML-escaped. Also, truncation before escaping is critical to avoid slicing HTML entities in half, which creates invalid HTML or bypasses filtering.
**Prevention:** Always use a global escaping function (e.g., `app.escapeHtml`) for user inputs in `innerHTML` templates. Ensure the strict order of operations: strip tags, truncate/slice, and then escape.
