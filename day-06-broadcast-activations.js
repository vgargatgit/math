// Continue Day 6: broadcasting, reductions, and activation derivatives
day6.sections.push(
  {
    id: "broadcast-reduction",
    title: "8. Broadcasting and reductions reverse each other during backpropagation",
    html: String.raw`
      <p>Modern ML code uses broadcasting. A small tensor is repeated logically across a larger tensor without storing explicit copies.</p>
      <h3>Broadcasted bias</h3>
      <p>Let a batch be</p>
      <p>\[Z=XW+\mathbf{1}b,\]</p>
      <p>where \(X\in\mathbb{R}^{B\times m}\), \(W\in\mathbb{R}^{m\times n}\), \(b\in\mathbb{R}^{1\times n}\), and \(\mathbf{1}\in\mathbb{R}^{B\times1}\). The bias is used in every batch row.</p>
      <p>If the upstream gradient is \(G=\partial L/\partial Z\in\mathbb{R}^{B\times n}\), then the bias gradient must add the contribution from every row:</p>
      <p>\[\frac{\partial L}{\partial b}=\sum_{r=1}^{B}G_{r,:}.\]</p>
      <p>In code, this is a reduction over the broadcasted batch axis.</p>
      <h3>Reduction</h3>
      <p>If</p>
      <p>\[s=\sum_{i=1}^{n}x_i,\]</p>
      <p>then</p>
      <p>\[\frac{\partial s}{\partial x}=\mathbf{1}.\]</p>
      <p>The forward pass collapses many entries into one scalar. The backward pass sends the scalar sensitivity back to every contributing entry.</p>
      <div class="definition"><strong>Useful mental rule.</strong> Forward broadcast often becomes backward reduction. Forward reduction often becomes backward broadcast.</div>
    `
  },
  {
    id: "activation-derivatives",
    title: "9. Common activation derivatives are local gates",
    html: String.raw`
      <h3>Sigmoid</h3>
      <p>\[\sigma(x)=\frac{1}{1+e^{-x}},\qquad \sigma'(x)=\sigma(x)(1-\sigma(x)).\]</p>
      <p>At \(x=0\), \(\sigma(0)=0.5\), so \(\sigma'(0)=0.25\). At large positive or negative inputs, the derivative approaches zero. This is sigmoid saturation.</p>
      <h3>Tanh</h3>
      <p>\[\tanh'(x)=1-\tanh^2(x).\]</p>
      <p>At \(x=0\), the derivative is \(1\). At large \(|x|\), it approaches zero.</p>
      <h3>ReLU</h3>
      <p>\[\operatorname{ReLU}(x)=\max(0,x).\]</p>
      <p>A common derivative convention is</p>
      <p>\[\operatorname{ReLU}'(x)=\begin{cases}1,&x>0\\0,&x<0.\end{cases}\]</p>
      <p>At \(x=0\), the mathematical derivative is not defined. Software frameworks choose a convention, often zero.</p>
      <p>For vector inputs, these functions act element-wise, so their Jacobians are diagonal. Backpropagation therefore usually uses element-wise multiplication instead of constructing a diagonal matrix.</p>
      <div class="paper-connection"><strong>Gradient-flow connection.</strong> These derivatives act as gates. Values near zero suppress an upstream gradient. Repeated suppression across layers contributes to vanishing gradients.</div>
    `
  }
);
