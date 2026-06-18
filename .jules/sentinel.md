## 2024-05-18 - Missing HTML Escaping in Template Literals
**Vulnerability:** Several places in `app.js` render dynamic string variables like `searchQ`, `s.messages[s.messages.length - 1].content`, `projectName`, `s.name`, `s.tagline`, and `s.skillName` inside innerHTML via template literals without applying `app.escapeHtml()`.
**Learning:** This exposes the application to both Reflected (e.g., search queries) and Stored (e.g., session history, project names) Cross-Site Scripting (XSS) vulnerabilities because user inputs are evaluated directly as HTML.
**Prevention:** Always wrap dynamically interpolated string variables—whether derived from LocalStorage or direct user input—in an escaping function like `app.escapeHtml()` when assigning to `innerHTML`.
