(() => {
  const lesson = COURSE[1].lessons[2];

  lesson.sections.push(
    {
      id: "bptt",
      title: "13. Backpropagation through time is backpropagation on an unrolled recurrent graph",
      html: String.raw`
        <p>A recurrent model reuses the same transition at several time steps. A simple recurrent state can be written as</p>
        <p>\[h_t=\phi(W_hh_{t-1}+W_xx_t+b).\]</p>
        <p>The state \(h_t\) depends on \(h_{t-1}\), which depends on \(h_{t-2}\), and so on. To differentiate a loss at a later time, conceptually unroll the recurrence into a longer computation graph.</p>
        <p>For three steps:</p>
        <p>\[h_0\to h_1\to h_2\to h_3\to L.\]</p>
        <p>The matrix \(W_h\) is shared across all three transitions. Therefore, its gradient is a sum of contributions from every time step:</p>
        <p>\[\frac{\partial L}{\partial W_h}=\sum_t \left.\frac{\partial L}{\partial W_h}\right|_{t}.\]</p>
        <h3>Why gradients can vanish or explode</h3>
        <p>The gradient to an early state contains a product of many local Jacobians. In a simplified linear recurrence</p>
        <p>\[h_t=Wh_{t-1},\]</p>
        <p>the effect across \(k\) steps contains powers such as</p>
        <p>\[(W^\top)^k.\]</p>
        <p>If important singular values are consistently below \(1\), gradients tend to shrink. If they are above \(1\), gradients can grow.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> This is backpropagation through time, or BPTT. Truncated BPTT limits how far backward the graph is traversed. LSTM and GRU architectures were designed partly to improve long-range gradient flow.</div>
      `
    },
    {
      id: "stop-gradient",
      title: "14. Stop-gradient changes the derivative graph without changing the forward value",
      html: String.raw`
        <p>Sometimes a model should use a value in the forward pass but should not send gradient through the operation that produced it.</p>
        <p>Write a stop-gradient operator as \(\operatorname{sg}(x)\). In the forward pass,</p>
        <p>\[\operatorname{sg}(x)=x.\]</p>
        <p>For differentiation, however,</p>
        <p>\[\frac{d\,\operatorname{sg}(x)}{dx}=0.\]</p>
        <h3>Small example</h3>
        <p>Let</p>
        <p>\[L=x\,\operatorname{sg}(x).\]</p>
        <p>The forward value is \(x^2\). But the derivative is not \(2x\), because the second occurrence is treated as constant:</p>
        <p>\[\frac{dL}{dx}=\operatorname{sg}(x)=x.\]</p>
        <p>This is an intentional modification of the gradient path.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Stop-gradient or detach operations appear in target networks, contrastive-learning objectives, self-distillation, straight-through estimators, and algorithms that separate optimization roles.</div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not infer the derivative from the forward algebra alone when a graph contains detach, stop-gradient, custom backward rules, or nondifferentiable sampling operations.</div>
      `
    },
    {
      id: "gradient-checking",
      title: "15. Gradient checking compares backpropagation with a numerical slope",
      html: String.raw`
        <p>Automatic differentiation can still be used incorrectly. A custom backward rule can have a sign error, missing branch, or wrong transpose. Finite differences give an independent check.</p>
        <p>For a scalar parameter \(\theta\), use the central difference</p>
        <p>\[\frac{dL}{d\theta}\approx\frac{L(\theta+\varepsilon)-L(\theta-\varepsilon)}{2\varepsilon}.\]</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[L(\theta)=\theta^3,\qquad \theta=2.\]</p>
        <p>The exact derivative is</p>
        <p>\[3\theta^2=12.\]</p>
        <p>With \(\varepsilon=0.001\),</p>
        <p>\[\frac{2.001^3-1.999^3}{0.002}\approx12.000001.\]</p>
        <p>The values agree closely.</p>
        <p>For a large parameter tensor, check a few selected entries or use directional derivative checks. Do not try to finite-difference every parameter of a modern network.</p>
        <div class="shape-check">
          <strong>Practical warning.</strong> If \(\varepsilon\) is too large, truncation error is large. If it is too small, floating-point cancellation can dominate. Nondifferentiable points such as ReLU at zero can also make a check misleading.</div>
      `
    },
    {
      id: "compute-memory",
      title: "16. Reverse-mode training trades memory for efficient gradients",
      html: String.raw`
        <p>The backward pass needs information from the forward pass. For example, the derivative of ReLU needs to know which preactivations were positive. The derivative of a matrix product needs values of the other factors.</p>
        <p>Therefore, reverse-mode AD commonly stores intermediate activations until they are used during backward computation.</p>
        <h3>Simple memory picture</h3>
        <p>Suppose a network has \(L\) layers and each layer stores an activation with \(B\times d\) floating-point values. Ignoring other tensors, activation storage scales roughly as</p>
        <p>\[O(LBd).\]</p>
        <p>This can dominate training memory for large batches, long token sequences, or deep networks.</p>
        <h3>Checkpointing</h3>
        <p>Gradient checkpointing stores only selected activations. During backward, it recomputes missing forward values. The method uses more compute but less memory.</p>
        <div class="paper-connection">
          <strong>Paper-reading connection.</strong> When a paper reports activation checkpointing, rematerialization, recomputation, reversible layers, or memory-efficient attention, it is often changing this compute-memory tradeoff, not changing the mathematical gradient.</div>
        <p>Reverse mode is efficient in derivative count for a scalar loss, but it is not free. Training generally requires a forward pass, a backward pass, saved or recomputed intermediates, and optimizer state.</p>
      `
    },
    {
      id: "common-mistakes",
      title: "17. Common mistakes when reading backpropagation equations",
      html: String.raw`
        <ul>
          <li><strong>Multiplying when you should add.</strong> Multiply local derivatives along one path. Add gradient contributions from different paths.</li>
          <li><strong>Building a full Jacobian mentally.</strong> Most reverse-mode formulas are VJPs. Use shape reasoning instead of expanding every Jacobian entry.</li>
          <li><strong>Confusing parameter and activation gradients.</strong> A weight gradient is stored for optimization. An activation gradient continues backward through earlier operations.</li>
          <li><strong>Ignoring shared parameters.</strong> Repeated use means gradient accumulation into one parameter object.</li>
          <li><strong>Ignoring reduction scaling.</strong> A mean introduces a factor such as \(1/B\) or \(1/N\). A sum does not.</li>
          <li><strong>Assuming element-wise structure.</strong> Softmax and normalization couple coordinates. Their Jacobians are not diagonal.</li>
          <li><strong>Reading “gradient” without checking shape convention.</strong> Papers can use row or column gradients. Verify the author’s convention.</li>
          <li><strong>Forgetting detach operations.</strong> The forward expression can look unchanged while the derivative graph is intentionally cut.</li>
          <li><strong>Assuming AD makes the math correct.</strong> AD differentiates the program that was written. It does not tell you whether that program implements the intended objective.</li>
        </ul>
        <div class="definition">
          <strong>Reliable reading method.</strong> Draw the local graph, label every value with a shape, identify the arriving gradient, apply the local backward rule, and check whether branches must be accumulated.</div>
      `
    },
    {
      id: "recap",
      title: "18. Recap: backpropagation is organized chain rule",
      html: String.raw`
        <p>A computation graph gives a mechanical way to apply calculus to a large model.</p>
        <ol>
          <li>The forward pass computes and records values.</li>
          <li>Backward starts from the scalar loss with derivative \(1\).</li>
          <li>Each operation combines an incoming sensitivity with its local derivative.</li>
          <li>Gradient contributions add when several paths reach the same value or parameter.</li>
          <li>Reverse mode computes VJPs and is well suited to one scalar loss with many parameters.</li>
          <li>Forward mode computes JVPs and is useful for directional effects and some higher-order methods.</li>
          <li>Common neural-network layers have reusable backward patterns.</li>
          <li>Autograd usually avoids materializing large Jacobian matrices.</li>
          <li>Recurrent and shared computations reuse parameters, so their gradients accumulate across uses.</li>
          <li>Training memory is closely tied to which forward intermediates backward needs.</li>
        </ol>
        <p>When you read a backpropagation equation in a paper, ask three questions: <strong>What is the local operation? What is the shape of the incoming gradient? Where must the resulting gradient go next?</strong></p>
      `
    }
  );

  lesson.examples = [
    ["Trace a scalar graph", String.raw`For \(u=2x\), \(v=u^2\), and \(L=3v\), the local derivatives are \(du/dx=2\), \(dv/du=2u\), and \(dL/dv=3\). Therefore \(dL/dx=3\cdot2u\cdot2=12u=24x\). At \(x=2\), the derivative is \(48\).`],
    ["Add branch gradients", String.raw`If \(a=x^2\), \(b=4x\), and \(L=a+b\), then the two contributions to \(dL/dx\) are \(2x\) and \(4\). At \(x=3\), the total is \(6+4=10\).`],
    ["Affine weight gradient", String.raw`With \(x=(2,-1)\) and output gradient \(g_z=(3,4)\), \(\partial L/\partial W=x^\top g_z=\begin{bmatrix}6&8\\-3&-4\end{bmatrix}\).`],
    ["Affine activation gradient", String.raw`If \(g_z=(1,2)\) and \(W=\begin{bmatrix}1&3\\2&-1\end{bmatrix}\), then \(g_x=g_zW^\top=(7,0)\). The result has the same shape as the input activation.`],
    ["ReLU backward", String.raw`For \(z=(-1,2,-3,4)\) and incoming gradient \((5,6,7,8)\), the ReLU mask is \((0,1,0,1)\), so the gradient to \(z\) is \((0,6,0,8)\).`],
    ["Mean backward", String.raw`If \(m=(x_1+x_2+x_3+x_4)/4\) and \(\partial L/\partial m=8\), then each input receives gradient \(8/4=2\).`],
    ["Shared scalar parameter", String.raw`If \(L=(wx_1)^2+(wx_2)^2\), then \(dL/dw=2w(x_1^2+x_2^2)\). For \(w=1\), \(x_1=2\), and \(x_2=3\), the gradient is \(2(4+9)=26\).`],
    ["Embedding accumulation", String.raw`If token 7 appears twice and the two lookup outputs receive gradients \(g^{(1)}=(1,2)\) and \(g^{(2)}=(3,-1)\), row 7 of the embedding-gradient table receives \((4,1)\).`],
    ["Softmax cross-entropy", String.raw`For probabilities \(p=(0.1,0.6,0.3)\) and target \(y=(0,1,0)\), the logit gradient is \(p-y=(0.1,-0.4,0.3)\).`],
    ["VJP shape", String.raw`If \(f:\mathbb{R}^{5}\to\mathbb{R}^{3}\), then \(J_f\) has shape \(3\times5\). An output sensitivity \(v\in\mathbb{R}^{3}\) gives \(v^\top J_f\in\mathbb{R}^{1\times5}\), which matches the five input sensitivities.`],
    ["JVP shape", String.raw`For the same \(J_f\in\mathbb{R}^{3\times5}\), an input direction \(r\in\mathbb{R}^{5}\) gives \(J_fr\in\mathbb{R}^{3}\), the directional change of the three outputs.`],
    ["Stop-gradient", String.raw`For \(L=x\,\operatorname{sg}(x)\), the forward value equals \(x^2\), but \(dL/dx=x\). At \(x=4\), the gradient is \(4\), not \(8\).`],
    ["Finite-difference check", String.raw`For \(L(w)=w^2+2w\) at \(w=3\), the exact derivative is \(2w+2=8\). A central difference with a small \(\varepsilon\) should return a value close to \(8\).`],
    ["BPTT accumulation", String.raw`If the same scalar recurrent weight \(w\) is used at three time steps and its local gradient contributions are \(0.4\), \(-0.1\), and \(0.7\), the parameter gradient is their sum: \(1.0\).`]
  ];

  lesson.practice = [
    String.raw`For \(u=4x\), \(v=\sin u\), and \(L=v^2\), write \(dL/dx\) as a product of local derivatives. <details><summary>Show answer</summary><div>\[\frac{dL}{dx}=\frac{dL}{dv}\frac{dv}{du}\frac{du}{dx}=2v\cos(u)\cdot4=8\sin(4x)\cos(4x).\]</div></details>`,
    String.raw`If \(L=g(x)+h(x)\), why are the two derivative paths added? <details><summary>Show answer</summary><div>A change in \(x\) changes both branches. Their first-order effects on the same scalar loss add: \(dL/dx=g'(x)+h'(x)\).</div></details>`,
    String.raw`Why is reverse-mode AD a good match for neural-network training? <details><summary>Show answer</summary><div>Training usually has many parameters but one scalar loss. One reverse sweep can compute derivatives of that scalar with respect to all parameters.</div></details>`,
    String.raw`For \(f:\mathbb{R}^{4}\to\mathbb{R}^{7}\), state the shapes of \(J_f\), a JVP \(J_fr\), and a VJP \(v^\top J_f\). <details><summary>Show answer</summary><div>\(J_f\) is \(7\times4\). With \(r\in\mathbb{R}^4\), \(J_fr\in\mathbb{R}^7\). With \(v\in\mathbb{R}^7\), \(v^\top J_f\in\mathbb{R}^{1\times4}\).</div></details>`,
    String.raw`For \(z=xW+b\), with \(x\) shape \(1\times3\) and \(W\) shape \(3\times5\), what shape must the output gradient \(g_z\) have, and what is the shape of \(\partial L/\partial W\)? <details><summary>Show answer</summary><div>\(z\) and \(g_z\) have shape \(1\times5\). The weight gradient is \(x^\top g_z\), with shape \(3\times5\).</div></details>`,
    String.raw`A ReLU input is \((-2,0.5,4)\) and the incoming gradient is \((7,8,9)\). What gradient is sent backward away from the nondifferentiable point zero? <details><summary>Show answer</summary><div>The derivative mask is \((0,1,1)\), so the backward gradient is \((0,8,9)\).</div></details>`,
    String.raw`If a batch loss is the mean of \(32\) per-example losses, how does the mean affect each per-example gradient contribution? <details><summary>Show answer</summary><div>The mean contributes a factor of \(1/32\). Each per-example gradient is scaled by \(1/32\) before contributions are propagated farther backward.</div></details>`,
    String.raw`A parameter is used in four branches. What must happen to its four gradient contributions? <details><summary>Show answer</summary><div>They must be added into one gradient for the shared parameter.</div></details>`,
    String.raw`For softmax probabilities \((0.2,0.5,0.3)\) and one-hot target \((0,0,1)\), compute \(\partial L/\partial z\). <details><summary>Show answer</summary><div>\[p-y=(0.2,0.5,-0.7).\]</div></details>`,
    String.raw`Why can normalization have off-diagonal Jacobian entries? <details><summary>Show answer</summary><div>Its outputs share statistics or a norm. Changing one input coordinate can change a shared denominator, mean, or variance and therefore affect several output coordinates.</div></details>`,
    String.raw`What is the derivative of \(\operatorname{sg}(x)\) with respect to \(x\) under stop-gradient semantics? <details><summary>Show answer</summary><div>It is defined to be zero, although the forward value equals \(x\).</div></details>`,
    String.raw`Why does BPTT accumulate several contributions into the same recurrent weight? <details><summary>Show answer</summary><div>The same parameter is reused at multiple time steps. The loss depends on that one parameter through several graph paths, so the path contributions add.</div></details>`,
    String.raw`What does gradient checkpointing trade? <details><summary>Show answer</summary><div>It trades extra recomputation during backward for lower activation memory, while preserving the same mathematical gradient.</div></details>`,
    String.raw`A finite-difference gradient and an autograd gradient disagree strongly. Name three possible causes. <details><summary>Show answer</summary><div>Examples: a bug in the forward or custom backward rule; a missing branch or wrong transpose; an unsuitable finite-difference step; a nondifferentiable evaluation point; or stochastic behavior that was not held fixed.</div></details>`
  ];
})();
