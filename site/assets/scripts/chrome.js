// chrome.js — theme toggle + active-link + tiny page-level interactions

(() => {
  const root = document.documentElement;
  const THEME_KEY = 'vkfolio.theme';

  const apply = (pref) => {
    if (pref === 'system') {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', pref);
    }
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.textContent = `theme · ${pref}`;
      btn.setAttribute('aria-pressed', String(pref !== 'system'));
    }
  };

  const stored = localStorage.getItem(THEME_KEY) || 'system';
  apply(stored);

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    if ((localStorage.getItem(THEME_KEY) || 'system') === 'system') apply('system');
  });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('#themeToggle');
    if (!t) return;
    const order = ['system', 'light', 'dark'];
    const current = localStorage.getItem(THEME_KEY) || 'system';
    const next = order[(order.indexOf(current) + 1) % order.length];
    localStorage.setItem(THEME_KEY, next);
    apply(next);
  });

  const path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.topbar__links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (
      (href === path) ||
      (href !== '/' && path.startsWith(href.replace(/\/$/, '')))
    ) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
