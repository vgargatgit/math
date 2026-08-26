(() => {
  const day19 = COURSE[6].lessons[3];

  day19.sections.push(
    {
      id: "normalizing-flows",
      title: "11. Normalizing flows build complex densities with invertible transformations",
      html: String.raw`
        <p>A normalizing flow starts with a simple base distribution, such as a standard Gaussian:</p>
        <p>\[
        z_0\sim p_0(z_0).
        \]</p>
        <p>It then applies a sequence of invertible maps:</p>
        <p>\[
        z_K=f_K\circ f_{K-1}\circ\cdots\circ f_1(z_0).
        \]</p>
        <p>The final variable \(x=z_K\) can have a complicated distribution.</p>

        <h3>Log-likelihood through several transforms</h3>
        <p>For one transformation,</p>
        <p>\[
        \log p_1(z_1)
        =\log p_0(z_0)
        -\log\left|\det J_{f_1}(z_0)\right|.
        \]</p>
        <p>For \(K\) transformations, the corrections add:</p>
        <p>\[
        \log p_K(z_K)
        =\log p_0(z_0)
        -\sum_{k=1}^{K}
        \log\left|\det J_{f_k}(z_{k-1})\right|.
        \]</p>

        <h3>A triangular Jacobian example</h3>
        <p>Consider</p>
        <p>\[
        y_1=x_1,
        \qquad
        y_2=e^s x_2+t,
        \]</p>
        <p>where \(s\) and \(t\) can depend on \(x_1\). The Jacobian has triangular form:</p>
        <p>\[
        J=
        \begin{bmatrix}
        1&0\\
        *&e^s
        \end{bmatrix}.
        \]</p>
        <p>Its determinant is simply</p>
        <p>\[
        \det J=e^s.
        \]</p>
        <p>Thus</p>
        <p>\[
        \log|\det J|=s.
        \]</p>
        <p>This is why coupling layers use special structures. They keep the map expressive while keeping the determinant cheap.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Flow models can give exact log likelihoods when the transform is invertible and the Jacobian determinant is tractable. This is different from a standard GAN, which does not usually provide an explicit normalized density.</div>
      `
    },
    {
      id: "minimax-optimization",
      title: "12. Minimax optimization trains two objectives that push against each other",
      html: String.raw`
        <p>Ordinary optimization often minimizes one objective:</p>
        <p>\[
        \min_\theta L(\theta).
        \]</p>
        <p>A two-player game can use a minimax objective:</p>
        <p>\[
        \min_\theta\max_\phi V(\theta,\phi).
        \]</p>
        <p>One parameter set tries to make the value small. The other tries to make it large.</p>

        <h3>Simple scalar game</h3>
        <p>Let</p>
        <p>\[
        V(\theta,\phi)=(\theta-\phi)^2-\phi^2.
        \]</p>
        <p>The two parameters have different roles. A gradient step for the minimizing player moves against \(\nabla_\theta V\). A gradient step for the maximizing player moves with \(\nabla_\phi V\).</p>
        <p>In practice, GAN training often alternates several discriminator updates with generator updates rather than solving the inner maximum exactly.</p>

        <h3>Why this is harder than one-objective training</h3>
        <p>The loss landscape changes as both players learn. A step that is useful against the current opponent can become poor after the opponent updates. Training can oscillate instead of moving directly toward a fixed minimum.</p>
        <div class="paper-connection"><strong>Reading rule.</strong> When you see \(\min_G\max_D\), do not read it as one normal minimization problem. Track which player owns each parameter and which direction each player optimizes.</div>
      `
    },
    {
      id: "game-equilibrium",
      title: "13. A game-theoretic equilibrium means neither player can improve by changing alone",
      html: String.raw`
        <p>A common equilibrium idea is a <strong>Nash equilibrium</strong>. At an equilibrium, each player is already making a best response to the other player. One player cannot improve its own objective by changing its strategy alone.</p>

        <h3>Why equilibrium is not the same as a minimum</h3>
        <p>In a single loss function, we can search for a point where moving nearby increases the loss. In a game, one player can prefer one direction while the other prefers the opposite direction.</p>
        <p>For a zero-sum game with value \(V(\theta,\phi)\), a saddle-point condition is</p>
        <p>\[
        V(\theta^*,\phi)
        \le
        V(\theta^*,\phi^*)
        \le
        V(\theta,\phi^*)
        \]</p>
        <p>for allowed alternatives \(\theta\) and \(\phi\), with sign conventions chosen so one player minimizes and the other maximizes.</p>

        <h3>GAN intuition</h3>
        <p>If the generator distribution exactly matches the data distribution, an ideal discriminator cannot use the sample alone to tell which source produced it. In the original GAN setup, the best discriminator then returns</p>
        <p>\[
        D(x)=\frac12
        \]</p>
        <p>for data and generated samples.</p>
        <div class="shape-check"><strong>Common mistake.</strong> A stationary gradient does not automatically prove a stable game equilibrium. Two-player dynamics can rotate or oscillate even when gradients become small locally.</div>
      `
    },
    {
      id: "gan-objectives",
      title: "14. GAN objectives train a discriminator and a generator with linked goals",
      html: String.raw`
        <p>In the original GAN formulation, the discriminator \(D_\phi(x)\in(0,1)\) estimates whether a sample came from the data distribution. The generator maps noise to a sample:</p>
        <p>\[
        z\sim p(z),
        \qquad
        x_g=G_\theta(z).
        \]</p>
        <p>The value function is</p>
        <p>\[
        V(D,G)
        =\mathbb E_{x\sim p_{\text{data}}}[\log D(x)]
        +\mathbb E_{z\sim p(z)}[\log(1-D(G(z)))].
        \]</p>
        <p>The discriminator maximizes this value. The generator tries to make generated samples hard to reject.</p>

        <h3>Optimal discriminator for a fixed generator</h3>
        <p>At one point \(x\), the ideal discriminator has the form</p>
        <p>\[
        D^*(x)
        =\frac{p_{\text{data}}(x)}
        {p_{\text{data}}(x)+p_g(x)}.
        \]</p>
        <p>If</p>
        <p>\[
        p_{\text{data}}(x)=0.75,
        \qquad
        p_g(x)=0.25,
        \]</p>
        <p>then</p>
        <p>\[
        D^*(x)=\frac{0.75}{1}=0.75.
        \]</p>
        <p>If both distributions become equal at that point, then \(D^*(x)=1/2\).</p>

        <h3>Non-saturating generator loss</h3>
        <p>The original minimax generator can have weak gradients when the discriminator is very confident. A common alternative minimizes</p>
        <p>\[
        L_G=-\mathbb E_z[\log D(G(z))].
        \]</p>
        <p>This has the same desired equilibrium but often gives stronger early gradients.</p>

        <h3>Shape reasoning</h3>
        <p>For batch size \(B\), let</p>
        <p>\[
        Z\in\mathbb R^{B\times d_z},
        \qquad
        G(Z)\in\mathbb R^{B\times d_x}.
        \]</p>
        <p>The discriminator usually maps each example to one logit or probability, so its batch output has shape \(B\times1\) or \(B\).</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Modern adversarial models often replace the original loss with Wasserstein, hinge, or other objectives. Always read the exact sign and the exact player objective instead of assuming every “GAN loss” is identical.</div>
      `
    },
    {
      id: "score-functions",
      title: "15. A score function points toward locally higher log density",
      html: String.raw`
        <p>For a differentiable density \(p(x)\), the <strong>score</strong> is</p>
        <p>\[
        s(x)=\nabla_x\log p(x).
        \]</p>
        <p>The score has the same shape as \(x\). It is a vector field over data space.</p>

        <h3>Standard-normal example</h3>
        <p>For one-dimensional</p>
        <p>\[
        p(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2},
        \]</p>
        <p>the log density is</p>
        <p>\[
        \log p(x)=C-\frac{x^2}{2}.
        \]</p>
        <p>Therefore</p>
        <p>\[
        s(x)=\frac{d}{dx}\log p(x)=-x.
        \]</p>
        <p>At \(x=3\), the score is \(-3\), which points back toward the high-density region near zero. At \(x=-2\), the score is \(2\), which points right.</p>

        <h3>Multidimensional Gaussian</h3>
        <p>For \(x\sim\mathcal N(0,I)\),</p>
        <p>\[
        \nabla_x\log p(x)=-x.
        \]</p>
        <p>If \(x\in\mathbb R^d\), the score is also in \(\mathbb R^d\).</p>

        <h3>Why score models are useful</h3>
        <p>The normalized density \(p(x)\) can be hard to model directly. A score model learns the gradient of the log density instead. Diffusion and score-based models learn scores at many noise levels.</p>
        <div class="shape-check"><strong>Common notation issue.</strong> “Score function” can also mean \(\nabla_\theta\log p_\theta(x)\) in policy-gradient or likelihood-ratio methods. In diffusion papers, the score usually means a gradient with respect to the data variable, such as \(\nabla_x\log p_t(x)\). Check the subscript on \(\nabla\).</div>
      `
    }
  );
})();
