import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const requiredFiles = [
  'appendix-data.js',
  'appendix-linear-algebra-unit-1.js',
  'appendix-linear-algebra-unit-1-depth-a.js',
  'appendix-linear-algebra-unit-1-depth-b.js',
  'appendix-linear-algebra-unit-1-refinements.js',
  'appendix-linear-algebra-unit-2.js',
  'appendix-linear-algebra-unit-2-depth-a.js',
  'appendix-linear-algebra-unit-2-depth-b.js',
  'appendix-linear-algebra-unit-3.js',
  'appendix-linear-algebra-unit-3-depth-a.js',
  'appendix-linear-algebra-unit-3-depth-b.js',
  'appendix-linear-algebra-course-metadata.js',
  'appendix-linear-algebra-strang-alignment.js'
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

const units = [1, 2, 3].map(number => {
  const unit = entries.find(entry => entry.slug === `applied-linear-algebra-unit-${number}`);
  if (!unit) throw new Error(`Applied Linear Algebra Unit ${number} was not assembled.`);
  return unit;
});

const [unit1, unit2, unit3] = units;

const requiredUnit1Fragments = [
  'id="unit1-refinement-marker"',
  'Row picture: one equation from each row',
  'Column picture: build the output from the columns',
  'E_{\\mathrm{swap}}',
  'Every legal elementary row operation is reversible',
  'Deriving \\(A=LU\\) from elementary matrices',
  'Rank-nullity theorem',
  'Why pivot columns of the original matrix form a column-space basis',
  'a_1&a_2&\\cdots&a_n',
  'id="strang-course-alignment-unit-1"',
  'id="strang-left-multiplication"',
  'The \\(i\\)-th row of \\(EA\\)',
  'Left multiplication forms new rows from old rows',
  'id="strang-five-views"',
  'Outer-product view'
];

for (const fragment of requiredUnit1Fragments) {
  if (!unit1.html.includes(fragment)) {
    throw new Error(`Unit I is missing expected content: ${fragment}`);
  }
}

for (const [unit, marker] of [
  [unit2, 'id="strang-course-alignment-unit-2"'],
  [unit3, 'id="strang-course-alignment-unit-3"']
]) {
  if (!unit.html.includes(marker)) {
    throw new Error(`Course-alignment marker is missing: ${marker}`);
  }
}

for (const unit of units) {
  if (!unit.tags?.includes('18.06SC-aligned')) {
    throw new Error(`${unit.slug} is missing the 18.06SC-aligned tag.`);
  }
}

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (!indexHtml.includes('<script src="appendix-linear-algebra-strang-alignment.js"></script>')) {
  throw new Error('index.html does not load the Strang alignment file.');
}

function count(text, token) {
  return text.split(token).length - 1;
}

for (const unit of units) {
  for (const [open, close] of [['\\(', '\\)'], ['\\[', '\\]']]) {
    const opens = count(unit.html, open);
    const closes = count(unit.html, close);
    if (opens !== closes) {
      throw new Error(`${unit.slug} has unbalanced MathJax delimiters ${open} and ${close}: ${opens} vs ${closes}`);
    }
  }

  const detailsOpen = count(unit.html, '<details>');
  const detailsClose = count(unit.html, '</details>');
  if (detailsOpen !== detailsClose) {
    throw new Error(`${unit.slug} has unbalanced details elements: ${detailsOpen} vs ${detailsClose}`);
  }
}

console.log('Static appendix validation passed.');
for (const unit of units) {
  console.log(`${unit.shortTitle}: ${unit.html.length.toLocaleString()} characters; ${count(unit.html, '<details>')} expandable solutions`);
}
