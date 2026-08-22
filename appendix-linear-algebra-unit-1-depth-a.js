(() => {
  const entry = window.MATH_APPENDIX?.find(item => item.slug === "applied-linear-algebra-unit-1");
  if (!entry) return;
  const marker = "<h2>Unit I recap</h2>";
  const extra = String.raw`
    <hr>
    <h2>Deep Dive A: Linear systems, elimination, inverses, and LU</h2>
    <p>This section develops the main results in more detail. The goal is not only to use the algorithms. The goal is to see why they work.</p>

    <h3>A1. Two geometries of \(Ax=b\)</h3>
    <p>For a matrix \(A\in\mathbb{R}^{m\times n}\), the equation \(Ax=b\) has two useful geometric interpretations.</p>
    <p><strong>Row picture.</strong> Each row gives one linear equation in the unknown coordinates of \(x\). In two variables, each nonzero equation is a line. In three variables, each nonzero equation is a plane. A solution is a common intersection.</p>
    <p><strong>Column picture.</strong> If \(A=[a_1\;a_2\;\cdots\;a_n]\) and \(x=(x_1,\ldots,x_n)^\top\), then</p>
    <p>\[Ax=x_1a_1+x_2a_2+\cdots+x_na_n.\]</p>
    <p>Therefore \(Ax=b\) asks whether \(b\) can be built from the columns of \(A\). This gives the solvability criterion</p>
    <p>\[Ax=b\text{ is solvable}\quad\Longleftrightarrow\quad b\in C(A).\]</p>
    <div class="mini-example"><strong>Example.</strong> Let \(A=\begin{bmatrix}1&2\\1&1\end{bmatrix}\) and \(b=(5,3)^\top\). The column picture asks for \(x_1(1,1)^\top+x_2(2,1)^\top=(5,3)^\top\). Solving gives \(x_1=1,x_2=2\).</div>

    <h3>A2. Why row operations preserve the solution set</h3>
    <p>Gaussian elimination uses three elementary row operations: swap rows, multiply a row by a nonzero scalar, and add a multiple of one row to another.</p>
    <p>Each operation replaces the system by an equivalent system. For example, if equations \(E_1\) and \(E_2\) are both true, then \(E_2-cE_1\) is also true. Conversely, from \(E_1\) and \(E_2-cE_1\), we can reconstruct \(E_2\). Thus no solutions are lost and no new solutions are introduced.</p>
    <p>Every elementary row operation is multiplication by an invertible elementary matrix \(E\). Thus</p>
    <p>\[Ax=b\quad\Longleftrightarrow\quad EAx=Eb.\]</p>
    <p>Because \(E\) is invertible, multiplying the transformed equation by \(E^{-1}\) returns the original system.</p>

    <h3>A3. A full elimination example with three unknowns</h3>
    <p>Consider</p>
    <p>\[\begin{aligned}x+2y+z&=4,\\2x+5y+3z&=9,\\3x+8y+5z&=14.\end{aligned}\]</p>
    <p>The augmented matrix is</p>
    <p>\[\left[\begin{array}{ccc|c}1&2&1&4\\2&5&3&9\\3&8&5&14\end{array}\right].\]</p>
    <p>Apply \(R_2\leftarrow R_2-2R_1\) and \(R_3\leftarrow R_3-3R_1\):</p>
    <p>\[\left[\begin{array}{ccc|c}1&2&1&4\\0&1&1&1\\0&2&2&2\end{array}\right].\]</p>
    <p>Then \(R_3\leftarrow R_3-2R_2\):</p>
    <p>\[\left[\begin{array}{ccc|c}1&2&1&4\\0&1&1&1\\0&0&0&0\end{array}\right].\]</p>
    <p>The third row contributes no new constraint. Let the free variable be \(z=t\). Then \(y=1-t\), and the first equation gives \(x=2+t\). Therefore</p>
    <p>\[x=\begin{bmatrix}2\\1\\0\end{bmatrix}+t\begin{bmatrix}1\\-1\\1\end{bmatrix}.\]</p>
    <p>This example shows the general pattern: one particular solution plus any nullspace vector.</p>

    <h3>A4. Pivot positions, rank, and information</h3>
    <p>A pivot identifies a genuinely new constraint or direction. The number of pivots is the rank \(r\).</p>
    <p>If \(A\) is \(m\times n\), then \(r\le\min(m,n)\). The rank counts both the number of independent columns and the number of independent rows.</p>
    <div class="definition"><strong>Rank theorem.</strong> The dimension of the column space equals the dimension of the row space. Both equal the number of pivots.</div>
    <p>A useful proof comes from row reduction. Row operations preserve linear dependencies among rows and preserve the dimension of the row space. In reduced row echelon form, the nonzero rows are independent and their number is exactly the number of pivots. The same pivot positions identify the pivot columns of the original matrix, which are independent and span the column space.</p>

    <h3>A5. Why an inverse exists exactly when every column is a pivot column</h3>
    <p>For a square \(n\times n\) matrix, the following statements are equivalent:</p>
    <ul><li>\(A\) is invertible.</li><li>\(Ax=0\) has only the zero solution.</li><li>The columns are linearly independent.</li><li>The columns span \(\mathbb{R}^n\).</li><li>\(\operatorname{rank}(A)=n\).</li><li>Every row and every column contains a pivot after elimination.</li></ul>
    <p><strong>Proof chain.</strong> If \(A\) is invertible and \(Ax=0\), then \(x=A^{-1}0=0\), so the nullspace is trivial. A trivial nullspace means the columns are independent because \(Ax=0\) is exactly the equation for a linear dependence among columns. For \(n\) independent vectors in \(\mathbb{R}^n\), independence implies they form a basis and therefore span the space. Spanning means \(Ax=b\) is solvable for every \(b\). The map is then one-to-one and onto, so the inverse transformation exists.</p>

    <h3>A6. Matrix multiplication as composition</h3>
    <p>Suppose \(B:\mathbb{R}^p\to\mathbb{R}^n\) and \(A:\mathbb{R}^n\to\mathbb{R}^m\). Then the composition \(A\circ B\) is represented by \(AB\).</p>
    <p>Why? For every input \(x\), first compute \(Bx\), then compute \(A(Bx)\). Associativity gives</p>
    <p>\[A(Bx)=(AB)x.\]</p>
    <p>This is also why matrix multiplication is generally not commutative. The order of transformations matters.</p>

    <h3>A7. Deriving LU from elimination</h3>
    <p>Take</p>
    <p>\[A=\begin{bmatrix}2&1\\6&5\end{bmatrix}.\]</p>
    <p>To eliminate the \(6\), subtract \(3\) times row 1 from row 2. The multiplier is \(\ell_{21}=3\). The result is</p>
    <p>\[U=\begin{bmatrix}2&1\\0&2\end{bmatrix}.\]</p>
    <p>Store the multiplier in</p>
    <p>\[L=\begin{bmatrix}1&0\\3&1\end{bmatrix}.\]</p>
    <p>Then</p>
    <p>\[LU=\begin{bmatrix}1&0\\3&1\end{bmatrix}\begin{bmatrix}2&1\\0&2\end{bmatrix}=\begin{bmatrix}2&1\\6&5\end{bmatrix}=A.\]</p>
    <p>Thus elimination does not merely solve one system. It factors the matrix into a lower-triangular record of elimination and an upper-triangular result.</p>

    <h3>A8. Solving with LU</h3>
    <p>Suppose \(Ax=b\) and \(A=LU\). Then</p>
    <p>\[LUx=b.\]</p>
    <p>Introduce \(y=Ux\). First solve the lower-triangular system \(Ly=b\), then solve \(Ux=y\). For the matrix above and \(b=(5,17)^\top\):</p>
    <p>\[\begin{bmatrix}1&0\\3&1\end{bmatrix}\begin{bmatrix}y_1\\y_2\end{bmatrix}=\begin{bmatrix}5\\17\end{bmatrix}\Rightarrow y=(5,2)^\top.\]</p>
    <p>Then</p>
    <p>\[\begin{bmatrix}2&1\\0&2\end{bmatrix}x=\begin{bmatrix}5\\2\end{bmatrix}\Rightarrow x=(2,1)^\top.\]</p>
    <div class="paper-connection"><strong>Applied point.</strong> If many right-hand sides use the same \(A\), factor once and solve cheaply many times. This is common in simulation, optimization, Kalman filtering, and numerical PDEs.</div>

    <h3>A9. Why pivoting gives \(PA=LU\)</h3>
    <p>If a pivot is zero or dangerously small, numerical algorithms swap rows. A permutation matrix \(P\) records those swaps. The stable factorization is usually</p>
    <p>\[PA=LU.\]</p>
    <p>This is not a cosmetic detail. Dividing by a tiny pivot can magnify rounding errors. Partial pivoting chooses a larger available pivot in the current column.</p>

    <h3>A10. Proof that homogeneous solution sets are subspaces</h3>
    <p>Let \(N(A)=\{x:Ax=0\}\). To prove that this is a subspace, check the subspace rules.</p>
    <ol><li>The zero vector belongs because \(A0=0\).</li><li>If \(Ax=0\) and \(Ay=0\), then \(A(x+y)=Ax+Ay=0\).</li><li>If \(Ax=0\), then for any scalar \(c\), \(A(cx)=cAx=0\).</li></ol>
    <p>Therefore \(N(A)\) is closed under vector addition and scalar multiplication.</p>

    <h3>A11. Why nonhomogeneous solution sets are usually not subspaces</h3>
    <p>If \(b\ne0\), the set \(\{x:Ax=b\}\) usually does not contain the zero vector because \(A0=0\ne b\). Thus it is not a subspace. Instead it is an affine translate of the nullspace:</p>
    <p>\[\{x:Ax=b\}=x_p+N(A).\]</p>
    <p>This distinction is important in optimization: feasible sets defined by homogeneous equalities are subspaces, while general equality constraints often define affine spaces.</p>
  `;
  if (!entry.html.includes("Deep Dive A: Linear systems")) entry.html = entry.html.replace(marker, extra + "\n" + marker);
})();