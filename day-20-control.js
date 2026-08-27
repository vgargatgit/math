(() => {
  const day20 = COURSE[6].lessons[4];

  day20.sections.push(
    {
      id: "q-learning",
      title: "12. Q-learning uses a Bellman-optimality target without following the target policy",
      html: String.raw`
        <p>Q-learning learns an estimate of the optimal action-value function. The tabular update is</p>
        <p>\[
        Q(s,a)\leftarrow
        Q(s,a)+\alpha
        \left[
        r+\gamma\max_{a'}Q(s',a')-Q(s,a)
        \right].
        \]</p>
        <p>The quantity inside square brackets is a TD error for an optimality target.</p>

        <h3>Numerical example</h3>
        <p>Suppose</p>
        <p>\[
        Q(s,a)=3,
        \qquad
        r=1,
        \qquad
        \max_{a'}Q(s',a')=7,
        \qquad
        \gamma=0.9,
        \qquad
        \alpha=0.2.
        \]</p>
        <p>The target is</p>
        <p>\[
        y=1+0.9(7)=7.3.
        \]</p>
        <p>The error is \(7.3-3=4.3\), so</p>
        <p>\[
        Q(s,a)\leftarrow3+0.2(4.3)=3.86.
        \]</p>

        <h3>Why Q-learning is off-policy</h3>
        <p>The behavior that generates experience can explore. The update target still uses a greedy maximum. Therefore the behavior policy and the target policy do not have to be the same.</p>

        <h3>From tabular Q-learning to DQN</h3>
        <p>A deep Q-network uses a neural function \(Q_\theta(s,a)\). For a batch of transitions \((s_i,a_i,r_i,s_i')\), a common target is</p>
        <p>\[
        y_i=r_i+\gamma(1-d_i)
        \max_{a'}Q_{\bar\theta}(s_i',a'),
        \]</p>
        <p>where \(d_i\) marks a terminal transition and \(\bar\theta\) can be target-network parameters.</p>
        <p>The loss can be</p>
        <p>\[
        L(\theta)
        =\frac1B\sum_{i=1}^{B}
        \left(Q_\theta(s_i,a_i)-y_i\right)^2.
        \]</p>

        <h3>Shape trace for discrete actions</h3>
        <p>If a batch has \(B=32\) states and \(K=5\) actions, a Q-network can return</p>
        <p>\[
        Q_\theta(X)\in\mathbb R^{32\times5}.
        \]</p>
        <p>The action index for each row selects one scalar prediction, producing a vector in \(\mathbb R^{32}\). The max over next-state actions also produces one scalar target per transition.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Replay buffers weaken temporal correlation and reuse old transitions. Target networks slow the motion of the bootstrap target. Both ideas support more stable deep Q-learning.</div>
      `
    },
    {
      id: "exploration-exploitation",
      title: "13. Exploration collects information; exploitation uses current knowledge",
      html: String.raw`
        <p>An agent that always chooses its current best-known action can miss better actions. An agent that explores forever can waste reward. RL algorithms must balance <strong>exploration</strong> and <strong>exploitation</strong>.</p>

        <h3>Epsilon-greedy exploration</h3>
        <p>For discrete actions, an \(\epsilon\)-greedy behavior policy chooses a random action with probability \(\epsilon\). Otherwise it chooses a greedy action.</p>
        <p>With \(K\) actions and one unique greedy action, one common probability assignment is</p>
        <p>\[
        P(A=a^*)=1-\epsilon+\frac{\epsilon}{K},
        \]</p>
        <p>and each non-greedy action has probability</p>
        <p>\[
        \frac{\epsilon}{K}.
        \]</p>

        <h3>Numerical example</h3>
        <p>Let \(K=4\) and \(\epsilon=0.2\). Then the greedy action is selected with probability</p>
        <p>\[
        0.8+0.05=0.85,
        \]</p>
        <p>and each other action is selected with probability \(0.05\).</p>

        <h3>Other exploration mechanisms</h3>
        <p>Policy-gradient methods already sample from a stochastic policy. Entropy bonuses can discourage the policy from becoming deterministic too early. Continuous-control methods can add action noise or use stochastic Gaussian policies.</p>
        <p>A common entropy term is</p>
        <p>\[
        H(\pi(\cdot\mid s))
        =-\sum_a\pi(a\mid s)\log\pi(a\mid s).
        \]</p>
        <p>Higher entropy means a less concentrated action distribution.</p>

        <h3>Why exploration changes the data distribution</h3>
        <p>The agent's policy determines which states it visits. Changing the exploration rule can therefore change the training data itself. This is different from supervised learning, where the dataset is usually fixed before optimization begins.</p>
        <div class="definition"><strong>Reading rule.</strong> When two RL methods use the same loss but different data-collection policies, they can still learn very differently because they see different state-action distributions.</div>
      `
    },
    {
      id: "policy-gradients",
      title: "14. Policy gradients optimize the action distribution directly",
      html: String.raw`
        <p>Value-based methods can derive a policy from action values. Policy-gradient methods instead parameterize the policy itself.</p>
        <p>Write</p>
        <p>\[
        \pi_\theta(a\mid s),
        \]</p>
        <p>where \(\theta\) are neural-network parameters. Let the objective be expected return</p>
        <p>\[
        J(\theta)=\mathbb E_{\tau\sim\pi_\theta}[G(\tau)].
        \]</p>
        <p>A policy-gradient theorem leads to estimators with the form</p>
        <p>\[
        \nabla_\theta J(\theta)
        =\mathbb E_{\pi_\theta}
        \left[
        \nabla_\theta\log\pi_\theta(A_t\mid S_t)
        Q^{\pi_\theta}(S_t,A_t)
        \right].
        \]</p>

        <h3>Why the log probability appears</h3>
        <p>The identity</p>
        <p>\[
        \nabla_\theta p_\theta(x)
        =p_\theta(x)\nabla_\theta\log p_\theta(x)
        \]</p>
        <p>lets us move a derivative of a probability into an expectation. This is the score-function or likelihood-ratio trick.</p>

        <h3>REINFORCE-style sample estimator</h3>
        <p>For one sampled trajectory, a simple estimator uses</p>
        <p>\[
        \widehat g
        =\sum_t
        G_t\nabla_\theta\log\pi_\theta(A_t\mid S_t).
        \]</p>
        <p>If an action produced a large positive return, gradient ascent increases its log probability. If the weighted return is negative, the update decreases its probability.</p>

        <h3>Two-action numerical intuition</h3>
        <p>Suppose the policy currently gives action \(a_1\) probability \(0.7\) and action \(a_2\) probability \(0.3\). A sampled \(a_2\) receives a strong positive return. The policy-gradient step does not directly set \(\pi(a_2)=1\). It changes \(\theta\) in a direction that increases \(\log\pi_\theta(a_2\mid s)\), with step size controlled by the return and optimizer.</p>

        <h3>Continuous-action policy shape</h3>
        <p>Suppose the action has dimension \(d_a=3\). A Gaussian actor can produce</p>
        <p>\[
        \mu_\theta(s)\in\mathbb R^3,
        \qquad
        \log\sigma_\theta(s)\in\mathbb R^3.
        \]</p>
        <p>For a batch of \(B=64\) states, these arrays have shape \(64\times3\). The log probability of one sampled action is usually reduced across the action dimension to one scalar per batch item.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Actor-critic methods use a policy network as the actor and a learned value function as the critic. The critic supplies a lower-variance learning signal for the actor.</div>
      `
    },
    {
      id: "advantage-functions",
      title: "15. Advantage measures whether an action is better than the state baseline",
      html: String.raw`
        <p>The advantage function is</p>
        <p>\[
        A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s).
        \]</p>
        <p>It compares one action with the average action quality under the policy at the same state.</p>

        <h3>Numerical example</h3>
        <p>If</p>
        <p>\[
        Q^\pi(s,a)=9,
        \qquad
        V^\pi(s)=6,
        \]</p>
        <p>then</p>
        <p>\[
        A^\pi(s,a)=3.
        \]</p>
        <p>The action is better than the policy's state baseline by three return units.</p>
        <p>If another action has \(Q^\pi(s,a')=4\), its advantage is \(-2\).</p>

        <h3>Why subtract a baseline</h3>
        <p>Policy-gradient estimators can subtract a baseline that does not depend on the sampled action without changing the expected gradient under standard conditions. A state-value baseline reduces variance because it removes reward variation that is common to all actions from that state.</p>
        <p>A common actor update therefore has the form</p>
        <p>\[
        \widehat g
        =\frac1B\sum_{i=1}^{B}
        \widehat A_i
        \nabla_\theta\log\pi_\theta(a_i\mid s_i).
        \]</p>

        <h3>TD error as an advantage estimate</h3>
        <p>A one-step TD error</p>
        <p>\[
        \delta_t=r_{t+1}+\gamma V(S_{t+1})-V(S_t)
        \]</p>
        <p>can act as a noisy one-step estimate of advantage. Multi-step methods combine several TD errors to trade bias against variance.</p>

        <h3>Generalized advantage estimation intuition</h3>
        <p>A common form is</p>
        <p>\[
        \widehat A_t^{\text{GAE}}
        =\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}.
        \]</p>
        <p>The parameter \(\lambda\) controls how much later TD information contributes. You do not need to memorize this formula before reading PPO papers, but you should know that \(\widehat A_t\) is an estimator, not the exact advantage.</p>
        <div class="shape-check"><strong>Common mistake.</strong> An advantage can be negative. Negative advantage means the sampled action was worse than the state baseline, not that the environment reward itself was necessarily negative.</div>
      `
    },
    {
      id: "importance-sampling-rl",
      title: "16. Importance sampling corrects for data collected by a different policy",
      html: String.raw`
        <p>RL often uses trajectories generated by one policy while estimating an expectation under another. Let \(\mu\) be the behavior policy that collected the action and \(\pi\) be the target policy.</p>
        <p>For one state-action pair, the importance ratio is</p>
        <p>\[
        \rho_t
        =\frac{\pi(A_t\mid S_t)}{\mu(A_t\mid S_t)}.
        \]</p>

        <h3>Numerical example</h3>
        <p>Suppose the logged behavior policy chose an action with probability \(0.25\), while the new target policy would choose it with probability \(0.5\). Then</p>
        <p>\[
        \rho_t=\frac{0.5}{0.25}=2.
        \]</p>
        <p>That sample receives twice the uncorrected weight for a one-step expectation.</p>

        <h3>Trajectory ratios</h3>
        <p>For a full trajectory segment, ratios can multiply:</p>
        <p>\[
        \rho_{t:T}
        =\prod_{k=t}^{T}
        \frac{\pi(A_k\mid S_k)}{\mu(A_k\mid S_k)}.
        \]</p>
        <p>Products of many ratios can have very high variance. This is a major practical problem.</p>

        <h3>Connection to PPO-style objectives</h3>
        <p>Modern policy-optimization papers often compare a new policy with the policy that generated the batch. A probability ratio can be written as</p>
        <p>\[
        r_t(\theta)
        =\frac{\pi_\theta(a_t\mid s_t)}
        {\pi_{\theta_{\text{old}}}(a_t\mid s_t)}.
        \]</p>
        <p>PPO uses this ratio inside a clipped surrogate objective so that one update does not benefit too much from very large probability changes.</p>

        <h3>Support requirement</h3>
        <p>If \(\pi(a\mid s)>0\) but \(\mu(a\mid s)=0\), the ratio is undefined. The behavior policy must cover the target-policy actions that matter for the estimator.</p>
        <div class="paper-connection"><strong>Reading rule.</strong> When an RL paper is off-policy, look for replay sampling, importance ratios, target networks, conservative objectives, or another mechanism that addresses the mismatch between collected data and the current policy.</div>
      `
    }
  );
})();