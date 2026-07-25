## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like profile names (`p.name`) and team member emails (`email`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Stored Cross-Site Scripting (XSS) if malicious payloads are saved in local storage.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - [HIGH] Fix Stored XSS via HTML Escaping
**Vulnerability:** User inputs like search queries (`searchQ`) and project names (`projectName`) were being injected directly into the DOM via `innerHTML` without sanitization. This allows for Cross-Site Scripting (XSS) if malicious payloads are saved in local storage or entered into the search bar.
**Learning:** In vanilla JavaScript applications utilizing template literals with `innerHTML` for rendering, failing to sanitize untrusted user data exposes the application to serious XSS vulnerabilities.
**Prevention:** Always implement and enforce a global HTML escaping utility function (e.g., `app.escapeHtml`) to sanitize any dynamic, user-controlled data before it is rendered to the DOM using `innerHTML`.
## 2024-05-18 - Resolve CI pipeline deprecation and initialization issues
**Vulnerability:** The GitHub Actions workflow was configured with an outdated Node.js version (Node 20), which is deprecated for GitHub runners, and the workflow failed to initialize the Capacitor Android platform before attempting to sync it.
**Learning:** CI pipelines must stay up-to-date with underlying runner requirements, and Capacitor workflows must explicitly initialize a platform using `cap add <platform>` before `cap sync` can succeed on clean checkouts.
**Prevention:** Ensure that `.github/workflows` specify LTS versions (e.g., `node-version: 22`) and correctly sequence `npx cap add` before `npx cap sync`.
