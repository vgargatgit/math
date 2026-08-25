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

  // A row break immediately followed by [T(b_1)] can be parsed as the optional
  // spacing form of \\ inside a bmatrix and can also look like a display-math
  // opener to delimiter validation. Separate the row break from the bracketed
  // coordinate vector without changing the mathematical content.
  const unit3 = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-3");
  if (unit3) {
    unit3.html = unit3.html.replace(
      String.raw`\\\\[T(b_1)]_C`,
      String.raw`\\\\{}[T(b_1)]_C`
    );
  }
})();