window.MATH_APPENDIX.push({
  slug: "applied-linear-algebra-unit-1",
  title: "Applied Linear Algebra · Unit I: Ax = b and the Four Subspaces",
  shortTitle: "Applied Linear Algebra · Unit I",
  summary: "A compact undergraduate-level bridge from linear systems and elimination to bases, rank, the four fundamental subspaces, and graph incidence matrices.",
  relatedLesson: {
    label: "Stage 1 · Days 1–4",
    section: "Linear algebra foundations",
    href: "#/lesson/day-02-vectors-matrices-and-tensors"
  },
  tags: ["Linear algebra", "Ax = b", "Subspaces", "Rank", "Graphs"],
  html: String.raw`
    <div class="definition"><strong>How to use this appendix.</strong> This unit is the deeper undergraduate layer behind Stage 1. Read it when the daily lessons use a fact about linear systems, bases, rank, or null spaces and you want the full applied-linear-algebra picture.</div>

    <h2>1. The Geometry of Linear Equations</h2>
    <p>A linear equation such as \(x+2y=4\) describes a line in \(\mathbb{R}^2\). A system such as</p>
    <p>\[x+2y=4,\qquad 3x-y=5\]</p>
    <p>asks for the intersection of two lines. In three variables, one equation describes a plane and a system asks where several planes intersect.</p>
    <p>The matrix form is \(Ax=b\). The same problem has a second geometric view: the vector \(b\) must be a linear combination of the columns of \(A\). Thus solving \(Ax=b\) is also the question “Is \(b\) in the column space of \(A\), and with what coefficients?”</p>
    <div class="paper-connection"><strong>ML connection.</strong> Linear regression, least squares, normal equations, linear layers, and many inverse problems all begin from this geometry.</div>

    <h2>2. An Overview of Key Ideas</h2>
    <p>Most of elementary linear algebra is organized around four questions:</p>
    <ol><li>Can we solve \(Ax=b\)?</li><li>Is the solution unique?</li><li>What directions does \(A\) preserve, destroy, or combine?</li><li>What subspaces are created by its rows and columns?</li></ol>
    <p>Pivot positions answer many of these questions. They identify independent columns, free variables, rank, and the dimension of the null space.</p>

    <h2>3. Elimination with Matrices</h2>
    <p>Gaussian elimination uses row operations to convert a system to an easier one. For</p>
    <p>\[A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\qquad b=\begin{bmatrix}5\\11\end{bmatrix},\]</p>
    <p>subtract \(3\) times row 1 from row 2:</p>
    <p>\[\left[\begin{array}{cc|c}1&2&5\\3&4&11\end{array}\right]\to
       \left[\begin{array}{cc|c}1&2&5\\0&-2&-4\end{array}\right].\]</p>
    <p>Back substitution gives \(y=2\) and \(x=1\). Row operations preserve the solution set because they replace equations by equivalent equations.</p>

    <h2>4. Multiplication and Inverse Matrices</h2>
    <p>Matrix multiplication composes linear transformations. If \(B\) acts first and \(A\) acts second, the combined transformation is \(AB\).</p>
    <p>An inverse satisfies \(A^{-1}A=AA^{-1}=I\). When \(A\) is invertible,</p>
    <p>\[Ax=b\quad\Rightarrow\quad x=A^{-1}b.\]</p>
    <p>In numerical work, do not usually form \(A^{-1}\) explicitly. Solve the system using a factorization such as LU or QR.</p>

    <h2>5. Factorization into A = LU</h2>
    <p>Elimination can be recorded as a factorization</p>
    <p>\[A=LU,\]</p>
    <p>where \(L\) stores elimination multipliers and \(U\) is upper triangular. Then solving \(Ax=b\) becomes</p>
    <p>\[Ly=b,\qquad Ux=y.\]</p>
    <p>Both solves are fast because triangular systems are easy.</p>
    <div class="mini-example">If the same matrix \(A\) is used with many right-hand sides \(b\), compute LU once and reuse it. This pattern appears in repeated scientific and optimization solves.</div>

    <h2>6. Transposes, Permutations, Vector Spaces</h2>
    <p>The transpose exchanges rows and columns: \((A^\top)_{ij}=A_{ji}\). A permutation matrix reorders coordinates or rows. In practical LU factorization, row swaps often produce</p>
    <p>\[PA=LU.\]</p>
    <p>A vector space is a set closed under vector addition and scalar multiplication. Examples include \(\mathbb{R}^n\), all \(m\times n\) matrices, and the set of solutions of a homogeneous linear system.</p>

    <h2>7. Column Space and Nullspace</h2>
    <p>The column space is</p>
    <p>\[C(A)=\{Ax:x\in\mathbb{R}^n\}.\]</p>
    <p>It contains every possible output of the linear transformation. The nullspace is</p>
    <p>\[N(A)=\{x:Ax=0\}.\]</p>
    <p>It contains directions that the matrix completely removes.</p>
    <div class="paper-connection"><strong>ML connection.</strong> Null spaces explain parameter non-identifiability. If \(Az=0\), then \(A(x+z)=Ax\); different parameter vectors can produce the same output.</div>

    <h2>8. Solving Ax = 0: Pivot Variables and Special Solutions</h2>
    <p>For a row-reduced system, pivot variables depend on free variables. Each free variable generates one special nullspace solution.</p>
    <p>Example:</p>
    <p>\[A=\begin{bmatrix}1&2&3\\0&1&1\end{bmatrix}.\]</p>
    <p>The equations are \(x_1+2x_2+3x_3=0\) and \(x_2+x_3=0\). Let \(x_3=t\). Then \(x_2=-t\), \(x_1=-t\), so</p>
    <p>\[x=t\begin{bmatrix}-1\\-1\\1\end{bmatrix}.\]</p>
    <p>That vector is a basis for \(N(A)\).</p>

    <h2>9. Solving Ax = b: Row Reduced Form R</h2>
    <p>The reduced row echelon form \(R\) exposes the structure of all solutions. A system can have:</p>
    <ul><li>no solution, when a contradictory row appears;</li><li>one solution, when every variable is a pivot variable;</li><li>infinitely many solutions, when free variables remain.</li></ul>
    <p>When a solution exists, the complete solution is</p>
    <p>\[x=x_p+x_n,\qquad x_n\in N(A),\]</p>
    <p>where \(x_p\) is one particular solution.</p>

    <h2>10. Independence, Basis and Dimension</h2>
    <p>Vectors \(v_1,\ldots,v_k\) are linearly independent if</p>
    <p>\[c_1v_1+\cdots+c_kv_k=0\]</p>
    <p>implies \(c_1=\cdots=c_k=0\). A basis is an independent set that spans the space. The number of basis vectors is the dimension.</p>
    <p>Pivot columns of the original matrix form a basis for the column space. Special nullspace solutions form a basis for the nullspace.</p>

    <h2>11. The Four Fundamental Subspaces</h2>
    <p>For \(A\in\mathbb{R}^{m\times n}\), the four fundamental subspaces are:</p>
    <table><thead><tr><th>Subspace</th><th>Lives in</th><th>Dimension</th></tr></thead><tbody>
      <tr><td>Column space \(C(A)\)</td><td>\(\mathbb{R}^m\)</td><td>\(r\)</td></tr>
      <tr><td>Row space \(C(A^\top)\)</td><td>\(\mathbb{R}^n\)</td><td>\(r\)</td></tr>
      <tr><td>Nullspace \(N(A)\)</td><td>\(\mathbb{R}^n\)</td><td>\(n-r\)</td></tr>
      <tr><td>Left nullspace \(N(A^\top)\)</td><td>\(\mathbb{R}^m\)</td><td>\(m-r\)</td></tr>
    </tbody></table>
    <p>The row space is orthogonal to \(N(A)\). The column space is orthogonal to \(N(A^\top)\).</p>
    <p>The rank-nullity theorem is</p>
    <p>\[\operatorname{rank}(A)+\operatorname{nullity}(A)=n.\]</p>

    <h2>12. Matrix Spaces; Rank 1; Small World Graphs</h2>
    <p>The set of all \(m\times n\) real matrices is itself a vector space of dimension \(mn\). Rank-one matrices have the form</p>
    <p>\[A=uv^\top.\]</p>
    <p>Every column is a multiple of \(u\), and every row is a multiple of \(v^\top\). Low-rank approximations build complicated matrices from sums of rank-one pieces.</p>
    <p>Networks with local edges plus a few long-range edges can have short graph distances, a pattern often called “small world.” Linear algebra studies such graphs through adjacency, incidence, and Laplacian matrices.</p>

    <h2>13. Graphs, Networks, Incidence Matrices</h2>
    <p>For a directed graph, an incidence matrix has one column per edge. A simple convention puts \(-1\) at the tail and \(+1\) at the head.</p>
    <p>For edges \(1\to2\) and \(2\to3\),</p>
    <p>\[B=\begin{bmatrix}-1&0\\1&-1\\0&1\end{bmatrix}.\]</p>
    <p>Then \(B^\top x\) computes differences across edges. The graph Laplacian can be written as</p>
    <p>\[L=BB^\top.\]</p>
    <div class="paper-connection"><strong>ML connection.</strong> Graph neural networks, spectral clustering, smoothness penalties, and message passing all depend on this matrix view of networks.</div>

    <h2>Unit I recap</h2>
    <p>The central object is \(Ax=b\). Elimination reveals pivots. Pivots reveal rank. Rank reveals the dimensions of the four subspaces. Those subspaces explain solvability, uniqueness, redundancy, and information loss. Graph incidence matrices show that the same ideas extend naturally from tables of numbers to networks.</p>
  `
});