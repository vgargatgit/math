// Continue Day 6: softmax Jacobian
day6.sections.push({
  id: "softmax-family",
  title: "10. Softmax couples all output coordinates",
  html: String.raw`
    <p>For logits \(z\in\mathbb{R}^{K}\), softmax is</p>
    <p>\[p_i=\frac{e^{z_i}}{\sum_{j=1}^{K}e^{z_j}}.\]</p>
    <p>Changing one logit changes the shared denominator. Therefore, it changes every probability. The Jacobian is not diagonal:</p>
    <p>\[\frac{\partial p_i}{\partial z_j}=p_i(\delta_{ij}-p_j).\]</p>
    <p>In matrix form,</p>
    <p>\[J_{\mathrm{softmax}}=\operatorname{diag}(p)-pp^\top.\]</p>
    <h3>Numerical Jacobian</h3>
    <p>For \(p=(0.2,0.3,0.5)^\top\),</p>
    <p>\[J=\begin{bmatrix}0.16&-0.06&-0.10\\-0.06&0.21&-0.15\\-0.10&-0.15&0.25\end{bmatrix}.\]</p>
    <p>Each row sums to zero. Adding the same constant to every logit does not change the probabilities.</p>
  `
});
