(() => {
  const section = COURSE[0]?.lessons?.[3]?.sections?.find(
    ({ id }) => id === "diagonalization"
  );

  if (!section) {
    console.warn("Day 4 diagonalization section was not found for appendix linking.");
    return;
  }

  const appendixHref = "#/appendix/why-p-inverse-gives-basis-coordinates";
  if (section.html.includes(appendixHref)) return;

  const statement = String.raw`\(P^{-1}\) changes coordinates into the eigenvector basis.`;
  const linkedStatement = String.raw`${statement} <a class="why-link" href="${appendixHref}" aria-label="Why does P inverse x give basis coordinates?">Why?</a>`;

  if (!section.html.includes(statement)) {
    console.warn("The P inverse coordinate-change statement was not found.");
    return;
  }

  section.html = section.html.replace(statement, linkedStatement);
})();
