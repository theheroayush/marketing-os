const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// The original file is severely messed up with duplicates. Let's find exactly what happened.
// The file seems to have the entire `app.js` pasted into the middle of `renderDashboard`?
// Let's locate the first `} Skills App - Main Application Logic`

const idx1 = code.indexOf('} Skills App - Main Application Logic');
if (idx1 !== -1) {
    const p1 = code.substring(0, idx1 + 1); // Up to the '}'
    const p2_start = code.indexOf('  function renderSkillsView', idx1);
    if (p2_start !== -1) {
        console.log("Found function renderSkillsView");
        const newCode = p1 + '\n\n' + code.substring(p2_start);
        fs.writeFileSync('app_fixed3.js', newCode);
    } else {
        console.log("renderSkillsView not found");
    }
}
