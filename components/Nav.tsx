"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { AnimatedLogo } from "./AnimatedLogo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{ height: 64 }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
    >
      <motion.div
        className="absolute inset-0 border-b border-bg-border/0 transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? "rgba(15,9,6,0.85)" : "transparent",
          borderColor: scrolled ? "rgba(46,29,20,0.5)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: "none" }}
      />

      <a
        href="#"
        className="relative flex items-center gap-2.5 group"
        aria-label="Tatarugas · início"
      >
        <AnimatedLogo size={28} animate={false} />
        <span className="font-display text-text-primary font-medium tracking-tight text-[15px]">
          Tatar<em className="text-ember">ugas</em>
        </span>
      </a>

      <nav className="relative flex items-center gap-6 text-[13px] text-text-secondary font-medium">
        <a
          href="#cabe"
          className="hover:text-text-primary transition-colors duration-200 hidden sm:block"
        >
          Funcionalidades
        </a>
        <a
          href="https://apps.apple.com/app/tatarugas/id6764645218"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ember/10 border border-ember/20 text-ember hover:bg-ember/20 hover:border-ember/40 transition-all duration-200 cursor-pointer"
        >
          <svg width="12" height="14" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          App Store
        </a>
      </nav>
    </motion.header>
  );
}
