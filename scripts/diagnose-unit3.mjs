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

const context = vm.createContext({ window: {}, console, setTimeout, clearTimeout });
for (const file of files) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  const unit = context.window.MATH_APPENDIX?.find?.(item => item.slug === 'applied-linear-algebra-unit-3');
  if (unit) {
    console.log(`ASSEMBLED after ${file}: display-open=${count(unit.html, '\\[')} display-close=${count(unit.html, '\\]')}`);
  }
}
