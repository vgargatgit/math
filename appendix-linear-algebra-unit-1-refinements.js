(() => {
  const entry = window.MATH_APPENDIX?.find(
    item => item.slug === "applied-linear-algebra-unit-1"
  );
  if (!entry || entry.html.includes('id="unit1-refinement-marker"')) return;

  function replaceBetween(startMarker, endMarker, replacement) {
    const start = entry.html.indexOf(startMarker);
    const end = entry.html.indexOf(endMarker, start + startMarker.length);
    if (start === -1 || end === -1) {
      console.warn("Unit I refinement marker was not found:", startMarker);
      return;
    }
    entry.html = entry.html.slice(0, start) + replacement + "\n\n    " + entry.html.slice(end);
  }

  entry.summary = "A full undergraduate applied-linear-algebra course unit with explicit matrix pictures, reversible row operations, proofs, numerical examples, four-subspace geometry, rank, and graph matrices.";

  replaceBetween(
    "<h3>A1. Two geometries of \\(Ax=b\\)</h3>",
    "<h3>A2. Why row operations preserve the solution set</h3>",
    String.raw`
    <div id="unit1-refinement-marker"></div>
    <h3>A1. Two geometries of \(Ax=b\)</h3>
    <p>For \(A\in\mathbb{R}^{m\times n}\), the equation \(Ax=b\) can be read in two different ways. The two pictures describe the same multiplication, but each picture answers a different question.</p>

    <h4>Row picture: one equation from each row</h4>
    <p>Write the rows of \(A\) explicitly:</p>
    <p>\[
    A=
    \begin{bmatrix}
    \text{---}&r_1^\top&\text{---}\\
    \text{---}&r_2^\top&\text{---}\\
    &\vdots&\\
    \text{---}&r_m^\top&\text{---}
    \end{bmatrix},
    \qquad
    x=\begin{bmatrix}x_1\\x_2\\\vdots\\x_n\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    Ax=
    \begin{bmatrix}
    r_1^\top x\\
    r_2^\top x\\
    \vdots\\
    r_m^\top x
    \end{bmatrix}.
    \]</p>
    <p>Therefore \(Ax=b\) means</p>
    <p>\[
    r_1^\top x=b_1,\quad r_2^\top x=b_2,\quad\ldots,\quad r_m^\top x=b_m.
    \]</p>
    <p>Each row gives one scalar equation. In \(\mathbb{R}^2\), a nonzero row equation gives a line. In \(\mathbb{R}^3\), it gives a plane. The solution set is the common intersection of all these geometric objects.</p>

    <h4>Column picture: build the output from the columns</h4>
    <p>Now write \(A\) as a collection of column vectors:</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix},
    \qquad
    x=\begin{bmatrix}x_1\\x_2\\\vdots\\x_n\end{bmatrix}.
    \]</p>
    <p>Matrix-vector multiplication forms a linear combination of the columns:</p>
    <p>\[
    Ax=x_1a_1+x_2a_2+\cdots+x_na_n.
    \]</p>
    <p>Therefore \(Ax=b\) asks:</p>
    <ol>
      <li>Can \(b\) be built from the columns \(a_1,\ldots,a_n\)?</li>
      <li>If it can, which coefficients \(x_1,\ldots,x_n\) build it?</li>
    </ol>
    <div class="definition">
      <strong>Solvability criterion.</strong>
      \[
      Ax=b\text{ is solvable}\quad\Longleftrightarrow\quad b\in C(A).
      \]
      The column space \(C(A)\) is exactly the set of all outputs that the matrix can produce.
    </div>

    <h4>One small system in both pictures</h4>
    <p>Let</p>
    <p>\[
    A=\begin{bmatrix}1&2\\1&1\end{bmatrix},
    \qquad
    x=\begin{bmatrix}x_1\\x_2\end{bmatrix},
    \qquad
    b=\begin{bmatrix}5\\3\end{bmatrix}.
    \]</p>
    <p><strong>Row picture.</strong> The system is</p>
    <p>\[
    x_1+2x_2=5,
    \qquad
    x_1+x_2=3.
    \]</p>
    <p>The two lines intersect at \((x_1,x_2)=(1,2)\).</p>
    <p><strong>Column picture.</strong> Write</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid\\
    a_1&a_2\\
    \mid&\mid
    \end{bmatrix},
    \qquad
    a_1=\begin{bmatrix}1\\1\end{bmatrix},
    \quad
    a_2=\begin{bmatrix}2\\1\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    1a_1+2a_2
    =\begin{bmatrix}1\\1\end{bmatrix}
    +2\begin{bmatrix}2\\1\end{bmatrix}
    =\begin{bmatrix}5\\3\end{bmatrix}=b.
    \]</p>
    <div class="mini-example">
      <strong>One system, two questions.</strong> The row picture asks where equations intersect. The column picture asks how to construct \(b\) from the columns of \(A\). The answer vector \(x\) contains the construction coefficients.
    </div>
    `
  );

  replaceBetween(
    "<h3>A2. Why row operations preserve the solution set</h3>",
    "<h3>A3. A full elimination example with three unknowns</h3>",
    String.raw`
    <h3>A2. Why row operations preserve the solution set</h3>
    <p>Gaussian elimination uses three elementary row operations:</p>
    <ol>
      <li>swap two rows;</li>
      <li>multiply one row by a nonzero scalar;</li>
      <li>add a multiple of one row to another row.</li>
    </ol>
    <p>Each row operation can be performed by multiplying on the left by an <strong>elementary matrix</strong>. An elementary matrix is the identity matrix after one row operation has been applied to it.</p>

    <h4>Why every elementary matrix is invertible</h4>
    <p>The central reason is simple: every elementary row operation has an explicit reverse operation.</p>

    <h5>Case 1: swap two rows</h5>
    <p>For two rows, the swap matrix is</p>
    <p>\[
    E_{\mathrm{swap}}=\begin{bmatrix}0&1\\1&0\end{bmatrix}.
    \]</p>
    <p>Applying the same swap twice returns the original order:</p>
    <p>\[
    E_{\mathrm{swap}}^2=I.
    \]</p>
    <p>Therefore</p>
    <p>\[
    E_{\mathrm{swap}}^{-1}=E_{\mathrm{swap}}.
    \]</p>

    <h5>Case 2: multiply a row by \(c\ne0\)</h5>
    <p>For example, multiplying row 1 by \(3\) uses</p>
    <p>\[
    E_{\mathrm{scale}}=\begin{bmatrix}3&0\\0&1\end{bmatrix}.
    \]</p>
    <p>The reverse operation multiplies row 1 by \(1/3\):</p>
    <p>\[
    E_{\mathrm{scale}}^{-1}=\begin{bmatrix}1/3&0\\0&1\end{bmatrix}.
    \]</p>
    <p>The condition \(c\ne0\) is necessary. Multiplication by zero destroys a row and cannot be undone.</p>

    <h5>Case 3: add a multiple of one row to another</h5>
    <p>The operation \(R_2\leftarrow R_2-3R_1\) uses</p>
    <p>\[
    E_{\mathrm{add}}=
    \begin{bmatrix}1&0\\-3&1\end{bmatrix}.
    \]</p>
    <p>The reverse operation is \(R_2\leftarrow R_2+3R_1\), with</p>
    <p>\[
    E_{\mathrm{add}}^{-1}=
    \begin{bmatrix}1&0\\3&1\end{bmatrix}.
    \]</p>
    <p>Verify the inverse directly:</p>
    <p>\[
    \begin{bmatrix}1&0\\3&1\end{bmatrix}
    \begin{bmatrix}1&0\\-3&1\end{bmatrix}
    =\begin{bmatrix}1&0\\0&1\end{bmatrix}=I.
    \]</p>

    <div class="definition">
      <strong>Conclusion.</strong> Every legal elementary row operation is reversible. Therefore every elementary matrix is invertible.
    </div>

    <h4>Why this proves that row reduction is safe</h4>
    <p>Suppose one row operation is represented by \(E\). Starting from</p>
    <p>\[Ax=b,\]</p>
    <p>apply the same operation to both sides:</p>
    <p>\[EAx=Eb.\]</p>
    <p>Every solution of the original system satisfies the transformed system. Conversely, because \(E\) is invertible, multiply the transformed equation by \(E^{-1}\):</p>
    <p>\[
    E^{-1}(EAx)=E^{-1}(Eb).
    \]</p>
    <p>Using \(E^{-1}E=I\), this becomes</p>
    <p>\[Ax=b.\]</p>
    <p>Thus the implication works in both directions:</p>
    <p>\[
    Ax=b\quad\Longleftrightarrow\quad EAx=Eb.
    \]</p>
    <div class="shape-check">
      <strong>Important distinction.</strong> Row operations preserve the solution set of \(Ax=b\), but they usually change the column space as a geometric subset of \(\mathbb{R}^m\). Use row reduction to find pivot positions, but use columns from the original matrix when constructing a basis for \(C(A)\).
    </div>
    `
  );

  replaceBetween(
    "<h3>A7. Deriving LU from elimination</h3>",
    "<h3>A8. Solving with LU</h3>",
    String.raw`
    <h3>A7. Deriving \(A=LU\) from elementary matrices</h3>
    <p>Elimination multiplies \(A\) by elementary matrices. If the elimination steps are \(E_1,E_2,\ldots,E_k\), then</p>
    <p>\[
    E_kE_{k-1}\cdots E_1A=U,
    \]</p>
    <p>where \(U\) is upper triangular.</p>
    <p>Because every \(E_i\) is invertible, solve this equation for \(A\):</p>
    <p>\[
    A=E_1^{-1}E_2^{-1}\cdots E_k^{-1}U.
    \]</p>
    <p>The product of the inverse elimination matrices is lower triangular. Define</p>
    <p>\[
    L=E_1^{-1}E_2^{-1}\cdots E_k^{-1}.
    \]</p>
    <p>Then</p>
    <p>\[
    \boxed{A=LU}.
    \]</p>

    <h4>Small numerical example</h4>
    <p>Take</p>
    <p>\[
    A=\begin{bmatrix}2&1\\6&5\end{bmatrix}.
    \]</p>
    <p>Eliminate the \(6\) with \(R_2\leftarrow R_2-3R_1\). The elementary matrix is</p>
    <p>\[
    E=\begin{bmatrix}1&0\\-3&1\end{bmatrix}.
    \]</p>
    <p>Then</p>
    <p>\[
    EA=
    \begin{bmatrix}1&0\\-3&1\end{bmatrix}
    \begin{bmatrix}2&1\\6&5\end{bmatrix}
    =\begin{bmatrix}2&1\\0&2\end{bmatrix}=U.
    \]</p>
    <p>Now invert the elimination step:</p>
    <p>\[
    E^{-1}=\begin{bmatrix}1&0\\3&1\end{bmatrix}=L.
    \]</p>
    <p>Therefore</p>
    <p>\[
    A=E^{-1}U=LU
    =\begin{bmatrix}1&0\\3&1\end{bmatrix}
     \begin{bmatrix}2&1\\0&2\end{bmatrix}
    =\begin{bmatrix}2&1\\6&5\end{bmatrix}.
    \]</p>
    <div class="mini-example">
      <strong>Meaning of \(L\).</strong> The entries below the diagonal of \(L\) store the elimination multipliers. Algebraically, \(L\) reverses the elimination steps that produced \(U\).
    </div>
    `
  );

  replaceBetween(
    "<h3>B2. Rank-nullity theorem with intuition and proof</h3>",
    "<h3>B3. Why pivot columns of the original matrix form a column-space basis</h3>",
    String.raw`
    <h3>B2. Rank-nullity theorem with intuition and proof</h3>
    <div class="definition">
      <strong>Rank-nullity theorem.</strong> For \(A\in\mathbb{R}^{m\times n}\),
      \[
      \operatorname{rank}(A)+\operatorname{nullity}(A)=n.
      \]
    </div>
    <p>The theorem counts the independent input directions in two groups:</p>
    <ul>
      <li>pivot directions, which affect the output;</li>
      <li>free directions, which can move inside the nullspace without changing the output.</li>
    </ul>

    <h4>Proof from reduced row echelon form</h4>
    <p>Reduce \(A\) to a row-reduced matrix \(R\). There are \(n\) variables in total. Every variable is exactly one of the following:</p>
    <ol>
      <li>a pivot variable;</li>
      <li>a free variable.</li>
    </ol>
    <p>If there are \(r\) pivot variables, then there are \(n-r\) free variables.</p>
    <p>The number of pivots is the rank:</p>
    <p>\[
    \operatorname{rank}(A)=r.
    \]</p>
    <p>For \(Rx=0\), choose each free variable independently. Setting one free variable to \(1\) and the others to \(0\) produces one special nullspace solution. There are \(n-r\) such solutions, and they are independent because each one has a different free coordinate equal to \(1\). They span every nullspace solution because every solution is determined by the free variables.</p>
    <p>Therefore</p>
    <p>\[
    \operatorname{nullity}(A)=n-r.
    \]</p>
    <p>Adding the two dimensions gives</p>
    <p>\[
    \operatorname{rank}(A)+\operatorname{nullity}(A)
    =r+(n-r)=n.
    \]</p>

    <h4>Numerical example</h4>
    <p>Suppose</p>
    <p>\[
    R=\begin{bmatrix}
    1&2&0&-1&3\\
    0&0&1&4&-2
    \end{bmatrix}.
    \]</p>
    <p>There are \(n=5\) variables. Columns 1 and 3 contain pivots, so \(r=2\). Columns 2, 4, and 5 are free, so the nullity is \(3\). Indeed,</p>
    <p>\[
    2+3=5.
    \]</p>
    <div class="paper-connection">
      <strong>Information interpretation.</strong> The input has five independent coordinate directions. The matrix preserves only two independent output directions. Three independent input directions are invisible to the output and therefore lie in the nullspace.
    </div>
    `
  );

  replaceBetween(
    "<h3>B3. Why pivot columns of the original matrix form a column-space basis</h3>",
    "<h3>B4. The four fundamental subspaces as two orthogonal decompositions</h3>",
    String.raw`
    <h3>B3. Why pivot columns of the original matrix form a column-space basis</h3>
    <p>Row reduction tells us which column positions are pivots, but the basis for \(C(A)\) must be selected from the <strong>original matrix</strong>.</p>

    <h4>Step 1: row reduction applies one invertible map to every column</h4>
    <p>If row reduction changes \(A\) into \(R\), then</p>
    <p>\[
    R=EA
    \]</p>
    <p>for some invertible product \(E\) of elementary matrices.</p>
    <p>Write both matrices by columns:</p>
    <p>\[
    A=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    a_1&a_2&\cdots&a_n\\
    \mid&\mid&&\mid
    \end{bmatrix},
    \qquad
    R=
    \begin{bmatrix}
    \mid&\mid&&\mid\\
    Ea_1&Ea_2&\cdots&Ea_n\\
    \mid&\mid&&\mid
    \end{bmatrix}.
    \]</p>
    <p>Thus row reduction transforms every column by the same invertible map \(E\).</p>

    <h4>Step 2: invertible maps preserve dependence relations</h4>
    <p>Suppose the reduced columns satisfy</p>
    <p>\[
    Ea_j=c_1Ea_{p_1}+\cdots+c_rEa_{p_r},
    \]</p>
    <p>where \(p_1,\ldots,p_r\) are pivot-column positions. Multiply by \(E^{-1}\):</p>
    <p>\[
    a_j=c_1a_{p_1}+\cdots+c_ra_{p_r}.
    \]</p>
    <p>So every original nonpivot column is a combination of the original pivot columns. Therefore the original pivot columns span \(C(A)\).</p>

    <h4>Step 3: the original pivot columns are independent</h4>
    <p>Assume</p>
    <p>\[
    c_1a_{p_1}+\cdots+c_ra_{p_r}=0.
    \]</p>
    <p>Multiply by \(E\):</p>
    <p>\[
    c_1Ea_{p_1}+\cdots+c_rEa_{p_r}=0.
    \]</p>
    <p>The pivot columns of \(R\) are independent, so every coefficient is zero. Therefore the corresponding original pivot columns are also independent.</p>
    <div class="definition">
      <strong>Conclusion.</strong> The pivot columns of the original matrix are independent and span the original column space. Hence they form a basis for \(C(A)\).
    </div>

    <h4>Why the reduced pivot columns are not the answer</h4>
    <p>Although \(R=EA\), the column spaces are related by</p>
    <p>\[
    C(R)=E\,C(A),
    \]</p>
    <p>not usually by equality. The invertible map \(E\) can rotate, shear, scale, or reflect the entire column space inside \(\mathbb{R}^m\). Therefore reduced columns describe the transformed column space, while original pivot columns describe \(C(A)\) itself.</p>
    `
  );

  const practiceMarker = "<h3>B12. Practice set with answers</h3>";
  if (entry.html.includes(practiceMarker) && !entry.html.includes("Why is an elementary matrix invertible?")) {
    entry.html = entry.html.replace(
      practiceMarker,
      String.raw`
    <h3>B12. Additional practice on matrix pictures and reversible elimination</h3>
    <ol>
      <li>Write \(A=\begin{bmatrix}1&4\\2&3\end{bmatrix}\) explicitly as a matrix of columns \(a_1,a_2\), and express \(Ax\) as a column combination.<details><summary>Answer</summary><p>\(a_1=(1,2)^\top\), \(a_2=(4,3)^\top\), and \(Ax=x_1a_1+x_2a_2\).</p></details></li>
      <li>Why is an elementary matrix invertible?<details><summary>Answer</summary><p>It represents one reversible row operation. A row swap is undone by the same swap; scaling by \(c\ne0\) is undone by scaling by \(1/c\); adding \(k\) times one row to another is undone by adding \(-k\) times that row.</p></details></li>
      <li>Find the inverse of \(E=\begin{bmatrix}1&0\\5&1\end{bmatrix}\).<details><summary>Answer</summary><p>\(E\) performs \(R_2\leftarrow R_2+5R_1\). The inverse performs \(R_2\leftarrow R_2-5R_1\), so \(E^{-1}=\begin{bmatrix}1&0\\-5&1\end{bmatrix}\).</p></details></li>
      <li>If \(R=EA\) and \(r_3=2r_1-r_2\) for columns of \(R\), prove the same coefficient relation for the corresponding columns of \(A\).<details><summary>Answer</summary><p>Write \(Ea_3=2Ea_1-Ea_2\). Multiplying by \(E^{-1}\) gives \(a_3=2a_1-a_2\).</p></details></li>
    </ol>

    ${practiceMarker}`
    );
  }
})();