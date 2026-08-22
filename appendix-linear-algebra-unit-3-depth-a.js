(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-3");
  if (!entry) return;
  const marker = "<h2>Unit III recap</h2>";
  const extra = String.raw`
    <hr>
    <h2>Deep Dive A: Symmetry, positive definiteness, minima, complex matrices, FFT, and Jordan form</h2>

    <h3>A1. Spectral theorem for real symmetric matrices</h3>
    <div class="definition"><strong>Spectral theorem.</strong> Every real symmetric matrix \(A=A^\top\) has an orthonormal basis of eigenvectors. Therefore \(A=Q\Lambda Q^\top\) with \(Q^\top Q=I\).</div>
    <p>Two key facts make this possible. First, eigenvalues of a real symmetric matrix are real. Second, eigenvectors associated with distinct eigenvalues are orthogonal.</p>
    <p><strong>Proof of orthogonality.</strong> Suppose \(Au=\lambda u\) and \(Av=\mu v\). Since \(A=A^\top\),</p>
    <p>\[u^\top Av=(A u)^\top v.\]</p>
    <p>The left side is \(\mu u^\top v\), while the right side is \(\lambda u^\top v\). Hence</p>
    <p>\[(\mu-\lambda)u^\top v=0.\]</p>
    <p>If \(\lambda\ne\mu\), then \(u^\top v=0\).</p>

    <h3>A2. Positive definiteness and eigenvalues</h3>
    <p>Let \(A=Q\Lambda Q^\top\) be symmetric. For any nonzero \(x\), write \(y=Q^\top x\). Because \(Q\) is orthogonal, \(x\ne0\Rightarrow y\ne0\). Then</p>
    <p>\[x^\top Ax=x^\top Q\Lambda Q^\top x=y^\top\Lambda y=\sum_i\lambda_i y_i^2.\]</p>
    <p>This proves:</p>
    <ul><li>\(A\succ0\) exactly when every \(\lambda_i>0\).</li><li>\(A\succeq0\) exactly when every \(\lambda_i\ge0\).</li></ul>
    <p>The eigenbasis converts the quadratic form into a weighted sum of squares.</p>

    <h3>A3. Sylvester's criterion</h3>
    <p>For a real symmetric matrix, positive definiteness is also equivalent to all leading principal minors being positive.</p>
    <p>For a \(2\times2\) matrix</p>
    <p>\[A=\begin{bmatrix}a&b\\b&d\end{bmatrix},\]</p>
    <p>the conditions are</p>
    <p>\[a>0,\qquad ad-b^2>0.\]</p>
    <p>Example:</p>
    <p>\[A=\begin{bmatrix}2&1\\1&3\end{bmatrix}.\]</p>
    <p>Here \(2>0\) and \(2\cdot3-1=5>0\), so \(A\) is positive definite.</p>

    <h3>A4. Positive definite quadratic bowls</h3>
    <p>Consider</p>
    <p>\[f(x)=\frac12x^\top Ax-b^\top x+c\]</p>
    <p>with symmetric positive definite \(A\). The gradient and Hessian are</p>
    <p>\[\nabla f=Ax-b,\qquad \nabla^2f=A.\]</p>
    <p>The stationary point is \(x^*=A^{-1}b\).</p>
    <p>To prove that it is the global minimum, set \(x=x^*+h\). Since \(Ax^*=b\), expand:</p>
    <p>\[f(x^*+h)=f(x^*)+\frac12h^\top Ah.\]</p>
    <p>Because \(A\succ0\), the extra term is positive for every nonzero \(h\). Therefore \(x^*\) is the unique global minimum.</p>

    <h3>A5. Curvature and condition number</h3>
    <p>In the eigenbasis of \(A\), the quadratic is</p>
    <p>\[f\sim\frac12\sum_i\lambda_i y_i^2.\]</p>
    <p>A large eigenvalue means steep curvature; a small positive eigenvalue means shallow curvature. The 2-norm condition number is</p>
    <p>\[\kappa_2(A)=\frac{\lambda_{\max}}{\lambda_{\min}}\]</p>
    <p>for symmetric positive definite \(A\). A large condition number produces an elongated bowl and can slow gradient descent.</p>

    <h3>A6. Complex vectors and conjugate transpose</h3>
    <p>For complex vectors, the inner product uses complex conjugation:</p>
    <p>\[\langle x,y\rangle=x^*y=\overline{x}^\top y.\]</p>
    <p>This choice guarantees \(x^*x=\sum_i|x_i|^2\ge0\).</p>
    <p>A matrix is unitary when</p>
    <p>\[U^*U=I.\]</p>
    <p>Unitary matrices preserve complex inner products and norms just as orthogonal matrices do over the reals.</p>

    <h3>A7. The DFT matrix is unitary up to normalization</h3>
    <p>Let \(\omega=e^{-2\pi i/N}\). The DFT matrix has entries</p>
    <p>\[F_{kn}=\omega^{kn}.\]</p>
    <p>The inner product between two distinct columns is a finite geometric series:</p>
    <p>\[\sum_{n=0}^{N-1}\omega^{(k-\ell)n}=0\qquad(k\ne\ell).\]</p>
    <p>For equal columns, the sum is \(N\). Therefore</p>
    <p>\[F^*F=NI.\]</p>
    <p>So \(F/\sqrt N\) is unitary. Fourier coefficients are again coordinates in an orthogonal basis, now a complex exponential basis.</p>

    <h3>A8. A four-point DFT example</h3>
    <p>Take \(x=(1,0,-1,0)^\top\), \(N=4\), and \(\omega=e^{-2\pi i/4}=-i\). Then</p>
    <p>\[X_k=\sum_{n=0}^{3}x_n\omega^{kn}.\]</p>
    <p>We obtain \(X_0=0\), \(X_1=2\), \(X_2=0\), \(X_3=2\). The signal is represented by two frequency components.</p>

    <h3>A9. Why the FFT is faster</h3>
    <p>The direct DFT computes \(N\) outputs, each requiring \(N\) terms, for \(O(N^2)\) work.</p>
    <p>When \(N\) is even, split the sum into even and odd indices:</p>
    <p>\[X_k=\sum_{m=0}^{N/2-1}x_{2m}\omega^{2mk}+\omega^k\sum_{m=0}^{N/2-1}x_{2m+1}\omega^{2mk}.\]</p>
    <p>Since \(\omega^2\) is an \(N/2\)-point root of unity, each sum is an \(N/2\)-point DFT. This gives the recurrence</p>
    <p>\[T(N)=2T(N/2)+O(N),\]</p>
    <p>whose solution is \(T(N)=O(N\log N)\).</p>

    <h3>A10. Similar matrices as the same map in different coordinates</h3>
    <p>Suppose \(P\) converts new-basis coordinates into old-basis coordinates. If \(c\) are coordinates in the new basis, then \(x=Pc\). Apply \(A\):</p>
    <p>\[Ax=APc.\]</p>
    <p>Convert the output back to the new basis:</p>
    <p>\[P^{-1}APc.\]</p>
    <p>Thus the matrix representing the same transformation in the new basis is</p>
    <p>\[B=P^{-1}AP.\]</p>
    <p>This is why similar matrices share basis-independent quantities such as determinant, trace, rank, and eigenvalues.</p>

    <h3>A11. Why some matrices are not diagonalizable</h3>
    <p>Consider</p>
    <p>\[A=\begin{bmatrix}1&1\\0&1\end{bmatrix}.\]</p>
    <p>The only eigenvalue is \(\lambda=1\) with algebraic multiplicity \(2\). Solve</p>
    <p>\[(A-I)v=\begin{bmatrix}0&1\\0&0\end{bmatrix}v=0.\]</p>
    <p>This forces \(v_2=0\), so the eigenspace is only one-dimensional. We need two independent eigenvectors to diagonalize a \(2\times2\) matrix, but only one exists.</p>

    <h3>A12. Jordan chains</h3>
    <p>For the defective matrix above, choose eigenvector \(v_1=(1,0)^\top\). A generalized eigenvector \(v_2\) satisfies</p>
    <p>\[(A-I)v_2=v_1.\]</p>
    <p>Taking \(v_2=(0,1)^\top\) works. The pair forms a Jordan chain. In the basis \(P=[v_1\;v_2]\), the matrix becomes the Jordan block</p>
    <p>\[J=\begin{bmatrix}1&1\\0&1\end{bmatrix}.\]</p>
    <p>Jordan form is conceptually useful because it describes exactly how diagonalization fails, but it is sensitive to perturbations and is rarely used for stable numerical computation.</p>
  `;
  if (!entry.html.includes("Deep Dive A: Symmetry")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();