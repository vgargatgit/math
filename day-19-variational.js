(() => {
  const day19 = COURSE[6].lessons[3];

  day19.sections.push(
    {
      id: "variational-inference",
      title: "6. Variational inference replaces a hard posterior with a learnable approximation",
      html: String.raw`
        <p>Exact posterior inference can be too expensive. Variational inference chooses a family of simpler distributions and searches for the member that is closest to the true posterior.</p>
        <p>Write the approximate posterior as</p>
        <p>\[
        q_\phi(z\mid x).
        \]</p>
        <p>The parameter \(\phi\) can be the weights of a neural network. The network receives \(x\) and returns parameters of a probability distribution over \(z\).</p>

        <h3>Gaussian encoder example</h3>
        <p>A common VAE encoder returns a mean vector and a log-variance vector:</p>
        <p>\[
        \mu_\phi(x)\in\mathbb R^{d_z},
        \qquad
        \log\sigma_\phi^2(x)\in\mathbb R^{d_z}.
        \]</p>
        <p>Then</p>
        <p>\[
        q_\phi(z\mid x)=
        \mathcal N\!\left(z;\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x))\right).
        \]</p>

        <h3>Batch shape example</h3>
        <p>Suppose \(B=32\) and \(d_z=16\). The encoder can return</p>
        <p>\[
        M\in\mathbb R^{32\times16},
        \qquad
        S\in\mathbb R^{32\times16}.
        \]</p>
        <p>Each row contains the latent-distribution parameters for one example.</p>

        <h3>What the optimization does</h3>
        <p>Optimizing the ELBO improves both \(\theta\) and \(\phi\). The generative parameters \(\theta\) make latent samples explain the data. The inference parameters \(\phi\) make \(q_\phi(z\mid x)\) approximate the posterior well enough for learning.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> “Amortized inference” means that one trained encoder predicts posterior parameters for many observations instead of solving a new optimization problem for every \(x\).</div>
      `
    },
    {
      id: "reparameterization",
      title: "7. Reparameterization moves randomness into a separate noise variable",
      html: String.raw`
        <p>A direct sample</p>
        <p>\[
        z\sim q_\phi(z\mid x)
        \]</p>
        <p>depends on \(\phi\) through a random sampling operation. This makes ordinary pathwise backpropagation difficult.</p>
        <p>For a diagonal Gaussian, write</p>
        <p>\[
        \epsilon\sim\mathcal N(0,I),
        \qquad
        z=\mu_\phi(x)+\sigma_\phi(x)\odot\epsilon.
        \]</p>
        <p>The random variable \(\epsilon\) no longer depends on \(\phi\). The sample \(z\) is now a differentiable function of \(\mu\), \(\sigma\), and \(\epsilon\).</p>

        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[
        \mu=(1,-2)^\top,
        \qquad
        \sigma=(0.5,2)^\top,
        \qquad
        \epsilon=(0.4,-1)^\top.
        \]</p>
        <p>Then</p>
        <p>\[
        z=\mu+\sigma\odot\epsilon
        =\begin{bmatrix}1\\-2\end{bmatrix}
        +\begin{bmatrix}0.2\\-2\end{bmatrix}
        =\begin{bmatrix}1.2\\-4\end{bmatrix}.
        \]</p>

        <h3>Gradient path</h3>
        <p>If a decoder loss is \(L(z)\), then backpropagation can use</p>
        <p>\[
        \frac{\partial L}{\partial\mu}
        =\frac{\partial L}{\partial z},
        \qquad
        \frac{\partial L}{\partial\sigma}
        =\frac{\partial L}{\partial z}\odot\epsilon.
        \]</p>
        <div class="shape-check"><strong>Shape check.</strong> \(\mu\), \(\sigma\), \(\epsilon\), and \(z\) all have latent shape \(d_z\) for one sample, or \(B\times d_z\) for a batch.</div>
      `
    },
    {
      id: "monte-carlo-gradients",
      title: "8. Monte Carlo estimates replace difficult expectations with sample averages",
      html: String.raw`
        <p>Many objectives contain expectations that do not have a simple closed form. Monte Carlo estimation uses random samples.</p>
        <p>For</p>
        <p>\[
        \mathbb E_{z\sim q}[f(z)],
        \]</p>
        <p>draw \(K\) samples and use</p>
        <p>\[
        \widehat{\mathbb E}[f]
        =\frac1K\sum_{k=1}^{K}f(z^{(k)}).
        \]</p>

        <h3>Numerical example</h3>
        <p>Suppose three samples give function values \(2.0\), \(3.5\), and \(1.5\). Then</p>
        <p>\[
        \widehat{\mathbb E}[f]
        =\frac{2.0+3.5+1.5}{3}
        =\frac73\approx2.33.
        \]</p>

        <h3>Monte Carlo gradient with reparameterization</h3>
        <p>If \(z=g_\phi(\epsilon,x)\) with \(\epsilon\) independent of \(\phi\), then</p>
        <p>\[
        \nabla_\phi\mathbb E_\epsilon[f(g_\phi(\epsilon,x))]
        \approx
        \frac1K\sum_{k=1}^K
        \nabla_\phi f(g_\phi(\epsilon^{(k)},x)).
        \]</p>
        <p>Automatic differentiation computes the pathwise gradient through \(g_\phi\).</p>

        <h3>Bias and variance</h3>
        <p>A sample average can be noisy. More samples usually reduce variance, but they also increase compute cost. Many VAEs use one latent sample per training example because minibatches already provide substantial averaging.</p>
        <div class="paper-connection"><strong>Reading rule.</strong> When a paper writes an expectation in the objective, check whether training evaluates it analytically or estimates it with samples.</div>
      `
    },
    {
      id: "importance-sampling",
      title: "9. Importance sampling estimates one distribution by sampling from another",
      html: String.raw`
        <p>Sometimes it is hard to sample from a target distribution \(p(z)\), but easy to sample from another distribution \(q(z)\). Importance sampling rewrites an expectation:</p>
        <p>\[
        \mathbb E_{p}[f(z)]
        =\int f(z)p(z)\,dz
        =\int f(z)\frac{p(z)}{q(z)}q(z)\,dz.
        \]</p>
        <p>Therefore</p>
        <p>\[
        \mathbb E_p[f(z)]
        =\mathbb E_q[w(z)f(z)],
        \qquad
        w(z)=\frac{p(z)}{q(z)}.
        \]</p>

        <h3>Discrete numerical example</h3>
        <p>Let the target distribution be</p>
        <p>\[
        p(0)=0.8,\qquad p(1)=0.2,
        \]</p>
        <p>and sample from</p>
        <p>\[
        q(0)=q(1)=0.5.
        \]</p>
        <p>The importance weights are</p>
        <p>\[
        w(0)=1.6,
        \qquad
        w(1)=0.4.
        \]</p>
        <p>If \(f(z)=z\), then the exact target expectation is \(0.2\). Under \(q\),</p>
        <p>\[
        \mathbb E_q[w(z)f(z)]
        =0.5(1.6)(0)+0.5(0.4)(1)=0.2.
        \]</p>

        <h3>Failure mode</h3>
        <p>Importance sampling can have very high variance if \(q\) assigns little probability where \(p\) is large. Then a few samples receive huge weights.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Importance-weighted autoencoders use several weighted latent samples to tighten a lower bound on the log likelihood.</div>
      `
    },
    {
      id: "change-of-variables",
      title: "10. Change of variables tracks how an invertible map changes probability density",
      html: String.raw`
        <p>Suppose a simple random variable \(z\) is transformed by an invertible function</p>
        <p>\[
        x=f(z).
        \]</p>
        <p>A probability density must change when the transformation stretches or compresses space.</p>

        <h3>One-dimensional rule</h3>
        <p>If \(z=f^{-1}(x)\), then</p>
        <p>\[
        p_X(x)
        =p_Z(z)
        \left|\frac{dz}{dx}\right|.
        \]</p>

        <h3>Numerical scaling example</h3>
        <p>Let \(x=2z\), so \(z=x/2\). Then</p>
        <p>\[
        \left|\frac{dz}{dx}\right|=\frac12.
        \]</p>
        <p>Therefore</p>
        <p>\[
        p_X(x)=p_Z(x/2)\frac12.
        \]</p>
        <p>The transformation doubles lengths, so the density height must be halved to keep total probability equal to one.</p>

        <h3>Multivariable rule</h3>
        <p>For \(x=f(z)\) with \(x,z\in\mathbb R^d\),</p>
        <p>\[
        p_X(x)
        =p_Z(z)
        \left|
        \det\frac{\partial z}{\partial x}
        \right|.
        \]</p>
        <p>Equivalently, in log form,</p>
        <p>\[
        \log p_X(x)
        =\log p_Z(z)
        -\log\left|
        \det\frac{\partial f}{\partial z}
        \right|.
        \]</p>

        <h3>Jacobian determinant</h3>
        <p>The Jacobian</p>
        <p>\[
        J_f(z)=\frac{\partial f}{\partial z}
        \in\mathbb R^{d\times d}
        \]</p>
        <p>describes local linear stretching. Its determinant is a local volume-scaling factor.</p>
        <div class="shape-check"><strong>Common mistake.</strong> The Jacobian determinant is a scalar. The Jacobian itself is a \(d\times d\) matrix. A flow paper often designs \(f\) so that this determinant is cheap to compute.</div>
      `
    }
  );
})();
