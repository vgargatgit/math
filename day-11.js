const day11 = COURSE[3].lessons[0];

Object.assign(day11, {
  published: true,
  summary: "Understand how ML optimizers move through a loss surface. Learn gradient descent, stochastic gradients, adaptive methods, curvature, conditioning, schedules, weight decay, clipping, and stopping rules.",
  explanation: "Training a model is an optimization problem. We choose parameters, evaluate an objective, compute information about how the objective changes, and update the parameters. The gradient gives a local direction. The learning rate chooses a step size. Curvature, noise, and parameter scaling decide whether that step is useful. Modern optimizers add memory, adaptive scaling, schedules, and safeguards, but they still build on these basic ideas.",
  topics: [
    "Objectives and losses",
    "Parameter spaces",
    "Gradient direction",
    "Gradient descent",
    "Learning rate",
    "Batch, stochastic, and mini-batch gradients",
    "Taylor approximation",
    "Smoothness",
    "Lipschitz continuity",
    "Convex and non-convex objectives",
    "Local and global minima",
    "Saddles and plateaus",
    "Gradient noise",
    "Momentum",
    "Nesterov momentum",
    "AdaGrad",
    "RMSProp",
    "Adam",
    "Schedules and warm-up",
    "Weight decay",
    "First- and second-order methods",
    "Hessian",
    "Newton’s method",
    "Quasi-Newton methods",
    "Conditioning",
    "Line search",
    "Early stopping",
    "Gradient clipping"
  ],
  sections: [
    {
      id: "objectives-losses",
      title: "1. Optimization starts with an objective that turns model quality into one number",
      html: String.raw`
        <p>An <strong>objective</strong> is the quantity that an optimization algorithm tries to minimize or maximize. In supervised ML, the objective is often a loss averaged over training examples.</p>
        <p>For parameters \(\theta\) and training examples \((x_i,y_i)\), a common empirical-risk objective is</p>
        <p>\[J(\theta)=\frac{1}{N}\sum_{i=1}^{N}\ell\bigl(f_\theta(x_i),y_i\bigr).\]</p>
        <p>Here \(f_\theta\) is the model and \(\ell\) is a per-example loss. The optimization problem is</p>
        <p>\[\theta^*=\arg\min_\theta J(\theta).\]</p>
        <p>The symbol \(\arg\min\) returns the parameter value that gives the smallest objective. It does not return the objective value itself.</p>
        <h3>Small numerical example</h3>
        <p>Suppose three examples have losses \(0.2\), \(0.7\), and \(0.4\). Then</p>
        <p>\[J=\frac{0.2+0.7+0.4}{3}=0.433\ldots\]</p>
        <p>If a new parameter setting changes the losses to \(0.2\), \(0.4\), and \(0.3\), then \(J=0.3\). The second setting is better for this objective.</p>
        <div class="paper-connection">
          <strong>Why this matters for ML papers.</strong> Before reading an optimizer, find the objective. A paper can call it \(L\), \(J\), \(\mathcal{L}\), risk, energy, negative log-likelihood, or training criterion. The update rule only makes sense after you know what is being optimized.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> A training objective can include several terms. For example, \(J=L_{\text{data}}+\lambda R\). Reducing the total objective does not guarantee that every term decreases on every step.
        </div>
      `
    },
    {
      id: "parameter-space",
      title: "2. The parameter space is the set of all model settings the optimizer can visit",
      html: String.raw`
        <p>Let \(\theta\) collect all trainable parameters. If a model has \(d\) scalar parameters, we can view</p>
        <p>\[\theta\in\mathbb{R}^d.\]</p>
        <p>The set \(\mathbb{R}^d\) is the <strong>parameter space</strong>. Each point is one complete model setting. Training moves from one point to another.</p>
        <h3>Two-parameter example</h3>
        <p>Consider a line</p>
        <p>\[\hat y=wx+b.\]</p>
        <p>The parameter vector can be written as</p>
        <p>\[\theta=\begin{bmatrix}w\\b\end{bmatrix}\in\mathbb{R}^2.\]</p>
        <p>The setting \((w,b)=(2,1)\) and the setting \((w,b)=(2.1,0.8)\) are two different points in the same parameter space.</p>
        <h3>Shape reasoning for a neural layer</h3>
        <p>If \(W\in\mathbb{R}^{m\times n}\) and \(b\in\mathbb{R}^{n}\), then the layer has \(mn+n\) scalar parameters. An optimizer usually stores tensors with the same shapes as the parameters instead of flattening them into one long vector.</p>
        <div class="paper-connection">
          <strong>Paper-reading rule.</strong> When a paper writes \(\theta\), it may represent millions or billions of numbers. Treat \(\theta\) as a conceptual vector, but keep the original tensor shapes when reasoning about an implementation.
        </div>
        <div class="shape-check">
          <strong>Common notation trap.</strong> Some authors use \(w\) for the full parameter vector. Others use \(W\) for one matrix and \(\theta\) for all parameters. Check the definition before assuming a shape.
        </div>
      `
    },
    {
      id: "gradient-direction",
      title: "3. The gradient points toward the steepest local increase",
      html: String.raw`
        <p>For a differentiable scalar objective \(J:\mathbb{R}^d\to\mathbb{R}\), the gradient is</p>
        <p>\[\nabla J(\theta)=\begin{bmatrix}\partial J/\partial\theta_1\\\vdots\\\partial J/\partial\theta_d\end{bmatrix}.\]</p>
        <p>The gradient points in the direction of steepest first-order increase when direction length is measured with the usual Euclidean norm. Therefore, the negative gradient points toward the steepest local decrease.</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[J(w,b)=w^2+4b^2.\]</p>
        <p>Then</p>
        <p>\[\nabla J=\begin{bmatrix}2w\\8b\end{bmatrix}.\]</p>
        <p>At \((w,b)=(2,1)\),</p>
        <p>\[\nabla J=\begin{bmatrix}4\\8\end{bmatrix},\qquad -\nabla J=\begin{bmatrix}-4\\-8\end{bmatrix}.\]</p>
        <p>The objective changes more strongly with \(b\) than with \(w\) at this point.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Backpropagation computes the gradient of the scalar training loss with respect to every parameter tensor. The optimizer then decides how to convert those gradients into parameter updates.
        </div>
        <div class="shape-check">
          <strong>Shape rule.</strong> For a scalar objective, \(\nabla_W J\) has the same shape as \(W\). If \(W\) is \(4\times3\), its gradient is also \(4\times3\).
        </div>
      `
    },
    {
      id: "gradient-descent",
      title: "4. Gradient descent repeatedly takes a step against the gradient",
      html: String.raw`
        <p>The basic gradient-descent update is</p>
        <p>\[\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t),\]</p>
        <p>where \(t\) is the step index and \(\eta&gt;0\) is the learning rate.</p>
        <h3>One-dimensional example</h3>
        <p>Let</p>
        <p>\[J(w)=(w-3)^2.\]</p>
        <p>Then \(J'(w)=2(w-3)\). Start from \(w_0=0\) with \(\eta=0.1\):</p>
        <p>\[w_1=0-0.1(-6)=0.6.\]</p>
        <p>The next gradient is \(J'(0.6)=-4.8\), so</p>
        <p>\[w_2=0.6-0.1(-4.8)=1.08.\]</p>
        <p>The iterates move toward the minimizer \(w=3\).</p>
        <h3>Two-dimensional step</h3>
        <p>If \(\theta=(2,1)^\top\), \(\nabla J=(4,8)^\top\), and \(\eta=0.05\), then</p>
        <p>\[\theta_{\text{new}}=\begin{bmatrix}2\\1\end{bmatrix}-0.05\begin{bmatrix}4\\8\end{bmatrix}=\begin{bmatrix}1.8\\0.6\end{bmatrix}.\]</p>
        <div class="paper-connection">
          <strong>Why this matters in papers.</strong> Even when a paper uses Adam or another optimizer, authors often analyze the simpler gradient-descent equation first because it exposes the core geometry.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> The negative gradient is a local direction. A finite step along that direction is not guaranteed to reduce the objective if the step is too large.
        </div>
      `
    },
    {
      id: "learning-rate",
      title: "5. The learning rate decides how much of the local direction to trust",
      html: String.raw`
        <p>The learning rate \(\eta\) scales the update. It is not just a speed control. It affects stability.</p>
        <p>Consider</p>
        <p>\[J(w)=w^2,\qquad J'(w)=2w.\]</p>
        <p>Gradient descent gives</p>
        <p>\[w_{t+1}=(1-2\eta)w_t.\]</p>
        <p>If \(\eta=0.1\), then the multiplier is \(0.8\), so the magnitude shrinks each step. From \(w_0=4\):</p>
        <p>\[4\to3.2\to2.56\to\cdots\]</p>
        <p>If \(\eta=0.75\), the multiplier is \(-0.5\). The iterate changes sign but still shrinks:</p>
        <p>\[4\to-2\to1\to-0.5\to\cdots\]</p>
        <p>If \(\eta=1.1\), the multiplier is \(-1.2\). The iterate oscillates and grows:</p>
        <p>\[4\to-4.8\to5.76\to\cdots\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> A learning rate that is too small can waste computation. A learning rate that is too large can cause unstable loss, exploding activations, or divergence. Large-model papers often report the peak learning rate and schedule because both strongly affect the result.
        </div>
        <div class="shape-check">
          <strong>Notation warning.</strong> Learning rate can be written as \(\eta\), \(\alpha\), or \(\epsilon\). The symbol \(\epsilon\) can also mean a numerical stabilizer in Adam, so read the optimizer definition carefully.
        </div>
      `
    },
    {
      id: "batch-stochastic-minibatch",
      title: "6. Batch, stochastic, and mini-batch gradients trade accuracy for computation",
      html: String.raw`
        <p>Suppose</p>
        <p>\[J(\theta)=\frac1N\sum_{i=1}^{N}\ell_i(\theta).\]</p>
        <p>The full-batch gradient is</p>
        <p>\[g=\nabla J(\theta)=\frac1N\sum_{i=1}^{N}\nabla\ell_i(\theta).\]</p>
        <p>A stochastic gradient uses one sampled example. A mini-batch gradient uses a subset \(B_t\):</p>
        <p>\[g_t=\frac{1}{|B_t|}\sum_{i\in B_t}\nabla\ell_i(\theta_t).\]</p>
        <h3>Numerical example</h3>
        <p>Suppose four per-example gradients are</p>
        <p>\[g_1=2,\quad g_2=4,\quad g_3=-1,\quad g_4=3.\]</p>
        <p>The full gradient is</p>
        <p>\[g=\frac{2+4-1+3}{4}=2.\]</p>
        <p>A mini-batch containing examples 1 and 3 gives</p>
        <p>\[\hat g=\frac{2+(-1)}{2}=0.5.\]</p>
        <p>The mini-batch estimate is noisy, but it is cheaper to compute.</p>
        <div class="paper-connection">
          <strong>Why this matters for ML.</strong> Deep networks are normally trained with mini-batches. Batch size affects memory use, gradient noise, throughput, and often the learning-rate choice. When a paper says SGD, it often means mini-batch SGD rather than one-example-at-a-time updates.
        </div>
        <div class="shape-check">
          <strong>Shape reasoning.</strong> If \(W\) is \(m\times n\), every per-example gradient and the averaged mini-batch gradient are also \(m\times n\). Averaging changes values, not parameter shape.
        </div>
      `
    },
    {
      id: "taylor-approximation",
      title: "7. Taylor approximation explains why the gradient is useful only locally",
      html: String.raw`
        <p>A first-order Taylor approximation near \(\theta\) is</p>
        <p>\[J(\theta+\Delta)\approx J(\theta)+\nabla J(\theta)^\top\Delta.\]</p>
        <p>If we choose \(\Delta=-\eta\nabla J(\theta)\), then</p>
        <p>\[J(\theta+\Delta)\approx J(\theta)-\eta\|\nabla J(\theta)\|_2^2.\]</p>
        <p>The first-order model predicts a decrease for any positive \(\eta\). But this approximation becomes less accurate for large steps because it ignores curvature.</p>
        <h3>Numerical example</h3>
        <p>For \(J(w)=w^2\) at \(w=2\), we have \(J=4\) and \(J'=4\). For \(\Delta=-0.1\), the first-order prediction is</p>
        <p>\[J(1.9)\approx4+4(-0.1)=3.6.\]</p>
        <p>The exact value is \(1.9^2=3.61\). The approximation is close because the step is small.</p>
        <p>For the much larger step \(\Delta=-2\), first order predicts \(-4\), which is impossible because \(w^2\ge0\). The exact value is \(J(0)=0\).</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> Many convergence arguments start from a Taylor bound or a smoothness inequality. These results formalize how small a step must be for local gradient information to remain useful.
        </div>
      `
    }
  ],
  examples: [],
  practice: []
});
