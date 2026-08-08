const app = document.getElementById('app');

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderMath() {
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetClear?.([app]);
    window.MathJax.typesetPromise([app]).catch(console.error);
  } else {
    setTimeout(renderMath, 60);
  }
}

function courseHome() {
  const stages = COURSE.map(section => {
    const cards = section.lessons.map(lesson => `
      <article class="card">
        <span class="day">Day ${lesson.day}</span>
        <h3><a href="#/lesson/${lesson.slug}">${esc(lesson.title)}</a></h3>
        <p>${esc(lesson.summary)}</p>
      </article>`).join('');
    return `
      <section class="stage">
        <div class="stage-heading">
          <h2>${esc(section.stage)}</h2>
          <p>${section.lessons.length} lesson${section.lessons.length === 1 ? '' : 's'}</p>
        </div>
        <div class="course-grid">${cards}</div>
      </section>`;
  }).join('');

  app.innerHTML = `
    <section class="hero">
      <div>
        <div class="eyebrow">Paper-oriented course</div>
        <h1>Read the math.<br>See the shape.<br>Build the intuition.</h1>
        <p class="lead">A ${LESSONS.length}-day mathematics course for reading important AI and ML papers. Each day uses small examples, explicit notation, shape checks, and short practice questions.</p>
      </div>
      <aside class="hero-card" aria-label="Course summary">
        <div class="metric"><strong>${LESSONS.length}</strong><span>daily lesson pages</span></div>
        <div class="metric"><strong>3+</strong><span>worked examples per day</span></div>
        <div class="metric"><strong>MathJax</strong><span>LaTeX-quality math rendering</span></div>
      </aside>
    </section>
    ${stages}`;
}

function lessonPage(slug) {
  const lesson = LESSONS.find(item => item.slug === slug);
  if (!lesson) return notFound();
  const index = LESSONS.indexOf(lesson);
  const prev = LESSONS[index - 1];
  const next = LESSONS[index + 1];

  app.innerHTML = `
    <div class="breadcrumbs"><a href="#/">Course</a> / Day ${lesson.day}</div>
    <header class="lesson-header">
      <div class="eyebrow">Day ${lesson.day} · ${esc(lesson.stage)}</div>
      <h1>${esc(lesson.title)}</h1>
      <p class="lead">${esc(lesson.summary)}</p>
      <div class="lesson-meta"><span class="pill">Read</span><span class="pill">Work examples</span><span class="pill">Practice</span></div>
    </header>

    <div class="lesson-layout">
      <article class="lesson-content">
        <section class="lesson-panel" id="idea">
          <h2>Big idea</h2>
          <p>${esc(lesson.explanation)}</p>
          <div class="callout"><strong>Reading rule:</strong> Before you manipulate an equation, name each object and write its shape.</div>
        </section>

        <section class="lesson-panel" id="topics">
          <h2>What you will learn</h2>
          <ul class="topic-list">${lesson.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        </section>

        <section class="lesson-panel" id="examples">
          <h2>Worked examples</h2>
          ${lesson.examples.map(([title, body], i) => `
            <div class="example">
              <div class="label">Example ${i + 1}</div>
              <h3>${esc(title)}</h3>
              <div class="math-block">${body}</div>
            </div>`).join('')}
        </section>

        <section class="lesson-panel" id="practice">
          <h2>Check your understanding</h2>
          <ol class="practice">${lesson.practice.map(q => `<li>${q}</li>`).join('')}</ol>
          <div class="callout"><strong>Study method:</strong> Do the calculation on paper first. Then verify it with a small NumPy or calculator example.</div>
        </section>

        <nav class="lesson-nav" aria-label="Lesson navigation">
          ${prev ? `<a href="#/lesson/${prev.slug}"><span class="kicker">Previous · Day ${prev.day}</span>${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a href="#/lesson/${next.slug}"><span class="kicker">Next · Day ${next.day}</span>${esc(next.title)}</a>` : '<a href="#/"><span class="kicker">Finished</span>Return to course</a>'}
        </nav>
      </article>

      <aside class="sidebar">
        <div class="card">
          <h3>On this page</h3>
          <ol>
            <li><a href="#/lesson/${lesson.slug}#idea">Big idea</a></li>
            <li><a href="#/lesson/${lesson.slug}#topics">What you will learn</a></li>
            <li><a href="#/lesson/${lesson.slug}#examples">Worked examples</a></li>
            <li><a href="#/lesson/${lesson.slug}#practice">Practice</a></li>
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
      <p class="lead">The course is designed to help you read AI and ML papers. It is not a mathematics degree compressed into a website.</p>
    </section>
    <section class="lesson-panel">
      <h2>Daily routine</h2>
      <ol class="practice">
        <li>Read the big idea before you read the formulas.</li>
        <li>Write the type and shape of each mathematical object.</li>
        <li>Recalculate every worked example with small numbers.</li>
        <li>Do the practice questions without looking back.</li>
        <li>When a lesson connects to a paper, copy one paper equation and annotate it.</li>
      </ol>
    </section>
    <section class="lesson-panel">
      <h2>Language policy</h2>
      <p>Lessons use short sentences and direct instructions. A sentence should express one main action or idea where possible. Technical terms are kept when the term is necessary, but the lesson explains the term before using it heavily.</p>
    </section>`;
}

function notFound() {
  app.innerHTML = `<section class="lesson-panel"><h1>Page not found</h1><p><a href="#/">Return to the course index.</a></p></section>`;
}

function route() {
  const raw = location.hash.slice(1) || '/';
  const [path] = raw.split('#');
  if (path === '/') courseHome();
  else if (path === '/about') aboutPage();
  else if (path.startsWith('/lesson/')) lessonPage(path.replace('/lesson/', ''));
  else notFound();
  window.scrollTo({top: 0, behavior: 'instant'});
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
