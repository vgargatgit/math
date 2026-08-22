(() => {
  function slugify(text, index) {
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `unit-section-${index + 1}-${base || 'topic'}`;
  }

  function enhanceCourseUnit() {
    const path = (location.hash.slice(1) || '/').split('#')[0];
    if (!path.startsWith('/appendix/applied-linear-algebra-unit-')) return;

    const article = document.querySelector('.appendix-entry .rich-copy');
    const sidebarCard = document.querySelector('.appendix-sidebar-card');
    if (!article || !sidebarCard) return;

    const headings = [...article.querySelectorAll('h2')];
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = slugify(heading.textContent || '', index);
      heading.style.scrollMarginTop = '88px';
    });

    sidebarCard.querySelector('.course-unit-toc')?.remove();
    const toc = document.createElement('div');
    toc.className = 'course-unit-toc';
    toc.innerHTML = `
      <hr>
      <h3>In this unit</h3>
      <ol>${headings.map(heading => `<li><a href="#" data-course-section="${heading.id}">${heading.textContent}</a></li>`).join('')}</ol>`;
    sidebarCard.appendChild(toc);

    toc.querySelectorAll('[data-course-section]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById(link.dataset.courseSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  const run = () => window.setTimeout(enhanceCourseUnit, 20);
  window.addEventListener('hashchange', run);
  window.addEventListener('DOMContentLoaded', run);
  if (document.readyState !== 'loading') run();
})();