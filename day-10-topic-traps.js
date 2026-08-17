day10.sections.push({
  id: "topic-traps",
  title: "20A. Topic-by-topic notation traps to check in papers",
  html: String.raw`
    <p>Use this table when a paper moves quickly. Each row names one easy mistake for a concept from this lesson.</p>
    <table>
      <thead><tr><th>Topic</th><th>Common mistake or misleading notation</th></tr></thead>
      <tbody>
        <tr><td>Self-information</td><td>Forgetting the minus sign in \(-\log p\), or comparing bits and nats without checking the log base.</td></tr>
        <tr><td>Entropy</td><td>Treating high entropy as model error. Entropy describes uncertainty in a distribution, not correctness.</td></tr>
        <tr><td>Binary entropy</td><td>Forgetting that \(H_{\mathrm{bin}}(p)=H_{\mathrm{bin}}(1-p)\) and that \(0\log0\) is interpreted by a limit.</td></tr>
        <tr><td>Joint/conditional entropy</td><td>Confusing \(H(Y\mid X)\) with \(H(X\mid Y)\). Conditioning has a direction.</td></tr>
        <tr><td>Cross-entropy</td><td>Not checking which distribution supplies the data weights and which supplies the log probabilities.</td></tr>
        <tr><td>KL divergence</td><td>Calling KL a distance. It is directed and can be infinite when the second distribution assigns zero mass where the first has positive mass.</td></tr>
        <tr><td>Mutual information</td><td>Equating mutual information with correlation. MI can detect nonlinear dependence.</td></tr>
        <tr><td>Conditional mutual information</td><td>Reading \(I(X;Y\mid Z)\) as \(I(X;Y,Z)\). The vertical bar changes the question.</td></tr>
        <tr><td>Entropy chain rule</td><td>Dropping the conditioning terms. Later variables are conditioned on earlier variables.</td></tr>
        <tr><td>Coding interpretation</td><td>Assuming entropy is the exact integer bit length of every individual message rather than an average coding limit.</td></tr>
        <tr><td>Maximum entropy</td><td>Ignoring the constraints. The maximum-entropy distribution depends on the allowed support and known moments.</td></tr>
        <tr><td>Perplexity</td><td>Comparing perplexities across incompatible tokenizers or normalization conventions.</td></tr>
        <tr><td>Cross-entropy as NLL</td><td>Computing softmax and then \(\log\) naively instead of using a numerically stable log-softmax/cross-entropy implementation.</td></tr>
        <tr><td>Jensen’s inequality</td><td>Moving a nonlinear function through an expectation as if equality always held.</td></tr>
        <tr><td>Gibbs’ inequality</td><td>Expecting a negative KL value. Exact KL is nonnegative; a negative numerical estimate can indicate estimator noise or implementation error.</td></tr>
        <tr><td>Categorical/Gaussian entropy</td><td>Applying discrete-entropy intuition directly to differential entropy. Differential entropy can be negative.</td></tr>
        <tr><td>Information bottleneck</td><td>Missing a sign convention. Papers can maximize \(I(Z;Y)-\beta I(X;Z)\) or minimize an equivalent negated form.</td></tr>
        <tr><td>Feature selection</td><td>Ranking features only by marginal MI and ignoring redundancy among selected features.</td></tr>
        <tr><td>Variational inference</td><td>Confusing the approximate posterior \(q_\phi(z\mid x)\), the prior \(p(z)\), and the true posterior \(p(z\mid x)\).</td></tr>
        <tr><td>KL asymmetry</td><td>Reading \(D_{\mathrm{KL}}(p\|q)\) and \(D_{\mathrm{KL}}(q\|p)\) as interchangeable.</td></tr>
      </tbody>
    </table>
  `
});
