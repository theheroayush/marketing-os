## 2026-09-02 - XSS in Truncated Previews
**Vulnerability:** The application uses `.replace(/<[^>]*>/g, '')` to strip HTML tags from message content before displaying truncated previews, but this doesn't protect against malformed HTML tags.
**Learning:** Using regex to strip HTML tags is insufficient for XSS protection, as malformed tags (e.g. unclosed tags) or special characters can still be injected and executed.
**Prevention:** Always use robust HTML escaping functions (like `app.escapeHtml`) even after stripping tags, especially before rendering dynamic content into HTML.
