window.MATH_APPENDIX = [
  {
    slug: "why-p-inverse-gives-basis-coordinates",
    title: "Why does P⁻¹x give the coordinates of x in a new basis?",
    shortTitle: "Why does P⁻¹x give basis coordinates?",
    summary: "Understand why multiplying by the inverse basis matrix returns the coefficients of a vector in that basis.",
    relatedLesson: {
      label: "Day 4 · Spectral Linear Algebra",
      section: "Diagonalization",
      href: "#/lesson/day-04-spectral-linear-algebra"
    },
    tags: ["Change of basis", "Eigenvectors", "Diagonalization"],
    html: String.raw`
      <div class="definition">
        <strong>Central result.</strong> If the columns of \(P\) form a basis, then \(P^{-1}x\) gives the coordinates of \(x\) in that basis.
      </div>

      <h2>1. Start from what matrix-vector multiplication does</h2>
      <p>Let the two basis vectors be</p>
      <p>\[v_1=\begin{bmatrix}v_{11}\\v_{21}\end{bmatrix},\qquad
      v_2=\begin{bmatrix}v_{12}\\v_{22}\end{bmatrix}.\]</p>
      <p>Put these vectors into the columns of \(P\):</p>
      <p>\[P=\begin{bmatrix}|&|\\v_1&v_2\\|&|\end{bmatrix}.\]</p>
      <p>Now multiply \(P\) by a coefficient vector</p>
      <p>\[c=\begin{bmatrix}c_1\\c_2\end{bmatrix}.\]</p>
      <p>Matrix-vector multiplication forms a weighted sum of the columns:</p>
      <p>\[Pc=c_1v_1+c_2v_2.\]</p>
      <p>This identity is the complete reason that a basis matrix is useful. The entries of \(c\) tell us how much of each basis vector to use.</p>

      <h2>2. Expressing x in the basis means solving x = Pc</h2>
      <p>To express \(x\) in terms of \(v_1\) and \(v_2\), we want coefficients \(c_1\) and \(c_2\) such that</p>
      <p>\[x=c_1v_1+c_2v_2.\]</p>
      <p>Because \(Pc=c_1v_1+c_2v_2\), this is exactly the same equation as</p>
      <p>\[x=Pc.\]</p>
      <p>If \(v_1\) and \(v_2\) form a basis, they are linearly independent. Therefore, \(P\) is invertible. Multiply both sides by \(P^{-1}\):</p>
      <p>\[P^{-1}x=P^{-1}Pc=Ic=c.\]</p>
      <p>Thus,</p>
      <p>\[\boxed{c=P^{-1}x}.\]</p>
      <p>The inverse is not performing a special eigenvector trick. It is solving the linear system \(Pc=x\).</p>

      <h2>3. Small numerical example</h2>
      <p>Use</p>
      <p>\[v_1=\begin{bmatrix}1\\1\end{bmatrix},\qquad
      v_2=\begin{bmatrix}1\\-1\end{bmatrix}.\]</p>
      <p>Then</p>
      <p>\[P=\begin{bmatrix}1&1\\1&-1\end{bmatrix},\qquad
      P^{-1}=\frac12\begin{bmatrix}1&1\\1&-1\end{bmatrix}.\]</p>
      <p>Take</p>
      <p>\[x=\begin{bmatrix}4\\2\end{bmatrix}.\]</p>
      <p>Calculate its coordinates in the \(v_1,v_2\) basis:</p>
      <p>\[c=P^{-1}x
      =\frac12\begin{bmatrix}1&1\\1&-1\end{bmatrix}
      \begin{bmatrix}4\\2\end{bmatrix}
      =\begin{bmatrix}3\\1\end{bmatrix}.\]</p>
      <p>This result says</p>
      <p>\[x=3v_1+1v_2.\]</p>
      <p>Verify it directly:</p>
      <p>\[3\begin{bmatrix}1\\1\end{bmatrix}
      +1\begin{bmatrix}1\\-1\end{bmatrix}
      =\begin{bmatrix}4\\2\end{bmatrix}.\]</p>
      <div class="mini-example">
        The physical vector did not change. Its coordinate description changed. In the usual basis its coordinates are \((4,2)\). In the \(v_1,v_2\) basis its coordinates are \((3,1)\).
      </div>

      <h2>4. The same calculation is a system of equations</h2>
      <p>Writing</p>
      <p>\[\begin{bmatrix}4\\2\end{bmatrix}
      =c_1\begin{bmatrix}1\\1\end{bmatrix}
      +c_2\begin{bmatrix}1\\-1\end{bmatrix}\]</p>
      <p>gives</p>
      <p>\[c_1+c_2=4,\qquad c_1-c_2=2.\]</p>
      <p>Solving these equations gives \(c_1=3\) and \(c_2=1\). Multiplication by \(P^{-1}\) performs this same solve in matrix form.</p>

      <h2>5. Why does this work for every x?</h2>
      <p>It works for every \(x\) in the space because a basis has two properties:</p>
      <ol>
        <li><strong>Spanning.</strong> Every vector \(x\) can be written as a linear combination of the basis vectors.</li>
        <li><strong>Linear independence.</strong> That representation is unique.</li>
      </ol>
      <p>These two properties mean that the equation \(Pc=x\) has exactly one solution for every \(x\). This is equivalent to saying that \(P\) is invertible.</p>
      <div class="shape-check">
        <strong>Condition.</strong> \(P^{-1}x\) gives basis coordinates only when the columns of \(P\) form a basis. For diagonalization, this means that the matrix has enough linearly independent eigenvectors.
      </div>

      <h2>6. What fails when the columns are dependent?</h2>
      <p>Suppose</p>
      <p>\[v_1=\begin{bmatrix}1\\1\end{bmatrix},\qquad
      v_2=\begin{bmatrix}2\\2\end{bmatrix}.\]</p>
      <p>The second vector is only twice the first. These vectors span one line, not all of \(\mathbb{R}^2\). The matrix</p>
      <p>\[P=\begin{bmatrix}1&2\\1&2\end{bmatrix}\]</p>
      <p>is singular, so \(P^{-1}\) does not exist. Some vectors cannot be built from these columns, and vectors on their line do not have unique coefficients.</p>

      <h2>7. The idea is not limited to eigenvectors</h2>
      <p>The result works for any basis. Eigenvectors are useful in diagonalization because the transformation acts independently on them. But the coordinate rule itself is general.</p>
      <p>For an \(n\)-dimensional basis, write</p>
      <p>\[P=\begin{bmatrix}|&|&&|\\v_1&v_2&\cdots&v_n\\|&|&&|\end{bmatrix}.\]</p>
      <p>Then</p>
      <p>\[Pc=\sum_{i=1}^{n}c_iv_i,\qquad c=P^{-1}x.\]</p>

      <h2>8. Special case: an orthonormal basis</h2>
      <p>If the basis vectors are orthonormal, collect them in \(Q\). Then</p>
      <p>\[Q^{-1}=Q^\top.\]</p>
      <p>Therefore, the coordinates are</p>
      <p>\[c=Q^\top x.\]</p>
      <p>Each coordinate is then a dot product with one basis vector:</p>
      <p>\[c_i=q_i^\top x.\]</p>
      <p>This is why projections and coordinates are especially simple in an orthonormal eigenvector basis.</p>

      <h2>9. Mental model</h2>
      <table>
        <thead><tr><th>Operation</th><th>Direction of conversion</th><th>Question answered</th></tr></thead>
        <tbody>
          <tr><td>\(Pc\)</td><td>Basis coordinates → usual coordinates</td><td>What vector do these coefficients construct?</td></tr>
          <tr><td>\(P^{-1}x\)</td><td>Usual coordinates → basis coordinates</td><td>What coefficients construct this vector?</td></tr>
          <tr><td>\(Dc\)</td><td>Basis coordinates → scaled basis coordinates</td><td>How does the transformation scale each eigenvector component?</td></tr>
        </tbody>
      </table>
      <div class="paper-connection">
        <strong>One sentence to remember.</strong> \(P\) builds a vector from basis coefficients, so \(P^{-1}\) recovers those coefficients from the vector.
      </div>
    `
  }
];
