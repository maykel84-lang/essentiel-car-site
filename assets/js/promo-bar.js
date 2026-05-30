(function () {
  /* ── Promo bar rotation ── */
  const items = document.querySelectorAll('.promo-bar-item');
  if (items.length) {
    let cur = 0;
    let timer;
    function show(idx) {
      items[cur].classList.remove('active');
      cur = (idx + items.length) % items.length;
      items[cur].classList.add('active');
    }
    function startTimer() {
      clearInterval(timer);
      timer = setInterval(() => show(cur + 1), 4000);
    }
    document.getElementById('promoNext')?.addEventListener('click', () => { show(cur + 1); startTimer(); });
    document.getElementById('promoPrev')?.addEventListener('click', () => { show(cur - 1); startTimer(); });
    startTimer();
  }

  /* ── Best Sellers slot machine ── */
  const slot = document.getElementById('bsSlot');
  if (!slot) return;

  const values = ['-10%', '-30%', '-70%', '-20%', '-80%', '-40%', '-60%', '-15%', '-50%'];
  let spinning = false;

  // Build strip HTML
  slot.innerHTML = values.map((v, i) =>
    `<span class="bs-slot-item${i === values.length - 1 ? ' bs-slot-winner' : ''}">${v}</span>`
  ).join('');

  function spin() {
    if (spinning) return;
    spinning = true;
    const h = slot.querySelector('.bs-slot-item')?.offsetHeight || 72;
    const totalY = -((values.length - 1) * h);

    // Reset to top instantly
    slot.style.transition = 'none';
    slot.style.transform = 'translateY(0)';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      // Fast phase: zoom through first 60%
      slot.style.transition = `transform ${values.length * 0.12}s cubic-bezier(0.4, 0, 0.8, 1)`;
      slot.style.transform = `translateY(${totalY * 0.6}px)`;

      setTimeout(() => {
        // Slow phase: ease into -50%
        slot.style.transition = `transform ${values.length * 0.17}s cubic-bezier(0.1, 0.8, 0.25, 1)`;
        slot.style.transform = `translateY(${totalY}px)`;
        setTimeout(() => { spinning = false; }, values.length * 170 + 150);
      }, values.length * 120 - 60);
    }));
  }

  // First spin after page loads
  setTimeout(spin, 500);
  // Repeat every 3.2s
  setInterval(spin, 3200);
})();
