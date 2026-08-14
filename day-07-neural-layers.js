(() => {
  const lesson = COURSE[1].lessons[2];

  lesson.sections.push(
    {
      id: "vjp-jvp",
      title: "7. VJPs and JVPs avoid building full Jacobians",
      html: String.raw`
        <p>A Jacobian can be enormous. Suppose</p>
        <p>\[f:\mathbb{R}^{1000000}\to\mathbb{R}^{1000000}.\]</p>
        <p>The full Jacobian would contain \(10^{12}\) entries. Most training algorithms do not need this matrix explicitly.</p>
        <p>Reverse mode naturally computes a <strong>vector-Jacobian product</strong>, or VJP:</p>
        <p>\[v^\top J_f.\]</p>
        <p>Forward mode naturally computes a <strong>Jacobian-vector product</strong>, or JVP:</p>
        <p>\[J_f r.\]</p>
        <h3>Shape reasoning</h3>
        <p>If</p>
        <p>\[J_f\in\mathbb{R}^{m\times n},\qquad v\in\mathbb{R}^{m},\qquad r\in\mathbb{R}^{n},\]</p>
        <p>then</p>
        <p>\[v^\top J_f\in\mathbb{R}^{1\times n},\qquad J_fr\in\mathbb{R}^{m}.\]</p>
        <p>For a scalar loss, the arriving reverse-mode sensitivity acts like the vector \(v\). The VJP turns output sensitivities into input sensitivities without materializing \(J_f\).</p>
        <h3>Small matrix example</h3>
        <p>Let</p>
        <p>\[J=\begin{bmatrix}1&2\\3&4\end{bmatrix},\qquad v=\begin{bmatrix}5\\6\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[v^\top J=\begin{bmatrix}5&6\end{bmatrix}\begin{bmatrix}1&2\\3&4\end{bmatrix}=\begin{bmatrix}23&34\end{bmatrix}.\]</p>
        <div class="paper-connection">
          <strong>Paper-reading connection.</strong> If a paper says “we compute a VJP” or “we use a JVP,” it usually means that the algorithm applies a derivative operator to a vector without constructing the complete Jacobian.</div>
      `
    },
    {
      id: "affine-layer",
      title: "8. Backpropagation through an affine layer is a shape-preserving pattern",
      html: String.raw`
        <p>Consider a row-vector affine layer:</p>
        <p>\[z=xW+b.\]</p>
        <p>Let</p>
        <p>\[x\in\mathbb{R}^{1\times d},\qquad W\in\mathbb{R}^{d\times h},\qquad b\in\mathbb{R}^{1\times h},\qquad z\in\mathbb{R}^{1\times h}.\]</p>
        <p>Suppose the backward pass gives</p>
        <p>\[g_z=\frac{\partial L}{\partial z}\in\mathbb{R}^{1\times h}.\]</p>
        <p>The parameter gradients are</p>
        <p>\[\frac{\partial L}{\partial W}=x^\top g_z\in\mathbb{R}^{d\times h},\]</p>
        <p>\[\frac{\partial L}{\partial b}=g_z\in\mathbb{R}^{1\times h},\]</p>
        <p>and the activation gradient sent to the previous layer is</p>
        <p>\[\frac{\partial L}{\partial x}=g_zW^\top\in\mathbb{R}^{1\times d}.\]</p>
        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[x=\begin{bmatrix}2&-1\end{bmatrix},\qquad g_z=\begin{bmatrix}3&4\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[\frac{\partial L}{\partial W}=\begin{bmatrix}2\\-1\end{bmatrix}\begin{bmatrix}3&4\end{bmatrix}=\begin{bmatrix}6&8\\-3&-4\end{bmatrix}.\]</p>
        <p>Every weight receives one gradient entry. The gradient shape exactly matches \(W\).</p>
        <div class="shape-check">
          <strong>Parameter versus activation gradient.</strong> \(\partial L/\partial W\) is accumulated for optimization. \(\partial L/\partial x\) is propagated backward so earlier operations can compute their gradients. Do not confuse these two roles.</div>
      `
    },
    {
      id: "activations-reductions",
      title: "9. Activations multiply locally; reductions distribute gradients",
      html: String.raw`
        <h3>Element-wise activation</h3>
        <p>Let</p>
        <p>\[a=\phi(z)\]</p>
        <p>with an element-wise function \(\phi\). If the arriving gradient is \(g_a\), then</p>
        <p>\[g_z=g_a\odot\phi'(z).\]</p>
        <p>For ReLU away from zero, \(\phi'(z_i)\) is either \(1\) or \(0\). A negative preactivation blocks that gradient coordinate.</p>
        <p>Example: if</p>
        <p>\[z=(-2,3,1),\qquad g_a=(5,6,7),\]</p>
        <p>then the ReLU derivative mask is \((0,1,1)\), so</p>
        <p>\[g_z=(0,6,7).\]</p>
        <h3>Sum reduction</h3>
        <p>If</p>
        <p>\[s=x_1+x_2+x_3,\]</p>
        <p>then an incoming scalar gradient \(g_s\) is copied to each input:</p>
        <p>\[g_x=(g_s,g_s,g_s).\]</p>
        <h3>Mean reduction</h3>
        <p>If</p>
        <p>\[m=\frac{1}{n}\sum_{i=1}^{n}x_i,\]</p>
        <p>then</p>
        <p>\[\frac{\partial L}{\partial x_i}=\frac{1}{n}\frac{\partial L}{\partial m}.\]</p>
        <div class="paper-connection">
          <strong>Why this matters.</strong> Loss functions often reduce per-example or per-token values by a sum or mean. A missing factor of \(1/n\) changes gradient scale and can change the effective learning rate.</div>
      `
    },
    {
      id: "shared-parameters",
      title: "10. Shared parameters receive the sum of all uses",
      html: String.raw`
        <p>A parameter can appear several times in one computation graph. The gradient with respect to that parameter must include every use.</p>
        <p>Suppose</p>
        <p>\[y_1=wx_1,\qquad y_2=wx_2,\qquad L=y_1+y_2.\]</p>
        <p>Then</p>
        <p>\[\frac{dL}{dw}=x_1+x_2.\]</p>
        <p>For \(x_1=2\) and \(x_2=5\),</p>
        <p>\[\frac{dL}{dw}=7.\]</p>
        <p>The parameter \(w\) is one object, even though the graph uses it twice.</p>
        <h3>Embedding table example</h3>
        <p>Let an embedding table be</p>
        <p>\[E\in\mathbb{R}^{V\times d}.\]</p>
        <p>Looking up token \(i\) selects row \(E_i\). If token \(i\) occurs three times in the batch, all three gradient contributions add into the same row.</p>
        <p>Rows for tokens that were not selected receive zero gradient for that batch.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Weight tying in language models, convolution kernels reused across spatial positions, recurrent weights reused across time, and embedding tables all rely on gradient accumulation from repeated parameter use.</div>
        <div class="shape-check">
          <strong>Common mistake.</strong> “Used three times” does not mean “three copies of the parameter.” There is one parameter and three computational paths to it.</div>
      `
    },
    {
      id: "normalization",
      title: "11. Normalization creates cross-coordinate gradient dependencies",
      html: String.raw`
        <p>Normalization is different from an element-wise activation because one output can depend on several input coordinates.</p>
        <p>For a simple vector normalization,</p>
        <p>\[y=\frac{x}{\|x\|_2}.\]</p>
        <p>Changing one component of \(x\) changes both its own numerator and the shared denominator. Therefore, the Jacobian is not diagonal.</p>
        <p>The differential can be written as</p>
        <p>\[dy=\frac{1}{\|x\|_2}\left(I-yy^\top\right)dx.\]</p>
        <p>Hence a reverse-mode gradient has the form</p>
        <p>\[g_x=\frac{1}{\|x\|_2}\left(I-yy^\top\right)g_y\]</p>
        <p>for column-vector notation.</p>
        <h3>Geometric meaning</h3>
        <p>The matrix \(I-yy^\top\) removes the component parallel to \(y\). A first-order perturbation that only changes the length of \(x\) does not change its normalized direction.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Layer normalization and batch normalization are more complex, but the same warning applies: statistics such as means and variances couple coordinates or examples. Do not assume their Jacobians are diagonal.</div>
      `
    },
    {
      id: "softmax-cross-entropy",
      title: "12. Softmax plus cross-entropy has a simple combined gradient",
      html: String.raw`
        <p>For logits \(z\in\mathbb{R}^{K}\), softmax gives</p>
        <p>\[p_i=\frac{e^{z_i}}{\sum_j e^{z_j}}.\]</p>
        <p>For a one-hot target \(y\), cross-entropy is</p>
        <p>\[L=-\sum_i y_i\log p_i.\]</p>
        <p>The combined derivative with respect to the logits is</p>
        <p>\[\frac{\partial L}{\partial z}=p-y.\]</p>
        <h3>Numerical example</h3>
        <p>Suppose</p>
        <p>\[p=(0.7,0.2,0.1),\qquad y=(1,0,0).\]</p>
        <p>Then</p>
        <p>\[\frac{\partial L}{\partial z}=(-0.3,0.2,0.1).\]</p>
        <p>The correct-class logit is pushed upward by gradient descent because its derivative is negative. The other logits are pushed downward because their derivatives are positive.</p>
        <p>The entries sum to zero:</p>
        <p>\[-0.3+0.2+0.1=0.\]</p>
        <p>This reflects the fact that adding the same constant to every logit does not change softmax probabilities.</p>
        <div class="paper-connection">
          <strong>Paper-reading connection.</strong> Authors often skip the full softmax Jacobian and write \(p-y\) directly. This is not a different derivative rule. It is the result after composing softmax and cross-entropy.</div>
      `
    }
  );
})();
