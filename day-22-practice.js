(() => {
  const day22 = COURSE[7].lessons[0];

  day22.sections.push(
    {
      id: "create-toy-example",
      title: "11. Create a toy numerical example before you trust your interpretation",
      html: String.raw`
        <p>A toy example converts notation into arithmetic. Use the smallest numbers that still preserve the structure of the method.</p>

        <h3>Example: two-token attention</h3>
        <p>Let</p>
        <p>\[
        Q=K=
        \begin{bmatrix}
        1&0\\
        0&1
        \end{bmatrix},
        \qquad
        V=
        \begin{bmatrix}
        10&0\\
        0&20
        \end{bmatrix}.
        \]</p>
        <p>Here \(n=2\) tokens and \(d_k=d_v=2\). The score matrix is</p>
        <p>\[
        S=\frac{QK^\top}{\sqrt2}
        =\frac1{\sqrt2}
        \begin{bmatrix}
        1&0\\
        0&1
        \end{bmatrix}.
        \]</p>
        <p>For the first row, the two unnormalized scores are approximately \((0.707,0)\). Row-wise softmax gives approximately</p>
        <p>\[
        (0.670,0.330).
        \]</p>
        <p>Therefore the first output vector is</p>
        <p>\[
        0.670(10,0)+0.330(0,20)
        =(6.70,6.60).
        \]</p>
        <p>The output is a weighted combination of value vectors. You can now read the equation as a concrete operation instead of as a symbolic block.</p>

        <h3>Why small examples are powerful</h3>
        <p>A toy example can reveal the softmax axis, a missing transpose, a normalization factor, a causal mask, or an unexpected broadcast. Use dimensions such as \(2\times2\) or \(2\times3\) when possible because you can calculate them by hand.</p>
        <div class="shape-check"><strong>Common mistake.</strong> Do not choose a toy example that removes the feature you want to understand. If you are studying masking, use at least two positions. If you are studying multiclass softmax, use at least three classes.</div>
      `
    },
    {
      id: "toy-example-probability",
      title: "12. Use a second toy example for probabilistic equations",
      html: String.raw`
        <p>Probability equations often hide normalization and conditioning. Small tables make these operations visible.</p>

        <h3>Bayes-rule example</h3>
        <p>Suppose a latent class \(Z\in\{0,1\}\) has</p>
        <p>\[
        P(Z=1)=0.25,
        \qquad
        P(Z=0)=0.75.
        \]</p>
        <p>An observation \(X=1\) has likelihoods</p>
        <p>\[
        P(X=1\mid Z=1)=0.8,
        \qquad
        P(X=1\mid Z=0)=0.2.
        \]</p>
        <p>The marginal probability is</p>
        <p>\[
        P(X=1)=0.8(0.25)+0.2(0.75)=0.35.
        \]</p>
        <p>The posterior is</p>
        <p>\[
        P(Z=1\mid X=1)
        =\frac{0.8(0.25)}{0.35}
        \approx0.571.
        \]</p>
        <p>This calculation makes the normalizer explicit. If a paper writes</p>
        <p>\[
        p(z\mid x)\propto p(x\mid z)p(z),
        \]</p>
        <p>you can see what the omitted proportionality constant must do: it makes the posterior sum or integrate to one.</p>

        <h3>Paper connection</h3>
        <p>Use this technique when reading latent-variable models, Bayesian updates, energy-based models, or normalized attention. A two-state example can show what a denominator means more clearly than a general integral.</p>
      `
    },
    {
      id: "implement-equation",
      title: "13. Implement one key equation as a direct reference version",
      html: String.raw`
        <p>Implementation is a mathematical test. Start with a literal reference implementation before you optimize it.</p>

        <h3>Example: stable softmax</h3>
        <p>The mathematical softmax is</p>
        <p>\[
        p_i=\frac{e^{z_i}}{\sum_j e^{z_j}}.
        \]</p>
        <p>For large logits, direct exponentiation can overflow. Use shift invariance:</p>
        <p>\[
        \operatorname{softmax}(z)
        =\operatorname{softmax}(z-c\mathbf 1).
        \]</p>
        <p>Choose</p>
        <p>\[
        c=\max_j z_j.
        \]</p>
        <p>Then compute</p>
        <p>\[
        p_i=\frac{e^{z_i-c}}{\sum_j e^{z_j-c}}.
        \]</p>

        <h3>Numerical example</h3>
        <p>Let \(z=(1000,1001,1002)^\top\). Subtract \(1002\):</p>
        <p>\[
        z' = (-2,-1,0)^\top.
        \]</p>
        <p>The exponentials are finite:</p>
        <p>\[
        (e^{-2},e^{-1},1)\approx(0.135,0.368,1).
        \]</p>
        <p>The normalized probabilities are approximately</p>
        <p>\[
        (0.090,0.245,0.665).
        \]</p>

        <h3>Reference implementation checklist</h3>
        <ol>
          <li>Write the expected input and output shapes.</li>
          <li>Use the paper equation directly.</li>
          <li>Test small hand-computed inputs.</li>
          <li>Check invariants such as sums, symmetry, or non-negativity.</li>
          <li>Only then compare with an optimized library operation.</li>
        </ol>
        <div class="paper-connection"><strong>Paper connection.</strong> A fast implementation can hide transposes, fused normalization, masking, or numerical stabilization. A slow reference implementation gives you a ground truth for interpretation.</div>
      `
    },
    {
      id: "implementation-shape-tests",
      title: "14. Turn shape reasoning and invariants into implementation tests",
      html: String.raw`
        <p>Before you reproduce a full model, test the local equation.</p>

        <h3>Attention tests</h3>
        <p>For</p>
        <p>\[
        Q,K\in\mathbb R^{B\times H\times T\times d_k},
        \qquad
        V\in\mathbb R^{B\times H\times T\times d_v},
        \]</p>
        <p>the score tensor must have shape</p>
        <p>\[
        S\in\mathbb R^{B\times H\times T\times T}.
        \]</p>
        <p>After row-wise softmax over the final axis, each row should satisfy</p>
        <p>\[
        \sum_{j=1}^{T}A_{bhij}=1.
        \]</p>
        <p>The weighted output must have shape</p>
        <p>\[
        O\in\mathbb R^{B\times H\times T\times d_v}.
        \]</p>

        <h3>Covariance tests</h3>
        <p>If a paper constructs a sample covariance matrix \(C\in\mathbb R^{d\times d}\), check</p>
        <p>\[
        C^\top=C
        \]</p>
        <p>and, up to floating-point error,</p>
        <p>\[
        x^\top Cx\ge0
        \]</p>
        <p>for random test vectors \(x\).</p>

        <h3>Probability tests</h3>
        <p>If \(p\) is a categorical distribution, verify</p>
        <p>\[
        p_i\ge0,
        \qquad
        \sum_i p_i=1.
        \]</p>
        <p>If a paper reports log probabilities, do not test whether the log values sum to one. Exponentiate or use log-sum-exp.</p>
        <div class="definition"><strong>Test rule.</strong> Convert mathematical properties into assertions. Shapes, normalization, symmetry, monotonicity, conservation laws, and limiting cases make excellent local tests.</div>
      `
    },
    {
      id: "math-versus-empirical-evidence",
      title: "15. Separate mathematical evidence from empirical evidence",
      html: String.raw`
        <p>A mathematical result and an experimental result answer different questions.</p>

        <h3>Mathematical evidence</h3>
        <p>A theorem can prove a statement under assumptions. For example, if \(L\) is \(\mu\)-strongly convex and has an \(L_s\)-Lipschitz gradient, gradient descent with a suitable step size has a convergence guarantee. The theorem describes an idealized mathematical setting.</p>

        <h3>Empirical evidence</h3>
        <p>An experiment can show that a method obtained a measured result on selected datasets, seeds, hardware, preprocessing, and hyperparameters. It does not prove a universal statement.</p>

        <h3>Example: low-rank approximation</h3>
        <p>The Eckart-Young theorem states that the rank-\(k\) truncated SVD minimizes matrix reconstruction error in standard spectral or Frobenius norms:</p>
        <p>\[
        A_k=\arg\min_{\operatorname{rank}(B)\le k}\|A-B\|_F.
        \]</p>
        <p>This is a mathematical guarantee about reconstruction error. It does <strong>not</strong> prove that replacing a neural-network weight matrix with \(A_k\) preserves downstream accuracy. That requires empirical evidence or an additional theorem that links matrix error to task performance.</p>

        <h3>Example: benchmark improvement</h3>
        <p>Suppose a paper reports accuracy values \(88.2\%\pm0.4\%\) and \(88.7\%\pm0.5\%\). The difference is \(0.5\) percentage points, but the uncertainty ranges overlap. You need information about the number of runs, pairing, variance, and statistical procedure before making a strong significance claim.</p>

        <h3>Evidence ledger</h3>
        <p>For each major conclusion, record:</p>
        <ul>
          <li>the mathematical result that supports it;</li>
          <li>the assumptions of that result;</li>
          <li>the experiment that supports it;</li>
          <li>the metric and dataset;</li>
          <li>the ablation or baseline that isolates the claimed mechanism.</li>
        </ul>
        <div class="paper-connection"><strong>Reading rule.</strong> Do not ask “Is the paper proven?” Ask which claims are mathematical, which are empirical, and whether each claim has the correct kind of evidence.</div>
      `
    },
    {
      id: "worked-paper-reconstruction",
      title: "16. Complete worked reconstruction: read a miniature representation-learning method",
      html: String.raw`
        <p>Use one miniature method to combine the full workflow.</p>

        <h3>Method statement</h3>
        <p>Assume a paper defines an encoder</p>
        <p>\[
        z_i=f_\theta(x_i)\in\mathbb R^d
        \]</p>
        <p>and normalizes embeddings:</p>
        <p>\[
        \bar z_i=\frac{z_i}{\|z_i\|_2}.
        \]</p>
        <p>For each example, it uses one positive embedding \(\bar z_i^+\) and \(K\) negative embeddings \(\bar z_{ij}^-\). The loss is</p>
        <p>\[
        \ell_i=-\log
        \frac{\exp(\bar z_i^\top\bar z_i^+/\tau)}
        {\exp(\bar z_i^\top\bar z_i^+/\tau)+
        \sum_{j=1}^{K}\exp(\bar z_i^\top\bar z_{ij}^-/\tau)}.
        \]</p>

        <h3>Step 1: identify objects</h3>
        <p>\(x_i\) is an input. \(f_\theta\) is a parameterized function. \(z_i\) and \(\bar z_i\) are vectors. \(\tau\) is a positive scalar. \(\ell_i\) is a scalar loss.</p>

        <h3>Step 2: annotate shapes</h3>
        <p>If a batch has \(B\) examples, collected embeddings have shape</p>
        <p>\[
        Z\in\mathbb R^{B\times d}.
        \]</p>
        <p>A full pairwise similarity matrix is</p>
        <p>\[
        S=\bar Z\bar Z^\top\in\mathbb R^{B\times B}.
        \]</p>

        <h3>Step 3: translate notation</h3>
        <p>If the paper uses \(q\), \(k^+\), and \(k^-\), you can rewrite them as anchor, positive, and negative embeddings. Keep one notation in your notes.</p>

        <h3>Step 4: identify the objective</h3>
        <p>The loss is a cross-entropy over one positive candidate and \(K\) negative candidates. It increases the relative probability assigned to the positive pair.</p>

        <h3>Step 5: list assumptions</h3>
        <p>The normalization requires \(z_i\ne0\). The temperature requires \(\tau>0\). The interpretation of negatives depends on how they are sampled. If false negatives are common, the loss can push semantically related examples apart.</p>

        <h3>Step 6: create a toy example</h3>
        <p>Let positive similarity be \(0.8\), negative similarities be \(0.2\) and \(-0.1\), and \(\tau=0.5\). The scaled logits are</p>
        <p>\[
        (1.6,0.4,-0.2).
        \]</p>
        <p>The exponentials are approximately</p>
        <p>\[
        (4.953,1.492,0.819).
        \]</p>
        <p>The positive probability is</p>
        <p>\[
        \frac{4.953}{4.953+1.492+0.819}\approx0.682,
        \]</p>
        <p>so the loss is approximately</p>
        <p>\[
        -\log(0.682)\approx0.383.
        \]</p>

        <h3>Step 7: connect mathematics to evidence</h3>
        <p>The equation proves nothing by itself about downstream classification accuracy. The paper must test whether the learned representation transfers to the chosen tasks. An ablation on temperature, negative sampling, or normalization can help connect the objective design to empirical performance.</p>
        <div class="paper-connection"><strong>Final practicum lesson.</strong> You do not need to understand every paragraph before you can reason about a method. Reconstruct the mathematical core, test it with small numbers, and then return to the prose with a sharper model.</div>
      `
    }
  );
})();
