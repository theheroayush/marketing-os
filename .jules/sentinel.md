## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-24 - [HIGH] Fix additional XSS via HTML Escaping
**Vulnerability:** Additional unescaped user inputs were discovered injected directly into the DOM via `innerHTML`. These variables include `searchQ` (skills search input) and `projectName` (in the generated MarkU Report header). Leaving these unsanitized opens the application to Reflected and Stored Cross-Site Scripting (XSS).
**Learning:** Even with an escaping function in place, developers must be extremely diligent to apply it to *every* piece of user-controllable data that enters an `innerHTML` template. Specifically, variables holding derived state from user input (like search strings) or complex objects (like profile project names) are easily overlooked.
**Prevention:** Establish a rigorous review process for any use of template literals within `innerHTML` to ensure all dynamic variables are wrapped in the application's sanitization utility (e.g., `app.escapeHtml`). Consider automated linting rules to enforce this if possible.
