(() => {
  const day15 = COURSE[5].lessons[0];

  day15.sections.push(
    {
      id: "orthogonal-initialization",
      title: "8. Orthogonal initialization controls directional stretch",
      html: String.raw`
        <p>Variance formulas track average scale. They do not tell us what happens in each direction. Singular values provide that information.</p>
        <p>A square matrix \(Q\) is orthogonal when</p>
        <p>\[Q^\top Q=I.\]</p>
        <p>Then every singular value of \(Q\) is 1, and</p>
        <p>\[\|Qx\|_2=\|x\|_2\]</p>
        <p>for every vector \(x\).</p>
        <h3>Numerical example</h3>
        <p>Take</p>
        <p>\[Q=\frac1{\sqrt2}\begin{bmatrix}1&-1\\1&1\end{bmatrix},\qquad x=\begin{bmatrix}3\\4\end{bmatrix}.\]</p>
        <p>The input norm is 5. Because \(Q\) is orthogonal, the output norm is also 5, although its coordinates change.</p>
        <p>Neural-network initialization can start from an orthogonal or semi-orthogonal matrix and then multiply it by a gain \(g\). The singular values then start near \(g\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Orthogonal initialization is common in recurrent networks and in studies of very deep networks because repeated multiplication makes directional stretch important.</div>
        <div class="shape-check"><strong>Rectangular case.</strong> A rectangular weight matrix cannot satisfy both \(W^\top W=I\) and \(WW^\top=I\) unless it is square. Papers can still use orthonormal columns or rows. Check which identity is possible from the shape.</div>
      `
    },
    {
      id: "singular-values",
      title: "9. Layer-Jacobian singular values describe gradient flow by direction",
      html: String.raw`
        <p>For one layer, the Jacobian is</p>
        <p>\[J_\ell=D^{(\ell)}W^{(\ell)}.\]</p>
        <p>The singular values of \(J_\ell\) tell us how much small perturbations are stretched in different directions.</p>
        <p>If a singular value is \(0.2\), one local direction shrinks by a factor of \(0.2\). If another is \(3\), another direction expands by a factor of 3.</p>
        <h3>Two-dimensional example</h3>
        <p>For</p>
        <p>\[J=\begin{bmatrix}2&0\\0&0.5\end{bmatrix},\]</p>
        <p>the singular values are \(2\) and \(0.5\). A perturbation along the first coordinate doubles, while a perturbation along the second coordinate halves.</p>
        <p>Across many layers, these directional effects multiply. Even if an average variance looks stable, a broad singular-value distribution can make some directions vanish and others explode.</p>
        <h3>Dynamical-isometry intuition</h3>
        <p><strong>Dynamical isometry</strong> is the idea that singular values of the input-output Jacobian stay close to 1. Then many perturbation directions pass through the network without severe shrinking or expansion.</p>
        <p>This is a stronger goal than merely preserving average variance.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> A paper can show that activation variance stays constant and still have poor optimization. Singular-value analysis can reveal directional instability that variance alone hides.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not confuse eigenvalues of \(W\) with singular values of a layer Jacobian. The Jacobian also includes activation derivatives, and singular values directly describe Euclidean stretch.</div>
      `
    },
    {
      id: "batch-normalization",
      title: "10. Batch normalization standardizes using batch statistics",
      html: String.raw`
        <p>Batch normalization changes the statistics that each layer receives. For one feature over a mini-batch of size \(B\), let the preactivations be \(z_1,\ldots,z_B\). Define</p>
        <p>\[\mu_B=\frac1B\sum_{i=1}^{B}z_i,\]</p>
        <p>\[\sigma_B^2=\frac1B\sum_{i=1}^{B}(z_i-\mu_B)^2.\]</p>
        <p>Then normalize:</p>
        <p>\[\widehat z_i=\frac{z_i-\mu_B}{\sqrt{\sigma_B^2+\varepsilon}},\]</p>
        <p>and apply learned scale and shift:</p>
        <p>\[y_i=\gamma\widehat z_i+\beta.\]</p>
        <h3>Numerical example</h3>
        <p>For one feature with batch values \((1,3,5,7)\), the mean is 4. The variance using divisor \(B=4\) is</p>
        <p>\[\frac{9+1+1+9}{4}=5.\]</p>
        <p>Ignoring \(\varepsilon\) for the arithmetic, the first normalized value is</p>
        <p>\[\frac{1-4}{\sqrt5}\approx-1.342.\]</p>
        <p>If \(\gamma=2\) and \(\beta=0.5\), the output is about \(-2.184\).</p>
        <div class="shape-check"><strong>Shape check.</strong> For dense activations \(Z\in\mathbb R^{B\times d}\), batch normalization usually computes one mean and variance per feature, so \(\mu_B,\sigma_B^2,\gamma,\beta\in\mathbb R^d\). For convolutional tensors, statistics are commonly shared across batch and spatial positions per channel.</div>
        <div class="paper-connection"><strong>ML connection.</strong> During training, batch statistics depend on other examples in the mini-batch. During inference, implementations usually use running estimates. This train-inference distinction is important when reading robustness or small-batch experiments.</div>
      `
    },
    {
      id: "layer-normalization",
      title: "11. Layer normalization standardizes within each example",
      html: String.raw`
        <p>Layer normalization uses a different axis. For one example with hidden vector \(h\in\mathbb R^d\), define</p>
        <p>\[\mu=\frac1d\sum_{j=1}^{d}h_j,\qquad \sigma^2=\frac1d\sum_{j=1}^{d}(h_j-\mu)^2.\]</p>
        <p>Then</p>
        <p>\[\widehat h_j=\frac{h_j-\mu}{\sqrt{\sigma^2+\varepsilon}},\qquad y_j=\gamma_j\widehat h_j+\beta_j.\]</p>
        <h3>Numerical example</h3>
        <p>For \(h=(1,2,3)\), the mean is 2 and the variance is</p>
        <p>\[\frac{1+0+1}{3}=\frac23.\]</p>
        <p>Ignoring \(\varepsilon\), the normalized vector is approximately</p>
        <p>\[(-1.225,0,1.225).\]</p>
        <p>Each example is normalized independently, so the result does not depend on the other examples in the mini-batch.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Transformers commonly use layer normalization because sequence modeling often needs stable behavior across variable batch sizes and because normalization can be applied per token representation.</div>
        <div class="shape-check"><strong>Axis warning.</strong> “Normalize” is incomplete. A paper must imply an axis or set of axes. Batch norm and layer norm can use almost identical formulas but compute their statistics over different dimensions.</div>
      `
    },
    {
      id: "normalization-derivatives",
      title: "12. Mean and variance derivatives couple coordinates",
      html: String.raw`
        <p>Normalization is not an element-wise operation. Changing one coordinate changes the mean and variance, which then changes every normalized coordinate.</p>
        <p>For</p>
        <p>\[\mu=\frac1d\sum_{j=1}^{d}h_j,\]</p>
        <p>we have</p>
        <p>\[\frac{\partial\mu}{\partial h_k}=\frac1d.\]</p>
        <p>For</p>
        <p>\[\sigma^2=\frac1d\sum_{j=1}^{d}(h_j-\mu)^2,\]</p>
        <p>a useful simplified derivative is</p>
        <p>\[\frac{\partial\sigma^2}{\partial h_k}=\frac{2}{d}(h_k-\mu).\]</p>
        <p>Therefore the Jacobian of normalization is generally dense. It is not a diagonal matrix like the Jacobian of an element-wise activation.</p>
        <h3>Small derivative example</h3>
        <p>Let \(h=(1,2,3)\), so \(d=3\) and \(\mu=2\). Then</p>
        <p>\[\frac{\partial\mu}{\partial h_1}=\frac13,\qquad \frac{\partial\sigma^2}{\partial h_1}=\frac23(1-2)=-\frac23.\]</p>
        <p>This dependence explains why backpropagation through normalization contains batch or feature-wide reductions.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> If authors derive a normalization layer, expect sums or means of upstream gradients in the backward equation. A purely element-wise derivative would miss the coupling created by \(\mu\) and \(\sigma^2\).</div>
        <div class="shape-check"><strong>Shape rule.</strong> Even though \(\mu\) and \(\sigma^2\) are scalars for one normalized group, their derivatives with respect to \(h\in\mathbb R^d\) are vectors of shape \(d\). The full normalization Jacobian is \(d\times d\).</div>
      `
    }
  );
})();
