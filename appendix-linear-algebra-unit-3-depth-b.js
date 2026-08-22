(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-3");
  if (!entry) return;
  const marker = "<h2>Unit III recap</h2>";
  const extra = String.raw`
    <h2>Deep Dive B: SVD, transformations, change of basis, compression, and pseudoinverses</h2>

    <h3>B1. Deriving the SVD from \(A^\top A\)</h3>
    <p>Let \(A\in\mathbb{R}^{m\times n}\). The matrix \(A^\top A\) is symmetric and positive semidefinite because</p>
    <p>\[x^\top A^\top Ax=\|Ax\|_2^2\ge0.\]</p>
    <p>By the spectral theorem, there is an orthonormal basis of eigenvectors \(v_i\) such that</p>
    <p>\[A^\top Av_i=\sigma_i^2v_i,\qquad \sigma_i\ge0.\]</p>
    <p>For each \(\sigma_i>0\), define</p>
    <p>\[u_i=\frac{Av_i}{\sigma_i}.\]</p>
    <p>Then</p>
    <p>\[Av_i=\sigma_i u_i.\]</p>
    <p>The vectors \(u_i\) are orthonormal because</p>
    <p>\[u_i^\top u_j=\frac{v_i^\top A^\top Av_j}{\sigma_i\sigma_j}=\frac{\sigma_j^2v_i^\top v_j}{\sigma_i\sigma_j}=0\]</p>
    <p>for \(i\ne j\), and their norms are one. Collecting these vectors gives</p>
    <p>\[A=U\Sigma V^\top.\]</p>
    <p>This derivation explains why singular values exist for every matrix, even rectangular matrices.</p>

    <h3>B2. Geometric meaning of SVD</h3>
    <p>The unit sphere in the input space is transformed by \(A\) into an ellipsoid in the output space.</p>
    <ul><li>The right singular vectors \(v_i\) are orthogonal input directions.</li><li>The singular values \(\sigma_i\) are stretch factors.</li><li>The left singular vectors \(u_i\) are the resulting orthogonal output directions.</li></ul>
    <p>The largest singular value is</p>
    <p>\[\sigma_1=\max_{\|x\|=1}\|Ax\|_2.\]</p>
    <p>So it is the maximum amplification of vector length.</p>

    <h3>B3. A complete small SVD example</h3>
    <p>Take</p>
    <p>\[A=\begin{bmatrix}3&0\\0&1\end{bmatrix}.\]</p>
    <p>Here the SVD is already visible:</p>
    <p>\[U=I,\qquad \Sigma=\begin{bmatrix}3&0\\0&1\end{bmatrix},\qquad V=I.\]</p>
    <p>The horizontal direction is stretched by \(3\); the vertical direction by \(1\).</p>
    <p>For a less axis-aligned example, rotate the input and output:</p>
    <p>\[A=R_1\begin{bmatrix}3&0\\0&1\end{bmatrix}R_2^\top.\]</p>
    <p>The singular values stay \(3,1\). Only the singular directions rotate.</p>

    <h3>B4. Rank from singular values</h3>
    <p>The rank of \(A\) equals the number of nonzero singular values:</p>
    <p>\[\operatorname{rank}(A)=\#\{i:\sigma_i>0\}.\]</p>
    <p>Why? Each nonzero term \(\sigma_i u_iv_i^\top\) contributes one independent input-output direction. Zero singular values correspond exactly to directions in the nullspace.</p>

    <h3>B5. SVD as a sum of rank-one matrices</h3>
    <p>The compact SVD can be expanded as</p>
    <p>\[A=\sum_{i=1}^{r}\sigma_i u_iv_i^\top.\]</p>
    <p>Each term is rank one. The SVD therefore decomposes a complicated matrix into orthogonal rank-one modes ordered from strongest to weakest.</p>
    <div class="paper-connection"><strong>ML connection.</strong> This view appears in low-rank adaptation, embedding compression, PCA, spectral regularization, and analysis of learned weight matrices.</div>

    <h3>B6. Why truncated SVD is the best low-rank approximation</h3>
    <p>Keep only the first \(k\) singular components:</p>
    <p>\[A_k=\sum_{i=1}^{k}\sigma_i u_iv_i^\top.\]</p>
    <p>The Eckart-Young theorem states that among all matrices of rank at most \(k\), this one minimizes both the spectral norm and the Frobenius norm of the error.</p>
    <p>The errors are</p>
    <p>\[\|A-A_k\|_2=\sigma_{k+1},\qquad \|A-A_k\|_F^2=\sum_{i>k}\sigma_i^2.\]</p>
    <p><strong>Why this is plausible.</strong> The singular modes are orthogonal. Dropping a mode removes exactly its independent amount of energy. To keep only \(k\) directions, the best choice is to retain the \(k\) largest contributions.</p>

    <h3>B7. Image compression with storage counting</h3>
    <p>Suppose a grayscale image is an \(m\times n\) matrix. Storing it directly needs \(mn\) numbers.</p>
    <p>A rank-\(k\) SVD approximation needs approximately</p>
    <p>\[mk+k+nk=k(m+n+1)\]</p>
    <p>numbers: \(k\) left singular vectors, \(k\) singular values, and \(k\) right singular vectors.</p>
    <p>For a \(1000\times1000\) image and \(k=50\), direct storage uses \(10^6\) numbers, while the rank-50 representation uses</p>
    <p>\[50(1000+1000+1)=100050\]</p>
    <p>numbers, about one tenth as many.</p>

    <h3>B8. Matrices of linear transformations</h3>
    <p>A linear transformation is determined completely by what it does to a basis. If \(e_1,\ldots,e_n\) is the standard basis, then for</p>
    <p>\[x=\sum_jx_je_j,\]</p>
    <p>linearity gives</p>
    <p>\[T(x)=\sum_jx_jT(e_j).\]</p>
    <p>Therefore the matrix of \(T\) has columns \(T(e_j)\):</p>
    <p>\[[T]=[T(e_1)\;\cdots\;T(e_n)].\]</p>
    <p>This is the deepest reason that matrix columns matter: they are the images of basis vectors.</p>

    <h3>B9. Change of basis with two different bases</h3>
    <p>Let basis \(B=(b_1,b_2)\) and basis \(C=(c_1,c_2)\). Define</p>
    <p>\[P_B=[b_1\;b_2],\qquad P_C=[c_1\;c_2].\]</p>
    <p>If \([x]_B\) are coordinates of \(x\) in basis \(B\), then</p>
    <p>\[x=P_B[x]_B.\]</p>
    <p>To convert to basis \(C\),</p>
    <p>\[[x]_C=P_C^{-1}x=P_C^{-1}P_B[x]_B.\]</p>
    <p>So the change-of-coordinate matrix from \(B\) to \(C\) is</p>
    <p>\[P_{C\leftarrow B}=P_C^{-1}P_B.\]</p>

    <h3>B10. Left inverse and least squares</h3>
    <p>If \(A\in\mathbb{R}^{m\times n}\) has full column rank \(n\), then \(A^\top A\) is invertible. Define</p>
    <p>\[L=(A^\top A)^{-1}A^\top.\]</p>
    <p>Then</p>
    <p>\[LA=(A^\top A)^{-1}A^\top A=I_n.\]</p>
    <p>Thus \(L\) is a left inverse. When \(Ax=b\) is inconsistent, \(Lb\) is exactly the least-squares coefficient vector.</p>

    <h3>B11. Right inverse and underdetermined systems</h3>
    <p>If \(A\in\mathbb{R}^{m\times n}\) has full row rank \(m\), then \(AA^\top\) is invertible. Define</p>
    <p>\[R=A^\top(AA^\top)^{-1}.\]</p>
    <p>Then</p>
    <p>\[AR=I_m.\]</p>
    <p>Therefore every \(b\in\mathbb{R}^m\) has at least one solution \(x=Rb\). Because \(n>m\), there are generally infinitely many solutions.</p>

    <h3>B12. Deriving the pseudoinverse from SVD</h3>
    <p>If</p>
    <p>\[A=U\Sigma V^\top,\]</p>
    <p>define \(\Sigma^+\) by replacing each nonzero singular value \(\sigma_i\) with \(1/\sigma_i\), while leaving zeros as zeros. Then</p>
    <p>\[A^+=V\Sigma^+U^\top.\]</p>
    <p>This operation inverts exactly the directions that \(A\) preserves and ignores directions that \(A\) destroys.</p>

    <h3>B13. Pseudoinverse gives least-squares solutions</h3>
    <p>Write \(b\) in the left singular-vector basis:</p>
    <p>\[b=\sum_i\beta_i u_i+b_\perp,\]</p>
    <p>where \(b_\perp\) lies in the left nullspace. Then</p>
    <p>\[A^+b=\sum_{\sigma_i>0}\frac{\beta_i}{\sigma_i}v_i.\]</p>
    <p>Applying \(A\) gives the projection of \(b\) onto the column space. Therefore \(A^+b\) minimizes \(\|Ax-b\|_2\).</p>

    <h3>B14. Why the pseudoinverse gives the minimum-norm exact solution</h3>
    <p>Suppose \(Ax=b\) has many solutions. Any solution can be written as</p>
    <p>\[x=x_r+x_n,\]</p>
    <p>where \(x_r\) lies in the row space \(C(A^\top)\) and \(x_n\in N(A)\). These two components are orthogonal. Therefore</p>
    <p>\[\|x\|_2^2=\|x_r\|_2^2+\|x_n\|_2^2.\]</p>
    <p>The smallest norm occurs when \(x_n=0\). The pseudoinverse returns exactly this row-space solution.</p>

    <h3>B15. Numerical sensitivity and small singular values</h3>
    <p>The pseudoinverse divides by singular values. If \(\sigma_i\) is tiny, then \(1/\sigma_i\) is huge. Small noise in the corresponding left-singular direction can be strongly amplified.</p>
    <p>This is why truncated SVD and regularization can improve inverse problems: they avoid aggressive inversion of weak directions.</p>

    <h3>B16. Practice set with answers</h3>
    <ol>
      <li>Why are the eigenvalues of \(A^\top A\) nonnegative?<details><summary>Answer</summary><p>For any eigenvector \(v\), \(\lambda\|v\|^2=v^\top A^\top Av=\|Av\|^2\ge0\), so \(\lambda\ge0\).</p></details></li>
      <li>If singular values are \(8,3,1,0\), what is the rank?<details><summary>Answer</summary><p>Three, because exactly three singular values are nonzero.</p></details></li>
      <li>For a \(500\times400\) matrix with rank-20 approximation, how many scalar values does compact SVD storage need approximately?<details><summary>Answer</summary><p>\(20(500+400+1)=18020\), compared with \(200000\) entries in the full matrix.</p></details></li>
      <li>Why can very small singular values make inverse problems unstable?<details><summary>Answer</summary><p>The inverse or pseudoinverse multiplies the corresponding component by \(1/\sigma_i\), so tiny errors are amplified strongly.</p></details></li>
      <li>What is the shape of \(A^+\) if \(A\) is \(m\times n\)?<details><summary>Answer</summary><p>\(n\times m\).</p></details></li>
    </ol>
  `;
  if (!entry.html.includes("Deep Dive B: SVD")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();