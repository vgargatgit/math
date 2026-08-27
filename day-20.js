const day20 = COURSE[6].lessons[4];

Object.assign(day20, {
  published: true,
  summary: "Build the Markov, Bellman, value-function, and policy-gradient mathematics needed to read modern reinforcement-learning papers.",
  explanation: "Reinforcement learning studies decisions whose consequences arrive over time. A paper usually defines states, actions, rewards, a transition rule, and a policy. The central reading task is to separate the environment dynamics from the agent policy, then track how future rewards are summarized by value functions and Bellman equations.",
  topics: [
    "Markov chains",
    "Transition matrices",
    "Stationary distributions",
    "Markov decision processes",
    "States, actions, rewards, and policies",
    "Discounted return",
    "Value functions",
    "Action-value functions",
    "Bellman expectation and optimality equations",
    "Dynamic programming",
    "Monte Carlo evaluation",
    "Temporal-difference learning",
    "Q-learning",
    "Policy gradients",
    "Advantage functions",
    "Importance sampling",
    "Exploration and exploitation"
  ],
  sections: [
    {
      id: "markov-chains",
      title: "1. A Markov chain models a state that changes over time",
      html: String.raw`
        <p>A sequential model describes a system at time steps \(t=0,1,2,\ldots\). We write the state at time \(t\) as \(S_t\).</p>
        <p>The <strong>Markov property</strong> says that the current state contains the information needed to predict the next state. Formally,</p>
        <p>\[
        P(S_{t+1}=s'\mid S_t=s,S_{t-1},\ldots,S_0)
        =P(S_{t+1}=s'\mid S_t=s).
        \]</p>
        <p>This statement does not say that the past is irrelevant in the real world. It says that the model has chosen a state representation that summarizes the relevant past.</p>

        <h3>Small weather chain</h3>
        <p>Suppose the state is either Sunny \((S)\) or Rainy \((R)\). If today is sunny, tomorrow is sunny with probability \(0.8\) and rainy with probability \(0.2\). If today is rainy, tomorrow is sunny with probability \(0.4\) and rainy with probability \(0.6\).</p>
        <p>If the current state is Sunny, the model does not also need the weather from two days ago. The current state is assumed to contain enough information.</p>

        <h3>Why this matters for RL papers</h3>
        <p>A reinforcement-learning paper often says that the environment is a Markov decision process. This is a modeling assumption. If the observation supplied to the agent does not contain enough information, the agent can face a partially observed problem even when the hidden environment state is Markov.</p>
        <div class="definition"><strong>Reading rule.</strong> Ask whether the paper uses a true environment state, an observation, or a learned history representation. These objects can have different meanings even when authors use the symbol \(s_t\) for all of them.</div>
      `
    },
    {
      id: "transition-matrices",
      title: "2. A transition matrix stores one-step state probabilities",
      html: String.raw`
        <p>For a finite Markov chain with \(n\) states, the transition probabilities can be stored in a matrix \(P\in\mathbb R^{n\times n}\).</p>
        <p>Use the row-stochastic convention</p>
        <p>\[
        P_{ij}=P(S_{t+1}=j\mid S_t=i).
        \]</p>
        <p>Each row sums to one because the next state must be one of the possible states.</p>

        <h3>Weather transition matrix</h3>
        <p>For the Sunny/Rainy example,</p>
        <p>\[
        P=
        \begin{bmatrix}
        0.8&0.2\\
        0.4&0.6
        \end{bmatrix}.
        \]</p>
        <p>The first row describes transitions from Sunny. The second row describes transitions from Rainy.</p>

        <h3>Distribution update</h3>
        <p>Let a row vector \(\mu_t\in\mathbb R^{1\times n}\) store the probability of each state at time \(t\). Then</p>
        <p>\[
        \mu_{t+1}=\mu_tP.
        \]</p>
        <p>If today is certainly Sunny,</p>
        <p>\[
        \mu_0=\begin{bmatrix}1&0\end{bmatrix}.
        \]</p>
        <p>After one day,</p>
        <p>\[
        \mu_1=\begin{bmatrix}1&0\end{bmatrix}
        \begin{bmatrix}0.8&0.2\\0.4&0.6\end{bmatrix}
        =\begin{bmatrix}0.8&0.2\end{bmatrix}.
        \]</p>
        <p>After two days,</p>
        <p>\[
        \mu_2=\mu_1P
        =\begin{bmatrix}0.72&0.28\end{bmatrix}.
        \]</p>

        <h3>Shape reasoning</h3>
        <p>With \(n\) states,</p>
        <p>\[
        \mu_t:1\times n,
        \qquad
        P:n\times n,
        \qquad
        \mu_{t+1}:1\times n.
        \]</p>
        <p>Some books use column probability vectors. Then the update becomes \(\mu_{t+1}=P\mu_t\), and the matrix is often column-stochastic. Both conventions are valid. Do not mix them inside one derivation.</p>
        <div class="shape-check"><strong>Common mistake.</strong> A transition matrix does not contain rewards. It only describes how probability moves between states.</div>
      `
    },
    {
      id: "stationary-distributions",
      title: "3. A stationary distribution does not change after one transition",
      html: String.raw`
        <p>A distribution \(\pi\) is stationary for a row-stochastic transition matrix when</p>
        <p>\[
        \pi=\pi P,
        \qquad
        \sum_i\pi_i=1,
        \qquad
        \pi_i\ge0.
        \]</p>
        <p>It is a left eigenvector of \(P\) with eigenvalue \(1\), normalized to sum to one.</p>

        <h3>Solve the weather example</h3>
        <p>Write \(\pi=(p,1-p)\). The Sunny component of \(\pi P\) is</p>
        <p>\[
        0.8p+0.4(1-p).
        \]</p>
        <p>Set this equal to \(p\):</p>
        <p>\[
        p=0.8p+0.4-0.4p
        =0.4p+0.4.
        \]</p>
        <p>Therefore \(0.6p=0.4\), so</p>
        <p>\[
        p=\frac23.
        \]</p>
        <p>The stationary distribution is</p>
        <p>\[
        \pi=\begin{bmatrix}2/3&1/3\end{bmatrix}.
        \]</p>
        <p>Check:</p>
        <p>\[
        \begin{bmatrix}2/3&1/3\end{bmatrix}P
        =\begin{bmatrix}2/3&1/3\end{bmatrix}.
        \]</p>

        <h3>Why stationary distributions matter in RL</h3>
        <p>A fixed policy inside an MDP induces a Markov chain over states. Long-run state frequencies can therefore depend on the policy. Many theoretical results use a state-visitation distribution such as \(d^\pi(s)\). It tells us how often policy \(\pi\) visits state \(s\) under stated assumptions.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> When a paper takes an expectation \(\mathbb E_{s\sim d^\pi}[\cdot]\), it is weighting states by the visitation behavior of policy \(\pi\), not uniformly over all states.</div>
      `
    },
    {
      id: "mdp-components",
      title: "4. An MDP adds actions and rewards to Markov state dynamics",
      html: String.raw`
        <p>A <strong>Markov decision process</strong>, or MDP, describes sequential decisions. A common definition is the tuple</p>
        <p>\[
        (\mathcal S,\mathcal A,P,R,\gamma).
        \]</p>
        <p>The symbols mean:</p>
        <ul>
          <li>\(\mathcal S\): set of states.</li>
          <li>\(\mathcal A\): set of actions.</li>
          <li>\(P(s'\mid s,a)\): probability of next state \(s'\) after action \(a\) in state \(s\).</li>
          <li>\(R\): reward rule or reward distribution.</li>
          <li>\(\gamma\): discount factor.</li>
        </ul>
        <p>A <strong>policy</strong> tells the agent how to choose actions. A stochastic policy is</p>
        <p>\[
        \pi(a\mid s)=P(A_t=a\mid S_t=s).
        \]</p>
        <p>A deterministic policy can be written as \(a=\pi(s)\).</p>

        <h3>Two-state delivery robot</h3>
        <p>Suppose a robot has two states:</p>
        <p>\[
        \mathcal S=\{\text{Office},\text{Charger}\}.
        \]</p>
        <p>At the Office it can Deliver or Recharge. At the Charger it can Wait or Return. A successful delivery gives reward \(+5\). An unnecessary wait gives reward \(-1\). A recharge action can reduce immediate reward but improve later outcomes.</p>
        <p>This is the central RL tension: an action can be poor now but useful later.</p>

        <h3>Neural-policy shapes</h3>
        <p>Suppose a state is represented by \(d_s=64\) features and there are \(K=6\) discrete actions. A policy network can map</p>
        <p>\[
        X\in\mathbb R^{B\times64}
        \longrightarrow
        Z\in\mathbb R^{B\times6}
        \longrightarrow
        \Pi=\operatorname{softmax}(Z)\in\mathbb R^{B\times6}.
        \]</p>
        <p>Row \(b\) of \(\Pi\) contains \(\pi_\theta(a\mid s_b)\) for all six actions.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> In continuous-action papers, the policy often outputs parameters of a distribution, such as a Gaussian mean and log standard deviation, instead of one probability per discrete action.</div>
      `
    },
    {
      id: "discounted-return",
      title: "5. Discounted return turns a future reward sequence into one number",
      html: String.raw`
        <p>At time \(t\), the agent can receive many future rewards. The <strong>return</strong> summarizes them.</p>
        <p>A common discounted return is</p>
        <p>\[
        G_t
        =R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots
        =\sum_{k=0}^{\infty}\gamma^kR_{t+k+1}.
        \]</p>
        <p>The discount factor usually satisfies \(0\le\gamma<1\) for continuing tasks.</p>

        <h3>Numerical example</h3>
        <p>Suppose the next three rewards are</p>
        <p>\[
        2,\quad0,\quad5
        \]</p>
        <p>and \(\gamma=0.9\). If the episode ends after the third reward,</p>
        <p>\[
        G_t=2+0.9(0)+0.9^2(5)
        =2+4.05=6.05.
        \]</p>

        <h3>What discounting does</h3>
        <p>A smaller \(\gamma\) gives more weight to immediate rewards. A value near one gives more weight to long-term consequences. Discounting can also make an infinite reward sum finite when rewards are bounded.</p>

        <h3>Do not confuse discounting with probability</h3>
        <p>The factor \(\gamma\) is not normally a transition probability. It is a design parameter in the return definition. Some theoretical interpretations connect discounting to random termination, but this is not the default meaning in every paper.</p>
        <div class="definition"><strong>Reading rule.</strong> Check whether a paper uses discounted continuing return, undiscounted episodic return, average reward, or another objective. The Bellman equation changes with the objective.</div>
      `
    },
    {
      id: "value-functions",
      title: "6. Value functions are expected future returns under a policy",
      html: String.raw`
        <p>The state-value function of policy \(\pi\) is</p>
        <p>\[
        V^\pi(s)
        =\mathbb E_\pi[G_t\mid S_t=s].
        \]</p>
        <p>It asks: if the agent starts in state \(s\) and then follows policy \(\pi\), what return should it expect?</p>
        <p>The action-value function is</p>
        <p>\[
        Q^\pi(s,a)
        =\mathbb E_\pi[G_t\mid S_t=s,A_t=a].
        \]</p>
        <p>It fixes both the current state and the first action, then follows \(\pi\) afterward.</p>

        <h3>Numerical example</h3>
        <p>Suppose state \(s\) has two actions. Under policy \(\pi\),</p>
        <p>\[
        \pi(a_1\mid s)=0.25,
        \qquad
        \pi(a_2\mid s)=0.75.
        \]</p>
        <p>Assume</p>
        <p>\[
        Q^\pi(s,a_1)=4,
        \qquad
        Q^\pi(s,a_2)=8.
        \]</p>
        <p>Then</p>
        <p>\[
        V^\pi(s)
        =\sum_a\pi(a\mid s)Q^\pi(s,a)
        =0.25(4)+0.75(8)=7.
        \]</p>

        <h3>Neural value-function shapes</h3>
        <p>For a batch of \(B\) states, a scalar value network often returns</p>
        <p>\[
        V_\phi(X)\in\mathbb R^{B\times1}.
        \]</p>
        <p>For \(K\) discrete actions, a Q-network can return</p>
        <p>\[
        Q_\theta(X)\in\mathbb R^{B\times K}.
        \]</p>
        <p>Entry \((b,k)\) estimates the value of taking action \(k\) in state \(b\).</p>
        <div class="shape-check"><strong>Common mistake.</strong> \(V^\pi(s)\) is not the reward received immediately in state \(s\). It is an expectation of the complete future return under policy \(\pi\).</div>
      `
    }
  ]
});