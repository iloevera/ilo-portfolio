import projects from "../data/projects.js";

const sections = ["home", "about", "projects", "contact"];

const scroller = document.querySelector("#site-track");
const projectsGrid = document.querySelector("#projects-grid");
const navLinks = Array.from(document.querySelectorAll("[data-section-link]"));
const jumpLinks = Array.from(document.querySelectorAll("[data-jump]"));
const progressBar = document.querySelector("#nav-progress");
const sectionStatus = document.querySelector("#section-status");
const dialog = document.querySelector("#project-dialog");
const dialogClose = document.querySelector("#dialog-close");

let activeSection = "home";
let lastFocusedTrigger = null;

function renderProjects() {
  projectsGrid.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white/[0.07] focus-within:-translate-y-1">
          <p class="text-xs uppercase tracking-overline text-accentSoft">${project.eyebrow}</p>
          <h3 class="mt-3 font-display text-[1.9rem] leading-tight text-white">${project.title}</h3>
          <p class="mt-4 text-sm leading-7 text-slate-300">${project.summary}</p>
          <div class="mt-8 flex items-center justify-between gap-4">
            <span class="text-sm text-slate-400">0${index + 1}</span>
            <button type="button" class="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-accent/70 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/70" data-project-trigger="${project.id}">
              Open dossier
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function fillDialog(project) {
  document.querySelector("#dialog-eyebrow").textContent = project.eyebrow;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-summary").textContent = project.summary;
  document.querySelector("#dialog-description").textContent = project.description;
  document.querySelector("#dialog-outcome").textContent = project.outcome;
  document.querySelector("#dialog-deliverables").innerHTML = project.deliverables
    .map((deliverable) => `<li class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">${deliverable}</li>`)
    .join("");
}

function openProject(projectId, trigger) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  fillDialog(project);
  lastFocusedTrigger = trigger;
  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeProject() {
  if (!dialog.open) {
    return;
  }

  dialog.close();
  if (lastFocusedTrigger instanceof HTMLElement) {
    lastFocusedTrigger.focus();
  }
}

function scrollToSection(sectionId, behavior = "smooth") {
  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior,
    block: "nearest",
    inline: "start"
  });

  history.replaceState(null, "", `#${sectionId}`);
}

function updateProgress() {
  const maxScroll = scroller.scrollWidth - scroller.clientWidth;
  const progress = maxScroll <= 0 ? 0 : scroller.scrollLeft / maxScroll;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

function setActiveSection(sectionId) {
  activeSection = sectionId;
  const activeIndex = sections.indexOf(sectionId);
  const displayIndex = activeIndex >= 0 ? activeIndex + 1 : 1;
  sectionStatus.textContent = `${String(displayIndex).padStart(2, "0")} / ${String(sections.length).padStart(2, "0")}`;

  navLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === sectionId;
    link.dataset.active = isActive;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function registerNavigation() {
  [...navLinks, ...jumpLinks].forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      if (!targetId) {
        return;
      }

      event.preventDefault();
      scrollToSection(targetId);
    });
  });
}

function registerProjects() {
  projectsGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-trigger]");
    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }

    openProject(trigger.dataset.projectTrigger, trigger);
  });
}

function registerDialog() {
  dialogClose.addEventListener("click", closeProject);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      closeProject();
    }
  });

  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!clickedInside) {
      closeProject();
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProject();
  });
}

function registerScroller() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        setActiveSection(visibleEntry.target.id);
      }
    },
    {
      root: scroller,
      threshold: [0.35, 0.55, 0.75]
    }
  );

  document.querySelectorAll(".section-panel").forEach((section) => observer.observe(section));

  scroller.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      scroller.scrollBy({
        left: event.deltaY,
        behavior: "auto"
      });
      event.preventDefault();
    },
    { passive: false }
  );

  scroller.addEventListener("scroll", updateProgress, { passive: true });

  scroller.addEventListener("keydown", (event) => {
    if (dialog.open) {
      return;
    }

    const index = sections.indexOf(activeSection);
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      const nextSection = sections[Math.min(index + 1, sections.length - 1)];
      if (nextSection) {
        event.preventDefault();
        scrollToSection(nextSection);
      }
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      const previousSection = sections[Math.max(index - 1, 0)];
      if (previousSection) {
        event.preventDefault();
        scrollToSection(previousSection);
      }
    }
  });
}

function initializeFromHash() {
  const target = window.location.hash.replace("#", "");
  const initialSection = sections.includes(target) ? target : "home";
  setActiveSection(initialSection);
  updateProgress();

  requestAnimationFrame(() => {
    scrollToSection(initialSection, "auto");
    updateProgress();
  });
}

function init() {
  renderProjects();
  registerNavigation();
  registerProjects();
  registerDialog();
  registerScroller();
  initializeFromHash();
}

init();