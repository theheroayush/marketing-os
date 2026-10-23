## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-11-20 - Prevent Stored XSS with Truncation in Dashboard/History
**Vulnerability:** Untrusted session data stored in localStorage (`s.skillEmoji`, `s.skillName`, and last message `content`) was injected into `innerHTML` without HTML escaping in the dashboard and history views, creating Stored XSS risks.
**Learning:** When mitigating XSS by stripping tags via regex (`.replace(/<[^>]*>/g, '')`) and truncating (`.slice(0, 120)`), you must apply the stripping and truncation *before* running `app.escapeHtml()`. Otherwise, `app.escapeHtml` converts `<` to `&lt;` which bypasses the tag stripper, and `.slice()` might cut the escaped HTML entities (like `&quot;`) in half.
**Prevention:** Always ensure the sequence of sanitization for rendered strings is: Strip Tags (Regex) -> Truncate (Slice) -> Escape HTML (Entity conversion) -> Render to DOM.
