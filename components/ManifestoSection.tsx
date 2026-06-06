"use client";

import { motion } from "framer-motion";

const paragraphs = [
  <>Tem app pra você <em className="text-ember">achar alguém.</em> Esse aqui é o contrário: pra continuar <em className="text-ember">escolhendo a pessoa que você já escolheu.</em></>,
  <>É sobre ver uma <em className="text-ember">notificação</em> da sua pessoa e sentir, antes mesmo de abrir, que veio de <em className="text-ember">alguém que importa.</em></>,
  <>É sobre ter um lugar que guarda o que <em className="text-ember">existe entre vocês:</em> conversa, cuidado, perguntas, clima, memória, reconexão.</>,
  <>É por isso que a <em className="text-ember">Tuca</em> existe. A gente investe em <em className="text-ember">IA</em> pra você entender o seu <em className="text-ember">relacionamento</em> — e se entender melhor <em className="text-ember">dentro dele.</em></>,
  <>Se vocês querem se amar com <em className="text-ember">mais presença,</em> esse app é <em className="text-ember">para vocês.</em></>,
];

export function ManifestoSection() {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.p
          className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          O que é o Tatarugas
        </motion.p>

        <div className="space-y-8">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="font-display text-[clamp(1.15rem,2.5vw,1.4rem)] leading-[1.6] text-text-secondary"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
