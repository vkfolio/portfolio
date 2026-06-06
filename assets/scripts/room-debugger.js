// room-debugger.js — drive the agent-graph animation and console ticker.

(() => {
  const NODES = ['planner', 'executor', 'validator'];
  let step = 0;

  const nodeEls = NODES.map((n, i) => document.getElementById(`gnode-${n}`));
  const edgeEls = [
    document.getElementById('gedge-0'),
    document.getElementById('gedge-1'),
  ];
  const loopEl = document.getElementById('gloop');
  const stepEl = document.getElementById('graphStep');
  const consoleEl = document.getElementById('debugConsole');

  const msgs = [
    { ts: 'T+0.000s', cls: 'b',  txt: '<span class="msg b">[trace] ingesting agent.run #12 ...</span>' },
    { ts: 'T+0.042s', cls: 'ok', txt: '<span class="msg ok">→ planner</span> emitted plan with 3 steps' },
    { ts: 'T+0.083s', cls: '',   txt: '<span class="msg">tool call · web_search · "WebGL canvas perf 2025"</span>' },
    { ts: 'T+0.241s', cls: 'ok', txt: '<span class="msg ok">→ executor</span> ok · 4 sources retrieved' },
    { ts: 'T+0.302s', cls: '',   txt: '<span class="msg">→ validator</span> checks plan satisfaction' },
    { ts: 'T+0.318s', cls: 'warn',txt: '<span class="msg warn">↺ replan</span> · validator returned insufficient' },
    { ts: 'T+0.401s', cls: 'ok', txt: '<span class="msg ok">→ planner</span> refined; 2 steps' },
  ];

  const advance = () => {
    step += 1;
    if (stepEl) stepEl.textContent = String(step);
    const active = step % 3;
    nodeEls.forEach((el, i) => el && el.setAttribute('data-active', String(i === active)));
    edgeEls.forEach((el, i) => el && el.setAttribute('data-active', String(i === (active + 2) % 3)));
    if (loopEl) loopEl.setAttribute('data-active', String(active === 0));

    if (consoleEl) {
      const m = msgs[(step - 1) % msgs.length];
      const row = document.createElement('div');
      row.className = 'l';
      row.innerHTML = `<span class="ts">${m.ts}</span><span>${m.txt}</span>`;
      consoleEl.appendChild(row);
      const lines = consoleEl.querySelectorAll('.l');
      if (lines.length > 8) lines[0].remove();
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }
  };

  advance();
  setInterval(advance, 1500);
})();
