"use client";

import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

export function DownloadSection() {
  return (
    <section id="baixar" className="py-24 md:py-40 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(216,108,74,0.07), transparent)",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <AnimatedLogo size={56} />
        </motion.div>

        <motion.p
          className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Já disponível
        </motion.p>

        <motion.h2
          className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] text-text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          Baixe o Tatarugas
          <br />
          <em className="text-ember">no iPhone ou Android.</em>
        </motion.h2>

        <motion.p
          className="text-text-secondary text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          Disponível para iPhone na App Store e para Android no Google Play.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.28 }}
        >
          <motion.a
            href="https://apps.apple.com/app/tatarugas/id6764645218"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-ember rounded-full text-white font-semibold text-base cursor-pointer shadow-lg shadow-ember/20"
            whileHover={{ scale: 1.03, backgroundColor: "#c45f3e" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg width="16" height="19" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Baixar na App Store
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M1 4.5h10m-3.5-3.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <motion.a
            href="https://play.google.com/store/apps/details?id=com.guichehade.tatarugas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-ember rounded-full text-white font-semibold text-base cursor-pointer shadow-lg shadow-ember/20"
            whileHover={{ scale: 1.03, backgroundColor: "#c45f3e" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg width="16" height="18" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
              <path d="M3.18 1.27C2.45 1.7 2 2.51 2 3.46v19.08c0 .95.45 1.76 1.18 2.19l.1.06 10.69-10.69v-.25L3.28 3.16l-.1.11zM17.46 17.37l-3.56-3.56v-.25l3.56-3.57.08.05 4.22 2.4c1.21.69 1.21 1.8 0 2.49l-4.22 2.4-.08.04zM14 13.91L3.18 24.73c.4.26.88.28 1.34.04l12.3-6.99L14 13.91zM4.52 1.23l12.3 6.99-2.82 2.82L4.52 1.23z"/>
            </svg>
            Baixar no Google Play
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M1 4.5h10m-3.5-3.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
