## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix XSS in search and report rendering
**Vulnerability:** User inputs like `searchQ` and `projectName` were directly interpolated into `innerHTML` strings during UI rendering. `searchQ` directly captures user input (`e.target.value`), making the application susceptible to Reflected XSS when the UI re-renders the input value. `projectName` relies on user-supplied configuration and introduces a Stored XSS vulnerability in report exports.
**Learning:** Any variable injected into a template literal assigned to `innerHTML` must be escaped, even if it seems benign or derived from application state (like the current search filter).
**Prevention:** Always wrap dynamically interpolated values within `innerHTML` block with an HTML escaping utility function (e.g. `app.escapeHtml()`). Avoid using `innerHTML` where `textContent` or value assignment (`input.value = `) suffices.
