import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | Tatarugas",
  description:
    "Como o Tatarugas trata dados, privacidade, imagens, mensagens e exclusão de conta.",
};

const sections = [
  {
    title: "O que coletamos",
    paragraphs: [
      "Dados que você escreve ou adiciona no app: respostas, diário, carinhos, cápsulas, humor, conversa, imagens, memórias, planos e movimentos dos minijogos.",
      "Dados básicos do perfil: nome, email, foto opcional, dados opcionais de nascimento e informações necessárias para manter sua conta e seu relacionamento no app.",
    ],
  },
  {
    title: "Privado e compartilhado",
    paragraphs: [
      "Conteúdos privados, como seu diário e algumas reflexões individuais, ficam visíveis só para você.",
      "Conteúdos compartilhados, como carinhos enviados, planos, cápsulas abertas, conversa, imagens e jogos cooperativos, ficam disponíveis para o casal.",
    ],
  },
  {
    title: "IA e operadores técnicos",
    paragraphs: [
      "Algumas funções da Tuca usam provedores de IA apenas quando necessário para gerar reflexões, sugestões ou devolutivas. Não vendemos dados e não usamos conteúdo íntimo para anúncios.",
      "Usamos provedores técnicos como Supabase, Expo, Apple, Google, PostHog, Sentry, Anthropic e OpenAI para autenticação, banco, storage, notificações, estabilidade, telemetria opcional e recursos de IA.",
    ],
  },
  {
    title: "Exclusão e suporte",
    paragraphs: [
      "Você pode excluir sua conta em Perfil > Conta > Excluir conta. Em alguns conteúdos compartilhados, o que já foi entregue ao par pode continuar visível para ele.",
      "Dúvidas ou pedidos especiais podem ser enviados para contato@tatarugas.com.br.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen px-6 py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <a
            href="/"
            className="text-sm text-text-dim hover:text-text-secondary transition-colors"
          >
            Tatarugas
          </a>

          <header className="mt-10 mb-12">
            <p className="font-mono text-[11px] text-text-dim tracking-[0.2em] uppercase mb-4">
              Privacidade
            </p>
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-text-primary">
              Política de <em className="text-ember">Privacidade.</em>
            </h1>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              O que a gente guarda, como usa e como você pede para apagar.
              Versão 1.5, vigente desde 28 de maio de 2026.
            </p>
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl text-text-primary mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
