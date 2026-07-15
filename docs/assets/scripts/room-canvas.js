// room-canvas.js — minimal pan/zoom for the Mogo canvas room.

(() => {
  const stage = document.getElementById('cvStage');
  const plane = document.getElementById('cvPlane');
  const where = document.getElementById('cvWhere');
  if (!stage || !plane) return;

  let x = 0, y = 0, z = 1;
  const min = 0.4, max = 2.2;

  const apply = () => {
    plane.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
    if (where) where.innerHTML = `x <span class="acc">${Math.round(-x)}</span> · y <span class="acc">${Math.round(-y)}</span> · z <span class="acc">${z.toFixed(2)}×</span>`;
  };

  const fit = () => {
    const rect = stage.getBoundingClientRect();
    // initial composition is roughly centered on (0,0). center it.
    z = Math.min(1, rect.width / 1100);
    x = rect.width / 2 - 540 * z;
    y = rect.height / 2 - 280 * z;
    apply();
  };

  // pan
  let panning = false, lastX = 0, lastY = 0;
  stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.cv__node a')) return;
    panning = true; lastX = e.clientX; lastY = e.clientY;
    stage.classList.add('is-panning');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', (e) => {
    if (!panning) return;
    x += e.clientX - lastX;
    y += e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    apply();
  });
  const stopPan = (e) => {
    panning = false; stage.classList.remove('is-panning');
    try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  stage.addEventListener('pointerup', stopPan);
  stage.addEventListener('pointercancel', stopPan);
  stage.addEventListener('pointerleave', stopPan);

  // zoom (trackpad pinch or wheel)
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const delta = -e.deltaY * 0.0018;
    const next = Math.min(max, Math.max(min, z * (1 + delta)));
    // zoom about cursor
    const k = next / z;
    x = mx - (mx - x) * k;
    y = my - (my - y) * k;
    z = next;
    apply();
  }, { passive: false });

  // buttons
  document.getElementById('cvFit')?.addEventListener('click', fit);
  document.getElementById('cvZoomIn')?.addEventListener('click', () => {
    const rect = stage.getBoundingClientRect();
    const mx = rect.width / 2, my = rect.height / 2;
    const next = Math.min(max, z * 1.2);
    const k = next / z;
    x = mx - (mx - x) * k; y = my - (my - y) * k; z = next; apply();
  });
  document.getElementById('cvZoomOut')?.addEventListener('click', () => {
    const rect = stage.getBoundingClientRect();
    const mx = rect.width / 2, my = rect.height / 2;
    const next = Math.max(min, z * 0.83);
    const k = next / z;
    x = mx - (mx - x) * k; y = my - (my - y) * k; z = next; apply();
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === '0' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); fit(); }
    if (e.key === '+' || e.key === '=') { document.getElementById('cvZoomIn')?.click(); }
    if (e.key === '-') { document.getElementById('cvZoomOut')?.click(); }
    if (e.key === 'f' && !e.ctrlKey && !e.metaKey && document.activeElement === document.body) fit();
  });

  fit();
})();
