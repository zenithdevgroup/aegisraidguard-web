window.addEventListener("scroll", () => {
  document.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
      card.style.transition = "0.5s";
    }
  });
});
