day6.sections.push({
  id: "logsumexp",
  title: "10b. Log-sum-exp and log-softmax reuse softmax derivatives",
  html: String.raw`
    <p>Define</p>
    <p>\[s(z)=\log\sum_i e^{z_i}.\]</p>
    <p>Differentiate one coordinate:</p>
    <p>\[\frac{\partial s}{\partial z_k}=\frac{e^{z_k}}{\sum_i e^{z_i}}.\]</p>
    <p>This is exactly the softmax value for coordinate \(k\). Therefore,</p>
    <p>\[\nabla s(z)=\operatorname{softmax}(z).\]</p>
    <p>The log-softmax output can be written as \(\ell_i=z_i-s(z)\). Its derivative is</p>
    <p>\[\frac{\partial \ell_i}{\partial z_j}=\delta_{ij}-p_j.\]</p>
    <div class="paper-connection"><strong>Why this matters.</strong> These identities appear in stable probability calculations and in many language-model and classifier objectives.</div>
  `
});
