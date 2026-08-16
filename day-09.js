const day9 = COURSE[2].lessons[1];

Object.assign(day9, {
  published: true,
  summary: "Learn what finite samples can tell you about a larger population. Build the inference and experimental-reasoning skills needed to judge claims in AI and ML papers.",
  explanation: "A machine-learning result is measured on a finite sample, but the paper usually makes a claim about a larger population or future data. Statistical inference describes the uncertainty in that jump. Experimental reasoning asks whether the evaluation procedure is fair, independent, and reproducible. The central habit is to separate the data-generating population, the observed sample, the estimator, and the evaluation protocol.",
  topics: [
    "Population and sample",
    "Parameters and estimators",
    "Sampling distributions",
    "Estimator bias and variance",
    "Consistency",
    "Maximum likelihood",
    "Log-likelihood",
    "MAP estimation",
    "Priors, likelihoods, and posteriors",
    "Law of large numbers",
    "Central limit theorem",
    "Standard error",
    "Confidence intervals",
    "Hypothesis tests",
    "p-values",
    "Bootstrap",
    "Effect size",
    "Multiple comparisons",
    "Selection bias",
    "Train/validation/test splits",
    "Cross-validation",
    "Hyperparameter-selection bias",
    "Data leakage",
    "Ablations",
    "Statistical versus practical significance",
    "Reproducibility and seeds"
  ],
  sections: [
    {
      id: "population-sample",
      title: "1. Population and sample: know what you observed and what you want to claim",
      html: String.raw`
        <p>A <strong>population</strong> is the full collection or data-generating process that you want to understand. A <strong>sample</strong> is the finite set of observations that you actually have.</p>
        <p>Suppose you want to know the accuracy of a classifier on all future customer-support messages. That future stream is the population of interest. If you evaluate the model on \(n=1000\) labeled messages, those 1000 messages are the sample.</p>
        <div class="definition">
          <strong>Parameter.</strong> A parameter is a fixed but usually unknown property of the population. Examples are a population mean \(\mu\), a population variance \(\sigma^2\), or the true future accuracy \(p\) of a classifier.
        </div>
        <div class="definition">
          <strong>Statistic.</strong> A statistic is a quantity computed from the sample. Examples are the sample mean \(\bar X\), sample variance \(S^2\), or measured test accuracy \(\hat p\).
        </div>
        <p>If a classifier gets 870 of 1000 test examples correct, then</p>
        <p>\[\hat p=\frac{870}{1000}=0.87.\]</p>
        <p>The number \(0.87\) is not automatically the true population accuracy. It is an estimate based on one finite sample.</p>
        <div class="paper-connection">
          <strong>Why this matters for ML papers.</strong> When a paper reports “accuracy = 87%,” ask what population the authors want that number to represent. Is the test set sampled from the deployment distribution? Is it one benchmark snapshot? Is the claim about one dataset or about real-world performance?
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not treat a sample statistic as if it were the population parameter. The difference between \(\hat p\) and \(p\) is sampling uncertainty.
        </div>
      `
    },
    {
      id: "estimators",
      title: "2. An estimator is a rule that turns data into an estimate",
      html: String.raw`
        <p>An <strong>estimator</strong> is a function of the observed data. Before you see the data, the estimator is random because the sample is random. After you observe the sample, it produces one numerical estimate.</p>
        <p>For observations \(X_1,\ldots,X_n\), the sample mean estimator is</p>
        <p>\[\hat\mu=\bar X=\frac{1}{n}\sum_{i=1}^{n}X_i.\]</p>
        <p>Suppose the observed values are \(2,4,7,7\). Then</p>
        <p>\[\bar X=\frac{2+4+7+7}{4}=5.\]</p>
        <p>The estimator is the rule \(\frac1n\sum_i X_i\). The estimate is the observed value \(5\).</p>
        <h3>Classifier example</h3>
        <p>Let \(C_i\in\{0,1\}\) indicate whether the model is correct on test example \(i\). Test accuracy is the sample mean</p>
        <p>\[\hat p=\frac1n\sum_{i=1}^{n}C_i.\]</p>
        <p>So accuracy itself is an estimator of the probability that the model is correct on a new example drawn from the same distribution.</p>
        <div class="paper-connection">
          <strong>Paper-reading rule.</strong> When you see a reported metric, ask: What is the estimator? What random sample does it depend on? What population parameter is it trying to estimate?
        </div>
      `
    },
    {
      id: "sampling-distribution",
      title: "3. A sampling distribution describes how an estimator changes across repeated samples",
      html: String.raw`
        <p>Imagine that you could repeat the same experiment many times. Each time you draw a new sample and compute the same estimator. The resulting distribution of estimator values is the <strong>sampling distribution</strong>.</p>
        <p>Suppose a population contains values \(0\) and \(2\) with equal probability. The population mean is</p>
        <p>\[\mu=1.\]</p>
        <p>Take samples of size \(n=2\). The possible ordered samples are</p>
        <p>\[(0,0),\ (0,2),\ (2,0),\ (2,2).\]</p>
        <p>The corresponding sample means are</p>
        <p>\[0,\ 1,\ 1,\ 2.\]</p>
        <p>Therefore the sampling distribution of \(\bar X\) puts probability \(1/4\) on 0, probability \(1/2\) on 1, and probability \(1/4\) on 2.</p>
        <p>The estimator changes because the sample changes.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> If a paper retrains the same model on different random data samples, or evaluates it on different test samples, the reported metric changes. Confidence intervals and standard errors describe this variation under stated assumptions.
        </div>
        <div class="shape-check">
          <strong>Do not confuse two distributions.</strong> The data distribution describes values of \(X\). The sampling distribution describes values of an estimator such as \(\bar X\) or \(\hat p\).
        </div>
      `
    },
    {
      id: "bias-variance-consistency",
      title: "4. Estimator bias, variance, and consistency describe different kinds of quality",
      html: String.raw`
        <h3>Bias</h3>
        <p>The bias of an estimator \(\hat\theta\) for parameter \(\theta\) is</p>
        <p>\[\operatorname{Bias}(\hat\theta)=\mathbb{E}[\hat\theta]-\theta.\]</p>
        <p>An estimator is <strong>unbiased</strong> if this value is zero.</p>
        <p>Example: if repeated samples give estimates whose average is 10.2 while the true parameter is 10, the bias is \(0.2\).</p>
        <h3>Variance</h3>
        <p>The variance of an estimator measures how much it changes across repeated samples:</p>
        <p>\[\operatorname{Var}(\hat\theta)=\mathbb{E}\left[(\hat\theta-\mathbb{E}[\hat\theta])^2\right].\]</p>
        <p>An estimator can have low bias but high variance. It can also have higher bias but low variance.</p>
        <h3>Mean squared error</h3>
        <p>A useful identity is</p>
        <p>\[\mathbb{E}[(\hat\theta-\theta)^2]=\operatorname{Var}(\hat\theta)+\operatorname{Bias}(\hat\theta)^2.\]</p>
        <p>This shows that total estimation error has both variance and bias components.</p>
        <h3>Consistency</h3>
        <p>An estimator is <strong>consistent</strong> if it approaches the true parameter as the sample size grows. Informally,</p>
        <p>\[\hat\theta_n\to\theta\quad\text{as }n\to\infty.\]</p>
        <div class="paper-connection">
          <strong>Why this matters in papers.</strong> “Unbiased” does not mean “accurate on this dataset.” “Consistent” does not mean “good with small samples.” Check which property the paper actually claims.
        </div>
      `
    },
    {
      id: "mle",
      title: "5. Maximum likelihood chooses parameters that make the observed data most plausible",
      html: String.raw`
        <p>Suppose data \(D=\{x_1,\ldots,x_n\}\) come from a model with parameter \(\theta\). The <strong>likelihood</strong> treats the observed data as fixed and views the parameter as the variable:</p>
        <p>\[L(\theta;D)=p(D\mid\theta).\]</p>
        <p>The maximum-likelihood estimate is</p>
        <p>\[\hat\theta_{\mathrm{MLE}}=\arg\max_{\theta}p(D\mid\theta).\]</p>
        <h3>Bernoulli example</h3>
        <p>Suppose \(X_i\in\{0,1\}\) are independent Bernoulli observations with success probability \(p\). For data \(1,1,0,1\), the likelihood is</p>
        <p>\[L(p)=p^3(1-p).\]</p>
        <p>The MLE is the sample success rate:</p>
        <p>\[\hat p_{\mathrm{MLE}}=\frac{3}{4}=0.75.\]</p>
        <h3>Log-likelihood</h3>
        <p>Products can be inconvenient. Because logarithm is monotonic, maximizing the likelihood is equivalent to maximizing the log-likelihood:</p>
        <p>\[\ell(\theta)=\log p(D\mid\theta).\]</p>
        <p>For independent observations,</p>
        <p>\[\ell(\theta)=\sum_{i=1}^{n}\log p(x_i\mid\theta).\]</p>
        <p>For the Bernoulli example,</p>
        <p>\[\ell(p)=3\log p+\log(1-p).\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Cross-entropy training is often maximum-likelihood estimation in another form. For a classifier with model probabilities \(p_\theta(y_i\mid x_i)\), minimizing negative log-likelihood means minimizing
          \[-\sum_i\log p_\theta(y_i\mid x_i).\]
        </div>
        <div class="shape-check">
          <strong>Notation warning.</strong> A likelihood is not a probability distribution over \(\theta\) unless you explicitly normalize it and adopt a Bayesian model. It is a function of \(\theta\) with the data held fixed.
        </div>
      `
    },
    {
      id: "map-bayes",
      title: "6. MAP estimation adds a prior to maximum likelihood",
      html: String.raw`
        <p>Bayesian inference combines a prior belief about parameters with evidence from data. Bayes’ rule gives</p>
        <p>\[p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)}.\]</p>
        <p>The terms are:</p>
        <ul>
          <li>\(p(\theta)\): prior.</li>
          <li>\(p(D\mid\theta)\): likelihood.</li>
          <li>\(p(\theta\mid D)\): posterior.</li>
          <li>\(p(D)\): evidence or marginal likelihood.</li>
        </ul>
        <p>The maximum-a-posteriori estimate is</p>
        <p>\[\hat\theta_{\mathrm{MAP}}=\arg\max_\theta p(\theta\mid D).\]</p>
        <p>Because \(p(D)\) does not depend on \(\theta\),</p>
        <p>\[\hat\theta_{\mathrm{MAP}}=\arg\max_\theta p(D\mid\theta)p(\theta).\]</p>
        <p>Taking logs gives</p>
        <p>\[\hat\theta_{\mathrm{MAP}}=\arg\max_\theta \left[\log p(D\mid\theta)+\log p(\theta)\right].\]</p>
        <h3>Regularization connection</h3>
        <p>A Gaussian prior \(p(\theta)\propto\exp(-\lambda\|\theta\|_2^2)\) contributes a term proportional to \(-\lambda\|\theta\|_2^2\) to the log posterior. Maximizing the posterior is therefore equivalent to minimizing a negative log-likelihood plus an \(L_2\) penalty.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> MAP is a point estimate. Full Bayesian inference keeps the entire posterior distribution. Do not treat the MAP parameter as if it represented all posterior uncertainty.
        </div>
      `
    },
    {
      id: "lln",
      title: "7. The law of large numbers explains why averages stabilize",
      html: String.raw`
        <p>The <strong>law of large numbers</strong> says, under suitable conditions, that the sample average approaches the population expectation as the sample size grows:</p>
        <p>\[\bar X_n=\frac1n\sum_{i=1}^{n}X_i\to\mathbb{E}[X].\]</p>
        <p>For a Bernoulli variable with success probability \(p=0.6\), a small sample can produce a success rate such as \(0.4\) or \(0.8\). With many independent observations, the rate tends to settle near \(0.6\).</p>
        <p>The law is an asymptotic statement. It does not say that every larger sample must be closer to the truth than every smaller sample.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Empirical risk
          \[\hat R_n(\theta)=\frac1n\sum_{i=1}^{n}\ell(f_\theta(x_i),y_i)\]
          is a sample average. Under assumptions, it can approximate expected risk. This is one reason sample averages appear throughout learning algorithms.
        </div>
      `
    },
    {
      id: "clt-standard-error",
      title: "8. The central limit theorem and standard error quantify the scale of sampling noise",
      html: String.raw`
        <p>The <strong>central limit theorem</strong> says that, under common conditions, the sampling distribution of a standardized sample mean becomes approximately normal as \(n\) grows:</p>
        <p>\[\frac{\bar X-\mu}{\sigma/\sqrt n}\approx\mathcal N(0,1).\]</p>
        <p>The quantity</p>
        <p>\[\operatorname{SE}(\bar X)=\frac{\sigma}{\sqrt n}\]</p>
        <p>is the standard deviation of the sampling distribution of the mean. In practice, \(\sigma\) is often unknown and is replaced by the sample standard deviation \(s\):</p>
        <p>\[\widehat{\operatorname{SE}}(\bar X)=\frac{s}{\sqrt n}.\]</p>
        <h3>Numerical example</h3>
        <p>Suppose \(s=12\) and \(n=144\). Then</p>
        <p>\[\widehat{\operatorname{SE}}=\frac{12}{\sqrt{144}}=1.\]</p>
        <p>If the sample size rises to \(576\),</p>
        <p>\[\widehat{\operatorname{SE}}=\frac{12}{24}=0.5.\]</p>
        <p>To cut standard error in half, you need roughly four times as many independent samples.</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> Standard deviation describes variation among observations. Standard error describes variation of an estimator across samples. They answer different questions.
        </div>
      `
    }
  ]
});
