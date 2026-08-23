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
  'appendix-linear-algebra-unit-2-refinements-a.js',
  'appendix-linear-algebra-unit-2-refinements-b.js',
  'appendix-linear-algebra-unit-3.js',
  'appendix-linear-algebra-unit-3-refinements-a.js',
  'appendix-linear-algebra-unit-3-refinements-b.js',
  'appendix-linear-algebra-course-metadata.js',
  'appendix-linear-algebra-strang-alignment.js',
  'day-16.js',
  'day-16-sequence.js',
  'day-16-attention.js',
  'day-16-review.js'
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Required file is missing: ${file}`);
  }
}

const removedDuplicateFiles = [
  'appendix-linear-algebra-unit-2-depth-a.js',
  'appendix-linear-algebra-unit-2-depth-b.js',
  'appendix-linear-algebra-unit-3-depth-a.js',
  'appendix-linear-algebra-unit-3-depth-b.js'
];

for (const file of removedDuplicateFiles) {
  if (fs.existsSync(path.join(root, file))) {
    throw new Error(`Superseded duplicate deep-dive file still exists: ${file}`);
  }
}

const appendixFiles = requiredFiles.filter(file => file.startsWith('appendix-'));
const context = vm.createContext({
  window: {},
  console,
  setTimeout,
  clearTimeout
});

for (const file of appendixFiles) {
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

const requiredUnit2Fragments = [
  'id="strang-course-alignment-unit-2"',
  'id="unit2-strang-refinement-a"',
  'The main geometry of least squares',
  'Nearest-point theorem',
  'The projection matrix and its four key subspaces',
  'Complete least-squares line fit',
  'QR factorization from the column picture',
  'id="unit2-strang-refinement-b"',
  'Three properties determine the determinant',
  'Cofactors and the adjugate identity',
  'Trace and determinant summarize the eigenvalues',
  'Difference equations and powers of \\(A\\)',
  'A Fibonacci recurrence as a matrix power',
  'Markov matrices and the eigenvalue \\(1\\)',
  'Fourier series are projections in a function space'
];

for (const fragment of requiredUnit2Fragments) {
  if (!unit2.html.includes(fragment)) {
    throw new Error(`Unit II is missing expected content: ${fragment}`);
  }
}

const requiredUnit3Fragments = [
  'id="strang-course-alignment-unit-3"',
  'id="unit3-strang-refinement-a"',
  'Why symmetric matrices are the best-behaved square matrices',
  'Equivalent tests for positive definiteness',
  'Cholesky factorization and positive pivots',
  'Positive-definite matrices and quadratic minima',
  'The Fourier matrix',
  'Why the FFT reduces \\(O(N^2)\\) work to \\(O(N\\log N)\\)',
  'Similar matrices represent the same transformation in different bases',
  'Jordan form records the missing eigenvectors',
  'id="unit3-strang-refinement-b"',
  'The SVD extends the spectral theorem to every matrix',
  'The SVD displays the four fundamental subspaces',
  'Why truncated SVD is the best rank-\\(k\\) approximation',
  'A linear transformation is determined by basis vectors',
  'General change-of-basis formula',
  'Left inverses and full column rank',
  'Projection matrices from the pseudoinverse',
  'Why \\(A^+b\\) is the least-squares solution',
  'Why the pseudoinverse gives the minimum-norm solution'
];

for (const fragment of requiredUnit3Fragments) {
  if (!unit3.html.includes(fragment)) {
    throw new Error(`Unit III is missing expected content: ${fragment}`);
  }
}

for (const unit of units) {
  if (!unit.tags?.includes('18.06SC-aligned')) {
    throw new Error(`${unit.slug} is missing the 18.06SC-aligned tag.`);
  }
}

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const requiredScripts = [
  'day-16.js',
  'day-16-sequence.js',
  'day-16-attention.js',
  'day-16-review.js',
  'appendix-linear-algebra-unit-2-refinements-a.js',
  'appendix-linear-algebra-unit-2-refinements-b.js',
  'appendix-linear-algebra-unit-3-refinements-a.js',
  'appendix-linear-algebra-unit-3-refinements-b.js',
  'appendix-linear-algebra-strang-alignment.js'
];

for (const script of requiredScripts) {
  if (!indexHtml.includes(`<script src="${script}"></script>`)) {
    throw new Error(`index.html does not load ${script}.`);
  }
}

for (const script of removedDuplicateFiles) {
  if (indexHtml.includes(`<script src="${script}"></script>`)) {
    throw new Error(`index.html still loads superseded duplicate file ${script}.`);
  }
}

function count(text, token) {
  return text.split(token).length - 1;
}

function validateBalancedMarkup(name, text) {
  for (const [open, close] of [['\\(', '\\)'], ['\\[', '\\]']]) {
    const opens = count(text, open);
    const closes = count(text, close);
    if (opens !== closes) {
      throw new Error(`${name} has unbalanced MathJax delimiters ${open} and ${close}: ${opens} vs ${closes}`);
    }
  }

  const detailsOpen = count(text, '<details>');
  const detailsClose = count(text, '</details>');
  if (detailsOpen !== detailsClose) {
    throw new Error(`${name} has unbalanced details elements: ${detailsOpen} vs ${detailsClose}`);
  }
}

for (const unit of units) {
  validateBalancedMarkup(unit.slug, unit.html);
}

// Assemble the daily course exactly in the order used by index.html.
const courseContext = vm.createContext({ console, setTimeout, clearTimeout });
const courseDataSource = fs.readFileSync(path.join(root, 'course-data.js'), 'utf8');
vm.runInContext(courseDataSource, courseContext, { filename: 'course-data.js' });

const dailyScripts = [...indexHtml.matchAll(/<script src="(day-[^"]+\.js)"><\/script>/g)]
  .map(match => match[1]);

for (const file of dailyScripts) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(source, courseContext, { filename: file });
}

const course = vm.runInContext('COURSE', courseContext);
const flatCourse = course.flatMap(section => section.lessons);
const publishedDays = flatCourse
  .map((lesson, index) => ({ lesson, day: index + 1 }))
  .filter(({ lesson }) => lesson.published === true);

if (publishedDays.length !== 16) {
  throw new Error(`Expected exactly 16 published daily lessons, found ${publishedDays.length}.`);
}

for (let index = 0; index < publishedDays.length; index += 1) {
  const expectedDay = index + 1;
  if (publishedDays[index].day !== expectedDay) {
    throw new Error(`Published lessons are not contiguous. Expected Day ${expectedDay}, found Day ${publishedDays[index].day}.`);
  }
}

const day16 = flatCourse[15];
if (!day16 || day16.title !== 'Language Models, Embeddings, and Attention') {
  throw new Error('Day 16 does not resolve to Language Models, Embeddings, and Attention.');
}
if (day16.published !== true) {
  throw new Error('Day 16 is not marked published.');
}
if (flatCourse[16]?.published === true) {
  throw new Error('Day 17 is unexpectedly marked published.');
}

const expectedSectionIds = [
  'tokens-and-probability',
  'autoregressive-factorization',
  'softmax-loss-perplexity',
  'embeddings',
  'distributional-semantics',
  'word2vec-objectives',
  'recurrent-states',
  'bptt',
  'encoder-decoder',
  'qkv-projections',
  'scaled-dot-product-attention',
  'causal-masks',
  'multi-head-attention',
  'positional-information',
  'residuals-and-layernorm',
  'training-objectives',
  'common-mistakes',
  'paper-reading-workflow',
  'day16-recap'
];

const sectionIds = new Set((day16.sections || []).map(section => section.id));
for (const id of expectedSectionIds) {
  if (!sectionIds.has(id)) {
    throw new Error(`Day 16 is missing required section: ${id}`);
  }
}

const expectedTopics = [
  'Autoregressive factorization',
  'Cross-entropy and perplexity',
  'Sparse embedding gradients',
  'Negative sampling',
  'Noise-contrastive estimation',
  'Hierarchical softmax',
  'Backpropagation through time',
  'Query/key/value projections',
  'Scaled dot-product attention',
  'Causal masks',
  'Multi-head attention',
  'Positional encodings',
  'Residual paths',
  'Layer normalization',
  'Token-level and sequence-level objectives'
];

for (const topic of expectedTopics) {
  if (!day16.topics.includes(topic)) {
    throw new Error(`Day 16 topic list is missing: ${topic}`);
  }
}

const day16Markup = [
  day16.explanation || '',
  ...(day16.sections || []).map(section => section.html || ''),
  ...(day16.examples || []).flatMap(example => example),
  ...(day16.practice || [])
].join('\n');
validateBalancedMarkup('Day 16', day16Markup);

if ((day16.practice || []).length < 12) {
  throw new Error(`Day 16 needs substantial practice coverage; found ${(day16.practice || []).length} questions.`);
}

const studyText = (day16.sections || [])
  .map(section => section.html || '')
  .join(' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\\[\[(].*?\\[\])]/gs, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const approximateWords = studyText ? studyText.split(' ').length : 0;
if (approximateWords < 2500) {
  throw new Error(`Day 16 is too short for a complete chapter: approximately ${approximateWords} prose words.`);
}

console.log('Static site validation passed.');
console.log(`Published daily lessons: ${publishedDays.length}; next unpublished day: 17.`);
console.log(`Day 16: ${day16.sections.length} sections; ${day16.practice.length} practice questions; approximately ${approximateWords} prose words.`);
for (const unit of units) {
  console.log(`${unit.shortTitle}: ${unit.html.length.toLocaleString()} characters; ${count(unit.html, '<details>')} expandable solutions`);
}
