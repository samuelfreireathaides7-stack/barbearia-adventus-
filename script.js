document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => preloader?.classList.add("hide"), 650);

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  });

  menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  function setupMore(buttonId, selector, closedText, openText) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    button.addEventListener("click", () => {
      const items = document.querySelectorAll(selector);
      const opening = [...items].some(item => !item.classList.contains("show"));
      items.forEach(item => item.classList.toggle("show", opening));
      button.innerHTML = opening ? `${openText} <span>−</span>` : `${closedText} <span>+</span>`;
      if (opening) {
        items.forEach(item => observer.observe(item));
      }
    });
  }

  setupMore("serviceMore", ".extra-service", "Ver mais serviços", "Mostrar menos");

  // Planos: mantém os 3 primeiros visíveis e revela os planos 04 a 07.
  const planMore = document.getElementById("planMore");
  if (planMore) {
    planMore.type = "button";
    planMore.addEventListener("click", (event) => {
      event.preventDefault();
      const extraPlans = document.querySelectorAll(".plans-grid .extra-plan");
      const opening = !planMore.classList.contains("expanded");

      extraPlans.forEach(card => {
        card.classList.toggle("show", opening);
        if (opening) observer.observe(card);
      });

      planMore.classList.toggle("expanded", opening);
      planMore.innerHTML = opening
        ? 'Mostrar menos <span>−</span>'
        : 'Ver mais planos <span>+</span>';
    });
  }

  const modal = document.getElementById("loginModal");
  const openLogin = document.getElementById("loginOpen");
  const closeLogin = () => {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  openLogin?.addEventListener("click", () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
  document.getElementById("loginClose")?.addEventListener("click", closeLogin);
  document.getElementById("loginX")?.addEventListener("click", closeLogin);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLogin(); });

  document.getElementById("loginForm")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Área de cliente em demonstração. Para login real, é necessário conectar autenticação e banco de dados.");
    closeLogin();
  });
});