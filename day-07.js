const day7 = COURSE[1].lessons[2];

Object.assign(day7, {
  published: true,
  summary: "Understand backpropagation as local chain-rule operations on a computation graph. Learn reverse-mode and forward-mode automatic differentiation, gradient accumulation, vector-Jacobian products, Jacobian-vector products, and the shape rules behind common neural-network layers.",
  explanation: "A long ML formula becomes easier when you split it into small operations. The forward pass computes values. The backward pass sends sensitivity information from the loss back through the same graph. Each node uses only its local derivative and the gradient that arrives from later nodes. This view explains backpropagation, automatic differentiation, shared parameters, recurrent networks, and the memory cost of training.",
  topics: [
    "Computation graphs",
    "Forward values",
    "Local derivatives",
    "Upstream and downstream gradients",
    "Chain rule along paths",
    "Gradient contributions from branches",
    "Reverse-mode automatic differentiation",
    "Forward-mode automatic differentiation",
    "Affine layers",
    "Activations",
    "Reductions",
    "Shared parameters",
    "Embeddings",
    "Normalization",
    "Softmax and cross-entropy",
    "Parameter versus activation gradients",
    "Vector-Jacobian products",
    "Jacobian-vector products",
    "Backpropagation through time",
    "Stop-gradient",
    "Gradient checking",
    "Compute and memory cost"
  ],
  sections: [
    {
      id: "graph-intuition",
      title: "1. A computation graph turns one large formula into small operations",
      html: String.raw`
        <p>Suppose the loss is</p>
        <p>\[L=(3x+1)^2.\]</p>
        <p>You can differentiate this formula in one line. A deep network does not have one short line. It can contain millions of operations. A computation graph gives the same chain rule a structure that software can execute.</p>
        <p>Split the formula into nodes:</p>
        <p>\[u=3x,\qquad v=u+1,\qquad L=v^2.\]</p>
        <p>The graph is a directed sequence:</p>
        <p>\[x\longrightarrow u\longrightarrow v\longrightarrow L.\]</p>
        <p>Each node stores a value produced from earlier nodes. Each edge records a dependency.</p>
        <div class="definition">
          <strong>Computation graph.</strong> A computation graph is a directed graph whose nodes are values or operations and whose edges show which values are needed to compute later values.
        </div>
        <h3>Forward pass</h3>
        <p>For \(x=2\):</p>
        <p>\[u=6,\qquad v=7,\qquad L=49.\]</p>
        <p>The forward pass computes these values from inputs to loss.</p>
        <h3>Why this matters for papers</h3>
        <p>When a paper defines a model with several equations, do not treat them as separate facts. Read them as a graph. Ask which equation produces the input to the next equation. This reveals the path that gradients must follow during training.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> PyTorch, JAX, TensorFlow, and other AD systems record or reconstruct computation structure so that derivatives can be propagated automatically. The mathematical idea is still the ordinary chain rule.
        </div>
      `
    },
    {
      id: "local-derivatives",
      title: "2. Backpropagation uses local derivatives, not one giant derivative",
      html: String.raw`
        <p>Each node only needs the derivative of its own output with respect to its direct input.</p>
        <p>For</p>
        <p>\[u=3x,\qquad v=u+1,\qquad L=v^2,\]</p>
        <p>the local derivatives are</p>
        <p>\[\frac{du}{dx}=3,\qquad \frac{dv}{du}=1,\qquad \frac{dL}{dv}=2v.\]</p>
        <p>At \(x=2\), we have \(v=7\), so</p>
        <p>\[\frac{dL}{dv}=14.\]</p>
        <p>Now multiply local derivatives along the path:</p>
        <p>\[\frac{dL}{dx}=\frac{dL}{dv}\frac{dv}{du}\frac{du}{dx}=14\cdot1\cdot3=42.\]</p>
        <p>Check by direct differentiation:</p>
        <p>\[L=(3x+1)^2\quad\Rightarrow\quad \frac{dL}{dx}=6(3x+1).\]</p>
        <p>At \(x=2\), this is also \(42\).</p>
        <div class="shape-check">
          <strong>Reading rule.</strong> When a derivation looks long, identify the local map at each step. You rarely need to write the full composed derivative explicitly.
        </div>
        <p>A common mistake is to differentiate a node with respect to every earlier variable. Backpropagation avoids this. It reuses local derivatives and the chain rule.</p>
      `
    },
    {
      id: "upstream-downstream",
      title: "3. An upstream gradient tells a node how much the loss cares about its output",
      html: String.raw`
        <p>Consider a node</p>
        <p>\[y=f(x).\]</p>
        <p>Suppose the rest of the graph produces a scalar loss \(L\). During the backward pass, the node receives</p>
        <p>\[\frac{\partial L}{\partial y}.\]</p>
        <p>This is often called the <strong>upstream gradient</strong>. The node combines it with its local derivative to produce</p>
        <p>\[\frac{\partial L}{\partial x}=\frac{\partial L}{\partial y}\frac{\partial y}{\partial x}.\]</p>
        <p>This result is sent farther backward. Some texts call it the downstream gradient because it flows to an earlier node. The words upstream and downstream are not perfectly standardized. The equation is safer than the vocabulary.</p>
        <h3>Numerical example</h3>
        <p>Let \(y=x^2\). Suppose \(x=3\), so \(y=9\). If the later graph tells us</p>
        <p>\[\frac{\partial L}{\partial y}=5,\]</p>
        <p>then the local derivative is</p>
        <p>\[\frac{dy}{dx}=2x=6.\]</p>
        <p>Therefore,</p>
        <p>\[\frac{\partial L}{\partial x}=5\cdot6=30.\]</p>
        <p>The node did not need to know how the later graph created the number \(5\). It only needed the incoming gradient and its local derivative.</p>
        <div class="paper-connection">
          <strong>Why this matters in implementation.</strong> A custom autograd operation usually defines a forward computation and a backward rule. The backward rule receives a gradient with respect to the operation output and returns gradients with respect to its inputs.</div>
      `
    },
    {
      id: "branches",
      title: "4. If one value affects the loss through several branches, add the gradient contributions",
      html: String.raw`
        <p>Graphs can branch. Suppose</p>
        <p>\[u=x^2,\qquad v=3x,\qquad L=u+v.\]</p>
        <p>The variable \(x\) affects \(L\) through two paths. The derivative is</p>
        <p>\[\frac{dL}{dx}=\frac{\partial L}{\partial u}\frac{du}{dx}+\frac{\partial L}{\partial v}\frac{dv}{dx}.\]</p>
        <p>Because \(L=u+v\),</p>
        <p>\[\frac{\partial L}{\partial u}=1,\qquad \frac{\partial L}{\partial v}=1.\]</p>
        <p>Thus,</p>
        <p>\[\frac{dL}{dx}=2x+3.\]</p>
        <p>At \(x=2\), the two path contributions are \(4\) and \(3\), so the total is \(7\).</p>
        <div class="definition">
          <strong>Branch rule.</strong> Multiply derivatives along each path. Add contributions from paths that meet at the same variable.
        </div>
        <h3>Why addition is necessary</h3>
        <p>A small change \(dx\) changes both \(u\) and \(v\). Both changes affect the loss. The total first-order loss change is the sum of these effects.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Residual connections, multi-head branches, reused activations, and shared parameters all create multiple gradient paths. Autograd systems accumulate these contributions before updating the earlier value or parameter.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not overwrite a gradient when a node has several children. The correct gradient is the sum of all contributions.</div>
      `
    },
    {
      id: "reverse-mode",
      title: "5. Reverse-mode AD is efficient when many inputs lead to one scalar loss",
      html: String.raw`
        <p>Most training problems have many parameters and one scalar loss:</p>
        <p>\[\theta\in\mathbb{R}^{p},\qquad L(\theta)\in\mathbb{R}.\]</p>
        <p>We want all entries of</p>
        <p>\[\nabla_\theta L\in\mathbb{R}^{p}.\]</p>
        <p><strong>Reverse-mode automatic differentiation</strong> first computes the forward values. Then it starts from</p>
        <p>\[\frac{\partial L}{\partial L}=1\]</p>
        <p>and propagates sensitivities backward through the graph.</p>
        <p>One reverse sweep can compute derivatives of one scalar output with respect to many inputs.</p>
        <h3>Small example</h3>
        <p>Let</p>
        <p>\[L=(x_1x_2+x_3)^2.\]</p>
        <p>Define</p>
        <p>\[u=x_1x_2,\qquad v=u+x_3,\qquad L=v^2.\]</p>
        <p>At \((x_1,x_2,x_3)=(2,3,1)\), we get \(u=6\), \(v=7\), and \(L=49\).</p>
        <p>Backward:</p>
        <p>\[\bar v=\frac{\partial L}{\partial v}=14,\qquad \bar u=14,\qquad \bar x_3=14.\]</p>
        <p>For \(u=x_1x_2\),</p>
        <p>\[\bar x_1=\bar u\,x_2=14\cdot3=42,\qquad \bar x_2=\bar u\,x_1=14\cdot2=28.\]</p>
        <p>One reverse traversal produced all three derivatives.</p>
        <div class="paper-connection">
          <strong>Why deep learning uses reverse mode.</strong> A network can have billions of parameters but usually optimizes one scalar objective per batch. Reverse mode matches this many-input, one-output structure.</div>
      `
    },
    {
      id: "forward-mode",
      title: "6. Forward-mode AD follows one input perturbation through the graph",
      html: String.raw`
        <p>Forward mode asks a different question. Instead of sending loss sensitivity backward, it sends a small input-direction effect forward.</p>
        <p>For a function</p>
        <p>\[y=f(x),\qquad x\in\mathbb{R}^{n},\quad y\in\mathbb{R}^{m},\]</p>
        <p>choose a direction \(r\in\mathbb{R}^{n}\). Forward mode computes</p>
        <p>\[J_f(x)r.\]</p>
        <p>This is a Jacobian-vector product, or JVP.</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[f(x_1,x_2)=\begin{bmatrix}x_1x_2\\x_1+x_2^2\end{bmatrix}.\]</p>
        <p>At \(x=(2,3)^\top\), the Jacobian is</p>
        <p>\[J=\begin{bmatrix}3&2\\1&6\end{bmatrix}.\]</p>
        <p>Choose the direction</p>
        <p>\[r=\begin{bmatrix}1\\-1\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[Jr=\begin{bmatrix}3&2\\1&6\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix}=\begin{bmatrix}1\\-5\end{bmatrix}.\]</p>
        <p>This says that a small move in direction \((1,-1)\) changes the two outputs locally in direction \((1,-5)\).</p>
        <div class="shape-check">
          <strong>When forward mode is attractive.</strong> It is especially useful when the number of input directions is small compared with the number of outputs, or when a paper needs directional derivatives, JVPs, or higher-order products.</div>
      `
    }
  ],
  examples: [],
  practice: []
});
