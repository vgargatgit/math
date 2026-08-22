(() => {
  const entry = window.MATH_APPENDIX?.find(
    item => item.slug === "applied-linear-algebra-unit-2"
  );
  if (!entry || entry.html.includes('id="unit2-strang-refinement-a"')) return;

  const marker = "<h2>12. Unit II synthesis</h2>";
  if (!entry.html.includes(marker)) {
    console.warn("Unit II synthesis marker was not found for refinement A.");
    return;
  }

  entry.summary = "A full undergraduate applied-linear-algebra unit, aligned with the conceptual order of MIT 18.06SC, covering orthogonality, projection, least squares, QR, determinants, eigenvalues, dynamics, Markov chains, and Fourier coordinates with proofs and worked examples.";

  const extra = String.raw`
    <hr>
    <div id="unit2-strang-refinement-a"></div>
    <h2>Strang-style development A: orthogonality, projections, least squares, and QR</h2>
    <div class="paper-connection">
      <strong>Session sequence.</strong> This development follows the same conceptual order as the Unit II sessions in Professor Gilbert Strang's MIT OpenCourseWare 18.06SC course: orthogonal subspaces, projection, least squares, and Gram-Schmidt. The explanations and numerical examples here are original and adapted for this AI/ML mathematics project.
      <p class="source-links">
        <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/orthogonal-vectors-and-subspaces/" target="_blank" rel="noopener noreferrer">Orthogonal Vectors and Subspaces</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/projections-onto-subspaces/" target="_blank" rel="noopener noreferrer">Projections onto Subspaces</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/projection-matrices-and-least-squares/" target="_blank" rel="noopener noreferrer">Projection Matrices and Least Squares</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/orthogonal-matrices-and-gram-schmidt/" target="_blank" rel="noopener noreferrer">Orthogonal Matrices and Gram-Schmidt</a>
      </p>
    </div>

    <h3>A0. Why Unit II begins with orthogonality</h3>
    <p>Exact equations are not always solvable. If \(A\in\mathbb{R}^{m\times n}\) and \(b\notin C(A)\), then no vector \(x\) can satisfy \(Ax=b\).</p>
    <p>The best possible output must still lie in the column space. Call that output \(p\):</p>
    <p>\[
    p=A\widehat{x}\in C(A).
    \]</p>
    <p>The error is</p>
    <p>\[
    e=b-p=b-A\widehat{x}.
    \]</p>
    <p>The closest point occurs when the error is perpendicular to the whole column space:</p>
    <p>\[
    e\perp C(A).
    \]</p>
    <p>Because the columns of \(A\) span \(C(A)\), this condition is equivalent to</p>
    <p>\[
    A^\top e=0.
    \]</p>
    <div class="definition">
      <strong>The main geometry of least squares.</strong>
      \[
      b=p+e,
      \qquad
      p\in C(A),
      \qquad
      e\in N(A^\top).
      \]
      The column space and the left nullspace are orthogonal complements.
    </div>

    <h3>A1. Orthogonal complements complete the four-subspace picture</h3>
    <p>For a subspace \(S\subseteq\mathbb{R}^m\), the orthogonal complement is</p>
    <p>\[
    S^\perp=\{y:y^\top s=0\text{ for every }s\in S\}.
    \]</p>
    <p>Every vector \(b\in\mathbb{R}^m\) can be split uniquely as</p>
    <p>\[
    b=p+e,
    \qquad p\in S,
    \qquad e\in S^\perp.
    \]</p>
    <p>For a matrix \(A\), choose \(S=C(A)\). Then</p>
    <p>\[
    C(A)^\perp=N(A^\top).
    \]</p>
    <p>This identity explains why least-squares residuals satisfy \(A^\top e=0\).</p>

    <h4>Proof that \(C(A)^\perp=N(A^\top)\)</h4>
    <p>Let the columns of \(A\) be \(a_1,\ldots,a_n\):</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix}.
    \]</p>
    <p>If \(y\in N(A^\top)\), then</p>
    <p>\[
    A^\top y=
    \begin{bmatrix}
    a_1^\top y\\
    a_2^\top y\\
    \vdots\\
    a_n^\top y
    \end{bmatrix}=0.
    \]</p>
    <p>Therefore \(y\) is perpendicular to every column and hence to every vector in \(C(A)\). Thus \(y\in C(A)^\perp\).</p>
    <p>The reverse argument is the same. If \(y\) is perpendicular to every vector in \(C(A)\), it is perpendicular to every column of \(A\), so \(A^\top y=0\).</p>

    <h3>A2. Projection onto one line: derive the formula from perpendicular error</h3>
    <p>Let \(a\ne0\). We want the point on the line \(\operatorname{span}(a)\) that is closest to \(b\).</p>
    <p>Every point on the line has the form</p>
    <p>\[
    p=ca.
    \]</p>
    <p>The error is</p>
    <p>\[
    e=b-ca.
    \]</p>
    <p>At the closest point, the error is perpendicular to the line:</p>
    <p>\[
    a^\top(b-ca)=0.
    \]</p>
    <p>Therefore</p>
    <p>\[
    a^\top b-c\,a^\top a=0,
    \qquad
    c=\frac{a^\top b}{a^\top a}.
    \]</p>
    <p>The projection is</p>
    <p>\[
    \boxed{p=a\frac{a^\top b}{a^\top a}}.
    \]</p>

    <h4>Small numerical example</h4>
    <p>Let</p>
    <p>\[
    a=\begin{bmatrix}1\\2\end{bmatrix},
    \qquad
    b=\begin{bmatrix}3\\1\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    a^\top b=5,
    \qquad
    a^\top a=5,
    \qquad
    c=1.
    \]</p>
    <p>So</p>
    <p>\[
    p=a=\begin{bmatrix}1\\2\end{bmatrix},
    \qquad
    e=b-p=\begin{bmatrix}2\\-1\end{bmatrix}.
    \]</p>
    <p>Check orthogonality:</p>
    <p>\[
    a^\top e=(1)(2)+(2)(-1)=0.
    \]</p>

    <h3>A3. Why perpendicular error gives the nearest point</h3>
    <p>Let \(p\) be the projection of \(b\) onto a subspace \(S\), and let \(e=b-p\). By construction, \(e\perp S\).</p>
    <p>Take any other candidate \(q\in S\). Then</p>
    <p>\[
    b-q=(b-p)+(p-q)=e+(p-q).
    \]</p>
    <p>Because \(p-q\in S\) and \(e\perp S\), the two terms are perpendicular. The Pythagorean theorem gives</p>
    <p>\[
    \|b-q\|_2^2=\|e\|_2^2+\|p-q\|_2^2.
    \]</p>
    <p>Therefore</p>
    <p>\[
    \|b-q\|_2^2\ge\|e\|_2^2=\|b-p\|_2^2.
    \]</p>
    <div class="definition">
      <strong>Nearest-point theorem.</strong> A point \(p\in S\) is the closest point in \(S\) to \(b\) exactly when the error \(b-p\) is perpendicular to \(S\).
    </div>

    <h3>A4. Projection onto the column space of a matrix</h3>
    <p>Let \(A\in\mathbb{R}^{m\times n}\) have linearly independent columns. Write</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix}.
    \]</p>
    <p>Any point in the column space has the form</p>
    <p>\[
    p=A\widehat{x}
    =\widehat{x}_1a_1+\cdots+\widehat{x}_na_n.
    \]</p>
    <p>The residual is</p>
    <p>\[
    e=b-A\widehat{x}.
    \]</p>
    <p>For \(e\) to be perpendicular to every column,</p>
    <p>\[
    A^\top e=0.
    \]</p>
    <p>Substitute the residual:</p>
    <p>\[
    A^\top(b-A\widehat{x})=0.
    \]</p>
    <p>This gives the normal equations:</p>
    <p>\[
    \boxed{A^\top A\widehat{x}=A^\top b}.
    \]</p>
    <p>If the columns are independent, \(A^\top A\) is invertible and</p>
    <p>\[
    \widehat{x}=(A^\top A)^{-1}A^\top b.
    \]</p>

    <h3>A5. The projection matrix and its four key subspaces</h3>
    <p>The projected vector is</p>
    <p>\[
    p=A\widehat{x}
    =A(A^\top A)^{-1}A^\top b.
    \]</p>
    <p>Define</p>
    <p>\[
    \boxed{P=A(A^\top A)^{-1}A^\top}.
    \]</p>
    <p>Then \(p=Pb\).</p>

    <h4>1. \(P\) is symmetric</h4>
    <p>Because \(A^\top A\) is symmetric, its inverse is symmetric:</p>
    <p>\[
    P^\top
    =\left(A(A^\top A)^{-1}A^\top\right)^\top
    =A(A^\top A)^{-1}A^\top=P.
    \]</p>

    <h4>2. \(P\) is idempotent</h4>
    <p>\[
    \begin{aligned}
    P^2
    &=A(A^\top A)^{-1}A^\top A(A^\top A)^{-1}A^\top\\
    &=A(A^\top A)^{-1}A^\top\\
    &=P.
    \end{aligned}
    \]</p>
    <p>Projection twice gives the same result as projection once.</p>

    <h4>3. The column space of \(P\) is \(C(A)\)</h4>
    <p>Every output \(Pb\) has the form \(Az\), so \(C(P)\subseteq C(A)\). Conversely, if \(y=Ax\), then</p>
    <p>\[
    Py=A(A^\top A)^{-1}A^\top Ax=Ax=y.
    \]</p>
    <p>Thus every vector in \(C(A)\) is an output of \(P\).</p>

    <h4>4. The nullspace of \(P\) is \(N(A^\top)\)</h4>
    <p>If \(A^\top b=0\), then \(Pb=0\). Conversely, if \(Pb=0\), then the projected component of \(b\) in \(C(A)\) is zero, so \(b\perp C(A)\), which means \(A^\top b=0\).</p>
    <p>The complementary projection is</p>
    <p>\[
    I-P.
    \]</p>
    <p>It projects onto \(N(A^\top)\), and</p>
    <p>\[
    b=Pb+(I-P)b.
    \]</p>

    <h3>A6. Complete least-squares line fit</h3>
    <p>Fit a line</p>
    <p>\[
    y\approx c+mt
    \]</p>
    <p>to the data points</p>
    <p>\[
    (0,1),\qquad(1,2),\qquad(2,2).
    \]</p>
    <p>The design matrix and target vector are</p>
    <p>\[
    A=
    \begin{bmatrix}
    1&0\\
    1&1\\
    1&2
    \end{bmatrix},
    \qquad
    b=\begin{bmatrix}1\\2\\2\end{bmatrix},
    \qquad
    x=\begin{bmatrix}c\\m\end{bmatrix}.
    \]</p>
    <p>The system \(Ax=b\) is inconsistent because no line passes through all three points. Compute</p>
    <p>\[
    A^\top A=
    \begin{bmatrix}3&3\\3&5\end{bmatrix},
    \qquad
    A^\top b=
    \begin{bmatrix}5\\6\end{bmatrix}.
    \]</p>
    <p>The normal equations are</p>
    <p>\[
    \begin{bmatrix}3&3\\3&5\end{bmatrix}
    \begin{bmatrix}c\\m\end{bmatrix}
    =\begin{bmatrix}5\\6\end{bmatrix}.
    \]</p>
    <p>Solving gives</p>
    <p>\[
    \widehat{c}=\frac76,
    \qquad
    \widehat{m}=\frac12.
    \]</p>
    <p>The fitted vector is</p>
    <p>\[
    p=A\widehat{x}
    =\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix}.
    \]</p>
    <p>The residual is</p>
    <p>\[
    e=b-p
    =\begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}.
    \]</p>
    <p>Check the normal-equation condition:</p>
    <p>\[
    A^\top e=
    \begin{bmatrix}
    1&1&1\\
    0&1&2
    \end{bmatrix}
    \begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}
    =\begin{bmatrix}0\\0\end{bmatrix}.
    \]</p>
    <div class="paper-connection">
      <strong>ML connection.</strong> The columns of \(A\) are features. Least squares finds feature coefficients whose prediction vector is the projection of the target onto the feature span.
    </div>

    <h3>A7. Orthogonal matrices simplify coordinates</h3>
    <p>A matrix \(Q\in\mathbb{R}^{m\times n}\) has orthonormal columns when</p>
    <p>\[
    Q^\top Q=I_n.
    \]</p>
    <p>If \(Q\) is square, it is an orthogonal matrix and</p>
    <p>\[
    Q^{-1}=Q^\top.
    \]</p>
    <p>Orthogonal transformations preserve dot products:</p>
    <p>\[
    (Qx)^\top(Qy)=x^\top Q^\top Qy=x^\top y.
    \]</p>
    <p>They also preserve lengths:</p>
    <p>\[
    \|Qx\|_2=\|x\|_2.
    \]</p>
    <p>If the columns of \(Q\) form an orthonormal basis for a subspace, the coordinates of the projection are simply</p>
    <p>\[
    Q^\top b.
    \]</p>
    <p>The projection itself is</p>
    <p>\[
    p=QQ^\top b.
    \]</p>

    <h3>A8. Gram-Schmidt is repeated subtraction of projections</h3>
    <p>Start with independent columns \(a_1,\ldots,a_n\). The goal is to construct orthonormal columns \(q_1,\ldots,q_n\) with the same span.</p>
    <p>For two columns:</p>
    <p>\[
    q_1=\frac{a_1}{\|a_1\|_2},
    \]</p>
    <p>then remove from \(a_2\) its component along \(q_1\):</p>
    <p>\[
    u_2=a_2-q_1(q_1^\top a_2),
    \qquad
    q_2=\frac{u_2}{\|u_2\|_2}.
    \]</p>

    <h4>Numerical example</h4>
    <p>Let</p>
    <p>\[
    a_1=\begin{bmatrix}1\\1\\0\end{bmatrix},
    \qquad
    a_2=\begin{bmatrix}1\\0\\1\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    q_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\\0\end{bmatrix}.
    \]</p>
    <p>The projection coefficient is</p>
    <p>\[
    q_1^\top a_2=\frac1{\sqrt2}.
    \]</p>
    <p>Therefore</p>
    <p>\[
    u_2
    =a_2-q_1(q_1^\top a_2)
    =\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix}.
    \]</p>
    <p>Since \(\|u_2\|_2=\sqrt{3/2}\),</p>
    <p>\[
    q_2=\frac1{\sqrt6}\begin{bmatrix}1\\-1\\2\end{bmatrix}.
    \]</p>
    <p>Check:</p>
    <p>\[
    q_1^\top q_2=0,
    \qquad
    \|q_1\|_2=\|q_2\|_2=1.
    \]</p>

    <h3>A9. QR factorization from the column picture</h3>
    <p>Let</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix}
    \]</p>
    <p>and let \(Q=[q_1\;\cdots\;q_n]\) contain the orthonormal vectors produced by Gram-Schmidt.</p>
    <p>Each original column is a combination of the current and earlier \(q_i\):</p>
    <p>\[
    a_j=r_{1j}q_1+r_{2j}q_2+\cdots+r_{jj}q_j.
    \]</p>
    <p>Collecting these equations gives</p>
    <p>\[
    \boxed{A=QR},
    \]</p>
    <p>where \(R\) is upper triangular.</p>
    <p>Because \(Q^\top Q=I\),</p>
    <p>\[
    R=Q^\top A.
    \]</p>

    <h4>Least squares with QR</h4>
    <p>To minimize \(\|Ax-b\|_2=\|QRx-b\|_2\), decompose \(b\) into its component in \(C(Q)\) and its perpendicular component. The minimizing coordinates satisfy</p>
    <p>\[
    Rx=Q^\top b.
    \]</p>
    <p>This avoids explicitly forming \(A^\top A\).</p>
    <div class="shape-check">
      <strong>Numerical point.</strong> Forming \(A^\top A\) squares the 2-norm condition number: \(\kappa_2(A^\top A)=\kappa_2(A)^2\). QR is usually more stable.
    </div>

    <h3>A10. Classical and modified Gram-Schmidt</h3>
    <p>In exact arithmetic, classical and modified Gram-Schmidt produce the same mathematical result. In floating-point arithmetic, modified Gram-Schmidt is usually more reliable because it removes one projection at a time from the current residual vector.</p>
    <p>For highly ill-conditioned column sets, Householder QR is often more stable still. The conceptual geometry remains the same: replace a difficult basis with an orthonormal basis for the same column space.</p>

    <h3>A11. Practice: orthogonality, projection, least squares, and QR</h3>
    <ol>
      <li>Project \(b=(4,1)^\top\) onto \(a=(1,1)^\top\).<details><summary>Answer</summary><p>The coefficient is \((a^\top b)/(a^\top a)=5/2\). Therefore \(p=(5/2,5/2)^\top\), and \(e=(3/2,-3/2)^\top\).</p></details></li>
      <li>Why does \(A^\top e=0\) mean that \(e\perp C(A)\)?<details><summary>Answer</summary><p>The entries of \(A^\top e\) are \(a_i^\top e\), one dot product for each column. If all entries are zero, the error is perpendicular to every column and hence to their span.</p></details></li>
      <li>Prove that \(I-P\) is a projection when \(P^2=P\).<details><summary>Answer</summary><p>\((I-P)^2=I-2P+P^2=I-P\). If \(P\) is symmetric, then \(I-P\) is also symmetric.</p></details></li>
      <li>If \(Q\) has orthonormal columns, simplify \((Q^\top Q)^{-1}Q^\top b\).<details><summary>Answer</summary><p>Since \(Q^\top Q=I\), the expression equals \(Q^\top b\).</p></details></li>
      <li>For \(A=QR\), derive the normal equations from \(Rx=Q^\top b\).<details><summary>Answer</summary><p>Multiply by \(R^\top\): \(R^\top Rx=R^\top Q^\top b\). Since \(A^\top A=R^\top Q^\top QR=R^\top R\) and \(A^\top b=R^\top Q^\top b\), this is the normal equation.</p></details></li>
    </ol>
  `;

  entry.html = entry.html.replace(marker, extra + "\n\n    " + marker);
})();
