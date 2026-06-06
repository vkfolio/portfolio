// room-chat.js — Olla Chat room. Pre-canned answers about the project.

(() => {
  const thread = document.getElementById('chatThread');
  const composer = document.getElementById('chatInput');
  const suggestEl = document.getElementById('chatSuggests');
  if (!thread || !composer || !suggestEl) return;

  const QA = {
    'what is olla chat': {
      title: 'What is Olla Chat?',
      body: `<p>VS Code chat for <a href="https://ollama.ai" target="_blank" rel="noreferrer">Ollama</a>. Inline chat with locally-running models, scoped to the file or selection you're looking at.</p>
<p>Selection becomes context. Model picker is one keystroke. No accounts, no signups, no telemetry — the extension speaks to <code>localhost:11434</code> and nothing else.</p>`,
      next: ['why local models', 'how do i install it', 'what models does it support'],
    },
    'why local models': {
      title: 'Why local models, in 2026?',
      body: `<p>Two reasons:</p>
<p>One — latency. A 7B model running on the GPU you already paid for turns an LLM call into something you can lean on for inline edits without breaking flow. Browser tabs are friction; the editor is not.</p>
<p>Two — boundary. Code you can't paste into a hosted UI is exactly the code where good LLM help would matter most. Local closes that loop.</p>`,
      next: ['how do i install it', 'what models does it support', 'is there a hosted version'],
    },
    'how do i install it': {
      title: 'Install',
      body: `<p>Install <a href="https://ollama.ai" target="_blank" rel="noreferrer">Ollama</a> from ollama.ai. Pull a model: <code>ollama pull llama3.1:8b</code>.</p>
<p>Then install Olla Chat from the VS Code Marketplace. Open the side panel with <code>Ctrl/Cmd-L</code>. Pick a model. Send.</p>`,
      next: ['what models does it support', 'is there a hosted version', 'who built this'],
    },
    'what models does it support': {
      title: 'Supported models',
      body: `<p>Anything Ollama serves. Olla Chat talks to Ollama over its native API and falls back to the OpenAI-compatible endpoint when needed.</p>
<p>The picker reads <code>/api/tags</code> at startup, so newly pulled models appear without restart.</p>`,
      next: ['why local models', 'is there a hosted version', 'who built this'],
    },
    'is there a hosted version': {
      title: 'Hosted version?',
      body: `<p>No. The whole point is that there isn't one. The extension speaks to <code>localhost:11434</code> and never to a remote endpoint.</p>
<p>If your team wants a shared model server, point <code>OLLA_BASE_URL</code> at an internal Ollama instance. Still no third-party round-trip.</p>`,
      next: ['why local models', 'who built this'],
    },
    'who built this': {
      title: 'Who built this?',
      body: `<p>Me — <a href="/about.html">Vignesh Karnika</a>. Lead architect by day, OSS tools by night. Olla Chat is one of <a href="/">eight rooms</a> in this workshop.</p>
<p>If you want the longer answer to "why I build small tools instead of one big one", that's in the <a href="/notes/why-i-built-sable.html">Sable field note</a>.</p>`,
      next: ['what is olla chat', 'why local models'],
    },
  };

  const seeds = ['what is olla chat', 'why local models', 'how do i install it'];

  const addBubble = (kind, html, meta = '') => {
    const el = document.createElement('div');
    el.className = `bubble bubble--${kind}`;
    const avatarLetter = kind === 'user' ? 'you' : 'O';
    el.innerHTML = `
      <div class="bubble__avatar">${avatarLetter}</div>
      <div>
        <div class="bubble__body">${html}</div>
        ${meta ? `<div class="bubble__meta">${meta}</div>` : ''}
      </div>
    `;
    thread.appendChild(el);
    thread.scrollTop = thread.scrollHeight;
    return el;
  };

  const renderSuggests = (keys) => {
    suggestEl.innerHTML = `<div class="chat__suggest-label">try asking</div>`;
    keys.forEach((k) => {
      const btn = document.createElement('button');
      btn.className = 'chat__suggest';
      btn.textContent = QA[k] ? QA[k].title.replace(/\?$/, '?') : k;
      btn.addEventListener('click', () => ask(k));
      suggestEl.appendChild(btn);
    });
  };

  const ask = (key) => {
    const a = QA[key];
    if (!a) {
      addBubble('user', key);
      addBubble('ai', `<p>I haven't been seeded with an answer to that. The real Olla Chat would route this to whichever Ollama model you have selected — which would actually answer it. Try one of these:</p>`, 'gpt-this-is-a-demo · 0 tokens');
      renderSuggests(seeds);
      return;
    }
    addBubble('user', a.title);
    // simulate streaming with a tiny delay
    const t0 = performance.now();
    setTimeout(() => {
      const ms = Math.round(performance.now() - t0);
      addBubble('ai', a.body, `llama3.1 · local · ${(ms + 280)} ms · ${a.body.replace(/<[^>]+>/g, '').length} chars`);
      renderSuggests(a.next || seeds);
    }, 280);
  };

  document.getElementById('chatForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = composer.value.trim().toLowerCase();
    if (!v) return;
    composer.value = '';
    // match by leading-word
    const key = Object.keys(QA).find(k => k.includes(v) || v.includes(k.split(' ')[0]));
    ask(key || v);
  });

  // seed the conversation
  addBubble('ai', `<p>Hey. Olla Chat is the VS Code extension you're reading about — but this room is a chat <em>about</em> it, where the AI is me.</p><p>Ask anything. Or click a chip below.</p>`, 'olla-chat · seeded');
  renderSuggests(seeds);
})();
