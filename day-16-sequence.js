(() => {
  const day16 = COURSE[6].lessons[0];

  day16.sections.push(
    {
      id: "recurrent-states",
      title: "7. Recurrent states summarize the sequence seen so far",
      html: String.raw`
        <p>Before Transformers became dominant, recurrent neural networks were the main sequence model. They are still useful because they make the time dependence explicit.</p>
        <p>A simple recurrent update is</p>
        <p>\[h_t=\phi(W_hh_{t-1}+W_xx_t+b).\]</p>
        <p>Here:</p>
        <ul>
          <li>\(x_t\in\mathbb R^{d_x}\) is the input vector at time \(t\);</li>
          <li>\(h_{t-1}\in\mathbb R^{d_h}\) is the previous hidden state;</li>
          <li>\(W_h\in\mathbb R^{d_h\times d_h}\);</li>
          <li>\(W_x\in\mathbb R^{d_h\times d_x}\);</li>
          <li>\(b\in\mathbb R^{d_h}\).</li>
        </ul>
        <p>The new hidden state has shape</p>
        <p>\[h_t\in\mathbb R^{d_h}.\]</p>
        <p>The same parameters are reused at each time step.</p>

        <h3>Numerical example</h3>
        <p>Use a one-dimensional state and input:</p>
        <p>\[h_t=\tanh(0.5h_{t-1}+x_t),\qquad h_0=0.\]</p>
        <p>Let \(x_1=1\) and \(x_2=-0.5\). Then</p>
        <p>\[h_1=\tanh(1)\approx0.762.\]</p>
        <p>Next,</p>
        <p>\[h_2=\tanh(0.5(0.762)-0.5)=\tanh(-0.119)\approx-0.118.\]</p>
        <p>The second state depends on both \(x_2\) and the information carried in \(h_1\).</p>

        <h3>Output probabilities</h3>
        <p>An RNN language model can map each hidden state to vocabulary logits:</p>
        <p>\[z_t=W_oh_t+c,\]</p>
        <p>with \(W_o\in\mathbb R^{V\times d_h}\). Then</p>
        <p>\[p(x_{t+1}\mid x_{\le t})=\operatorname{softmax}(z_t).\]</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> The hidden state is a learned summary of the prefix. Papers can call it a state, memory, representation, or recurrent feature. Check its recurrence and shape before you interpret the name.</div>
        <div class="shape-check"><strong>Common mistake.</strong> The hidden state dimension \(d_h\) does not have to equal the vocabulary size \(V\) or the input embedding dimension \(d_x\).</div>
      `
    },
    {
      id: "bptt",
      title: "8. Backpropagation through time is the chain rule on the unrolled recurrence",
      html: String.raw`
        <p>A recurrent network reuses the same parameter matrix at many time steps. During training, we can imagine copying the recurrence across time. This creates an unrolled computation graph.</p>
        <p>If the loss is</p>
        <p>\[L=\sum_{t=1}^{T}L_t,\]</p>
        <p>then an early hidden state can affect many later losses.</p>

        <h3>One path through time</h3>
        <p>For a simple recurrence \(h_t=f(h_{t-1},x_t)\), the effect of \(h_s\) on a later state \(h_t\) contains a product of Jacobians:</p>
        <p>\[
        \frac{\partial h_t}{\partial h_s}
        =\frac{\partial h_t}{\partial h_{t-1}}
         \frac{\partial h_{t-1}}{\partial h_{t-2}}
         \cdots
         \frac{\partial h_{s+1}}{\partial h_s}.
        \]</p>
        <p>This is the same mathematical source of vanishing and exploding gradients that appears in deep feed-forward networks.</p>

        <h3>Scalar example</h3>
        <p>Suppose</p>
        <p>\[h_t=0.8h_{t-1}+x_t.\]</p>
        <p>Then</p>
        <p>\[\frac{\partial h_t}{\partial h_{t-1}}=0.8.\]</p>
        <p>The influence of \(h_0\) on \(h_{20}\) is</p>
        <p>\[0.8^{20}\approx0.0115.\]</p>
        <p>A long-range gradient becomes small.</p>

        <h3>Shared-parameter gradients add over time</h3>
        <p>Because the same parameter \(W_h\) is used at every step, its total gradient is a sum of contributions from all time steps:</p>
        <p>\[\frac{\partial L}{\partial W_h}=\sum_{t=1}^{T}\left.\frac{\partial L}{\partial W_h}\right|_t.\]</p>
        <p>The exact term at each time depends on the recurrence and later losses.</p>

        <h3>Truncated BPTT</h3>
        <p>For very long sequences, some systems backpropagate through only a limited number of time steps. This is called truncated backpropagation through time. It reduces memory and compute. It also limits how far a direct gradient path can travel.</p>
        <div class="paper-connection"><strong>ML connection.</strong> LSTM and GRU gates were designed in part to improve long-range signal and gradient flow. Transformer attention later provided shorter paths between distant positions.</div>
        <div class="shape-check"><strong>Paper-reading warning.</strong> “Sequence length” and “BPTT length” can be different. A model can process a long stream while gradients are truncated to a shorter window.</div>
      `
    },
    {
      id: "encoder-decoder",
      title: "9. Encoder-decoder models separate source representation from target generation",
      html: String.raw`
        <p>Sequence-to-sequence tasks map one sequence to another. Machine translation is the classic example.</p>
        <p>Let the source sequence be</p>
        <p>\[x_1,\ldots,x_S\]</p>
        <p>and the target sequence be</p>
        <p>\[y_1,\ldots,y_T.\]</p>
        <p>An encoder creates source representations. A decoder models the target autoregressively:</p>
        <p>\[
        p(y_{1:T}\mid x_{1:S})
        =\prod_{t=1}^{T}p(y_t\mid y_{<t},x_{1:S}).
        \]</p>

        <h3>Early fixed-vector encoder-decoder</h3>
        <p>An early RNN encoder could compress the whole source into one vector \(c\):</p>
        <p>\[c=h_S.\]</p>
        <p>The decoder then conditioned every target step on \(c\). This creates a bottleneck for long inputs because one fixed-size vector must contain all source information.</p>

        <h3>Attention removes the single-vector bottleneck</h3>
        <p>Attention lets the decoder use different source representations at different target positions. Instead of one fixed context vector, the decoder constructs a weighted combination of source states.</p>
        <p>If encoder states are \(h_1,\ldots,h_S\), one context vector can be</p>
        <p>\[c_t=\sum_{s=1}^{S}\alpha_{ts}h_s,\]</p>
        <p>where</p>
        <p>\[\alpha_{ts}\ge0,\qquad \sum_{s=1}^{S}\alpha_{ts}=1.\]</p>
        <p>The weights depend on how relevant source position \(s\) is to target step \(t\).</p>

        <h3>Numerical example</h3>
        <p>Suppose the source states are scalar for simplicity:</p>
        <p>\[h_1=2,\qquad h_2=5,\qquad h_3=-1.\]</p>
        <p>If attention weights are</p>
        <p>\[\alpha_t=(0.2,0.7,0.1),\]</p>
        <p>then</p>
        <p>\[c_t=0.2(2)+0.7(5)+0.1(-1)=3.8.\]</p>
        <p>The context vector is a data-dependent weighted average.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Modern Transformers use attention throughout the model, but the core idea is the same: compute relevance scores, normalize them, and form weighted sums.</div>
        <div class="shape-check"><strong>Notation warning.</strong> “Encoder-decoder attention” and “self-attention” differ in where queries, keys, and values come from. The formula can look almost identical.</div>
      `
    }
  );
})();
