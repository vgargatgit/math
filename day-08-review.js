(() => {
  const lesson = COURSE[2].lessons[0];

  lesson.sections.push(
    {
      id: "read-ml-equations",
      title: "19. Read common ML equations as probability statements",
      html: String.raw`
        <p>Probability notation becomes useful when you can translate a paper equation into a question about uncertainty.</p>

        <h3>Binary classification likelihood</h3>
        <p>Suppose \(Y\in\{0,1\}\) and a model predicts</p>
        <p>\[p_\theta(x)=P_\theta(Y=1\mid X=x).\]</p>
        <p>A Bernoulli likelihood for one label \(y\) is</p>
        <p>\[P_\theta(Y=y\mid x)=p_\theta(x)^y(1-p_\theta(x))^{1-y}.\]</p>
        <p>If \(y=1\), this reduces to \(p_\theta(x)\). If \(y=0\), it reduces to \(1-p_\theta(x)\).</p>
        <p>The negative log-likelihood is</p>
        <p>\[-\log P_\theta(Y=y\mid x)=-y\log p_\theta(x)-(1-y)\log(1-p_\theta(x)).\]</p>
        <p>This is binary cross-entropy. The loss is not an unrelated formula. It is the negative log of a Bernoulli probability model.</p>

        <h3>Multiclass classification</h3>
        <p>For \(K\) classes, a softmax model produces</p>
        <p>\[\pi_k(x)=P_\theta(Y=k\mid X=x),\qquad \sum_{k=1}^{K}\pi_k(x)=1.\]</p>
        <p>If the observed class is \(y\), the negative log-likelihood is</p>
        <p>\[L=-\log\pi_y(x).\]</p>
        <p>For example, if the correct-class probability is \(0.8\), then \(L=-\log0.8\approx0.223\). If it is \(0.1\), then \(L\approx2.303\). Low probability assigned to the observed class gives a larger loss.</p>

        <h3>Gaussian regression</h3>
        <p>A regression paper can assume</p>
        <p>\[Y\mid X=x\sim\mathcal{N}(f_\theta(x),\sigma^2).\]</p>
        <p>This says that the network output is the conditional mean and that the observed target has Gaussian noise around it.</p>
        <p>Ignoring terms that do not depend on \(\theta\), the negative log-likelihood contains</p>
        <p>\[\frac{(y-f_\theta(x))^2}{2\sigma^2}.\]</p>
        <p>Thus, squared-error regression can be derived from a Gaussian observation model.</p>

        <h3>Latent-variable marginalization</h3>
        <p>A model with latent variable \(Z\) can define</p>
        <p>\[p_\theta(x,z)=p_\theta(x\mid z)p(z).\]</p>
        <p>The probability of the observed \(x\) is</p>
        <p>\[p_\theta(x)=\int p_\theta(x\mid z)p(z)\,dz.\]</p>
        <p>The integral means: average the conditional data likelihood across possible latent values, weighted by their prior probability.</p>

        <h3>Expected loss</h3>
        <p>A learning objective can be written</p>
        <p>\[R(\theta)=\mathbb{E}_{(X,Y)\sim p_{\text{data}}}[L(f_\theta(X),Y)].\]</p>
        <p>Read this as: if examples were repeatedly drawn from the data-generating distribution, what loss would the model have on average?</p>
        <div class="paper-connection">
          <strong>Reading habit.</strong> When you see \(p(\cdot)\), ask which variable is random and which values are conditioned on. When you see \(\mathbb{E}\), ask which distribution supplies the averaging weights. When you see a sum or integral over a random variable, ask whether the model is marginalizing it out.
        </div>
      `
    },
    {
      id: "common-mistakes",
      title: "20. Common probability mistakes in AI and ML papers",
      html: String.raw`
        <ul>
          <li><strong>Confusing \(P(A\mid B)\) with \(P(B\mid A)\).</strong> Bayes’ theorem exists because these are different quantities.</li>
          <li><strong>Treating a density value as a point probability.</strong> For a continuous variable, \(P(X=x)=0\) even when \(f_X(x)\) is large.</li>
          <li><strong>Assuming mutually exclusive events are independent.</strong> Positive-probability mutually exclusive events are dependent.</li>
          <li><strong>Assuming zero covariance means independence.</strong> It only removes linear covariance unless stronger distribution assumptions apply.</li>
          <li><strong>Forgetting what an expectation averages over.</strong> \(\mathbb{E}_X\), \(\mathbb{E}_{X,Y}\), and \(\mathbb{E}_{Z\mid X}\) are different operations.</li>
          <li><strong>Confusing a random variable with a realization.</strong> \(X\) often denotes the uncertain object; \(x\) denotes one observed value.</li>
          <li><strong>Confusing variance with standard deviation.</strong> Variance has squared units. Standard deviation does not.</li>
          <li><strong>Forgetting covariance shape.</strong> For \(X\in\mathbb{R}^{d}\), \(\operatorname{Cov}(X)\) is \(d\times d\), not a scalar.</li>
          <li><strong>Using independence when only identical distribution is known.</strong> “i.i.d.” contains two claims: independent and identically distributed.</li>
          <li><strong>Assuming a probability model is a fact about the world.</strong> A distribution is a model assumption or approximation unless justified by the setting.</li>
          <li><strong>Reading \(\mathcal{N}(\mu,\sigma^2)\) as if the second parameter were always standard deviation.</strong> Mathematical texts usually use variance; APIs vary.</li>
          <li><strong>Ignoring conditioning in generative models.</strong> \(p(x\mid z)\), \(p(z\mid x)\), and \(p(x,z)\) have different meanings and often different parameterizations.</li>
        </ul>
        <div class="shape-check">
          <strong>Safe reading rule.</strong> For each probability expression, identify: the random variable, its possible values, the conditioning information, the distribution family if specified, and whether the expression is a mass, density, probability, expectation, or sample estimate.
        </div>
      `
    },
    {
      id: "recap",
      title: "21. Recap: probability is a language for uncertainty and averaging",
      html: String.raw`
        <p>You now have the probability vocabulary needed for many AI and ML papers.</p>
        <ul>
          <li>A sample space lists possible outcomes. An event is a set of outcomes.</li>
          <li>Conditional probability changes the reference population.</li>
          <li>Independence means the joint probability factorizes.</li>
          <li>Bayes’ theorem reverses a conditional by combining likelihood and prior.</li>
          <li>A random variable maps uncertain outcomes to numbers or vectors.</li>
          <li>A PMF describes discrete masses. A PDF describes continuous density. A CDF gives cumulative probability.</li>
          <li>Joint distributions describe variables together. Marginalization removes variables by summing or integrating them out.</li>
          <li>Expectation is a probability-weighted average. Variance measures squared spread.</li>
          <li>Covariance and covariance matrices describe how variables move together.</li>
          <li>Linear transformations change means and covariances by \(A\mu+b\) and \(A\Sigma A^\top\).</li>
          <li>Common distribution families encode common assumptions about labels, counts, noise, and waiting times.</li>
          <li>Monte Carlo uses sampled averages when exact expectations are difficult.</li>
        </ul>
        <p>When you meet probability in a paper, do not start by manipulating symbols. First ask: <strong>What is uncertain? What distribution describes it? What is observed? What is conditioned on? What is being averaged?</strong></p>
        <p>Those questions usually reveal the meaning of the equation.</p>
      `
    }
  );

  lesson.examples.push(
    ["Event union", String.raw`A model has \(P(A)=0.7\), \(P(B)=0.4\), and \(P(A\cap B)=0.2\). Then \(P(A\cup B)=0.7+0.4-0.2=0.9\).`],
    ["Conditional probability", String.raw`Among 200 examples, 50 are class \(C\), and 30 of those satisfy event \(E\). Then \(P(E\mid C)=30/50=0.6\).`],
    ["Independence check", String.raw`If \(P(A)=0.3\), \(P(B)=0.5\), and \(P(A\cap B)=0.15\), then \(A\) and \(B\) satisfy \(P(A\cap B)=P(A)P(B)\) and are independent.`],
    ["Bayes update", String.raw`If \(P(C)=0.2\), \(P(E\mid C)=0.9\), and \(P(E)=0.3\), then \(P(C\mid E)=0.9\cdot0.2/0.3=0.6\).`],
    ["Random-variable PMF", String.raw`If \(X\) counts heads in two fair tosses, then \(P(X=0)=1/4\), \(P(X=1)=1/2\), and \(P(X=2)=1/4\).`],
    ["Expectation", String.raw`For \(X\) with values \(0,1,2\) and probabilities \(0.2,0.5,0.3\), \(\mathbb{E}[X]=0(0.2)+1(0.5)+2(0.3)=1.1\).`],
    ["Variance", String.raw`For the same \(X\), \(\mathbb{E}[X^2]=0+0.5+1.2=1.7\). Thus \(\operatorname{Var}(X)=1.7-1.1^2=0.49\).`],
    ["Covariance matrix shape", String.raw`If \(X\in\mathbb{R}^{5}\), then \((X-\mu)(X-\mu)^\top\) and \(\Sigma\) both have shape \(5\times5\).`],
    ["Linear covariance transform", String.raw`If \(\Sigma_X=I_2\) and \(A=\operatorname{diag}(2,3)\), then \(\Sigma_Y=A\Sigma_XA^\top=\operatorname{diag}(4,9)\).`],
    ["Bernoulli likelihood", String.raw`For \(p=0.7\), a positive label has likelihood \(0.7\) and a negative label has likelihood \(0.3\).`],
    ["Binomial count", String.raw`For \(K\sim\operatorname{Binomial}(3,0.5)\), \(P(K=2)=\binom32(0.5)^3=3/8\).`],
    ["Uniform probability", String.raw`If \(X\sim\operatorname{Uniform}(0,10)\), then \(P(2\le X\le5)=(5-2)/10=0.3\).`],
    ["Poisson zero count", String.raw`For \(K\sim\operatorname{Poisson}(1.5)\), \(P(K=0)=e^{-1.5}\approx0.223\).`],
    ["Monte Carlo estimate", String.raw`If sampled losses are \(2,1,3,2\), the Monte Carlo estimate of expected loss is \((2+1+3+2)/4=2\).`]
  );

  lesson.practice.push(
    String.raw`A fair die is rolled. Let \(A=\{2,4,6\}\) and \(B=\{4,5,6\}\). Find \(P(A\cap B)\). <details><summary>Show answer</summary><p>\(A\cap B=\{4,6\}\), so \(P(A\cap B)=2/6=1/3\).</p></details>`,
    String.raw`If \(P(A)=0.4\), \(P(B)=0.5\), and \(P(A\cap B)=0.2\), are \(A\) and \(B\) independent? <details><summary>Show answer</summary><p>Yes. \(P(A)P(B)=0.4\cdot0.5=0.2=P(A\cap B)\).</p></details>`,
    String.raw`If \(P(A\cap B)=0.12\) and \(P(B)=0.3\), find \(P(A\mid B)\). <details><summary>Show answer</summary><p>\(P(A\mid B)=0.12/0.3=0.4\).</p></details>`,
    String.raw`A class prior is \(P(C)=0.1\). Evidence has \(P(E\mid C)=0.8\) and \(P(E)=0.2\). Find \(P(C\mid E)\). <details><summary>Show answer</summary><p>By Bayes’ theorem, \(P(C\mid E)=0.8\cdot0.1/0.2=0.4\).</p></details>`,
    String.raw`Explain why a continuous density value \(f_X(2)=1.4\) is not invalid. <details><summary>Show answer</summary><p>A density is not a point probability. Its total integral must equal one. A density can exceed one over a sufficiently narrow region.</p></details>`,
    String.raw`For \(P(X=0)=0.25\) and \(P(X=2)=0.75\), compute \(\mathbb{E}[X]\). <details><summary>Show answer</summary><p>\(\mathbb{E}[X]=0(0.25)+2(0.75)=1.5\).</p></details>`,
    String.raw`If \(\mathbb{E}[X]=3\) and \(\mathbb{E}[X^2]=13\), find \(\operatorname{Var}(X)\). <details><summary>Show answer</summary><p>\(\operatorname{Var}(X)=13-3^2=4\).</p></details>`,
    String.raw`If \(X\in\mathbb{R}^{4}\), what is the shape of its covariance matrix? <details><summary>Show answer</summary><p>\(4\times4\).</p></details>`,
    String.raw`If \(Y=2X+7\) and \(\operatorname{Var}(X)=5\), find \(\operatorname{Var}(Y)\). <details><summary>Show answer</summary><p>\(\operatorname{Var}(Y)=2^2\cdot5=20\). The added constant does not change variance.</p></details>`,
    String.raw`For \(X\sim\operatorname{Bernoulli}(0.3)\), find the mean and variance. <details><summary>Show answer</summary><p>Mean \(=0.3\). Variance \(=0.3(0.7)=0.21\).</p></details>`,
    String.raw`For \(K\sim\operatorname{Binomial}(10,0.2)\), what are \(\mathbb{E}[K]\) and \(\operatorname{Var}(K)\)? <details><summary>Show answer</summary><p>\(\mathbb{E}[K]=np=2\). \(\operatorname{Var}(K)=np(1-p)=1.6\).</p></details>`,
    String.raw`If \(X\sim\operatorname{Uniform}(2,6)\), find \(P(3\le X\le5)\). <details><summary>Show answer</summary><p>The interval length is \(2\) inside a total length of \(4\), so the probability is \(1/2\).</p></details>`,
    String.raw`A Monte Carlo estimate uses losses \(1.2,0.8,1.0,1.4,0.6\). Find the estimated expected loss. <details><summary>Show answer</summary><p>The average is \((1.2+0.8+1.0+1.4+0.6)/5=1.0\).</p></details>`,
    String.raw`Read this equation in words: \(p_\theta(x)=\int p_\theta(x\mid z)p(z)\,dz\). <details><summary>Show answer</summary><p>Average the conditional probability density of \(x\) over all latent values \(z\), weighted by the prior density of \(z\). This marginalizes out the latent variable.</p></details>`
  );
})();
