import fs from 'node:fs';
import vm from 'node:vm';

const files = [
  'appendix-data.js',
  'appendix-linear-algebra-unit-3.js',
  'appendix-linear-algebra-unit-3-refinements-a.js',
  'appendix-linear-algebra-unit-3-refinements-b.js',
  'appendix-linear-algebra-course-metadata.js',
  'appendix-linear-algebra-strang-alignment.js'
];

const count = (text, token) => text.split(token).length - 1;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  console.log(`RAW ${file}: display-open=${count(text, '\\[')} display-close=${count(text, '\\]')}`);
}

const target = fs.readFileSync('appendix-linear-algebra-unit-3-refinements-b.js', 'utf8');
const tokenRegex = /\\\[|\\\]/g;
let currentOpen = null;
let match;
while ((match = tokenRegex.exec(target)) !== null) {
  if (match[0] === '\\[') {
    if (currentOpen !== null) {
      const start = Math.max(0, currentOpen - 180);
      const end = Math.min(target.length, match.index + 180);
      console.log('FIRST NESTED DISPLAY OPEN; likely missing close between these opens:');
      console.log(target.slice(start, end));
      break;
    }
    currentOpen = match.index;
  } else if (currentOpen === null) {
    console.log('UNEXPECTED DISPLAY CLOSE near:');
    console.log(target.slice(Math.max(0, match.index - 180), Math.min(target.length, match.index + 180)));
    break;
  } else {
    currentOpen = null;
  }
}
if (currentOpen !== null && !match) {
  console.log('UNCLOSED FINAL DISPLAY near:');
  console.log(target.slice(Math.max(0, currentOpen - 240), Math.min(target.length, currentOpen + 500)));
}

const context = vm.createContext({ window: {}, console, setTimeout, clearTimeout });
for (const file of files) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  const unit = context.window.MATH_APPENDIX?.find?.(item => item.slug === 'applied-linear-algebra-unit-3');
  if (unit) {
    console.log(`ASSEMBLED after ${file}: display-open=${count(unit.html, '\\[')} display-close=${count(unit.html, '\\]')}`);
  }
}
