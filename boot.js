(function () {
  var root = document.documentElement, box = document.getElementById("boot");
  if (!box || !root.classList.contains("boot-pending")) return;
  var log = document.getElementById("boot-log"), skip = document.getElementById("boot-skip");
  var ok = '<span class="ok">[  OK  ]</span> ';
  var lines = [
    ok + "Reached target Network is Online.",
    ok + "Started Zabbix Agent 2.",
    ok + "Started The Nginx HTTP server.",
    ok + "Mounted /backup.",
    ok + "Reached target Portfolio.",
    '<span class="hi">Welcome to hamed@portfolio</span>'
  ];
  var i = 0, timer, done = false;

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    document.removeEventListener("keydown", finish);
    try { sessionStorage.setItem("booted", "1"); } catch (e) {}
    box.classList.add("hide");
    setTimeout(function () { root.classList.remove("boot-pending"); }, 450);
  }

  function step() {
    if (i >= lines.length) { timer = setTimeout(finish, 600); return; }
    var row = document.createElement("div");
    row.innerHTML = lines[i++];
    log.appendChild(row);
    timer = setTimeout(step, 380);
  }

  skip.addEventListener("click", finish);
  box.addEventListener("click", finish);
  document.addEventListener("keydown", finish);
  skip.focus({ preventScroll: true });
  step();
})();
