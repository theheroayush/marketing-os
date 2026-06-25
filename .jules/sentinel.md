## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix Reflected and Stored XSS in app.js
**Vulnerability:** User inputs (`searchQ` and `projectName`) were directly injected into DOM string templates using `innerHTML` without prior sanitization. This allowed for Cross-Site Scripting (XSS).
**Learning:** In vanilla JavaScript apps utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix CI build failure by upgrading Node version and adding Capacitor Android platform
**Vulnerability:** The CI pipeline was failing because Capacitor CLI requires Node.js >= 22, but the workflow used Node 20. Additionally, the `android` platform directory wasn't initialized before syncing.
**Learning:** CI failures can block security patches and updates from being deployed. Keeping build pipelines functional is crucial.
**Prevention:** Ensure CI runners use the correct Node.js version and initialize platforms correctly.
