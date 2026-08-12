const day5 = COURSE[1].lessons[0];

Object.assign(day5, {
  published: true,
  summary: "Extend derivatives from one variable to many. Learn gradients, directional derivatives, Jacobians, Hessians, Taylor approximations, curvature, stationary points, and subgradients with explicit shapes and ML examples.",
  explanation: "A derivative describes local change. With several inputs, you must say which input changes and what kind of output the function produces. A gradient describes how a scalar output changes with all inputs. A Jacobian does the same for a vector output. A Hessian describes how a gradient changes. These objects let you read optimization, backpropagation, sensitivity, and curvature equations in AI and ML papers.",
  topics: [
    "Functions of several variables",
    "Scalar-valued and vector-valued functions",
    "Partial derivatives",
    "Independent variables",
    "Total derivatives",
    "Directional derivatives",
    "Gradient",
    "Level sets",
    "Jacobians",
    "Hessians",
    "Mixed partial derivatives",
    "Local linear approximation",
    "Taylor expansion",
    "Curvature",
    "Stationary points",
    "Minima, maxima, and saddles",
    "Nondifferentiable points",
    "Subgradient intuition"
  ],
  sections: [
    {
      id: "many-inputs",
      title: "1. Start with the local-change question",
      html: String.raw`
        <p>Single-variable calculus asks how a function changes when one input changes. Multivariable calculus asks the same question when the input has several coordinates.</p>
        <p>Consider</p>
        <p>\[f(x,y)=x^2+3xy+y^2.\]</p>
        <p>The input is the pair \((x,y)\). The output is one number. If you change only \(x\), the output changes one way. If you change only \(y\), it changes another way. If you move both coordinates at the same time, the total change combines both effects.</p>
        <div class="definition">
          <strong>Main idea.</strong> A derivative is a local model of change. In several variables, the derivative must also record the direction of the input change.
        </div>
        <p>Use this reading routine when a paper differentiates a multivariable function:</p>
        <ol>
          <li>Write the input shape.</li>
          <li>Write the output shape.</li>
          <li>Identify which variable changes.</li>
          <li>Identify whether the derivative must be a scalar, vector, matrix, or higher-order object.</li>
          <li>Check whether the derivative is used as a local approximation, an optimization direction, or a sensitivity measure.</li>
        </ol>
        <div class="paper-connection">
          <strong>Why this matters in ML.</strong> A loss function can depend on millions of parameters. Backpropagation computes how the loss changes when each parameter changes. Optimization algorithms then use this local change information to update the parameters.
        </div>
      `
    },
    {
      id: "function-types",
      title: "2. Separate scalar-valued functions from vector-valued functions",
      html: String.raw`
        <p>A function can have many inputs and one output, or many inputs and many outputs. The output type determines which derivative object you need.</p>

        <h3>Scalar-valued function</h3>
        <p>A scalar-valued function maps a vector to one number:</p>
        <p>\[f:\mathbb{R}^n\to\mathbb{R}.\]</p>
        <p>For example,</p>
        <p>\[f(x_1,x_2)=x_1^2+2x_1x_2+3x_2^2.\]</p>
        <p>A loss function is usually scalar-valued. It can depend on a large parameter vector \(\theta\in\mathbb{R}^p\), but it returns one loss value \(L(\theta)\in\mathbb{R}\).</p>

        <h3>Vector-valued function</h3>
        <p>A vector-valued function maps a vector to another vector:</p>
        <p>\[g:\mathbb{R}^n\to\mathbb{R}^m.\]</p>
        <p>For example,</p>
        <p>\[g(x_1,x_2)=\begin{bmatrix}x_1+x_2\\x_1x_2\\x_2^2\end{bmatrix}.\]</p>
        <p>Here the input dimension is \(2\), and the output dimension is \(3\).</p>

        <table>
          <thead><tr><th>Function</th><th>Typical derivative object</th><th>Common ML example</th></tr></thead>
          <tbody>
            <tr><td>\(f:\mathbb{R}^n\to\mathbb{R}\)</td><td>Gradient \(\nabla f\in\mathbb{R}^n\)</td><td>Loss with respect to parameters</td></tr>
            <tr><td>\(g:\mathbb{R}^n\to\mathbb{R}^m\)</td><td>Jacobian \(J_g\in\mathbb{R}^{m\times n}\)</td><td>Layer outputs with respect to layer inputs</td></tr>
          </tbody>
        </table>
        <div class="shape-check">
          <strong>Shape rule.</strong> First count outputs. Then count inputs. Under the convention used in this course, a Jacobian has one row per output and one column per input.
        </div>
      `
    },
    {
      id: "partials",
      title: "3. Partial derivatives change one independent variable at a time",
      html: String.raw`
        <p>Suppose</p>
        <p>\[f(x,y)=x^2+3xy.\]</p>
        <p>The partial derivative with respect to \(x\) changes \(x\) and temporarily treats \(y\) as a constant:</p>
        <p>\[\frac{\partial f}{\partial x}=2x+3y.\]</p>
        <p>The partial derivative with respect to \(y\) changes \(y\) and treats \(x\) as a constant:</p>
        <p>\[\frac{\partial f}{\partial y}=3x.\]</p>
        <p>At \((x,y)=(2,1)\),</p>
        <p>\[\frac{\partial f}{\partial x}=7,\qquad \frac{\partial f}{\partial y}=6.\]</p>
        <p>Near this point, a small increase of \(x\) changes \(f\) about \(7\) times as much as the increase. A small increase of \(y\) changes \(f\) about \(6\) times as much as the increase.</p>

        <h3>What does “independent variable” mean?</h3>
        <p>When \(x\) and \(y\) are independent coordinates of the function input, changing \(x\) does not force a change in \(y\). This is why a partial derivative can hold one coordinate fixed.</p>
        <p>But some symbols in a paper can depend on other symbols. If \(y=y(x)\), then differentiating \(f(x,y(x))\) with respect to \(x\) must include the effect through \(y\). That is a total derivative or chain-rule calculation, not only a partial derivative.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> If \(L(w_1,w_2,\ldots,w_p)\) is a loss, then \(\partial L/\partial w_j\) asks how the loss changes when parameter \(w_j\) changes while the other parameter coordinates are held fixed locally.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> The symbol \(\partial\) does not mean “an approximate derivative.” It marks a derivative with respect to one coordinate of a multivariable function.
        </div>
      `
    },
    {
      id: "gradient",
      title: "4. The gradient collects all first-order sensitivities of a scalar output",
      html: String.raw`
        <p>For a scalar-valued function \(f:\mathbb{R}^n\to\mathbb{R}\), the <strong>gradient</strong> collects all first partial derivatives:</p>
        <p>\[\nabla f(x)=
        \begin{bmatrix}
        \partial f/\partial x_1\\
        \partial f/\partial x_2\\
        \vdots\\
        \partial f/\partial x_n
        \end{bmatrix}.\]</p>
        <p>For</p>
        <p>\[f(x,y)=x^2+3xy,\]</p>
        <p>the gradient is</p>
        <p>\[\nabla f(x,y)=\begin{bmatrix}2x+3y\\3x\end{bmatrix}.\]</p>
        <p>At \((2,1)\),</p>
        <p>\[\nabla f(2,1)=\begin{bmatrix}7\\6\end{bmatrix}.\]</p>

        <h3>Gradient shape</h3>
        <p>If \(x\in\mathbb{R}^n\) and \(f(x)\in\mathbb{R}\), then</p>
        <p>\[\nabla_x f\in\mathbb{R}^n.\]</p>
        <p>In implementation terms, the gradient has the same parameter shape as the object it differentiates with respect to. A scalar loss differentiated with respect to a \(4\times3\) weight matrix produces a \(4\times3\) parameter gradient.</p>

        <h3>Why gradient descent uses the negative gradient</h3>
        <p>The gradient points in the direction of fastest local increase. Therefore, gradient descent uses</p>
        <p>\[\theta_{t+1}=\theta_t-\eta\nabla_\theta L(\theta_t),\]</p>
        <p>where \(\eta>0\) is the learning rate.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> When an optimization paper writes \(g_t=\nabla L(\theta_t)\), the symbol \(g_t\) is usually a vector or a structured collection with one derivative for each parameter. It is not one scalar slope.
        </div>
      `
    },
    {
      id: "directional-derivative",
      title: "5. Directional derivatives ask: what happens if I move this way?",
      html: String.raw`
        <p>A partial derivative moves along one coordinate axis. A <strong>directional derivative</strong> can move along any direction.</p>
        <p>Let \(u\in\mathbb{R}^n\) be a unit vector. The directional derivative of scalar-valued \(f\) at \(x\) in direction \(u\) is</p>
        <p>\[D_u f(x)=\nabla f(x)^\top u.\]</p>
        <p>Use the previous gradient</p>
        <p>\[\nabla f(2,1)=\begin{bmatrix}7\\6\end{bmatrix}.\]</p>
        <p>Choose the unit direction</p>
        <p>\[u=\frac{1}{5}\begin{bmatrix}3\\4\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[D_u f(2,1)=\begin{bmatrix}7&6\end{bmatrix}\frac15\begin{bmatrix}3\\4\end{bmatrix}=\frac{45}{5}=9.\]</p>
        <p>If we move a small distance \(\varepsilon\) in that direction, the function changes by about \(9\varepsilon\).</p>

        <h3>Why the gradient gives the steepest direction</h3>
        <p>For unit \(u\), Cauchy-Schwarz gives</p>
        <p>\[\nabla f^\top u\le \|\nabla f\|_2\|u\|_2=\|\nabla f\|_2.\]</p>
        <p>The maximum occurs when \(u\) points in the same direction as \(\nabla f\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Adversarial-example papers often ask how much a loss changes under a small input perturbation. Directional derivatives and gradient norms describe this local sensitivity.
        </div>
      `
    },
    {
      id: "level-sets",
      title: "6. Level sets make gradient geometry visible",
      html: String.raw`
        <p>A <strong>level set</strong> contains all inputs that give the same function value:</p>
        <p>\[\{x:f(x)=c\}.\]</p>
        <p>For</p>
        <p>\[f(x,y)=x^2+y^2,\]</p>
        <p>the level set \(f(x,y)=4\) is</p>
        <p>\[x^2+y^2=4,\]</p>
        <p>a circle of radius \(2\).</p>
        <p>The gradient is</p>
        <p>\[\nabla f=\begin{bmatrix}2x\\2y\end{bmatrix}.\]</p>
        <p>At \((2,0)\), the gradient points right. The circle’s tangent points vertically. These directions are perpendicular.</p>
        <div class="definition">
          <strong>Geometric fact.</strong> At a regular point, the gradient is perpendicular to the local level set.
        </div>
        <p>This happens because movement along a level set gives almost no first-order change in \(f\). A tangent direction \(t\) therefore satisfies</p>
        <p>\[\nabla f(x)^\top t=0.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Contour plots of a loss surface are level sets. Gradient descent crosses contours approximately at right angles because the negative gradient points toward the fastest local decrease.
        </div>
      `
    },
    {
      id: "total-derivative",
      title: "7. The total derivative combines all first-order input changes",
      html: String.raw`
        <p>Suppose \(f(x,y)\) is scalar-valued and both inputs change by small amounts \(dx\) and \(dy\). The total first-order change is</p>
        <p>\[df\approx \frac{\partial f}{\partial x}dx+\frac{\partial f}{\partial y}dy.\]</p>
        <p>In vector form,</p>
        <p>\[df\approx \nabla f(x)^\top dx.\]</p>
        <p>This formula is the multivariable version of</p>
        <p>\[dy\approx f'(x)dx.\]</p>

        <h3>Example</h3>
        <p>Let</p>
        <p>\[f(x,y)=x^2+3xy.\]</p>
        <p>At \((2,1)\), the gradient is \((7,6)^\top\). If</p>
        <p>\[dx=0.01,\qquad dy=-0.02,\]</p>
        <p>then</p>
        <p>\[df\approx 7(0.01)+6(-0.02)=-0.05.\]</p>
        <p>The local model predicts that the output decreases by about \(0.05\).</p>

        <h3>Total derivative through dependent variables</h3>
        <p>If \(y=y(x)\), then \(f(x,y(x))\) changes through both paths:</p>
        <p>\[\frac{df}{dx}=\frac{\partial f}{\partial x}+\frac{\partial f}{\partial y}\frac{dy}{dx}.\]</p>
        <div class="paper-connection">
          <strong>Backpropagation connection.</strong> Computation graphs repeatedly apply this idea. If a variable affects a later result through several paths, the total derivative includes all path contributions.
        </div>
      `
    },
    {
      id: "local-linearization",
      title: "8. A derivative is a local linear approximation",
      html: String.raw`
        <p>The most useful interpretation of a derivative is not “slope.” It is “best local linear model.”</p>
        <p>For a scalar-valued function, near a point \(x_0\),</p>
        <p>\[f(x_0+\Delta x)\approx f(x_0)+\nabla f(x_0)^\top\Delta x.\]</p>
        <p>For</p>
        <p>\[f(x,y)=x^2+y^2,\qquad x_0=(1,2),\]</p>
        <p>we have</p>
        <p>\[f(x_0)=5,\qquad \nabla f(x_0)=\begin{bmatrix}2\\4\end{bmatrix}.\]</p>
        <p>Take</p>
        <p>\[\Delta x=\begin{bmatrix}0.1\\-0.05\end{bmatrix}.\]</p>
        <p>The linear approximation gives</p>
        <p>\[f(x_0+\Delta x)\approx 5+\begin{bmatrix}2&4\end{bmatrix}\begin{bmatrix}0.1\\-0.05\end{bmatrix}=5.\]</p>
        <p>The exact value at \((1.1,1.95)\) is</p>
        <p>\[1.1^2+1.95^2=5.0125.\]</p>
        <p>The error is small because the input change is small.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> First-order optimization methods assume that the local gradient is informative over the next update step. Very large learning rates fail partly because the local linear model stops being accurate far from the current point.
        </div>
      `
    },
    {
      id: "jacobian",
      title: "9. Jacobians are local linear maps for vector-valued functions",
      html: String.raw`
        <p>Let</p>
        <p>\[g:\mathbb{R}^n\to\mathbb{R}^m.\]</p>
        <p>Write the outputs as</p>
        <p>\[g(x)=\begin{bmatrix}g_1(x)\\g_2(x)\\\vdots\\g_m(x)\end{bmatrix}.\]</p>
        <p>The Jacobian is</p>
        <p>\[J_g(x)=
        \begin{bmatrix}
        \frac{\partial g_1}{\partial x_1}&\cdots&\frac{\partial g_1}{\partial x_n}\\
        \vdots&\ddots&\vdots\\
        \frac{\partial g_m}{\partial x_1}&\cdots&\frac{\partial g_m}{\partial x_n}
        \end{bmatrix}.\]</p>
        <p>Under this convention,</p>
        <p>\[J_g\in\mathbb{R}^{m\times n}.\]</p>

        <h3>Concrete example</h3>
        <p>Let</p>
        <p>\[g(x,y)=\begin{bmatrix}x+y\\xy\\x^2\end{bmatrix}.\]</p>
        <p>Then</p>
        <p>\[J_g(x,y)=
        \begin{bmatrix}
        1&1\\
        y&x\\
        2x&0
        \end{bmatrix}.\]</p>
        <p>At \((2,3)\),</p>
        <p>\[J_g(2,3)=\begin{bmatrix}1&1\\3&2\\4&0\end{bmatrix}.\]</p>
        <p>A small input change \(\Delta x\in\mathbb{R}^2\) produces the local output change</p>
        <p>\[\Delta g\approx J_g\Delta x\in\mathbb{R}^3.\]</p>

        <h3>Shape check</h3>
        <p>If a neural layer maps \(h\in\mathbb{R}^{d_{in}}\) to \(z\in\mathbb{R}^{d_{out}}\), then its Jacobian has shape</p>
        <p>\[d_{out}\times d_{in}.\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Backpropagation rarely materializes a full large Jacobian. Instead, automatic differentiation computes products such as vector-Jacobian products efficiently. But the Jacobian concept still tells you what local linear map is being applied.
        </div>
        <div class="shape-check">
          <strong>Notation warning.</strong> Some authors transpose the Jacobian convention. Always inspect one entry definition such as \(J_{ij}=\partial g_i/\partial x_j\) before relying on shape memory.
        </div>
      `
    },
    {
      id: "hessian",
      title: "10. Hessians describe how the gradient changes",
      html: String.raw`
        <p>For a twice-differentiable scalar-valued function \(f:\mathbb{R}^n\to\mathbb{R}\), the Hessian is the matrix of second partial derivatives:</p>
        <p>\[H_f(x)=\nabla^2 f(x),\]</p>
        <p>with entries</p>
        <p>\[(H_f)_{ij}=\frac{\partial^2 f}{\partial x_i\partial x_j}.\]</p>
        <p>The Hessian has shape</p>
        <p>\[H_f\in\mathbb{R}^{n\times n}.\]</p>

        <h3>Example</h3>
        <p>Let</p>
        <p>\[f(x,y)=x^2+3xy+4y^2.\]</p>
        <p>The gradient is</p>
        <p>\[\nabla f=\begin{bmatrix}2x+3y\\3x+8y\end{bmatrix}.\]</p>
        <p>Differentiate again:</p>
        <p>\[H_f=\begin{bmatrix}2&3\\3&8\end{bmatrix}.\]</p>
        <p>The off-diagonal entries are <strong>mixed partial derivatives</strong>:</p>
        <p>\[\frac{\partial^2 f}{\partial y\partial x}=3,\qquad
        \frac{\partial^2 f}{\partial x\partial y}=3.\]</p>
        <p>Under standard smoothness conditions, these mixed partials are equal. This is why Hessians are often symmetric.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Hessian eigenvalues describe local curvature of a loss surface. Optimization papers use them to discuss sharp directions, flat directions, saddle points, conditioning, and second-order methods.
        </div>
        <div class="shape-check">
          <strong>Common mistake.</strong> A Hessian is not the same object as a Jacobian of a vector-valued model output. A Hessian is a second derivative of a scalar-valued function.
        </div>
      `
    },
    {
      id: "taylor-curvature",
      title: "11. Taylor expansion adds curvature to the local model",
      html: String.raw`
        <p>The first-order local model uses only the gradient. A second-order Taylor expansion also uses the Hessian:</p>
        <p>\[f(x+\Delta x)\approx f(x)+\nabla f(x)^\top\Delta x+
        \frac12\Delta x^\top H_f(x)\Delta x.\]</p>
        <p>The quadratic term describes local curvature.</p>

        <h3>One-dimensional reminder</h3>
        <p>For \(f(x)=x^2\), the second derivative is \(2\). The graph bends upward. For \(f(x)=-x^2\), the second derivative is \(-2\). The graph bends downward.</p>

        <h3>Several dimensions</h3>
        <p>Curvature now depends on direction. For a unit direction \(u\), the local second-order curvature is</p>
        <p>\[u^\top H_f u.\]</p>
        <p>If</p>
        <p>\[H=\begin{bmatrix}10&0\\0&1\end{bmatrix},\]</p>
        <p>then the \(x_1\) direction has much stronger curvature than the \(x_2\) direction.</p>
        <div class="paper-connection">
          <strong>Optimization connection.</strong> Newton’s method uses curvature information:
          <p>\[\theta_{t+1}=\theta_t-H^{-1}\nabla L.\]</p>
          <p>The inverse Hessian rescales the gradient according to local curvature. Modern large models rarely form the full Hessian, but many methods approximate or use Hessian-vector products.</p>
        </div>
      `
    },
    {
      id: "stationary-points",
      title: "12. Stationary points can be minima, maxima, or saddles",
      html: String.raw`
        <p>A <strong>stationary point</strong> of a differentiable scalar function satisfies</p>
        <p>\[\nabla f(x^*)=0.\]</p>
        <p>This condition says that there is no first-order change in any direction. It does not tell you what type of point you have.</p>

        <h3>Local minimum</h3>
        <p>For</p>
        <p>\[f(x,y)=x^2+y^2,\]</p>
        <p>the gradient is zero at \((0,0)\), and the Hessian is</p>
        <p>\[H=\begin{bmatrix}2&0\\0&2\end{bmatrix}.\]</p>
        <p>Every Hessian eigenvalue is positive, so the function bends upward in every direction. This is a strict local minimum.</p>

        <h3>Local maximum</h3>
        <p>For</p>
        <p>\[f(x,y)=-x^2-y^2,\]</p>
        <p>the Hessian eigenvalues are negative. The function bends downward in every direction. The origin is a strict local maximum.</p>

        <h3>Saddle point</h3>
        <p>For</p>
        <p>\[f(x,y)=x^2-y^2,\]</p>
        <p>the gradient is zero at the origin, but</p>
        <p>\[H=\begin{bmatrix}2&0\\0&-2\end{bmatrix}.\]</p>
        <p>One direction bends upward and another bends downward. The origin is a saddle point.</p>
        <div class="paper-connection">
          <strong>Deep-learning connection.</strong> High-dimensional nonconvex loss surfaces can contain many saddle-like regions. A zero or small gradient does not by itself prove that training has reached a useful minimum.
        </div>
      `
    },
    {
      id: "nondifferentiable",
      title: "13. Nondifferentiable points still appear in useful ML models",
      html: String.raw`
        <p>A function is not differentiable at a point when one local linear map cannot describe all sufficiently small directions around that point.</p>
        <p>The classic example is</p>
        <p>\[f(x)=|x|.\]</p>
        <p>For \(x<0\), the derivative is \(-1\). For \(x>0\), the derivative is \(1\). At \(x=0\), the left and right derivatives disagree.</p>

        <h3>ReLU</h3>
        <p>ReLU is</p>
        <p>\[\operatorname{ReLU}(x)=\max(0,x).\]</p>
        <p>Its derivative is</p>
        <p>\[\operatorname{ReLU}'(x)=
        \begin{cases}
        0,&x<0,\\
        1,&x>0.
        \end{cases}\]</p>
        <p>At \(x=0\), the ordinary derivative is not defined.</p>
        <p>Deep-learning libraries choose a convenient derivative value at this single point, often \(0\). This engineering convention does not make the mathematical function differentiable there.</p>

        <h3>Subgradient intuition</h3>
        <p>For a convex nondifferentiable function, a <strong>subgradient</strong> is a slope that defines a supporting linear lower bound. For \(f(x)=|x|\) at \(0\), every value</p>
        <p>\[g\in[-1,1]\]</p>
        <p>is a valid subgradient.</p>
        <p>The subdifferential is therefore</p>
        <p>\[\partial |x|\big|_{x=0}=[-1,1].\]</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> L1 regularization uses \(\|w\|_1\), which is nondifferentiable when a coordinate is zero. Subgradient methods and proximal methods handle this structure without requiring an ordinary derivative everywhere.
        </div>
        <div class="shape-check">
          <strong>Notation warning.</strong> The symbol \(\partial f\) can mean a partial derivative in one context and a subdifferential in convex analysis. The surrounding definition tells you which meaning is intended.
        </div>
      `
    },
    {
      id: "ml-equation",
      title: "14. Read one realistic ML objective with all the new objects",
      html: String.raw`
        <p>Consider linear regression with parameter vector \(w\in\mathbb{R}^d\), data matrix \(X\in\mathbb{R}^{N\times d}\), and targets \(y\in\mathbb{R}^N\):</p>
        <p>\[L(w)=\frac{1}{2N}\|Xw-y\|_2^2.\]</p>
        <p>The prediction vector is</p>
        <p>\[\hat y=Xw\in\mathbb{R}^N.\]</p>
        <p>The residual is</p>
        <p>\[r=Xw-y\in\mathbb{R}^N.\]</p>
        <p>The loss is scalar.</p>

        <h3>Gradient</h3>
        <p>The gradient is</p>
        <p>\[\nabla_w L=\frac{1}{N}X^\top(Xw-y).\]</p>
        <p>Check the shape:</p>
        <p>\[X^\top:d\times N,\qquad (Xw-y):N\times1,\]</p>
        <p>so</p>
        <p>\[\nabla_w L:d\times1.\]</p>
        <p>This matches the shape of \(w\).</p>

        <h3>Hessian</h3>
        <p>Differentiate the gradient:</p>
        <p>\[H_L=\frac{1}{N}X^\top X.\]</p>
        <p>Its shape is \(d\times d\). It is positive semidefinite. Therefore, the least-squares objective is convex.</p>

        <h3>Local model</h3>
        <p>For a small update \(\Delta w\),</p>
        <p>\[L(w+\Delta w)\approx L(w)+\nabla L(w)^\top\Delta w+
        \frac12\Delta w^\top H_L\Delta w.\]</p>
        <p>This one equation combines gradient, Hessian, Taylor expansion, and curvature.</p>
        <div class="paper-connection">
          <strong>Paper-reading habit.</strong> When you see a derivative in an ML paper, annotate the equation with shapes first. Then ask whether the author is using first-order sensitivity, a local linear map, or second-order curvature.
        </div>
      `
    },
    {
      id: "common-mistakes",
      title: "15. Common mistakes and misleading notation",
      html: String.raw`
        <ul>
          <li><strong>Confusing partial and total derivatives.</strong> A partial derivative holds other independent coordinates fixed. A total derivative follows all dependencies.</li>
          <li><strong>Thinking a gradient is a scalar slope.</strong> For \(f:\mathbb{R}^n\to\mathbb{R}\), the gradient has \(n\) components.</li>
          <li><strong>Ignoring Jacobian convention.</strong> Some authors use the transpose of the convention in this course.</li>
          <li><strong>Assuming \(\nabla f=0\) means minimum.</strong> The point can be a maximum, saddle, or flat stationary point.</li>
          <li><strong>Assuming equal mixed partials always.</strong> Equality requires suitable smoothness conditions.</li>
          <li><strong>Using a Hessian without checking its role.</strong> A Hessian describes local second-order behavior, not global convexity unless the required condition holds everywhere.</li>
          <li><strong>Forgetting shapes in chain rules.</strong> A valid derivative product must have compatible dimensions.</li>
          <li><strong>Treating a Taylor approximation as exact.</strong> The omitted higher-order terms matter when the step is large.</li>
          <li><strong>Assuming nondifferentiable means unusable.</strong> ReLU and L1 regularization are useful despite kinks.</li>
          <li><strong>Confusing \(\partial f/\partial x\) with \(\partial f\).</strong> The second notation can denote a subdifferential in convex analysis.</li>
        </ul>
      `
    },
    {
      id: "recap",
      title: "16. Recap: identify the derivative object before you calculate it",
      html: String.raw`
        <p>Multivariable calculus becomes manageable when you classify the function first.</p>
        <table>
          <thead><tr><th>Question</th><th>Object</th><th>Typical shape</th></tr></thead>
          <tbody>
            <tr><td>How does one scalar output change with all input coordinates?</td><td>Gradient</td><td>\(n\)</td></tr>
            <tr><td>How does an \(m\)-vector output change with an \(n\)-vector input?</td><td>Jacobian</td><td>\(m\times n\)</td></tr>
            <tr><td>How does the gradient of a scalar function change?</td><td>Hessian</td><td>\(n\times n\)</td></tr>
            <tr><td>How does a scalar function change along one chosen direction?</td><td>Directional derivative</td><td>Scalar</td></tr>
          </tbody>
        </table>
        <p>The gradient gives first-order sensitivity. The Jacobian is the local linear map for vector outputs. The Hessian adds second-order curvature. Stationary points require more analysis than a zero gradient. Nondifferentiable points can still be handled with conventions, subgradients, or specialized optimization methods.</p>
        <div class="definition">
          <strong>Reading rule for papers.</strong> Before manipulating any derivative, write the function signature, such as \(f:\mathbb{R}^n\to\mathbb{R}\) or \(g:\mathbb{R}^n\to\mathbb{R}^m\). The derivative shape usually follows immediately.
        </div>
      `
    }
  ],
  examples: [
    ["Partial derivatives at one point", String.raw`For \(f(x,y)=x^2+xy+y^2\), \(\partial f/\partial x=2x+y\) and \(\partial f/\partial y=x+2y\). At \((1,2)\), these values are \(4\) and \(5\).`],
    ["Gradient shape", String.raw`If \(L:\mathbb{R}^{20}\to\mathbb{R}\), then \(\nabla L\in\mathbb{R}^{20}\). There is one first-order sensitivity for each input coordinate.`],
    ["Directional derivative", String.raw`If \(\nabla f=(3,4)^\top\) and \(u=(1,0)^\top\), then \(D_u f=3\). If \(u=(0,1)^\top\), then \(D_u f=4\).`],
    ["Steepest direction", String.raw`For \(\nabla f=(3,4)^\top\), the gradient norm is \(5\). The unit gradient direction is \((3/5,4/5)^\top\), and the directional derivative there is \(5\), the largest possible value among unit directions.`],
    ["Level set", String.raw`For \(f(x,y)=x+y\), the level set \(f=3\) is the line \(x+y=3\). The gradient \((1,1)^\top\) is perpendicular to that line.`],
    ["Total differential", String.raw`For \(f(x,y)=xy\), at \((2,3)\), \(df\approx 3\,dx+2\,dy\). If \(dx=0.1\) and \(dy=-0.05\), then \(df\approx0.2\).`],
    ["Jacobian shape", String.raw`If \(g:\mathbb{R}^4\to\mathbb{R}^3\), then under the course convention \(J_g\in\mathbb{R}^{3\times4}\).`],
    ["Jacobian calculation", String.raw`For \(g(x,y)=(x^2,xy)^\top\), \(J_g=\begin{bmatrix}2x&0\\y&x\end{bmatrix}\). At \((2,3)\), \(J_g=\begin{bmatrix}4&0\\3&2\end{bmatrix}\).`],
    ["Hessian calculation", String.raw`For \(f(x,y)=x^2+2xy+5y^2\), \(H_f=\begin{bmatrix}2&2\\2&10\end{bmatrix}\).`],
    ["Second-order direction", String.raw`If \(H=\operatorname{diag}(8,2)\), curvature along \(e_1\) is \(e_1^\top He_1=8\), while curvature along \(e_2\) is \(2\).`],
    ["Saddle recognition", String.raw`For \(f(x,y)=x^2-4y^2\), the origin has zero gradient. The Hessian has eigenvalues \(2\) and \(-8\), so the origin is a saddle.`],
    ["ReLU kink", String.raw`For \(x=-0.1\), ReLU derivative is \(0\). For \(x=0.1\), it is \(1\). The ordinary derivative is undefined at exactly \(0\).`],
    ["L1 subgradient", String.raw`For \(f(w)=|w|\), the derivative is \(-1\) for \(w<0\) and \(1\) for \(w>0\). At \(w=0\), any \(g\in[-1,1]\) is a valid subgradient.`],
    ["Least-squares gradient shape", String.raw`If \(X\in\mathbb{R}^{100\times10}\) and \(w\in\mathbb{R}^{10}\), then \(X^\top(Xw-y)\in\mathbb{R}^{10}\), matching the shape of \(w\).`]
  ],
  practice: [
    String.raw`For \(f(x,y)=3x^2+2xy-y^2\), find \(\partial f/\partial x\) and \(\partial f/\partial y\). <details><summary>Show answer</summary><p>\(\partial f/\partial x=6x+2y\) and \(\partial f/\partial y=2x-2y\).</p></details>`,
    String.raw`For the same function, find \(\nabla f(1,2)\). <details><summary>Show answer</summary><p>At \((1,2)\), the gradient is \((10,-2)^\top\).</p></details>`,
    String.raw`If \(\nabla f=(6,8)^\top\), what is the directional derivative in the unit direction \(u=(3/5,4/5)^\top\)? <details><summary>Show answer</summary><p>\(D_u f=6(3/5)+8(4/5)=10\).</p></details>`,
    String.raw`For \(f(x,y)=x^2+y^2\), why is the gradient perpendicular to the circle \(x^2+y^2=c\)? <details><summary>Show answer</summary><p>A tangent direction changes \(f\) by zero to first order, so its dot product with \(\nabla f\) is zero.</p></details>`,
    String.raw`For \(g:\mathbb{R}^5\to\mathbb{R}^2\), state the Jacobian shape under the course convention. <details><summary>Show answer</summary><p>\(J_g\in\mathbb{R}^{2\times5}\).</p></details>`,
    String.raw`Find the Jacobian of \(g(x,y)=(x+y,x-y,xy)^\top\). <details><summary>Show answer</summary><p>\(J_g=\begin{bmatrix}1&1\\1&-1\\y&x\end{bmatrix}\).</p></details>`,
    String.raw`Find the Hessian of \(f(x,y)=x^2+4xy+3y^2\). <details><summary>Show answer</summary><p>\(H_f=\begin{bmatrix}2&4\\4&6\end{bmatrix}\).</p></details>`,
    String.raw`A point has \(\nabla f=0\) and Hessian eigenvalues \(5\) and \(2\). What type of local point is it under the usual second-order conditions? <details><summary>Show answer</summary><p>A strict local minimum, because all Hessian eigenvalues are positive.</p></details>`,
    String.raw`A point has \(\nabla f=0\) and Hessian eigenvalues \(4\) and \(-1\). What does this indicate? <details><summary>Show answer</summary><p>A saddle point, because curvature has opposite signs in different directions.</p></details>`,
    String.raw`For \(f(x)=|x|\), is the ordinary derivative defined at \(x=0\)? Give the subgradient set. <details><summary>Show answer</summary><p>No. The subgradient set at zero is \([-1,1]\).</p></details>`,
    String.raw`Let \(X\in\mathbb{R}^{N\times d}\), \(w\in\mathbb{R}^{d}\), and \(L(w)=\frac{1}{2N}\|Xw-y\|_2^2\). What is the shape of \(\nabla_w L\)? <details><summary>Show answer</summary><p>It has shape \(d\), the same as \(w\).</p></details>`,
    String.raw`In the same least-squares problem, what is the Hessian? <details><summary>Show answer</summary><p>\(H=\frac{1}{N}X^\top X\), with shape \(d\times d\).</p></details>`,
    String.raw`Explain the difference between a partial derivative and a total derivative in one sentence. <details><summary>Show answer</summary><p>A partial derivative changes one independent coordinate while holding the others fixed; a total derivative includes all paths through which the underlying variable changes the result.</p></details>`,
    String.raw`Why can a very large gradient-descent step make the gradient direction unreliable? <details><summary>Show answer</summary><p>The gradient is a local first-order model. Far from the current point, curvature and higher-order terms can make that local model inaccurate.</p></details>`
  ]
});
