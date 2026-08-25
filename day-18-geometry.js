(() => {
  const day18 = COURSE[6].lessons[2];

  day18.sections.push(
    {
      id: "manifolds",
      title: "12. A manifold is locally simple even when its global shape is curved",
      html: String.raw`
        <p>A <strong>manifold</strong> is a space that looks locally like ordinary Euclidean space. The full object can be curved or have a complicated global shape, but a sufficiently small neighborhood can be described with a small number of coordinates.</p>

        <h3>Circle example</h3>
        <p>The unit circle is</p>
        <p>\[
        S^1=\{(x,y)\in\mathbb R^2:x^2+y^2=1\}.
        \]</p>
        <p>The circle lives inside \(\mathbb R^2\), but it has one intrinsic degree of freedom. A local coordinate can be the angle \(\theta\):</p>
        <p>\[
        x=\cos\theta,
        \qquad
        y=\sin\theta.
        \]</p>
        <p>Thus the ambient dimension is 2, while the manifold dimension is 1.</p>

        <h3>Sphere example</h3>
        <p>The unit sphere</p>
        <p>\[
        S^2=\{x\in\mathbb R^3:\|x\|_2=1\}
        \]</p>
        <p>has intrinsic dimension 2. Two local coordinates can describe a patch, even though points are stored with three Cartesian coordinates.</p>

        <h3>Why ML papers care</h3>
        <p>Many datasets can have high ambient dimension but lower intrinsic dimension. Images can be stored as millions of pixel values while valid images occupy a much smaller structured region. Molecular conformations, robot poses, meshes, and physical states often have geometric constraints.</p>
        <p>When a paper says that data lies near a manifold, it usually means that the observed vectors occupy a structured lower-dimensional subset of the ambient vector space.</p>

        <h3>Do not overread the manifold hypothesis</h3>
        <p>The phrase <em>manifold hypothesis</em> is an intuition, not a guarantee that every dataset is exactly a smooth manifold. Real data can contain noise, boundaries, intersections, discrete variables, and several components.</p>
        <div class="shape-check"><strong>Common mistake.</strong> Dimension in manifold language is intrinsic dimension, not the number of coordinates used by the file format. A two-dimensional surface can be embedded in three dimensions.</div>
      `
    },
    {
      id: "tangent-spaces",
      title: "13. A tangent space is the best local linear approximation to a manifold",
      html: String.raw`
        <p>Linear algebra is powerful, but a curved manifold is not globally a vector space. The <strong>tangent space</strong> gives a local vector space at one point.</p>

        <h3>Tangent to the circle</h3>
        <p>For the unit circle, define the constraint</p>
        <p>\[
        c(x,y)=x^2+y^2-1=0.
        \]</p>
        <p>At a point \(p=(x,y)\), the gradient</p>
        <p>\[
        \nabla c(p)=\begin{bmatrix}2x\\2y\end{bmatrix}
        \]</p>
        <p>is normal to the circle. A tangent vector \(v\) must satisfy</p>
        <p>\[
        \nabla c(p)^\top v=0.
        \]</p>

        <h3>Numerical example</h3>
        <p>At \(p=(1,0)\),</p>
        <p>\[
        \nabla c(p)=\begin{bmatrix}2\\0\end{bmatrix}.
        \]</p>
        <p>The tangent condition is</p>
        <p>\[
        \begin{bmatrix}2&0\end{bmatrix}
        \begin{bmatrix}v_1\\v_2\end{bmatrix}=0,
        \]</p>
        <p>so \(v_1=0\). The tangent space is the vertical line</p>
        <p>\[
        T_pS^1=\operatorname{span}\left\{\begin{bmatrix}0\\1\end{bmatrix}\right\}.
        \]</p>

        <h3>Why tangent spaces appear in ML</h3>
        <p>Gradients, velocities, local perturbations, and differential operators on a manifold live naturally in tangent spaces. Riemannian optimization moves in a tangent direction and then maps the result back to the manifold. Geometric networks on surfaces can represent vector features relative to local tangent frames.</p>

        <h3>Local linearization</h3>
        <p>This is the same principle used by calculus. Near \(p\), a smooth nonlinear object can often be approximated by a linear object. On a curved surface, the tangent plane is the first-order approximation.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> When a geometric ML paper projects a vector onto a tangent space, it is enforcing a local geometric constraint, not merely reducing dimension arbitrarily.</div>
      `
    },
    {
      id: "geodesics",
      title: "14. Geodesic distance measures shortest paths constrained to the space",
      html: String.raw`
        <p>Euclidean distance measures a straight line through the ambient space. <strong>Geodesic distance</strong> measures the shortest allowed path that stays on the manifold.</p>

        <h3>Circle example</h3>
        <p>Take two points on the unit circle separated by angle \(\Delta\theta\in[0,\pi]\).</p>
        <p>The geodesic distance along the shorter arc is</p>
        <p>\[
        d_{\text{geo}}=\Delta\theta.
        \]</p>
        <p>The straight chord distance is</p>
        <p>\[
        d_{\text{Euc}}=2\sin\left(\frac{\Delta\theta}{2}\right).
        \]</p>

        <h3>Numerical example</h3>
        <p>For opposite quarter-circle points, \(\Delta\theta=\pi/2\). Then</p>
        <p>\[
        d_{\text{geo}}=\frac\pi2\approx1.571,
        \]</p>
        <p>while</p>
        <p>\[
        d_{\text{Euc}}=\sqrt2\approx1.414.
        \]</p>
        <p>The straight line cuts through the disk. The geodesic follows the circle.</p>

        <h3>Graphs have a related idea</h3>
        <p>On an unweighted graph, shortest-path distance counts the minimum number of edges between nodes. This is not a smooth-manifold geodesic, but the conceptual role is similar: distance respects the structure of the domain.</p>

        <h3>Why this matters in papers</h3>
        <p>Surface learning, mesh networks, shape matching, manifold learning, and molecular geometry can depend on intrinsic distance rather than ambient Euclidean distance. Two points can be close in \(\mathbb R^3\) but far apart along a folded surface.</p>
        <div class="shape-check"><strong>Common mistake.</strong> “Nearest” is incomplete unless the metric is known. Euclidean, graph shortest-path, cosine, and geodesic distances can produce different neighborhoods.</div>
      `
    },
    {
      id: "local-coordinates",
      title: "15. Local coordinates describe a patch, not necessarily the whole manifold",
      html: String.raw`
        <p>A <strong>coordinate chart</strong> maps a neighborhood on a manifold to an open region in ordinary Euclidean space. One chart need not cover the whole manifold cleanly.</p>

        <h3>Why local coordinates are necessary</h3>
        <p>Longitude and latitude are useful coordinates on most of a sphere, but they have singular behavior at the poles and a seam where longitude wraps. This illustrates a general point: convenient coordinates can fail at special locations even when the underlying geometric object is smooth.</p>

        <h3>Coordinate values are not the geometric object</h3>
        <p>The same tangent vector can have different numerical components in two different local bases. The geometric vector is unchanged; its coordinate description changes.</p>
        <p>If a local basis is stored as columns of</p>
        <p>\[
        B=\begin{bmatrix}\mid&\mid\\b_1&b_2\\\mid&\mid\end{bmatrix},
        \]</p>
        <p>then a tangent vector can be written</p>
        <p>\[
        v=Bc,
        \]</p>
        <p>where \(c\in\mathbb R^2\) contains local coordinates.</p>

        <h3>Numerical basis-change example</h3>
        <p>Suppose</p>
        <p>\[
        b_1=\begin{bmatrix}1\\0\end{bmatrix},
        \qquad
        b_2=\begin{bmatrix}0\\1\end{bmatrix},
        \]</p>
        <p>and rotate the local basis by 90 degrees:</p>
        <p>\[
        b_1'=\begin{bmatrix}0\\1\end{bmatrix},
        \qquad
        b_2'=\begin{bmatrix}-1\\0\end{bmatrix}.
        \]</p>
        <p>The vector \(v=(2,1)^\top\) has coordinates \((2,1)^\top\) in the first basis. In the rotated basis,</p>
        <p>\[
        v=1b_1'-2b_2',
        \]</p>
        <p>so the coordinates are \((1,-2)^\top\).</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Geometry-aware models must distinguish a feature from the coordinates used to represent that feature. This becomes important for vector and tensor features on meshes and manifolds.</div>
      `
    },
    {
      id: "transformation-groups",
      title: "16. Transformation groups formalize rotations, translations, and other structured changes",
      html: String.raw`
        <p>A transformation group specifies which changes of viewpoint should be treated systematically.</p>

        <h3>Rotations in two dimensions</h3>
        <p>A planar rotation by angle \(\theta\) is</p>
        <p>\[
        R(\theta)=
        \begin{bmatrix}
        \cos\theta&-\sin\theta\\
        \sin\theta&\cos\theta
        \end{bmatrix}.
        \]</p>
        <p>Rotations compose by angle addition:</p>
        <p>\[
        R(\theta_1)R(\theta_2)=R(\theta_1+\theta_2).
        \]</p>
        <p>The inverse is</p>
        <p>\[
        R(\theta)^{-1}=R(-\theta)=R(\theta)^\top.
        \]</p>

        <h3>Numerical example</h3>
        <p>For a 90-degree rotation,</p>
        <p>\[
        R=\begin{bmatrix}0&-1\\1&0\end{bmatrix}.
        \]</p>
        <p>Applied to \(x=(2,1)^\top\),</p>
        <p>\[
        Rx=\begin{bmatrix}-1\\2\end{bmatrix}.
        \]</p>

        <h3>Translations</h3>
        <p>Translation by vector \(t\) acts as</p>
        <p>\[x\mapsto x+t.\]</p>
        <p>Translations form a group under vector addition. Convolutional networks exploit translation structure because the same local rule is applied at many positions.</p>

        <h3>Rigid motions</h3>
        <p>For molecular or point-cloud data, a rigid motion combines rotation and translation:</p>
        <p>\[
        x_i' = Rx_i+t.
        \]</p>
        <p>Pairwise Euclidean distances are invariant:</p>
        <p>\[
        \|x_i'-x_j'\|_2
        =\|R(x_i-x_j)\|_2
        =\|x_i-x_j\|_2.
        \]</p>
        <p>A molecular energy prediction should usually be invariant to a rigid motion, while a predicted force vector should rotate with the molecule.</p>
        <div class="paper-connection"><strong>Key distinction.</strong> Scalar properties such as total energy are natural invariant outputs. Vector properties such as forces are natural equivariant outputs.</div>
      `
    },
    {
      id: "group-representations",
      title: "17. A group representation tells us how features transform",
      html: String.raw`
        <p>A <strong>representation</strong> assigns a matrix to each group element so that group composition becomes matrix multiplication.</p>
        <p>Write</p>
        <p>\[
        \rho(g_1g_2)=\rho(g_1)\rho(g_2).
        \]</p>
        <p>This lets abstract symmetry transformations act on feature vectors.</p>

        <h3>Scalar representation</h3>
        <p>An invariant scalar can use the trivial representation</p>
        <p>\[
        \rho(g)=1.
        \]</p>
        <p>Then equivariance reduces to invariance:</p>
        <p>\[
        f(g\cdot x)=f(x).
        \]</p>

        <h3>Vector representation</h3>
        <p>For planar rotations, a geometric vector transforms with</p>
        <p>\[
        \rho(R)=R.
        \]</p>
        <p>If a network predicts a 2-D direction \(v(x)\), rotation equivariance means</p>
        <p>\[
        v(Rx)=Rv(x).
        \]</p>

        <h3>Multiple feature types</h3>
        <p>Modern equivariant networks can contain scalar channels, vector channels, and higher-order tensor channels. Different feature types transform under different representations of the same symmetry group.</p>
        <p>This is why papers can use terms such as <em>irreducible representation</em>, <em>type-0 feature</em>, <em>type-1 feature</em>, or <em>spherical harmonic channel</em>. The details can be advanced, but the basic question is simple: how should each feature change when the input is transformed?</p>

        <h3>Why ordinary channels are not always enough</h3>
        <p>In a standard neural network, hidden channels are often treated as unrelated scalar coordinates. In an equivariant network, groups of channels can have a prescribed transformation law. Arbitrary mixing can break equivariance unless the learned linear map respects those laws.</p>
        <div class="shape-check"><strong>Reading habit.</strong> When a paper uses typed geometric features, write both the tensor shape and the transformation rule. Shape alone does not tell you the feature's geometric meaning.</div>
      `
    },
    {
      id: "gauge-intuition",
      title: "18. Gauge intuition: local coordinate frames can change without changing the underlying geometry",
      html: String.raw`
        <p>The word <strong>gauge</strong> can sound more difficult than the first idea requires. A gauge is a local choice of coordinates or frame used to describe an object whose geometric meaning does not depend on that choice.</p>

        <h3>A simple local-frame example</h3>
        <p>Suppose a tangent plane has two orthonormal basis vectors \(b_1,b_2\). A tangent vector is represented by coordinates</p>
        <p>\[
        c=\begin{bmatrix}c_1\\c_2\end{bmatrix}.
        \]</p>
        <p>Rotate the local basis by angle \(\theta\). The same geometric vector now has different coordinates. If the basis rotation is \(R(\theta)\), the coordinate vector changes by the inverse basis transformation.</p>
        <p>The geometry did not change. Only the local description changed.</p>

        <h3>Why local frames arise</h3>
        <p>On a curved surface there is usually no single global tangent basis that works naturally everywhere. Algorithms therefore choose local frames. Neighboring frames can differ by a rotation. A geometry-aware operation should not depend on arbitrary frame choices.</p>

        <h3>Gauge equivariance</h3>
        <p>Very roughly, a gauge-equivariant network changes its feature coordinates consistently when local frames are changed. Predictions with geometric meaning remain well defined even though internal coordinate numbers may change.</p>

        <h3>Connection to ordinary basis changes</h3>
        <p>The core linear-algebra idea is familiar:</p>
        <p>\[
        [v]_{B'}=P^{-1}[v]_B.
        \]</p>
        <p>A gauge problem applies this kind of coordinate-change logic locally, potentially with a different frame at each point.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> If a paper uses gauge-equivariant convolutions on meshes, first ask what local frame is chosen, how features transform when that frame changes, and which outputs are intended to be frame independent.</div>
        <div class="shape-check"><strong>Do not overgeneralize.</strong> Gauge theory in physics is a large subject. For geometric deep learning, the first useful intuition is local coordinate freedom and consistency under local frame changes.</div>
      `
    }
  );
})();
