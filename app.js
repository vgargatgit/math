const app = document.getElementById('app');

function esc(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

/**
 * course-data.js creates LESSONS before the daily lesson files run.
 * Copy the later daily overrides from COURSE into the route objects.
 */
function syncLessonData() {
  let index = 0;
  for (const section of COURSE) {
    for (const sourceLesson of section.lessons) {
      const routeLesson = LESSONS[index];
      if (routeLesson) {
        Object.assign(routeLesson, sourceLesson, { stage: section.stage });
      }
      index += 1;
    }
  }
}

syncLessonData();

function restoreMath(text) {
  if (typeof text !== 'string') return '';

  // New daily lessons contain explicit MathJax delimiters.
  if (/\\\(|\\\[/.test(text)) return text;

  // Keep compatibility with the original compact lesson data.
  let output = '';
  let index = 0;

  while (index < text.length) {
    if (text[index] !== '(') {
      output += text[index];
      index += 1;
      continue;
    }

    let depth = 0;
    let end = index;
    for (; end < text.length; end += 1) {
      if (text[end] === '(') depth += 1;
      else if (text[end] === ')') {
        depth -= 1;
        if (depth === 0) break;
      }
    }

    if (end >= text.length) {
      output += text[index];
      index += 1;
      continue;
    }

    const inner = text.slice(index + 1, end);
    const looksLikeMath = /[\\=^_<>]|^\s*[A-Za-z](?:\s|$)|^\s*[0-9.-]/.test(inner);
    output += looksLikeMath ? `\\(${inner}\\)` : `(${inner})`;
    index = end + 1;
  }

  return output;
}

function renderMath() {
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetClear?.([app]);
    window.MathJax.typesetPromise([app]).catch(error => {
      console.error('MathJax rendering failed:', error);
    });
  } else {
    window.setTimeout(renderMath, 60);
  }
}

function publishedLessons() {
  return LESSONS.filter(lesson => lesson.published === true);
}

function courseHome() {
  const publishedCount = publishedLessons().length;
  const stages = COURSE.map(section => {
    const cards = section.lessons.map(lesson => {
      if (lesson.published === true) {
        return `
          <article class="card published-card">
            <div class="card-status-row">
              <span class="day">Day ${lesson.day}</span>
              <span class="status status-published">Published</span>
            </div>
            <h3><a href="#/lesson/${lesson.slug}">${esc(lesson.title)}</a></h3>
            <p>${esc(lesson.summary)}</p>
          </article>`;
      }

      return `
        <article class="card upcoming-card" aria-label="Day ${lesson.day}: ${esc(lesson.title)}. Coming soon.">
          <div class="card-status-row">
            <span class="day">Day ${lesson.day}</span>
            <span class="status status-upcoming">Coming soon</span>
          </div>
          <h3>${esc(lesson.title)}</h3>
          <p>${esc(lesson.summary)}</p>
        </article>`;
    }).join('');

    return `
      <section class="stage">
        <div class="stage-heading">
          <h2>${esc(section.stage)}</h2>
          <p>${section.lessons.length} planned lesson${section.lessons.length === 1 ? '' : 's'}</p>
        </div>
        <div class="course-grid">${cards}</div>
      </section>`;
  }).join('');

  app.innerHTML = `
    <section class="hero">
      <div>
        <div class="eyebrow">Paper-oriented course</div>
        <h1>Read the math.<br>See the shape.<br>Build the intuition.</h1>
        <p class="lead">A ${LESSONS.length}-day mathematics course for reading important AI and ML papers. Complete lessons are released one day at a time.</p>
      </div>
      <aside class="hero-card" aria-label="Course summary">
        <div class="metric"><strong>${publishedCount}</strong><span>complete lesson${publishedCount === 1 ? '' : 's'} published</span></div>
        <div class="metric"><strong>${LESSONS.length}</strong><span>planned course days</span></div>
        <div class="metric"><strong>MathJax</strong><span>LaTeX-quality math rendering</span></div>
      </aside>
    </section>
    ${stages}`;
}

function findLessonBySlug(slug) {
  return LESSONS.find(lesson => lesson.slug === slug)
    || LESSONS.find(lesson => lesson.slug.replace(/^day-\d+-/, '') === slug);
}

function comingSoonPage(lesson) {
  app.innerHTML = `
    <div class="breadcrumbs"><a href="#/">Course</a> / Day ${lesson.day}</div>
    <section class="lesson-panel empty-state">
      <div class="eyebrow">Coming soon</div>
      <h1>Day ${lesson.day}: ${esc(lesson.title)}</h1>
      <p class="lead">This lesson is part of the planned syllabus, but the complete teaching chapter has not been published yet.</p>
      <p><a href="#/">Return to the published course lessons.</a></p>
    </section>`;
}

function lessonPage(slug) {
  const lesson = findLessonBySlug(slug);
  if (!lesson) return notFound();
  if (lesson.published !== true) return comingSoonPage(lesson);

  const available = publishedLessons();
  const availableIndex = available.indexOf(lesson);
  const previous = available[availableIndex - 1];
  const next = available[availableIndex + 1];

  const extraSections = (lesson.sections || []).map((section, sectionIndex) => ({
    id: section.id || `section-${sectionIndex + 1}`,
    title: section.title,
    html: restoreMath(section.html || '')
  }));

  const pageLinks = [
    { id: 'idea', label: 'Big idea' },
    { id: 'topics', label: 'Learning goals' },
    ...extraSections.map(section => ({ id: section.id, label: section.title })),
    { id: 'examples', label: 'Worked examples' },
    { id: 'practice', label: 'Practice and answers' }
  ];

  app.innerHTML = `
    <div class="breadcrumbs"><a href="#/">Course</a> / Day ${lesson.day}</div>
    <header class="lesson-header">
      <div class="eyebrow">Day ${lesson.day} · ${esc(lesson.stage)}</div>
      <h1>${esc(lesson.title)}</h1>
      <p class="lead">${esc(lesson.summary)}</p>
      <div class="lesson-meta">
        <span class="pill">Complete chapter</span>
        <span class="pill">Worked examples</span>
        <span class="pill">Practice with answers</span>
      </div>
    </header>

    <div class="lesson-layout">
      <article class="lesson-content">
        <section class="lesson-panel" id="idea">
          <h2>Big idea</h2>
          <p>${esc(lesson.explanation)}</p>
          <div class="callout"><strong>Reading rule:</strong> Name each object, write its type or shape, identify the operation, and test a small example.</div>
        </section>

        <section class="lesson-panel" id="topics">
          <h2>What you will learn</h2>
          <ul class="topic-list">${lesson.topics.map(topic => `<li>${esc(topic)}</li>`).join('')}</ul>
        </section>

        ${extraSections.map(section => `
          <section class="lesson-panel" id="${section.id}">
            <h2>${esc(section.title)}</h2>
            <div class="rich-copy">${section.html}</div>
          </section>`).join('')}

        <section class="lesson-panel" id="examples">
          <h2>Worked examples</h2>
          ${lesson.examples.map(([title, body], exampleIndex) => `
            <div class="example">
              <div class="label">Example ${exampleIndex + 1}</div>
              <h3>${esc(title)}</h3>
              <div class="math-block">${restoreMath(body)}</div>
            </div>`).join('')}
        </section>

        <section class="lesson-panel" id="practice">
          <h2>Check your understanding</h2>
          <p>Try each question before you open its answer.</p>
          <ol class="practice">${lesson.practice.map(question => `<li>${restoreMath(question)}</li>`).join('')}</ol>
          <div class="callout"><strong>Study method:</strong> Work on paper first. Then verify the result with a calculator or a small program.</div>
        </section>

        <nav class="lesson-nav" aria-label="Lesson navigation">
          ${previous ? `<a href="#/lesson/${previous.slug}"><span class="kicker">Previous · Day ${previous.day}</span>${esc(previous.title)}</a>` : '<span></span>'}
          ${next ? `<a href="#/lesson/${next.slug}"><span class="kicker">Next · Day ${next.day}</span>${esc(next.title)}</a>` : '<a href="#/"><span class="kicker">Current endpoint</span>Return to course</a>'}
        </nav>
      </article>

      <aside class="sidebar">
        <div class="card toc-card">
          <h3>On this page</h3>
          <ol>
            ${pageLinks.map(link => `<li><a href="#/lesson/${lesson.slug}#${link.id}">${esc(link.label)}</a></li>`).join('')}
          </ol>
        </div>
      </aside>
    </div>`;

  renderMath();
}

function aboutPage() {
  app.innerHTML = `
    <section class="lesson-header">
      <div class="eyebrow">How to study</div>
      <h1>Use mathematics as a reading tool.</h1>
      <p class="lead">The course helps you read AI and ML papers. It does not try to compress a mathematics degree into one website.</p>
    </section>
    <section class="lesson-panel">
      <h2>Daily routine</h2>
      <ol class="practice">
        <li>Read the big idea before you read the formulas.</li>
        <li>Write the type and shape of each mathematical object.</li>
        <li>Recalculate every worked example with small numbers.</li>
        <li>Do the practice questions without looking back.</li>
        <li>Copy one equation from a paper and annotate every symbol.</li>
      </ol>
    </section>
    <section class="lesson-panel">
      <h2>Language policy</h2>
      <p>Lessons use short sentences and direct instructions. Each sentence should express one main action or idea where possible. A technical term stays only when it is necessary, and the lesson explains it before using it heavily.</p>
    </section>`;
}

function notFound() {
  app.innerHTML = `
    <section class="lesson-panel empty-state">
      <h1>Page not found</h1>
      <p><a href="#/">Return to the course index.</a></p>
    </section>`;
}

function route() {
  const rawHash = location.hash.slice(1) || '/';
  const [path] = rawHash.split('#');

  if (path === '/') courseHome();
  else if (path === '/about') aboutPage();
  else if (path.startsWith('/lesson/')) lessonPage(path.replace('/lesson/', ''));
  else notFound();

  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
