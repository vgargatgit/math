(() => {
  const stage1Lessons = COURSE[0]?.lessons?.slice(0, 4) || [];
  const recommendations = [
    "Start with Unit I for notation, systems, pivots, subspaces, basis, rank, and graphs.",
    "Unit I extends matrix mechanics; Unit II adds orthogonality, least squares, determinants, and eigenvalues.",
    "Unit II is the closest continuation of vector geometry; Unit III adds SVD, positive definiteness, and change of basis.",
    "Unit II deepens eigenvalues and diagonalization; Unit III continues with positive definite matrices, SVD, Jordan form, and pseudoinverses."
  ];

  stage1Lessons.forEach((lesson, index) => {
    lesson.sections = lesson.sections || [];
    if (lesson.sections.some(section => section.id === "applied-linear-algebra-appendix")) return;

    lesson.sections.push({
      id: "applied-linear-algebra-appendix",
      title: "Stage 1 deeper study: Applied Linear Algebra Appendix",
      html: String.raw`
        <p>The daily lesson keeps the main AI/ML path focused. Use this optional appendix when you want the depth of a typical applied mathematics undergraduate linear algebra course.</p>
        <div class="paper-connection"><strong>Recommended from this day.</strong> ${recommendations[index]}</div>
        <div class="appendix-unit-links">
          <p><a class="why-link" href="#/appendix/applied-linear-algebra-unit-1"><strong>Unit I · \(Ax=b\) and the Four Subspaces</strong></a><br>Elimination, LU, column/null spaces, basis, dimension, rank, four fundamental subspaces, and graph incidence matrices.</p>
          <p><a class="why-link" href="#/appendix/applied-linear-algebra-unit-2"><strong>Unit II · Least Squares, Determinants and Eigenvalues</strong></a><br>Orthogonality, projections, QR/Gram-Schmidt, determinants, diagonalization, matrix exponentials, Markov matrices, and Fourier series.</p>
          <p><a class="why-link" href="#/appendix/applied-linear-algebra-unit-3"><strong>Unit III · Positive Definite Matrices and Applications</strong></a><br>Positive definiteness, FFT, Jordan form, SVD, linear transformations, change of basis, compression, and pseudoinverses.</p>
        </div>
      `
    });
  });
})();