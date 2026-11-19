(function () {
  var out = document.getElementById("uptime-out");
  if (!out) return;
  var since = new Date(2016, 8, 1); // September 2016
  function pad(n) { return n < 10 ? "0" + n : n; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function tick() {
    var n = new Date();
    var m = (n.getFullYear() - since.getFullYear()) * 12 + n.getMonth() - since.getMonth();
    var time = pad(n.getHours()) + ":" + pad(n.getMinutes()) + ":" + pad(n.getSeconds());
    out.innerHTML = " " + time + " up <b>" + plural(Math.floor(m / 12), "year") + ", " +
      plural(m % 12, "month") + "</b>, load average: 0.42, 0.37, 0.31";
  }
  tick();
  setInterval(tick, 1000);
})();
