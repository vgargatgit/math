const day22 = COURSE[7].lessons[0];

Object.assign(day22, {
  published: true,
  summary: "Use a repeatable mathematical workflow to turn dense AI/ML papers into typed objects, checked equations, small examples, and testable claims.",
  explanation: "A technical paper becomes easier when you reconstruct it instead of reading it line by line. First identify the objects. Then write their shapes and translate the notation into one consistent vocabulary. Next separate definitions from claims, locate the central objective, rebuild one derivation, list assumptions, test the mathematics with small numbers, and implement the key equation. Finally separate what the mathematics proves from what the experiments show.",
  topics: [
    "Identify mathematical objects",
    "Annotate shapes",
    "Translate notation",
    "Separate definitions from claims",
    "Find the central objective",
    "Reconstruct one derivation",
    "List assumptions",
    "Create a toy numerical example",
    "Implement the equation",
    "Separate mathematical and empirical evidence"
  ],
  sections: [
    {
      id: "reading-as-reconstruction",
      title: "1. Read a paper by reconstructing a small mathematical system",
      html: String.raw`
        <p>A difficult paper can contain many symbols, references, and implementation details. Do not try to understand all of them at the same time. Build a small model of the paper.</p>
        <p>For each important equation, ask four questions:</p>
        <ol>
          <li>What objects appear in the equation?</li>
          <li>What is the shape or type of each object?</li>
          <li>What operation connects them?</li>
          <li>What claim does the paper make about the result?</li>
        </ol>
        <p>Consider the common attention equation</p>
        <p>\[
        H=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
        \]</p>
        <p>You do not need the whole Transformer architecture to start. Assume</p>
        <p>\[
        Q,K\in\mathbb R^{n\times d_k},
        \qquad
        V\in\mathbb R^{n\times d_v}.
        \]</p>
        <p>Then</p>
        <p>\[
        QK^\top\in\mathbb R^{n\times n},
        \qquad
        H\in\mathbb R^{n\times d_v}.
        \]</p>
        <p>This small reconstruction already tells you what the score matrix means: each of the \(n\) query positions can score each of the \(n\) key positions.</p>
        <div class="paper-connection"><strong>Paper-reading habit.</strong> Reduce a large method to one checked equation before you read every architectural detail. A correct small model gives you an anchor for the rest of the paper.</div>
      `
    },
    {
      id: "identify-mathematical-objects",
      title: "2. Identify mathematical objects before you manipulate symbols",
      html: String.raw`
        <p>A symbol is useful only after you know what kind of object it represents. A paper can use the same letter for a scalar in one section and a matrix in another. Create an object ledger.</p>
        <p>For a supervised model, a typical ledger can be:</p>
        <table>
          <thead><tr><th>Symbol</th><th>Object</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>\(x_i\)</td><td>vector</td><td>input example \(i\)</td></tr>
            <tr><td>\(y_i\)</td><td>scalar or class label</td><td>target for example \(i\)</td></tr>
            <tr><td>\(X\)</td><td>matrix</td><td>batch or dataset of inputs</td></tr>
            <tr><td>\(\theta\)</td><td>parameter collection</td><td>learned model parameters</td></tr>
            <tr><td>\(f_\theta\)</td><td>function</td><td>model parameterized by \(\theta\)</td></tr>
            <tr><td>\(\ell\)</td><td>function</td><td>per-example loss</td></tr>
            <tr><td>\(L(\theta)\)</td><td>scalar</td><td>training objective</td></tr>
          </tbody>
        </table>

        <h3>Example: classify the objects in one equation</h3>
        <p>Suppose a paper writes</p>
        <p>\[
        L(\theta)=\frac1N\sum_{i=1}^{N}\ell\bigl(f_\theta(x_i),y_i\bigr)+\lambda\|\theta\|_2^2.
        \]</p>
        <p>The result \(L(\theta)\) is one scalar. The index \(i\) selects one training example. The model \(f_\theta\) is a function. The expression \(\ell(f_\theta(x_i),y_i)\) is one scalar loss. The norm term is one scalar regularizer. Therefore the addition is type-compatible.</p>

        <h3>Random variables need a separate label</h3>
        <p>In probabilistic papers, distinguish a random variable from one observed value. For example, \(Z\) can denote a random latent variable, while \(z\) denotes one realization. Authors do not always follow this capitalization convention, so write your own note.</p>
        <div class="definition"><strong>Object rule.</strong> Label every important symbol as one of: scalar, vector, matrix, tensor, random variable, set, function, distribution, parameter, index, or operator. Add more categories only when the paper needs them.</div>
      `
    },
    {
      id: "annotate-shapes",
      title: "3. Annotate shapes to turn notation into executable constraints",
      html: String.raw`
        <p>Shape annotations are one of the fastest error checks in ML mathematics. Write them next to the equation, even when the paper omits them.</p>

        <h3>Linear-layer example</h3>
        <p>Suppose</p>
        <p>\[
        H=XW+b.
        \]</p>
        <p>Use</p>
        <p>\[
        X\in\mathbb R^{B\times d},
        \qquad
        W\in\mathbb R^{d\times h},
        \qquad
        b\in\mathbb R^{h}.
        \]</p>
        <p>Then</p>
        <p>\[
        XW\in\mathbb R^{B\times h}.
        \]</p>
        <p>The bias is broadcast across the batch axis, so \(H\in\mathbb R^{B\times h}\).</p>

        <h3>Numerical shape trace</h3>
        <p>If \(B=32\), \(d=768\), and \(h=3072\), then</p>
        <p>\[
        X:32\times768,
        \quad
        W:768\times3072,
        \quad
        H:32\times3072.
        \]</p>
        <p>This annotation also gives a rough multiplication cost proportional to</p>
        <p>\[
        32\cdot768\cdot3072.
        \]</p>

        <h3>Batch and sequence axes</h3>
        <p>A language model can use</p>
        <p>\[
        X\in\mathbb R^{B\times T\times d}.
        \]</p>
        <p>Here \(B\) is batch size, \(T\) is sequence length, and \(d\) is embedding width. A paper can flatten \(B\) and \(T\), transpose axes, or use sequence-first notation. The mathematics can be equivalent even when the written shapes differ.</p>

        <h3>Gradient shape check</h3>
        <p>If \(L\) is scalar and \(W\in\mathbb R^{d\times h}\), then</p>
        <p>\[
        \frac{\partial L}{\partial W}\in\mathbb R^{d\times h}.
        \]</p>
        <p>A claimed gradient with shape \(h\times d\) can be valid only if the paper uses a different derivative-layout convention or writes the transpose explicitly.</p>
        <div class="shape-check"><strong>Reading rule.</strong> Do not use shape checking only after you are confused. Add shapes before you derive anything. Shapes are constraints that reduce the number of possible interpretations.</div>
      `
    },
    {
      id: "translate-notation",
      title: "4. Translate the paper into one notation that you control",
      html: String.raw`
        <p>Different papers use different symbols for the same idea. Your goal is not to memorize each author's notation. Translate it into a stable notation that you understand.</p>

        <h3>Example: three notations for a prediction</h3>
        <p>One paper can write</p>
        <p>\[
        \hat y=f_\theta(x).
        \]</p>
        <p>Another can write</p>
        <p>\[
        o=g(x;w).
        \]</p>
        <p>A third can write</p>
        <p>\[
        p_\phi(y\mid x).
        \]</p>
        <p>These are not identical mathematical objects, but they can all describe model output. Write a note such as:</p>
        <p><em>My notation: input \(x\), parameters \(\theta\), output score \(s_\theta(x)\), probability \(p_\theta(y\mid x)\).</em></p>

        <h3>Translate overloaded subscripts</h3>
        <p>Suppose the paper writes \(h_i^l\). Decide whether \(i\) is a token, node, sample, or spatial position, and whether \(l\) is a layer or time step. Rewrite it if necessary as</p>
        <p>\[
        h_{\text{token }i}^{(\text{layer }\ell)}.
        \]</p>
        <p>You will not put this verbose notation into code, but it can remove ambiguity while you learn the method.</p>

        <h3>Keep operators distinct</h3>
        <p>Do not translate different operations into the same symbol. For example,</p>
        <p>\[
        x^\top y,
        \qquad
        x\odot y,
        \qquad
        xy^\top
        \]</p>
        <p>are a dot product, an element-wise product, and an outer product. For \(x,y\in\mathbb R^3\), their shapes are scalar, \(3\)-vector, and \(3\times3\) matrix.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Translation is especially useful when you compare two papers. Put both methods into one notation before you decide whether the methods are genuinely different.</div>
      `
    },
    {
      id: "definitions-versus-claims",
      title: "5. Separate definitions from claims and results",
      html: String.raw`
        <p>A definition introduces meaning. A claim states something that can be true or false. A theorem or proposition is a claim with a stated mathematical status. An empirical result is evidence measured on data.</p>

        <h3>Definition example</h3>
        <p>A paper can define attention weights as</p>
        <p>\[
        A=\operatorname{softmax}(S),
        \]</p>
        <p>where softmax is applied row-wise. This equation does not claim that attention is optimal or interpretable. It defines a quantity.</p>

        <h3>Claim example</h3>
        <p>The paper can then state: “The normalization makes each row a probability distribution.” This claim follows mathematically because every softmax entry is positive and each row sums to one:</p>
        <p>\[
        A_{ij}>0,
        \qquad
        \sum_j A_{ij}=1.
        \]</p>

        <h3>Empirical statement example</h3>
        <p>“Our model improves accuracy from 82.1% to 83.4% on the benchmark” is not implied by the softmax definition. It depends on the experiment.</p>

        <h3>Create a claim ledger</h3>
        <p>For each important statement, mark one of these labels:</p>
        <ul>
          <li><strong>D:</strong> definition;</li>
          <li><strong>M:</strong> mathematical claim or derivation;</li>
          <li><strong>A:</strong> assumption;</li>
          <li><strong>E:</strong> empirical observation;</li>
          <li><strong>I:</strong> interpretation or hypothesis.</li>
        </ul>
        <p>This simple classification prevents a common reading error: treating an interpretation as if it were a theorem.</p>
        <div class="definition"><strong>Important distinction.</strong> A paper can define a mathematically valid quantity and still make an empirical claim that is weak, dataset-specific, or unsupported. Check the two levels separately.</div>
      `
    }
  ]
});
