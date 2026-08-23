(() => {
  const day16 = COURSE[6].lessons[0];

  day16.sections.push(
    {
      id: "common-mistakes",
      title: "17. Common mistakes when you read language-model and attention equations",
      html: String.raw`
        <h3>Mistake 1: treat a token id as a meaningful number</h3>
        <p>A token id is a category label. Arithmetic on token ids has no semantic meaning. The embedding lookup creates the continuous vector representation.</p>

        <h3>Mistake 2: confuse logits with probabilities</h3>
        <p>Logits can be any real numbers. Probabilities are nonnegative and sum to 1. If a paper writes \(z\) before softmax, do not interpret \(z_i=2\) as probability 2.</p>

        <h3>Mistake 3: apply softmax on the wrong axis</h3>
        <p>In attention, each query normally normalizes scores across keys. In a language-model output layer, each token position normalizes across vocabulary items. Always state the axis.</p>

        <h3>Mistake 4: ignore the token reduction in a reported loss</h3>
        <p>A sum over tokens, a mean over tokens, and a mean over sequences are different quantities. Padding masks also change the denominator.</p>

        <h3>Mistake 5: think attention weights are complete explanations</h3>
        <p>Attention weights show one internal mixing pattern. They do not by themselves prove why a final model prediction occurred. Values, later layers, residual paths, and nonlinear transformations also matter.</p>

        <h3>Mistake 6: assume every attention head has an independent full model dimension</h3>
        <p>Most multi-head designs split or project the model width into smaller head dimensions. Check \(H\), \(d_k\), and \(d_v\).</p>

        <h3>Mistake 7: confuse self-attention with cross-attention</h3>
        <p>In self-attention, queries, keys, and values are derived from the same sequence representation. In encoder-decoder cross-attention, queries usually come from the decoder while keys and values come from the encoder.</p>

        <h3>Mistake 8: call negative sampling and NCE the same objective</h3>
        <p>They are related sampled-classification ideas, but their probabilistic derivations and exact loss functions differ.</p>

        <h3>Mistake 9: compare perplexities across incompatible tokenizers</h3>
        <p>Perplexity is measured per token. A tokenizer changes what one token means and changes sequence length. Perplexity values are not automatically comparable across tokenizations.</p>

        <h3>Mistake 10: forget that residual addition has a strict shape requirement</h3>
        <p>If a block computes \(x+F(x)\), then \(x\) and \(F(x)\) must have the same shape. An output projection often restores the required model width.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "18. A paper-reading workflow for language models and Transformers",
      html: String.raw`
        <p>Use the following sequence when you meet a new language-model equation.</p>
        <ol>
          <li><strong>Find the discrete objects.</strong> Identify token ids, vocabulary size \(V\), sequence length \(T\), and any special tokens.</li>
          <li><strong>Find the first continuous representation.</strong> Identify the embedding matrix and hidden width.</li>
          <li><strong>Write every tensor shape.</strong> Include batch, sequence, head, model, key, value, and vocabulary axes.</li>
          <li><strong>Find the normalization.</strong> Determine whether softmax runs across vocabulary items, source positions, negatives, or another axis.</li>
          <li><strong>Find the probability factorization.</strong> For an autoregressive model, check which tokens are allowed in the conditioning context.</li>
          <li><strong>Find the objective and reduction.</strong> Identify target positions, masks, sums, means, and sequence-level terms.</li>
          <li><strong>Test a tiny example.</strong> Use two or three tokens and vectors of width two. Compute one attention row by hand.</li>
          <li><strong>Separate architecture from objective.</strong> A causal Transformer is an architecture plus a mask. Autoregressive likelihood is a probability objective. They are related but not identical ideas.</li>
        </ol>

        <h3>Shape trace for one Transformer language-model block</h3>
        <p>For a batch of \(B\) sequences with length \(T\):</p>
        <p>\[
        \text{token ids}: B\times T
        \longrightarrow
        X: B\times T\times d_{\text{model}}.
        \]</p>
        <p>After head splitting:</p>
        <p>\[
        Q,K: B\times H\times T\times d_k,
        \qquad
        V: B\times H\times T\times d_v.
        \]</p>
        <p>Attention scores:</p>
        <p>\[
        QK^\top: B\times H\times T\times T.
        \]</p>
        <p>After weighted value sums and head concatenation:</p>
        <p>\[
        O: B\times T\times d_{\text{model}}.
        \]</p>
        <p>Vocabulary projection:</p>
        <p>\[
        Z: B\times T\times V.
        \]</p>
        <p>Cross-entropy then selects one target token at each valid position.</p>
        <div class="paper-connection"><strong>Core reading habit.</strong> If you can reproduce this shape trace for a new architecture, most dense notation becomes much easier to decode.</div>
      `
    },
    {
      id: "day16-recap",
      title: "19. Recap",
      html: String.raw`
        <ul>
          <li>A token id is a category. An embedding lookup maps it to a learned vector.</li>
          <li>An autoregressive model factors a sequence probability into conditional next-token probabilities.</li>
          <li>Logits become categorical probabilities through softmax.</li>
          <li>Token cross-entropy is the negative log probability of the observed target token.</li>
          <li>Perplexity is the exponential of average token negative log-likelihood.</li>
          <li>Word2vec-style objectives learn vector geometry from word-context prediction.</li>
          <li>Negative sampling, NCE, and hierarchical softmax reduce the cost of large output spaces in different ways.</li>
          <li>RNNs carry a recurrent hidden state. BPTT applies the chain rule through time.</li>
          <li>Encoder-decoder attention creates a data-dependent weighted source summary.</li>
          <li>Transformer self-attention uses \(QK^\top/\sqrt{d_k}\) to score token pairs and uses those weights to mix values.</li>
          <li>Causal masks prevent future-token information from leaking into autoregressive predictions.</li>
          <li>Multi-head attention repeats the attention operation in several learned subspaces.</li>
          <li>Positional information gives the model access to order and distance.</li>
          <li>Residual paths and layer normalization support stable deep Transformer computation.</li>
          <li>Always inspect the unit of the objective: token, sequence, pair, or another structured object.</li>
        </ul>
      `
    }
  );

  day16.examples = [
    ["Autoregressive probability", String.raw`If \(p(x_1)=0.4\), \(p(x_2\mid x_1)=0.5\), and \(p(x_3\mid x_1,x_2)=0.25\), then \(p(x_{1:3})=0.4\times0.5\times0.25=0.05\). The sequence negative log-likelihood is \(-\log 0.05\approx2.996\).`],
    ["Perplexity from mean loss", String.raw`If the mean token negative log-likelihood is \(1.5\) nats, then \(\operatorname{PPL}=e^{1.5}\approx4.48\).`],
    ["Embedding batch shape", String.raw`For vocabulary size \(V=32{,}000\), hidden width \(d=512\), batch size \(B=16\), and sequence length \(T=128\), token ids have shape \(16\times128\). After lookup, embeddings have shape \(16\times128\times512\).`],
    ["Attention score shape", String.raw`If \(Q,K\in\mathbb R^{128\times64}\), then \(QK^\top\in\mathbb R^{128\times128}\). There is one score for every query-position/key-position pair.`],
    ["Multi-head width", String.raw`For \(d_{\text{model}}=1024\) and \(H=16\) with equal head widths, \(d_k=d_v=64\). Concatenating 16 head outputs of width 64 returns width 1024.`],
    ["Masked loss", String.raw`If token losses are \((0.2,0.5,1.0,0.7)\) and mask \(m=(1,1,0,1)\), the masked mean is \((0.2+0.5+0.7)/3\approx0.467\). The masked position does not contribute to the numerator or denominator.`]
  ];

  day16.practice = [
    String.raw`A vocabulary has \(V=10{,}000\) tokens and embedding width \(d=256\). What is the embedding-matrix shape?<details><summary>Answer</summary><p>\(E\in\mathbb R^{10{,}000\times256}\). Each vocabulary item owns one row of width 256.</p></details>`,
    String.raw`Expand \(p(x_1,x_2,x_3,x_4)\) with the autoregressive chain rule.<details><summary>Answer</summary><p>\[p(x_1)p(x_2\mid x_1)p(x_3\mid x_1,x_2)p(x_4\mid x_1,x_2,x_3).\]</p></details>`,
    String.raw`For logits \((1,1,1,1)\), what probability does softmax assign to each class?<details><summary>Answer</summary><p>All logits are equal, so all exponentials are equal. Each probability is \(1/4=0.25\).</p></details>`,
    String.raw`If the correct token has probability \(0.2\), what is its negative log-likelihood in natural-log units?<details><summary>Answer</summary><p>\(-\log(0.2)\approx1.609\).</p></details>`,
    String.raw`Why can only a few rows of an embedding matrix receive direct lookup gradients in one mini-batch?<details><summary>Answer</summary><p>A lookup output depends only on the rows selected by token ids in the batch. Unselected rows do not participate in that lookup computation.</p></details>`,
    String.raw`What is the difference between cosine similarity and a dot product?<details><summary>Answer</summary><p>The dot product depends on both angle and vector magnitude. Cosine similarity divides by both norms and therefore measures only directional alignment for nonzero vectors.</p></details>`,
    String.raw`In negative sampling, what should happen to the score of an observed center-context pair and the scores of sampled negative pairs?<details><summary>Answer</summary><p>The positive score should increase. Negative-pair scores should decrease so the binary classifier can separate observed and noise pairs.</p></details>`,
    String.raw`Let \(X\in\mathbb R^{20\times512}\) and \(W_Q\in\mathbb R^{512\times64}\). What is the shape of \(Q\)?<details><summary>Answer</summary><p>\(Q=XW_Q\in\mathbb R^{20\times64}\).</p></details>`,
    String.raw`If \(Q\in\mathbb R^{30\times64}\) and \(K\in\mathbb R^{40\times64}\), what is the shape of \(QK^\top\)?<details><summary>Answer</summary><p>\(30\times40\). There are 30 queries and 40 keys.</p></details>`,
    String.raw`Why does scaled dot-product attention divide scores by \(\sqrt{d_k}\)?<details><summary>Answer</summary><p>Under common variance assumptions, the standard deviation of an unscaled dot product grows roughly as \(\sqrt{d_k}\). The division keeps score scale more stable and helps avoid overly saturated softmax outputs.</p></details>`,
    String.raw`What does a causal mask prevent?<details><summary>Answer</summary><p>It prevents a query position from attending to future token positions. This preserves the prefix-only information constraint required for autoregressive prediction.</p></details>`,
    String.raw`A model has \(d_{\text{model}}=768\) and \(H=12\) equal-width heads. What is the common head width?<details><summary>Answer</summary><p>\(768/12=64\).</p></details>`,
    String.raw`Why does a Transformer need positional information?<details><summary>Answer</summary><p>Content-only self-attention does not by itself distinguish sequence order. Positional information lets the model represent position, distance, or relative order.</p></details>`,
    String.raw`For a residual update \(y=x+F(x)\), what shape constraint must hold?<details><summary>Answer</summary><p>\(x\) and \(F(x)\) must have the same shape so element-wise addition is defined.</p></details>`,
    String.raw`Why might two papers with the same token-level cross-entropy formula still report non-comparable loss values?<details><summary>Answer</summary><p>They can use different tokenizers, datasets, masking rules, vocabulary sizes, sequence weighting, or reduction conventions.</p></details>`
  ];
})();
