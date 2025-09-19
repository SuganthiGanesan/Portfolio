document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Scroll Reveal Animation
  gsap.utils.toArray(".slide-up").forEach(section => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Preloader fade out
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      gsap.to(preloader, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5
      });
    }, 1500);
  }

  // Particles.js Background
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 }
      },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  // Dark Mode Toggle & Persistence
  const toggleBtn = document.getElementById("dark-toggle");
  const prefersDark = localStorage.getItem("darkMode");

  if (!prefersDark || prefersDark === "true") {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "true");
  }

  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
  });

  // Smooth Scroll on Nav Click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  // Project Cards Open GitHub Repo
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.tagName === 'A' || e.target.classList.contains("view-cert-btn")) return;
      const repo = card.getAttribute("data-repo");
      if (repo) window.open(repo.trim(), "_blank");
    });
  });

  // Certificate Viewer
  document.querySelectorAll(".view-cert-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const certPath = btn.getAttribute("data-cert");
      if (certPath) {
        window.open(certPath, "_blank");
      }
    });
  });

  // Tabs for Project Categories
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  // Optional: Show first tab by default
  if (tabButtons.length && tabContents.length) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  }
});
