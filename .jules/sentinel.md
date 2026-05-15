## 2026-05-15 - [XSS via Search Query Rendering]
**Vulnerability:** The user-controlled variable `searchQ` was directly interpolated into the `value` attribute of the skills-search input field without any escaping (`<input ... value="${searchQ}">`).
**Learning:** Even though search queries often seem benign, interpolating them unescaped back into template literals in a client-side routing environment creates a textbook Reflected/Stored XSS vector, especially when state is preserved globally.
**Prevention:** Always use dedicated escaping functions (like the internal `app.escapeHtml`) whenever inserting any dynamic strings into HTML templates, regardless of the expected content type.
