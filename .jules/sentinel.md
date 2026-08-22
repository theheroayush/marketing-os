## 2026-08-22 - Prevent XSS in search input via DOM interpolation
**Vulnerability:** User-controlled input (`searchQ`) was directly interpolated into the `value` attribute of a search input field via `innerHTML` without escaping, enabling Cross-Site Scripting (XSS).
**Learning:** In vanilla JS applications using template literals to generate HTML, data bound to attributes must be escaped just as strictly as data rendered into the DOM text. The `app.escapeHtml()` utility was already available but overlooked in this specific input.
**Prevention:** Always wrap dynamic variables interpolated into HTML attributes within `innerHTML` template strings with `app.escapeHtml()` or similar sanitization functions.
## 2026-08-22 - Fix CI failure related to Node version and Capacitor
**Vulnerability:** CI was failing because Capacitor CLI requires Node >= 22.0.0 and the `npx cap sync android` command failed because the android platform had not been added.
**Learning:** Capacitor CLI updates often bring new Node.js version requirements that break older workflows. Additionally, platform synchronization requires the platform to be explicitly added beforehand.
**Prevention:** Ensure CI workflows are updated to match the required Node.js versions specified by new dependencies, and always add target platforms before syncing in CI.
