const day15 = COURSE[5].lessons[0];

Object.assign(day15, {
  published: true,
  summary: "Track activation and gradient scale through deep networks, and understand why initialization, normalization, residual paths, dropout, clipping, and gating change signal flow.",
  explanation: "A deep network repeatedly transforms activations in the forward pass and gradients in the backward pass. Small scale errors can multiply across many layers. This chapter develops the mathematics that lets you read claims about stable initialization, vanishing or exploding gradients, normalization, residual networks, dropout, and gates without treating them as isolated tricks.",
  topics: [
    "Affine transformations",
    "Activation functions",
    "Saturation",
    "Local activation derivatives",
    "Vanishing and exploding gradients",
    "Products of Jacobians",
    "Gradient norms",
    "Activation means and variances",
    "Variance propagation",
    "Initialization assumptions",
    "Fan-in and fan-out",
    "Xavier/Glorot",
    "He initialization",
    "Orthogonal initialization",
    "Layer-Jacobian singular values",
    "Dynamical-isometry intuition",
    "Batch normalization",
    "Layer normalization",
    "Mean and variance derivatives",
    "Residual connections",
    "Skip paths",
    "Dropout",
    "Expected activation",
    "Inverted dropout",
    "Gradient clipping",
    "Dead ReLU units",
    "Gating",
    "Initialization-normalization-activation-depth relationship"
  ],
  sections: [
    {
      id: "signal-flow",
      title: "1. A deep network is a chain of signal transformations",
      html: String.raw`
        <p>Start with one feed-forward layer. Let the input activation be \(a^{(\ell-1)}\in\mathbb R^{d_{\ell-1}}\). The layer first applies an affine transformation:</p>
        <p>\[z^{(\ell)}=W^{(\ell)}a^{(\ell-1)}+b^{(\ell)},\]</p>
        <p>where \(W^{(\ell)}\in\mathbb R^{d_\ell\times d_{\ell-1}}\), \(b^{(\ell)}\in\mathbb R^{d_\ell}\), and \(z^{(\ell)}\in\mathbb R^{d_\ell}\). It then applies an activation function:</p>
        <p>\[a^{(\ell)}=\phi(z^{(\ell)}).\]</p>
        <p>The activation can be element-wise, as with ReLU or tanh, or it can couple entries, as with softmax. In this chapter, most signal-scale arguments use element-wise activations.</p>
        <h3>Concrete forward example</h3>
        <p>Take</p>
        <p>\[W=\begin{bmatrix}1&-1\\0.5&0.5\end{bmatrix},\qquad a=\begin{bmatrix}2\\1\end{bmatrix},\qquad b=\begin{bmatrix}0\\-0.5\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[z=Wa+b=\begin{bmatrix}1\\1\end{bmatrix}.\]</p>
        <p>With ReLU, \(\phi(t)=\max(0,t)\), the output is \(a'=\begin{bmatrix}1&1\end{bmatrix}^{\top}\).</p>
        <p>A deep network repeats this pattern many times. Thus, the numerical scale of one layer becomes the input scale of the next layer.</p>
        <div class="shape-check"><strong>Shape check.</strong> If a batch is stored as columns, \(A^{(\ell-1)}\in\mathbb R^{d_{\ell-1}\times B}\), then \(Z^{(\ell)}=W^{(\ell)}A^{(\ell-1)}+b^{(\ell)}\mathbf 1^\top\in\mathbb R^{d_\ell\times B}\). Some papers store examples as rows instead. Always recover the convention from the matrix product.</div>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> When a paper says that an initialization “preserves signal magnitude,” it usually means that statistics such as the mean, variance, or norm of \(a^{(\ell)}\) stay in a useful range as \(\ell\) increases.</div>
      `
    },
    {
      id: "saturation",
      title: "2. Activation derivatives control how much local gradient passes through",
      html: String.raw`
        <p>During backpropagation, an element-wise activation contributes a local derivative. If \(a_i=\phi(z_i)\), then</p>
        <p>\[\frac{\partial a_i}{\partial z_i}=\phi'(z_i).\]</p>
        <p>For ReLU,</p>
        <p>\[\phi'(z)=\begin{cases}1,&z>0,\\0,&z<0.\end{cases}\]</p>
        <p>For sigmoid, \(\sigma(z)=1/(1+e^{-z})\),</p>
        <p>\[\sigma'(z)=\sigma(z)(1-\sigma(z)).\]</p>
        <p>The sigmoid derivative is at most \(0.25\). It becomes very small when \(|z|\) is large. This region is called <strong>saturation</strong>.</p>
        <h3>Numerical example</h3>
        <p>At \(z=0\), \(\sigma(0)=0.5\), so \(\sigma'(0)=0.25\). At \(z=5\), \(\sigma(5)\approx0.9933\), so</p>
        <p>\[\sigma'(5)\approx0.9933(0.0067)\approx0.00665.\]</p>
        <p>A gradient that reaches this unit is multiplied by about \(0.00665\) before it passes through the activation.</p>
        <h3>Tanh has the same qualitative issue</h3>
        <p>For \(\tanh z\),</p>
        <p>\[\frac{d}{dz}\tanh z=1-\tanh^2z.\]</p>
        <p>At \(z=0\), the derivative is 1. At \(z=3\), \(\tanh(3)\approx0.995\), so the derivative is only about \(0.0099\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Older deep sigmoid networks often suffered from saturated hidden units. Modern networks often use ReLU-like activations, normalization, residual paths, or gating structures to improve gradient flow.</div>
        <div class="shape-check"><strong>Common notation trap.</strong> A paper can write \(D^{(\ell)}=\operatorname{diag}(\phi'(z^{(\ell)}))\). This is a \(d_\ell\times d_\ell\) Jacobian, not a vector. Implementations usually avoid building this diagonal matrix and use element-wise multiplication instead.</div>
      `
    },
    {
      id: "jacobian-products",
      title: "3. Vanishing and exploding gradients come from products of Jacobians",
      html: String.raw`
        <p>Suppose layer \(\ell\) computes</p>
        <p>\[a^{(\ell)}=\phi(W^{(\ell)}a^{(\ell-1)}+b^{(\ell)}).\]</p>
        <p>Its Jacobian with respect to the previous activation is</p>
        <p>\[J_\ell=\frac{\partial a^{(\ell)}}{\partial a^{(\ell-1)}}=D^{(\ell)}W^{(\ell)},\]</p>
        <p>where \(D^{(\ell)}=\operatorname{diag}(\phi'(z^{(\ell)}))\).</p>
        <p>Across many layers, the chain rule gives a product:</p>
        <p>\[\frac{\partial a^{(L)}}{\partial a^{(0)}}=J_LJ_{L-1}\cdots J_1.\]</p>
        <p>The backward gradient contains the transpose product in the reverse order.</p>
        <h3>A scalar toy model</h3>
        <p>If every layer locally multiplies a gradient by \(0.8\), then after 20 layers its scale is roughly</p>
        <p>\[0.8^{20}\approx0.0115.\]</p>
        <p>If every layer multiplies by \(1.2\), then after 20 layers the scale is</p>
        <p>\[1.2^{20}\approx38.3.\]</p>
        <p>This is the core idea behind vanishing and exploding gradients. Real networks are matrix-valued, so different directions can shrink or grow at different rates.</p>
        <h3>Norm bound</h3>
        <p>Using the spectral norm,</p>
        <p>\[\|J_L\cdots J_1\|_2\le\prod_{\ell=1}^{L}\|J_\ell\|_2.\]</p>
        <p>If most layer norms are below 1, the upper bound can decay exponentially. If many are well above 1, the product can become very large.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Statements about “gradient flow” often concern these Jacobian products. Look for singular values, spectral norms, gradient-norm plots, or depth-dependent variance analyses.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A small loss gradient at one layer does not by itself prove a vanishing-gradient problem. You need to examine how gradients change with depth and whether the small value prevents useful parameter updates.</div>
      `
    },
    {
      id: "activation-statistics",
      title: "4. Mean and variance are useful summaries of activation scale",
      html: String.raw`
        <p>A full activation vector contains many values. Signal-propagation analyses often summarize those values with a mean and variance.</p>
        <p>For a random activation coordinate \(A\), define</p>
        <p>\[\mu_A=\mathbb E[A],\qquad q_A=\operatorname{Var}(A)=\mathbb E[(A-\mu_A)^2].\]</p>
        <p>For a finite layer with \(d\) units, an empirical mean is</p>
        <p>\[\widehat\mu=\frac1d\sum_{i=1}^{d}a_i,\]</p>
        <p>and an empirical variance is</p>
        <p>\[\widehat q=\frac1d\sum_{i=1}^{d}(a_i-\widehat\mu)^2.\]</p>
        <h3>Numerical example</h3>
        <p>For activations \((1,-1,2,-2)\), the mean is 0 and</p>
        <p>\[\widehat q=\frac{1+1+4+4}{4}=2.5.\]</p>
        <p>Now apply ReLU. The values become \((1,0,2,0)\). The new mean is \(0.75\). ReLU changed both the mean and the variance because it removed negative values.</p>
        <h3>Why zero mean is often convenient</h3>
        <p>If inputs and weights are independent and both have zero mean, many cross terms vanish when we compute a variance. This makes theoretical formulas much simpler. It does not mean real trained activations are exactly independent or zero mean.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Initialization papers often track a quantity such as \(q_\ell=\mathbb E[(a_i^{(\ell)})^2]\) through depth. Normalization methods explicitly control sample statistics instead of relying only on initialization.</div>
        <div class="shape-check"><strong>Notation warning.</strong> Some papers use \(q\) for the second moment \(\mathbb E[A^2]\), not the variance. These are equal only when \(\mathbb E[A]=0\).</div>
      `
    },
    {
      id: "variance-propagation",
      title: "5. Variance propagation explains why weight scale matters",
      html: String.raw`
        <p>Consider one preactivation</p>
        <p>\[z_i=\sum_{j=1}^{n}w_{ij}a_j.\]</p>
        <p>Assume for this calculation that the \(w_{ij}\) and \(a_j\) are independent, each has mean zero, the activations have variance \(q\), and the weights have variance \(\sigma_w^2\). Then</p>
        <p>\[\operatorname{Var}(w_{ij}a_j)=\sigma_w^2q.\]</p>
        <p>If the terms are also independent across \(j\), variances add:</p>
        <p>\[\operatorname{Var}(z_i)=n\sigma_w^2q.\]</p>
        <p>The number \(n\) is the layer's <strong>fan-in</strong>: the number of inputs that contribute to one output unit.</p>
        <h3>Numerical example</h3>
        <p>Suppose \(n=100\), input variance is \(q=1\), and each weight has variance \(0.01\). Then</p>
        <p>\[\operatorname{Var}(z_i)=100(0.01)(1)=1.\]</p>
        <p>If the weight variance were \(0.1\), the preactivation variance would be 10. Repeating this growth across layers can push activations into unstable ranges or saturation.</p>
        <h3>The assumptions are an approximation</h3>
        <p>After training starts, weights and activations are not perfectly independent. Units can become correlated. Activation means can be nonzero. Convolution, attention, residual paths, and normalization add more structure. The simple variance equation is still useful because it gives a first-order design rule.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> When an initialization derivation states “assuming independent zero-mean activations,” do not skip that phrase. The final variance formula depends on those assumptions.</div>
        <div class="shape-check"><strong>Fan-out.</strong> If \(W\in\mathbb R^{m\times n}\), then fan-in is \(n\) and fan-out is \(m\) for a dense layer. Convolutional definitions also include receptive-field size.</div>
      `
    },
    {
      id: "xavier",
      title: "6. Xavier initialization balances scale for roughly symmetric activations",
      html: String.raw`
        <p>Xavier, also called Glorot, initialization was designed to keep forward and backward scales from changing too much in networks with activations such as tanh.</p>
        <p>A common normal form uses</p>
        <p>\[\operatorname{Var}(W_{ij})=\frac{2}{\text{fan-in}+\text{fan-out}}.\]</p>
        <p>A common uniform form samples</p>
        <p>\[W_{ij}\sim\mathcal U\left(-\sqrt{\frac{6}{\text{fan-in}+\text{fan-out}}},\sqrt{\frac{6}{\text{fan-in}+\text{fan-out}}}\right).\]</p>
        <p>The two forms have the same target variance because a uniform variable on \([-a,a]\) has variance \(a^2/3\).</p>
        <h3>Numerical example</h3>
        <p>If fan-in is 100 and fan-out is 50, then</p>
        <p>\[\operatorname{Var}(W_{ij})=\frac{2}{150}\approx0.01333,\]</p>
        <p>so the normal standard deviation is</p>
        <p>\[\sqrt{0.01333}\approx0.1155.\]</p>
        <p>The uniform limit is</p>
        <p>\[\sqrt{\frac6{150}}=0.2.\]</p>
        <div class="paper-connection"><strong>ML connection.</strong> If a methods section says “Glorot uniform,” you should be able to reconstruct the scale from layer dimensions. Framework APIs can define fan values slightly differently for transposed weight layouts, so verify the implementation convention.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Xavier is not “the correct initialization for every network.” Its derivation uses assumptions about activation behavior and forward/backward variance. ReLU changes those assumptions.</div>
      `
    },
    {
      id: "he-initialization",
      title: "7. He initialization compensates for ReLU dropping about half the signal",
      html: String.raw`
        <p>For a symmetric zero-mean preactivation, ReLU sets roughly half the values to zero. A common approximation is</p>
        <p>\[\mathbb E[\operatorname{ReLU}(Z)^2]\approx\frac12\mathbb E[Z^2].\]</p>
        <p>To compensate for this factor, He initialization uses approximately</p>
        <p>\[\operatorname{Var}(W_{ij})=\frac{2}{\text{fan-in}}.\]</p>
        <p>The corresponding normal standard deviation is</p>
        <p>\[\sqrt{\frac{2}{\text{fan-in}}}.\]</p>
        <h3>Numerical example</h3>
        <p>For fan-in \(=256\),</p>
        <p>\[\operatorname{Var}(W_{ij})=\frac2{256}=0.0078125,\]</p>
        <p>and</p>
        <p>\[\operatorname{Std}(W_{ij})\approx0.0884.\]</p>
        <p>If the incoming second moment is about 1, the affine step produces a preactivation second moment near 2, and the ReLU step reduces it back toward 1 under the idealized assumptions.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Deep ReLU networks often use He/Kaiming initialization. If a paper changes the activation to GELU, SiLU, leaky ReLU, or a gated unit, the ideal gain can change because the activation changes signal statistics.</div>
        <div class="shape-check"><strong>Reading rule.</strong> An initialization name is incomplete without the distribution, fan mode, gain, and weight-layout convention. “Kaiming normal, fan-in” carries more information than “He init.”</div>
      `
    }
  ]
});
