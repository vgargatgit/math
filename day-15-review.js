(() => {
  const day15 = COURSE[5].lessons[0];

  day15.sections.push(
    {
      id: "signal-propagation-traps",
      title: "20. Common paper-reading mistakes in signal propagation",
      html: String.raw`
        <p>Signal-propagation arguments often look simple because they reduce a large network to a few statistics. Use these checks before you accept the conclusion.</p>
        <h3>Do not replace variance with norm without checking the assumptions</h3>
        <p>Variance is a distributional statistic. A vector norm is a property of one realized vector. They can be related in high dimensions, but they are not the same object.</p>
        <h3>Do not assume independence after training</h3>
        <p>Initialization analyses often assume independent weights and activations. Training creates dependencies. The calculation can still explain design intuition, but it is not an exact description of a trained network.</p>
        <h3>Do not use one initialization formula for every activation</h3>
        <p>Xavier and He initializations compensate for different activation behavior. A gain that works for tanh can be poor for ReLU, and a rule derived for ReLU can be imperfect for a gated or smooth activation.</p>
        <h3>Do not confuse average scale with directional stability</h3>
        <p>Stable activation variance does not imply that all singular values are near 1. Some directions can shrink while others grow.</p>
        <h3>Do not ignore normalization axes</h3>
        <p>Batch normalization and layer normalization use similar equations but different groups of values. The axis determines which coordinates are coupled and which statistics are shared.</p>
        <h3>Do not forget train versus inference behavior</h3>
        <p>Batch normalization commonly uses batch statistics during training and running estimates during inference. Dropout commonly changes activations only during training. A paper must evaluate the correct mode.</p>
        <h3>Do not call every skip path an identity path</h3>
        <p>If the skip path contains a projection, downsampling, learned scale, or gate, its Jacobian is not exactly \(I\).</p>
        <h3>Do not confuse gradient clipping with fixing the source of instability</h3>
        <p>Clipping limits the final gradient magnitude. It can stop destructive updates, but it does not make every internal Jacobian well-conditioned.</p>
        <div class="paper-connection"><strong>Practical reading rule.</strong> When a paper reports improved deep-network optimization, write down five things: activation, initialization, normalization, skip/gating structure, and gradient-management rule. Compare the full system, not one named component.</div>
      `
    },
    {
      id: "signal-propagation-recap",
      title: "21. Recap: preserve useful forward and backward signal",
      html: String.raw`
        <p>A deep network repeatedly applies an affine map and a nonlinear transformation:</p>
        <p>\[a^{(\ell)}=\phi\!\left(W^{(\ell)}a^{(\ell-1)}+b^{(\ell)}\right).\]</p>
        <p>In the forward pass, we care about whether activations remain numerically useful. In the backward pass, the chain rule produces products of layer Jacobians:</p>
        <p>\[J_{1:L}=J_LJ_{L-1}\cdots J_1.\]</p>
        <p>If these products shrink important directions, gradients vanish. If they expand directions too much, gradients explode.</p>
        <p>Variance propagation gives a first approximation. For a zero-mean affine layer under independence assumptions,</p>
        <p>\[\operatorname{Var}(z_i)\approx \text{fan-in}\cdot\operatorname{Var}(W_{ij})\cdot\operatorname{Var}(a_j).\]</p>
        <p>Xavier and He initialization choose weight scales to counter predictable changes in this quantity. Orthogonal initialization instead starts from controlled singular values. Dynamical-isometry analyses ask a stronger question: are many singular values of the end-to-end Jacobian close to 1?</p>
        <p>Normalization changes activation statistics explicitly. Residual connections add direct paths with Jacobians of the form \(I+J_F\). Dropout preserves expected activation under inverted scaling but adds variance. Gradient clipping limits unusually large gradients. ReLU avoids positive-side saturation but can create dead units. Gates learn how strongly old and new signals should mix.</p>
        <h3>A complete paper-reading example</h3>
        <p>Suppose a paper defines a depth-48 residual MLP:</p>
        <p>\[h_{\ell+1}=h_\ell+\alpha W_{2,\ell}\,\operatorname{GELU}(W_{1,\ell}\operatorname{LN}(h_\ell)).\]</p>
        <p>Assume \(h_\ell\in\mathbb R^d\), \(W_{1,\ell}\in\mathbb R^{m\times d}\), and \(W_{2,\ell}\in\mathbb R^{d\times m}\). Then the residual branch returns to shape \(d\), which is required for addition to \(h_\ell\).</p>
        <p>To understand its signal flow, ask how \(W_1\) and \(W_2\) are initialized, what gain is appropriate for GELU, how layer normalization changes the input distribution, how small \(\alpha\) keeps the residual correction controlled, and whether the identity path remains available through all 48 blocks.</p>
        <p>The main lesson is not that one technique guarantees stability. The lesson is that depth multiplies local effects, so architecture and initialization must be read as a coupled mathematical system.</p>
        <div class="paper-connection"><strong>Final reading rule.</strong> For every “stable training” claim, locate the equation that carries the signal, the statistic or norm used to define stability, the assumptions used in the derivation, and the experiment that checks the claim at the actual model depth.</div>
      `
    }
  );

  day15.examples = [
    ["Affine layer shape", String.raw`Let \(W\in\mathbb R^{64\times128}\), \(a\in\mathbb R^{128}\), and \(b\in\mathbb R^{64}\). Then \(z=Wa+b\in\mathbb R^{64}\). The layer has fan-in 128 and fan-out 64.`],
    ["Sigmoid saturation", String.raw`At \(z=0\), \(\sigma'(z)=0.25\). At \(z=6\), \(\sigma(6)\approx0.9975\), so \(\sigma'(6)\approx0.00247\). The saturated unit passes less than one hundredth of the local gradient scale available near zero.`],
    ["ReLU local derivative", String.raw`For preactivations \((-2,0.5,3)\), ReLU outputs \((0,0.5,3)\). Away from zero, the local derivative vector is \((0,1,1)\), so the first coordinate blocks its local backward signal.`],
    ["Repeated gradient shrinkage", String.raw`If ten similar scalar stages each contribute a local factor 0.7, then the product is \(0.7^{10}\approx0.0282\). A unit upstream can receive only about 2.8% of the downstream scale in this toy model.`],
    ["Repeated gradient growth", String.raw`If twelve stages each contribute factor 1.3, the product is \(1.3^{12}\approx23.3\). The same chain-rule mechanism can therefore create exploding gradients.`],
    ["Activation statistics", String.raw`For \(a=(-2,-1,1,2)\), the mean is 0 and the variance is \((4+1+1+4)/4=2.5\). After ReLU, \(a'=(0,0,1,2)\); the mean becomes 0.75, so the activation changes more than just the variance.`],
    ["Variance propagation", String.raw`With fan-in 200, input variance 0.5, and weight variance 0.01, the idealized preactivation variance is \(200(0.01)(0.5)=1\). Doubling weight variance would double this predicted variance.`],
    ["Xavier normal scale", String.raw`For fan-in 256 and fan-out 128, Xavier variance is \(2/(256+128)=1/192\approx0.00521\), so the normal standard deviation is about \(0.0722\).`],
    ["Xavier uniform scale", String.raw`For the same fan values, the uniform limit is \(\sqrt{6/384}=0.125\), so weights can be sampled from approximately \(\mathcal U(-0.125,0.125)\).`],
    ["He scale", String.raw`For a ReLU layer with fan-in 512, He variance is \(2/512=0.00390625\) and standard deviation is \(0.0625\).`],
    ["Orthogonal norm preservation", String.raw`For \(Q=\frac1{\sqrt2}\begin{bmatrix}1&-1\\1&1\end{bmatrix}\) and \(x=(1,1)^\top\), \(Qx=(0,\sqrt2)^\top\). Both vectors have norm \(\sqrt2\).`],
    ["Directional stretch", String.raw`For \(J=\operatorname{diag}(1.5,0.4)\), a perturbation \((1,0)^\top\) grows to norm 1.5, while \((0,1)^\top\) shrinks to norm 0.4. One average statistic cannot describe both directions.`],
    ["Batch normalization", String.raw`For one feature with batch values \((2,4,6,8)\), the mean is 5 and the variance is 5. Ignoring \(\varepsilon\), the normalized first value is \((2-5)/\sqrt5\approx-1.342\).`],
    ["Layer normalization", String.raw`For one hidden vector \((2,2,8)\), the mean is 4 and variance is \((4+4+16)/3=8\). Ignoring \(\varepsilon\), the normalized vector is approximately \((-0.707,-0.707,1.414)\).`],
    ["Mean derivative", String.raw`For a normalized group of size \(d=5\), changing any one coordinate by a small amount changes the mean with derivative \(1/5=0.2\). This is why normalization couples coordinates.`],
    ["Residual gradient path", String.raw`If a scalar residual branch has derivative \(F'(x)=-0.2\), then \(d(x+F(x))/dx=0.8\). Without the skip path the derivative would be \(-0.2\); the identity contribution changes gradient flow substantially.`],
    ["Inverted dropout expectation", String.raw`Let \(a=5\) and keep probability \(p=0.8\). Inverted dropout returns \(6.25\) with probability 0.8 and 0 with probability 0.2. Its expectation is \(0.8(6.25)=5\).`],
    ["Inverted dropout variance", String.raw`For the same \(a=5\) and \(p=0.8\), variance is \(25(1/0.8-1)=6.25\). Mean preservation did not preserve variance.`],
    ["Global gradient clipping", String.raw`For \(g=(2,-3,6)\), \(\|g\|_2=7\). With threshold 3.5, scale the whole vector by 0.5 to get \((1,-1.5,3)\).`],
    ["Dead ReLU", String.raw`If \(z=0.2x-5\) and all observed \(x\in[-2,2]\), then \(z\le-4.6\). ReLU is zero throughout this data range, so its local derivative is also zero.`],
    ["Gate interpolation", String.raw`With old state \(h=10\), candidate \(u=2\), and gate \(g=0.25\), the update \(h'=gu+(1-g)h\) gives \(0.25(2)+0.75(10)=8\).`],
    ["Residual block shapes", String.raw`If \(X\in\mathbb R^{32\times128}\), a residual branch must return a tensor broadcast-compatible with \(32\times128\) before \(X+F(X)\) is valid. A branch ending at width 256 needs a projection or another shape change.`]
  ];

  day15.practice = [
    String.raw`A dense layer has \(W\in\mathbb R^{80\times40}\). What are fan-in and fan-out? <details><summary>Answer</summary><p>For the convention \(z=Wa\), fan-in is 40 and fan-out is 80.</p></details>`,
    String.raw`Why can sigmoid cause vanishing gradients when \(|z|\) is large? <details><summary>Answer</summary><p>Its derivative \(\sigma(z)(1-\sigma(z))\) approaches zero in the saturated tails, so the chain rule repeatedly multiplies by small local factors.</p></details>`,
    String.raw`A scalar gradient is multiplied by 0.9 across 30 similar stages. What is the approximate total factor? <details><summary>Solution</summary><p>\(0.9^{30}\approx0.0424\). The gradient is about 4.2% of its downstream scale in this toy model.</p></details>`,
    String.raw`If \(J=\operatorname{diag}(2,0.25)\), what are its singular values and what do they mean? <details><summary>Answer</summary><p>The singular values are 2 and 0.25. One coordinate direction doubles while the other shrinks to one quarter.</p></details>`,
    String.raw`Under the independent zero-mean approximation, fan-in is 100, input variance is 2, and weight variance is 0.005. Find preactivation variance. <details><summary>Solution</summary><p>\(100(0.005)(2)=1\).</p></details>`,
    String.raw`For fan-in 128 and fan-out 128, what Xavier variance is used by the common symmetric formula? <details><summary>Solution</summary><p>\(2/(128+128)=1/128\approx0.0078125\).</p></details>`,
    String.raw`For a ReLU layer with fan-in 200, what is the He variance? <details><summary>Solution</summary><p>\(2/200=0.01\).</p></details>`,
    String.raw`What property makes an orthogonal square matrix attractive for signal propagation? <details><summary>Answer</summary><p>All singular values are 1, so it preserves Euclidean norm in every direction before activation effects are applied.</p></details>`,
    String.raw`Why is stable activation variance weaker than dynamical isometry? <details><summary>Answer</summary><p>Variance is an average statistic. Dynamical isometry asks that many singular values of the end-to-end Jacobian stay near 1, which controls directional stretch.</p></details>`,
    String.raw`Batch values for one feature are \((1,1,5,5)\). Find the batch mean. <details><summary>Solution</summary><p>The mean is \((1+1+5+5)/4=3\).</p></details>`,
    String.raw`For layer-normalized hidden vector \(h\in\mathbb R^{512}\), over how many coordinates is the simple per-token mean computed? <details><summary>Answer</summary><p>Over the 512 hidden coordinates for that normalized token/example, subject to the architecture's exact normalization definition.</p></details>`,
    String.raw`If \(\mu=(1/d)\sum_j h_j\), what is \(\partial\mu/\partial h_k\)? <details><summary>Answer</summary><p>\(1/d\).</p></details>`,
    String.raw`For \(y=x+F(x)\), what is the Jacobian with respect to \(x\)? <details><summary>Answer</summary><p>\(I+J_F\). The identity term is the direct skip-path contribution.</p></details>`,
    String.raw`With inverted dropout, keep probability is 0.5 and activation is 4. What value is produced when the unit is kept? <details><summary>Solution</summary><p>It is scaled by \(1/p=2\), so the kept value is 8.</p></details>`,
    String.raw`Does inverted dropout preserve variance? <details><summary>Answer</summary><p>No. It preserves expected activation under the mask distribution, but it adds variance. For fixed \(a\), variance is \(a^2(1/p-1)\).</p></details>`,
    String.raw`A gradient has norm 12 and global clipping threshold 3. By what factor is it scaled? <details><summary>Solution</summary><p>By \(3/12=0.25\).</p></details>`,
    String.raw`When is a ReLU unit called dead? <details><summary>Answer</summary><p>When its preactivation stays negative for nearly all relevant inputs, so its output and local derivative remain zero and it receives little or no learning signal through that path.</p></details>`,
    String.raw`For \(h'=gu+(1-g)h\), what happens when \(g=0\) and when \(g=1\)? <details><summary>Answer</summary><p>At \(g=0\), the old state is copied: \(h'=h\). At \(g=1\), the candidate is selected: \(h'=u\).</p></details>`,
    String.raw`A paper changes ReLU to GELU but leaves initialization unchanged. What should you check? <details><summary>Answer</summary><p>Check whether the initialization gain and variance assumptions still match GELU's forward moments and derivative statistics. Activation and initialization are coupled.</p></details>`,
    String.raw`A residual block maps \(B\times128\) to \(B\times256\). Can it add its output directly to the input? <details><summary>Answer</summary><p>No. The widths differ. The skip or residual path must project or otherwise change shape so the addition is valid.</p></details>`
  ];
})();
