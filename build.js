const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const FILES_TO_COPY = [
  'index.html',
  'app.js',
  'styles.css',
  'skills-data.js',
  'manifest.json',
  'sw.js',
  'logo.jpg'
];
const DIRS_TO_COPY = [
  'assets'
];

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

function build() {
  console.log('Starting cross-platform build...');
  
  // 1. Ensure dist exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    console.log('Created dist directory.');
  }

  // 2. Copy flat files
  FILES_TO_COPY.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(DIST_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} to dist/`);
    } else {
      console.warn(`Warning: Source file ${file} does not exist.`);
    }
  });

  // 3. Copy folders
  DIRS_TO_COPY.forEach(dir => {
    const src = path.join(__dirname, dir);
    const dest = path.join(DIST_DIR, dir);
    if (fs.existsSync(src)) {
      copyFolderSync(src, dest);
      console.log(`Copied directory ${dir} to dist/`);
    } else {
      console.warn(`Warning: Source directory ${dir} does not exist.`);
    }
  });

  console.log('Build completed successfully.');
}

build();
