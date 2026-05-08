// Tatarugas · site público — comportamento mínimo
// 1. Theme toggle ember/manhã com persistência (localStorage), sync sem FOUC
// 2. Waitlist form (mostra success state no client; produção integra com backend)
// 3. Inicializa as Tucas (canvas) presentes na página
// 4. Scroll-reveal sutil via IntersectionObserver

(function () {
  const STORAGE_KEY = 'tatarugas.theme';
  const root = document.documentElement;

  // ── Theme ───────────────────────────────────────────
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle .opt').forEach((el) => {
      el.setAttribute('aria-pressed', el.dataset.theme === theme ? 'true' : 'false');
    });
    // theme-color do navegador
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'manha' ? '#FBF6EE' : '#1A120F');
  }
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.opt');
      let next;
      if (target) next = target.dataset.theme;
      else next = (root.getAttribute('data-theme') || 'ember') === 'ember' ? 'manha' : 'ember';
      try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
      applyTheme(next);
    });
  });
  applyTheme(root.getAttribute('data-theme') || 'ember');

  // ── Waitlist ────────────────────────────────────────
  const form = document.querySelector('.waitlist-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      const email = (input?.value || '').trim();
      if (!email) return;
      const success = document.querySelector('.waitlist-success');
      if (success) {
        success.classList.add('shown');
        success.textContent = 'Anotado. A gente avisa quando abrir.';
      }
      if (input) input.value = '';
    });
  }

  // ── Tucas ───────────────────────────────────────────
  if (window.Tuca && typeof window.Tuca.init === 'function') {
    window.Tuca.init();
  }

  // ── Scroll-reveal sutil ─────────────────────────────
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ── Sucesso do FormSubmit (página de contato) ──────
  const params = new URLSearchParams(window.location.search);
  if (params.get('enviado') === '1') {
    const s = document.querySelector('.waitlist-success');
    if (s) {
      s.textContent = 'Mensagem recebida. A gente responde em até 48h.';
      s.classList.add('shown');
    }
  }
})();
