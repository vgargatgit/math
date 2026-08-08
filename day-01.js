const day1 = COURSE[0].lessons[0];

Object.assign(day1, {
  summary: "Learn the notation that AI and ML papers use, and learn a repeatable method for reading equations without guessing.",
  explanation: `Mathematical notation is a compact language. Do not try to read a long equation from left to right in one pass. First identify each object. Decide whether it is a scalar, vector, matrix, tensor, set, function, or probability. Next, write its shape when a shape exists. Then identify the operation. Finally, calculate a small example. This method turns dense notation into a sequence of simple steps.`,
  topics: [
    "Sets, subsets, tuples, sequences, and indexed collections",
    "Functions as mappings",
    "Domain, codomain, and range",
    "Function composition",
    "Scalar, vector, matrix, and tensor notation",
    "Superscripts and subscripts",
    "Summation notation",
    "Product notation",
    "Logarithms and exponentials",
    "Indicator functions",
    "Piecewise-defined functions",
    "Norm notation",
    "Expectation notation",
    "Argmin and argmax",
    "Proportionality and approximation symbols",
    "Big-O notation",
    "Reading dimensions and checking shape compatibility"
  ],
  examples: [
    ["1. Start with the object type", `Suppose a paper writes \(x\\in\\mathbb{R}^3\). Read this as: “\(x\) is a real vector with three entries.” One valid value is \(x=(2,-1,4)^\\top\). The symbol \(\\mathbb{R}^3\) tells you the space that contains \(x\).`],
    ["2. Read a function declaration", `Suppose \(f:\\mathbb{R}^3\\to\\mathbb{R}\). The function receives a three-entry real vector and returns one real number. If \(f(x)=x_1+x_2+x_3\) and \(x=(1,2,3)^\\top\), then \(f(x)=6\).`],
    ["3. Domain, codomain, and range", `For \(f(x)=x^2\) with \(f:\\mathbb{R}\\to\\mathbb{R}\), the domain is \(\\mathbb{R}\). The codomain is also \(\\mathbb{R}\). The actual outputs are nonnegative, so the range is \([0,\\infty)\). The range can be smaller than the codomain.`],
    ["4. Function composition", `Let \(g(x)=2x\) and \(f(u)=u^2\). Then \((f\\circ g)(x)=f(g(x))=(2x)^2=4x^2\). Composition means: apply the inner function first, then apply the outer function.`],
    ["5. Subscripts usually select entries", `If \(x=(10,20,30)^\\top\), then \(x_1=10\), \(x_2=20\), and \(x_3=30\). In ML, \(x_i\) often means entry \(i\), example \(i\), token \(i\), or feature \(i\). Read the paper definition before you assume which meaning applies.`],
    ["6. Superscripts need context", `In \(x^2\), the superscript means a power. In \(x^{(3)}\), it can mean “the value at layer 3” or “the third example.” In \(A^\\top\), the superscript means transpose. A superscript does not always mean exponentiation.`],
    ["7. Expand a summation", `The expression \(\\sum_{i=1}^{4} x_i\) means \(x_1+x_2+x_3+x_4\). If \(x=(2,5,1,4)\), then \(\\sum_{i=1}^{4}x_i=2+5+1+4=12\).`],
    ["8. Read a double summation", `If \(A\\in\\mathbb{R}^{2\\times2}\), then \(\\sum_{i=1}^{2}\\sum_{j=1}^{2}A_{ij}\) adds all four entries. For \(A=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}\), the result is \(1+2+3+4=10\).`],
    ["9. Product notation", `The expression \(\\prod_{i=1}^{4}x_i\) means \(x_1x_2x_3x_4\). If \(x=(2,3,4,5)\), the result is \(2\\cdot3\\cdot4\\cdot5=120\). Products appear often in probability and likelihood formulas.`],
    ["10. Logarithms turn products into sums", `A useful identity is \(\\log(ab)=\\log a+\\log b\). Therefore \(\\log\\left(\\prod_i p_i\\right)=\\sum_i\\log p_i\). This is one reason ML papers often optimize a log-likelihood instead of a likelihood.`],
    ["11. Indicator functions", `An indicator function returns 1 when a condition is true and 0 when it is false. For example, \(\\mathbf{1}[x>0]\) is 1 if \(x>0\), otherwise it is 0. If \(x=-3\), then \(\\mathbf{1}[x>0]=0\).`],
    ["12. Piecewise functions", `ReLU is a piecewise function: \(\\operatorname{ReLU}(x)=\\max(0,x)\). If \(x=-2\), the output is 0. If \(x=5\), the output is 5. A paper can define the same rule with separate cases.`],
    ["13. Norm notation", `For \(x=(3,4)^\\top\), the Euclidean norm is \(\\|x\\|_2=\\sqrt{3^2+4^2}=5\). A norm measures vector size. Different norm subscripts define different rules.`],
    ["14. Expectation notation", `If a fair coin gives \(X=1\) for heads and \(X=0\) for tails, then \(\\mathbb{E}[X]=1\\cdot0.5+0\\cdot0.5=0.5\). Expectation is a probability-weighted average.`],
    ["15. Argmin is not min", `Suppose \(L(\\theta)=(\\theta-3)^2\). Then \(\\min_\\theta L(\\theta)=0\), but \(\\arg\\min_\\theta L(\\theta)=3\). The first expression gives the smallest loss value. The second gives the parameter value that produces it.`],
    ["16. Approximation and proportionality", `The symbol \(\\approx\) means “approximately equal.” The symbol \(\\propto\) means “proportional to.” If \(y\\propto x^2\), then \(y=cx^2\) for some constant \(c\).`],
    ["17. Big-O notation", `If an algorithm compares every pair of \(n\) items, the work grows roughly with \(n^2\). We write \(O(n^2)\). Big-O describes how resource use grows. It usually ignores fixed constant factors.`],
    ["18. Shape check before arithmetic", `Let \(x\\in\\mathbb{R}^{3}\) and \(W\\in\\mathbb{R}^{2\\times3}\). Then \(Wx\) is valid and has shape \(2\). But \(xW\) is not valid if \(x\) is treated as a \(3\\times1\) column vector. Shape reasoning can reject an expression before you calculate any numbers.`],
    ["19. Read a compact ML objective", `Consider \(\\theta^*=\\arg\\min_\\theta \\frac{1}{N}\\sum_{i=1}^{N}L(f_\\theta(x_i),y_i)\). Read it in layers. \(x_i\) is input example \(i\). \(f_\\theta\) is a model controlled by parameters \(\\theta\). \(L\) scores one prediction against \(y_i\). The sum combines all examples. Division by \(N\) makes an average. The argmin asks for the parameter value that gives the smallest average loss.`]
  ],
  practice: [
    `For \(f:\\mathbb{R}^5\\to\\mathbb{R}^2\), state the input shape and output shape.`,
    `Expand \(\\sum_{i=1}^{4}i^2\) and calculate the result.`,
    `For \(x=(1,-2,5)^\\top\), calculate \(\\|x\\|_2\).`,
    `Explain the difference between \(\\min_x f(x)\) and \(\\arg\\min_x f(x)\).`,
    `If \(A\\in\\mathbb{R}^{4\\times3}\) and \(x\\in\\mathbb{R}^{3}\), state the shape of \(Ax\).`,
    `Explain what \(\\mathbf{1}[y=\\hat y]\) returns.`,
    `Rewrite \(\\log(p_1p_2p_3)\) as a sum of logarithms.`,
    `Read this expression in words: \(\\hat y=\\arg\\max_k p(y=k\\mid x)\).`
  ]
});