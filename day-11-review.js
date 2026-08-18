day11.examples.push(
  [
    "One full-batch gradient step for linear regression",
    String.raw`For one feature, let \(\hat y=wx\) and use the squared-error objective
    \[J(w)=\frac12\sum_{i=1}^{2}(wx_i-y_i)^2.\]
    Take data \((x_1,y_1)=(1,2)\) and \((x_2,y_2)=(2,4)\), with \(w=1\). The predictions are \(1\) and \(2\), so
    \[\frac{dJ}{dw}=(1-2)(1)+(2-4)(2)=-1-4=-5.\]
    With \(\eta=0.1\),
    \[w_{\text{new}}=1-0.1(-5)=1.5.\]
    The update moves \(w\) toward the exact solution \(w=2\).`
  ],
  [
    "Mini-batch noise from the same dataset",
    String.raw`Using the same regression problem at \(w=1\), example 1 alone gives gradient \(-1\), while example 2 alone gives gradient \(-4\). The full gradient is \(-5\) for the summed objective, or \(-2.5\) for the mean objective. A one-example stochastic update can therefore point with a different magnitude from the full-data update even though it is based on a valid sample.`
  ],
  [
    "Learning-rate stability for a quadratic",
    String.raw`For \(J(w)=\tfrac12 aw^2\), gradient descent gives
    \[w_{t+1}=(1-\eta a)w_t.\]
    Convergence requires \(|1-\eta a|<1\), which gives
    \[0<\eta<\frac{2}{a}.\]
    If \(a=8\), a constant rate must satisfy \(0<\eta<0.25\). This small formula explains why high curvature limits the safe step size.`
  ],
  [
    "Momentum smooths an alternating coordinate",
    String.raw`Suppose scalar gradients alternate \(2,-2,2,-2\), with \(\beta=0.9\) and \(v_0=0\). Then
    \[v_1=2,\quad v_2=-0.2,\quad v_3=1.82,\quad v_4=-0.362.\]
    The raw gradient flips between \(\pm2\), but the velocity magnitude in the alternating direction is reduced after cancellation. In a multidimensional narrow valley, this can reduce zig-zag motion.`
  ],
  [
    "AdaGrad treats two coordinates differently",
    String.raw`Let the first two gradients be
    \[g_1=(4,1)^\top,\qquad g_2=(2,1)^\top.\]
    The squared-gradient accumulator after two steps is
    \[s_2=(4^2+2^2,\;1^2+1^2)^\top=(20,2)^\top.\]
    Ignoring \(\epsilon\), the second normalized gradient is approximately
    \[g_2/\sqrt{s_2}=(0.447,0.707)^\top.\]
    The coordinate with the larger gradient history gets the smaller effective step.`
  ],
  [
    "Adam bias correction on the first step",
    String.raw`Take a scalar gradient \(g_1=3\), \(\beta_1=0.9\), and \(\beta_2=0.99\). Then
    \[m_1=0.3,\qquad v_1=0.09.\]
    Bias correction gives
    \[\hat m_1=0.3/(1-0.9)=3,\qquad \hat v_1=0.09/(1-0.99)=9.\]
    Thus \(\hat m_1/\sqrt{\hat v_1}=1\). Without correction, the early moments would be biased toward zero because both moving averages started at zero.`
  ],
  [
    "Cosine decay at three points",
    String.raw`With
    \[\eta_t=\frac{\eta_{\max}}2\left(1+\cos\frac{\pi t}{T}\right),\]
    we get \(\eta_0=\eta_{\max}\), \(\eta_{T/2}=\eta_{\max}/2\), and \(\eta_T=0\). The schedule starts with large exploratory updates and ends with small refinement steps.`
  ],
  [
    "Weight decay with and without a data gradient",
    String.raw`Let \(w=5\), \(\eta=0.1\), \(\lambda=0.02\), and data gradient \(g=1\). For plain SGD with L2-equivalent decay,
    \[w_{\text{new}}=(1-0.1\cdot0.02)5-0.1(1)=4.89.\]
    The \(-0.1\) part comes from the data gradient. The additional \(-0.01\) comes from parameter shrinkage.`
  ],
  [
    "Hessian shape for two parameters",
    String.raw`For
    \[J(w,b)=w^2+3wb+2b^2,\]
    the gradient is
    \[\nabla J=(2w+3b,\;3w+4b)^\top,\]
    and the Hessian is
    \[H=\begin{bmatrix}2&3\\3&4\end{bmatrix}.\]
    The Hessian is \(2\times2\) because the parameter vector has two entries. The off-diagonal value 3 records cross-coordinate curvature.`
  ],
  [
    "Newton step versus gradient step",
    String.raw`For \(J(w)=10(w-2)^2\) at \(w=0\), the gradient is \(-40\) and the Hessian is 20. A gradient step with \(\eta=0.01\) gives \(w=0.4\). Newton gives
    \[w_{\text{new}}=0-(-40)/20=2.\]
    The exact quadratic curvature lets Newton choose the correct scale immediately.`
  ],
  [
    "Conditioning creates a narrow valley",
    String.raw`For
    \[J(x,y)=50x^2+\tfrac12y^2,\]
    the gradient is \((100x,y)^\top\). At \((1,1)\), it is \((100,1)^\top\). A rate that is safe for the \(x\)-direction may be tiny relative to the progress needed in \(y\). This imbalance is the basic optimization effect of poor conditioning.`
  ],
  [
    "Global-norm clipping across two parameter tensors",
    String.raw`Suppose two parameter tensors have flattened gradients \(g^{(1)}=(3,4)\) and \(g^{(2)}=(0,12)\). The global norm is
    \[\sqrt{3^2+4^2+12^2}=13.\]
    With threshold \(c=6.5\), multiply every gradient tensor by \(6.5/13=0.5\). The new gradients are \((1.5,2)\) and \((0,6)\). Global clipping uses one shared scale so the combined direction is preserved.`
  ],
  [
    "Early stopping is not test-set tuning",
    String.raw`Suppose validation accuracy across epochs is \(82\%,85\%,87\%,86\%,85\%\). Early stopping may keep epoch 3. The test set should be evaluated after this choice. If you repeatedly inspect test accuracy and choose the epoch with the best test result, the test set has become part of model selection and no longer gives an unbiased final estimate.`
  ],
  [
    "Optimizer-state memory has parameter-like shapes",
    String.raw`If a weight matrix has shape \(4096\times4096\), its gradient has the same shape. Adam typically stores two additional state tensors, \(m\) and \(v\), also with shape \(4096\times4096\). Thus optimizer state can consume memory comparable to multiple copies of the parameters. This matters in large-model training.`
  ]
);

day11.practice.push(
  String.raw`For \(J(w)=(w-5)^2\), start at \(w=1\) and take one gradient-descent step with \(\eta=0.25\). What is \(w_1\)?
    <details><summary>Answer</summary><p>\(J'(w)=2(w-5)\), so \(J'(1)=-8\). Therefore \(w_1=1-0.25(-8)=3\).</p></details>`,
  String.raw`A parameter matrix \(W\) has shape \(8\times16\). What are the shapes of its gradient, momentum buffer, and Adam second-moment buffer?
    <details><summary>Answer</summary><p>All three have shape \(8\times16\). Optimizer state is stored coordinate-by-coordinate for this parameter.</p></details>`,
  String.raw`For \(J(w)=w^2\), what happens with learning rate \(\eta=1\)?
    <details><summary>Answer</summary><p>The update is \(w_{t+1}=(1-2)w_t=-w_t\). The iterate flips sign but keeps the same magnitude, so it does not converge unless it starts at 0.</p></details>`,
  String.raw`Four per-example scalar gradients are \(1,3,5,7\). Compute the full mean gradient and the mini-batch mean for examples 1 and 4.
    <details><summary>Answer</summary><p>The full mean is \((1+3+5+7)/4=4\). The selected mini-batch mean is \((1+7)/2=4\). This batch happens to match the full gradient exactly, but another batch need not.</p></details>`,
  String.raw`Why does a first-order Taylor model become unreliable for a very large gradient step?
    <details><summary>Answer</summary><p>It ignores curvature and higher-order terms. The gradient describes local slope, so a large move can enter a region with a very different slope.</p></details>`,
  String.raw`State the difference between “\(J\) is Lipschitz” and “\(J\) has a Lipschitz gradient.”
    <details><summary>Answer</summary><p>The first bounds how fast function values can change. The second bounds how fast the gradient can change; that second property is commonly called smoothness.</p></details>`,
  String.raw`For \(J(x,y)=x^2-y^2\), classify the point \((0,0)\).
    <details><summary>Answer</summary><p>It is a saddle point. The gradient is zero, but the function increases along the \(x\)-direction and decreases along the \(y\)-direction.</p></details>`,
  String.raw`With momentum \(v_t=0.9v_{t-1}+g_t\), let \(v_0=0\), \(g_1=1\), and \(g_2=1\). Compute \(v_1\) and \(v_2\).
    <details><summary>Answer</summary><p>\(v_1=1\) and \(v_2=0.9(1)+1=1.9\).</p></details>`,
  String.raw`In AdaGrad, why does a coordinate with a large history of squared gradients receive a smaller effective step?
    <details><summary>Answer</summary><p>The update divides that coordinate’s gradient by \(\sqrt{s_t}+\epsilon\). A larger accumulator \(s_t\) creates a larger denominator.</p></details>`,
  String.raw`Why does Adam use bias correction for \(m_t\) and \(v_t\) early in training?
    <details><summary>Answer</summary><p>The moving averages start at zero, so their early values are biased toward zero. Dividing by \(1-\beta_1^t\) and \(1-\beta_2^t\) corrects this initialization bias.</p></details>`,
  String.raw`If \(\theta=20\), \(\eta=0.01\), \(\lambda=0.1\), and the data gradient is zero, what is one decoupled weight-decay step \(\theta\leftarrow(1-\eta\lambda)\theta\)?
    <details><summary>Answer</summary><p>\(1-\eta\lambda=1-0.001=0.999\), so the new value is \(19.98\).</p></details>`,
  String.raw`If \(\theta\in\mathbb{R}^{1000}\), what is the shape of its full Hessian, and why can that be expensive?
    <details><summary>Answer</summary><p>The Hessian is \(1000\times1000\), with one million entries. For modern models with millions or billions of parameters, explicit storage becomes impractical.</p></details>`,
  String.raw`For a quadratic Hessian with eigenvalues \(2\) and \(50\), compute the condition number.
    <details><summary>Answer</summary><p>\(\kappa=50/2=25\). The steepest curvature direction is 25 times stronger than the flattest one.</p></details>`,
  String.raw`A gradient has norm \(30\), and the global clipping threshold is \(c=6\). By what factor is the gradient multiplied?
    <details><summary>Answer</summary><p>The factor is \(6/30=0.2\). Every component is multiplied by 0.2, so the direction is preserved and the new norm is 6.</p></details>`,
  String.raw`Training loss keeps decreasing, but validation loss reaches its minimum at epoch 12 and then rises. Which checkpoint should early stopping prefer, assuming validation loss is the selection metric?
    <details><summary>Answer</summary><p>The checkpoint at or near epoch 12. Continuing to reduce training loss does not help the stated validation objective after that point.</p></details>`,
  String.raw`A paper says only “we trained with Adam at learning rate \(10^{-3}\).” Name four additional optimizer details you would want for reproducibility.
    <details><summary>Answer</summary><p>Examples include \(\beta_1\), \(\beta_2\), \(\epsilon\), batch size, warm-up, decay schedule, weight decay and its convention, gradient clipping, gradient accumulation, and checkpoint or early-stopping rules.</p></details>`
);
