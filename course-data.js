const COURSE = [
  {
    stage: "Stage 1 — Mathematical Language and Linear Algebra",
    lessons: [
      {
        title: "Mathematical Notation and Algebra for ML",
        summary: "Learn to read the symbols that appear in ML papers before you try to manipulate them.",
        topics: ["Sets, subsets, tuples, sequences, and indexed collections", "Functions as mappings", "Domain, codomain, range, and composition", "Scalar, vector, matrix, and tensor notation", "Superscripts and subscripts", "Summation and product notation", "Logarithms and exponentials", "Indicator functions", "Piecewise-defined functions", "Norm notation", "Expectation notation", "Argmin and argmax", "Proportionality and approximation symbols", "Big-O notation", "Shape compatibility"],
        explanation: `A paper uses notation to compress a long idea into a short line. Treat each symbol as a named object. First ask what type of object it is. Then ask what values it can contain. Finally ask what operation is applied to it. This order prevents many errors.`,
        examples: [
          ["Read a function declaration", `If \(f:\\mathbb{R}^3\\to\\mathbb{R}\), then the input is a 3-entry vector and the output is one scalar. For \(x=(1,2,3)^\\top\), a possible function is \(f(x)=x_1+x_2+x_3=6\).`],
          ["Read a summation", `The expression \(\\sum_{i=1}^{4} x_i\) means \(x_1+x_2+x_3+x_4\). If \(x=(2,5,1,4)\), the result is \(12\).`],
          ["Read an optimization statement", `\(\\theta^*=\\arg\\min_\\theta L(\\theta)\) does not return the smallest loss. It returns the value of \(\\theta\) that gives the smallest loss.`]
        ],
        practice: ["For \(f:\\mathbb{R}^5\\to\\mathbb{R}^2\), state the input and output shapes.", "Expand \(\\sum_{i=1}^3 i^2\).", "Explain the difference between \(\\min_x f(x)\) and \(\\arg\\min_x f(x)\)."]
      },
      {
        title: "Vectors, Matrices, and Tensors",
        summary: "Use shapes to understand neural-network operations before you calculate numbers.",
        topics: ["Row and column vectors", "Matrix dimensions", "Tensor rank versus matrix rank", "Matrix indexing", "Addition and scalar multiplication", "Matrix-vector multiplication", "Matrix-matrix multiplication", "Dot products", "Outer products", "Hadamard products", "Transpose", "Identity and diagonal matrices", "Inverse", "Trace", "Determinant intuition", "Rank and null space", "Block matrices", "Concatenation", "Tensor reshaping", "Broadcasting", "Reductions", "Batch dimensions", "Neural-network shape checks"],
        explanation: `A vector is an ordered list of numbers. A matrix is a rectangular grid. A tensor generalizes these objects to more axes. In ML, the most useful first question is usually: “What is the shape?” If two adjacent dimensions in a matrix product do not match, the product is invalid.`,
        examples: [
          ["Matrix-vector product", `Let \(W\\in\\mathbb{R}^{3\\times2}\) and \(x\\in\\mathbb{R}^{2}\). Then \(Wx\\in\\mathbb{R}^{3}\). The inner dimension, \(2\), matches.`],
          ["Outer product", `If \(x\\in\\mathbb{R}^{3}\) and \(\\delta\\in\\mathbb{R}^{2}\), then \(x\\delta^\\top\\in\\mathbb{R}^{3\\times2}\). This shape often matches a weight matrix gradient.`],
          ["Attention score shape", `If \(Q,K\\in\\mathbb{R}^{n\\times d}\), then \(QK^\\top\\in\\mathbb{R}^{n\\times n}\). Each row can hold scores from one token to all tokens.`]
        ],
        practice: ["Find the shape of \(AB\) when \(A\) is \(4\\times7\) and \(B\) is \(7\\times3\).", "State whether a \(3\\times4\) matrix can multiply a \(5\\times3\) matrix in that order.", "Explain the difference between a dot product and an outer product."]
      },
      {
        title: "Vector Spaces and Geometry",
        summary: "Connect algebra to geometry: direction, distance, similarity, projection, and decision boundaries.",
        topics: ["Linear combinations", "Span", "Linear independence", "Basis and coordinates", "Vector spaces and subspaces", "Column, row, and null spaces", "L1, L2, and L-infinity norms", "Distance and similarity", "Dot product as alignment", "Angles", "Cosine similarity", "Orthogonality", "Orthonormal bases", "Projection", "Gram matrices", "Least squares", "Linear-regression geometry", "Hyperplanes", "Margin intuition"],
        explanation: `A vector is not only a list of numbers. You can also view it as a direction and a length. This view makes embeddings, linear regression, PCA, and classifiers much easier to understand.`,
        examples: [
          ["Cosine similarity", `For \(x=(1,0)\) and \(y=(1,1)\), \(x^\\top y=1\), \(\\|x\\|_2=1\), and \(\\|y\\|_2=\\sqrt2\). Thus \(\\cos\\theta=1/\\sqrt2\).`],
          ["Projection", `The projection of \(x\) onto nonzero \(u\) is \(\\operatorname{proj}_u(x)=\\frac{x^\\top u}{u^\\top u}u\). It keeps only the part of \(x\) that points along \(u\).`],
          ["Decision boundary", `A linear classifier can use \(w^\\top x+b=0\) as a boundary. Points on opposite sides give values with opposite signs.`]
        ],
        practice: ["Compute the L2 norm of \((3,4)\).", "When are two vectors orthogonal?", "Describe what the span of two non-parallel vectors in \(\\mathbb{R}^2\) is."]
      },
      {
        title: "Spectral Linear Algebra",
        summary: "Study the directions that matrices stretch, shrink, or preserve.",
        topics: ["Eigenvectors and eigenvalues", "Characteristic direction and scaling", "Diagonalization", "Symmetric matrices", "Positive-semidefinite matrices", "Covariance matrices", "Quadratic forms", "Singular value decomposition", "Singular values", "Spectral norm", "Frobenius norm", "Low-rank approximation", "PCA", "Condition number", "Ill-conditioning", "Spectral radius", "Repeated matrix multiplication", "Gradient propagation and singular values", "Variance preservation versus directional stretch"],
        explanation: `A general matrix changes both direction and length. Eigenvectors identify special directions that keep their direction. Singular values tell you how much the matrix stretches important directions. These ideas are central to PCA and to vanishing or exploding gradients.`,
        examples: [
          ["Eigenvector", `For \(A=\\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}\), \(e_1=(1,0)^\\top\) is an eigenvector with eigenvalue \(2\), because \(Ae_1=2e_1\).`],
          ["SVD", `The factorization \(A=U\\Sigma V^\\top\) can be read as: rotate into input directions with \(V^\\top\), stretch by \(\\Sigma\), then rotate into output directions with \(U\).`],
          ["Gradient scale", `If a backpropagated vector repeatedly meets matrices with dominant singular value near \(0.5\), its norm can shrink roughly like \(0.5^L\) across \(L\) similar layers.`]
        ],
        practice: ["Find the eigenvalues of a diagonal matrix with diagonal \((4,-1,2)\).", "Explain what a singular value larger than 1 means geometrically.", "Why can a large condition number make numerical work difficult?"]
      }
    ]
  },
  {
    stage: "Stage 2 — Multivariable and Matrix Calculus",
    lessons: [
      {
        title: "Multivariable Calculus",
        summary: "Extend single-variable derivatives to functions with many inputs and outputs.",
        topics: ["Functions of several variables", "Scalar-valued and vector-valued functions", "Partial derivatives", "Independent variables", "Total derivatives", "Directional derivatives", "Gradient", "Level sets", "Jacobians", "Hessians", "Mixed partial derivatives", "Local linear approximation", "Taylor expansion", "Curvature", "Stationary points", "Minima, maxima, and saddles", "Nondifferentiable points", "Subgradient intuition"],
        explanation: `With several inputs, a derivative must say which input changes. A partial derivative changes one input and holds the others fixed. A gradient collects all partial derivatives of a scalar-valued function. A Jacobian collects derivatives for a vector-valued function.`,
        examples: [
          ["Gradient", `For \(f(x,y)=x^2+3xy\), \(\\frac{\\partial f}{\\partial x}=2x+3y\) and \(\\frac{\\partial f}{\\partial y}=3x\). Therefore \(\\nabla f=(2x+3y,3x)^\\top\).`],
          ["Jacobian", `For \(g(x,y)=(x+y,xy)^\\top\), \(J_g=\\begin{bmatrix}1&1\\\\y&x\\end{bmatrix}\).`],
          ["First-order approximation", `Near \(x_0\), \(f(x)\\approx f(x_0)+\\nabla f(x_0)^\\top(x-x_0)\). This is the multivariable version of the tangent-line approximation.`]
        ],
        practice: ["Find \(\\nabla f\) for \(f(x,y)=x^2+y^2\).", "State the shape of the Jacobian for \(g:\\mathbb{R}^4\\to\\mathbb{R}^3\).", "What does \(\\nabla f=0\) tell you, and what does it not guarantee?"]
      },
      {
        title: "Matrix Calculus and Derivative Shapes",
        summary: "Predict derivative shapes first. Then compute the entries.",
        topics: ["Derivative layout conventions", "Derivative shape rules", "Scalar/vector/matrix derivatives", "Differentials", "Jacobians as local linear maps", "Vector chain rule", "Jacobian order", "Element-wise Jacobians", "Diagonal and block Jacobians", "Structural zero versus evaluated zero", "Affine, dot-product, quadratic, and matrix-product derivatives", "Broadcasting and reduction derivatives", "Sigmoid, tanh, ReLU, softmax, log-softmax, and log-sum-exp derivatives", "Normalization derivatives", "Gradient accumulation", "Batch gradients", "Finite-difference checks"],
        explanation: `Matrix calculus becomes easier when you separate two questions. First, what shape must the derivative have? Second, what numbers go into that shape? Shape reasoning catches many errors before algebra begins.`,
        examples: [
          ["Affine layer", `Let \(z=xW+b\), with \(x\\in\\mathbb{R}^{1\\times m}\), \(W\\in\\mathbb{R}^{m\\times n}\), and \(z\\in\\mathbb{R}^{1\\times n}\). If \(\\delta=\\partial L/\\partial z\), then \(\\frac{\\partial L}{\\partial W}=x^\\top\\delta\\in\\mathbb{R}^{m\\times n}\).`],
          ["Element-wise function", `If \(y_i=f(x_i)\), then \(\\frac{\\partial y_i}{\\partial x_j}=0\) when \(i\\ne j\). The Jacobian is diagonal: \(J=\\operatorname{diag}(f'(x_1),\\ldots,f'(x_n))\).`],
          ["Reduction", `If \(s=\\sum_{i=1}^{n}x_i\), then \(\\frac{\\partial s}{\\partial x}=(1,\\ldots,1)^\\top\). One scalar depends equally on every input entry.`]
        ],
        practice: ["For \(L\) scalar and \(W\) of shape \(5\\times3\), what shape must \(\\partial L/\\partial W\) have?", "Write the Jacobian structure for element-wise ReLU away from zero.", "Use shapes to verify \(x^\\top\\delta\) for an affine-layer weight gradient."]
      },
      {
        title: "Computation Graphs, Backpropagation, and Automatic Differentiation",
        summary: "See backpropagation as repeated local chain-rule operations on a computation graph.",
        topics: ["Computation graphs", "Forward values", "Local derivatives", "Upstream and downstream gradients", "Chain rule along paths", "Gradient contributions from branches", "Reverse-mode AD", "Forward-mode AD", "Affine layers", "Activations", "Reductions", "Shared parameters", "Embeddings", "Normalization", "Softmax and cross-entropy", "Parameter versus activation gradients", "Vector-Jacobian products", "Jacobian-vector products", "Backpropagation through time", "Stop-gradient", "Gradient checking", "Compute and memory cost"],
        explanation: `A computation graph splits a large formula into small operations. In the forward pass, each node computes a value. In the backward pass, each node receives a gradient from later nodes and multiplies it by a local derivative. If a value affects the loss through several paths, add the gradient contributions.`,
        examples: [
          ["Scalar chain rule", `If \(u=2x\), \(v=u^2\), and \(L=3v\), then \(\\frac{dL}{dx}=\\frac{dL}{dv}\\frac{dv}{du}\\frac{du}{dx}=3\\cdot 2u\\cdot2=12u=24x\).`],
          ["One neural layer", `For \(z^{(\\ell)}=a^{(\\ell-1)}W^{(\\ell)}+b^{(\\ell)}\) and \(a^{(\\ell)}=\\phi(z^{(\\ell)})\), define \(\\delta^{(\\ell)}=\\frac{\\partial L}{\\partial a^{(\\ell)}}\\odot\\phi'(z^{(\\ell)})\). Then \(\\frac{\\partial L}{\\partial W^{(\\ell)}}=(a^{(\\ell-1)})^\\top\\delta^{(\\ell)}\).`],
          ["Branching", `If \(L=g(x)+h(x)\), then \(\\frac{dL}{dx}=g'(x)+h'(x)\). Backpropagation must add both paths.`]
        ],
        practice: ["Differentiate \(L=(3x+1)^2\) by naming each local operation.", "Why is reverse mode efficient when the final output is one scalar loss?", "What happens to gradients at a node that feeds two later branches?"]
      }
    ]
  },
  {
    stage: "Stage 3 — Probability, Statistics, and Information",
    lessons: [
      {
        title: "Probability Foundations",
        summary: "Model uncertainty with random variables, distributions, expectation, variance, and conditional probability.",
        topics: ["Sample spaces and events", "Probability axioms", "Conditional probability", "Independence", "Total probability", "Bayes’ theorem", "Random variables", "Discrete and continuous variables", "PMF, PDF, and CDF", "Joint, marginal, and conditional distributions", "Expectation", "Variance and standard deviation", "Covariance and correlation", "Random vectors", "Covariance matrices", "Linear transformations", "Total expectation and variance", "Bernoulli, categorical, binomial, multinomial, uniform, Gaussian, exponential, and Poisson distributions", "Sampling", "Monte Carlo approximation"],
        explanation: `Probability gives a mathematical language for uncertainty. A random variable maps an uncertain outcome to a number. A distribution tells you how likely different values are. Expectation gives a long-run average. Variance describes spread around that average.`,
        examples: [
          ["Expectation", `For a fair six-sided die, \(E[X]=\\sum_{x=1}^{6}x\\cdot\\frac16=3.5\).`],
          ["Bayes’ theorem", `\(P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}\). It reverses the direction of a conditional probability when the required terms are known.`],
          ["Variance", `If \(X\) has mean \(\\mu\), then \(\\operatorname{Var}(X)=E[(X-\\mu)^2]\). Large deviations count more because they are squared.`]
        ],
        practice: ["Find the expected value of a Bernoulli variable with success probability \(p\).", "State the difference between independence and mutual exclusivity.", "Why is covariance zero not always the same as independence?"]
      },
      {
        title: "Statistical Inference and Experimental Reasoning",
        summary: "Learn what a sample can tell you about a population, and where experiments can mislead you.",
        topics: ["Population and sample", "Parameters and estimators", "Sampling distributions", "Estimator bias and variance", "Consistency", "Maximum likelihood", "Log-likelihood", "MAP estimation", "Priors, likelihoods, and posteriors", "Law of large numbers", "Central limit theorem", "Standard error", "Confidence intervals", "Hypothesis tests", "p-values", "Bootstrap", "Effect size", "Multiple comparisons", "Selection bias", "Train/validation/test splits", "Cross-validation", "Hyperparameter-selection bias", "Data leakage", "Ablations", "Statistical versus practical significance", "Reproducibility and seeds"],
        explanation: `A model result is measured on a finite sample, but we usually care about a larger population. Statistical inference tells us how uncertain our estimate is. Experimental reasoning also asks whether our evaluation procedure leaks information or selects a result unfairly.`,
        examples: [
          ["Maximum likelihood", `For Bernoulli observations \(x_i\\in\\{0,1\\}\), the likelihood of parameter \(p\) is \(L(p)=\\prod_i p^{x_i}(1-p)^{1-x_i}\). Maximizing it gives the sample success rate.`],
          ["Standard error", `For an estimated mean, the standard error often scales like \(s/\\sqrt{n}\). More independent samples reduce uncertainty at roughly the square-root rate.`],
          ["Data leakage", `If you normalize using the mean and variance of the full dataset before the train/test split, test information has entered training. Fit preprocessing on training data only.`]
        ],
        practice: ["Explain what a 95% confidence interval does and does not mean.", "Why can repeated hyperparameter tuning on the test set bias the final score?", "Give one example of an ablation study."]
      },
      {
        title: "Information Theory",
        summary: "Measure uncertainty, surprise, coding cost, and distribution mismatch.",
        topics: ["Self-information", "Entropy", "Binary entropy", "Joint and conditional entropy", "Cross-entropy", "KL divergence", "Mutual information", "Conditional mutual information", "Entropy chain rule", "Coding interpretation", "Maximum entropy", "Perplexity", "Cross-entropy as negative log-likelihood", "Jensen’s inequality", "Gibbs’ inequality", "Categorical and Gaussian entropy", "Information bottleneck", "Feature selection", "Variational inference", "Why KL is not symmetric"],
        explanation: `Information theory gives numbers to uncertainty and surprise. Rare events carry more information than common events. Entropy is the average information in a distribution. Cross-entropy measures the coding cost when one distribution is used to describe data from another.`,
        examples: [
          ["Self-information", `An event with probability \(p\) has information \(I=-\\log p\). If \(p\) is small, the event is surprising and \(I\) is large.`],
          ["Cross-entropy", `For one-hot target \(y\) and predicted probabilities \(q\), \(H(y,q)=-\\sum_i y_i\\log q_i=-\\log q_{\\text{correct}}\).`],
          ["Perplexity", `If the average token cross-entropy is \(H\) using natural logs, perplexity is \(e^H\). Lower perplexity means the model assigns more probability to the observed sequence.`]
        ],
        practice: ["Why does an event with probability 1 have zero self-information?", "Explain why KL divergence is not generally symmetric.", "Show how one-hot cross-entropy reduces to negative log probability of the correct class."]
      }
    ]
  },
  {
    stage: "Stage 4 — Optimization",
    lessons: [
      {
        title: "Unconstrained Optimization",
        summary: "Understand what optimizers do to a loss surface and why learning rate, curvature, and noise matter.",
        topics: ["Objectives and losses", "Parameter spaces", "Gradient direction", "Gradient descent", "Learning rate", "Batch, stochastic, and mini-batch gradients", "Taylor approximation", "Smoothness", "Lipschitz continuity", "Convex and non-convex objectives", "Local and global minima", "Saddles and plateaus", "Gradient noise", "Momentum", "Nesterov momentum", "AdaGrad", "RMSProp", "Adam", "Schedules and warm-up", "Weight decay", "First- and second-order methods", "Hessian", "Newton’s method", "Quasi-Newton methods", "Conditioning", "Line search", "Early stopping", "Gradient clipping"],
        explanation: `Optimization chooses parameter updates that reduce an objective. The negative gradient is the locally steepest descent direction. The learning rate controls how far the optimizer moves. Curvature and noise determine how reliable that local direction is.`,
        examples: [
          ["Gradient descent", `For \(L(w)=(w-3)^2\), \(L'(w)=2(w-3)\). With \(w_0=0\) and \(\\eta=0.1\), \(w_1=w_0-\\eta L'(w_0)=0-0.1(-6)=0.6\).`],
          ["Momentum", `Momentum keeps a running direction. One common form is \(v_t=\\beta v_{t-1}+g_t\), then \(\\theta_t=\\theta_{t-1}-\\eta v_t\).`],
          ["Gradient clipping", `Global norm clipping can replace \(g\) by \(g\\cdot c/\\|g\\|\) when \(\\|g\\|>c\). Direction is preserved while the step is bounded.`]
        ],
        practice: ["Perform one gradient-descent step for \(L(w)=w^2\) from \(w=4\) with \(\\eta=0.25\).", "Why can a very large learning rate increase the loss?", "What problem does gradient clipping address?"]
      },
      {
        title: "Convex Optimization, Constraints, and Duality",
        summary: "Connect constraints, Lagrange multipliers, primal problems, dual problems, and KKT conditions.",
        topics: ["Convex sets", "Convex combinations", "Convex functions", "Strict and strong convexity", "Jensen’s inequality", "Convex losses", "Constrained optimization", "Equality and inequality constraints", "Lagrange multipliers", "Lagrangian", "Primal problem", "Dual function", "Dual problem", "Weak and strong duality", "Slater’s condition", "KKT conditions", "Regularization as a constraint", "L1 and L2 regularization", "Sparsity", "Proximal operators", "Coordinate descent", "Projected gradient descent", "Maximum margin and feature selection"],
        explanation: `A constrained problem asks for the best solution inside an allowed set. A Lagrange multiplier attaches a price to violating a constraint. The primal problem is the original problem. The dual problem gives a related bound and can be easier to solve or interpret.`,
        examples: [
          ["Convex combination", `If \(x\) and \(y\) are in a convex set, then \(\\lambda x+(1-\\lambda)y\) is also in the set for every \(0\\le\\lambda\\le1\).`],
          ["Lagrangian", `For \(\\min_x f(x)\) subject to \(h(x)=0\), form \(\\mathcal{L}(x,\\lambda)=f(x)+\\lambda h(x)\). At a regular optimum, the constraint and stationarity conditions hold together.`],
          ["Regularization", `A constrained problem such as \(\\min L(w)\) subject to \(\\|w\\|_2^2\\le c\) is closely related to penalized optimization \(\\min L(w)+\\lambda\\|w\\|_2^2\).`]
        ],
        practice: ["Give a geometric definition of a convex set.", "What is the difference between the primal and dual problem?", "Why does L1 regularization often promote sparse solutions?"]
      }
    ]
  },
  {
    stage: "Stage 5 — Numerical and Statistical Learning Foundations",
    lessons: [
      {
        title: "Numerical Computation for ML",
        summary: "Understand why mathematically equivalent formulas can behave differently on finite-precision computers.",
        topics: ["Floating-point representation", "Rounding error", "Catastrophic cancellation", "Underflow and overflow", "Numerical stability", "Stable softmax", "Log-sum-exp", "Stable variance", "Epsilon terms", "Conditioning", "Iterative methods", "Finite differences", "Gradient checking", "Vectorization", "Memory layout", "Dense and sparse computation", "Matrix-operation complexity", "Time-memory trade-offs", "Random-number generation", "Equivalent formulas with different numerical behavior"],
        explanation: `Computers store approximate real numbers. Very large values can overflow. Very small values can underflow. Subtracting two nearly equal large numbers can destroy useful precision. Stable formulas produce nearly the same mathematical result while avoiding these failures.`,
        examples: [
          ["Stable softmax", `Instead of \(\\operatorname{softmax}(z_i)=e^{z_i}/\\sum_j e^{z_j}\), use \(e^{z_i-m}/\\sum_j e^{z_j-m}\) where \(m=\\max_j z_j\). The probabilities are unchanged, but overflow risk is much smaller.`],
          ["Log-sum-exp", `Compute \(\\log\\sum_i e^{x_i}\) as \(m+\\log\\sum_i e^{x_i-m}\), where \(m=\\max_i x_i\).`],
          ["Finite-difference check", `A scalar derivative can be checked with \(f'(x)\\approx\\frac{f(x+\\epsilon)-f(x-\\epsilon)}{2\\epsilon}\) for a small but not excessively small \(\\epsilon\).`]
        ],
        practice: ["Why can direct softmax overflow for large logits?", "What is catastrophic cancellation?", "Why should epsilon in a finite-difference check not be made arbitrarily tiny?"]
      },
      {
        title: "Statistical Learning Theory and Model Selection",
        summary: "Separate fitting the training set from learning patterns that generalize.",
        topics: ["Supervised, unsupervised, and self-supervised learning", "Empirical and expected risk", "Training and generalization error", "Underfitting and overfitting", "Bias-variance trade-off", "Model capacity", "Regularization", "Inductive bias", "Model selection", "Curse of dimensionality", "Feature-selection methods", "VC dimension intuition", "PAC intuition", "Markov, Chebyshev, and Hoeffding inequalities", "Distribution shift", "Covariate shift", "Calibration", "Class imbalance", "Precision, recall, ROC, PR, and scoring rules", "Causal versus predictive claims", "No-free-lunch intuition"],
        explanation: `A model is useful when it performs well on new data, not only on its training examples. Learning theory studies the gap between training performance and expected performance. Model selection tries to control this gap without making the model too simple.`,
        examples: [
          ["Empirical risk", `For losses \(\\ell_i\) on \(n\) training examples, empirical risk is \(\\hat R=\\frac1n\\sum_{i=1}^{n}\\ell_i\). Expected risk is the corresponding average over the unknown data-generating distribution.`],
          ["Precision and recall", `\(\\text{precision}=TP/(TP+FP)\) and \(\\text{recall}=TP/(TP+FN)\). The useful metric depends on the cost of false positives and false negatives.`],
          ["Calibration", `Among predictions assigned probability near \(0.8\), a calibrated model should be correct about 80% of the time.`]
        ],
        practice: ["Explain underfitting and overfitting with one example each.", "Why can accuracy be misleading for a highly imbalanced class?", "What is the difference between a predictive claim and a causal claim?"]
      }
    ]
  },
  {
    stage: "Stage 6 — Deep-Learning-Specific Mathematics",
    lessons: [
      {
        title: "Neural-Network Signal Propagation",
        summary: "Track activation and gradient scale through depth, and understand initialization and normalization.",
        topics: ["Affine transformations", "Activation functions", "Saturation", "Local activation derivatives", "Vanishing and exploding gradients", "Products of Jacobians", "Gradient norms", "Activation means and variances", "Variance propagation", "Initialization assumptions", "Fan-in and fan-out", "Xavier/Glorot", "He initialization", "Orthogonal initialization", "Layer-Jacobian singular values", "Dynamical-isometry intuition", "Batch normalization", "Layer normalization", "Mean and variance derivatives", "Residual connections", "Skip paths", "Dropout", "Expected activation", "Inverted dropout", "Gradient clipping", "Dead ReLU units", "Gating", "Initialization-normalization-activation-depth relationship"],
        explanation: `Deep networks repeatedly transform signals. If each layer shrinks a signal, depth can make it almost zero. If each layer expands it, depth can make it huge. Good initialization, activation choice, normalization, and residual paths help keep useful signal scales during the forward and backward passes.`,
        examples: [
          ["Variance intuition", `If inputs are independent, zero-mean, and have variance \(q\), and a preactivation is \(z=\\sum_{j=1}^{n}w_jx_j\), then under common independence assumptions \(\\operatorname{Var}(z)\\approx n\\operatorname{Var}(w)q\).`],
          ["He scale", `For ReLU networks, a common initialization uses \(\\operatorname{Var}(w)\\approx2/n_{\\text{in}}\). The factor 2 compensates, approximately, for ReLU removing about half of a symmetric signal.`],
          ["Residual path", `For \(y=x+F(x)\), the Jacobian is \(\\frac{\\partial y}{\\partial x}=I+J_F\). The identity term gives gradients a direct path through the block.`]
        ],
        practice: ["Explain why repeated multiplication by values smaller than 1 can cause vanishing gradients.", "What do fan-in and fan-out mean?", "Why does a residual connection help gradient flow?"]
      }
    ]
  },
  {
    stage: "Specialist Paper Tracks",
    lessons: [
      {
        title: "Language Models, Embeddings, and Attention",
        summary: "Prepare for language-model, Word2vec, sequence-to-sequence, attention, and Transformer papers.",
        topics: ["One-hot vectors", "Categorical distributions", "Token likelihood", "Autoregressive factorization", "Softmax classifiers", "Cross-entropy and perplexity", "Embedding lookup", "Sparse embedding gradients", "Distributional semantics", "Cosine similarity", "Matrix factorization view", "Negative sampling", "Noise-contrastive estimation", "Hierarchical softmax", "Context windows", "Recurrent states", "BPTT", "Encoder-decoder models", "Query/key/value projections", "Scaled dot-product attention", "Causal masks", "Multi-head attention", "Positional encodings", "Residual paths", "Layer normalization", "Token- and sequence-level objectives"],
        explanation: `Language models assign probabilities to token sequences. Embeddings turn discrete token identities into learned vectors. Attention lets each token form a weighted combination of information from other tokens.`,
        examples: [
          ["Autoregressive factorization", `A sequence probability can be written as \(P(x_1,\\ldots,x_T)=\\prod_{t=1}^{T}P(x_t\\mid x_{<t})\).`],
          ["Attention", `Scaled dot-product attention is \(\\operatorname{softmax}(QK^\\top/\\sqrt{d_k})V\). If \(Q,K\\in\\mathbb{R}^{n\\times d_k}\), the score matrix is \(n\\times n\).`],
          ["Embedding lookup", `If \(E\\in\\mathbb{R}^{V\\times d}\), token id \(i\) selects row \(E_i\). Only rows used by the batch need nonzero gradients in a basic embedding lookup.`]
        ],
        practice: ["Explain why causal attention masks future tokens.", "Derive the shape of \(QK^\\top\).", "What does perplexity measure?"]
      },
      {
        title: "Convolution and Signal Processing",
        summary: "Build the mathematical base for CNN and vision-model papers.",
        topics: ["Discrete signals", "Convolution", "Cross-correlation", "Kernels and filters", "Padding, stride, and dilation", "Channels", "Receptive fields", "Pooling", "Translation equivariance", "Toeplitz view", "Fourier transform", "Frequency-domain intuition", "Aliasing and downsampling", "Convolution gradients"],
        explanation: `A convolutional layer applies the same small filter at many locations. Weight sharing makes the operation efficient and gives useful translation behavior. Stride, padding, and dilation control output size and receptive field.`,
        examples: [
          ["1-D cross-correlation", `For input \(x=(1,2,3,4)\) and filter \(k=(2,-1)\), valid cross-correlation gives \((1\\cdot2+2(-1),\;2\\cdot2+3(-1),\;3\\cdot2+4(-1))=(0,1,2)\).`],
          ["Output size", `For input width \(n\), kernel \(k\), padding \(p\), dilation \(d\), and stride \(s\), a common output-size formula is \(\\left\\lfloor\\frac{n+2p-d(k-1)-1}{s}+1\\right\\rfloor\).`],
          ["Receptive field", `Stacked small kernels let deeper units depend on a larger region of the original input even when each layer uses a local operation.`]
        ],
        practice: ["Compute a valid 1-D cross-correlation for a short input and kernel.", "What does stride do to output resolution?", "Why can downsampling without suitable filtering cause aliasing?"]
      },
      {
        title: "Sets, Graphs, and Geometric Deep Learning",
        summary: "Prepare for Deep Sets, graph neural networks, graph attention, and geometric deep learning.",
        topics: ["Permutations", "Permutation invariance and equivariance", "Symmetry", "Group actions", "Invariant and equivariant functions", "Set-function forms", "Graphs", "Adjacency and degree matrices", "Graph Laplacians", "Graph spectra", "Neighborhood aggregation", "Message passing", "Graph convolution", "Graph attention", "Isomorphism intuition", "Manifolds", "Tangent spaces", "Geodesic distance", "Local coordinates", "Transformation groups", "Representations of symmetry groups", "Gauge intuition"],
        explanation: `Some data has no natural order. A set should give the same result after its elements are permuted. A graph has nodes and edges, so models must respect graph structure rather than assume a regular grid.`,
        examples: [
          ["Permutation invariance", `A set encoder such as \(f(X)=\\rho(\\sum_{x\\in X}\\phi(x))\) is unchanged when the elements of \(X\) are reordered.`],
          ["Graph message passing", `A node update can aggregate neighbor states: \(h_v'=\\phi(h_v,\\sum_{u\\in N(v)}\\psi(h_u))\). The sum does not depend on neighbor ordering.`],
          ["Graph Laplacian", `For adjacency matrix \(A\) and degree matrix \(D\), the unnormalized graph Laplacian is \(L=D-A\).`]
        ],
        practice: ["Give one invariant and one equivariant operation on a set.", "Why is neighbor sum aggregation permutation invariant?", "Build the degree matrix for a three-node path graph."]
      },
      {
        title: "Latent-Variable and Generative Models",
        summary: "Prepare for VAE, GAN, flow, and diffusion-related papers.",
        topics: ["Latent variables", "Marginalization", "Posterior inference", "Jensen’s inequality", "ELBO", "Variational inference", "Reparameterization", "Monte Carlo gradients", "Importance sampling", "Change of variables", "Jacobian determinant", "Normalizing flows", "Minimax optimization", "Game-theoretic equilibrium", "GAN objectives", "Score functions", "Denoising objectives", "Markov noise processes", "SDE intuition"],
        explanation: `A latent-variable model explains observed data by hidden variables. Exact posterior inference is often hard, so variational methods use a simpler approximation. Flow models use invertible transformations. Diffusion models learn to reverse a gradual noise process.`,
        examples: [
          ["Marginalization", `If \(z\) is latent, the observed-data likelihood is \(p(x)=\\int p(x,z)\\,dz\), or a sum when \(z\) is discrete.`],
          ["ELBO", `A common variational objective is \(\\log p(x)\\ge E_{q(z|x)}[\\log p(x|z)]-D_{KL}(q(z|x)\\|p(z))\).`],
          ["Change of variables", `For an invertible map \(x=f(z)\), densities include a Jacobian-determinant correction: \(p_X(x)=p_Z(z)\\left|\\det\\frac{\\partial z}{\\partial x}\\right|\).`]
        ],
        practice: ["Why do latent variables need marginalization when they are not observed?", "What two terms appear in the common VAE ELBO?", "Why does a change of variables require a Jacobian determinant?"]
      },
      {
        title: "Sequential Decision-Making and Reinforcement Learning",
        summary: "Prepare for reinforcement-learning papers built on Markov decision processes and Bellman equations.",
        topics: ["Markov chains", "Transition matrices", "Stationary distributions", "Markov decision processes", "States, actions, rewards, and policies", "Discounted return", "Value functions", "Action-value functions", "Bellman expectation and optimality equations", "Dynamic programming", "Monte Carlo evaluation", "Temporal-difference learning", "Q-learning", "Policy gradients", "Advantage functions", "Importance sampling", "Exploration and exploitation"],
        explanation: `Reinforcement learning studies an agent that acts, observes consequences, and tries to maximize long-term reward. The Markov assumption says the current state contains the information needed to predict the next state, given the action.`,
        examples: [
          ["Discounted return", `From time \(t\), \(G_t=R_{t+1}+\\gamma R_{t+2}+\\gamma^2R_{t+3}+\\cdots\), with \(0\\le\\gamma<1\) in many tasks.`],
          ["Bellman equation", `For a fixed policy, \(V^\\pi(s)=E_\\pi[R_{t+1}+\\gamma V^\\pi(S_{t+1})\\mid S_t=s]\).`],
          ["Q-learning", `A tabular update is \(Q(s,a)\\leftarrow Q(s,a)+\\alpha[r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)]\).`]
        ],
        practice: ["What does the discount factor control?", "State the Markov property in words.", "What is the difference between a value function and an action-value function?"]
      },
      {
        title: "Kernel and Classical Statistical Learning Methods",
        summary: "Prepare for SVM, kernel, tree, bagging, random-forest, and boosting papers.",
        topics: ["Similarity functions", "PSD kernels", "Feature maps", "Kernel trick", "RKHS intuition", "Margin geometry", "Support-vector machines", "Kernel regression", "Decision trees", "Bagging", "Random forests", "Boosting", "Additive models", "Gradient boosting"],
        explanation: `Kernel methods compare examples through a similarity function that can act like an inner product in a richer feature space. Tree ensembles take a different route: they combine many simple decision rules to create a stronger predictor.`,
        examples: [
          ["Kernel trick", `If \(k(x,z)=\\phi(x)^\\top\\phi(z)\), an algorithm can use \(k\) without explicitly constructing the possibly high-dimensional feature vector \(\\phi(x)\).`],
          ["Margin", `For a linear separator \(w^\\top x+b=0\), the geometric margin of a labeled point \((x_i,y_i)\) is proportional to \(y_i(w^\\top x_i+b)/\\|w\\|_2\).`],
          ["Bagging", `Bagging trains several models on resampled data and averages their outputs. This can reduce variance when the individual models are unstable.`]
        ],
        practice: ["What property must a valid kernel matrix satisfy?", "What does the SVM margin measure?", "Contrast bagging with boosting in one or two sentences."]
      }
    ]
  },
  {
    stage: "Final Module",
    lessons: [
      {
        title: "Paper-Reading Practicum",
        summary: "Apply a repeatable workflow to equations, assumptions, derivations, examples, and implementations in real papers.",
        topics: ["Identify mathematical objects", "Annotate shapes", "Translate notation", "Separate definitions from claims", "Find the central objective", "Reconstruct one derivation", "List assumptions", "Create a toy numerical example", "Implement the equation", "Separate mathematical and empirical evidence"],
        explanation: `Do not read a technical paper from top to bottom as if it were a novel. First identify the mathematical objects and their shapes. Then locate the central objective or update rule. Rebuild one important derivation with small numbers. Finally compare the mathematical claims with the experimental evidence.`,
        examples: [
          ["Shape annotation", `If a paper writes \(H=XW\), add your own notes such as \(X:n\\times d\), \(W:d\\times h\), and \(H:n\\times h\). This simple step catches many reading errors.`],
          ["Toy reconstruction", `If the paper uses attention, test it first with two tokens and two-dimensional vectors. Calculate \(QK^\\top\), softmax, and the weighted sum by hand.`],
          ["Assumption ledger", `Write assumptions separately from conclusions. For example: “Assume independent zero-mean inputs” is not an observed fact. It is a condition used by the derivation.`]
        ],
        practice: ["Choose one equation from a paper and annotate every object with a shape.", "Rewrite one definition in your own consistent notation.", "List one mathematical claim and one empirical observation from the same paper."]
      }
    ]
  }
];

const LESSONS = COURSE.flatMap(section => section.lessons.map(lesson => ({...lesson, stage: section.stage})));
LESSONS.forEach((lesson, index) => {
  lesson.day = index + 1;
  lesson.slug = `day-${String(index + 1).padStart(2, '0')}-${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
});
