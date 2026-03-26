// Simple Markdown to HTML parser
function parseMd(text) {
  if (!text) return '';
  let html = text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">$1</code>');
  return html.replace(/\n/g, '<br>');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = parseMd;
}
