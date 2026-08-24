(() => {
  const day17 = COURSE[6].lessons[1];

  day17.sections.push(
    {
      id: "channels",
      title: "6. Convolution combines spatial neighborhoods across input channels",
      html: String.raw`
        <p>A practical CNN layer usually has several input channels and several output channels. The kernel therefore needs channel axes in addition to spatial axes.</p>
        <p>For one image, use the shape convention</p>
        <p>\[X\in\mathbb R^{C_{\text{in}}\times H\times W}.\]</p>
        <p>Let the convolution weights be</p>
        <p>\[W\in\mathbb R^{C_{\text{out}}\times C_{\text{in}}\times K_h\times K_w}.\]</p>
        <p>Then the output has shape</p>
        <p>\[Y\in\mathbb R^{C_{\text{out}}\times H_{\text{out}}\times W_{\text{out}}}.\]</p>

        <h3>One output entry</h3>
        <p>Ignoring stride, dilation, and padding for one moment, an output value is</p>
        <p>\[
        Y[o,i,j]
        =b[o]
        +\sum_{c=0}^{C_{\text{in}}-1}
        \sum_{u=0}^{K_h-1}
        \sum_{v=0}^{K_w-1}
        W[o,c,u,v]X[c,i+u,j+v].
        \]</p>
        <p>The output channel \(o\) uses one kernel slice for every input channel. The results from all input channels are added.</p>

        <h3>Numerical example: two input channels</h3>
        <p>Suppose one local position contains two \(2\times2\) patches:</p>
        <p>\[
        P_1=\begin{bmatrix}1&2\\0&1\end{bmatrix},
        \qquad
        P_2=\begin{bmatrix}2&0\\1&3\end{bmatrix}.
        \]</p>
        <p>Let one output filter use</p>
        <p>\[
        K_1=\begin{bmatrix}1&0\\0&1\end{bmatrix},
        \qquad
        K_2=\begin{bmatrix}0&1\\-1&0\end{bmatrix}.
        \]</p>
        <p>The first channel contributes</p>
        <p>\[1(1)+0(2)+0(0)+1(1)=2.\]</p>
        <p>The second channel contributes</p>
        <p>\[0(2)+1(0)-1(1)+0(3)=-1.\]</p>
        <p>With zero bias, the output value is \(2+(-1)=1\).</p>

        <h3>Parameter count</h3>
        <p>A standard \(K_h\times K_w\) convolution has</p>
        <p>\[
        C_{\text{out}}C_{\text{in}}K_hK_w
        \]</p>
        <p>kernel parameters, plus \(C_{\text{out}}\) biases if biases are used.</p>
        <p>For \(C_{\text{in}}=32\), \(C_{\text{out}}=64\), and a \(3\times3\) kernel, the weight count is</p>
        <p>\[64\times32\times3\times3=18{,}432.\]</p>
        <p>The spatial image size does not appear in this parameter count. This is a consequence of weight sharing.</p>

        <h3>Depthwise and pointwise variants</h3>
        <p>A depthwise convolution applies a separate spatial kernel to each channel instead of summing across all input channels. A \(1\times1\) pointwise convolution then mixes channels at each spatial location.</p>
        <p>For a standard \(3\times3\) layer from 32 to 64 channels, the weight count is \(18{,}432\). A depthwise \(3\times3\) step needs</p>
        <p>\[32\times3\times3=288\]</p>
        <p>weights, and a \(1\times1\) pointwise step needs</p>
        <p>\[64\times32=2{,}048\]</p>
        <p>weights. The combined total is \(2{,}336\), which is much smaller.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Mobile CNNs and efficient vision architectures often separate spatial mixing from channel mixing. Shape annotations show which type of mixing each operation performs.</div>
        <div class="shape-check"><strong>Common mistake.</strong> An output channel is not computed from only one input channel in a standard convolution. It normally sums contributions from every input channel.</div>
      `
    },
    {
      id: "receptive-fields",
      title: "7. The receptive field tells which input locations can affect one output",
      html: String.raw`
        <p>The <strong>receptive field</strong> of a unit is the region of the original input that can affect that unit.</p>
        <p>A single \(3\times3\) convolution has a \(3\times3\) receptive field when dilation is one. Deeper layers can see larger regions because each layer combines already-localized features.</p>

        <h3>Two stacked \(3\times3\) layers</h3>
        <p>Assume stride 1 and no dilation. A unit in layer 1 sees 3 positions along one axis. A unit in layer 2 combines three neighboring layer-1 units. The union of their original input regions has width 5.</p>
        <p>Thus two \(3\times3\) convolutions have a \(5\times5\) receptive field.</p>

        <h3>Three stacked \(3\times3\) layers</h3>
        <p>Each additional stride-1 \(3\times3\) layer adds two positions to the receptive-field width:</p>
        <p>\[3\to5\to7.\]</p>
        <p>Therefore three such layers have a \(7\times7\) receptive field.</p>

        <h3>General recurrence with stride</h3>
        <p>It is useful to track two quantities:</p>
        <ul>
          <li>\(r_\ell\): receptive-field size at layer \(\ell\);</li>
          <li>\(j_\ell\): jump in original-input coordinates between neighboring layer-\(\ell\) units.</li>
        </ul>
        <p>Start with</p>
        <p>\[r_0=1,\qquad j_0=1.\]</p>
        <p>For effective kernel size \(k_{\ell,\text{eff}}\) and stride \(s_\ell\),</p>
        <p>\[
        r_\ell=r_{\ell-1}+(k_{\ell,\text{eff}}-1)j_{\ell-1},
        \qquad
        j_\ell=j_{\ell-1}s_\ell.
        \]</p>

        <h3>Numerical example with a stride</h3>
        <p>Layer 1 uses kernel 3 and stride 2. Layer 2 uses kernel 3 and stride 1.</p>
        <p>For layer 1:</p>
        <p>\[
        r_1=1+(3-1)(1)=3,
        \qquad
        j_1=2.
        \]</p>
        <p>For layer 2:</p>
        <p>\[
        r_2=3+(3-1)(2)=7.
        \]</p>
        <p>So one layer-2 unit can depend on seven original positions along that axis.</p>

        <h3>Dilation and receptive field</h3>
        <p>A \(3\)-tap kernel with dilation 2 has effective size 5. If stride is 1, it expands the receptive field by four rather than two positions.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Detection and segmentation papers often discuss receptive field because a local prediction can require broader context. Dilated convolutions and deeper stacks increase context without using very large dense kernels.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Receptive field is not the same as feature-map size. A feature map can be \(32\times32\) while each unit has a receptive field much smaller or much larger than one pixel.</div>
      `
    },
    {
      id: "pooling",
      title: "8. Pooling summarizes a local region and usually reduces resolution",
      html: String.raw`
        <p>Pooling replaces a local window by a summary statistic. Common choices are maximum and average.</p>

        <h3>Max pooling</h3>
        <p>For a one-dimensional window \((1,5,2)\), max pooling returns</p>
        <p>\[\max(1,5,2)=5.\]</p>
        <p>For the \(2\times2\) patch</p>
        <p>\[
        \begin{bmatrix}1&4\\3&2\end{bmatrix},
        \]</p>
        <p>max pooling returns \(4\).</p>

        <h3>Average pooling</h3>
        <p>For the same patch, average pooling returns</p>
        <p>\[\frac{1+4+3+2}{4}=2.5.\]</p>

        <h3>Shape example</h3>
        <p>A \(32\times32\) feature map with \(2\times2\) pooling and stride 2 becomes approximately \(16\times16\) when the windows tile exactly.</p>
        <p>Channels normally stay unchanged:</p>
        <p>\[C\times32\times32\longrightarrow C\times16\times16.\]</p>

        <h3>Global average pooling</h3>
        <p>Global average pooling averages every spatial location within one channel. If</p>
        <p>\[X\in\mathbb R^{C\times H\times W},\]</p>
        <p>then the result has one scalar per channel:</p>
        <p>\[
        g_c=\frac{1}{HW}\sum_{i=1}^{H}\sum_{j=1}^{W}X[c,i,j].
        \]</p>
        <p>The output shape is \(C\).</p>

        <h3>Pooling and information loss</h3>
        <p>Pooling is many-to-one. For example, the max-pooled value 5 does not tell us whether the original window was \((1,5,2)\) or \((5,0,0)\). Downsampling can make later computation cheaper, but fine spatial details can be lost.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Older CNNs often use explicit max pooling. Modern architectures also use strided convolutions or patch-merging operations for downsampling. The mathematical question is the same: what information is retained when resolution is reduced?</div>
        <div class="shape-check"><strong>Common mistake.</strong> Pooling is not automatically translation invariant. Small translations can change which pooling window receives a feature, especially when stride is greater than one.</div>
      `
    },
    {
      id: "translation-equivariance",
      title: "9. Weight sharing gives translation equivariance before boundary and sampling effects",
      html: String.raw`
        <p>A function is <strong>translation equivariant</strong> if shifting the input shifts the output in the corresponding way.</p>
        <p>Let \(T_a\) shift a signal by \(a\) positions. An operation \(F\) is translation equivariant when</p>
        <p>\[
        F(T_a x)=T_aF(x).
        \]</p>
        <p>This is different from invariance. Translation invariance would mean</p>
        <p>\[F(T_a x)=F(x).\]</p>
        <p>Equivariance preserves the shift. Invariance removes it.</p>

        <h3>Small numerical example</h3>
        <p>Use valid cross-correlation with kernel \(k=(1,-1)\).</p>
        <p>For</p>
        <p>\[x=(0,2,2,0),\]</p>
        <p>the output is</p>
        <p>\[y=(-2,0,2).\]</p>
        <p>Now shift the nonzero pattern one position to the right inside a larger zero-padded domain:</p>
        <p>\[x'=(0,0,2,2,0).\]</p>
        <p>The local response pattern also shifts:</p>
        <p>\[y'=(0,-2,0,2).\]</p>
        <p>The same kernel is used at each position, so the same local pattern receives the same local response.</p>

        <h3>Why weight sharing causes the property</h3>
        <p>A position-dependent linear layer could use one set of weights on the left and another set on the right. A convolution uses the same kernel everywhere. Therefore a translated local pattern is processed by the same parameters.</p>

        <h3>What breaks exact equivariance</h3>
        <p>Real CNNs can lose exact translation equivariance because of:</p>
        <ul>
          <li>finite image boundaries and padding;</li>
          <li>strides greater than one;</li>
          <li>pooling and other downsampling;</li>
          <li>position-dependent preprocessing;</li>
          <li>interpolation and resizing.</li>
        </ul>
        <p>A one-pixel shift before stride-2 sampling can change which samples are retained. The output is then not simply a one-position shift of the old output.</p>

        <h3>From equivariance toward invariance</h3>
        <p>Classification often wants the final class to be similar when an object moves within the image. A network can combine equivariant local layers with spatial aggregation such as global average pooling to make the final prediction less sensitive to location.</p>
        <div class="paper-connection"><strong>Paper-reading point.</strong> When a paper says “convolution gives translation invariance,” check the wording. The basic convolution operation is naturally translation equivariant, not invariant.</div>
      `
    },
    {
      id: "toeplitz-view",
      title: "10. A convolution can be written as multiplication by a structured matrix",
      html: String.raw`
        <p>Convolution and cross-correlation are linear in the input when the kernel is fixed. Therefore they can be written as matrix multiplication.</p>

        <h3>One-dimensional Toeplitz-style matrix</h3>
        <p>Take input</p>
        <p>\[x=\begin{bmatrix}x_1\\x_2\\x_3\\x_4\end{bmatrix}\]</p>
        <p>and valid cross-correlation kernel</p>
        <p>\[k=(a,b).\]</p>
        <p>The outputs are</p>
        <p>\[
        y_1=ax_1+bx_2,\quad
        y_2=ax_2+bx_3,\quad
        y_3=ax_3+bx_4.
        \]</p>
        <p>Write this as</p>
        <p>\[
        \begin{bmatrix}y_1\\y_2\\y_3\end{bmatrix}
        =
        \underbrace{
        \begin{bmatrix}
        a&b&0&0\\
        0&a&b&0\\
        0&0&a&b
        \end{bmatrix}}_{T(k)}
        \begin{bmatrix}x_1\\x_2\\x_3\\x_4\end{bmatrix}.
        \]</p>
        <p>The shifted repeated diagonals encode weight sharing. This is a Toeplitz-like structured matrix.</p>

        <h3>Numerical example</h3>
        <p>Let \(a=2\), \(b=-1\), and \(x=(1,2,3,4)^\top\). Then</p>
        <p>\[
        T(k)=
        \begin{bmatrix}
        2&-1&0&0\\
        0&2&-1&0\\
        0&0&2&-1
        \end{bmatrix}.
        \]</p>
        <p>Multiplication gives</p>
        <p>\[T(k)x=(0,1,2)^\top,\]</p>
        <p>which matches the sliding-window calculation.</p>

        <h3>Why implementations do not normally build this full matrix</h3>
        <p>The structured matrix contains many zeros and repeated kernel values. Explicitly storing it would waste memory. Efficient convolution implementations exploit the structure directly or use optimized matrix-multiplication transformations.</p>

        <h3>Why this view is useful for theory</h3>
        <p>The matrix view connects convolution to ordinary linear algebra. It helps with:</p>
        <ul>
          <li>rank and null-space reasoning;</li>
          <li>operator norms;</li>
          <li>gradient derivations;</li>
          <li>the Fourier diagonalization of circular convolution;</li>
          <li>comparison with dense layers.</li>
        </ul>
        <div class="paper-connection"><strong>ML connection.</strong> A dense linear layer has unrelated weights in most matrix entries. A convolution corresponds to a highly constrained structured matrix with repeated coefficients. That constraint is the algebraic form of locality and weight sharing.</div>
      `
    }
  );
})();
