(() => {
  const day17 = COURSE[6].lessons[1];

  day17.sections.push(
    {
      id: "fourier-transform",
      title: "11. The discrete Fourier transform changes from location coordinates to frequency coordinates",
      html: String.raw`
        <p>A signal can be described by its values at locations, or by how much of each oscillating pattern it contains. The discrete Fourier transform (DFT) gives the second description.</p>
        <p>For a length-\(N\) signal \(x[n]\), define</p>
        <p>\[
        X[k]=\sum_{n=0}^{N-1}x[n]e^{-2\pi i kn/N},
        \qquad k=0,1,\ldots,N-1.
        \]</p>
        <p>Here \(i^2=-1\). The index \(n\) is a location or time index. The index \(k\) is a frequency-bin index.</p>

        <h3>What the complex number means</h3>
        <p>Each \(X[k]\) has a magnitude and a phase. The magnitude tells how strongly frequency \(k\) is present. The phase tells how that oscillation is aligned with the origin.</p>

        <h3>Numerical example 1: constant signal</h3>
        <p>Let</p>
        <p>\[x=(1,1,1,1).\]</p>
        <p>The zero-frequency coefficient is</p>
        <p>\[X[0]=1+1+1+1=4.\]</p>
        <p>For the other bins, the complex oscillations cancel, so</p>
        <p>\[X=(4,0,0,0).\]</p>
        <p>A constant signal contains only the zero-frequency or DC component.</p>

        <h3>Numerical example 2: alternating signal</h3>
        <p>Let</p>
        <p>\[x=(1,-1,1,-1).\]</p>
        <p>This sequence changes sign at every sample. For \(N=4\), it aligns with the highest distinct real oscillation. Its DFT is</p>
        <p>\[X=(0,0,4,0).\]</p>
        <p>The energy is concentrated at frequency bin \(k=2\).</p>

        <h3>Inverse DFT</h3>
        <p>The transform is invertible:</p>
        <p>\[
        x[n]=\frac1N\sum_{k=0}^{N-1}X[k]e^{2\pi i kn/N}.
        \]</p>
        <p>No information is lost by an exact DFT. It is a change of coordinates.</p>

        <h3>Two-dimensional images</h3>
        <p>For an image, the two-dimensional DFT uses horizontal and vertical frequency indices. Low spatial frequencies describe slowly changing image content. High spatial frequencies describe rapid changes such as fine texture and sharp edges.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Vision papers use Fourier analysis to study texture bias, spectral filtering, positional patterns, robustness, aliasing, and efficient convolution. The transform also explains why convolution has a simple frequency-domain form.</div>
        <div class="shape-check"><strong>Shape rule.</strong> A length-\(N\) DFT returns \(N\) complex coefficients. A two-dimensional \(H\times W\) DFT returns an \(H\times W\) grid of complex coefficients, unless a real-signal implementation stores only the nonredundant half.</div>
      `
    },
    {
      id: "frequency-domain-intuition",
      title: "12. Convolution becomes multiplication in the frequency domain",
      html: String.raw`
        <p>The convolution theorem is one of the main reasons Fourier methods are useful:</p>
        <p>\[
        \mathcal F\{x*k\}
        =\mathcal F\{x\}\,\mathcal F\{k\}.
        \]</p>
        <p>If</p>
        <p>\[X=\mathcal F\{x\},\qquad K=\mathcal F\{k\},\]</p>
        <p>then</p>
        <p>\[Y=X\odot K\]</p>
        <p>is the frequency representation of the convolution output. The symbol \(\odot\) means element-wise multiplication.</p>

        <h3>Why multiplication is easier to interpret</h3>
        <p>At each frequency bin, the filter multiplies the input coefficient by a complex gain:</p>
        <p>\[Y[k]=X[k]K[k].\]</p>
        <p>If \(|K[k]|\) is small, that frequency is suppressed. If \(|K[k]|\) is large, that frequency is amplified.</p>

        <h3>Numerical example: moving average suppresses rapid change</h3>
        <p>Consider the two-tap averaging filter</p>
        <p>\[k=\left(\frac12,\frac12\right).\]</p>
        <p>For a constant local pattern \((3,3)\), the response is</p>
        <p>\[\frac12(3)+\frac12(3)=3.\]</p>
        <p>The constant component passes through unchanged.</p>
        <p>For an alternating local pattern \((3,-3)\), the response is</p>
        <p>\[\frac12(3)+\frac12(-3)=0.\]</p>
        <p>A rapid sign change is suppressed. This is low-pass behavior.</p>

        <h3>Numerical example: difference filter suppresses constants</h3>
        <p>Take</p>
        <p>\[k=(-1,1).\]</p>
        <p>For a constant pair \((5,5)\), the response is</p>
        <p>\[-5+5=0.\]</p>
        <p>For a changing pair \((2,7)\), the response is</p>
        <p>\[-2+7=5.\]</p>
        <p>This filter emphasizes change and acts like a simple high-pass or derivative operator.</p>

        <h3>Circular versus linear convolution</h3>
        <p>The DFT naturally represents <strong>circular convolution</strong>. For ordinary finite linear convolution, the signals are normally zero-padded enough before applying FFT methods. Without sufficient padding, the tail wraps around to the beginning.</p>

        <h3>Computational connection</h3>
        <p>Direct convolution with a very large kernel can be expensive. FFT-based convolution uses</p>
        <p>\[
        x*k=\mathcal F^{-1}(\mathcal F(x)\odot\mathcal F(k)).
        \]</p>
        <p>The FFT computes transforms in about \(O(N\log N)\) work. For small CNN kernels such as \(3\times3\), direct spatial methods are often better. For large kernels or long sequences, frequency methods can become attractive.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Spectral convolution methods, global filters, and some long-sequence architectures use frequency-domain multiplication because a global convolution can be represented efficiently after a Fourier transform.</div>
        <div class="shape-check"><strong>Common mistake.</strong> “Low frequency” does not mean a small numeric pixel value. It means slow variation across space or time.</div>
      `
    },
    {
      id: "aliasing-downsampling",
      title: "13. Downsampling can create aliasing when high frequencies are not removed first",
      html: String.raw`
        <p><strong>Downsampling</strong> keeps fewer samples. For an integer factor \(s\), one simple operation is</p>
        <p>\[
        y[m]=x[sm].
        \]</p>
        <p>For stride 2, we keep every second sample.</p>

        <h3>Numerical example 1</h3>
        <p>Let</p>
        <p>\[x=(1,2,3,4,5,6).\]</p>
        <p>Keeping indices \(0,2,4\) gives</p>
        <p>\[y=(1,3,5).\]</p>
        <p>The sample count is halved.</p>

        <h3>What aliasing means</h3>
        <p>After sampling becomes coarser, two different high-frequency patterns can produce the same retained samples. The high-frequency pattern then appears as a different, lower-frequency pattern. This ambiguity is aliasing.</p>

        <h3>Numerical example 2: a pattern disappears</h3>
        <p>Consider</p>
        <p>\[x=(1,-1,1,-1,1,-1,1,-1).\]</p>
        <p>Downsample by 2 and keep even-indexed samples:</p>
        <p>\[y=(1,1,1,1).\]</p>
        <p>The original signal alternated at every location, but the downsampled signal appears constant. The rapid oscillation has aliased into zero apparent frequency.</p>

        <h3>Numerical example 3: phase changes the result</h3>
        <p>Take the same alternating pattern but start one sample later:</p>
        <p>\[x'=(-1,1,-1,1,-1,1,-1,1).\]</p>
        <p>Even-index downsampling gives</p>
        <p>\[y'=(-1,-1,-1,-1).\]</p>
        <p>A one-sample shift changed the retained constant from \(+1\) to \(-1\). This is one reason strided operations can be sensitive to small translations.</p>

        <h3>Anti-alias filtering</h3>
        <p>Before reducing the sampling rate, classical signal processing applies a low-pass filter that removes frequencies that the new sampling grid cannot represent.</p>
        <p>A very simple local average before stride 2 is</p>
        <p>\[
        z[n]=\frac12x[n]+\frac12x[n+1].
        \]</p>
        <p>For the alternating signal, each local pair averages to zero. The high-frequency component is suppressed before samples are discarded.</p>

        <h3>Connection to strided convolution and pooling</h3>
        <p>A stride-2 convolution both filters and downsamples. Whether it adequately suppresses problematic high frequencies depends on the learned kernel. Max pooling also downsamples but is nonlinear, so classical sampling theorems do not apply in a simple exact form.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Anti-aliased CNNs, blur pooling, patch embedding, and image-resizing methods often discuss aliasing. When resolution decreases, ask which frequencies are removed before samples are discarded.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Downsampling is not the same as compression with no loss. Fewer samples mean less representational capacity for high-frequency detail.</div>
      `
    },
    {
      id: "cnn-frequency-reading",
      title: "14. Spatial and frequency views describe the same linear filter from different coordinates",
      html: String.raw`
        <p>A convolutional filter can be understood in two equivalent ways.</p>
        <ul>
          <li><strong>Spatial view:</strong> slide a local kernel and compute weighted sums.</li>
          <li><strong>Frequency view:</strong> multiply each frequency component by the filter's frequency response.</li>
        </ul>
        <p>The spatial view makes locality and tensor shapes clear. The frequency view makes smoothing, edge emphasis, aliasing, and large-scale convolution easier to analyze.</p>

        <h3>Example: same averaging filter, two interpretations</h3>
        <p>For</p>
        <p>\[k=\left(\frac12,\frac12\right),\]</p>
        <p>the spatial interpretation is “replace adjacent values by their average.” The frequency interpretation is “keep slowly varying components and weaken a component that changes sign between adjacent samples.”</p>

        <h3>Example: same difference filter, two interpretations</h3>
        <p>For</p>
        <p>\[k=(-1,1),\]</p>
        <p>the spatial interpretation is “measure the change between adjacent values.” The frequency interpretation is “remove the constant component and emphasize sufficiently rapid variation.”</p>

        <h3>How to read a frequency-response figure</h3>
        <p>If a paper plots \(|K(\omega)|\) against frequency \(\omega\), ask:</p>
        <ol>
          <li>Which frequencies have gain near 1?</li>
          <li>Which frequencies are attenuated?</li>
          <li>Does the filter amplify any band?</li>
          <li>Is the plot for one learned channel, an average across channels, or a theoretical kernel?</li>
          <li>Are the axes normalized to samples, pixels, radians, or cycles?</li>
        </ol>
        <div class="paper-connection"><strong>Core reading habit.</strong> Do not choose between the spatial and frequency views. Use both. A difficult convolution equation often becomes simple when you switch coordinates.</div>
      `
    }
  );
})();
