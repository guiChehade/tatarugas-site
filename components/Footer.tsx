"use client";

import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

export function Footer() {
  return (
    <footer className="border-t border-bg-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <AnimatedLogo size={24} animate={false} />
            <div>
              <p className="font-display text-text-primary text-sm">
                Tatar<em className="text-ember">ugas</em>
              </p>
              <p className="text-text-dim text-xs font-mono">
                Feito devagar. Pra durar.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-dim">
            <a
              href="https://tatarugas.com.br/privacy.html"
              className="hover:text-text-secondary transition-colors duration-200 cursor-pointer"
            >
              Privacidade
            </a>
            <a
              href="https://tatarugas.com.br/terms.html"
              className="hover:text-text-secondary transition-colors duration-200 cursor-pointer"
            >
              Termos de uso
            </a>
            <a
              href="https://tatarugas.com.br/contato.html"
              className="hover:text-text-secondary transition-colors duration-200 cursor-pointer"
            >
              Contato
            </a>
            <a
              href="https://tatarugas.com.br/links/"
              className="hover:text-text-secondary transition-colors duration-200 cursor-pointer"
            >
              Links
            </a>
            <a
              href="https://tatarugas.com.br/delete-account.html"
              className="text-red-400/40 hover:text-red-400/60 transition-colors duration-200 cursor-pointer"
            >
              Excluir conta
            </a>
          </nav>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-bg-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-text-dim text-xs font-mono">
            © 2026 — Tatarugas · feito no Brasil
          </p>
          <p className="text-text-dim text-xs font-mono">
            Todos os dias importam.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
