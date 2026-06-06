// room-terminal.js — fake-but-honest OrioSearch shell.
// Commands: help, about, why, query <terms>, install, ls, clear, whoami, exit

(() => {
  const body = document.getElementById('termBody');
  const input = document.getElementById('termInput');
  const promptLine = document.getElementById('termPromptLine');
  if (!body || !input) return;

  const history = [];
  let hi = 0;

  const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const FAKE_RESULTS = (q) => {
    const seeds = [
      ['blog.vkfolio.com/oriosearch-v0-3', 'OrioSearch v0.3 — self-hosted Tavily-compatible search',
        'Federates SearXNG instances, reranks with a small cross-encoder, exposes a Tavily-shape /search endpoint.'],
      ['github.com/vkfolio/oriosearch', 'vkfolio/oriosearch · github',
        'Single-binary Docker image, MIT licensed. Works with the Tavily SDK v0.3+ and LangChain’s TavilySearchAPIWrapper.'],
      ['docs.searxng.org/architecture.html', 'SearXNG · architecture',
        'OrioSearch sits in front of one or more SearXNG instances and federates between them.'],
      ['tavily.com/docs/api-reference', 'Tavily Search API · reference',
        'OrioSearch is a drop-in replacement for this endpoint shape; swap base URL only.'],
    ];
    const highlight = (text, q) => {
      const terms = q.split(/\s+/).filter(Boolean);
      let out = escape(text);
      for (const t of terms) {
        if (!t || t.length < 2) continue;
        const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        out = out.replace(re, '<span class="hi">$1</span>');
      }
      return out;
    };
    return seeds.map(([url, title, snip]) => ({
      url,
      title: highlight(title, q),
      snippet: highlight(snip, q),
    }));
  };

  const help = `<div class="term__output">
<span class="b">oriosearch</span> · self-hosted, Tavily-compatible web search API
<span class="muted">v0.3 · MIT · github.com/vkfolio/oriosearch</span>

<span class="b">commands</span>
<table>
  <tr><td>help</td><td>this message</td></tr>
  <tr><td>about</td><td>what oriosearch is, and why</td></tr>
  <tr><td>why</td><td>field note: private knowledge graphs for codebases</td></tr>
  <tr><td>query &lt;terms&gt;</td><td>issue a search (results are illustrative for this demo)</td></tr>
  <tr><td>install</td><td>docker / sdk instructions</td></tr>
  <tr><td>ls</td><td>list other rooms in this workshop</td></tr>
  <tr><td>whoami</td><td>about the developer</td></tr>
  <tr><td>clear</td><td>wipe the scrollback</td></tr>
  <tr><td>exit</td><td>back to the trace</td></tr>
</table>
<span class="muted">tip: <span class="kbd">↑</span> / <span class="kbd">↓</span> walk history · <span class="kbd">Tab</span> autocompletes</span>
</div>`;

  const about = `<div class="term__output">
<span class="b">oriosearch</span> is a drop-in replacement for the Tavily Search API
you can run on your own box.

<span class="b">— problem</span>
Hosted search APIs lock you out the moment quotas tighten, and you
pay per call for queries you've already seen.

<span class="b">— approach</span>
Federates over <a href="https://docs.searxng.org">SearXNG</a> instances.
Falls back through a pool when one rate-limits. Snippets reranked
locally with a small cross-encoder. Stateless by default; caching
is opt-in via a Redis URL — no hidden persistence.

<span class="b">— shipped</span>
Single-binary Docker image. <span class="accent">docker run -p 7700 oriosearch</span>
brings it up. Compatible with the Tavily SDK v0.3+, LangChain's
TavilySearchAPIWrapper, and llamaindex's tool wrapper.
</div>`;

  const installText = `<div class="term__output">
<span class="b">install — three ways</span>

<span class="muted">1. docker (recommended)</span>
<span class="accent">$ docker run -p 7700:7700 vkfolio/oriosearch:0.3</span>

<span class="muted">2. python sdk drop-in</span>
<span class="accent">$ pip install tavily-python</span>
  <span class="muted">then in code:</span>
  <span class="accent">client = TavilyClient(api_key="local", base_url="http://localhost:7700")</span>

<span class="muted">3. source</span>
<span class="accent">$ git clone https://github.com/vkfolio/oriosearch &amp;&amp; cd oriosearch &amp;&amp; just up</span>
</div>`;

  const whoamiText = `<div class="term__output">
<span class="b">vignesh karnika</span> · solutions architect · bengaluru, IN
fourteen years building production systems. lead architect at
<a href="/work.html">streamoid</a> on Artifax (AI-native WebGL canvas)
and Desara (cloud-streamed Unreal). one US patent.

<a href="/about.html">/about</a> · <a href="/work.html">/work</a> · <a href="/resume.html">/resume</a>
</div>`;

  const lsText = `<div class="term__output">
<a href="/projects/vizlang-studio.html">vizlang-studio/</a>     <span class="muted">visual debugger for langgraph agents</span>
<a href="/projects/olla-chat.html">olla-chat/</a>           <span class="muted">vs code chat for ollama</span>
<a href="/projects/pydebug.html">pydebug/</a>             <span class="muted">visualise python structures while debugging</span>
<a href="/projects/stateviz.html">stateviz/</a>            <span class="muted">vs code state-tree visualiser</span>
<a href="/projects/a2ui-vue.html">a2ui-vue/</a>            <span class="muted">vue 3 renderer for google's a2ui protocol</span>
<a href="/projects/sable.html">sable/</a>               <span class="muted">a small, deliberate ui library</span>
<a href="/projects/mogo.html">mogo/</a>                <span class="muted">personal creative-tools r&amp;d</span>
<a href="/projects/mycards.html">mycards/</a>             <span class="muted">ios, ids and documents, offline-only</span>
<a href="/">.. (trace)</a>
</div>`;

  const whyText = `<div class="term__output">
<span class="muted">opening field note ...</span>
<a href="/notes/private-knowledge-graphs.html"><span class="b">private knowledge graphs for codebases →</span></a>
<span class="muted">a problem class, written carefully without naming any product or employer.</span>
</div>`;

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return '';
    if (cmd === 'help' || cmd === '?')        return help;
    if (cmd === 'about')                       return about;
    if (cmd === 'install')                     return installText;
    if (cmd === 'whoami')                      return whoamiText;
    if (cmd === 'ls' || cmd === 'ls -la')      return lsText;
    if (cmd === 'why')                         return whyText;
    if (cmd === 'exit' || cmd === 'cd ..')     { window.location.href = '/'; return ''; }
    if (cmd === 'clear') { body.querySelectorAll('.term__history').forEach((n) => n.remove()); return ''; }

    if (cmd.startsWith('query') || cmd.startsWith('search')) {
      const parts = cmd.split(/\s+/).slice(1).join(' ').replace(/^"|"$/g, '');
      if (!parts) return `<div class="term__output muted">usage: query &lt;terms&gt;</div>`;
      const results = FAKE_RESULTS(parts);
      const list = results.map(r => `
        <div class="term__result">
          <div class="url">${escape(r.url)}</div>
          <div class="title">${r.title}</div>
          <div class="snippet">${r.snippet}</div>
        </div>`).join('');
      return `<div class="term__output">
<span class="muted">GET /search?q=${escape(parts)}&amp;k=4</span>
<span class="muted">200 OK · 138 ms · federated [searxng-a, searxng-b]</span>
${list}
<span class="muted">(illustrative results — production federates over a SearXNG pool and reranks locally.)</span>
</div>`;
    }

    return `<div class="term__output">
<span class="muted">oriosearch: unknown command:</span> ${escape(cmd)}
<span class="muted">try</span> <span class="accent">help</span><span class="muted">.</span>
</div>`;
  };

  const writeLine = (cmd, html) => {
    const wrap = document.createElement('div');
    wrap.className = 'term__history';
    wrap.innerHTML = `
      <div class="term__line">
        <span class="term__prompt"><span class="host">~</span><span class="sep">/</span><span class="pwd">oriosearch</span> <span class="at">$</span></span>
        <span class="term__cmd">${escape(cmd)}</span>
      </div>
      ${html || ''}
    `;
    body.insertBefore(wrap, promptLine);
    body.scrollTop = body.scrollHeight;
  };

  const submit = (rawInput) => {
    const cmd = (rawInput ?? input.value).trim();
    if (!cmd) return;
    history.push(cmd); hi = history.length;
    const out = run(cmd);
    if (cmd !== 'clear' && cmd !== 'exit') writeLine(cmd, out);
    input.value = '';
    input.focus();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')       { e.preventDefault(); submit(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); if (hi > 0) input.value = history[--hi] || ''; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (hi < history.length) input.value = history[++hi] || ''; }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const all = ['help','about','why','install','query ','ls','whoami','clear','exit'];
      const cur = input.value.trim();
      const m = all.find(a => a.startsWith(cur));
      if (m) input.value = m;
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submit('clear');
    }
  });

  // Run the welcome command
  writeLine('help', help);

  // Make clicking anywhere in the body focus the input
  body.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    input.focus();
  });
  input.focus();
})();
