(() => {
  const day14 = COURSE[4].lessons[1];

  day14.sections.push(
    {
      id: "regularization",
      title: "7. Regularization changes which fitted solutions are preferred",
      html: String.raw`
        <p><strong>Regularization</strong> adds information or constraints that discourage some solutions. A common form is</p>
        <p>\[\widehat\theta=\arg\min_\theta \widehat R_n(\theta)+\lambda\,\Omega(\theta),\]</p>
        <p>where \(\Omega(\theta)\) is a penalty and \(\lambda\ge0\) controls its strength.</p>
        <p>For L2 regularization,</p>
        <p>\[\Omega(w)=\|w\|_2^2.\]</p>
        <p>For L1 regularization,</p>
        <p>\[\Omega(w)=\|w\|_1.\]</p>
        <h3>Numerical example</h3>
        <p>Suppose two candidate parameter vectors have the following training losses:</p>
        <p>\[\widehat R(w_A)=0.20,\qquad \widehat R(w_B)=0.18.\]</p>
        <p>Also suppose</p>
        <p>\[\|w_A\|_2^2=1,\qquad \|w_B\|_2^2=10.\]</p>
        <p>With \(\lambda=0.01\), the regularized objectives are</p>
        <p>\[0.20+0.01(1)=0.21\]</p>
        <p>and</p>
        <p>\[0.18+0.01(10)=0.28.\]</p>
        <p>The unregularized loss prefers \(w_B\), but the regularized objective prefers \(w_A\).</p>
        <h3>Regularization is broader than explicit penalties</h3>
        <p>Dropout, data augmentation, early stopping, architectural constraints, and some optimization procedures can also act as regularizers. They can change which solution is selected even if the objective has no explicit penalty term.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> If a paper states “we use weight decay \(10^{-4}\),” identify whether it means an L2 term in the objective or decoupled weight decay in an optimizer such as AdamW. These procedures can differ in adaptive optimizers.</div>
        <div class="shape-check"><strong>Common mistake.</strong> More regularization is not always better. If \(\lambda\) is too large, the model can underfit. The regularization strength is a hyperparameter and must usually be selected without using the test set.</div>
      `
    },
    {
      id: "inductive-bias",
      title: "8. Inductive bias tells the learner which solutions to prefer before seeing all possible data",
      html: String.raw`
        <p>Finite training data cannot determine the correct prediction for every possible input. A learner needs assumptions. These assumptions are called <strong>inductive biases</strong>.</p>
        <p>An inductive bias can come from the hypothesis class, architecture, objective, optimizer, data augmentation, or prior distribution.</p>
        <h3>Concrete examples</h3>
        <p>A linear model assumes that a useful predictor can be approximated by</p>
        <p>\[f(x)=w^\top x+b.\]</p>
        <p>A convolutional network assumes that local patterns and weight sharing are useful. A graph neural network assumes that graph connectivity is important. A Transformer uses attention and shared token-processing blocks rather than a fixed local image grid.</p>
        <h3>Numerical example</h3>
        <p>Suppose two training points are</p>
        <p>\[(0,0),\qquad(1,1).\]</p>
        <p>Infinitely many functions pass through both points. The line \(f(x)=x\) fits them. So does</p>
        <p>\[f(x)=x+100x(x-1).\]</p>
        <p>Both have zero error on the two observations, but they predict very different values between and outside them. A preference for smooth or simple functions selects one type of continuation over another.</p>
        <div class="paper-connection"><strong>ML connection.</strong> When a paper claims that an architecture is “well suited” to images, graphs, sets, or sequences, the claim is often about inductive bias. Ask what transformations or structures the model treats as special.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Inductive bias does not mean human prejudice in this technical context. It means a learning preference or assumption that makes generalization possible from limited data.</div>
      `
    },
    {
      id: "model-selection",
      title: "9. Model selection must be separated from final evaluation",
      html: String.raw`
        <p><strong>Model selection</strong> chooses a model class, architecture, hyperparameter setting, checkpoint, or training procedure.</p>
        <p>A standard split uses:</p>
        <ul>
          <li>training data to fit parameters,</li>
          <li>validation data to choose hyperparameters or checkpoints,</li>
          <li>test data to estimate final performance.</li>
        </ul>
        <h3>Numerical example</h3>
        <p>Suppose three learning rates give the following validation accuracies:</p>
        <table>
          <thead><tr><th>Learning rate</th><th>Validation accuracy</th></tr></thead>
          <tbody>
            <tr><td>\(10^{-2}\)</td><td>87%</td></tr>
            <tr><td>\(10^{-3}\)</td><td>91%</td></tr>
            <tr><td>\(10^{-4}\)</td><td>89%</td></tr>
          </tbody>
        </table>
        <p>The selection procedure chooses \(10^{-3}\). Only after this choice should the final model be evaluated on the untouched test set.</p>
        <h3>Selection itself can overfit</h3>
        <p>If you try thousands of configurations, some can look unusually good on the validation set by chance. The best observed validation score is therefore an optimistic estimate of that selected configuration's true performance.</p>
        <p>This is one reason that large benchmark searches need careful protocols, nested validation, or a final untouched evaluation set.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Read the experimental protocol. Ask how many models were tried, which metric selected the checkpoint, whether preprocessing choices used validation labels, and whether the reported test result was inspected repeatedly.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Parameters such as neural-network weights are learned during training. Hyperparameters such as learning rate, regularization strength, and architecture depth are selected by an outer procedure. Papers do not always use these words consistently, so follow the actual computation.</div>
      `
    },
    {
      id: "curse-dimensionality",
      title: "10. The curse of dimensionality makes coverage difficult as dimension grows",
      html: String.raw`
        <p>The <strong>curse of dimensionality</strong> describes several problems that become difficult when the number of dimensions increases.</p>
        <p>One simple effect is geometric coverage. Suppose you divide each input coordinate into 10 equal bins.</p>
        <p>In one dimension, you have</p>
        <p>\[10^1=10\]</p>
        <p>cells. In two dimensions, you have</p>
        <p>\[10^2=100\]</p>
        <p>cells. In ten dimensions, you have</p>
        <p>\[10^{10}\]</p>
        <p>cells.</p>
        <p>A dataset that densely covers a low-dimensional interval becomes extremely sparse in a high-dimensional grid.</p>
        <h3>Nearest-neighbor intuition</h3>
        <p>In high dimensions, distances can become less informative if many coordinates contain noise. A nearest neighbor can still be far away in absolute terms.</p>
        <h3>Numerical volume example</h3>
        <p>Consider the central interval \([-0.5,0.5]\) inside \([-1,1]\). In one dimension, it occupies half the length. In \(d\) independent dimensions, the central cube occupies a fraction</p>
        <p>\[\left(\frac12\right)^d.\]</p>
        <p>For \(d=10\), this is only</p>
        <p>\[\frac{1}{1024}\approx0.00098.\]</p>
        <p>Most volume is outside that central cube.</p>
        <div class="paper-connection"><strong>ML connection.</strong> High-dimensional raw inputs do not always imply that learning is impossible. Real data can lie near lower-dimensional structure, and strong inductive biases can exploit that structure. Representation learning can map data into features where the task is easier.</div>
        <div class="shape-check"><strong>Common mistake.</strong> “More features” is not automatically harmful. The problem depends on sample size, signal, noise, structure, regularization, and the learner. The curse of dimensionality is a warning about scaling, not a rule that every high-dimensional model must fail.</div>
      `
    },
    {
      id: "feature-selection",
      title: "11. Feature selection reduces the input set before or during model fitting",
      html: String.raw`
        <p><strong>Feature selection</strong> chooses a subset of available input variables. It is different from feature extraction, which creates new variables.</p>
        <p>Feature-selection methods are often grouped into three families.</p>
        <h3>Filter methods</h3>
        <p>A filter ranks features without fitting the final model. Examples include correlation, mutual information, and univariate statistical tests.</p>
        <h3>Wrapper methods</h3>
        <p>A wrapper repeatedly fits a model with different feature subsets. Forward selection and recursive feature elimination are examples.</p>
        <h3>Embedded methods</h3>
        <p>An embedded method selects features as part of fitting. L1-regularized linear models can set some coefficients exactly to zero.</p>
        <h3>Numerical example</h3>
        <p>Suppose a binary target has candidate features \(x_1,x_2,x_3\). A fitted L1 logistic-regression model gives</p>
        <p>\[w=(1.8,0,-0.7)^\top.\]</p>
        <p>Feature \(x_2\) has zero coefficient and can be interpreted as excluded by this fitted sparse model.</p>
        <h3>Selection must occur inside the validation protocol</h3>
        <p>If you use all labels, including test labels, to select the best 20 features and then report performance on that same test set, information has leaked into the evaluation.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> In genomics, text, tabular ML, and small-data studies, the number of candidate features can be large relative to \(n\). Always check whether feature selection was recomputed inside each training fold.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> If \(X\in\mathbb R^{n\times d}\) and a selector keeps \(k<d\) columns, the reduced design matrix has shape \(n\times k\). The row count does not change.</div>
      `
    },
    {
      id: "vc-dimension",
      title: "12. VC dimension measures classification capacity by shattering points",
      html: String.raw`
        <p>The <strong>VC dimension</strong> is a classical capacity measure for binary classifiers.</p>
        <p>A hypothesis class <strong>shatters</strong> a set of points if, for every possible assignment of binary labels to those points, some classifier in the class can realize that labeling.</p>
        <p>The VC dimension is the largest number of points that the class can shatter.</p>
        <h3>Threshold classifiers on a line</h3>
        <p>Consider</p>
        <p>\[h_t(x)=\mathbf 1[x\ge t].\]</p>
        <p>One point can be labeled either 0 or 1 by moving the threshold. Two ordered points cannot realize every labeling. In particular, the labeling \((1,0)\) cannot be produced by a single increasing threshold.</p>
        <p>Thus this threshold class has VC dimension 1.</p>
        <h3>Intervals on a line</h3>
        <p>Now consider classifiers that output 1 inside an interval and 0 outside. Two points can be shattered. You can label neither, either one, or both as positive by choosing a suitable interval. Three ordered points cannot realize the pattern \((1,0,1)\) with one interval.</p>
        <p>This class has VC dimension 2.</p>
        <h3>Why capacity enters bounds</h3>
        <p>A high-capacity class can fit more possible label patterns. Learning theory asks how many samples are needed before low empirical error also gives evidence of low expected error.</p>
        <div class="paper-connection"><strong>ML connection.</strong> You will see VC dimension most often in classical theory rather than modern large-model experiment sections. Its value is conceptual: a generalization statement needs a way to control how rich the hypothesis class is.</div>
        <div class="shape-check"><strong>Common mistake.</strong> VC dimension is not the input dimension. A classifier on \(\mathbb R^{100}\) does not automatically have VC dimension 100. The hypothesis class determines the VC dimension.</div>
      `
    },
    {
      id: "pac",
      title: "13. PAC learning turns generalization into probability and sample-size statements",
      html: String.raw`
        <p><strong>PAC</strong> means <strong>probably approximately correct</strong>. It is a framework for statements of this form:</p>
        <p>With probability at least \(1-\delta\), the learned predictor has error at most \(\varepsilon\) above the desired reference level, provided that the sample size is large enough.</p>
        <p>Here:</p>
        <ul>
          <li>\(\varepsilon>0\) controls the allowed error or generalization gap,</li>
          <li>\(\delta\in(0,1)\) controls failure probability,</li>
          <li>\(n\) is the number of training examples.</li>
        </ul>
        <h3>Read the probability carefully</h3>
        <p>A statement such as</p>
        <p>\[\Pr\left(R(\widehat h)\le0.05\right)\ge0.95\]</p>
        <p>means that, over repeated random draws of the training sample under the theorem's assumptions, the learned hypothesis has risk at most 5% in at least 95% of those draws.</p>
        <p>It does not mean that one particular prediction is correct with probability 95%.</p>
        <h3>Simple finite-class intuition</h3>
        <p>For a finite hypothesis class \(\mathcal H\), a typical uniform-convergence bound has the rough form</p>
        <p>\[R(h)\lesssim \widehat R_n(h)+\sqrt{\frac{\log|\mathcal H|+\log(1/\delta)}{n}}.\]</p>
        <p>This is schematic. Constants and assumptions depend on the theorem. The important structure is that the uncertainty term increases with class size and decreases with sample size.</p>
        <h3>Numerical intuition</h3>
        <p>If the uncertainty term behaves like \(1/\sqrt n\), increasing \(n\) from 100 to 400 cuts that term in half:</p>
        <p>\[\frac1{\sqrt{100}}=0.1,\qquad \frac1{\sqrt{400}}=0.05.\]</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Theoretical ML papers often state results “with probability at least \(1-\delta\).” Identify what randomness the probability is over and what assumptions make the bound valid.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A PAC-style bound is not automatically a tight prediction of practical test error. It can be useful as a guarantee or scaling statement even when the numerical bound is loose.</div>
      `
    }
  );
})();
