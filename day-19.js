const day19 = COURSE[6].lessons[3];

Object.assign(day19, {
  published: true,
  summary: "Build the probability and optimization ideas needed to read VAE, flow, GAN, score-model, and diffusion papers.",
  explanation: "Generative models describe how data can be produced. Many of them introduce hidden variables, transform simple probability distributions, or learn a process that turns noise into data. The main reading task is to track which distribution is being modeled, which variables are observed, which variables are hidden, and which objective can actually be optimized.",
  topics: [
    "Latent variables",
    "Marginalization",
    "Posterior inference",
    "Jensen’s inequality",
    "ELBO",
    "Variational inference",
    "Reparameterization",
    "Monte Carlo gradients",
    "Importance sampling",
    "Change of variables",
    "Jacobian determinant",
    "Normalizing flows",
    "Minimax optimization",
    "Game-theoretic equilibrium",
    "GAN objectives",
    "Score functions",
    "Denoising objectives",
    "Markov noise processes",
    "SDE intuition"
  ],
  sections: [
    {
      id: "latent-variables",
      title: "1. Latent variables explain observed data through hidden causes",
      html: String.raw`
        <p>A <strong>latent variable</strong> is a variable that the model uses but the dataset does not directly provide. We usually write observed data as \(x\) and a latent variable as \(z\).</p>
        <p>A latent-variable model defines a joint distribution</p>
        <p>\[
        p_\theta(x,z)=p_\theta(x\mid z)p(z).
        \]</p>
        <p>The prior \(p(z)\) describes plausible hidden states before we observe \(x\). The conditional distribution \(p_\theta(x\mid z)\) describes how a hidden state can produce data.</p>

        <h3>A small mixture example</h3>
        <p>Suppose \(z\in\{0,1\}\) selects one of two coin types. Let</p>
        <p>\[
        p(z=0)=0.6,\qquad p(z=1)=0.4.
        \]</p>
        <p>Coin 0 gives heads with probability \(0.2\). Coin 1 gives heads with probability \(0.9\). The observed variable \(x\) is the coin result.</p>
        <p>The latent variable is the coin identity. We observe heads or tails, but we do not observe which coin generated the result.</p>

        <h3>Why latent variables matter in ML papers</h3>
        <p>A latent variable can represent class identity, pose, style, topic, compressed features, or a continuous source of variation. A VAE uses a continuous latent vector. A mixture model can use a discrete latent category.</p>
        <div class="shape-check"><strong>Shape check.</strong> For a batch of \(B\) examples, a VAE can store observations as \(X\in\mathbb R^{B\times d_x}\) and latent samples as \(Z\in\mathbb R^{B\times d_z}\). The latent dimension \(d_z\) does not have to equal the data dimension \(d_x\).</div>
        <div class="paper-connection"><strong>Paper connection.</strong> When a paper writes \(p_\theta(x,z)\), identify which variables are observed and which are latent before you read the objective.</div>
      `
    },
    {
      id: "marginalization",
      title: "2. Marginalization removes a hidden variable by summing or integrating",
      html: String.raw`
        <p>We often want the probability of the observed data alone. The latent variable is unknown, so we include every possible latent state.</p>
        <p>For a discrete latent variable,</p>
        <p>\[
        p_\theta(x)=\sum_z p_\theta(x,z).
        \]</p>
        <p>For a continuous latent variable,</p>
        <p>\[
        p_\theta(x)=\int p_\theta(x,z)\,dz.
        \]</p>

        <h3>Numerical example</h3>
        <p>Use the two-coin model. The probability of heads is</p>
        <p>\[
        p(x=H)=0.6(0.2)+0.4(0.9)=0.12+0.36=0.48.
        \]</p>
        <p>We did not choose one latent state. We weighted both states by their prior probabilities.</p>

        <h3>Why this becomes difficult</h3>
        <p>A modern latent vector can have hundreds of dimensions. The integral</p>
        <p>\[
        p_\theta(x)=\int p_\theta(x\mid z)p(z)\,dz
        \]</p>
        <p>can be impossible to evaluate exactly. This is one reason variational inference is important.</p>
        <div class="definition"><strong>Reading rule.</strong> A marginal probability removes a variable. A conditional probability keeps the conditioning variable fixed. Do not confuse \(p(x)\) with \(p(x\mid z)\).</div>
      `
    },
    {
      id: "posterior-inference",
      title: "3. Posterior inference asks which hidden states could explain one observation",
      html: String.raw`
        <p>After we observe \(x\), we want the distribution of plausible latent states:</p>
        <p>\[
        p_\theta(z\mid x)=\frac{p_\theta(x,z)}{p_\theta(x)}.
        \]</p>
        <p>This is the <strong>posterior</strong>. It changes the prior belief about \(z\) after we see data.</p>

        <h3>Posterior for the coin example</h3>
        <p>Suppose we observe heads. Then</p>
        <p>\[
        p(z=1\mid H)=\frac{p(H\mid z=1)p(z=1)}{p(H)}
        =\frac{0.9\cdot0.4}{0.48}=0.75.
        \]</p>
        <p>The prior probability of coin 1 was \(0.4\). After we observe heads, its posterior probability becomes \(0.75\).</p>

        <h3>Why posterior inference can be hard</h3>
        <p>The denominator is the marginal likelihood:</p>
        <p>\[
        p_\theta(x)=\int p_\theta(x,z)\,dz.
        \]</p>
        <p>If this integral is hard, then the exact posterior is also hard. A VAE introduces an easier distribution \(q_\phi(z\mid x)\) to approximate the posterior.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> In encoder-decoder latent models, the encoder often parameterizes \(q_\phi(z\mid x)\). It is an inference model. The decoder often parameterizes \(p_\theta(x\mid z)\). It is a generative model.</div>
      `
    },
    {
      id: "jensen",
      title: "4. Jensen’s inequality creates useful bounds on difficult logarithms",
      html: String.raw`
        <p>A function \(f\) is concave when chords lie below the graph. The logarithm is concave. Jensen’s inequality therefore gives</p>
        <p>\[
        \mathbb E[f(X)]\le f(\mathbb E[X])
        \]</p>
        <p>for a concave \(f\). For the logarithm,</p>
        <p>\[
        \mathbb E[\log X]\le \log \mathbb E[X].
        \]</p>

        <h3>Numerical check</h3>
        <p>Let \(X\) be \(1\) or \(4\), each with probability \(1/2\). Then</p>
        <p>\[
        \mathbb E[X]=2.5,
        \qquad
        \log\mathbb E[X]=\log 2.5\approx0.916.
        \]</p>
        <p>Also,</p>
        <p>\[
        \mathbb E[\log X]
        =\frac12\log1+\frac12\log4
        \approx0.693.
        \]</p>
        <p>Thus \(0.693\le0.916\), as Jensen’s inequality predicts.</p>

        <h3>Why this matters for latent models</h3>
        <p>The log marginal likelihood contains a difficult log of an integral. Jensen’s inequality can move the logarithm inside an expectation and give a lower bound that is easier to optimize.</p>
        <div class="shape-check"><strong>Common mistake.</strong> The inequality direction depends on curvature. For concave \(\log\), \(\mathbb E[\log X]\le\log\mathbb E[X]\). Do not reverse the sign.</div>
      `
    },
    {
      id: "elbo",
      title: "5. The ELBO turns difficult maximum likelihood into a tractable surrogate objective",
      html: String.raw`
        <p>Introduce an approximate posterior \(q_\phi(z\mid x)\). Start from</p>
        <p>\[
        \log p_\theta(x)
        =\log\int p_\theta(x,z)\,dz.
        \]</p>
        <p>Multiply and divide by \(q_\phi(z\mid x)\):</p>
        <p>\[
        \log p_\theta(x)
        =\log\int q_\phi(z\mid x)
        \frac{p_\theta(x,z)}{q_\phi(z\mid x)}\,dz.
        \]</p>
        <p>This is a log of an expectation. Jensen’s inequality gives</p>
        <p>\[
        \log p_\theta(x)
        \ge
        \mathbb E_{q_\phi(z\mid x)}
        \left[
        \log\frac{p_\theta(x,z)}{q_\phi(z\mid x)}
        \right].
        \]</p>
        <p>The right side is the <strong>evidence lower bound</strong>, or ELBO.</p>

        <h3>VAE form</h3>
        <p>Use \(p_\theta(x,z)=p_\theta(x\mid z)p(z)\). Then</p>
        <p>\[
        \mathcal L_{\text{ELBO}}
        =
        \mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
        -D_{\mathrm{KL}}\left(q_\phi(z\mid x)\|p(z)\right).
        \]</p>
        <p>The first term rewards reconstruction or data likelihood. The second term keeps the approximate posterior near the prior.</p>

        <h3>Why it is a lower bound</h3>
        <p>The exact relation is</p>
        <p>\[
        \log p_\theta(x)
        =\mathcal L_{\text{ELBO}}
        +D_{\mathrm{KL}}\left(q_\phi(z\mid x)\|p_\theta(z\mid x)\right).
        \]</p>
        <p>KL divergence is nonnegative. Therefore the ELBO cannot exceed \(\log p_\theta(x)\).</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Many VAE variants modify one of these two terms. A \(\beta\)-VAE, for example, multiplies the KL term by a coefficient \(\beta\).</div>
      `
    }
  ]
});
