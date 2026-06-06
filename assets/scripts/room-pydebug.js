// room-pydebug.js — hover on a "field" in the repr; the shape panel shows its detail.
(() => {
  const focusEl = document.getElementById('pyFocus');
  const fields = document.querySelectorAll('.repr .field');
  if (!focusEl || !fields.length) return;

  const DEFAULT = `<em>hover</em> a <em>dotted</em> field on the left — its shape lights up here.`;
  focusEl.innerHTML = DEFAULT;

  fields.forEach((f) => {
    const detail = f.getAttribute('data-detail');
    if (!detail) return;
    f.addEventListener('mouseenter', () => { focusEl.innerHTML = detail; });
    f.addEventListener('focus',      () => { focusEl.innerHTML = detail; });
    f.addEventListener('mouseleave', () => { focusEl.innerHTML = DEFAULT; });
    f.addEventListener('blur',       () => { focusEl.innerHTML = DEFAULT; });
    f.setAttribute('tabindex', '0');
  });
})();
