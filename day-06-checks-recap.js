day6.sections.push(
  {
    id: "finite-differences",
    title: "15. Finite differences are a practical derivative check",
    html: String.raw`
      <p>An analytic derivative can have the right shape and still contain the wrong numbers. A centered finite difference gives an independent numerical check.</p>
      <p>For a scalar parameter \(\theta\),</p>
      <p>\[\frac{dL}{d\theta}\approx\frac{L(\theta+\varepsilon)-L(\theta-\varepsilon)}{2\varepsilon}.\]</p>
      <p>For \(L(\theta)=\theta^2\), \(\theta=3\), and \(\varepsilon=10^{-4}\), this expression is approximately \(6\), which matches the exact derivative \(2\theta\).</p>
      <h3>Directional check for a matrix</h3>
      <p>Choose a direction \(D\) with the same shape as \(W\). Compare</p>
      <p>\[\frac{L(W+\varepsilon D)-L(W-\varepsilon D)}{2\varepsilon}\]</p>
      <p>with</p>
      <p>\[\left\langle\frac{\partial L}{\partial W},D\right\rangle,\qquad \langle G,D\rangle=\operatorname{tr}(G^\top D).\]</p>
      <div class="shape-check"><strong>Numerical caution.</strong> A very large \(\varepsilon\) gives truncation error. A very small \(\varepsilon\) can give floating-point cancellation. Use finite differences as a diagnostic.</div>
    `
  },
  {
    id: "common-mistakes",
    title: "16. Common mistakes and misleading notation",
    html: String.raw`
      <ul>
        <li><strong>Ignoring the derivative convention.</strong> A correct formula in one layout can look transposed in another.</li>
        <li><strong>Changing matrix order.</strong> \(AB\) and \(BA\) are generally different.</li>
        <li><strong>Treating softmax as element-wise.</strong> Its shared denominator creates off-diagonal derivatives.</li>
        <li><strong>Forgetting broadcast reductions.</strong> A shared bias receives the sum of all uses.</li>
        <li><strong>Confusing structural zeros with evaluated zeros.</strong> One means no dependency. The other depends on the current value.</li>
        <li><strong>Assuming ReLU has an ordinary derivative at zero.</strong> Software uses a chosen convention there.</li>
        <li><strong>Dropping a transpose.</strong> Always verify that a parameter gradient matches the parameter shape.</li>
        <li><strong>Forgetting shared-parameter accumulation.</strong> Add all paths that reach the same parameter.</li>
        <li><strong>Ignoring reduction scale.</strong> Sum and mean objectives differ by a batch-size factor.</li>
        <li><strong>Trusting algebra without a numerical check.</strong> Test a small example when you implement a new derivative.</li>
      </ul>
    `
  },
  {
    id: "recap",
    title: "17. Recap: shape is the grammar of matrix calculus",
    html: String.raw`
      <p>Separate structure from arithmetic. First identify inputs and outputs. Then write shapes and the derivative convention. Use Jacobians for vector-to-vector local change and multiply them in dependency order.</p>
      <p>Element-wise operations give diagonal Jacobians. Softmax and normalization couple coordinates. Forward broadcasts usually become backward reductions. Shared parameters collect all gradient paths. For a scalar objective, a parameter gradient has the same shape as the parameter.</p>
      <p>Finally, verify unfamiliar formulas twice: first with shape reasoning and then with a small finite-difference or directional check.</p>
      <p>The next lesson uses these ideas on computation graphs and automatic differentiation, where systems compute the required Jacobian products without building every full Jacobian.</p>
    `
  }
);
