## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix Reflected and Stored XSS in UI and PDF report rendering
**Vulnerability:** User-controlled state variables (`searchQ` from the search bar and `projectName` from the user's active profile) were injected directly into the DOM and PDF report via `innerHTML` without HTML escaping, resulting in Reflected and Stored Cross-Site Scripting (XSS).
**Learning:** Application state values derived directly from user input (like search strings or profile names) remain dangerous and must not be trusted.
**Prevention:** Ensure that all dynamically interpolated state values within template strings assigned to `innerHTML` are passed through an escaping function (e.g., `app.escapeHtml`).
