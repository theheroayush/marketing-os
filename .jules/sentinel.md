## 2024-05-24 - [Template Literal XSS in innerHTML Assignments]
**Vulnerability:** User-controlled inputs like `searchQ` and `projectName` were being directly interpolated into template literals assigned to `innerHTML` without escaping.
**Learning:** In vanilla JavaScript applications using template literals for rendering, developers often forget to escape data variables, leading to widespread template-based Stored and Reflected XSS vulnerabilities.
**Prevention:** Always wrap dynamically interpolated variables within template literals with an HTML escaping function (like `app.escapeHtml()`) before assignment to `innerHTML`, and use automated linters like ESLint with security plugins to catch unescaped interpolations in `innerHTML` blocks.
