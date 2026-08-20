const day13 = COURSE[4].lessons[0];

Object.assign(day13, {
  published: true,
  summary: "Learn how finite-precision arithmetic, stable formulas, conditioning, vectorization, sparse computation, and reproducible randomness affect real ML systems.",
  explanation: "Mathematical formulas use real numbers with unlimited precision. Computers do not. They store a finite approximation. This difference can change a correct formula into an unstable program. Numerical computation gives you tools to predict these failures, choose stable formulas, estimate computational cost, and understand implementation details that often appear in AI and ML papers.",
  topics: [
    "Floating-point representation",
    "Rounding error",
    "Catastrophic cancellation",
    "Underflow and overflow",
    "Numerical stability",
    "Stable softmax",
    "Log-sum-exp",
    "Stable variance",
    "Epsilon terms",
    "Conditioning",
    "Iterative methods",
    "Finite differences",
    "Gradient checking",
    "Vectorization",
    "Memory layout",
    "Dense and sparse computation",
    "Matrix-operation complexity",
    "Time-memory trade-offs",
    "Random-number generation",
    "Equivalent formulas with different numerical behavior"
  ],
  sections: [
    {
      id: "floating-point",
      title: "1. Floating-point numbers are approximations to real numbers",
      html: String.raw`
        <p>Mathematics often treats a real number as exact. A computer stores only a finite number of bits. A floating-point number therefore stores an approximation.</p>
        <p>A useful mental model is scientific notation:</p>
        <p>\[x \approx s\times m\times b^e,\]</p>
        <p>where \(s\) is a sign, \(m\) is a significand, \(b\) is the base, and \(e\) is an exponent. Binary floating point uses base \(2\).</p>
        <p>This design gives a large dynamic range. It does not give equal spacing between all representable values. The spacing becomes larger as the magnitude grows.</p>
        <h3>Small example</h3>
        <p>Imagine a toy decimal system that keeps only three significant digits. The exact value \(1.23456\) becomes approximately \(1.23\). The exact value \(12345.6\) becomes approximately \(12300\). The relative precision is similar, but the absolute spacing is much larger for the large number.</p>
        <p>Real ML systems commonly use formats such as float32, float16, bfloat16, and sometimes float64. Lower precision reduces memory use and can increase accelerator throughput, but it also gives less precision or range.</p>
        <div class="paper-connection"><strong>Why this matters in ML papers.</strong> A paper can report training in FP32, FP16, BF16, or mixed precision. This choice is not only an implementation detail. It can affect overflow, gradient accuracy, memory capacity, and training speed.</div>
        <div class="shape-check"><strong>Notation warning.</strong> “32-bit tensor” describes the representation of each element. It does not describe the tensor shape. A tensor in \(\mathbb{R}^{128\times768}\) can be stored in several numerical formats.</div>
      `
    },
    {
      id: "rounding-error",
      title: "2. Rounding error enters after ordinary arithmetic operations",
      html: String.raw`
        <p>If an exact result cannot be represented, the computer rounds it to a nearby representable value. This introduces <strong>rounding error</strong>.</p>
        <p>Write the stored value as</p>
        <p>\[\operatorname{fl}(x)=x(1+\delta),\]</p>
        <p>where \(\delta\) is a small relative error. This model is approximate, but it is useful for reasoning.</p>
        <h3>Toy example</h3>
        <p>Again use three significant decimal digits. Compute</p>
        <p>\[\frac{1}{3}\approx0.333.\]</p>
        <p>Then</p>
        <p>\[3\times0.333=0.999,\]</p>
        <p>not exactly \(1\).</p>
        <p>One small rounding error is usually harmless. Many operations can accumulate error. The order of addition can also matter.</p>
        <h3>Order matters</h3>
        <p>In a low-precision toy system, adding a tiny number to a very large number can lose the tiny contribution. For example, if only four significant digits are kept,</p>
        <p>\[10000+1\approx10000.\]</p>
        <p>If this happens many times, a sum can drift away from the mathematically exact result.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Large reductions appear in losses, dot products, normalization statistics, and gradient accumulation. Libraries often use carefully designed kernels, wider accumulators, or pairwise-style reductions to reduce error.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Do not assume that algebraically equal expressions must give bit-for-bit equal floating-point results. Floating-point addition is not perfectly associative: \((a+b)+c\) can differ from \(a+(b+c)\).</div>
      `
    },
    {
      id: "catastrophic-cancellation",
      title: "3. Catastrophic cancellation destroys useful digits",
      html: String.raw`
        <p><strong>Catastrophic cancellation</strong> occurs when you subtract two nearly equal approximate numbers. The leading digits cancel, and the remaining result can contain very little reliable information.</p>
        <h3>Numerical example</h3>
        <p>Suppose the exact values are</p>
        <p>\[a=1.234567,\qquad b=1.234561.\]</p>
        <p>The exact difference is</p>
        <p>\[a-b=0.000006.\]</p>
        <p>If a low-precision system stores both as \(1.235\), then the computed difference is</p>
        <p>\[1.235-1.235=0.\]</p>
        <p>The absolute input errors were small. The relative error in the final difference is enormous.</p>
        <h3>A classic reformulation</h3>
        <p>For small positive \(x\), the expression</p>
        <p>\[\sqrt{1+x}-1\]</p>
        <p>subtracts two nearby values. Rationalize it:</p>
        <p>\[\sqrt{1+x}-1=\frac{x}{\sqrt{1+x}+1}.\]</p>
        <p>The second form avoids the dangerous subtraction and is usually more stable.</p>
        <div class="paper-connection"><strong>Why this matters in ML.</strong> Variance formulas, normalization layers, probability calculations, and loss differences can all contain subtraction of nearby quantities. Stable implementations often use a mathematically equivalent form that avoids cancellation.</div>
        <div class="shape-check"><strong>Reading rule.</strong> When a paper or library replaces a simple formula with a longer one, ask whether the change prevents cancellation, overflow, or underflow.</div>
      `
    },
    {
      id: "underflow-overflow",
      title: "4. Underflow and overflow happen when values leave the representable range",
      html: String.raw`
        <p><strong>Overflow</strong> occurs when a value is too large for the numerical format. <strong>Underflow</strong> occurs when a nonzero magnitude becomes too small to represent normally.</p>
        <h3>Exponential example</h3>
        <p>Consider the logits</p>
        <p>\[z=(1000,1001,1002)^\top.\]</p>
        <p>The naive softmax asks for \(e^{1000}\), \(e^{1001}\), and \(e^{1002}\). These values are enormous. A finite-precision program can overflow before it forms the ratio.</p>
        <p>At the other extreme, \(e^{-1000}\) is so small that a floating-point representation can become zero.</p>
        <h3>Probability example</h3>
        <p>If a sequence model multiplies many probabilities such as \(0.01\), then</p>
        <p>\[0.01^{200}=10^{-400}.\]</p>
        <p>This is far smaller than ordinary floating-point ranges used in many computations. The product can underflow to zero.</p>
        <div class="paper-connection"><strong>ML connection.</strong> This is why log probabilities are standard. Products become sums: \(\log\prod_i p_i=\sum_i\log p_i\). The logarithmic representation keeps useful information over much larger ranges.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Underflow to zero is not always harmless. A later \(\log 0\) becomes \(-\infty\), and division by a rounded zero can create invalid values.</div>
      `
    },
    {
      id: "numerical-stability",
      title: "5. Numerical stability asks whether small arithmetic errors stay small",
      html: String.raw`
        <p>An algorithm is <strong>numerically stable</strong> when small rounding or input errors do not grow into an unacceptable output error.</p>
        <p>This is different from asking whether the mathematical problem itself is sensitive. We will separate these ideas when we discuss conditioning.</p>
        <h3>Simple comparison</h3>
        <p>Suppose two formulas are mathematically equal:</p>
        <p>\[f(x)=\frac{1-\cos x}{x^2}\]</p>
        <p>and</p>
        <p>\[f(x)=\frac{\sin^2(x/2)}{x^2/2}.\]</p>
        <p>For small \(x\), the first form subtracts two nearly equal numbers because \(\cos x\approx1\). The second form avoids that subtraction. Both have the same exact limit \(1/2\), but the second form is usually better numerically near zero.</p>
        <p>Stability is therefore a property of the <em>computation</em>, not only of the symbolic function.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Authors often state that they use “a numerically stable implementation” of softmax, log-likelihood, normalization, or a matrix factorization. This means the code computes the intended mathematics while controlling finite-precision error.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Higher precision can reduce error, but it does not automatically fix a bad formula. A stable reformulation can matter more than simply changing float32 to float64.</div>
      `
    },
    {
      id: "stable-softmax",
      title: "6. Stable softmax subtracts the largest logit before exponentiation",
      html: String.raw`
        <p>For logits \(z\in\mathbb{R}^{K}\), softmax is</p>
        <p>\[p_i=\frac{e^{z_i}}{\sum_{j=1}^{K}e^{z_j}}.\]</p>
        <p>The probabilities do not change if the same constant \(c\) is subtracted from every logit:</p>
        <p>\[\frac{e^{z_i-c}}{\sum_j e^{z_j-c}}=\frac{e^{-c}e^{z_i}}{e^{-c}\sum_j e^{z_j}}=\frac{e^{z_i}}{\sum_j e^{z_j}}.\]</p>
        <p>Choose \(c=m=\max_j z_j\). Then every shifted logit is at most zero, so every exponential is at most one.</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[z=(1000,1001,1002)^\top,\qquad m=1002.\]</p>
        <p>Use shifted logits</p>
        <p>\[z-m=(-2,-1,0)^\top.\]</p>
        <p>Now</p>
        <p>\[e^{-2}\approx0.1353,\quad e^{-1}\approx0.3679,\quad e^0=1.\]</p>
        <p>The denominator is approximately \(1.5032\), so</p>
        <p>\[p\approx(0.0900,0.2447,0.6652)^\top.\]</p>
        <div class="paper-connection"><strong>ML connection.</strong> Classifiers and attention layers apply softmax constantly. Stable softmax is standard because logits can become large during training.</div>
        <div class="shape-check"><strong>Shape check.</strong> If logits have shape \(B\times K\), subtract one row maximum from each row. The broadcasted maximum has logical shape \(B\times1\), not one global scalar for the whole batch.</div>
      `
    }
  ]
});
