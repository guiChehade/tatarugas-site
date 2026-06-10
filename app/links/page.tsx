"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "@/components/AnimatedLogo";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};


const APP_STORE_BASE = "https://apps.apple.com/app/tatarugas/id6764645218";
const PLAY_STORE_BASE =
  "https://play.google.com/store/apps/details?id=com.guichehade.tatarugas";
// Token de campanha do App Analytics (App Store Connect > App Analytics >
// Sources > Campaigns > Generate Campaign Link fornece o `pt`). Enquanto
// vazio, o link da App Store sai sem atribuicao de campanha.
const APPLE_PROVIDER_TOKEN = "";

// Atribuicao: repassa os utm_* da propria URL da pagina para as lojas.
// Google Play: via `referrer` (aparece em Play Console > Aquisicao e pode
// ser lido pelo app via Install Referrer API). App Store: via campaign
// link `pt`/`ct` quando APPLE_PROVIDER_TOKEN estiver preenchido.
function useAttributedStoreLinks() {
  const [store, setStore] = useState({ apple: APP_STORE_BASE, play: PLAY_STORE_BASE });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .map((k) => [k, params.get(k)] as const)
      .filter((pair) => pair[1]);
    const referrer = utm.length
      ? utm.map(([k, v]) => `${k}=${v}`).join("&")
      : "utm_source=links_page";
    const play = `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(referrer)}`;
    let apple = APP_STORE_BASE;
    if (APPLE_PROVIDER_TOKEN) {
      const ct = params.get("utm_content") || params.get("utm_campaign") || "links_page";
      apple = `${APP_STORE_BASE}?pt=${APPLE_PROVIDER_TOKEN}&ct=${encodeURIComponent(ct)}&mt=8`;
    }
    setStore({ apple, play });
  }, []);
  return store;
}

type LinkItem = {
  href?: string;
  primary?: boolean;
  disabled?: boolean;
  badge?: string;
  title: string;
  sub: string;
  icon: ReactNode;
};

const links: LinkItem[] = [
  {
    href: "https://apps.apple.com/app/tatarugas/id6764645218",
    primary: true,
    title: "Baixar na App Store",
    sub: "Disponível para iPhone",
    icon: (
      <svg width="18" height="21" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.guichehade.tatarugas",
    primary: true,
    title: "Baixar no Google Play",
    sub: "Disponível para Android",
    icon: (
      <svg width="18" height="20" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
        <path d="M3.18 1.27C2.45 1.7 2 2.51 2 3.46v19.08c0 .95.45 1.76 1.18 2.19l.1.06 10.69-10.69v-.25L3.28 3.16l-.1.11zM17.46 17.37l-3.56-3.56v-.25l3.56-3.57.08.05 4.22 2.4c1.21.69 1.21 1.8 0 2.49l-4.22 2.4-.08.04zM14 13.91L3.18 24.73c.4.26.88.28 1.34.04l12.3-6.99L14 13.91zM4.52 1.23l12.3 6.99-2.82 2.82L4.52 1.23z" />
      </svg>
    ),
  },
  {
    href: "https://tatarugas.com.br",
    title: "Conhecer o Tatarugas",
    sub: "tatarugas.com.br",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/tatarugas_oficial/",
    title: "Instagram",
    sub: "@tatarugas_oficial",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@tatarugas_oficial",
    title: "TikTok",
    sub: "@tatarugas_oficial",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.53V6.83a4.85 4.85 0 0 1-1.01-.14z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  const store = useAttributedStoreLinks();
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(216,108,74,0.09) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 50% 40% at 30% 40%, rgba(216,108,74,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(216,108,74,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 40% at 30% 40%, rgba(216,108,74,0.05) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full max-w-sm mx-auto">
        {/* Logo + brand */}
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
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            App de casal
          </motion.p>

          <motion.h1
            className="font-display text-[1.9rem] leading-[1.1] text-text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Um lugar só de <em className="text-ember">vocês dois.</em>
          </motion.h1>

          <motion.p
            className="text-text-secondary text-[0.875rem] leading-relaxed mt-3 max-w-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            Sem feed, sem plateia. Só pequenos cuidados para conversar melhor e ficar perto no meio da rotina.
          </motion.p>
        </motion.div>

        {/* Link list */}
        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          aria-label="Links oficiais do Tatarugas"
          className="flex flex-col gap-3"
        >
          {links.map((link) => {
            const href = link.primary
              ? (link.title.includes("Google Play") ? store.play : store.apple)
              : link.href;
            if (link.disabled) {
              return (
                <motion.div
                  key={link.title}
                  variants={fadeUp}
                  className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bg-surface border border-bg-border opacity-40 cursor-not-allowed select-none"
                  aria-disabled="true"
                >
                  <div className="flex items-center gap-3 text-text-dim">
                    {link.icon}
                    <div>
                      <p className="font-medium text-[0.9rem] leading-tight">{link.title}</p>
                      <p className="text-[0.75rem] text-text-dim mt-0.5">{link.sub}</p>
                    </div>
                  </div>
                  <span className="text-[0.7rem] font-mono tracking-wider text-text-dim border border-bg-border px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                </motion.div>
              );
            }

            if (link.primary) {
              return (
                <motion.a
                  key={link.title}
                  variants={fadeUp}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-ember text-white shadow-lg shadow-ember/20 cursor-pointer"
                  whileHover={{ scale: 1.02, backgroundColor: "#c45f3e" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <div>
                      <p className="font-semibold text-[0.9rem] leading-tight">{link.title}</p>
                      <p className="text-[0.75rem] text-white/70 mt-0.5">{link.sub}</p>
                    </div>
                  </div>
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    className="transition-transform group-hover:translate-x-0.5 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M1 5h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              );
            }

            return (
              <motion.a
                key={link.title}
                variants={fadeUp}
                href={link.href}
                target={link.href?.startsWith("http") ? "_blank" : undefined}
                rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bg-surface border border-bg-border hover:border-ember/30 hover:bg-[#1c1108] text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-text-dim group-hover:text-ember transition-colors duration-200">
                    {link.icon}
                  </span>
                  <div>
                    <p className="font-medium text-[0.9rem] leading-tight">{link.title}</p>
                    <p className="text-[0.75rem] text-text-dim mt-0.5">{link.sub}</p>
                  </div>
                </div>
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="text-text-dim group-hover:text-ember transition-colors duration-200 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M1 5h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            );
          })}
        </motion.nav>

        {/* Footer */}
        <motion.p
          className="text-center text-[0.75rem] text-text-dim font-mono mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Feito devagar, no Brasil.
        </motion.p>
      </div>
    </main>
  );
}
