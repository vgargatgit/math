(() => {
  const day21 = COURSE[6].lessons[5];

  day21.sections.push(
    {
      id: "margin-geometry",
      title: "6. Margin geometry measures how far a decision boundary is from the closest examples",
      html: String.raw`
        <p>A binary linear classifier can use the score</p>
        <p>\[
        f(x)=w^\top x+b.
        \]</p>
        <p>The predicted class is often the sign of \(f(x)\). The decision boundary is the hyperplane</p>
        <p>\[
        w^\top x+b=0.
        \]</p>
        <p>The vector \(w\) is perpendicular to the boundary.</p>

        <h3>Distance to the hyperplane</h3>
        <p>The signed distance from a point \(x\) to the boundary is</p>
        <p>\[
        \frac{w^\top x+b}{\|w\|_2}.
        \]</p>
        <p>For a labeled example \((x_i,y_i)\), with \(y_i\in\{-1,+1\}\), the signed margin is</p>
        <p>\[
        \frac{y_i(w^\top x_i+b)}{\|w\|_2}.
        \]</p>

        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[
        w=\begin{bmatrix}3\\4\end{bmatrix},
        \qquad b=-5,
        \qquad x=\begin{bmatrix}3\\2\end{bmatrix}.
        \]</p>
        <p>The score is</p>
        <p>\[
        w^\top x+b=3(3)+4(2)-5=12.
        \]</p>
        <p>Since \(\|w\|_2=5\), the signed distance is</p>
        <p>\[
        12/5=2.4.
        \]</p>

        <h3>Why scale matters</h3>
        <p>The equations \(w^\top x+b=0\) and \(10w^\top x+10b=0\) define the same boundary. Therefore raw scores alone do not define geometric margin. Dividing by \(\|w\|_2\) removes this arbitrary scaling.</p>

        <h3>Why margins matter in papers</h3>
        <p>A large-margin method does not only ask whether training examples are classified correctly. It asks for a boundary that stays far from the closest examples. Margin concepts also appear in modern generalization theory, contrastive learning, metric learning, and analyses of neural classifiers.</p>
        <div class="shape-check"><strong>Shape check.</strong> For a batch \(X\in\mathbb R^{B\times d}\), with \(w\in\mathbb R^d\), scores can be computed as \(Xw+b\mathbf 1\in\mathbb R^B\).</div>
      `
    },
    {
      id: "support-vector-machines",
      title: "7. An SVM chooses a separating boundary by maximizing the margin",
      html: String.raw`
        <p>For linearly separable data, the hard-margin support-vector machine can be written as</p>
        <p>\[
        \min_{w,b}\frac12\|w\|_2^2
        \quad\text{subject to}\quad
        y_i(w^\top x_i+b)\ge1
        \quad\text{for all }i.
        \]</p>
        <p>Why minimize \(\|w\|_2^2\)? Under the normalization that the closest points satisfy \(y_i(w^\top x_i+b)=1\), the geometric margin is proportional to</p>
        <p>\[
        \frac1{\|w\|_2}.
        \]</p>
        <p>Smaller \(\|w\|_2\) therefore means a wider margin.</p>

        <h3>Support vectors</h3>
        <p>The training examples that touch the margin satisfy</p>
        <p>\[
        y_i(w^\top x_i+b)=1.
        \]</p>
        <p>These points are the <strong>support vectors</strong>. Points far from the boundary usually do not determine the final separating hyperplane.</p>

        <h3>Soft margin and hinge loss</h3>
        <p>Real data is often not perfectly separable. A common soft-margin objective is</p>
        <p>\[
        \min_{w,b}
        \frac12\|w\|_2^2
        +C\sum_{i=1}^{n}\max\left(0,1-y_i(w^\top x_i+b)\right).
        \]</p>
        <p>The hinge loss is zero when the example is on the correct side with margin at least one. It is positive for small-margin or misclassified examples.</p>

        <h3>Numerical hinge-loss examples</h3>
        <p>If \(y=+1\) and the score is \(2.2\),</p>
        <p>\[
        \max(0,1-2.2)=0.
        \]</p>
        <p>If \(y=+1\) and the score is \(0.4\),</p>
        <p>\[
        \max(0,1-0.4)=0.6.
        \]</p>
        <p>If \(y=-1\) and the score is \(0.5\), then \(y f(x)=-0.5\), so</p>
        <p>\[
        \max(0,1-(-0.5))=1.5.
        \]</p>

        <h3>What the parameter \(C\) does</h3>
        <p>A large \(C\) places more cost on margin violations. A small \(C\) gives more relative weight to a small weight norm and a wider, more regularized boundary. Different libraries can parameterize regularization differently, so do not compare \(C\) values without checking the exact objective.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> SVM baselines remain useful when datasets are modest, features are strong, and a convex margin-based objective is desirable. In papers, check whether reported results use linear SVM, kernel SVM, one-vs-rest multiclass SVM, or another variant.</div>
      `
    },
    {
      id: "kernel-svm",
      title: "8. The SVM dual exposes dot products and makes kernelization possible",
      html: String.raw`
        <p>The dual form of a binary soft-margin SVM uses one coefficient \(\alpha_i\) per training example. A common dual problem is</p>
        <p>\[
        \max_{\alpha}
        \sum_i\alpha_i
        -\frac12\sum_{i,j}
        \alpha_i\alpha_j y_i y_j
        x_i^\top x_j
        \]</p>
        <p>subject to</p>
        <p>\[
        0\le\alpha_i\le C,
        \qquad
        \sum_i\alpha_i y_i=0.
        \]</p>
        <p>The training points appear through dot products \(x_i^\top x_j\). Replace those dot products by a kernel:</p>
        <p>\[
        x_i^\top x_j
        \longrightarrow
        k(x_i,x_j).
        \]</p>
        <p>The prediction becomes</p>
        <p>\[
        f(x)=\sum_i\alpha_i y_i k(x_i,x)+b.
        \]</p>

        <h3>Only support vectors need nonzero coefficients</h3>
        <p>In the optimal solution, many \(\alpha_i\) can be zero. Then those training points contribute nothing to prediction. The points with nonzero coefficients are support vectors.</p>

        <h3>Numerical prediction</h3>
        <p>Suppose two support vectors have</p>
        <p>\[
        \alpha_1=0.7,\quad y_1=+1,\quad k(x_1,x)=0.9,
        \]</p>
        <p>and</p>
        <p>\[
        \alpha_2=0.4,\quad y_2=-1,\quad k(x_2,x)=0.3,
        \]</p>
        <p>with \(b=-0.1\). Then</p>
        <p>\[
        f(x)=0.7(1)(0.9)+0.4(-1)(0.3)-0.1
        =0.41.
        \]</p>
        <p>The predicted sign is positive.</p>

        <h3>Kernel matrix shape</h3>
        <p>For \(n\) training points, dual optimization uses the Gram matrix \(K\in\mathbb R^{n\times n}\). For a test batch of \(B\) points and \(m\) support vectors, prediction can use</p>
        <p>\[
        K_{\text{test,SV}}\in\mathbb R^{B\times m}.
        \]</p>
        <p>This is one reason sparse support-vector solutions can reduce prediction cost.</p>
        <div class="definition"><strong>Common mistake.</strong> A kernel SVM is linear in feature space but usually nonlinear in the original input coordinates.</div>
      `
    },
    {
      id: "kernel-regression",
      title: "9. Kernel regression predicts by weighting nearby training targets",
      html: String.raw`
        <p>Kernel methods are not limited to classification. A simple nonparametric regression method is the Nadaraya-Watson estimator:</p>
        <p>\[
        \widehat f(x)
        =\frac{\sum_{i=1}^{n}k_h(x,x_i)y_i}
        {\sum_{i=1}^{n}k_h(x,x_i)}.
        \]</p>
        <p>The bandwidth parameter \(h\) controls how quickly similarity decreases with distance.</p>

        <h3>Numerical example</h3>
        <p>Suppose three training targets are</p>
        <p>\[
        y=(2,5,8)
        \]</p>
        <p>and the similarities to a test point are</p>
        <p>\[
        k=(0.6,0.3,0.1).
        \]</p>
        <p>These weights already sum to one, so</p>
        <p>\[
        \widehat f(x)=0.6(2)+0.3(5)+0.1(8)=3.5.
        \]</p>

        <h3>Kernel ridge regression</h3>
        <p>A related regularized method solves for dual coefficients</p>
        <p>\[
        \alpha=(K+\lambda I)^{-1}y.
        \]</p>
        <p>Prediction for a new input is</p>
        <p>\[
        \widehat y(x)=k_x^\top\alpha,
        \]</p>
        <p>where</p>
        <p>\[
        k_x=
        \begin{bmatrix}
        k(x_1,x)\\
        \vdots\\
        k(x_n,x)
        \end{bmatrix}
        \in\mathbb R^n.
        \]</p>

        <h3>Shape reasoning</h3>
        <p>For scalar regression,</p>
        <p>\[
        K:n\times n,
        \qquad
        y:n\times1,
        \qquad
        \alpha:n\times1.
        \]</p>
        <p>The prediction dot product \(k_x^\top\alpha\) is a scalar.</p>

        <h3>Bandwidth and regularization are different controls</h3>
        <p>For an RBF kernel, the bandwidth controls locality in input space. The ridge parameter \(\lambda\) controls coefficient regularization. Papers sometimes tune both. Do not treat them as interchangeable.</p>
        <div class="paper-connection"><strong>Modern connection.</strong> Kernel regression is closely related to local smoothing, Gaussian-process prediction, and the neural tangent kernel view of wide neural networks. The details differ, but the Gram-matrix viewpoint is shared.</div>
      `
    },
    {
      id: "kernel-method-computation",
      title: "10. Kernel methods trade explicit features for data-dependent computation",
      html: String.raw`
        <p>The kernel trick can remove the need to build a large feature vector, but the algorithm can become expensive in the number of training examples.</p>

        <h3>Memory example</h3>
        <p>If \(n=10{,}000\), then a full Gram matrix contains</p>
        <p>\[
        n^2=10^8
        \]</p>
        <p>entries. At 8 bytes per floating-point number, this is about \(800\) MB before accounting for other arrays and overhead.</p>

        <h3>Low-rank approximations</h3>
        <p>If</p>
        <p>\[
        K\approx ZZ^\top,
        \qquad
        Z\in\mathbb R^{n\times r},
        \qquad r\ll n,
        \]</p>
        <p>the method can work with \(nr\) numbers instead of \(n^2\). Nyström methods and random Fourier features are two common routes to such approximations.</p>

        <h3>Random Fourier-feature idea</h3>
        <p>For certain shift-invariant kernels, one can sample frequencies and construct an explicit randomized feature map \(z(x)\in\mathbb R^r\) such that</p>
        <p>\[
        z(x)^\top z(z')\approx k(x,z').
        \]</p>
        <p>Then a linear model in \(z(x)\) approximates the kernel model.</p>

        <h3>Reading a scaling claim</h3>
        <p>If a paper says that a kernel baseline is impractical, ask which cost dominates: Gram-matrix storage, factorization, optimization, or test-time kernel evaluation. If a paper claims a scalable kernel method, look for sparsity, low rank, inducing points, random features, chunked computation, or iterative solvers.</p>
        <div class="shape-check"><strong>Common mistake.</strong> “No explicit feature map” does not mean “no features.” The kernel defines an implicit feature space even when the algorithm never constructs \(\phi(x)\) directly.</div>
      `
    }
  );
})();
