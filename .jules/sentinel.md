## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.

## 2026-06-06 - [HIGH] Fix XSS Vulnerability in Search and PDF Export Views
**Vulnerability:** User inputs like `searchQ` and `projectName` were rendered in secondary states/views without being properly HTML-escaped.
**Learning:** Global utility functions like `app.escapeHtml` must be uniformly applied to all dynamic data embedded via `innerHTML`, not just within primary lists or text inputs. Secondary UI components or dynamically generated documents can still harbor severe XSS.
**Prevention:** Ensure string templates assigning content to `innerHTML` are systematically audited to guarantee that every placeholder variable containing untrusted data is wrapped in `app.escapeHtml`.
