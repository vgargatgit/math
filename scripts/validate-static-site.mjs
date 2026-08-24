import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();

const appendixFiles = [
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
  'appendix-linear-algebra-strang-alignment.js'
];

const lessonFiles = [
  'day-16.js',
  'day-16-sequence.js',
  'day-16-attention.js',
  'day-16-review.js',
  'day-17.js',
  'day-17-spatial.js',
  'day-17-frequency.js',
  'day-17-review.js'
];

const requiredFiles = [...appendixFiles, ...lessonFiles];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
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

function lessonMarkup(lesson) {
  return [
    lesson.explanation || '',
    ...(lesson.sections || []).map(section => section.html || ''),
    ...(lesson.examples || []).flatMap(example => example),
    ...(lesson.practice || [])
  ].join('\n');
}

function approximateProseWords(lesson) {
  const studyText = (lesson.sections || [])
    .map(section => section.html || '')
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\[\[(].*?\\[\])]/gs, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return studyText ? studyText.split(' ').length : 0;
}

function validateLesson({
  day,
  lesson,
  title,
  sectionIds,
  topics,
  minimumPractice = 12,
  minimumWords = 2500
}) {
  if (!lesson || lesson.title !== title) {
    throw new Error(`Day ${day} does not resolve to ${title}.`);
  }
  if (lesson.published !== true) {
    throw new Error(`Day ${day} is not marked published.`);
  }

  const actualSectionIds = new Set((lesson.sections || []).map(section => section.id));
  for (const id of sectionIds) {
    if (!actualSectionIds.has(id)) {
      throw new Error(`Day ${day} is missing required section: ${id}`);
    }
  }

  for (const topic of topics) {
    if (!(lesson.topics || []).includes(topic)) {
      throw new Error(`Day ${day} topic list is missing: ${topic}`);
    }
  }

  validateBalancedMarkup(`Day ${day}`, lessonMarkup(lesson));

  if ((lesson.practice || []).length < minimumPractice) {
    throw new Error(`Day ${day} needs substantial practice coverage; found ${(lesson.practice || []).length} questions.`);
  }

  const words = approximateProseWords(lesson);
  if (words < minimumWords) {
    throw new Error(`Day ${day} is too short for a complete chapter: approximately ${words} prose words.`);
  }

  return words;
}

// Validate the assembled linear-algebra appendix.
const appendixContext = vm.createContext({
  window: {},
  console,
  setTimeout,
  clearTimeout
});
for (const file of appendixFiles) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), appendixContext, { filename: file });
}

const entries = appendixContext.window.MATH_APPENDIX;
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

for (const [unit, fragments] of [
  [unit1, requiredUnit1Fragments],
  [unit2, requiredUnit2Fragments],
  [unit3, requiredUnit3Fragments]
]) {
  for (const fragment of fragments) {
    if (!unit.html.includes(fragment)) {
      throw new Error(`${unit.slug} is missing expected content: ${fragment}`);
    }
  }
  if (!unit.tags?.includes('18.06SC-aligned')) {
    throw new Error(`${unit.slug} is missing the 18.06SC-aligned tag.`);
  }
  validateBalancedMarkup(unit.slug, unit.html);
}

// Validate script load order and the assembled daily course.
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const requiredScripts = [
  ...lessonFiles,
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

const courseContext = vm.createContext({ console, setTimeout, clearTimeout });
vm.runInContext(fs.readFileSync(path.join(root, 'course-data.js'), 'utf8'), courseContext, { filename: 'course-data.js' });

const dailyScripts = [...indexHtml.matchAll(/<script src="(day-[^"]+\.js)"><\/script>/g)]
  .map(match => match[1]);
for (const file of dailyScripts) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`index.html references missing daily script: ${file}`);
  }
  vm.runInContext(fs.readFileSync(fullPath, 'utf8'), courseContext, { filename: file });
}

const course = vm.runInContext('COURSE', courseContext);
const flatCourse = course.flatMap(section => section.lessons);
const publishedDays = flatCourse
  .map((lesson, index) => ({ lesson, day: index + 1 }))
  .filter(({ lesson }) => lesson.published === true);

if (publishedDays.length !== 17) {
  throw new Error(`Expected exactly 17 published daily lessons, found ${publishedDays.length}.`);
}
for (let index = 0; index < publishedDays.length; index += 1) {
  const expectedDay = index + 1;
  if (publishedDays[index].day !== expectedDay) {
    throw new Error(`Published lessons are not contiguous. Expected Day ${expectedDay}, found Day ${publishedDays[index].day}.`);
  }
}
if (flatCourse[17]?.published === true) {
  throw new Error('Day 18 is unexpectedly marked published.');
}

const day16 = flatCourse[15];
const day16Words = validateLesson({
  day: 16,
  lesson: day16,
  title: 'Language Models, Embeddings, and Attention',
  sectionIds: [
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
  ],
  topics: [
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
  ]
});

const day17 = flatCourse[16];
const day17Words = validateLesson({
  day: 17,
  lesson: day17,
  title: 'Convolution and Signal Processing',
  sectionIds: [
    'discrete-signals',
    'cross-correlation',
    'convolution',
    'kernels-filters',
    'padding-stride-dilation',
    'channels',
    'receptive-fields',
    'pooling',
    'translation-equivariance',
    'toeplitz-view',
    'fourier-transform',
    'frequency-domain-intuition',
    'aliasing-downsampling',
    'cnn-frequency-reading',
    'convolution-gradients',
    'common-mistakes',
    'paper-reading-workflow',
    'day17-recap'
  ],
  topics: [
    'Discrete signals',
    'Convolution',
    'Cross-correlation',
    'Kernels and filters',
    'Padding, stride, and dilation',
    'Channels',
    'Receptive fields',
    'Pooling',
    'Translation equivariance',
    'Toeplitz view',
    'Fourier transform',
    'Frequency-domain intuition',
    'Aliasing and downsampling',
    'Convolution gradients'
  ],
  minimumPractice: 15,
  minimumWords: 2500
});

console.log('Static site validation passed.');
console.log(`Published daily lessons: ${publishedDays.length}; next unpublished day: 18.`);
console.log(`Day 16: ${day16.sections.length} sections; ${day16.practice.length} practice questions; approximately ${day16Words} prose words.`);
console.log(`Day 17: ${day17.sections.length} sections; ${day17.practice.length} practice questions; approximately ${day17Words} prose words.`);
for (const unit of units) {
  console.log(`${unit.shortTitle}: ${unit.html.length.toLocaleString()} characters; ${count(unit.html, '<details>')} expandable solutions`);
}
