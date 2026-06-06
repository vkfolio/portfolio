// room-mycards.js — click a card to bring it to the front of the stack.
(() => {
  const cards = Array.from(document.querySelectorAll('.wallet .card'));
  if (!cards.length) return;

  let order = cards.map((_, i) => i); // visual order

  const layout = () => {
    cards.forEach((c, idxInDom) => {
      const visualIndex = order.indexOf(idxInDom);
      c.setAttribute('data-i', String(visualIndex));
    });
  };
  layout();

  cards.forEach((c, idxInDom) => {
    c.addEventListener('click', () => {
      const current = order.indexOf(idxInDom);
      if (current === 0) {
        // already on top — cycle to the bottom for re-stack feel
        const top = order.shift();
        if (top !== undefined) order.push(top);
      } else {
        order.splice(current, 1);
        order.unshift(idxInDom);
      }
      layout();
    });
  });
})();
