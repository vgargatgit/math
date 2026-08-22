(() => {
  const entry = window.MATH_APPENDIX?.find(
    item => item.slug === "applied-linear-algebra-unit-2"
  );
  if (!entry || entry.html.includes('id="unit2-strang-refinement-b"')) return;

  const marker = "<h2>12. Unit II synthesis</h2>";
  if (!entry.html.includes(marker)) {
    console.warn("Unit II synthesis marker was not found for refinement B.");
    return;
  }

  const extra = String.raw`
    <hr>
    <div id="unit2-strang-refinement-b"></div>
    <h2>Strang-style development B: determinants, eigenvalues, dynamics, Markov chains, and Fourier</h2>
    <div class="paper-connection">
      <strong>Session sequence.</strong> This development follows the remaining Unit II sequence in MIT 18.06SC: determinant properties and formulas, Cramer's rule and volume, eigenvalues, diagonalization, matrix powers, differential equations, Markov matrices, and Fourier series.
      <p class="source-links">
        <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/properties-of-determinants/" target="_blank" rel="noopener noreferrer">Properties of Determinants</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/determinant-formulas-and-cofactors/" target="_blank" rel="noopener noreferrer">Determinant Formulas and Cofactors</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/eigenvalues-and-eigenvectors/" target="_blank" rel="noopener noreferrer">Eigenvalues and Eigenvectors</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/diagonalization-and-powers-of-a/" target="_blank" rel="noopener noreferrer">Diagonalization and Powers</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/differential-equations-and-exp-at/" target="_blank" rel="noopener noreferrer">Differential Equations and \(e^{At}\)</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/markov-matrices-fourier-series/" target="_blank" rel="noopener noreferrer">Markov Matrices and Fourier Series</a>
      </p>
    </div>

    <h3>B0. Three properties determine the determinant</h3>
    <p>The determinant can be introduced through three basic rules.</p>
    <ol>
      <li><strong>Identity.</strong> \(\det I=1\).</li>
      <li><strong>Row swap.</strong> Swapping two rows changes the sign.</li>
      <li><strong>Linearity in one row.</strong> If all other rows stay fixed, the determinant is linear in the selected row.</li>
    </ol>
    <p>From these rules, the familiar determinant laws follow.</p>

    <h4>Equal rows force determinant zero</h4>
    <p>If two rows are equal, swapping them leaves the matrix unchanged. But a row swap must change the determinant sign. Therefore</p>
    <p>\[
    \det A=-\det A,
    \]</p>
    <p>which implies \(\det A=0\).</p>

    <h4>Row replacement leaves the determinant unchanged</h4>
    <p>Suppose row \(i\) is replaced by \(r_i+cr_j\), where \(i\ne j\). By linearity in row \(i\),</p>
    <p>\[
    \det(\ldots,r_i+cr_j,\ldots)
    =\det(\ldots,r_i,\ldots)
    +c\det(\ldots,r_j,\ldots).
    \]</p>
    <p>The second determinant has two copies of row \(r_j\), so it is zero. Therefore row replacement does not change the determinant.</p>

    <h4>Row scaling scales the determinant</h4>
    <p>By linearity, multiplying one row by \(c\) multiplies the determinant by \(c\).</p>
    <div class="definition">
      <strong>Elimination rules for determinants.</strong>
      <ul>
        <li>\(R_i\leftarrow R_i+cR_j\): no change;</li>
        <li>swap two rows: multiply by \(-1\);</li>
        <li>\(R_i\leftarrow cR_i\): multiply by \(c\).</li>
      </ul>
    </div>

    <h3>B1. Determinant by elimination</h3>
    <p>Consider</p>
    <p>\[
    A=\begin{bmatrix}
    1&2&0\\
    3&4&5\\
    0&1&2
    \end{bmatrix}.
    \]</p>
    <p>Use row replacement only:</p>
    <p>\[
    R_2\leftarrow R_2-3R_1
    \quad\Rightarrow\quad
    \begin{bmatrix}
    1&2&0\\
    0&-2&5\\
    0&1&2
    \end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    R_3\leftarrow R_3+\frac12R_2
    \quad\Rightarrow\quad
    U=
    \begin{bmatrix}
    1&2&0\\
    0&-2&5\\
    0&0&9/2
    \end{bmatrix}.
    \]</p>
    <p>No swaps or row scalings were used, so \(\det A=\det U\). For a triangular matrix, multiply the diagonal entries:</p>
    <p>\[
    \det A=(1)(-2)(9/2)=-9.
    \]</p>

    <h3>B2. Why triangular determinants are products of diagonal entries</h3>
    <p>In a triangular matrix, the determinant expansion contains only one nonzero permutation product: the product that selects every diagonal entry.</p>
    <p>For</p>
    <p>\[
    U=
    \begin{bmatrix}
    u_{11}&*&*\\
    0&u_{22}&*\\
    0&0&u_{33}
    \end{bmatrix},
    \]</p>
    <p>any permutation that chooses an entry below the diagonal includes a zero. Thus</p>
    <p>\[
    \det U=u_{11}u_{22}u_{33}.
    \]</p>
    <p>This is why elimination gives an efficient determinant algorithm.</p>

    <h3>B3. Why \(\det(AB)=\det A\det B\)</h3>
    <p>The volume interpretation gives the clearest intuition. The transformation \(B\) first scales oriented volume by \(\det B\). The transformation \(A\) then scales the result by \(\det A\). The composition \(AB\) therefore scales by the product:</p>
    <p>\[
    \boxed{\det(AB)=\det A\det B}.
    \]</p>
    <p>A proof based on the defining properties is also possible. For fixed \(A\), the function</p>
    <p>\[
    f(B)=\det(AB)
    \]</p>
    <p>has the determinant's row or column linearity and alternating behavior. Its value at \(I\) is \(\det A\). By uniqueness of the determinant function, \(f(B)=\det A\det B\).</p>
    <p>Important consequences are</p>
    <p>\[
    \det(A^{-1})=\frac1{\det A},
    \qquad
    \det(P^{-1}AP)=\det A.
    \]</p>

    <h3>B4. Cofactors and the adjugate identity</h3>
    <p>For a square matrix \(A\), let \(C_{ij}\) be the cofactor of entry \(a_{ij}\):</p>
    <p>\[
    C_{ij}=(-1)^{i+j}M_{ij},
    \]</p>
    <p>where \(M_{ij}\) is the determinant of the minor obtained by deleting row \(i\) and column \(j\).</p>
    <p>Expanding along row \(i\) gives</p>
    <p>\[
    \det A=\sum_j a_{ij}C_{ij}.
    \]</p>
    <p>Let \(C\) be the cofactor matrix. Then</p>
    <p>\[
    AC^\top=(\det A)I.
    \]</p>

    <h4>Why the off-diagonal entries are zero</h4>
    <p>The \((i,k)\) entry of \(AC^\top\) is the dot product of row \(i\) of \(A\) with the cofactors computed from row \(k\). When \(i=k\), this is the cofactor expansion of \(\det A\).</p>
    <p>When \(i\ne k\), the same sum is the determinant of a matrix with row \(k\) replaced by row \(i\). That matrix has two equal rows, so its determinant is zero.</p>
    <p>If \(\det A\ne0\), divide by \(\det A\):</p>
    <p>\[
    \boxed{A^{-1}=\frac{1}{\det A}C^\top}.
    \]</p>

    <h3>B5. Cramer's rule from the column picture</h3>
    <p>Write</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix},
    \qquad
    b=x_1a_1+\cdots+x_na_n.
    \]</p>
    <p>Replace column \(i\) of \(A\) by \(b\). Call the new matrix \(A_i\). By linearity in column \(i\),</p>
    <p>\[
    \det A_i
    =\sum_jx_j\det[a_1\;\cdots\;a_j\;\cdots].
    \]</p>
    <p>Every term with \(j\ne i\) has a repeated column and is zero. Only the term \(x_i a_i\) survives:</p>
    <p>\[
    \det A_i=x_i\det A.
    \]</p>
    <p>Therefore</p>
    <p>\[
    \boxed{x_i=\frac{\det A_i}{\det A}}.
    \]</p>
    <p>Cramer's rule is valuable for theory and very small symbolic systems. Elimination or factorization is better for numerical computation.</p>

    <h3>B6. Eigenvectors are invariant directions</h3>
    <p>A nonzero vector \(v\) is an eigenvector when</p>
    <p>\[
    Av=\lambda v.
    \]</p>
    <p>The line \(\operatorname{span}(v)\) is invariant: the transformation does not send \(v\) to a new line. It only scales or reverses it.</p>
    <p>Rearrange:</p>
    <p>\[
    (A-\lambda I)v=0.
    \]</p>
    <p>A nonzero solution exists exactly when \(A-\lambda I\) is singular:</p>
    <p>\[
    \boxed{\det(A-\lambda I)=0}.
    \]</p>

    <h4>Complete \(2\times2\) example</h4>
    <p>Let</p>
    <p>\[
    A=\begin{bmatrix}4&1\\2&3\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    \det(A-\lambda I)
    =(4-\lambda)(3-\lambda)-2
    =\lambda^2-7\lambda+10.
    \]</p>
    <p>Thus</p>
    <p>\[
    (\lambda-5)(\lambda-2)=0,
    \]</p>
    <p>so the eigenvalues are \(5\) and \(2\).</p>
    <p>For \(\lambda=5\), an eigenvector is</p>
    <p>\[
    v_1=\begin{bmatrix}1\\1\end{bmatrix}.
    \]</p>
    <p>For \(\lambda=2\), an eigenvector is</p>
    <p>\[
    v_2=\begin{bmatrix}1\\-2\end{bmatrix}.
    \]</p>

    <h3>B7. Trace and determinant summarize the eigenvalues</h3>
    <p>If \(A\) is diagonalizable,</p>
    <p>\[
    A=S\Lambda S^{-1}.
    \]</p>
    <p>Similar matrices have the same trace and determinant. Therefore</p>
    <p>\[
    \operatorname{tr}(A)=\operatorname{tr}(\Lambda)=\sum_i\lambda_i,
    \]</p>
    <p>and</p>
    <p>\[
    \det A=\det\Lambda=\prod_i\lambda_i.
    \]</p>
    <p>These identities hold even when \(A\) is not diagonalizable.</p>
    <p>For the example matrix,</p>
    <p>\[
    \operatorname{tr}(A)=4+3=7=5+2,
    \]</p>
    <p>and</p>
    <p>\[
    \det A=12-2=10=(5)(2).
    \]</p>

    <h3>B8. Diagonalization is a change to eigenvector coordinates</h3>
    <p>Put independent eigenvectors into the columns of \(S\):</p>
    <p>\[
    S=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    v_1&v_2&\cdots&v_n\\
    \mid&\mid&&\mid
    \end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    AS=[Av_1\;\cdots\;Av_n]
    =[\lambda_1v_1\;\cdots\;\lambda_nv_n]
    =S\Lambda.
    \]</p>
    <p>Multiply by \(S^{-1}\) on the right:</p>
    <p>\[
    \boxed{A=S\Lambda S^{-1}}.
    \]</p>
    <p>The three operations are:</p>
    <ol>
      <li>\(S^{-1}\): convert to eigenvector coordinates;</li>
      <li>\(\Lambda\): scale each coordinate independently;</li>
      <li>\(S\): return to the original coordinates.</li>
    </ol>
    <p><a class="why-link" href="#/appendix/why-p-inverse-gives-basis-coordinates">Why does \(S^{-1}x\) return basis coordinates?</a></p>

    <h3>B9. Difference equations and powers of \(A\)</h3>
    <p>Consider the discrete-time system</p>
    <p>\[
    u_{k+1}=Au_k.
    \]</p>
    <p>Repeated substitution gives</p>
    <p>\[
    u_k=A^ku_0.
    \]</p>
    <p>If \(A=S\Lambda S^{-1}\), then</p>
    <p>\[
    A^k=S\Lambda^kS^{-1}.
    \]</p>

    <h4>Use the complete eigenvalue example</h4>
    <p>For</p>
    <p>\[
    A=\begin{bmatrix}4&1\\2&3\end{bmatrix},
    \qquad
    S=\begin{bmatrix}1&1\\1&-2\end{bmatrix},
    \qquad
    \Lambda=\begin{bmatrix}5&0\\0&2\end{bmatrix},
    \]</p>
    <p>take</p>
    <p>\[
    u_0=\begin{bmatrix}3\\0\end{bmatrix}.
    \]</p>
    <p>The eigenvector coordinates are</p>
    <p>\[
    c=S^{-1}u_0=\begin{bmatrix}2\\1\end{bmatrix}.
    \]</p>
    <p>Thus</p>
    <p>\[
    u_0=2v_1+v_2.
    \]</p>
    <p>After \(k\) steps,</p>
    <p>\[
    u_k
    =2\cdot5^kv_1+2^kv_2.
    \]</p>
    <p>The \(5^k\) mode eventually dominates.</p>

    <h3>B10. A Fibonacci recurrence as a matrix power</h3>
    <p>The Fibonacci recurrence</p>
    <p>\[
    F_{k+1}=F_k+F_{k-1}
    \]</p>
    <p>can be written as</p>
    <p>\[
    \begin{bmatrix}F_{k+1}\\F_k\end{bmatrix}
    =
    \begin{bmatrix}1&1\\1&0\end{bmatrix}
    \begin{bmatrix}F_k\\F_{k-1}\end{bmatrix}.
    \]</p>
    <p>The eigenvalues solve</p>
    <p>\[
    \lambda^2-\lambda-1=0,
    \]</p>
    <p>so</p>
    <p>\[
    \lambda_1=\frac{1+\sqrt5}{2},
    \qquad
    \lambda_2=\frac{1-\sqrt5}{2}.
    \]</p>
    <p>The first eigenvalue has magnitude greater than one. The second has magnitude less than one. This explains why the ratio \(F_{k+1}/F_k\) approaches the golden ratio.</p>

    <h3>B11. Matrix exponentials solve continuous-time systems</h3>
    <p>For the differential equation</p>
    <p>\[
    \frac{du}{dt}=Au,
    \qquad
    u(0)=u_0,
    \]</p>
    <p>define</p>
    <p>\[
    e^{At}=I+At+\frac{A^2t^2}{2!}+\frac{A^3t^3}{3!}+\cdots.
    \]</p>
    <p>Differentiating term by term gives</p>
    <p>\[
    \frac{d}{dt}e^{At}=Ae^{At}.
    \]</p>
    <p>Therefore</p>
    <p>\[
    u(t)=e^{At}u_0
    \]</p>
    <p>solves the system.</p>
    <p>If \(A=S\Lambda S^{-1}\), then</p>
    <p>\[
    e^{At}=Se^{\Lambda t}S^{-1},
    \]</p>
    <p>where</p>
    <p>\[
    e^{\Lambda t}=\operatorname{diag}(e^{\lambda_1t},\ldots,e^{\lambda_nt}).
    \]</p>

    <h4>Small decaying system</h4>
    <p>For</p>
    <p>\[
    A=\begin{bmatrix}-1&0\\0&-3\end{bmatrix},
    \]</p>
    <p>the solution is</p>
    <p>\[
    u(t)=
    \begin{bmatrix}e^{-t}&0\\0&e^{-3t}\end{bmatrix}u_0.
    \]</p>
    <p>The second mode decays faster because its eigenvalue is more negative.</p>

    <h3>B12. Markov matrices and the eigenvalue \(1\)</h3>
    <p>Use the column-stochastic convention. A Markov matrix \(M\) has nonnegative entries and each column sums to \(1\).</p>
    <p>If \(\mathbf{1}^\top=(1,\ldots,1)\), then</p>
    <p>\[
    \mathbf{1}^\top M=\mathbf{1}^\top.
    \]</p>
    <p>This identity says that total probability is preserved:</p>
    <p>\[
    \mathbf{1}^\top p_{k+1}
    =\mathbf{1}^\top Mp_k
    =\mathbf{1}^\top p_k.
    \]</p>
    <p>A stationary distribution satisfies</p>
    <p>\[
    Mp_*=p_*.
    \]</p>
    <p>So \(p_*\) is a right eigenvector with eigenvalue \(1\).</p>

    <h4>Two-state example</h4>
    <p>Let</p>
    <p>\[
    M=\begin{bmatrix}0.8&0.3\\0.2&0.7\end{bmatrix}.
    \]</p>
    <p>Solve \((M-I)p=0\) together with \(p_1+p_2=1\). The result is</p>
    <p>\[
    p_*=\begin{bmatrix}0.6\\0.4\end{bmatrix}.
    \]</p>
    <p>The second eigenvalue is \(0.5\). Deviations from the stationary distribution decay like \(0.5^k\).</p>

    <h3>B13. Fourier series are projections in a function space</h3>
    <p>On \([-\pi,\pi]\), define the inner product</p>
    <p>\[
    \langle f,g\rangle
    =\int_{-\pi}^{\pi}f(t)g(t)\,dt.
    \]</p>
    <p>The functions</p>
    <p>\[
    1,\quad \cos t,\quad \sin t,\quad \cos2t,\quad \sin2t,\ldots
    \]</p>
    <p>are orthogonal. Fourier coefficients are projection coordinates:</p>
    <p>\[
    a_k=\frac1\pi\int_{-\pi}^{\pi}f(t)\cos(kt)\,dt,
    \qquad
    b_k=\frac1\pi\int_{-\pi}^{\pi}f(t)\sin(kt)\,dt.
    \]</p>
    <p>The partial Fourier series is the projection of \(f\) onto the finite-dimensional subspace spanned by the selected sine and cosine functions.</p>

    <h4>Example: \(f(t)=t\)</h4>
    <p>The function \(t\) is odd, so all cosine coefficients are zero. Its sine coefficients are</p>
    <p>\[
    b_k=\frac1\pi\int_{-\pi}^{\pi}t\sin(kt)\,dt
    =\frac{2(-1)^{k+1}}{k}.
    \]</p>
    <p>Thus</p>
    <p>\[
    t=2\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{k}\sin(kt)
    \]</p>
    <p>at points where the Fourier series converges to the function.</p>

    <h3>B14. Practice: determinants, eigenvalues, dynamics, and Fourier</h3>
    <ol>
      <li>Explain why adding a multiple of one row to another does not change the determinant.<details><summary>Answer</summary><p>Linearity splits the new determinant into the original determinant plus a second determinant with two equal rows. The second term is zero.</p></details></li>
      <li>Compute the determinant of \(\begin{bmatrix}2&1\\4&3\end{bmatrix}\) by elimination.<details><summary>Answer</summary><p>Use \(R_2\leftarrow R_2-2R_1\) to get \(\begin{bmatrix}2&1\\0&1\end{bmatrix}\). Row replacement does not change the determinant, so \(\det A=2\).</p></details></li>
      <li>For eigenvalues \(4,-1,2\), find the trace and determinant.<details><summary>Answer</summary><p>The trace is \(4-1+2=5\). The determinant is \((4)(-1)(2)=-8\).</p></details></li>
      <li>If \(u_0=3v_1-2v_2\), \(Av_1=2v_1\), and \(Av_2=-v_2\), find \(A^ku_0\).<details><summary>Answer</summary><p>\(A^ku_0=3\cdot2^kv_1-2(-1)^kv_2\).</p></details></li>
      <li>Why does a column-stochastic Markov matrix preserve total probability?<details><summary>Answer</summary><p>Column sums equal one, so \(\mathbf{1}^\top M=\mathbf{1}^\top\). Hence \(\mathbf{1}^\top Mp=\mathbf{1}^\top p\).</p></details></li>
      <li>Why are Fourier coefficients projection coordinates?<details><summary>Answer</summary><p>Sine and cosine functions are orthogonal under the integral inner product. Dividing the inner product with a basis function by its squared norm gives the coefficient, exactly as in vector projection.</p></details></li>
    </ol>
  `;

  entry.html = entry.html.replace(marker, extra + "\n\n    " + marker);
})();
