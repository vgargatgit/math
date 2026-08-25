(() => {
  const day18 = COURSE[6].lessons[2];

  day18.sections.push(
    {
      id: "graphs-matrices",
      title: "5. A graph becomes algebra through adjacency and degree matrices",
      html: String.raw`
        <p>A <strong>graph</strong> contains nodes and edges. Write</p>
        <p>\[G=(V,E),\]</p>
        <p>where \(V\) is the node set and \(E\) is the edge set. Graphs represent molecules, citation networks, road networks, knowledge graphs, social networks, meshes, and many other ML inputs.</p>

        <h3>Adjacency matrix</h3>
        <p>For a graph with \(n\) nodes, the adjacency matrix is</p>
        <p>\[A\in\mathbb R^{n\times n}.\]</p>
        <p>For an unweighted undirected graph,</p>
        <p>\[
        A_{ij}=\begin{cases}
        1,&\text{if nodes }i\text{ and }j\text{ are connected},\\
        0,&\text{otherwise.}
        \end{cases}
        \]</p>
        <p>Consider a path with three nodes:</p>
        <p>\[1\;--\;2\;--\;3.\]</p>
        <p>Then</p>
        <p>\[
        A=\begin{bmatrix}
        0&1&0\\
        1&0&1\\
        0&1&0
        \end{bmatrix}.
        \]</p>

        <h3>Degree matrix</h3>
        <p>The degree \(d_i\) is the number of neighbors of node \(i\) in an unweighted graph. For this path,</p>
        <p>\[d=(1,2,1).\]</p>
        <p>The degree matrix is diagonal:</p>
        <p>\[
        D=\operatorname{diag}(1,2,1)
        =\begin{bmatrix}
        1&0&0\\
        0&2&0\\
        0&0&1
        \end{bmatrix}.
        \]</p>

        <h3>Node-feature matrix</h3>
        <p>If each node has \(d\) input features, store them as</p>
        <p>\[H\in\mathbb R^{n\times d}.\]</p>
        <p>Row \(h_i^\top\) belongs to node \(i\). Multiplication by adjacency performs neighbor summation:</p>
        <p>\[
        (AH)_i=\sum_{j\in N(i)}h_j.
        \]</p>

        <h3>Numerical neighbor sum</h3>
        <p>Let each node have one scalar feature:</p>
        <p>\[
        H=\begin{bmatrix}2\\5\\1\end{bmatrix}.
        \]</p>
        <p>Then</p>
        <p>\[
        AH=
        \begin{bmatrix}
        0&1&0\\
        1&0&1\\
        0&1&0
        \end{bmatrix}
        \begin{bmatrix}2\\5\\1\end{bmatrix}
        =\begin{bmatrix}5\\3\\5\end{bmatrix}.
        \]</p>
        <p>Node 2 receives \(2+1=3\), the sum of the features from nodes 1 and 3.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Many graph neural-network equations are matrix versions of this simple neighbor aggregation. The main differences are normalization, learned transformations, nonlinearities, attention weights, and edge features.</div>
      `
    },
    {
      id: "graph-laplacian",
      title: "6. The graph Laplacian measures differences across edges",
      html: String.raw`
        <p>The unnormalized graph Laplacian is</p>
        <p>\[
        L=D-A.
        \]</p>
        <p>For the three-node path,</p>
        <p>\[
        L=\begin{bmatrix}
        1&-1&0\\
        -1&2&-1\\
        0&-1&1
        \end{bmatrix}.
        \]</p>

        <h3>What does \(Lx\) mean?</h3>
        <p>Let \(x\in\mathbb R^n\) assign one scalar to each node. Then</p>
        <p>\[
        (Lx)_i=d_ix_i-\sum_{j\in N(i)}x_j
        =\sum_{j\in N(i)}(x_i-x_j).
        \]</p>
        <p>So each coordinate measures how different node \(i\) is from its neighbors.</p>

        <h3>Numerical example</h3>
        <p>Use</p>
        <p>\[x=(1,1,4)^\top.\]</p>
        <p>Then</p>
        <p>\[
        Lx=
        \begin{bmatrix}
        0\\
        -3\\
        3
        \end{bmatrix}.
        \]</p>
        <p>Nodes 1 and 2 agree, so the first coordinate is zero. The edge between nodes 2 and 3 has a large difference.</p>

        <h3>Quadratic-form interpretation</h3>
        <p>For an undirected graph,</p>
        <p>\[
        x^\top Lx=\frac12\sum_{i,j}A_{ij}(x_i-x_j)^2.
        \]</p>
        <p>The factor \(1/2\) avoids counting each undirected edge twice.</p>
        <p>For the path and \(x=(1,1,4)^\top\),</p>
        <p>\[
        x^\top Lx=(1-1)^2+(1-4)^2=9.
        \]</p>
        <p>This quantity is small when connected nodes have similar values.</p>

        <h3>Why \(L\) is positive semidefinite</h3>
        <p>Because \(x^\top Lx\) is a sum of squared edge differences,</p>
        <p>\[x^\top Lx\ge0\]</p>
        <p>for every \(x\). Therefore \(L\) is positive semidefinite.</p>

        <h3>The constant vector</h3>
        <p>If all nodes have the same value, every edge difference is zero. Therefore</p>
        <p>\[L\mathbf 1=0.\]</p>
        <p>For a connected graph, the eigenvalue \(0\) has multiplicity one. More generally, the number of connected components equals the dimension of the nullspace of \(L\).</p>
        <div class="paper-connection"><strong>ML connection.</strong> Laplacian regularization penalizes rapid changes across graph edges. Objectives such as \(h^\top Lh\) encourage nearby or connected nodes to have similar representations.</div>
      `
    },
    {
      id: "graph-spectra",
      title: "7. Graph spectra provide graph-frequency coordinates",
      html: String.raw`
        <p>Because the Laplacian of an undirected graph is symmetric, it has an orthonormal eigenbasis:</p>
        <p>\[
        L=U\Lambda U^\top.
        \]</p>
        <p>The columns of \(U\) are graph Fourier modes. The eigenvalues satisfy</p>
        <p>\[0=\lambda_1\le\lambda_2\le\cdots\le\lambda_n.\]</p>

        <h3>Low and high graph frequencies</h3>
        <p>An eigenvector with a small eigenvalue changes slowly across connected nodes. An eigenvector with a large eigenvalue changes more rapidly.</p>
        <p>If</p>
        <p>\[Lu_k=\lambda_ku_k,\]</p>
        <p>then</p>
        <p>\[
        u_k^\top Lu_k=\lambda_k\|u_k\|^2.
        \]</p>
        <p>For a unit eigenvector, the Laplacian energy equals \(\lambda_k\). Larger eigenvalues therefore correspond to larger edge differences.</p>

        <h3>Graph Fourier transform</h3>
        <p>For a graph signal \(x\in\mathbb R^n\), define graph-frequency coefficients</p>
        <p>\[
        \widehat{x}=U^\top x.
        \]</p>
        <p>The inverse transform is</p>
        <p>\[
        x=U\widehat{x}.
        \]</p>
        <p>This is directly analogous to changing coordinates into an orthonormal Fourier basis.</p>

        <h3>Spectral filtering</h3>
        <p>A spectral graph filter can scale each eigenmode:</p>
        <p>\[
        y=Ug(\Lambda)U^\top x.
        \]</p>
        <p>Here \(g(\Lambda)\) is diagonal. Its entries specify how strongly each graph frequency is retained.</p>

        <h3>Why this matters for GNN history</h3>
        <p>Early graph convolution methods were often motivated as spectral filters. Modern message-passing GNNs are usually implemented locally, but spectral language still appears in papers on graph smoothness, oversmoothing, diffusion, positional encodings, and Laplacian eigenvectors.</p>
        <div class="shape-check"><strong>Shape check.</strong> \(U\in\mathbb R^{n\times n}\), \(x\in\mathbb R^n\), and \(\widehat{x}\in\mathbb R^n\). For \(d\) feature channels, the transform can be applied column-wise to \(H\in\mathbb R^{n\times d}\).</div>
      `
    },
    {
      id: "message-passing",
      title: "8. Message passing alternates local communication and node updates",
      html: String.raw`
        <p>A broad family of graph neural networks can be written as <strong>message-passing neural networks</strong>.</p>
        <p>At layer \(\ell\), node \(v\) receives messages from neighbors:</p>
        <p>\[
        m_v^{(\ell)}=
        \operatorname{AGG}
        \left\{
        \psi^{(\ell)}
        \left(h_v^{(\ell)},h_u^{(\ell)},e_{uv}\right)
        :u\in N(v)
        \right\}.
        \]</p>
        <p>Then it updates its hidden state:</p>
        <p>\[
        h_v^{(\ell+1)}=
        \phi^{(\ell)}
        \left(h_v^{(\ell)},m_v^{(\ell)}\right).
        \]</p>

        <h3>Why aggregation must ignore neighbor order</h3>
        <p>The set of neighbors has no meaningful ordering. Therefore \(\operatorname{AGG}\) is usually a symmetric function such as sum, mean, max, or an attention-weighted sum.</p>

        <h3>Numerical example</h3>
        <p>Suppose node \(v\) has two neighbors with scalar states \(2\) and \(5\), and its own state is \(1\). Let messages equal neighbor states, aggregate by sum, and update by</p>
        <p>\[
        h_v'=h_v+\sum_{u\in N(v)}h_u.
        \]</p>
        <p>Then</p>
        <p>\[
        h_v'=1+2+5=8.
        \]</p>
        <p>Swapping the order of the two neighbors does not change the result.</p>

        <h3>Shape reasoning</h3>
        <p>If each hidden state is in \(\mathbb R^{d_h}\), then each message is often also in \(\mathbb R^{d_m}\). After aggregation, \(m_v\in\mathbb R^{d_m}\). A learned update can concatenate state and message:</p>
        <p>\[
        \begin{bmatrix}h_v\\m_v\end{bmatrix}
        \in\mathbb R^{d_h+d_m}.
        \]</p>
        <p>A weight matrix of shape \((d_h+d_m)\times d_{\text{out}}\) can map this vector to the next hidden dimension.</p>

        <h3>Several layers expand the receptive neighborhood</h3>
        <p>After one message-passing layer, a node uses one-hop neighbors. After two layers, it can depend on two-hop neighbors. After \(L\) layers, information can travel up to \(L\) graph edges, subject to graph direction and architecture details.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> When a paper claims that a GNN has an \(L\)-hop receptive field, this usually comes from stacking \(L\) local aggregation layers.</div>
      `
    },
    {
      id: "graph-convolution",
      title: "9. Graph convolution is often normalized neighbor averaging plus a learned linear map",
      html: String.raw`
        <p>A widely used graph-convolution form adds self-loops and normalizes by degrees. Define</p>
        <p>\[
        \widetilde A=A+I,
        \]</p>
        <p>and let \(\widetilde D\) be the degree matrix of \(\widetilde A\). A common layer is</p>
        <p>\[
        H^{(\ell+1)}=
        \sigma\left(
        \widetilde D^{-1/2}
        \widetilde A
        \widetilde D^{-1/2}
        H^{(\ell)}W^{(\ell)}
        \right).
        \]</p>

        <h3>Read the equation from right to left</h3>
        <ol>
          <li>\(H^{(\ell)}W^{(\ell)}\) transforms feature channels.</li>
          <li>\(\widetilde A\) mixes neighboring node features.</li>
          <li>degree factors normalize contributions so high-degree nodes do not automatically produce much larger magnitudes;</li>
          <li>\(\sigma\) applies a nonlinearity.</li>
        </ol>

        <h3>Shape trace</h3>
        <p>Suppose</p>
        <p>\[
        H^{(\ell)}\in\mathbb R^{n\times d_{\text{in}}},
        \qquad
        W^{(\ell)}\in\mathbb R^{d_{\text{in}}\times d_{\text{out}}}.
        \]</p>
        <p>Then</p>
        <p>\[
        H^{(\ell)}W^{(\ell)}\in\mathbb R^{n\times d_{\text{out}}}.
        \]</p>
        <p>The normalized adjacency is \(n\times n\), so the final result remains</p>
        <p>\[
        H^{(\ell+1)}\in\mathbb R^{n\times d_{\text{out}}}.
        \]</p>

        <h3>Why normalization is important</h3>
        <p>Without normalization, a node with 100 neighbors can accumulate values on a different scale from a node with 2 neighbors. Normalization controls this degree effect, although different models use different normalizers.</p>

        <h3>Oversmoothing intuition</h3>
        <p>Repeated neighborhood averaging can make node representations increasingly similar. This is called <strong>oversmoothing</strong>. In spectral language, repeated smoothing suppresses high graph-frequency components. In spatial language, repeated averaging mixes information across larger neighborhoods.</p>
        <div class="shape-check"><strong>Common mistake.</strong> Do not call every GNN layer “graph convolution” as if there were one universal formula. Papers use different normalization, edge weights, direction conventions, self-loops, and message functions.</div>
      `
    },
    {
      id: "graph-attention",
      title: "10. Graph attention learns which neighbors matter more",
      html: String.raw`
        <p>Uniform averaging treats every neighbor similarly after normalization. <strong>Graph attention</strong> learns data-dependent neighbor weights.</p>
        <p>A generic attention score from node \(i\) to neighbor \(j\) can be</p>
        <p>\[
        e_{ij}=a\left(Wh_i,Wh_j,e_{ij}^{\text{edge}}\right).
        \]</p>
        <p>Normalize scores over the neighborhood:</p>
        <p>\[
        \alpha_{ij}
        =\frac{\exp(e_{ij})}
        {\sum_{k\in N(i)}\exp(e_{ik})}.
        \]</p>
        <p>Then aggregate:</p>
        <p>\[
        h_i'=\sigma\left(
        \sum_{j\in N(i)}\alpha_{ij}Wh_j
        \right).
        \]</p>

        <h3>Numerical attention example</h3>
        <p>Suppose node \(i\) has two neighbors with scalar transformed features \(4\) and \(10\). Let unnormalized scores be \(0\) and \(\ln 3\). Their exponentials are \(1\) and \(3\), so</p>
        <p>\[
        \alpha_{i1}=\frac14,
        \qquad
        \alpha_{i2}=\frac34.
        \]</p>
        <p>The weighted message is</p>
        <p>\[
        \frac14(4)+\frac34(10)=8.5.
        \]</p>

        <h3>Why graph attention remains permutation compatible</h3>
        <p>If neighbor scores depend on node and edge content, and the softmax is taken over the neighbor set, reordering the stored neighbor list only reorders intermediate terms. The final weighted sum is unchanged.</p>

        <h3>Attention is not explanation by default</h3>
        <p>A large \(\alpha_{ij}\) means the model used a larger coefficient in that layer. It does not automatically prove that edge \((i,j)\) is causally important or that the coefficient is a faithful human explanation.</p>
        <div class="paper-connection"><strong>Connection to Transformers.</strong> Transformer attention considers many token pairs. Graph attention restricts attention to graph-defined neighborhoods, unless the model explicitly adds long-range or virtual edges.</div>
      `
    },
    {
      id: "graph-isomorphism",
      title: "11. Graph isomorphism asks whether two node labelings describe the same graph",
      html: String.raw`
        <p>Two graphs are <strong>isomorphic</strong> when one can be turned into the other by renaming nodes while preserving edges.</p>
        <p>If \(A\) is an adjacency matrix and \(P\) is a permutation matrix, the adjacency matrix after node relabeling is</p>
        <p>\[
        A'=PAP^\top.
        \]</p>
        <p>Node features transform as</p>
        <p>\[
        H'=PH.
        \]</p>

        <h3>Why both sides of \(A\) are permuted</h3>
        <p>Rows index source nodes and columns index destination nodes. Renaming nodes must change both row and column indices. Therefore the same permutation appears on the left and its transpose on the right.</p>

        <h3>Permutation-equivariant GNN condition</h3>
        <p>For a node-level GNN \(F\), a desirable condition is</p>
        <p>\[
        F(PAP^\top,PH)=PF(A,H).
        \]</p>
        <p>A graph-level readout \(r\) should then remove the final node ordering:</p>
        <p>\[
        r(PF(A,H))=r(F(A,H)).
        \]</p>

        <h3>Expressive limits</h3>
        <p>Permutation compatibility does not mean a GNN can distinguish every pair of non-isomorphic graphs. Many message-passing GNNs have known expressive limits because different local neighborhoods can produce identical multisets of messages.</p>
        <p>This is why papers discuss graph isomorphism tests, Weisfeiler-Lehman intuition, higher-order GNNs, positional encodings, and structural features.</p>
        <div class="paper-connection"><strong>Reading point.</strong> Separate two claims: “the model is invariant or equivariant to relabeling” is a symmetry property. “The model can distinguish many graph structures” is an expressivity property. They are not the same claim.</div>
      `
    }
  );
})();
