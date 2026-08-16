day9.sections.push(
  {
    id: "confidence-intervals",
    title: "9. Confidence intervals describe a procedure for uncertainty, not a probability that the parameter moves",
    html: String.raw`
      <p>A confidence interval combines an estimate with a measure of sampling uncertainty. A common large-sample form is</p>
      <p>\[\text{estimate}\ \pm\ z^*\times\operatorname{SE}.\]</p>
      <p>For a 95% normal approximation, \(z^*\approx1.96\).</p>
      <h3>Mean example</h3>
      <p>Suppose \(\bar x=50\), estimated standard error is \(2\), and the normal approximation is reasonable. A 95% interval is</p>
      <p>\[50\pm1.96(2)=50\pm3.92.\]</p>
      <p>So the interval is approximately</p>
      <p>\[[46.08,53.92].\]</p>
      <p>The frequentist interpretation is about repeated use of the procedure: if we repeated the whole sampling process many times and built an interval each time, about 95% of those intervals would contain the fixed true parameter, under the model assumptions.</p>
      <div class="shape-check">
        <strong>Common mistake.</strong> After the data are observed, the frequentist parameter is treated as fixed. The statement “there is a 95% probability that \(\mu\) is inside this particular interval” is not the usual frequentist interpretation.
      </div>
      <h3>Accuracy example</h3>
      <p>If test outcomes are approximately independent Bernoulli variables, a rough standard error for measured accuracy \(\hat p\) is</p>
      <p>\[\operatorname{SE}(\hat p)\approx\sqrt{\frac{\hat p(1-\hat p)}{n}}.\]</p>
      <p>For \(\hat p=0.80\) and \(n=400\),</p>
      <p>\[\operatorname{SE}\approx\sqrt{\frac{0.8\cdot0.2}{400}}=0.02.\]</p>
      <p>A rough 95% interval is \(0.80\pm1.96(0.02)\), or about \([0.761,0.839]\).</p>
      <div class="paper-connection">
        <strong>ML connection.</strong> Intervals around benchmark scores make uncertainty visible. But formulas that assume independent examples can fail when examples are clustered, duplicated, temporally related, or otherwise dependent.
      </div>
    `
  },
  {
    id: "hypothesis-tests",
    title: "10. Hypothesis tests compare the observed data with a stated null model",
    html: String.raw`
      <p>A hypothesis test starts with a <strong>null hypothesis</strong> \(H_0\). The null describes a reference model. The alternative hypothesis \(H_1\) describes what you want to detect.</p>
      <p>For a comparison of two models, a simple null can be</p>
      <p>\[H_0:\mu_A-\mu_B=0,\]</p>
      <p>with an alternative</p>
      <p>\[H_1:\mu_A-\mu_B\ne0.\]</p>
      <p>A test statistic measures how far the observed data are from what \(H_0\) predicts, relative to expected sampling variation. A generic standardized statistic has the form</p>
      <p>\[T=\frac{\text{observed effect}-\text{null effect}}{\text{standard error under }H_0}.\]</p>
      <h3>Small numerical example</h3>
      <p>Suppose the estimated improvement is \(2.4\) percentage points and its standard error is \(0.8\) points. Under a zero-effect null,</p>
      <p>\[T=\frac{2.4-0}{0.8}=3.\]</p>
      <p>A value three standard errors away from zero is relatively unusual under a standard normal reference distribution.</p>
      <div class="paper-connection">
        <strong>Paper-reading rule.</strong> A test is only as meaningful as its null model and assumptions. Ask whether the observations are paired, independent, identically distributed, and whether the chosen test matches the metric.
      </div>
      <div class="shape-check">
        <strong>Common mistake.</strong> “Fail to reject \(H_0\)” does not mean “prove \(H_0\).” It means the evidence was not strong enough, under the chosen procedure, to reject it.
      </div>
    `
  },
  {
    id: "p-values",
    title: "11. A p-value measures how surprising the data are under the null hypothesis",
    html: String.raw`
      <p>A p-value is computed assuming that \(H_0\) is true. It measures how likely the test procedure is to produce a result at least as extreme as the observed result.</p>
      <div class="definition">
        <strong>Interpretation.</strong> A small p-value says: “If the null model were true, results this extreme would be uncommon under this test.”
      </div>
      <p>It does <strong>not</strong> directly give</p>
      <p>\[P(H_0\mid D).\]</p>
      <p>That is a posterior probability and requires a Bayesian model with priors.</p>
      <h3>Example</h3>
      <p>Suppose a two-sided test reports \(p=0.03\). Under the null and the test assumptions, outcomes at least as extreme as the observed one occur about 3% of the time.</p>
      <p>The value does not say that there is a 3% chance the null is true. It also does not tell you whether the effect is large enough to matter.</p>
      <div class="paper-connection">
        <strong>ML connection.</strong> A tiny improvement can become statistically significant with a huge test set. Conversely, a practically useful improvement can fail to reach a conventional threshold when the sample is small or noisy. Read p-values together with effect sizes and uncertainty intervals.
      </div>
    `
  },
  {
    id: "bootstrap",
    title: "12. The bootstrap approximates sampling uncertainty by resampling the observed data",
    html: String.raw`
      <p>The <strong>bootstrap</strong> creates many resampled datasets by sampling from the observed dataset with replacement. It recomputes the statistic on each resample.</p>
      <p>Suppose the observed sample is</p>
      <p>\[D=(2,4,7,9).\]</p>
      <p>One bootstrap sample can be</p>
      <p>\[D^{*(1)}=(4,4,9,2).\]</p>
      <p>Another can be</p>
      <p>\[D^{*(2)}=(7,9,7,7).\]</p>
      <p>Each sample has the same size as the original sample. Some original observations can appear several times. Others can be absent.</p>
      <h3>Bootstrap algorithm</h3>
      <ol>
        <li>Start with \(n\) observed examples.</li>
        <li>Sample \(n\) examples with replacement.</li>
        <li>Compute the statistic, for example accuracy difference \(\Delta^*\).</li>
        <li>Repeat many times.</li>
        <li>Use the empirical distribution of \(\Delta^*\) to estimate uncertainty.</li>
      </ol>
      <div class="paper-connection">
        <strong>ML connection.</strong> A paired bootstrap can compare two systems on the same test examples. For each resample, include the same selected example indices for both systems, then recompute the difference. This preserves the pairing.
      </div>
      <div class="shape-check">
        <strong>Important assumption.</strong> Naive resampling of individual examples can be wrong for time series, grouped observations, conversations, users, documents with multiple segments, or other dependent data. Use a resampling unit that respects the dependency structure.
      </div>
    `
  },
  {
    id: "effect-size",
    title: "13. Effect size asks how large the difference is, not only whether it is detectable",
    html: String.raw`
      <p>An <strong>effect size</strong> quantifies the magnitude of a difference or relationship.</p>
      <p>For two accuracy values, a simple absolute effect is</p>
      <p>\[\Delta=\hat p_A-\hat p_B.\]</p>
      <p>If model A has accuracy \(0.903\) and model B has accuracy \(0.900\), then</p>
      <p>\[\Delta=0.003,\]</p>
      <p>which is 0.3 percentage points.</p>
      <p>A relative change can tell a different story. If error rate falls from \(10\%\) to \(9.7\%\), the relative error reduction is</p>
      <p>\[\frac{0.10-0.097}{0.10}=0.03=3\%.\]</p>
      <h3>Standardized effect</h3>
      <p>For continuous outcomes, papers sometimes report a standardized mean difference such as</p>
      <p>\[d=\frac{\bar x_1-\bar x_2}{s_{\mathrm{pooled}}}.\]</p>
      <p>This expresses the difference in units of standard deviation.</p>
      <div class="paper-connection">
        <strong>Statistical versus practical significance.</strong> A result can be statistically detectable but operationally irrelevant. Ask whether the effect changes latency, cost, safety, user outcomes, or another decision-relevant quantity enough to matter.
      </div>
    `
  },
  {
    id: "multiple-comparisons",
    title: "14. Multiple comparisons increase the chance of finding an apparently significant result by luck",
    html: String.raw`
      <p>Suppose you run 20 independent tests. Each test uses a 5% false-positive threshold under its null hypothesis. Even if every null is true, the probability of at least one false positive is</p>
      <p>\[1-(1-0.05)^{20}.\]</p>
      <p>Numerically,</p>
      <p>\[1-0.95^{20}\approx0.642.\]</p>
      <p>So the chance of at least one false positive is about 64% in this simplified setting.</p>
      <p>One simple correction is the Bonferroni rule. For \(m\) tests and desired family-wise level \(\alpha\), test each comparison at</p>
      <p>\[\alpha_{\mathrm{per\ test}}=\frac{\alpha}{m}.\]</p>
      <p>For \(m=20\) and \(\alpha=0.05\), the threshold is \(0.0025\).</p>
      <div class="paper-connection">
        <strong>ML connection.</strong> Trying many model architectures, prompts, datasets, seeds, metrics, subgroups, or checkpoints creates a multiple-comparison problem if only the best-looking result is highlighted. Formal correction is one approach. Pre-specification and honest reporting are also important.
      </div>
    `
  }
);
