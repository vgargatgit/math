(() => {
  const day12 = COURSE[3].lessons[1];
  day12.sections.push(
    {
      id: "regularization-as-constraint",
      title: "17. Regularization and norm constraints are two views of model complexity control",
      html: String.raw`
        <p>Consider the constrained problem</p>
        <p>\[\min_w L(w)\quad\text{subject to}\quad R(w)\le c.\]</p>
        <p>Its Lagrangian contains</p>
        <p>\[L(w)+\lambda(R(w)-c).\]</p>
        <p>For fixed \(\lambda\), the constant term \(-\lambda c\) does not change the minimizing \(w\). This motivates the penalized form</p>
        <p>\[\min_w L(w)+\lambda R(w).\]</p>
        <p>Under suitable conditions, changing the radius \(c\) corresponds to changing a penalty weight \(\lambda\).</p>
        <h3>Numerical intuition</h3>
        <p>If an unconstrained fit prefers \(\|w\|_2=12\) but the constraint says \(\|w\|_2\le3\), the optimizer must trade training loss against parameter size. A penalty such as \(\lambda\|w\|_2^2\) creates a similar trade-off without an explicit hard boundary.</p>
        <div class="paper-connection"><strong>Why this matters.</strong> Papers move between constrained and penalized forms because one can be easier to analyze and the other easier to optimize.</div>
        <div class="shape-check"><strong>Common mistake.</strong> The mapping between \(c\) and \(\lambda\) is not generally a simple closed-form identity. The formulations are related, not numerically interchangeable term by term.</div>
      `
    },
    {
      id: "l1-l2-regularization",
      title: "18. L1 and L2 regularization penalize parameter size in different geometries",
      html: String.raw`
        <p>L2 regularization uses</p>
        <p>\[R_2(w)=\|w\|_2^2=\sum_j w_j^2.\]</p>
        <p>L1 regularization uses</p>
        <p>\[R_1(w)=\|w\|_1=\sum_j |w_j|.\]</p>
        <h3>Numerical comparison</h3>
        <p>For \(w=(3,-4)^\top\),</p>
        <p>\[\|w\|_1=7,\qquad \|w\|_2=5,\qquad \|w\|_2^2=25.\]</p>
        <p>The gradient of \(\lambda\|w\|_2^2\) is</p>
        <p>\[2\lambda w.\]</p>
        <p>L1 is not differentiable at zero. Away from zero, its derivative is the sign:</p>
        <p>\[\frac{d}{dw}|w|=\operatorname{sign}(w).\]</p>
        <div class="paper-connection"><strong>ML connection.</strong> L2 is common in linear models and neural networks. L1 is common when sparse coefficients or feature selection are desired.</div>
        <div class="shape-check"><strong>Notation warning.</strong> Some libraries call a parameter “weight decay” even when the optimizer implements decoupled decay rather than adding an exact L2 penalty to the objective. Read the optimizer definition.</div>
      `
    },
    {
      id: "sparsity",
      title: "19. L1 geometry can drive coefficients exactly to zero",
      html: String.raw`
        <p>A vector is <strong>sparse</strong> when many entries are exactly zero. Sparse models can be easier to interpret and cheaper to store or evaluate.</p>
        <p>The L1 ball in two dimensions is</p>
        <p>\[|w_1|+|w_2|\le c.\]</p>
        <p>Its boundary has corners on the coordinate axes. When loss contours first touch this feasible set, the contact often occurs at a corner, where one coordinate is zero.</p>
        <h3>Small optimization example</h3>
        <p>Consider the scalar problem</p>
        <p>\[\min_w \frac12(w-3)^2+\lambda|w|.\]</p>
        <p>For \(\lambda=1\), the solution is \(w^*=2\). For \(\lambda=4\), the penalty is strong enough that the solution becomes \(w^*=0\).</p>
        <div class="paper-connection"><strong>Feature-selection connection.</strong> In linear models, a zero coefficient removes that feature from the prediction equation. This is why L1-regularized regression is often discussed as embedded feature selection.</div>
        <div class="shape-check"><strong>Common mistake.</strong> L1 encourages sparsity but does not guarantee a particular number of zeros for every dataset and every \(\lambda\).</div>
      `
    },
    {
      id: "proximal-operators",
      title: "20. Proximal operators handle nonsmooth penalties with a small auxiliary optimization",
      html: String.raw`
        <p>Gradient descent assumes a differentiable objective. For a composite objective</p>
        <p>\[F(x)=f(x)+\lambda R(x),\]</p>
        <p>where \(f\) is smooth but \(R\) may be nonsmooth, proximal gradient uses</p>
        <p>\[z=x_t-\eta\nabla f(x_t),\]</p>
        <p>then</p>
        <p>\[x_{t+1}=\operatorname{prox}_{\eta\lambda R}(z).\]</p>
        <p>The proximal operator is</p>
        <p>\[\operatorname{prox}_{\tau R}(z)=\arg\min_x\left(R(x)+\frac{1}{2\tau}\|x-z\|_2^2\right).\]</p>
        <h3>L1 gives soft thresholding</h3>
        <p>For \(R(x)=\|x\|_1\), the proximal operator acts elementwise:</p>
        <p>\[\operatorname{soft}(z,\tau)=\operatorname{sign}(z)\max(|z|-\tau,0).\]</p>
        <p>If \(z=(3,-0.4,1.2)^\top\) and \(\tau=1\), then</p>
        <p>\[\operatorname{soft}(z,1)=(2,0,0.2)^\top.\]</p>
        <div class="paper-connection"><strong>ML connection.</strong> Proximal methods appear in sparse coding, Lasso, matrix completion, and structured regularization.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> The proximal result has the same shape as \(z\). For separable penalties such as L1, each coordinate can be updated independently.</div>
      `
    },
    {
      id: "coordinate-descent",
      title: "21. Coordinate descent optimizes one parameter or block at a time",
      html: String.raw`
        <p>Coordinate descent holds most variables fixed and updates one coordinate at a time. For \(x\in\mathbb{R}^d\), one step may optimize only \(x_j\).</p>
        <h3>Quadratic example</h3>
        <p>Let</p>
        <p>\[f(x,y)=(x-2)^2+2(y+1)^2.\]</p>
        <p>Start at \((0,0)\). Optimize \(x\) while keeping \(y=0\). The best value is \(x=2\), giving \((2,0)\). Then optimize \(y\) while keeping \(x=2\). The best value is \(y=-1\). After one sweep, we reach \((2,-1)\).</p>
        <p>For coupled objectives, several sweeps may be needed.</p>
        <div class="paper-connection"><strong>Why this matters.</strong> Coordinate descent is effective for some sparse linear models because each coordinate update can have a cheap closed form, especially with L1 penalties.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Coordinate descent is not the same as stochastic gradient descent. SGD samples data examples. Coordinate descent chooses parameter coordinates or blocks.</div>
      `
    },
    {
      id: "projected-gradient",
      title: "22. Projected gradient descent takes a gradient step and then returns to the feasible set",
      html: String.raw`
        <p>Suppose we want to minimize \(f(x)\) subject to \(x\in C\). Projected gradient descent uses</p>
        <p>\[z_{t+1}=x_t-\eta\nabla f(x_t),\]</p>
        <p>then projects back:</p>
        <p>\[x_{t+1}=\Pi_C(z_{t+1}),\]</p>
        <p>where</p>
        <p>\[\Pi_C(z)=\arg\min_{x\in C}\|x-z\|_2.\]</p>
        <h3>One-dimensional example</h3>
        <p>Minimize \(f(x)=(x-5)^2\) subject to \(0\le x\le2\). Start from \(x_0=1\) with \(\eta=0.5\). Since \(f'(1)=-8\), the raw step is</p>
        <p>\[z_1=1-0.5(-8)=5.\]</p>
        <p>But \(5\) is infeasible. Projection onto \([0,2]\) gives</p>
        <p>\[x_1=2.\]</p>
        <div class="paper-connection"><strong>ML connection.</strong> Projected methods are used for norm-bounded adversarial perturbations, simplex-constrained variables, and constrained parameter estimation.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Clipping each coordinate is a projection only for box constraints. Projection onto an L2 ball or simplex uses different formulas.</div>
      `
    },
    {
      id: "maximum-margin-feature-selection",
      title: "23. Maximum margin and feature selection show why duality and regularization matter in ML",
      html: String.raw`
        <h3>Maximum-margin classification</h3>
        <p>For labeled data \((x_i,y_i)\) with \(y_i\in\{-1,+1\}\), the hard-margin SVM primal can be written</p>
        <p>\[\min_{w,b}\frac12\|w\|_2^2\]</p>
        <p>subject to</p>
        <p>\[y_i(w^\top x_i+b)\ge1\quad\text{for every }i.\]</p>
        <p>Minimizing \(\|w\|_2\) under these constraints maximizes the geometric margin.</p>
        <p>The dual introduces one multiplier \(\alpha_i\ge0\) per training example. At the solution,</p>
        <p>\[w=\sum_i\alpha_i y_i x_i.\]</p>
        <p>Only examples with nonzero \(\alpha_i\) contribute. These are the support vectors.</p>
        <h3>Shape reasoning</h3>
        <p>If \(x_i\in\mathbb{R}^d\), then \(w\in\mathbb{R}^d\). Each \(\alpha_i\) is scalar. The weighted sum therefore has the correct shape.</p>
        <h3>Feature selection</h3>
        <p>A linear model with L1 regularization solves a problem such as</p>
        <p>\[\min_w L(w)+\lambda\|w\|_1.\]</p>
        <p>If some entries of \(w\) become exactly zero, the corresponding input features no longer affect the prediction.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> SVMs show how constraints and dual variables identify important examples. L1 methods show how nonsmooth regularization can identify important features. Both are classic examples of optimization structure becoming model structure.</div>
        <div class="shape-check"><strong>Common notation trap.</strong> In SVM derivations, \(\alpha_i\) are dual variables, not learning rates or attention weights. The same Greek letter can mean unrelated things in different papers.</div>
      `
    },
    {
      id: "common-mistakes-recap",
      title: "24. Common mistakes and a compact paper-reading checklist",
      html: String.raw`
        <h3>Common mistakes</h3>
        <ul>
          <li>Assuming every constrained problem is convex.</li>
          <li>Assuming every convex problem automatically has strong duality.</li>
          <li>Forgetting the sign convention for inequality constraints.</li>
          <li>Confusing a primal optimizer \(x^*\) with the primal optimal value \(p^*\).</li>
          <li>Assuming a nonzero multiplier can belong to a slack inequality. Complementary slackness forbids this at a KKT point.</li>
          <li>Treating L1 as differentiable at zero.</li>
          <li>Calling all weight decay “L2 regularization” without checking the optimizer implementation.</li>
          <li>Assuming coordinate-wise clipping is the projection for every feasible set.</li>
        </ul>
        <h3>When you meet a constrained objective in a paper</h3>
        <ol>
          <li>Write the optimization variable and its shape.</li>
          <li>Write the objective as a scalar function.</li>
          <li>List each equality and inequality constraint.</li>
          <li>Check whether the objective and feasible set are convex.</li>
          <li>Write the Lagrangian using the paper’s sign convention.</li>
          <li>Identify primal and dual variables separately.</li>
          <li>Ask whether strong duality is justified.</li>
          <li>If KKT conditions appear, check all four groups.</li>
          <li>If regularization appears, ask whether it is a penalty, a hard constraint, or an optimizer-specific decay rule.</li>
        </ol>
        <div class="paper-connection"><strong>Recap.</strong> Convexity gives geometry and global guarantees. Constraints define the allowed region. Lagrange multipliers encode the effect of constraints. The dual gives bounds and sometimes an easier problem. KKT conditions connect primal feasibility, dual feasibility, stationarity, and active constraints. Regularization, proximal methods, coordinate descent, and projected gradient descent turn these ideas into practical ML algorithms.</div>
      `
    }
  );
})();
