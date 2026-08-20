(() => {
  const day13 = COURSE[4].lessons[0];

  day13.sections.push(
    {
      id: "vectorization",
      title: "14. Vectorization expresses many scalar operations as array operations",
      html: String.raw`
        <p><strong>Vectorization</strong> means expressing work with vectors, matrices, or tensors instead of explicit element-by-element loops in high-level code.</p>
        <p>Suppose \(X\in\mathbb{R}^{B\times d}\), \(w\in\mathbb{R}^{d}\), and we want one score per example.</p>
        <p>A scalar loop computes</p>
        <p>\[s_i=\sum_{j=1}^{d}X_{ij}w_j\]</p>
        <p>for every \(i\). The vectorized form is simply</p>
        <p>\[s=Xw,\qquad s\in\mathbb{R}^{B}.\]</p>
        <h3>Small example</h3>
        <p>Let</p>
        <p>\[X=\begin{bmatrix}1&2\\3&4\\5&6\end{bmatrix},\qquad
        w=\begin{bmatrix}2\\-1\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[Xw=\begin{bmatrix}0\\2\\4\end{bmatrix}.\]</p>
        <p>The matrix expression performs the same six multiply-add contributions as the scalar equations, but optimized numerical libraries can schedule them efficiently on SIMD units, GPUs, and matrix accelerators.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Mini-batch training depends on vectorized tensor operations. Papers often describe one example mathematically but implementations add a leading batch dimension and evaluate many examples together.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Vectorization does not change the mathematics. Always verify the scalar equation first, then check that the vectorized form preserves the intended axes.</div>
      `
    },
    {
      id: "memory-layout",
      title: "15. Memory layout affects speed even when tensor shapes are unchanged",
      html: String.raw`
        <p>A tensor has a logical shape and a physical storage layout. The logical shape tells you the axes. The layout tells the system how nearby tensor elements are arranged in memory.</p>
        <p>For a matrix \(A\in\mathbb{R}^{m\times n}\), row-major storage places entries from the same row next to each other. Column-major storage places entries from the same column next to each other. Tensor libraries also use strides to represent views and transposes without copying all data.</p>
        <h3>Example</h3>
        <p>For</p>
        <p>\[A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix},\]</p>
        <p>a row-major sequence is \(1,2,3,4,5,6\). A column-major sequence is \(1,4,2,5,3,6\).</p>
        <p>The matrix is mathematically identical in both cases. But a loop that visits contiguous memory usually uses caches and memory bandwidth more efficiently.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Attention, convolution, transpose, reshape, and tensor-permutation kernels can become memory-bound. A paper can reduce FLOPs yet run slower if the new operation causes expensive data movement.</div>
        <div class="shape-check"><strong>Misleading notation.</strong> Two tensors can both have shape \(B\times T\times d\) but have different strides and physical layouts. Shape compatibility alone does not predict runtime.</div>
      `
    },
    {
      id: "dense-sparse",
      title: "16. Dense and sparse computation store and process different amounts of information",
      html: String.raw`
        <p>A <strong>dense</strong> matrix stores every entry. A <strong>sparse</strong> representation stores mostly the nonzero entries plus index information.</p>
        <h3>Example</h3>
        <p>Consider</p>
        <p>\[A=\begin{bmatrix}
        0&0&5&0\\
        0&0&0&0\\
        2&0&0&0\\
        0&0&0&7
        \end{bmatrix}.\]</p>
        <p>The matrix has \(16\) logical entries but only \(3\) nonzero entries. A sparse format can avoid storing and multiplying many zeros.</p>
        <p>If \(A\in\mathbb{R}^{m\times n}\) has \(\operatorname{nnz}(A)\) nonzeros, a sparse matrix-vector product can often scale roughly with \(\operatorname{nnz}(A)\) rather than \(mn\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Sparse features, recommendation systems, graph adjacency matrices, mixture-of-experts routing, and pruned neural networks can exploit sparsity. But theoretical sparsity does not guarantee hardware speedup.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Sparse formats have index overhead and irregular memory access. A matrix that is only mildly sparse can be slower than a dense kernel. Always separate mathematical sparsity from realized system performance.</div>
      `
    },
    {
      id: "operation-complexity",
      title: "17. Matrix-operation complexity predicts how cost grows with shape",
      html: String.raw`
        <p>Asymptotic operation counts help you compare algorithms before you measure exact runtime.</p>
        <p>For dense matrices</p>
        <p>\[A\in\mathbb{R}^{m\times k},\qquad B\in\mathbb{R}^{k\times n},\]</p>
        <p>the product \(C=AB\) has shape \(m\times n\). Each of its \(mn\) outputs combines \(k\) products, so the arithmetic cost is approximately</p>
        <p>\[O(mkn).\]</p>
        <h3>Numerical shape example</h3>
        <p>If \(m=100\), \(k=200\), and \(n=50\), the computation needs on the order of</p>
        <p>\[100\times200\times50=1{,}000{,}000\]</p>
        <p>multiplicative contributions.</p>
        <p>For self-attention with \(Q,K\in\mathbb{R}^{T\times d}\), forming \(QK^\top\) costs roughly</p>
        <p>\[O(T^2d)\]</p>
        <p>and produces a \(T\times T\) score matrix.</p>
        <div class="paper-connection"><strong>Why this matters for reading papers.</strong> Claims such as “linear attention” or “subquadratic memory” are shape-and-complexity claims. Reconstruct the dominant matrix operations and identify which dimension is assumed to grow.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Big-O hides constants, hardware utilization, parallelism, and memory traffic. A lower asymptotic count can still be slower at realistic sizes.</div>
      `
    },
    {
      id: "time-memory-tradeoffs",
      title: "18. Time-memory trade-offs choose whether to store intermediate values or recompute them",
      html: String.raw`
        <p>Many algorithms can save time by storing intermediate results. They can save memory by discarding those results and recomputing them later.</p>
        <h3>Backpropagation example</h3>
        <p>Suppose a network has \(L\) layers, and each layer activation uses \(M\) bytes for one training step. Storing every activation uses roughly</p>
        <p>\[O(LM)\]</p>
        <p>activation memory.</p>
        <p>Activation checkpointing stores only selected states. During the backward pass, it recomputes missing forward values. Memory decreases, but arithmetic increases.</p>
        <h3>Concrete example</h3>
        <p>If 24 layer outputs each require \(100\) MB, storing all of them requires about \(2.4\) GB. If a checkpoint scheme stores only 6 major states, the directly stored activation footprint can be much smaller, although some layers must run again during backpropagation.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Large-language-model papers often trade compute for memory through checkpointing, recomputation, low-precision storage, offloading, or sharding. The method may make a larger model fit even when it increases wall-clock work.</div>
        <div class="shape-check"><strong>Reading rule.</strong> Distinguish parameter memory, optimizer-state memory, activation memory, temporary workspace, and communication buffers. “Model fits in memory” can depend on all of them.</div>
      `
    },
    {
      id: "random-number-generation",
      title: "19. Pseudorandom numbers are deterministic sequences controlled by state",
      html: String.raw`
        <p>Most ML software uses <strong>pseudorandom number generators</strong>. They produce sequences that behave like random samples for practical purposes, but the sequence is generated deterministically from an internal state.</p>
        <p>A <strong>seed</strong> initializes that state.</p>
        <h3>Conceptual example</h3>
        <p>If a generator initialized with seed \(42\) produces the sequence</p>
        <p>\[0.37,\;0.95,\;0.18,\ldots,\]</p>
        <p>then reinitializing the same generator in the same environment with the same seed is intended to reproduce that sequence.</p>
        <p>Randomness enters ML through parameter initialization, data shuffling, dropout masks, augmentation, sampling, and Monte Carlo estimators.</p>
        <div class="paper-connection"><strong>Why papers report seeds.</strong> Optimization is often stochastic. A single seed can give an unusually good or bad result. Strong experimental practice reports multiple runs or enough information to characterize run-to-run variation.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A fixed seed does not guarantee full reproducibility across all hardware, libraries, parallel execution orders, or nondeterministic kernels. It controls one source of variation, not every source.</div>
      `
    },
    {
      id: "equivalent-formulas",
      title: "20. Mathematically equivalent formulas can have very different numerical behavior",
      html: String.raw`
        <p>This is the central lesson of numerical computation. Symbolic equality does not imply equal floating-point reliability.</p>
        <h3>Example 1: softmax</h3>
        <p>The formulas</p>
        <p>\[\frac{e^{z_i}}{\sum_j e^{z_j}}\]</p>
        <p>and</p>
        <p>\[\frac{e^{z_i-m}}{\sum_j e^{z_j-m}}\]</p>
        <p>are mathematically identical. The second is safer for large logits.</p>
        <h3>Example 2: binary cross-entropy from logits</h3>
        <p>If \(p=\sigma(z)\), a naive positive-label loss is</p>
        <p>\[-\log \sigma(z).\]</p>
        <p>An equivalent stable form is the softplus expression</p>
        <p>\[\log(1+e^{-z}).\]</p>
        <p>For implementation, even softplus is evaluated with stable branches or log-sum-exp-style identities to avoid overflow for extreme \(z\).</p>
        <h3>Example 3: solve, do not invert</h3>
        <p>For a linear system \(Ax=b\), writing</p>
        <p>\[x=A^{-1}b\]</p>
        <p>is mathematically valid when \(A\) is invertible. Numerically, software normally solves \(Ax=b\) using a factorization or iterative solver instead of explicitly forming \(A^{-1}\).</p>
        <div class="paper-connection"><strong>Paper-reading habit.</strong> Separate the equation used to explain a model from the algorithm used to compute it. A paper can write an inverse, a probability product, or a direct exponential while the implementation uses a stable solver, log domain, or shifted expression.</div>
        <div class="shape-check"><strong>Recap rule.</strong> Ask four questions: What values can become very large or small? Where are nearly equal values subtracted? How sensitive is the problem? What is the cost in arithmetic and memory?</div>
      `
    }
  );
})();
