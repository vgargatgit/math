(() => {
  const day22 = COURSE[7].lessons[0];

  day22.sections.push(
    {
      id: "find-central-objective",
      title: "6. Find the central objective or update rule before you read every detail",
      html: String.raw`
        <p>Many ML papers can be organized around one objective, one update rule, or one probabilistic factorization. Find that expression early.</p>

        <h3>Supervised-learning objective</h3>
        <p>A common form is</p>
        <p>\[
        \theta^*=\arg\min_\theta
        \frac1N\sum_{i=1}^{N}\ell\bigl(f_\theta(x_i),y_i\bigr)
        +\lambda R(\theta).
        \]</p>
        <p>This equation has three main parts:</p>
        <ol>
          <li>\(f_\theta\): the model;</li>
          <li>\(\ell\): the data-fit term;</li>
          <li>\(R(\theta)\): the regularizer.</li>
        </ol>
        <p>If a paper introduces ten modules but optimizes this objective, ask how each module changes one of these parts.</p>

        <h3>Contrastive-learning objective</h3>
        <p>For one positive pair, a paper can use</p>
        <p>\[
        \ell_i=-\log
        \frac{\exp(s(z_i,z_i^+)/\tau)}
        {\exp(s(z_i,z_i^+)/\tau)+\sum_{j=1}^{K}\exp(s(z_i,z_j^-)/\tau)}.
        \]</p>
        <p>Here \(s\) is a similarity function and \(\tau>0\) is a temperature. This equation tells you that training increases the positive score relative to negative scores.</p>

        <h3>Numerical example</h3>
        <p>Suppose the positive score is \(2\), two negative scores are \(1\) and \(0\), and \(\tau=1\). Then</p>
        <p>\[
        p_+=\frac{e^2}{e^2+e^1+e^0}
        \approx\frac{7.389}{7.389+2.718+1}
        \approx0.665.
        \]</p>
        <p>The loss is</p>
        <p>\[
        -\log(0.665)\approx0.408.
        \]</p>
        <p>If the positive score increases to \(3\) while the negatives stay fixed, the loss decreases.</p>

        <h3>Objective-reading checklist</h3>
        <p>Write the optimization variable, the data expectation or sum, every normalization constant, each regularization coefficient, and whether the objective is minimized or maximized. A missing minus sign can reverse your interpretation.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> The abstract can say that a method “aligns representations,” “improves robustness,” or “encourages sparsity.” The objective tells you the precise mathematical pressure applied during training.</div>
      `
    },
    {
      id: "reconstruct-one-derivation",
      title: "7. Reconstruct one derivation line by line",
      html: String.raw`
        <p>Do not accept a long chain of equations as one indivisible object. Rebuild one important transition and name the rule used at each step.</p>

        <h3>Example: derive the gradient of softmax cross-entropy</h3>
        <p>Let logits be \(z\in\mathbb R^C\). Define</p>
        <p>\[
        p_j=\frac{e^{z_j}}{\sum_{k=1}^{C}e^{z_k}}.
        \]</p>
        <p>For a one-hot target \(y\), the loss is</p>
        <p>\[
        L=-\sum_{j=1}^{C}y_j\log p_j.
        \]</p>
        <p>If the correct class is \(c\), then \(L=-\log p_c\). Substitute softmax:</p>
        <p>\[
        L=-z_c+\log\left(\sum_{k=1}^{C}e^{z_k}\right).
        \]</p>
        <p>Differentiate with respect to logit \(z_j\):</p>
        <p>\[
        \frac{\partial L}{\partial z_j}
        =-\mathbf 1[j=c]
        +\frac{e^{z_j}}{\sum_k e^{z_k}}.
        \]</p>
        <p>Therefore</p>
        <p>\[
        \boxed{\nabla_z L=p-y}.
        \]</p>

        <h3>Numerical check</h3>
        <p>Let</p>
        <p>\[
        z=(2,1,0)^\top,
        \qquad
        y=(1,0,0)^\top.
        \]</p>
        <p>The softmax probabilities are approximately</p>
        <p>\[
        p=(0.665,0.245,0.090)^\top.
        \]</p>
        <p>So</p>
        <p>\[
        \nabla_zL=p-y=(-0.335,0.245,0.090)^\top.
        \]</p>
        <p>The entries sum to zero. Increasing all logits by the same constant does not change softmax probabilities, so this zero-sum property is a useful check.</p>

        <h3>What to write beside each derivation step</h3>
        <p>Use labels such as “substitute definition,” “apply chain rule,” “use linearity of expectation,” “use Bayes’ rule,” “drop constant independent of \(\theta\),” or “apply Jensen’s inequality.” These labels expose hidden assumptions.</p>
        <div class="shape-check"><strong>Common mistake.</strong> A paper can write \(\propto\) when it drops a normalization constant. Check whether that constant is independent of the quantity being optimized. If it depends on the parameter, you cannot drop it from an optimization objective without changing the problem.</div>
      `
    },
    {
      id: "derivation-audit",
      title: "8. Audit a derivation with algebra, dimensions, and limiting cases",
      html: String.raw`
        <p>A derivation can be symbolically neat and still be wrong. Use three independent checks.</p>

        <h3>Check 1: algebra</h3>
        <p>Verify one transition at a time. For example, if a paper claims</p>
        <p>\[
        \|Ax-b\|_2^2=x^\top A^\top Ax-2b^\top Ax+b^\top b,
        \]</p>
        <p>expand</p>
        <p>\[
        (Ax-b)^\top(Ax-b)
        \]</p>
        <p>to confirm the cross terms.</p>

        <h3>Check 2: dimensions</h3>
        <p>If</p>
        <p>\[
        A\in\mathbb R^{m\times n},
        \quad x\in\mathbb R^n,
        \quad b\in\mathbb R^m,
        \]</p>
        <p>then each term above is scalar. In particular,</p>
        <p>\[
        x^\top A^\top Ax:1\times1.
        \]</p>

        <h3>Check 3: limiting or special cases</h3>
        <p>Set \(A=I\). The expression becomes</p>
        <p>\[
        \|x-b\|_2^2=x^\top x-2b^\top x+b^\top b,
        \]</p>
        <p>which is familiar. Set \(x=0\). Both sides become \(\|b\|_2^2\).</p>

        <h3>Finite-difference check</h3>
        <p>For a scalar function \(f(\theta)\), approximate</p>
        <p>\[
        f'(\theta)\approx\frac{f(\theta+\varepsilon)-f(\theta-\varepsilon)}{2\varepsilon}.
        \]</p>
        <p>If \(f(\theta)=\theta^2\), \(\theta=3\), and \(\varepsilon=0.001\), the estimate is close to \(6\), matching the analytic derivative.</p>
        <div class="definition"><strong>Audit rule.</strong> Use more than one check. Shape compatibility cannot prove algebraic correctness, and a correct special case cannot prove a derivation in full generality.</div>
      `
    },
    {
      id: "list-assumptions",
      title: "9. List assumptions and connect each assumption to the step that needs it",
      html: String.raw`
        <p>Assumptions are not background decoration. They define the conditions under which a result is valid.</p>

        <h3>Common assumption types</h3>
        <ul>
          <li>independent and identically distributed samples;</li>
          <li>finite variance;</li>
          <li>differentiability or smoothness;</li>
          <li>convexity;</li>
          <li>positive definiteness;</li>
          <li>invertibility or full rank;</li>
          <li>Markov structure;</li>
          <li>conditional independence;</li>
          <li>bounded gradients or Lipschitz continuity;</li>
          <li>model specification assumptions.</li>
        </ul>

        <h3>Example: least squares</h3>
        <p>The normal equations are</p>
        <p>\[
        A^\top A\widehat x=A^\top b.
        \]</p>
        <p>The equation itself does not require \(A^\top A\) to be invertible. But the closed form</p>
        <p>\[
        \widehat x=(A^\top A)^{-1}A^\top b
        \]</p>
        <p>requires full column rank. If the columns are dependent, the inverse does not exist and a pseudoinverse or another solver is needed.</p>

        <h3>Example: expectation factorization</h3>
        <p>A paper can write</p>
        <p>\[
        \mathbb E[XY]=\mathbb E[X]\mathbb E[Y].
        \]</p>
        <p>This identity is not true for arbitrary random variables. Independence is sufficient. Zero covariance is also enough for this specific second-order equality, but it does not imply full independence in general.</p>

        <h3>Assumption ledger</h3>
        <p>Use three columns: assumption, where it is used, and what fails without it. For example:</p>
        <table>
          <thead><tr><th>Assumption</th><th>Used for</th><th>If false</th></tr></thead>
          <tbody>
            <tr><td>full column rank of \(A\)</td><td>inverse of \(A^\top A\)</td><td>solution may not be unique</td></tr>
            <tr><td>i.i.d. validation examples</td><td>generalization estimate</td><td>metric can be biased for deployment distribution</td></tr>
            <tr><td>smooth objective</td><td>ordinary gradient argument</td><td>subgradient or other analysis may be needed</td></tr>
          </tbody>
        </table>
        <div class="paper-connection"><strong>Paper connection.</strong> A theorem can be fully correct and still be irrelevant to a practical setting when its assumptions do not match the data, model, or optimization regime.</div>
      `
    },
    {
      id: "assumption-stress-test",
      title: "10. Stress-test assumptions with counterexamples and nearby cases",
      html: String.raw`
        <p>After you list an assumption, change it. This reveals why the assumption is present.</p>

        <h3>Convexity example</h3>
        <p>For</p>
        <p>\[
        f(x)=x^2,
        \]</p>
        <p>the stationary point \(x=0\) is the global minimum. For</p>
        <p>\[
        g(x)=x^4-x^2,
        \]</p>
        <p>the point \(x=0\) is stationary but is not a local minimum. A theorem that uses convexity to turn stationarity into global optimality cannot be transferred blindly to \(g\).</p>

        <h3>Distribution-shift example</h3>
        <p>Suppose a classifier has validation accuracy \(95\%\) on examples drawn from \(P_{\text{val}}(x,y)\). If deployment uses a different distribution \(P_{\text{deploy}}\), the reported accuracy is not automatically an estimate of deployment accuracy.</p>

        <h3>Rank example</h3>
        <p>Consider</p>
        <p>\[
        A=
        \begin{bmatrix}
        1&2\\
        2&4
        \end{bmatrix}.
        \]</p>
        <p>The second column is twice the first. Therefore \(\operatorname{rank}(A)=1\) and</p>
        <p>\[
        \det(A^\top A)=0.
        \]</p>
        <p>Any formula that requires \((A^\top A)^{-1}\) fails for this example.</p>
        <div class="definition"><strong>Stress-test rule.</strong> A small counterexample is often more useful than another page of algebra. It tells you exactly which part of a claim depends on an assumption.</div>
      `
    }
  );
})();
