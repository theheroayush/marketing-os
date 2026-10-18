## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2026-09-10 - Prevent XSS in UI Rendering via innerHTML
**Vulnerability:** User inputs like `config.title`, `searchQ`, and `projectName` were injected directly into the DOM via `innerHTML` without sanitization, leading to Stored XSS vulnerabilities.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## $(date +%Y-%m-%d) - [HIGH] HTML Entity Truncation Bug
**Vulnerability:** Truncating a string using \`.slice()\` after passing it through an HTML escaping function (\`app.escapeHtml\`) can split HTML entities in half (e.g., \`&lt;\` becomes \`&l\`), causing broken rendering, and leads to premature truncation because escaping inflates the string length.
**Learning:** Operations that calculate or limit string length must be performed on the raw, unescaped string *before* any HTML escaping is applied.
**Prevention:** Always structure data sanitization pipelines as: 1) structural modification (e.g., regex strip tags), 2) length truncation (e.g., \`.slice()\`), and 3) HTML entity escaping (e.g., \`app.escapeHtml()\`) as the final step before DOM insertion.
