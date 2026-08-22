(() => {
  const entry = window.MATH_APPENDIX?.find(
    item => item.slug === "applied-linear-algebra-unit-3"
  );
  if (!entry || entry.html.includes('id="unit3-strang-refinement-b"')) return;

  const marker = "<h2>Unit III recap</h2>";
  if (!entry.html.includes(marker)) {
    console.warn("Unit III recap marker was not found for refinement B.");
    return;
  }

  const extra = String.raw`
    <hr>
    <div id="unit3-strang-refinement-b"></div>
    <h2>Strang-style development B: SVD, linear transformations, basis changes, compression, and pseudoinverses</h2>
    <div class="paper-connection">
      <strong>Session sequence.</strong> This development follows the second half of MIT 18.06SC Unit III: singular value decomposition, linear transformations and their matrices, change of basis and image compression, and left/right inverses with the pseudoinverse.
      <p class="source-links">
        <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/singular-value-decomposition/" target="_blank" rel="noopener noreferrer">Singular Value Decomposition</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/linear-transformations-and-their-matrices/" target="_blank" rel="noopener noreferrer">Linear Transformations and their Matrices</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/change-of-basis-image-compression/" target="_blank" rel="noopener noreferrer">Change of Basis and Image Compression</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/left-and-right-inverses-pseudoinverse/" target="_blank" rel="noopener noreferrer">Left and Right Inverses; Pseudoinverse</a>
      </p>
    </div>

    <h3>B0. The SVD extends the spectral theorem to every matrix</h3>
    <p>The spectral theorem diagonalizes a real symmetric matrix:</p>
    <p>\[
    A=Q\Lambda Q^\top.
    \]</p>
    <p>But a general matrix can be rectangular, nonsymmetric, or rank deficient. The singular value decomposition works in every case:</p>
    <p>\[
    \boxed{A=U\Sigma V^\top}.
    \]</p>
    <p>For \(A\in\mathbb{R}^{m\times n}\):</p>
    <ul>
      <li>the columns of \(V\) are orthonormal directions in the input space \(\mathbb{R}^n\);</li>
      <li>the singular values in \(\Sigma\) are nonnegative stretch factors;</li>
      <li>the columns of \(U\) are orthonormal directions in the output space \(\mathbb{R}^m\).</li>
    </ul>
    <div class="definition">
      <strong>Geometric reading.</strong> \(V^\top\) rotates into special input directions, \(\Sigma\) stretches or destroys those directions, and \(U\) rotates into the output coordinates.
    </div>

    <h3>B1. Derive the right singular vectors from \(A^\top A\)</h3>
    <p>The matrix \(A^\top A\) is symmetric positive semidefinite:</p>
    <p>\[
    x^\top A^\top Ax=\|Ax\|_2^2\ge0.
    \]</p>
    <p>By the spectral theorem, it has an orthonormal eigenvector basis:</p>
    <p>\[
    A^\top Av_i=\lambda_i v_i,
    \qquad
    \lambda_i\ge0.
    \]</p>
    <p>Define</p>
    <p>\[
    \sigma_i=\sqrt{\lambda_i}.
    \]</p>
    <p>The vectors \(v_i\) are the right singular vectors, and the numbers \(\sigma_i\) are the singular values.</p>

    <h3>B2. Construct the left singular vectors</h3>
    <p>For every positive singular value, define</p>
    <p>\[
    u_i=\frac{Av_i}{\sigma_i}.
    \]</p>
    <p>Then</p>
    <p>\[
    Av_i=\sigma_i u_i.
    \]</p>
    <p>The vectors \(u_i\) are orthonormal. For \(i\ne j\),</p>
    <p>\[
    \begin{aligned}
    u_i^\top u_j
    &=\frac{v_i^\top A^\top Av_j}{\sigma_i\sigma_j}\\
    &=\frac{\sigma_j^2v_i^\top v_j}{\sigma_i\sigma_j}\\
    &=0.
    \end{aligned}
    \]</p>
    <p>Also</p>
    <p>\[
    \|u_i\|_2^2
    =\frac{v_i^\top A^\top Av_i}{\sigma_i^2}=1.
    \]</p>
    <p>Collect the vectors into</p>
    <p>\[
    V=\begin{bmatrix}\mid&\mid&&\mid\\v_1&v_2&\cdots&v_n\\\mid&\mid&&\mid\end{bmatrix},
    \qquad
    U=\begin{bmatrix}\mid&\mid&&\mid\\u_1&u_2&\cdots&u_m\\\mid&\mid&&\mid\end{bmatrix}.
    \]</p>
    <p>Then \(A=U\Sigma V^\top\).</p>

    <h3>B3. Full and reduced SVD shapes</h3>
    <p>If \(A\) is \(m\times n\), the full SVD uses</p>
    <p>\[
    U:m\times m,
    \qquad
    \Sigma:m\times n,
    \qquad
    V:n\times n.
    \]</p>
    <p>If the rank is \(r\), the compact SVD keeps only the nonzero modes:</p>
    <p>\[
    A=U_r\Sigma_rV_r^\top,
    \]</p>
    <p>with</p>
    <p>\[
    U_r:m\times r,
    \qquad
    \Sigma_r:r\times r,
    \qquad
    V_r:n\times r.
    \]</p>
    <div class="shape-check">
      <strong>Shape check.</strong> The compact product is
      \[
      (m\times r)(r\times r)(r\times n)=m\times n.
      \]
    </div>

    <h3>B4. Complete rank-one SVD example</h3>
    <p>Take</p>
    <p>\[
    A=\begin{bmatrix}1&1\\0&0\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    A^\top A=
    \begin{bmatrix}1&1\\1&1\end{bmatrix}.
    \]</p>
    <p>The eigenvalues are \(2\) and \(0\), with normalized eigenvectors</p>
    <p>\[
    v_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},
    \qquad
    v_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
    \]</p>
    <p>Therefore</p>
    <p>\[
    \sigma_1=\sqrt2,
    \qquad
    \sigma_2=0.
    \]</p>
    <p>Construct</p>
    <p>\[
    u_1=\frac{Av_1}{\sigma_1}
    =\begin{bmatrix}1\\0\end{bmatrix}.
    \]</p>
    <p>Choose \(u_2=(0,1)^\top\) to complete an orthonormal basis. Then</p>
    <p>\[
    U=I,
    \qquad
    \Sigma=\begin{bmatrix}\sqrt2&0\\0&0\end{bmatrix},
    \qquad
    V=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
    \]</p>
    <p>The matrix has rank one because only one singular value is nonzero.</p>

    <h3>B5. The SVD displays the four fundamental subspaces</h3>
    <p>Suppose \(A\) has rank \(r\) and singular values</p>
    <p>\[
    \sigma_1\ge\cdots\ge\sigma_r>0,
    \qquad
    \sigma_{r+1}=\cdots=0.
    \]</p>
    <table>
      <thead><tr><th>Subspace</th><th>SVD basis</th><th>Reason</th></tr></thead>
      <tbody>
        <tr><td>Column space \(C(A)\)</td><td>\(u_1,\ldots,u_r\)</td><td>\(Av_i=\sigma_i u_i\) for positive \(\sigma_i\)</td></tr>
        <tr><td>Left nullspace \(N(A^\top)\)</td><td>\(u_{r+1},\ldots,u_m\)</td><td>These output directions are orthogonal to \(C(A)\)</td></tr>
        <tr><td>Row space \(C(A^\top)\)</td><td>\(v_1,\ldots,v_r\)</td><td>These input directions survive the transformation</td></tr>
        <tr><td>Nullspace \(N(A)\)</td><td>\(v_{r+1},\ldots,v_n\)</td><td>\(Av_i=0\) when \(\sigma_i=0\)</td></tr>
      </tbody>
    </table>
    <p>This is one of the strongest reasons to learn the SVD: it places orthonormal bases for all four fundamental subspaces into one factorization.</p>

    <h3>B6. Unit sphere to ellipsoid</h3>
    <p>Write a unit input vector in the right-singular basis:</p>
    <p>\[
    x=\sum_i c_iv_i,
    \qquad
    \sum_i c_i^2=1.
    \]</p>
    <p>Then</p>
    <p>\[
    Ax=\sum_i c_i\sigma_i u_i.
    \]</p>
    <p>The unit sphere maps to an ellipsoid whose principal axes are \(u_i\) and whose semi-axis lengths are \(\sigma_i\).</p>
    <p>The maximum stretch is</p>
    <p>\[
    \|A\|_2=\sigma_1.
    \]</p>
    <p>If \(A\) has full rank, the smallest stretch is \(\sigma_{\min}\), and</p>
    <p>\[
    \kappa_2(A)=\frac{\sigma_{\max}}{\sigma_{\min}}.
    \]</p>

    <h3>B7. SVD as a sum of rank-one matrices</h3>
    <p>Expand the compact SVD:</p>
    <p>\[
    \boxed{A=\sum_{i=1}^{r}\sigma_i u_iv_i^\top}.
    \]</p>
    <p>Each term \(\sigma_i u_iv_i^\top\) is rank one. Applied to an input \(x\), it</p>
    <ol>
      <li>measures the coordinate \(v_i^\top x\);</li>
      <li>scales it by \(\sigma_i\);</li>
      <li>outputs that amount in direction \(u_i\).</li>
    </ol>
    <div class="paper-connection">
      <strong>ML connection.</strong> This mode-by-mode view appears in PCA, spectral regularization, low-rank adapters, embedding compression, and analysis of learned weight matrices.
    </div>

    <h3>B8. Why truncated SVD is the best rank-\(k\) approximation</h3>
    <p>Keep only the first \(k\) singular modes:</p>
    <p>\[
    A_k=\sum_{i=1}^{k}\sigma_i u_iv_i^\top.
    \]</p>
    <p>The Eckart-Young theorem says that among all matrices \(B\) of rank at most \(k\), \(A_k\) minimizes both spectral-norm and Frobenius-norm error:</p>
    <p>\[
    \|A-A_k\|_2=\sigma_{k+1},
    \]</p>
    <p>and</p>
    <p>\[
    \|A-A_k\|_F^2=\sum_{i>k}\sigma_i^2.
    \]</p>
    <p>The intuition is direct: singular modes are orthogonal and ordered by strength. If only \(k\) independent directions can be kept, discarding any larger singular mode while retaining a smaller one cannot reduce the error.</p>

    <h3>B9. Image compression and storage counting</h3>
    <p>A grayscale image with \(m\) rows and \(n\) columns is a matrix with \(mn\) pixel values.</p>
    <p>A rank-\(k\) approximation stores:</p>
    <ul>
      <li>\(U_k\): \(mk\) numbers;</li>
      <li>\(\Sigma_k\): \(k\) numbers;</li>
      <li>\(V_k\): \(nk\) numbers.</li>
    </ul>
    <p>Total storage is</p>
    <p>\[
    k(m+n+1).
    \]</p>
    <p>For a \(1000\times1000\) image with \(k=50\),</p>
    <p>\[
    50(1000+1000+1)=100050
    \]</p>
    <p>numbers replace \(10^6\) original pixels, before considering file-format overhead.</p>

    <h3>B10. A linear transformation is determined by basis vectors</h3>
    <p>Let \(T:V\to W\) be linear, and let \(b_1,\ldots,b_n\) be a basis of \(V\). Every input is</p>
    <p>\[
    x=c_1b_1+\cdots+c_nb_n.
    \]</p>
    <p>Linearity gives</p>
    <p>\[
    T(x)=c_1T(b_1)+\cdots+c_nT(b_n).
    \]</p>
    <p>Therefore, once output coordinates are chosen, the columns of the transformation matrix are the coordinate vectors of \(T(b_j)\).</p>
    <div class="definition">
      <strong>Matrix of a transformation.</strong> If \(B=(b_1,\ldots,b_n)\) is the input basis and \(C\) is the output basis, then
      \[
      [T]_{C\leftarrow B}
      =\begin{bmatrix}\mid&\mid&&\mid\\[T(b_1)]_C&[T(b_2)]_C&\cdots&[T(b_n)]_C\\\mid&\mid&&\mid\end{bmatrix}.
      \]
    </div>

    <h3>B11. Example of a transformation matrix in a nonstandard basis</h3>
    <p>Let</p>
    <p>\[
    T(x,y)=(x+y,x-y).
    \]</p>
    <p>Use the input basis</p>
    <p>\[
    b_1=\begin{bmatrix}1\\1\end{bmatrix},
    \qquad
    b_2=\begin{bmatrix}1\\-1\end{bmatrix},
    \]</p>
    <p>and the standard output basis. Then</p>
    <p>\[
    T(b_1)=\begin{bmatrix}2\\0\end{bmatrix},
    \qquad
    T(b_2)=\begin{bmatrix}0\\2\end{bmatrix}.
    \]</p>
    <p>So</p>
    <p>\[
    [T]_{\text{standard}\leftarrow B}
    =\begin{bmatrix}2&0\\0&2\end{bmatrix}.
    \]</p>
    <p>The same transformation that looks mixed in standard input coordinates becomes diagonal in the basis aligned with its special directions.</p>

    <h3>B12. General change-of-basis formula</h3>
    <p>Let</p>
    <p>\[
    P_B=\begin{bmatrix}\mid&\mid&&\mid\\b_1&b_2&\cdots&b_n\\\mid&\mid&&\mid\end{bmatrix}
    \]</p>
    <p>convert \(B\)-coordinates into standard coordinates, and let \(P_C\) do the same for output basis \(C\).</p>
    <p>If \(A\) is the standard-coordinate matrix of \(T\), then</p>
    <p>\[
    x=P_B[x]_B,
    \qquad
    T(x)=AP_B[x]_B.
    \]</p>
    <p>Convert the output to \(C\)-coordinates:</p>
    <p>\[
    [T(x)]_C=P_C^{-1}AP_B[x]_B.
    \]</p>
    <p>Therefore</p>
    <p>\[
    \boxed{[T]_{C\leftarrow B}=P_C^{-1}AP_B}.
    \]</p>
    <p>When input and output use the same basis, this becomes the similarity transformation \(P^{-1}AP\).</p>

    <h3>B13. Left inverses and full column rank</h3>
    <p>Let \(A\in\mathbb{R}^{m\times n}\) with \(m\ge n\). A left inverse \(L\) satisfies</p>
    <p>\[
    LA=I_n.
    \]</p>
    <p>A left inverse exists exactly when the columns of \(A\) are independent, or equivalently when</p>
    <p>\[
    \operatorname{rank}(A)=n.
    \]</p>

    <h4>Why full column rank is necessary</h4>
    <p>If \(Ax=0\), multiply by \(L\):</p>
    <p>\[
    x=LAx=0.
    \]</p>
    <p>So the nullspace is trivial and the columns are independent.</p>

    <h4>A standard left inverse</h4>
    <p>When the columns are independent, \(A^\top A\) is invertible and</p>
    <p>\[
    L=(A^\top A)^{-1}A^\top
    \]</p>
    <p>satisfies \(LA=I_n\).</p>

    <h3>B14. Right inverses and full row rank</h3>
    <p>Let \(A\in\mathbb{R}^{m\times n}\) with \(m\le n\). A right inverse \(R\) satisfies</p>
    <p>\[
    AR=I_m.
    \]</p>
    <p>A right inverse exists exactly when the rows of \(A\) are independent, or equivalently when</p>
    <p>\[
    \operatorname{rank}(A)=m.
    \]</p>
    <p>A standard choice is</p>
    <p>\[
    R=A^\top(AA^\top)^{-1}.
    \]</p>
    <p>Then \(AR=I_m\). Every \(b\in\mathbb{R}^m\) has at least one solution \(x=Rb\), although the solution is usually not unique when \(n>m\).</p>

    <h3>B15. The pseudoinverse inverts only the nonzero singular modes</h3>
    <p>For</p>
    <p>\[
    A=U\Sigma V^\top,
    \]</p>
    <p>define \(\Sigma^+\) by replacing each nonzero \(\sigma_i\) with \(1/\sigma_i\) and transposing the rectangular diagonal shape. Then</p>
    <p>\[
    \boxed{A^+=V\Sigma^+U^\top}.
    \]</p>
    <p>If \(A\) is \(m\times n\), then \(A^+\) is \(n\times m\).</p>
    <p>On a surviving singular direction,</p>
    <p>\[
    A^+u_i=\frac1{\sigma_i}v_i.
    \]</p>
    <p>On the left nullspace, \(A^+\) returns zero.</p>

    <h3>B16. Projection matrices from the pseudoinverse</h3>
    <p>Using the SVD,</p>
    <p>\[
    AA^+=U\Sigma\Sigma^+U^\top.
    \]</p>
    <p>The diagonal matrix \(\Sigma\Sigma^+\) contains \(1\) for nonzero singular values and \(0\) for zero singular values. Therefore</p>
    <p>\[
    AA^+
    \]</p>
    <p>is the orthogonal projector onto \(C(A)\).</p>
    <p>Similarly,</p>
    <p>\[
    A^+A
    \]</p>
    <p>is the orthogonal projector onto the row space \(C(A^\top)\).</p>

    <h3>B17. Why \(A^+b\) is the least-squares solution</h3>
    <p>Split \(b\) into its column-space and left-nullspace components:</p>
    <p>\[
    b=b_C+b_\perp,
    \qquad
    b_C\in C(A),
    \qquad
    b_\perp\in N(A^\top).
    \]</p>
    <p>Then</p>
    <p>\[
    AA^+b=b_C.
    \]</p>
    <p>Thus the fitted output \(A(A^+b)\) is the orthogonal projection of \(b\) onto \(C(A)\). It is the closest vector that \(A\) can produce. Therefore</p>
    <p>\[
    A^+b\in\arg\min_x\|Ax-b\|_2.
    \]</p>

    <h3>B18. Why the pseudoinverse gives the minimum-norm solution</h3>
    <p>Suppose \(Ax=b\) has exact solutions. Every solution can be decomposed as</p>
    <p>\[
    x=x_r+x_n,
    \qquad
    x_r\in C(A^\top),
    \qquad
    x_n\in N(A).
    \]</p>
    <p>The two components are orthogonal, so</p>
    <p>\[
    \|x\|_2^2=\|x_r\|_2^2+\|x_n\|_2^2.
    \]</p>
    <p>The pseudoinverse solution lies in the row space and sets the nullspace component to zero. It therefore has the smallest norm among all exact solutions.</p>

    <h3>B19. Small singular values explain unstable inverse problems</h3>
    <p>Write data in the left-singular basis:</p>
    <p>\[
    b=\sum_i\beta_i u_i.
    \]</p>
    <p>The pseudoinverse produces</p>
    <p>\[
    A^+b=\sum_{\sigma_i>0}\frac{\beta_i}{\sigma_i}v_i.
    \]</p>
    <p>If \(\sigma_i\) is very small, division by \(\sigma_i\) strongly amplifies noise in coefficient \(\beta_i\).</p>
    <p>Two common remedies are:</p>
    <ul>
      <li><strong>truncated SVD:</strong> discard modes below a threshold;</li>
      <li><strong>ridge/Tikhonov regularization:</strong> replace \(1/\sigma_i\) by the smoother factor
      \[
      \frac{\sigma_i}{\sigma_i^2+\lambda}.
      \]</li>
    </ul>

    <h3>B20. Practice with expandable solutions</h3>
    <ol>
      <li>Why are the singular values the square roots of eigenvalues of \(A^\top A\)?<details><summary>Answer</summary><p>The right singular vectors satisfy \(A^\top Av_i=\sigma_i^2v_i\), so the corresponding eigenvalue is \(\sigma_i^2\).</p></details></li>
      <li>If \(A\) has singular values \(9,4,0,0\), what is its rank?<details><summary>Answer</summary><p>The rank is \(2\), the number of nonzero singular values.</p></details></li>
      <li>Which singular vectors span the nullspace?<details><summary>Answer</summary><p>The right singular vectors associated with zero singular values span \(N(A)\).</p></details></li>
      <li>For a \(600\times400\) image and rank \(k=20\), how many numbers does compact SVD storage need?<details><summary>Answer</summary><p>\(20(600+400+1)=20020\), compared with \(240000\) original entries.</p></details></li>
      <li>Why does a left inverse imply independent columns?<details><summary>Answer</summary><p>If \(Ax=0\), then \(x=LAx=0\), so the nullspace is trivial.</p></details></li>
      <li>What spaces do \(AA^+\) and \(A^+A\) project onto?<details><summary>Answer</summary><p>\(AA^+\) projects onto \(C(A)\). \(A^+A\) projects onto \(C(A^\top)\), the row space.</p></details></li>
      <li>Why is \(A^+b\) minimum norm when exact solutions are not unique?<details><summary>Answer</summary><p>It lies in the row space and has no nullspace component. Any other exact solution adds an orthogonal nullspace vector, increasing the squared norm.</p></details></li>
    </ol>

    <h2>Unit III integrated synthesis</h2>
    <p>The spectral theorem gives orthogonal eigenvectors for symmetric matrices. Positive eigenvalues create positive-definite quadratic bowls and unique minima. Complex/unitary matrices give Fourier coordinates, while FFT factorization makes those coordinates efficient. Similarity changes coordinates without changing the underlying transformation; Jordan form records the failure of diagonalization.</p>
    <p>The SVD then extends the spectral viewpoint to every rectangular matrix. It reveals the four fundamental subspaces, geometric stretch directions, low-rank approximations, and stable or unstable inverse directions. Linear transformations become matrices after bases are chosen, and the pseudoinverse solves the best possible inverse problem by inverting only the nonzero singular modes.</p>
  `;

  entry.html = entry.html.replace(marker, extra + "\n\n    " + marker);
})();
