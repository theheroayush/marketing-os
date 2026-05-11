## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-24 - Cross-Site Scripting (XSS) in LocalStorage Parsing
**Vulnerability:** XSS vulnerability where non-escaped object identifiers (`p.id`) and dynamic names (`projectName`) retrieved from LocalStorage were rendered directly into HTML.
**Learning:** Even variables that aren't strictly meant for display (like IDs in a `<select>` drop-down) or are thought to be controlled (like project titles) can be attack vectors if they originate from unvalidated local storage.
**Prevention:** All data fetched from external states or data stores (including LocalStorage) must be systematically escaped using a function like `app.escapeHtml` before rendering into the DOM, particularly when dealing with innerHTML.
