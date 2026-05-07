const fs = require('fs');
const path = require('path');

// Mock browser globals
const windowMock = {
  app: {},
  SKILLS: [],
  CATS: {},
  location: { hash: '' },
  scrollTo: () => {},
  navigator: {},
  confirm: () => true,
  alert: () => {},
  addEventListener: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};

global.window = windowMock;
global.document = {
  readyState: 'complete',
  querySelector: () => ({
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    appendChild: () => {},
    addEventListener: () => {},
    innerHTML: '',
    value: '',
    dataset: {},
    style: {}
  }),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({
    appendChild: () => {},
    classList: { add: () => {} },
    style: {}
  }),
  body: {
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    appendChild: () => {},
    prepend: () => {}
  }
};
global.localStorage = windowMock.localStorage;
global.location = windowMock.location;
global.scrollTo = windowMock.scrollTo;
global.navigator = windowMock.navigator;
global.confirm = windowMock.confirm;
global.alert = windowMock.alert;

// Mock fetch for the API call in app.js
global.fetch = () => Promise.resolve({
  json: () => Promise.resolve({})
});

// Load app.js
const appJsPath = path.join(__dirname, 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

try {
  eval(appJsCode);
} catch (e) {
  console.error("Error evaluating app.js:", e);
}

const escapeHtml = global.window.app.escapeHtml;

if (typeof escapeHtml !== 'function') {
  console.error("app.escapeHtml is not defined after evaluating app.js");
  process.exit(1);
}

const tests = [
  { input: '<b>Hello</b>', expected: '&lt;b&gt;Hello&lt;/b&gt;', name: 'Basic HTML' },
  { input: 'A & B', expected: 'A &amp; B', name: 'Ampersand' },
  { input: '"Quoted"', expected: '&quot;Quoted&quot;', name: 'Double quotes' },
  { input: "'Single'", expected: '&#039;Single&#039;', name: 'Single quotes' },
  { input: '', expected: '', name: 'Empty string' },
  { input: null, expected: '', name: 'Null' },
  { input: undefined, expected: '', name: 'Undefined' },
  { input: 0, expected: '0', name: 'Number 0' },
  { input: false, expected: 'false', name: 'Boolean false' },
  { input: true, expected: 'true', name: 'Boolean true' },
  { input: 123, expected: '123', name: 'Number 123' },
  { input: { a: 1 }, expected: '[object Object]', name: 'Object' },
];

let failures = 0;
tests.forEach(test => {
  const result = escapeHtml(test.input);
  if (result === test.expected) {
    console.log(`✅ PASS: ${test.name}`);
  } else {
    console.error(`❌ FAIL: ${test.name} - Expected "${test.expected}", got "${result}"`);
    failures++;
  }
});

if (failures > 0) {
  console.error(`\nTotal failures: ${failures}`);
  process.exit(1);
} else {
  console.log('\nAll tests passed!');
  process.exit(0);
}
