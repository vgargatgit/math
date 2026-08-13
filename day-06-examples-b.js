day6.examples.push(
  ["Sigmoid gate", String.raw`At \(x=0\), \(\sigma'(0)=0.25\). If an upstream derivative is \(8\), the local result is \(8\times0.25=2\).`],
  ["Softmax Jacobian", String.raw`For \(p=(0.2,0.3,0.5)^\top\), \(J=\operatorname{diag}(p)-pp^\top\). The off-diagonal entry \(J_{12}=-p_1p_2=-0.06\), so changing logit 2 also changes probability 1.`],
  ["Softmax with negative log likelihood", String.raw`If \(p=(0.1,0.7,0.2)\) and the target vector is \(y=(0,1,0)\), the combined derivative with respect to logits is \(p-y=(0.1,-0.3,0.2)\).`],
  ["Log-sum-exp", String.raw`For \(s(z)=\log\sum_i e^{z_i}\), the derivative of \(s\) with respect to coordinate \(z_k\) is \(e^{z_k}/\sum_i e^{z_i}\), the softmax probability for coordinate \(k\).`],
  ["Vector normalization coupling", String.raw`For \(x=(3,4)^\top\), normalization gives \(y=(0.6,0.8)^\top\). Its Jacobian has nonzero off-diagonal entries, so changing the first input coordinate also changes the second output coordinate.`],
  ["Batch affine gradient", String.raw`For \(X\in\mathbb{R}^{4\times5}\) and \(G\in\mathbb{R}^{4\times3}\), \(X^\top G\) has shape \((5\times4)(4\times3)=5\times3\), matching \(W\in\mathbb{R}^{5\times3}\).`],
  ["Shared parameter accumulation", String.raw`If \(L=(wx_1)^2+(wx_2)^2\), then \(dL/dw=2w(x_1^2+x_2^2)\). Both uses of \(w\) contribute to one derivative.`],
  ["Centered finite difference", String.raw`For \(L(\theta)=\theta^2\), \(\theta=3\), and \(\varepsilon=10^{-4}\), the centered finite difference is approximately \(6\), matching the exact derivative \(2\theta\).`],
  ["Full layer shape audit", String.raw`For \(X:B\times m\), \(W:m\times n\), and \(G_Z:B\times n\), the reverse shapes are \(G_W=X^\top G_Z:m\times n\), \(G_b=\sum_B G_Z:1\times n\), and \(G_X=G_ZW^\top:B\times m\).`]
);
