// File: setup.js
import fs from 'fs';
import path from 'path';

const dataFile = fs.readFileSync('data.txt', 'utf8'); // your big pasted file
const lines = dataFile.split('\n');

let currentFile = null;
let buffer = '';
const files = {};

for (const line of lines) {
  const match = line.match(/^# File:\s+(.*)$/);
  if (match) {
    // save previous file if any
    if (currentFile) {
      files[currentFile] = buffer.replace(/\n$/, '');
    }
    currentFile = match[1].trim();
    buffer = '';
  } else {
    buffer += line + '\n';
  }
}
if (currentFile) {
  files[currentFile] = buffer.replace(/\n$/, '');
}

// Write files
function ensureDir(fp) {
  fs.mkdirSync(path.dirname(fp), { recursive: true });
}

for (const [rel, content] of Object.entries(files)) {
  const full = path.join(process.cwd(), rel);
  ensureDir(full);
  fs.writeFileSync(full, content);
  console.log('Wrote', rel);
}
