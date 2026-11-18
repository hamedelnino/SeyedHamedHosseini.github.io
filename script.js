(function () {
  var root = document.documentElement, key = "portfolio-theme";
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = (root.dataset.theme || "dark") === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem(key, next); } catch (e) {}
  });
  var items = document.querySelectorAll(".dock-item[href^='#']");
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      items.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
})();

(function () {
  var st = document.querySelector(".stack"); if (!st) return;
  var sl = [].slice.call(st.querySelectorAll(".slide")), n = sl.length, cur = 0, timer, x0 = null, moved = false;
  var dots = st.querySelector(".stack-dots"), dlg = document.getElementById("lightbox");
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pos(i) { var d = (i - cur + n) % n; return d < 3 ? String(d) : (d === n - 1 ? "out" : "x"); }
  function render() {
    sl.forEach(function (s, i) { var p = pos(i); s.dataset.pos = p; s.setAttribute("aria-hidden", p === "0" ? "false" : "true"); });
    [].forEach.call(dots.children, function (b, i) { b.setAttribute("aria-current", i === cur); });
  }
  function go(i) { cur = (i + n) % n; render(); }
  function start() { if (!rm && !dlg.open) { stop(); timer = setInterval(function () { go(cur + 1); }, 5500); } }
  function stop() { clearInterval(timer); }
  sl.forEach(function (s, i) {
    var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Show screenshot " + (i + 1));
    b.addEventListener("click", function () { go(i); start(); }); dots.appendChild(b);
  });
  st.querySelector(".stack-prev").addEventListener("click", function () { go(cur - 1); start(); });
  st.querySelector(".stack-next").addEventListener("click", function () { go(cur + 1); start(); });
  st.addEventListener("mouseenter", stop); st.addEventListener("mouseleave", start);
  st.addEventListener("focusin", stop); st.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  st.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") go(cur + 1); if (e.key === "ArrowLeft") go(cur - 1); });
  var fr = st.querySelector(".stack-frame");
  fr.addEventListener("pointerdown", function (e) { x0 = e.clientX; moved = false; });
  fr.addEventListener("pointerup", function (e) {
    if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { moved = true; go(cur + (dx < 0 ? 1 : -1)); }
  });
  fr.addEventListener("click", function (e) {
    var img = e.target.closest(".slide[data-pos='0'] img"); if (!img || moved) return;
    var li = dlg.querySelector("img"); li.src = img.currentSrc || img.src; li.alt = img.alt;
    dlg.querySelector(".lightbox-cap span").textContent = img.alt; stop(); dlg.showModal();
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("button")) dlg.close(); });
  dlg.addEventListener("close", start);
  render(); start();
})();
