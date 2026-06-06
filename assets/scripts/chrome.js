// chrome.js — theme toggle + active-link + topbar scroll state

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
      const label = pref === 'system' ? 'Theme' : pref.charAt(0).toUpperCase() + pref.slice(1);
      btn.textContent = label;
      btn.setAttribute('aria-pressed', String(pref !== 'system'));
    }
  };

  const stored = localStorage.getItem(THEME_KEY) || 'light';
  apply(stored);

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    if ((localStorage.getItem(THEME_KEY) || 'light') === 'system') apply('system');
  });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('#themeToggle');
    if (!t) return;
    const order = ['light', 'dark', 'system'];
    const current = localStorage.getItem(THEME_KEY) || 'light';
    const next = order[(order.indexOf(current) + 1) % order.length];
    localStorage.setItem(THEME_KEY, next);
    apply(next);
  });

  // Active nav link
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

  // Topbar scroll state
  const topbar = document.getElementById('topbar');
  if (topbar) {
    const onScroll = () => {
      topbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
