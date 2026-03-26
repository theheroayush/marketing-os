const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const marker = '} Skills App - Main Application Logic';
const idx1 = code.indexOf(marker);
if (idx1 !== -1) {
    console.log("Found corrupted marker");
    const badTextStart = idx1 + 2; // start of 'Skills App...'

    // We want to keep everything up to idx1 + 1, which is `}`.
    // That finishes `renderDashboard()`.

    // Now we need to find what function comes after `renderDashboard()` in the original file.
    // It's probably `renderSkillsHub()`.
    const p2_start = code.indexOf('  function renderSkillsHub', badTextStart);
    if (p2_start !== -1) {
        console.log("Found function renderSkillsHub at", p2_start);
        const correctCode = code.substring(0, badTextStart) + '\n\n' + code.substring(p2_start);
        fs.writeFileSync('app_fixed3.js', correctCode);
    } else {
        console.log("renderSkillsHub not found after the corrupted marker.");
    }
}
