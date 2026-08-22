(() => {
  const day15 = COURSE[5].lessons[0];

  day15.sections.push(
    {
      id: "residual-connections",
      title: "13. Residual connections create a direct signal path",
      html: String.raw`
        <p>A residual block does not ask a transformation to produce the whole next representation. A basic block computes</p>
        <p>\[y=x+F(x;\theta).\]</p>
        <p>The term \(x\) is the <strong>skip path</strong> or identity path. The function \(F\) is the residual branch.</p>
        <h3>Forward example</h3>
        <p>If</p>
        <p>\[x=\begin{bmatrix}2\\-1\end{bmatrix},\qquad F(x)=\begin{bmatrix}0.3\\0.2\end{bmatrix},\]</p>
        <p>then</p>
        <p>\[y=\begin{bmatrix}2.3\\-0.8\end{bmatrix}.\]</p>
        <p>The block can therefore make a small correction to an existing representation.</p>
        <h3>Backward path</h3>
        <p>The Jacobian is</p>
        <p>\[\frac{\partial y}{\partial x}=I+J_F.\]</p>
        <p>If \(g_y=\partial L/\partial y\), then</p>
        <p>\[g_x=(I+J_F)^\top g_y=g_y+J_F^\top g_y.\]</p>
        <p>The gradient has a direct identity contribution \(g_y\). It does not have to pass only through the residual branch.</p>
        <h3>Scalar example</h3>
        <p>If \(F(x)=0.1x\), then \(y=1.1x\) and \(dy/dx=1.1\). Without the skip path, the derivative would be only \(0.1\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Residual networks made very deep architectures easier to optimize. Transformers also use residual paths around attention and feed-forward sublayers.</div>
        <div class="shape-check"><strong>Shape check.</strong> The addition requires \(x\) and \(F(x)\) to have compatible shapes. If channel or hidden dimensions change, architectures often use a projection on the skip path.</div>
      `
    },
    {
      id: "dropout",
      title: "14. Dropout changes the signal randomly during training",
      html: String.raw`
        <p>Dropout multiplies activations by a random mask. Let \(m_i\sim\operatorname{Bernoulli}(p)\), where \(p\) is the probability that a unit is kept.</p>
        <p>Without rescaling,</p>
        <p>\[\widetilde a_i=m_i a_i.\]</p>
        <p>The expected activation is</p>
        <p>\[\mathbb E[\widetilde a_i]=p a_i.\]</p>
        <p>Thus, plain dropout reduces the expected signal during training.</p>
        <h3>Numerical example</h3>
        <p>Let \(a=(2,4,6,8)\) and \(p=0.5\). One sampled mask can be \(m=(1,0,1,0)\), giving</p>
        <p>\[\widetilde a=(2,0,6,0).\]</p>
        <p>Across many masks, the expected vector is</p>
        <p>\[\mathbb E[\widetilde a]=(1,2,3,4)=0.5a.\]</p>
        <h3>Inverted dropout</h3>
        <p>Most modern implementations use</p>
        <p>\[\widetilde a_i=\frac{m_i}{p}a_i\]</p>
        <p>during training. Then</p>
        <p>\[\mathbb E[\widetilde a_i]=a_i.\]</p>
        <p>With \(p=0.5\), kept activations are multiplied by 2. The same mask above gives \((4,0,12,0)\), whose expectation over masks is the original \(a\).</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> A dropout rate of 0.1 can mean “drop 10%,” while some mathematical notation uses \(p\) as the keep probability. Read the definition before substituting numbers.</div>
        <div class="shape-check"><strong>Mask shape.</strong> Standard element-wise dropout can use a mask with the activation shape. Variants can share a mask across channels, tokens, features, or entire residual branches.</div>
      `
    },
    {
      id: "dropout-variance",
      title: "15. Preserving the mean does not preserve the variance",
      html: String.raw`
        <p>Inverted dropout preserves expected activation, but it increases variance because the random mask adds noise.</p>
        <p>For a fixed scalar activation \(a\) and keep probability \(p\),</p>
        <p>\[\widetilde a=\frac{m}{p}a.\]</p>
        <p>We have \(\mathbb E[\widetilde a]=a\). Also,</p>
        <p>\[\mathbb E[\widetilde a^2]=\frac{a^2}{p}.\]</p>
        <p>Therefore,</p>
        <p>\[\operatorname{Var}(\widetilde a)=a^2\left(\frac1p-1\right).\]</p>
        <h3>Numerical example</h3>
        <p>Let \(a=3\) and \(p=0.75\). The output is 4 with probability 0.75 and 0 with probability 0.25. Its mean is 3. Its variance is</p>
        <p>\[9\left(\frac1{0.75}-1\right)=3.\]</p>
        <p>So dropout is not neutral to signal statistics even when its expectation is preserved.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Dropout behaves differently from deterministic weight scaling. It injects multiplicative noise during training. This can interact with normalization and residual branches.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not say that inverted dropout “keeps activations unchanged.” It keeps their expectation unchanged under the mask distribution. Individual training passes are different.</div>
      `
    },
    {
      id: "gradient-clipping",
      title: "16. Gradient clipping limits update scale after backpropagation",
      html: String.raw`
        <p>Initialization and architecture try to prevent unstable gradients. Gradient clipping is a direct safeguard when gradients still become too large.</p>
        <p>For global-norm clipping with threshold \(c\), let the full gradient be \(g\). Define</p>
        <p>\[\widetilde g=g\min\left(1,\frac{c}{\|g\|_2}\right).\]</p>
        <p>If \(\|g\|_2\le c\), nothing changes. If the norm is larger than \(c\), the direction is preserved but the norm becomes \(c\).</p>
        <h3>Numerical example</h3>
        <p>Let \(g=(6,8)\), so \(\|g\|_2=10\). With \(c=5\),</p>
        <p>\[\widetilde g=\frac5{10}(6,8)=(3,4).\]</p>
        <p>The clipped norm is 5.</p>
        <h3>Element-wise clipping is different</h3>
        <p>If we instead clip each entry to \([-5,5]\), the same vector becomes \((5,5)\). Its direction changes. These are different algorithms.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Recurrent networks and large-sequence models often use global gradient-norm clipping. A methods section can list a clipping threshold because rare exploding gradients can destabilize training.</div>
        <div class="shape-check"><strong>Reading rule.</strong> Ask whether the norm is computed per parameter tensor, per example, per device, or over all model parameters. Distributed training can make this detail important.</div>
      `
    },
    {
      id: "dead-relu",
      title: "17. A ReLU can become inactive and stop receiving local gradient",
      html: String.raw`
        <p>A ReLU unit outputs</p>
        <p>\[a=\max(0,z).\]</p>
        <p>For \(z<0\), both the activation and its local derivative are zero. If training moves a unit so that it is negative for almost all inputs, the unit can become a <strong>dead ReLU</strong>.</p>
        <h3>Numerical example</h3>
        <p>Suppose \(z=wx+b\) with \(w=0.1\), \(b=-10\), and inputs in \([-1,1]\). Then \(z\) lies approximately between \(-10.1\) and \(-9.9\). ReLU outputs zero throughout this range.</p>
        <p>Because \(\phi'(z)=0\), the local path gives no gradient to \(w\) or \(b\) from these examples.</p>
        <h3>Leaky activations</h3>
        <p>A leaky ReLU uses a small negative-side slope:</p>
        <p>\[\phi(z)=\begin{cases}z,&z\ge0,\\\alpha z,&z<0,\end{cases}\]</p>
        <p>with \(\alpha>0\). Then negative units still pass a small gradient.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Activation choice is part of signal propagation. ReLU avoids sigmoid saturation on its positive side, but it introduces a zero-gradient region on the negative side.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A zero ReLU activation at one example does not mean the neuron is permanently dead. “Dead” usually means it remains inactive for nearly all relevant inputs.</div>
      `
    },
    {
      id: "gating",
      title: "18. Gates create learned paths for information and gradients",
      html: String.raw`
        <p>A gate multiplies a signal by a learned value, usually between 0 and 1. A simple gated update is</p>
        <p>\[h'=g\odot u+(1-g)\odot h,\]</p>
        <p>where \(g=\sigma(r)\), and all vectors have shape \(d\).</p>
        <p>If \(g_j\) is near 1, coordinate \(j\) mostly uses the candidate \(u_j\). If it is near 0, the update mostly preserves \(h_j\).</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[h=(10,2),\qquad u=(4,8),\qquad g=(0.25,0.75).\]</p>
        <p>Then</p>
        <p>\[h'=(0.25)(4,8)+(0.75,0.25)\odot(10,2)=(8.5,6.5).\]</p>
        <p>The first coordinate mostly keeps the old value. The second mostly accepts the candidate.</p>
        <h3>Gradient path</h3>
        <p>If we temporarily treat \(g\) and \(u\) as independent of \(h\), then</p>
        <p>\[\frac{\partial h'}{\partial h}=\operatorname{diag}(1-g).\]</p>
        <p>A small gate can therefore preserve a direct path from old state to new state. LSTM and GRU architectures use related ideas, although their full Jacobians also include derivatives through the gates and candidates.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Gating appears in recurrent networks, highway networks, mixture-of-experts routing, and gated feed-forward blocks. When a paper says a gate “controls information flow,” look for a multiplicative interpolation or mask.</div>
        <div class="shape-check"><strong>Shape check.</strong> Element-wise gating requires broadcast-compatible shapes. A scalar gate can control a whole vector, a vector gate can control coordinates, and token-wise gates can have shape \(B\times T\times1\) or \(B\times T\times d\).</div>
      `
    },
    {
      id: "design-system",
      title: "19. Initialization, activation, normalization, residual paths, and depth form one system",
      html: String.raw`
        <p>The main ideas in this chapter are not independent switches. They change the same forward and backward signals.</p>
        <p>Initialization sets the starting scale of \(W^{(\ell)}\). The activation changes the distribution and derivative of \(z^{(\ell)}\). Normalization directly changes activation statistics. Residual paths add identity-like routes. Dropout adds multiplicative noise. Gates create learned mixtures. Depth repeats all of these effects.</p>
        <h3>A useful reading sequence</h3>
        <ol>
          <li>Write the layer equation and tensor shapes.</li>
          <li>Identify the activation and its derivative range.</li>
          <li>Find the initialization distribution, fan mode, and gain.</li>
          <li>Identify any normalization and the axes over which it computes statistics.</li>
          <li>Find residual or gated paths that bypass nonlinear transformations.</li>
          <li>Check whether dropout or stochastic depth changes training-time scale.</li>
          <li>Look for gradient clipping or other optimizer safeguards.</li>
          <li>Ask how these effects repeat across the stated depth.</li>
        </ol>
        <h3>Mini architecture example</h3>
        <p>Consider a pre-normalization transformer block:</p>
        <p>\[u=x+\operatorname{Attention}(\operatorname{LN}(x)),\]</p>
        <p>\[y=u+\operatorname{MLP}(\operatorname{LN}(u)).\]</p>
        <p>Layer normalization controls input statistics for each sublayer. The two residual additions provide direct skip paths. The MLP activation and weight initialization still affect the residual branch, but the main representation does not have to pass only through those nonlinear branches.</p>
        <div class="paper-connection"><strong>Final paper connection.</strong> When a new architecture claims “better signal propagation,” do not ask only which initialization it uses. Ask which complete combination of initialization, activation, normalization placement, residual scaling, gating, dropout, optimizer, and depth was studied.</div>
        <div class="shape-check"><strong>Final shape rule.</strong> Signal-propagation equations often suppress batch, token, head, channel, or spatial dimensions. Restore them before you compare two methods. Two formulas that look identical can normalize or gate very different axes.</div>
      `
    }
  );
})();
