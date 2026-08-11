const day4 = COURSE[0].lessons[3];

Object.assign(day4, {
  published: true,
  summary: "Learn the directions that a matrix stretches, shrinks, or preserves. Use eigenvalues, singular values, PCA, condition numbers, and spectral reasoning to read modern ML papers with confidence.",
  explanation: "A matrix does more than move numbers around. It transforms directions in space. Some directions keep their direction and only change scale. Other directions are rotated before they are stretched. Eigenvalues and singular values expose these effects. This view explains PCA, low-rank models, numerical instability, repeated transformations, and vanishing or exploding gradients.",
  topics: [
    "Eigenvectors and eigenvalues",
    "Characteristic direction and scaling",
    "Diagonalization",
    "Symmetric matrices",
    "Positive-semidefinite matrices",
    "Covariance matrices",
    "Quadratic forms",
    "Singular value decomposition",
    "Singular values",
    "Spectral norm",
    "Frobenius norm",
    "Low-rank approximation",
    "PCA",
    "Condition number",
    "Ill-conditioning",
    "Spectral radius",
    "Repeated matrix multiplication",
    "Gradient propagation and singular values",
    "Variance preservation versus directional stretch"
  ],
  sections: [
    {
      id: "spectral-view",
      title: "1. Start with the geometric question: what does this matrix do to directions?",
      html: raw`
        <p>In Day 3, a vector represented a direction and a length. Now ask what a matrix does to those directions.</p>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}2&0\\0&\tfrac12\end{bmatrix}.\]</p>
        <p>Apply \(A\) to the horizontal unit vector \(e_1=(1,0)^\top\):</p>
        <p>\[Ae_1=\begin{bmatrix}2\\0\end{bmatrix}=2e_1.\]</p>
        <p>The direction did not change. The length doubled.</p>
        <p>Now apply \(A\) to the vertical unit vector \(e_2=(0,1)^\top\):</p>
        <p>\[Ae_2=\begin{bmatrix}0\\1/2\end{bmatrix}=\tfrac12 e_2.\]</p>
        <p>The direction again stayed the same, but the length was cut in half.</p>
        <p>These are special directions. They tell us how the transformation behaves without tracking every possible input separately.</p>
        <div class="paper-connection">
          <strong>Why this matters in ML.</strong> A weight matrix can amplify some feature directions and suppress others. A covariance matrix can show high-variance and low-variance directions. A Jacobian can amplify or shrink gradients. Spectral linear algebra gives a compact language for all of these effects.
        </div>
        <div class="shape-check">
          <strong>Reading rule.</strong> When a paper discusses the spectrum of a matrix, ask: Which directions are special? How much does the matrix scale them? Is the matrix square, symmetric, or rectangular?
        </div>
      `
    },
    {
      id: "eigenvectors",
      title: "2. Eigenvectors keep their direction",
      html: raw`
        <p>An <strong>eigenvector</strong> of a square matrix \(A\) is a nonzero vector \(v\) that satisfies</p>
        <p>\[Av=\lambda v.\]</p>
        <p>The scalar \(\lambda\) is the corresponding <strong>eigenvalue</strong>.</p>
        <p>The equation says something simple: apply the matrix to \(v\), and the result points along the same line as \(v\). Only the scale can change.</p>
        <h3>Example 1: diagonal matrix</h3>
        <p>For</p>
        <p>\[A=\begin{bmatrix}3&0\\0&-2\end{bmatrix},\]</p>
        <p>we have</p>
        <p>\[Ae_1=3e_1,\qquad Ae_2=-2e_2.\]</p>
        <p>So \(e_1\) is an eigenvector with eigenvalue \(3\), and \(e_2\) is an eigenvector with eigenvalue \(-2\).</p>
        <p>A negative eigenvalue reverses direction. The vector stays on the same line, but its orientation flips.</p>
        <h3>Example 2: a non-axis eigenvector</h3>
        <p>Let</p>
        <p>\[B=\begin{bmatrix}2&1\\1&2\end{bmatrix}.\]</p>
        <p>For \(v=(1,1)^\top\),</p>
        <p>\[Bv=\begin{bmatrix}3\\3\end{bmatrix}=3v.\]</p>
        <p>Thus \((1,1)^\top\) is an eigenvector with eigenvalue \(3\).</p>
        <p>For \(u=(1,-1)^\top\),</p>
        <p>\[Bu=\begin{bmatrix}1\\-1\end{bmatrix}=u.\]</p>
        <p>So \(u\) is another eigenvector, with eigenvalue \(1\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Eigenvectors appear in PCA, covariance analysis, graph methods, Markov chains, Hessian analysis, and stability studies. They identify directions that behave in a simple way under a square linear operator.
        </div>
      `
    },
    {
      id: "characteristic-equation",
      title: "3. Find eigenvalues with the characteristic equation",
      html: raw`
        <p>Start from the eigenvector equation</p>
        <p>\[Av=\lambda v.\]</p>
        <p>Move all terms to one side:</p>
        <p>\[(A-\lambda I)v=0.\]</p>
        <p>We want a nonzero solution \(v\). This is possible only when \(A-\lambda I\) is singular. Therefore,</p>
        <p>\[\det(A-\lambda I)=0.\]</p>
        <p>This is the <strong>characteristic equation</strong>.</p>
        <h3>Example</h3>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}2&1\\1&2\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[A-\lambda I=\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}.\]</p>
        <p>The determinant is</p>
        <p>\[(2-\lambda)^2-1=0.\]</p>
        <p>Factor it:</p>
        <p>\[(1-\lambda)(3-\lambda)=0.\]</p>
        <p>The eigenvalues are \(\lambda=1\) and \(\lambda=3\).</p>
        <p>For large ML matrices, papers usually do not solve this polynomial by hand. Numerical algorithms compute the required eigenpairs. You still need the equation because it explains what an eigenvalue means.</p>
        <div class="shape-check">
          <strong>Important limit.</strong> The basic eigenvalue equation applies to square matrices. A rectangular matrix does not have ordinary eigenvalues in the same way. Singular values solve the rectangular case.
        </div>
      `
    },
    {
      id: "diagonalization",
      title: "4. Diagonalization turns a difficult transformation into independent scalings",
      html: raw`
        <p>If a square matrix has enough independent eigenvectors, collect those eigenvectors as the columns of a matrix \(P\). Put the corresponding eigenvalues on the diagonal of \(D\). Then</p>
        <p>\[A=PDP^{-1}.\]</p>
        <p>This is <strong>diagonalization</strong>.</p>
        <p>The equation can be read as three operations:</p>
        <ol>
          <li>\(P^{-1}\) changes coordinates into the eigenvector basis.</li>
          <li>\(D\) scales each eigenvector coordinate independently.</li>
          <li>\(P\) changes back to the original coordinates.</li>
        </ol>
        <h3>Why powers become easy</h3>
        <p>Because \(P^{-1}P=I\),</p>
        <p>\[A^2=PDP^{-1}PDP^{-1}=PD^2P^{-1}.\]</p>
        <p>More generally,</p>
        <p>\[A^k=PD^kP^{-1}.\]</p>
        <p>If \(D=\operatorname{diag}(3,1)\), then</p>
        <p>\[D^{10}=\operatorname{diag}(3^{10},1).\]</p>
        <p>The direction associated with eigenvalue \(3\) dominates repeated multiplication.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Repeated matrix multiplication appears in recurrent systems, graph propagation, dynamical systems, and iterative algorithms. Diagonalization explains why some modes grow while others disappear.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> Not every matrix is diagonalizable. Repeated eigenvalues can still have too few independent eigenvectors. Do not assume \(A=PDP^{-1}\) without a reason.
        </div>
      `
    },
    {
      id: "symmetric-matrices",
      title: "5. Symmetric matrices have especially clean spectral structure",
      html: raw`
        <p>A real matrix is <strong>symmetric</strong> when</p>
        <p>\[A=A^\top.\]</p>
        <p>Real symmetric matrices have two powerful properties:</p>
        <ul>
          <li>All eigenvalues are real.</li>
          <li>There is an orthonormal basis of eigenvectors.</li>
        </ul>
        <p>Therefore, a real symmetric matrix can be written as</p>
        <p>\[A=Q\Lambda Q^\top,\]</p>
        <p>where \(Q^\top Q=I\) and \(\Lambda\) is diagonal.</p>
        <p>This is better conditioned than a general eigenvector matrix because \(Q^{-1}=Q^\top\).</p>
        <h3>Example</h3>
        <p>For</p>
        <p>\[A=\begin{bmatrix}2&1\\1&2\end{bmatrix},\]</p>
        <p>the normalized eigenvectors are</p>
        <p>\[q_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\qquad q_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.\]</p>
        <p>They are orthogonal:</p>
        <p>\[q_1^\top q_2=0.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Covariance matrices, Gram matrices, \(X^\top X\), and many Hessian approximations are symmetric. This is why orthogonal eigenvectors appear so often in ML theory.
        </div>
      `
    },
    {
      id: "quadratic-forms-psd",
      title: "6. Quadratic forms and positive-semidefinite matrices measure directional energy",
      html: raw`
        <p>A <strong>quadratic form</strong> is an expression of the form</p>
        <p>\[x^\top A x.\]</p>
        <p>It takes a vector as input and returns one scalar.</p>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}2&0\\0&1\end{bmatrix},\qquad x=\begin{bmatrix}3\\4\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[x^\top A x=2(3^2)+1(4^2)=34.\]</p>
        <p>A symmetric matrix \(A\) is <strong>positive semidefinite</strong>, or PSD, when</p>
        <p>\[x^\top A x\ge 0\quad\text{for every }x.\]</p>
        <p>For a real symmetric matrix, this is equivalent to saying that every eigenvalue is nonnegative.</p>
        <h3>Example</h3>
        <p>For \(A=\operatorname{diag}(4,0.5)\),</p>
        <p>\[x^\top A x=4x_1^2+0.5x_2^2\ge0.\]</p>
        <p>So \(A\) is PSD.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Covariance matrices are PSD. Kernel Gram matrices must be PSD for many kernel methods. A PSD Hessian at a point means local curvature is nonnegative in every direction.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> PSD does not mean that every entry of the matrix is positive. It describes the quadratic form, not the sign of each matrix entry.
        </div>
      `
    },
    {
      id: "covariance",
      title: "7. Covariance matrices turn data variation into a spectral problem",
      html: raw`
        <p>Suppose the centered data matrix is \(X\in\mathbb{R}^{N\times d}\). A sample covariance matrix is</p>
        <p>\[C=\frac{1}{N-1}X^\top X.\]</p>
        <p>Its shape is \(d\times d\).</p>
        <p>The diagonal entry \(C_{jj}\) measures variance of feature \(j\). The off-diagonal entry \(C_{jk}\) measures how features \(j\) and \(k\) vary together.</p>
        <h3>Small example</h3>
        <p>Consider centered points</p>
        <p>\[(1,1),\quad(-1,-1).\]</p>
        <p>Then</p>
        <p>\[X=\begin{bmatrix}1&1\\-1&-1\end{bmatrix}.\]</p>
        <p>Ignoring the scaling factor for the moment,</p>
        <p>\[X^\top X=\begin{bmatrix}2&2\\2&2\end{bmatrix}.\]</p>
        <p>The direction \((1,1)^\top\) has large variation. The perpendicular direction \((1,-1)^\top\) has zero variation.</p>
        <p>This is exactly what the eigenvectors and eigenvalues of the covariance matrix reveal.</p>
        <div class="paper-connection">
          <strong>PCA connection.</strong> PCA chooses eigenvectors of the covariance matrix with the largest eigenvalues. Those are the directions with the largest data variance.
        </div>
      `
    },
    {
      id: "svd",
      title: "8. SVD works for every matrix and exposes its principal stretch directions",
      html: raw`
        <p>The <strong>singular value decomposition</strong> of a matrix \(A\in\mathbb{R}^{m\times n}\) is</p>
        <p>\[A=U\Sigma V^\top.\]</p>
        <p>The important shapes are</p>
        <p>\[U:m\times m,\qquad \Sigma:m\times n,\qquad V:n\times n\]</p>
        <p>for the full SVD. Reduced SVD forms keep only the necessary columns.</p>
        <p>Read the transformation from right to left:</p>
        <ol>
          <li>\(V^\top\) expresses the input in special input directions.</li>
          <li>\(\Sigma\) scales those directions by the singular values.</li>
          <li>\(U\) expresses the result in special output directions.</li>
        </ol>
        <p>The singular values satisfy</p>
        <p>\[\sigma_1\ge\sigma_2\ge\cdots\ge0.\]</p>
        <h3>Simple diagonal example</h3>
        <p>For</p>
        <p>\[A=\begin{bmatrix}3&0\\0&1\end{bmatrix},\]</p>
        <p>one valid SVD has \(U=I\), \(V=I\), and</p>
        <p>\[\Sigma=\operatorname{diag}(3,1).\]</p>
        <p>The matrix stretches one direction by \(3\) and the other by \(1\).</p>
        <h3>Rectangular example</h3>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}2&0\\0&1\\0&0\end{bmatrix}\in\mathbb{R}^{3\times2}.\]</p>
        <p>There are two input directions. Their singular values are \(2\) and \(1\). The rectangular shape is no problem for SVD.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> SVD appears in PCA, low-rank compression, recommendation systems, matrix factorization, numerical solvers, and analyses of weight matrices and Jacobians.
        </div>
      `
    },
    {
      id: "singular-values",
      title: "9. Singular values are directional stretch factors",
      html: raw`
        <p>A singular value tells you how much \(A\) stretches one special input direction.</p>
        <p>The right singular vectors are eigenvectors of \(A^\top A\):</p>
        <p>\[A^\top A v_i=\sigma_i^2 v_i.\]</p>
        <p>The left singular vectors are eigenvectors of \(AA^\top\):</p>
        <p>\[AA^\top u_i=\sigma_i^2 u_i.\]</p>
        <p>This is why singular values are always nonnegative.</p>
        <h3>Example</h3>
        <p>Let</p>
        <p>\[A=\begin{bmatrix}3&0\\0&\tfrac12\end{bmatrix}.\]</p>
        <p>Then the singular values are \(3\) and \(0.5\).</p>
        <p>A unit vector along the first singular direction leaves with norm \(3\). A unit vector along the second leaves with norm \(0.5\).</p>
        <p>For a general unit vector \(x\), the output norm lies between the smallest and largest singular values when \(A\) is square and full rank:</p>
        <p>\[\sigma_{\min}\le \|Ax\|_2\le\sigma_{\max}.\]</p>
        <div class="shape-check">
          <strong>Eigenvalues versus singular values.</strong> Eigenvalues describe direction-preserving behavior of a square matrix. Singular values describe stretch and work for rectangular matrices too. They are not interchangeable.
        </div>
      `
    },
    {
      id: "matrix-norms",
      title: "10. Spectral norm and Frobenius norm measure matrix size in different ways",
      html: raw`
        <h3>Spectral norm</h3>
        <p>The matrix spectral norm induced by the Euclidean vector norm is</p>
        <p>\[\|A\|_2=\sigma_{\max}(A).\]</p>
        <p>It is the largest possible stretch of a unit vector:</p>
        <p>\[\|A\|_2=\max_{\|x\|_2=1}\|Ax\|_2.\]</p>
        <p>If \(A=\operatorname{diag}(4,1)\), then \(\|A\|_2=4\).</p>
        <h3>Frobenius norm</h3>
        <p>The Frobenius norm treats all matrix entries as one long vector:</p>
        <p>\[\|A\|_F=\sqrt{\sum_{i,j}A_{ij}^2}.\]</p>
        <p>For</p>
        <p>\[A=\begin{bmatrix}1&2\\2&1\end{bmatrix},\]</p>
        <p>we get</p>
        <p>\[\|A\|_F=\sqrt{1+4+4+1}=\sqrt{10}.\]</p>
        <p>The Frobenius norm also equals the square root of the sum of squared singular values:</p>
        <p>\[\|A\|_F^2=\sum_i\sigma_i^2.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Frobenius norms appear in matrix regularization and reconstruction error. Spectral norms appear in stability, Lipschitz bounds, robustness, and gradient-growth analysis.
        </div>
      `
    },
    {
      id: "low-rank",
      title: "11. Low-rank approximation keeps the strongest spectral directions",
      html: raw`
        <p>Suppose</p>
        <p>\[A=U\Sigma V^\top\]</p>
        <p>has singular values \(\sigma_1\ge\sigma_2\ge\cdots\). A rank-\(k\) approximation keeps only the first \(k\) singular values and vectors:</p>
        <p>\[A_k=U_k\Sigma_kV_k^\top.\]</p>
        <p>This removes weaker directions.</p>
        <h3>Numerical intuition</h3>
        <p>Suppose the singular values are</p>
        <p>\[10,\ 3,\ 0.2,\ 0.05.\]</p>
        <p>A rank-2 approximation keeps \(10\) and \(3\). It discards \(0.2\) and \(0.05\). Most spectral energy is still retained.</p>
        <p>The squared Frobenius error is</p>
        <p>\[\|A-A_2\|_F^2=0.2^2+0.05^2=0.0425.\]</p>
        <p>The truncated SVD is the best rank-\(k\) approximation under both the spectral norm and the Frobenius norm. This is the key idea behind the Eckart-Young theorem.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Low-rank approximations reduce memory and compute. They are used in recommendation systems, compressed neural-network layers, latent semantic analysis, and adapter-style parameterizations.
        </div>
      `
    },
    {
      id: "pca",
      title: "12. PCA finds directions of maximum variance",
      html: raw`
        <p>Principal component analysis starts with centered data. Centering means subtracting the feature mean from each example.</p>
        <p>Let \(X\in\mathbb{R}^{N\times d}\) be centered. The covariance matrix is proportional to</p>
        <p>\[C=X^\top X.\]</p>
        <p>The first principal direction solves</p>
        <p>\[v_1=\arg\max_{\|v\|_2=1}v^\top C v.\]</p>
        <p>The solution is the eigenvector of \(C\) with the largest eigenvalue.</p>
        <h3>Geometric example</h3>
        <p>If the data lies close to the line \(y=x\), the direction</p>
        <p>\[v_1=\frac{1}{\sqrt2}(1,1)^\top\]</p>
        <p>will have high variance. The perpendicular direction</p>
        <p>\[v_2=\frac{1}{\sqrt2}(1,-1)^\top\]</p>
        <p>will have much lower variance.</p>
        <p>You can also compute PCA directly from the SVD of centered \(X\):</p>
        <p>\[X=U\Sigma V^\top.\]</p>
        <p>The columns of \(V\) are the principal directions. The singular values determine explained variance.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> If a paper says that the top principal components explain 95% of the variance, it means that the leading spectral directions capture 95% of the total squared variation measured by the eigenvalues or squared singular values.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> PCA normally requires centering. Without centering, the first component can point toward the mean instead of the main variation around the mean.
        </div>
      `
    },
    {
      id: "conditioning",
      title: "13. Condition number tells you how sensitive a linear problem is",
      html: raw`
        <p>For a nonsingular matrix, the 2-norm condition number is</p>
        <p>\[\kappa_2(A)=\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}.\]</p>
        <p>A condition number close to \(1\) is favorable. A very large condition number means that different directions have very different scales.</p>
        <h3>Example 1: well conditioned</h3>
        <p>If</p>
        <p>\[A=\operatorname{diag}(2,1),\]</p>
        <p>then</p>
        <p>\[\kappa_2(A)=2/1=2.\]</p>
        <h3>Example 2: ill conditioned</h3>
        <p>If</p>
        <p>\[B=\operatorname{diag}(1000,0.001),\]</p>
        <p>then</p>
        <p>\[\kappa_2(B)=1000/0.001=10^6.\]</p>
        <p>One direction is amplified one million times more than another relative to the singular scale ratio.</p>
        <p>In a linear system \(Ax=b\), a small change in \(b\) can produce a much larger relative change in \(x\) when \(A\) is ill conditioned.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Ill-conditioning can make optimization slow. Gradient descent can zig-zag across directions with very different curvature. Whitening, normalization, preconditioning, and adaptive methods often try to reduce scale imbalance.
        </div>
      `
    },
    {
      id: "spectral-radius",
      title: "14. Spectral radius predicts long-run behavior of repeated square transformations",
      html: raw`
        <p>The <strong>spectral radius</strong> of a square matrix is</p>
        <p>\[\rho(A)=\max_i|\lambda_i|.\]</p>
        <p>It uses eigenvalue magnitudes, not singular values.</p>
        <p>Suppose</p>
        <p>\[A=\operatorname{diag}(0.8,0.2).\]</p>
        <p>Then</p>
        <p>\[A^k=\operatorname{diag}(0.8^k,0.2^k).\]</p>
        <p>Both components shrink toward zero. The \(0.8\) mode disappears more slowly.</p>
        <p>Now suppose</p>
        <p>\[B=\operatorname{diag}(1.1,0.5).\]</p>
        <p>Then the first component grows as \(1.1^k\). The spectral radius is \(1.1\), which is greater than \(1\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Spectral radius appears in recurrent dynamics, Markov processes, iterative algorithms, and stability conditions. It is especially natural when the same square matrix is applied repeatedly.
        </div>
        <div class="shape-check">
          <strong>Do not confuse the measures.</strong> Spectral radius uses eigenvalue magnitude. Spectral norm uses the largest singular value. For non-normal matrices, these values can differ substantially.
        </div>
      `
    },
    {
      id: "gradient-propagation",
      title: "15. Singular values explain vanishing and exploding gradients",
      html: raw`
        <p>Backpropagation through many layers multiplies a gradient by a sequence of Jacobian matrices.</p>
        <p>A simplified form is</p>
        <p>\[g_0=J_1^\top J_2^\top\cdots J_L^\top g_L.\]</p>
        <p>Each Jacobian can stretch some gradient directions and shrink others.</p>
        <h3>Scalar-style intuition</h3>
        <p>If every layer multiplies the relevant gradient direction by about \(0.5\), then after \(20\) layers the scale is roughly</p>
        <p>\[0.5^{20}\approx9.54\times10^{-7}.\]</p>
        <p>The gradient nearly vanishes.</p>
        <p>If every layer multiplies by about \(1.5\), then after \(20\) layers the scale is</p>
        <p>\[1.5^{20}\approx3325.\]</p>
        <p>The gradient can explode.</p>
        <h3>Matrix view</h3>
        <p>The largest singular value bounds the maximum stretch:</p>
        <p>\[\|Jg\|_2\le\sigma_{\max}(J)\|g\|_2.\]</p>
        <p>If many Jacobians have dominant singular values well below \(1\), gradients can shrink. If they have dominant singular values well above \(1\), gradients can grow.</p>
        <div class="paper-connection">
          <strong>Deep-learning connection.</strong> Initialization schemes, normalization, residual connections, orthogonal matrices, and gradient clipping all interact with this spectral picture. Later lessons will connect this idea to Xavier, He, BatchNorm, and residual networks.
        </div>
      `
    },
    {
      id: "variance-vs-stretch",
      title: "16. Variance preservation is not the same as preserving every direction",
      html: raw`
        <p>This distinction is important in initialization papers.</p>
        <p>A variance calculation can say that the <em>average squared size</em> of activations stays stable. It does not guarantee that every input direction is preserved equally.</p>
        <p>Consider</p>
        <p>\[A=\begin{bmatrix}\sqrt2&0\\0&0\end{bmatrix}.\]</p>
        <p>Its singular values are \(\sqrt2\) and \(0\).</p>
        <p>One direction is amplified. The perpendicular direction is completely destroyed.</p>
        <p>Now suppose an isotropic random input has covariance \(I\). The expected squared output norm is</p>
        <p>\[\mathbb{E}\|Ax\|_2^2=\operatorname{tr}(A^\top A)=2.\]</p>
        <p>If the input has two coordinates with total expected squared norm \(2\), the average total energy can appear preserved. Yet one direction is lost entirely.</p>
        <p>This is the difference between an average variance statement and a directional singular-value statement.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> Xavier-style variance preservation asks whether activation and gradient scales stay reasonable on average. Dynamical-isometry arguments ask for a stronger condition: singular values of layer Jacobians should stay close to \(1\), so many directions propagate without severe distortion.
        </div>
      `
    },
    {
      id: "common-mistakes",
      title: "17. Common mistakes in spectral linear algebra",
      html: raw`
        <ul>
          <li><strong>Using eigenvalues for a rectangular matrix.</strong> Use singular values when the matrix is not square.</li>
          <li><strong>Assuming an eigenvalue is a singular value.</strong> They can coincide in special cases, but they are different objects.</li>
          <li><strong>Assuming every matrix has an orthogonal eigenbasis.</strong> Real symmetric matrices do. General matrices may not.</li>
          <li><strong>Assuming every matrix is diagonalizable.</strong> Some matrices do not have enough independent eigenvectors.</li>
          <li><strong>Forgetting that eigenvectors can be scaled.</strong> If \(v\) is an eigenvector, then any nonzero multiple \(cv\) points in the same eigendirection.</li>
          <li><strong>Thinking PSD means all entries are nonnegative.</strong> PSD is defined by \(x^\top A x\ge0\).</li>
          <li><strong>Computing PCA before centering without checking the convention.</strong> Standard PCA analyzes variation around the mean.</li>
          <li><strong>Using spectral radius and spectral norm as synonyms.</strong> One uses eigenvalues. The other uses singular values.</li>
          <li><strong>Reading condition number as a probability.</strong> It is a sensitivity ratio, not a probability.</li>
          <li><strong>Equating preserved average variance with preserved geometry.</strong> Average scale can look healthy while some directions vanish.</li>
        </ul>
      `
    },
    {
      id: "paper-reading",
      title: "18. A spectral checklist for reading AI and ML papers",
      html: raw`
        <p>When a paper introduces a spectral quantity, use this checklist.</p>
        <ol>
          <li><strong>Identify the matrix.</strong> Is it a weight matrix, covariance matrix, Hessian, Jacobian, attention matrix, kernel matrix, or transition matrix?</li>
          <li><strong>Write its shape.</strong> Decide whether eigenvalues are even defined in the usual sense.</li>
          <li><strong>Check symmetry.</strong> Symmetry gives real eigenvalues and orthogonal eigenvectors.</li>
          <li><strong>Ask which quantity is used.</strong> Eigenvalue, singular value, spectral norm, condition number, or spectral radius each answers a different question.</li>
          <li><strong>Translate the quantity into geometry.</strong> Does it describe a stable direction, a stretch factor, a sensitivity ratio, or repeated growth?</li>
          <li><strong>Look for an average-versus-worst-case distinction.</strong> Variance can be an average statement. Spectral norm is a worst-direction statement.</li>
          <li><strong>Test a 2D diagonal example.</strong> Replace the matrix with \(\operatorname{diag}(a,b)\). This often reveals the claim immediately.</li>
        </ol>
        <div class="mini-example">
          <strong>Example paper sentence.</strong> “We constrain the spectral norm of each layer.” Translate it as: “We limit the maximum amount by which each layer can stretch any unit input direction.”
        </div>
        <div class="mini-example">
          <strong>Another paper sentence.</strong> “The top five principal components explain 90% of the variance.” Translate it as: “Five orthogonal directions account for 90% of the summed covariance eigenvalues.”
        </div>
      `
    },
    {
      id: "recap",
      title: "19. Recap",
      html: raw`
        <p>Eigenvectors identify directions that a square matrix keeps on the same line. Eigenvalues give the scale on those directions. Symmetric matrices are especially well behaved because they have real eigenvalues and orthogonal eigenvectors.</p>
        <p>SVD works for rectangular and square matrices. Singular values describe directional stretch. The largest singular value is the spectral norm. The Frobenius norm measures total squared matrix energy.</p>
        <p>Low-rank approximation keeps the strongest singular directions. PCA keeps the directions of largest data variance. Condition number measures directional scale imbalance. Spectral radius helps describe repeated square-matrix dynamics.</p>
        <p>For deep learning, the most important final distinction is this: preserving average variance is not the same as preserving every direction. Singular values tell you about directional geometry, and products of singular-value effects help explain vanishing and exploding gradients.</p>
      `
    }
  ],
  examples: [
    ["Find eigenpairs of a diagonal matrix", raw`For \(A=\operatorname{diag}(4,-1,2)\), the coordinate vectors \(e_1,e_2,e_3\) are eigenvectors. Their eigenvalues are \(4,-1,2\). The negative eigenvalue reverses the corresponding direction.`],
    ["Verify a non-axis eigenvector", raw`Let \(A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\) and \(v=(1,1)^\top\). Then \(Av=(3,3)^\top=3v\). Therefore, \(v\) is an eigenvector with eigenvalue \(3\).`],
    ["Use the characteristic equation", raw`For \(A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\), \(\det(A-\lambda I)=(2-\lambda)^2-1\). Setting this to zero gives \(\lambda=1\) and \(\lambda=3\).`],
    ["Repeated multiplication", raw`If \(A=\operatorname{diag}(0.9,0.2)\), then \(A^{10}=\operatorname{diag}(0.9^{10},0.2^{10})\approx\operatorname{diag}(0.349,1.024\times10^{-7})\). The first mode dominates after repeated application.`],
    ["Check PSD with a quadratic form", raw`For \(A=\operatorname{diag}(3,1)\), \(x^\top A x=3x_1^2+x_2^2\ge0\) for every \(x\). Therefore, \(A\) is positive semidefinite.`],
    ["Read covariance directions", raw`For centered points \((1,1)\) and \((-1,-1)\), the covariance is proportional to \(\begin{bmatrix}2&2\\2&2\end{bmatrix}\). The direction \((1,1)^\top\) has positive variance. The perpendicular direction \((1,-1)^\top\) has zero variance.`],
    ["Read an SVD by shapes", raw`If \(A\in\mathbb{R}^{6\times4}\), a reduced rank-4 SVD can use \(U\in\mathbb{R}^{6\times4}\), \(\Sigma\in\mathbb{R}^{4\times4}\), and \(V^\top\in\mathbb{R}^{4\times4}\). Their product has shape \(6\times4\), matching \(A\).`],
    ["Spectral norm from singular values", raw`If the singular values of \(A\) are \(5,2,0.5\), then \(\|A\|_2=5\). No unit input vector can leave with Euclidean norm larger than \(5\).`],
    ["Frobenius norm from singular values", raw`If the singular values are \(5,2,0.5\), then \(\|A\|_F=\sqrt{5^2+2^2+0.5^2}=\sqrt{29.25}\approx5.408\).`],
    ["Low-rank reconstruction error", raw`Suppose \(\sigma=(8,2,0.4,0.1)\). The best rank-2 approximation has Frobenius error \(\sqrt{0.4^2+0.1^2}=\sqrt{0.17}\approx0.412\).`],
    ["PCA explained variance", raw`Suppose covariance eigenvalues are \(9,3,1\). Total variance is \(13\). The first principal component explains \(9/13\approx69.2\%\). The first two explain \(12/13\approx92.3\%\).`],
    ["Condition number", raw`If \(\sigma_{\max}=20\) and \(\sigma_{\min}=0.01\), then \(\kappa_2=20/0.01=2000\). The matrix is much more sensitive than a matrix with condition number near \(1\).`],
    ["Spectral radius", raw`For eigenvalues \(0.8,-1.2,0.3\), the spectral radius is \(\rho(A)=1.2\). The sign does not matter because spectral radius uses magnitude.`],
    ["Vanishing gradient scale", raw`If a relevant gradient direction is multiplied by \(0.7\) through \(20\) similar layers, the scale is about \(0.7^{20}\approx0.000798\). The direction nearly vanishes.`],
    ["Exploding gradient scale", raw`If a relevant direction is multiplied by \(1.3\) through \(20\) layers, the scale is \(1.3^{20}\approx190\). A moderate per-layer expansion becomes large with depth.`],
    ["Average variance versus directional loss", raw`For \(A=\operatorname{diag}(\sqrt2,0)\), the squared singular values are \(2\) and \(0\). Their average is \(1\), but one direction is completely removed. Average scale can look preserved while geometry is not.`]
  ],
  practice: [
    raw`For \(A=\operatorname{diag}(6,-2,0.5)\), list the eigenvalues and one eigenvector for each. <details><summary>Show answer</summary><p>The eigenvalues are \(6,-2,0.5\). The coordinate vectors \(e_1,e_2,e_3\) are corresponding eigenvectors.</p></details>`,
    raw`Verify that \((1,1)^\top\) is an eigenvector of \(A=\begin{bmatrix}4&1\\1&4\end{bmatrix}\). Find its eigenvalue. <details><summary>Show answer</summary><p>\(A(1,1)^\top=(5,5)^\top=5(1,1)^\top\). The eigenvalue is \(5\).</p></details>`,
    raw`What equation must an eigenvalue satisfy in terms of a determinant? <details><summary>Show answer</summary><p>It must satisfy \(\det(A-\lambda I)=0\).</p></details>`,
    raw`If \(A=Q\Lambda Q^\top\) with orthogonal \(Q\), what kind of real matrix is guaranteed to admit such a decomposition? <details><summary>Show answer</summary><p>Every real symmetric matrix admits an orthogonal eigen-decomposition of this form.</p></details>`,
    raw`A symmetric matrix has eigenvalues \(4,1,0\). Is it PSD? <details><summary>Show answer</summary><p>Yes. A real symmetric matrix is PSD when all eigenvalues are nonnegative.</p></details>`,
    raw`If \(A\in\mathbb{R}^{8\times3}\), can ordinary eigenvalues describe \(A\) directly? What decomposition should you use instead? <details><summary>Show answer</summary><p>Ordinary eigenvalues require a square matrix. Use the singular value decomposition of \(A\).</p></details>`,
    raw`The singular values of a matrix are \(7,3,1\). What are its spectral norm and Frobenius norm? <details><summary>Show answer</summary><p>\(\|A\|_2=7\). Also \(\|A\|_F=\sqrt{7^2+3^2+1^2}=\sqrt{59}\).</p></details>`,
    raw`The covariance eigenvalues are \(12,4,2,2\). What percentage of total variance is explained by the first two principal components? <details><summary>Show answer</summary><p>Total variance is \(20\). The first two contribute \(16\). The explained fraction is \(16/20=80\%\).</p></details>`,
    raw`A matrix has \(\sigma_{\max}=100\) and \(\sigma_{\min}=0.1\). Find \(\kappa_2\). <details><summary>Show answer</summary><p>\(\kappa_2=100/0.1=1000\).</p></details>`,
    raw`A square matrix has eigenvalues \(0.5,-0.9,0.2\). Find its spectral radius. <details><summary>Show answer</summary><p>\(\rho(A)=\max(0.5,0.9,0.2)=0.9\).</p></details>`,
    raw`Why can gradients vanish even when every layer uses nonzero derivatives? <details><summary>Show answer</summary><p>Backpropagation multiplies many Jacobians. If the relevant directional stretch factors are repeatedly below \(1\), their product can become extremely small even though no individual factor is zero.</p></details>`,
    raw`Explain in one sentence why preserving activation variance does not guarantee good directional propagation. <details><summary>Show answer</summary><p>Variance is an average scale measure, so some directions can still be amplified and other directions can be severely shrunk or destroyed.</p></details>`
  ]
});
