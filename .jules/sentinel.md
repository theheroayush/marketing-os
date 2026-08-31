## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-04-15 - Prevent XSS in History and Search Views
**Vulnerability:** The application was vulnerable to Stored XSS in the history list and Reflected XSS in the skills search bar. Unsanitized search queries (`searchQ`) and raw user chat messages were directly injected via `innerHTML` into the DOM.
**Learning:** Slicing or stripping strings containing incomplete HTML tags (e.g., `replace(/<[^>]*>/g, '')`) before injecting them into `innerHTML` can inadvertently create bypass vectors if the stripped string leaves a trailing unescaped attribute or tag structure.
**Prevention:** Always apply the global `app.escapeHtml` function *after* slicing operations (not before, to prevent mid-entity cuts) and consistently wrap all dynamically injected state variables, such as search input values, prior to DOM insertion.
