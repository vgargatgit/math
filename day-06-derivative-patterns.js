// Continue Day 6: reusable derivative patterns
day6.sections.push(
  {
    id: "basic-derivatives",
    title: "7. Learn a small set of reusable matrix-calculus patterns",
    html: String.raw`
      <h3>Dot product</h3>
      <p>For</p>
      <p>\[s=x^\top y,\]</p>
      <p>the gradients are</p>
      <p>\[\nabla_x s=y,\qquad \nabla_y s=x.\]</p>
      <p>If \(x=(2,3)^\top\) and \(y=(4,-1)^\top\), then \(s=5\). A small change in \(x_1\) changes \(s\) at rate \(4\), which is exactly \(y_1\). A small change in \(x_2\) changes it at rate \(-1\).</p>

      <h3>Affine map</h3>
      <p>Use the row-vector convention common in neural-network code:</p>
      <p>\[z=xW+b,\]</p>
      <p>with \(x\in\mathbb{R}^{1\times m}\), \(W\in\mathbb{R}^{m\times n}\), and \(b,z\in\mathbb{R}^{1\times n}\). If \(\delta=\partial L/\partial z\), then</p>
      <p>\[\frac{\partial L}{\partial W}=x^\top\delta,\qquad
      \frac{\partial L}{\partial x}=\delta W^\top,\qquad
      \frac{\partial L}{\partial b}=\delta.\]</p>
      <p>Shape check:</p>
      <p>\[(m\times1)(1\times n)=m\times n,\]</p>
      <p>so \(x^\top\delta\) matches the shape of \(W\).</p>

      <h3>Quadratic form</h3>
      <p>For</p>
      <p>\[q=x^\top A x,\]</p>
      <p>the gradient is</p>
      <p>\[\nabla_x q=(A+A^\top)x.\]</p>
      <p>If \(A\) is symmetric, this becomes</p>
      <p>\[\nabla_x q=2Ax.\]</p>
      <p>For \(A=I\), \(q=x^\top x=\|x\|_2^2\), so \(\nabla q=2x\). For \(x=(3,-2)^\top\), the gradient is \((6,-4)^\top\).</p>

      <h3>Matrix product</h3>
      <p>Let</p>
      <p>\[C=AB,\qquad A\in\mathbb{R}^{m\times k},\quad B\in\mathbb{R}^{k\times n}.\]</p>
      <p>A small change obeys the matrix product rule</p>
      <p>\[dC=(dA)B+A(dB).\]</p>
      <p>Now let a scalar loss provide the upstream matrix</p>
      <p>\[G=\frac{\partial L}{\partial C}\in\mathbb{R}^{m\times n}.\]</p>
      <p>The two backward formulas are</p>
      <p>\[\boxed{\frac{\partial L}{\partial A}=GB^\top},\qquad
      \boxed{\frac{\partial L}{\partial B}=A^\top G}.\]</p>
      <p>Check the shapes:</p>
      <p>\[(m\times n)(n\times k)=m\times k,\qquad
      (k\times m)(m\times n)=k\times n.\]</p>
      <p>Each gradient matches the matrix that it differentiates.</p>
      <h3>Small matrix-product example</h3>
      <p>If \(A\) has shape \(2\times3\), \(B\) has shape \(3\times4\), and \(G\) has shape \(2\times4\), then \(GB^\top\) has shape \(2\times3\) and \(A^\top G\) has shape \(3\times4\).</p>
      <div class="paper-connection"><strong>Why this matters in ML papers.</strong> Dense layers, attention projections, low-rank adapters, and linear heads are chains of matrix products. These two backward formulas appear repeatedly even when a paper writes them with different row/column conventions.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Do not move matrix factors across each other as if they were scalars. Matrix multiplication is not commutative, so order and transposes matter.</div>
    `
  }
);
