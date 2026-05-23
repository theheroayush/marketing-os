## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-23 - [Unescaped Interpolation in innerHTML]
**Vulnerability:** Multiple XSS vulnerabilities found where unsanitized user-controlled variables (`searchQ`, `projectName`, `config.title`) were directly interpolated into template literals assigned to `innerHTML`.
**Learning:** Developers often forget that template literals (`\${var}`) assigned to `innerHTML` are not automatically sanitized, unlike React's JSX or Vue's curly braces. This codebase uses raw DOM manipulation with template strings, making it highly susceptible to XSS. Additionally, the custom `escapeHtml` function failed to sanitize valid falsy values like `0` because it used a loose truthiness check (`if (!str)`).
**Prevention:** Always wrap variables interpolated into `innerHTML` strings with a robust escaping function like `app.escapeHtml()`. Ensure custom escaping functions use strict type checking (`str === null || str === undefined`) to avoid accidentally skipping sanitization for valid falsy values.
