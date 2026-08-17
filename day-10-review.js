day10.sections.push(
  {
    id: "common-mistakes-recap",
    title: "21. Common mistakes and a compact paper-reading checklist",
    html: String.raw`
      <p>Information-theory notation is compact, so small changes in argument order or conditioning can change the meaning.</p>
      <h3>Common mistakes</h3>
      <ul>
        <li><strong>Entropy versus cross-entropy:</strong> \(H(p)\) measures uncertainty inside \(p\). \(H(p,q)\) measures the cost of using \(q\) on data from \(p\).</li>
        <li><strong>Cross-entropy versus KL:</strong> \(H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q)\). KL removes the irreducible entropy of \(p\).</li>
        <li><strong>KL direction:</strong> \(D_{\mathrm{KL}}(p\|q)\) and \(D_{\mathrm{KL}}(q\|p)\) are generally different.</li>
        <li><strong>Mutual information versus correlation:</strong> mutual information detects general statistical dependence. Correlation measures a narrower kind of association.</li>
        <li><strong>Discrete versus continuous entropy:</strong> differential entropy can be negative and depends on the coordinate scale. Do not transfer every discrete-entropy intuition unchanged.</li>
        <li><strong>Perplexity comparisons:</strong> compare perplexity only when tokenization and evaluation conventions are compatible.</li>
        <li><strong>Exact quantities versus estimators:</strong> high-dimensional mutual information and KL terms are often estimated or bounded. Read the estimator and assumptions.</li>
      </ul>
      <h3>Paper-reading checklist</h3>
      <ol>
        <li>Identify which distribution generates the expectation.</li>
        <li>Check the logarithm base if the numerical unit matters.</li>
        <li>Check the KL argument order.</li>
        <li>For conditional quantities, list exactly what is known after the vertical bar.</li>
        <li>For tensors of probabilities, identify which axis is normalized and which axes are reduced.</li>
        <li>Ask whether a reported information quantity is exact, estimated, or only a bound.</li>
      </ol>
      <div class="paper-connection">
        <strong>Core mental model.</strong> Surprise is \(-\log p\). Entropy averages surprise under the same distribution. Cross-entropy averages surprise using another distribution. KL measures the extra mismatch cost. Mutual information measures how much uncertainty one variable removes about another.
      </div>
    `
  }
);

Object.assign(day10, {
  examples: [
    ["Self-information of a rare event", String.raw`An event has probability \(p=0.01\). Using natural logs, its information is \(-\log(0.01)\approx4.605\) nats. With base 2, it is \(-\log_2(0.01)\approx6.644\) bits.`],
    ["Entropy of a fair four-class distribution", String.raw`For \(p=(1/4,1/4,1/4,1/4)\), \(H(p)=-4(1/4)\log_2(1/4)=2\) bits. Four equally likely outcomes require two bits on average in the ideal coding view.`],
    ["Low-entropy classifier output", String.raw`For binary prediction \(p=(0.99,0.01)\), entropy is about \(0.081\) bits. For \((0.5,0.5)\), entropy is \(1\) bit. The first prediction is much more concentrated.`],
    ["Cross-entropy from a one-hot target", String.raw`If the correct class is class 3 and \(q=(0.1,0.2,0.6,0.1)\), then \(L=-\log q_3=-\log0.6\approx0.511\) nats.`],
    ["Cross-entropy decomposition", String.raw`If \(H(p)=0.50\) nats and \(D_{\mathrm{KL}}(p\|q)=0.08\) nats, then \(H(p,q)=0.58\) nats. The first \(0.50\) is unavoidable uncertainty; the extra \(0.08\) is mismatch cost.`],
    ["Mutual information from conditional entropy", String.raw`If \(H(Y)=1.4\) bits and observing \(X\) reduces the remaining uncertainty to \(H(Y\mid X)=0.5\) bits, then \(I(X;Y)=1.4-0.5=0.9\) bits.`],
    ["Entropy chain rule for a pair", String.raw`If \(H(X)=1.2\) bits and \(H(Y\mid X)=0.3\) bits, then \(H(X,Y)=1.5\) bits.`],
    ["Ideal code lengths", String.raw`For probabilities \((1/2,1/4,1/8,1/8)\), ideal lengths \(-\log_2p\) are \((1,2,3,3)\) bits. Their weighted average is \(1.75\) bits.`],
    ["Perplexity from token loss", String.raw`If average token NLL is \(2.0\) nats, perplexity is \(e^2\approx7.39\). If NLL falls to \(1.5\), perplexity falls to \(e^{1.5}\approx4.48\).`],
    ["Jensen with a logarithm", String.raw`For \(X\in\{1,3\}\) equally likely, \(\mathbb E[\log X]\approx0.549\), while \(\log\mathbb E[X]=\log2\approx0.693\). The concavity of log gives \(\mathbb E[\log X]\le\log\mathbb E[X]\).`],
    ["Categorical entropy", String.raw`For \(p=(0.5,0.25,0.25)\), entropy is \(1.5\) bits. If the distribution becomes more concentrated, such as \((0.9,0.05,0.05)\), entropy falls.`],
    ["Gaussian entropy and variance", String.raw`For \(X\sim\mathcal N(0,1)\), \(h(X)\approx1.419\) nats. If variance increases to \(4\), entropy rises by \(\tfrac12\log4=\log2\), because the distribution occupies more scale.`],
    ["Feature relevance", String.raw`If \(I(X_1;Y)=0.7\) bits and \(I(X_2;Y)=0.05\) bits, \(X_1\) has much stronger marginal information about \(Y\). This does not yet tell us whether \(X_1\) is redundant with another selected feature.`],
    ["VAE ELBO terms", String.raw`Suppose a VAE has expected reconstruction log-likelihood \(-12\) and KL-to-prior \(3\). Then \(\operatorname{ELBO}=-12-3=-15\). Maximizing ELBO is equivalent to minimizing the negative ELBO \(15\).`],
    ["KL direction", String.raw`For \(p=(0.9,0.1)\) and \(q=(0.5,0.5)\), \(D_{\mathrm{KL}}(p\|q)\approx0.368\) nats but \(D_{\mathrm{KL}}(q\|p)\approx0.511\) nats. Reversing the arguments changes the quantity.`],
    ["Batch cross-entropy shape", String.raw`For logits \(Z\in\mathbb R^{32\times10}\), softmax produces \(Q\in\mathbb R^{32\times10}\). Selecting or summing the correct-class log probability over the class axis gives 32 per-example losses. Averaging over the batch gives one scalar loss.`]
  ],
  practice: [
    String.raw`An event has probability \(1/16\). How much self-information does it carry in bits? <details><summary>Show answer</summary><p>\(-\log_2(1/16)=4\) bits.</p></details>`,
    String.raw`Which has higher entropy: \((0.5,0.5)\) or \((0.99,0.01)\)? Why? <details><summary>Show answer</summary><p>\((0.5,0.5)\) has higher entropy. Its outcome is maximally uncertain for a binary variable, while \((0.99,0.01)\) is strongly concentrated on one outcome.</p></details>`,
    String.raw`For a one-hot target with correct-class model probability \(0.8\), what is the cross-entropy loss in nats? <details><summary>Show answer</summary><p>\(-\log0.8\approx0.223\) nats.</p></details>`,
    String.raw`If \(H(p)=0.7\) and \(H(p,q)=0.9\), what is \(D_{\mathrm{KL}}(p\|q)\)? <details><summary>Show answer</summary><p>\(D_{\mathrm{KL}}(p\|q)=H(p,q)-H(p)=0.2\).</p></details>`,
    String.raw`If \(H(Y)=2\) bits and \(H(Y\mid X)=0.6\) bits, compute \(I(X;Y)\). <details><summary>Show answer</summary><p>\(I(X;Y)=H(Y)-H(Y\mid X)=2-0.6=1.4\) bits.</p></details>`,
    String.raw`If \(X\) and \(Y\) are independent, what is \(I(X;Y)\)? <details><summary>Show answer</summary><p>Zero. Their joint distribution factorizes as \(p(x,y)=p(x)p(y)\), so the KL divergence between these two distributions is zero.</p></details>`,
    String.raw`Given \(H(X)=1.1\) bits and \(H(Y\mid X)=0.4\) bits, compute \(H(X,Y)\). <details><summary>Show answer</summary><p>By the chain rule, \(H(X,Y)=1.1+0.4=1.5\) bits.</p></details>`,
    String.raw`A language model has average token NLL \(\log 25\) nats. What is its perplexity? <details><summary>Show answer</summary><p>\(\operatorname{PPL}=e^{\log25}=25\).</p></details>`,
    String.raw`Why can two models with different tokenizers have perplexities that are not directly comparable? <details><summary>Show answer</summary><p>They predict different token units and can use different numbers of prediction steps for the same text. The normalization basis has changed.</p></details>`,
    String.raw`For concave \(\log\), which is larger: \(\mathbb E[\log X]\) or \(\log\mathbb E[X]\)? <details><summary>Show answer</summary><p>\(\log\mathbb E[X]\) is at least as large. Jensen gives \(\mathbb E[\log X]\le\log\mathbb E[X]\).</p></details>`,
    String.raw`Can \(D_{\mathrm{KL}}(p\|q)\) be negative? <details><summary>Show answer</summary><p>No. Gibbs’ inequality gives \(D_{\mathrm{KL}}(p\|q)\ge0\), with equality when the distributions match on the relevant support.</p></details>`,
    String.raw`A categorical distribution over four classes is uniform. What is its entropy in bits? <details><summary>Show answer</summary><p>\(\log_2 4=2\) bits.</p></details>`,
    String.raw`In the information-bottleneck objective \(I(X;Z)-\beta I(Z;Y)\), what do the two terms encourage? <details><summary>Show answer</summary><p>Minimizing \(I(X;Z)\) encourages compression of input information. The negative \(\beta I(Z;Y)\) term encourages \(Z\) to retain information useful for predicting \(Y\).</p></details>`,
    String.raw`Why can selecting features only by high \(I(X_j;Y)\) keep redundant features? <details><summary>Show answer</summary><p>Two features can each be informative about \(Y\) while carrying nearly the same information. Marginal mutual information does not penalize redundancy between selected features.</p></details>`,
    String.raw`Write the common VAE ELBO as a likelihood term minus a KL term. <details><summary>Show answer</summary><p>\(\operatorname{ELBO}=\mathbb E_{q_\phi(z\mid x)}[\log p_\theta(x\mid z)]-D_{\mathrm{KL}}(q_\phi(z\mid x)\|p(z))\).</p></details>`,
    String.raw`Why must you check the order of arguments in a KL term? <details><summary>Show answer</summary><p>KL is not symmetric. The expectation is taken under the first distribution, so reversing the arguments changes both the weighting and usually the numerical value and optimization behavior.</p></details>`
  ]
});
