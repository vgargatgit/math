day11.sections.push(
  {
    id: "first-second-order",
    title: "21. First-order and second-order methods use different information about the objective",
    html: String.raw`
      <p>A <strong>first-order</strong> method uses gradients. Gradient descent, momentum, RMSProp, and Adam are first-order methods.</p>
      <p>A <strong>second-order</strong> method also uses curvature information, usually through the Hessian matrix.</p>
      <p>Near \(\theta\), a second-order Taylor model is</p>
      <p>\[J(\theta+\Delta)\approx J(\theta)+g^\top\Delta+\frac12\Delta^\top H\Delta,\]</p>
      <p>where</p>
      <p>\[g=\nabla J(\theta),\qquad H=\nabla^2J(\theta).\]</p>
      <h3>One-dimensional example</h3>
      <p>For \(J(w)=5w^2\),</p>
      <p>\[J'(w)=10w,\qquad J''(w)=10.\]</p>
      <p>The gradient says which way to move. The second derivative says how rapidly the slope changes.</p>
      <div class="paper-connection"><strong>Why this matters for ML papers.</strong> First-order methods scale well to huge parameter counts because gradients can be computed with backpropagation. Explicit second-order methods can converge in fewer iterations on some problems but are often too expensive for large neural networks.</div>
      <div class="shape-check"><strong>Shape reasoning.</strong> If \(\theta\in\mathbb{R}^d\), then \(g\in\mathbb{R}^d\), while \(H\in\mathbb{R}^{d\times d}\). The Hessian grows quadratically with the parameter count.</div>
    `
  },
  {
    id: "hessian",
    title: "22. The Hessian records local curvature and coupling between parameter directions",
    html: String.raw`
      <p>For a scalar objective \(J(\theta_1,\ldots,\theta_d)\), the Hessian is</p>
      <p>\[H_{ij}=\frac{\partial^2J}{\partial\theta_i\partial\theta_j}.\]</p>
      <p>It collects second partial derivatives into a matrix.</p>
      <h3>Two-parameter example</h3>
      <p>Let</p>
      <p>\[J(x,y)=3x^2+2xy+y^2.\]</p>
      <p>The gradient is</p>
      <p>\[\nabla J=\begin{bmatrix}6x+2y\\2x+2y\end{bmatrix}.\]</p>
      <p>The Hessian is constant:</p>
      <p>\[H=\begin{bmatrix}6&2\\2&2\end{bmatrix}.\]</p>
      <p>The off-diagonal entries show that the effect of changing one coordinate depends on the other coordinate.</p>
      <p>For a symmetric Hessian, eigenvectors give principal curvature directions and eigenvalues give curvature magnitudes. Positive eigenvalues mean upward curvature in those directions; negative eigenvalues reveal descent directions at a saddle.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Hessian eigenvalues appear in analyses of sharpness, saddle points, conditioning, and local loss geometry. Large models rarely form the full Hessian, but Hessian-vector products can be computed without materializing all \(d^2\) entries.</div>
      <div class="shape-check"><strong>Common mistake.</strong> A positive diagonal of \(H\) does not by itself prove positive curvature in every direction. Eigenvalues or positive-definiteness are the relevant tests.</div>
    `
  },
  {
    id: "newton-method",
    title: "23. Newton’s method rescales the gradient using local curvature",
    html: String.raw`
      <p>For a twice-differentiable objective, Newton’s method chooses a step by minimizing the local quadratic approximation. The update is</p>
      <p>\[\theta_{t+1}=\theta_t-H_t^{-1}g_t.\]</p>
      <p>More precisely, implementations often solve the linear system</p>
      <p>\[H_t\Delta_t=-g_t\]</p>
      <p>instead of explicitly computing \(H_t^{-1}\).</p>
      <h3>Scalar example</h3>
      <p>For</p>
      <p>\[J(w)=(w-3)^2,\]</p>
      <p>we have \(g=2(w-3)\) and \(H=2\). Starting at \(w=0\):</p>
      <p>\[w_{1}=0-\frac{-6}{2}=3.\]</p>
      <p>Newton reaches the minimizer in one step because the objective is exactly quadratic.</p>
      <h3>Why it can fail</h3>
      <p>If the Hessian is singular, indefinite, or a poor local model far from the solution, the raw Newton step can be unstable. Damping or trust-region ideas can modify the step.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Newton-style ideas motivate curvature-aware methods, natural-gradient approximations, K-FAC-like methods, and second-order analyses even when the exact Hessian is not practical.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Do not read \(H^{-1}g\) as element-wise division. It is a matrix-vector operation that mixes coordinates.</div>
    `
  },
  {
    id: "quasi-newton",
    title: "24. Quasi-Newton methods approximate curvature instead of forming the full Hessian",
    html: String.raw`
      <p><strong>Quasi-Newton</strong> methods build an approximation to the Hessian or its inverse from successive gradients and parameter changes.</p>
      <p>Two important differences between steps are</p>
      <p>\[s_t=\theta_{t+1}-\theta_t,\qquad y_t=g_{t+1}-g_t.\]</p>
      <p>These pairs contain information about how the gradient changed as the parameters moved.</p>
      <p>BFGS updates a dense inverse-Hessian approximation. L-BFGS stores only a limited history of \((s_t,y_t)\) pairs, which reduces memory.</p>
      <h3>Small intuition example</h3>
      <p>Suppose a one-dimensional parameter moves from \(w=1\) to \(w=1.2\), so \(s=0.2\). If the gradient changes from \(2\) to \(2.8\), then \(y=0.8\). The observed slope change per parameter change is approximately</p>
      <p>\[\frac{y}{s}=\frac{0.8}{0.2}=4,\]</p>
      <p>which acts like an estimated second derivative.</p>
      <div class="paper-connection"><strong>ML connection.</strong> L-BFGS appears in smaller neural networks, scientific ML, optimization of embeddings or latent variables, and classical ML problems where full-batch gradients are affordable.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Quasi-Newton methods are not stochastic-gradient methods by default. Their curvature estimates are usually more useful with relatively stable gradients.</div>
    `
  },
  {
    id: "conditioning",
    title: "25. Conditioning explains why some directions are easy to optimize and others are slow",
    html: String.raw`
      <p>For a positive-definite quadratic</p>
      <p>\[J(\theta)=\frac12\theta^\top A\theta,\]</p>
      <p>the Hessian is \(A\). If its largest and smallest eigenvalues are \(\lambda_{\max}\) and \(\lambda_{\min}\), a common condition number is</p>
      <p>\[\kappa=\frac{\lambda_{\max}}{\lambda_{\min}}.\]</p>
      <p>A large \(\kappa\) means curvature differs strongly across directions.</p>
      <h3>Numerical example</h3>
      <p>Consider</p>
      <p>\[J(x,y)=\frac12(100x^2+y^2).\]</p>
      <p>The Hessian is</p>
      <p>\[H=\begin{bmatrix}100&0\\0&1\end{bmatrix},\]</p>
      <p>so \(\kappa=100\). A learning rate small enough to be stable in the steep \(x\)-direction can make progress very slow in the flat \(y\)-direction. Gradient descent can zig-zag across the narrow valley.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Feature scaling, normalization, momentum, adaptive optimizers, and preconditioning can all be understood partly as ways to reduce harmful differences in effective scale across directions.</div>
      <div class="shape-check"><strong>Reading rule.</strong> “Ill-conditioned” means sensitive or badly scaled, not necessarily numerically singular. A matrix can be invertible and still have a very large condition number.</div>
    `
  },
  {
    id: "line-search",
    title: "26. Line search chooses a step size by checking the objective along a direction",
    html: String.raw`
      <p>Instead of fixing \(\eta\) in advance, a <strong>line search</strong> first chooses a direction \(p_t\) and then searches for a useful scalar step \(\alpha_t\):</p>
      <p>\[\theta_{t+1}=\theta_t+\alpha_t p_t.\]</p>
      <p>For gradient descent, \(p_t=-g_t\).</p>
      <h3>Numerical example</h3>
      <p>Suppose \(J(w)=(w-3)^2\), \(w=0\), and the descent direction is \(p=6\). Try three step sizes:</p>
      <p>\[\alpha=0.1:\quad w=0.6,\quad J=5.76,\]</p>
      <p>\[\alpha=0.5:\quad w=3,\quad J=0,\]</p>
      <p>\[\alpha=1:\quad w=6,\quad J=9.\]</p>
      <p>The direction is good, but the step length decides the result.</p>
      <p>Practical line searches often use sufficient-decrease and curvature conditions rather than testing every possible step.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Line search is common in classical optimization and second-order methods. It is less common in standard large-scale mini-batch deep learning because evaluating several candidate steps can be expensive and noisy.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Line search does not search all of parameter space. It searches only along one chosen direction.</div>
    `
  },
  {
    id: "early-stopping",
    title: "27. Early stopping uses validation behavior to decide when optimization should stop",
    html: String.raw`
      <p>Training loss can continue to decrease after validation performance starts to get worse. <strong>Early stopping</strong> keeps a checkpoint from before this deterioration.</p>
      <h3>Numerical example</h3>
      <table>
        <thead><tr><th>Epoch</th><th>Train loss</th><th>Validation loss</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>0.80</td><td>0.86</td></tr>
          <tr><td>5</td><td>0.40</td><td>0.48</td></tr>
          <tr><td>9</td><td>0.25</td><td>0.44</td></tr>
          <tr><td>13</td><td>0.18</td><td>0.51</td></tr>
        </tbody>
      </table>
      <p>If the goal is validation loss, epoch 9 is better than epoch 13 even though the training loss at epoch 13 is lower.</p>
      <p>A common implementation uses <strong>patience</strong>: stop only after the validation metric fails to improve for several evaluations.</p>
      <div class="paper-connection"><strong>Why this matters.</strong> Early stopping is both an optimization rule and a form of model selection. The test set must remain untouched; otherwise the stopping decision leaks test information into training.</div>
      <div class="shape-check"><strong>Common mistake.</strong> “Converged training loss” and “best generalization” are different goals. Early stopping targets the latter through a validation metric.</div>
    `
  },
  {
    id: "gradient-clipping",
    title: "28. Gradient clipping bounds dangerous updates without changing the objective",
    html: String.raw`
      <p><strong>Gradient clipping</strong> modifies the gradient before the optimizer uses it. A common global-norm rule is</p>
      <p>\[g_{\text{clip}}=g\min\left(1,\frac{c}{\|g\|_2}\right),\]</p>
      <p>where \(c\) is the clipping threshold.</p>
      <h3>Numerical example</h3>
      <p>Let</p>
      <p>\[g=\begin{bmatrix}6\\8\end{bmatrix},\qquad \|g\|_2=10.\]</p>
      <p>If \(c=5\), then</p>
      <p>\[g_{\text{clip}}=\frac{5}{10}\begin{bmatrix}6\\8\end{bmatrix}=\begin{bmatrix}3\\4\end{bmatrix}.\]</p>
      <p>The direction stays the same, but the norm is reduced from 10 to 5.</p>
      <p>Element-wise clipping is different. It clips each component separately and can change the overall direction.</p>
      <div class="paper-connection"><strong>ML connection.</strong> Norm clipping is common in recurrent networks, sequence models, and large-model training when occasional gradient spikes would otherwise cause very large updates.</div>
      <div class="shape-check"><strong>Common mistake.</strong> Clipping does not fix the root cause of every unstable run. A bad learning rate, numerical overflow, or exploding activations can still require separate correction.</div>
    `
  },
  {
    id: "optimization-recap",
    title: "29. Recap: read an optimizer as direction, scale, memory, curvature, and safeguards",
    html: String.raw`
      <p>When you meet an optimizer in an AI/ML paper, separate its parts.</p>
      <ol>
        <li><strong>Objective:</strong> What scalar quantity is being optimized?</li>
        <li><strong>Direction:</strong> Is the update based on a gradient, momentum, a preconditioned gradient, or curvature?</li>
        <li><strong>Scale:</strong> What is the learning rate, and does it change over time?</li>
        <li><strong>Memory:</strong> Does the method average past gradients or squared gradients?</li>
        <li><strong>Regularization:</strong> Is weight decay coupled to the gradient or decoupled?</li>
        <li><strong>Safeguards:</strong> Are there clipping, warm-up, line search, or early-stopping rules?</li>
      </ol>
      <p>For parameter tensor \(W\), the raw gradient \(G=\partial J/\partial W\) has the same shape as \(W\). Momentum and adaptive-state tensors also normally match that shape. This shape invariant is one of the fastest checks when reading optimizer pseudocode.</p>
      <div class="paper-connection"><strong>Final ML connection.</strong> A reported optimizer name is not a complete training specification. Reproducibility usually requires batch size, base or peak learning rate, schedule, warm-up, momentum or Adam coefficients, epsilon, weight decay, clipping, and stopping or checkpoint rules.</div>
      <div class="shape-check"><strong>Most important warning.</strong> Lower training objective is not identical to better validation or test performance. Optimization and generalization are related but separate questions.</div>
    `
  }
);
