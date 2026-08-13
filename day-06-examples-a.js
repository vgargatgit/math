day6.examples.push(
  ["Gradient shape from a matrix parameter", String.raw`Let \(W\in\mathbb{R}^{2\times3}\) and \(L=\sum_{ij}W_{ij}^2\). Then \(\partial L/\partial W=2W\), which has shape \(2\times3\), exactly matching \(W\).`],
  ["Jacobian of a small vector function", String.raw`For \(y_1=x_1+x_2\) and \(y_2=x_1x_2\), \(J=\begin{bmatrix}1&1\\x_2&x_1\end{bmatrix}\). At \(x=(2,3)^\top\), \(J=\begin{bmatrix}1&1\\3&2\end{bmatrix}\).`],
  ["Block Jacobian", String.raw`Let \(y_1=x_1+x_2\), \(y_2=x_1-x_2\), and \(y_3=x_3^2\). Then \(J=\begin{bmatrix}1&1&0\\1&-1&0\\0&0&2x_3\end{bmatrix}\). The zero off-block entries are structural because the first two outputs do not depend on \(x_3\).`],
  ["Vector chain rule", String.raw`If \(u=Ax\) and \(y=\tanh(u)\), then \(J_{y,x}=\operatorname{diag}(1-\tanh^2(u))A\). Under the output-by-input convention, the activation Jacobian is on the left.`],
  ["Affine weight gradient", String.raw`Let \(x=(2,-1)\) and \(\delta=(3,4,1)\). Then \(x^\top\delta=\begin{bmatrix}6&8&2\\-3&-4&-1\end{bmatrix}\), a \(2\times3\) matrix. If \(W\) is \(2\times3\), the gradient shape matches.`],
  ["Quadratic derivative", String.raw`For \(q=x^\top x\) and \(x=(3,-2)^\top\), \(\nabla q=2x=(6,-4)^\top\). A small positive change in \(x_1\) changes \(q\) at rate \(6\).`],
  ["Broadcasted bias gradient", String.raw`If \(G=\begin{bmatrix}1&2\\3&4\\-1&5\end{bmatrix}\), then a bias broadcast across the three rows receives gradient \((1+3-1,\,2+4+5)=(3,11)\).`]
);
