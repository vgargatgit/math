(() => {
  const day14 = COURSE[4].lessons[1];

  day14.sections.push(
    {
      id: "calibration",
      title: "17. Calibration asks whether predicted probabilities match observed frequencies",
      html: String.raw`
        <p>A classifier can rank examples well and still produce poor probabilities. <strong>Calibration</strong> checks whether a predicted probability has the frequency that it claims.</p>
        <p>For binary classification, an ideal calibration statement is</p>
        <p>\[\Pr(Y=1\mid \widehat p(X)=p)=p.\]</p>
        <p>In words: among examples that receive probability \(p\), the positive fraction should be about \(p\).</p>
        <h3>Numerical example</h3>
        <p>Suppose 100 examples receive predicted probabilities near 0.8. If 79 of them are actually positive, the group is close to calibrated at that confidence level. If only 45 are positive, the model is strongly overconfident for that group.</p>
        <h3>Calibration and accuracy are different</h3>
        <p>Consider two classifiers on four examples with labels</p>
        <p>\[y=(1,1,0,0).\]</p>
        <p>Model A predicts probabilities</p>
        <p>\[(0.55,0.55,0.45,0.45).\]</p>
        <p>Model B predicts</p>
        <p>\[(0.99,0.99,0.01,0.01).\]</p>
        <p>With threshold 0.5, both have 100% accuracy. Model B is much more confident. If the data-generating process is noisy, such confidence can be unjustified even when the class decisions are correct on this small sample.</p>
        <h3>Brier score</h3>
        <p>One proper scoring rule for binary probabilities is the Brier score:</p>
        <p>\[\operatorname{Brier}=\frac1n\sum_{i=1}^{n}(p_i-y_i)^2.\]</p>
        <p>For \(p=(0.8,0.3)\) and \(y=(1,0)\),</p>
        <p>\[\operatorname{Brier}=\frac{(0.8-1)^2+(0.3-0)^2}{2}=\frac{0.04+0.09}{2}=0.065.\]</p>
        <p>Lower is better.</p>
        <h3>Reliability diagrams</h3>
        <p>A reliability diagram groups predictions into probability bins and compares mean confidence with observed frequency. Binning is useful but can hide detail. Expected calibration error also depends on the binning scheme.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Calibration matters in medical risk, fraud detection, ranking, active learning, and any system where a probability controls a later decision. Temperature scaling is a common post-hoc calibration method for neural classifiers.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A calibrated model is not necessarily accurate, and an accurate model is not necessarily calibrated. Calibration, discrimination, and decision utility are separate properties.</div>
      `
    },
    {
      id: "class-imbalance",
      title: "18. Class imbalance changes what simple accuracy tells you",
      html: String.raw`
        <p>A dataset is <strong>class imbalanced</strong> when some classes occur much more often than others.</p>
        <h3>Accuracy can become misleading</h3>
        <p>Suppose 1,000 transactions contain 990 legitimate cases and 10 fraud cases. A classifier that always predicts “legitimate” has</p>
        <p>\[\text{accuracy}=\frac{990}{1000}=99\%.\]</p>
        <p>But it finds zero fraud cases. Its fraud recall is zero.</p>
        <h3>Confusion matrix notation</h3>
        <p>For a binary problem, define:</p>
        <ul>
          <li>\(TP\): true positives,</li>
          <li>\(FP\): false positives,</li>
          <li>\(TN\): true negatives,</li>
          <li>\(FN\): false negatives.</li>
        </ul>
        <p>The useful metric depends on which errors matter.</p>
        <h3>Numerical example</h3>
        <p>Suppose a fraud model gives</p>
        <p>\[TP=8,\quad FN=2,\quad FP=40,\quad TN=950.\]</p>
        <p>Its accuracy is</p>
        <p>\[\frac{8+950}{1000}=95.8\%.\]</p>
        <p>This is lower than the useless 99% majority classifier. But it catches 8 of 10 fraud cases. Accuracy alone ranks the useless model higher.</p>
        <h3>Possible responses to imbalance</h3>
        <p>A project can change the metric, class weights, sampling procedure, loss, decision threshold, or data collection. These choices solve different problems.</p>
        <p>For weighted cross-entropy, a positive example can receive a larger weight:</p>
        <p>\[\ell=-w_+y\log p-w_-(1-y)\log(1-p).\]</p>
        <p>Increasing \(w_+\) makes positive errors contribute more to the training objective.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Look at class prevalence in train, validation, test, and deployment data. A metric reported on a balanced benchmark can behave differently at the real deployment base rate.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Resampling the training set does not automatically change the real-world class prevalence. If probabilities are needed, changed sampling can require calibration or prior correction.</div>
      `
    },
    {
      id: "classification-metrics",
      title: "19. Precision, recall, ROC, PR, and scoring rules answer different questions",
      html: String.raw`
        <p>No single classification metric is best for every problem. First state the decision cost and the quantity that you need.</p>
        <h3>Precision and recall</h3>
        <p>Precision is</p>
        <p>\[\operatorname{precision}=\frac{TP}{TP+FP}.\]</p>
        <p>Recall, also called sensitivity or true-positive rate, is</p>
        <p>\[\operatorname{recall}=\frac{TP}{TP+FN}.\]</p>
        <p>Using \(TP=8\), \(FP=40\), and \(FN=2\):</p>
        <p>\[\operatorname{precision}=\frac8{48}\approx0.167,\]</p>
        <p>\[\operatorname{recall}=\frac8{10}=0.8.\]</p>
        <p>The model finds most fraud cases but creates many false alarms.</p>
        <h3>F1 score</h3>
        <p>The harmonic mean of precision and recall is</p>
        <p>\[F_1=2\frac{PR}{P+R}.\]</p>
        <p>For \(P=0.5\) and \(R=0.8\),</p>
        <p>\[F_1=2\frac{0.5\cdot0.8}{1.3}\approx0.615.\]</p>
        <h3>ROC curve</h3>
        <p>A ROC curve varies the decision threshold and plots true-positive rate against false-positive rate:</p>
        <p>\[\operatorname{FPR}=\frac{FP}{FP+TN}.\]</p>
        <p>ROC-AUC measures ranking over thresholds. It does not choose an operating threshold for you.</p>
        <h3>Precision-recall curve</h3>
        <p>A PR curve plots precision against recall as the threshold changes. It is often more informative when the positive class is rare because precision directly reflects false positives relative to predicted positives.</p>
        <h3>Base rate changes precision</h3>
        <p>Assume a model has \(TPR=0.9\) and \(FPR=0.1\).</p>
        <p>If prevalence is 50%, then among 1,000 examples we expect about 450 true positives and 50 false positives. Precision is</p>
        <p>\[\frac{450}{500}=0.9.\]</p>
        <p>If prevalence is 1%, then we expect about 9 true positives and 99 false positives. Precision falls to</p>
        <p>\[\frac9{108}\approx0.083.\]</p>
        <p>The ranking behavior did not change, but the deployment base rate changed the positive predictive value.</p>
        <h3>Proper scoring rules</h3>
        <p>If the model outputs probabilities, use a metric that rewards good probability estimates. Log loss is</p>
        <p>\[\ell_{\log}(p,y)=-y\log p-(1-y)\log(1-p).\]</p>
        <p>Brier score uses squared probability error. Both are proper scoring rules under standard conditions: the expected score is optimized by reporting the true probability.</p>
        <h3>Log-loss example</h3>
        <p>For a positive example \(y=1\), predicting \(p=0.9\) gives</p>
        <p>\[-\log0.9\approx0.105.\]</p>
        <p>Predicting \(p=0.01\) gives</p>
        <p>\[-\log0.01\approx4.605.\]</p>
        <p>Log loss strongly penalizes confident wrong predictions.</p>
        <div class="paper-connection"><strong>Paper-reading rule.</strong> Check whether the metric matches the claim. A paper that claims “better probability estimates” should not support that claim only with accuracy. A retrieval paper can care about ranking metrics. A medical screening system can prioritize sensitivity at an acceptable false-positive rate.</div>
        <div class="shape-check"><strong>Common mistake.</strong> ROC-AUC, PR-AUC, F1, accuracy, and log loss are not interchangeable. Also check which class the paper calls “positive” and whether macro, micro, or weighted averaging is used in multiclass tasks.</div>
      `
    },
    {
      id: "causal-vs-predictive",
      title: "20. Prediction does not by itself establish a causal effect",
      html: String.raw`
        <p>A <strong>predictive claim</strong> says that information about \(X\) helps predict \(Y\). A <strong>causal claim</strong> says that changing \(X\) would change \(Y\), under a defined intervention and population.</p>
        <p>These are different statements.</p>
        <h3>A simple confounding example</h3>
        <p>Suppose ice-cream sales and drowning incidents both increase in summer. They can be positively correlated because temperature affects both. Increasing ice-cream sales does not therefore cause drowning.</p>
        <p>In symbols, a confounder \(Z\) can influence both:</p>
        <p>\[Z\to X,\qquad Z\to Y.\]</p>
        <p>An observed association \(P(Y\mid X)\) does not automatically identify an intervention effect.</p>
        <h3>Prediction can exploit noncausal signals</h3>
        <p>A hospital model can learn that a certain scanner model predicts disease because one clinic treats a different patient population. This correlation can improve in-distribution prediction but fail after deployment to another clinic.</p>
        <h3>Potential-outcome notation</h3>
        <p>One causal framework writes \(Y(1)\) for the outcome under treatment and \(Y(0)\) for the outcome without treatment. An average treatment effect is</p>
        <p>\[\operatorname{ATE}=\mathbb E[Y(1)-Y(0)].\]</p>
        <p>For one individual, we cannot normally observe both outcomes at the same time. Causal inference therefore needs assumptions or experimental design beyond ordinary prediction.</p>
        <h3>Numerical example</h3>
        <p>Suppose treated users have an observed conversion rate of 12% and untreated users have 8%. The raw difference is four percentage points. If treatment was preferentially offered to high-intent users, the four-point association is not necessarily the causal treatment effect.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Watch verbs. “Associated with,” “predicts,” and “correlates with” support predictive statements. “Causes,” “improves because of,” and “effect of intervention” need a causal identification strategy such as randomization or explicit assumptions.</div>
        <div class="shape-check"><strong>Common mistake.</strong> High predictive accuracy does not validate a causal graph. Conversely, a variable can have an important causal effect even if it adds little predictive accuracy in a particular dataset.</div>
      `
    },
    {
      id: "no-free-lunch",
      title: "21. No-free-lunch intuition: every successful learner depends on assumptions",
      html: String.raw`
        <p>The <strong>no-free-lunch</strong> intuition says that no learning algorithm is uniformly best over every possible data-generating problem if all problems are treated equally.</p>
        <p>A learner succeeds because its assumptions match useful structure in the tasks that we care about.</p>
        <h3>Small example</h3>
        <p>Suppose we observe</p>
        <p>\[(x,y)=(0,0),(1,1),(2,2).\]</p>
        <p>A linear learner predicts \(y=3\) at \(x=3\). A periodic learner could predict \(y=0\). A lookup-style learner could refuse to extrapolate. The three observed points alone do not logically force one continuation.</p>
        <p>The linear learner is good when the world is approximately linear. It is bad when the true process follows a different rule.</p>
        <h3>Architecture comparison</h3>
        <p>A convolutional model has useful biases for local spatial patterns. A set model is designed for permutation invariance. A graph model uses edges. None of these biases is correct for every possible function.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Benchmark leadership does not prove universal superiority. Always ask which data, compute budget, objective, augmentation, and evaluation distribution favor the reported method.</div>
        <div class="shape-check"><strong>Common mistake.</strong> No-free-lunch does not mean that all algorithms are equally useful in practice. Real tasks have structure. The point is that performance comes from matching assumptions and resources to that structure.</div>
      `
    }
  );
})();
