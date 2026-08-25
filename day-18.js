const day18 = COURSE[6].lessons[2];

Object.assign(day18, {
  published: true,
  summary: "Build the symmetry, set, and permutation mathematics needed for Deep Sets, graph neural networks, graph attention, and geometric deep-learning papers.",
  explanation: "Many ML inputs do not live on a fixed ordered grid. A set has elements but no meaningful order. A graph has nodes and edges, but the numbering of nodes is arbitrary. Geometric deep learning starts from a simple question: which transformations of the input should leave the answer unchanged, and which transformations should change the answer in a predictable way? This lesson develops that question from permutations to groups, graphs, manifolds, and gauge choices.",
  topics: [
    "Permutations",
    "Permutation invariance and equivariance",
    "Symmetry",
    "Group actions",
    "Invariant and equivariant functions",
    "Set-function forms",
    "Graphs",
    "Adjacency and degree matrices",
    "Graph Laplacians",
    "Graph spectra",
    "Neighborhood aggregation",
    "Message passing",
    "Graph convolution",
    "Graph attention",
    "Isomorphism intuition",
    "Manifolds",
    "Tangent spaces",
    "Geodesic distance",
    "Local coordinates",
    "Transformation groups",
    "Representations of symmetry groups",
    "Gauge intuition"
  ],
  sections: [
    {
      id: "permutations",
      title: "1. A permutation changes order, not identity",
      html: String.raw`
        <p>A <strong>permutation</strong> is a reordering of objects. If a set contains three feature vectors, we can list them in many orders, but the set itself does not change.</p>
        <p>For three items, one ordering is</p>
        <p>\[X=(x_1,x_2,x_3).\]</p>
        <p>A permutation can move the third item to the first position:</p>
        <p>\[\pi(X)=(x_3,x_1,x_2).\]</p>
        <p>The important point is that the labels \(1,2,3\) are bookkeeping labels. They are not always part of the data.</p>

        <h3>Permutation matrices</h3>
        <p>A permutation can be represented by a matrix. Let</p>
        <p>\[
        P=\begin{bmatrix}
        0&0&1\\
        1&0&0\\
        0&1&0
        \end{bmatrix}.
        \]</p>
        <p>If the rows of</p>
        <p>\[
        X=\begin{bmatrix}
        1&0\\
        2&1\\
        4&3
        \end{bmatrix}
        \in\mathbb R^{3\times2}
        \]</p>
        <p>store three items, then</p>
        <p>\[
        PX=\begin{bmatrix}
        4&3\\
        1&0\\
        2&1
        \end{bmatrix}.
        \]</p>
        <p>Left multiplication by \(P\) reorders rows. A permutation matrix is orthogonal:</p>
        <p>\[P^\top P=I,\qquad P^{-1}=P^\top.\]</p>

        <h3>Why this matters for ML papers</h3>
        <p>If rows represent points in a point cloud, members of a set, or graph nodes, a paper must state whether row order has meaning. If the order is arbitrary, the model should not change its semantic prediction only because rows were stored in a different order.</p>
        <div class="shape-check"><strong>Shape check.</strong> If \(X\in\mathbb R^{n\times d}\) stores \(n\) objects with \(d\) features, then \(P\in\mathbb R^{n\times n}\), and \(PX\in\mathbb R^{n\times d}\). The feature dimension does not change.</div>
        <div class="paper-connection"><strong>Paper connection.</strong> In graph neural networks, a node renumbering is represented by a permutation matrix. Correct graph-level predictions should not depend on that renumbering.</div>
      `
    },
    {
      id: "invariance-equivariance",
      title: "2. Invariance means the answer stays fixed; equivariance means it moves predictably",
      html: String.raw`
        <p>Two words appear constantly in geometric deep-learning papers: <strong>invariant</strong> and <strong>equivariant</strong>.</p>

        <h3>Invariant function</h3>
        <p>A function \(f\) is invariant to a transformation \(g\) if</p>
        <p>\[
        f(g\cdot x)=f(x).
        \]</p>
        <p>The input changes, but the output stays the same.</p>
        <p>For a set \(X=\{x_1,\ldots,x_n\}\), the sum</p>
        <p>\[
        f(X)=\sum_{i=1}^n x_i
        \]</p>
        <p>is permutation invariant because addition does not depend on order.</p>
        <p>For the numbers \((2,5,1)\),</p>
        <p>\[2+5+1=1+2+5=8.\]</p>

        <h3>Equivariant function</h3>
        <p>A function is equivariant if transforming the input transforms the output in a corresponding way. For permutations, a common condition is</p>
        <p>\[
        F(PX)=PF(X).
        \]</p>
        <p>If the rows of the input are reordered, the output rows are reordered in exactly the same way.</p>

        <h3>Numerical example</h3>
        <p>Apply the same row-wise map to every item:</p>
        <p>\[
        F(X)_i=2x_i+1.
        \]</p>
        <p>For \(X=(1,3,5)^\top\),</p>
        <p>\[F(X)=(3,7,11)^\top.\]</p>
        <p>If a permutation gives \(PX=(5,1,3)^\top\), then</p>
        <p>\[F(PX)=(11,3,7)^\top=PF(X).\]</p>

        <h3>Graph-level versus node-level outputs</h3>
        <p>A graph classifier normally produces one label for the whole graph. That output should usually be invariant to node numbering.</p>
        <p>A node classifier produces one output per node. If node labels are permuted, node outputs should move with the same permutation. That is equivariance.</p>
        <div class="definition"><strong>Reading rule.</strong> Ask whether the output itself has positions or labels that should transform. Scalar graph predictions are usually invariant. Per-node or per-point predictions are usually equivariant.</div>
      `
    },
    {
      id: "symmetry-groups",
      title: "3. A symmetry is a transformation that preserves the structure that matters",
      html: String.raw`
        <p>A <strong>symmetry</strong> is a transformation under which some relevant structure is preserved. The transformation can change coordinates while leaving the underlying object equivalent for the task.</p>
        <p>Examples include:</p>
        <ul>
          <li>permuting members of a set;</li>
          <li>renumbering graph nodes;</li>
          <li>translating an image;</li>
          <li>rotating a molecule in three-dimensional space;</li>
          <li>changing a local coordinate frame on a surface.</li>
        </ul>

        <h3>Groups collect compatible symmetries</h3>
        <p>A <strong>group</strong> is a set of transformations with four properties:</p>
        <ol>
          <li>combining two transformations gives another transformation in the set;</li>
          <li>there is an identity transformation;</li>
          <li>every transformation has an inverse;</li>
          <li>composition is associative.</li>
        </ol>
        <p>For permutations of \(n\) items, the group is called \(S_n\).</p>

        <h3>Why the inverse matters</h3>
        <p>If a transformation represents a change of viewpoint rather than information loss, we must be able to undo it. A permutation can be undone. A rigid rotation can be undone. Averaging all entries cannot generally be undone, so averaging is not itself a symmetry transformation.</p>

        <h3>Group actions</h3>
        <p>A group action tells us how each abstract group element acts on the data. Write</p>
        <p>\[g\cdot x.\]</p>
        <p>The action must respect composition:</p>
        <p>\[(g_1g_2)\cdot x=g_1\cdot(g_2\cdot x).\]</p>
        <p>For permutations acting on a row-stacked matrix, the action is</p>
        <p>\[P\cdot X=PX.\]</p>

        <h3>Realistic ML equation</h3>
        <p>An equivariant representation \(F\) can be written abstractly as</p>
        <p>\[
        F(g\cdot x)=\rho(g)F(x),
        \]</p>
        <p>where \(\rho(g)\) tells us how the output representation transforms.</p>
        <p>For permutation-equivariant node features, \(\rho(P)=P\). For a rotation-equivariant 3-D vector field, \(\rho(R)=R\).</p>
        <div class="paper-connection"><strong>Why papers use this language.</strong> One equation can describe CNN translation equivariance, graph permutation equivariance, and molecular rotation equivariance. The group changes, but the structural idea is the same.</div>
      `
    },
    {
      id: "deep-sets",
      title: "4. Set functions use symmetric aggregation to remove arbitrary ordering",
      html: String.raw`
        <p>A set has members but no canonical order. A useful set model should therefore respect permutations.</p>
        <p>A common form is</p>
        <p>\[
        f(X)=\rho\left(\sum_{x\in X}\phi(x)\right).
        \]</p>
        <p>The map \(\phi\) processes each element. The sum combines element representations without using their order. The map \(\rho\) then produces the final output.</p>

        <h3>Shape reasoning</h3>
        <p>Suppose</p>
        <p>\[X\in\mathbb R^{n\times d}.\]</p>
        <p>Let</p>
        <p>\[\phi:\mathbb R^d\to\mathbb R^h.\]</p>
        <p>Applying \(\phi\) to each row gives an \(n\times h\) matrix. Summing rows gives one \(h\)-dimensional vector:</p>
        <p>\[
        z=\sum_{i=1}^n\phi(x_i)\in\mathbb R^h.
        \]</p>
        <p>If \(\rho:\mathbb R^h\to\mathbb R^c\), then the final output is in \(\mathbb R^c\).</p>

        <h3>Numerical example</h3>
        <p>Let a set contain scalars \(X=\{1,2,4\}\). Define</p>
        <p>\[\phi(x)=\begin{bmatrix}x\\x^2\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[
        \sum_{x\in X}\phi(x)
        =\begin{bmatrix}1+2+4\\1+4+16\end{bmatrix}
        =\begin{bmatrix}7\\21\end{bmatrix}.
        \]</p>
        <p>Any reordering gives the same vector.</p>

        <h3>Mean, max, and attention pooling</h3>
        <p>Sum is not the only permutation-invariant aggregator. Mean and element-wise max are also invariant. Attention pooling can also be invariant if the attention scores are computed from element content rather than from arbitrary positions and the final weighted sum is symmetric.</p>
        <p>Different aggregators preserve different information. Mean loses explicit set size. Sum can encode set size when \(\phi\) includes a constant component. Max keeps only the strongest response in each feature coordinate.</p>

        <h3>Common notation issue</h3>
        <p>Papers sometimes write \(X\) as a set and later store it as a matrix. A matrix has an order in memory. The mathematical claim is that the model output should not depend on which arbitrary row order was chosen.</p>
        <div class="shape-check"><strong>Common mistake.</strong> Do not confuse permutation invariance with sorting. Sorting creates a canonical order when a suitable key exists. Invariance means the model does not need a meaningful order in the first place.</div>
      `
    }
  ]
});
