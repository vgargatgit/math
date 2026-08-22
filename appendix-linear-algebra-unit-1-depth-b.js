(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-1");
  if (!entry) return;
  const marker = "<h2>Unit I recap</h2>";
  const extra = String.raw`
    <h2>Deep Dive B: Bases, four subspaces, rank-one structure, and graphs</h2>

    <h3>B1. Special solutions build the nullspace basis</h3>
    <p>Suppose a row-reduced system has two free variables. Set one free variable to \(1\) and the others to \(0\) to obtain one special solution. Repeat for each free variable. These special solutions form a basis for the nullspace.</p>
    <p>For example, let</p>
    <p>\[R=\begin{bmatrix}1&2&0&-1\\0&0&1&3\end{bmatrix}.\]</p>
    <p>Pivot variables are \(x_1,x_3\); free variables are \(x_2,x_4\). From \(Rx=0\),</p>
    <p>\[x_1=-2x_2+x_4,\qquad x_3=-3x_4.\]</p>
    <p>Thus</p>
    <p>\[x=x_2\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}+x_4\begin{bmatrix}1\\0\\-3\\1\end{bmatrix}.\]</p>
    <p>The two displayed vectors are a basis for \(N(A)\). Hence the nullity is \(2\).</p>

    <h3>B2. Rank-nullity theorem with intuition and proof</h3>
    <div class="definition"><strong>Rank-nullity.</strong> For \(A\in\mathbb{R}^{m\times n}\), \(\operatorname{rank}(A)+\operatorname{nullity}(A)=n\).</div>
    <p>After row reduction, every one of the \(n\) variables is either a pivot variable or a free variable. The number of pivot variables is the rank \(r\). The number of free variables is \(n-r\), and each free variable produces one independent nullspace direction. Therefore</p>
    <p>\[\dim N(A)=n-r.\]</p>
    <p>This theorem measures information loss. An input space has \(n\) independent directions. The transformation preserves \(r\) independent output directions and destroys \(n-r\) input directions.</p>

    <h3>B3. Why pivot columns of the original matrix form a column-space basis</h3>
    <p>Row reduction changes the actual columns, so do not use the pivot columns of the reduced matrix as a basis for \(C(A)\). Instead, use the pivot <em>positions</em> found in the reduced matrix to select columns from the original matrix.</p>
    <p>Why does this work? Elimination identifies which columns depend on earlier columns. The same dependence coefficients hold among the original columns because row operations multiply all columns by the same invertible matrix.</p>
    <div class="mini-example">If columns 1 and 3 are pivot columns, then columns \(a_1,a_3\) of the original matrix form a basis for \(C(A)\), even though the reduced columns may look much simpler.</div>

    <h3>B4. The four fundamental subspaces as two orthogonal decompositions</h3>
    <p>For \(A\in\mathbb{R}^{m\times n}\), the domain \(\mathbb{R}^n\) decomposes as</p>
    <p>\[\mathbb{R}^n=C(A^\top)\oplus N(A),\]</p>
    <p>and the codomain \(\mathbb{R}^m\) decomposes as</p>
    <p>\[\mathbb{R}^m=C(A)\oplus N(A^\top).\]</p>
    <p>The symbol \(\oplus\) means an orthogonal direct sum here: every vector has one component in each subspace, and the components are perpendicular.</p>

    <h3>B5. Proof that the row space is orthogonal to the nullspace</h3>
    <p>Let \(x\in N(A)\), so \(Ax=0\). Write the rows of \(A\) as \(r_1^\top,\ldots,r_m^\top\). Then</p>
    <p>\[Ax=\begin{bmatrix}r_1^\top x\\\vdots\\r_m^\top x\end{bmatrix}=0.\]</p>
    <p>Thus \(r_i^\top x=0\) for every row. So \(x\) is orthogonal to every row and therefore to every vector in the row space. Hence</p>
    <p>\[N(A)=C(A^\top)^\perp.\]</p>
    <p>Applying the same argument to \(A^\top\) gives \(N(A^\top)=C(A)^\perp\).</p>

    <h3>B6. Fundamental theorem of linear algebra through one matrix</h3>
    <p>Consider</p>
    <p>\[A=\begin{bmatrix}1&2&3\\2&4&6\end{bmatrix}.\]</p>
    <p>The second row is twice the first, so \(r=1\). The column space is the line spanned by \((1,2)^\top\). The row space is the line spanned by \((1,2,3)^\top\).</p>
    <p>The nullspace has dimension \(3-1=2\). Solving \(x_1+2x_2+3x_3=0\) gives basis vectors</p>
    <p>\[(-2,1,0)^\top,\qquad(-3,0,1)^\top.\]</p>
    <p>The left nullspace has dimension \(2-1=1\). Solving \(A^\top y=0\) gives basis \((-2,1)^\top\). Notice that this vector is orthogonal to \((1,2)^\top\), the column-space direction.</p>

    <h3>B7. Matrix spaces and dimension counting</h3>
    <p>The set \(\mathbb{R}^{m\times n}\) is a vector space. A convenient basis is the set of matrices \(E_{ij}\) that contain a single \(1\) in position \((i,j)\) and zeros elsewhere. There are \(mn\) such matrices, so</p>
    <p>\[\dim \mathbb{R}^{m\times n}=mn.\]</p>
    <p>The symmetric \(n\times n\) matrices form a subspace of dimension \(n(n+1)/2\), because the diagonal contributes \(n\) free entries and the upper triangle contributes \(n(n-1)/2\).</p>

    <h3>B8. Rank-one matrices as outer products</h3>
    <p>A nonzero rank-one matrix can be written as</p>
    <p>\[A=uv^\top.\]</p>
    <p>For any vector \(x\),</p>
    <p>\[Ax=u(v^\top x).\]</p>
    <p>The dot product \(v^\top x\) reduces the input to one scalar. The matrix then outputs that scalar times \(u\). Thus every output lies on the one-dimensional line spanned by \(u\), which proves that the rank is at most one.</p>
    <p>Example:</p>
    <p>\[u=\begin{bmatrix}1\\2\end{bmatrix},\quad v=\begin{bmatrix}3\\-1\\4\end{bmatrix}\Rightarrow uv^\top=\begin{bmatrix}3&-1&4\\6&-2&8\end{bmatrix}.\]</p>
    <p>The second row is twice the first, and every column is a multiple of \(u\).</p>
    <div class="paper-connection"><strong>ML connection.</strong> Low-rank models approximate a large matrix as a sum of a few rank-one outer products. This is the algebra behind SVD truncation and many parameter-efficient approximations.</div>

    <h3>B9. Incidence matrices from graph orientation</h3>
    <p>Take a graph with vertices \(1,2,3,4\) and directed edges \(1\to2\), \(2\to3\), \(2\to4\). One incidence convention gives</p>
    <p>\[B=\begin{bmatrix}-1&0&0\\1&-1&-1\\0&1&0\\0&0&1\end{bmatrix}.\]</p>
    <p>If \(x\in\mathbb{R}^4\) assigns one scalar value to each vertex, then</p>
    <p>\[B^\top x=\begin{bmatrix}x_2-x_1\\x_3-x_2\\x_4-x_2\end{bmatrix}.\]</p>
    <p>So the transpose of the incidence matrix computes edge differences.</p>

    <h3>B10. Why the graph Laplacian is positive semidefinite</h3>
    <p>Define the graph Laplacian as \(L=BB^\top\). Then for every \(x\),</p>
    <p>\[x^\top Lx=x^\top BB^\top x=\|B^\top x\|_2^2\ge0.\]</p>
    <p>Therefore \(L\) is positive semidefinite. Moreover,</p>
    <p>\[x^\top Lx=\sum_{(i,j)\in E}(x_i-x_j)^2.\]</p>
    <p>This quantity is small when connected vertices have similar values. That is why Laplacian penalties measure graph smoothness.</p>

    <h3>B11. Why connected components appear in the nullspace of the Laplacian</h3>
    <p>If \(x\) is constant on every vertex of a connected graph, then every edge difference is zero, so \(B^\top x=0\) and \(Lx=0\). The all-ones vector is therefore in \(N(L)\).</p>
    <p>More generally, if the graph has \(k\) connected components, there are \(k\) independent vectors that are constant on one component and zero on the others. Thus</p>
    <p>\[\dim N(L)=k.\]</p>
    <p>This is a beautiful example of algebra encoding topology.</p>

    <h3>B12. Practice set with answers</h3>
    <ol>
      <li>For a \(4\times7\) matrix of rank \(3\), find the dimensions of all four fundamental subspaces.<details><summary>Answer</summary><p>Column space: \(3\). Row space: \(3\). Nullspace: \(7-3=4\). Left nullspace: \(4-3=1\).</p></details></li>
      <li>Why is \(x_p+N(A)\) the complete solution to \(Ax=b\)?<details><summary>Answer</summary><p>If \(Ax_p=b\) and \(Az=0\), then \(A(x_p+z)=b\). Conversely, if \(Ax=b\), then \(A(x-x_p)=0\), so \(x-x_p\in N(A)\).</p></details></li>
      <li>Show that \(uv^\top\) has rank one when \(u\ne0\) and \(v\ne0\).<details><summary>Answer</summary><p>Every output equals \(u(v^\top x)\), so the column space lies in \(\operatorname{span}(u)\). Because \(v\ne0\), some input produces a nonzero scalar, so the column space is exactly one-dimensional.</p></details></li>
      <li>If \(L=BB^\top\), prove that every eigenvalue of \(L\) is nonnegative.<details><summary>Answer</summary><p>For an eigenpair \(Lv=\lambda v\), \(\lambda\|v\|^2=v^\top Lv=\|B^\top v\|^2\ge0\). Therefore \(\lambda\ge0\).</p></details></li>
    </ol>
  `;
  if (!entry.html.includes("Deep Dive B: Bases")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();