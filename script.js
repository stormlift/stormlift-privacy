(() => {
  "use strict";

  const SITE_LINKS = Object.freeze({
    playStore: "https://play.google.com/store/apps/details?id=com.stormlift.app",
    appStore: "",
    instagram: "",
    x: ""
  });

  /*
   * Availability restore: update the body data attributes in index.html.
   * For the full layout, enable iOS/Hero/Feature/Final/Social, set Footer to
   * "center", disable the compact Header CTA, and populate the unavailable
   * SITE_LINKS values. The Hero dual-button swap then resumes automatically.
   */
  const SITE_AVAILABILITY = Object.freeze({
    iosStoreAvailable: document.body.dataset.iosStoreAvailable !== "false",
    showHeroStoreButtons: document.body.dataset.showHeroStoreButtons !== "false",
    showFeatureStoreButtons: document.body.dataset.showFeatureStoreButtons !== "false",
    showFinalStoreButtons: document.body.dataset.showFinalStoreButtons !== "false",
    showSocialAccounts: document.body.dataset.showSocialAccounts !== "false",
    showCompactHeaderGooglePlay: document.body.dataset.showCompactHeaderPlay !== "false"
  });

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = reduceMotionQuery.matches;

  const legacyRoutes = Object.freeze({
    "#privacy": "privacy/",
    "#terms": "terms/",
    "#contact": "terms/#contact"
  });
  const routeLegacyFragment = () => {
    if (!document.body.classList.contains("home-page")) return;
    const destination = legacyRoutes[window.location.hash.toLowerCase()];
    if (destination) window.location.replace(destination);
  };
  window.addEventListener("hashchange", routeLegacyFragment);
  routeLegacyFragment();

  const homepageSectionHashes = new Set(["#top", "#app", "#workouts", "#faqs"]);
  const isHomepage = document.body.classList.contains("home-page");
  const cleanHomepageHash = () => {
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  };
  const scrollToHomepageSection = (hash, behavior) => {
    const target = document.querySelector(hash);
    if (!target) return false;
    target.scrollIntoView({ behavior, block: "start" });
    cleanHomepageHash();
    return true;
  };

  if (isHomepage) {
    document.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const hash = link.getAttribute("href");
      if (!homepageSectionHashes.has(hash)) return;
      event.preventDefault();
      scrollToHomepageSection(hash, reduceMotion ? "auto" : "smooth");
    });

    const resolveInitialHomepageHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!homepageSectionHashes.has(hash)) return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToHomepageSection(hash, reduceMotion ? "auto" : "smooth");
        });
      });
    };

    if (document.readyState === "complete") resolveInitialHomepageHash();
    else window.addEventListener("load", resolveInitialHomepageHash, { once: true });
  }

  document.querySelectorAll("[data-link]").forEach((element) => {
    const isHeroStoreLink = Boolean(element.closest(".hero-store-badges"));
    const isFeatureStoreLink = Boolean(element.closest(".features .store-badges"));
    const isFinalStoreLink = Boolean(element.closest(".final-cta .store-badges"));
    const isCompactHeaderPlay = element.classList.contains("header-play-cta");
    const temporarilyHidden =
      (element.dataset.link === "appStore" && !SITE_AVAILABILITY.iosStoreAvailable) ||
      (isHeroStoreLink && !SITE_AVAILABILITY.showHeroStoreButtons) ||
      (isFeatureStoreLink && !SITE_AVAILABILITY.showFeatureStoreButtons) ||
      (isFinalStoreLink && !SITE_AVAILABILITY.showFinalStoreButtons) ||
      (isCompactHeaderPlay && !SITE_AVAILABILITY.showCompactHeaderGooglePlay) ||
      ((element.dataset.link === "x" || element.dataset.link === "instagram") && !SITE_AVAILABILITY.showSocialAccounts);
    if (temporarilyHidden) {
      element.hidden = true;
      element.setAttribute("aria-hidden", "true");
      return;
    }

    const destination = SITE_LINKS[element.dataset.link];
    if (destination) {
      element.href = destination;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      return;
    }

    element.setAttribute("aria-disabled", "true");
    element.setAttribute("tabindex", "-1");
    element.title = "Link coming soon";
  });

  const hero = document.querySelector(".hero-slider");
  if (hero) {
    const copies = [...hero.querySelectorAll("[data-copy]")];
    const controls = [...hero.querySelectorAll("[data-slide-control]")];
    const subjects = [...hero.querySelectorAll("[data-subject-slide]")];
    const storeBadges = hero.querySelector(".hero-store-badges");
    const storeLinks = storeBadges ? [...storeBadges.querySelectorAll(".store-link:not([hidden])")] : [];
    const shouldSwapStoreBadges = SITE_AVAILABILITY.iosStoreAvailable && SITE_AVAILABILITY.showHeroStoreButtons && storeLinks.length > 1;
    const singleSubjectMedia = window.matchMedia("(max-width: 900px)");
    const hoverPauseMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const copyLeaveTimers = new WeakMap();
    const autoplayPauseReasons = new Set();
    const slideCount = copies.length;
    const autoplayDelay = 7000;
    let currentSlide = 0;
    let autoplayTimer = 0;
    let pointerStartX = null;
    let pointerStartY = null;
    let storeSwapPhase = 0;
    const isMobileSwipePointer = (event) => event.pointerType === "touch" || (event.pointerType === "mouse" && window.innerWidth <= 900);
    const stopAutoplay = () => {
      window.clearTimeout(autoplayTimer);
      autoplayTimer = 0;
    };
    const startAutoplay = () => {
      stopAutoplay();
      if (document.hidden || autoplayPauseReasons.size) return;
      autoplayTimer = window.setTimeout(() => {
        autoplayTimer = 0;
        renderSlide(currentSlide + 1);
        startAutoplay();
      }, autoplayDelay);
    };
    const restartAutoplay = () => startAutoplay();
    const setAutoplayPause = (reason, shouldPause) => {
      const wasPaused = autoplayPauseReasons.size > 0;
      if (shouldPause) autoplayPauseReasons.add(reason);
      else autoplayPauseReasons.delete(reason);
      const isPaused = autoplayPauseReasons.size > 0;
      if (isPaused) stopAutoplay();
      else if (wasPaused) startAutoplay();
    };
    const syncSubjectAutoplayPause = (subject) => {
      const slide = Number(subject.dataset.subjectSlide);
      const isSideSubject = !singleSubjectMedia.matches && slide !== currentSlide;
      setAutoplayPause(`subject-hover-${slide}`, hoverPauseMedia.matches && isSideSubject && subject.matches(":hover"));
      setAutoplayPause(`subject-focus-${slide}`, isSideSubject && document.activeElement === subject);
    };
    const syncSubjectAutoplayPauses = () => subjects.forEach(syncSubjectAutoplayPause);
    const updateSubjectControls = () => {
      const singleSubjectMode = singleSubjectMedia.matches;
      subjects.forEach((subject) => {
        const active = Number(subject.dataset.subjectSlide) === currentSlide;
        const interactive = !singleSubjectMode && !active;
        subject.disabled = !interactive;
        subject.tabIndex = interactive ? 0 : -1;
        if (active) subject.setAttribute("aria-current", "true");
        else subject.removeAttribute("aria-current");
      });
    };

    const renderSlide = (nextSlide, userInitiated = false) => {
      const normalizedSlide = (nextSlide + slideCount) % slideCount;
      const slideChanged = normalizedSlide !== currentSlide;
      currentSlide = normalizedSlide;
      hero.dataset.slide = String(currentSlide);

      if (slideChanged && shouldSwapStoreBadges) {
        storeSwapPhase = (storeSwapPhase + 1) % 2;
        storeBadges?.classList.toggle("is-swapped", storeSwapPhase === 1);
      }

      copies.forEach((copy, index) => {
        const active = index === currentSlide;
        const wasActive = copy.classList.contains("is-active");
        window.clearTimeout(copyLeaveTimers.get(copy));
        copy.classList.remove("is-leaving");
        if (!active && wasActive && !reduceMotion) {
          copy.classList.add("is-leaving");
          copyLeaveTimers.set(copy, window.setTimeout(() => copy.classList.remove("is-leaving"), 900));
        }
        copy.classList.toggle("is-active", active);
        copy.setAttribute("aria-hidden", String(!active));
      });

      controls.forEach((control, index) => {
        const active = index === currentSlide;
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-pressed", String(active));
      });

      updateSubjectControls();
      syncSubjectAutoplayPauses();

      if (userInitiated) restartAutoplay();
    };

    controls.forEach((control) => {
      control.addEventListener("click", () => renderSlide(Number(control.dataset.slideControl), true));
    });

    subjects.forEach((subject) => {
      subject.addEventListener("click", () => renderSlide(Number(subject.dataset.subjectSlide), true));
      subject.addEventListener("pointerenter", () => syncSubjectAutoplayPause(subject));
      subject.addEventListener("pointerleave", () => syncSubjectAutoplayPause(subject));
      subject.addEventListener("focusin", () => syncSubjectAutoplayPause(subject));
      subject.addEventListener("focusout", () => syncSubjectAutoplayPause(subject));
    });

    storeLinks.forEach((storeLink, index) => {
      storeLink.addEventListener("pointerenter", () => setAutoplayPause(`store-hover-${index}`, hoverPauseMedia.matches));
      storeLink.addEventListener("pointerleave", () => setAutoplayPause(`store-hover-${index}`, false));
      storeLink.addEventListener("focusin", () => setAutoplayPause(`store-focus-${index}`, true));
      storeLink.addEventListener("focusout", () => setAutoplayPause(`store-focus-${index}`, false));
    });

    hero.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      renderSlide(currentSlide + (event.key === "ArrowRight" ? 1 : -1), true);
    });

    hero.addEventListener("pointerdown", (event) => {
      if (!isMobileSwipePointer(event)) return;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    }, { passive: true });

    hero.addEventListener("pointerup", (event) => {
      if (pointerStartX === null || pointerStartY === null || !isMobileSwipePointer(event)) return;
      const distanceX = event.clientX - pointerStartX;
      const distanceY = event.clientY - pointerStartY;
      pointerStartX = null;
      pointerStartY = null;
      if (Math.abs(distanceX) < 44 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
      renderSlide(currentSlide + (distanceX < 0 ? 1 : -1), true);
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    if (typeof singleSubjectMedia.addEventListener === "function") {
      singleSubjectMedia.addEventListener("change", () => {
        updateSubjectControls();
        syncSubjectAutoplayPauses();
      });
    }

    if (typeof hoverPauseMedia.addEventListener === "function") {
      hoverPauseMedia.addEventListener("change", () => {
        storeLinks.forEach((storeLink, index) => {
          setAutoplayPause(`store-hover-${index}`, hoverPauseMedia.matches && storeLink.matches(":hover"));
        });
        syncSubjectAutoplayPauses();
      });
    }

    renderSlide(0);
    startAutoplay();
  }

  const revealElements = [...document.querySelectorAll(".reveal")];
  if (revealElements.length) {
    document.body.classList.add("motion-ready");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -9%", threshold: 0.08 });
      revealElements.forEach((element) => revealObserver.observe(element));
    }
  }

  const workoutsReveal = document.querySelector(".workouts[data-workouts-reveal]");
  if (workoutsReveal) {
    const composeWorkouts = () => workoutsReveal.classList.add("is-composed");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      composeWorkouts();
    } else {
      const workoutsObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        composeWorkouts();
        observer.unobserve(workoutsReveal);
      }, { rootMargin: "0px 0px -7%", threshold: 0.08 });
      workoutsObserver.observe(workoutsReveal);
    }
  }

  const stagedSections = [...document.querySelectorAll("[data-benefits-reveal], [data-cta-reveal], [data-footer-reveal]")];
  if (stagedSections.length) {
    const composeSection = (section) => section.classList.add("is-composed");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      stagedSections.forEach(composeSection);
    } else {
      const stagedSectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          composeSection(entry.target);
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -6%", threshold: 0.08 });
      stagedSections.forEach((section) => stagedSectionObserver.observe(section));
    }
  }

  document.querySelectorAll(".faq-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!panel) return;
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      const icon = toggle.querySelector("img");
      if (icon) icon.src = expanded ? "assets/faqs/plus.svg" : "assets/faqs/minus.svg";

      if (reduceMotion || !("animate" in panel)) {
        panel.hidden = expanded;
        return;
      }

      if (expanded) {
        const height = panel.scrollHeight;
        const animation = panel.animate([
          { height: `${height}px`, opacity: 1, transform: "translateY(0)" },
          { height: "0px", opacity: 0, transform: "translateY(-7px)" }
        ], { duration: 300, easing: "cubic-bezier(.22,.61,.36,1)" });
        animation.onfinish = () => { panel.hidden = true; };
      } else {
        panel.hidden = false;
        const height = panel.scrollHeight;
        panel.animate([
          { height: "0px", opacity: 0, transform: "translateY(-7px)" },
          { height: `${height}px`, opacity: 1, transform: "translateY(0)" }
        ], { duration: 360, easing: "cubic-bezier(.22,.61,.36,1)" });
      }
    });
  });

  const phoneComposition = document.querySelector(".phone-composition[data-scroll-motion]");
  const phoneUnits = phoneComposition ? [...phoneComposition.querySelectorAll("[data-phone]")] : [];
  const motionElements = [...document.querySelectorAll("[data-scroll-motion]")].filter((element) => element !== phoneComposition);
  let scrollFrame = 0;

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
  const smoothStep = (value) => value * value * (3 - 2 * value);
  const phoneMotion = Object.freeze({
    center: { offset: 0, startScale: .89, startY: 32, startOpacity: .9 },
    left: { offset: .045, startScale: .87, startY: 44, startOpacity: .86 },
    right: { offset: .075, startScale: .88, startY: 38, startOpacity: .88 }
  });

  const updatePhoneMotion = (viewportHeight) => {
    if (!phoneComposition) return;
    const rect = phoneComposition.getBoundingClientRect();
    const startLine = viewportHeight * .96;
    const endLine = viewportHeight * .32;
    const baseProgress = clamp((startLine - rect.top) / (startLine - endLine), 0, 1);
    phoneComposition.dataset.motionProgress = baseProgress.toFixed(3);

    phoneUnits.forEach((unit) => {
      const settings = phoneMotion[unit.dataset.phone];
      if (!settings) return;
      const phoneProgress = smoothStep(clamp((baseProgress - settings.offset) / (1 - settings.offset), 0, 1));
      const scale = settings.startScale + ((1 - settings.startScale) * phoneProgress);
      const y = settings.startY * (1 - phoneProgress);
      const opacity = settings.startOpacity + ((1 - settings.startOpacity) * phoneProgress);
      unit.style.setProperty("--phone-scale", scale.toFixed(4));
      unit.style.setProperty("--phone-y", `${y.toFixed(2)}px`);
      unit.style.setProperty("--phone-opacity", opacity.toFixed(3));

      [...unit.querySelectorAll(".phone-pill")].forEach((pill, index) => {
        const delay = settings.offset + .035 + (index * .03);
        const pillProgress = smoothStep(clamp((baseProgress - delay) / (1 - delay), 0, 1));
        const enterX = Number(pill.dataset.enterX || 0);
        const enterY = Number(pill.dataset.enterY || 8);
        pill.style.setProperty("--pill-x", `${(enterX * (1 - pillProgress)).toFixed(2)}px`);
        pill.style.setProperty("--pill-y", `${(enterY * (1 - pillProgress)).toFixed(2)}px`);
        pill.style.setProperty("--pill-scale", (.84 + (.16 * pillProgress)).toFixed(4));
        pill.style.setProperty("--pill-opacity", pillProgress.toFixed(3));
      });
    });
  };

  const setPhoneMotionFinalState = () => {
    phoneComposition?.setAttribute("data-motion-progress", "1.000");
    phoneUnits.forEach((unit) => {
      unit.style.setProperty("--phone-scale", "1");
      unit.style.setProperty("--phone-y", "0px");
      unit.style.setProperty("--phone-opacity", "1");
      unit.querySelectorAll(".phone-pill").forEach((pill) => {
        pill.style.setProperty("--pill-x", "0px");
        pill.style.setProperty("--pill-y", "0px");
        pill.style.setProperty("--pill-scale", "1");
        pill.style.setProperty("--pill-opacity", "1");
      });
    });
  };

  const updateScrollMotion = () => {
    scrollFrame = 0;
    const viewportHeight = window.innerHeight;
    updatePhoneMotion(viewportHeight);

    motionElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.58);
      const progress = clamp(rawProgress, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const innerProgress = smoothStep(clamp((eased - .02) / .98, 0, 1));
      const personProgress = smoothStep(clamp((eased - .045) / .955, 0, 1));
      const orbProgress = smoothStep(clamp((eased - .075) / .925, 0, 1));
      const ctaProgress = smoothStep(clamp((eased - .11) / .89, 0, 1));
      const outerShapeProgress = smoothStep(clamp(progress / .52, 0, 1));
      const innerShapeProgress = smoothStep(clamp((progress - .07) / .53, 0, 1));

      element.style.setProperty("--motion-scale", (0.96 + eased * 0.04).toFixed(4));
      element.style.setProperty("--motion-side-scale", (0.94 + personProgress * 0.06).toFixed(4));
      element.style.setProperty("--outer-shape-scale", (0.90 + outerShapeProgress * 0.10).toFixed(4));
      element.style.setProperty("--inner-shape-scale", (0.87 + innerShapeProgress * 0.13).toFixed(4));
      element.style.setProperty("--motion-y", `${(20 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--motion-opacity", clamp(progress * 1.7, 0, 1).toFixed(3));
      element.style.setProperty("--shape-y", `${(18 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--inner-y", `${(10 * (1 - innerProgress)).toFixed(2)}px`);
      element.style.setProperty("--person-y", `${(16 * (1 - personProgress)).toFixed(2)}px`);
      element.style.setProperty("--copy-y", `${(14 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--orb-y", `${(10 * (1 - orbProgress)).toFixed(2)}px`);
      element.style.setProperty("--cta-y", `${(8 * (1 - ctaProgress)).toFixed(2)}px`);
      element.style.setProperty("--cta-opacity", ctaProgress.toFixed(3));

      element.querySelectorAll(".feature-orb").forEach((orb, index) => {
        const start = .14 + (index * .06);
        const end = .42 + (index * .06);
        const orbSlideProgress = smoothStep(clamp((progress - start) / (end - start), 0, 1));
        const travel = window.innerWidth <= 640 ? 24 : 32;
        const enterX = orb.dataset.motionSide === "left" ? -travel : travel;
        orb.style.setProperty("--orb-x", `${(enterX * (1 - orbSlideProgress)).toFixed(2)}px`);
        orb.style.setProperty("--orb-scale", (0.96 + orbSlideProgress * 0.04).toFixed(4));
        orb.style.setProperty("--orb-opacity-current", orbSlideProgress.toFixed(3));
      });
    });
  };

  const requestScrollMotion = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollMotion);
  };

  const bindScrollMotion = () => {
    window.removeEventListener("scroll", requestScrollMotion);
    window.removeEventListener("resize", requestScrollMotion);

    if (reduceMotion) setPhoneMotionFinalState();

    if (reduceMotion || (!motionElements.length && !phoneComposition)) {
      motionElements.forEach((element) => {
        element.style.setProperty("--motion-scale", "1");
        element.style.setProperty("--motion-side-scale", "1");
        element.style.setProperty("--outer-shape-scale", "1");
        element.style.setProperty("--inner-shape-scale", "1");
        element.style.setProperty("--motion-y", "0px");
        element.style.setProperty("--motion-opacity", "1");
        element.style.setProperty("--shape-y", "0px");
        element.style.setProperty("--inner-y", "0px");
        element.style.setProperty("--person-y", "0px");
        element.style.setProperty("--copy-y", "0px");
        element.style.setProperty("--orb-y", "0px");
        element.querySelectorAll(".feature-orb").forEach((orb) => {
          orb.style.setProperty("--orb-x", "0px");
          orb.style.setProperty("--orb-scale", "1");
          orb.style.setProperty("--orb-opacity-current", "1");
        });
        element.style.setProperty("--cta-y", "0px");
        element.style.setProperty("--cta-opacity", "1");
      });
      if (reduceMotion || !phoneComposition) return;
    }

    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion, { passive: true });
    requestScrollMotion();
  };

  const handleReducedMotionChange = (event) => {
    reduceMotion = event.matches;
    bindScrollMotion();
    if (reduceMotion) document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    if (reduceMotion) workoutsReveal?.classList.add("is-composed");
    if (reduceMotion) stagedSections.forEach((section) => section.classList.add("is-composed"));
  };

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", handleReducedMotionChange);
  }
  bindScrollMotion();
})();
