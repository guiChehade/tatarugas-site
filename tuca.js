// tuca.js — Tuca como organismo de partículas
// Web port fiel do componente RN (Reanimated worklets).
// Mesma matemática orbital 3D, mesmos parâmetros, mesmos gradientes.
//
// Uso: <canvas data-tuca data-size="240"></canvas>
//      Tuca.init();   // varre o documento e instancia
//
// Cores lidas do tema: --tuca, --tuca-core (com fallback para o app).

(function (global) {
  'use strict';

  // Estado e parâmetros (espelham o componente RN)
  // 50 partículas (pedido do user)
  const BASE_PARTICLE_COUNT = 50;
  // Sem rastro — só a head sólida (pedido do user).
  const TRAIL_STEPS = 0;
  const TRAIL_DURATION_S = 0;
  const REF_SIZE = 160;

  // Cor adaptativa por tema — espelha tucaCore do app
  function readThemeColors() {
    const styles = getComputedStyle(document.documentElement);
    const theme = document.documentElement.getAttribute('data-theme') || 'ember';
    const tuca = (styles.getPropertyValue('--tuca').trim()) || (theme === 'manha' ? '#3F8580' : '#5FA4A0');
    const tucaCore = (styles.getPropertyValue('--tuca-core').trim()) || (theme === 'manha' ? '#0E3F3D' : '#FFFFFF');
    const brightness = theme === 'manha' ? 0.85 * 0.82 : 0.85;
    return { tuca, tucaCore, brightness, theme };
  }

  // Parse "#rrggbb" / "rgb(...)" -> [r,g,b]
  function parseRGB(c) {
    if (!c) return [95, 164, 160];
    c = c.trim();
    if (c.startsWith('#')) {
      const h = c.slice(1);
      const v = h.length === 3
        ? h.split('').map(x => parseInt(x + x, 16))
        : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      return v;
    }
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(',').map(s => parseFloat(s));
      return [parts[0], parts[1], parts[2]];
    }
    return [95, 164, 160];
  }
  const rgba = (rgb, a) => `rgba(${rgb[0]|0},${rgb[1]|0},${rgb[2]|0},${a})`;

  // ---- Seed das partículas (igual ao RN: tilt + rotação Z aleatórios) ----
  function buildParticles(N, size, particleScale) {
    const arr = new Array(N);
    for (let i = 0; i < N; i++) {
      const tiltCos = Math.random();
      const tilt = Math.acos(tiltCos);
      const rotZ = Math.random() * Math.PI * 2;
      arr[i] = {
        baseR: (0.55 + Math.random() * 1.6) * particleScale,
        R: size * 0.30 + Math.random() * (size * 0.18),
        initialAngle: Math.random() * Math.PI * 2,
        rate: (0.7 + Math.random() * 1.0) * (Math.random() < 0.5 ? -1 : 1),
        cosTilt: Math.cos(tilt),
        sinTilt: Math.sin(tilt),
        cosRotZ: Math.cos(rotZ),
        sinRotZ: Math.sin(rotZ),
      };
    }
    return arr;
  }

  // ---- Loop por canvas ----
  class TucaCanvas {
    constructor(canvas, opts) {
      this.canvas = canvas;
      this.size = opts.size;
      this.density = opts.density ?? Math.max(0.4, Math.min(1, this.size / REF_SIZE));
      // 1.5x do original (era 0.58 -> 1.74 estava grande demais; metade disso)
      this.particleScale = opts.particleScale ?? (this.size < 80 ? 1.0 : 0.87);
      // Um pouco mais rápidas (era 0.28)
      this.rateScale = (opts.rateScale ?? 1) * 0.42;
      this.state = opts.state || 'listening'; // 'listening' | 'idle'
      this.brightnessMul = opts.brightness ?? 1;

      this.t = 0;
      this.lastFrameMs = 0;

      const N = Math.max(8, Math.round(BASE_PARTICLE_COUNT * this.density));
      this.particles = buildParticles(N, this.size, this.particleScale);

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.applyDPR();

      this.ctx = canvas.getContext('2d');
      this.running = false;
      this.visible = true;
      this.appActive = !document.hidden;

      // Reduce motion
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Visibilidade: pause quando fora da viewport
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) this.visible = e.isIntersecting;
          this.syncRunning();
        },
        { threshold: 0 }
      );
      io.observe(canvas);

      // Foco da aba
      document.addEventListener('visibilitychange', () => {
        this.appActive = !document.hidden;
        this.syncRunning();
      });

      // Tema mudou -> re-render imediato (cores recalculadas a cada frame, não precisa rebuild)
      this.colors = readThemeColors();
      const mo = new MutationObserver(() => { this.colors = readThemeColors(); });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

      // Resize observer (re-faz seeds se size mudar significativamente)
      const ro = new ResizeObserver(() => this.handleResize());
      ro.observe(canvas);

      this.syncRunning();
      // primeiro paint mesmo se "parado" (reduce-motion)
      this.draw(0);
    }

    applyDPR() {
      const s = this.size;
      this.canvas.width = Math.round(s * this.dpr);
      this.canvas.height = Math.round(s * this.dpr);
      this.canvas.style.width = s + 'px';
      this.canvas.style.height = s + 'px';
    }

    handleResize() {
      const rect = this.canvas.getBoundingClientRect();
      const newSize = Math.round(rect.width || this.size);
      if (Math.abs(newSize - this.size) < 2) return;
      this.size = newSize;
      this.particleScale = (this.size < 80 ? 1.0 : 0.87);
      this.density = Math.max(0.4, Math.min(1, this.size / REF_SIZE));
      const N = Math.max(8, Math.round(BASE_PARTICLE_COUNT * this.density));
      this.particles = buildParticles(N, this.size, this.particleScale);
      this.applyDPR();
    }

    syncRunning() {
      const should = !this.reduceMotion && this.appActive && this.visible;
      if (should && !this.running) {
        this.running = true;
        this.lastFrameMs = performance.now();
        requestAnimationFrame((ts) => this.tick(ts));
      } else if (!should) {
        this.running = false;
        // redesenha 1 frame estático com t atual pra não ficar com lixo
        this.draw(0);
      }
    }

    tick(now) {
      if (!this.running) return;
      const dt = Math.min((now - this.lastFrameMs) / 1000, 0.05);
      this.lastFrameMs = now;
      const idleScale = this.state === 'idle' ? 0.06 : 1.0;
      this.t += dt * this.rateScale * idleScale;
      this.draw(now);
      requestAnimationFrame((ts) => this.tick(ts));
    }

    draw(now) {
      const { ctx, size, t, particles, colors } = this;
      const cx = size / 2, cy = size / 2;
      const adaptedBrightness = colors.brightness * this.brightnessMul;
      const tucaRGB = parseRGB(colors.tuca);
      const coreRGB = parseRGB(colors.tucaCore);

      ctx.save();
      ctx.scale(this.dpr, this.dpr);
      ctx.clearRect(0, 0, size, size);

      // Halo de fundo (RadialGradient bg) — 5 stops, falloff suave
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.55);
      bgGrad.addColorStop(0.0, rgba(tucaRGB, 0.18));
      bgGrad.addColorStop(0.30, rgba(tucaRGB, 0.12));
      bgGrad.addColorStop(0.55, rgba(tucaRGB, 0.05));
      bgGrad.addColorStop(0.80, rgba(tucaRGB, 0.012));
      bgGrad.addColorStop(1.0, rgba(tucaRGB, 0));
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Pulse parametric do core (mesma curva: sin(elapsed*0.9)*.5+.5)
      const elapsedSec = (now || 0) / 1000;
      const pulse = Math.sin(elapsedSec * 0.9) * 0.5 + 0.5;

      // Estado
      const stateCfg = this.state === 'idle'
        ? { coreBright: 0.7, corePulse: 0.45, coreSize: 1.0, coreBaseScale: 0.78 }
        : { coreBright: 0.95, corePulse: 0.6, coreSize: 1.5, coreBaseScale: 1.0 };
      const coreBright = Math.min(1, stateCfg.coreBright + pulse * stateCfg.corePulse) * adaptedBrightness;
      const baseCoreR = size * 0.12 * stateCfg.coreBaseScale * (0.9 + pulse * 0.25 * stateCfg.coreSize);
      const coreR = baseCoreR; // sem explosionPhase no site

      // Partículas — só head, sem rastro.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = p.initialAngle + p.rate * t;
        const cosA = Math.cos(angle), sinA = Math.sin(angle);
        const localX = p.R * cosA;
        const localY = p.R * sinA * p.cosTilt;
        const localZ = p.R * sinA * p.sinTilt;
        const tx = cx + localX * p.cosRotZ - localY * p.sinRotZ;
        const ty = cy + localX * p.sinRotZ + localY * p.cosRotZ;
        const depth = p.R > 0 ? localZ / p.R : 0;
        const depthScale = 1 + depth * 0.4;
        const depthAlpha = (0.78 + depth * 0.22);
        const wobble = 0.9 + Math.sin(angle * 1.3) * 0.12;
        const r = p.baseR * wobble * depthScale * 1.7;
        drawHeadDot(ctx, tx, ty, r, depthAlpha * adaptedBrightness, coreRGB, tucaRGB);
      }

      // Core central (gradient com tucaCore -> tuca -> transparent)
      // Renderizado como Circle com r = coreR * 3.5, igual ao RN
      const coreRenderR = coreR * 3.5;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRenderR);
      coreGrad.addColorStop(0.0, rgba(coreRGB, Math.min(1, coreBright * 1.05)));
      coreGrad.addColorStop(0.15, rgba(coreRGB, Math.min(1, coreBright * 0.95)));
      coreGrad.addColorStop(0.40, rgba(tucaRGB, Math.min(1, coreBright * 1.0)));
      coreGrad.addColorStop(0.60, rgba(tucaRGB, Math.min(1, coreBright * 0.32)));
      coreGrad.addColorStop(0.80, rgba(tucaRGB, Math.min(1, coreBright * 0.12)));
      coreGrad.addColorStop(1.0, rgba(tucaRGB, 0));
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRenderR, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Head — dot sólido (centro coreColor, borda fina tuca pra integrar).
  // Sem halo radial — brilho ao redor virou trail.
  function drawHeadDot(ctx, x, y, r, alpha, coreRGB, tucaRGB) {
    if (r <= 0.05 || alpha <= 0.005) return;
    // Gradient curto: core 0..0.7, tuca borda. Sem fade pro infinito.
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.0, rgba(coreRGB, Math.min(1, alpha * 1.0)));
    g.addColorStop(0.7, rgba(coreRGB, Math.min(1, alpha * 0.85)));
    g.addColorStop(1.0, rgba(tucaRGB, alpha * 0.6));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Trail step — dot sólido em tucaColor, alpha já calculado pelo caller.
  function drawSolidDot(ctx, x, y, r, alpha, tucaRGB, coreRGB) {
    if (r <= 0.05 || alpha <= 0.005) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.0, rgba(coreRGB, alpha * 0.55));
    g.addColorStop(0.5, rgba(tucaRGB, alpha * 0.85));
    g.addColorStop(1.0, rgba(tucaRGB, alpha * 0.4));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---- API pública ----
  function init(root) {
    root = root || document;
    const nodes = root.querySelectorAll('canvas[data-tuca]');
    nodes.forEach((c) => {
      if (c._tuca) return;
      const size = parseInt(c.dataset.size || '240', 10);
      const state = c.dataset.state || 'listening';
      const density = c.dataset.density ? parseFloat(c.dataset.density) : undefined;
      const brightness = c.dataset.brightness ? parseFloat(c.dataset.brightness) : 1;
      c._tuca = new TucaCanvas(c, { size, state, density, brightness });
    });
  }

  global.Tuca = { init };
})(window);
