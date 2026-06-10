"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedLogo } from "@/components/AnimatedLogo";

// Espelha `normalizeInviteCode` do app (packages/domain): uppercase,
// sem espaços e sem hífens.
function normalizeInviteCode(input: string): string {
  return input.trim().toUpperCase().replace(/[\s-]/g, "");
}

const APP_STORE_URL = "https://apps.apple.com/app/tatarugas/id6764645218";
// TODO: ativar quando o app sair do teste fechado no Google Play.
// URL canônica já reservada:
// https://play.google.com/store/apps/details?id=com.guichehade.tatarugas
const PLAY_STORE_URL: string | null = null;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ConviteContent() {
  const searchParams = useSearchParams();
  const code = useMemo(
    () => normalizeInviteCode(searchParams.get("codigo") ?? ""),
    [searchParams],
  );
  const hasCode = code.length >= 6;
  const deepLink = hasCode
    ? `tatarugas://convite?codigo=${encodeURIComponent(code)}`
    : "tatarugas://convite";
  const [copied, setCopied] = useState(false);

  // Tenta abrir o app automaticamente em devices móveis. Se o app
  // não estiver instalado, nada acontece e a pessoa segue na página
  // (código visível + lojas logo abaixo).
  useEffect(() => {
    if (!hasCode) return;
    if (typeof navigator === "undefined") return;
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!isMobile) return;
    const timer = setTimeout(() => {
      window.location.href = deepLink;
    }, 600);
    return () => clearTimeout(timer);
  }, [deepLink, hasCode]);

  const handleCopy = async () => {
    if (!hasCode) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard bloqueado — o código continua legível na tela.
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Aurora background — mesmo clima da página /links */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(216,108,74,0.09) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative w-full max-w-sm mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AnimatedLogo size={56} />

          <motion.p
            className="font-mono text-[10px] text-text-dim tracking-[0.22em] uppercase mt-5 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Convite de pareamento
          </motion.p>

          <motion.h1
            className="font-display text-[1.9rem] leading-[1.1] text-text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {hasCode ? (
              <>
                Seu par te chamou para um lugar{" "}
                <em className="text-ember">só de vocês dois.</em>
              </>
            ) : (
              <>
                Este convite veio <em className="text-ember">sem código.</em>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-text-secondary text-[0.875rem] leading-relaxed mt-3 max-w-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {hasCode
              ? "Abra o Tatarugas e use o código abaixo — ou toque em abrir no app, que ele já vai preenchido."
              : "Peça para seu par enviar o link de novo pelo app, ou digite o código de 6 caracteres direto no Tatarugas."}
          </motion.p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          {hasCode && (
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-3 px-5 py-6 rounded-2xl bg-bg-surface border border-bg-border"
            >
              <p className="font-mono text-[10px] text-text-dim tracking-[0.22em] uppercase">
                Código do convite
              </p>
              <p
                className="font-mono text-[2rem] leading-none text-text-primary tracking-[0.3em] pl-[0.3em] select-all"
                aria-label={`Código do convite: ${code}`}
              >
                {code}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="mt-1 px-5 py-2 rounded-full border border-bg-border text-text-secondary text-[0.8rem] font-medium hover:border-ember hover:text-ember transition-colors cursor-pointer"
              >
                {copied ? "Copiado!" : "Copiar código"}
              </button>
            </motion.div>
          )}

          {hasCode && (
            <motion.a
              variants={fadeUp}
              href={deepLink}
              className="flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-ember text-white font-semibold text-[0.95rem] shadow-lg shadow-ember/20 cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: "#c45f3e" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Abrir no app
            </motion.a>
          )}

          <motion.a
            variants={fadeUp}
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bg-surface border border-bg-border text-text-primary cursor-pointer hover:border-ember/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg width="18" height="21" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="font-medium text-[0.9rem] leading-tight">Baixar na App Store</p>
                <p className="text-[0.75rem] text-text-dim mt-0.5">Disponível para iPhone</p>
              </div>
            </div>
          </motion.a>

          {PLAY_STORE_URL ? (
            <motion.a
              variants={fadeUp}
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bg-surface border border-bg-border text-text-primary cursor-pointer hover:border-ember/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <PlayIcon />
                <div>
                  <p className="font-medium text-[0.9rem] leading-tight">Baixar no Google Play</p>
                  <p className="text-[0.75rem] text-text-dim mt-0.5">Disponível para Android</p>
                </div>
              </div>
            </motion.a>
          ) : (
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bg-surface border border-bg-border opacity-40 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              <div className="flex items-center gap-3 text-text-dim">
                <PlayIcon />
                <div>
                  <p className="font-medium text-[0.9rem] leading-tight">Google Play</p>
                  <p className="text-[0.75rem] text-text-dim mt-0.5">Android em breve</p>
                </div>
              </div>
              <span className="text-[0.7rem] font-mono tracking-wider text-text-dim border border-bg-border px-2 py-0.5 rounded-full">
                Em breve
              </span>
            </motion.div>
          )}

          <motion.a
            variants={fadeUp}
            href="https://tatarugas.com.br"
            className="text-center text-[0.8rem] text-text-dim hover:text-text-secondary transition-colors mt-2"
          >
            Conhecer o Tatarugas →
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
      <path d="M3.18 1.27C2.45 1.7 2 2.51 2 3.46v19.08c0 .95.45 1.76 1.18 2.19l.1.06 10.69-10.69v-.25L3.28 3.16l-.1.11zM17.46 17.37l-3.56-3.56v-.25l3.56-3.57.08.05 4.22 2.4c1.21.69 1.21 1.8 0 2.49l-4.22 2.4-.08.04zM14 13.91L3.18 24.73c.4.26.88.28 1.34.04l12.3-6.99L14 13.91zM4.52 1.23l12.3 6.99-2.82 2.82L4.52 1.23z" />
    </svg>
  );
}
