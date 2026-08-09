const day2 = COURSE[0].lessons[1];
Object.assign(day2, {
  published: true,
  summary: "Use vectors, matrices, and tensors with confidence. Learn the shape rules that make neural-network equations readable before you calculate any numbers.",
  explanation: "In AI and ML, most equations describe how arrays change shape and combine. The safest habit is to write the shape of every object before you multiply, add, reshape, broadcast, or reduce it. Shape reasoning catches many mistakes before algebra begins.",
  topics: [
    "Row and column vectors",
    "Matrix dimensions and indexing",
    "Tensor axes and tensor rank versus matrix rank",
    "Addition and scalar multiplication",
    "Matrix-vector multiplication",
    "Matrix-matrix multiplication",
    "Dot products",
    "Outer products",
    "Hadamard products",
    "Transpose",
    "Identity and diagonal matrices",
    "Inverse intuition",
    "Trace and determinant intuition",
    "Matrix rank and null space",
    "Block matrices and concatenation",
    "Tensor reshaping",
    "Broadcasting",
    "Reductions",
    "Batch dimensions",
    "Neural-network shape checks"
  ],
  sections: [
    {
      id: "shape-first",
      title: "1. Start with shape, not arithmetic",
      html: raw`
        <p>A vector, matrix, or tensor stores numbers. In machine learning, the important first question is usually not “What are the numbers?” It is “What is the shape?”</p>
        <p>For a matrix \(A\in\mathbb{R}^{m\times n}\), the first dimension is the number of rows and the second dimension is the number of columns. For example, \(A\in\mathbb{R}^{3\times 2}\) has three rows and two columns.</p>
        <div class="shape-check">
          <strong>Shape rule.</strong> Before an operation, write the shape beside each object. After the operation, predict the output shape. Only then calculate values.
        </div>
        <p>Suppose \(W\in\mathbb{R}^{4\times 3}\) and \(x\in\mathbb{R}^{3}\). If \(x\) is a column vector, then \(Wx\) is valid and the result is in \(\mathbb{R}^{4}\). You can know this without seeing any entries of \(W\) or \(x\).</p>
        <p>This habit is central to reading neural-network papers. A long equation becomes easier when every object has a visible shape.</p>
      `
    },
    {
      id: "vectors",
      title: "2. Row vectors and column vectors",
      html: raw`
        <p>A vector can be written as a row or as a column. A column vector with three entries is</p>
        <p>\[x=\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}\in\mathbb{R}^{3\times 1}.\]</p>
        <p>The same entries as a row vector are</p>
        <p>\[x^\top=\begin{bmatrix}x_1&x_2&x_3\end{bmatrix}\in\mathbb{R}^{1\times 3}.\]</p>
        <p>Many papers write \(x\in\mathbb{R}^{3}\) and do not show the explicit \(3\times1\) shape. The author may treat vectors as columns by convention. Other papers use row-vector notation for batches. You must infer the convention from matrix products.</p>
        <div class="mini-example">
          If \(x=(2,-1,4)^\top\), then \(x^\top=[2,-1,4]\). Transpose changes orientation, not the stored values.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> One neural-network convention is \(z=Wx+b\), where \(x\) is a column vector. Another convention is \(z=xW+b\), where \(x\) is a row vector. Both can be correct. Do not mix conventions inside one derivation.
        </div>
      `
    },
    {
      id: "matrices-indexing",
      title: "3. Matrix dimensions and indexing",
      html: raw`
        <p>A matrix is a rectangular array. If \(A\in\mathbb{R}^{m\times n}\), then \(A\) has \(m\) rows and \(n\) columns.</p>
        <p>For</p>
        <p>\[A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix},\]</p>
        <p>the shape is \(2\times3\). The entry \(A_{21}=4\) is in row 2 and column 1. The entry \(A_{13}=3\) is in row 1 and column 3.</p>
        <p>A row can represent one example, one token, or one time step. A column can represent a feature, hidden unit, or output coordinate. The meaning is determined by the paper.</p>
        <table>
          <thead><tr><th>Notation</th><th>Common meaning</th></tr></thead>
          <tbody>
            <tr><td>\(X\in\mathbb{R}^{N\times d}\)</td><td>\(N\) examples, each with \(d\) features</td></tr>
            <tr><td>\(H\in\mathbb{R}^{T\times h}\)</td><td>\(T\) token states, each with width \(h\)</td></tr>
            <tr><td>\(W\in\mathbb{R}^{d\times h}\)</td><td>A linear map from width \(d\) to width \(h\)</td></tr>
          </tbody>
        </table>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not assume that examples are always rows. Some mathematical texts store examples as columns. Check the surrounding multiplication.
        </div>
      `
    },
    {
      id: "tensors",
      title: "4. Tensors, axes, and two meanings of rank",
      html: raw`
        <p>In common deep-learning usage, a tensor is an array with one or more axes. A scalar has no data axis, a vector has one, a matrix has two, and an image batch can have four.</p>
        <p>For example, an image batch can have shape</p>
        <p>\[(B,H,W,C),\]</p>
        <p>where \(B\) is batch size, \(H\) is height, \(W\) is width, and \(C\) is the number of channels.</p>
        <p>The word <strong>rank</strong> is overloaded. In tensor software, tensor rank often means the number of axes. A tensor with shape \((32,224,224,3)\) has rank 4 in that sense.</p>
        <p>In linear algebra, <strong>matrix rank</strong> means the number of independent row or column directions. A \(3\times3\) matrix can have matrix rank 1, 2, or 3. This is a different concept.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> When a deep-learning library says “rank-3 tensor,” it usually means three axes. When a linear-algebra paper says “low-rank matrix,” it means that the matrix has fewer independent directions than its dimensions allow.
        </div>
      `
    },
    {
      id: "elementwise-ops",
      title: "5. Addition, scalar multiplication, and Hadamard products",
      html: raw`
        <p>Matrix addition is element-wise. Two matrices can be added directly only when their shapes match.</p>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\qquad B=\begin{bmatrix}5&6\\7&8\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[A+B=\begin{bmatrix}6&8\\10&12\end{bmatrix}.\]</p>
        <p>Scalar multiplication multiplies every entry. Thus</p>
        <p>\[2A=\begin{bmatrix}2&4\\6&8\end{bmatrix}.\]</p>
        <p>The <strong>Hadamard product</strong> is element-wise multiplication. It is often written as \(A\odot B\):</p>
        <p>\[A\odot B=\begin{bmatrix}5&12\\21&32\end{bmatrix}.\]</p>
        <p>Do not confuse \(A\odot B\) with the matrix product \(AB\). They use different rules and usually have different meanings.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Gating operations often use a Hadamard product. An LSTM can multiply a gate vector element-wise by a candidate state. Attention masks can also act element-wise before or after a softmax, depending on the formulation.
        </div>
      `
    },
    {
      id: "matvec",
      title: "6. Matrix-vector multiplication as weighted sums",
      html: raw`
        <p>Suppose \(A\in\mathbb{R}^{m\times n}\) and \(x\in\mathbb{R}^{n}\). Then \(Ax\in\mathbb{R}^{m}\).</p>
        <p>The inner dimension \(n\) must match. The output keeps the outer dimension \(m\).</p>
        <p>Take</p>
        <p>\[A=\begin{bmatrix}1&2\\3&4\\5&6\end{bmatrix},\qquad x=\begin{bmatrix}10\\20\end{bmatrix}.\]</p>
        <p>The shapes are \((3\times2)(2\times1)\to(3\times1)\). The result is</p>
        <p>\[Ax=\begin{bmatrix}1(10)+2(20)\\3(10)+4(20)\\5(10)+6(20)\end{bmatrix}=\begin{bmatrix}50\\110\\170\end{bmatrix}.\]</p>
        <p>Each output entry is a weighted sum of the input entries. This interpretation is important. A linear layer is not mysterious: each output unit forms a weighted sum.</p>
        <div class="paper-connection">
          <strong>Neural-network connection.</strong> In \(z=Wx+b\), each row of \(W\) contains the weights for one output unit if \(x\) is a column vector.
        </div>
      `
    },
    {
      id: "matmat",
      title: "7. Matrix-matrix multiplication and the inner-dimension rule",
      html: raw`
        <p>For \(A\in\mathbb{R}^{m\times n}\) and \(B\in\mathbb{R}^{n\times p}\), the product \(AB\) has shape \(m\times p\).</p>
        <div class="shape-check">
          <strong>Shape mnemonic.</strong> \((m\times n)(n\times p)\to(m\times p)\). The two inner dimensions must match. The two outer dimensions become the output shape.
        </div>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix},\qquad B=\begin{bmatrix}1&2\\0&1\\1&0\end{bmatrix}.\]</p>
        <p>The shapes are \((2\times3)(3\times2)\to(2\times2)\). The first output entry is the dot product of row 1 of \(A\) with column 1 of \(B\):</p>
        <p>\[1(1)+2(0)+3(1)=4.\]</p>
        <p>Carrying out all four dot products gives</p>
        <p>\[AB=\begin{bmatrix}4&4\\10&13\end{bmatrix}.\]</p>
        <p>Matrix multiplication is generally not commutative. Even when both \(AB\) and \(BA\) exist, they usually differ.</p>
        <div class="paper-connection">
          <strong>Transformer connection.</strong> If \(X\in\mathbb{R}^{T\times d}\) and \(W_Q\in\mathbb{R}^{d\times d_k}\), then \(Q=XW_Q\in\mathbb{R}^{T\times d_k}\). The multiplication changes the feature width but keeps the token dimension \(T\).
        </div>
      `
    },
    {
      id: "dot-outer",
      title: "8. Dot products and outer products",
      html: raw`
        <h3>Dot product</h3>
        <p>For two vectors \(x,y\in\mathbb{R}^{d}\), the dot product is</p>
        <p>\[x^\top y=\sum_{i=1}^{d}x_i y_i.\]</p>
        <p>If \(x=(1,2,3)^\top\) and \(y=(4,-1,2)^\top\), then</p>
        <p>\[x^\top y=1(4)+2(-1)+3(2)=8.\]</p>
        <p>The result is one scalar. Geometrically, the dot product measures alignment as well as scale.</p>

        <h3>Outer product</h3>
        <p>The outer product keeps both vector dimensions. If \(x\in\mathbb{R}^{m}\) and \(y\in\mathbb{R}^{n}\), then</p>
        <p>\[xy^\top\in\mathbb{R}^{m\times n}.\]</p>
        <p>For \(x=(1,2)^\top\) and \(y=(3,4,5)^\top\),</p>
        <p>\[xy^\top=\begin{bmatrix}3&4&5\\6&8&10\end{bmatrix}.\]</p>
        <div class="paper-connection">
          <strong>Backpropagation connection.</strong> For a row-vector affine layer \(z=xW+b\), the weight gradient for one example often has the outer-product form \(x^\top\delta\). If \(x\) has width \(d\) and \(\delta\) has width \(h\), then \(x^\top\delta\) has shape \(d\times h\), which matches \(W\).
        </div>
      `
    },
    {
      id: "transpose-special",
      title: "9. Transpose, identity matrices, diagonal matrices, and inverse intuition",
      html: raw`
        <h3>Transpose</h3>
        <p>The transpose swaps rows and columns. If \(A\in\mathbb{R}^{m\times n}\), then \(A^\top\in\mathbb{R}^{n\times m}\).</p>
        <p>For</p>
        <p>\[A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix},\qquad A^\top=\begin{bmatrix}1&4\\2&5\\3&6\end{bmatrix}.\]</p>
        <p>A useful product rule is \((AB)^\top=B^\top A^\top\). The order reverses.</p>

        <h3>Identity matrix</h3>
        <p>The identity matrix \(I\) acts like the number 1 for matrix multiplication: \(Ix=x\) and \(AI=A\) when the shapes are compatible.</p>
        <p>For three dimensions,</p>
        <p>\[I_3=\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}.\]</p>

        <h3>Diagonal matrix</h3>
        <p>A diagonal matrix has nonzero entries only on the main diagonal. For a vector \(v=(v_1,v_2,v_3)\),</p>
        <p>\[\operatorname{diag}(v)=\begin{bmatrix}v_1&0&0\\0&v_2&0\\0&0&v_3\end{bmatrix}.\]</p>
        <p>Multiplying by a diagonal matrix scales coordinates independently.</p>

        <h3>Inverse intuition</h3>
        <p>If a square matrix \(A\) has an inverse, then \(A^{-1}A=I\). The inverse undoes the linear transformation.</p>
        <p>Do not treat matrix inverse like ordinary division. Not every matrix is invertible, and practical ML code often avoids an explicit inverse. Solving a linear system is usually more stable.</p>
      `
    },
    {
      id: "trace-det-rank",
      title: "10. Trace, determinant, matrix rank, and null space",
      html: raw`
        <h3>Trace</h3>
        <p>The trace of a square matrix is the sum of diagonal entries:</p>
        <p>\[\operatorname{tr}(A)=\sum_i A_{ii}.\]</p>
        <p>If \(A=\begin{bmatrix}2&7\\1&5\end{bmatrix}\), then \(\operatorname{tr}(A)=2+5=7\).</p>
        <p>Trace appears in matrix calculus, covariance expressions, and regularizers.</p>

        <h3>Determinant intuition</h3>
        <p>The determinant is one scalar associated with a square matrix. Geometrically, its absolute value tells you how volumes scale under the transformation. A determinant of zero means the transformation collapses at least one dimension, so the matrix is not invertible.</p>
        <p>For a \(2\times2\) matrix,</p>
        <p>\[\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc.\]</p>
        <p>For \(A=\begin{bmatrix}2&0\\0&3\end{bmatrix}\), the determinant is \(6\). Areas scale by a factor of 6.</p>

        <h3>Matrix rank</h3>
        <p>Matrix rank counts independent row or column directions. The matrix</p>
        <p>\[A=\begin{bmatrix}1&2\\2&4\end{bmatrix}\]</p>
        <p>has rank 1 because the second row is twice the first. The two rows do not supply two independent directions.</p>

        <h3>Null space</h3>
        <p>The null space contains vectors \(x\) for which \(Ax=0\). If two different inputs differ only by a null-space vector, the linear map sends them to the same output.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Low-rank approximations compress large matrices. Null spaces and rank also explain when features or parameters are redundant.
        </div>
      `
    },
    {
      id: "blocks-concat-reshape",
      title: "11. Block matrices, concatenation, and reshaping",
      html: raw`
        <h3>Block matrices</h3>
        <p>A block matrix groups smaller matrices into a larger matrix. For example,</p>
        <p>\[M=\begin{bmatrix}A&B\\C&D\end{bmatrix}.\]</p>
        <p>The blocks must have compatible heights and widths so that rows and columns line up. Block notation lets a paper describe a large structured transformation without writing every entry.</p>

        <h3>Concatenation</h3>
        <p>Concatenation joins arrays along one axis. If \(x,y\in\mathbb{R}^{d}\), then concatenating them can produce a vector in \(\mathbb{R}^{2d}\).</p>
        <p>If \(x=(1,2)\) and \(y=(3,4)\), then a simple feature concatenation is \([x;y]=(1,2,3,4)\), depending on the paper's row or column convention.</p>
        <p>For matrices, concatenation along rows increases the row count. Concatenation along columns increases the column count.</p>

        <h3>Reshaping</h3>
        <p>Reshaping changes the arrangement of entries without changing the total number of entries. A \(2\times6\) matrix has 12 entries, so it can be reshaped to \(3\times4\) or \(12\times1\), but not to \(5\times3\).</p>
        <div class="shape-check">
          <strong>Reshape invariant.</strong> The product of the dimensions must stay constant unless an operation adds or removes data.
        </div>
        <div class="paper-connection">
          <strong>Transformer connection.</strong> Multi-head attention often reshapes a tensor from \((B,T,h d_k)\) to \((B,T,h,d_k)\) so that the head axis becomes explicit. The number of stored values does not change.
        </div>
      `
    },
    {
      id: "broadcast-reduce",
      title: "12. Broadcasting and reductions",
      html: raw`
        <h3>Broadcasting</h3>
        <p>Broadcasting lets a smaller array act as if it were repeated across a larger shape. Libraries such as NumPy and PyTorch use broadcasting heavily.</p>
        <p>Suppose \(X\in\mathbb{R}^{N\times d}\) and \(b\in\mathbb{R}^{d}\). The expression</p>
        <p>\[Z=X+b\]</p>
        <p>usually means: add the same bias vector \(b\) to every row of \(X\). The output still has shape \(N\times d\).</p>
        <p>For</p>
        <p>\[X=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix},\qquad b=(10,20,30),\]</p>
        <p>broadcasting gives</p>
        <p>\[X+b=\begin{bmatrix}11&22&33\\14&25&36\end{bmatrix}.\]</p>
        <p>Broadcasting is convenient, but it can hide shape assumptions. Write the expanded meaning when a paper or implementation is unclear.</p>

        <h3>Reductions</h3>
        <p>A reduction combines values along one or more axes. Common reductions are sum, mean, maximum, and norm.</p>
        <p>If \(X\in\mathbb{R}^{N\times d}\), summing over the example axis can produce a vector in \(\mathbb{R}^{d}\). Summing over both axes produces one scalar.</p>
        <div class="paper-connection">
          <strong>Gradient connection.</strong> Broadcasting in the forward pass often becomes a reduction in the backward pass. If the same bias is added to every example, its gradient usually sums contributions across the batch.
        </div>
      `
    },
    {
      id: "batch-dimensions",
      title: "13. Batch dimensions and batched operations",
      html: raw`
        <p>A batch dimension groups several independent examples so that the same operation runs on all of them.</p>
        <p>For one example, a feature vector can have shape \((d)\). For a batch of \(B\) examples, the data can have shape \((B,d)\).</p>
        <p>If \(X\in\mathbb{R}^{B\times d}\) and \(W\in\mathbb{R}^{d\times h}\), then</p>
        <p>\[XW\in\mathbb{R}^{B\times h}.\]</p>
        <p>The matrix multiplication acts on the feature dimension. The batch dimension passes through unchanged.</p>
        <p>For sequence models, a tensor might have shape \((B,T,d)\): batch size, sequence length, feature width. A linear projection applied independently to each token can map</p>
        <p>\[(B,T,d)\longrightarrow(B,T,h).\]</p>
        <p>The exact implementation may use a batched matrix multiplication or flatten two axes temporarily. The conceptual map is the same.</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> Do not accidentally multiply across the batch axis. A batch usually represents independent examples, not features that should be mixed together.
        </div>
      `
    },
    {
      id: "nn-shape-checks",
      title: "14. Read neural-network equations by tracing shapes",
      html: raw`
        <p>Now use the previous rules on a small neural-network layer. Let</p>
        <p>\[X\in\mathbb{R}^{B\times d},\qquad W\in\mathbb{R}^{d\times h},\qquad b\in\mathbb{R}^{h}.\]</p>
        <p>The affine transformation is</p>
        <p>\[Z=XW+b.\]</p>
        <p>Trace the shapes:</p>
        <ol>
          <li>\(XW\): \((B\times d)(d\times h)\to(B\times h)\).</li>
          <li>\(b\): shape \((h)\) broadcasts across the \(B\) rows.</li>
          <li>\(Z\): shape \((B\times h)\).</li>
        </ol>
        <p>If an element-wise activation is applied, \(A=\phi(Z)\), the shape stays \((B\times h)\).</p>
        <p>Suppose the next layer has \(V\in\mathbb{R}^{h\times k}\). Then</p>
        <p>\[Y=AV\in\mathbb{R}^{B\times k}.\]</p>
        <div class="paper-connection">
          <strong>Paper-reading method.</strong> You can often reconstruct undocumented dimensions from neighboring products. If \(XW\) is valid and the paper tells you \(X\) and the output width, you can infer the missing dimension of \(W\).
        </div>
        <p>This is one of the highest-value habits in ML mathematics. Shape checks do not replace algebra, but they quickly expose impossible equations.</p>
      `
    },
    {
      id: "attention-shapes",
      title: "15. A first shape walk through attention",
      html: raw`
        <p>Attention is a good example because the notation looks complex, but the shape rules are ordinary matrix multiplication.</p>
        <p>Let one sequence have \(T\) tokens. Suppose</p>
        <p>\[Q,K\in\mathbb{R}^{T\times d_k},\qquad V\in\mathbb{R}^{T\times d_v}.\]</p>
        <p>The score matrix is</p>
        <p>\[S=QK^\top.\]</p>
        <p>Since \(K^\top\in\mathbb{R}^{d_k\times T}\),</p>
        <p>\[(T\times d_k)(d_k\times T)\to(T\times T).\]</p>
        <p>Therefore, each token gets one score for every token.</p>
        <p>After row-wise softmax, the attention-weight matrix \(P\) still has shape \(T\times T\). The weighted values are</p>
        <p>\[PV.\]</p>
        <p>The shapes are</p>
        <p>\[(T\times T)(T\times d_v)\to(T\times d_v).\]</p>
        <p>The output has one \(d_v\)-dimensional vector for each token. No special shape rule was required. It was just transpose, matrix multiplication, and a shape-preserving softmax.</p>
      `
    },
    {
      id: "common-mistakes",
      title: "16. Common mistakes and misleading notation",
      html: raw`
        <ul>
          <li><strong>Mixing row- and column-vector conventions.</strong> Choose one convention for a derivation and keep it consistent.</li>
          <li><strong>Multiplying matrices because the outer dimensions match.</strong> Matrix multiplication requires the inner dimensions to match.</li>
          <li><strong>Confusing matrix multiplication with element-wise multiplication.</strong> \(AB\) and \(A\odot B\) are different operations.</li>
          <li><strong>Forgetting that transpose reverses product order.</strong> \((AB)^\top=B^\top A^\top\).</li>
          <li><strong>Assuming every square matrix has an inverse.</strong> Singular matrices do not.</li>
          <li><strong>Confusing tensor rank with matrix rank.</strong> One can mean number of axes; the other measures independent directions.</li>
          <li><strong>Ignoring broadcasting.</strong> An expression such as \(X+b\) can be valid even though the literal shapes differ.</li>
          <li><strong>Reshaping to an incompatible size.</strong> A pure reshape must preserve the number of entries.</li>
          <li><strong>Dropping the batch dimension during shape reasoning.</strong> Keep batch, sequence, and feature axes explicit until the operation is clear.</li>
          <li><strong>Reading dimensions as universal conventions.</strong> Papers can store examples in rows or columns. Let the equations reveal the convention.</li>
        </ul>
      `
    },
    {
      id: "recap",
      title: "17. Recap: the shape checklist",
      html: raw`
        <p>Before you leave Day 2, use this checklist on every array equation:</p>
        <ol>
          <li>Write the shape of every object.</li>
          <li>Mark which axes represent batch, token, feature, row, or column.</li>
          <li>For matrix multiplication, verify the inner dimensions.</li>
          <li>For element-wise operations, verify equal shapes or valid broadcasting.</li>
          <li>For reshape, preserve the number of entries.</li>
          <li>For reductions, identify which axis disappears.</li>
          <li>For transpose, swap the relevant axes.</li>
          <li>Check that parameter gradients will have the same shape as their parameters when you later study backpropagation.</li>
        </ol>
        <p>If you can trace \(X:(B\times d)\), \(W:(d\times h)\), \(Z=XW:(B\times h)\), and \(QK^\top:(T\times T)\) without guessing, you have the core skill required for much of the linear algebra in ML papers.</p>
      `
    }
  ],
  examples: [
    ["Matrix-vector shape and values", raw`Let \(A=\begin{bmatrix}2&1\\-1&3\end{bmatrix}\) and \(x=(4,5)^\top\). The shapes are \((2\times2)(2\times1)\to(2\times1)\). The result is \(Ax=(13,11)^\top\).`],
    ["A product that is not valid", raw`If \(A\in\mathbb{R}^{3\times4}\) and \(B\in\mathbb{R}^{5\times2}\), then \(AB\) is not defined because the inner dimensions 4 and 5 do not match.`],
    ["Matrix-matrix output shape", raw`If \(A\in\mathbb{R}^{7\times3}\) and \(B\in\mathbb{R}^{3\times5}\), then \(AB\in\mathbb{R}^{7\times5}\).`],
    ["Dot product versus outer product", raw`If \(x\in\mathbb{R}^{3}\) and \(y\in\mathbb{R}^{3}\), then \(x^\top y\) is one scalar, while \(xy^\top\) is a \(3\times3\) matrix.`],
    ["Broadcast a bias", raw`If \(X\in\mathbb{R}^{32\times128}\) and \(b\in\mathbb{R}^{128}\), then \(X+b\in\mathbb{R}^{32\times128}\) when \(b\) is broadcast across the 32 examples.`],
    ["Reduce a batch", raw`If \(G\in\mathbb{R}^{32\times128}\) contains one gradient row per example, then \(\sum_{i=1}^{32}G_{i,:}\in\mathbb{R}^{128}\). The batch axis is removed by the sum.`],
    ["Reshape without changing entry count", raw`A tensor with shape \((2,3,4)\) contains \(2\cdot3\cdot4=24\) entries. It can be reshaped to \((6,4)\) or \((3,8)\), but not to \((5,5)\).`],
    ["Attention score shape", raw`If \(Q,K\in\mathbb{R}^{10\times64}\), then \(QK^\top\) has shape \((10\times64)(64\times10)=10\times10\).`],
    ["Affine layer with batch", raw`For \(X\in\mathbb{R}^{64\times784}\) and \(W\in\mathbb{R}^{784\times256}\), the product \(XW\) has shape \(64\times256\). The batch size 64 is preserved.`],
    ["Outer-product gradient", raw`If one input row has shape \(1\times d\) and the local error row has shape \(1\times h\), then \(x^\top\delta\) has shape \((d\times1)(1\times h)=d\times h\), matching a weight matrix \(W\in\mathbb{R}^{d\times h}\).`],
    ["Rank-one matrix", raw`For \(u=(1,2,3)^\top\) and \(v=(4,5)^\top\), the outer product \(uv^\top\) is a \(3\times2\) matrix with matrix rank at most 1 because every column is a scalar multiple of \(u\).`],
    ["Transpose changes product order", raw`If \(A\in\mathbb{R}^{2\times3}\) and \(B\in\mathbb{R}^{3\times4}\), then \((AB)^\top\) has shape \(4\times2\). Also \(B^\top A^\top\) has shape \((4\times3)(3\times2)=4\times2\).`]
  ],
  practice: [
    raw`If \(A\in\mathbb{R}^{5\times7}\) and \(x\in\mathbb{R}^{7}\), what is the shape of \(Ax\)? <details><summary>Show answer</summary><p>\(Ax\in\mathbb{R}^{5}\). The inner dimension 7 matches, and the outer dimension 5 remains.</p></details>`,
    raw`Can a \(3\times4\) matrix multiply a \(5\times3\) matrix in that order? <details><summary>Show answer</summary><p>No. The inner dimensions are 4 and 5, so the product is not defined.</p></details>`,
    raw`Let \(x=(1,2)^\top\) and \(y=(3,4,5)^\top\). Find the shape of \(xy^\top\). <details><summary>Show answer</summary><p>\(x\) has shape \(2\times1\), and \(y^\top\) has shape \(1\times3\). The outer product has shape \(2\times3\).</p></details>`,
    raw`If \(X\in\mathbb{R}^{16\times128}\) and \(b\in\mathbb{R}^{128}\), what does \(X+b\) usually mean in an ML library? <details><summary>Show answer</summary><p>The same 128-entry bias vector is added to each of the 16 rows by broadcasting. The result has shape \(16\times128\).</p></details>`,
    raw`A tensor has shape \((4,5,6)\). How many entries does it contain? Can it be reshaped to \((10,12)\)? <details><summary>Show answer</summary><p>It has \(4\cdot5\cdot6=120\) entries. Yes, \(10\cdot12=120\), so a pure reshape is possible.</p></details>`,
    raw`If \(Q\in\mathbb{R}^{T\times d_k}\) and \(K\in\mathbb{R}^{T\times d_k}\), derive the shape of \(QK^\top\). <details><summary>Show answer</summary><p>\(K^\top\in\mathbb{R}^{d_k\times T}\), so \((T\times d_k)(d_k\times T)\to T\times T\).</p></details>`,
    raw`What is the difference between a tensor's number of axes and matrix rank? <details><summary>Show answer</summary><p>The number of axes describes array dimensionality in tensor software. Matrix rank measures the number of independent row or column directions of a matrix.</p></details>`,
    raw`If \(A\in\mathbb{R}^{3\times3}\) has determinant zero, what important property fails? <details><summary>Show answer</summary><p>\(A\) is not invertible. Geometrically, it collapses at least one direction.</p></details>`,
    raw`Suppose \(X\in\mathbb{R}^{B\times d}\), \(W\in\mathbb{R}^{d\times h}\), and \(b\in\mathbb{R}^{h}\). Give the shape of \(Z=XW+b\). <details><summary>Show answer</summary><p>\(XW\) has shape \(B\times h\). The bias broadcasts across the batch. Therefore \(Z\in\mathbb{R}^{B\times h}\).</p></details>`,
    raw`Why does a bias gradient usually involve a sum across the batch? <details><summary>Show answer</summary><p>The same bias participates in every example through broadcasting. During backpropagation, all of those gradient contributions must be accumulated, so the batch axis is reduced by summation.</p></details>`,
    raw`If \(A\in\mathbb{R}^{2\times3}\) and \(B\in\mathbb{R}^{3\times4}\), what is the shape of \((AB)^\top\)? <details><summary>Show answer</summary><p>\(AB\) has shape \(2\times4\), so \((AB)^\top\) has shape \(4\times2\). Equivalently, \((AB)^\top=B^\top A^\top\).</p></details>`,
    raw`A paper writes \(H=XW\), with \(X\in\mathbb{R}^{100\times768}\) and \(H\in\mathbb{R}^{100\times3072}\). Infer the shape of \(W\). <details><summary>Show answer</summary><p>\(W\) must have shape \(768\times3072\) so that \((100\times768)(768\times3072)\to100\times3072\).</p></details>`
  ]
});
