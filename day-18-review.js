(() => {
  const day18 = COURSE[6].lessons[2];

  day18.sections.push(
    {
      id: "common-mistakes",
      title: "19. Common mistakes in set, graph, and geometric deep-learning papers",
      html: String.raw`
        <h3>Mistake 1: confuse invariance and equivariance</h3>
        <p>Invariant outputs do not change under the symmetry. Equivariant outputs change in a prescribed way. A graph label is often invariant to node relabeling. A node-feature matrix is usually equivariant.</p>

        <h3>Mistake 2: assume matrix row order is meaningful because it exists in memory</h3>
        <p>A set or graph must be stored somehow, but storage order can be arbitrary. Separate representation order from semantic structure.</p>

        <h3>Mistake 3: use \(PA\) instead of \(PAP^\top\) for graph relabeling</h3>
        <p>An adjacency matrix has node indices on both axes. Renaming nodes changes both axes.</p>

        <h3>Mistake 4: treat sum, mean, and max aggregation as equivalent</h3>
        <p>All can be permutation invariant, but they preserve different information. Mean can lose set-size information. Max discards all nonmaximum values in each coordinate.</p>

        <h3>Mistake 5: forget self-loops</h3>
        <p>Some GNN equations aggregate only neighbors. Others add \(I\) so that the current node is also included. This changes both degrees and normalization.</p>

        <h3>Mistake 6: compare normalized Laplacians without checking the convention</h3>
        <p>Common choices include \(L=D-A\), \(L_{\text{sym}}=I-D^{-1/2}AD^{-1/2}\), and \(L_{\text{rw}}=I-D^{-1}A\). They are related but not identical.</p>

        <h3>Mistake 7: assume attention weights are causal explanations</h3>
        <p>Attention coefficients describe one internal weighted aggregation. They do not automatically establish causal importance or faithful interpretability.</p>

        <h3>Mistake 8: think a deeper GNN always sees more useful information</h3>
        <p>More layers increase the formal hop range, but repeated aggregation can cause oversmoothing, oversquashing, or optimization problems.</p>

        <h3>Mistake 9: equate symmetry with expressivity</h3>
        <p>A network can be perfectly permutation equivariant and still fail to distinguish some non-isomorphic graphs.</p>

        <h3>Mistake 10: confuse ambient and intrinsic dimension</h3>
        <p>A circle is embedded in \(\mathbb R^2\) but has intrinsic dimension 1. A surface can be stored with 3-D coordinates while having intrinsic dimension 2.</p>

        <h3>Mistake 11: assume Euclidean distance is always the relevant distance</h3>
        <p>Graph shortest-path or manifold geodesic distance can better reflect the structure of the domain.</p>

        <h3>Mistake 12: treat feature coordinates as coordinate-independent quantities</h3>
        <p>A geometric vector is one object. Its numerical coordinates depend on the chosen basis or local frame.</p>

        <h3>Mistake 13: read “rotation invariant” when the task needs rotation equivariance</h3>
        <p>Molecular energy should not rotate. A force vector should rotate. The correct symmetry property depends on the output type.</p>

        <h3>Mistake 14: assume every graph is undirected</h3>
        <p>For directed graphs, \(A\) need not be symmetric, in-degree and out-degree differ, and Laplacian conventions require extra care.</p>

        <h3>Mistake 15: assume gauge means a new physical force</h3>
        <p>In this course, gauge intuition starts with local coordinate choices. The important question is whether the model behaves consistently when local frames change.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "20. A paper-reading workflow for geometric deep learning",
      html: String.raw`
        <p>When you read a set, graph, or geometric deep-learning paper, use a fixed sequence. It prevents advanced terminology from hiding simple structural assumptions.</p>
        <ol>
          <li><strong>Identify the domain.</strong> Is the input a set, graph, point cloud, mesh, manifold, molecule, or another geometric object?</li>
          <li><strong>Write the stored tensors and shapes.</strong> For a graph, write \(A:n\times n\), node features \(H:n\times d\), and edge features if present.</li>
          <li><strong>Identify arbitrary choices.</strong> Node order, point order, global orientation, and local frames can be arbitrary.</li>
          <li><strong>Name the symmetry group.</strong> It can be permutations, translations, rotations, rigid motions, or local frame transformations.</li>
          <li><strong>Classify each output.</strong> Decide whether it should be invariant or equivariant.</li>
          <li><strong>Write the transformation law.</strong> For graph nodes, test \(F(PAP^\top,PH)=PF(A,H)\). For a vector under rotation, test \(F(Rx)=RF(x)\).</li>
          <li><strong>Expand one aggregation by hand.</strong> Pick one node and list its neighbors, messages, coefficients, and update.</li>
          <li><strong>Track the receptive neighborhood.</strong> Determine how many hops or geometric neighbors can influence one feature.</li>
          <li><strong>Check normalization.</strong> Identify degree normalization, softmax normalization, or Laplacian scaling.</li>
          <li><strong>Separate local and global geometry.</strong> Ask whether the method uses Euclidean coordinates, graph distances, geodesics, tangent frames, or spectral coordinates.</li>
          <li><strong>Check expressivity claims separately.</strong> Symmetry correctness does not prove graph-isomorphism power.</li>
          <li><strong>Reconstruct a toy case.</strong> Use three nodes, two features, or three points. Advanced equations often become clear on tiny examples.</li>
        </ol>

        <h3>Worked paper-style shape trace</h3>
        <p>Suppose a graph has \(n=5\) nodes and each node starts with \(d_{\text{in}}=3\) features:</p>
        <p>\[
        H^{(0)}\in\mathbb R^{5\times3}.
        \]</p>
        <p>A GCN layer uses</p>
        <p>\[
        W^{(0)}\in\mathbb R^{3\times8}.
        \]</p>
        <p>Then</p>
        <p>\[
        H^{(0)}W^{(0)}\in\mathbb R^{5\times8}.
        \]</p>
        <p>The normalized adjacency \(\widehat A\in\mathbb R^{5\times5}\) mixes nodes:</p>
        <p>\[
        H^{(1)}=\sigma(\widehat A H^{(0)}W^{(0)})
        \in\mathbb R^{5\times8}.
        \]</p>
        <p>A graph-level sum readout gives</p>
        <p>\[
        z=\sum_{i=1}^{5}H_i^{(1)}\in\mathbb R^8.
        \]</p>
        <p>A classifier with \(W_c\in\mathbb R^{8\times4}\) produces four logits:</p>
        <p>\[
        o=zW_c\in\mathbb R^4.
        \]</p>
        <p>The node-level hidden representation is permutation equivariant. The sum readout removes node order and creates a permutation-invariant graph representation.</p>
        <div class="paper-connection"><strong>Core habit.</strong> For every equation, write both the shape transformation and the symmetry transformation. In geometric deep learning, both are part of correctness.</div>
      `
    },
    {
      id: "day18-recap",
      title: "21. Recap",
      html: String.raw`
        <ul>
          <li>A permutation changes order without changing the identities of the items.</li>
          <li>Permutation matrices reorder rows and satisfy \(P^{-1}=P^\top\).</li>
          <li>Invariant outputs stay fixed under a symmetry. Equivariant outputs transform predictably.</li>
          <li>A group collects compatible invertible transformations, and a group action specifies how they act on data.</li>
          <li>Deep Sets use symmetric aggregation such as sum to remove arbitrary set order.</li>
          <li>Adjacency matrices encode edges. Degree matrices count neighborhood size.</li>
          <li>The graph Laplacian \(L=D-A\) measures differences across edges and is positive semidefinite for undirected graphs.</li>
          <li>Laplacian eigenvectors are graph-frequency coordinates. Small eigenvalues represent smoother graph signals.</li>
          <li>Message passing computes neighbor messages, aggregates them without using neighbor order, and updates node states.</li>
          <li>Graph convolution often combines normalized neighborhood mixing with learned channel transformations.</li>
          <li>Graph attention learns data-dependent weights over neighbors.</li>
          <li>Node relabeling transforms \(A\) as \(PAP^\top\) and node features as \(PH\).</li>
          <li>Permutation equivariance and graph expressivity are different properties.</li>
          <li>A manifold is locally Euclidean even when it is globally curved.</li>
          <li>A tangent space is a local linear approximation. Geodesic distance respects the domain geometry.</li>
          <li>Local coordinates describe geometric objects relative to a chosen chart or frame.</li>
          <li>Transformation groups formalize rotations, translations, and rigid motions.</li>
          <li>Group representations specify how scalar, vector, and tensor features transform.</li>
          <li>Gauge intuition is local coordinate freedom: internal coordinates may change while the underlying geometric object stays the same.</li>
        </ul>
      `
    }
  );

  day18.examples = [
    ["Permutation matrix", String.raw`If \(P=\begin{bmatrix}0&1\\1&0\end{bmatrix}\) and \(X=\begin{bmatrix}2&0\\5&1\end{bmatrix}\), then \(PX\) swaps the two rows.`],
    ["Invariant sum", String.raw`For the set \(\{2,5,1\}\), every permutation has the same sum \(8\).`],
    ["Neighbor aggregation", String.raw`On the path \(1--2--3\) with scalar features \((2,5,1)^\top\), \(AH=(5,3,5)^\top\).`],
    ["Laplacian energy", String.raw`For the same path and \(x=(1,1,4)^\top\), \(x^\top Lx=(1-1)^2+(1-4)^2=9\).`],
    ["Graph attention", String.raw`Softmax weights proportional to \((1,3)\) become \((1/4,3/4)\). Applied to neighbor values \((4,10)\), the message is \(8.5\).`],
    ["Rigid-motion invariance", String.raw`For orthogonal \(R\), \(\|R(x_i-x_j)\|_2=\|x_i-x_j\|_2\), so pairwise distances survive rotation.`],
    ["Circle tangent", String.raw`At \((1,0)\) on \(x^2+y^2=1\), tangent vectors satisfy \((2,0)^\top v=0\), so they have the form \((0,t)^\top\).`]
  ];

  day18.practice = [
    String.raw`Let \(X=\begin{bmatrix}1\\4\\2\end{bmatrix}\). Write a permutation matrix that changes the order to \((2,1,4)^\top\).<details><summary>Answer</summary><p>One choice is \(P=\begin{bmatrix}0&0&1\\1&0&0\\0&1&0\end{bmatrix}\). Then \(PX=(2,1,4)^\top\).</p></details>`,
    String.raw`Is the sum of set elements invariant or equivariant to permutation?<details><summary>Answer</summary><p>Invariant. Reordering does not change the sum.</p></details>`,
    String.raw`If \(F(PX)=PF(X)\), what symmetry property does \(F\) have?<details><summary>Answer</summary><p>It is permutation equivariant.</p></details>`,
    String.raw`Why is sorting not the same as permutation invariance?<details><summary>Answer</summary><p>Sorting creates a chosen canonical order. An invariant function gives the same output for all orders without requiring that an order have semantic meaning.</p></details>`,
    String.raw`For the path graph \(1--2--3\), write its degree matrix.<details><summary>Answer</summary><p>The degrees are \((1,2,1)\), so \(D=\operatorname{diag}(1,2,1)\).</p></details>`,
    String.raw`For that path, compute \(L\mathbf 1\).<details><summary>Answer</summary><p>It is the zero vector because each row of \(L=D-A\) sums to zero.</p></details>`,
    String.raw`Why is \(x^\top Lx\ge0\) for an undirected graph?<details><summary>Answer</summary><p>It can be written as one half of a sum of nonnegative squared edge differences: \(\frac12\sum_{i,j}A_{ij}(x_i-x_j)^2\).</p></details>`,
    String.raw`If \(H\in\mathbb R^{20\times16}\) and \(W\in\mathbb R^{16\times32}\), what is the shape of \(HW\)?<details><summary>Answer</summary><p>\(20\times32\). There remains one row per node.</p></details>`,
    String.raw`A node has neighbor features \(2,4,7\). What is mean aggregation?<details><summary>Answer</summary><p>\((2+4+7)/3=13/3\).</p></details>`,
    String.raw`Why must a basic neighbor aggregator be insensitive to neighbor-list order?<details><summary>Answer</summary><p>The graph defines which nodes are neighbors, not an ordering of those neighbors. Reordering the stored list should not change the graph computation.</p></details>`,
    String.raw`Under node relabeling by permutation matrix \(P\), how does adjacency \(A\) transform?<details><summary>Answer</summary><p>As \(PAP^\top\), because both adjacency axes are node indices.</p></details>`,
    String.raw`Does permutation equivariance guarantee that a message-passing GNN distinguishes every non-isomorphic graph?<details><summary>Answer</summary><p>No. Symmetry correctness and graph expressivity are different properties.</p></details>`,
    String.raw`What is the intrinsic dimension of a circle embedded in \(\mathbb R^2\)?<details><summary>Answer</summary><p>One. One local coordinate, such as angle, describes the circle locally.</p></details>`,
    String.raw`At \((1,0)\) on the unit circle, give one unit tangent vector.<details><summary>Answer</summary><p>\((0,1)^\top\) or \((0,-1)^\top\).</p></details>`,
    String.raw`For two points on the unit circle separated by angle \(\pi/3\), what is their shorter geodesic distance?<details><summary>Answer</summary><p>\(\pi/3\), because radius is 1 and arc length is radius times angle.</p></details>`,
    String.raw`A molecule is rotated by \(R\). Should a scalar energy prediction be invariant or equivariant?<details><summary>Answer</summary><p>Invariant. The physical energy should not depend on global orientation.</p></details>`,
    String.raw`The same molecule has a predicted force vector. How should that vector change under rotation?<details><summary>Answer</summary><p>Equivariantly: if the input is rotated by \(R\), the force should become \(Rf\).</p></details>`,
    String.raw`What does a group representation \(\rho(g)\) specify?<details><summary>Answer</summary><p>It specifies how a feature vector or feature space transforms when the group element \(g\) acts.</p></details>`,
    String.raw`Why can a local tangent-vector coordinate pair change even when the geometric vector stays the same?<details><summary>Answer</summary><p>The coordinates depend on the chosen local basis. Changing the basis changes the coordinate numbers, not the underlying vector.</p></details>`,
    String.raw`In one sentence, what is the useful first intuition for gauge equivariance?<details><summary>Answer</summary><p>The model should behave consistently when arbitrary local coordinate frames are changed.</p></details>`
  ];
})();
