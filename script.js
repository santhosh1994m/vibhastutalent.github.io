const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const leadForm = document.getElementById("leadForm");
const toast = document.getElementById("toast");
const header = document.querySelector(".site-header");
const heroVisual = document.querySelector(".hero-visual");

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

function updateActiveTab() {
  const marker = window.scrollY + 120;
  let current = sections[0]?.id || "";

  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });

  navAnchors.forEach((link) => {
    const target = link.getAttribute("href");
    link.classList.toggle("active", target === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveTab, { passive: true });
window.addEventListener("load", updateActiveTab);

window.addEventListener("scroll", () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 8 ? "0 10px 24px rgba(15, 23, 42, 0.08)" : "none";
}, { passive: true });

const revealTargets = document.querySelectorAll(
  ".about-card, .service-card, .step-card, .industry-grid div, .why-grid .glass-card, .people-card, .contact-box, .hero-visual, .stats div"
);

revealTargets.forEach((node) => node.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((node) => revealObserver.observe(node));

window.addEventListener("mousemove", (event) => {
  if (!heroVisual) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 6;
  const y = (event.clientY / window.innerHeight - 0.5) * 6;
  heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!toast) return;

  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2500);
  leadForm.reset();
});
