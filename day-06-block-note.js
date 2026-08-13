day6.sections.push({
  id: 'block-jacobians',
  title: '6b. Independent variable groups produce block Jacobians',
  html: String.raw`
    <p>A Jacobian can contain groups of entries instead of only single diagonal entries. This happens when one group of outputs depends on one group of inputs and not on another group.</p>
    <p>If \(y^{(1)}=f(x^{(1)})\) and \(y^{(2)}=g(x^{(2)})\), with no cross-dependence, then</p>
    <p>\[J=\begin{bmatrix}J_f&0\\0&J_g\end{bmatrix}.\]</p>
    <p>The zero blocks are structural. They are zero because those dependencies do not exist.</p>
    <h3>Small example</h3>
    <p>Let \(y_1=x_1+x_2\), \(y_2=x_1-x_2\), and \(y_3=x_3^2\). Then</p>
    <p>\[J=\begin{bmatrix}1&1&0\\1&-1&0\\0&0&2x_3\end{bmatrix}.\]</p>
    <p>The first two outputs form a \(2\times2\) block. The third output forms a separate \(1\times1\) block.</p>
    <div class="paper-connection"><strong>Why this matters in ML.</strong> Independent samples, grouped operations, and modular network parts can create sparse block structure. A paper can use this structure to avoid a large dense derivative matrix.</div>
  `
});
