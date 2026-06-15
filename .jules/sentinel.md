## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping in exportPDF
**Vulnerability:** The `exportPDF` function dynamically inserted the active profile's `projectName` directly into `header.innerHTML` without escaping it. Since `projectName` originates from user input saved in local storage, this created a vector for Stored Cross-Site Scripting (XSS) when generating a report.
**Learning:** Even when building seemingly benign UI elements like print headers (`div.print-only`), any dynamic data inserted via `innerHTML` template literals must be sanitized, as these values often stem from previously stored user configurations.
**Prevention:** Always apply the global `app.escapeHtml` function to untrusted strings before appending them to the DOM via `innerHTML`, regardless of the element's purpose or visibility (e.g., print-only headers).
