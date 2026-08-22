(() => {
  const entries = Array.isArray(window.MATH_APPENDIX) ? window.MATH_APPENDIX : [];
  const unit1 = entries.find(item => item.slug === "applied-linear-algebra-unit-1");
  const unit2 = entries.find(item => item.slug === "applied-linear-algebra-unit-2");
  const unit3 = entries.find(item => item.slug === "applied-linear-algebra-unit-3");

  function insertBefore(entry, marker, html, duplicateMarker) {
    if (!entry || entry.html.includes(duplicateMarker)) return;
    if (!entry.html.includes(marker)) {
      console.warn("Strang-alignment insertion marker was not found:", marker);
      return;
    }
    entry.html = entry.html.replace(marker, html + "\n\n    " + marker);
  }

  function addTag(entry, tag) {
    if (!entry) return;
    entry.tags = Array.isArray(entry.tags) ? entry.tags : [];
    if (!entry.tags.includes(tag)) entry.tags.push(tag);
  }

  addTag(unit1, "18.06SC-aligned");
  addTag(unit2, "18.06SC-aligned");
  addTag(unit3, "18.06SC-aligned");

  insertBefore(
    unit1,
    "<h2>1. The Geometry of Linear Equations</h2>",
    String.raw`
    <div class="paper-connection" id="strang-course-alignment-unit-1">
      <strong>Course alignment.</strong> This is an independent companion to the conceptual sequence used in Professor Gilbert Strang's MIT OpenCourseWare 18.06SC course. It follows the same progression from row, column, and matrix pictures of \(Ax=b\), through elimination as matrix multiplication, to inverses, \(LU\), subspaces, and graphs. The explanations and examples here are original and adapted for this AI/ML mathematics course; this site is not affiliated with or endorsed by MIT.
      <p class="source-links">
        <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/the-geometry-of-linear-equations/" target="_blank" rel="noopener noreferrer">MIT OCW: Geometry of Linear Equations</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/elimination-with-matrices/" target="_blank" rel="noopener noreferrer">Elimination with Matrices</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/multiplication-and-inverse-matrices/" target="_blank" rel="noopener noreferrer">Multiplication and Inverses</a>
        · <a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/factorization-into-a-lu/" target="_blank" rel="noopener noreferrer">Factorization into \(A=LU\)</a>
      </p>
    </div>
    `,
    'id="strang-course-alignment-unit-1"'
  );

  insertBefore(
    unit2,
    "<h2>1. Orthogonal Vectors and Subspaces</h2>",
    String.raw`
    <div class="paper-connection" id="strang-course-alignment-unit-2">
      <strong>Course alignment.</strong> This unit follows the MIT 18.06SC progression from orthogonality and projection to least squares, determinants, eigenvalues, matrix powers, differential equations, Markov matrices, and Fourier coordinates. The goal is to preserve Strang's geometric viewpoint while adding explicit ML connections, proofs, and small numerical checks.
      <p><a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/" target="_blank" rel="noopener noreferrer">View the corresponding MIT OpenCourseWare unit</a>.</p>
    </div>
    `,
    'id="strang-course-alignment-unit-2"'
  );

  insertBefore(
    unit3,
    "<h2>1. Symmetric Matrices and Positive Definiteness</h2>",
    String.raw`
    <div class="paper-connection" id="strang-course-alignment-unit-3">
      <strong>Course alignment.</strong> This unit follows the MIT 18.06SC sequence for symmetric and positive-definite matrices, complex and Fourier matrices, minima, similarity and Jordan form, SVD, linear transformations, change of basis, compression, and pseudoinverses. The explanations remain an independent companion written for this project.
      <p><a href="https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/" target="_blank" rel="noopener noreferrer">View the corresponding MIT OpenCourseWare unit</a>.</p>
    </div>
    `,
    'id="strang-course-alignment-unit-3"'
  );

  insertBefore(
    unit1,
    "<h3>A2. Why row operations preserve the solution set</h3>",
    String.raw`
    <h3 id="strang-left-multiplication">A1.5. Why a row operation is multiplication from the left</h3>
    <p>This is the matrix-multiplication viewpoint that makes elementary matrices natural.</p>

    <h4>The row interpretation of a product</h4>
    <p>Let the rows of \(A\in\mathbb{R}^{m\times n}\) be \(r_1^\top,\ldots,r_m^\top\), and let the rows of \(E\in\mathbb{R}^{m\times m}\) be \(e_1^\top,\ldots,e_m^\top\):</p>
    <p>\[
    A=\begin{bmatrix}
    \text{---}&r_1^\top&\text{---}\\
    \text{---}&r_2^\top&\text{---}\\
    &\vdots&\\
    \text{---}&r_m^\top&\text{---}
    \end{bmatrix},
    \qquad
    E=\begin{bmatrix}
    \text{---}&e_1^\top&\text{---}\\
    \text{---}&e_2^\top&\text{---}\\
    &\vdots&\\
    \text{---}&e_m^\top&\text{---}
    \end{bmatrix}.
    \]</p>
    <p>The \(i\)-th row of \(EA\) is</p>
    <p>\[
    (EA)_{i,:}=e_i^\top A
    =e_{i1}r_1^\top+e_{i2}r_2^\top+\cdots+e_{im}r_m^\top.
    \]</p>
    <div class="definition">
      <strong>Row interpretation.</strong> Every row of \(EA\) is a linear combination of the rows of \(A\). The coefficients for the new row \(i\) are stored in row \(i\) of \(E\).
    </div>

    <h4>Example: \(R_2\leftarrow R_2-2R_1\)</h4>
    <p>Suppose</p>
    <p>\[
    A=\begin{bmatrix}
    1&2\\
    3&4\\
    5&6
    \end{bmatrix}
    =\begin{bmatrix}
    \text{---}&r_1^\top&\text{---}\\
    \text{---}&r_2^\top&\text{---}\\
    \text{---}&r_3^\top&\text{---}
    \end{bmatrix}.
    \]</p>
    <p>Choose</p>
    <p>\[
    E=\begin{bmatrix}
    1&0&0\\
    -2&1&0\\
    0&0&1
    \end{bmatrix}.
    \]</p>
    <p>Read its rows:</p>
    <ul>
      <li>row 1, \((1,0,0)\), keeps \(r_1^\top\);</li>
      <li>row 2, \((-2,1,0)\), forms \(-2r_1^\top+r_2^\top\);</li>
      <li>row 3, \((0,0,1)\), keeps \(r_3^\top\).</li>
    </ul>
    <p>Therefore</p>
    <p>\[
    EA=
    \begin{bmatrix}
    1&2\\
    1&0\\
    5&6
    \end{bmatrix}.
    \]</p>
    <p>The second row is exactly</p>
    <p>\[
    (3,4)-2(1,2)=(1,0).
    \]</p>
    <p>So left multiplication by \(E\) performs the row operation \(R_2\leftarrow R_2-2R_1\).</p>

    <h4>Why the right-hand side changes at the same time</h4>
    <p>Write the augmented matrix as \([A\mid b]\). Then</p>
    <p>\[
    E[A\mid b]=[EA\mid Eb].
    \]</p>
    <p>The same linear combinations are applied to the coefficient rows and to the entries of \(b\). That is exactly what an elementary row operation on an augmented matrix must do.</p>
    <div class="mini-example">
      <strong>Construction rule.</strong> To build the elementary matrix for a row operation, apply that row operation to the identity matrix. The resulting matrix has rows that encode the required combinations of the original rows.
    </div>

    <h4>Why multiplication from the right changes columns instead</h4>
    <p>Let</p>
    <p>\[
    A=\begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix}
    \]</p>
    <p>and let column \(j\) of \(F\in\mathbb{R}^{n\times n}\) be \(f_j\). Then column \(j\) of \(AF\) is</p>
    <p>\[
    (AF)_{:,j}=Af_j
    =f_{1j}a_1+f_{2j}a_2+\cdots+f_{nj}a_n.
    \]</p>
    <div class="shape-check">
      <strong>Side matters.</strong> Left multiplication forms new rows from old rows. Right multiplication forms new columns from old columns. Row operations therefore belong on the left.
    </div>

    <h4>Small column-operation example</h4>
    <p>For a two-column matrix \(A=[a_1\;a_2]\), let</p>
    <p>\[
    F=\begin{bmatrix}1&3\\0&1\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    AF=\begin{bmatrix}\mid&\mid\\a_1&3a_1+a_2\\\mid&\mid\end{bmatrix}.
    \]</p>
    <p>Thus right multiplication by \(F\) performs the column operation \(C_2\leftarrow C_2+3C_1\).</p>
    `,
    'id="strang-left-multiplication"'
  );

  insertBefore(
    unit1,
    "<h3>A7. Deriving \\(A=LU\\) from elementary matrices</h3>",
    String.raw`
    <h3 id="strang-five-views">A6.5. Five useful views of matrix multiplication</h3>
    <p>Different problems call for different interpretations of \(AB\). The following views are algebraically equivalent.</p>

    <h4>1. Entry view: row times column</h4>
    <p>For \(A\in\mathbb{R}^{m\times n}\) and \(B\in\mathbb{R}^{n\times p}\),</p>
    <p>\[
    (AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
    \]</p>
    <p>Entry \((i,j)\) is the dot product of row \(i\) of \(A\) with column \(j\) of \(B\).</p>

    <h4>2. Column view</h4>
    <p>If \(B=[b_1\;b_2\;\cdots\;b_p]\), then</p>
    <p>\[
    AB=[Ab_1\;Ab_2\;\cdots\;Ab_p].
    \]</p>
    <p>Each output column is \(A\) applied to one column of \(B\). Use this view for transformations, basis matrices, and right multiplication.</p>

    <h4>3. Row view</h4>
    <p>If the rows of \(A\) are \(r_1^\top,\ldots,r_m^\top\), then</p>
    <p>\[
    AB=\begin{bmatrix}
    r_1^\top B\\
    r_2^\top B\\
    \vdots\\
    r_m^\top B
    \end{bmatrix}.
    \]</p>
    <p>Each output row is a linear combination of the rows of \(B\). Use this view for elementary matrices and left multiplication.</p>

    <h4>4. Outer-product view</h4>
    <p>Let \(a_k\) be column \(k\) of \(A\), and let \(s_k^\top\) be row \(k\) of \(B\). Then</p>
    <p>\[
    AB=\sum_{k=1}^{n}a_ks_k^\top.
    \]</p>
    <p>Each term is rank one. This view leads directly to low-rank decompositions and the SVD.</p>

    <h4>5. Block view</h4>
    <p>If matrices are split into compatible blocks, multiply them by the same row-times-column rule. For example,</p>
    <p>\[
    \begin{bmatrix}A&B\\C&D\end{bmatrix}
    \begin{bmatrix}X\\Y\end{bmatrix}
    =\begin{bmatrix}AX+BY\\CX+DY\end{bmatrix}.
    \]</p>
    <p>Block multiplication is useful in neural-network layers, covariance matrices, constrained optimization, and systems with several variable groups.</p>

    <table>
      <thead><tr><th>View</th><th>Best question to ask</th><th>Typical use</th></tr></thead>
      <tbody>
        <tr><td>Entry</td><td>What is one output number?</td><td>Index derivations and implementation checks</td></tr>
        <tr><td>Column</td><td>What happens to every input column?</td><td>Linear transformations and right multiplication</td></tr>
        <tr><td>Row</td><td>How are new rows built?</td><td>Elimination and elementary matrices</td></tr>
        <tr><td>Outer product</td><td>Which rank-one pieces build the product?</td><td>SVD and low-rank models</td></tr>
        <tr><td>Block</td><td>How do groups of variables interact?</td><td>Structured systems and ML architectures</td></tr>
      </tbody>
    </table>
    `,
    'id="strang-five-views"'
  );
})();