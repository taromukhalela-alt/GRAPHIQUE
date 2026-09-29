const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(
  document.querySelectorAll(".nav-container .btn-12"),
);
const mobileQuery = window.matchMedia("(max-width: 760px)");

function setMenu(open) {
  if (!navbar || !navToggle) return;
  navbar.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

function closeMenu() {
  setMenu(false);
}

if (navbar && navToggle) {
  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  // Close after choosing a destination.
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const wasOpen = navToggle.getAttribute("aria-expanded") === "true";
      closeMenu();
      if (wasOpen) navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) closeMenu();
  });

  // The dropdown only exists on small screens; drop the state when it does not.
  mobileQuery.addEventListener("change", closeMenu);
}

// Highlight the link for the section currently in view.
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const active = navLinks.find(
          (link) => link.getAttribute("href") === `#${entry.target.id}`,
        );
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        if (active) active.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => spy.observe(section));
}

const hero = document.querySelector("#hero");
const backgroundElements = document.querySelectorAll(
  ".bg-circle, .bg-square, .bg-type",
);

hero.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const mouseX = (x - centerX) / centerX;
  const mouseY = (y - centerY) / centerY;

  backgroundElements.forEach((element, index) => {
    const strength = (index + 1) * 8;

    element.style.transform = `translate(${mouseX * strength}px, ${mouseY * strength}px)`;
  });
});

const heroTextAccent = document.querySelector("#hero-text span");

hero.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  heroTextAccent.style.setProperty("--text-x", x * 12);
  heroTextAccent.style.setProperty("--text-y", y * 12);
});

const designs = document.querySelector("#designs");
const dotField = document.querySelector(".dot-field");

designs.addEventListener("mousemove", (event) => {
  const rect = designs.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  dotField.style.setProperty("--dot-x", `${x * 20}px`);
  dotField.style.setProperty("--dot-y", `${y * 20}px`);
});



const spirals = document.querySelectorAll(".spiral");

designs.addEventListener("mousemove", (event) => {
  const rect = designs.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  spirals.forEach((spiral) => {
    const spiralRect = spiral.getBoundingClientRect();

    const spiralX = spiralRect.left + spiralRect.width / 2 - rect.left;

    const spiralY = spiralRect.top + spiralRect.height / 2 - rect.top;

    const distance = Math.hypot(mouseX - spiralX, mouseY - spiralY);

    if (distance < 350) {
      spiral.style.scale = "1.08";
      spiral.style.opacity = "0.25";
    } else {
      spiral.style.scale = "1";
      spiral.style.opacity = "";
    }
  });
});

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    designs.classList.add("project-active");
  });

  project.addEventListener("mouseleave", () => {
    designs.classList.remove("project-active");
  });
});