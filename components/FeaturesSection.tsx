"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function TucaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="10" cy="14" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <circle cx="18" cy="14" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

function BridgeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M3 22h22M3 22c4-12 18-12 22 0M8 22v-4M20 22v-4M14 14V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DecideIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4v8M14 24v-4M5 14h8M23 14h-4M8 8l4 4M20 20l-4-4M8 20l4-4M20 8l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

function JourneyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 7h16M8 11h12M9 15h10M10 19h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="21" cy="21" r="2" fill="currentColor" />
    </svg>
  );
}

function MoodIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 14h6l3-9 4 18 3-12 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapsuleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12h20M9 4v4M19 4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="17" r="1.4" fill="currentColor" />
      <circle cx="14" cy="17" r="1.4" fill="currentColor" />
      <circle cx="19" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

function AffectionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 24c-9-5-10-12-6-15s7 0 6 4c-1-4 2-7 6-4s3 10-6 15z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 9v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

interface CardProps {
  icon: React.ReactNode;
  label: string;
  title: React.ReactNode;
  description: string;
  accent?: boolean;
  className?: string;
}

function FeatureCard({ icon, label, title, description, accent, className = "" }: CardProps) {
  return (
    <motion.article
      variants={item}
      className={`relative group rounded-2xl border p-6 overflow-hidden cursor-default transition-all duration-300 ${accent
        ? "bg-ember/5 border-ember/20 hover:border-ember/40 hover:bg-ember/8"
        : "bg-bg-surface border-bg-border hover:border-bg-border/80 hover:bg-[#1e130e]"
        } ${className}`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${accent ? "bg-ember/[0.03]" : ""}`}
        style={{
          background: accent
            ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(216,108,74,0.08), transparent)"
            : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(216,108,74,0.04), transparent)",
        }}
      />

      <div className={`mb-4 ${accent ? "text-ember" : "text-text-dim"}`}>{icon}</div>
      <p className={`font-mono text-[10px] tracking-[0.18em] uppercase mb-2 ${accent ? "text-ember/70" : "text-text-dim"}`}>
        {label}
      </p>
      <h3 className="font-display text-[1.05rem] leading-snug text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.article>
  );
}

export function FeaturesSection() {
  return (
    <section id="cabe" className="py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase mb-5">
            O que cabe aqui dentro
          </p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] text-text-primary mb-4">
            Um conjunto de espaços pra <em className="text-ember">vocês dois.</em>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Não é um app cheio de abas soltas. É um conjunto de espaços para o casal se reconectar, conversar melhor e crescer com mais clareza.
          </p>
        </motion.div>

        {/* Screenshots strip */}
        <motion.div
          className="flex gap-4 mb-16 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {[
            { src: "/media/lockscreen.png", label: "Notificação" },
            { src: "/media/home.png", label: "Início" },
            { src: "/media/intimo.png", label: "Íntimo" },
            { src: "/media/conversa.png", label: "Conversa" },
            { src: "/media/humor.png", label: "Humor" },
          ].map(({ src, label }, i) => (
            <motion.div
              key={label}
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="relative w-[150px] md:w-[185px] rounded-[24px] overflow-hidden border border-bg-border shadow-2xl shadow-black/60">
                <Image
                  src={src}
                  alt={`Tatarugas — tela ${label}`}
                  width={185}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-center text-[11px] text-text-dim mt-2 font-mono tracking-wide">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Featured: A Tuca (spans 2 cols on md) */}
          <motion.article
            variants={item}
            className="md:col-span-2 relative group rounded-2xl border border-ember/25 bg-ember/5 hover:border-ember/40 hover:bg-ember/8 p-8 overflow-hidden transition-all duration-300 cursor-default"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 80% 50%, rgba(216,108,74,0.12), transparent)",
              }}
            />

            {/* Animated logo in background */}
            <div className="absolute right-6 top-6 opacity-10">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="45" cy="60" r="37" stroke="#D86C4A" strokeWidth="0.8" />
                <circle cx="75" cy="60" r="37" stroke="#D86C4A" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="3" fill="#D86C4A" />
              </svg>
            </div>

            <div className="relative">
              <div className="text-ember mb-4">
                <TucaIcon />
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember/70 mb-2">
                A Tuca
              </p>
              <h3 className="font-display text-[clamp(1.2rem,2.5vw,1.7rem)] leading-snug text-text-primary mb-4 max-w-sm">
                Uma inteligência feita para{" "}
                <em className="text-ember">entender o relacionamento.</em>
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
                A Tuca aprende com vocês porque cada casal tem seu próprio ritmo. Ela acompanha o contexto ao longo do tempo para responder de um jeito que faça sentido pra <em className="text-text-primary">vocês dois</em>, não para um casal genérico. Destravar conversa, sugerir caminhos, devolver leitura, ligar pontos.
              </p>
            </div>
          </motion.article>

          {/* Ponte */}
          <FeatureCard
            icon={<BridgeIcon />}
            label="Ponte"
            accent
            title={<>Conversar melhor quando <em className="text-ember">algo travar.</em></>}
            description="Espaço onde vocês chamam a Tuca pra mediar uma conversa difícil. Cada um responde no seu tempo."
          />

          {/* Decidir juntos */}
          <FeatureCard
            icon={<DecideIcon />}
            label="Decidir juntos"
            title={<>Escolher o que assistir <em className="text-ember/80">sem cair na indecisão de sempre.</em></>}
            description="Aparecem opções de filmes e séries para cada um. Você arrasta, sua pessoa arrasta, e o app mostra onde bateu."
          />

          {/* Tuca cutuca */}
          <FeatureCard
            icon={<QuestionIcon />}
            label="Tuca cutuca"
            title={<>Uma pergunta profunda que <em className="text-ember/80">mexe onde você evita olhar.</em></>}
            description="Uma pergunta da Tuca, pra você escrever livremente. No Premium, todo dia."
          />

          {/* Minha jornada */}
          <FeatureCard
            icon={<JourneyIcon />}
            label="Minha jornada"
            title={<>Crescimento pessoal com <em className="text-ember/80">mais profundidade.</em></>}
            description="Módulos privados para entender seus padrões, seus gatilhos, sua forma de se vincular e o que se repete em você no amor."
          />

          {/* Marcar como estão */}
          <FeatureCard
            icon={<MoodIcon />}
            label="Marcar como estão"
            title={<>Pequenos check-ins de humor que viram <em className="text-ember/80">leitura íntima do casal.</em></>}
            description="Sem nota, sem ranking. Só um registro simples de como o dia bateu em cada um."
          />

          {/* Memórias */}
          <FeatureCard
            icon={<CapsuleIcon />}
            label="Memórias e cápsulas"
            title={<>Guardar o que importa hoje — e <em className="text-ember/80">reencontrar no futuro.</em></>}
            description="Registram momentos, marcos salvos e cápsulas do tempo para abrir mais tarde."
          />

          {/* Carinho */}
          <FeatureCard
            icon={<AffectionIcon />}
            label="Carinho sem motivo"
            title={<>Gestos pequenos para lembrar o outro <em className="text-ember/80">que ele existe em você.</em></>}
            description="Um carinho enviado no meio do dia, sem ocasião especial, só para aproximar."
          />
        </motion.div>
      </div>
    </section>
  );
}
