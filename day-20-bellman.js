(() => {
  const day20 = COURSE[6].lessons[4];

  day20.sections.push(
    {
      id: "bellman-expectation",
      title: "7. The Bellman expectation equation splits value into one step plus the remaining value",
      html: String.raw`
        <p>The return has a recursive structure. Start with</p>
        <p>\[
        G_t=R_{t+1}+\gamma G_{t+1}.
        \]</p>
        <p>Take the expectation conditioned on the current state and policy. This gives the Bellman expectation equation:</p>
        <p>\[
        V^\pi(s)
        =\sum_a\pi(a\mid s)
        \sum_{s'}P(s'\mid s,a)
        \left[r(s,a,s')+\gamma V^\pi(s')\right].
        \]</p>
        <p>The equation says that current value equals expected immediate reward plus discounted expected next-state value.</p>

        <h3>One-state numerical example</h3>
        <p>Suppose there is one continuing state. Every step gives reward \(2\), and \(\gamma=0.5\). The Bellman equation is</p>
        <p>\[
        V=2+0.5V.
        \]</p>
        <p>Therefore</p>
        <p>\[
        0.5V=2,
        \qquad
        V=4.
        \]</p>
        <p>This matches the infinite geometric sum</p>
        <p>\[
        2+1+0.5+0.25+\cdots=4.
        \]</p>

        <h3>Action-value form</h3>
        <p>The Bellman expectation equation for \(Q^\pi\) is</p>
        <p>\[
        Q^\pi(s,a)
        =\sum_{s'}P(s'\mid s,a)
        \left[
        r(s,a,s')
        +\gamma\sum_{a'}\pi(a'\mid s')Q^\pi(s',a')
        \right].
        \]</p>
        <p>The first action is fixed to \(a\). Later actions are sampled from \(\pi\).</p>
        <div class="paper-connection"><strong>Paper connection.</strong> Critic methods learn a function that should approximately satisfy a Bellman relation. A Bellman residual measures how far the current estimate is from its one-step target.</div>
      `
    },
    {
      id: "bellman-optimality",
      title: "8. Bellman optimality replaces policy averaging with a best-action choice",
      html: String.raw`
        <p>The optimal state-value function is</p>
        <p>\[
        V^*(s)=\max_\pi V^\pi(s).
        \]</p>
        <p>The optimal action-value function is</p>
        <p>\[
        Q^*(s,a)=\max_\pi Q^\pi(s,a).
        \]</p>
        <p>The Bellman optimality equation for \(Q^*\) is</p>
        <p>\[
        Q^*(s,a)
        =\sum_{s'}P(s'\mid s,a)
        \left[r(s,a,s')+\gamma\max_{a'}Q^*(s',a')\right].
        \]</p>
        <p>The maximum appears because the optimal agent will choose the best available next action.</p>

        <h3>Small numerical example</h3>
        <p>Suppose an action gives immediate reward \(1\), then moves to a state where the two available action values are \(5\) and \(8\). Let \(\gamma=0.9\). If the transition is deterministic, the Bellman target is</p>
        <p>\[
        1+0.9\max(5,8)=1+7.2=8.2.
        \]</p>

        <h3>Optimal policy from \(Q^*\)</h3>
        <p>A greedy optimal policy can choose</p>
        <p>\[
        \pi^*(s)\in\arg\max_aQ^*(s,a).
        \]</p>
        <p>If several actions tie, the argmax is a set. A paper can choose any deterministic tie rule or a distribution over tied actions.</p>

        <h3>Expectation versus maximum</h3>
        <p>For policy evaluation, the next action is averaged under the current policy. For optimal control, the next action is selected by a maximum. Mixing these two equations changes the algorithm.</p>
        <div class="shape-check"><strong>Common mistake.</strong> The Bellman optimality operator contains a nonlinear maximum. This is one reason optimal-control analysis differs from evaluating one fixed policy.</div>
      `
    },
    {
      id: "dynamic-programming",
      title: "9. Dynamic programming solves known finite MDPs by repeated Bellman updates",
      html: String.raw`
        <p>Dynamic programming assumes that the transition and reward model is known. It uses Bellman equations as update rules.</p>

        <h3>Iterative policy evaluation</h3>
        <p>For a fixed policy \(\pi\), start with an arbitrary value table \(V_0\). Repeatedly apply</p>
        <p>\[
        V_{k+1}(s)
        =\sum_a\pi(a\mid s)
        \sum_{s'}P(s'\mid s,a)
        \left[r(s,a,s')+\gamma V_k(s')\right].
        \]</p>
        <p>Under standard finite discounted assumptions, these updates converge to \(V^\pi\).</p>

        <h3>Value iteration</h3>
        <p>For control, use</p>
        <p>\[
        V_{k+1}(s)
        =\max_a\sum_{s'}P(s'\mid s,a)
        \left[r(s,a,s')+\gamma V_k(s')\right].
        \]</p>
        <p>This combines evaluation and improvement in one Bellman-optimality update.</p>

        <h3>Two-state numerical sweep</h3>
        <p>Suppose \(\gamma=0.5\). State \(A\) deterministically moves to \(B\) with reward \(2\). State \(B\) terminates with reward \(4\). Start with</p>
        <p>\[
        V_0(A)=0,
        \qquad
        V_0(B)=0.
        \]</p>
        <p>After one sweep,</p>
        <p>\[
        V_1(B)=4,
        \qquad
        V_1(A)=2+0.5(0)=2.
        \]</p>
        <p>After the next sweep,</p>
        <p>\[
        V_2(A)=2+0.5(4)=4.
        \]</p>
        <p>The second sweep propagates information about the terminal reward backward.</p>

        <h3>Why this matters for modern RL</h3>
        <p>Model-free RL often uses sampled versions of Bellman updates because the full transition model is unknown. The structure survives even when exact sums over \(s'\) are replaced by experience tuples.</p>
        <div class="paper-connection"><strong>Paper connection.</strong> DQN can be viewed as approximate value iteration with a neural Q-function, sampled transitions, replay data, and a target network.</div>
      `
    },
    {
      id: "monte-carlo-evaluation",
      title: "10. Monte Carlo evaluation learns values from complete sampled returns",
      html: String.raw`
        <p>Monte Carlo evaluation does not need a transition model. It waits for an episode to generate a complete return and uses that return as a target.</p>
        <p>For a visited state \(S_t=s\), the target is</p>
        <p>\[
        G_t=R_{t+1}+\gamma R_{t+2}+\cdots.
        \]</p>
        <p>A simple incremental value update is</p>
        <p>\[
        V(s)\leftarrow V(s)+\alpha\left[G_t-V(s)\right].
        \]</p>

        <h3>Numerical update</h3>
        <p>Suppose the current estimate is \(V(s)=5\), the sampled return is \(G_t=8\), and \(\alpha=0.2\). Then</p>
        <p>\[
        V(s)\leftarrow5+0.2(8-5)=5.6.
        \]</p>

        <h3>Why Monte Carlo targets can be noisy</h3>
        <p>Two visits to the same state can lead to very different future reward sequences. The complete return is unbiased for the value under suitable on-policy sampling, but it can have high variance.</p>

        <h3>Episode requirement</h3>
        <p>Basic Monte Carlo evaluation is natural for episodic problems because it needs the later rewards before it can compute the full return. Continuing tasks need truncation, average-reward methods, or other constructions.</p>
        <div class="definition"><strong>Bias-variance intuition.</strong> Monte Carlo uses a real sampled future, so it does not bootstrap from a learned value estimate. This can reduce bootstrap bias but increase variance.</div>
      `
    },
    {
      id: "temporal-difference-learning",
      title: "11. Temporal-difference learning updates before the final return is known",
      html: String.raw`
        <p>Temporal-difference, or TD, learning combines sampling with bootstrapping. A one-step TD target is</p>
        <p>\[
        Y_t=R_{t+1}+\gamma V(S_{t+1}).
        \]</p>
        <p>The TD error is</p>
        <p>\[
        \delta_t
        =R_{t+1}+\gamma V(S_{t+1})-V(S_t).
        \]</p>
        <p>The tabular update is</p>
        <p>\[
        V(S_t)\leftarrow V(S_t)+\alpha\delta_t.
        \]</p>

        <h3>Numerical example</h3>
        <p>Let</p>
        <p>\[
        V(S_t)=4,
        \qquad
        R_{t+1}=2,
        \qquad
        V(S_{t+1})=6,
        \qquad
        \gamma=0.9.
        \]</p>
        <p>Then</p>
        <p>\[
        \delta_t=2+0.9(6)-4=3.4.
        \]</p>
        <p>With \(\alpha=0.1\),</p>
        <p>\[
        V(S_t)\leftarrow4+0.1(3.4)=4.34.
        \]</p>

        <h3>What bootstrapping means</h3>
        <p>The target includes the current estimate \(V(S_{t+1})\). The algorithm uses one learned estimate to improve another learned estimate.</p>

        <h3>Function approximation</h3>
        <p>With a neural critic \(V_\phi(s)\), a common squared TD loss is</p>
        <p>\[
        L_V(\phi)
        =\frac1B\sum_{i=1}^{B}
        \left(V_\phi(s_i)-y_i\right)^2,
        \]</p>
        <p>where \(y_i=r_i+\gamma V_{\bar\phi}(s_i')\) can use a stopped-gradient or target-network value estimate.</p>
        <div class="shape-check"><strong>Shape check.</strong> For \(B\) transitions, predicted values and targets are usually both \(B\times1\). A per-sample TD error can therefore also be stored as \(B\times1\).</div>
      `
    }
  );
})();