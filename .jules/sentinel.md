## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-07-08 - XSS Mitigation on Truncated UI Previews
**Vulnerability:** XSS was possible via unclosed HTML tags in truncated chat message previews within the AI session history.
**Learning:** Naive regex replacements like `.replace(/<[^>]*>/g, '')` fail to strip unclosed tags (e.g., `<img src=x onerror=alert(1) //`). Furthermore, escaping before truncating can split HTML entities (like `&quot;`), causing UI rendering bugs.
**Prevention:** Always perform operations in the correct sequence: strip tags, slice/truncate, and finally escape (e.g., `app.escapeHtml(str.replace(...).slice(0, 120))`) before interpolating into the DOM.
