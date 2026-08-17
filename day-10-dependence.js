day10.sections.push(
  {
    id: "mutual-information",
    title: "7. Mutual information measures how much two variables tell us about each other",
    html: String.raw`
      <p><strong>Mutual information</strong> compares the joint distribution \(p(x,y)\) with the distribution we would have if \(X\) and \(Y\) were independent, \(p(x)p(y)\):</p>
      <p>\[I(X;Y)=\sum_x\sum_y p(x,y)\log\frac{p(x,y)}{p(x)p(y)}.\]</p>
      <p>This is a KL divergence:</p>
      <p>\[I(X;Y)=D_{\mathrm{KL}}\bigl(p(x,y)\|p(x)p(y)\bigr).\]</p>
      <p>It is also equal to</p>
      <p>\[I(X;Y)=H(Y)-H(Y\mid X)=H(X)-H(X\mid Y).\]</p>
      <p>This form gives the cleanest intuition: mutual information is the reduction in uncertainty about one variable after observing the other.</p>
      <h3>Perfect-copy example</h3>
      <p>Let \(X\) be a fair bit and let \(Y=X\). Then</p>
      <p>\[H(Y)=1\text{ bit},\qquad H(Y\mid X)=0.\]</p>
      <p>Therefore,</p>
      <p>\[I(X;Y)=1\text{ bit}.\]</p>
      <h3>Independent example</h3>
      <p>If \(X\) and \(Y\) are independent, then \(H(Y\mid X)=H(Y)\), so</p>
      <p>\[I(X;Y)=0.\]</p>
      <div class="paper-connection">
        <strong>ML connection.</strong> Papers use mutual information to discuss whether a representation \(Z\) preserves information about an input \(X\), a label \(Y\), or a nuisance variable. The quantity is scalar even when \(X\), \(Y\), or \(Z\) are high-dimensional random vectors.
      </div>
      <div class="shape-check">
        <strong>Common mistake.</strong> Mutual information detects dependence, not only linear correlation. Two variables can have zero correlation and still have positive mutual information.
      </div>
    `
  },
  {
    id: "conditional-mutual-information",
    title: "8. Conditional mutual information measures dependence that remains after context is known",
    html: String.raw`
      <p>The <strong>conditional mutual information</strong> between \(X\) and \(Y\) given \(Z\) is</p>
      <p>\[I(X;Y\mid Z)=H(X\mid Z)-H(X\mid Y,Z).\]</p>
      <p>It asks: after we already know \(Z\), how much additional uncertainty about \(X\) is removed by learning \(Y\)?</p>
      <h3>Simple example</h3>
      <p>Let \(Z\) be a fair bit. Define \(X=Z\) and \(Y=Z\). Before conditioning, \(X\) and \(Y\) are perfectly dependent, so</p>
      <p>\[I(X;Y)=1\text{ bit}.\]</p>
      <p>But once \(Z\) is known, both \(X\) and \(Y\) are already determined. Learning \(Y\) adds no new information about \(X\):</p>
      <p>\[I(X;Y\mid Z)=0.\]</p>
      <div class="paper-connection">
        <strong>Why this matters in papers.</strong> Conditional mutual information helps separate direct informational relationships from relationships explained by context. It appears in causal reasoning, representation learning, conditional independence tests, and analysis of multimodal systems.
      </div>
      <div class="shape-check">
        <strong>Notation warning.</strong> \(I(X;Y\mid Z)\) is not the same as \(I(X;Y,Z)\). The vertical bar means conditioning. The comma groups variables together.
      </div>
    `
  },
  {
    id: "entropy-chain-rule",
    title: "9. The entropy chain rule decomposes uncertainty one variable at a time",
    html: String.raw`
      <p>The entropy chain rule states</p>
      <p>\[H(X,Y)=H(X)+H(Y\mid X).\]</p>
      <p>Read it from left to right: uncertainty about the pair equals uncertainty about the first variable plus the remaining uncertainty about the second variable after the first is known.</p>
      <h3>Numerical example</h3>
      <p>Let \(X\) be a fair bit, so \(H(X)=1\) bit. Suppose \(Y=X\) with probability 1. Then \(H(Y\mid X)=0\). Therefore,</p>
      <p>\[H(X,Y)=1+0=1\text{ bit}.\]</p>
      <p>If instead \(Y\) is an independent fair bit, then \(H(Y\mid X)=1\), so</p>
      <p>\[H(X,Y)=1+1=2\text{ bits}.\]</p>
      <h3>Sequence form</h3>
      <p>For a sequence \(X_1,\ldots,X_T\),</p>
      <p>\[H(X_1,\ldots,X_T)=\sum_{t=1}^{T}H(X_t\mid X_1,\ldots,X_{t-1}).\]</p>
      <div class="paper-connection">
        <strong>Language-model connection.</strong> Autoregressive models factor a sequence probability as
        \[p(x_1,\ldots,x_T)=\prod_{t=1}^{T}p(x_t\mid x_{&lt;t}).\]
        Taking negative logs turns the product into a sum of token-level surprises. This is the probabilistic counterpart of the entropy chain rule.
      </div>
    `
  },
  {
    id: "coding-interpretation",
    title: "10. The coding interpretation turns probability into expected message length",
    html: String.raw`
      <p>Information theory was developed partly to answer a practical question: how many symbols are needed to encode outcomes from a source?</p>
      <p>For an ideal code, an outcome with probability \(p(x)\) receives a code length near</p>
      <p>\[\ell(x)\approx-\log_2 p(x).\]</p>
      <p>Common outcomes get short codes. Rare outcomes get long codes.</p>
      <p>The expected ideal code length is therefore related to entropy:</p>
      <p>\[\mathbb{E}[\ell(X)]\approx H(X).\]</p>
      <h3>Example</h3>
      <p>Suppose four outcomes have probabilities</p>
      <p>\[p=(1/2,1/4,1/8,1/8).\]</p>
      <p>The ideal bit lengths are</p>
      <p>\[1,2,3,3.\]</p>
      <p>The expected length is</p>
      <p>\[\frac12(1)+\frac14(2)+\frac18(3)+\frac18(3)=1.75\text{ bits}.\]</p>
      <p>The entropy is also 1.75 bits.</p>
      <div class="paper-connection">
        <strong>ML connection.</strong> Negative log-likelihood can be read as coding cost. A better probabilistic model compresses observed data better because it gives short codes to outcomes that actually occur. This view connects language modeling, density estimation, minimum description length, and compression-based evaluation.
      </div>
      <div class="shape-check">
        <strong>Common mistake.</strong> Entropy is an average code-length limit under assumptions. It is not necessarily the exact integer number of bits used for each individual event by a practical code.
      </div>
    `
  },
  {
    id: "maximum-entropy",
    title: "11. Maximum entropy selects the least-committal distribution under stated constraints",
    html: String.raw`
      <p>The <strong>maximum entropy principle</strong> says: among distributions that satisfy the information you know, choose the one with the largest entropy if you do not have a reason to add extra structure.</p>
      <h3>Finite support example</h3>
      <p>Suppose a variable can take one of four values and you know nothing else. The maximum-entropy distribution is uniform:</p>
      <p>\[p=(1/4,1/4,1/4,1/4).\]</p>
      <p>Its entropy is</p>
      <p>\[H=-4\left(\frac14\log_2\frac14\right)=2\text{ bits}.\]</p>
      <p>Compare this with</p>
      <p>\[q=(0.7,0.1,0.1,0.1),\]</p>
      <p>which has lower entropy because it makes a stronger claim about which outcome is likely.</p>
      <h3>Continuous connection</h3>
      <p>Among continuous distributions with fixed mean and variance, the Gaussian has maximum differential entropy. This is one reason Gaussian assumptions appear as a neutral model when only first and second moments are specified.</p>
      <div class="paper-connection">
        <strong>Why this matters for ML papers.</strong> Maximum-entropy ideas appear in probabilistic modeling, exponential families, reinforcement learning with entropy bonuses, and regularizers that discourage overly concentrated policies or predictions.
      </div>
      <div class="shape-check">
        <strong>Important condition.</strong> “Maximum entropy” is meaningless without the allowed support and constraints. Change the constraints and the maximizing distribution can change.
      </div>
    `
  },
  {
    id: "perplexity",
    title: "12. Perplexity converts average log-loss into an effective number of choices",
    html: String.raw`
      <p>For a model with average token negative log-likelihood \(H\) measured in nats, <strong>perplexity</strong> is</p>
      <p>\[\operatorname{PPL}=e^H.\]</p>
      <p>If the loss is measured in bits, use</p>
      <p>\[\operatorname{PPL}=2^H.\]</p>
      <h3>Example 1</h3>
      <p>If the average token loss is \(H=\log 10\), then</p>
      <p>\[\operatorname{PPL}=e^{\log10}=10.\]</p>
      <p>One intuition is that the model behaves, on average, as if it were choosing among about 10 equally plausible alternatives.</p>
      <h3>Example 2</h3>
      <p>If average loss falls from \(\log20\) to \(\log10\), perplexity falls from 20 to 10. This is a multiplicative improvement in the probability assigned to observed tokens.</p>
      <div class="paper-connection">
        <strong>Language-model connection.</strong> For tokens \(x_1,\ldots,x_T\), a common empirical cross-entropy is
        \[\hat H=-\frac1T\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{&lt;t}),\]
        and perplexity is \(e^{\hat H}\).
      </div>
      <div class="shape-check">
        <strong>Comparison warning.</strong> Perplexity values are only directly comparable when tokenization, evaluation data, normalization, and log conventions are compatible. A model with a different tokenizer can have a different number of prediction steps.
      </div>
    `
  },
  {
    id: "cross-entropy-nll",
    title: "13. Cross-entropy becomes negative log-likelihood on observed training data",
    html: String.raw`
      <p>Suppose a classifier models</p>
      <p>\[q_\theta(y\mid x).\]</p>
      <p>For one observed training pair \((x_i,y_i)\), the negative log-likelihood is</p>
      <p>\[\ell_i(\theta)=-\log q_\theta(y_i\mid x_i).\]</p>
      <p>For \(N\) examples,</p>
      <p>\[\mathcal L(\theta)=-\frac1N\sum_{i=1}^{N}\log q_\theta(y_i\mid x_i).\]</p>
      <p>This empirical average estimates a cross-entropy between the data-generating conditional distribution and the model distribution.</p>
      <h3>Three-class example</h3>
      <p>Suppose the correct class is class 2 and the model predicts</p>
      <p>\[q=(0.1,0.7,0.2).\]</p>
      <p>The one-hot target is</p>
      <p>\[y=(0,1,0).\]</p>
      <p>Cross-entropy is</p>
      <p>\[-\sum_{c=1}^{3}y_c\log q_c=-\log0.7\approx0.357.\]</p>
      <p>If the model gives the correct class probability \(0.1\), the loss becomes</p>
      <p>\[-\log0.1\approx2.303.\]</p>
      <div class="paper-connection">
        <strong>Paper connection.</strong> “Minimize cross-entropy” and “maximize categorical likelihood” often describe the same training objective from two viewpoints. The first uses information theory. The second uses statistical estimation.
      </div>
      <div class="shape-check">
        <strong>Implementation warning.</strong> Stable libraries usually combine softmax and log operations. Computing probabilities first and then taking \(\log\) can lose numerical precision for very small probabilities.
      </div>
    `
  }
);
