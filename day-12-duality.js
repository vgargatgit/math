(() => {
  const day12 = COURSE[3].lessons[1];
  day12.sections.push(
    {
      id: "equality-inequality-constraints",
      title: "8. Equality and inequality constraints use different multiplier rules",
      html: String.raw`
        <p>A standard constrained problem is written</p>
        <p>\[\min_x f(x)\]</p>
        <p>subject to</p>
        <p>\[h_j(x)=0,\quad j=1,\ldots,p,\]</p>
        <p>and</p>
        <p>\[g_i(x)\le0,\quad i=1,\ldots,m.\]</p>
        <p>The \(h_j\) are equality constraints. The \(g_i\) are inequality constraints.</p>
        <h3>Example</h3>
        <p>Suppose \(x=(x_1,x_2)^\top\) must lie on the line \(x_1+x_2=1\) and must also satisfy \(x_1\ge0\), \(x_2\ge0\). Write these as</p>
        <p>\[h(x)=x_1+x_2-1=0,\]</p>
        <p>\[g_1(x)=-x_1\le0,\qquad g_2(x)=-x_2\le0.\]</p>
        <p>This feasible set is the one-dimensional probability simplex for two classes.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Mixture weights, attention probabilities, and class probabilities often use nonnegativity plus a sum-to-one equality. Papers may enforce these constraints directly or use a parameterization such as softmax.</div>
        <div class="shape-check"><strong>Notation warning.</strong> Some texts write inequalities as \(g_i(x)\ge0\) instead of \(g_i(x)\le0\). This changes the sign convention for the associated multipliers.</div>
      `
    },
    {
      id: "lagrange-multipliers",
      title: "9. A Lagrange multiplier measures sensitivity to a constraint",
      html: String.raw`
        <p>For an equality-constrained problem</p>
        <p>\[\min_x f(x)\quad\text{subject to}\quad h(x)=0,\]</p>
        <p>introduce a multiplier \(\lambda\). At a regular optimum, the gradients satisfy</p>
        <p>\[\nabla f(x^*)+\lambda^*\nabla h(x^*)=0.\]</p>
        <p>This says the objective gradient cannot point along a feasible direction that would reduce the objective. Instead, it is balanced by the constraint normal.</p>
        <h3>Numerical example</h3>
        <p>Minimize</p>
        <p>\[f(x,y)=x^2+y^2\]</p>
        <p>subject to</p>
        <p>\[x+y=1.\]</p>
        <p>The constraint gradient is \((1,1)^\top\). The objective gradient is \((2x,2y)^\top\). Stationarity gives</p>
        <p>\[2x+\lambda=0,\qquad 2y+\lambda=0.\]</p>
        <p>Thus \(x=y\). Together with \(x+y=1\), we get</p>
        <p>\[x^*=y^*=\frac12.\]</p>
        <div class="paper-connection"><strong>Interpretation.</strong> Multipliers are often called shadow prices. Under suitable regularity, they describe how the optimal value changes when the right-hand side of a constraint changes slightly.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A multiplier is not an arbitrary tuning hyperparameter. In the constrained problem, it is a variable determined by optimality conditions.</div>
      `
    },
    {
      id: "lagrangian",
      title: "10. The Lagrangian combines the objective and constraints into one scalar function",
      html: String.raw`
        <p>For equality constraints \(h_j(x)=0\) and inequalities \(g_i(x)\le0\), define</p>
        <p>\[\mathcal{L}(x,\lambda,\nu)=f(x)+\sum_{i=1}^{m}\lambda_i g_i(x)+\sum_{j=1}^{p}\nu_j h_j(x),\]</p>
        <p>with inequality multipliers \(\lambda_i\ge0\). Equality multipliers \(\nu_j\) can have either sign.</p>
        <h3>Small example</h3>
        <p>For</p>
        <p>\[\min_x x^2\quad\text{subject to}\quad 1-x\le0,\]</p>
        <p>the feasible set is \(x\ge1\). The Lagrangian is</p>
        <p>\[\mathcal{L}(x,\lambda)=x^2+\lambda(1-x),\qquad \lambda\ge0.\]</p>
        <p>At the optimum \(x^*=1\), stationarity gives</p>
        <p>\[2x-\lambda=0\Rightarrow\lambda^*=2.\]</p>
        <div class="paper-connection"><strong>Why papers use it.</strong> The Lagrangian is the bridge between constraints and duality. SVM derivations, maximum-entropy models, optimal transport, constrained policy optimization, and many resource-allocation problems start here.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> The Lagrangian is scalar. If \(x\in\mathbb{R}^d\), then \(\nabla_x\mathcal{L}\in\mathbb{R}^d\). Each multiplier corresponds to one scalar constraint.</div>
      `
    },
    {
      id: "primal-problem",
      title: "11. The primal problem is the original optimization problem",
      html: String.raw`
        <p>The word <strong>primal</strong> simply identifies the original constrained problem. For example,</p>
        <p>\[p^*=\min_x f(x)\quad\text{subject to}\quad g_i(x)\le0,\ h_j(x)=0.\]</p>
        <p>The number \(p^*\) is the optimal primal value.</p>
        <h3>Example</h3>
        <p>For</p>
        <p>\[\min_x x^2\quad\text{subject to}\quad x\ge1,\]</p>
        <p>the primal solution is \(x^*=1\), and</p>
        <p>\[p^*=1.\]</p>
        <div class="paper-connection"><strong>Paper-reading rule.</strong> When a derivation says “form the dual,” first rewrite the primal clearly: objective, optimization variable, every constraint, and the sign convention.</div>
        <div class="shape-check"><strong>Common notation trap.</strong> Authors may use \(p^*\), \(P^*\), or \(J^*\) for the primal optimal value. Do not confuse the optimal value with the optimizer \(x^*\).</div>
      `
    },
    {
      id: "dual-function",
      title: "12. The dual function gives a lower bound on the primal optimum",
      html: String.raw`
        <p>For a minimization problem, the <strong>dual function</strong> is obtained by minimizing the Lagrangian over the primal variable:</p>
        <p>\[q(\lambda,\nu)=\inf_x\mathcal{L}(x,\lambda,\nu).\]</p>
        <p>For any dual-feasible \(\lambda\ge0\), this value is a lower bound on every feasible primal objective value.</p>
        <h3>Derive a dual function</h3>
        <p>Return to</p>
        <p>\[\mathcal{L}(x,\lambda)=x^2+\lambda(1-x).\]</p>
        <p>For fixed \(\lambda\), minimize over \(x\). Differentiate:</p>
        <p>\[\frac{\partial\mathcal{L}}{\partial x}=2x-\lambda=0\Rightarrow x=\frac{\lambda}{2}.\]</p>
        <p>Substitute back:</p>
        <p>\[q(\lambda)=\frac{\lambda^2}{4}+\lambda\left(1-\frac{\lambda}{2}\right)=\lambda-\frac{\lambda^2}{4}.\]</p>
        <p>So the dual function is a concave quadratic in \(\lambda\).</p>
        <div class="paper-connection"><strong>Key idea.</strong> The dual function can be useful even when the primal problem is not convex. It still provides a bound. What changes is whether the bound can become tight.</div>
        <div class="shape-check"><strong>Common mistake.</strong> The symbol \(\inf_x\) means minimize over the primal variable while holding the multipliers fixed.</div>
      `
    },
    {
      id: "dual-problem",
      title: "13. The dual problem chooses the best lower bound",
      html: String.raw`
        <p>Because each dual-feasible multiplier gives a lower bound, the dual problem maximizes that bound:</p>
        <p>\[d^*=\max_{\lambda\ge0,\nu} q(\lambda,\nu).\]</p>
        <p>For our example,</p>
        <p>\[q(\lambda)=\lambda-\frac{\lambda^2}{4},\qquad \lambda\ge0.\]</p>
        <p>Differentiate:</p>
        <p>\[q'(\lambda)=1-\frac{\lambda}{2}.\]</p>
        <p>The maximum occurs at \(\lambda^*=2\), giving</p>
        <p>\[d^*=q(2)=2-1=1.\]</p>
        <p>This matches the primal value \(p^*=1\).</p>
        <div class="paper-connection"><strong>Why dual problems matter.</strong> A dual can have fewer variables, reveal useful structure, expose support vectors, produce certificates or bounds, or enable distributed optimization.</div>
        <div class="shape-check"><strong>Direction rule.</strong> For a primal minimization problem, the usual Lagrange dual is a maximization problem.</div>
      `
    },
    {
      id: "weak-strong-duality",
      title: "14. Weak duality always gives a bound; strong duality says the bound is exact",
      html: String.raw`
        <p><strong>Weak duality</strong> says</p>
        <p>\[d^*\le p^*.\]</p>
        <p>The difference</p>
        <p>\[p^*-d^*\]</p>
        <p>is the <strong>duality gap</strong>.</p>
        <p><strong>Strong duality</strong> means</p>
        <p>\[d^*=p^*.\]</p>
        <h3>Numerical interpretation</h3>
        <p>If you know a primal feasible point with objective \(10.4\) and a dual feasible point with value \(10.1\), then</p>
        <p>\[10.1\le p^*\le10.4.\]</p>
        <p>Even without the exact optimum, you know it lies in a narrow interval of width \(0.3\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Dual bounds can certify near-optimality. In large optimization systems, primal-dual gaps are often used as stopping criteria.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Strong duality is not automatic for every constrained problem. It needs conditions.</div>
      `
    },
    {
      id: "slater-condition",
      title: "15. Slater’s condition is a practical route to strong duality for convex problems",
      html: String.raw`
        <p>For a convex optimization problem with convex inequality constraints and affine equality constraints, a common sufficient condition for strong duality is <strong>Slater’s condition</strong>.</p>
        <p>Informally, there must exist a point that satisfies every inequality strictly:</p>
        <p>\[g_i(x)&lt;0\quad\text{for all }i,\]</p>
        <p>while also satisfying all equality constraints.</p>
        <h3>Example</h3>
        <p>Consider the constraint</p>
        <p>\[x^2-4\le0.\]</p>
        <p>The feasible set is \([-2,2]\). The point \(x=0\) satisfies</p>
        <p>\[0^2-4=-4&lt;0,\]</p>
        <p>so it is strictly feasible.</p>
        <div class="paper-connection"><strong>Why this matters.</strong> When a paper claims strong duality for a convex program, look for a constraint qualification such as Slater’s condition. It explains why KKT conditions can be both necessary and sufficient.</div>
        <div class="shape-check"><strong>Nuance.</strong> Slater’s condition is sufficient in the standard convex setting, not a universal necessary condition for every problem.</div>
      `
    },
    {
      id: "kkt-conditions",
      title: "16. KKT conditions combine feasibility, stationarity, and active-constraint logic",
      html: String.raw`
        <p>For</p>
        <p>\[\min_x f(x)\quad\text{subject to}\quad g_i(x)\le0,\ h_j(x)=0,\]</p>
        <p>the Karush-Kuhn-Tucker conditions are:</p>
        <ol>
          <li><strong>Primal feasibility:</strong> \(g_i(x^*)\le0\) and \(h_j(x^*)=0\).</li>
          <li><strong>Dual feasibility:</strong> \(\lambda_i^*\ge0\).</li>
          <li><strong>Stationarity:</strong> \(\nabla_x\mathcal{L}(x^*,\lambda^*,\nu^*)=0\).</li>
          <li><strong>Complementary slackness:</strong> \(\lambda_i^*g_i(x^*)=0\).</li>
        </ol>
        <h3>Example</h3>
        <p>For \(\min_x x^2\) subject to \(1-x\le0\), the optimum is \(x^*=1\). We found \(\lambda^*=2\).</p>
        <p>Check:</p>
        <p>\[1-x^*=0\le0,\qquad \lambda^*=2\ge0,\]</p>
        <p>\[2x^*-\lambda^*=2-2=0,\]</p>
        <p>\[\lambda^*(1-x^*)=2\cdot0=0.\]</p>
        <p>All four conditions hold.</p>
        <h3>Inactive constraint intuition</h3>
        <p>If an inequality has slack, so \(g_i(x^*)&lt;0\), complementary slackness forces \(\lambda_i^*=0\). An inactive constraint has zero multiplier.</p>
        <div class="paper-connection"><strong>ML connection.</strong> KKT conditions explain the support-vector structure of SVMs: only examples with active margin constraints can have nonzero dual multipliers.</div>
        <div class="shape-check"><strong>Common mistake.</strong> KKT conditions are not automatically sufficient in non-convex problems. In convex problems with suitable regularity, they characterize the optimum much more strongly.</div>
      `
    }
  );
})();
