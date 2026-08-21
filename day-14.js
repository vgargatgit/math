const day14 = COURSE[4].lessons[1];

Object.assign(day14, {
  published: true,
  summary: "Learn how to separate training fit from generalization, reason about risk and model capacity, and read model-selection claims in AI and ML papers.",
  explanation: "A model can fit its training data and still fail on new data. Statistical learning theory gives a language for this gap. It separates the data that you observed from the distribution that you care about. It also explains why capacity, regularization, model selection, evaluation metrics, and distribution shift matter when you judge a result in an AI or ML paper.",
  topics: [
    "Supervised, unsupervised, and self-supervised learning",
    "Empirical and expected risk",
    "Training and generalization error",
    "Underfitting and overfitting",
    "Bias-variance trade-off",
    "Model capacity",
    "Regularization",
    "Inductive bias",
    "Model selection",
    "Curse of dimensionality",
    "Feature-selection methods",
    "VC dimension intuition",
    "PAC intuition",
    "Markov, Chebyshev, and Hoeffding inequalities",
    "Distribution shift",
    "Covariate shift",
    "Calibration",
    "Class imbalance",
    "Precision, recall, ROC, PR, and scoring rules",
    "Causal versus predictive claims",
    "No-free-lunch intuition"
  ],
  sections: [
    {
      id: "learning-settings",
      title: "1. First identify the learning setting",
      html: String.raw`
        <p>Before you read a loss function, identify what information the model receives during training. This tells you what kind of learning problem the paper studies.</p>
        <h3>Supervised learning</h3>
        <p>In <strong>supervised learning</strong>, each training example has an input and a target. Write the dataset as</p>
        <p>\[\mathcal D=\{(x_i,y_i)\}_{i=1}^{n}.\]</p>
        <p>The input \(x_i\) can be a vector, image, sequence, or another object. The target \(y_i\) can be a class label, a real value, or a structured output.</p>
        <p>For binary classification, a model can produce</p>
        <p>\[p_\theta(y=1\mid x)=\sigma(f_\theta(x)),\]</p>
        <p>and training can minimize binary cross-entropy.</p>
        <h3>Unsupervised learning</h3>
        <p>In <strong>unsupervised learning</strong>, the training set does not contain an externally supplied target for each input. A common notation is</p>
        <p>\[\mathcal D=\{x_i\}_{i=1}^{n}.\]</p>
        <p>The model can learn clusters, densities, latent representations, or structure in the input distribution.</p>
        <p>For example, k-means minimizes</p>
        <p>\[\sum_{i=1}^{n}\min_{k\in\{1,\ldots,K\}}\|x_i-\mu_k\|_2^2.\]</p>
        <h3>Self-supervised learning</h3>
        <p>In <strong>self-supervised learning</strong>, the target comes from the data itself. The system creates a prediction task without a separate human label.</p>
        <p>A language model uses earlier tokens to predict the next token:</p>
        <p>\[\mathcal L(\theta)=-\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t}).\]</p>
        <p>The sequence supplies both the input context and the target token.</p>
        <h3>Small numerical examples</h3>
        <p><strong>Supervised:</strong> suppose three house-size inputs are \((50,70,100)\) square meters and targets are \((80,105,150)\) lakh rupees. A regression model uses the pairs \((x_i,y_i)\).</p>
        <p><strong>Unsupervised:</strong> suppose four one-dimensional points are \((1,2,9,10)\). With \(K=2\), k-means can find centers near \(1.5\) and \(9.5\) without class labels.</p>
        <p><strong>Self-supervised:</strong> for the token sequence “the cat sleeps”, the model can use “the cat” as context and “sleeps” as the next-token target.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> A claim such as “we learn representations without labels” can mean unsupervised or self-supervised learning. Look at how the training target is produced. Do not classify the method only from the model architecture.</div>
        <div class="shape-check"><strong>Shape check.</strong> In supervised tabular learning, \(X\in\mathbb R^{n\times d}\) can contain \(n\) examples with \(d\) features. A classification target can be \(y\in\{1,\ldots,K\}^{n}\). In self-supervised sequence learning, a batch can have shape \(B\times T\), and the shifted next-token targets have the same logical shape.</div>
      `
    },
    {
      id: "risk",
      title: "2. Empirical risk is observed; expected risk is what we care about",
      html: String.raw`
        <p>A paper often defines an objective as an average loss. You must ask which average it uses.</p>
        <p>Let \(Z=(X,Y)\) be a random example from an unknown data distribution \(P\). Let \(f_\theta\) be a model and let \(\ell(f_\theta(X),Y)\) be its loss.</p>
        <p>The <strong>expected risk</strong>, also called population risk, is</p>
        <p>\[R(\theta)=\mathbb E_{(X,Y)\sim P}\left[\ell(f_\theta(X),Y)\right].\]</p>
        <p>We usually cannot calculate this expectation exactly because \(P\) is unknown.</p>
        <p>The <strong>empirical risk</strong> on a sample of \(n\) examples is</p>
        <p>\[\widehat R_n(\theta)=\frac1n\sum_{i=1}^{n}\ell(f_\theta(x_i),y_i).\]</p>
        <p>Training by empirical risk minimization uses</p>
        <p>\[\widehat\theta=\arg\min_\theta \widehat R_n(\theta).\]</p>
        <h3>Numerical example</h3>
        <p>Suppose the per-example training losses are</p>
        <p>\[(0.1,0.4,0.2,0.3).\]</p>
        <p>Then</p>
        <p>\[\widehat R_4=\frac{0.1+0.4+0.2+0.3}{4}=0.25.\]</p>
        <p>This value is known for this sample. It is not automatically the expected loss on future examples.</p>
        <h3>A classification example</h3>
        <p>For zero-one loss,</p>
        <p>\[\ell(\hat y,y)=\mathbf 1[\hat y\ne y].\]</p>
        <p>If a classifier makes 7 errors on 100 training examples, its empirical zero-one risk is \(0.07\). If its true error probability on the deployment distribution is \(0.11\), then its expected zero-one risk is \(0.11\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Cross-entropy training is an empirical-risk problem. Papers optimize a finite sample average, but they usually claim performance on a population of future inputs. The difference between these two objects is central to learning theory.</div>
        <div class="shape-check"><strong>Notation warning.</strong> Authors can use \(L\), \(\mathcal L\), \(R\), or \(J\) for either an individual loss or an average risk. Find the definition. A hat, as in \(\widehat R\), often marks a sample estimate, but this convention is not universal.</div>
      `
    },
    {
      id: "generalization-gap",
      title: "3. Generalization is the gap between sample performance and population performance",
      html: String.raw`
        <p>A trained model generalizes when its performance on new data is close to its performance on the data used to fit it.</p>
        <p>A simple <strong>generalization gap</strong> is</p>
        <p>\[R(\widehat\theta)-\widehat R_n(\widehat\theta).\]</p>
        <p>The true expected risk \(R\) is usually unknown. In practice, a held-out test set estimates it.</p>
        <h3>Numerical example</h3>
        <p>Suppose a classifier has 98% training accuracy and 90% test accuracy. Its error rates are 2% and 10%. A simple observed error gap is</p>
        <p>\[0.10-0.02=0.08.\]</p>
        <p>The eight percentage-point gap suggests that fitting the training set did not fully transfer to unseen data.</p>
        <h3>Loss can tell a different story from accuracy</h3>
        <p>Model A can have 90% test accuracy with mean cross-entropy \(0.25\). Model B can also have 90% test accuracy with mean cross-entropy \(0.80\). Model B may make the same number of mistakes but assign much more extreme probabilities to some wrong predictions.</p>
        <p>Thus, “generalization error” must name a metric. Accuracy gap and cross-entropy gap are not the same quantity.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Training curves alone do not establish generalization. Look for validation or test results from data that was not used to update parameters or select hyperparameters.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not treat the test set as another training signal. If a team repeatedly selects models after looking at test results, the test set becomes part of the selection process and its estimate can become optimistic.</div>
      `
    },
    {
      id: "underfit-overfit",
      title: "4. Underfitting and overfitting are different failure modes",
      html: String.raw`
        <p><strong>Underfitting</strong> occurs when the model cannot represent or learn enough of the useful pattern. Training error remains high.</p>
        <p><strong>Overfitting</strong> occurs when the model fits details of the training sample that do not transfer to new data. Training error becomes low, but validation or test error is worse.</p>
        <h3>Polynomial example</h3>
        <p>Suppose the true relation is approximately</p>
        <p>\[y=2x^2+x+\varepsilon,\]</p>
        <p>where \(\varepsilon\) is noise.</p>
        <p>A constant model \(y=c\) can underfit because it cannot represent curvature. A degree-2 polynomial can match the main relation. A degree-20 polynomial can pass through a small noisy training set and oscillate strongly between points.</p>
        <h3>Numerical learning-curve example</h3>
        <table>
          <thead><tr><th>Model</th><th>Training error</th><th>Validation error</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>Small</td><td>18%</td><td>20%</td><td>Likely underfitting</td></tr>
            <tr><td>Medium</td><td>6%</td><td>8%</td><td>Better fit and generalization</td></tr>
            <tr><td>Very large</td><td>0%</td><td>15%</td><td>Possible overfitting</td></tr>
          </tbody>
        </table>
        <p>The table is only evidence. It is not a theorem. A very large modern neural network can sometimes generalize well even after reaching near-zero training error.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Early stopping, data augmentation, weight decay, dropout, and larger datasets can reduce some forms of overfitting. Increasing model capacity or training longer can reduce underfitting.</div>
        <div class="shape-check"><strong>Common mistake.</strong> “Large model” is not a synonym for “overfit model.” Overfitting is a relation between the fitted model, the sample, and the target distribution. Capacity is one contributing factor.</div>
      `
    },
    {
      id: "bias-variance",
      title: "5. Bias and variance describe two sources of prediction error",
      html: String.raw`
        <p>The <strong>bias-variance trade-off</strong> is easiest to state for squared-error regression.</p>
        <p>Assume</p>
        <p>\[Y=f^*(X)+\varepsilon,\qquad \mathbb E[\varepsilon\mid X]=0,\qquad \operatorname{Var}(\varepsilon\mid X)=\sigma^2.\]</p>
        <p>Imagine that we repeatedly draw new training sets and fit a predictor \(\widehat f\). At a fixed input \(x\), the expected squared prediction error can be decomposed as</p>
        <p>\[\mathbb E[(Y-\widehat f(x))^2]=\underbrace{\bigl(\mathbb E[\widehat f(x)]-f^*(x)\bigr)^2}_{\text{bias}^2}+\underbrace{\operatorname{Var}(\widehat f(x))}_{\text{variance}}+\underbrace{\sigma^2}_{\text{irreducible noise}}.\]</p>
        <h3>Numerical example</h3>
        <p>Suppose \(f^*(x)=10\). Across many training sets, a method has mean prediction \(8\) and prediction variance \(9\). Suppose observation noise variance is \(4\).</p>
        <p>The squared bias is</p>
        <p>\[(8-10)^2=4.\]</p>
        <p>The expected squared error is</p>
        <p>\[4+9+4=17.\]</p>
        <p>Another method can have mean prediction \(10\) and variance \(16\). Its error is</p>
        <p>\[0+16+4=20.\]</p>
        <p>Lower bias did not guarantee lower total error because variance increased.</p>
        <h3>Interpretation</h3>
        <p>A very rigid model can have high bias and low variance. A very flexible model can have lower bias and higher sensitivity to the exact training sample. This is a classical intuition, not a universal one-dimensional law for modern deep networks.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> When authors report mean and standard deviation across training seeds or data splits, they expose part of the variability of the training procedure. Bias usually cannot be measured directly because the true regression function is unknown.</div>
        <div class="shape-check"><strong>Common mistake.</strong> The statistical meaning of “bias” is different from the bias parameter \(b\) in a neural layer \(Wx+b\). Context must tell you which meaning is intended.</div>
      `
    },
    {
      id: "capacity",
      title: "6. Model capacity measures how many patterns a model class can express",
      html: String.raw`
        <p>A <strong>hypothesis class</strong> \(\mathcal H\) is the set of predictors that a learning method can choose from. Model capacity describes the richness of this set.</p>
        <p>For linear regression in \(d\) input features,</p>
        <p>\[f_{w,b}(x)=w^\top x+b\]</p>
        <p>has \(d+1\) scalar parameters. A polynomial model with many terms has more possible shapes. A neural network can have millions or billions of parameters and a very rich function class.</p>
        <h3>A small example</h3>
        <p>Consider one-dimensional inputs. The class of constant functions can fit only horizontal lines. The class</p>
        <p>\[f(x)=a+bx\]</p>
        <p>can fit any line. The class</p>
        <p>\[f(x)=a+bx+cx^2\]</p>
        <p>also represents curvature. Each enlargement adds functions that were not available before.</p>
        <h3>Capacity is not only parameter count</h3>
        <p>Parameter count is useful, but it is not a complete capacity measure. Constraints, parameter sharing, norms, architecture, optimization, and data augmentation can change the effective function class.</p>
        <p>For example, a convolutional layer can have many activations while sharing the same kernel across spatial positions. Its parameter count and its input-output dimension are different quantities.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Scaling-law papers change parameter count, data size, and compute. Learning-theory papers can instead control a norm, margin, VC dimension, Rademacher complexity, or another capacity measure. Do not assume that all capacity measures are interchangeable.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> If \(W\in\mathbb R^{d\times h}\) and \(b\in\mathbb R^h\), an affine layer has \(dh+h\) scalar parameters. Its batch output for \(X\in\mathbb R^{B\times d}\) has shape \(B\times h\). Parameter count and output shape answer different questions.</div>
      `
    }
  ]
});
