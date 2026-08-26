(() => {
  const day19 = COURSE[6].lessons[3];

  day19.sections.push(
    {
      id: "denoising-objectives",
      title: "16. Denoising objectives learn how to remove known corruption",
      html: String.raw`
        <p>A denoising model receives a corrupted sample and predicts information about the clean sample or the added noise.</p>
        <p>A common Gaussian corruption rule is</p>
        <p>\[
        x_t=\sqrt{\bar\alpha_t}\,x_0
        +\sqrt{1-\bar\alpha_t}\,\epsilon,
        \qquad
        \epsilon\sim\mathcal N(0,I).
        \]</p>
        <p>The scalar \(\bar\alpha_t\) controls how much original signal remains at time \(t\).</p>

        <h3>Numerical example</h3>
        <p>Let one scalar data value be \(x_0=2\). Suppose</p>
        <p>\[
        \bar\alpha_t=0.81,
        \qquad
        \epsilon=-0.5.
        \]</p>
        <p>Then</p>
        <p>\[
        x_t=0.9(2)+\sqrt{0.19}(-0.5)
        \approx1.8-0.218=1.582.
        \]</p>
        <p>The training code knows the sampled noise \(\epsilon\). It can train a neural network \(\epsilon_\theta(x_t,t)\) to predict that noise.</p>

        <h3>A common noise-prediction objective</h3>
        <p>One widely used loss has the form</p>
        <p>\[
        L(\theta)=
        \mathbb E_{x_0,t,\epsilon}
        \left[
        \|\epsilon-\epsilon_\theta(x_t,t)\|_2^2
        \right].
        \]</p>
        <p>The model is not simply doing image cleanup. It learns denoising behavior over many noise levels. The collection of these local denoising steps defines a generative process.</p>

        <h3>Shape reasoning</h3>
        <p>If an image batch has shape \(B\times C\times H\times W\), then \(x_0\), \(x_t\), \(\epsilon\), and the predicted noise normally have the same shape. The time index \(t\) is supplied separately or embedded into a feature vector.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Some diffusion papers predict \(\epsilon\). Others predict \(x_0\), a score, or a related variable such as \(v\). These parameterizations are related, but their formulas are not identical.</div>
      `
    },
    {
      id: "markov-noise-processes",
      title: "17. A Markov noise process adds small amounts of noise one step at a time",
      html: String.raw`
        <p>A Markov process has a simple conditional-dependence rule. The next state depends on the current state, not on the full earlier history once the current state is known.</p>
        <p>For a diffusion forward process,</p>
        <p>\[
        q(x_{1:T}\mid x_0)
        =\prod_{t=1}^{T}q(x_t\mid x_{t-1}).
        \]</p>
        <p>A common transition is</p>
        <p>\[
        q(x_t\mid x_{t-1})
        =\mathcal N\!\left(
        x_t;
        \sqrt{1-\beta_t}\,x_{t-1},
        \beta_t I
        \right).
        \]</p>
        <p>The schedule \(\beta_t\) sets the amount of new noise at step \(t\).</p>

        <h3>Why the closed form matters</h3>
        <p>Define</p>
        <p>\[
        \alpha_t=1-\beta_t,
        \qquad
        \bar\alpha_t=\prod_{s=1}^{t}\alpha_s.
        \]</p>
        <p>Then we can sample \(x_t\) directly from \(x_0\):</p>
        <p>\[
        q(x_t\mid x_0)
        =\mathcal N\!\left(
        x_t;
        \sqrt{\bar\alpha_t}\,x_0,
        (1-\bar\alpha_t)I
        \right).
        \]</p>
        <p>This avoids simulating every earlier step during training.</p>

        <h3>Generation reverses the direction</h3>
        <p>Training corrupts data toward noise:</p>
        <p>\[
        x_0\rightarrow x_1\rightarrow\cdots\rightarrow x_T.
        \]</p>
        <p>Sampling starts from noise and uses a learned reverse process:</p>
        <p>\[
        x_T\rightarrow x_{T-1}\rightarrow\cdots\rightarrow x_0.
        \]</p>
        <p>The reverse transition is commonly modeled as</p>
        <p>\[
        p_\theta(x_{t-1}\mid x_t).
        \]</p>
        <div class="definition"><strong>Reading rule.</strong> The forward process is usually fixed by the noise schedule. The reverse process contains the learned model.</div>
      `
    },
    {
      id: "sde-intuition",
      title: "18. SDEs give a continuous-time view of adding and removing noise",
      html: String.raw`
        <p>A stochastic differential equation, or SDE, is a differential equation with a random-noise term. A common abstract form is</p>
        <p>\[
        dx=f(x,t)\,dt+g(t)\,dW_t.
        \]</p>
        <p>The drift \(f(x,t)\) describes systematic motion. The diffusion coefficient \(g(t)\) controls random motion. The term \(dW_t\) represents an infinitesimal Brownian-noise increment.</p>

        <h3>Connection to discrete diffusion steps</h3>
        <p>A small discrete step can look like</p>
        <p>\[
        x_{t+\Delta t}
        \approx
        x_t+f(x_t,t)\Delta t
        +g(t)\sqrt{\Delta t}\,\epsilon,
        \qquad
        \epsilon\sim\mathcal N(0,I).
        \]</p>
        <p>This resembles repeated small Gaussian-noise updates.</p>

        <h3>Why the score appears in reverse time</h3>
        <p>For many score-based models, the reverse-time dynamics include the score of the noisy distribution:</p>
        <p>\[
        s_t(x)=\nabla_x\log p_t(x).
        \]</p>
        <p>The score tells the reverse process how to move from low-density noisy regions toward regions that are more consistent with the current noisy data distribution.</p>
        <p>You do not need stochastic-calculus proofs to read many applied papers. You do need to identify the drift, the noise scale, the time variable, and the learned score.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Score-based SDE papers show that discrete diffusion models and continuous score models can be understood in one framework. This viewpoint also leads to alternative numerical samplers.</div>
      `
    },
    {
      id: "common-mistakes",
      title: "19. Common mistakes in generative-model papers",
      html: String.raw`
        <h3>Mistake 1: confuse a prior with a posterior</h3>
        <p>The prior \(p(z)\) is specified before observing \(x\). The posterior \(p(z\mid x)\) uses information from \(x\).</p>

        <h3>Mistake 2: confuse a likelihood with a marginal likelihood</h3>
        <p>\(p(x\mid z)\) keeps \(z\) fixed. \(p(x)\) sums or integrates over \(z\).</p>

        <h3>Mistake 3: read the ELBO as an equality</h3>
        <p>The ELBO equals \(\log p(x)\) only when the approximate posterior matches the exact posterior for the relevant model.</p>

        <h3>Mistake 4: reverse Jensen’s inequality</h3>
        <p>The logarithm is concave, so \(\mathbb E[\log X]\le\log\mathbb E[X]\).</p>

        <h3>Mistake 5: assume reparameterization removes randomness</h3>
        <p>It does not. It moves the randomness into \(\epsilon\), whose distribution does not depend on the model parameters.</p>

        <h3>Mistake 6: ignore importance-weight variance</h3>
        <p>A proposal distribution can be valid but still give a poor estimator if most weights are tiny and a few weights are huge.</p>

        <h3>Mistake 7: use the wrong Jacobian direction</h3>
        <p>For \(x=f(z)\), check whether the formula uses \(\partial x/\partial z\) or \(\partial z/\partial x\). The determinant is inverted when you change direction.</p>

        <h3>Mistake 8: assume a flow can use any neural network</h3>
        <p>A normalizing-flow transform must satisfy the required invertibility and Jacobian-cost conditions.</p>

        <h3>Mistake 9: treat a minimax game as ordinary minimization</h3>
        <p>The discriminator and generator optimize different directions. Alternating updates can have dynamics that do not look like descent on one fixed surface.</p>

        <h3>Mistake 10: assume \(D(x)=0.5\) always means a good GAN</h3>
        <p>A weak discriminator can also output values near \(0.5\). The equilibrium interpretation assumes an idealized discriminator and matching distributions.</p>

        <h3>Mistake 11: confuse the data score with a parameter score</h3>
        <p>In diffusion, \(\nabla_x\log p_t(x)\) differentiates with respect to the sample. In policy gradients, “score function” often means \(\nabla_\theta\log p_\theta(x)\).</p>

        <h3>Mistake 12: assume every diffusion model predicts noise</h3>
        <p>Noise prediction is common, but papers can predict clean data, velocity-like variables, or scores.</p>

        <h3>Mistake 13: forget the time index</h3>
        <p>The distribution \(p_t(x)\), score \(s_\theta(x,t)\), and noise level all change with time.</p>

        <h3>Mistake 14: confuse the fixed forward process with the learned reverse process</h3>
        <p>The forward corruption is usually chosen in advance. The neural network learns information needed to reverse it.</p>

        <h3>Mistake 15: compare likelihoods and sample quality as if they were the same metric</h3>
        <p>Different generative models can trade off explicit likelihood, visual quality, coverage, training stability, and sampling speed.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "20. A paper-reading workflow for generative models",
      html: String.raw`
        <p>Use the same sequence every time you read a VAE, flow, GAN, score-model, or diffusion paper.</p>
        <ol>
          <li><strong>Name the random variables.</strong> Mark observed variables, latent variables, noise variables, and conditions.</li>
          <li><strong>Write every distribution.</strong> Identify the prior, likelihood, posterior, approximate posterior, data distribution, and model distribution.</li>
          <li><strong>Write the shapes.</strong> Record batch, data, latent, and conditioning dimensions.</li>
          <li><strong>Identify what can be sampled exactly.</strong> A paper can use exact sampling even when exact density evaluation is difficult, or the reverse.</li>
          <li><strong>Identify what can be evaluated exactly.</strong> Flows often permit exact density evaluation. GANs usually do not expose a normalized likelihood.</li>
          <li><strong>Find the optimized objective.</strong> Separate the mathematical ideal from the estimator used in code.</li>
          <li><strong>Expand every expectation.</strong> Ask what distribution supplies the samples and how many samples are used.</li>
          <li><strong>Check each gradient path.</strong> In a VAE, identify the reparameterized path. In a GAN, identify which player receives each gradient.</li>
          <li><strong>Check each Jacobian.</strong> Write its shape and its determinant direction.</li>
          <li><strong>For diffusion, trace one time step.</strong> Write \(x_0\), \(x_t\), the sampled noise, the model prediction, and the target.</li>
          <li><strong>Separate training from sampling.</strong> Diffusion training can sample a random time directly. Generation still follows a reverse-time procedure.</li>
          <li><strong>Check evaluation claims.</strong> Likelihood, FID-like sample metrics, diversity, reconstruction, and speed measure different properties.</li>
        </ol>

        <h3>Paper-style VAE shape trace</h3>
        <p>Suppose a minibatch contains \(B=64\) vectors with \(d_x=784\) features. Let the latent dimension be \(d_z=32\).</p>
        <p>\[
        X\in\mathbb R^{64\times784}.
        \]</p>
        <p>The encoder returns</p>
        <p>\[
        M,\log V\in\mathbb R^{64\times32}.
        \]</p>
        <p>Sample</p>
        <p>\[
        E\in\mathbb R^{64\times32},
        \qquad
        E_{ij}\sim\mathcal N(0,1),
        \]</p>
        <p>and form</p>
        <p>\[
        Z=M+\exp\!\left(\tfrac12\log V\right)\odot E
        \in\mathbb R^{64\times32}.
        \]</p>
        <p>The decoder maps \(Z\) back to parameters for a distribution over \(X\). The reconstruction term is evaluated per example. The KL term is usually summed over latent coordinates and then averaged or summed over the batch according to the implementation.</p>
        <div class="paper-connection"><strong>Core habit.</strong> Do not stop after reading the model diagram. Reconstruct one training sample path with distributions, shapes, randomness, and gradients.</div>
      `
    },
    {
      id: "day19-recap",
      title: "21. Recap",
      html: String.raw`
        <ul>
          <li>Latent variables are hidden variables used to explain observed data.</li>
          <li>Marginalization removes a latent variable by summing or integrating.</li>
          <li>Posterior inference asks which latent states are plausible after observing data.</li>
          <li>Jensen’s inequality lets us build a lower bound on a difficult log marginal likelihood.</li>
          <li>The ELBO combines an expected data-fit term with a KL regularization term.</li>
          <li>Variational inference learns a tractable approximation to an intractable posterior.</li>
          <li>Reparameterization writes a random sample as a differentiable transform of parameter-free noise.</li>
          <li>Monte Carlo estimation replaces an expectation with an average over samples.</li>
          <li>Importance sampling corrects for sampling from a proposal distribution.</li>
          <li>Change of variables uses a Jacobian determinant to correct density under an invertible map.</li>
          <li>Normalizing flows chain invertible maps and exact density corrections.</li>
          <li>Minimax optimization has players that optimize in different directions.</li>
          <li>A game equilibrium is not the same concept as an ordinary local minimum.</li>
          <li>GANs train a generator against a discriminator or critic.</li>
          <li>A data score is \(\nabla_x\log p(x)\), a vector with the same shape as \(x\).</li>
          <li>Denoising objectives can train a model to predict noise, clean data, or a related target.</li>
          <li>A diffusion forward process is commonly a Markov chain that gradually adds Gaussian noise.</li>
          <li>The learned reverse process turns noise back into structured samples.</li>
          <li>SDEs provide a continuous-time view of noise injection and score-based reversal.</li>
        </ul>
      `
    }
  );

  day19.examples = [
    ["Marginal likelihood", String.raw`If \(p(z=0)=0.6\), \(p(z=1)=0.4\), \(p(H\mid0)=0.2\), and \(p(H\mid1)=0.9\), then \(p(H)=0.48\).`],
    ["Posterior update", String.raw`For the same model, \(p(z=1\mid H)=0.36/0.48=0.75\).`],
    ["Reparameterized sample", String.raw`For \(\mu=(1,-2)\), \(\sigma=(0.5,2)\), and \(\epsilon=(0.4,-1)\), the sample is \(z=(1.2,-4)\).`],
    ["Importance weight", String.raw`If \(p(1)=0.2\) and \(q(1)=0.5\), then the importance weight at \(1\) is \(0.4\).`],
    ["Change of variables", String.raw`For \(x=2z\), the inverse derivative is \(|dz/dx|=1/2\), so \(p_X(x)=p_Z(x/2)/2\).`],
    ["Optimal GAN discriminator", String.raw`If \(p_{\text{data}}(x)=0.75\) and \(p_g(x)=0.25\), then \(D^*(x)=0.75\).`],
    ["Gaussian score", String.raw`For a standard normal density, \(\nabla_x\log p(x)=-x\). At \(x=3\), the score is \(-3\).`],
    ["Forward diffusion sample", String.raw`For \(x_0=2\), \(\bar\alpha_t=0.81\), and \(\epsilon=-0.5\), \(x_t\approx1.582\).`]
  ];

  day19.practice = [
    String.raw`What is a latent variable?<details><summary>Answer</summary><p>It is a variable used by the model that is not directly observed in the dataset.</p></details>`,
    String.raw`For discrete \(z\), how do you compute \(p(x)\) from \(p(x,z)\)?<details><summary>Answer</summary><p>Sum over all latent states: \(p(x)=\sum_z p(x,z)\).</p></details>`,
    String.raw`If \(p(z=1)=0.3\), \(p(x\mid z=1)=0.8\), and \(p(x)=0.4\), what is \(p(z=1\mid x)\)?<details><summary>Answer</summary><p>By Bayes’ rule, \(p(z=1\mid x)=0.8(0.3)/0.4=0.6\).</p></details>`,
    String.raw`For concave \(\log\), which is larger: \(\mathbb E[\log X]\) or \(\log\mathbb E[X]\)?<details><summary>Answer</summary><p>\(\log\mathbb E[X]\) is at least as large.</p></details>`,
    String.raw`Why is the ELBO a lower bound on \(\log p(x)\)?<details><summary>Answer</summary><p>The difference is \(D_{\mathrm{KL}}(q(z\mid x)\|p(z\mid x))\), which is nonnegative.</p></details>`,
    String.raw`In a diagonal-Gaussian VAE with latent size 20 and batch size 64, what is the shape of \(\mu\)?<details><summary>Answer</summary><p>\(64\times20\).</p></details>`,
    String.raw`Write the Gaussian reparameterization formula.<details><summary>Answer</summary><p>\(z=\mu+\sigma\odot\epsilon\), with \(\epsilon\sim\mathcal N(0,I)\).</p></details>`,
    String.raw`Three Monte Carlo samples give values \(1,4,7\). What is the sample-average estimate?<details><summary>Answer</summary><p>\((1+4+7)/3=4\).</p></details>`,
    String.raw`What is the importance weight when \(p(z)=0.6\) and \(q(z)=0.3\)?<details><summary>Answer</summary><p>\(w(z)=p(z)/q(z)=2\).</p></details>`,
    String.raw`For \(x=3z\), what factor appears in \(p_X(x)\) from the inverse derivative?<details><summary>Answer</summary><p>\(|dz/dx|=1/3\).</p></details>`,
    String.raw`If \(f:\mathbb R^5\to\mathbb R^5\), what is the shape of its Jacobian?<details><summary>Answer</summary><p>\(5\times5\).</p></details>`,
    String.raw`Why do many flow architectures use triangular Jacobians?<details><summary>Answer</summary><p>The determinant becomes cheap to compute because it is the product of diagonal entries.</p></details>`,
    String.raw`In \(\min_G\max_D V(D,G)\), which player maximizes the value?<details><summary>Answer</summary><p>The discriminator \(D\) maximizes the stated value, while the generator \(G\) minimizes it under that sign convention.</p></details>`,
    String.raw`If \(p_{\text{data}}(x)=p_g(x)\), what is the ideal original-GAN discriminator output at that \(x\)?<details><summary>Answer</summary><p>\(1/2\).</p></details>`,
    String.raw`For a standard normal in two dimensions and \(x=(2,-1)^\top\), what is the score?<details><summary>Answer</summary><p>\(-x=(-2,1)^\top\).</p></details>`,
    String.raw`If \(x_t\) has shape \(16\times3\times64\times64\), what shape should an epsilon-prediction network normally return?<details><summary>Answer</summary><p>The same shape, \(16\times3\times64\times64\).</p></details>`,
    String.raw`What does the Markov property mean for the forward diffusion chain?<details><summary>Answer</summary><p>Given \(x_{t-1}\), the next state \(x_t\) does not need the earlier states to define its transition distribution.</p></details>`,
    String.raw`Why is the closed form \(q(x_t\mid x_0)\) useful during diffusion training?<details><summary>Answer</summary><p>It lets training sample any noise level directly without simulating all earlier forward steps.</p></details>`,
    String.raw`In \(dx=f(x,t)dt+g(t)dW_t\), what do \(f\) and \(g\) represent?<details><summary>Answer</summary><p>\(f\) is the drift and \(g\) controls the random diffusion strength.</p></details>`,
    String.raw`Why must you check what a diffusion paper predicts: \(\epsilon\), \(x_0\), score, or \(v\)?<details><summary>Answer</summary><p>The training target and sampling equations depend on the parameterization. The symbols can look similar while the numerical target is different.</p></details>`
  ];
})();
