(() => {
  const entry = window.MATH_APPENDIX?.find(
    item => item.slug === "applied-linear-algebra-unit-3"
  );
  if (!entry || entry.html.includes('id="unit3-strang-refinement-a"')) return;

  const marker = "<h2>Unit III recap</h2>";
  if (!entry.html.includes(marker)) {
    console.warn("Unit III recap marker was not found for refinement A.");
    return;
  }

  entry.summary = "A full undergraduate applied-linear-algebra unit, aligned with the conceptual order of MIT 18.06SC, covering symmetric and positive-definite matrices, complex and Fourier matrices, quadratic minima, similarity, Jordan form, SVD, transformations, compression, and pseudoinverses with proofs and worked examples.";

  const extra = String.raw`
    <hr>
    <div id="unit3-strang-refinement-a"></div>
    <h2>Strang-style development A: symmetric matrices, positive definiteness, FFT, minima, and Jordan form</h2>
    <div class="paper-connection">
      <strong>Session sequence.</strong> This development follows the first half of Professor Gilbert Strang's MIT OpenCourseWare 18.06SC Unit III: symmetric matrices and positive definiteness, complex matrices and the FFT, positive-definite matrices and minima, and similar matrices with Jordan form. The explanations and examples are original and adapted for this AI/ML mathematics project.
      <p class="source-links">
        <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/symmetric-matrices-and-positive-definiteness/" target="_blank" rel="noopener noreferrer">Symmetric Matrices and Positive Definiteness</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/complex-matrices-fast-fourier-transform-fft/" target="_blank" rel="noopener noreferrer">Complex Matrices and FFT</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/positive-definite-matrices-and-minima/" target="_blank" rel="noopener noreferrer">Positive Definite Matrices and Minima</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/similar-matrices-and-jordan-form/" target="_blank" rel="noopener noreferrer">Similar Matrices and Jordan Form</a>
      </p>
    </div>

    <h3>A0. Why symmetric matrices are the best-behaved square matrices</h3>
    <p>A real matrix is symmetric when</p>
    <p>\[
    A=A^\top.
    \]</p>
    <p>For a general square matrix, eigenvalues can be complex and eigenvectors can point in awkward, non-orthogonal directions. A real symmetric matrix has a much cleaner structure:</p>
    <ul>
      <li>all eigenvalues are real;</li>
      <li>eigenvectors for distinct eigenvalues are orthogonal;</li>
      <li>an orthonormal eigenvector basis always exists;</li>
      <li>the matrix can be diagonalized as \(A=Q\Lambda Q^\top\).</li>
    </ul>
    <div class="definition">
      <strong>Spectral theorem.</strong> For every real symmetric matrix \(A\in\mathbb{R}^{n\times n}\), there is an orthogonal matrix
      \[
      Q=\begin{bmatrix}\mid&\mid&&\mid\\q_1&q_2&\cdots&q_n\\\mid&\mid&&\mid\end{bmatrix}
      \]
      and a real diagonal matrix \(\Lambda\) such that
      \[
      A=Q\Lambda Q^\top.
      \]
    </div>

    <h3>A1. Why eigenvectors for different eigenvalues are orthogonal</h3>
    <p>Suppose</p>
    <p>\[
    Au=\lambda u,
    \qquad
    Av=\mu v,
    \qquad
    \lambda\ne\mu.
    \]</p>
    <p>Because \(A=A^\top\),</p>
    <p>\[
    u^\top Av=(Au)^\top v.
    \]</p>
    <p>Use the eigenvector equations:</p>
    <p>\[
    \mu u^\top v=\lambda u^\top v.
    \]</p>
    <p>Therefore</p>
    <p>\[
    (\mu-\lambda)u^\top v=0.
    \]</p>
    <p>Since \(\mu\ne\lambda\),</p>
    <p>\[
    \boxed{u^\top v=0}.
    \]</p>
    <p>This proof is one reason symmetry matters so much: transposing \(A\) moves it from one side of the inner product to the other without changing it.</p>

    <h3>A2. Why the eigenvalues of a real symmetric matrix are real</h3>
    <p>To include the possibility of a complex eigenvector, use the conjugate transpose \(^*\). Suppose</p>
    <p>\[
    Az=\lambda z,
    \qquad z\ne0.
    \]</p>
    <p>Then</p>
    <p>\[
    z^*Az=\lambda z^*z.
    \]</p>
    <p>For a real symmetric matrix, \(A^*=A\). Therefore the scalar \(z^*Az\) equals its own complex conjugate and is real. Also \(z^*z>0\). Hence</p>
    <p>\[
    \lambda=\frac{z^*Az}{z^*z}
    \]</p>
    <p>is real.</p>

    <h3>A3. Quadratic forms become weighted sums of squares</h3>
    <p>Let \(A=Q\Lambda Q^\top\), and set</p>
    <p>\[
    y=Q^\top x.
    \]</p>
    <p>Because \(Q\) is orthogonal, this is only a rotation or reflection of coordinates. Then</p>
    <p>\[
    x^\top Ax
    =x^\top Q\Lambda Q^\top x
    =y^\top\Lambda y
    =\sum_{i=1}^{n}\lambda_i y_i^2.
    \]</p>
    <div class="mini-example">
      <strong>Geometric meaning.</strong> In eigenvector coordinates, a symmetric quadratic form has no cross terms. Each eigenvalue independently controls curvature along one orthogonal eigenvector direction.
    </div>

    <h3>A4. Equivalent tests for positive definiteness</h3>
    <p>A symmetric matrix is positive definite, written \(A\succ0\), when</p>
    <p>\[
    x^\top Ax>0
    \qquad\text{for every }x\ne0.
    \]</p>
    <p>For a real symmetric matrix, the following tests are equivalent:</p>
    <ol>
      <li>\(x^\top Ax>0\) for every nonzero \(x\);</li>
      <li>every eigenvalue is positive;</li>
      <li>every elimination pivot is positive when elimination proceeds without row exchanges;</li>
      <li>every leading principal determinant is positive;</li>
      <li>there is an invertible \(R\) such that \(A=R^\top R\) (Cholesky form).</li>
    </ol>

    <h4>Why positive eigenvalues are equivalent to a positive quadratic form</h4>
    <p>Using eigenvector coordinates,</p>
    <p>\[
    x^\top Ax=\sum_i\lambda_i y_i^2.
    \]</p>
    <p>If every \(\lambda_i>0\), the sum is positive for every nonzero \(y\). Conversely, if some \(\lambda_j\le0\), choose \(x=q_j\). Then</p>
    <p>\[
    x^\top Ax=q_j^\top Aq_j=\lambda_j,
    \]</p>
    <p>so the quadratic form cannot be positive for every nonzero \(x\).</p>

    <h3>A5. The \(2\times2\) positive-definite test</h3>
    <p>For</p>
    <p>\[
    A=\begin{bmatrix}a&b\\b&d\end{bmatrix},
    \]</p>
    <p>the leading-principal-minor test is</p>
    <p>\[
    a>0,
    \qquad
    ad-b^2>0.
    \]</p>
    <p>Complete the square:</p>
    <p>\[
    \begin{aligned}
    x^\top Ax
    &=ax_1^2+2bx_1x_2+dx_2^2\\
    &=a\left(x_1+\frac{b}{a}x_2\right)^2
      +\left(d-\frac{b^2}{a}\right)x_2^2.
    \end{aligned}
    \]</p>
    <p>The first coefficient is positive when \(a>0\). The second coefficient is positive when</p>
    <p>\[
    d-\frac{b^2}{a}>0
    \quad\Longleftrightarrow\quad
    ad-b^2>0.
    \]</p>

    <h4>Numerical example</h4>
    <p>Let</p>
    <p>\[
    A=\begin{bmatrix}2&1\\1&3\end{bmatrix}.
    \]</p>
    <p>The leading principal determinants are</p>
    <p>\[
    2>0,
    \qquad
    \det A=6-1=5>0.
    \]</p>
    <p>Therefore \(A\succ0\).</p>

    <h3>A6. Positive semidefinite matrices and \(A^\top A\)</h3>
    <p>A symmetric matrix is positive semidefinite, written \(A\succeq0\), when</p>
    <p>\[
    x^\top Ax\ge0
    \qquad\text{for every }x.
    \]</p>
    <p>For every matrix \(B\),</p>
    <p>\[
    B^\top B\succeq0
    \]</p>
    <p>because</p>
    <p>\[
    x^\top B^\top Bx=\|Bx\|_2^2\ge0.
    \]</p>
    <p>Moreover,</p>
    <p>\[
    x^\top B^\top Bx=0
    \quad\Longleftrightarrow\quad
    Bx=0.
    \]</p>
    <p>Thus</p>
    <p>\[
    N(B^\top B)=N(B).
    \]</p>
    <div class="paper-connection">
      <strong>ML connection.</strong> Gram matrices, covariance matrices, kernel matrices, and Gauss-Newton matrices often have the form \(B^\top B\) or an expectation of such matrices, so positive semidefiniteness comes for free.
    </div>

    <h3>A7. Cholesky factorization and positive pivots</h3>
    <p>If \(A\succ0\), elimination can be organized into</p>
    <p>\[
    A=LDL^\top,
    \]</p>
    <p>where \(L\) is unit lower triangular and \(D\) has positive diagonal entries. Taking square roots of \(D\) gives</p>
    <p>\[
    A=R^\top R.
    \]</p>
    <p>Then</p>
    <p>\[
    x^\top Ax=x^\top R^\top Rx=\|Rx\|_2^2>0
    \]</p>
    <p>for every nonzero \(x\), because an invertible \(R\) cannot map a nonzero vector to zero.</p>

    <h3>A8. Positive-definite matrices and quadratic minima</h3>
    <p>Consider</p>
    <p>\[
    f(x)=\frac12x^\top Ax-b^\top x+c,
    \]</p>
    <p>with symmetric \(A\). Then</p>
    <p>\[
    \nabla f(x)=Ax-b,
    \qquad
    \nabla^2f(x)=A.
    \]</p>
    <p>If \(A\succ0\), the stationary point</p>
    <p>\[
    x_*=A^{-1}b
    \]</p>
    <p>is the unique global minimum.</p>

    <h4>Proof by completing the quadratic</h4>
    <p>Write \(x=x_*+h\). Because \(Ax_*=b\),</p>
    <p>\[
    \begin{aligned}
    f(x_*+h)
    &=\frac12(x_*+h)^\top A(x_*+h)-b^\top(x_*+h)+c\\
    &=f(x_*)+\frac12h^\top Ah.
    \end{aligned}
    \]</p>
    <p>Since \(A\succ0\),</p>
    <p>\[
    h\ne0\quad\Longrightarrow\quad h^\top Ah>0.
    \]</p>
    <p>Therefore every point other than \(x_*\) has a larger objective value.</p>

    <h3>A9. Curvature, ellipses, and condition number</h3>
    <p>In eigenvector coordinates, the level sets of</p>
    <p>\[
    f(x)=\frac12x^\top Ax
    \]</p>
    <p>satisfy</p>
    <p>\[
    \sum_i\lambda_i y_i^2=\text{constant}.
    \]</p>
    <p>For positive eigenvalues, these are ellipses or ellipsoids. The semi-axis in direction \(q_i\) is proportional to \(1/\sqrt{\lambda_i}\).</p>
    <p>For an SPD matrix,</p>
    <p>\[
    \kappa_2(A)=\frac{\lambda_{\max}}{\lambda_{\min}}.
    \]</p>
    <p>A large condition number produces a long, narrow bowl. Gradient descent then tends to zigzag across steep directions while moving slowly along shallow directions.</p>

    <h3>A10. Complex inner products and conjugate transpose</h3>
    <p>For complex vectors, the correct inner product is</p>
    <p>\[
    \langle x,y\rangle=x^*y=\overline{x}^{\top}y.
    \]</p>
    <p>The conjugation is necessary because</p>
    <p>\[
    x^*x=\sum_i|x_i|^2\ge0.
    \]</p>
    <p>A complex matrix is Hermitian when</p>
    <p>\[
    A^*=A,
    \]</p>
    <p>and unitary when</p>
    <p>\[
    U^*U=I.
    \]</p>
    <p>Hermitian matrices are the complex analogue of real symmetric matrices. Unitary matrices are the complex analogue of real orthogonal matrices.</p>

    <h3>A11. The Fourier matrix</h3>
    <p>Let</p>
    <p>\[
    \omega=e^{-2\pi i/N}.
    \]</p>
    <p>The \(N\times N\) Fourier matrix has entries</p>
    <p>\[
    F_{kn}=\omega^{kn},
    \qquad k,n=0,\ldots,N-1.
    \]</p>
    <p>Its columns are complex exponential signals at different frequencies.</p>

    <h4>Why the columns are orthogonal</h4>
    <p>The inner product of columns \(k\) and \(\ell\) is</p>
    <p>\[
    \sum_{n=0}^{N-1}\overline{\omega^{kn}}\omega^{\ell n}
    =\sum_{n=0}^{N-1}\omega^{(\ell-k)n}.
    \]</p>
    <p>If \(k=\ell\), the sum is \(N\). If \(k\ne\ell\), it is a geometric series whose ratio is a nontrivial \(N\)-th root of unity, so the sum is zero. Therefore</p>
    <p>\[
    F^*F=NI.
    \]</p>
    <p>The normalized matrix</p>
    <p>\[
    Q=\frac1{\sqrt N}F
    \]</p>
    <p>is unitary.</p>

    <h3>A12. A complete four-point DFT example</h3>
    <p>For \(N=4\), \(\omega=-i\). Let</p>
    <p>\[
    x=\begin{bmatrix}1\\0\\-1\\0\end{bmatrix}.
    \]</p>
    <p>Compute</p>
    <p>\[
    X_k=\sum_{n=0}^{3}x_n\omega^{kn}.
    \]</p>
    <p>The result is</p>
    <p>\[
    X=\begin{bmatrix}0\\2\\0\\2\end{bmatrix}.
    \]</p>
    <p>The signal contains only the two frequency modes represented by entries \(1\) and \(3\).</p>

    <h3>A13. Why the FFT reduces \(O(N^2)\) work to \(O(N\log N)\)</h3>
    <p>Split the DFT into even and odd input indices:</p>
    <p>\[
    \begin{aligned}
    X_k
    &=\sum_{m=0}^{N/2-1}x_{2m}\omega^{2mk}
    +\sum_{m=0}^{N/2-1}x_{2m+1}\omega^{(2m+1)k}\\
    &=E_k+\omega^kO_k.
    \end{aligned}
    \]</p>
    <p>Both \(E_k\) and \(O_k\) are DFTs of length \(N/2\), because \(\omega^2=e^{-2\pi i/(N/2)}\). The second half of the outputs follows from</p>
    <p>\[
    X_{k+N/2}=E_k-\omega^kO_k.
    \]</p>
    <p>Thus one length-\(N\) transform reduces to two length-\(N/2\) transforms plus \(O(N)\) combination work:</p>
    <p>\[
    T(N)=2T(N/2)+O(N)=O(N\log N).
    \]</p>

    <h3>A14. Similar matrices represent the same transformation in different bases</h3>
    <p>Let the columns of \(S\) be a new basis:</p>
    <p>\[
    S=\begin{bmatrix}\mid&\mid&&\mid\\s_1&s_2&\cdots&s_n\\\mid&\mid&&\mid\end{bmatrix}.
    \]</p>
    <p>If \(c\) contains coordinates in the new basis, then</p>
    <p>\[
    x=Sc.
    \]</p>
    <p>Apply the transformation \(A\) in the original coordinates and convert the result back:</p>
    <p>\[
    [Ax]_{\text{new}}=S^{-1}ASc.
    \]</p>
    <p>Therefore the matrix in the new basis is</p>
    <p>\[
    B=S^{-1}AS.
    \]</p>
    <p>Matrices \(A\) and \(B\) are similar. They share basis-independent quantities such as eigenvalues, determinant, trace, rank, and characteristic polynomial.</p>

    <h3>A15. Why some matrices cannot be diagonalized</h3>
    <p>Consider</p>
    <p>\[
    A=\begin{bmatrix}1&1\\0&1\end{bmatrix}.
    \]</p>
    <p>The characteristic polynomial is</p>
    <p>\[
    (1-\lambda)^2,
    \]</p>
    <p>so eigenvalue \(1\) has algebraic multiplicity \(2\). But</p>
    <p>\[
    (A-I)v=\begin{bmatrix}0&1\\0&0\end{bmatrix}v=0
    \]</p>
    <p>forces \(v_2=0\). The eigenspace is only one-dimensional. A \(2\times2\) diagonalization needs two independent eigenvectors, so this matrix is defective.</p>

    <h3>A16. Jordan form records the missing eigenvectors</h3>
    <p>Let</p>
    <p>\[
    N=\begin{bmatrix}0&1\\0&0\end{bmatrix},
    \qquad N^2=0.
    \]</p>
    <p>The defective matrix is</p>
    <p>\[
    J=I+N=\begin{bmatrix}1&1\\0&1\end{bmatrix}.
    \]</p>
    <p>Its powers are easy because the binomial expansion stops:</p>
    <p>\[
    J^k=(I+N)^k=I+kN
    =\begin{bmatrix}1&k\\0&1\end{bmatrix}.
    \]</p>
    <p>The factor \(k\) is the signature of a Jordan block. A repeated eigenvalue contributes not only \(\lambda^k\), but also polynomial factors such as \(k\lambda^{k-1}\).</p>

    <h4>Generalized eigenvector</h4>
    <p>An eigenvector \(v_1\) satisfies</p>
    <p>\[
    (A-\lambda I)v_1=0.
    \]</p>
    <p>A generalized eigenvector \(v_2\) can satisfy</p>
    <p>\[
    (A-\lambda I)v_2=v_1.
    \]</p>
    <p>The vectors form a Jordan chain. Jordan form is valuable for theory, but it is numerically fragile because a tiny perturbation can split a repeated eigenvalue and change the Jordan structure.</p>

    <h3>A17. Practice with expandable solutions</h3>
    <ol>
      <li>Show that \(A=\begin{bmatrix}4&2\\2&3\end{bmatrix}\) is positive definite.<details><summary>Answer</summary><p>The leading principal minors are \(4>0\) and \(\det A=12-4=8>0\). Therefore \(A\succ0\).</p></details></li>
      <li>Why is \(B^\top B\) positive semidefinite even when \(B\) is rectangular?<details><summary>Answer</summary><p>For every \(x\), \(x^\top B^\top Bx=\|Bx\|_2^2\ge0\).</p></details></li>
      <li>If \(A\succ0\), why is \(f(x)=\tfrac12x^\top Ax-b^\top x\) strictly convex?<details><summary>Answer</summary><p>Its Hessian is \(A\), and every directional second derivative is \(h^\top Ah>0\) for nonzero \(h\).</p></details></li>
      <li>Why is \(F/\sqrt N\) unitary for the Fourier matrix?<details><summary>Answer</summary><p>Distinct Fourier columns have zero inner product and each column has squared norm \(N\), so \(F^*F=NI\).</p></details></li>
      <li>Compute \(\begin{bmatrix}1&1\\0&1\end{bmatrix}^5\).<details><summary>Answer</summary><p>Write \(J=I+N\) with \(N^2=0\). Then \(J^5=I+5N=\begin{bmatrix}1&5\\0&1\end{bmatrix}\).</p></details></li>
    </ol>
  `;

  entry.html = entry.html.replace(marker, extra + "\n\n    " + marker);
})();
