const day8 = COURSE[2].lessons[0];

Object.assign(day8, {
  published: true,
  summary: "Build the probability language used throughout machine learning. Learn events, conditional probability, random variables, distributions, expectation, variance, covariance, common probability models, sampling, and Monte Carlo reasoning.",
  explanation: "Probability is the mathematics of uncertainty. In machine learning, uncertainty can come from noisy data, incomplete observations, unknown labels, random sampling, model assumptions, or stochastic algorithms. The central habit is to separate the uncertain outcome from the numerical random variable that represents it. Then ask which distribution describes that variable and which quantity you need: a probability, an expectation, a variance, or a conditional probability.",
  topics: [
    "Sample spaces and events",
    "Probability axioms",
    "Conditional probability",
    "Independence",
    "Total probability",
    "Bayes’ theorem",
    "Random variables",
    "Discrete and continuous variables",
    "PMF, PDF, and CDF",
    "Joint, marginal, and conditional distributions",
    "Expectation",
    "Variance and standard deviation",
    "Covariance and correlation",
    "Random vectors",
    "Covariance matrices",
    "Linear transformations",
    "Total expectation and variance",
    "Bernoulli, categorical, binomial, multinomial, uniform, Gaussian, exponential, and Poisson distributions",
    "Sampling",
    "Monte Carlo approximation"
  ],
  sections: [
    {
      id: "outcomes-events",
      title: "1. Start with outcomes, sample spaces, and events",
      html: String.raw`
        <p>Probability starts with an experiment whose result is not known in advance. The result can be physical, such as a coin toss, or abstract, such as the label of a new image.</p>
        <div class="definition">
          <strong>Sample space.</strong> The sample space, usually written \(\Omega\), is the set of all outcomes that the model allows.
        </div>
        <p>For one coin toss,</p>
        <p>\[\Omega=\{H,T\}.\]</p>
        <p>For one six-sided die,</p>
        <p>\[\Omega=\{1,2,3,4,5,6\}.\]</p>
        <p>An <strong>event</strong> is a set of outcomes. For a die, the event “even result” is</p>
        <p>\[A=\{2,4,6\}.\]</p>
        <p>The event “result at least 5” is</p>
        <p>\[B=\{5,6\}.\]</p>
        <p>The intersection \(A\cap B\) means that both events occur. Here,</p>
        <p>\[A\cap B=\{6\}.\]</p>
        <p>The union \(A\cup B\) means that at least one event occurs:</p>
        <p>\[A\cup B=\{2,4,5,6\}.\]</p>
        <p>The complement \(A^c\) means that \(A\) does not occur. For the even event,</p>
        <p>\[A^c=\{1,3,5\}.\]</p>
        <div class="paper-connection">
          <strong>Why this matters for ML papers.</strong> Papers often write events such as \(\{Y=k\}\), \(\{L>\epsilon\}\), or \(\{\|X\|>t\}\). The braces mean “the event that this condition is true.” This is different from the random variable itself.
        </div>
        <div class="mini-example">
          <strong>Classifier example.</strong> If \(Y\in\{1,2,3\}\) is the unknown class of an image, then \(\{Y=2\}\) is an event. A model can assign it a probability such as \(P(Y=2\mid x)=0.7\).
        </div>
      `
    },
    {
      id: "probability-axioms",
      title: "2. Probability assigns numbers to events under three basic rules",
      html: String.raw`
        <p>A probability function assigns a number \(P(A)\) to each event \(A\). The number measures how plausible the event is under the model.</p>
        <p>The standard axioms are:</p>
        <ol>
          <li>\(P(A)\ge0\) for every event \(A\).</li>
          <li>\(P(\Omega)=1\).</li>
          <li>If \(A\) and \(B\) cannot occur together, then \(P(A\cup B)=P(A)+P(B)\).</li>
        </ol>
        <p>These rules imply many useful formulas. The complement rule is</p>
        <p>\[P(A^c)=1-P(A).\]</p>
        <p>The general addition rule is</p>
        <p>\[P(A\cup B)=P(A)+P(B)-P(A\cap B).\]</p>
        <h3>Numerical example</h3>
        <p>Suppose a model says</p>
        <p>\[P(A)=0.6,\qquad P(B)=0.5,\qquad P(A\cap B)=0.3.\]</p>
        <p>Then</p>
        <p>\[P(A\cup B)=0.6+0.5-0.3=0.8.\]</p>
        <p>We subtract the intersection because it was counted once inside \(P(A)\) and once inside \(P(B)\).</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not add probabilities blindly. \(P(A)+P(B)\) is correct for a union only when the events are disjoint. Otherwise subtract the overlap.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> Probability bounds in learning theory often use complements and unions. For example, a paper can bound the probability that at least one of several bad events occurs. The union bound uses \(P(\cup_i A_i)\le\sum_iP(A_i)\).
        </div>
      `
    },
    {
      id: "conditional-probability",
      title: "3. Conditional probability updates the reference population",
      html: String.raw`
        <p>Conditional probability asks for the probability of one event when we already know another event occurred.</p>
        <div class="definition">
          <strong>Conditional probability.</strong> If \(P(B)>0\), then
          \[P(A\mid B)=\frac{P(A\cap B)}{P(B)}.\]
        </div>
        <p>The denominator changes the reference population. We no longer consider all outcomes. We consider only outcomes inside \(B\).</p>
        <h3>Small table example</h3>
        <p>Suppose 100 messages contain 40 spam messages and 60 non-spam messages. Among the spam messages, 30 contain a suspicious link. Among the non-spam messages, 12 contain such a link.</p>
        <p>Let \(S\) mean spam and \(L\) mean suspicious link. Then</p>
        <p>\[P(S)=\frac{40}{100}=0.4,\qquad P(S\cap L)=\frac{30}{100}=0.3.\]</p>
        <p>Therefore,</p>
        <p>\[P(L\mid S)=\frac{0.3}{0.4}=0.75.\]</p>
        <p>Three quarters of the spam messages contain a suspicious link.</p>
        <p>In the other direction, 42 messages contain a suspicious link, so</p>
        <p>\[P(S\mid L)=\frac{30}{42}\approx0.714.\]</p>
        <p>These two conditional probabilities are not equal.</p>
        <div class="shape-check">
          <strong>Notation warning.</strong> \(P(A\mid B)\) and \(P(B\mid A)\) answer different questions. Reversing the condition is one of the most common probability errors.
        </div>
        <div class="paper-connection">
          <strong>Classification connection.</strong> A discriminative classifier often models \(P(Y=k\mid X=x)\): the probability of a class after observing features. A generative model can instead specify \(P(X=x\mid Y=k)\) and combine it with class priors.
        </div>
      `
    },
    {
      id: "independence",
      title: "4. Independence means that learning one event does not change the probability of the other",
      html: String.raw`
        <p>Two events \(A\) and \(B\) are independent when</p>
        <p>\[P(A\cap B)=P(A)P(B).\]</p>
        <p>If \(P(B)>0\), this is equivalent to</p>
        <p>\[P(A\mid B)=P(A).\]</p>
        <p>Knowing \(B\) occurred does not change the probability of \(A\).</p>
        <h3>Example: two coin tosses</h3>
        <p>Let \(A\) be “first toss is heads” and \(B\) be “second toss is heads.” For independent fair tosses,</p>
        <p>\[P(A)=\frac12,\qquad P(B)=\frac12,\qquad P(A\cap B)=\frac14.\]</p>
        <p>Since \(\frac14=\frac12\cdot\frac12\), the events are independent.</p>
        <h3>Independent is not the same as mutually exclusive</h3>
        <p>Mutually exclusive events cannot happen together, so \(P(A\cap B)=0\). If both events have positive probability, they cannot also be independent because \(P(A)P(B)>0\).</p>
        <div class="mini-example">
          On one die toss, “result is even” and “result is odd” are mutually exclusive. They are not independent. If you learn that the result is even, the probability of “odd” becomes zero.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> Naive Bayes assumes features are conditionally independent given the class. The assumption is usually not literally true, but it makes the joint likelihood factorize into simple terms.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Zero correlation does not generally imply independence. Independence is a stronger statement about the full joint distribution.
        </div>
      `
    },
    {
      id: "total-probability-bayes",
      title: "5. Total probability and Bayes’ theorem connect forward and reverse conditionals",
      html: String.raw`
        <p>Suppose events \(B_1,\ldots,B_m\) form a partition: exactly one of them occurs. Then</p>
        <p>\[P(A)=\sum_{j=1}^{m}P(A\mid B_j)P(B_j).\]</p>
        <p>This is the <strong>law of total probability</strong>. It computes an overall probability by averaging across cases.</p>
        <h3>Medical-test style example</h3>
        <p>Suppose \(1\%\) of a population has a condition:</p>
        <p>\[P(D)=0.01.\]</p>
        <p>A test is positive for \(95\%\) of affected people and \(5\%\) of unaffected people:</p>
        <p>\[P(+\mid D)=0.95,\qquad P(+\mid D^c)=0.05.\]</p>
        <p>The total positive rate is</p>
        <p>\[P(+)=0.95(0.01)+0.05(0.99)=0.059.\]</p>
        <p>Bayes’ theorem reverses the condition:</p>
        <p>\[P(D\mid +)=\frac{P(+\mid D)P(D)}{P(+)}.\]</p>
        <p>Thus,</p>
        <p>\[P(D\mid +)=\frac{0.95\cdot0.01}{0.059}\approx0.161.\]</p>
        <p>A positive test does not mean a \(95\%\) chance of the condition. The low prior probability matters.</p>
        <div class="definition">
          <strong>Bayes’ theorem.</strong>
          \[P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A)}.\]
          The term \(P(B)\) is the prior. The term \(P(A\mid B)\) is the likelihood of the evidence under \(B\). The result \(P(B\mid A)\) is the posterior.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> Bayesian inference updates parameter or hypothesis uncertainty after data arrive: \(p(\theta\mid D)\propto p(D\mid\theta)p(\theta)\). The proportionality sign hides the evidence term \(p(D)\), which does not depend on \(\theta\).
        </div>
      `
    },
    {
      id: "random-variables",
      title: "6. A random variable maps outcomes to numbers",
      html: String.raw`
        <p>An outcome can be complicated. A random variable extracts a numerical quantity from it.</p>
        <div class="definition">
          <strong>Random variable.</strong> A random variable is a function from the sample space to a numerical space:
          \[X:\Omega\to\mathbb{R}.\]
        </div>
        <p>For two coin tosses, the sample space is</p>
        <p>\[\Omega=\{HH,HT,TH,TT\}.\]</p>
        <p>Define \(X\) as the number of heads. Then</p>
        <p>\[X(HH)=2,\quad X(HT)=1,\quad X(TH)=1,\quad X(TT)=0.\]</p>
        <p>The random variable is not “random” after the outcome is known. The uncertainty comes from not knowing which outcome will occur.</p>
        <h3>Discrete and continuous random variables</h3>
        <p>A <strong>discrete</strong> random variable takes values in a countable set. Examples include class labels, token counts, and numbers of failures.</p>
        <p>A <strong>continuous</strong> random variable can take values over an interval or region. Examples include measurement noise, time, temperature, and many latent-variable models.</p>
        <div class="paper-connection">
          <strong>ML notation.</strong> Uppercase letters such as \(X\), \(Y\), and \(Z\) often denote random variables. Lowercase letters such as \(x\), \(y\), and \(z\) often denote realized values. This convention is common but not universal.
        </div>
        <div class="shape-check">
          <strong>Random vectors.</strong> A paper can use \(X\in\mathbb{R}^{d}\) for a random vector. Each realization \(x\) is a \(d\)-entry vector. The randomness is in which vector value appears.
        </div>
      `
    },
    {
      id: "pmf-pdf-cdf",
      title: "7. PMFs, PDFs, and CDFs describe distributions in different ways",
      html: String.raw`
        <h3>Probability mass function</h3>
        <p>For a discrete random variable, the probability mass function is</p>
        <p>\[p_X(x)=P(X=x).\]</p>
        <p>For a fair die, \(p_X(x)=1/6\) for \(x\in\{1,2,3,4,5,6\}\).</p>
        <p>The masses sum to one:</p>
        <p>\[\sum_x p_X(x)=1.\]</p>
        <h3>Probability density function</h3>
        <p>For a continuous random variable, a density \(f_X(x)\) does not usually equal \(P(X=x)\). In fact, for a continuous distribution,</p>
        <p>\[P(X=x)=0\]</p>
        <p>for any exact single value. Probabilities come from areas:</p>
        <p>\[P(a\le X\le b)=\int_a^b f_X(x)\,dx.\]</p>
        <p>A density can be larger than \(1\). What must equal \(1\) is its total area:</p>
        <p>\[\int_{-\infty}^{\infty}f_X(x)\,dx=1.\]</p>
        <h3>Cumulative distribution function</h3>
        <p>The CDF works for both discrete and continuous variables:</p>
        <p>\[F_X(x)=P(X\le x).\]</p>
        <p>For a uniform random variable on \([0,2]\), the density is \(1/2\). Therefore, for \(0\le x\le2\),</p>
        <p>\[F_X(x)=\frac{x}{2}.\]</p>
        <p>For example, \(P(X\le1.5)=0.75\).</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not compare a PDF value directly with a probability unless an interval width is involved. A PDF has units of “probability per unit of \(x\).”
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> Likelihoods for continuous data often evaluate a density at the observed data, such as a Gaussian density \(p(x\mid\mu,\sigma^2)\). That density value can exceed one without violating probability rules.
        </div>
      `
    }
  ],
  examples: [],
  practice: []
});
