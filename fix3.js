const fs = require('fs');
let code = fs.readFileSync('app_fixed.js', 'utf8');
// Fix the escaped backtick `\`` and escaped `\${` inside the map.
// The code has `s => \`` instead of `s => \``
code = code.replace(/s => \\\`/g, "s => `");
code = code.replace(/\\\${s.id}/g, "${s.id}");
code = code.replace(/\\\${s.skillEmoji}/g, "${s.skillEmoji}");
code = code.replace(/\\\${s.skillName}/g, "${s.skillName}");
code = code.replace(/\\\${new Date\\(s.ts\\).toLocaleDateString\\(\\)}/g, "${new Date(s.ts).toLocaleDateString()}");
code = code.replace(/\\\${s.messages.length}/g, "${s.messages.length}");
code = code.replace(/\\\`\).join/g, "`).join");

fs.writeFileSync('app_fixed2.js', code);
