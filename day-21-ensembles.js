(() => {
  const day21 = COURSE[6].lessons[5];

  day21.sections.push(
    {
      id: "decision-trees",
      title: "11. A decision tree partitions feature space with simple questions",
      html: String.raw`
        <p>A decision tree predicts by following a sequence of rules. For a numeric feature, one internal node can ask</p>
        <p>\[
        x_j\le t\;?
        \]</p>
        <p>The feature index \(j\) and threshold \(t\) define a split. One branch receives examples that satisfy the rule. The other branch receives the remaining examples.</p>

        <h3>Small classification tree</h3>
        <p>Suppose a loan dataset has two features: income and debt ratio. A tree can start with</p>
        <p>\[
        \text{debt ratio}\le0.35.
        \]</p>
        <p>It can then ask a second question about income only for examples that go to one branch. The final leaves store class probabilities or class labels.</p>

        <h3>Regression leaves</h3>
        <p>For squared-error regression, a leaf often predicts the average target of the training examples in that leaf. If a leaf contains targets</p>
        <p>\[
        3,\;5,\;7,
        \]</p>
        <p>the leaf prediction is</p>
        <p>\[
        \frac{3+5+7}{3}=5.
        \]</p>

        <h3>Piecewise-constant geometry</h3>
        <p>Axis-aligned trees divide the input space into rectangular regions. Each leaf assigns one prediction to its region. This makes trees nonlinear even though each individual split is a simple threshold test.</p>

        <h3>Shape reasoning</h3>
        <p>For a dataset</p>
        <p>\[
        X\in\mathbb R^{n\times d},
        \]</p>
        <p>a split examines one of the \(d\) feature columns. In a batch implementation, the output of a classification tree with \(C\) classes can be represented as</p>
        <p>\[
        P\in\mathbb R^{B\times C},
        \]</p>
        <p>where each row contains the leaf class proportions for one example.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Trees are common baselines for tabular ML. If a deep model is compared only with a weak single tree, check whether stronger tree ensembles such as random forests or gradient boosting are also evaluated.</div>
      `
    },
    {
      id: "tree-split-criteria",
      title: "12. Tree training chooses splits that reduce impurity or prediction error",
      html: String.raw`
        <p>A tree needs a rule for deciding whether one split is better than another.</p>

        <h3>Gini impurity</h3>
        <p>For a classification node with class proportions \(p_1,\ldots,p_C\), Gini impurity is</p>
        <p>\[
        G=1-\sum_{c=1}^{C}p_c^2.
        \]</p>
        <p>Suppose a node has 8 positive and 2 negative examples. Then</p>
        <p>\[
        p_+=0.8,
        \qquad
        p_-=0.2,
        \]</p>
        <p>so</p>
        <p>\[
        G=1-(0.8^2+0.2^2)=0.32.
        \]</p>
        <p>A pure node has impurity zero.</p>

        <h3>Entropy</h3>
        <p>Another classification criterion is entropy:</p>
        <p>\[
        H=-\sum_cp_c\log p_c.
        \]</p>
        <p>Both entropy and Gini are small when one class dominates and larger when classes are mixed.</p>

        <h3>Weighted split score</h3>
        <p>If a split creates left and right children with \(n_L\) and \(n_R\) examples, a common post-split impurity is</p>
        <p>\[
        \frac{n_L}{n}I_L+\frac{n_R}{n}I_R.
        \]</p>
        <p>The algorithm prefers a large reduction from the parent impurity.</p>

        <h3>Regression criterion</h3>
        <p>For regression, a common split objective is squared error around the leaf mean. For a set \(S\),</p>
        <p>\[
        \operatorname{SSE}(S)=\sum_{i\in S}(y_i-\bar y_S)^2.
        \]</p>
        <p>A split is useful when the sum of child SSE values is much smaller than the parent SSE.</p>

        <h3>Greedy does not mean globally optimal</h3>
        <p>Standard tree training chooses the best available split at each node. This is a greedy algorithm. The locally best split does not guarantee the globally smallest tree or globally best future test error.</p>
        <div class="definition"><strong>Common mistake.</strong> Feature importance based on split gain can be biased toward features with many candidate split points. Papers can instead use permutation importance or SHAP-style analyses, but those have their own assumptions.</div>
      `
    },
    {
      id: "bagging",
      title: "13. Bagging reduces variance by averaging predictors trained on resampled data",
      html: String.raw`
        <p><strong>Bagging</strong> means bootstrap aggregating. It creates many training datasets by sampling the original training set with replacement. A separate predictor is trained on each bootstrap sample.</p>
        <p>For regression, the bagged prediction is commonly</p>
        <p>\[
        \widehat f_{\text{bag}}(x)
        =\frac1M\sum_{m=1}^{M}\widehat f_m(x).
        \]</p>

        <h3>Numerical average</h3>
        <p>Suppose five trees predict</p>
        <p>\[
        8.0,\;9.5,\;7.5,\;8.5,\;9.0.
        \]</p>
        <p>The ensemble prediction is</p>
        <p>\[
        \frac{8+9.5+7.5+8.5+9}{5}=8.5.
        \]</p>

        <h3>Why averaging can reduce variance</h3>
        <p>Assume each predictor has variance \(\sigma^2\) and any pair has correlation \(\rho\). The variance of their average is approximately</p>
        <p>\[
        \rho\sigma^2+\frac{1-\rho}{M}\sigma^2.
        \]</p>
        <p>As \(M\) grows, the second term shrinks. The correlated part remains. This explains why both diversity and the number of models matter.</p>

        <h3>Bootstrap sampling</h3>
        <p>A bootstrap sample contains \(n\) draws from \(n\) training examples with replacement. Some examples appear several times. Some are absent. The absent examples for one tree are called out-of-bag examples and can be used for internal error estimates.</p>

        <h3>Classification</h3>
        <p>For classification, models can vote for labels or average class probabilities. These are not always identical procedures. Probability averaging preserves more information than a hard vote.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Bagging is a variance-reduction strategy. It is most useful when the base learner is unstable, meaning modest data changes can produce different fitted models. Deep trees are a classic example.</div>
      `
    },
    {
      id: "random-forests",
      title: "14. A random forest adds feature randomness to bagging",
      html: String.raw`
        <p>A random forest is an ensemble of decision trees. It uses bootstrap-style data variation and also restricts the features considered at each split.</p>

        <h3>Why random feature subsets help</h3>
        <p>Suppose one very strong feature appears in almost every bootstrap sample. Plain bagged trees can all choose it near the root, making the trees strongly correlated. Random forests reduce this correlation by allowing each split to inspect only a random subset of features.</p>

        <h3>Feature-subset shape</h3>
        <p>If the full input has</p>
        <p>\[
        d=100
        \]</p>
        <p>features, a classification forest might inspect approximately \(\sqrt d=10\) randomly selected features at one split. The exact rule is a hyperparameter and differs by implementation.</p>

        <h3>Regression prediction</h3>
        <p>With \(M\) trees,</p>
        <p>\[
        \widehat y(x)=\frac1M\sum_{m=1}^{M}T_m(x).
        \]</p>
        <p>If the tree outputs for one point are \(4,6,5,7\), the forest output is</p>
        <p>\[
        (4+6+5+7)/4=5.5.
        \]</p>

        <h3>Out-of-bag evaluation</h3>
        <p>Each training example is absent from some bootstrap samples. You can evaluate that example using only trees that did not train on it. Aggregating these predictions gives an out-of-bag estimate without creating a separate validation prediction for every tree.</p>

        <h3>Random forests and extrapolation</h3>
        <p>A standard regression forest predicts averages of observed training targets in leaves. It does not naturally extrapolate a linear trend far outside the observed target range. This differs from a linear model, which can continue a fitted slope beyond the training region.</p>
        <div class="definition"><strong>Common mistake.</strong> “Random” does not mean the model is unstructured. Randomness is used to create diverse trees. The final predictor is a deterministic function once the fitted forest and random seed are fixed.</div>
      `
    },
    {
      id: "boosting-additive-models",
      title: "15. Boosting builds an additive model one weak learner at a time",
      html: String.raw`
        <p>Bagging trains base learners mostly independently. Boosting is sequential. Each new learner is added to the current model.</p>
        <p>An additive model has the form</p>
        <p>\[
        F_M(x)=\sum_{m=1}^{M}\eta_m h_m(x).
        \]</p>
        <p>The functions \(h_m\) are base learners. In tree boosting, they are usually shallow regression trees. The coefficient or learning rate controls each learner's contribution.</p>

        <h3>Simple additive example</h3>
        <p>Suppose</p>
        <p>\[
        F_0(x)=0.
        \]</p>
        <p>The first tree gives \(h_1(x)=4\), and the learning rate is \(\eta=0.1\). Then</p>
        <p>\[
        F_1(x)=0+0.1(4)=0.4.
        \]</p>
        <p>If the second tree gives \(h_2(x)=-1\),</p>
        <p>\[
        F_2(x)=0.4+0.1(-1)=0.3.
        \]</p>

        <h3>AdaBoost intuition</h3>
        <p>In classification, AdaBoost increases attention to examples that previous weak classifiers handled poorly. A common final score is a weighted sum</p>
        <p>\[
        F(x)=\sum_m\alpha_m h_m(x).
        \]</p>
        <p>The sign of \(F(x)\) gives the class. Better weak learners receive larger weights under the standard derivation.</p>

        <h3>Bias and variance intuition</h3>
        <p>Boosting often reduces bias by adding learners that correct systematic errors of the current ensemble. Regularization is still essential because a very flexible boosted model can fit noise.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> The additive-model view is important because gradient boosting is not “many trees voting.” It is stage-wise function optimization: each new tree is selected to improve the current predictor.</div>
      `
    },
    {
      id: "gradient-boosting",
      title: "16. Gradient boosting fits new learners to the direction that reduces the loss",
      html: String.raw`
        <p>Gradient boosting treats the model \(F(x)\) as the object being optimized. At stage \(m\), it computes a negative loss gradient for each training example and fits a base learner to those values.</p>

        <h3>Squared-error regression becomes residual fitting</h3>
        <p>Use the loss</p>
        <p>\[
        \ell(y,F)=\frac12(y-F)^2.
        \]</p>
        <p>The derivative with respect to the current prediction is</p>
        <p>\[
        \frac{\partial\ell}{\partial F}=F-y.
        \]</p>
        <p>The negative gradient is</p>
        <p>\[
        y-F,
        \]</p>
        <p>which is exactly the residual.</p>

        <h3>Numerical stage</h3>
        <p>Suppose the current predictions for three training examples are</p>
        <p>\[
        F=(3,5,4)
        \]</p>
        <p>and the targets are</p>
        <p>\[
        y=(5,4,7).
        \]</p>
        <p>The residual targets for the next tree are</p>
        <p>\[
        r=y-F=(2,-1,3).
        \]</p>
        <p>If the new tree predicts</p>
        <p>\[
        h=(1.5,-0.5,2.0)
        \]</p>
        <p>and \(\eta=0.2\), the updated predictions are</p>
        <p>\[
        F_{\text{new}}=F+0.2h=(3.3,4.9,4.4).
        \]</p>

        <h3>General differentiable losses</h3>
        <p>For another loss, define pseudo-residuals</p>
        <p>\[
        r_{im}
        =-\left.
        \frac{\partial\ell(y_i,F(x_i))}{\partial F(x_i)}
        \right|_{F=F_{m-1}}.
        \]</p>
        <p>The next learner \(h_m\) is fitted to approximate these pseudo-residuals. Then</p>
        <p>\[
        F_m(x)=F_{m-1}(x)+\eta h_m(x).
        \]</p>

        <h3>Classification scores versus probabilities</h3>
        <p>For logistic boosting, the additive function can represent a logit or log-odds score. A sigmoid then converts the score to a probability. Therefore adding tree outputs is not the same as averaging probabilities.</p>

        <h3>Regularization controls</h3>
        <p>Important controls include tree depth, number of trees, learning rate, row subsampling, feature subsampling, minimum leaf size, and penalties on leaf weights. Modern libraries such as XGBoost, LightGBM, and CatBoost add further algorithmic details.</p>
        <div class="shape-check"><strong>Shape check.</strong> For scalar regression with \(n\) training examples, the current prediction vector, pseudo-residual vector, and one tree's fitted output are all typically in \(\mathbb R^n\).</div>
      `
    }
  );
})();
