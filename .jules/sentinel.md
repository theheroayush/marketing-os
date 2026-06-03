## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2025-05-24 - [Template Literal XSS in Vanilla JS DOM Updates]
**Vulnerability:** Found pervasive Stored and Reflected XSS vulnerabilities across the application where dynamic variables (from localStorage and inputs) were injected directly into HTML via template literals (e.g., `innerHTML = \`<div>\${searchQ}</div>\``).
**Learning:** Developers frequently assume template literals safely encode variables, or they attempt to write simple regex scrubbers (like `.replace(/<[^>]*>/g, '')`) which fail to catch unclosed tags (e.g., `<img src=x onerror=alert(1)`).
**Prevention:** Always enforce the use of a dedicated HTML escaping utility function (like `app.escapeHtml()`) for ALL variable interpolations inside template literals used for raw DOM generation (`innerHTML`). Do not rely on ad-hoc regex sanitation.
