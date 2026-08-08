const day1 = COURSE[0].lessons[0];
const raw = String.raw;

Object.assign(day1, {
  published: true,
  summary: "Learn the notation that AI and ML papers use. Use a repeatable method to read equations without fear or guesswork.",
  explanation: "Mathematical notation is a compact language. Do not read a dense equation in one jump. First identify the objects. Then identify the operation. Next, check each type or shape. Finally, test the statement with small numbers. This method turns a difficult-looking line into a sequence of simple steps.",
  topics: [
    "Sets, subsets, tuples, sequences, and indexed collections",
    "Functions as mappings",
    "Domain, codomain, range, and function composition",
    "Scalar, vector, matrix, and tensor notation",
    "Subscripts, superscripts, and overloaded notation",
    "Summation notation and double sums",
    "Product notation",
    "Exponentials and logarithms",
    "Indicator functions",
    "Piecewise-defined functions",
    "Norm notation",
    "Expectation notation",
    "Minimum, maximum, argmin, and argmax",
    "Proportionality and approximation symbols",
    "Big-O notation",
    "Dimensions and shape compatibility",
    "A complete reading of a common ML objective"
  ],
  sections: [
    {
      id: "reading-routine",
      title: "1. Use a five-step equation-reading routine",
      html: raw`
        <p>Many learners think that they have a mathematics problem. Often, they first have a notation problem. A paper can compress a full paragraph into one equation. The equation looks difficult because each symbol carries information.</p>
        <p>Use the same five steps every time you meet a new equation.</p>
        <ol>
          <li><strong>Name every object.</strong> Decide whether it is a number, vector, matrix, tensor, set, function, probability, parameter, or index.</li>
          <li><strong>Write its type or shape.</strong> Examples are \(x\in\mathbb{R}^d\), \(W\in\mathbb{R}^{d\times h}\), and \(L\in\mathbb{R}\).</li>
          <li><strong>Identify the operations.</strong> Look for a sum, product, transpose, norm, expectation, logarithm, or optimization operator.</li>
          <li><strong>Say the equation in words.</strong> Do this before you change the equation.</li>
          <li><strong>Test a small case.</strong> Replace large dimensions with two or three entries. Calculate the result by hand.</li>
        </ol>
        <div class="mini-example">
          <strong>Small first example.</strong> Consider \(\theta^*=\arg\min_\theta L(\theta)\). Read it as: “Find the value of \(\theta\) that gives the smallest value of the loss \(L\).” The expression does not return the smallest loss. It returns the parameter that produces that loss.
        </div>
        <p>This routine is important for AI and ML papers. Many papers use familiar ideas, but the notation is compact. A careful reader expands the compact notation before doing algebra.</p>
      `
    },
    {
      id: "sets-and-collections",
      title: "2. Sets, tuples, sequences, and indexed collections",
      html: raw`
        <h3>Sets</h3>
        <p>A <strong>set</strong> is a collection of distinct objects. Order does not matter. Therefore, \(\{1,2,3\}=\{3,2,1\}\).</p>
        <p>The symbol \(x\in A\) means that \(x\) is an element of the set \(A\). The symbol \(A\subseteq B\) means that every element of \(A\) is also an element of \(B\).</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> A classification paper can define the class set as \(\mathcal{Y}=\{1,2,\ldots,K\}\). This says that each label is one of \(K\) possible class identifiers.
        </div>

        <h3>Tuples</h3>
        <p>A <strong>tuple</strong> is an ordered list. Order matters. Thus, \((1,2)\ne(2,1)\). A supervised training example is often the tuple \((x,y)\), where \(x\) is the input and \(y\) is the target.</p>

        <h3>Sequences</h3>
        <p>A <strong>sequence</strong> is an ordered collection. It is usually indexed. We can write it as \((x_1,x_2,\ldots,x_n)\). Language models process token sequences. Time-series models process observations in time order.</p>

        <h3>Indexed collections</h3>
        <p>The notation \(\{x_i\}_{i=1}^{n}\) means “the collection of objects \(x_1,x_2,\ldots,x_n\).” The braces can suggest a set, but many authors use them informally for an indexed data collection. Read the surrounding definition.</p>
        <p>A training set is often written as</p>
        <p>\[\mathcal{D}=\{(x_i,y_i)\}_{i=1}^{N}.\]</p>
        <p>This line says that the data set contains \(N\) input-target pairs.</p>
      `
    },
    {
      id: "functions",
      title: "3. Functions, domain, codomain, range, and composition",
      html: raw`
        <div class="definition">
          A <strong>function</strong> assigns one output to each allowed input. The notation \(f:X\to Y\) says that \(f\) maps inputs from \(X\) to outputs in \(Y\).
        </div>
        <p>The <strong>domain</strong> is the set of allowed inputs. The <strong>codomain</strong> is the declared output set. The <strong>range</strong> is the set of outputs that the function actually produces.</p>
        <p>Consider \(f(x)=x^2\) with \(f:\mathbb{R}\to\mathbb{R}\). The domain is \(\mathbb{R}\). The codomain is also \(\mathbb{R}\). The range is \([0,\infty)\), because a real square is never negative.</p>
        <p>The range can be smaller than the codomain. This difference is easy to miss.</p>

        <h3>Function composition</h3>
        <p>The notation \((f\circ g)(x)\) means \(f(g(x))\). Apply \(g\) first. Then apply \(f\).</p>
        <div class="mini-example">
          Let \(g(x)=2x+1\) and \(f(u)=u^2\). Then
          \[ (f\circ g)(x)=f(2x+1)=(2x+1)^2. \]
          For \(x=2\), the inner function gives \(g(2)=5\). The outer function gives \(f(5)=25\).
        </div>
        <div class="paper-connection">
          <strong>Neural-network connection.</strong> A network is a composition of functions. One layer can compute \(z=Wx+b\). An activation then computes \(a=\phi(z)\). The combined operation is \(a=\phi(Wx+b)\).
        </div>
        <p>When a paper writes \(f_\theta(x)\), read it as: “the function \(f\), controlled by parameters \(\theta\), applied to input \(x\).”</p>
      `
    },
    {
      id: "object-types",
      title: "4. Scalars, vectors, matrices, and tensors",
      html: raw`
        <h3>Scalar</h3>
        <p>A <strong>scalar</strong> is one number. Examples are a learning rate \(\eta\), a loss \(L\), and a probability \(p\).</p>

        <h3>Vector</h3>
        <p>A <strong>vector</strong> is an ordered list of numbers. A column vector with \(d\) real entries can be written as</p>
        <p>\[x=(x_1,x_2,\ldots,x_d)^\top\in\mathbb{R}^{d}.\]</p>
        <p>The transpose symbol \(^\top\) changes a row into a column or a column into a row.</p>

        <h3>Matrix</h3>
        <p>A <strong>matrix</strong> is a rectangular array. If \(W\in\mathbb{R}^{m\times n}\), then \(W\) has \(m\) rows and \(n\) columns.</p>
        <p>The entry in row \(i\) and column \(j\) is often written as \(W_{ij}\).</p>

        <h3>Tensor</h3>
        <p>A <strong>tensor</strong> is an array with one or more axes. In common ML usage, a vector is a one-axis tensor and a matrix is a two-axis tensor. An image batch can have four axes: batch, height, width, and channels.</p>
        <p>Do not confuse <strong>tensor rank</strong> with <strong>matrix rank</strong>. In software, tensor rank often means the number of axes. In linear algebra, matrix rank measures the number of independent directions.</p>

        <table>
          <thead><tr><th>Object</th><th>Typical notation</th><th>Example role in ML</th></tr></thead>
          <tbody>
            <tr><td>Scalar</td><td>\(L\in\mathbb{R}\)</td><td>One loss value</td></tr>
            <tr><td>Vector</td><td>\(x\in\mathbb{R}^{d}\)</td><td>One feature vector</td></tr>
            <tr><td>Matrix</td><td>\(X\in\mathbb{R}^{N\times d}\)</td><td>A batch of \(N\) examples</td></tr>
            <tr><td>Tensor</td><td>\(A\in\mathbb{R}^{B\times H\times W\times C}\)</td><td>A batch of images</td></tr>
          </tbody>
        </table>
        <div class="paper-connection">
          <strong>Paper connection.</strong> If a paper states \(X\in\mathbb{R}^{N\times d}\), it often means that each of the \(N\) rows is one example and each row has \(d\) features. Some papers use examples as columns instead. Check the convention before you continue.
        </div>
      `
    },
    {
      id: "indices",
      title: "5. Subscripts, superscripts, and overloaded notation",
      html: raw`
        <p>A <strong>subscript</strong> often selects an entry or an item. If \(x=(10,20,30)^\top\), then \(x_1=10\), \(x_2=20\), and \(x_3=30\).</p>
        <p>The same notation can have different meanings in different papers:</p>
        <ul>
          <li>\(x_i\) can mean coordinate \(i\) of one vector.</li>
          <li>\(x_i\) can mean training example \(i\).</li>
          <li>\(x_t\) can mean a value at time \(t\).</li>
          <li>\(h_j\) can mean hidden unit \(j\).</li>
        </ul>
        <p>A <strong>superscript</strong> can also have several meanings.</p>
        <ul>
          <li>\(x^2\) means a power.</li>
          <li>\(x^{(i)}\) often labels example \(i\).</li>
          <li>\(a^{(\ell)}\) often labels layer \(\ell\).</li>
          <li>\(A^\top\) means transpose.</li>
          <li>\(A^{-1}\) means inverse when the inverse exists.</li>
        </ul>
        <div class="shape-check">
          <strong>Reading warning.</strong> Never decide the meaning from position alone. Read the author’s definition. Parentheses around a superscript, as in \(x^{(i)}\), often show that it is a label and not a power.
        </div>
        <p>The symbol \(*\) is also overloaded. It can mean multiplication, convolution, an optimal value, or a special object. For example, \(\theta^*\) usually means an optimal parameter, not multiplication.</p>
      `
    },
    {
      id: "summations",
      title: "6. Summation notation",
      html: raw`
        <p>The symbol \(\sum\) means “add a sequence of terms.” The index below the symbol gives the start. The value above it gives the end.</p>
        <p>\[\sum_{i=1}^{4}x_i=x_1+x_2+x_3+x_4.\]</p>
        <p>If \(x=(2,5,1,4)\), then the sum is \(2+5+1+4=12\).</p>

        <h3>The index is temporary</h3>
        <p>In \(\sum_{i=1}^{n}x_i\), the symbol \(i\) is a local index. We can replace it with another unused symbol:</p>
        <p>\[\sum_{i=1}^{n}x_i=\sum_{j=1}^{n}x_j.\]</p>
        <p>The name of the index does not change the sum.</p>

        <h3>Expressions inside a sum</h3>
        <p>The summed term can be a full expression:</p>
        <p>\[\sum_{i=1}^{N}(\hat y_i-y_i)^2.\]</p>
        <p>This adds one squared error for each example.</p>

        <h3>Double sums</h3>
        <p>A double sum uses two indices. If \(A\in\mathbb{R}^{2\times2}\), then</p>
        <p>\[\sum_{i=1}^{2}\sum_{j=1}^{2}A_{ij}\]</p>
        <p>adds all four entries. For \(A=\begin{bmatrix}1&2\\3&4\end{bmatrix}\), the result is \(10\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> An empirical average loss is often written as \(\frac{1}{N}\sum_{i=1}^{N}L_i\). The sum collects losses. The factor \(1/N\) converts the sum into an average.
        </div>
      `
    },
    {
      id: "products-logs",
      title: "7. Product notation, exponentials, and logarithms",
      html: raw`
        <h3>Product notation</h3>
        <p>The symbol \(\prod\) means “multiply a sequence of terms.”</p>
        <p>\[\prod_{i=1}^{4}x_i=x_1x_2x_3x_4.\]</p>
        <p>If \(x=(2,3,4,5)\), then the product is \(120\).</p>
        <p>Products appear in probability because independent joint probabilities multiply. A likelihood can have the form</p>
        <p>\[p(\mathcal{D}\mid\theta)=\prod_{i=1}^{N}p(y_i\mid x_i,\theta).\]</p>

        <h3>Exponentials</h3>
        <p>The exponential function is \(e^x\). It is always positive. It appears in softmax, Gaussian distributions, logistic models, and energy-based models.</p>
        <p>Useful identities include \(e^{a+b}=e^ae^b\) and \(e^0=1\).</p>

        <h3>Logarithms</h3>
        <p>The natural logarithm \(\log x\) reverses the exponential: \(\log(e^x)=x\) for real \(x\).</p>
        <p>The most useful identity for ML is</p>
        <p>\[\log(ab)=\log a+\log b.\]</p>
        <p>Therefore,</p>
        <p>\[\log\left(\prod_{i=1}^{N}p_i\right)=\sum_{i=1}^{N}\log p_i.\]</p>
        <div class="paper-connection">
          <strong>Why papers use log-likelihood.</strong> The logarithm changes a product into a sum. Sums are easier to differentiate. They are also safer on a computer because a long product of small probabilities can underflow to zero.
        </div>
        <p>The logarithm is strictly increasing. Therefore, the value of \(\theta\) that maximizes a positive likelihood also maximizes its logarithm.</p>
      `
    },
    {
      id: "indicator-piecewise",
      title: "8. Indicator functions and piecewise-defined functions",
      html: raw`
        <h3>Indicator functions</h3>
        <p>An indicator function returns 1 when a condition is true and 0 when it is false.</p>
        <p>\[\mathbf{1}[x>0]=\begin{cases}1,&x>0\\0,&x\le 0.\end{cases}\]</p>
        <p>If \(x=-3\), the result is 0. If \(x=7\), the result is 1.</p>
        <p>Indicators can count events. For example,</p>
        <p>\[\sum_{i=1}^{N}\mathbf{1}[\hat y_i\ne y_i]\]</p>
        <p>counts the number of classification mistakes.</p>

        <h3>Piecewise functions</h3>
        <p>A piecewise function uses different rules in different regions. ReLU is a common example:</p>
        <p>\[\operatorname{ReLU}(x)=\begin{cases}x,&x>0\\0,&x\le 0.\end{cases}\]</p>
        <p>For \(x=5\), ReLU returns 5. For \(x=-2\), it returns 0.</p>
        <p>The notation can also be written as \(\max(0,x)\). These two forms define the same function.</p>
        <div class="paper-connection">
          <strong>Paper connection.</strong> Piecewise definitions are common in activation functions, robust losses, clipping rules, and optimization algorithms. Read each condition before you use the formula.
        </div>
      `
    },
    {
      id: "norms",
      title: "9. Norm notation",
      html: raw`
        <p>A <strong>norm</strong> measures the size of a vector. Different norms use different rules.</p>
        <h3>Euclidean norm</h3>
        <p>\[\|x\|_2=\sqrt{\sum_{i=1}^{d}x_i^2}.\]</p>
        <p>For \(x=(3,4)^\top\), the value is \(5\).</p>

        <h3>One-norm</h3>
        <p>\[\|x\|_1=\sum_{i=1}^{d}|x_i|.\]</p>
        <p>For \(x=(3,-4)^\top\), the value is \(7\).</p>

        <h3>Infinity norm</h3>
        <p>\[\|x\|_\infty=\max_i|x_i|.\]</p>
        <p>For \(x=(3,-4)^\top\), the value is \(4\).</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> Norms appear in regularization, distance measures, gradient clipping, optimization constraints, and generalization bounds. When you see \(\lambda\|w\|_2^2\), the term penalizes large weights.
        </div>
        <p>Do not confuse \(\|x\|_2\) with \(x^2\). A norm maps a vector to one nonnegative scalar.</p>
      `
    },
    {
      id: "expectation",
      title: "10. Expectation notation",
      html: raw`
        <p>An <strong>expectation</strong> is a probability-weighted average. The notation is \(\mathbb{E}[X]\).</p>
        <p>For a discrete random variable,</p>
        <p>\[\mathbb{E}[X]=\sum_x x\,p(X=x).\]</p>
        <p>Suppose a fair coin gives \(X=1\) for heads and \(X=0\) for tails. Then</p>
        <p>\[\mathbb{E}[X]=1(0.5)+0(0.5)=0.5.\]</p>
        <p>Suppose \(X\) is the outcome of a fair six-sided die. Then</p>
        <p>\[\mathbb{E}[X]=\frac{1+2+3+4+5+6}{6}=3.5.\]</p>
        <p>The expected value does not have to be a possible observed value. A die never shows 3.5, but its long-run average is 3.5.</p>
        <div class="paper-connection">
          <strong>ML connection.</strong> A population risk can be written as \(R(\theta)=\mathbb{E}_{(x,y)\sim p_{\text{data}}}[L(f_\theta(x),y)]\). This means: average the loss over the true data distribution.
        </div>
        <p>The subscript under an expectation tells you which distribution or random variable is being averaged.</p>
      `
    },
    {
      id: "optimization-symbols",
      title: "11. Minimum, maximum, argmin, argmax, approximation, and proportionality",
      html: raw`
        <h3>Minimum and argmin</h3>
        <p>The expression \(\min_x f(x)\) returns the smallest function value. The expression \(\arg\min_x f(x)\) returns the input value that produces the smallest function value.</p>
        <div class="mini-example">
          Let \(f(x)=(x-3)^2+2\). Then \(\min_x f(x)=2\), while \(\arg\min_x f(x)=3\).
        </div>
        <p>The same distinction applies to \(\max\) and \(\arg\max\).</p>
        <p>A classifier can use</p>
        <p>\[\hat y=\arg\max_k p(y=k\mid x).\]</p>
        <p>This means: choose the class index \(k\) with the largest predicted probability.</p>

        <h3>Approximation</h3>
        <p>The symbol \(\approx\) means “approximately equal.” A paper can use it for a numerical approximation, a Taylor approximation, or a large-sample approximation.</p>

        <h3>Proportionality</h3>
        <p>The symbol \(\propto\) means “equal up to a multiplicative constant.” If \(y\propto x^2\), then \(y=cx^2\) for some constant \(c\).</p>
        <p>Bayesian papers often write</p>
        <p>\[p(\theta\mid\mathcal{D})\propto p(\mathcal{D}\mid\theta)p(\theta).\]</p>
        <p>The omitted constant makes the posterior integrate or sum to 1.</p>
      `
    },
    {
      id: "complexity",
      title: "12. Big-O notation",
      html: raw`
        <p>Big-O notation describes how time or memory grows as the input size grows. It does not give an exact runtime.</p>
        <ul>
          <li>\(O(1)\): the work does not grow with \(n\).</li>
          <li>\(O(n)\): the work grows roughly in direct proportion to \(n\).</li>
          <li>\(O(n\log n)\): common for efficient sorting.</li>
          <li>\(O(n^2)\): common when every item interacts with every other item.</li>
          <li>\(O(n^3)\): common for some basic dense matrix algorithms.</li>
        </ul>
        <p>Big-O usually ignores constant factors and lower-order terms. Thus, \(3n^2+10n+7\) is \(O(n^2)\).</p>
        <div class="paper-connection">
          <strong>Attention connection.</strong> Standard full self-attention forms an \(n\times n\) score matrix for a sequence of length \(n\). This is one reason its sequence-length cost is often described as quadratic.
        </div>
        <p>A lower Big-O class is not always faster for every small input. Hardware, constants, and memory access also matter. Big-O describes growth, not the full performance story.</p>
      `
    },
    {
      id: "shape-checking",
      title: "13. Read dimensions and check shape compatibility",
      html: raw`
        <p>Shape checking is one of the fastest ways to reject an invalid expression. Do it before you calculate numbers.</p>
        <h3>Matrix-vector multiplication</h3>
        <p>Let \(W\in\mathbb{R}^{m\times d}\) and \(x\in\mathbb{R}^{d}\). Then</p>
        <p>\[Wx\in\mathbb{R}^{m}.\]</p>
        <p>The inner dimensions match: \(d\) and \(d\). The outer dimension \(m\) remains.</p>

        <h3>Matrix-matrix multiplication</h3>
        <p>If \(A\in\mathbb{R}^{a\times b}\) and \(B\in\mathbb{R}^{b\times c}\), then</p>
        <p>\[AB\in\mathbb{R}^{a\times c}.\]</p>
        <p>If the inner dimensions do not match, the product is not defined.</p>

        <h3>Addition</h3>
        <p>Ordinary matrix addition requires equal shapes. If \(A\in\mathbb{R}^{2\times3}\), then a matrix added directly to \(A\) must also have shape \(2\times3\), unless the notation uses a stated broadcasting rule.</p>

        <div class="shape-check">
          <strong>Shape audit.</strong> Let \(X\in\mathbb{R}^{N\times d}\), \(W\in\mathbb{R}^{d\times h}\), and \(b\in\mathbb{R}^{h}\). Then \(XW\) has shape \(N\times h\). A row-wise broadcast of \(b\) also has effective shape \(N\times h\). Therefore, \(XW+b\) is shape-compatible.
        </div>
        <p>Write shapes beside important equations in a paper. This simple habit catches transpose errors and orientation differences.</p>
      `
    },
    {
      id: "full-objective",
      title: "14. Read a complete ML training objective",
      html: raw`
        <p>Now read this common equation:</p>
        <p>\[\theta^*=\arg\min_\theta\frac{1}{N}\sum_{i=1}^{N}L\big(f_\theta(x_i),y_i\big).\]</p>
        <p>Break it into objects and operations.</p>
        <ol>
          <li>\(N\) is the number of training examples.</li>
          <li>\(i\) is the example index.</li>
          <li>\(x_i\) is input example \(i\).</li>
          <li>\(y_i\) is the target for example \(i\).</li>
          <li>\(\theta\) contains the model parameters.</li>
          <li>\(f_\theta(x_i)\) is the model prediction.</li>
          <li>\(L(f_\theta(x_i),y_i)\) is one scalar loss.</li>
          <li>\(\sum_{i=1}^{N}\) adds the losses.</li>
          <li>\(1/N\) changes the total into an average.</li>
          <li>\(\arg\min_\theta\) asks for the parameter value that minimizes the average loss.</li>
          <li>\(\theta^*\) names the selected optimal parameter value.</li>
        </ol>
        <div class="mini-example">
          Suppose \(f_\theta(x)=wx+b\), with \(\theta=(w,b)\). Let the loss be \(L(\hat y,y)=(\hat y-y)^2\). For the two examples \((x_1,y_1)=(1,3)\) and \((x_2,y_2)=(2,5)\), choose \(w=2\) and \(b=1\). The predictions are 3 and 5. Both losses are 0. Therefore, the average loss is 0.
        </div>
        <p>This equation pattern appears in linear regression, neural networks, classification, representation learning, and many other areas. The model and loss change, but the reading method stays the same.</p>
      `
    },
    {
      id: "common-mistakes",
      title: "15. Common notation mistakes",
      html: raw`
        <ul>
          <li><strong>Reading every superscript as a power.</strong> In \(a^{(\ell)}\), the superscript often labels a layer.</li>
          <li><strong>Confusing min with argmin.</strong> The first returns a function value. The second returns an input.</li>
          <li><strong>Ignoring shape.</strong> A formula can look plausible and still be dimensionally invalid.</li>
          <li><strong>Assuming rows always hold examples.</strong> Some authors store examples in columns.</li>
          <li><strong>Assuming one index meaning everywhere.</strong> The same letter can index examples, coordinates, tokens, layers, or time.</li>
          <li><strong>Confusing codomain and range.</strong> The codomain is declared. The range is actually produced.</li>
          <li><strong>Forgetting that \(\propto\) hides a constant.</strong> It is not the same as equality.</li>
          <li><strong>Reading a long expression left to right without grouping it.</strong> Find the inner operations first.</li>
          <li><strong>Doing algebra before paraphrasing.</strong> Say the equation in words first.</li>
        </ul>
      `
    },
    {
      id: "recap",
      title: "16. Day 1 recap",
      html: raw`
        <p>You do not need advanced proofs after Day 1. You need a reliable reading method.</p>
        <p>You should now be able to:</p>
        <ul>
          <li>identify sets, tuples, sequences, scalars, vectors, matrices, and tensors;</li>
          <li>read a function declaration and distinguish domain, codomain, and range;</li>
          <li>interpret subscripts and superscripts from context;</li>
          <li>expand sums and products;</li>
          <li>explain why logs turn products into sums;</li>
          <li>read indicators, piecewise rules, norms, and expectations;</li>
          <li>distinguish \(\min\) from \(\arg\min\);</li>
          <li>interpret \(\approx\), \(\propto\), and Big-O notation;</li>
          <li>check whether matrix and vector shapes are compatible; and</li>
          <li>explain every part of a standard empirical-risk objective.</li>
        </ul>
        <p>Keep the five-step routine beside you when you read the next lesson: name the objects, write shapes, identify operations, paraphrase, and test a small case.</p>
      `
    }
  ],
  examples: [
    ["Class set and membership", raw`Let \(\mathcal{Y}=\{1,2,3\}\). Then \(2\in\mathcal{Y}\), but \(5\notin\mathcal{Y}\). The set can represent three possible class labels.`],
    ["Read a function declaration", raw`If \(f:\mathbb{R}^3\to\mathbb{R}\), then the input is a three-entry real vector and the output is one real scalar. If \(f(x)=x_1+x_2+x_3\) and \(x=(1,2,3)^\top\), then \(f(x)=6\).`],
    ["Composition", raw`Let \(g(x)=3x\) and \(f(u)=u+2\). Then \((f\circ g)(x)=3x+2\). At \(x=4\), apply \(g\) first to get 12. Then apply \(f\) to get 14.`],
    ["Expand a summation", raw`The expression \(\sum_{i=1}^{4}i^2\) means \(1^2+2^2+3^2+4^2=1+4+9+16=30\).`],
    ["Expand a double sum", raw`If \(A=\begin{bmatrix}1&2\\3&4\end{bmatrix}\), then \(\sum_{i=1}^{2}\sum_{j=1}^{2}A_{ij}=1+2+3+4=10\).`],
    ["Product notation", raw`If \(x=(2,3,4)\), then \(\prod_{i=1}^{3}x_i=2\cdot3\cdot4=24\).`],
    ["Log of a product", raw`For positive values \(p_1,p_2,p_3\), \(\log(p_1p_2p_3)=\log p_1+\log p_2+\log p_3\). A likelihood product therefore becomes a log-likelihood sum.`],
    ["Indicator as an error counter", raw`Suppose the predictions are \((1,2,2,1)\) and the labels are \((1,1,2,3)\). The indicators \(\mathbf{1}[\hat y_i\ne y_i]\) are \((0,1,0,1)\). Their sum is 2, so there are two errors.`],
    ["Three vector norms", raw`For \(x=(3,-4)^\top\), \(\|x\|_1=7\), \(\|x\|_2=5\), and \(\|x\|_\infty=4\). Each norm measures size with a different rule.`],
    ["Expectation", raw`Let \(X\) be 10 with probability 0.2 and 0 with probability 0.8. Then \(\mathbb{E}[X]=10(0.2)+0(0.8)=2\).`],
    ["Argmin versus minimum", raw`If \(L(\theta)=(\theta-5)^2+2\), then \(\arg\min_\theta L(\theta)=5\), while \(\min_\theta L(\theta)=2\).`],
    ["Matrix-product shape", raw`Let \(A\in\mathbb{R}^{4\times3}\) and \(B\in\mathbb{R}^{3\times2}\). The product \(AB\) is valid and has shape \(4\times2\). The product \(BA\) is not valid because the inner dimensions 2 and 4 do not match.`],
    ["Batch affine transformation", raw`Let \(X\in\mathbb{R}^{32\times100}\) and \(W\in\mathbb{R}^{100\times64}\). Then \(XW\in\mathbb{R}^{32\times64}\). The batch still has 32 examples, and each output has 64 features.`],
    ["Read a prediction rule", raw`The rule \(\hat y=\arg\max_k p(y=k\mid x)\) means: evaluate the predicted probability for each class \(k\), and return the class index with the largest probability.`]
  ],
  practice: [
    raw`For \(g:\mathbb{R}^5\to\mathbb{R}^2\), state the input and output types. <details><summary>Show answer</summary><p>The input is a five-entry real vector. The output is a two-entry real vector.</p></details>`,
    raw`Is \((1,2)\) the same tuple as \((2,1)\)? Is \(\{1,2\}\) the same set as \(\{2,1\}\)? <details><summary>Show answer</summary><p>The tuples are different because tuple order matters. The sets are equal because set order does not matter.</p></details>`,
    raw`Expand and calculate \(\sum_{i=1}^{4}(i+1)\). <details><summary>Show answer</summary><p>\((1+1)+(2+1)+(3+1)+(4+1)=2+3+4+5=14\).</p></details>`,
    raw`Calculate \(\prod_{i=1}^{4}i\). <details><summary>Show answer</summary><p>\(1\cdot2\cdot3\cdot4=24\).</p></details>`,
    raw`For \(x=(3,-4)\), calculate \(\|x\|_1\), \(\|x\|_2\), and \(\|x\|_\infty\). <details><summary>Show answer</summary><p>The values are 7, 5, and 4.</p></details>`,
    raw`Explain the difference between \(\max_x f(x)\) and \(\arg\max_x f(x)\). <details><summary>Show answer</summary><p>\(\max\) returns the largest function value. \(\arg\max\) returns an input that produces that value.</p></details>`,
    raw`If \(A\in\mathbb{R}^{4\times3}\) and \(x\in\mathbb{R}^{3}\), what is the shape of \(Ax\)? <details><summary>Show answer</summary><p>The inner dimensions match. The result has shape \(4\).</p></details>`,
    raw`Can \(B\in\mathbb{R}^{5\times2}\) multiply \(C\in\mathbb{R}^{3\times5}\) in the order \(BC\)? <details><summary>Show answer</summary><p>No. The inner dimensions are 2 and 3, so they do not match. The reverse product \(CB\) is valid and has shape \(3\times2\).</p></details>`,
    raw`Rewrite \(\log(p_1p_2p_3p_4)\) as a sum. <details><summary>Show answer</summary><p>\(\log p_1+\log p_2+\log p_3+\log p_4\).</p></details>`,
    raw`What does \(\sum_{i=1}^{N}\mathbf{1}[\hat y_i\ne y_i]\) calculate? <details><summary>Show answer</summary><p>It counts the number of examples for which the predicted label differs from the true label.</p></details>`,
    raw`Read this expression in words: \(\hat y=\arg\max_k p(y=k\mid x)\). <details><summary>Show answer</summary><p>Choose the class \(k\) that has the largest predicted probability given input \(x\).</p></details>`,
    raw`In \(a^{(\ell)}\), what should you check before deciding what the superscript means? <details><summary>Show answer</summary><p>Check the author’s definition and the surrounding context. In neural-network notation, \((\ell)\) often labels a layer and is not an exponent.</p></details>`,
    raw`Read the objective \(\theta^*=\arg\min_\theta\frac1N\sum_{i=1}^{N}L(f_\theta(x_i),y_i)\) in one clear sentence. <details><summary>Show answer</summary><p>Find the parameter value \(\theta\) that gives the smallest average loss over the \(N\) training examples.</p></details>`
  ]
});
