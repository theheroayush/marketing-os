## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-05-01 - XSS in History Preview
**Vulnerability:** A cross-site scripting (XSS) vulnerability was found in the session history preview (`app.js`). Malformed HTML tags (e.g., `<img src=x onerror=alert(1) `) bypassed the regex stripping `replace(/<[^>]*>/g, '')` because they lacked a closing bracket. The unescaped payload was then injected via `innerHTML`.
**Learning:** Regex-based HTML stripping is insufficient and often flawed, especially for malformed inputs. Truncation can further break valid HTML into malformed fragments that bypass regex.
**Prevention:** Always follow regex-based HTML stripping with a robust HTML escape function (`app.escapeHtml`) before injecting content into the DOM using `innerHTML` or template literals.
