const assert = require('assert');
const parseMd = require('../markdown.js');

console.log('Running parseMd tests...');

// 1. Empty/null input
assert.strictEqual(parseMd(''), '');
assert.strictEqual(parseMd(null), '');
assert.strictEqual(parseMd(undefined), '');
console.log('✓ Passed: Empty/null input');

// 2. HTML escaping
assert.strictEqual(parseMd('<script>'), '&lt;script&gt;');
assert.strictEqual(parseMd('Check > this'), 'Check &gt; this');
console.log('✓ Passed: HTML escaping');

// 3. Bold text
assert.strictEqual(parseMd('**bold**'), '<strong>bold</strong>');
assert.strictEqual(parseMd('Some **bold** text'), 'Some <strong>bold</strong> text');
assert.strictEqual(parseMd('**bold** and **more bold**'), '<strong>bold</strong> and <strong>more bold</strong>');
console.log('✓ Passed: Bold text');

// 4. Inline code
assert.strictEqual(parseMd('`code`'), '<code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">code</code>');
assert.strictEqual(parseMd('Use `npm test` to run tests'), 'Use <code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">npm test</code> to run tests');
console.log('✓ Passed: Inline code');

// 5. Newlines
assert.strictEqual(parseMd('Line 1\nLine 2'), 'Line 1<br>Line 2');
assert.strictEqual(parseMd('Line 1\nLine 2\nLine 3'), 'Line 1<br>Line 2<br>Line 3');
console.log('✓ Passed: Newlines');

// 6. Combined cases
assert.strictEqual(parseMd('**Bold** and `code` with <tags>\non new line'), '<strong>Bold</strong> and <code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">code</code> with &lt;tags&gt;<br>on new line');
console.log('✓ Passed: Combined cases');

console.log('All parseMd tests passed!');
