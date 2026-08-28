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
  'day-16.js', 'day-16-sequence.js', 'day-16-attention.js', 'day-16-review.js',
  'day-17.js', 'day-17-spatial.js', 'day-17-frequency.js', 'day-17-review.js',
  'day-18.js', 'day-18-graphs.js', 'day-18-geometry.js', 'day-18-review.js',
  'day-19.js', 'day-19-variational.js', 'day-19-generative.js', 'day-19-diffusion-review.js',
  'day-20.js', 'day-20-bellman.js', 'day-20-control.js', 'day-20-review.js',
  'day-21.js', 'day-21-kernels.js', 'day-21-ensembles.js', 'day-21-review.js'
];

for (const file of [...appendixFiles, ...lessonFiles]) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Required file is missing: ${file}`);
}

const removedDuplicateFiles = [
  'appendix-linear-algebra-unit-2-depth-a.js',
  'appendix-linear-algebra-unit-2-depth-b.js',
  'appendix-linear-algebra-unit-3-depth-a.js',
  'appendix-linear-algebra-unit-3-depth-b.js'
];
for (const file of removedDuplicateFiles) {
  if (fs.existsSync(path.join(root, file))) throw new Error(`Superseded duplicate deep-dive file still exists: ${file}`);
}

function count(text, token) { return text.split(token).length - 1; }

function validateBalancedMarkup(name, text) {
  for (const [open, close] of [['\\(', '\\)'], ['\\[', '\\]']]) {
    const opens = count(text, open);
    const closes = count(text, close);
    if (opens !== closes) throw new Error(`${name} has unbalanced MathJax delimiters ${open} and ${close}: ${opens} vs ${closes}`);
  }
  const detailsOpen = count(text, '<details>');
  const detailsClose = count(text, '</details>');
  if (detailsOpen !== detailsClose) throw new Error(`${name} has unbalanced details elements: ${detailsOpen} vs ${detailsClose}`);
}

function lessonMarkup(lesson) {
  return [lesson.explanation || '', ...(lesson.sections || []).map(s => s.html || ''), ...(lesson.examples || []).flatMap(x => x), ...(lesson.practice || [])].join('\n');
}

function approximateProseWords(lesson) {
  const studyText = (lesson.sections || []).map(s => s.html || '').join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\[\[(].*?\\[\])]/gs, ' ')
    .replace(/\s+/g, ' ').trim();
  return studyText ? studyText.split(' ').length : 0;
}

function validateLesson({ day, lesson, title, sectionIds, topics, minimumPractice = 12, minimumWords = 2500 }) {
  if (!lesson || lesson.title !== title) throw new Error(`Day ${day} does not resolve to ${title}.`);
  if (lesson.published !== true) throw new Error(`Day ${day} is not marked published.`);
  const actualSectionIds = new Set((lesson.sections || []).map(s => s.id));
  for (const id of sectionIds) if (!actualSectionIds.has(id)) throw new Error(`Day ${day} is missing required section: ${id}`);
  for (const topic of topics) if (!(lesson.topics || []).includes(topic)) throw new Error(`Day ${day} topic list is missing: ${topic}`);
  validateBalancedMarkup(`Day ${day}`, lessonMarkup(lesson));
  if ((lesson.practice || []).length < minimumPractice) throw new Error(`Day ${day} needs substantial practice coverage; found ${(lesson.practice || []).length} questions.`);
  const words = approximateProseWords(lesson);
  if (words < minimumWords) throw new Error(`Day ${day} is too short for a complete chapter: approximately ${words} prose words.`);
  return words;
}

const appendixContext = vm.createContext({ window: {}, console, setTimeout, clearTimeout });
for (const file of appendixFiles) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), appendixContext, { filename: file });
const entries = appendixContext.window.MATH_APPENDIX;
if (!Array.isArray(entries)) throw new Error('window.MATH_APPENDIX was not assembled as an array.');
const units = [1, 2, 3].map(number => {
  const unit = entries.find(entry => entry.slug === `applied-linear-algebra-unit-${number}`);
  if (!unit) throw new Error(`Applied Linear Algebra Unit ${number} was not assembled.`);
  if (!unit.tags?.includes('18.06SC-aligned')) throw new Error(`${unit.slug} is missing the 18.06SC-aligned tag.`);
  validateBalancedMarkup(unit.slug, unit.html);
  return unit;
});

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const requiredScripts = [...lessonFiles, 'appendix-linear-algebra-unit-2-refinements-a.js', 'appendix-linear-algebra-unit-2-refinements-b.js', 'appendix-linear-algebra-unit-3-refinements-a.js', 'appendix-linear-algebra-unit-3-refinements-b.js', 'appendix-linear-algebra-strang-alignment.js'];
for (const script of requiredScripts) if (!indexHtml.includes(`<script src="${script}"></script>`)) throw new Error(`index.html does not load ${script}.`);
for (const script of removedDuplicateFiles) if (indexHtml.includes(`<script src="${script}"></script>`)) throw new Error(`index.html still loads superseded duplicate file ${script}.`);

const courseContext = vm.createContext({ console, setTimeout, clearTimeout });
vm.runInContext(fs.readFileSync(path.join(root, 'course-data.js'), 'utf8'), courseContext, { filename: 'course-data.js' });
const dailyScripts = [...indexHtml.matchAll(/<script src="(day-[^"]+\.js)"><\/script>/g)].map(match => match[1]);
for (const file of dailyScripts) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) throw new Error(`index.html references missing daily script: ${file}`);
  vm.runInContext(fs.readFileSync(fullPath, 'utf8'), courseContext, { filename: file });
}

const course = vm.runInContext('COURSE', courseContext);
const flatCourse = course.flatMap(section => section.lessons);
const publishedDays = flatCourse.map((lesson, index) => ({ lesson, day: index + 1 })).filter(({ lesson }) => lesson.published === true);
if (publishedDays.length !== 21) throw new Error(`Expected exactly 21 published daily lessons, found ${publishedDays.length}.`);
for (let index = 0; index < publishedDays.length; index += 1) {
  const expectedDay = index + 1;
  if (publishedDays[index].day !== expectedDay) throw new Error(`Published lessons are not contiguous. Expected Day ${expectedDay}, found Day ${publishedDays[index].day}.`);
}
if (flatCourse[21]?.published === true) throw new Error('Day 22 is unexpectedly marked published.');

const configs = [
  {
    day: 16, title: 'Language Models, Embeddings, and Attention',
    sectionIds: ['tokens-and-probability','autoregressive-factorization','softmax-loss-perplexity','embeddings','distributional-semantics','word2vec-objectives','recurrent-states','bptt','encoder-decoder','qkv-projections','scaled-dot-product-attention','causal-masks','multi-head-attention','positional-information','residuals-and-layernorm','training-objectives','common-mistakes','paper-reading-workflow','day16-recap'],
    topics: ['Autoregressive factorization','Cross-entropy and perplexity','Sparse embedding gradients','Negative sampling','Noise-contrastive estimation','Hierarchical softmax','Backpropagation through time','Query/key/value projections','Scaled dot-product attention','Causal masks','Multi-head attention','Positional encodings','Residual paths','Layer normalization','Token-level and sequence-level objectives'],
    minimumPractice: 12, minimumWords: 2500
  },
  {
    day: 17, title: 'Convolution and Signal Processing',
    sectionIds: ['discrete-signals','cross-correlation','convolution','kernels-filters','padding-stride-dilation','channels','receptive-fields','pooling','translation-equivariance','toeplitz-view','fourier-transform','frequency-domain-intuition','aliasing-downsampling','cnn-frequency-reading','convolution-gradients','common-mistakes','paper-reading-workflow','day17-recap'],
    topics: ['Discrete signals','Convolution','Cross-correlation','Kernels and filters','Padding, stride, and dilation','Channels','Receptive fields','Pooling','Translation equivariance','Toeplitz view','Fourier transform','Frequency-domain intuition','Aliasing and downsampling','Convolution gradients'],
    minimumPractice: 15, minimumWords: 2500
  },
  {
    day: 18, title: 'Sets, Graphs, and Geometric Deep Learning',
    sectionIds: ['permutations','invariance-equivariance','symmetry-groups','deep-sets','graphs-matrices','graph-laplacian','graph-spectra','message-passing','graph-convolution','graph-attention','graph-isomorphism','manifolds','tangent-spaces','geodesics','local-coordinates','transformation-groups','group-representations','gauge-intuition','common-mistakes','paper-reading-workflow','day18-recap'],
    topics: ['Permutations','Permutation invariance and equivariance','Symmetry','Group actions','Invariant and equivariant functions','Set-function forms','Graphs','Adjacency and degree matrices','Graph Laplacians','Graph spectra','Neighborhood aggregation','Message passing','Graph convolution','Graph attention','Isomorphism intuition','Manifolds','Tangent spaces','Geodesic distance','Local coordinates','Transformation groups','Representations of symmetry groups','Gauge intuition'],
    minimumPractice: 18, minimumWords: 3000
  },
  {
    day: 19, title: 'Latent-Variable and Generative Models',
    sectionIds: ['latent-variables','marginalization','posterior-inference','jensen','elbo','variational-inference','reparameterization','monte-carlo-gradients','importance-sampling','change-of-variables','normalizing-flows','minimax-optimization','game-equilibrium','gan-objectives','score-functions','denoising-objectives','markov-noise-processes','sde-intuition','common-mistakes','paper-reading-workflow','day19-recap'],
    topics: ['Latent variables','Marginalization','Posterior inference','Jensen’s inequality','ELBO','Variational inference','Reparameterization','Monte Carlo gradients','Importance sampling','Change of variables','Jacobian determinant','Normalizing flows','Minimax optimization','Game-theoretic equilibrium','GAN objectives','Score functions','Denoising objectives','Markov noise processes','SDE intuition'],
    minimumPractice: 20, minimumWords: 3000
  },
  {
    day: 20, title: 'Sequential Decision-Making and Reinforcement Learning',
    sectionIds: ['markov-chains','transition-matrices','stationary-distributions','mdp-components','discounted-return','value-functions','bellman-expectation','bellman-optimality','dynamic-programming','monte-carlo-evaluation','temporal-difference-learning','q-learning','exploration-exploitation','policy-gradients','advantage-functions','importance-sampling-rl','actor-critic-integration','common-mistakes','paper-reading-workflow','day20-recap'],
    topics: ['Markov chains','Transition matrices','Stationary distributions','Markov decision processes','States, actions, rewards, and policies','Discounted return','Value functions','Action-value functions','Bellman expectation and optimality equations','Dynamic programming','Monte Carlo evaluation','Temporal-difference learning','Q-learning','Policy gradients','Advantage functions','Importance sampling','Exploration and exploitation'],
    minimumPractice: 20, minimumWords: 3000
  },
  {
    day: 21, title: 'Kernel and Classical Statistical Learning Methods',
    sectionIds: ['similarity-functions','psd-kernels','feature-maps','kernel-trick','rkhs-intuition','margin-geometry','support-vector-machines','kernel-svm','kernel-regression','kernel-method-computation','decision-trees','tree-split-criteria','bagging','random-forests','boosting-additive-models','gradient-boosting','common-mistakes','paper-reading-workflow','day21-recap'],
    topics: ['Similarity functions','PSD kernels','Feature maps','Kernel trick','RKHS intuition','Margin geometry','Support-vector machines','Kernel regression','Decision trees','Bagging','Random forests','Boosting','Additive models','Gradient boosting'],
    minimumPractice: 20, minimumWords: 3000
  }
];

const wordCounts = new Map();
for (const config of configs) {
  const lesson = flatCourse[config.day - 1];
  wordCounts.set(config.day, validateLesson({ ...config, lesson }));
}

console.log('Static site validation passed.');
console.log(`Published daily lessons: ${publishedDays.length}; next unpublished day: 22.`);
for (const config of configs) {
  const lesson = flatCourse[config.day - 1];
  console.log(`Day ${config.day}: ${lesson.sections.length} sections; ${lesson.practice.length} practice questions; approximately ${wordCounts.get(config.day)} prose words.`);
}
for (const unit of units) console.log(`${unit.shortTitle}: ${unit.html.length.toLocaleString()} characters; ${count(unit.html, '<details>')} expandable solutions`);
