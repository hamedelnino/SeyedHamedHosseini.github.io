(function () {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const dockLinks = Array.from(document.querySelectorAll(".dock-item[href^='#']"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  // Theme preference: dark Ubuntu by default, with a persistent light option.
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = nextTheme;
      try { localStorage.setItem("portfolio-theme", nextTheme); } catch (_) {}
      themeButton.textContent = nextTheme === "light" ? "☾" : "☼";
      themeButton.setAttribute("aria-label", nextTheme === "light" ? "Switch to dark theme" : "Switch to light theme");
    });
    themeButton.textContent = root.dataset.theme === "light" ? "☾" : "☼";
  }

  // Highlight the current section in the desktop/mobile dock.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        dockLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  // Close the browser's print dialog only through the normal Ctrl/Cmd+P shortcut;
  // the print stylesheet provides a clean resume-friendly layout.
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
      document.body.classList.add("printing");
      window.setTimeout(function () { document.body.classList.remove("printing"); }, 1000);
    }
  });
})();
