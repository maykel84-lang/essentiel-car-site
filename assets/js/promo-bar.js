(function () {
  const items = document.querySelectorAll('.promo-bar-item');
  if (!items.length) return;
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
})();
