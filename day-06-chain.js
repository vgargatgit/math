// Continue Day 6: chain rule and element-wise Jacobians
day6.sections.push(
  {
    id: "chain-rule",
    title: "5. The vector chain rule is matrix multiplication in dependency order",
    html: String.raw`
      <p>Suppose \(x\) is transformed into \(u=g(x)\), and then \(u\) is transformed into \(y=f(u)\).</p>
      <p>Let \(x\in\mathbb{R}^n\), \(u\in\mathbb{R}^p\), and \(y\in\mathbb{R}^m\). Then</p>
      <p>\[J_{y,x}=J_{y,u}J_{u,x}.\]</p>
      <p>The shapes are</p>
      <p>\[(m\times p)(p\times n)=m\times n.\]</p>
      <p>The middle dimension \(p\) cancels. This is a reliable way to remember the order.</p>
      <h3>Concrete example</h3>
      <p>Let</p>
      <p>\[u=Ax,\qquad y=\tanh(u),\]</p>
      <p>where \(A\in\mathbb{R}^{2\times2}\). The Jacobian of \(u\) with respect to \(x\) is \(A\). The tanh operation is element-wise, so</p>
      <p>\[J_{y,u}=\operatorname{diag}(1-\tanh^2(u_1),\,1-\tanh^2(u_2)).\]</p>
      <p>Therefore,</p>
      <p>\[J_{y,x}=J_{y,u}A.\]</p>
      <div class="shape-check"><strong>Common mistake.</strong> Matrix multiplication is not commutative. In general, \(J_{y,u}J_{u,x}\ne J_{u,x}J_{y,u}\). Follow the dependency path and verify shapes.</div>
      <div class="paper-connection"><strong>Backpropagation connection.</strong> Reverse-mode automatic differentiation usually multiplies an upstream sensitivity by local Jacobians without explicitly materializing the full Jacobian. This is a vector-Jacobian product.</div>
    `
  },
  {
    id: "elementwise-jacobians",
    title: "6. Element-wise functions create diagonal Jacobians",
    html: String.raw`
      <p>Suppose</p>
      <p>\[y_i=f(x_i)\quad\text{for each }i.\]</p>
      <p>Then output \(y_i\) depends only on input \(x_i\). Therefore,</p>
      <p>\[\frac{\partial y_i}{\partial x_j}=0\qquad\text{when }i\ne j.\]</p>
      <p>The Jacobian is diagonal:</p>
      <p>\[J=\operatorname{diag}(f'(x_1),\ldots,f'(x_n)).\]</p>
      <h3>Example: square every entry</h3>
      <p>For \(y=(x_1^2,x_2^2,x_3^2)^\top\),</p>
      <p>\[J=\begin{bmatrix}2x_1&0&0\\0&2x_2&0\\0&0&2x_3\end{bmatrix}.\]</p>
      <p>At \(x=(1,-2,0)^\top\),</p>
      <p>\[J=\begin{bmatrix}2&0&0\\0&-4&0\\0&0&0\end{bmatrix}.\]</p>
      <h3>Structural zero versus evaluated zero</h3>
      <p>The off-diagonal zeros are <strong>structural</strong>. They are zero because the dependency does not exist. The last diagonal zero is an <strong>evaluated zero</strong>. The dependency exists, but the derivative happens to be zero at \(x_3=0\).</p>
      <div class="paper-connection"><strong>Why this matters.</strong> Structural sparsity can make Jacobian operations cheap. Evaluated zeros can instead indicate saturation, an inactive ReLU unit, or a local flat direction.</div>
    `
  }
);
