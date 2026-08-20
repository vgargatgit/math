(() => {
  const day13 = COURSE[4].lessons[0];

  day13.sections.push(
    {
      id: "log-sum-exp",
      title: "7. Log-sum-exp keeps sums of exponentials in a safe numerical range",
      html: String.raw`
        <p>The <strong>log-sum-exp</strong> function is</p>
        <p>\[\operatorname{LSE}(z)=\log\sum_{i=1}^{K}e^{z_i}.\]</p>
        <p>A naive implementation can overflow because it forms \(e^{z_i}\) first. Use the same maximum-shift idea as stable softmax:</p>
        <p>\[\operatorname{LSE}(z)=m+\log\sum_i e^{z_i-m},\qquad m=\max_i z_i.\]</p>
        <h3>Numerical example</h3>
        <p>Let \(z=(1000,1001)^\top\). Direct exponentiation is unsafe. Set \(m=1001\):</p>
        <p>\[\operatorname{LSE}(z)=1001+\log(e^{-1}+1).\]</p>
        <p>Since \(e^{-1}\approx0.3679\),</p>
        <p>\[\operatorname{LSE}(z)\approx1001+\log(1.3679)\approx1001.3133.\]</p>
        <p>No huge exponential was required.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Log-sum-exp appears in log-softmax, categorical log-likelihoods, energy-based models, dynamic programming, and partition functions. A paper may write a compact \(\log\sum e^z\) expression while a correct implementation uses the shifted form.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not subtract \(m\) and forget to add it back outside the logarithm. The shifted exponentials are only part of the identity.</div>
      `
    },
    {
      id: "stable-variance",
      title: "8. Stable variance avoids subtracting two nearly equal large quantities",
      html: String.raw`
        <p>Variance can be written as</p>
        <p>\[\operatorname{Var}(X)=\mathbb{E}[X^2]-\mathbb{E}[X]^2.\]</p>
        <p>This identity is correct. It can be numerically poor when the mean is large and the variance is small. Then both terms are large and nearly equal.</p>
        <h3>Example</h3>
        <p>Take values</p>
        <p>\[x=(10000,10001,9999).\]</p>
        <p>The mean is \(10000\). The centered deviations are \(0,1,-1\). The population variance is therefore</p>
        <p>\[\frac{0^2+1^2+(-1)^2}{3}=\frac23.\]</p>
        <p>The alternative identity subtracts two numbers near \(10^8\). In low precision, their small difference can lose accuracy.</p>
        <p>A safer approach centers first:</p>
        <p>\[\operatorname{Var}(x)=\frac1N\sum_i(x_i-\bar x)^2.\]</p>
        <p>Streaming algorithms such as Welford's method update the mean and a centered sum without forming the dangerous difference of large moments.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Batch normalization, layer statistics, dataset standardization, and metric aggregation all need stable variance estimates. Accelerator kernels often use specialized reduction algorithms.</div>
        <div class="shape-check"><strong>Shape reasoning.</strong> For activations \(X\in\mathbb{R}^{B\times d}\), a feature-wise mean often has shape \(1\times d\). The centered matrix \(X-\mu\) keeps shape \(B\times d\).</div>
      `
    },
    {
      id: "epsilon-terms",
      title: "9. Epsilon terms protect operations near singular or undefined points",
      html: String.raw`
        <p>Many ML formulas add a small positive constant \(\varepsilon\). The goal is usually to prevent division by zero, a square root of zero in a denominator, or a logarithm of zero.</p>
        <h3>Normalization example</h3>
        <p>A common normalization formula is</p>
        <p>\[\hat x=\frac{x-\mu}{\sqrt{\sigma^2+\varepsilon}}.\]</p>
        <p>If \(\sigma^2=0\), then without \(\varepsilon\) the denominator is zero. With \(\varepsilon=10^{-5}\),</p>
        <p>\[\sqrt{0+10^{-5}}\approx0.003162.\]</p>
        <p>The operation remains defined.</p>
        <h3>Log example</h3>
        <p>A simplistic protected log may use \(\log(p+\varepsilon)\). If \(p=0\) and \(\varepsilon=10^{-8}\), the result is finite rather than \(-\infty\).</p>
        <p>But \(\varepsilon\) changes the mathematical function. It is not free.</p>
        <div class="paper-connection"><strong>Why papers mention epsilon.</strong> Adam, RMSProp, normalization layers, cosine similarity, and probability code all use epsilon-like stabilizers. The exact placement matters. For example, \(\sqrt{v}+\varepsilon\) is not the same as \(\sqrt{v+\varepsilon}\).</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not treat \(\varepsilon\) as a universal magic number. Its useful scale depends on the numerical format, the algorithm, and where it appears.</div>
      `
    },
    {
      id: "conditioning",
      title: "10. Conditioning describes sensitivity of the mathematical problem",
      html: String.raw`
        <p><strong>Conditioning</strong> asks a different question from numerical stability. It asks: if the input changes slightly, how much can the exact answer change?</p>
        <p>A problem is well-conditioned when small input changes produce small output changes. It is ill-conditioned when small input changes can cause large output changes.</p>
        <h3>Scalar example</h3>
        <p>Consider</p>
        <p>\[f(x)=\frac{1}{x}.\]</p>
        <p>Near \(x=1\), changing \(x\) from \(1\) to \(1.001\) changes the output only slightly. Near \(x=0\), a small absolute change can produce a huge output change.</p>
        <h3>Linear-system example</h3>
        <p>For \(Ax=b\), the matrix condition number in the 2-norm is</p>
        <p>\[\kappa_2(A)=\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}.\]</p>
        <p>If \(A=\operatorname{diag}(100,0.01)\), then</p>
        <p>\[\kappa_2(A)=\frac{100}{0.01}=10000.\]</p>
        <p>The system is sensitive in directions associated with the small singular value.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Poor conditioning can slow gradient descent, amplify data noise, and make least-squares estimates unstable. Whitening, normalization, regularization, and preconditioning can improve the effective geometry.</div>
        <div class="shape-check"><strong>Important distinction.</strong> Conditioning belongs to the problem. Stability belongs to the algorithm. A stable algorithm cannot remove sensitivity that is inherent in an ill-conditioned problem.</div>
      `
    },
    {
      id: "iterative-methods",
      title: "11. Iterative methods approach a solution through repeated updates",
      html: String.raw`
        <p>An <strong>iterative method</strong> starts from an initial guess and repeatedly improves it. This is often cheaper than computing an exact closed-form solution.</p>
        <p>Write a generic iteration as</p>
        <p>\[x_{t+1}=F(x_t).\]</p>
        <p>Convergence means that the sequence \(x_t\) approaches a desired solution.</p>
        <h3>Numerical example: solve a square root</h3>
        <p>To approximate \(\sqrt{2}\), Newton's method uses</p>
        <p>\[x_{t+1}=\frac12\left(x_t+\frac{2}{x_t}\right).\]</p>
        <p>Start with \(x_0=1\):</p>
        <p>\[x_1=1.5,\qquad x_2\approx1.4167,\qquad x_3\approx1.4142.\]</p>
        <p>Each update uses the previous approximation.</p>
        <h3>Linear algebra connection</h3>
        <p>Large ML systems often need only matrix-vector products, not explicit matrix inverses. Iterative solvers can exploit this. They can also stop when a residual is small enough rather than chase an exact answer.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Gradient descent is itself iterative. Conjugate-gradient methods, power iteration, Lanczos methods, and iterative eigensolvers appear when matrices are too large to factor directly.</div>
        <div class="shape-check"><strong>Reading rule.</strong> Check the stopping criterion, tolerance, maximum iteration count, and initialization. Two papers can use the same named iterative method but obtain different cost and accuracy from these choices.</div>
      `
    },
    {
      id: "finite-differences",
      title: "12. Finite differences approximate derivatives with nearby function values",
      html: String.raw`
        <p>A derivative is a limit. A computer can approximate it with a small finite step \(h\).</p>
        <p>The forward-difference approximation is</p>
        <p>\[f'(x)\approx\frac{f(x+h)-f(x)}{h}.\]</p>
        <p>A usually more accurate central difference is</p>
        <p>\[f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}.\]</p>
        <h3>Numerical example</h3>
        <p>Let \(f(x)=x^2\), \(x=3\), and \(h=0.01\). The exact derivative is \(6\).</p>
        <p>Forward difference gives</p>
        <p>\[\frac{3.01^2-3^2}{0.01}=\frac{9.0601-9}{0.01}=6.01.\]</p>
        <p>Central difference gives</p>
        <p>\[\frac{3.01^2-2.99^2}{0.02}=\frac{9.0601-8.9401}{0.02}=6.\]</p>
        <p>Making \(h\) smaller first reduces truncation error. But if \(h\) becomes too small, rounding and cancellation become more important.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Finite differences are too expensive for normal neural-network training, but they are valuable for testing derivative implementations and for sensitivity checks.</div>
        <div class="shape-check"><strong>Common mistake.</strong> “Smaller \(h\) is always better” is false in floating-point arithmetic. There is a trade-off between approximation error and rounding error.</div>
      `
    },
    {
      id: "gradient-checking",
      title: "13. Gradient checking compares backpropagation with finite differences",
      html: String.raw`
        <p>Suppose a scalar loss is \(L(\theta)\), where \(\theta\in\mathbb{R}^{p}\). Backpropagation gives an analytic or automatic-differentiation gradient \(g\in\mathbb{R}^{p}\).</p>
        <p>For coordinate \(i\), estimate</p>
        <p>\[g_i^{\text{num}}\approx\frac{L(\theta+h e_i)-L(\theta-h e_i)}{2h}.\]</p>
        <p>Then compare it with the backpropagated value \(g_i\).</p>
        <h3>Numerical example</h3>
        <p>For \(L(\theta)=\theta^2\) at \(\theta=2\), the exact gradient is \(4\). With \(h=10^{-3}\),</p>
        <p>\[g^{\text{num}}=\frac{(2.001)^2-(1.999)^2}{0.002}=4.\]</p>
        <p>A useful relative comparison for two scalar gradient values \(a\) and \(b\) is</p>
        <p>\[\frac{|a-b|}{\max(1,|a|,|b|)}.\]</p>
        <p>For vectors, use a norm-based relative error.</p>
        <div class="paper-connection"><strong>Why this matters in ML.</strong> Custom layers, loss functions, kernels, and hand-written backward passes can silently produce wrong gradients. A small gradient check can find many implementation errors.</div>
        <div class="shape-check"><strong>Practical warning.</strong> Check a small model in high precision when possible. Disable stochastic behavior such as dropout. Avoid nondifferentiable points such as the exact ReLU kink during the test.</div>
      `
    }
  );
})();
