(() => {
  const appRoot = document.getElementById("app");

  function esc(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[character]));
  }

  function entries() {
    return Array.isArray(window.MATH_APPENDIX) ? window.MATH_APPENDIX : [];
  }

  function isCourseUnit(entry) {
    return entry.slug?.startsWith("applied-linear-algebra-unit-");
  }

  function cardLabel(entry) {
    return isCourseUnit(entry) ? "Course unit" : "Why?";
  }

  function entryEyebrow(entry) {
    return isCourseUnit(entry) ? "Applied linear algebra appendix" : "Why? · Concept appendix";
  }

  function ensureAppendixNavigation() {
    const nav = document.querySelector(".site-header nav");
    if (!nav || nav.querySelector('a[href="#/appendix"]')) return;

    const link = document.createElement("a");
    link.href = "#/appendix";
    link.textContent = "Appendix";

    const aboutLink = nav.querySelector('a[href="#/about"]');
    nav.insertBefore(link, aboutLink || null);
  }

  function renderAppendixMath() {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetClear?.([appRoot]);
      window.MathJax.typesetPromise([appRoot]).catch(error => {
        console.error("Appendix MathJax rendering failed:", error);
      });
    } else {
      window.setTimeout(renderAppendixMath, 60);
    }
  }

  function appendixIndexPage() {
    const items = entries();
    const courseUnits = items.filter(isCourseUnit);
    const explanations = items.filter(entry => !isCourseUnit(entry));

    const cards = group => group.map(entry => `
      <a class="appendix-card" href="#/appendix/${entry.slug}">
        <span class="appendix-card-label">${cardLabel(entry)}</span>
        <h2>${esc(entry.shortTitle || entry.title)}</h2>
        <p>${esc(entry.summary)}</p>
        <div class="appendix-card-source">From ${esc(entry.relatedLesson.label)} · ${esc(entry.relatedLesson.section)}</div>
      </a>`).join("");

    appRoot.innerHTML = `
      <section class="appendix-hero">
        <div class="eyebrow">Course appendix</div>
        <h1>Go deeper when you need the full mathematics.</h1>
        <p class="lead">The daily lessons keep the AI/ML path focused. The appendix contains deeper “why?” explanations and structured undergraduate mathematics units that support the course.</p>
      </section>
      ${courseUnits.length ? `
        <section class="stage">
          <div class="stage-heading">
            <h2>Stage 1 · Applied Linear Algebra</h2>
            <p>${courseUnits.length} undergraduate-depth units</p>
          </div>
          <div class="appendix-grid" aria-label="Applied linear algebra appendix units">${cards(courseUnits)}</div>
        </section>` : ""}
      ${explanations.length ? `
        <section class="stage">
          <div class="stage-heading">
            <h2>Why? explanations</h2>
            <p>Deeper explanations linked from lessons</p>
          </div>
          <div class="appendix-grid" aria-label="Concept explanations">${cards(explanations)}</div>
        </section>` : ""}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function appendixEntryPage(slug) {
    const entry = entries().find(item => item.slug === slug);
    if (!entry) {
      appRoot.innerHTML = `
        <section class="lesson-panel empty-state">
          <div class="eyebrow">Appendix</div>
          <h1>Explanation not found</h1>
          <p><a href="#/appendix">Return to the appendix.</a></p>
        </section>`;
      return;
    }

    appRoot.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Course</a> / <a href="#/appendix">Appendix</a></div>
      <header class="lesson-header appendix-entry-header">
        <div class="eyebrow">${entryEyebrow(entry)}</div>
        <h1>${esc(entry.title)}</h1>
        <p class="lead">${esc(entry.summary)}</p>
        <div class="lesson-meta">
          ${entry.tags.map(tag => `<span class="pill">${esc(tag)}</span>`).join("")}
        </div>
      </header>

      <div class="lesson-layout appendix-layout">
        <article class="lesson-content">
          <section class="lesson-panel appendix-entry">
            <div class="appendix-related">
              <span>Linked from</span>
              <a href="${entry.relatedLesson.href}">${esc(entry.relatedLesson.label)}</a>
              <strong>${esc(entry.relatedLesson.section)}</strong>
            </div>
            <div class="rich-copy">${entry.html}</div>
          </section>

          <nav class="lesson-nav" aria-label="Appendix navigation">
            <a href="${entry.relatedLesson.href}"><span class="kicker">Return to lesson</span>${esc(entry.relatedLesson.label)}</a>
            <a href="#/appendix"><span class="kicker">Browse</span>All appendix material</a>
          </nav>
        </article>

        <aside class="sidebar">
          <div class="card appendix-sidebar-card">
            <h3>${isCourseUnit(entry) ? "Stage 1 deeper study" : "Appendix purpose"}</h3>
            <p>${isCourseUnit(entry) ? "Use these units when you want a fuller applied-mathematics treatment of the linear algebra behind Days 1–4." : "Use these pages when a short lesson statement is correct but the reason is not yet intuitive."}</p>
            <a href="#/appendix">View all appendix material</a>
          </div>
        </aside>
      </div>`;

    window.scrollTo({ top: 0, behavior: "instant" });
    renderAppendixMath();
  }

  function handleAppendixRoute() {
    ensureAppendixNavigation();

    const rawHash = location.hash.slice(1) || "/";
    const [path] = rawHash.split("#");

    if (path === "/appendix") {
      appendixIndexPage();
      return;
    }

    if (path.startsWith("/appendix/")) {
      appendixEntryPage(path.replace("/appendix/", ""));
    }
  }

  ensureAppendixNavigation();
  window.addEventListener("hashchange", () => window.setTimeout(handleAppendixRoute, 0));
  window.addEventListener("DOMContentLoaded", () => window.setTimeout(handleAppendixRoute, 0));

  if (document.readyState !== "loading") {
    window.setTimeout(handleAppendixRoute, 0);
  }
})();