const day17 = COURSE[6].lessons[1];

Object.assign(day17, {
  published: true,
  summary: "Build the mathematics of discrete signals, convolution, cross-correlation, filters, spatial shapes, and channels for CNN and vision-model papers.",
  explanation: "A convolutional model processes data that has location. A small learned kernel is reused at many locations. This creates local computation, weight sharing, and predictable shape rules. To read CNN and signal-processing papers, separate four questions: what signal is stored, which local window is selected, how the kernel combines that window, and how stride, padding, dilation, and channels change the result.",
  topics: [
    "Discrete signals",
    "Convolution",
    "Cross-correlation",
    "Kernels and filters",
    "Padding, stride, and dilation",
    "Channels",
    "Receptive fields",
    "Pooling",
    "Translation equivariance",
    "Toeplitz view",
    "Fourier transform",
    "Frequency-domain intuition",
    "Aliasing and downsampling",
    "Convolution gradients"
  ],
  sections: [
    {
      id: "discrete-signals",
      title: "1. A discrete signal stores values at indexed locations",
      html: String.raw`
        <p>A <strong>signal</strong> is a collection of measured or represented values. A discrete signal stores values at separate indexed locations. The index can represent time, horizontal position, vertical position, or another ordered coordinate.</p>
        <p>For a one-dimensional signal, write</p>
        <p>\[x[n],\qquad n\in\mathbb Z.\]</p>
        <p>The square brackets are common in signal processing. They mean that \(n\) is a discrete index. A finite signal can also be stored as a vector.</p>
        <p>For example,</p>
        <p>\[x=\begin{bmatrix}2&1&0&3&2\end{bmatrix}\]</p>
        <p>has five sampled values. We can say \(x[0]=2\), \(x[1]=1\), and so on when zero-based indexing is used.</p>

        <h3>Two-dimensional signals</h3>
        <p>A grayscale image is a two-dimensional discrete signal. Write</p>
        <p>\[X[i,j],\]</p>
        <p>where \(i\) is a row index and \(j\) is a column index.</p>
        <p>For example,</p>
        <p>\[
        X=\begin{bmatrix}
        1&2&0\\
        3&1&4\\
        0&2&5
        \end{bmatrix}
        \]</p>
        <p>is a \(3\times3\) image. The value \(X[1,2]=4\) if indices start at zero.</p>

        <h3>Signals with channels</h3>
        <p>A color image has a third axis for channels. A common shape is</p>
        <p>\[H\times W\times C,\]</p>
        <p>where \(H\) is height, \(W\) is width, and \(C\) is channel count. An RGB image has \(C=3\).</p>
        <div class="shape-check"><strong>Shape habit.</strong> When a paper writes \(X\), identify which axes are spatial axes and which axis stores channels. Frameworks differ. Some use \(B\times C\times H\times W\). Others use \(B\times H\times W\times C\).</div>

        <h3>Why this matters for ML papers</h3>
        <p>CNN equations often use signal-processing notation. A paper can switch between tensor notation such as \(X_{b,c,i,j}\) and signal notation such as \(x[n]\). The object is the same type of idea: values are attached to locations.</p>
        <div class="paper-connection"><strong>ML connection.</strong> In an image classifier, the first convolutional layer receives pixel signals. Later layers receive feature signals. A later channel can represent an edge, texture, shape fragment, or another learned response.</div>
      `
    },
    {
      id: "cross-correlation",
      title: "2. Cross-correlation slides a kernel without reversing it",
      html: String.raw`
        <p>Most deep-learning libraries implement <strong>cross-correlation</strong> even when the API is named convolution.</p>
        <p>For a one-dimensional input \(x[n]\) and a kernel \(k[m]\) of length \(K\), valid cross-correlation is</p>
        <p>\[
        y[n]=\sum_{m=0}^{K-1}k[m]x[n+m].
        \]</p>
        <p>The kernel keeps its stored order. At each output location, multiply corresponding entries and add them.</p>

        <h3>Numerical example 1</h3>
        <p>Let</p>
        <p>\[x=(1,2,3,4),\qquad k=(2,-1).\]</p>
        <p>The first window is \((1,2)\):</p>
        <p>\[y[0]=2(1)+(-1)(2)=0.\]</p>
        <p>The second window is \((2,3)\):</p>
        <p>\[y[1]=2(2)+(-1)(3)=1.\]</p>
        <p>The third window is \((3,4)\):</p>
        <p>\[y[2]=2(3)+(-1)(4)=2.\]</p>
        <p>Thus</p>
        <p>\[y=(0,1,2).\]</p>

        <h3>Numerical example 2: a smoothing kernel</h3>
        <p>Let</p>
        <p>\[x=(2,4,8,6,0),\qquad k=\left(\frac13,\frac13,\frac13\right).\]</p>
        <p>Then</p>
        <p>\[
        y[0]=\frac{2+4+8}{3}=\frac{14}{3},\quad
        y[1]=\frac{4+8+6}{3}=6,\quad
        y[2]=\frac{8+6+0}{3}=\frac{14}{3}.
        \]</p>
        <p>The filter replaces each local region by a local average.</p>

        <h3>Two-dimensional cross-correlation</h3>
        <p>For a kernel \(K\in\mathbb R^{k_h\times k_w}\), a single-channel valid operation is</p>
        <p>\[
        Y[i,j]=\sum_{u=0}^{k_h-1}\sum_{v=0}^{k_w-1}K[u,v]X[i+u,j+v].
        \]</p>
        <p>For the image patch</p>
        <p>\[
        P=\begin{bmatrix}1&2\\3&4\end{bmatrix},
        \qquad
        K=\begin{bmatrix}1&0\\0&-1\end{bmatrix},
        \]</p>
        <p>the response is</p>
        <p>\[1(1)+0(2)+0(3)-1(4)=-3.\]</p>
        <div class="paper-connection"><strong>Why this matters.</strong> A CNN layer repeats this local dot product at many positions. The kernel parameters are learned from data instead of fixed by hand.</div>
      `
    },
    {
      id: "convolution",
      title: "3. Mathematical convolution reverses the kernel before sliding",
      html: String.raw`
        <p>Mathematical discrete convolution is closely related to cross-correlation, but it reverses one input.</p>
        <p>A common one-dimensional definition is</p>
        <p>\[
        (x*k)[n]=\sum_m x[m]k[n-m].
        \]</p>
        <p>For a finite kernel, another way to see this is: reverse the kernel, then perform the sliding dot product.</p>

        <h3>Numerical comparison</h3>
        <p>Let</p>
        <p>\[x=(1,2,3,4),\qquad k=(2,-1).\]</p>
        <p>Cross-correlation uses \((2,-1)\). Mathematical convolution uses the reversed kernel</p>
        <p>\[k_{\text{rev}}=(-1,2).\]</p>
        <p>Valid convolution gives</p>
        <p>\[
        (-1)(1)+2(2)=3,
        \quad
        (-1)(2)+2(3)=4,
        \quad
        (-1)(3)+2(4)=5.
        \]</p>
        <p>Thus valid convolution is \((3,4,5)\), while the earlier cross-correlation was \((0,1,2)\).</p>

        <h3>Why CNN papers still say convolution</h3>
        <p>In a learned layer, the kernel entries are free parameters. If a framework uses cross-correlation instead of true convolution, the training process can learn the correspondingly reversed pattern. For this reason, deep-learning literature often uses the word convolution for both operations.</p>
        <div class="shape-check"><strong>Common mistake.</strong> Do not assume a paper's \(*\) symbol tells you whether the kernel is reversed. Read the definition or implementation. In classical signal processing, the distinction is important. In CNN libraries, “convolution” usually means cross-correlation.</div>

        <h3>Why true convolution matters in theory</h3>
        <p>Convolution has algebraic properties that make Fourier analysis especially clean:</p>
        <p>\[
        x*k=k*x,
        \qquad
        (x*k)*h=x*(k*h).
        \]</p>
        <p>The convolution theorem later connects convolution in the spatial or time domain to multiplication in the frequency domain.</p>
      `
    },
    {
      id: "kernels-filters",
      title: "4. Kernels are small local parameter arrays; filters describe the operation they produce",
      html: String.raw`
        <p>A <strong>kernel</strong> is the small array of weights that moves across a signal. The word <strong>filter</strong> is often used for the whole local operation or for the kernel itself. Papers are not fully consistent about these two words.</p>

        <h3>Example: first difference</h3>
        <p>The kernel</p>
        <p>\[k=(-1,1)\]</p>
        <p>computes a local difference under cross-correlation:</p>
        <p>\[y[n]=-x[n]+x[n+1].\]</p>
        <p>For \(x=(2,2,5,5)\),</p>
        <p>\[y=(0,3,0).\]</p>
        <p>The large response at the middle indicates a change.</p>

        <h3>Example: simple blur</h3>
        <p>A two-dimensional averaging kernel is</p>
        <p>\[
        K=\frac19\begin{bmatrix}
        1&1&1\\
        1&1&1\\
        1&1&1
        \end{bmatrix}.
        \]</p>
        <p>For a \(3\times3\) patch whose entries sum to \(45\), the filter output is \(45/9=5\).</p>

        <h3>Example: edge-like response</h3>
        <p>Consider</p>
        <p>\[
        K=\begin{bmatrix}-1&0&1\\-1&0&1\\-1&0&1\end{bmatrix}.
        \]</p>
        <p>This kernel compares values on the left and right sides of a patch. It gives a large magnitude when there is a strong horizontal change across the patch.</p>

        <h3>Learned kernels</h3>
        <p>Classical signal processing often chooses kernels from prior knowledge. CNNs usually learn them. If a layer has weights \(W\), training updates \(W\) with gradients from the task loss:</p>
        <p>\[
        W\leftarrow W-\eta\frac{\partial L}{\partial W}.
        \]</p>
        <p>The local operation is therefore not limited to human-designed edge or blur filters.</p>
        <div class="paper-connection"><strong>Paper-reading point.</strong> A paper can call one output channel a filter. In that usage, one filter includes all kernel slices across the input channels that are needed to produce that output channel.</div>
      `
    },
    {
      id: "padding-stride-dilation",
      title: "5. Padding, stride, and dilation control where the kernel is evaluated",
      html: String.raw`
        <p>Three parameters strongly affect spatial shape.</p>
        <ul>
          <li><strong>Padding \(p\)</strong> adds values around the input boundary, often zeros.</li>
          <li><strong>Stride \(s\)</strong> is the step between consecutive kernel positions.</li>
          <li><strong>Dilation \(d\)</strong> inserts gaps between kernel sample locations.</li>
        </ul>

        <h3>Effective kernel size under dilation</h3>
        <p>A kernel with stored size \(k\) and dilation \(d\) covers the effective width</p>
        <p>\[
        k_{\text{eff}}=d(k-1)+1.
        \]</p>
        <p>For \(k=3\):</p>
        <ul>
          <li>if \(d=1\), then \(k_{\text{eff}}=3\);</li>
          <li>if \(d=2\), then \(k_{\text{eff}}=5\);</li>
          <li>if \(d=3\), then \(k_{\text{eff}}=7\).</li>
        </ul>

        <h3>One-dimensional output-size formula</h3>
        <p>For input length \(n\), kernel size \(k\), padding \(p\), stride \(s\), and dilation \(d\), a common output length is</p>
        <p>\[
        \boxed{
        n_{\text{out}}=
        \left\lfloor
        \frac{n+2p-d(k-1)-1}{s}+1
        \right\rfloor
        }.
        \]</p>
        <p>The same formula is applied separately to height and width in a two-dimensional layer.</p>

        <h3>Numerical example 1: valid operation</h3>
        <p>Let \(n=8\), \(k=3\), \(p=0\), \(s=1\), and \(d=1\). Then</p>
        <p>\[
        n_{\text{out}}=\frac{8-3}{1}+1=6.
        \]</p>

        <h3>Numerical example 2: same-size operation</h3>
        <p>Let \(n=8\), \(k=3\), \(p=1\), \(s=1\), and \(d=1\). Then</p>
        <p>\[
        n_{\text{out}}=\frac{8+2-3}{1}+1=8.
        \]</p>
        <p>The padding preserves the length.</p>

        <h3>Numerical example 3: stride two</h3>
        <p>Let \(n=9\), \(k=3\), \(p=1\), \(s=2\), and \(d=1\). Then</p>
        <p>\[
        n_{\text{out}}=
        \left\lfloor\frac{9+2-3}{2}+1\right\rfloor
        =5.
        \]</p>

        <h3>Numerical example 4: dilation</h3>
        <p>Let \(n=10\), \(k=3\), \(p=0\), \(s=1\), and \(d=2\). The effective kernel size is \(5\). Therefore</p>
        <p>\[n_{\text{out}}=10-5+1=6.\]</p>

        <div class="shape-check"><strong>Common mistake.</strong> Dilation changes the spacing between samples, not the number of stored kernel parameters. A length-3 kernel still has three learned numbers when \(d=2\).</div>
        <div class="paper-connection"><strong>ML connection.</strong> Strided convolutions reduce resolution. Dilated convolutions increase spatial coverage without adding kernel parameters. Segmentation models often use dilation when they want large context without aggressive downsampling.</div>
      `
    }
  ]
});
