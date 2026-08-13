day6.sections.push({
  id: "normalization",
  title: "11. Vector normalization couples coordinates",
  html: String.raw`
    <p>For a nonzero vector, define \(y=x/\|x\|_2\). The denominator depends on every coordinate, so the Jacobian is not diagonal.</p>
    <p>Write \(r=\|x\|_2\). Then</p>
    <p>\[J=\frac{1}{r}I-\frac{1}{r^3}xx^\top.\]</p>
    <h3>Numerical example</h3>
    <p>For \(x=(3,4)^\top\), \(r=5\). Therefore,</p>
    <p>\[J=\begin{bmatrix}0.128&-0.096\\-0.096&0.072\end{bmatrix}.\]</p>
    <p>The off-diagonal terms show that changing one input coordinate can change both output coordinates.</p>
    <div class="paper-connection"><strong>Why this matters.</strong> Similar derivative coupling appears when a model rescales activations by statistics computed from several coordinates.</div>
  `
});
