day6.sections.push(
  {
    id: "batch-gradients",
    title: "12. Batch gradients add contributions from examples",
    html: String.raw`
      <p>A parameter can affect the objective through many examples in a batch. The total gradient is the sum of all paths that reach that parameter.</p>
      <p>For one affine layer,</p>
      <p>\[Z=XW+\mathbf{1}b,\]</p>
      <p>with \(X\in\mathbb{R}^{B\times m}\), \(W\in\mathbb{R}^{m\times n}\), and upstream matrix \(G=\partial L/\partial Z\in\mathbb{R}^{B\times n}\),</p>
      <p>\[\frac{\partial L}{\partial W}=X^\top G.\]</p>
      <p>The shape is \((m\times B)(B\times n)=m\times n\).</p>
      <p>One entry is</p>
      <p>\[\left(\frac{\partial L}{\partial W}\right)_{ij}=\sum_{r=1}^{B}X_{ri}G_{rj}.\]</p>
      <p>The batch dimension disappears because the same weight \(W_{ij}\) is used by every example.</p>
      <h3>Mean objective versus sum objective</h3>
      <p>If \(L_{\mathrm{mean}}=B^{-1}\sum_{r=1}^{B}L_r\), then</p>
      <p>\[\nabla L_{\mathrm{mean}}=\frac{1}{B}\sum_r\nabla L_r.\]</p>
      <div class="shape-check"><strong>Common implementation mistake.</strong> Two code bases can differ by a factor of \(B\) if one reduces with a sum and the other reduces with a mean.</div>
    `
  },
  {
    id: "gradient-accumulation",
    title: "13. Shared parameters receive the sum of all gradient paths",
    html: String.raw`
      <p>If one parameter is used more than once, each use contributes to the same gradient.</p>
      <p>Suppose</p>
      <p>\[L=(wx_1)^2+(wx_2)^2.\]</p>
      <p>Then</p>
      <p>\[\frac{dL}{dw}=2wx_1^2+2wx_2^2.\]</p>
      <p>For \(w=2\), \(x_1=1\), and \(x_2=3\), the two contributions are \(4\) and \(36\), so the final derivative is \(40\).</p>
      <div class="paper-connection"><strong>ML connection.</strong> Recurrent networks, shared embeddings, convolutional kernels, and reused modules all create gradient accumulation. Automatic differentiation adds these path contributions.</div>
      <p>This is the multivariable version of \(d[g(w)+h(w)]/dw=g'(w)+h'(w)\).</p>
    `
  }
);
