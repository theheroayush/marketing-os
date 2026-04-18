## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-04-18 - [HIGH] Fix XSS in skills search
**Vulnerability:** In `app.js`, within the `renderSkillsHub` function, the `searchQ` variable was directly interpolated into the DOM via `innerHTML` without HTML escaping, specifically in the `value="${searchQ}"` attribute of the search input field.
**Learning:** Reflected XSS vulnerabilities can occur when user input (like a search query) is stored in a JavaScript variable and subsequently used to render DOM elements using template literals.
**Prevention:** Always wrap variables containing user-controllable input with `app.escapeHtml()` when constructing strings for `innerHTML`, even for attributes like `value` in input tags.
