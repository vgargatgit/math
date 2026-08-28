(() => {
  const day21 = COURSE[6].lessons[5];

  day21.sections.push(
    {
      id: "common-mistakes",
      title: "17. Common mistakes when reading classical-learning papers",
      html: String.raw`
        <h3>Mistake 1: call every similarity a valid kernel</h3>
        <p>A similarity can be useful without producing PSD Gram matrices. Kernel algorithms that assume PSD structure can behave differently with an indefinite similarity.</p>
        <h3>Mistake 2: think the kernel trick creates information</h3>
        <p>A richer feature space changes the representation and hypothesis class. It does not create new labels or remove noise from the data.</p>
        <h3>Mistake 3: assume a high-dimensional feature map must be constructed</h3>
        <p>The kernel trick is useful precisely because many algorithms can use \(k(x,z)\) without explicitly building \(\phi(x)\).</p>
        <h3>Mistake 4: interpret a kernel value as a probability</h3>
        <p>An RBF kernel lies between zero and one, but it is not automatically a calibrated probability. It is a similarity value.</p>
        <h3>Mistake 5: confuse the SVM score with distance</h3>
        <p>The raw score is \(w^\top x+b\). Geometric distance divides by \(\|w\|_2\).</p>
        <h3>Mistake 6: think every training point is a support vector</h3>
        <p>Only examples with nonzero dual coefficients contribute to a standard kernel-SVM decision function. Their number depends on the data and regularization.</p>
        <h3>Mistake 7: compare SVM \(C\) values across different objective conventions</h3>
        <p>Libraries can scale the data-fit term by \(n\), use inverse regularization parameters, or normalize losses differently. Read the exact objective.</p>
        <h3>Mistake 8: confuse kernel bandwidth with ridge regularization</h3>
        <p>Bandwidth changes the geometry of similarity. Ridge regularization changes the fitted coefficients. Both affect smoothness, but through different mechanisms.</p>
        <h3>Mistake 9: assume a deeper tree is always better</h3>
        <p>A deep tree can reduce training error and increase variance. Validation performance can worsen.</p>
        <h3>Mistake 10: read tree feature importance as causal importance</h3>
        <p>A feature can be predictive because it is correlated with another variable. Split-based importance is not evidence of a causal effect.</p>
        <h3>Mistake 11: say bagging removes bias</h3>
        <p>Bagging is mainly a variance-reduction method. It can affect bias, but averaging unstable predictors is not primarily a bias-correction mechanism.</p>
        <h3>Mistake 12: think random forests choose a random split</h3>
        <p>A typical random forest chooses a random subset of candidate features and then searches for a good split among them.</p>
        <h3>Mistake 13: treat boosting as majority voting</h3>
        <p>Boosting constructs a weighted additive function. In gradient boosting, each new learner is fitted to a loss-derived target.</p>
        <h3>Mistake 14: think gradient boosting means gradient descent on tree parameters</h3>
        <p>The standard view takes a gradient in function space, then fits a new tree to approximate that direction. Tree split parameters are selected by the tree-building algorithm.</p>
        <h3>Mistake 15: compare probability calibration without checking the output transformation</h3>
        <p>An SVM margin score, boosted logit, forest class frequency, and calibrated probability are different objects.</p>
        <h3>Mistake 16: compare models without matching preprocessing</h3>
        <p>Kernel methods can be sensitive to feature scales. Trees are usually less sensitive to monotone feature scaling. A benchmark can be unfair if preprocessing is tuned for one family only.</p>
        <h3>Mistake 17: ignore dataset size in algorithmic claims</h3>
        <p>A method that is excellent for \(n=5{,}000\) can be impractical for \(n=5{,}000{,}000\). Kernel-matrix scaling and ensemble inference cost matter.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "18. A paper-reading workflow for kernels, SVMs, trees, and boosting",
      html: String.raw`
        <p>Use the following sequence when a paper reports a classical statistical-learning model.</p>
        <ol>
          <li><strong>Identify the task.</strong> Write whether the target is classification, regression, ranking, anomaly detection, or structured prediction.</li>
          <li><strong>Write the input shape.</strong> Record \(X\in\mathbb R^{n\times d}\), or the non-vector input domain if a custom kernel is used.</li>
          <li><strong>Find preprocessing.</strong> Look for standardization, missing-value handling, categorical encoding, feature selection, and leakage-sensitive transformations.</li>
          <li><strong>If it is a kernel method, write the kernel.</strong> Record \(k(x,z)\), all bandwidth or degree parameters, and whether the kernel is known to be PSD.</li>
          <li><strong>Write the Gram-matrix shape.</strong> For \(n\) training points, mark \(K\in\mathbb R^{n\times n}\).</li>
          <li><strong>Find the learned coefficients.</strong> In a dual kernel model, ask whether there is one coefficient per training point, per support vector, or per inducing feature.</li>
          <li><strong>For an SVM, write the exact margin objective.</strong> Check hinge loss, regularization scaling, class weights, and multiclass strategy.</li>
          <li><strong>For a tree, identify the split criterion.</strong> Record Gini, entropy, squared error, or a task-specific criterion.</li>
          <li><strong>Record structural regularization.</strong> Check maximum depth, minimum samples per leaf, pruning, feature subsampling, and row subsampling.</li>
          <li><strong>For bagging, ask how base models differ.</strong> Bootstrap samples, feature subsets, random seeds, and data subsampling create diversity.</li>
          <li><strong>For boosting, identify the additive score.</strong> Write \(F_m=F_{m-1}+\eta h_m\) and determine what the score means before any sigmoid or softmax.</li>
          <li><strong>Write the loss gradient.</strong> For gradient boosting, compute the pseudo-residual definition and verify the sign.</li>
          <li><strong>Check computational scaling.</strong> Record training and inference dependence on \(n\), \(d\), number of trees, tree depth, and number of support vectors.</li>
          <li><strong>Check validation protocol.</strong> Hyperparameters for classical models can be powerful. Ensure the paper uses a validation set or nested cross-validation without test leakage.</li>
          <li><strong>Check class imbalance.</strong> Accuracy can hide failure on minority classes. Look for class weights, balanced metrics, or threshold selection.</li>
          <li><strong>Compare the baseline fairly.</strong> Strong tabular baselines often need tuned random forests or gradient-boosted trees, not a default single tree.</li>
        </ol>

        <h3>Kernel-SVM shape trace</h3>
        <p>Suppose \(n=2{,}000\) training examples have \(d=50\) input features. The raw data matrix is \(X\in\mathbb R^{2000\times50}\). An RBF kernel produces \(K\in\mathbb R^{2000\times2000}\).</p>
        <p>If the final SVM has \(m=180\) support vectors and a test batch has \(B=64\), then</p>
        <p>\[
        K_{\text{test,SV}}\in\mathbb R^{64\times180}.
        \]</p>
        <p>The weighted sum across the support-vector axis produces one binary score per test example, \(f\in\mathbb R^{64}\).</p>

        <h3>Gradient-boosting trace</h3>
        <p>Suppose \(n=10{,}000\) examples are used for scalar regression. At stage \(m\), current predictions and pseudo-residuals both have shape \(\mathbb R^{10000}\). A regression tree is fitted from \(X\in\mathbb R^{10000\times d}\) to those pseudo-residuals. Its output has the same 10,000-entry shape, so</p>
        <p>\[
        F_m=F_{m-1}+\eta h_m(X)
        \]</p>
        <p>is shape-compatible.</p>
        <div class="paper-connection"><strong>Core habit.</strong> Write the object that is averaged or added. A forest averages tree predictions. Gradient boosting adds stage-wise corrections. A kernel model forms weighted similarities. These operations are mathematically different even when all three produce one final score.</div>
      `
    },
    {
      id: "day21-recap",
      title: "19. Recap",
      html: String.raw`
        <ul>
          <li>A similarity function returns one scalar comparison between two inputs.</li>
          <li>A PSD kernel produces PSD Gram matrices and acts like an inner product in a feature space.</li>
          <li>A feature map \(\phi(x)\) makes the kernel geometry explicit.</li>
          <li>The kernel trick replaces feature-space dot products by direct kernel evaluations.</li>
          <li>An RKHS is a function space whose kernel supports evaluation by inner products.</li>
          <li>Margin geometry uses normalized distance to a separating hyperplane.</li>
          <li>An SVM balances a large margin against training violations.</li>
          <li>The SVM dual exposes training-example dot products and enables kernelization.</li>
          <li>Kernel regression predicts through similarity-weighted targets or Gram-matrix coefficients.</li>
          <li>A decision tree partitions feature space with threshold rules.</li>
          <li>Tree split criteria measure class impurity or regression error reduction.</li>
          <li>Bagging averages predictors trained on resampled data to reduce variance.</li>
          <li>Random forests reduce tree correlation by adding feature randomness.</li>
          <li>Boosting builds a sequential additive model.</li>
          <li>Gradient boosting fits each new learner to a negative loss-gradient target.</li>
          <li>Kernel methods can scale poorly with the number of training examples, while tree ensembles scale through different computational bottlenecks.</li>
        </ul>
      `
    }
  );

  day21.examples = [
    ["RBF similarity", String.raw`If \(\|x-z\|_2^2=5\) and \(\gamma=0.2\), then \(k(x,z)=e^{-1}\approx0.368\).`],
    ["Polynomial feature map", String.raw`For \(k(x,z)=(1+xz)^2\), one valid scalar-input map is \(\phi(x)=(1,\sqrt2x,x^2)^\top\).`],
    ["Kernel predictor", String.raw`For kernel values \((0.8,0.2,0.5)\), coefficients \((2,-1,0.5)\), and \(b=0.1\), the score is \(1.75\).`],
    ["Geometric distance", String.raw`For \(w=(3,4)^\top\), \(b=-5\), and \(x=(3,2)^\top\), the score is \(12\) and the signed distance is \(12/5=2.4\).`],
    ["Hinge loss", String.raw`For \(y=+1\) and score \(0.4\), hinge loss is \(\max(0,1-0.4)=0.6\).`],
    ["Kernel regression", String.raw`For targets \((2,5,8)\) and normalized kernel weights \((0.6,0.3,0.1)\), the prediction is \(3.5\).`],
    ["Gini impurity", String.raw`For class proportions \((0.8,0.2)\), Gini impurity is \(1-0.8^2-0.2^2=0.32\).`],
    ["Bagged average", String.raw`Tree predictions \((8,9.5,7.5,8.5,9)\) average to \(8.5\).`],
    ["Forest average", String.raw`Four regression trees that predict \((4,6,5,7)\) give forest prediction \(5.5\).`],
    ["Gradient-boosting residual", String.raw`For current predictions \((3,5,4)\) and targets \((5,4,7)\), squared-error pseudo-residuals are \((2,-1,3)\).`]
  ];

  day21.practice = [
    String.raw`What is the shape of a full Gram matrix for \(n\) training examples?<details><summary>Answer</summary><p>\(n\times n\). Entry \((i,j)\) is \(k(x_i,x_j)\).</p></details>`,
    String.raw`For \(k(x,z)=x^\top z\), why is the Gram matrix PSD?<details><summary>Answer</summary><p>For any coefficient vector \(c\), \(c^\top Kc=\|\sum_i c_i x_i\|_2^2\ge0\).</p></details>`,
    String.raw`Expand \((1+xz)^2\) and give one scalar-input feature map.<details><summary>Answer</summary><p>\(1+2xz+x^2z^2\). One map is \(\phi(x)=(1,\sqrt2x,x^2)^\top\).</p></details>`,
    String.raw`What does the kernel trick replace?<details><summary>Answer</summary><p>It replaces an explicit feature-space inner product \(\phi(x)^\top\phi(z)\) with a kernel evaluation \(k(x,z)\).</p></details>`,
    String.raw`If \(f(x)=\sum_i\alpha_i k(x_i,x)\), what do the coefficients attach to?<details><summary>Answer</summary><p>They attach to training examples, or to the subset that remains active in a sparse solution.</p></details>`,
    String.raw`What is the geometric distance from \(x\) to \(w^\top x+b=0\)?<details><summary>Answer</summary><p>The signed distance is \((w^\top x+b)/\|w\|_2\). The unsigned distance is its absolute value.</p></details>`,
    String.raw`For \(y=-1\) and score \(f(x)=0.5\), compute hinge loss.<details><summary>Answer</summary><p>\(yf=-0.5\), so the loss is \(\max(0,1-(-0.5))=1.5\).</p></details>`,
    String.raw`Why can a kernel SVM create a nonlinear boundary in the original input space?<details><summary>Answer</summary><p>It is linear in the implicit feature coordinates \(\phi(x)\), but that feature map can be nonlinear in the original coordinates.</p></details>`,
    String.raw`If a test batch has \(B=32\) examples and the SVM has 120 support vectors, what is the test-to-support kernel-matrix shape?<details><summary>Answer</summary><p>\(32\times120\).</p></details>`,
    String.raw`Kernel-regression weights are \((0.5,0.25,0.25)\) and targets are \((4,8,0)\). What is the prediction?<details><summary>Answer</summary><p>\(0.5(4)+0.25(8)+0.25(0)=4\).</p></details>`,
    String.raw`A classification node has class proportions \((0.5,0.5)\). What is its Gini impurity?<details><summary>Answer</summary><p>\(1-0.5^2-0.5^2=0.5\).</p></details>`,
    String.raw`Why can a deep decision tree have high variance?<details><summary>Answer</summary><p>Small changes in the training data can change split choices and produce a very different partition and prediction function.</p></details>`,
    String.raw`What is the main statistical purpose of bagging?<details><summary>Answer</summary><p>To reduce variance by averaging several predictors trained on perturbed versions of the data.</p></details>`,
    String.raw`Why does a random forest restrict candidate features at each split?<details><summary>Answer</summary><p>It makes trees less correlated. Lower correlation makes ensemble averaging more effective at reducing variance.</p></details>`,
    String.raw`For tree predictions \((2,4,7,3)\), compute the regression-forest mean.<details><summary>Answer</summary><p>\((2+4+7+3)/4=4\).</p></details>`,
    String.raw`State the additive-model form used for boosting.<details><summary>Answer</summary><p>A common form is \(F_M(x)=\sum_{m=1}^{M}\eta_m h_m(x)\), or recursively \(F_m=F_{m-1}+\eta_m h_m\).</p></details>`,
    String.raw`For squared error \(\ell=\frac12(y-F)^2\), what is the negative gradient with respect to \(F\)?<details><summary>Answer</summary><p>\(y-F\), the residual.</p></details>`,
    String.raw`Current prediction is \(F=6\), target is \(y=10\), tree correction is \(h=3\), and \(\eta=0.2\). What is the new prediction?<details><summary>Answer</summary><p>\(6+0.2(3)=6.6\).</p></details>`,
    String.raw`Why is an RBF kernel value not automatically a probability?<details><summary>Answer</summary><p>It is a similarity defined by a kernel formula. Its range can be \([0,1]\), but it is not normalized or calibrated as a conditional probability.</p></details>`,
    String.raw`Name one scaling problem of exact kernel methods and one common approximation idea.<details><summary>Answer</summary><p>The \(n\times n\) Gram matrix requires \(O(n^2)\) memory. Nyström approximation or random Fourier features can reduce the effective representation size.</p></details>`,
    String.raw`Bagging and boosting both combine trees. State one key difference.<details><summary>Answer</summary><p>Bagging trains diverse trees largely independently and averages them. Boosting trains learners sequentially so each new learner improves the current additive model.</p></details>`,
    String.raw`Why must model comparisons report preprocessing for an SVM baseline?<details><summary>Answer</summary><p>Kernel distances and linear margins can depend strongly on feature scale. An unscaled baseline can be unfairly weak.</p></details>`
  ];
})();
