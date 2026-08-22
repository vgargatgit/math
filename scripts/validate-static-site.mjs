import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const requiredFiles = [
  'appendix-data.js',
  'appendix-linear-algebra-unit-1.js',
  'appendix-linear-algebra-unit-1-depth-a.js',
  'appendix-linear-algebra-unit-1-depth-b.js',
  'appendix-linear-algebra-unit-1-refinements.js'
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Required appendix file is missing: ${file}`);
  }
}

const context = vm.createContext({
  window: {},
  console,
  setTimeout,
  clearTimeout
});

for (const file of requiredFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(source, context, { filename: file });
}

const entries = context.window.MATH_APPENDIX;
if (!Array.isArray(entries)) {
  throw new Error('window.MATH_APPENDIX was not assembled as an array.');
}

const unit = entries.find(entry => entry.slug === 'applied-linear-algebra-unit-1');
if (!unit) {
  throw new Error('Applied Linear Algebra Unit I was not assembled.');
}

const requiredFragments = [
  'id="unit1-refinement-marker"',
  'Row picture: one equation from each row',
  'Column picture: build the output from the columns',
  'E_{\\mathrm{swap}}',
  'Every legal elementary row operation is reversible',
  'Deriving \\(A=LU\\) from elementary matrices',
  'Rank-nullity theorem',
  'Why pivot columns of the original matrix form a column-space basis',
  'a_1&a_2&\\cdots&a_n'
];

for (const fragment of requiredFragments) {
  if (!unit.html.includes(fragment)) {
    throw new Error(`Unit I refinement is missing expected content: ${fragment}`);
  }
}

function count(text, token) {
  return text.split(token).length - 1;
}

const delimiterPairs = [
  ['\\(', '\\)'],
  ['\\[', '\\]']
];

for (const [open, close] of delimiterPairs) {
  const opens = count(unit.html, open);
  const closes = count(unit.html, close);
  if (opens !== closes) {
    throw new Error(`Unbalanced MathJax delimiters ${open} and ${close}: ${opens} vs ${closes}`);
  }
}

const detailsOpen = count(unit.html, '<details>');
const detailsClose = count(unit.html, '</details>');
if (detailsOpen !== detailsClose) {
  throw new Error(`Unbalanced details elements: ${detailsOpen} vs ${detailsClose}`);
}

console.log('Static appendix validation passed.');
console.log(`Unit I assembled length: ${unit.html.length.toLocaleString()} characters`);
console.log(`Expandable solutions: ${detailsOpen}`);
