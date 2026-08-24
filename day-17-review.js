(() => {
  const day17 = COURSE[6].lessons[1];

  day17.sections.push(
    {
      id: "convolution-gradients",
      title: "15. Convolution gradients reuse the same local structure in reverse",
      html: String.raw`
        <p>A convolutional layer is differentiable with respect to both its input and its kernel weights. Backpropagation asks how a small change in either object changes the loss.</p>

        <h3>Start with a tiny one-dimensional cross-correlation</h3>
        <p>Let</p>
        <p>\[x=(x_1,x_2,x_3),\qquad k=(k_1,k_2).\]</p>
        <p>Use valid cross-correlation:</p>
        <p>\[
        y_1=k_1x_1+k_2x_2,
        \qquad
        y_2=k_1x_2+k_2x_3.
        \]</p>
        <p>Let the upstream gradients be</p>
        <p>\[
        g_1=\frac{\partial L}{\partial y_1},
        \qquad
        g_2=\frac{\partial L}{\partial y_2}.
        \]</p>

        <h3>Gradient with respect to the kernel</h3>
        <p>The first kernel weight appears in both outputs:</p>
        <p>\[
        \frac{\partial L}{\partial k_1}
        =g_1x_1+g_2x_2.
        \]</p>
        <p>The second kernel weight also appears in both outputs:</p>
        <p>\[
        \frac{\partial L}{\partial k_2}
        =g_1x_2+g_2x_3.
        \]</p>
        <p>This is an important consequence of weight sharing. One parameter is reused at several spatial positions, so its gradient is the sum of contributions from all those uses.</p>

        <h3>Numerical kernel-gradient example</h3>
        <p>Let</p>
        <p>\[x=(1,2,4),\qquad g=(3,-1).\]</p>
        <p>Then</p>
        <p>\[
        \frac{\partial L}{\partial k_1}=3(1)+(-1)(2)=1,
        \]</p>
        <p>and</p>
        <p>\[
        \frac{\partial L}{\partial k_2}=3(2)+(-1)(4)=2.
        \]</p>
        <p>Therefore</p>
        <p>\[\frac{\partial L}{\partial k}=(1,2).\]</p>

        <h3>Gradient with respect to the input</h3>
        <p>Each input value receives gradient from every output window that used it:</p>
        <p>\[
        \frac{\partial L}{\partial x_1}=g_1k_1,
        \]</p>
        <p>\[
        \frac{\partial L}{\partial x_2}=g_1k_2+g_2k_1,
        \]</p>
        <p>\[
        \frac{\partial L}{\partial x_3}=g_2k_2.
        \]</p>

        <h3>Numerical input-gradient example</h3>
        <p>Let \(k=(2,-1)\) and \(g=(3,-1)\). Then</p>
        <p>\[
        \frac{\partial L}{\partial x_1}=3(2)=6,
        \]</p>
        <p>\[
        \frac{\partial L}{\partial x_2}=3(-1)+(-1)(2)=-5,
        \]</p>
        <p>and</p>
        <p>\[
        \frac{\partial L}{\partial x_3}=(-1)(-1)=1.
        \]</p>
        <p>Thus</p>
        <p>\[\frac{\partial L}{\partial x}=(6,-5,1).\]</p>

        <h3>Matrix interpretation</h3>
        <p>If the forward operation is</p>
        <p>\[y=T(k)x,\]</p>
        <p>then reverse-mode differentiation gives</p>
        <p>\[
        \frac{\partial L}{\partial x}=T(k)^\top\frac{\partial L}{\partial y}.
        \]</p>
        <p>The transpose explains why input-gradient code looks like a related convolution with changed padding and kernel orientation.</p>

        <h3>Bias gradient</h3>
        <p>If one output channel adds the same bias \(b_o\) at every spatial position, then</p>
        <p>\[
        \frac{\partial L}{\partial b_o}
        =\sum_{i,j}\frac{\partial L}{\partial Y[o,i,j]}.
        \]</p>
        <p>The shared bias receives a sum across all positions and batch examples where it was used.</p>

        <h3>Shape reasoning for a standard 2-D layer</h3>
        <p>If</p>
        <p>\[
        W\in\mathbb R^{C_{\text{out}}\times C_{\text{in}}\times K_h\times K_w},
        \]</p>
        <p>then</p>
        <p>\[
        \frac{\partial L}{\partial W}
        \in\mathbb R^{C_{\text{out}}\times C_{\text{in}}\times K_h\times K_w}.
        \]</p>
        <p>The gradient has exactly the same shape as the parameter tensor.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Papers on transposed convolution, deconvolution, saliency, inverse problems, and custom CUDA kernels often rely on these adjoint relationships. “Transposed convolution” is named after the transpose of the linear operator matrix. It is not generally the inverse of convolution.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A transposed convolution is not automatically an exact inverse. It applies the transpose or adjoint structure with specified stride and padding conventions.</div>
      `
    },
    {
      id: "common-mistakes",
      title: "16. Common mistakes when you read convolution and signal-processing equations",
      html: String.raw`
        <h3>Mistake 1: assume every “convolution” flips the kernel</h3>
        <p>Deep-learning libraries usually use cross-correlation. Classical convolution reverses one argument. Check the definition.</p>

        <h3>Mistake 2: calculate output shape without dilation</h3>
        <p>Use the effective kernel size \(d(k-1)+1\). A dilation-2 kernel of stored size 3 covers five positions.</p>

        <h3>Mistake 3: forget the floor in the output-size formula</h3>
        <p>If stride does not tile the padded input exactly, the final partial window is normally not used.</p>

        <h3>Mistake 4: mix data-layout conventions</h3>
        <p>\(B\times C\times H\times W\) and \(B\times H\times W\times C\) describe the same kinds of axes in different orders. Never compare tensor dimensions until you identify the convention.</p>

        <h3>Mistake 5: think each output channel sees only one input channel</h3>
        <p>A standard convolution sums across all input channels. Depthwise convolution is a special case that changes this rule.</p>

        <h3>Mistake 6: confuse feature-map size with receptive field</h3>
        <p>Feature-map size describes how many output positions exist. Receptive field describes how much original input can influence one position.</p>

        <h3>Mistake 7: say convolution is translation invariant</h3>
        <p>The basic shared-weight local operation is translation equivariant. Invariance requires an output that does not change with translation.</p>

        <h3>Mistake 8: assume stride is harmless subsampling</h3>
        <p>Stride discards positions. Without suitable filtering, high-frequency content can alias.</p>

        <h3>Mistake 9: treat the Fourier transform as information loss</h3>
        <p>The exact DFT is invertible. It changes coordinates. Information is lost only when coefficients are removed, approximated, quantized, or otherwise altered.</p>

        <h3>Mistake 10: interpret a frequency index without its normalization</h3>
        <p>A bin index \(k\), angular frequency \(\omega\), cycles per pixel, and normalized frequency are different coordinate systems.</p>

        <h3>Mistake 11: think “low pass” means low pixel values</h3>
        <p>Low frequency means slow spatial or temporal variation. A bright constant image has high values but only a zero-frequency component.</p>

        <h3>Mistake 12: call transposed convolution an inverse convolution</h3>
        <p>The transpose of a linear operator is its adjoint, not normally its inverse. The two are equal only under special conditions.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "17. A paper-reading workflow for CNN and signal-processing sections",
      html: String.raw`
        <p>Use this sequence when a paper introduces a convolutional block.</p>
        <ol>
          <li><strong>Write the input shape.</strong> Include batch, channel, height, and width axes.</li>
          <li><strong>Write the kernel shape.</strong> Identify input channels, output channels, and spatial kernel dimensions.</li>
          <li><strong>Write stride, padding, and dilation.</strong> Do not infer them from the word “convolution.”</li>
          <li><strong>Compute the output spatial size.</strong> Verify the paper's stated feature-map dimensions.</li>
          <li><strong>Identify the local equation.</strong> Determine whether it is cross-correlation, true convolution, depthwise convolution, grouped convolution, or another structured operator.</li>
          <li><strong>Track the receptive field.</strong> Ask how much original context a deeper feature can use.</li>
          <li><strong>Identify downsampling.</strong> Check for stride, pooling, patch merging, or resize operations.</li>
          <li><strong>Ask about aliasing.</strong> If resolution decreases, identify any low-pass or smoothing step before sample removal.</li>
          <li><strong>Switch to the frequency view when useful.</strong> Smoothing and edge filters often become clearer as frequency-selective operations.</li>
          <li><strong>Check the backward operator.</strong> For a custom layer, verify parameter-gradient and input-gradient shapes.</li>
        </ol>

        <h3>Shape trace for a realistic CNN block</h3>
        <p>Suppose</p>
        <p>\[
        X\in\mathbb R^{B\times32\times64\times64}.
        \]</p>
        <p>Apply a standard \(3\times3\) convolution with 64 output channels, padding 1, and stride 2.</p>
        <p>The weight tensor has shape</p>
        <p>\[
        W\in\mathbb R^{64\times32\times3\times3}.
        \]</p>
        <p>The spatial output size is</p>
        <p>\[
        H_{\text{out}}=W_{\text{out}}
        =\left\lfloor\frac{64+2-3}{2}+1\right\rfloor
        =32.
        \]</p>
        <p>Therefore</p>
        <p>\[
        Y\in\mathbb R^{B\times64\times32\times32}.
        \]</p>
        <p>The layer doubled the channel count and halved each spatial dimension.</p>
        <p>The number of kernel weights is</p>
        <p>\[
        64\times32\times3\times3=18{,}432.
        \]</p>
        <p>This count does not depend on \(64\times64\) input resolution because the same weights are shared across positions.</p>
        <div class="paper-connection"><strong>Core reading habit.</strong> If you can reproduce this one-line shape and parameter trace for every block in a vision paper, architecture diagrams become much easier to verify.</div>
      `
    },
    {
      id: "day17-recap",
      title: "18. Recap",
      html: String.raw`
        <ul>
          <li>A discrete signal stores values at indexed locations.</li>
          <li>Cross-correlation slides a kernel without reversing it.</li>
          <li>Mathematical convolution reverses one argument, but CNN libraries often use cross-correlation under the name convolution.</li>
          <li>A kernel is a small local weight array. A learned CNN filter reuses those weights across positions.</li>
          <li>Padding changes boundary coverage. Stride changes sampling density. Dilation changes spacing inside the kernel.</li>
          <li>A standard convolution sums local responses across input channels to create each output channel.</li>
          <li>Receptive field measures which original input locations can affect one output unit.</li>
          <li>Pooling summarizes local regions and often reduces resolution.</li>
          <li>Shared weights give convolution a translation-equivariant structure, subject to boundaries and sampling effects.</li>
          <li>A convolution can be written as multiplication by a structured Toeplitz-like matrix.</li>
          <li>The DFT changes from location coordinates to frequency coordinates.</li>
          <li>The convolution theorem turns convolution into element-wise multiplication in the frequency domain.</li>
          <li>Low-pass filters suppress rapid changes. Difference filters suppress constant components and emphasize changes.</li>
          <li>Downsampling without suitable filtering can cause aliasing.</li>
          <li>Convolution gradients sum contributions across every location where a shared weight or input value was used.</li>
          <li>A transposed convolution is related to the transpose of the convolution operator. It is not generally an inverse.</li>
        </ul>
      `
    }
  );

  day17.examples = [
    ["Valid cross-correlation", String.raw`For \(x=(1,2,3,4)\) and \(k=(2,-1)\), valid cross-correlation gives \((0,1,2)\).`],
    ["Dilated effective size", String.raw`A kernel with stored size \(k=5\) and dilation \(d=3\) has effective size \(3(5-1)+1=13\).`],
    ["Channel parameter count", String.raw`A \(3\times3\) convolution from 16 input channels to 48 output channels has \(48\times16\times3\times3=6{,}912\) kernel weights.`],
    ["Receptive field", String.raw`Three stride-1 \(3\times3\) convolutions have receptive-field width \(7\): \(1\to3\to5\to7\).`],
    ["Global average pooling", String.raw`If one \(2\times2\) feature channel is \(\begin{bmatrix}1&3\\5&7\end{bmatrix}\), global average pooling returns \((1+3+5+7)/4=4\).`],
    ["Aliasing", String.raw`The alternating sequence \((1,-1,1,-1,1,-1)\) becomes \((1,1,1)\) when every second sample is retained. The rapid oscillation disappears from the sampled signal.`],
    ["Kernel gradient", String.raw`For \(x=(1,2,4)\) and upstream gradients \(g=(3,-1)\), the valid two-tap kernel gradient is \((3\cdot1-1\cdot2,\;3\cdot2-1\cdot4)=(1,2)\).`]
  ];

  day17.practice = [
    String.raw`For \(x=(2,1,3,0)\) and kernel \(k=(1,2)\), compute valid cross-correlation.<details><summary>Answer</summary><p>The outputs are \(2+2(1)=4\), \(1+2(3)=7\), and \(3+2(0)=3\). Thus \((4,7,3)\).</p></details>`,
    String.raw`Using the same \(x\) and \(k\), what kernel order is used for mathematical convolution?<details><summary>Answer</summary><p>The kernel is reversed, so the sliding kernel is \((2,1)\).</p></details>`,
    String.raw`An input has length \(20\), kernel size \(5\), padding \(2\), stride \(2\), and dilation \(1\). What is the output length?<details><summary>Answer</summary><p>\[\left\lfloor\frac{20+4-5}{2}+1\right\rfloor=\left\lfloor10.5\right\rfloor=10.\]</p></details>`,
    String.raw`A stored kernel has size \(4\) and dilation \(3\). What is its effective size?<details><summary>Answer</summary><p>\(3(4-1)+1=10\).</p></details>`,
    String.raw`A convolution has 24 input channels, 40 output channels, and a \(5\times5\) kernel. How many kernel weights does it have?<details><summary>Answer</summary><p>\(40\times24\times5\times5=24{,}000\) weights.</p></details>`,
    String.raw`Why does the parameter count of a standard convolution not grow with image width and height?<details><summary>Answer</summary><p>The same kernel parameters are shared at every spatial location.</p></details>`,
    String.raw`Two stride-1 \(5\times5\) convolutions are stacked with dilation 1. What is the receptive-field width along one axis?<details><summary>Answer</summary><p>Start from 1. The first layer gives 5. The second adds 4 more, so the width is 9.</p></details>`,
    String.raw`What is the output of max pooling on the patch \(\begin{bmatrix}-1&3\\2&0\end{bmatrix}\)?<details><summary>Answer</summary><p>The maximum is \(3\).</p></details>`,
    String.raw`State the difference between translation equivariance and translation invariance.<details><summary>Answer</summary><p>Equivariance means a translated input produces a correspondingly translated output. Invariance means the output itself does not change under the translation.</p></details>`,
    String.raw`For valid cross-correlation with kernel \((a,b)\) on a length-5 input, what is the shape of the Toeplitz-style operator matrix?<details><summary>Answer</summary><p>There are \(5-2+1=4\) outputs and 5 inputs, so the matrix shape is \(4\times5\).</p></details>`,
    String.raw`What is the DFT of the constant length-4 signal \((2,2,2,2)\)?<details><summary>Answer</summary><p>Only the zero-frequency coefficient is nonzero: \((8,0,0,0)\).</p></details>`,
    String.raw`Why does the averaging kernel \((1/2,1/2)\) suppress the local alternating pattern \((3,-3)\)?<details><summary>Answer</summary><p>The response is \((1/2)3+(1/2)(-3)=0\). The positive and negative adjacent samples cancel.</p></details>`,
    String.raw`Downsample \((0,1,2,3,4,5,6,7)\) by factor 2 using even indices.<details><summary>Answer</summary><p>The result is \((0,2,4,6)\).</p></details>`,
    String.raw`Why can stride-2 sampling break exact one-pixel translation equivariance?<details><summary>Answer</summary><p>A one-pixel shift changes which phase of the input grid is retained. The sampled values can change rather than simply shift by one output position.</p></details>`,
    String.raw`For \(y_1=k_1x_1+k_2x_2\) and \(y_2=k_1x_2+k_2x_3\), write \(\partial L/\partial k_1\) using upstream gradients \(g_1,g_2\).<details><summary>Answer</summary><p>\[\frac{\partial L}{\partial k_1}=g_1x_1+g_2x_2.\]</p></details>`,
    String.raw`Why do shared convolution weights cause gradient contributions to add across spatial positions?<details><summary>Answer</summary><p>The same parameter participates in several output calculations. The chain rule adds the loss derivative from every path that uses that parameter.</p></details>`,
    String.raw`If \(W\) has shape \(64\times32\times3\times3\), what shape must \(\partial L/\partial W\) have?<details><summary>Answer</summary><p>The same shape: \(64\times32\times3\times3\).</p></details>`
  ];
})();
