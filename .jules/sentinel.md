## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-06-11 - [HIGH] Fix Reflected and Stored XSS in dynamic views
**Vulnerability:** User inputs like `searchQ`, category filters `c`, and chat session history `s.messages` snippets were injected directly into the DOM via `innerHTML` without sanitization, leading to Reflected and Stored Cross-Site Scripting (XSS) vulnerabilities.
**Learning:** Even when truncating strings (e.g. with `.slice()`), the result must be properly HTML escaped to avoid executing malicious scripts, and string truncation must happen before escaping to avoid malforming HTML entities.
**Prevention:** Always use a global sanitization function (e.g. `app.escapeHtml()`) on all user-controlled data embedded in template literals for `innerHTML`. And apply it after any string truncation logic.
## 2026-06-11 - [HIGH] Inline Event Handlers and HTML Entities
**Vulnerability:** Even when escaping variables (e.g. `app.escapeHtml(c)`), if the string is placed inside an inline event handler (like `onclick="..."`), the browser decodes HTML entities *before* executing the JavaScript. This means an escaped single quote `&\#039;` becomes `'` again, leading to XSS.
**Learning:** HTML entity escaping is not sufficient for protecting inline JavaScript event handlers.
**Prevention:** Avoid inline event handlers with dynamic data. Instead, store the escaped data in a `data-*` attribute (e.g. `data-category="${app.escapeHtml(c)}"`) and read it in the handler using `this.dataset.category`.
