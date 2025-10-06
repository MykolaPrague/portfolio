/* ================================
   Mykola Shyshka – Portfolio JS
   Handles: active links, theme toggle,
   flash messages, smooth scroll
================================ */

// --- Active link on scroll (preserving ?lang) ---
(() => {
  const links = document.querySelectorAll("a[data-nav]");
  const map = new Map([...links].map(a => [a.getAttribute("href").slice(1), a]));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach(a => a.classList.remove("is-active"));
      const link = map.get(e.target.id);
      if (link) link.classList.add("is-active");

      // Keep same ?lang=... but update hash only
      const url = new URL(location.href);
      url.hash = e.target.id;
      history.replaceState(null, "", url.toString());
    }
  }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 1] });

  document.querySelectorAll("section[id]").forEach(s => io.observe(s));
})();


// --- Theme toggle (saved in localStorage) ---
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  const toggleTheme = () => {
    const cur = root.getAttribute("data-theme") || "light";
    const next = (cur === "light" ? "dark" : "light");
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  document.querySelectorAll("#themeToggle").forEach(btn =>
    btn.addEventListener("click", toggleTheme)
  );
})();


// --- Flash messages: auto-hide + manual close ---
(() => {
  // Auto-hide after 10s
  setTimeout(() => {
    document.querySelectorAll(".flash-msg").forEach(el => {
      el.classList.add("hide");
      setTimeout(() => el.remove(), 400);
    });
  }, 10000);

  // Manual close
  document.addEventListener("click", e => {
    const btn = e.target.closest(".flash-msg .close");
    if (!btn) return;
    const box = btn.closest(".flash-msg");
    box.classList.add("hide");
    setTimeout(() => box.remove(), 350);
  });
})();


// --- Scroll directly to #contact if present ---
(() => {
  if (location.hash !== "#contact") return;
  const el = document.getElementById("contact");
  if (!el) return;

  document.documentElement.classList.add("no-smooth");
  el.scrollIntoView({ behavior: "auto", block: "start" });
  setTimeout(() => document.documentElement.classList.remove("no-smooth"), 50);
})();
