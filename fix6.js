const fs = require('fs');
let code = fs.readFileSync('app_fixed3.js', 'utf8');

// Also fix the backticks in `renderDashboard` map map(s => \`)
code = code.replace(/\\\`/g, "`");
code = code.replace(/\\\$/g, "$");

fs.writeFileSync('app_fixed4.js', code);
