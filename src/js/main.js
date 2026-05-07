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
const heroHeadline = document.querySelector("#hero-headline");
const atAGlanceCard = document.querySelector("#at-a-glance-card");
const bottomNav = document.querySelector("#bottom-nav");
const homeSection = document.querySelector("#home");
const rootStyle = document.documentElement.style;

let activeSection = "home";
let lastFocusedTrigger = null;
let targetSectionIndex = 0;
let wheelAccumulator = 0;
let rulingRaf = null;
const WHEEL_STEP_THRESHOLD = 80;

function clampIndex(index) {
  return Math.max(0, Math.min(index, sections.length - 1));
}

function stepToSection(direction) {
  const next = clampIndex(targetSectionIndex + direction);
  if (next === targetSectionIndex) {
    return;
  }

  targetSectionIndex = next;
  scrollToSection(sections[targetSectionIndex]);
}

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
  if (activeIndex >= 0) {
    targetSectionIndex = activeIndex;
  }
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

function setRuleVariable(name, value) {
  rootStyle.setProperty(name, value);
}

function scheduleRulingGuides() {
  if (rulingRaf !== null) {
    return;
  }

  rulingRaf = requestAnimationFrame(() => {
    updateRulingGuides();
    rulingRaf = null;
  });
}

function updateRulingGuides() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const homeStyles = homeSection ? window.getComputedStyle(homeSection) : null;
  const sectionPadding = homeStyles ? Number.parseFloat(homeStyles.paddingLeft) || 24 : 24;
  const maxContentWidth = 1280;
  const containerWidth = Math.min(maxContentWidth, Math.max(320, viewportWidth - sectionPadding * 2));
  const containerLeft = Math.max(12, (viewportWidth - containerWidth) / 2);

  let contentStartX = containerLeft;
  let contentEndX = containerLeft + containerWidth;
  let editorialX = containerLeft + containerWidth * 0.65;
  let glanceTopY = Math.max(20, viewportHeight * 0.3);

  if (heroHeadline) {
    const heroRect = heroHeadline.getBoundingClientRect();
    if (heroRect.left > 0 && heroRect.left < viewportWidth) {
      contentStartX = heroRect.left;
    }
  }

  if (atAGlanceCard) {
    const cardRect = atAGlanceCard.getBoundingClientRect();
    if (cardRect.left > -80 && cardRect.left < viewportWidth + 80) {
      editorialX = cardRect.left - 18;
    }
    if (cardRect.right > 0 && cardRect.right < viewportWidth + 80) {
      contentEndX = Math.min(viewportWidth - 12, cardRect.right + 18);
    }
    glanceTopY = Math.max(16, cardRect.top - 12);
  }

  let frameTopY = viewportWidth <= 767 ? 16 : 40;
  if (homeSection) {
    const homeRect = homeSection.getBoundingClientRect();
    if (homeRect.top > -viewportHeight && homeRect.top < viewportHeight) {
      frameTopY = homeRect.top + (viewportWidth <= 767 ? 16 : 40);
    }
  }

  let navTopY = viewportHeight - 120;
  if (bottomNav) {
    navTopY = bottomNav.getBoundingClientRect().top;
  }

  setRuleVariable("--rule-x-content-start", `${Math.round(contentStartX)}px`);
  setRuleVariable("--rule-x-content-end", `${Math.round(contentEndX)}px`);
  setRuleVariable("--rule-x-editorial", `${Math.round(editorialX)}px`);
  setRuleVariable("--rule-y-frame-top", `${Math.round(frameTopY)}px`);
  setRuleVariable("--rule-y-glance-top", `${Math.round(glanceTopY)}px`);
  setRuleVariable("--rule-y-nav-top", `${Math.round(navTopY)}px`);

  if (viewportWidth <= 767) {
    setRuleVariable("--rule-x-content-end", "-100vw");
  }
}

function registerNavigation() {
  [...navLinks, ...jumpLinks].forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      if (!targetId) {
        return;
      }

      event.preventDefault();
      wheelAccumulator = 0;
      targetSectionIndex = clampIndex(sections.indexOf(targetId));
      scrollToSection(targetId);
      scheduleRulingGuides();
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
  let scrollRaf = null;

  function syncActiveSectionFromScroll() {
    if (scrollRaf !== null) {
      return;
    }

    scrollRaf = requestAnimationFrame(() => {
      const viewportWidth = scroller.clientWidth || 1;
      const nextIndex = clampIndex(Math.round(scroller.scrollLeft / viewportWidth));
      const nextSection = sections[nextIndex];

      if (nextSection && nextSection !== activeSection) {
        setActiveSection(nextSection);
      } else {
        targetSectionIndex = nextIndex;
      }

      scrollRaf = null;
    });
  }

  scroller.addEventListener(
    "wheel",
    (event) => {
      const axisDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(axisDelta) < 1) {
        return;
      }

      event.preventDefault();
      wheelAccumulator += axisDelta;

      if (Math.abs(wheelAccumulator) >= WHEEL_STEP_THRESHOLD) {
        const direction = Math.sign(wheelAccumulator);
        wheelAccumulator = 0;
        stepToSection(direction);
      }
    },
    { passive: false }
  );

  const PARALLAX_FACTOR = 0.25;
  scroller.addEventListener(
    "scroll",
    () => {
      updateProgress();
      syncActiveSectionFromScroll();
      const offsetX = -(scroller.scrollLeft * PARALLAX_FACTOR);
      document.documentElement.style.setProperty("--grid-parallax-x", `${offsetX}px`);
      scheduleRulingGuides();
    },
    { passive: true }
  );

  scroller.addEventListener("keydown", (event) => {
    if (dialog.open) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      stepToSection(1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      stepToSection(-1);
    }
  });
}

function registerRulingGuides() {
  window.addEventListener("resize", scheduleRulingGuides, { passive: true });
  window.addEventListener("orientationchange", scheduleRulingGuides, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleRulingGuides();
    });
  }

  scheduleRulingGuides();
}

function initializeFromHash() {
  const target = window.location.hash.replace("#", "");
  const initialSection = sections.includes(target) ? target : "home";
  setActiveSection(initialSection);
  updateProgress();

  requestAnimationFrame(() => {
    scrollToSection(initialSection, "auto");
    updateProgress();
    scheduleRulingGuides();
  });
}

function init() {
  renderProjects();
  registerNavigation();
  registerProjects();
  registerDialog();
  registerScroller();
  registerRulingGuides();
  initializeFromHash();
}

init();
