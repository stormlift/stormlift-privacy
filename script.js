(() => {
  "use strict";

  const SITE_LINKS = Object.freeze({
    playStore: "https://play.google.com/store/apps/details?id=com.cris.ptapp",
    appStore: "",
    instagram: "",
    x: ""
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

  document.querySelectorAll("[data-link]").forEach((element) => {
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
    const slideCount = copies.length;
    const autoplayDelay = 6500;
    let currentSlide = 0;
    let autoplayTimer = 0;
    let pointerStartX = null;
    let pointerStartY = null;
    const isMobileSwipePointer = (event) => event.pointerType === "touch" || (event.pointerType === "mouse" && window.innerWidth <= 900);

    const renderSlide = (nextSlide, userInitiated = false) => {
      currentSlide = (nextSlide + slideCount) % slideCount;
      hero.dataset.slide = String(currentSlide);

      copies.forEach((copy, index) => {
        const active = index === currentSlide;
        copy.classList.toggle("is-active", active);
        copy.setAttribute("aria-hidden", String(!active));
      });

      controls.forEach((control, index) => {
        const active = index === currentSlide;
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-pressed", String(active));
      });

      if (userInitiated) restartAutoplay();
    };

    const stopAutoplay = () => window.clearInterval(autoplayTimer);
    const startAutoplay = () => {
      stopAutoplay();
      if (document.hidden) return;
      autoplayTimer = window.setInterval(() => renderSlide(currentSlide + 1), autoplayDelay);
    };
    const restartAutoplay = () => startAutoplay();

    controls.forEach((control) => {
      control.addEventListener("click", () => renderSlide(Number(control.dataset.slideControl), true));
    });

    hero.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      renderSlide(currentSlide + (event.key === "ArrowRight" ? 1 : -1), true);
      controls[currentSlide]?.focus();
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

  const motionElements = [...document.querySelectorAll("[data-scroll-motion]")];
  let scrollFrame = 0;

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
  const updateScrollMotion = () => {
    scrollFrame = 0;
    const viewportHeight = window.innerHeight;

    motionElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.58);
      const progress = clamp(rawProgress, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.style.setProperty("--motion-scale", (0.9 + eased * 0.1).toFixed(4));
      element.style.setProperty("--motion-side-scale", (0.875 + eased * 0.125).toFixed(4));
      element.style.setProperty("--motion-y", `${(52 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--motion-opacity", clamp(progress * 1.7, 0, 1).toFixed(3));
      element.style.setProperty("--shape-y", `${(36 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--person-y", `${(24 * (1 - eased)).toFixed(2)}px`);
      element.style.setProperty("--copy-y", `${(28 * (1 - eased)).toFixed(2)}px`);
    });
  };

  const requestScrollMotion = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollMotion);
  };

  const bindScrollMotion = () => {
    window.removeEventListener("scroll", requestScrollMotion);
    window.removeEventListener("resize", requestScrollMotion);

    if (reduceMotion || !motionElements.length) {
      motionElements.forEach((element) => {
        element.style.setProperty("--motion-scale", "1");
        element.style.setProperty("--motion-side-scale", "1");
        element.style.setProperty("--motion-y", "0px");
        element.style.setProperty("--motion-opacity", "1");
        element.style.setProperty("--shape-y", "0px");
        element.style.setProperty("--person-y", "0px");
        element.style.setProperty("--copy-y", "0px");
      });
      return;
    }

    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion, { passive: true });
    requestScrollMotion();
  };

  const handleReducedMotionChange = (event) => {
    reduceMotion = event.matches;
    bindScrollMotion();
    if (reduceMotion) document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  };

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", handleReducedMotionChange);
  }
  bindScrollMotion();
})();
