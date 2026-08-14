## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2024-05-18 - [HIGH] Fix Stored XSS in History View via HTML Escaping
**Vulnerability:** The AI chat message history view retrieved the most recent message's text, stripped HTML tags using a weak regular expression (`/<[^>]*>/g`), and then injected the resulting text into the DOM via `innerHTML` without proper entity encoding. This allowed for Stored Cross-Site Scripting (XSS) if the regex check was bypassed (e.g., using unclosed tags or attributes).
**Learning:** In applications rendering user-generated content (like AI output which may reflect malicious input), stripping tags alone is insufficient to prevent XSS. Operations must be strictly ordered to prevent slicing from breaking encoded entities.
**Prevention:** To mitigate XSS in truncated UI previews, the correct order of operations is: 1) Strip tags, 2) Truncate/slice, 3) Escape entities via `app.escapeHtml`. Applying escaping after truncation ensures that HTML entities are not partially cut off, preventing XSS while keeping the UI intact.
