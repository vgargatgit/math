(() => {
  const day16 = COURSE[6].lessons[0];

  day16.sections.push(
    {
      id: "qkv-projections",
      title: "10. Query, key, and value projections create three roles from the same hidden vectors",
      html: String.raw`
        <p>Self-attention starts from token representations. For one sequence, let</p>
        <p>\[X\in\mathbb R^{T\times d_{\text{model}}}.\]</p>
        <p>There are \(T\) token positions. Each row is one hidden vector of length \(d_{\text{model}}\).</p>
        <p>The layer learns three projection matrices:</p>
        <p>\[
        W_Q\in\mathbb R^{d_{\text{model}}\times d_k},\qquad
        W_K\in\mathbb R^{d_{\text{model}}\times d_k},\qquad
        W_V\in\mathbb R^{d_{\text{model}}\times d_v}.
        \]</p>
        <p>Then</p>
        <p>\[Q=XW_Q,\qquad K=XW_K,\qquad V=XW_V.\]</p>
        <p>Therefore</p>
        <p>\[Q,K\in\mathbb R^{T\times d_k},\qquad V\in\mathbb R^{T\times d_v}.\]</p>

        <h3>Why three projections?</h3>
        <p>A query describes what one position is looking for. A key describes what one position can be matched by. A value contains the information that can be copied or mixed after the match is computed.</p>
        <p>These are roles in the computation. They are not three different token sequences in self-attention.</p>

        <h3>Small shape example</h3>
        <p>Suppose \(T=4\), \(d_{\text{model}}=6\), \(d_k=3\), and \(d_v=2\). Then</p>
        <p>\[X:4\times6,\quad W_Q:6\times3,\quad Q:4\times3.\]</p>
        <p>The same shape calculation gives \(K:4\times3\), and \(V:4\times2\).</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Many attention equations omit batch and head axes. Restore them yourself. A production tensor can have shape \(B\times H\times T\times d_k\) even when the paper writes only \(Q\in\mathbb R^{T\times d_k}\).</div>
        <div class="shape-check"><strong>Common mistake.</strong> \(W_Q\), \(W_K\), and \(W_V\) project the model dimension. They do not operate across token positions. Token-to-token interaction starts when \(QK^\top\) is computed.</div>
      `
    },
    {
      id: "scaled-dot-product-attention",
      title: "11. Scaled dot-product attention scores tokens, normalizes the scores, and mixes values",
      html: String.raw`
        <p>The core Transformer attention formula is</p>
        <p>\[
        \boxed{\operatorname{Attention}(Q,K,V)
        =\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V}.
        \]</p>

        <h3>Step 1: compute similarity scores</h3>
        <p>Because</p>
        <p>\[Q\in\mathbb R^{T_q\times d_k},\qquad K\in\mathbb R^{T_k\times d_k},\]</p>
        <p>we get</p>
        <p>\[QK^\top\in\mathbb R^{T_q\times T_k}.\]</p>
        <p>Entry \((i,j)\) is</p>
        <p>\[q_i^\top k_j.\]</p>
        <p>It measures how strongly query position \(i\) matches key position \(j\).</p>

        <h3>Step 2: divide by \(\sqrt{d_k}\)</h3>
        <p>Assume for intuition that query and key coordinates are independent, zero mean, and have variance about 1. Then the dot product</p>
        <p>\[q^\top k=\sum_{r=1}^{d_k}q_rk_r\]</p>
        <p>has variance that grows roughly with \(d_k\). Its standard deviation therefore grows roughly like \(\sqrt{d_k}\).</p>
        <p>Dividing by \(\sqrt{d_k}\) keeps score scale more stable as the key dimension changes. Without this scaling, large dot products can make softmax very sharp and produce small gradients for most entries.</p>

        <h3>Step 3: apply softmax across keys</h3>
        <p>For each query row, softmax produces weights that sum to 1:</p>
        <p>\[A=\operatorname{softmax}(S),\qquad S=\frac{QK^\top}{\sqrt{d_k}}.\]</p>
        <p>Then</p>
        <p>\[A\in\mathbb R^{T_q\times T_k}.\]</p>

        <h3>Step 4: form weighted value sums</h3>
        <p>If</p>
        <p>\[V\in\mathbb R^{T_k\times d_v},\]</p>
        <p>then</p>
        <p>\[AV\in\mathbb R^{T_q\times d_v}.\]</p>
        <p>Each output row is a weighted combination of value rows.</p>

        <h3>Complete two-token numerical example</h3>
        <p>Let</p>
        <p>\[
        Q=\begin{bmatrix}1&0\\0&1\end{bmatrix},\qquad
        K=\begin{bmatrix}1&0\\1&1\end{bmatrix},\qquad
        V=\begin{bmatrix}2&0\\0&4\end{bmatrix}.
        \]</p>
        <p>Here \(d_k=2\). The unscaled score matrix is</p>
        <p>\[
        QK^\top=
        \begin{bmatrix}
        1&1\\
        0&1
        \end{bmatrix}.
        \]</p>
        <p>After division by \(\sqrt2\), the first row contains two equal scores, so its attention weights are exactly \((0.5,0.5)\). Its output is</p>
        <p>\[0.5\begin{bmatrix}2&0\end{bmatrix}+0.5\begin{bmatrix}0&4\end{bmatrix}=\begin{bmatrix}1&2\end{bmatrix}.\]</p>
        <p>The second row prefers the second key because its score is larger. It therefore places more weight on the second value.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Attention is a learned, content-dependent averaging operation. The weights change with the current representations, unlike a fixed convolution kernel.</div>
        <div class="shape-check"><strong>Softmax axis warning.</strong> Standard attention normalizes across the key dimension for each query. If a paper uses another normalization axis, the meaning changes.</div>
      `
    },
    {
      id: "causal-masks",
      title: "12. A causal mask enforces the autoregressive information constraint",
      html: String.raw`
        <p>An autoregressive model at position \(t\) must not use future tokens \(x_{t+1},x_{t+2},\ldots\) when it predicts \(x_{t+1}\).</p>
        <p>A causal attention mask enforces this rule inside the score matrix.</p>
        <p>For \(T=4\), a conceptual allowed-attention pattern is</p>
        <p>\[
        \begin{bmatrix}
        1&0&0&0\\
        1&1&0&0\\
        1&1&1&0\\
        1&1&1&1
        \end{bmatrix}.
        \]</p>
        <p>Row 3 can attend to positions 1, 2, and 3, but not position 4.</p>

        <h3>Additive mask form</h3>
        <p>Implementations often add a mask \(M\) before softmax:</p>
        <p>\[A=\operatorname{softmax}(S+M).\]</p>
        <p>Allowed positions receive 0. Disallowed positions receive a very negative number, ideally interpreted as \(-\infty\):</p>
        <p>\[M_{ij}=\begin{cases}0,&j\le i,\\-\infty,&j>i.\end{cases}\]</p>
        <p>After softmax, disallowed positions receive probability 0.</p>

        <h3>Causal mask versus padding mask</h3>
        <p>A causal mask hides future positions. A padding mask hides positions that contain padding rather than real tokens. A model can use both at the same time.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Training can process all positions in parallel only because the mask keeps the computation equivalent to prefix-only prediction. If future information leaks through the mask, the reported training loss is not a valid autoregressive objective.</div>
        <div class="shape-check"><strong>Common mistake.</strong> The mask is usually broadcast over batch and head axes. Its conceptual token-token shape is \(T\times T\), but its stored shape can be different.</div>
      `
    },
    {
      id: "multi-head-attention",
      title: "13. Multi-head attention creates several attention subspaces in parallel",
      html: String.raw`
        <p>One attention head has one set of query, key, and value projections. Multi-head attention repeats this operation with several learned projection sets.</p>
        <p>For head \(h\),</p>
        <p>\[
        Q_h=XW_Q^{(h)},\qquad K_h=XW_K^{(h)},\qquad V_h=XW_V^{(h)}.
        \]</p>
        <p>Then</p>
        <p>\[O_h=\operatorname{Attention}(Q_h,K_h,V_h).\]</p>
        <p>The head outputs are concatenated:</p>
        <p>\[O_{\text{cat}}=\operatorname{Concat}(O_1,\ldots,O_H).\]</p>
        <p>A final output projection mixes the head channels:</p>
        <p>\[Y=O_{\text{cat}}W_O.\]</p>

        <h3>Typical shape choice</h3>
        <p>If \(d_{\text{model}}=768\) and \(H=12\), a common choice is</p>
        <p>\[d_k=d_v=768/12=64.\]</p>
        <p>Each head output has width 64. Concatenating 12 heads returns width</p>
        <p>\[12\times64=768.\]</p>
        <p>The final projection can therefore map \(768\) back to \(768\).</p>

        <h3>Why multiple heads can help</h3>
        <p>Different heads have different parameters. They can learn different similarity spaces and different value projections. One head can focus on local syntax while another uses longer-range information. This is a possible behavior, not a guaranteed interpretation.</p>
        <div class="paper-connection"><strong>Paper-reading rule.</strong> Head count alone does not tell you total compute. Also inspect \(d_k\), \(d_v\), sequence length, grouped-query variants, and whether keys and values are shared across heads.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Concatenation joins feature dimensions. It does not concatenate token positions.</div>
      `
    },
    {
      id: "positional-information",
      title: "14. Positional information is necessary because self-attention alone does not know token order",
      html: String.raw`
        <p>Self-attention uses pairwise content scores. Without positional information, the operation is permutation equivariant with respect to token order. If token rows are permuted, the output rows permute in the same way.</p>
        <p>Language order matters. The sequences</p>
        <p>\[\texttt{dog bites man}\]</p>
        <p>and</p>
        <p>\[\texttt{man bites dog}\]</p>
        <p>contain the same three tokens but have different meanings.</p>

        <h3>Absolute sinusoidal positions</h3>
        <p>The original Transformer used fixed sinusoidal vectors. For position \(p\) and feature-pair index \(i\), one common definition is</p>
        <p>\[
        \operatorname{PE}(p,2i)=\sin\left(\frac{p}{10000^{2i/d}}\right),
        \]</p>
        <p>\[
        \operatorname{PE}(p,2i+1)=\cos\left(\frac{p}{10000^{2i/d}}\right).
        \]</p>
        <p>The positional vector has the same width as the token representation and can be added to it.</p>

        <h3>Learned and relative positions</h3>
        <p>Other models learn one vector per position, use relative position biases, rotate query and key coordinates, or use other relative schemes. The common goal is to let attention distinguish positions and distances.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Modern LLM papers often use rotary positional embeddings or relative biases. When you read one, ask exactly where the position information enters the score computation.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Positional encoding does not create an extra token axis. It usually has shape compatible with the hidden representation and is added, concatenated, or used inside the attention score rule.</div>
      `
    },
    {
      id: "residuals-and-layernorm",
      title: "15. Residual paths and layer normalization stabilize deep Transformer blocks",
      html: String.raw`
        <p>A Transformer block is not only attention. It also contains residual connections, normalization, and usually a position-wise feed-forward network.</p>

        <h3>Residual path</h3>
        <p>A residual update has the form</p>
        <p>\[y=x+F(x).\]</p>
        <p>The Jacobian is</p>
        <p>\[\frac{\partial y}{\partial x}=I+J_F.\]</p>
        <p>The identity term creates a direct path for signals and gradients.</p>

        <h3>Layer normalization</h3>
        <p>For one token hidden vector \(h\in\mathbb R^d\), define</p>
        <p>\[\mu=\frac1d\sum_{j=1}^{d}h_j,\]</p>
        <p>\[\sigma^2=\frac1d\sum_{j=1}^{d}(h_j-\mu)^2.\]</p>
        <p>Then</p>
        <p>\[\widehat h_j=\frac{h_j-\mu}{\sqrt{\sigma^2+\varepsilon}},\qquad y_j=\gamma_j\widehat h_j+\beta_j.\]</p>
        <p>Layer normalization operates across hidden features for one token. It does not use statistics from other examples in the batch.</p>

        <h3>Pre-norm and post-norm</h3>
        <p>Papers can place layer normalization before or after the sublayer.</p>
        <p>A pre-norm form is</p>
        <p>\[y=x+F(\operatorname{LN}(x)).\]</p>
        <p>A post-norm form is</p>
        <p>\[y=\operatorname{LN}(x+F(x)).\]</p>
        <p>These forms have different optimization behavior. Do not treat them as notation-only changes.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Very deep Transformer training often depends on normalization placement, residual scaling, initialization, and related stability choices. Read the block equation, not only the architecture name.</div>
        <div class="shape-check"><strong>Shape rule.</strong> The residual addition requires \(F(x)\) to have the same shape as \(x\). Output projections often exist partly to restore this shape.</div>
      `
    },
    {
      id: "training-objectives",
      title: "16. Token-level and sequence-level objectives optimize different units of behavior",
      html: String.raw`
        <p>A token-level objective scores individual token predictions. A sequence-level objective scores a property of the complete output or a larger structured object.</p>

        <h3>Token-level language-model loss</h3>
        <p>For target tokens \(x_1,\ldots,x_T\), a common loss is</p>
        <p>\[
        L_{\text{token}}
        =-\sum_{t=1}^{T}m_t\log p_\theta(x_t\mid x_{<t}),
        \]</p>
        <p>where \(m_t\in\{0,1\}\) can mask positions that should not contribute to the loss.</p>
        <p>A mean loss can divide by</p>
        <p>\[\sum_t m_t\]</p>
        <p>rather than by the padded sequence length.</p>

        <h3>Sequence-level objective</h3>
        <p>Suppose a generated answer receives a scalar reward \(R(y_{1:T})\). A policy-gradient-style objective can depend on the whole sequence:</p>
        <p>\[J(\theta)=\mathbb E_{y\sim p_\theta}[R(y)].\]</p>
        <p>This objective does not decompose into a fixed supervised target at every token in the same way as teacher-forced cross-entropy.</p>

        <h3>Contrastive sequence representation objective</h3>
        <p>A sequence encoder can also produce one vector \(s\in\mathbb R^d\). A contrastive loss can score whether two sequence vectors belong together. In this case the supervision unit is a sequence or pair of sequences, even if token representations are used internally.</p>

        <h3>Why reduction matters</h3>
        <p>Two papers can both report “cross-entropy loss” but use different reductions. One can average over tokens. Another can average over sequences after summing token losses. These choices weight long and short sequences differently.</p>
        <div class="paper-connection"><strong>Paper-reading checklist.</strong> Identify the prediction unit, the target unit, the mask, and the reduction. Then identify whether the objective is supervised likelihood, contrastive learning, preference optimization, reinforcement learning, or another sequence-level criterion.</div>
        <div class="shape-check"><strong>Common mistake.</strong> A model can produce token-level logits and still be trained with an additional sequence-level loss. Output shape does not determine the complete training objective.</div>
      `
    }
  );
})();
