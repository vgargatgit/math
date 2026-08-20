(() => {
  const day13 = COURSE[4].lessons[0];

  day13.sections.push({
    id: "numerical-recap",
    title: "21. Recap: separate mathematics, representation, stability, and cost",
    html: String.raw`
      <p>When you read a numerical section in an AI or ML paper, do not ask only whether the equation is mathematically correct. Use four layers of reasoning.</p>
      <ol>
        <li><strong>Mathematics:</strong> What exact function or optimization problem is intended?</li>
        <li><strong>Representation:</strong> Which numerical format stores the values? What range and precision does it provide?</li>
        <li><strong>Algorithm:</strong> Does the implementation avoid overflow, underflow, cancellation, and unstable solves?</li>
        <li><strong>Cost:</strong> What are the dominant tensor shapes, arithmetic counts, memory movements, and stored intermediates?</li>
      </ol>
      <p>For example, attention can be written compactly as</p>
      <p>\[\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt d}\right)V.\]</p>
      <p>Now inspect it numerically. If \(Q,K\in\mathbb{R}^{T\times d}\), then \(QK^\top\in\mathbb{R}^{T\times T}\). The score matrix costs roughly \(O(T^2d)\) arithmetic to form and \(O(T^2)\) memory if materialized. Softmax should use a stable maximum shift along each row. Mixed precision can reduce memory, but reductions may need higher-precision accumulation.</p>
      <p>This style of analysis lets you move from a clean paper equation to a realistic implementation model.</p>
      <div class="paper-connection"><strong>Final paper-reading rule.</strong> A numerical trick is often part of the algorithm, even when the paper writes only the mathematically compact form. Treat precision, stabilization, iteration tolerances, and memory strategy as meaningful experimental details.</div>
      <div class="shape-check"><strong>Final mistake to avoid.</strong> Do not use “numerical error” as one vague category. Name the mechanism: rounding, cancellation, overflow, underflow, ill-conditioning, approximation error, stochastic variation, or insufficient convergence.</div>
    `
  });

  day13.examples = [
    ["Round in a toy floating-point system", String.raw`A toy system keeps three significant decimal digits. It stores \(7.8912\) as \(7.89\) and \(0.0012345\) as \(0.00123\). The absolute errors differ, but each value is represented with roughly the same number of significant digits.`],
    ["See non-associative addition", String.raw`In a toy four-significant-digit system, let \(a=10000\), \(b=-10000\), and \(c=1\). Then \((a+b)+c=1\). But \(b+c\) rounds back near \(-10000\), so \(a+(b+c)\) can become \(0\). Exact real addition is associative; rounded floating-point addition need not be.`],
    ["Avoid cancellation", String.raw`For \(x=10^{-6}\), computing \(\sqrt{1+x}-1\) subtracts two numbers near \(1\). Use \(x/(\sqrt{1+x}+1)\) instead. The exact formulas are equal, but the second keeps the small signal directly in the numerator.`],
    ["Compute stable softmax", String.raw`For \(z=(20,21,22)^\top\), subtract \(m=22\). The shifted exponentials are \(e^{-2},e^{-1},1\). Their normalized values are approximately \((0.0900,0.2447,0.6652)^\top\).`],
    ["Compute stable log-sum-exp", String.raw`For \(z=(50,51)^\top\), use \(m=51\): \(\operatorname{LSE}(z)=51+\log(1+e^{-1})\approx51.3133\). No \(e^{51}\) needs to be represented explicitly.`],
    ["Center before computing variance", String.raw`For \(x=(999,1000,1001)\), the mean is \(1000\). The centered squares are \(1,0,1\), so the population variance is \(2/3\). Centering avoids subtracting two large second-moment quantities.`],
    ["Interpret epsilon in normalization", String.raw`If a feature is constant, \(\sigma^2=0\). With \(\varepsilon=10^{-4}\), the denominator \(\sqrt{\sigma^2+\varepsilon}=0.01\), so the normalization operation remains defined.`],
    ["Compute a condition number", String.raw`For \(A=\operatorname{diag}(8,0.2)\), \(\sigma_{\max}=8\) and \(\sigma_{\min}=0.2\). Thus \(\kappa_2(A)=40\). Perturbations along the weak direction can be amplified much more than in an isotropic system.`],
    ["Take Newton iterations for a square root", String.raw`To solve \(x^2=5\), use \(x_{t+1}=\tfrac12(x_t+5/x_t)\). From \(x_0=2\), \(x_1=2.25\), \(x_2\approx2.2361\), which is already close to \(\sqrt5\).`],
    ["Check a derivative numerically", String.raw`For \(f(x)=x^3\) at \(x=2\), the exact derivative is \(12\). With \(h=0.001\), the central difference \(\bigl(f(2.001)-f(1.999)\bigr)/(0.002)\) is approximately \(12.000001\).`],
    ["Vectorize a mini-batch score", String.raw`If \(X\in\mathbb{R}^{32\times128}\) and \(w\in\mathbb{R}^{128}\), then \(Xw\in\mathbb{R}^{32}\). One matrix-vector operation produces one scalar score for each of 32 examples.`],
    ["Estimate dense matrix-multiply work", String.raw`For \(A\in\mathbb{R}^{64\times256}\) and \(B\in\mathbb{R}^{256\times512}\), \(AB\in\mathbb{R}^{64\times512}\). The leading arithmetic scale is \(64\cdot256\cdot512\approx8.39\) million multiplicative contributions.`],
    ["Compare dense and sparse storage intuition", String.raw`A \(1000\times1000\) matrix has one million logical entries. If only 5,000 entries are nonzero, the density is \(0.5\%\). A sparse format can avoid storing most zeros, but it must also store indices.`],
    ["Reason about activation memory", String.raw`If one layer output has shape \(B\times T\times d=8\times2048\times4096\), it contains \(67{,}108{,}864\) elements. At 2 bytes per element, that one activation is about \(128\) MiB before additional buffers. Shape arithmetic makes the memory cost visible.`],
    ["Separate seed from full determinism", String.raw`Two runs can share seed \(7\) yet differ if a GPU kernel uses nondeterministic parallel reduction order. The seed controls pseudorandom state; deterministic execution requires additional conditions.`],
    ["Prefer solving to explicit inversion", String.raw`For \(A=\begin{bmatrix}2&0\\0&4\end{bmatrix}\) and \(b=(6,8)^\top\), the solution of \(Ax=b\) is \(x=(3,2)^\top\). Writing \(A^{-1}b\) is mathematically fine, but numerical software should generally solve the system without explicitly constructing the inverse.`]
  ];

  day13.practice = [
    String.raw`A toy format stores four significant decimal digits. How is \(12.3456\) stored? <details><summary>Answer</summary><p>Approximately \(12.35\). The exact rounding rule can depend on the format, but four significant digits keep \(1,2,3,5\) after rounding.</p></details>`,
    String.raw`Why can \((a+b)+c\) differ from \(a+(b+c)\) in floating-point arithmetic? <details><summary>Answer</summary><p>Each intermediate result can be rounded. The two evaluation orders create different intermediate values, so they can lose different information.</p></details>`,
    String.raw`What numerical problem occurs when two nearly equal approximate numbers are subtracted? <details><summary>Answer</summary><p>Catastrophic cancellation. Leading digits cancel, so the remaining small result can have large relative error.</p></details>`,
    String.raw`For logits \(z=(700,701,702)^\top\), what constant should stable softmax subtract? <details><summary>Answer</summary><p>Subtract the maximum, \(m=702\), from every logit. The shifted logits are \((-2,-1,0)^\top\).</p></details>`,
    String.raw`Rewrite \(\log(e^{1000}+e^{999})\) in stable log-sum-exp form. <details><summary>Solution</summary><p>Use \(m=1000\): \(1000+\log(1+e^{-1})\).</p></details>`,
    String.raw`Why can \(\mathbb{E}[X^2]-\mathbb{E}[X]^2\) be unstable when variance is small? <details><summary>Answer</summary><p>The two terms can be large and almost equal. Their subtraction can lose the low-order digits that contain the variance.</p></details>`,
    String.raw`A normalization formula uses \(\sqrt{v+\varepsilon}\). If \(v=0\) and \(\varepsilon=10^{-6}\), what is the denominator? <details><summary>Answer</summary><p>\(\sqrt{10^{-6}}=10^{-3}=0.001\).</p></details>`,
    String.raw`If a matrix has singular values \(12\) and \(0.03\), what is its 2-norm condition number? <details><summary>Solution</summary><p>\(\kappa_2=12/0.03=400\).</p></details>`,
    String.raw`What is the difference between an ill-conditioned problem and an unstable algorithm? <details><summary>Answer</summary><p>Ill-conditioning means the exact mathematical answer is sensitive to small input perturbations. Instability means the computational procedure unnecessarily amplifies numerical errors.</p></details>`,
    String.raw`For \(f(x)=x^2\), \(x=4\), and \(h=0.1\), compute the central-difference derivative. <details><summary>Solution</summary><p>\(\bigl(4.1^2-3.9^2\bigr)/0.2=(16.81-15.21)/0.2=8\), which matches the exact derivative \(2x=8\).</p></details>`,
    String.raw`Why should gradient checking usually use a small deterministic model rather than a full training run? <details><summary>Answer</summary><p>Finite differences are expensive, and randomness can change the loss between evaluations. A small deterministic model isolates derivative errors.</p></details>`,
    String.raw`If \(X\in\mathbb{R}^{64\times256}\) and \(W\in\mathbb{R}^{256\times128}\), what is the shape of \(XW\), and what is the leading dense multiplication complexity? <details><summary>Answer</summary><p>The result has shape \(64\times128\). The leading arithmetic scale is \(O(64\cdot256\cdot128)\).</p></details>`,
    String.raw`A \(10{,}000\times10{,}000\) matrix has 20,000 nonzero entries. What is the main reason to consider sparse storage? <details><summary>Answer</summary><p>The logical matrix has 100 million entries but only 20,000 nonzeros. Sparse storage can avoid storing and processing most zeros, subject to index and access overhead.</p></details>`,
    String.raw`What trade-off does activation checkpointing make? <details><summary>Answer</summary><p>It reduces stored activation memory and increases computation because some forward values are recomputed during backpropagation.</p></details>`,
    String.raw`Does setting one random seed guarantee identical results on every machine? <details><summary>Answer</summary><p>No. Hardware, library versions, parallel execution, and nondeterministic kernels can still change results.</p></details>`,
    String.raw`A paper writes \(x=A^{-1}b\). What numerical implementation should you usually expect for a large system? <details><summary>Answer</summary><p>A direct factorization-based solve or an iterative linear solver, not explicit formation of \(A^{-1}\).</p></details>`
  ];
})();
