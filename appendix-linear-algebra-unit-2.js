window.MATH_APPENDIX.push({
  slug: "applied-linear-algebra-unit-2",
  title: "Applied Linear Algebra · Unit II: Least Squares, Determinants and Eigenvalues",
  shortTitle: "Applied Linear Algebra · Unit II",
  summary: "Develop orthogonality, projections, least squares, determinants, eigenvalues, dynamics, Markov matrices, and Fourier ideas with small numerical examples.",
  relatedLesson: {
    label: "Stage 1 · Days 2–4",
    section: "Geometry, least squares, determinants, and eigenvalues",
    href: "#/lesson/day-03-vector-spaces-and-geometry"
  },
  tags: ["Least squares", "Orthogonality", "Determinants", "Eigenvalues", "Dynamics"],
  html: String.raw`
    <div class="definition"><strong>Unit II goal.</strong> Move from exact linear systems to approximation and dynamics. Orthogonality gives the best approximation. Determinants describe invertibility and volume. Eigenvalues explain repeated transformations and time evolution.</div>

    <h2>1. Orthogonal Vectors and Subspaces</h2>
    <p>Two vectors are orthogonal when their dot product is zero:</p>
    <p>\[u^\top v=0.\]</p>
    <p>For \(u=(1,2)^\top\) and \(v=(2,-1)^\top\), \(u^\top v=2-2=0\).</p>
    <p>Two subspaces are orthogonal when every vector in one is orthogonal to every vector in the other. The row space and nullspace of a matrix are orthogonal complements. So are the column space and left nullspace.</p>
    <div class="paper-connection"><strong>ML connection.</strong> Orthogonality appears in PCA, QR factorization, decorrelated features, orthogonal initialization, and projection-based optimization.</div>

    <h2>2. Projections onto Subspaces</h2>
    <p>The projection of \(b\) onto a nonzero vector \(a\) is</p>
    <p>\[p=a\frac{a^\top b}{a^\top a}.\]</p>
    <p>Example: with \(a=(1,1)^\top\) and \(b=(3,1)^\top\),</p>
    <p>\[\frac{a^\top b}{a^\top a}=\frac4{2}=2,\qquad p=(2,2)^\top.\]</p>
    <p>The residual \(e=b-p=(1,-1)^\top\) is orthogonal to \(a\).</p>
    <p>For a matrix \(A\) whose columns span a subspace, the projection of \(b\) into that column space solves the least-squares problem.</p>

    <h2>3. Projection Matrices and Least Squares</h2>
    <p>If \(A\) has independent columns, the projection matrix onto \(C(A)\) is</p>
    <p>\[P=A(A^\top A)^{-1}A^\top.\]</p>
    <p>The best approximation is \(p=Pb=A\hat x\), where</p>
    <p>\[\hat x=(A^\top A)^{-1}A^\top b.\]</p>
    <p>This comes from the normal equations</p>
    <p>\[A^\top(A\hat x-b)=0.\]</p>
    <p>The residual is orthogonal to every column of \(A\).</p>
    <div class="paper-connection"><strong>ML connection.</strong> Ordinary linear regression is a least-squares projection. In practice, QR or SVD is usually preferred to explicitly forming \((A^\top A)^{-1}\).</div>

    <h2>4. Orthogonal Matrices and Gram-Schmidt</h2>
    <p>A square matrix \(Q\) is orthogonal when</p>
    <p>\[Q^\top Q=I,\qquad Q^{-1}=Q^\top.\]</p>
    <p>Orthogonal transformations preserve dot products and lengths.</p>
    <p>Gram-Schmidt converts independent vectors into an orthonormal basis. Given \(a_1,a_2\):</p>
    <p>\[q_1=\frac{a_1}{\|a_1\|},\qquad
       u_2=a_2-q_1(q_1^\top a_2),\qquad
       q_2=\frac{u_2}{\|u_2\|}.\]</p>
    <p>Collecting the \(q_i\) gives the QR factorization \(A=QR\).</p>

    <h2>5. Properties of Determinants</h2>
    <p>The determinant of a square matrix is a signed volume-scaling factor. For</p>
    <p>\[A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad \det A=ad-bc.\]</p>
    <p>Important properties:</p>
    <ul><li>\(\det(AB)=\det(A)\det(B)\).</li><li>\(\det(A^\top)=\det(A)\).</li><li>Swapping two rows changes the sign.</li><li>Multiplying one row by \(c\) multiplies the determinant by \(c\).</li><li>\(A\) is invertible exactly when \(\det A\ne0\).</li></ul>

    <h2>6. Determinant Formulas and Cofactors</h2>
    <p>A determinant can be expanded along a row or column using cofactors:</p>
    <p>\[\det A=\sum_j a_{ij}C_{ij},\qquad C_{ij}=(-1)^{i+j}M_{ij}.\]</p>
    <p>Here \(M_{ij}\) is the determinant of the minor obtained by deleting row \(i\) and column \(j\).</p>
    <p>Cofactor expansion is important conceptually, but elimination is usually much faster for numerical determinant computation.</p>

    <h2>7. Cramer's Rule, Inverse Matrix and Volume</h2>
    <p>Cramer’s rule expresses the solution of \(Ax=b\) as ratios of determinants:</p>
    <p>\[x_i=\frac{\det A_i}{\det A},\]</p>
    <p>where \(A_i\) replaces column \(i\) of \(A\) by \(b\). It is useful for theory but inefficient for large systems.</p>
    <p>The inverse can also be written using the adjugate:</p>
    <p>\[A^{-1}=\frac{1}{\det A}\operatorname{adj}(A).\]</p>
    <p>Geometrically, \(|\det A|\) is the factor by which \(A\) scales area or volume. If \(\det A=0\), an entire dimension collapses.</p>

    <h2>8. Eigenvalues and Eigenvectors</h2>
    <p>An eigenvector satisfies</p>
    <p>\[Av=\lambda v.\]</p>
    <p>The vector stays on the same line; only its scale changes. Eigenvalues solve</p>
    <p>\[\det(A-\lambda I)=0.\]</p>
    <p>For \(A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\), the eigenvalues are \(3\) and \(1\), with eigenvectors proportional to \((1,1)^\top\) and \((1,-1)^\top\).</p>

    <h2>9. Diagonalization and Powers of A</h2>
    <p>If \(A\) has a basis of eigenvectors,</p>
    <p>\[A=PDP^{-1}.\]</p>
    <p>Then</p>
    <p>\[A^k=PD^kP^{-1}.\]</p>
    <p>This makes repeated multiplication transparent because each eigenvector coordinate is raised through its eigenvalue: \(\lambda_i^k\).</p>
    <p><a class="why-link" href="#/appendix/why-p-inverse-gives-basis-coordinates">Why does \(P^{-1}x\) give the eigenvector coordinates?</a></p>

    <h2>10. Differential Equations and exp(At)</h2>
    <p>A linear differential equation</p>
    <p>\[\frac{dx}{dt}=Ax\]</p>
    <p>has solution</p>
    <p>\[x(t)=e^{At}x(0),\]</p>
    <p>where</p>
    <p>\[e^{At}=I+At+\frac{A^2t^2}{2!}+\cdots.\]</p>
    <p>If \(A=PDP^{-1}\), then</p>
    <p>\[e^{At}=Pe^{Dt}P^{-1},\]</p>
    <p>and \(e^{Dt}\) simply contains \(e^{\lambda_i t}\) on its diagonal. Eigenvalues therefore control growth, decay, and oscillation.</p>
    <div class="paper-connection"><strong>ML connection.</strong> Continuous-time neural networks, neural ODEs, diffusion dynamics, and stability analyses use the same matrix-exponential idea.</div>

    <h2>11. Markov Matrices; Fourier Series</h2>
    <h3>Markov matrices</h3>
    <p>A Markov transition matrix moves a probability vector from one step to the next:</p>
    <p>\[p_{t+1}=Ap_t.\]</p>
    <p>A stationary distribution satisfies \(Ap=p\), so it is an eigenvector with eigenvalue \(1\). Other eigenvalues control the rate at which transients decay.</p>
    <h3>Fourier series</h3>
    <p>Fourier series express a periodic function as a combination of orthogonal sine and cosine basis functions:</p>
    <p>\[f(t)=a_0+\sum_{k=1}^{\infty}\left(a_k\cos kt+b_k\sin kt\right).\]</p>
    <p>This is another change-of-basis problem: a function is represented by coordinates in a frequency basis.</p>

    <h2>12. Unit II synthesis</h2>
    <p>Orthogonality gives nearest points and least-squares solutions. Determinants test invertibility and measure volume. Eigenvalues convert repeated matrix action into independent scalar modes. These three ideas meet in PCA, regression, dynamical systems, Markov chains, and frequency methods.</p>
  `
});