// Tatarugas · site publico
// 1. Theme toggle ember/manha com persistencia
// 2. Estados de sucesso dos formularios publicos
// 3. Fluxo de delete-account com confirmacao por email
// 4. Inicializa as Tucas (canvas) presentes na pagina
// 5. Scroll-reveal sutil via IntersectionObserver

(function () {
  const STORAGE_KEY = 'tatarugas.theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle .opt').forEach((el) => {
      el.setAttribute('aria-pressed', el.dataset.theme === theme ? 'true' : 'false');
    });

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'manha' ? '#FBF6EE' : '#1A120F');
  }

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.opt');
      let next;

      if (target) next = target.dataset.theme;
      else next = (root.getAttribute('data-theme') || 'ember') === 'ember' ? 'manha' : 'ember';

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}

      applyTheme(next);
    });
  });

  applyTheme(root.getAttribute('data-theme') || 'ember');

  if (window.Tuca && typeof window.Tuca.init === 'function') {
    window.Tuca.init();
  }

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  function showMessage(node, message, tone) {
    if (!node) return;
    node.textContent = message;
    node.classList.add('shown');
    node.dataset.tone = tone || 'info';
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get('interesse') === '1') {
    showMessage(
      document.querySelector('.waitlist-success'),
      'Email recebido. A gente avisa quando abrir.',
      'success',
    );
  }

  if (params.get('enviado') === '1') {
    showMessage(
      document.querySelector('.waitlist-success'),
      'Mensagem recebida. A gente responde em ate 48h.',
      'success',
    );
  }

  const deleteFeedback = document.querySelector('[data-delete-request-feedback]');
  const deleteRequestStatus = params.get('delete_request');

  if (deleteRequestStatus && deleteFeedback) {
    const deleteMessages = {
      confirmed:
        'Conta confirmada para exclusao. O processamento ja comecou.',
      already_done:
        'Esse link ja foi usado antes. Se a conta existia, a exclusao ja foi processada.',
      expired:
        'Esse link expirou. Voce pode pedir um novo email de confirmacao abaixo.',
      invalid:
        'Nao conseguimos validar esse link. Peca um novo email de confirmacao abaixo.',
      failed:
        'Nao conseguimos concluir a exclusao agora. Tenta de novo ou escreve para contato@tatarugas.com.br.',
    };

    showMessage(
      deleteFeedback,
      deleteMessages[deleteRequestStatus] ||
        'Nao conseguimos validar esse link. Peca um novo email de confirmacao abaixo.',
      deleteRequestStatus === 'confirmed' || deleteRequestStatus === 'already_done'
        ? 'success'
        : 'error',
    );
  }

  const deleteForm = document.querySelector('[data-delete-account-form]');
  if (deleteForm) {
    const endpoint = deleteForm.getAttribute('data-endpoint');
    const feedback = deleteForm.querySelector('[data-delete-request-feedback]');
    const submitButton = deleteForm.querySelector('button[type="submit"]');

    deleteForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!endpoint || !submitButton) return;

      const formData = new FormData(deleteForm);
      const honeypot = String(formData.get('_honey') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const motivo = String(formData.get('motivo') || '').trim();

      if (honeypot) {
        showMessage(
          feedback,
          'Se existir uma conta ligada a esse email, vamos enviar um link de confirmacao.',
          'success',
        );
        return;
      }

      if (!email) {
        showMessage(feedback, 'Preenche o email usado no app.', 'error');
        return;
      }

      const originalLabel = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.textContent = 'Enviando...';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, motivo }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          showMessage(
            feedback,
            data.error || 'Nao conseguimos enviar agora. Tenta de novo em instantes.',
            'error',
          );
          return;
        }

        showMessage(
          feedback,
          data.message ||
            'Se existir uma conta ligada a esse email, vamos enviar um link de confirmacao para concluir a exclusao.',
          'success',
        );
        deleteForm.reset();
      } catch (_) {
        showMessage(
          feedback,
          'Nao conseguimos enviar agora. Tenta de novo em instantes.',
          'error',
        );
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        submitButton.innerHTML = originalLabel;
      }
    });
  }
})();
