const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// It seems line 468 is bad. Let's find exactly what happened.
// It looks like `// MarkU Marketing Skills App` was overwritten on top of `  }`
// Wait, looking at the top of the file:
// `// MarkU Marketing Skills App - Main Application Logic` is at the top.
// Then there is a duplicate around line 468!

// Let's replace the corrupted part.
// The good part is from `// MarkU Marketing Skills App - Main Application Logic` at the beginning.
// Then `renderDashboard` was modified and it inserted another copy of the beginning of the file.

const marker = "  } Skills App - Main Application Logic";
const markerIndex = code.indexOf(marker);

if (markerIndex !== -1) {
    console.log("Found corrupted marker");
    const badTextStart = markerIndex + 3; // Start from `Skills App - Main Application Logic`
    const storageStart = code.indexOf("  const Storage = {", badTextStart);

    if (storageStart !== -1) {
        console.log("Found Storage marker");
        const correctCode = code.substring(0, badTextStart) + '\n\n' + code.substring(storageStart);
        fs.writeFileSync('app_fixed.js', correctCode);
        console.log("Fixed code written to app_fixed.js");
    }
}
