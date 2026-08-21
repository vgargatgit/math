(() => {
  const day14 = COURSE[4].lessons[1];

  day14.sections.push(
    {
      id: "learning-theory-traps",
      title: "22. Common paper-reading mistakes in statistical learning",
      html: String.raw`
        <p>Statistical-learning notation is compact. A short sentence can hide several assumptions. Use these checks when you read a theorem or experiment.</p>
        <h3>Do not confuse the sample with the population</h3>
        <p>\(\widehat R_n\) is calculated from observed data. \(R\) is an expectation over a population distribution. A low training loss is evidence about the sample first.</p>
        <h3>Do not confuse optimization with generalization</h3>
        <p>An optimizer can reduce</p>
        <p>\[\widehat R_n(\theta)\]</p>
        <p>without reducing deployment risk. Optimization asks how well you solve the training objective. Generalization asks what happens on new data.</p>
        <h3>Do not compare metrics without their operating conditions</h3>
        <p>AUC measures threshold-independent ranking behavior. Precision depends on the chosen threshold and class prevalence. Accuracy can hide minority-class failure. Log loss evaluates probability quality and strongly penalizes confident mistakes.</p>
        <h3>Do not treat a validation set as unlimited</h3>
        <p>Repeated selection against the same validation set can overfit it. The validation set is data. Adaptive use can leak information from it into the final method.</p>
        <h3>Do not ignore how a dataset was sampled</h3>
        <p>A theorem can assume independent samples from \(P\). A benchmark can contain duplicates, users with many correlated records, temporal leakage, or selection effects. The mathematical object and the collected dataset must match closely enough for the intended claim.</p>
        <h3>Do not read a bound without the quantifiers</h3>
        <p>Ask: Is the statement for one fixed model or all models in a class? What probability is at least \(1-\delta\)? What randomness is being averaged over? Which sample size appears? Which capacity term appears?</p>
        <h3>Do not convert association into causation</h3>
        <p>A predictive model estimates patterns in observed data. An intervention question requires a causal design or assumptions. Strong prediction can coexist with a wrong causal interpretation.</p>
        <div class="paper-connection"><strong>Practical reading rule.</strong> For each experimental claim, write five notes: training distribution, evaluation distribution, selected metric, model-selection procedure, and uncertainty estimate. For each theorem, write assumptions, random variables, probability statement, capacity term, and conclusion.</div>
      `
    },
    {
      id: "statistical-learning-recap",
      title: "23. Recap: fit, select, evaluate, and state the population",
      html: String.raw`
        <p>The central distinction in this chapter is simple:</p>
        <p>\[\text{fit on observed data}\ne\text{guaranteed performance on future data}.\]</p>
        <p>Start with the population that you care about. Let \(P\) denote its distribution. The expected risk is</p>
        <p>\[R(\theta)=\mathbb E_{Z\sim P}[\ell_\theta(Z)].\]</p>
        <p>Because \(P\) is not fully known, training uses a sample and minimizes an empirical quantity:</p>
        <p>\[\widehat R_n(\theta)=\frac1n\sum_{i=1}^{n}\ell_\theta(z_i).\]</p>
        <p>Capacity and inductive bias determine which functions the learner can prefer. Regularization and model selection control that preference further. Concentration results explain why a finite average can estimate a population quantity under assumptions. VC and PAC ideas make the role of class richness and probability explicit.</p>
        <p>Evaluation then asks a different set of questions. Is the test distribution the one that matters? Are probabilities calibrated? Is the class distribution imbalanced? Does the metric reflect the decision cost? Is the claim predictive or causal?</p>
        <h3>A complete ML reading example</h3>
        <p>Suppose a paper trains a binary classifier \(f_\theta:\mathbb R^d\to\mathbb R\). For a batch \(X\in\mathbb R^{B\times d}\), it produces logits</p>
        <p>\[z=f_\theta(X)\in\mathbb R^B\]</p>
        <p>and probabilities</p>
        <p>\[p=\sigma(z)\in(0,1)^B.\]</p>
        <p>The training objective is empirical cross-entropy plus weight decay:</p>
        <p>\[\widehat J(\theta)=\frac1n\sum_{i=1}^{n}\left[-y_i\log p_i-(1-y_i)\log(1-p_i)\right]+\lambda\|\theta\|_2^2.\]</p>
        <p>Now read beyond the equation. Ask how \(\lambda\) was selected. Ask whether validation users overlap training users. Ask whether deployment prevalence matches test prevalence. Ask whether the reported AUC is enough for the intended decision threshold. Ask whether predicted probabilities are calibrated. Ask whether confidence intervals or repeated seeds show uncertainty.</p>
        <p>If the deployment population changes, replace the original risk by the target risk:</p>
        <p>\[R_{\text{deploy}}(\theta)=\mathbb E_{P_{\text{deploy}}}[\ell_\theta(Z)].\]</p>
        <p>The equation makes the final principle explicit: performance is always performance with respect to a distribution, loss or metric, and evaluation procedure.</p>
        <div class="paper-connection"><strong>Final paper-reading rule.</strong> When a paper says “our model generalizes better,” locate the evidence for every part of that sentence: the model-selection protocol, unseen evaluation data, target distribution, metric, comparison baseline, and uncertainty.</div>
        <div class="shape-check"><strong>Final shape rule.</strong> Learning theory often uses scalar risks, but those scalars come from per-example values. Track the reduction. If a loss starts with shape \(B\), check whether the code sums, averages, weights, or masks those \(B\) values before comparing results.</div>
      `
    }
  );

  day14.examples = [
    ["Compute empirical risk", String.raw`Five per-example losses are \((0.2,0.4,0.1,0.5,0.3)\). Their empirical risk is \(\widehat R=(0.2+0.4+0.1+0.5+0.3)/5=0.30\). This is a sample average, not the unknown population risk.`],
    ["Measure an observed generalization gap", String.raw`A model has training error \(0.03\) and held-out error \(0.09\). The observed gap is \(0.09-0.03=0.06\). This does not prove the true population gap is exactly 0.06; the held-out estimate also has sampling uncertainty.`],
    ["Recognize underfitting", String.raw`A linear model gives 22% training error and 23% validation error. Both are high and close. If stronger models reach much lower validation error, the linear model is likely underfitting.`],
    ["Recognize overfitting", String.raw`After 10 epochs, training and validation losses are \(0.25\) and \(0.28\). After 100 epochs, they are \(0.01\) and \(0.55\). The later checkpoint fits training data better but transfers worse.`],
    ["Decompose squared error", String.raw`At one input, the true regression value is 5. Across training sets, a method has mean prediction 4 and prediction variance 2. Observation noise variance is 3. Bias squared is \((4-5)^2=1\), so expected squared error is \(1+2+3=6\).`],
    ["Count affine-layer parameters", String.raw`For \(W\in\mathbb R^{128\times64}\) and \(b\in\mathbb R^{64}\), the affine layer has \(128\cdot64+64=8256\) scalar parameters. For batch size 32, its output shape is \(32\times64\).`],
    ["Compare regularized objectives", String.raw`Candidate A has training loss 0.22 and \(\|w_A\|_2^2=2\). Candidate B has loss 0.20 and norm squared 8. With \(\lambda=0.01\), objectives are 0.24 and 0.28, so the regularized criterion selects A.`],
    ["See inductive bias", String.raw`The observations \((0,0)\) and \((1,1)\) are fit exactly by \(f(x)=x\) and by \(g(x)=x+10x(x-1)\). Their predictions at \(x=0.5\) are \(0.5\) and \(-2\). Training fit alone cannot choose between them.`],
    ["Select a hyperparameter", String.raw`Validation losses for \(\lambda\in\{0,0.01,0.1\}\) are \((0.42,0.35,0.39)\). Select \(\lambda=0.01\) from validation data, then report the untouched test result once for the selected procedure.`],
    ["See dimensional growth", String.raw`If each coordinate is divided into 5 bins, then a grid has \(5^2=25\) cells in two dimensions, \(5^5=3125\) cells in five dimensions, and \(5^{10}=9{,}765{,}625\) cells in ten dimensions.`],
    ["Reduce feature shape", String.raw`A dataset \(X\in\mathbb R^{500\times2000}\) has 2,000 candidate features. If selection keeps 50 columns, the new design matrix has shape \(500\times50\).`],
    ["Interpret a VC example", String.raw`A one-dimensional threshold \(h_t(x)=\mathbf1[x\ge t]\) can label one point either way, but cannot realize every labeling of two ordered points. Its VC dimension is 1.`],
    ["Read a PAC probability", String.raw`The statement \(\Pr(R(\widehat h)\le0.08)\ge0.95\) says that the learning procedure produces a hypothesis with risk at most 0.08 with probability at least 0.95 over the randomness specified by the theorem. It is not a 95% confidence prediction for each example.`],
    ["Apply Markov's inequality", String.raw`If a nonnegative random loss has mean 3, then \(\Pr(L\ge15)\le3/15=0.2\). The actual probability can be much smaller.`],
    ["Apply Chebyshev's inequality", String.raw`For a variable with mean 10 and standard deviation 2, Chebyshev gives \(\Pr(|X-10|\ge4)\le1/4\). Therefore at least 75% of its probability lies between 6 and 14.`],
    ["Apply Hoeffding's inequality", String.raw`For \(n=500\) independent bounded observations in \([0,1]\) and \(\varepsilon=0.05\), Hoeffding gives \(2e^{-2(500)(0.05)^2}=2e^{-2.5}\approx0.164\).`],
    ["Reweight covariate shift", String.raw`Two training examples have losses \((0.2,0.7)\) and target-to-training density ratios \((2,0.5)\). Their unnormalized weighted contributions are \((0.4,0.35)\).`],
    ["Compute calibration error in one bin", String.raw`A bin contains 20 predictions with mean confidence 0.70. Twelve are positive, so observed frequency is \(12/20=0.60\). The absolute confidence-frequency gap for this bin is 0.10.`],
    ["Compare accuracy and recall under imbalance", String.raw`In 1,000 cases with 20 positives, an all-negative model has 98% accuracy and 0% positive recall. A useful evaluation must expose the missed positive class.`],
    ["Compute precision and recall", String.raw`If \(TP=30\), \(FP=10\), and \(FN=20\), then precision is \(30/40=0.75\) and recall is \(30/50=0.60\).`],
    ["See prevalence change precision", String.raw`With sensitivity 90% and false-positive rate 5%, a 50% positive population gives high precision. At 1% prevalence, false positives from the 99% negative group can outnumber true positives. Precision depends on prevalence.`],
    ["Separate association from intervention", String.raw`A treatment group converts at 15% and a non-treatment group at 10%. The observed difference is 5 percentage points. If treatment assignment was not randomized, this difference alone is not an estimate of the causal effect.`]
  ];

  day14.practice = [
    String.raw`A dataset contains labeled pairs \((x_i,y_i)\). Is this supervised, unsupervised, or self-supervised learning? <details><summary>Answer</summary><p>It is supervised learning when \(y_i\) is an externally supplied target for \(x_i\).</p></details>`,
    String.raw`Per-example losses are \((0.1,0.3,0.2,0.6)\). Compute empirical risk. <details><summary>Solution</summary><p>\(\widehat R=(0.1+0.3+0.2+0.6)/4=1.2/4=0.30\).</p></details>`,
    String.raw`Training error is 1% and test error is 12%. What pattern does this suggest? <details><summary>Answer</summary><p>It suggests a large generalization gap and possible overfitting, subject to the quality and representativeness of the test set.</p></details>`,
    String.raw`Training and validation errors are both near 30%, while stronger models reach 8% validation error. What is a likely diagnosis? <details><summary>Answer</summary><p>The current model likely underfits. It cannot fit enough of the useful training pattern.</p></details>`,
    String.raw`At a fixed input, squared bias is 4, prediction variance is 5, and irreducible noise variance is 2. What is expected squared prediction error? <details><summary>Solution</summary><p>\(4+5+2=11\).</p></details>`,
    String.raw`An affine layer maps \(d=20\) features to \(h=5\) outputs. How many parameters does it have with a bias? <details><summary>Solution</summary><p>The weight matrix has \(20\cdot5=100\) parameters and the bias has 5, for a total of 105.</p></details>`,
    String.raw`Why can increasing an L2 regularization coefficient too much hurt performance? <details><summary>Answer</summary><p>The penalty can dominate the data-fit term, force parameters toward overly small values, and cause underfitting.</p></details>`,
    String.raw`Give one inductive bias of a convolutional neural network. <details><summary>Answer</summary><p>Local connectivity and spatial weight sharing are common examples. They prefer functions that reuse local patterns across positions.</p></details>`,
    String.raw`Why should final test data not be used to choose the learning rate? <details><summary>Answer</summary><p>Then the test data participates in model selection. Its result is no longer an untouched estimate of the selected procedure's performance.</p></details>`,
    String.raw`If each of 8 dimensions is divided into 10 bins, how many grid cells are there? <details><summary>Solution</summary><p>\(10^8=100{,}000{,}000\) cells.</p></details>`,
    String.raw`If \(X\in\mathbb R^{300\times1000}\) and feature selection keeps 25 features, what is the new shape? <details><summary>Answer</summary><p>\(300\times25\).</p></details>`,
    String.raw`What does it mean for a hypothesis class to shatter a set of points? <details><summary>Answer</summary><p>For every possible binary labeling of those points, some hypothesis in the class realizes that labeling.</p></details>`,
    String.raw`In a PAC-style statement, what roles do \(\varepsilon\) and \(\delta\) usually play? <details><summary>Answer</summary><p>\(\varepsilon\) controls the allowed error or approximation gap. \(\delta\) controls the probability that the guarantee fails.</p></details>`,
    String.raw`A nonnegative random variable has mean 4. Use Markov's inequality to bound \(\Pr(X\ge20)\). <details><summary>Solution</summary><p>\(\Pr(X\ge20)\le4/20=0.2\).</p></details>`,
    String.raw`Chebyshev's inequality says what about being three standard deviations from the mean? <details><summary>Answer</summary><p>\(\Pr(|X-\mu|\ge3\sigma)\le1/9\). Therefore at least \(8/9\) of the probability lies within three standard deviations, assuming finite variance.</p></details>`,
    String.raw`For independent \([0,1]\)-bounded observations, how does the Hoeffding deviation term change as \(n\) increases? <details><summary>Answer</summary><p>The tail bound decreases exponentially in \(n\varepsilon^2\). Larger samples make a fixed deviation less likely under the assumptions.</p></details>`,
    String.raw`State the defining assumption of covariate shift. <details><summary>Answer</summary><p>\(P_{train}(X)\ne P_{test}(X)\) while \(P_{train}(Y\mid X)=P_{test}(Y\mid X)\).</p></details>`,
    String.raw`Why can importance weighting fail when target data contains input regions absent from training data? <details><summary>Answer</summary><p>If \(p_{train}(x)=0\) where \(p_{test}(x)>0\), the density ratio is not usable and training data contains no information about that region.</p></details>`,
    String.raw`A group of 50 predictions has mean confidence 0.8, but 30 outcomes are positive. Is this group calibrated? <details><summary>Answer</summary><p>The observed frequency is \(30/50=0.6\), not 0.8. The model is overconfident in this group.</p></details>`,
    String.raw`A dataset has 9,900 negatives and 100 positives. What accuracy does an all-negative classifier obtain? <details><summary>Solution</summary><p>\(9900/10000=99\%\), despite having zero positive recall.</p></details>`,
    String.raw`If \(TP=18\), \(FP=6\), and \(FN=2\), compute precision and recall. <details><summary>Solution</summary><p>Precision is \(18/(18+6)=0.75\). Recall is \(18/(18+2)=0.90\).</p></details>`,
    String.raw`Why can PR curves be more informative than ROC curves for a rare positive class? <details><summary>Answer</summary><p>Precision directly reflects false positives among predicted positives and therefore exposes the effect of a large negative class and low prevalence.</p></details>`,
    String.raw`A model predicts disease accurately from hospital ID. Does this prove hospital ID causes disease? <details><summary>Answer</summary><p>No. Predictive association does not establish an intervention effect. Hospital ID can proxy for patient population, equipment, referral patterns, or other confounders.</p></details>`,
    String.raw`What is the useful interpretation of no-free-lunch results? <details><summary>Answer</summary><p>No learner is best for all possible problems without assumptions. Practical success comes from inductive biases and resources that match the structure of the tasks we care about.</p></details>`
  ];
})();
