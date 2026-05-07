(function () {
  const STORAGE_KEY = "tatarugas.theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle .opt").forEach((el) => {
      el.setAttribute("aria-pressed", el.dataset.theme === theme ? "true" : "false");
    });
    if (window.__tucaRefreshers) {
      window.__tucaRefreshers.forEach((refresh) => refresh && refresh());
    }
  }

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const target = event.target.closest(".opt");
      if (target) {
        const next = target.dataset.theme;
        if (next) {
          localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
        }
        return;
      }

      const current = root.getAttribute("data-theme") || "ember";
      const next = current === "ember" ? "manha" : "ember";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });

  applyTheme(root.getAttribute("data-theme") || "ember");

  function initTuca(canvas) {
    const size = parseInt(canvas.getAttribute("width"), 10) || 280;
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 30 }, (_, index) => {
      const angle = (index / 30) * Math.PI * 2;
      const radius = size * (0.19 + Math.random() * 0.16);
      return {
        angle,
        orbit: radius,
        speed: 0.00055 + Math.random() * 0.0004,
        phase: Math.random() * Math.PI * 2,
        pulse: 0.85 + Math.random() * 0.55,
        size: 1.4 + Math.random() * 2.8,
        drift: 0.75 + Math.random() * 0.9,
      };
    });

    let themeColors = {};

    function readTheme() {
      const styles = getComputedStyle(root);
      themeColors = {
        tuca: (styles.getPropertyValue("--tuca") || "#5FA4A0").trim(),
        core: (styles.getPropertyValue("--tuca-core") || "#FFFFFF").trim(),
      };
    }

    window.__tucaRefreshers = window.__tucaRefreshers || [];
    window.__tucaRefreshers.push(readTheme);
    readTheme();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId;

    function draw(now) {
      const time = prefersReducedMotion ? 0.5 : now * 0.001;
      const cx = size / 2;
      const cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      const glowRadius = size * 0.34;
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      ambient.addColorStop(0, hexToRgba(themeColors.tuca, 0.18));
      ambient.addColorStop(0.45, hexToRgba(themeColors.tuca, 0.08));
      ambient.addColorStop(1, hexToRgba(themeColors.tuca, 0));
      ctx.fillStyle = ambient;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((particle, index) => {
        const orbitPulse = Math.sin(time * 0.9 + particle.phase) * (size * 0.022 * particle.drift);
        const orbit = particle.orbit + orbitPulse;
        const angle = particle.angle + time * (index % 2 === 0 ? 1 : -1) * particle.speed * 1000;
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle * 1.04 + particle.phase * 0.18) * orbit;
        const radius = particle.size * (0.9 + Math.sin(time * 1.4 + particle.phase) * 0.18);

        ctx.globalCompositeOperation = "lighter";

        const outer = ctx.createRadialGradient(x, y, 0, x, y, radius * 4.8);
        outer.addColorStop(0, hexToRgba(themeColors.tuca, 0.34));
        outer.addColorStop(1, hexToRgba(themeColors.tuca, 0));
        ctx.fillStyle = outer;
        ctx.beginPath();
        ctx.arc(x, y, radius * 4.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = hexToRgba(themeColors.tuca, 0.92);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const corePulse = 0.9 + Math.sin(time * 1.1) * 0.06;
      const coreRadius = size * 0.082 * corePulse;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 3.4);
      core.addColorStop(0, hexToRgba(themeColors.core, 0.95));
      core.addColorStop(0.32, hexToRgba(themeColors.tuca, 0.8));
      core.addColorStop(0.72, hexToRgba(themeColors.tuca, 0.18));
      core.addColorStop(1, hexToRgba(themeColors.tuca, 0));
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 3.4, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafId);
  }

  document.querySelectorAll("canvas[data-tuca-organism]").forEach(initTuca);

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    const cards = Array.from(track ? track.children : []);
    if (!track || cards.length < 2) return;

    let visibleCards = getVisibleCards();
    let pageCount = getPageCount();
    let currentPage = 0;
    let startX = 0;
    let deltaX = 0;
    let touching = false;

    function getVisibleCards() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 920) return 2;
      return 3;
    }

    function getPageCount() {
      return Math.max(1, Math.ceil(cards.length / visibleCards));
    }

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (let page = 0; page < pageCount; page += 1) {
        const dot = document.createElement("button");
        dot.className = "dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir para o grupo ${page + 1}`);
        dot.addEventListener("click", () => goToPage(page, true));
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPage);
      });
    }

    function goToPage(page, animate) {
      currentPage = ((page % pageCount) + pageCount) % pageCount;
      const gap = parseFloat(getComputedStyle(track).gap || "0");
      const cardWidth = cards[0].getBoundingClientRect().width;
      const pageWidth = (cardWidth * visibleCards) + (gap * Math.max(0, visibleCards - 1));
      track.style.transition = animate ? "transform 360ms cubic-bezier(.2,.8,.2,1)" : "none";
      track.style.transform = `translateX(-${currentPage * pageWidth}px)`;
      updateDots();
    }

    function next() {
      goToPage(currentPage + 1, true);
    }

    function prev() {
      goToPage(currentPage - 1, true);
    }

    prevBtn && prevBtn.addEventListener("click", prev);
    nextBtn && nextBtn.addEventListener("click", next);

    track.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
      deltaX = 0;
      touching = true;
    }, { passive: true });

    track.addEventListener("touchmove", (event) => {
      if (!touching) return;
      deltaX = event.touches[0].clientX - startX;
    }, { passive: true });

    track.addEventListener("touchend", () => {
      if (!touching) return;
      touching = false;
      if (Math.abs(deltaX) < 42) return;
      if (deltaX < 0) next();
      else prev();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        visibleCards = getVisibleCards();
        pageCount = getPageCount();
        if (currentPage > pageCount - 1) currentPage = pageCount - 1;
        renderDots();
        goToPage(currentPage, false);
      }, 80);
    });

    visibleCards = getVisibleCards();
    pageCount = getPageCount();
    renderDots();
    requestAnimationFrame(() => goToPage(0, false));
  });

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") {
      const success = document.querySelector(".waitlist-success");
      if (success) {
        success.classList.add("shown");
        success.textContent = "Anotado. A gente avisa quando abrir.";
      }
    }
  } catch (_) {}

  function hexToRgba(hex, alpha) {
    const value = hex.replace("#", "");
    const normalized = value.length === 3
      ? value.split("").map((char) => char + char).join("")
      : value;
    const int = parseInt(normalized, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
})();
