## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-24 - [HIGH] Fix XSS Vulnerabilities in UI Rendering
**Vulnerability:** User inputs such as `searchQ`, `projectName`, and truncated message previews (`s.messages[...]`) were injected directly into the DOM via `innerHTML` without HTML escaping. This could lead to Stored and Reflected XSS vulnerabilities if malicious data was entered. Additionally, relying solely on regex (`/<[^>]*>/g`) to strip tags from messages is insufficient because malformed HTML tags can bypass the regex and execute scripts when injected.
**Learning:** Using regular expressions to strip HTML from user-generated content does not guarantee XSS protection against malformed payloads. All user data, including data that has been regex-stripped or sliced, must be explicitly escaped before insertion into `innerHTML`.
**Prevention:** Consistently wrap all user-controlled variables (e.g., search queries, project names) and any regex-filtered text with a dedicated HTML escaping function (`app.escapeHtml`) in template literals before DOM rendering.
