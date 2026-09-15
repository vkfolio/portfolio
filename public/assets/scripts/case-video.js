// case-video.js — selected-work preview loops (play only while on screen) + demo dialog.
// Dependency-free, respects prefers-reduced-motion.

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── inline preview loops ───
  const previews = document.querySelectorAll('.case__video');
  if (previews.length && !reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) {
            v.preload = 'auto';
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    previews.forEach((v) => io.observe(v));
  }

  // ─── demo dialog ───
  const dialog = document.getElementById('demo-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const frame = dialog.querySelector('.demo__frame');
  const title = dialog.querySelector('.demo__title');

  const player = ({ demoYoutube, demoStart, demoSrc, demoTitle }) => {
    if (demoYoutube) {
      const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1' });
      if (demoStart) params.set('start', demoStart);
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(demoYoutube)}?${params}`;
      iframe.title = demoTitle || 'Product demo';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      return iframe;
    }
    const video = document.createElement('video');
    video.src = demoSrc;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    return video;
  };

  document.querySelectorAll('[data-demo-youtube],[data-demo-src]').forEach((btn) => {
    btn.addEventListener('click', () => {
      title.textContent = btn.dataset.demoTitle || 'Product demo';
      frame.replaceChildren(player(btn.dataset));
      dialog.showModal();
    });
  });

  dialog.querySelector('.demo__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  // Dropping the player stops playback (an iframe can't be paused from here).
  dialog.addEventListener('close', () => frame.replaceChildren());
})();
