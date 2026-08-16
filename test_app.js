const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
try {
  new Function(content);
  console.log("Syntax OK");
} catch (e) {
  console.error("Syntax Error:", e);
}
