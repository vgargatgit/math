(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-2");
  if (!entry) return;
  const marker = "<h2>12. Unit II synthesis</h2>";
  const extra = String.raw`
    <h2>Deep Dive B: Eigenvalues, diagonalization, dynamics, Markov chains, and Fourier</h2>

    <h3>B1. Cramer's rule from column replacement</h3>
    <p>Suppose \(Ax=b\) with invertible \(A=[a_1\;\cdots\;a_n]\). Since \(b=\sum_jx_ja_j\), replace column \(i\) of \(A\) by \(b\). By linearity of the determinant in one column, every term vanishes except the one containing \(x_i a_i\). Therefore</p>
    <p>\[\det A_i=x_i\det A,\qquad x_i=\frac{\det A_i}{\det A}.\]</p>
    <p>This argument explains Cramer's rule. It is elegant but computationally expensive, so numerical algorithms do not use it for large systems.</p>

    <h3>B2. Eigenvalues from invariant directions</h3>
    <p>The eigenvalue equation \(Av=\lambda v\) says that the one-dimensional subspace spanned by \(v\) is invariant under \(A\). The matrix may stretch, shrink, or reverse the vector, but it does not send it to a new line.</p>
    <p>Rearrange:</p>
    <p>\[(A-\lambda I)v=0.\]</p>
    <p>A nonzero solution exists exactly when \(A-\lambda I\) is singular. Therefore</p>
    <p>\[\det(A-\lambda I)=0.\]</p>
    <p>This determinant equation is the characteristic polynomial.</p>

    <h3>B3. Complete 2×2 eigenvalue example</h3>
    <p>Let</p>
    <p>\[A=\begin{bmatrix}4&1\\2&3\end{bmatrix}.\]</p>
    <p>Then</p>
    <p>\[\det(A-\lambda I)=\begin{vmatrix}4-\lambda&1\\2&3-\lambda\end{vmatrix}=(4-\lambda)(3-\lambda)-2.\]</p>
    <p>So</p>
    <p>\[\lambda^2-7\lambda+10=(\lambda-5)(\lambda-2)=0.\]</p>
    <p>The eigenvalues are \(5\) and \(2\).</p>
    <p>For \(\lambda=5\), solve \((A-5I)v=0\):</p>
    <p>\[\begin{bmatrix}-1&1\\2&-2\end{bmatrix}v=0\Rightarrow v_1\propto(1,1)^\top.\]</p>
    <p>For \(\lambda=2\):</p>
    <p>\[\begin{bmatrix}2&1\\2&1\end{bmatrix}v=0\Rightarrow v_2\propto(1,-2)^\top.\]</p>

    <h3>B4. Why diagonalization works</h3>
    <p>If independent eigenvectors \(v_1,\ldots,v_n\) form the columns of \(P\), then</p>
    <p>\[AP=A[v_1\;\cdots\;v_n]=[\lambda_1v_1\;\cdots\;\lambda_nv_n]=PD.\]</p>
    <p>Multiply by \(P^{-1}\) on the right:</p>
    <p>\[A=PDP^{-1}.\]</p>
    <p>This proof shows that diagonalization is simply the matrix form of the statement “the transformation scales each eigenvector independently.”</p>

    <h3>B5. Powers of a matrix</h3>
    <p>For the matrix in the previous example, let</p>
    <p>\[P=\begin{bmatrix}1&1\\1&-2\end{bmatrix},\qquad D=\begin{bmatrix}5&0\\0&2\end{bmatrix}.\]</p>
    <p>Then</p>
    <p>\[A^k=PD^kP^{-1}=P\begin{bmatrix}5^k&0\\0&2^k\end{bmatrix}P^{-1}.\]</p>
    <p>The mode associated with eigenvalue \(5\) grows faster than the mode associated with \(2\). Long-run behavior is often controlled by the eigenvalue of largest magnitude.</p>

    <h3>B6. Repeated multiplication and stability</h3>
    <p>Suppose \(x_0=c_1v_1+\cdots+c_nv_n\). Then</p>
    <p>\[A^kx_0=c_1\lambda_1^kv_1+\cdots+c_n\lambda_n^kv_n.\]</p>
    <p>If all \(|\lambda_i|<1\), every mode decays to zero. If some \(|\lambda_i|>1\), components in those directions grow. If \(|\lambda_i|=1\), a mode can persist or oscillate.</p>
    <div class="paper-connection"><strong>ML connection.</strong> This mode-by-mode view is the prototype for understanding recurrent dynamics, iterative algorithms, gradient propagation, and stability of linearized systems.</div>

    <h3>B7. Matrix exponential from the scalar exponential</h3>
    <p>For a scalar, \(e^{\lambda t}=\sum_{k=0}^{\infty}(\lambda t)^k/k!\). Replace the scalar by a matrix:</p>
    <p>\[e^{At}=I+At+\frac{A^2t^2}{2!}+\frac{A^3t^3}{3!}+\cdots.\]</p>
    <p>If \(A=PDP^{-1}\), then \(A^k=PD^kP^{-1}\), so</p>
    <p>\[e^{At}=P\left(I+Dt+\frac{D^2t^2}{2!}+\cdots\right)P^{-1}=Pe^{Dt}P^{-1}.\]</p>
    <p>Because \(D\) is diagonal,</p>
    <p>\[e^{Dt}=\operatorname{diag}(e^{\lambda_1t},\ldots,e^{\lambda_nt}).\]</p>

    <h3>B8. Solving a two-mode differential equation</h3>
    <p>Let \(A=\operatorname{diag}(-1,-3)\). Then</p>
    <p>\[\frac{dx}{dt}=Ax\]</p>
    <p>decouples into</p>
    <p>\[x_1'=-x_1,\qquad x_2'=-3x_2.\]</p>
    <p>Thus</p>
    <p>\[x(t)=\begin{bmatrix}e^{-t}&0\\0&e^{-3t}\end{bmatrix}x(0).\]</p>
    <p>The second mode decays three times faster in its exponent.</p>

    <h3>B9. Markov matrices and stationary distributions</h3>
    <p>Consider the column-stochastic matrix</p>
    <p>\[M=\begin{bmatrix}0.8&0.3\\0.2&0.7\end{bmatrix}.\]</p>
    <p>Each column sums to \(1\). A probability state evolves by \(p_{t+1}=Mp_t\).</p>
    <p>A stationary distribution satisfies \(Mp=p\), so solve</p>
    <p>\[(M-I)p=0,\qquad p_1+p_2=1.\]</p>
    <p>The equation \(-0.2p_1+0.3p_2=0\) gives \(p_2=\tfrac23p_1\). Normalization yields</p>
    <p>\[p=\begin{bmatrix}0.6\\0.4\end{bmatrix}.\]</p>
    <p>The eigenvalue \(1\) represents the stationary mode. Other eigenvalues control convergence toward it.</p>

    <h3>B10. Fourier series as orthogonal coordinates</h3>
    <p>On \([-\pi,\pi]\), the functions \(1,\cos kt,\sin kt\) are mutually orthogonal under the inner product</p>
    <p>\[\langle f,g\rangle=\int_{-\pi}^{\pi}f(t)g(t)\,dt.\]</p>
    <p>Therefore Fourier coefficients are projections:</p>
    <p>\[a_k=\frac1\pi\int_{-\pi}^{\pi}f(t)\cos(kt)\,dt,\qquad b_k=\frac1\pi\int_{-\pi}^{\pi}f(t)\sin(kt)\,dt.\]</p>
    <p>This is exactly the same idea as computing coordinates in an orthogonal vector basis.</p>

    <h3>B11. Parseval's identity</h3>
    <p>For an orthonormal basis, squared length equals the sum of squared coordinates. Fourier analysis has the same structure: energy in the signal equals energy in its Fourier coefficients, with the appropriate normalization.</p>
    <p>This is the infinite-dimensional analogue of</p>
    <p>\[\|x\|_2^2=\sum_i(q_i^\top x)^2\]</p>
    <p>for an orthonormal matrix \(Q\).</p>

    <h3>B12. Practice set with answers</h3>
    <ol>
      <li>Why is the least-squares residual orthogonal to \(C(A)\)?<details><summary>Answer</summary><p>If the residual had a component in \(C(A)\), moving the fitted point along that component would reduce the distance. At the minimum, no such component remains, so \(A^\top(b-A\hat x)=0\).</p></details></li>
      <li>Prove that a projection matrix with \(P^2=P\) has eigenvalues only \(0\) or \(1\).<details><summary>Answer</summary><p>If \(Pv=\lambda v\), then \(P^2v=\lambda^2v\), but \(P^2v=Pv=\lambda v\). Hence \(\lambda^2=\lambda\), so \(\lambda\in\{0,1\}\).</p></details></li>
      <li>If \(A=PDP^{-1}\), prove \(\det A=\prod_i\lambda_i\).<details><summary>Answer</summary><p>\(\det A=\det P\det D\det P^{-1}=\det D=\prod_i\lambda_i\).</p></details></li>
      <li>What does an eigenvalue \(-1\) do under repeated multiplication?<details><summary>Answer</summary><p>Its component keeps the same magnitude but flips sign at every step because \((-1)^k\) alternates.</p></details></li>
    </ol>
  `;
  if (!entry.html.includes("Deep Dive B: Eigenvalues")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();