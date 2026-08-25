(() => {
  const units = [
    {
      slug: "applied-linear-algebra-unit-1",
      summary: "A full undergraduate applied-linear-algebra unit on Ax=b, elimination, LU, inverses, pivot structure, bases, rank-nullity, the four fundamental subspaces, rank-one matrices, and graph incidence/Laplacian methods, with proofs and worked examples.",
      tags: ["Full course unit", "Linear systems", "LU", "Four subspaces", "Graphs"]
    },
    {
      slug: "applied-linear-algebra-unit-2",
      summary: "A full undergraduate applied-linear-algebra unit on orthogonality, projections, least squares, QR, determinants, eigenvalues, diagonalization, matrix powers, differential equations, Markov chains, and Fourier coordinates, with derivations and worked examples.",
      tags: ["Full course unit", "Least squares", "QR", "Eigenvalues", "Dynamics", "Fourier"]
    },
    {
      slug: "applied-linear-algebra-unit-3",
      summary: "A full undergraduate applied-linear-algebra unit on symmetric and positive-definite matrices, quadratic minima, complex/unitary matrices, FFT, Jordan form, SVD, linear transformations, basis changes, compression, and pseudoinverses, with proofs and applications.",
      tags: ["Full course unit", "Positive definite", "FFT", "SVD", "Jordan form", "Pseudoinverse"]
    }
  ];

  for (const metadata of units) {
    const entry = window.MATH_APPENDIX?.find(item => item.slug === metadata.slug);
    if (entry) Object.assign(entry, metadata);
  }

  // A bmatrix row break followed immediately by [T(b_1)] can be read as the
  // optional-spacing form of the row-break command. Separate the bracketed
  // coordinate vector from that command without changing the matrix entries.
  const unit3 = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-3");
  if (unit3) {
    const rowBreak = String.fromCharCode(92, 92);
    unit3.html = unit3.html.replace(
      `${rowBreak}[T(b_1)]_C`,
      `${rowBreak}{}[T(b_1)]_C`
    );
  }
})();