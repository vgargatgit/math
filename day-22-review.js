(() => {
  const day22 = COURSE[7].lessons[0];

  day22.sections.push(
    {
      id: "common-mistakes",
      title: "17. Common mistakes when reading AI/ML papers",
      html: String.raw`
        <h3>Mistake 1: read symbols before identifying their types</h3>
        <p>A symbol such as \(p\) can be a probability, a vector, a distribution, or a model parameter. Type it before you manipulate it.</p>
        <h3>Mistake 2: trust implied shapes</h3>
        <p>Authors often omit batch, head, or sequence dimensions. Add them yourself and check every matrix product.</p>
        <h3>Mistake 3: assume notation is consistent across papers</h3>
        <p>One paper can use \(W\) for a matrix and another for a random variable. Translate notation into your own stable system.</p>
        <h3>Mistake 4: treat a definition as evidence</h3>
        <p>Defining a score as an “importance weight” does not prove that it is a faithful explanation of model behavior.</p>
        <h3>Mistake 5: read only the architecture diagram</h3>
        <p>A diagram shows data flow. The objective tells you what training pressure changes the parameters.</p>
        <h3>Mistake 6: skip normalization constants</h3>
        <p>A denominator can control probabilities, density validity, scale, or numerical stability. Determine why it is present.</p>
        <h3>Mistake 7: accept \(\propto\) without checking what was dropped</h3>
        <p>A dropped factor must be constant with respect to the variable of interest if you want an equivalent optimization problem.</p>
        <h3>Mistake 8: assume every stationary point is a minimum</h3>
        <p>Without convexity or second-order information, \(\nabla L=0\) can identify a maximum or saddle point.</p>
        <h3>Mistake 9: confuse expectation over data with a finite batch average</h3>
        <p>\(\mathbb E_{X\sim P}[f(X)]\) is a population quantity. A minibatch mean is a finite estimator.</p>
        <h3>Mistake 10: ignore the axis of softmax or normalization</h3>
        <p>The same tensor can produce different results when normalization is over tokens, classes, channels, or features.</p>
        <h3>Mistake 11: use a toy example that is too symmetric</h3>
        <p>Identity matrices and equal values can hide transpose and axis errors. Use small but asymmetric values for checks.</p>
        <h3>Mistake 12: copy a derivation without naming its rules</h3>
        <p>If you cannot say which step uses the chain rule, Bayes' rule, linearity, or an inequality, you have not fully reconstructed the derivation.</p>
        <h3>Mistake 13: treat implementation details as mathematically irrelevant</h3>
        <p>Clipping, masking, stop-gradient, normalization, epsilon terms, and numerical stabilization can change the effective algorithm.</p>
        <h3>Mistake 14: treat mathematical guarantees as universal empirical guarantees</h3>
        <p>A convergence theorem under convexity does not prove that a deep network will reach a global optimum.</p>
        <h3>Mistake 15: treat one benchmark gain as mechanism evidence</h3>
        <p>A performance improvement can come from parameter count, data processing, compute, tuning, or another confounder. Look for controlled ablations.</p>
        <h3>Mistake 16: ignore baseline strength</h3>
        <p>A weak or poorly tuned baseline can make an improvement look larger than it is.</p>
        <h3>Mistake 17: ignore uncertainty</h3>
        <p>Means without seed counts, standard deviations, confidence intervals, or paired comparisons can hide unstable results.</p>
        <h3>Mistake 18: reproduce the full system before testing one equation</h3>
        <p>Start with a local reference implementation. Large reproductions make mathematical bugs harder to isolate.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "18. A 45-minute workflow for a new technical paper",
      html: String.raw`
        <p>Use this workflow when you need a first serious understanding of a paper. The times are approximate.</p>

        <h3>Minutes 0-5: map the paper</h3>
        <ol>
          <li>Read the title, abstract, introduction, and main figure.</li>
          <li>Write the task in one sentence.</li>
          <li>Write the claimed contribution in one sentence.</li>
          <li>Mark the section that contains the main method and the section that contains the main experiments.</li>
        </ol>

        <h3>Minutes 5-15: build the object and shape ledger</h3>
        <ol start="5">
          <li>List the inputs, targets, parameters, latent variables, intermediate representations, and outputs.</li>
          <li>Add shapes to the central tensors.</li>
          <li>Translate unfamiliar notation into your own notation.</li>
          <li>Mark every overloaded index such as sample, token, layer, time, head, or node.</li>
        </ol>

        <h3>Minutes 15-25: reconstruct the mathematical core</h3>
        <ol start="9">
          <li>Find the central objective, update rule, or factorization.</li>
          <li>Write what is minimized or maximized.</li>
          <li>Reconstruct one derivation step by step.</li>
          <li>List assumptions beside the step that needs them.</li>
          <li>Check one limiting or special case.</li>
        </ol>

        <h3>Minutes 25-35: calculate and implement</h3>
        <ol start="14">
          <li>Create a two- or three-element numerical example.</li>
          <li>Calculate the central equation by hand.</li>
          <li>Write a direct reference implementation.</li>
          <li>Test shape, normalization, symmetry, or other invariants.</li>
        </ol>

        <h3>Minutes 35-45: audit the evidence</h3>
        <ol start="18">
          <li>Separate mathematical claims from empirical claims.</li>
          <li>Record datasets, metrics, baselines, seed counts, and compute.</li>
          <li>Find the ablation that best tests the claimed mechanism.</li>
          <li>Write one remaining uncertainty or assumption that you would test next.</li>
        </ol>

        <h3>One-page paper note</h3>
        <p>A useful final note can contain only seven blocks:</p>
        <ul>
          <li><strong>Problem:</strong> what task is solved?</li>
          <li><strong>Objects and shapes:</strong> what are the main mathematical objects?</li>
          <li><strong>Core equation:</strong> what is optimized or updated?</li>
          <li><strong>Derivation:</strong> what one step did you reconstruct?</li>
          <li><strong>Assumptions:</strong> what conditions matter?</li>
          <li><strong>Evidence:</strong> what do the experiments actually establish?</li>
          <li><strong>Open question:</strong> what is still uncertain?</li>
        </ul>
        <div class="paper-connection"><strong>Completion criterion.</strong> You have a useful first understanding when you can explain the central equation, its shapes, one derivation, one toy calculation, and the evidence for the main claim without copying the paper's wording.</div>
      `
    },
    {
      id: "day22-recap",
      title: "19. Recap: the paper is a system you can reconstruct",
      html: String.raw`
        <ul>
          <li>Identify each symbol as a typed mathematical object.</li>
          <li>Add shapes before you manipulate tensor equations.</li>
          <li>Translate unfamiliar notation into one consistent notation.</li>
          <li>Separate definitions, assumptions, mathematical claims, interpretations, and empirical results.</li>
          <li>Find the central objective, update rule, or probabilistic factorization early.</li>
          <li>Reconstruct at least one important derivation line by line.</li>
          <li>Connect each assumption to the step that needs it.</li>
          <li>Use small asymmetric numerical examples to expose hidden operations.</li>
          <li>Implement a direct reference version before optimizing the code.</li>
          <li>Turn mathematical invariants into implementation tests.</li>
          <li>Do not confuse a theorem with a benchmark result.</li>
          <li>Do not confuse an empirical improvement with proof of the proposed mechanism.</li>
          <li>A one-page reconstruction is often more useful than many pages of copied notes.</li>
        </ul>
      `
    }
  );

  day22.examples = [
    ["Attention shape trace", String.raw`If \(Q,K\in\mathbb R^{8\times64}\) and \(V\in\mathbb R^{8\times32}\), then \(QK^\top\in\mathbb R^{8\times8}\) and the attention output is \(8\times32\).`],
    ["Linear layer", String.raw`If \(X\in\mathbb R^{32\times768}\) and \(W\in\mathbb R^{768\times3072}\), then \(XW\in\mathbb R^{32\times3072}\).`],
    ["Contrastive objective", String.raw`Scores \((2,1,0)\) with temperature \(1\) give positive probability about \(0.665\) and loss about \(0.408\).`],
    ["Softmax gradient", String.raw`For logits \((2,1,0)\) and class 1 as target, \(p\approx(0.665,0.245,0.090)\) and \(\nabla_zL=p-y\approx(-0.335,0.245,0.090)\).`],
    ["Bayes update", String.raw`With prior \(P(Z=1)=0.25\), likelihoods \(0.8\) and \(0.2\), observing \(X=1\) gives posterior \(P(Z=1\mid X=1)\approx0.571\).`],
    ["Stable softmax", String.raw`For logits \((1000,1001,1002)\), subtract 1002 before exponentiation to get probabilities approximately \((0.090,0.245,0.665)\).`],
    ["Rank assumption", String.raw`For \(A=\begin{bmatrix}1&2\\2&4\end{bmatrix}\), \(A\) has rank one, so \((A^\top A)^{-1}\) does not exist.`],
    ["Finite difference", String.raw`For \(f(\theta)=\theta^2\), \(\theta=3\), and \(\varepsilon=0.001\), the centered finite-difference derivative is approximately \(6\).`],
    ["Two-token attention", String.raw`With identity \(Q=K\) and diagonal values \((10,0)\), \((0,20)\), the first attention row is approximately \((0.670,0.330)\), giving output \((6.70,6.60)\).`],
    ["Evidence distinction", String.raw`A best-rank-\(k\) reconstruction theorem for SVD does not by itself guarantee preserved downstream classifier accuracy after weight compression.`]
  ];

  day22.practice = [
    String.raw`A paper writes \(H=XW\) with \(X\in\mathbb R^{64\times128}\) and \(W\in\mathbb R^{128\times256}\). What is the shape of \(H\)?<details><summary>Answer</summary><p>\(H\in\mathbb R^{64\times256}\).</p></details>`,
    String.raw`If \(L\) is scalar and \(W\in\mathbb R^{128\times256}\), what shape should \(\partial L/\partial W\) have under the usual gradient convention?<details><summary>Answer</summary><p>\(128\times256\), the same shape as \(W\).</p></details>`,
    String.raw`A sentence says “we define \(a_i=\exp(s_i)/\sum_j\exp(s_j)\).” Is this a definition or an empirical claim?<details><summary>Answer</summary><p>It is a definition of \(a_i\). Any claim about performance or interpretation needs separate support.</p></details>`,
    String.raw`Why is \(\theta^*=\arg\min_\theta L(\theta)\) different from \(\min_\theta L(\theta)\)?<details><summary>Answer</summary><p>The argmin returns an optimizing parameter value. The minimum returns the objective value attained there.</p></details>`,
    String.raw`For scores \((1,0)\), compute the two-class softmax probability of the first score approximately.<details><summary>Answer</summary><p>\(e/(e+1)\approx0.731\).</p></details>`,
    String.raw`In \(p(z\mid x)\propto p(x\mid z)p(z)\), what does the omitted normalization do?<details><summary>Answer</summary><p>It makes the posterior sum or integrate to one over \(z\).</p></details>`,
    String.raw`When can you safely drop an additive term from an optimization objective over \(\theta\)?<details><summary>Answer</summary><p>When the term is constant with respect to \(\theta\). Then it does not change the optimizer.</p></details>`,
    String.raw`What assumption is needed for the explicit least-squares formula \((A^\top A)^{-1}A^\top b\)?<details><summary>Answer</summary><p>\(A\) must have full column rank so that \(A^\top A\) is invertible.</p></details>`,
    String.raw`Does zero covariance always imply independence?<details><summary>Answer</summary><p>No. Independence implies zero covariance when the moments exist, but zero covariance does not imply independence in general.</p></details>`,
    String.raw`Why should a toy example often use asymmetric numbers?<details><summary>Answer</summary><p>Symmetric values can hide transpose, axis, sign, and indexing errors because several wrong operations can accidentally give the same result.</p></details>`,
    String.raw`For \(Q,K\in\mathbb R^{5\times16}\), what is the shape of \(QK^\top\)?<details><summary>Answer</summary><p>\(5\times5\).</p></details>`,
    String.raw`If row-wise attention weights are \((0.2,0.3,0.5)\), what invariant should hold?<details><summary>Answer</summary><p>They should be nonnegative and sum to one. Here the sum is \(1\).</p></details>`,
    String.raw`Why can subtracting the maximum logit before softmax improve numerical stability without changing the result?<details><summary>Answer</summary><p>Softmax is invariant to adding or subtracting the same constant from every logit, and the shift prevents very large exponentials.</p></details>`,
    String.raw`A theorem proves convergence for a strongly convex objective. Can you directly conclude that the same guarantee holds for a nonconvex deep network?<details><summary>Answer</summary><p>No. The theorem depends on assumptions that the deep-network objective does not generally satisfy.</p></details>`,
    String.raw`A model improves mean accuracy from \(90.0\%\) to \(90.3\%\). What extra information do you need before calling the gain reliable?<details><summary>Answer</summary><p>You need information such as number of runs, variance or confidence intervals, pairing of runs, test protocol, and ideally a suitable statistical comparison.</p></details>`,
    String.raw`What is the difference between a mathematical claim and an empirical observation?<details><summary>Answer</summary><p>A mathematical claim follows from definitions and assumptions through proof or derivation. An empirical observation is measured from data or experiments.</p></details>`,
    String.raw`Give one useful invariant for a covariance matrix.<details><summary>Answer</summary><p>It should be symmetric. A valid covariance matrix is also positive semidefinite.</p></details>`,
    String.raw`Why should you implement a direct reference equation before a fused optimized version?<details><summary>Answer</summary><p>The direct version is easier to compare with hand calculations and makes transposes, axes, masks, and normalizations visible.</p></details>`,
    String.raw`What seven items can fit in a one-page paper reconstruction?<details><summary>Answer</summary><p>Problem, objects and shapes, core equation, one reconstructed derivation, assumptions, evidence, and one open question.</p></details>`,
    String.raw`A paper says an attention weight is an “explanation.” Which ledger label should you consider first: definition, theorem, empirical evidence, or interpretation?<details><summary>Answer</summary><p>Usually interpretation. The weight can be mathematically defined without proving that it is a faithful causal explanation.</p></details>`,
    String.raw`If the positive contrastive similarity is \(0.8\), negatives are \(0.2\) and \(-0.1\), and \(\tau=0.5\), what are the scaled logits?<details><summary>Answer</summary><p>\((1.6,0.4,-0.2)\).</p></details>`,
    String.raw`What should you do if a paper's equation and released implementation disagree?<details><summary>Answer</summary><p>Record the discrepancy explicitly, test both interpretations if possible, check errata or later revisions, and do not silently assume that one source is authoritative.</p></details>`
  ];
})();
