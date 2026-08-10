const day3 = COURSE[0].lessons[2];

Object.assign(day3, {
  published: true,
  summary: "See vectors as directions in space. Learn span, basis, distance, similarity, projection, least squares, hyperplanes, and margin so that embedding and classifier equations become geometric objects instead of symbol strings.",
  explanation: "Linear algebra becomes much easier when you connect the symbols to geometry. A vector can represent a point, a direction, or both. A matrix can create new directions from old ones. Dot products measure alignment, norms measure size, projections keep one component, and hyperplanes divide space. These ideas appear directly in embeddings, regression, PCA, attention, and linear classifiers.",
  topics: [
    "Linear combinations",
    "Span",
    "Linear independence",
    "Basis and coordinates",
    "Vector spaces and subspaces",
    "Column, row, and null spaces",
    "L1, L2, and L-infinity norms",
    "Distance and similarity",
    "Dot product as alignment",
    "Angles",
    "Cosine similarity",
    "Orthogonality",
    "Orthonormal bases",
    "Projection",
    "Gram matrices",
    "Least squares",
    "Linear-regression geometry",
    "Hyperplanes",
    "Margin intuition"
  ],
  sections: [
    {
      id: "geometry-first",
      title: "1. Read a vector as a direction and a location",
      html: raw`
        <p>In Day 2, a vector was an ordered list of numbers. That view is correct, but it is incomplete. A vector can also be a <strong>direction</strong> in space. This geometric view is useful because many machine-learning equations are really statements about direction, distance, and projection.</p>
        <p>Consider the vector</p>
        <p>\[x=\begin{bmatrix}3\\4\end{bmatrix}.\]</p>
        <p>You can read it as the point \((3,4)\). You can also read it as an arrow that starts at the origin and ends at \((3,4)\). Its Euclidean length is</p>
        <p>\[\|x\|_2=\sqrt{3^2+4^2}=5.\]</p>
        <p>The entries tell you the coordinates. The norm tells you the size. The direction tells you how the vector points relative to other vectors.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> An embedding vector can represent a word, image, user, product, or state. Two embeddings can be close in Euclidean distance or point in similar directions. Many retrieval systems use this geometry directly.
        </div>
        <div class="shape-check">
          <strong>Reading rule.</strong> When a paper compares vectors, ask three questions: What is their shape? Does the comparison depend on length, direction, or both? What operation measures that relationship?
        </div>
      `
    },
    {
      id: "linear-combinations",
      title: "2. Linear combinations build new vectors from old vectors",
      html: raw`
        <p>A <strong>linear combination</strong> multiplies vectors by scalars and then adds the results. For vectors \(v_1,\ldots,v_k\), a linear combination has the form</p>
        <p>\[c_1v_1+c_2v_2+\cdots+c_kv_k.\]</p>
        <p>The numbers \(c_1,\ldots,c_k\) are coefficients.</p>
        <p>Let</p>
        <p>\[v_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad v_2=\begin{bmatrix}0\\1\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[3v_1-2v_2=\begin{bmatrix}3\\-2\end{bmatrix}.\]</p>
        <p>So the vector \((3,-2)^\top\) is made from the two coordinate directions.</p>
        <p>A matrix-vector product is itself a linear combination. If</p>
        <p>\[A=\begin{bmatrix}|&|\\a_1&a_2\\|&|\end{bmatrix},\qquad c=\begin{bmatrix}c_1\\c_2\end{bmatrix},\]</p>
        <p>then</p>
        <p>\[Ac=c_1a_1+c_2a_2.\]</p>
        <p>This interpretation is important. Multiplying a matrix by a vector chooses a weighted combination of the matrix columns.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> A dense layer forms weighted combinations of input features. Attention forms weighted combinations of value vectors. PCA reconstructs data with weighted combinations of principal directions.
        </div>
      `
    },
    {
      id: "span",
      title: "3. Span is the set of all vectors you can build",
      html: raw`
        <p>The <strong>span</strong> of vectors is the set of all their possible linear combinations.</p>
        <p>For vectors \(v_1\) and \(v_2\),</p>
        <p>\[\operatorname{span}(v_1,v_2)=\{c_1v_1+c_2v_2:c_1,c_2\in\mathbb{R}\}.\]</p>
        <p>If</p>
        <p>\[v_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad v_2=\begin{bmatrix}0\\1\end{bmatrix},\]</p>
        <p>their span is all of \(\mathbb{R}^2\), because every vector \((a,b)^\top\) equals \(av_1+bv_2\).</p>
        <p>Now use</p>
        <p>\[u_1=\begin{bmatrix}1\\2\end{bmatrix},\qquad u_2=\begin{bmatrix}2\\4\end{bmatrix}.\]</p>
        <p>The second vector is \(2u_1\). Both vectors point along the same line. Their span is only that line, not the full plane.</p>
        <div class="definition">
          Span answers this question: <strong>Which directions are reachable by combining these vectors?</strong>
        </div>
        <div class="paper-connection">
          <strong>Paper connection.</strong> When a representation is restricted to a low-dimensional subspace, the model can only express directions inside that span. Low-rank approximation uses this idea directly.
        </div>
      `
    },
    {
      id: "independence",
      title: "4. Linear independence tells you whether a direction is redundant",
      html: raw`
        <p>Vectors are <strong>linearly independent</strong> when no vector in the group can be built from the others.</p>
        <p>An equivalent definition is:</p>
        <p>\[c_1v_1+\cdots+c_kv_k=0\]</p>
        <p>has only the solution</p>
        <p>\[c_1=\cdots=c_k=0.\]</p>
        <p>For</p>
        <p>\[e_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad e_2=\begin{bmatrix}0\\1\end{bmatrix},\]</p>
        <p>the vectors are independent. Neither direction can be created from the other.</p>
        <p>For</p>
        <p>\[u_1=\begin{bmatrix}1\\2\end{bmatrix},\qquad u_2=\begin{bmatrix}2\\4\end{bmatrix},\]</p>
        <p>we have \(u_2=2u_1\). Therefore, they are dependent.</p>
        <p>Dependence means that at least one direction is redundant. Adding the redundant vector does not enlarge the span.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Highly redundant features can create poorly conditioned regression problems. Matrix rank measures how many independent directions remain after such redundancy is considered.
        </div>
      `
    },
    {
      id: "basis-coordinates",
      title: "5. A basis gives the minimum independent directions needed to describe a space",
      html: raw`
        <p>A <strong>basis</strong> for a vector space is a set of vectors that satisfies two conditions:</p>
        <ol>
          <li>The vectors are linearly independent.</li>
          <li>The vectors span the whole space.</li>
        </ol>
        <p>The standard basis for \(\mathbb{R}^2\) is</p>
        <p>\[e_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad e_2=\begin{bmatrix}0\\1\end{bmatrix}.\]</p>
        <p>The vector</p>
        <p>\[x=\begin{bmatrix}3\\-2\end{bmatrix}\]</p>
        <p>has coordinates \((3,-2)\) in that basis because \(x=3e_1-2e_2\).</p>
        <p>But the same geometric vector can have different coordinates in another basis. Suppose</p>
        <p>\[b_1=\begin{bmatrix}1\\1\end{bmatrix},\qquad b_2=\begin{bmatrix}1\\-1\end{bmatrix}.\]</p>
        <p>To express \(x=(3,-1)^\top\), solve</p>
        <p>\[x=c_1b_1+c_2b_2.\]</p>
        <p>This gives \(c_1=1\) and \(c_2=2\), so the coordinates in the new basis are \((1,2)\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> PCA changes coordinates to a basis aligned with major data variation. Fourier methods change to a frequency basis. Learned representations can also be viewed as coordinate systems that make useful structure easier to express.
        </div>
      `
    },
    {
      id: "spaces-subspaces",
      title: "6. Vector spaces and subspaces describe closed families of vectors",
      html: raw`
        <p>A <strong>vector space</strong> is a collection of vectors that stays inside the collection when you add vectors or multiply them by scalars. For this course, the most important examples are \(\mathbb{R}^d\) and subspaces inside it.</p>
        <p>A <strong>subspace</strong> is a smaller vector space inside a larger one. A subset \(S\subseteq\mathbb{R}^d\) is a subspace when it contains the zero vector and is closed under linear combinations.</p>
        <p>The line</p>
        <p>\[S=\left\{t\begin{bmatrix}1\\2\end{bmatrix}:t\in\mathbb{R}\right\}\]</p>
        <p>is a subspace of \(\mathbb{R}^2\). It passes through the origin and stays closed under addition and scalar multiplication.</p>
        <p>The line \(y=2x+1\) is <em>not</em> a subspace because it does not contain the zero vector.</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> A geometric line or plane is not automatically a subspace. A subspace must pass through the origin.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> PCA finds a low-dimensional subspace. Low-rank matrix models restrict information to smaller subspaces. Null spaces describe directions that a linear map cannot see.
        </div>
      `
    },
    {
      id: "fundamental-spaces",
      title: "7. Column space, row space, and null space describe what a matrix can represent and what it loses",
      html: raw`
        <p>Let \(A\in\mathbb{R}^{m\times n}\).</p>
        <h3>Column space</h3>
        <p>The <strong>column space</strong> is the span of the columns of \(A\). It contains every possible output \(Ax\).</p>
        <p>If</p>
        <p>\[A=\begin{bmatrix}1&2\\2&4\end{bmatrix},\]</p>
        <p>the second column is twice the first. Therefore the column space is only the line spanned by \((1,2)^\top\).</p>
        <h3>Row space</h3>
        <p>The <strong>row space</strong> is the span of the rows. It describes the independent input directions that the matrix measures.</p>
        <h3>Null space</h3>
        <p>The <strong>null space</strong> is the set of inputs that map to zero:</p>
        <p>\[\mathcal{N}(A)=\{x:Ax=0\}.\]</p>
        <p>For the matrix above,</p>
        <p>\[x=\begin{bmatrix}-2\\1\end{bmatrix}\]</p>
        <p>is in the null space because</p>
        <p>\[A\begin{bmatrix}-2\\1\end{bmatrix}=\begin{bmatrix}0\\0\end{bmatrix}.\]</p>
        <p>This direction is invisible to the transformation.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> If different inputs differ only by a null-space direction, a linear layer produces the same output for them. This is one way to think about information loss in a linear transformation.
        </div>
      `
    },
    {
      id: "norms-distance",
      title: "8. Norms measure size; distances compare locations",
      html: raw`
        <p>A norm assigns a nonnegative size to a vector. Three common norms are</p>
        <p>\[\|x\|_1=\sum_i|x_i|,\]</p>
        <p>\[\|x\|_2=\sqrt{\sum_i x_i^2},\]</p>
        <p>and</p>
        <p>\[\|x\|_\infty=\max_i|x_i|.\]</p>
        <p>For \(x=(3,-4,1)^\top\),</p>
        <p>\[\|x\|_1=8,\qquad \|x\|_2=\sqrt{26},\qquad \|x\|_\infty=4.\]</p>
        <p>A distance can be built from a norm. The Euclidean distance between \(x\) and \(y\) is</p>
        <p>\[d(x,y)=\|x-y\|_2.\]</p>
        <p>If \(x=(1,2)^\top\) and \(y=(4,6)^\top\), then</p>
        <p>\[x-y=(-3,-4)^\top,\qquad d(x,y)=5.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Nearest-neighbor methods use distance. Clustering uses distance to form groups. Regularization uses norms to control parameter size. Adversarial-robustness papers often constrain perturbations by an \(L_p\) norm.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Two vectors can point in the same direction but have large Euclidean distance if one has much larger magnitude. Distance and directional similarity are different ideas.
        </div>
      `
    },
    {
      id: "dot-angle-cosine",
      title: "9. Dot product, angle, and cosine similarity measure alignment",
      html: raw`
        <p>For vectors \(x,y\in\mathbb{R}^d\), the dot product is</p>
        <p>\[x^\top y=\sum_{i=1}^{d}x_i y_i.\]</p>
        <p>It also has a geometric form:</p>
        <p>\[x^\top y=\|x\|_2\|y\|_2\cos\theta,\]</p>
        <p>where \(\theta\) is the angle between the vectors.</p>
        <p>This formula explains three cases:</p>
        <ul>
          <li>If the vectors point in similar directions, the dot product is positive.</li>
          <li>If they are perpendicular, the dot product is zero.</li>
          <li>If they point in opposite directions, the dot product is negative.</li>
        </ul>
        <p><strong>Cosine similarity</strong> removes the effect of magnitude:</p>
        <p>\[\operatorname{cos}(x,y)=\frac{x^\top y}{\|x\|_2\|y\|_2}.\]</p>
        <p>For \(x=(1,0)^\top\) and \(y=(1,1)^\top\),</p>
        <p>\[x^\top y=1,\quad \|x\|_2=1,\quad \|y\|_2=\sqrt2,\]</p>
        <p>so</p>
        <p>\[\operatorname{cos}(x,y)=\frac{1}{\sqrt2}\approx0.707.\]</p>
        <div class="paper-connection">
          <strong>Embedding connection.</strong> Semantic-search systems often compare normalized embedding vectors with cosine similarity. When vectors are normalized to unit length, cosine similarity becomes the dot product.
        </div>
      `
    },
    {
      id: "orthogonality",
      title: "10. Orthogonality and orthonormal bases simplify geometry",
      html: raw`
        <p>Two vectors are <strong>orthogonal</strong> when their dot product is zero:</p>
        <p>\[x^\top y=0.\]</p>
        <p>For</p>
        <p>\[x=\begin{bmatrix}1\\1\end{bmatrix},\qquad y=\begin{bmatrix}1\\-1\end{bmatrix},\]</p>
        <p>we get \(x^\top y=1-1=0\). The vectors are perpendicular.</p>
        <p>A set of vectors is <strong>orthonormal</strong> when the vectors are mutually orthogonal and each vector has unit norm.</p>
        <p>If columns of \(Q\) are orthonormal, then</p>
        <p>\[Q^\top Q=I.\]</p>
        <p>This identity makes many calculations simpler. Coordinates in an orthonormal basis can be found with dot products instead of solving a full linear system.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> PCA uses orthonormal principal directions. QR decomposition produces orthonormal bases. Orthogonal weight initialization can help preserve vector lengths better than arbitrary correlated directions.
        </div>
      `
    },
    {
      id: "projection",
      title: "11. Projection keeps the component that points along a chosen direction",
      html: raw`
        <p>Suppose you want the part of vector \(x\) that lies along a nonzero vector \(u\). The projection is</p>
        <p>\[\operatorname{proj}_u(x)=\frac{x^\top u}{u^\top u}u.\]</p>
        <p>If \(u\) is a unit vector, then \(u^\top u=1\) and the formula becomes</p>
        <p>\[\operatorname{proj}_u(x)=(x^\top u)u.\]</p>
        <p>Let</p>
        <p>\[x=\begin{bmatrix}3\\2\end{bmatrix},\qquad u=\begin{bmatrix}1\\0\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[x^\top u=3,\qquad \operatorname{proj}_u(x)=\begin{bmatrix}3\\0\end{bmatrix}.\]</p>
        <p>The residual is</p>
        <p>\[r=x-\operatorname{proj}_u(x)=\begin{bmatrix}0\\2\end{bmatrix}.\]</p>
        <p>The residual is orthogonal to \(u\).</p>
        <div class="paper-connection">
          <strong>PCA connection.</strong> Projecting a data point onto principal directions keeps the components explained by those directions. Reconstruction adds those projected components back together.
        </div>
      `
    },
    {
      id: "gram",
      title: "12. A Gram matrix stores all pairwise dot products",
      html: raw`
        <p>Suppose the rows of \(X\in\mathbb{R}^{n\times d}\) are \(n\) vectors. The matrix</p>
        <p>\[G=XX^\top\in\mathbb{R}^{n\times n}\]</p>
        <p>is a <strong>Gram matrix</strong>. Entry \(G_{ij}\) is the dot product between row \(i\) and row \(j\).</p>
        <p>Let</p>
        <p>\[X=\begin{bmatrix}1&0\\1&1\\0&2\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[XX^\top=\begin{bmatrix}1&1&0\\1&2&2\\0&2&4\end{bmatrix}.\]</p>
        <p>The diagonal entries are squared norms. For example, the third row has squared norm \(0^2+2^2=4\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Similarity matrices, kernel matrices, and attention-score matrices all have a related pairwise-comparison structure. For self-attention, \(QK^\top\) stores one dot product for every query-key pair.
        </div>
        <div class="shape-check">
          <strong>Shape check.</strong> If \(X\) is \(n\times d\), then \(XX^\top\) is \(n\times n\), while \(X^\top X\) is \(d\times d\). They describe pairwise relationships across different axes.
        </div>
      `
    },
    {
      id: "least-squares",
      title: "13. Least squares is a projection problem",
      html: raw`
        <p>Consider a linear system</p>
        <p>\[Xw=y.\]</p>
        <p>If no exact \(w\) exists, we choose \(w\) that makes the residual small:</p>
        <p>\[w^*=\arg\min_w\|Xw-y\|_2^2.\]</p>
        <p>The vector \(Xw\) always lies in the column space of \(X\). Least squares chooses the point in that column space that is closest to \(y\).</p>
        <p>At the optimum, the residual</p>
        <p>\[r=y-Xw^*\]</p>
        <p>is orthogonal to every column of \(X\). Therefore</p>
        <p>\[X^\top r=0.\]</p>
        <p>Substitute \(r=y-Xw^*\):</p>
        <p>\[X^\top(y-Xw^*)=0.\]</p>
        <p>This gives the normal equations</p>
        <p>\[X^\top Xw^*=X^\top y.\]</p>
        <p>If \(X^\top X\) is invertible, then</p>
        <p>\[w^*=(X^\top X)^{-1}X^\top y.\]</p>
        <div class="paper-connection">
          <strong>Regression connection.</strong> Ordinary linear regression is least squares. Geometrically, the fitted predictions are the projection of the target vector onto the column space generated by the model features.
        </div>
        <div class="shape-check">
          <strong>Numerical note.</strong> In real software, do not usually compute the inverse explicitly. QR, SVD, or a linear solver is often more stable.
        </div>
      `
    },
    {
      id: "hyperplanes",
      title: "14. Hyperplanes divide space with one linear equation",
      html: raw`
        <p>A <strong>hyperplane</strong> in \(\mathbb{R}^d\) is the set of points that satisfy</p>
        <p>\[w^\top x+b=0.\]</p>
        <p>The vector \(w\) is perpendicular to the hyperplane. It is called a normal vector.</p>
        <p>In two dimensions, a hyperplane is a line. In three dimensions, it is a plane. In higher dimensions, the same equation defines the corresponding flat boundary.</p>
        <p>Take</p>
        <p>\[w=\begin{bmatrix}1\\-1\end{bmatrix},\qquad b=0.\]</p>
        <p>The boundary is</p>
        <p>\[x_1-x_2=0,\]</p>
        <p>or \(x_1=x_2\).</p>
        <p>A point \(x=(3,1)^\top\) gives \(w^\top x=2>0\). A point \((1,3)^\top\) gives \(-2<0\). The sign tells you which side of the boundary contains the point.</p>
        <div class="paper-connection">
          <strong>Classifier connection.</strong> Logistic regression and linear SVMs use a score of the form \(w^\top x+b\). The equation \(w^\top x+b=0\) is the decision boundary.
        </div>
      `
    },
    {
      id: "margin",
      title: "15. Margin measures how far a point is from a decision boundary",
      html: raw`
        <p>For the hyperplane</p>
        <p>\[w^\top x+b=0,\]</p>
        <p>the signed distance of point \(x\) from the boundary is</p>
        <p>\[\frac{w^\top x+b}{\|w\|_2}.\]</p>
        <p>For a labeled example with \(y\in\{-1,+1\}\), a common signed margin is</p>
        <p>\[\frac{y(w^\top x+b)}{\|w\|_2}.\]</p>
        <p>A positive value means the point is on the correct side. A larger positive value means it is farther from the boundary.</p>
        <p>Suppose \(w=(1,0)^\top\), \(b=-2\), and \(x=(5,3)^\top\). Then the boundary is \(x_1=2\). Because \(\|w\|_2=1\), the signed distance is</p>
        <p>\[\frac{5-2}{1}=3.\]</p>
        <p>If the positive class is on the side \(x_1>2\), this point has margin 3.</p>
        <div class="paper-connection">
          <strong>SVM connection.</strong> A support-vector machine chooses a separating hyperplane while trying to make the smallest training margin large. This geometric goal leads to the maximum-margin formulation.
        </div>
      `
    },
    {
      id: "full-paper-read",
      title: "16. Read three common ML equations geometrically",
      html: raw`
        <h3>Embedding similarity</h3>
        <p>\[s(x,y)=\frac{x^\top y}{\|x\|_2\|y\|_2}.\]</p>
        <p>Read this as: normalize the effect of vector length and measure directional alignment. The result is cosine similarity.</p>

        <h3>Least-squares regression</h3>
        <p>\[w^*=\arg\min_w\|Xw-y\|_2^2.\]</p>
        <p>Read this as: choose weights so that the prediction vector \(Xw\), which must lie in the column space of \(X\), is as close as possible to the target vector \(y\).</p>

        <h3>Linear classification</h3>
        <p>\[\hat y=\operatorname{sign}(w^\top x+b).\]</p>
        <p>Read this as: project the input onto the normal direction \(w\), shift by \(b\), and use the sign to decide which side of the hyperplane contains the point.</p>
        <p>These equations look different, but they use the same small set of geometric ideas: direction, length, projection, subspace, and boundary.</p>
      `
    },
    {
      id: "mistakes",
      title: "17. Common mistakes and misleading notation",
      html: raw`
        <ul>
          <li><strong>Confusing span with a finite list.</strong> Span contains every linear combination, so it usually contains infinitely many vectors.</li>
          <li><strong>Confusing independence with orthogonality.</strong> Orthogonal nonzero vectors are independent, but independent vectors do not have to be orthogonal.</li>
          <li><strong>Assuming every line is a subspace.</strong> A subspace must contain the origin.</li>
          <li><strong>Confusing tensor rank with matrix rank.</strong> Tensor rank in software often means number of axes. Matrix rank means number of independent directions.</li>
          <li><strong>Using cosine similarity when magnitude matters.</strong> Cosine similarity discards overall scale.</li>
          <li><strong>Using Euclidean distance when only direction matters.</strong> Two vectors in the same direction can still be far apart.</li>
          <li><strong>Forgetting normalization in a margin formula.</strong> \(w^\top x+b\) is a score. Divide by \(\|w\|_2\) to obtain geometric distance.</li>
          <li><strong>Computing a matrix inverse because the formula shows one.</strong> Numerical implementations usually solve the system more safely.</li>
          <li><strong>Confusing \(XX^\top\) with \(X^\top X\).</strong> The first compares rows; the second compares columns.</li>
        </ul>
      `
    },
    {
      id: "recap",
      title: "18. Recap",
      html: raw`
        <p>A linear combination builds vectors from existing directions. Span describes all reachable combinations. Linear independence removes redundant directions. A basis is an independent spanning set that gives coordinates.</p>
        <p>Column space describes possible matrix outputs. Null space describes input directions that disappear. Norms measure size. Distance compares locations. Dot products and cosine similarity measure alignment. Orthogonality means zero dot product.</p>
        <p>Projection keeps the component along a direction or subspace. Least squares projects a target onto the column space of the design matrix. Hyperplanes divide space, and margin measures distance from a decision boundary.</p>
        <p>If you can look at an embedding similarity, least-squares objective, or linear classifier and describe the geometry in words, you have the main goal of Day 3.</p>
      `
    }
  ],
  examples: [
    ["Build a linear combination", raw`Let \(v_1=(1,0)^\top\) and \(v_2=(0,1)^\top\). Then \(4v_1-3v_2=(4,-3)^\top\). The coefficients are 4 and -3.`],
    ["Check whether a vector is in a span", raw`Let \(v=(1,2)^\top\). The vector \((3,6)^\top\) is in \(\operatorname{span}(v)\) because it equals \(3v\). The vector \((3,5)^\top\) is not in this one-dimensional span.`],
    ["Detect dependence", raw`For \(v_1=(1,2)^\top\) and \(v_2=(2,4)^\top\), we have \(2v_1-v_2=0\) with nonzero coefficients. Therefore the vectors are linearly dependent.`],
    ["Coordinates in a nonstandard basis", raw`Let \(b_1=(1,1)^\top\), \(b_2=(1,-1)^\top\), and \(x=(3,-1)^\top\). Solving \(x=c_1b_1+c_2b_2\) gives \(c_1=1\), \(c_2=2\).`],
    ["Compare three norms", raw`For \(x=(3,-4,1)^\top\), \(\|x\|_1=8\), \(\|x\|_2=\sqrt{26}\), and \(\|x\|_\infty=4\).`],
    ["Compute Euclidean distance", raw`For \(x=(1,2)^\top\) and \(y=(4,6)^\top\), \(x-y=(-3,-4)^\top\), so \(\|x-y\|_2=5\).`],
    ["Compute cosine similarity", raw`For \(x=(1,0)^\top\) and \(y=(1,1)^\top\), cosine similarity is \(1/(1\cdot\sqrt2)=1/\sqrt2\approx0.707\).`],
    ["Check orthogonality", raw`For \(x=(1,1)^\top\) and \(y=(1,-1)^\top\), \(x^\top y=1-1=0\). Therefore the vectors are orthogonal.`],
    ["Project onto one axis", raw`For \(x=(3,2)^\top\) and unit vector \(u=(1,0)^\top\), \(\operatorname{proj}_u(x)=(x^\top u)u=3u=(3,0)^\top\).`],
    ["Read a Gram-matrix entry", raw`If rows \(x_1\) and \(x_2\) of \(X\) are \((1,2)\) and \((3,4)\), then entry \((XX^\top)_{12}=x_1^\top x_2=1(3)+2(4)=11\).`],
    ["Normal-equation shape check", raw`If \(X\in\mathbb{R}^{N\times d}\), \(w\in\mathbb{R}^d\), and \(y\in\mathbb{R}^N\), then \(X^\top X\in\mathbb{R}^{d\times d}\) and \(X^\top y\in\mathbb{R}^{d}\). Thus \((X^\top X)w=X^\top y\) is shape-compatible.`],
    ["Classify by a hyperplane", raw`Let \(w=(1,-1)^\top\), \(b=0\), and \(x=(3,1)^\top\). Then \(w^\top x+b=2>0\), so the point lies on the positive side of the boundary \(x_1=x_2\).`],
    ["Compute signed distance to a boundary", raw`For \(w=(3,4)^\top\), \(b=-5\), and \(x=(3,2)^\top\), the score is \(3(3)+4(2)-5=12\). Since \(\|w\|_2=5\), the signed distance is \(12/5=2.4\).`],
    ["Connect normalized embeddings to dot products", raw`If \(\|x\|_2=\|y\|_2=1\), then cosine similarity is \(x^\top y\). This is why systems often normalize embeddings before nearest-neighbor search.`]
  ],
  practice: [
    raw`For \(v_1=(1,0)^\top\) and \(v_2=(0,1)^\top\), write \((5,-2)^\top\) as a linear combination. <details><summary>Show answer</summary><p>\((5,-2)^\top=5v_1-2v_2\).</p></details>`,
    raw`Do \((1,2)^\top\) and \((3,6)^\top\) form an independent set? <details><summary>Show answer</summary><p>No. The second vector is three times the first, so the set is linearly dependent.</p></details>`,
    raw`What is the span of two nonparallel vectors in \(\mathbb{R}^2\)? <details><summary>Show answer</summary><p>They span all of \(\mathbb{R}^2\).</p></details>`,
    raw`Why is the line \(y=2x+1\) not a subspace of \(\mathbb{R}^2\)? <details><summary>Show answer</summary><p>It does not contain the zero vector. A subspace must contain the origin.</p></details>`,
    raw`For \(x=(2,-3,6)^\top\), compute \(\|x\|_1\) and \(\|x\|_\infty\). <details><summary>Show answer</summary><p>\(\|x\|_1=2+3+6=11\). \(\|x\|_\infty=6\).</p></details>`,
    raw`Find the cosine similarity of \(x=(1,0)^\top\) and \(y=(-1,0)^\top\). <details><summary>Show answer</summary><p>The dot product is -1 and both norms are 1, so cosine similarity is -1. The vectors point in opposite directions.</p></details>`,
    raw`When are two nonzero vectors orthogonal? <details><summary>Show answer</summary><p>They are orthogonal when their dot product is zero.</p></details>`,
    raw`Project \(x=(2,5)^\top\) onto \(u=(1,0)^\top\). <details><summary>Show answer</summary><p>Because \(u\) is unit length, the projection is \((x^\top u)u=2u=(2,0)^\top\).</p></details>`,
    raw`If \(X\in\mathbb{R}^{100\times 32}\), what are the shapes of \(XX^\top\) and \(X^\top X\)? <details><summary>Show answer</summary><p>\(XX^\top\) is \(100\times100\). \(X^\top X\) is \(32\times32\).</p></details>`,
    raw`In least squares, why is the optimal residual orthogonal to the column space of \(X\)? <details><summary>Show answer</summary><p>If the residual had a component inside the column space, moving the prediction in that direction would reduce the residual norm. At the closest point, no such component remains.</p></details>`,
    raw`For boundary \(w^\top x+b=0\) with \(w=(0,2)^\top\), which direction is perpendicular to the boundary? <details><summary>Show answer</summary><p>The normal direction is \(w=(0,2)^\top\), which points along the vertical axis.</p></details>`,
    raw`Why does multiplying both \(w\) and \(b\) by 10 not change the hyperplane but does change the raw score? <details><summary>Show answer</summary><p>The equation \(10w^\top x+10b=0\) has the same zero set, so the boundary is unchanged. But the raw score is multiplied by 10. Geometric distance divides by \(\|w\|_2\), which removes this scale dependence.</p></details>`
  ]
});
