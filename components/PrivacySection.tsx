"use client";

import { motion } from "framer-motion";

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

const pillars = [
  { label: "Zero acesso da equipe", desc: "O time não tem acesso ao que vocês escrevem ou marcam." },
  { label: "Aprendizado desligável", desc: "Vocês podem desligar o aprendizado da Tuca a qualquer momento." },
  { label: "Exclusão real", desc: "Você apaga a conta — e tudo vai junto. Sem vestígios." },
];

export function PrivacySection() {
  return (
    <section id="privacidade" className="py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative rounded-2xl border border-bg-border bg-bg-surface overflow-hidden p-10 md:p-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 100% 100%, rgba(216,108,74,0.06), transparent)",
            }}
          />

          <div className="relative grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-ember">
                  <LockIcon />
                </div>
                <p className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase">
                  Privacidade
                </p>
              </div>

              <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-text-primary mb-6">
                Os dados de vocês ficam{" "}
                <em className="text-ember">só entre vocês.</em>
              </h2>

              <p className="text-text-secondary leading-relaxed mb-8">
                Não é discurso bonito. É como o app foi construído desde o
                primeiro dia.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://tatarugas.com.br/privacy/"
                  className="text-sm text-text-dim hover:text-text-secondary border border-bg-border hover:border-bg-border/60 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Política de privacidade
                </a>
                <a
                  href="https://tatarugas.com.br/terms/"
                  className="text-sm text-text-dim hover:text-text-secondary border border-bg-border hover:border-bg-border/60 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Termos de uso
                </a>
                <a
                  href="https://tatarugas.com.br/delete-account/"
                  className="text-sm text-red-400/60 hover:text-red-400/80 border border-red-900/30 hover:border-red-900/50 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Excluir conta
                </a>
              </div>
            </div>

            <div className="space-y-5">
              {pillars.map(({ label, desc }, i) => (
                <motion.div
                  key={label}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full border border-ember/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium text-sm mb-0.5">{label}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
