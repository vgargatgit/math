(() => {
  const lesson = COURSE[2].lessons[0];

  lesson.sections.push(
    {
      id: "total-expectation-variance",
      title: "14. Total expectation and total variance separate within-group and between-group effects",
      html: String.raw`
        <p>Conditional distributions can be used to reconstruct global moments.</p>
        <div class="definition">
          <strong>Law of total expectation.</strong>
          \[\mathbb{E}[X]=\mathbb{E}_Y[\mathbb{E}[X\mid Y]].\]
        </div>
        <p>Read this from the inside out. First find the average of \(X\) inside each value or group of \(Y\). Then average those conditional means using the distribution of \(Y\).</p>
        <h3>Example</h3>
        <p>Suppose half of customers are in group \(Y=0\) and half are in group \(Y=1\). Their mean purchase amounts are</p>
        <p>\[\mathbb{E}[X\mid Y=0]=20,\qquad \mathbb{E}[X\mid Y=1]=40.\]</p>
        <p>Then</p>
        <p>\[\mathbb{E}[X]=0.5(20)+0.5(40)=30.\]</p>
        <p>The law of total variance is</p>
        <p>\[\operatorname{Var}(X)=\mathbb{E}[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(\mathbb{E}[X\mid Y]).\]</p>
        <p>The first term measures average variation <em>inside</em> groups. The second term measures variation <em>between</em> group means.</p>
        <h3>Numerical variance example</h3>
        <p>Keep the two group means \(20\) and \(40\), each with probability \(1/2\). Suppose each group has conditional variance \(9\). Then</p>
        <p>\[\mathbb{E}[\operatorname{Var}(X\mid Y)]=9.\]</p>
        <p>The conditional mean is either \(20\) or \(40\), with overall mean \(30\), so</p>
        <p>\[\operatorname{Var}(\mathbb{E}[X\mid Y])=\frac12(20-30)^2+\frac12(40-30)^2=100.\]</p>
        <p>Therefore,</p>
        <p>\[\operatorname{Var}(X)=9+100=109.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> This decomposition appears in hierarchical models, mixture models, uncertainty decomposition, and bias-variance style reasoning. It helps separate variation caused by uncertainty inside a component from variation caused by different components having different means.
        </div>
      `
    },
    {
      id: "discrete-distributions",
      title: "15. Bernoulli, categorical, binomial, and multinomial distributions model discrete outcomes",
      html: String.raw`
        <h3>Bernoulli distribution</h3>
        <p>A Bernoulli variable models one binary outcome:</p>
        <p>\[X\sim\operatorname{Bernoulli}(p),\qquad X\in\{0,1\}.\]</p>
        <p>Its PMF is</p>
        <p>\[P(X=x)=p^x(1-p)^{1-x},\qquad x\in\{0,1\}.\]</p>
        <p>Its mean and variance are</p>
        <p>\[\mathbb{E}[X]=p,\qquad \operatorname{Var}(X)=p(1-p).\]</p>
        <p>If \(p=0.8\), then \(P(X=1)=0.8\), \(P(X=0)=0.2\), and the variance is \(0.16\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Binary classification, dropout masks, and binary latent variables often use Bernoulli distributions.
        </div>

        <h3>Categorical distribution</h3>
        <p>A categorical variable chooses one of \(K\) classes. If</p>
        <p>\[\pi=(0.1,0.6,0.3),\]</p>
        <p>then a categorical label \(Y\) has</p>
        <p>\[P(Y=1)=0.1,\quad P(Y=2)=0.6,\quad P(Y=3)=0.3.\]</p>
        <p>A softmax layer produces a valid categorical probability vector because its entries are positive and sum to one.</p>

        <h3>Binomial distribution</h3>
        <p>A binomial variable counts successes in \(n\) independent Bernoulli trials with the same success probability \(p\):</p>
        <p>\[K\sim\operatorname{Binomial}(n,p).\]</p>
        <p>Its PMF is</p>
        <p>\[P(K=k)=\binom{n}{k}p^k(1-p)^{n-k}.\]</p>
        <p>For \(n=4\), \(p=0.5\), and \(k=2\),</p>
        <p>\[P(K=2)=\binom42(0.5)^4=\frac{6}{16}=0.375.\]</p>
        <p>Its mean is \(np\) and variance is \(np(1-p)\).</p>

        <h3>Multinomial distribution</h3>
        <p>The multinomial distribution counts outcomes across \(K\) categories after \(n\) independent categorical trials.</p>
        <p>For three classes, a count vector might be</p>
        <p>\[C=(4,3,3),\qquad \sum_{k=1}^{3}C_k=10.\]</p>
        <p>It generalizes the binomial distribution from two categories to many.</p>
        <div class="shape-check">
          <strong>Common notation trap.</strong> A categorical random variable is one class label. A multinomial random variable is usually a vector of class counts from several trials. Papers sometimes use “multinomial” loosely when they mean categorical; check the definition.
        </div>
      `
    },
    {
      id: "continuous-distributions",
      title: "16. Uniform and Gaussian distributions are basic continuous models",
      html: String.raw`
        <h3>Uniform distribution</h3>
        <p>If</p>
        <p>\[X\sim\operatorname{Uniform}(a,b),\]</p>
        <p>then every equal-width interval inside \([a,b]\) has the same probability. The density is</p>
        <p>\[f(x)=\frac{1}{b-a},\qquad a\le x\le b.\]</p>
        <p>For \(X\sim\operatorname{Uniform}(0,4)\),</p>
        <p>\[P(1\le X\le2)=\frac{2-1}{4-0}=\frac14.\]</p>
        <p>The mean and variance are</p>
        <p>\[\mathbb{E}[X]=\frac{a+b}{2},\qquad \operatorname{Var}(X)=\frac{(b-a)^2}{12}.\]</p>

        <h3>Gaussian distribution</h3>
        <p>A one-dimensional Gaussian is written</p>
        <p>\[X\sim\mathcal{N}(\mu,\sigma^2).\]</p>
        <p>Its density is</p>
        <p>\[f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).\]</p>
        <p>The parameter \(\mu\) is the mean. The parameter \(\sigma^2\) is the variance.</p>
        <p>For the standard normal, \(\mu=0\) and \(\sigma=1\). Values near zero have high density. Large absolute values have lower density.</p>
        <h3>Multivariate Gaussian</h3>
        <p>A random vector can follow</p>
        <p>\[X\sim\mathcal{N}(\mu,\Sigma),\qquad X\in\mathbb{R}^{d}.\]</p>
        <p>Here, \(\mu\in\mathbb{R}^{d}\) and \(\Sigma\in\mathbb{R}^{d\times d}\). The covariance matrix controls scale and orientation.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Gaussian distributions appear in regression noise models, variational autoencoders, diffusion models, Gaussian processes, Kalman filters, initialization analyses, and central-limit approximations.
        </div>
        <div class="shape-check">
          <strong>Notation warning.</strong> In \(\mathcal{N}(\mu,\sigma^2)\), the second parameter is usually variance. In \(\mathcal{N}(\mu,\Sigma)\), it is a covariance matrix. Some software APIs ask for standard deviation instead. Always check the convention.
        </div>
      `
    },
    {
      id: "count-waiting-distributions",
      title: "17. Poisson and exponential distributions model counts and waiting times",
      html: String.raw`
        <h3>Poisson distribution</h3>
        <p>A Poisson variable models a nonnegative count:</p>
        <p>\[K\sim\operatorname{Poisson}(\lambda),\qquad K\in\{0,1,2,\ldots\}.\]</p>
        <p>Its PMF is</p>
        <p>\[P(K=k)=e^{-\lambda}\frac{\lambda^k}{k!}.\]</p>
        <p>Its mean and variance are both \(\lambda\):</p>
        <p>\[\mathbb{E}[K]=\operatorname{Var}(K)=\lambda.\]</p>
        <p>If a system receives an average of \(\lambda=2\) events per minute, then</p>
        <p>\[P(K=0)=e^{-2}\approx0.135.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Poisson likelihoods are useful for count targets such as event counts, clicks, arrivals, or biological read counts when the modeling assumptions are suitable.
        </div>

        <h3>Exponential distribution</h3>
        <p>An exponential variable often models a nonnegative waiting time:</p>
        <p>\[T\sim\operatorname{Exponential}(\lambda).\]</p>
        <p>Its density is</p>
        <p>\[f(t)=\lambda e^{-\lambda t},\qquad t\ge0.\]</p>
        <p>Its survival probability is especially simple:</p>
        <p>\[P(T>t)=e^{-\lambda t}.\]</p>
        <p>For \(\lambda=2\) per hour,</p>
        <p>\[P(T>1)=e^{-2}\approx0.135.\]</p>
        <p>The mean waiting time is \(1/\lambda\).</p>
        <div class="shape-check">
          <strong>Relationship.</strong> Under the standard Poisson-process model, Poisson variables count events in a time interval, while exponential variables describe waiting times between events. Do not treat this as a universal rule for all count data.
        </div>
      `
    },
    {
      id: "sampling-monte-carlo",
      title: "18. Sampling and Monte Carlo replace difficult expectations with averages",
      html: String.raw`
        <p>Often a distribution is easy to sample from but an expectation under that distribution is hard to calculate exactly.</p>
        <p>Suppose we want</p>
        <p>\[\mathbb{E}_{X\sim p}[g(X)].\]</p>
        <p>Draw independent samples</p>
        <p>\[x^{(1)},x^{(2)},\ldots,x^{(N)}\sim p.\]</p>
        <p>The Monte Carlo estimate is</p>
        <p>\[\widehat{\mathbb{E}}[g(X)]=\frac1N\sum_{i=1}^{N}g(x^{(i)}).\]</p>
        <h3>Small numerical example</h3>
        <p>Suppose four samples of \(X\) are</p>
        <p>\[1,\ 2,\ 2,\ 5\]</p>
        <p>and we want to estimate \(\mathbb{E}[X^2]\). Then</p>
        <p>\[\frac{1^2+2^2+2^2+5^2}{4}=\frac{34}{4}=8.5.\]</p>
        <p>This estimate is random because a different sample set gives a different answer.</p>
        <h3>Why more samples help</h3>
        <p>Under standard conditions, the Monte Carlo average converges toward the true expectation as \(N\) grows. Its standard error often decreases at the rate</p>
        <p>\[O\left(\frac{1}{\sqrt{N}}\right).\]</p>
        <p>This is slow: reducing Monte Carlo error by a factor of two often requires about four times as many samples.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Mini-batch gradients, variational inference, dropout, policy-gradient methods, Bayesian prediction, and generative models all use sampled approximations to expectations.
        </div>
        <h3>Mini-batch gradient as a Monte Carlo idea</h3>
        <p>If the population objective is</p>
        <p>\[R(\theta)=\mathbb{E}_{Z\sim p_{\text{data}}}[L(\theta;Z)],\]</p>
        <p>then a mini-batch \(z_1,\ldots,z_B\) gives the estimate</p>
        <p>\[\widehat{\nabla R}(\theta)=\frac1B\sum_{i=1}^{B}\nabla_\theta L(\theta;z_i).\]</p>
        <p>Stochastic gradient descent uses this noisy estimate instead of the exact population gradient.</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> “Sample” can mean one draw from a probability distribution or one example in a data set. Papers use both meanings. Use context to decide which one is intended.
        </div>
      `
    }
  );
})();
