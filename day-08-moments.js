(() => {
  const lesson = COURSE[2].lessons[0];

  lesson.sections.push(
    {
      id: "joint-marginal-conditional",
      title: "8. Joint, marginal, and conditional distributions answer different questions",
      html: String.raw`
        <p>Machine-learning models often contain several random variables at the same time. A <strong>joint distribution</strong> describes them together.</p>
        <p>For discrete \(X\) and \(Y\), write</p>
        <p>\[p(x,y)=P(X=x,Y=y).\]</p>
        <p>Suppose \(X\in\{0,1\}\) and \(Y\in\{0,1\}\) have this joint table:</p>
        <table>
          <thead><tr><th></th><th>\(Y=0\)</th><th>\(Y=1\)</th></tr></thead>
          <tbody>
            <tr><th>\(X=0\)</th><td>0.20</td><td>0.30</td></tr>
            <tr><th>\(X=1\)</th><td>0.10</td><td>0.40</td></tr>
          </tbody>
        </table>
        <p>The entries sum to one.</p>
        <h3>Marginal distribution</h3>
        <p>To get the distribution of \(X\) alone, sum out \(Y\):</p>
        <p>\[p_X(x)=\sum_y p(x,y).\]</p>
        <p>Thus,</p>
        <p>\[P(X=0)=0.20+0.30=0.50,\qquad P(X=1)=0.10+0.40=0.50.\]</p>
        <p>This operation is called <strong>marginalization</strong>.</p>
        <h3>Conditional distribution</h3>
        <p>For \(P(Y=1)>0\),</p>
        <p>\[p(x\mid Y=1)=\frac{p(x,Y=1)}{P(Y=1)}.\]</p>
        <p>Here, \(P(Y=1)=0.30+0.40=0.70\), so</p>
        <p>\[P(X=1\mid Y=1)=\frac{0.40}{0.70}\approx0.571.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Latent-variable models often specify a joint distribution such as \(p(x,z)=p(x\mid z)p(z)\). The observed-data likelihood is then obtained by marginalizing the latent variable: \(p(x)=\int p(x,z)\,dz\) or \(p(x)=\sum_zp(x,z)\).
        </div>
        <div class="shape-check">
          <strong>Reading rule.</strong> When a variable disappears from an equation, ask whether it was conditioned on, fixed, or marginalized out. These are different operations.
        </div>
      `
    },
    {
      id: "expectation",
      title: "9. Expectation is a probability-weighted average",
      html: String.raw`
        <p>The expectation of a random variable summarizes its average value under the distribution.</p>
        <p>For a discrete variable,</p>
        <p>\[\mathbb{E}[X]=\sum_x x\,p_X(x).\]</p>
        <p>For a continuous variable with density \(f_X\),</p>
        <p>\[\mathbb{E}[X]=\int_{-\infty}^{\infty}x f_X(x)\,dx.\]</p>
        <h3>Die example</h3>
        <p>For a fair six-sided die,</p>
        <p>\[\mathbb{E}[X]=\sum_{x=1}^{6}x\frac16=\frac{21}{6}=3.5.\]</p>
        <p>The expected value need not be a possible outcome. A die cannot show \(3.5\).</p>
        <h3>Expectation of a function</h3>
        <p>You often need \(\mathbb{E}[g(X)]\), not only \(\mathbb{E}[X]\):</p>
        <p>\[\mathbb{E}[g(X)]=\sum_x g(x)p_X(x)\]</p>
        <p>for a discrete variable.</p>
        <p>If \(X\) is a fair die,</p>
        <p>\[\mathbb{E}[X^2]=\frac{1^2+2^2+3^2+4^2+5^2+6^2}{6}=\frac{91}{6}.\]</p>
        <h3>Linearity</h3>
        <p>Expectation is linear:</p>
        <p>\[\mathbb{E}[aX+bY+c]=a\mathbb{E}[X]+b\mathbb{E}[Y]+c.\]</p>
        <p>This identity does <em>not</em> require \(X\) and \(Y\) to be independent.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Population risk is often written as
          \[R(\theta)=\mathbb{E}_{(X,Y)\sim p_{\text{data}}}[L(f_\theta(X),Y)].\]
          Training on a finite data set replaces this inaccessible expectation with an empirical average.
        </div>
      `
    },
    {
      id: "variance",
      title: "10. Variance measures squared spread around the mean",
      html: String.raw`
        <p>The mean tells you where a distribution is centered. It does not tell you how spread out the values are.</p>
        <div class="definition">
          <strong>Variance.</strong> If \(\mu=\mathbb{E}[X]\), then
          \[\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2].\]
        </div>
        <p>An equivalent formula is</p>
        <p>\[\operatorname{Var}(X)=\mathbb{E}[X^2]-\mathbb{E}[X]^2.\]</p>
        <p>The standard deviation is</p>
        <p>\[\operatorname{SD}(X)=\sqrt{\operatorname{Var}(X)}.\]</p>
        <p>Standard deviation has the same units as \(X\). Variance has squared units.</p>
        <h3>Two-point example</h3>
        <p>Suppose \(X\) is \(1\) or \(5\), each with probability \(1/2\). Then</p>
        <p>\[\mu=3.\]</p>
        <p>Therefore,</p>
        <p>\[\operatorname{Var}(X)=\frac12(1-3)^2+\frac12(5-3)^2=4.\]</p>
        <p>So the standard deviation is \(2\).</p>
        <h3>Scaling rule</h3>
        <p>For constants \(a,b\),</p>
        <p>\[\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).\]</p>
        <p>Adding a constant moves the center but does not change spread. Multiplying by \(a\) scales distances by \(|a|\), so squared distances scale by \(a^2\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Initialization papers often analyze activation or gradient variance across layers. Batch normalization and layer normalization explicitly control moments of activations. Noise models also use variance as a scale parameter.</div>
      `
    },
    {
      id: "covariance-correlation",
      title: "11. Covariance measures whether two variables move together",
      html: String.raw`
        <p>For two random variables \(X\) and \(Y\), covariance is</p>
        <p>\[\operatorname{Cov}(X,Y)=\mathbb{E}[(X-\mu_X)(Y-\mu_Y)].\]</p>
        <p>An equivalent formula is</p>
        <p>\[\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y].\]</p>
        <p>Positive covariance means that large values of \(X\) tend to occur with large values of \(Y\). Negative covariance means that large values of one tend to occur with small values of the other.</p>
        <h3>Small example</h3>
        <p>Suppose the two equally likely outcomes are</p>
        <p>\[(X,Y)=(1,2)\quad\text{or}\quad(3,6).\]</p>
        <p>Then \(\mu_X=2\) and \(\mu_Y=4\). Therefore,</p>
        <p>\[\operatorname{Cov}(X,Y)=\frac12(-1)(-2)+\frac12(1)(2)=2.\]</p>
        <p>Because \(Y=2X\), the variables move together perfectly.</p>
        <h3>Correlation removes scale</h3>
        <p>The correlation coefficient is</p>
        <p>\[\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.\]</p>
        <p>When both standard deviations are nonzero, \(\rho\in[-1,1]\).</p>
        <p>Correlation is dimensionless. Covariance depends on the units and scales of the variables.</p>
        <div class="shape-check">
          <strong>Common mistake.</strong> Zero covariance means no linear association. It does not generally mean independence. For example, a symmetric variable \(X\) can have zero covariance with \(X^2\) while the two variables are clearly dependent.
        </div>
        <div class="paper-connection">
          <strong>ML connection.</strong> Feature correlation can reveal redundancy. Representation-learning methods can also penalize off-diagonal covariance terms to encourage different representation coordinates to carry less redundant linear information.</div>
      `
    },
    {
      id: "random-vectors-covariance",
      title: "12. A covariance matrix describes second-order structure of a random vector",
      html: String.raw`
        <p>Let a random vector be</p>
        <p>\[X=\begin{bmatrix}X_1\\X_2\\\vdots\\X_d\end{bmatrix}\in\mathbb{R}^{d}.\]</p>
        <p>Its mean vector is</p>
        <p>\[\mu=\mathbb{E}[X]\in\mathbb{R}^{d}.\]</p>
        <p>The covariance matrix is</p>
        <p>\[\Sigma=\mathbb{E}[(X-\mu)(X-\mu)^\top]\in\mathbb{R}^{d\times d}.\]</p>
        <p>The diagonal entry \(\Sigma_{ii}\) is \(\operatorname{Var}(X_i)\). The off-diagonal entry \(\Sigma_{ij}\) is \(\operatorname{Cov}(X_i,X_j)\).</p>
        <h3>Shape reasoning</h3>
        <p>\(X-\mu\) has shape \(d\times1\). Therefore,</p>
        <p>\[(X-\mu)(X-\mu)^\top\]</p>
        <p>has shape</p>
        <p>\[(d\times1)(1\times d)=d\times d.\]</p>
        <p>The expectation keeps the same shape.</p>
        <h3>Numerical example</h3>
        <p>Suppose \(X\) takes \((1,2)^\top\) and \((3,4)^\top\), each with probability \(1/2\). The mean is</p>
        <p>\[\mu=\begin{bmatrix}2\\3\end{bmatrix}.\]</p>
        <p>The two centered vectors are \((-1,-1)^\top\) and \((1,1)^\top\). Each outer product is</p>
        <p>\[\begin{bmatrix}1&1\\1&1\end{bmatrix}.\]</p>
        <p>Thus,</p>
        <p>\[\Sigma=\begin{bmatrix}1&1\\1&1\end{bmatrix}.\]</p>
        <p>The perfect positive off-diagonal covariance reflects that the two coordinates move together.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> PCA finds eigenvectors of a covariance matrix. Multivariate Gaussian models use \(\Sigma\) to describe the scale and orientation of probability contours. Covariance also appears in uncertainty estimation and Kalman-style models.</div>
      `
    },
    {
      id: "linear-transformations",
      title: "13. Linear transformations move means and covariances predictably",
      html: String.raw`
        <p>Suppose</p>
        <p>\[Y=AX+b,\]</p>
        <p>with \(X\in\mathbb{R}^{d}\), \(A\in\mathbb{R}^{m\times d}\), and \(b\in\mathbb{R}^{m}\).</p>
        <p>The output mean is</p>
        <p>\[\mathbb{E}[Y]=A\mathbb{E}[X]+b=A\mu_X+b.\]</p>
        <p>The output covariance is</p>
        <p>\[\Sigma_Y=A\Sigma_XA^\top.\]</p>
        <h3>Shape check</h3>
        <p>\(\Sigma_X\) has shape \(d\times d\). Therefore,</p>
        <p>\[(m\times d)(d\times d)(d\times m)=m\times m,\]</p>
        <p>which is the correct covariance shape for \(Y\in\mathbb{R}^{m}\).</p>
        <h3>One-dimensional example</h3>
        <p>If \(Y=3X+5\), \(\mathbb{E}[X]=2\), and \(\operatorname{Var}(X)=4\), then</p>
        <p>\[\mathbb{E}[Y]=3(2)+5=11\]</p>
        <p>and</p>
        <p>\[\operatorname{Var}(Y)=3^2(4)=36.\]</p>
        <h3>Two-dimensional example</h3>
        <p>Let</p>
        <p>\[\Sigma_X=I_2,\qquad A=\begin{bmatrix}2&0\\0&\tfrac12\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[\Sigma_Y=AA^\top=\begin{bmatrix}4&0\\0&1/4\end{bmatrix}.\]</p>
        <p>The transformation makes uncertainty four times larger in variance along the first axis and four times smaller along the second.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> This formula appears whenever Gaussian noise, latent variables, or uncertainty pass through a linear layer. It also explains why covariance changes under feature transforms.</div>
      `
    }
  );
})();
