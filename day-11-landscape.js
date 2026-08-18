day11.sections.push(
  {
    id: "smoothness",
    title: "8. Smoothness limits how quickly the gradient can change",
    html: String.raw`
      <p>A differentiable objective is called <strong>smooth</strong> when its gradient does not change arbitrarily fast. One common definition says that \(J\) is \(L\)-smooth if</p>
      <p>\[\|\nabla J(x)-\nabla J(y)\|_2\le L\|x-y\|_2\quad\text{for all }x,y.\]</p>
      <p>The constant \(L\) limits how sharply the slope can change. A larger \(L\) means stronger possible curvature and usually requires a smaller safe learning rate.</p>
      <h3>Simple example</h3>
      <p>For \(J(w)=aw^2/2\),</p>
      <p>\[J'(w)=aw.\]</p>
      <p>Therefore,</p>
      <p>\[|J'(x)-J'(y)|=a|x-y|.\]</p>
      <p>So the function is \(L\)-smooth with \(L=a\). If \(a=20\), the gradient changes twenty times as fast as position changes.</p>
      <div class="paper-connection"><strong>Why this matters in papers.</strong> Statements such as “assume the objective has an \(L\)-Lipschitz gradient” are smoothness assumptions. They let authors bound how much the loss can change after one gradient step.</div>
      <div class="shape-check"><strong>Common confusion.</strong> Smoothness here is not a visual word. It is a precise bound on gradient change. A function can look smooth on a plot and still have a large smoothness constant.</div>
    `
  },
  {
    id: "lipschitz-continuity",
    title: "9. Lipschitz continuity bounds how fast a function or gradient can move",
    html: String.raw`
      <p>A function \(f\) is <strong>Lipschitz continuous</strong> with constant \(K\) if</p>
      <p>\[|f(x)-f(y)|\le K\|x-y\|.\]</p>
      <p>This says that the output cannot change faster than \(K\) times the input distance.</p>
      <p>Do not confuse a Lipschitz function with a function that has a Lipschitz gradient. The second condition is usually called smoothness.</p>
      <h3>Numerical example</h3>
      <p>For \(f(x)=3x\),</p>
      <p>\[|f(x)-f(y)|=3|x-y|,\]</p>
      <p>so \(K=3\) works. If \(x=2\) and \(y=2.5\), the input changes by \(0.5\), and the output changes by \(1.5\).</p>
      <p>ReLU, \(f(x)=\max(0,x)\), is 1-Lipschitz because its slope is never larger than 1 in magnitude.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Lipschitz bounds appear in robustness, Wasserstein GANs, stability analyses, and optimization proofs. They control sensitivity to perturbations.</div>
      <div class="shape-check"><strong>Notation warning.</strong> Authors often use \(L\) for both a loss and a Lipschitz constant. Context decides which meaning is intended.</div>
    `
  },
  {
    id: "convex-nonconvex",
    title: "10. Convex objectives have a simple global geometry; neural-network objectives usually do not",
    html: String.raw`
      <p>A function \(J\) is <strong>convex</strong> if, for all \(x,y\) and \(0\le\lambda\le1\),</p>
      <p>\[J(\lambda x+(1-\lambda)y)\le \lambda J(x)+(1-\lambda)J(y).\]</p>
      <p>Geometrically, the line segment between two points on the graph stays above the function.</p>
      <h3>Convex example</h3>
      <p>For \(J(w)=w^2\), take \(x=-2\), \(y=2\), and \(\lambda=1/2\):</p>
      <p>\[J(0)=0\le\tfrac12J(-2)+\tfrac12J(2)=4.\]</p>
      <p>A useful property is that every local minimum of a convex function is also global.</p>
      <h3>Non-convex example</h3>
      <p>For</p>
      <p>\[J(w)=(w^2-1)^2,\]</p>
      <p>the minima are at \(w=-1\) and \(w=1\), while \(w=0\) is a stationary point with different local geometry. Neural-network losses are usually non-convex because layers multiply parameters and pass them through nonlinear functions.</p>
      <div class="paper-connection"><strong>Why this matters.</strong> Convex optimization has strong global guarantees. Deep-learning optimization usually relies on weaker local or empirical statements, such as reaching a low training loss or a stationary point.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Non-convex does not mean impossible to optimize. It means the simple global guarantees from convex analysis no longer apply automatically.</div>
    `
  },
  {
    id: "local-global-minima",
    title: "11. Local and global minima answer different optimization questions",
    html: String.raw`
      <p>A point \(\theta^*\) is a <strong>local minimum</strong> if nearby points do not have lower objective value. It is a <strong>global minimum</strong> if no point anywhere in the parameter space has a lower value.</p>
      <h3>Numerical picture</h3>
      <p>Imagine a one-dimensional function with</p>
      <p>\[J(-2)=0.4,\qquad J(1)=0.1.\]</p>
      <p>If both points sit at bottoms of separate valleys, then both can be local minima. Only \(w=1\) is global because \(0.1&lt;0.4\).</p>
      <p>For differentiable functions, an interior local minimum normally satisfies</p>
      <p>\[\nabla J(\theta^*)=0.\]</p>
      <p>But the reverse statement is false: zero gradient does not by itself prove a minimum.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Papers rarely prove that a large neural network reaches a global minimum of population risk. More common claims concern optimization error, stationary points, training loss, or generalization after practical training.</div>
      <div class="shape-check"><strong>Reading rule.</strong> When you see “optimal,” ask whether it means local optimum, global optimum, best observed validation result, or optimum under an approximation.</div>
    `
  },
  {
    id: "saddles-plateaus",
    title: "12. Saddles and plateaus can make a small gradient misleading",
    html: String.raw`
      <p>A <strong>saddle point</strong> is stationary but curves upward in some directions and downward in others. A <strong>plateau</strong> is a region where the objective changes only slowly.</p>
      <h3>Saddle example</h3>
      <p>Let</p>
      <p>\[J(x,y)=x^2-y^2.\]</p>
      <p>Then</p>
      <p>\[\nabla J=\begin{bmatrix}2x\\-2y\end{bmatrix},\]</p>
      <p>so \(\nabla J(0,0)=0\). Along the \(x\)-axis, \(J=x^2\ge0\). Along the \(y\)-axis, \(J=-y^2\le0\). The origin is not a minimum.</p>
      <h3>Plateau example</h3>
      <p>For a saturated sigmoid, large positive inputs produce outputs very close to 1 and derivatives close to 0. A network can therefore have small gradients even when the model is not near a useful solution.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Momentum, normalization, residual connections, and careful initialization can help training move through regions with weak or badly scaled gradients.</div>
      <div class="shape-check"><strong>Common mistake.</strong> A tiny gradient can mean convergence, a saddle, saturation, a plateau, or numerical underflow. Do not infer success from gradient magnitude alone.</div>
    `
  },
  {
    id: "gradient-noise",
    title: "13. Mini-batch gradients are noisy estimates of the full gradient",
    html: String.raw`
      <p>Let the full gradient be \(g=\nabla J(\theta)\). A mini-batch produces an estimate \(\hat g\). We can write</p>
      <p>\[\hat g=g+\varepsilon,\]</p>
      <p>where \(\varepsilon\) is the gradient-estimation error for that batch.</p>
      <h3>Numerical example</h3>
      <p>Suppose the full gradient is \(g=2\). Four different mini-batches might produce</p>
      <p>\[1.4,\quad2.7,\quad1.8,\quad2.1.\]</p>
      <p>The estimates fluctuate around the full gradient. A larger batch usually reduces this variance because more examples are averaged.</p>
      <p>Noise is not always harmful. It can prevent the optimizer from following one deterministic path and can help it move out of shallow regions. But excessive noise can make progress erratic.</p>
      <div class="paper-connection"><strong>Why this matters in papers.</strong> Batch size, data order, random seed, and gradient accumulation affect gradient noise. Optimization comparisons are incomplete if these settings differ substantially.</div>
      <div class="shape-check"><strong>Common mistake.</strong> An unbiased stochastic gradient can still have high variance. “Unbiased” means its expectation is correct, not that each batch gives a close estimate.</div>
    `
  },
  {
    id: "momentum",
    title: "14. Momentum averages directions over time and reduces zig-zag motion",
    html: String.raw`
      <p>One common momentum form is</p>
      <p>\[v_t=\beta v_{t-1}+g_t,\qquad \theta_{t+1}=\theta_t-\eta v_t.\]</p>
      <p>The velocity \(v_t\) keeps part of previous gradients. The coefficient \(0\le\beta&lt;1\) controls memory.</p>
      <h3>Numerical example</h3>
      <p>Let \(\beta=0.9\), \(v_0=0\), and suppose the first two gradients are \(g_1=2\) and \(g_2=2\). Then</p>
      <p>\[v_1=2,\qquad v_2=0.9(2)+2=3.8.\]</p>
      <p>With \(\eta=0.1\), the second update magnitude is \(0.38\), larger than the plain-gradient step \(0.2\). Persistent directions build speed.</p>
      <p>If gradients alternate in sign, previous velocity can partially cancel the oscillation.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Momentum is useful in long narrow valleys where one direction changes sign frequently but another direction consistently points downhill.</div>
      <div class="shape-check"><strong>Notation trap.</strong> Some definitions use \(v_t=\beta v_{t-1}+(1-\beta)g_t\). Others omit \((1-\beta)\). The effective learning-rate scale therefore differs.</div>
    `
  },
  {
    id: "nesterov",
    title: "15. Nesterov momentum evaluates the gradient after looking ahead",
    html: String.raw`
      <p>Nesterov momentum modifies ordinary momentum by computing the gradient near the point that momentum is about to reach. One conceptual form is</p>
      <p>\[g_t=\nabla J(\theta_t-\eta\beta v_{t-1}),\]</p>
      <p>followed by a momentum update.</p>
      <p>The exact algebra varies between libraries, but the idea is stable: <strong>look ahead, then correct</strong>.</p>
      <h3>Small example</h3>
      <p>Suppose \(\theta_t=5\), \(\eta=0.1\), \(\beta v_{t-1}=2\). The look-ahead point is</p>
      <p>\[5-0.1(2)=4.8.\]</p>
      <p>If the objective is \(J(w)=w^2\), the ordinary gradient at 5 is 10, while the look-ahead gradient is \(9.6\). Nesterov uses information from the anticipated position instead of only the current one.</p>
      <div class="paper-connection"><strong>Why this matters.</strong> Nesterov acceleration has strong results in convex optimization and appears in practical SGD variants. In papers, verify the precise update because frameworks implement equivalent-looking conventions differently.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Nesterov is not simply “more momentum.” The defining distinction is where the gradient is evaluated.</div>
    `
  },
  {
    id: "adagrad",
    title: "16. AdaGrad gives smaller steps to coordinates with large accumulated gradients",
    html: String.raw`
      <p>AdaGrad keeps a running sum of squared gradients for each parameter coordinate:</p>
      <p>\[s_t=s_{t-1}+g_t\odot g_t.\]</p>
      <p>The update uses</p>
      <p>\[\theta_{t+1}=\theta_t-\eta\frac{g_t}{\sqrt{s_t}+\epsilon}.\]</p>
      <p>All operations in the fraction are element-wise.</p>
      <h3>Two-coordinate example</h3>
      <p>Let \(g_1=(4,1)^\top\), \(s_0=0\). Then</p>
      <p>\[s_1=(16,1)^\top.\]</p>
      <p>Ignoring \(\epsilon\), the normalized gradient is</p>
      <p>\[\frac{g_1}{\sqrt{s_1}}=(1,1)^\top.\]</p>
      <p>The coordinate with raw gradient 4 is scaled down more strongly.</p>
      <div class="paper-connection"><strong>ML connection.</strong> AdaGrad was attractive for sparse features because rarely updated coordinates can retain relatively large effective learning rates.</div>
      <div class="shape-check"><strong>Shape rule.</strong> \(s_t\), \(g_t\), and \(\theta_t\) all have matching shapes. The accumulator is per parameter, not one scalar for the whole model.</div>
    `
  },
  {
    id: "rmsprop",
    title: "17. RMSProp replaces AdaGrad’s permanent memory with an exponential moving average",
    html: String.raw`
      <p>AdaGrad’s accumulator only grows. RMSProp instead tracks recent squared gradients:</p>
      <p>\[s_t=\rho s_{t-1}+(1-\rho)g_t\odot g_t.\]</p>
      <p>The update is</p>
      <p>\[\theta_{t+1}=\theta_t-\eta\frac{g_t}{\sqrt{s_t}+\epsilon}.\]</p>
      <h3>Numerical example</h3>
      <p>Let \(\rho=0.9\), \(s_0=0\), and \(g_1=4\). Then</p>
      <p>\[s_1=0.1(16)=1.6.\]</p>
      <p>If the next gradient is \(g_2=2\), then</p>
      <p>\[s_2=0.9(1.6)+0.1(4)=1.84.\]</p>
      <p>Old information fades instead of accumulating forever.</p>
      <div class="paper-connection"><strong>ML connection.</strong> RMSProp is useful when gradient scales change during training. The moving average adapts to recent history.</div>
      <div class="shape-check"><strong>Common notation trap.</strong> The decay parameter is often called \(\rho\), \(\alpha\), or \(\beta_2\)-like notation. Check whether it weights the old average or the new squared gradient.</div>
    `
  },
  {
    id: "adam",
    title: "18. Adam combines momentum-like averaging with adaptive coordinate scaling",
    html: String.raw`
      <p>Adam tracks a first moment and a second raw moment of the gradients:</p>
      <p>\[m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\]</p>
      <p>\[v_t=\beta_2v_{t-1}+(1-\beta_2)g_t\odot g_t.\]</p>
      <p>Because both start at zero, Adam commonly uses bias corrections:</p>
      <p>\[\hat m_t=\frac{m_t}{1-\beta_1^t},\qquad \hat v_t=\frac{v_t}{1-\beta_2^t}.\]</p>
      <p>Then</p>
      <p>\[\theta_{t+1}=\theta_t-\eta\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.\]</p>
      <h3>First-step scalar example</h3>
      <p>Let \(g_1=2\), \(\beta_1=0.9\), and \(\beta_2=0.999\). Then</p>
      <p>\[m_1=0.2,\qquad v_1=0.004.\]</p>
      <p>After bias correction,</p>
      <p>\[\hat m_1=2,\qquad \hat v_1=4.\]</p>
      <p>Ignoring \(\epsilon\), the normalized first-step direction is \(2/\sqrt4=1\).</p>
      <div class="paper-connection"><strong>Why this matters for papers.</strong> Adam is common in Transformer and large-model training. Reported results depend on \(\beta_1\), \(\beta_2\), \(\epsilon\), learning rate, schedule, and weight-decay convention, not only the word “Adam.”</div>
      <div class="shape-check"><strong>Common mistake.</strong> Adam’s \(v_t\) is a moving average of squared gradients. It is not the same object as the velocity \(v_t\) used in some momentum notation.</div>
    `
  },
  {
    id: "schedules-warmup",
    title: "19. Learning-rate schedules change step size as training progresses",
    html: String.raw`
      <p>A fixed learning rate is not always best. A <strong>schedule</strong> makes \(\eta_t\) depend on the training step.</p>
      <p>Common schedules include step decay, exponential decay, cosine decay, and inverse-square-root decay. A simple cosine schedule over \(T\) steps can be written as</p>
      <p>\[\eta_t=\frac{\eta_{\max}}{2}\left(1+\cos\frac{\pi t}{T}\right).\]</p>
      <h3>Numerical example</h3>
      <p>If \(\eta_{\max}=10^{-3}\) and \(t=T/2\), then \(\cos(\pi/2)=0\), so</p>
      <p>\[\eta_{T/2}=5\times10^{-4}.\]</p>
      <p><strong>Warm-up</strong> starts with a smaller rate and increases it for an initial period. For linear warm-up over \(W\) steps, one simple form is</p>
      <p>\[\eta_t=\eta_{\max}\frac{t}{W},\qquad 0\le t\le W.\]</p>
      <div class="paper-connection"><strong>ML connection.</strong> Warm-up is common in Transformer training because early gradients and optimizer statistics can be unstable. Schedules then reduce the rate so later updates refine rather than disrupt the solution.</div>
      <div class="shape-check"><strong>Reading rule.</strong> “Learning rate = \(3\times10^{-4}\)” may mean peak rate, initial rate, or constant rate. Read the schedule description.</div>
    `
  },
  {
    id: "weight-decay",
    title: "20. Weight decay shrinks parameters, but its interaction with adaptive optimizers matters",
    html: String.raw`
      <p>In plain gradient descent, adding an L2 penalty</p>
      <p>\[J_{\text{reg}}(\theta)=J(\theta)+\frac{\lambda}{2}\|\theta\|_2^2\]</p>
      <p>adds \(\lambda\theta\) to the gradient. The update becomes</p>
      <p>\[\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t)-\eta\lambda\theta_t.\]</p>
      <p>Equivalently,</p>
      <p>\[\theta_{t+1}=(1-\eta\lambda)\theta_t-\eta\nabla J(\theta_t).\]</p>
      <h3>Numerical example</h3>
      <p>If \(\theta=10\), \(\eta=0.1\), \(\lambda=0.01\), and the data gradient is zero, then</p>
      <p>\[\theta_{\text{new}}=(1-0.001)10=9.99.\]</p>
      <p>For adaptive optimizers, decoupled weight decay, as in AdamW, applies shrinkage separately from adaptive gradient scaling. This is not algebraically identical to putting an L2 term inside the Adam gradient.</p>
      <div class="paper-connection"><strong>Why this matters.</strong> Modern papers often say “AdamW” rather than “Adam + L2.” That distinction is intentional because adaptive scaling changes the effect of a penalty-gradient implementation.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Biases and normalization parameters are often excluded from weight decay. Do not assume every trainable scalar is decayed.</div>
    `
  }
);
