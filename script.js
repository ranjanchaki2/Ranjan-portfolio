(() => {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const learningToggle = document.getElementById('learningToggle');
  const learningNote = document.getElementById('learningNote');
  const year = document.getElementById('currentYear');
  const timelineFill = document.getElementById('timelineFill');
  if (year) year.textContent = String(new Date().getFullYear());

  const setMenuState = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    siteNav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a[href^="#"]')) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.classList.contains('open')) return;
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) setMenuState(false);
  });

  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    progressBar.style.width = `${progress}%`;
    header.classList.toggle('scrolled', window.scrollY > 12);
    backToTop.classList.toggle('visible', window.scrollY > 650);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });
  updateScrollUI();

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const matching = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
        if (!matching) return;
        navLinks.forEach((link) => {
          const active = link === matching;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    ['home', 'about', 'journey', 'work', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    if (timelineFill) {
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineFill.classList.add('in-view');
            timelineObserver.disconnect();
          }
        });
      }, { threshold: .3 });
      timelineObserver.observe(timelineFill.parentElement);
    }
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    if (timelineFill) timelineFill.classList.add('in-view');
  }

  if (learningToggle && learningNote) {
    learningToggle.addEventListener('click', () => {
      const expanded = learningToggle.getAttribute('aria-expanded') === 'true';
      learningToggle.setAttribute('aria-expanded', String(!expanded));
      learningToggle.setAttribute('aria-label', expanded ? 'Reveal learning note' : 'Hide learning note');
      learningNote.hidden = expanded;
    });
  }

  const projectGallery = document.getElementById('work');
  const projectGrid = document.getElementById('conceptGrid');
  const projectCount = document.getElementById('projectCount');
  const projectFilters = [...document.querySelectorAll('.project-filter')];
  const conceptDialog = document.getElementById('conceptDialog');
  const dialogTitle = document.getElementById('conceptDialogTitle');
  const dialogCategory = document.getElementById('conceptDialogCategory');
  const dialogVisual = document.getElementById('conceptDialogVisual');
  const dialogOverview = document.getElementById('conceptDialogOverview');
  const dialogProblem = document.getElementById('conceptDialogProblem');
  const dialogFeatures = document.getElementById('conceptDialogFeatures');
  const dialogStack = document.getElementById('conceptDialogStack');
  const dialogSteps = document.getElementById('conceptDialogSteps');
  const dialogClose = conceptDialog.querySelector('.concept-dialog-close');
  let lastProjectTrigger = null;

  const projects = {
    fieldnotes: {
      title: 'FIELDNOTES',
      category: 'CONCEPT PROJECT — PROPOSED BUILD',
      overview: 'An offline-first workspace for capturing information, organising field notes, and accessing essential references without depending on a constant internet connection.',
      problem: 'Useful notes and personal learning records should remain available when a network is unreliable. The concept is for general-purpose learning and reference—not operational or sensitive information.',
      features: ['Create and organise personal notes and checklists locally.', 'Browse saved reference material while offline.', 'Show clear local-save and optional sync status.'],
      stack: ['HTML', 'CSS', 'JavaScript', 'Progressive Web Apps', 'Service Workers', 'IndexedDB'],
      steps: ['Map a small, non-sensitive notebook flow.', 'Prototype local persistence and offline access.', 'Test save, restore, and sync states before considering a public release.']
    },
    commandline: {
      title: 'COMMANDLINE',
      category: 'INTERFACE CONCEPT — EXPLORATION',
      overview: 'A focused developer workspace that brings tasks, project status, quick actions, and development notes into a single terminal-inspired interface.',
      problem: 'Switching between project notes and task lists can make it harder to keep a clear view of the next useful action. This proposes a compact, personal workspace.',
      features: ['Show a project directory and manually maintained task list.', 'Collect development notes and interface shortcuts.', 'Present a terminal-inspired interface without executing system commands.'],
      stack: ['JavaScript', 'React', 'CSS', 'REST APIs'],
      steps: ['Design the workspace around sample, non-personal content.', 'Build the interface with mock project data.', 'Evaluate whether any future integrations are safe and useful.']
    },
    studygrid: {
      title: 'STUDYGRID',
      category: 'PRODUCT CONCEPT — PROPOSED BUILD',
      overview: 'A structured learning dashboard that transforms subjects, assignments, deadlines, and revision sessions into a clear and manageable study plan.',
      problem: 'Distance learning and other responsibilities can make it challenging to see study tasks and upcoming deadlines in one place. A flexible planner could help learners make a manageable plan.',
      features: ['Organise subjects, assignments, and personal deadlines.', 'Arrange revision sessions in a weekly timetable.', 'Track a learner-managed plan without implying academic results.'],
      stack: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      steps: ['Sketch a weekly planner for a generic learner.', 'Prototype editable subjects and study sessions.', 'Test accessibility and local save/restore behavior.']
    },
    signal: {
      title: 'SIGNAL / 01',
      category: 'EDUCATIONAL CONCEPT — EXPLORATION',
      overview: 'A visual learning experience that makes everyday cybersecurity easier to understand through simulated scenarios, security checklists, and interactive educational modules.',
      problem: 'Digital-safety advice can feel abstract. Short, clearly labeled practice scenarios may help people learn how to pause, verify, and choose safer everyday actions.',
      features: ['Use fictional, simulated message examples for discussion.', 'Explain sender checks, link caution, and password hygiene.', 'Offer a defensive checklist with no live scanning or threat-detection claims.'],
      stack: ['JavaScript', 'HTML', 'CSS', 'Optional React'],
      steps: ['Write safe, fictional learning scenarios.', 'Create short explanations and a defensive checklist.', 'Review accuracy and accessibility before sharing educational content.']
    },
    routine: {
      title: 'ROUTINE / 24',
      category: 'PRODUCT CONCEPT — PROPOSED BUILD',
      overview: 'A minimal daily operating system built around consistency, measurable progress, and the small routines that compound over time.',
      problem: 'Daily plans can become difficult to maintain when tasks, study time, personal goals, and recurring habits are scattered across different places.',
      features: ['Arrange personal tasks on a simple daily timeline.', 'Review recurring habits with a weekly consistency grid.', 'Keep progress personal and user-managed, without competitive scoring.'],
      stack: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      steps: ['Choose a small set of optional daily planning fields.', 'Prototype the timeline and habit grid.', 'Test that reminders and tracking remain private and user-controlled.']
    },
    orbit: {
      title: 'ORBIT / RC',
      category: 'DESIGN EXPLORATION — CONCEPT PROJECT',
      overview: 'An exploration of digital identity through typography, motion, geometric systems, and an interface inspired by precision and forward thinking.',
      problem: 'A personal identity can be expressed through more than a static monogram. This design study explores how a compact visual system could adapt across a portfolio.',
      features: ['Build a distinct RC monogram and orbital graphic system.', 'Explore restrained motion and coordinate-inspired details.', 'Adapt the identity for project panels and responsive layouts.'],
      stack: ['HTML', 'CSS', 'JavaScript', 'SVG'],
      steps: ['Draw a small set of monogram and orbit variations.', 'Prototype responsive motion and typography.', 'Check reduced-motion support and reuse across portfolio components.']
    }
  };

  const addTextItems = (container, items, tagName) => {
    container.replaceChildren(...items.map((item) => {
      const element = document.createElement(tagName);
      element.textContent = item;
      return element;
    }));
  };

  const applyProjectFilter = (filter) => {
    const cards = [...projectGrid.querySelectorAll('.concept-card')];
    let visibleCount = 0;
    cards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    projectFilters.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    projectCount.textContent = `SHOWING ${String(visibleCount).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')} CONCEPTS`;
  };

  projectFilters.forEach((button) => {
    button.addEventListener('click', () => applyProjectFilter(button.dataset.filter));
  });

  const openProjectConcept = (trigger) => {
    const card = trigger.closest('.concept-card');
    const project = projects[trigger.dataset.openProject];
    if (!card || !project) return;

    lastProjectTrigger = trigger;
    dialogTitle.textContent = project.title;
    dialogCategory.textContent = project.category;
    dialogOverview.textContent = project.overview;
    dialogProblem.textContent = project.problem;
    addTextItems(dialogFeatures, project.features, 'li');
    addTextItems(dialogStack, project.stack, 'span');
    addTextItems(dialogSteps, project.steps, 'li');
    dialogVisual.replaceChildren(card.querySelector('.concept-cover').cloneNode(true));
    if (!conceptDialog.open) conceptDialog.showModal();
    dialogClose.focus();
  };

  projectGrid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-project]');
    if (trigger) openProjectConcept(trigger);
  });

  dialogClose.addEventListener('click', () => conceptDialog.close());
  conceptDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      conceptDialog.close();
    }
  });
  conceptDialog.addEventListener('click', (event) => {
    if (event.target === conceptDialog) conceptDialog.close();
  });
  conceptDialog.addEventListener('close', () => {
    if (lastProjectTrigger && lastProjectTrigger.isConnected && !lastProjectTrigger.closest('.concept-card').hidden) {
      lastProjectTrigger.focus();
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();
