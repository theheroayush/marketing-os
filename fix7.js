const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// I think the best way is to only fix the corrupted part inside `renderDashboard` where it was injected via bash script.
// The issue is around line 280 to 500.
// Let's manually reconstruct the file.

const marker = '} Skills App - Main Application Logic';
const idx1 = code.indexOf(marker);

const beforeCorrupt = code.substring(0, idx1 + 1);
const afterCorrupt = code.substring(code.indexOf('  function renderSkillsHub', idx1));

// Now, in `beforeCorrupt`, fix the bad escape sequences injected by bash.
let fixedBefore = beforeCorrupt.replace(/\\\`/g, "`").replace(/\\\$/g, "$");

const finalCode = fixedBefore + '\n\n' + afterCorrupt;
fs.writeFileSync('app_fixed5.js', finalCode);
