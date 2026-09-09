(() => {
  "use strict";

  const links = Object.freeze({
    playStore: "https://play.google.com/store/apps/details?id=com.stormlift.app",
    appStore: "",
    instagram: "",
    x: ""
  });
  const socialAvailable = document.body.dataset.showSocialAccounts !== "false";
  const compactPlayAvailable = document.body.dataset.showCompactHeaderPlay !== "false";

  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    const unavailable =
      (element.classList.contains("header-play-cta") && !compactPlayAvailable) ||
      ((key === "x" || key === "instagram") && !socialAvailable);
    if (unavailable) {
      element.hidden = true;
      element.setAttribute("aria-hidden", "true");
      return;
    }

    element.querySelectorAll("img[data-src]").forEach((image) => {
      image.src = image.dataset.src;
      image.removeAttribute("data-src");
    });

    const destination = links[key];
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
})();
