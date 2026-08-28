const day21 = COURSE[6].lessons[5];

Object.assign(day21, {
  published: true,
  summary: "Read kernel, SVM, tree, random-forest, and boosting papers by connecting similarity geometry to ensemble prediction.",
  explanation: "Classical statistical learning methods solve prediction problems with two broad ideas. Kernel methods compare examples through inner products in a feature space. Tree ensembles partition the input space and combine many simple predictors. These methods still appear in modern ML papers as baselines, theoretical tools, tabular-data models, and components inside larger systems.",
  topics: [
    "Similarity functions",
    "PSD kernels",
    "Feature maps",
    "Kernel trick",
    "RKHS intuition",
    "Margin geometry",
    "Support-vector machines",
    "Kernel regression",
    "Decision trees",
    "Bagging",
    "Random forests",
    "Boosting",
    "Additive models",
    "Gradient boosting"
  ],
  sections: [
    {
      id: "similarity-functions",
      title: "1. Similarity functions compare examples without fitting a full model",
      html: String.raw`
        <p>Many learning algorithms need to answer a simple question: <em>how similar are two examples?</em> A similarity function receives two inputs and returns one scalar.</p>
        <p>We write</p>
        <p>\[
        s(x,z)\in\mathbb R.
        \]</p>
        <p>A large value usually means that \(x\) and \(z\) are similar according to the chosen rule. The exact meaning depends on the function.</p>

        <h3>Dot-product similarity</h3>
        <p>Let</p>
        <p>\[
        x=\begin{bmatrix}1\\2\end{bmatrix},
        \qquad
        z=\begin{bmatrix}3\\1\end{bmatrix}.
        \]</p>
        <p>The dot product is</p>
        <p>\[
        x^\top z=(1)(3)+(2)(1)=5.
        \]</p>
        <p>This value depends on both direction and magnitude. If you need direction-only similarity, cosine similarity can be more suitable:</p>
        <p>\[
        \cos(x,z)=\frac{x^\top z}{\|x\|_2\|z\|_2}.
        \]</p>

        <h3>Distance can be converted to similarity</h3>
        <p>The squared Euclidean distance is</p>
        <p>\[
        \|x-z\|_2^2.
        \]</p>
        <p>For the same vectors,</p>
        <p>\[
        \|x-z\|_2^2=(1-3)^2+(2-1)^2=5.
        \]</p>
        <p>A common similarity is the radial-basis-function form</p>
        <p>\[
        k(x,z)=\exp\left(-\gamma\|x-z\|_2^2\right),
        \qquad \gamma>0.
        \]</p>
        <p>With \(\gamma=0.2\),</p>
        <p>\[
        k(x,z)=e^{-1}\approx0.368.
        \]</p>

        <h3>Why this matters in papers</h3>
        <p>A paper can use similarity inside retrieval, clustering, nearest-neighbor methods, kernel regression, SVMs, Gaussian processes, contrastive objectives, or attention-like operations. The same word <em>similarity</em> does not guarantee the same mathematical properties.</p>
        <div class="definition"><strong>Reading rule.</strong> Before you call a similarity a kernel, check its mathematical definition. A useful similarity score is not automatically a valid positive-semidefinite kernel.</div>
      `
    },
    {
      id: "psd-kernels",
      title: "2. A PSD kernel behaves like an inner product in some feature space",
      html: String.raw`
        <p>A kernel is a function</p>
        <p>\[
        k:\mathcal X\times\mathcal X\to\mathbb R.
        \]</p>
        <p>For the kernel methods in this chapter, the key condition is positive semidefiniteness. Given any points \(x_1,\ldots,x_n\), form the Gram matrix</p>
        <p>\[
        K_{ij}=k(x_i,x_j).
        \]</p>
        <p>The kernel is positive semidefinite, or PSD, when</p>
        <p>\[
        c^\top Kc\ge0
        \]</p>
        <p>for every coefficient vector \(c\in\mathbb R^n\).</p>

        <h3>A tiny Gram matrix</h3>
        <p>Use the linear kernel \(k(x,z)=x^\top z\) with scalar inputs \(x_1=1\) and \(x_2=2\). Treat each scalar as a one-entry vector. Then</p>
        <p>\[
        K=
        \begin{bmatrix}
        1&2\\
        2&4
        \end{bmatrix}.
        \]</p>
        <p>For \(c=(a,b)^\top\),</p>
        <p>\[
        c^\top Kc=a^2+4ab+4b^2=(a+2b)^2\ge0.
        \]</p>
        <p>So this Gram matrix is PSD.</p>

        <h3>Shape reasoning</h3>
        <p>If a dataset contains \(n\) training examples, the full kernel matrix has shape</p>
        <p>\[
        K\in\mathbb R^{n\times n}.
        \]</p>
        <p>For a test batch with \(B\) examples, evaluating each test example against all training examples gives</p>
        <p>\[
        K_{\text{test,train}}\in\mathbb R^{B\times n}.
        \]</p>
        <p>This shape matters because classical kernel methods can require memory that grows as \(O(n^2)\).</p>

        <h3>Why PSD matters</h3>
        <p>The PSD condition gives a geometry that is consistent with inner products. It also supports convex optimization in important kernel algorithms. When a paper uses an indefinite similarity matrix but still calls it a kernel, check whether the method has been modified to handle that case.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> A statement such as “we use an RBF kernel” carries more information than “we use RBF similarity.” It means the method can use the algebra of PSD Gram matrices and feature-space inner products.</div>
      `
    },
    {
      id: "feature-maps",
      title: "3. A feature map makes the kernel geometry explicit",
      html: String.raw`
        <p>A feature map sends an input into a vector space:</p>
        <p>\[
        \phi:\mathcal X\to\mathcal H.
        \]</p>
        <p>A kernel can often be written as</p>
        <p>\[
        k(x,z)=\langle\phi(x),\phi(z)\rangle_{\mathcal H}.
        \]</p>
        <p>This equation is the bridge between a kernel value and an inner product.</p>

        <h3>Polynomial-kernel example</h3>
        <p>For scalar inputs, consider</p>
        <p>\[
        k(x,z)=(1+xz)^2.
        \]</p>
        <p>Expand:</p>
        <p>\[
        (1+xz)^2=1+2xz+x^2z^2.
        \]</p>
        <p>Choose</p>
        <p>\[
        \phi(x)=
        \begin{bmatrix}
        1\\
        \sqrt2x\\
        x^2
        \end{bmatrix}.
        \]</p>
        <p>Then</p>
        <p>\[
        \phi(x)^\top\phi(z)=1+2xz+x^2z^2=k(x,z).
        \]</p>
        <p>For \(x=2\) and \(z=3\), the kernel gives</p>
        <p>\[
        (1+6)^2=49.
        \]</p>
        <p>The feature-space dot product gives the same result:</p>
        <p>\[
        1+(2\sqrt2)(3\sqrt2)+(4)(9)=1+12+36=49.
        \]</p>

        <h3>Why nonlinear classification becomes possible</h3>
        <p>A linear classifier in \(\phi(x)\) can correspond to a nonlinear boundary in the original input coordinates. Kernel methods exploit this fact without requiring the learner to work with the original coordinates only.</p>
        <div class="shape-check"><strong>Common mistake.</strong> The feature map does not have to be finite-dimensional. Some kernels correspond to very large or infinite-dimensional feature spaces. The kernel value can still be computed directly.</div>
      `
    },
    {
      id: "kernel-trick",
      title: "4. The kernel trick replaces feature-space dot products with kernel evaluations",
      html: String.raw`
        <p>Suppose an algorithm uses training examples only through dot products</p>
        <p>\[
        \phi(x_i)^\top\phi(x_j).
        \]</p>
        <p>If a kernel gives this dot product directly, we can replace the explicit feature-space operation by</p>
        <p>\[
        k(x_i,x_j).
        \]</p>
        <p>This replacement is the <strong>kernel trick</strong>.</p>

        <h3>Why this is useful</h3>
        <p>The polynomial feature map for a vector can contain many monomials. Explicit construction can be expensive. A kernel can compute the final inner product without constructing every coordinate.</p>

        <h3>Prediction has a characteristic form</h3>
        <p>Many kernel predictors can be written as</p>
        <p>\[
        f(x)=\sum_{i=1}^{n}\alpha_i k(x_i,x)+b.
        \]</p>
        <p>The model stores coefficients \(\alpha_i\) attached to training examples. At prediction time, the new point \(x\) is compared with those examples.</p>

        <h3>Numerical prediction</h3>
        <p>Suppose three training points produce kernel values</p>
        <p>\[
        k(x_1,x)=0.8,
        \quad
        k(x_2,x)=0.2,
        \quad
        k(x_3,x)=0.5.
        \]</p>
        <p>Let</p>
        <p>\[
        \alpha=(2,-1,0.5)^\top,
        \qquad b=0.1.
        \]</p>
        <p>Then</p>
        <p>\[
        f(x)=2(0.8)-1(0.2)+0.5(0.5)+0.1=1.75.
        \]</p>

        <h3>Computational trade-off</h3>
        <p>The kernel trick avoids explicit high-dimensional features, but it does not make every computation cheap. Training can need the full \(n\times n\) Gram matrix, and prediction can need many kernel evaluations. Large-scale papers can therefore use random features, Nyström approximations, sparse support vectors, or other approximations.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> When you read a kernel method, ask both mathematical and computational questions: what feature-space geometry does the kernel imply, and how does the algorithm avoid quadratic or cubic cost as \(n\) grows?</div>
      `
    },
    {
      id: "rkhs-intuition",
      title: "5. RKHS intuition: the model is a function built from kernel sections",
      html: String.raw`
        <p>An RKHS is a reproducing-kernel Hilbert space. The full theory is abstract, but one practical picture is enough for many papers.</p>
        <p>For each training point \(x_i\), the function</p>
        <p>\[
        k(x_i,\cdot)
        \]</p>
        <p>is itself an element of the function space. A learned function can be expressed as a weighted sum of these kernel sections:</p>
        <p>\[
        f(\cdot)=\sum_{i=1}^{n}\alpha_i k(x_i,\cdot).
        \]</p>

        <h3>The reproducing property</h3>
        <p>The defining identity is</p>
        <p>\[
        f(x)=\langle f,k(x,\cdot)\rangle_{\mathcal H}.
        \]</p>
        <p>It says that evaluating a function at \(x\) is equivalent to taking an inner product with the kernel section centered at \(x\).</p>

        <h3>Regularization in function space</h3>
        <p>A common objective is</p>
        <p>\[
        \min_{f\in\mathcal H}
        \frac1n\sum_{i=1}^{n}\ell(y_i,f(x_i))
        +\lambda\|f\|_{\mathcal H}^2.
        \]</p>
        <p>The first term fits data. The second term penalizes a large RKHS norm. The representer theorem states that many such solutions have the finite expansion over training examples shown above.</p>

        <h3>Why this matters in ML papers</h3>
        <p>Kernel papers can discuss capacity through the norm of a function instead of through the number of explicit parameters. This differs from a neural network, where capacity is often discussed through weights, architecture, norms, margins, or implicit bias.</p>
        <div class="definition"><strong>Do not over-interpret.</strong> “Infinite-dimensional feature space” does not mean the model has infinite data or infinite computational cost. It describes the mathematical function space. Actual algorithms still use finite data and finite computations.</div>
      `
    }
  ]
});
