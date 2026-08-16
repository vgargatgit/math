day9.sections.push(
  {
    id: "selection-bias",
    title: "15. Selection bias appears when the observed sample is not representative of the target population",
    html: String.raw`
      <p><strong>Selection bias</strong> occurs when the mechanism that puts examples into the dataset changes the distribution in a way that matters for the claim.</p>
      <p>Suppose a fraud model will process all card transactions, but the training dataset contains only transactions that human reviewers chose to inspect. The sample is conditioned on the reviewer-selection process. It can contain more suspicious cases than the deployment population.</p>
      <p>Let \(S=1\) mean “selected into the dataset.” What you observe is often</p>
      <p>\[p(X,Y\mid S=1),\]</p>
      <p>but what you want is performance under</p>
      <p>\[p(X,Y).\]</p>
      <p>If selection depends on \(X\), \(Y\), or hidden variables related to them, these distributions can differ.</p>
      <h3>Numerical example</h3>
      <p>Imagine the deployment population is 5% positive and 95% negative. A review process selects 80% of positives but only 10% of negatives. In 10,000 population cases, that gives about</p>
      <p>\[400\text{ selected positives},\qquad950\text{ selected negatives}.\]</p>
      <p>The selected sample is about 29.6% positive, not 5% positive.</p>
      <div class="paper-connection">
        <strong>Paper-reading rule.</strong> Ask how examples entered the dataset. A large dataset can still be biased if its selection mechanism is narrow or systematic.
      </div>
    `
  },
  {
    id: "splits",
    title: "16. Train, validation, and test splits must have different jobs",
    html: String.raw`
      <p>The three-way split exists to separate parameter fitting, model selection, and final evaluation.</p>
      <ul>
        <li><strong>Training set:</strong> fit model parameters such as weights.</li>
        <li><strong>Validation set:</strong> choose hyperparameters, architectures, thresholds, stopping time, and other design decisions.</li>
        <li><strong>Test set:</strong> estimate final performance after choices are fixed.</li>
      </ul>
      <p>Suppose you have 10,000 examples and choose a 70/15/15 split. The shapes can be written as</p>
      <p>\[X_{\mathrm{train}}\in\mathbb{R}^{7000\times d},\quad X_{\mathrm{val}}\in\mathbb{R}^{1500\times d},\quad X_{\mathrm{test}}\in\mathbb{R}^{1500\times d}.\]</p>
      <p>The feature dimension \(d\) stays the same. The sample dimension changes.</p>
      <h3>Why a final test set is needed</h3>
      <p>If you choose among 100 configurations by validation performance, the selected configuration is partly adapted to validation noise. The validation set has become part of the model-selection procedure.</p>
      <div class="shape-check">
        <strong>Common mistake.</strong> Do not repeatedly inspect test performance while developing the model. Once test results influence design choices, that test set is no longer a clean final evaluation set.
      </div>
      <div class="paper-connection">
        <strong>ML connection.</strong> Early stopping uses validation data repeatedly. Hyperparameter search also uses validation data. Neither activity should use the final test set if the reported test score is meant to be an unbiased final check.
      </div>
    `
  },
  {
    id: "cross-validation",
    title: "17. Cross-validation reuses limited data while keeping each evaluation fold out of training",
    html: String.raw`
      <p>In \(K\)-fold cross-validation, split the data into \(K\) folds. Train \(K\) times. Each run holds out one fold for evaluation and trains on the other \(K-1\) folds.</p>
      <p>For \(K=5\) and 1000 examples, each fold has about 200 examples. Each model trains on about 800 and evaluates on about 200.</p>
      <p>If the fold scores are</p>
      <p>\[0.82,\ 0.84,\ 0.81,\ 0.85,\ 0.83,\]</p>
      <p>the cross-validation mean is</p>
      <p>\[\bar s=\frac{0.82+0.84+0.81+0.85+0.83}{5}=0.83.\]</p>
      <p>The variation across folds gives useful information, but the folds are not fully independent experiments because their training sets overlap.</p>
      <div class="paper-connection">
        <strong>When it helps.</strong> Cross-validation is useful when data are limited and one fixed validation split would be noisy. It is also used for model or hyperparameter selection.
      </div>
      <div class="shape-check">
        <strong>Dependency warning.</strong> For time series, grouped users, patients, documents, or conversations, random row-wise folds can leak information. Use time-aware or group-aware splitting when the deployment problem requires it.
      </div>
    `
  },
  {
    id: "hyperparameter-bias",
    title: "18. Hyperparameter selection can overfit the validation set",
    html: String.raw`
      <p>Hyperparameters include learning rate, regularization strength, number of layers, prompt template, decoding settings, and many other choices not directly learned as ordinary model weights.</p>
      <p>Suppose 50 configurations have the same true performance but noisy validation estimates. If you choose the configuration with the highest observed validation score, it is likely to have benefited from positive noise.</p>
      <p>Write a validation score as</p>
      <p>\[\hat s_j=s_j+\epsilon_j,\]</p>
      <p>where \(s_j\) is true performance and \(\epsilon_j\) is validation noise. Selecting</p>
      <p>\[j^*=\arg\max_j\hat s_j\]</p>
      <p>also tends to select a configuration with a large positive \(\epsilon_j\).</p>
      <p>This is a form of selection bias.</p>
      <div class="paper-connection">
        <strong>Practical controls.</strong> Use a final untouched test set, nested cross-validation when appropriate, pre-specified search spaces, and transparent reporting of how many configurations were tried.
      </div>
      <div class="shape-check">
        <strong>Common mistake.</strong> “The test set was never used for gradient descent” is not enough. Any human or automated design choice based on test results can leak test information into the final system.
      </div>
    `
  },
  {
    id: "data-leakage",
    title: "19. Data leakage lets information from evaluation data influence training or model selection",
    html: String.raw`
      <p><strong>Data leakage</strong> occurs when information that should be unavailable during training enters the model-building process.</p>
      <h3>Preprocessing leakage</h3>
      <p>Suppose a feature is standardized as</p>
      <p>\[z=\frac{x-\mu}{\sigma}.\]</p>
      <p>If \(\mu\) and \(\sigma\) are computed from the full dataset before splitting, test-set information influences the transformed training data.</p>
      <p>The correct procedure is:</p>
      <ol>
        <li>Split the data.</li>
        <li>Estimate \(\mu_{\mathrm{train}}\) and \(\sigma_{\mathrm{train}}\) from training data only.</li>
        <li>Transform train, validation, and test using those training estimates.</li>
      </ol>
      <h3>Entity leakage</h3>
      <p>If several rows belong to the same user, patient, document, or device, putting related rows in both train and test can make the test task much easier than deployment.</p>
      <h3>Temporal leakage</h3>
      <p>A model that predicts future events must not use features computed with information from the future.</p>
      <div class="paper-connection">
        <strong>Paper-reading rule.</strong> Inspect the entire pipeline, not only the model. Feature construction, label generation, imputation, normalization, filtering, deduplication, and data augmentation can all leak information.
      </div>
    `
  },
  {
    id: "ablations",
    title: "20. Ablation studies test which parts of a system actually contribute",
    html: String.raw`
      <p>An <strong>ablation</strong> removes or changes one component and measures the effect. It helps answer a causal design question inside the experimental system: “Does this component contribute under this evaluation protocol?”</p>
      <p>Suppose the full model has score \(84.2\). Remove component A and get \(82.9\). Remove component B and get \(84.0\). A simple reported difference is</p>
      <p>\[\Delta_A=84.2-82.9=1.3\text{ points}.\]</p>
      <p>Component A appears more important under this experiment.</p>
      <h3>Interactions matter</h3>
      <p>If components interact, one-at-a-time ablations can be misleading. Suppose A helps only when B is present. Removing A from the full system measures one conditional effect, not an intrinsic standalone value of A.</p>
      <div class="paper-connection">
        <strong>Good paper evidence.</strong> A useful ablation keeps training budget, data, evaluation procedure, and other factors fixed as much as possible. If removing a component also changes parameter count or compute, interpret the result carefully.
      </div>
    `
  },
  {
    id: "practical-significance",
    title: "21. Statistical significance and practical significance answer different questions",
    html: String.raw`
      <p>Statistical significance asks whether an observed effect is difficult to explain as sampling noise under a specified null model. Practical significance asks whether the magnitude matters for the real decision.</p>
      <p>Suppose model A improves accuracy from \(90.00\%\) to \(90.05\%\) on a dataset with tens of millions of independent examples. The difference can be statistically detectable because the standard error is tiny.</p>
      <p>But if model A doubles inference cost, adds 200 ms latency, and changes no meaningful user outcome, the improvement can be practically unattractive.</p>
      <p>Conversely, a 3-point improvement on a small rare-disease dataset can be practically important even if uncertainty is still wide.</p>
      <div class="paper-connection">
        <strong>Reading rule.</strong> Look for the estimate, uncertainty, and decision context together. Ask: How large is the effect? How uncertain is it? What does it cost? Does it improve the metric that matters?
      </div>
    `
  },
  {
    id: "reproducibility-seeds",
    title: "22. Reproducibility requires more than fixing one random seed",
    html: String.raw`
      <p>ML training can depend on random initialization, data shuffling, dropout masks, augmentation, sampling, nondeterministic kernels, and other sources of variation.</p>
      <p>A random seed controls a pseudorandom-number generator. It helps reproduce one sequence of random choices. It does not guarantee complete reproducibility across every hardware and software environment.</p>
      <h3>Seed variation</h3>
      <p>Suppose five training runs produce validation scores</p>
      <p>\[82.1,\ 82.8,\ 81.9,\ 82.5,\ 82.7.\]</p>
      <p>The mean is</p>
      <p>\[\bar s=82.4.\]</p>
      <p>Reporting only the best run, \(82.8\), hides the run-to-run variation.</p>
      <h3>What to record</h3>
      <ul>
        <li>Random seeds and number of runs.</li>
        <li>Dataset version and split procedure.</li>
        <li>Code commit and dependency versions.</li>
        <li>Hardware or accelerator details when they matter.</li>
        <li>Hyperparameters and stopping rules.</li>
        <li>Exact metric definitions and preprocessing.</li>
      </ul>
      <div class="paper-connection">
        <strong>Paper-reading rule.</strong> “We used seed 42” is not a complete uncertainty analysis. Prefer results across several runs when training randomness is material, especially when model differences are small.
      </div>
    `
  },
  {
    id: "end-to-end-reading",
    title: "23. Read an experimental claim from population to conclusion",
    html: String.raw`
      <p>Consider this hypothetical paper statement:</p>
      <div class="mini-example">
        “Our model improves test accuracy from 81.2% to 82.0% on 5000 examples. A paired bootstrap gives a 95% interval of [0.3, 1.3] percentage points over five training seeds.”
      </div>
      <p>Read it in layers.</p>
      <ol>
        <li><strong>Population.</strong> What future or benchmark distribution should the 5000 examples represent?</li>
        <li><strong>Estimator.</strong> The observed effect is \(82.0-81.2=0.8\) percentage points.</li>
        <li><strong>Uncertainty.</strong> The bootstrap interval says the evaluation procedure sees a plausible range of improvements under its resampling assumptions.</li>
        <li><strong>Pairing.</strong> If both models are scored on the same examples, paired resampling is appropriate because the outcomes are dependent within each example.</li>
        <li><strong>Training randomness.</strong> Five seeds expose some run-to-run variation. Ask whether five are enough for the observed variability.</li>
        <li><strong>Selection.</strong> Was this architecture selected after many trials on the same validation benchmark?</li>
        <li><strong>Practical effect.</strong> Is 0.8 points worth the change in compute, memory, latency, or complexity?</li>
        <li><strong>Leakage.</strong> Was the test set isolated from feature design and hyperparameter selection?</li>
      </ol>
      <p>This sequence is more useful than asking only whether a p-value is below a threshold.</p>
    `
  },
  {
    id: "common-mistakes",
    title: "24. Common mistakes in statistical and experimental reasoning",
    html: String.raw`
      <ul>
        <li><strong>Sample equals population.</strong> A test score is an estimate, not a population constant.</li>
        <li><strong>Standard deviation equals standard error.</strong> One describes observations; the other describes estimator uncertainty.</li>
        <li><strong>p-value equals probability the null is true.</strong> It does not.</li>
        <li><strong>Non-significant means no effect.</strong> It can also mean insufficient precision.</li>
        <li><strong>Significant means important.</strong> A detectable effect can be too small to matter.</li>
        <li><strong>More hyperparameter trials are free.</strong> Selection can overfit noisy validation scores.</li>
        <li><strong>Random split is always valid.</strong> Grouped and temporal data often need structured splits.</li>
        <li><strong>Preprocessing is harmless.</strong> Fitting preprocessing on all data can leak test information.</li>
        <li><strong>One ablation proves causality in general.</strong> It only supports a conclusion under that experimental setup.</li>
        <li><strong>One seed is representative.</strong> Training randomness can be large enough to change conclusions.</li>
      </ul>
    `
  },
  {
    id: "recap",
    title: "25. Recap: separate estimation uncertainty from experimental validity",
    html: String.raw`
      <p>Statistical inference begins with a population, a sample, and an estimator. The sampling distribution tells you how the estimator would vary across repeated samples. Bias, variance, consistency, standard error, confidence intervals, tests, and bootstrap methods describe different parts of that uncertainty.</p>
      <p>Likelihood methods connect statistical inference to ML training. MLE chooses parameters that make observed data likely. MAP combines that likelihood with a prior.</p>
      <p>Experimental reasoning adds another layer. Even a mathematically correct confidence interval cannot rescue a leaked test set, a biased sample, or a result selected from hundreds of unreported trials. Splits, cross-validation, leakage control, ablations, seed reporting, and multiple-comparison awareness determine whether the reported number supports the intended claim.</p>
      <div class="definition">
        <strong>Day 9 reading checklist.</strong> For every experimental result, identify the target population, sample, estimator, uncertainty method, selection process, split protocol, leakage risks, effect size, and reproducibility evidence.
      </div>
    `
  }
);
