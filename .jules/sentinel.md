## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-24 - XSS Vulnerability in innerHTML
**Vulnerability:** Unsanitized dynamic user data (search queries and chat previews) was interpolated directly into `innerHTML` string literals.
**Learning:** Even when `app.escapeHtml` is defined, it can be missed for certain variables. Truncating UI previews before escaping is crucial to avoid breaking HTML entities, which can happen if you slice a string after escaping it.
**Prevention:** Always wrap user-controlled dynamic input interpolated into `innerHTML` with `app.escapeHtml()`. When mitigating XSS on truncated text, strip tags, slice/truncate, then escape in that exact sequence.
