// mostrar cards inmediatamente si ya están visibles
function showCards() {
  document.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
}

// al cargar
window.addEventListener("load", showCards);

// al hacer scroll
window.addEventListener("scroll", showCards);

// CONTADOR
function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);

  if (!obj) return;

  let timer = setInterval(() => {
    current += increment;
    obj.textContent = current.toLocaleString();
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

animateValue("servers", 0, 1287, 2000);
animateValue("users", 0, 54213, 2000);
