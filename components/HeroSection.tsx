"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedLogo } from "./AnimatedLogo";

const words = ["Um", "lugar", "só", "de"];
const emWords = ["vocês", "dois."];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(216,108,74,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 40% at 30% 40%, rgba(216,108,74,0.06) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 40% at 70% 60%, rgba(216,108,74,0.06) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 40% at 30% 40%, rgba(216,108,74,0.06) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Large background logo */}
      <motion.div
        className="absolute opacity-[0.03] pointer-events-none"
        style={{ y }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <AnimatedLogo size={480} animate={false} />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
        style={{ opacity }}
      >
        {/* Logo mark */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedLogo size={72} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Para casais
        </motion.p>

        {/* Title */}
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-semibold tracking-tight mb-6">
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 1.0 + i * 0.07,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {emWords.map((word, i) => (
              <motion.em
                key={word}
                className="text-ember"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 1.28 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.em>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-text-secondary text-lg leading-relaxed max-w-xl mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.55 }}
        >
          Não é app de match. Não é rede social. É o espaço privado de duas
          pessoas que se escolheram — pra conversa que costuma não acontecer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.75 }}
        >
          <motion.a
            href="https://apps.apple.com/app/tatarugas/id6764645218"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3.5 bg-ember rounded-full text-white font-semibold text-[15px] cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: "#c45f3e" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg width="14" height="17" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
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
            href="#cabe"
            className="text-text-dim hover:text-text-secondary text-sm transition-colors duration-200 cursor-pointer"
            whileHover={{ y: -1 }}
          >
            Ver funcionalidades
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-ember/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
