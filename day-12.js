const day12 = COURSE[3].lessons[1];

Object.assign(day12, {
  published: true,
  summary: "Learn how convexity, constraints, Lagrange multipliers, duality, KKT conditions, and regularization turn difficult ML objectives into structured optimization problems.",
  explanation: "A constrained optimization problem asks for the best point inside an allowed region. Convexity gives strong guarantees: for a convex objective over a convex feasible set, every local minimum is global. Lagrange multipliers attach a numerical price to constraints. Duality turns the original, or primal, problem into a related optimization problem that gives bounds and often better interpretation. These ideas appear in support-vector machines, regularization, sparse learning, projected methods, proximal algorithms, and many theoretical ML papers.",
  topics: [
    "Convex sets",
    "Convex combinations",
    "Convex functions",
    "Strict and strong convexity",
    "Jensen’s inequality",
    "Convex losses",
    "Constrained optimization",
    "Equality and inequality constraints",
    "Lagrange multipliers",
    "Lagrangian",
    "Primal problem",
    "Dual function",
    "Dual problem",
    "Weak and strong duality",
    "Slater’s condition",
    "KKT conditions",
    "Regularization as a constraint",
    "L1 and L2 regularization",
    "Sparsity",
    "Proximal operators",
    "Coordinate descent",
    "Projected gradient descent",
    "Maximum margin and feature selection"
  ],
  sections: [
    {
      id: "convex-sets",
      title: "1. Convex sets contain every line segment between their points",
      html: String.raw`
        <p>Start with geometry. A set \(C\subseteq\mathbb{R}^d\) is <strong>convex</strong> when every point on the straight line segment between any two points in the set also stays in the set.</p>
        <p>For any \(x,y\in C\) and any \(\lambda\in[0,1]\), convexity requires</p>
        <p>\[\lambda x+(1-\lambda)y\in C.\]</p>
        <p>The number \(\lambda\) chooses a point between \(x\) and \(y\). When \(\lambda=0\), the result is \(y\). When \(\lambda=1\), the result is \(x\). When \(\lambda=1/2\), it is the midpoint.</p>
        <h3>Numerical example</h3>
        <p>Let \(C=\{x\in\mathbb{R}:0\le x\le 4\}\). Choose \(x=1\), \(y=4\), and \(\lambda=0.25\). Then</p>
        <p>\[0.25(1)+0.75(4)=3.25,\]</p>
        <p>which is still inside \([0,4]\).</p>
        <h3>Two-dimensional example</h3>
        <p>The disk \(C=\{x\in\mathbb{R}^2:\|x\|_2\le1\}\) is convex. If two points are inside the disk, the entire segment between them remains inside the disk. By contrast, a ring with a hole is not convex because a line segment can pass through the missing center.</p>
        <div class="paper-connection"><strong>Why this matters in ML papers.</strong> Constraints such as \(\|w\|_2\le c\), probability-simplex constraints, and many matrix-norm balls define convex feasible sets. Convex feasible geometry is one of the conditions that makes optimization theory clean.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Convex does not mean “curved outward” in an informal visual sense. It is a precise line-segment property. A half-space is convex even though its boundary is flat.</div>
      `
    },
    {
      id: "convex-combinations",
      title: "2. Convex combinations are weighted averages with nonnegative weights",
      html: String.raw`
        <p>A two-point convex combination has the form</p>
        <p>\[\lambda x+(1-\lambda)y,\qquad 0\le\lambda\le1.\]</p>
        <p>For many points \(x_1,\ldots,x_n\), a convex combination is</p>
        <p>\[\sum_{i=1}^{n}\alpha_i x_i,\qquad \alpha_i\ge0,\qquad \sum_{i=1}^{n}\alpha_i=1.\]</p>
        <p>The coefficients act like probabilities. They cannot be negative, and they sum to one.</p>
        <h3>Numerical example</h3>
        <p>Let \(x_1=(0,0)^\top\), \(x_2=(4,0)^\top\), and \(x_3=(0,2)^\top\). With weights \((0.2,0.3,0.5)\),</p>
        <p>\[0.2x_1+0.3x_2+0.5x_3=\begin{bmatrix}1.2\\1\end{bmatrix}.\]</p>
        <p>This point lies inside the triangle formed by the three inputs.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Attention outputs are convex combinations when attention weights are nonnegative and sum to one. If \(\alpha_i\) are softmax weights, then \(\sum_i\alpha_i v_i\) lies in the convex hull of the value vectors \(v_i\).</div>
        <div class="shape-check"><strong>Notation check.</strong> If each \(x_i\in\mathbb{R}^d\), then the convex combination is also in \(\mathbb{R}^d\). The weights are scalars.</div>
      `
    },
    {
      id: "convex-functions",
      title: "3. A convex function lies below every chord joining two graph points",
      html: String.raw`
        <p>A function \(f:C\to\mathbb{R}\) is convex on a convex set \(C\) when</p>
        <p>\[f(\lambda x+(1-\lambda)y)\le \lambda f(x)+(1-\lambda)f(y)\]</p>
        <p>for all \(x,y\in C\) and \(\lambda\in[0,1]\).</p>
        <p>The left side evaluates the function at an averaged input. The right side averages the two function values.</p>
        <h3>Example: a quadratic</h3>
        <p>Take \(f(x)=x^2\), \(x=0\), \(y=4\), and \(\lambda=1/2\). Then</p>
        <p>\[f(2)=4\le\frac12f(0)+\frac12f(4)=8.\]</p>
        <p>For a differentiable function, convexity also implies the first-order lower-bound property</p>
        <p>\[f(y)\ge f(x)+\nabla f(x)^\top(y-x).\]</p>
        <p>So every tangent hyperplane lies below the graph.</p>
        <h3>Second-order test</h3>
        <p>If \(f\) is twice differentiable, then a common sufficient and necessary condition on an open convex domain is</p>
        <p>\[\nabla^2 f(x)\succeq0.\]</p>
        <p>The Hessian must be positive semidefinite everywhere.</p>
        <div class="paper-connection"><strong>Why papers care.</strong> For a convex objective, any local minimum is also a global minimum. This removes one major source of ambiguity that exists in deep-network optimization.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A convex function need not be increasing. For example, \((x-3)^2\) decreases before \(x=3\) and increases after it, yet it is convex.</div>
      `
    },
    {
      id: "strict-strong-convexity",
      title: "4. Strict and strong convexity give stronger uniqueness and curvature guarantees",
      html: String.raw`
        <p><strong>Strict convexity</strong> replaces the convex inequality with a strict inequality for distinct points and \(0&lt;\lambda&lt;1\):</p>
        <p>\[f(\lambda x+(1-\lambda)y)&lt;\lambda f(x)+(1-\lambda)f(y).\]</p>
        <p>A strictly convex function has at most one minimizer on a convex domain.</p>
        <p><strong>Strong convexity</strong> adds a quantitative curvature lower bound. A differentiable function is \(\mu\)-strongly convex if</p>
        <p>\[f(y)\ge f(x)+\nabla f(x)^\top(y-x)+\frac{\mu}{2}\|y-x\|_2^2\]</p>
        <p>for some \(\mu&gt;0\).</p>
        <h3>Quadratic example</h3>
        <p>For \(f(x)=3x^2\), we have \(f''(x)=6\). Thus it is strongly convex with any \(\mu\le6\).</p>
        <p>For \(f(x)=x^4\), the function is strictly convex, but the curvature becomes zero at \(x=0\). It is not globally strongly convex on all of \(\mathbb{R}\) with a positive constant \(\mu\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Strong convexity appears in convergence-rate theorems. Adding an L2 penalty can make some linear-model objectives strongly convex and improve uniqueness and conditioning.</div>
        <div class="shape-check"><strong>Do not merge the terms.</strong> “Convex,” “strictly convex,” and “strongly convex” are different claims. Strong convexity is the strongest of these three.</div>
      `
    },
    {
      id: "jensen",
      title: "5. Jensen’s inequality moves a convex function outside an average",
      html: String.raw`
        <p>If \(f\) is convex and \(X\) is a random variable, Jensen’s inequality says</p>
        <p>\[f(\mathbb{E}[X])\le\mathbb{E}[f(X)].\]</p>
        <p>For discrete weights \(\alpha_i\ge0\) with \(\sum_i\alpha_i=1\),</p>
        <p>\[f\!\left(\sum_i\alpha_i x_i\right)\le\sum_i\alpha_i f(x_i).\]</p>
        <h3>Numerical example</h3>
        <p>Let \(X\) equal \(1\) or \(3\) with probability \(1/2\). Then \(\mathbb{E}[X]=2\). With \(f(x)=x^2\),</p>
        <p>\[f(\mathbb{E}[X])=4,\qquad \mathbb{E}[f(X)]=\frac{1+9}{2}=5.\]</p>
        <p>So \(4\le5\).</p>
        <div class="paper-connection"><strong>Why this matters for AI/ML papers.</strong> Jensen’s inequality is used to derive variational lower bounds such as the ELBO, to compare expectations, and to prove properties of log-likelihood objectives. The direction of the inequality depends on whether the function is convex or concave.</div>
        <div class="shape-check"><strong>Common notation trap.</strong> For concave \(f\), the inequality reverses. The logarithm is concave, so \(\mathbb{E}[\log X]\le\log\mathbb{E}[X]\) for positive \(X\).</div>
      `
    },
    {
      id: "convex-losses",
      title: "6. Many classical ML losses are convex in the model parameters",
      html: String.raw`
        <p>A loss can be convex in one argument but not another. Always identify the variable with respect to which convexity is claimed.</p>
        <h3>Squared error</h3>
        <p>For linear regression \(\hat y=w^\top x\), one-example squared loss is</p>
        <p>\[\ell(w)=(w^\top x-y)^2.\]</p>
        <p>This is convex in \(w\). Its Hessian is</p>
        <p>\[\nabla_w^2\ell(w)=2xx^\top\succeq0.\]</p>
        <h3>Logistic loss</h3>
        <p>For binary label \(y\in\{-1,+1\}\), logistic loss can be written</p>
        <p>\[\ell(w)=\log\bigl(1+e^{-y w^\top x}\bigr).\]</p>
        <p>It is convex in \(w\).</p>
        <h3>Hinge loss</h3>
        <p>The SVM hinge loss is</p>
        <p>\[\ell(w)=\max(0,1-yw^\top x).\]</p>
        <p>It is convex but not differentiable where \(yw^\top x=1\).</p>
        <div class="paper-connection"><strong>Paper-reading rule.</strong> A neural-network loss such as cross-entropy can be convex in the output logits but non-convex in all network weights because the logits are a nonlinear function of those weights.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> For \(w,x\in\mathbb{R}^d\), \(w^\top x\) is scalar, so each per-example loss is scalar and \(\nabla_w\ell\in\mathbb{R}^d\).</div>
      `
    },
    {
      id: "constrained-optimization",
      title: "7. Constrained optimization adds an allowed region to the objective",
      html: String.raw`
        <p>An unconstrained problem has the form</p>
        <p>\[\min_x f(x).\]</p>
        <p>A constrained problem adds conditions:</p>
        <p>\[\min_x f(x)\quad\text{subject to}\quad x\in C.\]</p>
        <p>The set \(C\) is the <strong>feasible set</strong>. A point is feasible only if it satisfies every constraint.</p>
        <h3>Numerical example</h3>
        <p>Consider</p>
        <p>\[\min_x (x-5)^2\quad\text{subject to}\quad x\le2.\]</p>
        <p>The unconstrained minimizer is \(x=5\), but it is infeasible. Over the feasible set \(( -\infty,2]\), the best point is the boundary point \(x^*=2\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Probability vectors must lie on the simplex, model weights can be norm-constrained, and fairness or resource limits can be written as constraints. The constraint changes what “best” means.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Solving the unconstrained problem first is useful for intuition, but the unconstrained minimizer is irrelevant if it violates the feasible set.</div>
      `
    }
  ]
});
