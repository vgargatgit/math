window.MATH_APPENDIX.push({
  slug: "applied-linear-algebra-unit-3",
  title: "Applied Linear Algebra · Unit III: Positive Definite Matrices and Applications",
  shortTitle: "Applied Linear Algebra · Unit III",
  summary: "Complete the Stage 1 bridge with positive definiteness, complex matrices, FFT, Jordan form, SVD, change of basis, compression, and pseudoinverses.",
  relatedLesson: {
    label: "Stage 1 · Days 3–4",
    section: "Spectral and applied linear algebra",
    href: "#/lesson/day-04-spectral-linear-algebra"
  },
  tags: ["Positive definite", "SVD", "FFT", "Jordan form", "Pseudoinverse"],
  html: String.raw`
    <div class="definition"><strong>Unit III goal.</strong> Connect the geometric ideas from Stage 1 to the tools used in optimization, signal processing, compression, and numerical ML.</div>

    <h2>1. Symmetric Matrices and Positive Definiteness</h2>
    <p>A real symmetric matrix satisfies \(A=A^\top\). It has real eigenvalues and an orthonormal eigenvector basis:</p>
    <p>\[A=Q\Lambda Q^\top.\]</p>
    <p>A symmetric matrix is positive definite when</p>
    <p>\[x^\top A x>0\qquad\text{for every }x\ne0.\]</p>
    <p>It is positive semidefinite when the inequality is \(\ge0\). For symmetric matrices, positive definiteness is equivalent to all eigenvalues being positive.</p>
    <p>Example: \(A=\operatorname{diag}(2,5)\) gives \(x^\top A x=2x_1^2+5x_2^2>0\) for every nonzero \(x\).</p>
    <div class="paper-connection"><strong>ML connection.</strong> Covariance matrices are PSD. Hessians use positive definiteness to characterize local minima. Kernel matrices must satisfy PSD conditions.</div>

    <h2>2. Complex Matrices; Fast Fourier Transform (FFT)</h2>
    <p>Complex numbers are essential for frequency-domain linear algebra. For a complex matrix, the conjugate transpose is</p>
    <p>\[A^*=\overline{A}^\top.\]</p>
    <p>A unitary matrix satisfies \(U^*U=I\), the complex analogue of an orthogonal matrix.</p>
    <p>The discrete Fourier transform is a matrix multiplication</p>
    <p>\[X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i kn/N}.\]</p>
    <p>A direct DFT costs \(O(N^2)\). The FFT exploits symmetry and factorization to reduce the cost to \(O(N\log N)\).</p>
    <div class="paper-connection"><strong>ML connection.</strong> FFTs appear in signal models, convolution acceleration, spectral neural operators, positional/frequency analysis, and efficient long-sequence methods.</div>

    <h2>3. Positive Definite Matrices and Minima</h2>
    <p>Consider a quadratic objective</p>
    <p>\[f(x)=\frac12x^\top A x-b^\top x.\]</p>
    <p>If \(A\) is symmetric positive definite, then</p>
    <p>\[\nabla f(x)=Ax-b,\qquad \nabla^2f(x)=A.\]</p>
    <p>The stationary point solves \(Ax=b\), and it is the unique global minimum.</p>
    <p>The eigenvalues of \(A\) describe curvature. A large condition number means very different curvature in different directions, which can make gradient descent slow.</p>

    <h2>4. Similar Matrices and Jordan Form</h2>
    <p>Matrices \(A\) and \(B\) are similar when</p>
    <p>\[B=P^{-1}AP.\]</p>
    <p>They represent the same linear transformation in different bases. Similar matrices have the same eigenvalues, determinant, trace, and characteristic polynomial.</p>
    <p>Not every matrix is diagonalizable. A defective matrix can instead be written in Jordan form:</p>
    <p>\[A=PJP^{-1}.\]</p>
    <p>A Jordan block has the form</p>
    <p>\[J=\begin{bmatrix}\lambda&1&0\\0&\lambda&1\\0&0&\lambda\end{bmatrix}.\]</p>
    <p>The extra ones record coupling between generalized eigenvectors. Jordan form is mainly a theoretical tool because it is numerically fragile.</p>

    <h2>5. Singular Value Decomposition</h2>
    <p>Every real matrix \(A\in\mathbb{R}^{m\times n}\) has an SVD:</p>
    <p>\[A=U\Sigma V^\top.\]</p>
    <p>The columns of \(V\) are right singular vectors, the columns of \(U\) are left singular vectors, and the nonnegative diagonal entries of \(\Sigma\) are singular values.</p>
    <p>Geometrically:</p>
    <ol><li>\(V^\top\) rotates into special input directions.</li><li>\(\Sigma\) stretches each direction.</li><li>\(U\) rotates into the output space.</li></ol>
    <p>The singular values satisfy</p>
    <p>\[A^\top A=V\Sigma^2V^\top.\]</p>
    <p>So \(\sigma_i^2\) are eigenvalues of \(A^\top A\).</p>

    <h2>6. Linear Transformations and their Matrices</h2>
    <p>A linear transformation \(T:V\to W\) satisfies</p>
    <p>\[T(\alpha u+\beta v)=\alpha T(u)+\beta T(v).\]</p>
    <p>Once bases are chosen for \(V\) and \(W\), the transformation is represented by a matrix. Its columns are the coordinate vectors of the transformed basis vectors.</p>
    <p>If the standard basis is \(e_1,e_2\), then the matrix of \(T\) is</p>
    <p>\[A=\begin{bmatrix}|&|\\T(e_1)&T(e_2)\\|&|\end{bmatrix}.\]</p>
    <p>This is why matrix columns encode what the transformation does to basis directions.</p>

    <h2>7. Change of Basis; Image Compression</h2>
    <p>If the columns of \(P\) are a basis, then</p>
    <p>\[x=Pc,\qquad c=P^{-1}x.\]</p>
    <p>Changing basis does not change the geometric vector. It changes its coordinates.</p>
    <p>Low-rank SVD gives a useful basis for compression. If</p>
    <p>\[A=\sum_{i=1}^{r}\sigma_i u_i v_i^\top,\]</p>
    <p>then the best rank-\(k\) approximation in Frobenius or spectral norm is</p>
    <p>\[A_k=\sum_{i=1}^{k}\sigma_i u_i v_i^\top.\]</p>
    <p>For an image matrix, keeping only the largest singular components stores large-scale structure while discarding smaller components.</p>
    <div class="paper-connection"><strong>ML connection.</strong> Truncated SVD appears in PCA, latent semantic analysis, low-rank adapters, embedding compression, and approximate matrix multiplication.</div>

    <h2>8. Left and Right Inverses; Pseudoinverse</h2>
    <p>A rectangular matrix cannot have a two-sided inverse, but it can have a one-sided inverse.</p>
    <p>If \(A\in\mathbb{R}^{m\times n}\) has independent columns with \(m\ge n\), then</p>
    <p>\[A_{\text{left}}^{-1}=(A^\top A)^{-1}A^\top\]</p>
    <p>satisfies \(A_{\text{left}}^{-1}A=I_n\).</p>
    <p>If \(A\) has independent rows with \(m\le n\), then</p>
    <p>\[A_{\text{right}}^{-1}=A^\top(AA^\top)^{-1}\]</p>
    <p>satisfies \(AA_{\text{right}}^{-1}=I_m\).</p>
    <p>The Moore-Penrose pseudoinverse works for every matrix. Using the SVD,</p>
    <p>\[A^+=V\Sigma^+U^\top,\]</p>
    <p>where nonzero singular values are replaced by reciprocals.</p>
    <p>If \(Ax=b\) is inconsistent, \(x=A^+b\) gives a least-squares solution. If many exact solutions exist, it gives the minimum-norm solution.</p>
    <div class="shape-check"><strong>Shape check.</strong> If \(A\) is \(m\times n\), then \(A^+\) is \(n\times m\).</div>

    <h2>9. Applied synthesis: one matrix, many views</h2>
    <p>Given a data matrix \(X\), you can ask:</p>
    <ul><li>What is its rank?</li><li>What information lies in its column and null spaces?</li><li>What least-squares solution best matches a target?</li><li>What singular directions carry most energy?</li><li>Is \(X^\top X\) well conditioned?</li><li>Can a low-rank approximation compress it?</li></ul>
    <p>These are not separate tricks. They are different views of the same linear transformation.</p>

    <h2>Unit III recap</h2>
    <p>Positive definite matrices connect linear algebra to convex minima. Complex/unitary matrices connect it to Fourier analysis. Jordan form handles the failure of diagonalization. SVD generalizes spectral ideas to every rectangular matrix. Pseudoinverses complete the story by solving approximate or underdetermined systems.</p>
  `
});