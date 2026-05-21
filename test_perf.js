const str = '<div class="test">& \'test\'</div>'.repeat(100);

console.time('old');
for (let i = 0; i < 10000; i++) {
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
console.timeEnd('old');

const escapeChars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;'
};
console.time('new');
for (let i = 0; i < 10000; i++) {
  String(str).replace(/[&<>"']/g, m => escapeChars[m]);
}
console.timeEnd('new');
