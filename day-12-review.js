(() => {
  const day12 = COURSE[3].lessons[1];

  day12.examples = [
    ["Check whether a midpoint stays feasible", String.raw`For the set \(C=\{(x_1,x_2):x_1\ge0,x_2\ge0,x_1+x_2\le1\}\), take \(a=(1,0)^\top\) and \(b=(0,1)^\top\). Their midpoint is \((0.5,0.5)^\top\), which satisfies every constraint, including \(0.5+0.5=1\).`],
    ["Use Jensen on a two-point distribution", String.raw`If \(X\in\{0,2\}\) with equal probability and \(f(x)=e^x\), then \(f(E[X])=e\), while \(E[f(X)]=(1+e^2)/2\). Since exponential is convex, \(e\le(1+e^2)/2\).`],
    ["Solve an equality-constrained minimum", String.raw`Minimize \(x^2+y^2\) subject to \(x+y=6\). The Lagrangian is \(x^2+y^2+\nu(x+y-6)\). Stationarity gives \(2x+\nu=0\) and \(2y+\nu=0\), so \(x=y\). The constraint gives \(x=y=3\).`],
    ["Build a dual function", String.raw`For \(\min_x x^2\) subject to \(2-x\le0\), \(L=x^2+\lambda(2-x)\). Minimizing over \(x\) gives \(x=\lambda/2\), so \(q(\lambda)=2\lambda-\lambda^2/4\). Maximizing over \(\lambda\ge0\) gives \(\lambda^*=4\) and \(d^*=4\), matching \(p^*=4\).`],
    ["Check complementary slackness", String.raw`If a KKT point has inequality \(g(x^*)=-3&lt;0\), then \(\lambda^*g(x^*)=0\) forces \(\lambda^*=0\). A strictly inactive constraint cannot carry a positive multiplier.`],
    ["Compare L1 and L2 penalties", String.raw`For \(w=(2,-1,0)^\top\), \(\|w\|_1=3\) while \(\|w\|_2^2=5\). With \(\lambda=0.1\), the penalties are \(0.3\) and \(0.5\), respectively. Their numerical scales differ, so the same \(\lambda\) does not mean the same regularization strength.`],
    ["Soft-threshold a vector", String.raw`For \(z=(2.5,-0.6,-3)^\top\) and threshold \(1\), soft thresholding gives \((1.5,0,-2)^\top\). The small second coordinate becomes exactly zero.`],
    ["Project onto an interval", String.raw`Project \(z=-2.4\) onto \([0,3]\). The closest feasible point is \(0\). For \(z=1.7\), the projection is \(1.7\) because it is already feasible.`],
    ["Interpret an SVM support vector", String.raw`If an SVM dual solution has \(\alpha=(0,1.2,0,0.4)\), only examples 2 and 4 contribute to \(w=\sum_i\alpha_i y_i x_i\). These are support vectors.`],
    ["Shape-check a dual representation", String.raw`If each feature vector \(x_i\in\mathbb{R}^{50}\), then every term \(\alpha_i y_i x_i\in\mathbb{R}^{50}\), and therefore \(w=\sum_i\alpha_i y_i x_i\in\mathbb{R}^{50}\).`],
    ["Regularization as a constrained trade-off", String.raw`If \(\min_w L(w)\) subject to \(\|w\|_2^2\le9\) has an active boundary, its Lagrangian contains \(L(w)+\lambda(\|w\|_2^2-9)\). For fixed \(\lambda\), the constant \(-9\lambda\) does not affect which \(w\) minimizes the expression.`],
    ["Convex but nondifferentiable", String.raw`The function \(f(x)=|x|\) is convex but has no ordinary derivative at \(x=0\). Its subgradient set at zero is \([-1,1]\). Convex optimization can therefore include nonsmooth objectives.`],
    ["Strong convexity from a Hessian", String.raw`For \(f(x)=\frac12x^\top Hx\) with symmetric \(H\), if the smallest eigenvalue of \(H\) is \(0.7\), then \(f\) is \(0.7\)-strongly convex.`],
    ["Bound the optimum with primal and dual values", String.raw`If a feasible primal point gives \(p=12.6\) and a feasible dual point gives \(d=12.4\), then weak duality implies \(12.4\le p^*\le12.6\). The current certificate gap is at most \(0.2\).`]
  ];

  day12.practice = [
    String.raw`State the definition of a convex set. <details><summary>Answer</summary><p>A set \(C\) is convex if \(\lambda x+(1-\lambda)y\in C\) for every \(x,y\in C\) and every \(\lambda\in[0,1]\).</p></details>`,
    String.raw`Is the set \(\{-2,2\}\subset\mathbb{R}\) convex? <details><summary>Answer</summary><p>No. The midpoint \(0\) is not in the set.</p></details>`,
    String.raw`For \(f(x)=x^2\), verify Jensen’s inequality for \(x=1\), \(y=5\), and equal weights. <details><summary>Solution</summary><p>The midpoint is \(3\). Thus \(f(3)=9\), while \((f(1)+f(5))/2=(1+25)/2=13\). Hence \(9\le13\).</p></details>`,
    String.raw`What is the difference between strict convexity and strong convexity? <details><summary>Answer</summary><p>Strict convexity gives a strict chord inequality for distinct points. Strong convexity additionally gives a quantitative quadratic curvature lower bound with some \(\mu&gt;0\).</p></details>`,
    String.raw`Write the inequality \(x\ge3\) in the standard \(g(x)\le0\) form. <details><summary>Answer</summary><p>Use \(g(x)=3-x\le0\).</p></details>`,
    String.raw`Minimize \(x^2+y^2\) subject to \(x+y=4\). <details><summary>Solution</summary><p>Use \(\mathcal L=x^2+y^2+\nu(x+y-4)\). Stationarity gives \(2x+\nu=0\) and \(2y+\nu=0\), so \(x=y\). The constraint gives \(x=y=2\).</p></details>`,
    String.raw`For a primal minimization problem, what does weak duality say? <details><summary>Answer</summary><p>Every dual-feasible value is a lower bound on the primal optimum, so \(d^*\le p^*\).</p></details>`,
    String.raw`What is the duality gap? <details><summary>Answer</summary><p>For the usual primal-minimization and dual-maximization pair, it is \(p^*-d^*\). Strong duality means this gap is zero.</p></details>`,
    String.raw`List the four KKT condition groups. <details><summary>Answer</summary><p>Primal feasibility, dual feasibility, stationarity, and complementary slackness.</p></details>`,
    String.raw`If \(g_i(x^*)&lt;0\) at a KKT point, what must be true of \(\lambda_i^*\)? <details><summary>Answer</summary><p>Complementary slackness forces \(\lambda_i^*=0\).</p></details>`,
    String.raw`Why can L1 regularization produce exact zeros more readily than L2? <details><summary>Answer</summary><p>The L1 penalty is nonsmooth at zero and its constraint ball has axis-aligned corners. Proximal L1 updates use soft thresholding, which maps a whole interval of small values exactly to zero.</p></details>`,
    String.raw`Apply soft thresholding with threshold \(0.5\) to \((1.2,-0.3,-2)^\top\). <details><summary>Solution</summary><p>The result is \((0.7,0,-1.5)^\top\).</p></details>`,
    String.raw`A projected-gradient raw step produces \(z=7\), but the feasible set is \([1,4]\). What is the projected point? <details><summary>Answer</summary><p>It is \(4\), the closest point in the interval.</p></details>`,
    String.raw`How does coordinate descent differ from SGD? <details><summary>Answer</summary><p>Coordinate descent chooses parameter coordinates or blocks to update. SGD chooses data samples or mini-batches to estimate a gradient.</p></details>`,
    String.raw`In the hard-margin SVM dual representation \(w=\sum_i\alpha_i y_i x_i\), what is special about examples with \(\alpha_i&gt;0\)? <details><summary>Answer</summary><p>They are support vectors. They are the training examples that determine the maximum-margin separator.</p></details>`,
    String.raw`A paper writes \(\min_w L(w)+\lambda\|w\|_2^2\). Name one question you should ask before calling this “weight decay.” <details><summary>Answer</summary><p>Ask whether the implementation truly adds an L2 penalty to the objective or uses a decoupled optimizer update such as AdamW-style weight decay.</p></details>`
  ];
})();
