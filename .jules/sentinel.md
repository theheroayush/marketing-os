## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-06-07 - [HIGH] Fix Stored XSS via Regex Bypass
**Vulnerability:** Message previews in the History view used a naive regex (`/<[^>]*>/g`) to strip tags before truncation. This could be bypassed using unclosed tags (e.g., `<img src=x onerror=alert(1)`), resulting in stored XSS when the string was rendered via `innerHTML`.
**Learning:** Regular expressions that attempt to strip HTML by matching opening and closing tags (like `>`) are inherently unsafe for sanitization because modern browsers auto-close malformed tags during DOM insertion.
**Prevention:** Never rely solely on regex for HTML stripping if the result will be rendered dynamically. Always pass the final truncated string through a robust HTML entity encoder (like `app.escapeHtml`) to neutralize any leftover tags or attributes.
