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
      <p>If \(x=(2,3)^\top\) and \(y=(4,-1)^\top\), then \(s=5\). A small change in \(x_1\) changes \(s\) at rate \(4\), which is exactly \(y_1\).</p>
      <h3>Affine map</h3>
      <p>Use the row-vector convention common in neural-network code:</p>
      <p>\[z=xW+b,\]</p>
      <p>with \(x\in\mathbb{R}^{1\times m}\), \(W\in\mathbb{R}^{m\times n}\), \(b,z\in\mathbb{R}^{1\times n}\). If \(\delta=\partial L/\partial z\), then</p>
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
      <p>For \(A=I\), \(q=x^\top x=\|x\|_2^2\), so \(\nabla q=2x\).</p>
      <h3>Matrix product</h3>
      <p>If</p>
      <p>\[C=AB,\]</p>
      <p>then a small change gives</p>
      <p>\[dC=(dA)B+A(dB).\]</p>
      <p>This is the matrix form of the product rule.</p>
      <div class="shape-check"><strong>Common mistake.</strong> Do not move matrix factors across each other as if they were scalars. Order matters.</div>
    `
  }
);
