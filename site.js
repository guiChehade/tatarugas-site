// Tatarugas · site público
// 1. Theme toggle (ember/manhã)
// 2. Tuca canvas — clearRect por frame (zero rastro), núcleo discreto, state=listening
// 3. Carrossel infinito com clones + transform + teleport no wrap
// 4. Waitlist via FormSubmit (form action no HTML)

(function () {
  const STORAGE_KEY = 'tatarugas.theme';
  const root = document.documentElement;

  // ─── Theme toggle ────────────────────────────────
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle .opt').forEach((el) => {
      el.setAttribute('aria-pressed', el.dataset.theme === theme ? 'true' : 'false');
    });
    if (window.__tucaInstances) {
      window.__tucaInstances.forEach((fn) => fn && fn());
    }
  }
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.opt');
      if (target) {
        const next = target.dataset.theme;
        if (next) {
          localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
        }
        return;
      }
      const current = root.getAttribute('data-theme') || 'ember';
      const next = current === 'ember' ? 'manha' : 'ember';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });
  applyTheme(root.getAttribute('data-theme') || 'ember');

  // ─── Tuca Organism (canvas, sem rastro) ──────────
  function initTuca(canvas) {
    const size = parseInt(canvas.getAttribute('width'), 10) || 280;
    const density = 1;
    const noiseAmp = 1.0;
    const brightness = 0.42;
    const particleScale = 0.69;   // 1.5x do original

    const styles = getComputedStyle(root);
    let color = (styles.getPropertyValue('--tuca') || '#5FA4A0').trim() || '#5FA4A0';

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const N = Math.round(50 * density);
    const cx = size / 2, cy = size / 2;
    const particles = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2 + Math.random() * 0.4;
      const r = 30 + Math.random() * (size * 0.32);
      return {
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        vx: 0, vy: 0,
        phase: Math.random() * Math.PI * 2,
        baseR: (0.6 + Math.random() * 1.6) * particleScale,
      };
    });

    let raf, t0 = performance.now();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function refreshColor() {
      const s = getComputedStyle(root);
      color = (s.getPropertyValue('--tuca') || '#5FA4A0').trim() || '#5FA4A0';
    }
    window.__tucaInstances = window.__tucaInstances || [];
    window.__tucaInstances.push(refreshColor);

    const render = (now) => {
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      const t = now / 1000;
      const col = color;

      // listening state values
      const gravity = 1.2;
      const damping = 0.92;
      const dispersion = size * 0.22;
      let noise = 0.10 * noiseAmp;
      const coreBright = 0.85 * brightness;
      const alpha = 0.85 * brightness;
      if (reduce) noise *= 0.3;

      // CLEAR completo: zero rastro, zero pintura de fundo
      ctx.clearRect(0, 0, size, size);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = cx - p.x, dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const delta = dist - dispersion;
        const ux = dx / dist, uy = dy / dist;
        p.vx += ux * delta * 0.0025 * gravity;
        p.vy += uy * delta * 0.0025 * gravity;
        const swirl = 0.018;
        p.vx += -uy * swirl;
        p.vy += ux * swirl;
        p.phase += dt * 1.1;
        p.vx += Math.cos(p.phase + i * 0.3) * noise * dt * 60;
        p.vy += Math.sin(p.phase * 0.9 + i * 0.5) * noise * dt * 60;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        const r = p.baseR * (0.85 + Math.sin(p.phase * 1.3) * 0.25);
        // source-over: substitui em vez de somar — sem build-up de fundo
        ctx.globalCompositeOperation = 'source-over';
        const aOuter = Math.floor(Math.min(1, alpha * 1.6) * 80).toString(16).padStart(2, '0');
        const aInner = Math.floor(Math.min(1, alpha * 2.4) * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = col + aOuter;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = col + aInner;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Núcleo — moderadamente maior que o original, sem bulb sólido
      // (bulb sólido + lighter mode acumulava pra branco no centro)
      const pulse = Math.sin(t * 0.9) * 0.5 + 0.5;
      const coreR = size * 0.045 * (0.9 + pulse * 0.25);  // ~size*0.04–0.052
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4);
      const cb = Math.floor(coreBright * 160).toString(16).padStart(2, '0');
      coreGrad.addColorStop(0, col + cb);
      coreGrad.addColorStop(0.5, col + '40');
      coreGrad.addColorStop(1, col + '00');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 4, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
  }
  document.querySelectorAll('canvas[data-tuca-organism]').forEach(initTuca);

  // ─── Carrossel infinito com clones ───────────────
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    if (!track) return;

    const realCards = Array.from(track.children);
    const N = realCards.length;
    if (N < 2) return;

    // Clones: 2 antes (c_{N-2}, c_{N-1}) + 3 depois (c0, c1, c2)
    // Garantem peek+full visíveis nas pontas + durante wrap, sem buraco em branco.
    const PREPEND = 2;
    const APPEND  = 3;
    const beforeClones = [
      realCards[N - 2].cloneNode(true),
      realCards[N - 1].cloneNode(true),
    ];
    const afterClones = [
      realCards[0].cloneNode(true),
      realCards[1 % N].cloneNode(true),
      realCards[2 % N].cloneNode(true),
    ];
    [...beforeClones, ...afterClones].forEach((c) => {
      c.classList.add('carousel-clone');
      c.setAttribute('aria-hidden', 'true');
      c.setAttribute('tabindex', '-1');
      c.querySelectorAll('a, button, input, [tabindex]').forEach((el) => el.setAttribute('tabindex', '-1'));
    });
    // Prepend mantendo ordem: c_{N-2} primeiro, depois c_{N-1}
    track.insertBefore(beforeClones[1], track.firstChild);
    track.insertBefore(beforeClones[0], track.firstChild);
    // Append: c0, c1, c2
    afterClones.forEach((c) => track.appendChild(c));
    // DOM final: [c_{N-2}, c_{N-1}, c0..c_{N-1}, c0_clone, c1_clone, c2_clone]

    // Dots — 1 por card real
    if (dotsWrap) {
      realCards.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot';
        d.type = 'button';
        d.setAttribute('aria-label', `Ir para card ${i + 1}`);
        d.addEventListener('click', () => goToIdx(i, true));
        dotsWrap.appendChild(d);
      });
    }

    let idx = 0;        // 0..N-1 (índice real)
    let isAnimating = false;

    function getStep() {
      if (track.children.length < 2) return 0;
      const a = track.children[0].getBoundingClientRect();
      const b = track.children[1].getBoundingClientRect();
      return b.left - a.left;
    }
    function getGap() {
      return parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    }
    function getXForDomPos(domIdx) {
      // translateX tal que child[domIdx] apareça em viewport.left + (peek + gap)
      // Como o track tem padding-inline: peek e está dentro de overflow:hidden,
      // child[k] está em track.x = peek + k*step. Queremos ele em viewport.left + peek + gap.
      // -translateX + peek + gap = peek + k*step  →  translateX = gap - k*step
      return getGap() - domIdx * getStep();
    }
    function setX(x, animate = true) {
      track.style.transition = animate ? 'transform 420ms cubic-bezier(.2,.8,.2,1)' : 'none';
      track.style.transform = `translateX(${x}px)`;
    }
    function goToIdx(newIdx, animate = true) {
      idx = ((newIdx % N) + N) % N;
      // c_idx está em DOM index idx + PREPEND (offset dos clones iniciais)
      setX(getXForDomPos(idx + PREPEND), animate);
      updateDots();
    }
    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }

    function next() {
      if (isAnimating) return;
      if (idx === N - 1) {
        // Wrap: animar até primeiro afterClone (DOM N + PREPEND), depois teleport pra c0
        isAnimating = true;
        setX(getXForDomPos(N + PREPEND), true);
        track.addEventListener('transitionend', function onEnd() {
          track.removeEventListener('transitionend', onEnd);
          requestAnimationFrame(() => {
            track.style.transition = 'none';
            track.style.transform = `translateX(${getXForDomPos(PREPEND)}px)`;
            track.offsetHeight; // force reflow
            idx = 0;
            updateDots();
            isAnimating = false;
          });
        }, { once: true });
      } else {
        goToIdx(idx + 1, true);
      }
    }
    function prev() {
      if (isAnimating) return;
      if (idx === 0) {
        // Wrap: animar até c_{N-1}_clone (DOM PREPEND - 1 = 1), teleport pra c_{N-1}
        isAnimating = true;
        setX(getXForDomPos(PREPEND - 1), true);
        track.addEventListener('transitionend', function onEnd() {
          track.removeEventListener('transitionend', onEnd);
          requestAnimationFrame(() => {
            track.style.transition = 'none';
            track.style.transform = `translateX(${getXForDomPos(PREPEND + N - 1)}px)`;
            track.offsetHeight;
            idx = N - 1;
            updateDots();
            isAnimating = false;
          });
        }, { once: true });
      } else {
        goToIdx(idx - 1, true);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Reposicionar no resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => goToIdx(idx, false), 80);
    });

    // Posição inicial
    requestAnimationFrame(() => goToIdx(0, false));

    // Touch swipe básico (mobile)
    let touchStartX = 0, touchDx = 0, touching = false;
    track.addEventListener('touchstart', (e) => {
      if (isAnimating) return;
      touchStartX = e.touches[0].clientX;
      touchDx = 0;
      touching = true;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      if (!touching) return;
      touchDx = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (!touching) return;
      touching = false;
      if (Math.abs(touchDx) > 40) {
        if (touchDx < 0) next();
        else prev();
      }
    });
  });

  // ─── Waitlist success (post-FormSubmit) ──────────
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === '1') {
      const success = document.querySelector('.waitlist-success');
      if (success) {
        success.classList.add('shown');
        success.textContent = 'Anotado. A gente avisa quando abrir.';
      }
    }
  } catch (_) {}
})();
