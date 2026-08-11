(() => {
  const section = COURSE[0]?.lessons?.[3]?.sections?.find(
    ({ id }) => id === "diagonalization"
  );

  if (!section) {
    console.warn("Day 4 diagonalization section was not found.");
    return;
  }

  const marker = "<h3>Why powers become easy</h3>";
  const clarification = String.raw`
        <div id="coordinate-change-example">
          <h3>Small example: what does \(P^{-1}\) actually do?</h3>
          <p>Use the matrix</p>
          <p>\[A=\begin{bmatrix}2&1\\1&2\end{bmatrix}.\]</p>
          <p>It has these eigenvectors and eigenvalues:</p>
          <p>\[v_1=\begin{bmatrix}1\\1\end{bmatrix},\quad \lambda_1=3,\qquad
          v_2=\begin{bmatrix}1\\-1\end{bmatrix},\quad \lambda_2=1.\]</p>
          <p>Put the eigenvectors into the columns of \(P\), and put the eigenvalues into \(D\):</p>
          <p>\[P=\begin{bmatrix}1&1\\1&-1\end{bmatrix},\qquad
          D=\begin{bmatrix}3&0\\0&1\end{bmatrix}.\]</p>
          <p>For this matrix,</p>
          <p>\[P^{-1}=\frac12\begin{bmatrix}1&1\\1&-1\end{bmatrix}.\]</p>

          <h4>Step 1: start with a vector in the usual coordinates</h4>
          <p>Let</p>
          <p>\[x=\begin{bmatrix}4\\2\end{bmatrix}.\]</p>
          <p>The entries \(4\) and \(2\) describe \(x\) with the usual horizontal and vertical basis vectors.</p>

          <h4>Step 2: use \(P^{-1}\) to find the eigenvector coordinates</h4>
          <p>Calculate</p>
          <p>\[c=P^{-1}x
          =\frac12\begin{bmatrix}1&1\\1&-1\end{bmatrix}
          \begin{bmatrix}4\\2\end{bmatrix}
          =\begin{bmatrix}3\\1\end{bmatrix}.\]</p>
          <p>The new coordinate vector \(c=(3,1)^\top\) says</p>
          <p>\[x=3v_1+1v_2.\]</p>
          <p>Check it:</p>
          <p>\[3\begin{bmatrix}1\\1\end{bmatrix}
          +1\begin{bmatrix}1\\-1\end{bmatrix}
          =\begin{bmatrix}4\\2\end{bmatrix}=x.\]</p>
          <div class="definition">
            <strong>This is the key idea.</strong> The vector did not change. Only its coordinate description changed. In the usual basis, its coordinates are \((4,2)\). In the eigenvector basis, its coordinates are \((3,1)\).
          </div>

          <h4>Why is the inverse used?</h4>
          <p>The columns of \(P\) are the eigenvector basis. Therefore, \(P\) converts eigenvector coordinates into the original coordinates:</p>
          <p>\[x=Pc.\]</p>
          <p>To go in the opposite direction, solve for \(c\):</p>
          <p>\[c=P^{-1}x.\]</p>
          <p>Thus, \(P^{-1}\) answers this question: “How much of each eigenvector is present in \(x\)?”</p>

          <h4>Step 3: let \(D\) scale the two eigenvector coordinates independently</h4>
          <p>Now apply \(D\):</p>
          <p>\[Dc=
          \begin{bmatrix}3&0\\0&1\end{bmatrix}
          \begin{bmatrix}3\\1\end{bmatrix}
          =\begin{bmatrix}9\\1\end{bmatrix}.\]</p>
          <p>The coefficient of \(v_1\) changed from \(3\) to \(9\), because its eigenvalue is \(3\). The coefficient of \(v_2\) stayed \(1\), because its eigenvalue is \(1\).</p>

          <h4>Step 4: use \(P\) to return to the original coordinates</h4>
          <p>Calculate</p>
          <p>\[P(Dc)=
          \begin{bmatrix}1&1\\1&-1\end{bmatrix}
          \begin{bmatrix}9\\1\end{bmatrix}
          =\begin{bmatrix}10\\8\end{bmatrix}.\]</p>
          <p>This agrees with direct multiplication:</p>
          <p>\[Ax=
          \begin{bmatrix}2&1\\1&2\end{bmatrix}
          \begin{bmatrix}4\\2\end{bmatrix}
          =\begin{bmatrix}10\\8\end{bmatrix}.\]</p>

          <table>
            <thead>
              <tr><th>Operation</th><th>Coordinates</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td>Start</td><td>\(x=(4,2)^\top\)</td><td>Describe the vector in the usual basis.</td></tr>
              <tr><td>\(P^{-1}x\)</td><td>\(c=(3,1)^\top\)</td><td>Describe the same vector in the eigenvector basis.</td></tr>
              <tr><td>\(Dc\)</td><td>\((9,1)^\top\)</td><td>Scale each eigenvector component by its eigenvalue.</td></tr>
              <tr><td>\(P(Dc)\)</td><td>\((10,8)^\top\)</td><td>Return to the usual coordinates.</td></tr>
            </tbody>
          </table>

          <div class="shape-check">
            <strong>Do not read \(P^{-1}\) as changing the physical vector.</strong> It changes the coordinate system used to describe that vector. The relation \(x=Pc\) is the reason that \(c=P^{-1}x\).
          </div>
        </div>
`;

  if (section.html.includes('id="coordinate-change-example"')) return;

  if (!section.html.includes(marker)) {
    console.warn("Day 4 diagonalization insertion point was not found.");
    return;
  }

  section.html = section.html.replace(marker, clarification + "\n        " + marker);
})();
