## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-30 - Stored & Reflected XSS in Template Literals
**Vulnerability:** User-controlled data (`searchQ`, `projectName`, and profile `id`) was directly embedded into `innerHTML` strings via template literals without being escaped, posing a risk of Stored and Reflected XSS. Additionally, the existing `escapeHtml` function incorrectly returned empty strings for valid values like `0` and `false`.
**Learning:** Even when a project has an `escapeHtml` utility, it is easily overlooked when using ES6 template literals. Furthermore, loose type checking (`if (!str)`) in utility functions can inadvertently corrupt valid falsy data, leading to UI bugs or missing content.
**Prevention:** Always verify that every dynamically injected value in template literals is explicitly wrapped in the escaping function. Ensure escape functions use strict equality checks (`!== null && !== undefined`) rather than truthiness to preserve all valid data types.
