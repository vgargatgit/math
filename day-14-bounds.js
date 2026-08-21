(() => {
  const day14 = COURSE[4].lessons[1];

  day14.sections.push(
    {
      id: "concentration-inequalities",
      title: "14. Concentration inequalities bound how far random quantities can move",
      html: String.raw`
        <p>Learning theory often needs a statement about a random estimate. For example, how far can a sample mean be from its population mean?</p>
        <p><strong>Concentration inequalities</strong> give probability bounds without requiring us to know the exact sampling distribution.</p>
        <h3>Markov's inequality</h3>
        <p>If \(X\ge0\) and \(a>0\), then</p>
        <p>\[\Pr(X\ge a)\le\frac{\mathbb E[X]}{a}.\]</p>
        <p>Suppose a nonnegative loss has mean \(2\). Then</p>
        <p>\[\Pr(X\ge10)\le\frac2{10}=0.2.\]</p>
        <p>The bound can be loose, but it needs only nonnegativity and the mean.</p>
        <h3>Chebyshev's inequality</h3>
        <p>If \(X\) has mean \(\mu\) and finite variance \(\sigma^2\), then</p>
        <p>\[\Pr(|X-\mu|\ge k\sigma)\le\frac1{k^2}.\]</p>
        <p>For \(k=2\),</p>
        <p>\[\Pr(|X-\mu|\ge2\sigma)\le\frac14.\]</p>
        <p>So at least 75% of the probability lies within two standard deviations of the mean. This statement does not require a Gaussian distribution.</p>
        <h3>Hoeffding's inequality</h3>
        <p>Hoeffding gives a much stronger result when independent random variables are bounded. For independent \(X_i\in[0,1]\), let</p>
        <p>\[\overline X=\frac1n\sum_{i=1}^{n}X_i.\]</p>
        <p>A common two-sided form is</p>
        <p>\[\Pr\left(|\overline X-\mathbb E[\overline X]|\ge\varepsilon\right)\le2e^{-2n\varepsilon^2}.\]</p>
        <h3>Numerical example</h3>
        <p>Let \(n=1000\) and \(\varepsilon=0.05\). Then</p>
        <p>\[2e^{-2(1000)(0.05)^2}=2e^{-5}\approx0.0135.\]</p>
        <p>Thus the probability that the sample mean differs from its expectation by at least 0.05 is at most about 1.35%, under the assumptions.</p>
        <h3>Connection to classification error</h3>
        <p>For a fixed classifier, define \(X_i=\mathbf 1[\widehat y_i\ne y_i]\). Each \(X_i\in\{0,1\}\). Then \(\overline X\) is empirical error. Hoeffding can bound the difference between empirical error and the classifier's expected error when examples are independent and identically distributed.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Generalization proofs often combine a concentration inequality with a capacity argument. The concentration step controls one random estimate. The capacity step extends the statement to many possible models.</div>
        <div class="shape-check"><strong>Common mistakes.</strong> Check every assumption. Independence, boundedness, and identical distribution can matter. Also remember that an upper bound on probability is not the actual probability. A loose bound of 0.2 does not mean the event occurs 20% of the time.</div>
      `
    },
    {
      id: "distribution-shift",
      title: "15. Distribution shift means training and deployment data do not follow the same distribution",
      html: String.raw`
        <p>Most simple generalization arguments assume that training examples and future examples come from the same distribution.</p>
        <p>Write the training distribution as \(P_{\text{train}}(X,Y)\) and the deployment distribution as \(P_{\text{test}}(X,Y)\).</p>
        <p><strong>Distribution shift</strong> occurs when</p>
        <p>\[P_{\text{train}}(X,Y)\ne P_{\text{test}}(X,Y).\]</p>
        <p>This is a broad category. Different parts of the joint distribution can change.</p>
        <h3>Numerical example: class proportions change</h3>
        <p>Suppose a disease classifier is trained on data where 50% of examples are positive. In deployment, only 5% are positive.</p>
        <p>Even if class-conditional behavior stays similar, accuracy, precision, calibration, and decision thresholds can change because the base rate changed.</p>
        <h3>Numerical example: input quality changes</h3>
        <p>A vision model can be trained on sharp daytime images and deployed on low-light camera images. Pixel statistics and feature distributions change. A test set sampled only from the original camera system does not measure this deployment condition.</p>
        <h3>Risk depends on the target distribution</h3>
        <p>The deployment risk is</p>
        <p>\[R_{\text{test}}(\theta)=\mathbb E_{(X,Y)\sim P_{\text{test}}}\left[\ell(f_\theta(X),Y)\right].\]</p>
        <p>A low \(R_{\text{train}}\) does not by itself imply a low \(R_{\text{test}}\) when the distributions differ.</p>
        <h3>Common forms of shift</h3>
        <p>You can encounter covariate shift, label shift, concept shift, temporal drift, domain shift, and selection bias. Authors use these terms differently. Always read the formal assumption.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Domain adaptation, robust optimization, reweighting, continual learning, and out-of-distribution evaluation all respond to some form of distribution change.</div>
        <div class="shape-check"><strong>Paper-reading rule.</strong> A benchmark result is always conditional on a data distribution and evaluation protocol. Ask whether the deployment population matches the benchmark population in time, geography, device, language, demographic mix, and label process.</div>
      `
    },
    {
      id: "covariate-shift",
      title: "16. Covariate shift changes the input distribution while keeping the conditional target rule fixed",
      html: String.raw`
        <p><strong>Covariate shift</strong> is a specific distribution-shift assumption.</p>
        <p>The input distribution changes:</p>
        <p>\[P_{\text{train}}(X)\ne P_{\text{test}}(X),\]</p>
        <p>but the conditional target distribution stays the same:</p>
        <p>\[P_{\text{train}}(Y\mid X)=P_{\text{test}}(Y\mid X).\]</p>
        <p>This assumption says that the same input still means the same thing, but some regions of input space become more or less common.</p>
        <h3>Numerical example</h3>
        <p>Suppose a regression relation is</p>
        <p>\[Y=2X+\varepsilon\]</p>
        <p>in both training and deployment.</p>
        <p>Training inputs are mostly near \(X=0\), but deployment inputs are mostly near \(X=5\). The conditional rule did not change, but the model now needs good performance in a region that had little training mass.</p>
        <h3>Importance weighting</h3>
        <p>If the required density ratio exists, deployment risk can be written as a weighted training expectation:</p>
        <p>\[R_{\text{test}}(\theta)=\mathbb E_{P_{\text{train}}}\left[\frac{p_{\text{test}}(X)}{p_{\text{train}}(X)}\,\ell(f_\theta(X),Y)\right].\]</p>
        <p>Define</p>
        <p>\[w(x)=\frac{p_{\text{test}}(x)}{p_{\text{train}}(x)}.\]</p>
        <p>Inputs that are more common at deployment receive larger weights.</p>
        <h3>Weighting example</h3>
        <p>Suppose two input regions have weights \(w_A=0.5\) and \(w_B=2\). If observed losses are \(0.2\) and \(0.3\), their weighted contributions are \(0.1\) and \(0.6\). Region B matters more because it is relatively more common in the target distribution.</p>
        <h3>Support matters</h3>
        <p>If deployment has inputs where \(p_{\text{train}}(x)=0\), the ratio is undefined. Reweighting cannot create information about a region that was never observed.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> A method can state that it is robust to “covariate shift.” Check whether it actually assumes an unchanged \(P(Y\mid X)\). If the label mechanism also changes, the guarantee can fail.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> For a batch of \(B\) examples, importance weights can have shape \(B\). Per-example losses also have shape \(B\). The weighted empirical risk can be a normalized scalar such as \(\sum_i w_i\ell_i/\sum_i w_i\).</div>
      `
    }
  );
})();
