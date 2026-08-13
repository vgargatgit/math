const day6 = COURSE[1].lessons[1];

Object.assign(day6, {
  published: true,
  summary: "Predict derivative shapes before you calculate entries. Learn matrix-calculus conventions, differentials, Jacobians, chain-rule order, activation derivatives, broadcasting, normalization, batch gradients, and finite-difference checks.",
  explanation: "Matrix calculus is ordinary calculus applied to vectors and matrices, but notation can hide the structure. The safest method is to write the input shape, write the output shape, decide which derivative object is required, and only then calculate entries. This habit makes backpropagation equations easier to read and catches many algebra errors before they reach code.",
  topics: [
    "Derivative layout conventions",
    "Derivative shape rules",
    "Scalar, vector, and matrix derivatives",
    "Differentials",
    "Jacobians as local linear maps",
    "Vector chain rule",
    "Jacobian order",
    "Element-wise Jacobians",
    "Diagonal and block Jacobians",
    "Structural zero versus evaluated zero",
    "Affine, dot-product, quadratic, and matrix-product derivatives",
    "Broadcasting and reduction derivatives",
    "Sigmoid, tanh, ReLU, softmax, log-softmax, and log-sum-exp derivatives",
    "Normalization derivatives",
    "Gradient accumulation",
    "Batch gradients",
    "Finite-difference checks"
  ],
  sections: [
    {
      id: "shape-first",
      title: "1. Start with shape before algebra",
      html: String.raw`
        <p>Matrix calculus becomes difficult when notation hides the type of each object. Start with shapes. Do not start by expanding symbols.</p>
        <p>Suppose a scalar loss depends on a matrix parameter:</p>
        <p>\[L=L(W),\qquad W\in\mathbb{R}^{m\times n},\qquad L\in\mathbb{R}.\]</p>
        <p>The gradient with respect to \(W\) must contain one sensitivity value for each entry of \(W\). Therefore, under the convention used in this course,</p>
        <p>\[\frac{\partial L}{\partial W}\in\mathbb{R}^{m\times n}.\]</p>
        <p>This does not yet tell us the numbers. It tells us the only possible shape.</p>
        <div class="definition">
          <strong>Shape-first rule.</strong> For a scalar loss, the gradient with respect to a parameter has the same shape as that parameter.
        </div>
        <p>Example: if \(W\in\mathbb{R}^{5\times3}\), then \(\partial L/\partial W\) must also be \(5\times3\). A proposed \(3\times5\) answer is wrong before you inspect any algebra.</p>
        <div class="paper-connection">
          <strong>Why this matters in ML papers.</strong> Backpropagation formulas often contain many transposes. Shape reasoning lets you verify whether the author uses row vectors, column vectors, or a particular Jacobian layout convention. It also helps you translate equations into NumPy, PyTorch, JAX, or TensorFlow operations.
        </div>
      `
    },
    {
      id: "layout-conventions",
      title: "2. Derivative notation has conventions, not one universal layout",
      html: String.raw`
        <p>Different books place derivative entries in different orientations. This is one of the main sources of confusion in matrix calculus.</p>
        <p>For a vector-valued function</p>
        <p>\[y=f(x),\qquad x\in\mathbb{R}^{n},\qquad y\in\mathbb{R}^{m},\]</p>
        <p>this course uses the Jacobian convention</p>
        <p>\[J_{ij}=\frac{\partial y_i}{\partial x_j}.\]</p>
        <p>Therefore,</p>
        <p>\[J=\frac{\partial y}{\partial x}\in\mathbb{R}^{m\times n}.\]</p>
        <p>Rows correspond to outputs. Columns correspond to inputs.</p>
        <h3>Scalar output</h3>
        <p>If \(L:\mathbb{R}^n\to\mathbb{R}\), we represent the gradient as a column vector:</p>
        <p>\[\nabla_x L=\begin{bmatrix}\partial L/\partial x_1\\\vdots\\\partial L/\partial x_n\end{bmatrix}\in\mathbb{R}^{n}.\]</p>
        <p>Some texts use a row derivative \(\partial L/\partial x\). Others use a column gradient \(\nabla_xL\). Both can be consistent. Problems start when you combine formulas from different conventions.</p>
        <div class="shape-check">
          <strong>Reading rule.</strong> When you open a new paper, inspect one simple derivative formula. Determine whether gradients are rows or columns and whether the Jacobian uses output-by-input or input-by-output layout. Keep that convention for the whole derivation.
        </div>
        <p>In implementation-oriented equations, activations are often stored as row vectors or batches. The same mathematics can then appear transposed. Always separate the mathematical map from the storage layout.</p>
      `
    },
    {
      id: "differentials",
      title: "3. Differentials expose the linear part of a small change",
      html: String.raw`
        <p>A differential is often the cleanest way to derive matrix gradients. It describes the first-order change in an output caused by a small input change.</p>
        <p>For a scalar function \(L(x)\),</p>
        <p>\[dL\approx \nabla_xL^\top dx.\]</p>
        <p>The vector \(dx\) is a small change in \(x\). The gradient tells us how that change affects \(L\).</p>
        <h3>Small numerical example</h3>
        <p>Let</p>
        <p>\[L(x_1,x_2)=x_1^2+3x_2.\]</p>
        <p>At \(x=(2,1)^\top\),</p>
        <p>\[\nabla L=\begin{bmatrix}2x_1\\3\end{bmatrix}=\begin{bmatrix}4\\3\end{bmatrix}.\]</p>
        <p>If \(dx=(0.01,-0.02)^\top\), the first-order loss change is</p>
        <p>\[dL\approx \begin{bmatrix}4&3\end{bmatrix}\begin{bmatrix}0.01\\-0.02\end{bmatrix}=0.04-0.06=-0.02.\]</p>
        <h3>Matrix parameter</h3>
        <p>For a matrix \(W\), a useful identity is</p>
        <p>\[dL=\operatorname{tr}\!\left(\left(\frac{\partial L}{\partial W}\right)^\top dW\right).\]</p>
        <p>This is the matrix version of a dot product between the gradient and the small parameter change.</p>
        <div class="paper-connection">
          <strong>Why differentials matter.</strong> They let you derive gradients without constructing giant Jacobians. Many modern derivations use trace identities and differentials because they scale cleanly to matrix parameters.
        </div>
      `
    },
    {
      id: "jacobian-map",
      title: "4. A Jacobian is the local linear map from input changes to output changes",
      html: String.raw`
        <p>Let</p>
        <p>\[y=f(x),\qquad x\in\mathbb{R}^{n},\qquad y\in\mathbb{R}^{m}.\]</p>
        <p>Near a point \(x\), a small input change \(dx\) produces approximately</p>
        <p>\[dy\approx J_f(x)\,dx.\]</p>
        <p>This is the vector version of the tangent-line approximation.</p>
        <h3>Example: linear map</h3>
        <p>Let</p>
        <p>\[y=Ax,\qquad A=\begin{bmatrix}2&1\\-1&3\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[J_f=A.\]</p>
        <p>If \(dx=(0.1,-0.2)^\top\), then</p>
        <p>\[dy=A\,dx=\begin{bmatrix}2&1\\-1&3\end{bmatrix}\begin{bmatrix}0.1\\-0.2\end{bmatrix}=\begin{bmatrix}0\\-0.7\end{bmatrix}.\]</p>
        <p>For a linear function, this relation is exact. For a nonlinear function, the Jacobian is the best first-order local approximation.</p>
        <div class="shape-check">
          <strong>Shape check.</strong> \(J_f\) is \(m\times n\), and \(dx\) is \(n\times1\). Therefore \(J_fdx\) is \(m\times1\), which matches \(dy\).
        </div>
      `
    }
  ],
  examples: [],
  practice: []
});
