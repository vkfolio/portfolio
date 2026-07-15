// fx.js — scroll reveals + hero constellation backdrop.
// Dependency-free, performance-conscious, respects prefers-reduced-motion.

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── scroll reveals ───
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0, rootMargin: '0px 0px 22% 0px' }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  // ─── count-up stats ───
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const runCount = (el) => {
      const raw = el.getAttribute('data-count') || el.textContent || '';
      const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (!isFinite(target)) return;
      if (reduce) { el.textContent = raw; return; }
      const dur = 1100;
      let start = null;
      const step = (t) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach((el) => (el.textContent = el.getAttribute('data-count') || el.textContent));
    } else {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              runCount(e.target);
              cio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
    }
  }

  // ─── hero constellation ───
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || reduce) return;

  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1, points = [], running = true;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const accent =
    getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4F46E5';
  const LINK = 130; // px distance to draw links

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(18, Math.min(64, Math.floor((w * h) / 15000)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 0.6,
    }));
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const px = mouse.x * 16;
    const py = mouse.y * 16;

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    // links
    ctx.lineWidth = 1;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - d2 / (LINK * LINK)) * 0.45;
          ctx.beginPath();
          ctx.moveTo(a.x + px, a.y + py);
          ctx.lineTo(b.x + px, b.y + py);
          ctx.stroke();
        }
      }
    }

    // nodes
    ctx.fillStyle = accent;
    for (const p of points) {
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(p.x + px, p.y + py, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width - 0.5;
    mouse.ty = (e.clientY - r.top) / r.height - 0.5;
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', onMove, { passive: true });

  // pause when the hero scrolls off-screen (saves battery/CPU)
  if ('IntersectionObserver' in window) {
    const vis = new IntersectionObserver((entries) => {
      const on = entries[0].isIntersecting;
      if (on && !running) {
        running = true;
        requestAnimationFrame(draw);
      } else if (!on) {
        running = false;
      }
    });
    vis.observe(canvas);
  }

  requestAnimationFrame(draw);
})();
