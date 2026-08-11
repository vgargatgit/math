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
    appRoot.innerHTML = `
      <section class="appendix-hero">
        <div class="eyebrow">Concept appendix</div>
        <h1>Why does this work?</h1>
        <p class="lead">Lessons keep the main path focused. Deeper explanations, proofs of intuition, and answers to important “why?” questions live here.</p>
      </section>
      <section class="appendix-grid" aria-label="Appendix explanations">
        ${items.map(entry => `
          <a class="appendix-card" href="#/appendix/${entry.slug}">
            <span class="appendix-card-label">Why?</span>
            <h2>${esc(entry.shortTitle || entry.title)}</h2>
            <p>${esc(entry.summary)}</p>
            <div class="appendix-card-source">From ${esc(entry.relatedLesson.label)} · ${esc(entry.relatedLesson.section)}</div>
          </a>`).join("")}
      </section>`;
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
        <div class="eyebrow">Why? · Concept appendix</div>
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
            <a href="#/appendix"><span class="kicker">Browse</span>All appendix explanations</a>
          </nav>
        </article>

        <aside class="sidebar">
          <div class="card appendix-sidebar-card">
            <h3>Appendix purpose</h3>
            <p>Use these pages when a short lesson statement is correct but the reason is not yet intuitive.</p>
            <a href="#/appendix">View all explanations</a>
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
