const day16 = COURSE[6].lessons[0];

Object.assign(day16, {
  published: true,
  summary: "Build the mathematics behind token probabilities, embeddings, Word2vec objectives, recurrent sequence models, and Transformer attention.",
  explanation: "Language models turn discrete tokens into vectors, assign probabilities to possible next tokens, and combine information across a sequence. The central mathematics is not one formula. It is a chain of shapes: token ids select embedding rows, hidden vectors produce logits, softmax converts logits to probabilities, sequence likelihoods factor into conditional probabilities, and attention builds weighted sums from query-key similarity scores.",
  topics: [
    "One-hot vectors",
    "Categorical distributions",
    "Token likelihood",
    "Autoregressive factorization",
    "Softmax classifiers",
    "Cross-entropy and perplexity",
    "Embedding lookup",
    "Sparse embedding gradients",
    "Distributional semantics",
    "Cosine similarity",
    "Matrix factorization view",
    "Negative sampling",
    "Noise-contrastive estimation",
    "Hierarchical softmax",
    "Context windows",
    "Recurrent states",
    "Backpropagation through time",
    "Encoder-decoder models",
    "Query/key/value projections",
    "Scaled dot-product attention",
    "Causal masks",
    "Multi-head attention",
    "Positional encodings",
    "Residual paths",
    "Layer normalization",
    "Token-level and sequence-level objectives"
  ],
  sections: [
    {
      id: "tokens-and-probability",
      title: "1. A language model is a probability model over token sequences",
      html: String.raw`
        <p>A language model receives a sequence of tokens. A token can be a word, part of a word, one character, or another discrete symbol. The model assigns probabilities to possible continuations.</p>
        <p>Let the vocabulary contain \(V\) token types. We can number them from \(1\) to \(V\). A token id is an integer. The id itself does not have geometric meaning. Token 900 is not "larger" than token 20 in a useful language sense.</p>

        <h3>One-hot vectors</h3>
        <p>A one-hot vector is one way to represent a token without giving the token id a false numeric meaning. For token \(i\), define</p>
        <p>\[e_i\in\mathbb R^V,\]</p>
        <p>where entry \(i\) is 1 and all other entries are 0.</p>
        <p>If \(V=5\) and the token id is 3, then</p>
        <p>\[e_3=\begin{bmatrix}0\\0\\1\\0\\0\end{bmatrix}.\]</p>
        <p>A one-hot vector uses \(V\) positions to describe one category. Real systems usually store the integer id instead of the full sparse vector.</p>

        <h3>Categorical distributions</h3>
        <p>A model that predicts the next token produces one probability for each vocabulary item:</p>
        <p>\[p=\begin{bmatrix}p_1&\cdots&p_V\end{bmatrix}^{\top},\qquad p_i\ge0,\qquad \sum_{i=1}^{V}p_i=1.\]</p>
        <p>This is a categorical distribution.</p>
        <p>For a vocabulary with four tokens, suppose</p>
        <p>\[p=\begin{bmatrix}0.10\\0.60\\0.20\\0.10\end{bmatrix}.\]</p>
        <p>The model assigns probability \(0.60\) to token 2. It assigns probability \(0.20\) to token 3.</p>

        <h3>Token likelihood</h3>
        <p>If the observed next token is \(y\), its likelihood under the model is</p>
        <p>\[p(y\mid \text{context}).\]</p>
        <p>If the correct token is 2 in the example above, the likelihood is \(0.60\). If the correct token is 4, the likelihood is \(0.10\).</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Many language-model objectives are sums of log probabilities of observed tokens. When a paper writes \(\log p_\theta(x_t\mid x_{<t})\), it is scoring the token that actually occurred at position \(t\).</div>
        <div class="shape-check"><strong>Shape rule.</strong> For one token position, a categorical probability vector has shape \(V\). For a batch with \(B\) sequences and \(T\) positions, logits are often stored as \(B\times T\times V\).</div>
      `
    },
    {
      id: "autoregressive-factorization",
      title: "2. Autoregressive factorization turns a sequence probability into next-token probabilities",
      html: String.raw`
        <p>Consider a token sequence</p>
        <p>\[x_1,x_2,\ldots,x_T.\]</p>
        <p>The probability of the complete sequence can be expanded with the chain rule of probability:</p>
        <p>\[
        p(x_1,\ldots,x_T)
        =p(x_1)\,p(x_2\mid x_1)\,p(x_3\mid x_1,x_2)\cdots p(x_T\mid x_1,\ldots,x_{T-1}).
        \]</p>
        <p>A compact form is</p>
        <p>\[\boxed{p(x_{1:T})=\prod_{t=1}^{T}p(x_t\mid x_{<t})}.\]</p>
        <p>The notation \(x_{<t}\) means all tokens before position \(t\).</p>

        <h3>Numerical example</h3>
        <p>Suppose a three-token sequence has conditional probabilities</p>
        <p>\[p(x_1)=0.5,\qquad p(x_2\mid x_1)=0.2,\qquad p(x_3\mid x_1,x_2)=0.4.\]</p>
        <p>Then</p>
        <p>\[p(x_1,x_2,x_3)=0.5\times0.2\times0.4=0.04.\]</p>
        <p>Long sequences have very small raw probabilities because many values smaller than 1 are multiplied. We therefore use log probabilities:</p>
        <p>\[\log p(x_{1:T})=\sum_{t=1}^{T}\log p(x_t\mid x_{<t}).\]</p>
        <p>A product becomes a sum. This is easier to optimize and numerically safer.</p>

        <h3>Teacher forcing during training</h3>
        <p>During standard autoregressive training, the model sees the true previous tokens and predicts the next token at every position. One input sequence can therefore create many supervised token-prediction targets in parallel.</p>
        <p>For the token sequence</p>
        <p>\[\texttt{<BOS>, the, cat, sleeps},\]</p>
        <p>the training pairs are conceptually:</p>
        <ul>
          <li>input \(\texttt{<BOS>}\), target \(\texttt{the}\);</li>
          <li>input \(\texttt{<BOS>, the}\), target \(\texttt{cat}\);</li>
          <li>input \(\texttt{<BOS>, the, cat}\), target \(\texttt{sleeps}\).</li>
        </ul>
        <div class="paper-connection"><strong>ML connection.</strong> GPT-style language models use this factorization. The Transformer computes hidden states for many positions at once, but a causal mask prevents a position from using future tokens.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Autoregressive factorization is a probability identity. The model architecture is separate. An RNN and a causal Transformer can both model the same factorization.</div>
      `
    },
    {
      id: "softmax-loss-perplexity",
      title: "3. Logits, softmax, cross-entropy, and perplexity form one probability pipeline",
      html: String.raw`
        <p>A neural network usually does not output probabilities directly. It first outputs unrestricted real numbers called <strong>logits</strong>.</p>
        <p>Let</p>
        <p>\[z\in\mathbb R^V.\]</p>
        <p>The softmax function converts logits to a categorical distribution:</p>
        <p>\[p_i=\frac{e^{z_i}}{\sum_{j=1}^{V}e^{z_j}}.\]</p>

        <h3>Small softmax example</h3>
        <p>Let</p>
        <p>\[z=\begin{bmatrix}2\\1\\0\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[e^2\approx7.389,\qquad e^1\approx2.718,\qquad e^0=1.\]</p>
        <p>The denominator is approximately \(11.107\). Thus</p>
        <p>\[p\approx\begin{bmatrix}0.665\\0.245\\0.090\end{bmatrix}.\]</p>

        <h3>Stable softmax</h3>
        <p>Exponentials can overflow when logits are large. Softmax does not change if the same constant is subtracted from all logits. Therefore implementations use</p>
        <p>\[p_i=\frac{e^{z_i-m}}{\sum_j e^{z_j-m}},\qquad m=\max_j z_j.\]</p>
        <p>This is one use of the log-sum-exp stability idea.</p>

        <h3>Cross-entropy for one correct token</h3>
        <p>If the true token is \(y\), the one-token negative log-likelihood is</p>
        <p>\[L=-\log p_y.\]</p>
        <p>For the example above, if token 1 is correct,</p>
        <p>\[L=-\log(0.665)\approx0.408.\]</p>
        <p>If token 3 is correct,</p>
        <p>\[L=-\log(0.090)\approx2.408.\]</p>
        <p>The loss is larger when the model assigns a small probability to the observed token.</p>

        <h3>Cross-entropy and one-hot targets</h3>
        <p>Let \(y\in\mathbb R^V\) be one-hot. Then categorical cross-entropy is</p>
        <p>\[H(y,p)=-\sum_{i=1}^{V}y_i\log p_i.\]</p>
        <p>Only the correct-token term remains because all other entries of \(y\) are zero.</p>

        <h3>Perplexity</h3>
        <p>For \(N\) target tokens with average negative log-likelihood</p>
        <p>\[\bar L=-\frac1N\sum_{n=1}^{N}\log p(x_n\mid x_{<n}),\]</p>
        <p>perplexity is</p>
        <p>\[\boxed{\operatorname{PPL}=e^{\bar L}}.\]</p>
        <p>If \(\bar L=\log 4\), then perplexity is 4. A useful intuition is that the model behaves, in average log-loss terms, as if it must choose among about four equally plausible options. This intuition is approximate, not a literal candidate count.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> Language-model papers often report token-level cross-entropy or perplexity. Compare values only when tokenization, evaluation data, and log base are compatible.</div>
        <div class="shape-check"><strong>Misleading notation.</strong> Some libraries call the whole operation “cross entropy” and accept logits directly. They perform log-softmax internally. Do not apply softmax twice.</div>
      `
    },
    {
      id: "embeddings",
      title: "4. An embedding matrix turns token ids into learned continuous vectors",
      html: String.raw`
        <p>A one-hot vector is exact, but it is large and does not represent similarity. An embedding matrix learns a smaller vector for each token.</p>
        <p>Let</p>
        <p>\[E\in\mathbb R^{V\times d}.\]</p>
        <p>There are \(V\) rows. Each row has embedding dimension \(d\).</p>
        <p>For token id \(i\), the embedding lookup returns</p>
        <p>\[h=E_{i,:}\in\mathbb R^d.\]</p>

        <h3>Lookup equals multiplication by a one-hot vector</h3>
        <p>If we use a column one-hot vector \(e_i\in\mathbb R^V\), then</p>
        <p>\[E^\top e_i\in\mathbb R^d\]</p>
        <p>selects row \(i\) of \(E\), written as a column. The lookup operation is therefore a sparse matrix multiplication in mathematical form.</p>

        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[
        E=\begin{bmatrix}
        1&0\\
        0.5&0.5\\
        -1&2\\
        0&-1
        \end{bmatrix}.
        \]</p>
        <p>Here \(V=4\) and \(d=2\). Token 3 has embedding</p>
        <p>\[E_{3,:}=\begin{bmatrix}-1&2\end{bmatrix}.\]</p>

        <h3>Batch and sequence shapes</h3>
        <p>If token ids have shape \(B\times T\), an embedding layer usually returns</p>
        <p>\[X\in\mathbb R^{B\times T\times d}.\]</p>
        <p>The vocabulary axis disappears. It is replaced by the embedding axis.</p>

        <h3>Sparse embedding gradients</h3>
        <p>Suppose one mini-batch uses only token ids 3, 3, and 8. A plain lookup depends only on rows 3 and 8 of \(E\). Therefore only those rows receive direct gradients from the lookup operation.</p>
        <p>If token 3 appears twice, its two gradient contributions add:</p>
        <p>\[\frac{\partial L}{\partial E_{3,:}}=g^{(1)}+g^{(2)}.\]</p>
        <p>This is why embedding updates are naturally sparse before optimizer state or regularization is considered.</p>
        <div class="paper-connection"><strong>ML connection.</strong> Large language models often tie the input embedding matrix to the output vocabulary projection. In that case one parameter matrix participates in two different roles, so gradients can come from both roles.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Vocabulary size \(V\) and hidden size \(d\) are different quantities. A token id is not a vector of length \(d\) until the embedding lookup has occurred.</div>
      `
    },
    {
      id: "distributional-semantics",
      title: "5. Distributional semantics links vector geometry to word context",
      html: String.raw`
        <p>The distributional idea is simple: words that occur in similar contexts often have related meanings or grammatical roles. A training objective can turn context statistics into vector geometry.</p>

        <h3>Cosine similarity</h3>
        <p>For nonzero vectors \(u,v\in\mathbb R^d\), cosine similarity is</p>
        <p>\[\operatorname{cos}(u,v)=\frac{u^\top v}{\|u\|_2\|v\|_2}.\]</p>
        <p>It measures angle, not raw magnitude.</p>
        <p>Let</p>
        <p>\[u=\begin{bmatrix}1\\2\end{bmatrix},\qquad v=\begin{bmatrix}2\\4\end{bmatrix}.\]</p>
        <p>Then \(v=2u\), so the cosine similarity is 1.</p>
        <p>For</p>
        <p>\[w=\begin{bmatrix}2\\-1\end{bmatrix},\]</p>
        <p>we have \(u^\top w=0\), so the cosine similarity is 0.</p>

        <h3>Context windows</h3>
        <p>Word2vec-style training creates examples from a local context window. Consider</p>
        <p>\[\texttt{the small cat sleeps quietly}.\]</p>
        <p>With center word \(\texttt{cat}\) and window radius 2, context words are \(\texttt{the}\), \(\texttt{small}\), \(\texttt{sleeps}\), and \(\texttt{quietly}\).</p>
        <p>Skip-gram predicts context words from a center word. CBOW predicts a center word from surrounding context.</p>

        <h3>A matrix-factorization view</h3>
        <p>Many embedding methods can be interpreted as learning a low-dimensional approximation to a large word-context association matrix.</p>
        <p>Imagine a matrix</p>
        <p>\[M\in\mathbb R^{V\times C},\]</p>
        <p>where rows represent words and columns represent context features. Entry \(M_{ij}\) can measure co-occurrence or a transformed statistic such as pointwise mutual information.</p>
        <p>A low-rank model writes approximately</p>
        <p>\[M\approx UV^\top,\]</p>
        <p>with \(U\in\mathbb R^{V\times d}\) and \(V\in\mathbb R^{C\times d}\), where \(d\ll V,C\).</p>
        <p>Rows of \(U\) become compact word representations. This gives one bridge between count-based distributional methods and predictive embedding methods.</p>
        <div class="paper-connection"><strong>Why this matters for papers.</strong> When a paper claims that an embedding objective “implicitly factorizes” a matrix, the statement usually means that the optimum of the predictive objective is related to a transformed co-occurrence statistic.</div>
        <div class="shape-check"><strong>Common mistake.</strong> Similar embedding directions do not prove identical meaning. Embeddings mix semantic, syntactic, frequency, corpus, and objective effects.</div>
      `
    },
    {
      id: "word2vec-objectives",
      title: "6. Negative sampling, NCE, and hierarchical softmax avoid a full vocabulary softmax",
      html: String.raw`
        <p>A direct softmax over a large vocabulary can be expensive. If \(V\) has hundreds of thousands of entries, one training example can require a score for every token.</p>

        <h3>Skip-gram score</h3>
        <p>Let \(u_w\in\mathbb R^d\) be the input vector for center word \(w\), and let \(v_c\in\mathbb R^d\) be the output vector for context word \(c\). A simple compatibility score is</p>
        <p>\[s(w,c)=v_c^\top u_w.\]</p>

        <h3>Negative sampling</h3>
        <p>Instead of normalizing over every vocabulary item, negative sampling turns training into several binary classification decisions.</p>
        <p>For one observed pair \((w,c)\) and negative context samples \(n_1,\ldots,n_K\), a common objective to maximize is</p>
        <p>\[
        \log\sigma(v_c^\top u_w)
        +\sum_{k=1}^{K}\log\sigma(-v_{n_k}^\top u_w).
        \]</p>
        <p>The positive pair should have a large dot product. Negative pairs should have small or negative dot products.</p>

        <h3>Numerical intuition</h3>
        <p>If the positive score is 2, then \(\sigma(2)\approx0.881\). If a negative score is \(-2\), then \(\sigma(-(-2))=\sigma(2)\approx0.881\). Both terms are rewarded.</p>
        <p>If a negative example has score 3, the term \(\log\sigma(-3)\) is strongly negative. The gradient pushes that pair apart.</p>

        <h3>Noise-contrastive estimation</h3>
        <p>Noise-contrastive estimation, or NCE, also converts density estimation into classification between data samples and samples from a known noise distribution. It includes an explicit model of the noise probability and can be used to estimate an unnormalized probabilistic model.</p>
        <p>Negative sampling is related to NCE, but the objectives are not identical. Do not use the names as synonyms.</p>

        <h3>Hierarchical softmax</h3>
        <p>Hierarchical softmax places vocabulary items at leaves of a binary tree. Predicting one token requires decisions along one root-to-leaf path.</p>
        <p>If the tree is balanced, path length is approximately</p>
        <p>\[O(\log V)\]</p>
        <p>instead of computing \(O(V)\) output scores.</p>
        <p>Each internal node has a binary probability. The token probability is the product of probabilities along its path.</p>
        <div class="paper-connection"><strong>ML connection.</strong> These objectives are common in classic embedding papers. Modern large language models usually use a full or optimized vocabulary softmax during training, but the sampled-objective ideas remain important in retrieval, recommendation, and very large classification problems.</div>
        <div class="shape-check"><strong>Paper-reading warning.</strong> Always identify what is sampled. Negative tokens, negative word-context pairs, in-batch negatives, and noise samples can produce different objectives.</div>
      `
    }
  ],
  examples: [
    ["Sequence log-likelihood", String.raw`If a model assigns next-token probabilities \(0.5\), \(0.25\), and \(0.8\) to three observed targets, the sequence likelihood is \(0.5\times0.25\times0.8=0.1\). The negative log-likelihood is \(-\log(0.1)\approx2.303\).`],
    ["Embedding shape", String.raw`If \(E\in\mathbb R^{50{,}000\times768}\) and token ids have shape \(32\times128\), the embedding output has shape \(32\times128\times768\).`],
    ["Softmax probability", String.raw`For logits \((0,0,0)\), every exponential is 1, so softmax gives \((1/3,1/3,1/3)\). Equal logits produce a uniform categorical distribution.`]
  ],
  practice: []
});
