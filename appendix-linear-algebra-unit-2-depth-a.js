(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-2");
  if (!entry) return;
  const marker = "<h2>12. Unit II synthesis</h2>";
  const extra = String.raw`
    <hr>
    <h2>Deep Dive A: Orthogonality, projections, least squares, QR, and determinants</h2>

    <h3>A1. Orthogonal complements</h3>
    <p>For a subspace \(S\subseteq\mathbb{R}^n\), its orthogonal complement is</p>
    <p>\[S^\perp=\{x:x^\top s=0\text{ for every }s\in S\}.\]</p>
    <p>The pair \(S,S^\perp\) splits the whole space:</p>
    <p>\[\mathbb{R}^n=S\oplus S^\perp.\]</p>
    <p>That means every vector \(b\) has a unique decomposition \(b=p+e\), with \(p\in S\), \(e\in S^\perp\), and \(p^\top e=0\).</p>
    <p>For a matrix \(A\), the two important identities are</p>
    <p>\[N(A)=C(A^\top)^\perp,\qquad N(A^\top)=C(A)^\perp.\]</p>

    <h3>A2. Deriving projection onto one vector</h3>
    <p>We want the closest vector to \(b\) on the line spanned by nonzero \(a\). Any point on the line has the form \(p=ca\). The error is \(e=b-ca\). At the closest point, the error is perpendicular to the line:</p>
    <p>\[a^\top(b-ca)=0.\]</p>
    <p>Solving gives</p>
    <p>\[c=\frac{a^\top b}{a^\top a},\qquad p=a\frac{a^\top b}{a^\top a}.\]</p>
    <p>This is not a formula to memorize blindly. It comes from one geometric condition: the shortest residual is perpendicular to the subspace.</p>

    <h3>A3. Projection matrix properties and proof</h3>
    <p>For one vector, the projection matrix is</p>
    <p>\[P=\frac{aa^\top}{a^\top a}.\]</p>
    <p>It satisfies two important identities:</p>
    <p>\[P^2=P,\qquad P^\top=P.\]</p>
    <p><strong>Proof of idempotence.</strong></p>
    <p>\[P^2=\frac{aa^\top aa^\top}{(a^\top a)^2}=\frac{a(a^\top a)a^\top}{(a^\top a)^2}=P.\]</p>
    <p>Applying a projection twice does nothing new. Once a vector lies in the target subspace, projecting it again leaves it unchanged.</p>

    <h3>A4. Deriving the normal equations</h3>
    <p>If \(Ax=b\) has no exact solution, choose \(\hat x\) that minimizes</p>
    <p>\[\|Ax-b\|_2^2.\]</p>
    <p>At the best approximation, the residual \(e=b-A\hat x\) is perpendicular to the column space. Because every column of \(A\) lies in that space,</p>
    <p>\[A^\top e=0.\]</p>
    <p>Substitute \(e=b-A\hat x\):</p>
    <p>\[A^\top(b-A\hat x)=0\Rightarrow A^\top A\hat x=A^\top b.\]</p>
    <p>These are the normal equations.</p>

    <h3>A5. Least-squares line fit by hand</h3>
    <p>Fit \(y\approx c+mx\) to points \((0,1),(1,2),(2,2)\). Then</p>
    <p>\[A=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},\qquad b=\begin{bmatrix}1\\2\\2\end{bmatrix}.\]</p>
    <p>Compute</p>
    <p>\[A^\top A=\begin{bmatrix}3&3\\3&5\end{bmatrix},\qquad A^\top b=\begin{bmatrix}5\\6\end{bmatrix}.\]</p>
    <p>Solving gives \(c=7/6\), \(m=1/2\). Thus the least-squares line is</p>
    <p>\[\hat y=\frac76+\frac12x.\]</p>
    <p>The fitted values are \((7/6,5/3,13/6)\), and the residual is orthogonal to both columns of \(A\).</p>

    <h3>A6. Why normal equations can be numerically weaker than QR</h3>
    <p>The condition number approximately squares:</p>
    <p>\[\kappa(A^\top A)=\kappa(A)^2\]</p>
    <p>when the 2-norm condition number is used and \(A\) has full column rank. Therefore forming \(A^\top A\) can amplify conditioning problems.</p>
    <p>QR solves least squares as</p>
    <p>\[A=QR,\qquad \min_x\|QRx-b\|=\min_x\|Rx-Q^\top b\|.\]</p>
    <p>Because \(Q\) is orthogonal, it preserves lengths. The remaining triangular solve is stable and efficient.</p>

    <h3>A7. Gram-Schmidt with a complete numerical example</h3>
    <p>Take</p>
    <p>\[a_1=\begin{bmatrix}1\\1\\0\end{bmatrix},\qquad a_2=\begin{bmatrix}1\\0\\1\end{bmatrix}.\]</p>
    <p>First normalize \(a_1\):</p>
    <p>\[q_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\\0\end{bmatrix}.\]</p>
    <p>Remove from \(a_2\) its component along \(q_1\):</p>
    <p>\[u_2=a_2-q_1(q_1^\top a_2)=\begin{bmatrix}1\\0\\1\end{bmatrix}-\frac12\begin{bmatrix}1\\1\\0\end{bmatrix}=\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix}.\]</p>
    <p>Its norm is \(\sqrt{3/2}\), so</p>
    <p>\[q_2=\frac1{\sqrt6}\begin{bmatrix}1\\-1\\2\end{bmatrix}.\]</p>
    <p>Check \(q_1^\top q_2=0\). These two orthonormal vectors span the same plane as \(a_1,a_2\).</p>

    <h3>A8. QR factorization emerges from Gram-Schmidt</h3>
    <p>Each original column can be reconstructed from the orthonormal columns. For two columns,</p>
    <p>\[a_1=r_{11}q_1,\qquad a_2=r_{12}q_1+r_{22}q_2.\]</p>
    <p>Therefore</p>
    <p>\[A=QR,\qquad R=\begin{bmatrix}r_{11}&r_{12}\\0&r_{22}\end{bmatrix}.\]</p>
    <p>The upper-triangular structure comes directly from the order of orthogonalization.</p>

    <h3>A9. Determinant as oriented volume</h3>
    <p>The absolute determinant is a volume scaling factor. In two dimensions, the parallelogram spanned by columns \(a_1,a_2\) has area</p>
    <p>\[|\det A|.\]</p>
    <p>For \(A=\begin{bmatrix}3&1\\0&2\end{bmatrix}\), the determinant is \(6\). The unit square becomes a parallelogram of area \(6\).</p>
    <p>The sign records orientation. Swapping two columns reverses orientation and changes the sign.</p>

    <h3>A10. Why determinant multiplication is natural</h3>
    <p>Apply \(B\) first and then \(A\). If \(B\) scales volume by \(|\det B|\) and \(A\) then scales the resulting volume by \(|\det A|\), the composition \(AB\) scales volume by the product. Algebraically,</p>
    <p>\[\det(AB)=\det A\det B.\]</p>
    <p>This property is also consistent with elimination: triangular matrices have determinant equal to the product of diagonal entries, and elementary row operations change the determinant in predictable ways.</p>

    <h3>A11. Determinant from elimination</h3>
    <p>For a triangular matrix \(U\),</p>
    <p>\[\det U=\prod_i u_{ii}.\]</p>
    <p>To compute \(\det A\), eliminate to triangular form while recording row swaps and row scalings. Row replacement \(R_i\leftarrow R_i+cR_j\) leaves the determinant unchanged. A row swap multiplies it by \(-1\). Scaling a row by \(c\) multiplies it by \(c\).</p>

    <h3>A12. Cofactor expansion and the 3×3 formula</h3>
    <p>For</p>
    <p>\[A=\begin{bmatrix}1&2&0\\3&4&5\\0&1&2\end{bmatrix},\]</p>
    <p>expand along the first row:</p>
    <p>\[\det A=1\begin{vmatrix}4&5\\1&2\end{vmatrix}-2\begin{vmatrix}3&5\\0&2\end{vmatrix}+0.\]</p>
    <p>Thus</p>
    <p>\[\det A=(8-5)-2(6)=3-12=-9.\]</p>
    <p>Cofactors are essential for theory and small symbolic examples, but elimination is preferable for large numerical matrices.</p>
  `;
  if (!entry.html.includes("Deep Dive A: Orthogonality")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();