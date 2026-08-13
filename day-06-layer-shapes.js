day6.sections.push({
  id: "ml-backward-pass",
  title: "14. Derive one neural-layer update by shape",
  html: String.raw`
    <p>For a batch, use \(Z=XW+\mathbf{1}b\) and \(A=\phi(Z)\).</p>
    <p>The shapes are \(X:B\times m\), \(W:m\times n\), \(b:1\times n\), and \(Z,A:B\times n\).</p>
    <p>Let \(G_A=\partial L/\partial A\) have shape \(B\times n\). For an element-wise activation,</p>
    <p>\[G_Z=G_A\odot\phi'(Z).\]</p>
    <p>Then</p>
    <p>\[G_W=X^\top G_Z,\qquad G_X=G_ZW^\top.\]</p>
    <p>The weight result has shape \((m\times B)(B\times n)=m\times n\). The input result has shape \((B\times n)(n\times m)=B\times m\).</p>
    <p>The bias is shared across all batch rows, so</p>
    <p>\[G_b=\sum_{r=1}^{B}(G_Z)_{r,:}.\]</p>
    <div class="definition"><strong>Shape habit.</strong> Every derivative with respect to a stored object must have that object's shape.</div>
  `
});
