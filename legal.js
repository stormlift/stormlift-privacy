(() => {
  "use strict";

  const links = Object.freeze({
    playStore: "https://play.google.com/store/apps/details?id=com.stormlift.app",
    appStore: "",
    instagram: "",
    x: ""
  });
  // Reuse the legal shell without editing the published policy documents.
  const footer = document.querySelector(".footer-nav");
  if (footer && !footer.querySelector("[data-delete-data]")) {
    const separator = document.createElement("span");
    separator.textContent = "•";
    separator.setAttribute("aria-hidden", "true");
    const deletionLink = document.createElement("a");
    deletionLink.href = new URL("delete-data/", document.currentScript.src).href;
    deletionLink.textContent = "Delete Your Data";
    deletionLink.dataset.deleteData = "";
    footer.append(separator, deletionLink);
  }

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
