(() => {
  const day20 = COURSE[6].lessons[4];

  day20.sections.push(
    {
      id: "actor-critic-integration",
      title: "17. Actor-critic combines policy learning with value estimation",
      html: String.raw`
        <p>An actor-critic method has two learned roles.</p>
        <ul>
          <li>The <strong>actor</strong> is the policy \(\pi_\theta(a\mid s)\).</li>
          <li>The <strong>critic</strong> estimates a value quantity such as \(V_\phi(s)\) or \(Q_\phi(s,a)\).</li>
        </ul>
        <p>The critic helps estimate how good the sampled action was. The actor uses that estimate to update action probabilities.</p>

        <h3>One transition</h3>
        <p>Suppose the agent observes</p>
        <p>\[
        (s_t,a_t,r_{t+1},s_{t+1}).
        \]</p>
        <p>The critic computes a TD error</p>
        <p>\[
        \delta_t
        =r_{t+1}+\gamma V_\phi(s_{t+1})-V_\phi(s_t).
        \]</p>
        <p>The critic can reduce \(\delta_t^2\). The actor can use \(\delta_t\) as an advantage-like signal:</p>
        <p>\[
        \theta\leftarrow
        \theta+\alpha_\pi
        \delta_t\nabla_\theta
        \log\pi_\theta(a_t\mid s_t).
        \]</p>

        <h3>Numerical signal trace</h3>
        <p>Let</p>
        <p>\[
        r_{t+1}=1,
        \qquad
        \gamma=0.9,
        \qquad
        V(s_t)=4,
        \qquad
        V(s_{t+1})=5.
        \]</p>
        <p>Then</p>
        <p>\[
        \delta_t=1+0.9(5)-4=1.5.
        \]</p>
        <p>The positive TD error says the transition was better than the critic expected. The actor therefore receives a positive weight for the sampled action's log-probability gradient.</p>

        <h3>Batch shape trace</h3>
        <p>For \(B=128\) transitions and \(K=8\) discrete actions, suppose the actor returns logits</p>
        <p>\[
        Z\in\mathbb R^{128\times8}.
        \]</p>
        <p>After softmax, the selected action probabilities give one log probability per sample:</p>
        <p>\[
        \log p\in\mathbb R^{128}.
        \]</p>
        <p>The critic returns</p>
        <p>\[
        V(s_t),V(s_{t+1})\in\mathbb R^{128}.
        \]</p>
        <p>The reward, done mask, TD error, and advantage estimate also usually have one scalar per transition. This makes products such as</p>
        <p>\[
        -\frac1B\sum_i\widehat A_i\log\pi_\theta(a_i\mid s_i)
        \]</p>
        <p>shape-compatible.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> A2C, A3C, PPO, and many continuous-control methods use this actor-critic structure even when their exact targets, clipping rules, entropy terms, and update schedules differ.</div>
      `
    },
    {
      id: "common-mistakes",
      title: "18. Common mistakes when reading reinforcement-learning equations",
      html: String.raw`
        <h3>Mistake 1: treat an observation as a Markov state</h3>
        <p>A camera image can be an observation without containing enough information to make the process Markov. A recurrent agent can use history to reduce this problem.</p>

        <h3>Mistake 2: mix row-stochastic and column-stochastic transition conventions</h3>
        <p>If distributions are row vectors, the common update is \(\mu_{t+1}=\mu_tP\). If they are column vectors, authors can use a transposed convention. Check the stated matrix orientation.</p>

        <h3>Mistake 3: confuse reward with return</h3>
        <p>Reward is one immediate signal. Return is a sum of current and future rewards.</p>

        <h3>Mistake 4: treat \(V(s)\) as a property of the state alone</h3>
        <p>Usually it is \(V^\pi(s)\). The value depends on the policy followed after the state.</p>

        <h3>Mistake 5: confuse \(V\) and \(Q\)</h3>
        <p>\(V^\pi(s)\) conditions on a state. \(Q^\pi(s,a)\) conditions on both the state and the current action.</p>

        <h3>Mistake 6: use the Bellman optimality maximum during fixed-policy evaluation</h3>
        <p>Policy evaluation averages over the next action under \(\pi\). Optimality uses a best-action operator.</p>

        <h3>Mistake 7: assume a TD target is ground truth</h3>
        <p>A target such as \(r+\gamma V(s')\) contains a learned estimate. It is a bootstrap target, not a fully observed label.</p>

        <h3>Mistake 8: backpropagate through a target unintentionally</h3>
        <p>Many implementations stop gradients through target values or use a separate target network. Otherwise the optimization problem changes.</p>

        <h3>Mistake 9: forget terminal masks</h3>
        <p>If a transition truly ends an episode, a common target uses \(r+\gamma(1-d)V(s')\). Time-limit truncation can require different handling from a natural terminal state.</p>

        <h3>Mistake 10: assume off-policy data matches the current policy</h3>
        <p>Replay data can come from older policies. Policy-gradient estimators can require importance correction or another design that handles this mismatch.</p>

        <h3>Mistake 11: think Q-learning's behavior policy is greedy</h3>
        <p>Q-learning can collect data with an exploratory policy while using a greedy maximum in the target.</p>

        <h3>Mistake 12: treat a policy gradient as a gradient through the sampled action</h3>
        <p>For discrete actions, the basic policy-gradient estimator differentiates the log probability of the sampled action. It does not differentiate through the discrete sample itself.</p>

        <h3>Mistake 13: assume a positive reward means positive advantage</h3>
        <p>An action can receive positive reward and still have negative advantage if the state baseline expected an even larger return.</p>

        <h3>Mistake 14: ignore reduction dimensions in log probabilities</h3>
        <p>For a multidimensional continuous action, a distribution can return one log probability per action coordinate. Many losses need the sum over action coordinates before the batch reduction.</p>

        <h3>Mistake 15: read \(\rho_t\) as a probability</h3>
        <p>An importance ratio can exceed one. It is a ratio of probabilities or densities, not itself a probability.</p>

        <h3>Mistake 16: compare RL scores without checking evaluation policy</h3>
        <p>Training can use stochastic exploration while evaluation uses a deterministic or low-noise policy. The reported return depends on the evaluation protocol.</p>
      `
    },
    {
      id: "paper-reading-workflow",
      title: "19. A paper-reading workflow for reinforcement learning",
      html: String.raw`
        <p>Use a fixed reading sequence. It reduces confusion when a paper introduces many objectives and networks.</p>
        <ol>
          <li><strong>Identify the environment variables.</strong> Write the state or observation, action, reward, next state, and termination indicator.</li>
          <li><strong>Write the objective.</strong> Is the paper maximizing discounted return, undiscounted episodic return, average reward, or another quantity?</li>
          <li><strong>Identify the policy.</strong> Is it deterministic or stochastic? Is the action space discrete or continuous?</li>
          <li><strong>Separate behavior and target policies.</strong> State which policy generates data and which policy the update evaluates or improves.</li>
          <li><strong>Find the value objects.</strong> Mark every \(V\), \(Q\), advantage, return, and TD target. Write whether each one is exact, estimated, or sampled.</li>
          <li><strong>Expand the Bellman target.</strong> Write the immediate reward, discount, terminal mask, next-state value, and any max or policy expectation.</li>
          <li><strong>Trace one experience tuple.</strong> Follow one \((s,a,r,s',d)\) sample through every network and loss.</li>
          <li><strong>Write tensor shapes.</strong> Record batch size, state features, action dimensions, logits, Q-values, values, rewards, and advantages.</li>
          <li><strong>Mark stopped-gradient terms.</strong> Target networks and detached advantage estimates often matter.</li>
          <li><strong>Find where randomness enters.</strong> It can come from environment transitions, policy sampling, replay sampling, exploration noise, or initialization.</li>
          <li><strong>Check the data distribution.</strong> Ask whether samples are on-policy, replayed, importance weighted, prioritized, or collected by several actors.</li>
          <li><strong>Separate losses.</strong> Actor loss, critic loss, entropy bonus, auxiliary losses, and regularizers can have different coefficients.</li>
          <li><strong>Check evaluation details.</strong> Record number of seeds, episode count, exploration settings, environment version, and return normalization.</li>
        </ol>

        <h3>Paper-style DQN trace</h3>
        <p>Suppose a replay batch contains \(B=64\) states with \(d_s=128\) features and there are \(K=10\) actions.</p>
        <p>\[
        S,S'\in\mathbb R^{64\times128},
        \qquad
        A\in\{0,\ldots,9\}^{64},
        \qquad
        R,D\in\mathbb R^{64}.
        \]</p>
        <p>The online Q-network returns</p>
        <p>\[
        Q_\theta(S)\in\mathbb R^{64\times10}.
        \]</p>
        <p>Gather the selected actions to obtain</p>
        <p>\[
        q_{\text{chosen}}\in\mathbb R^{64}.
        \]</p>
        <p>The target network returns</p>
        <p>\[
        Q_{\bar\theta}(S')\in\mathbb R^{64\times10}.
        \]</p>
        <p>Take the maximum across the action axis:</p>
        <p>\[
        q_{\text{next}}=\max_{a'}Q_{\bar\theta}(S',a')
        \in\mathbb R^{64}.
        \]</p>
        <p>Then form</p>
        <p>\[
        y=R+\gamma(1-D)q_{\text{next}}
        \in\mathbb R^{64}.
        \]</p>
        <p>The loss compares \(q_{\text{chosen}}\) with \(y\). This one shape trace explains much of a standard DQN training step.</p>

        <h3>Paper-style actor-critic trace</h3>
        <p>For the same batch size, a discrete actor can return logits \(Z\in\mathbb R^{64\times10}\), while a critic returns \(V\in\mathbb R^{64}\). After action sampling, the actor gathers one log probability per sample. An advantage vector \(\widehat A\in\mathbb R^{64}\) weights those log probabilities. The actor loss is commonly a batch average of their product.</p>
        <div class="paper-connection"><strong>Core habit.</strong> Do not start with the algorithm name. Start with one transition, one target, one loss, and one tensor-shape trace.</div>
      `
    },
    {
      id: "day20-recap",
      title: "20. Recap",
      html: String.raw`
        <ul>
          <li>A Markov model assumes the current state is sufficient for predicting the next state under the model.</li>
          <li>A transition matrix stores one-step state probabilities.</li>
          <li>A stationary distribution is unchanged by one transition.</li>
          <li>An MDP adds actions, rewards, and a policy to Markov state dynamics.</li>
          <li>Discounted return combines immediate and future rewards into one random variable.</li>
          <li>\(V^\pi(s)\) is expected return from a state under policy \(\pi\).</li>
          <li>\(Q^\pi(s,a)\) also conditions on the current action.</li>
          <li>The Bellman expectation equation evaluates a fixed policy.</li>
          <li>The Bellman optimality equation uses a best-action operator.</li>
          <li>Dynamic programming uses known environment models and repeated Bellman updates.</li>
          <li>Monte Carlo evaluation uses sampled complete returns.</li>
          <li>TD learning bootstraps from a current next-state value estimate.</li>
          <li>Q-learning uses an off-policy Bellman-optimality target.</li>
          <li>Exploration changes the data the agent collects.</li>
          <li>Policy gradients optimize action probabilities directly.</li>
          <li>Advantage compares one action value with the state baseline.</li>
          <li>Importance sampling corrects some expectations when behavior and target policies differ.</li>
          <li>Actor-critic methods combine policy optimization with learned value estimation.</li>
        </ul>
      `
    }
  );

  day20.examples = [
    ["Markov transition", String.raw`With \(\mu=(1,0)\) and \(P=\begin{bmatrix}0.8&0.2\\0.4&0.6\end{bmatrix}\), one step gives \(\mu P=(0.8,0.2)\).`],
    ["Stationary distribution", String.raw`For the same chain, \(\pi=(2/3,1/3)\) satisfies \(\pi P=\pi\).`],
    ["Discounted return", String.raw`For rewards \(2,0,5\) and \(\gamma=0.9\), the finite return is \(2+0.9(0)+0.9^2(5)=6.05\).`],
    ["Value from Q-values", String.raw`If \(\pi(a_1\mid s)=0.25\), \(Q(s,a_1)=4\), \(\pi(a_2\mid s)=0.75\), and \(Q(s,a_2)=8\), then \(V(s)=7\).`],
    ["TD error", String.raw`For \(r=2\), \(\gamma=0.9\), \(V(s')=6\), and \(V(s)=4\), \(\delta=3.4\).`],
    ["Q-learning target", String.raw`For \(r=1\), \(\gamma=0.9\), and \(\max_{a'}Q(s',a')=7\), the target is \(7.3\).`],
    ["Advantage", String.raw`If \(Q^\pi(s,a)=9\) and \(V^\pi(s)=6\), then \(A^\pi(s,a)=3\).`],
    ["Importance ratio", String.raw`If \(\pi(a\mid s)=0.5\) and \(\mu(a\mid s)=0.25\), then \(\rho=2\).`]
  ];

  day20.practice = [
    String.raw`State the Markov property in words.<details><summary>Answer</summary><p>Given the current state, the model does not need the earlier state history to predict the next state.</p></details>`,
    String.raw`For a row-stochastic matrix, what must each row sum to?<details><summary>Answer</summary><p>Each row sums to \(1\).</p></details>`,
    String.raw`If \(\mu=(0.3,0.7)\) and \(P=\begin{bmatrix}0.9&0.1\\0.2&0.8\end{bmatrix}\), what is the first component of \(\mu P\)?<details><summary>Answer</summary><p>\(0.3(0.9)+0.7(0.2)=0.41\).</p></details>`,
    String.raw`What equation defines a stationary row distribution \(\pi\)?<details><summary>Answer</summary><p>\(\pi=\pi P\), with nonnegative entries that sum to one.</p></details>`,
    String.raw`Name the main objects in an MDP.<details><summary>Answer</summary><p>States, actions, transition dynamics, rewards, and usually a discount factor. A policy specifies the agent's action rule.</p></details>`,
    String.raw`For rewards \(3,2\) in a two-step episode and \(\gamma=0.5\), what is \(G_t\)?<details><summary>Answer</summary><p>\(3+0.5(2)=4\).</p></details>`,
    String.raw`What is the difference between \(V^\pi(s)\) and \(Q^\pi(s,a)\)?<details><summary>Answer</summary><p>\(V^\pi\) conditions on the state. \(Q^\pi\) also fixes the current action.</p></details>`,
    String.raw`If \(\pi(a_1\mid s)=0.4\), \(Q(s,a_1)=2\), \(\pi(a_2\mid s)=0.6\), and \(Q(s,a_2)=7\), find \(V(s)\).<details><summary>Answer</summary><p>\(0.4(2)+0.6(7)=5\).</p></details>`,
    String.raw`In one sentence, what does the Bellman expectation equation do?<details><summary>Answer</summary><p>It writes a policy's value as expected immediate reward plus discounted expected next value.</p></details>`,
    String.raw`Why does the Bellman optimality equation use \(\max_{a'}\)?<details><summary>Answer</summary><p>It assumes the optimal agent will choose the best next action.</p></details>`,
    String.raw`What extra information does dynamic programming usually assume compared with model-free TD learning?<details><summary>Answer</summary><p>It assumes the transition and reward model is known well enough to compute Bellman expectations.</p></details>`,
    String.raw`If \(V(s)=5\), sampled return \(G=9\), and \(\alpha=0.25\), what is the Monte Carlo update?<details><summary>Answer</summary><p>\(V(s)\leftarrow5+0.25(9-5)=6\).</p></details>`,
    String.raw`If \(r=1\), \(\gamma=0.9\), \(V(s')=4\), and \(V(s)=3\), what is the TD error?<details><summary>Answer</summary><p>\(1+0.9(4)-3=1.6\).</p></details>`,
    String.raw`What does bootstrapping mean in TD learning?<details><summary>Answer</summary><p>The target uses a current learned estimate, such as \(V(s')\), to update another estimate.</p></details>`,
    String.raw`For Q-learning with \(r=2\), \(\gamma=0.5\), and next-state Q-values \((3,8)\), what is the Bellman target?<details><summary>Answer</summary><p>\(2+0.5(8)=6\).</p></details>`,
    String.raw`With four actions and \(\epsilon=0.2\), what probability does standard epsilon-greedy assign to each non-greedy action when the random branch samples uniformly?<details><summary>Answer</summary><p>\(0.2/4=0.05\).</p></details>`,
    String.raw`What quantity appears inside a basic policy-gradient estimator before the return or advantage weight?<details><summary>Answer</summary><p>The score \(\nabla_\theta\log\pi_\theta(a\mid s)\).</p></details>`,
    String.raw`If \(Q(s,a)=4\) and \(V(s)=6\), what is the advantage?<details><summary>Answer</summary><p>\(A(s,a)=4-6=-2\).</p></details>`,
    String.raw`If a target policy gives an action probability \(0.3\) and the behavior policy gave it probability \(0.1\), what is the importance ratio?<details><summary>Answer</summary><p>\(0.3/0.1=3\).</p></details>`,
    String.raw`A Q-network processes a batch of \(32\) states and has \(5\) discrete actions. What is a common output shape?<details><summary>Answer</summary><p>\(32\times5\).</p></details>`
  ];
})();