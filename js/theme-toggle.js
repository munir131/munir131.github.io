document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;
  
    if (toggle) {
      toggle.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        localStorage.setItem("theme", next);
      });
    }
  
    const saved = localStorage.getItem("theme");
    if (saved) {
      root.dataset.theme = saved;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.dataset.theme = "dark";
    }

    // Skill detail toggle
    document.querySelectorAll('.skill-button').forEach(button => {
      button.addEventListener('click', () => {
        const detailId = button.dataset.detail;
        const detailElement = document.getElementById(detailId);

        if (detailElement) {
            // Toggle visibility of the clicked skill detail
            detailElement.classList.toggle('visible');
            button.setAttribute('aria-expanded', detailElement.classList.contains('visible'));

            // Hide other skill details
            document.querySelectorAll('.skill-detail').forEach(otherDetail => {
            if (otherDetail.id !== detailId) {
                otherDetail.classList.remove('visible');
            }
            });
        }
      });
    });

    // Update copyright year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
  
  