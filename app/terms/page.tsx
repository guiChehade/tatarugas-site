import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso | Tatarugas",
  description:
    "Termos de uso do Tatarugas e EULA aplicável a compras e assinaturas pela App Store.",
};

const sections = [
  {
    title: "Sobre o serviço",
    paragraphs: [
      "O Tatarugas é um app para casais, com ferramentas de conversa, memória, carinho, decisões em comum, reflexões individuais, minijogos e apoio da Tuca em algumas experiências.",
      "O app evolui com o tempo. Podemos ajustar telas, textos, recursos e fluxos para melhorar a experiência, respeitando estes Termos e a Política de Privacidade.",
    ],
  },
  {
    title: "Assinaturas",
    paragraphs: [
      "Alguns recursos podem exigir Tatarugas Premium. Quando a assinatura é feita pela App Store, a cobrança, renovação, cancelamento e gestão do plano são feitos pela Apple.",
      "A assinatura renova automaticamente até ser cancelada pelo usuário nas configurações da loja. Uma assinatura libera o Premium para o casal dentro do Tatarugas.",
    ],
  },
  {
    title: "EULA da Apple",
    paragraphs: [
      "Para compras e assinaturas feitas pela App Store, também se aplicam os Termos Padrão de Licença de Aplicativo da Apple.",
    ],
  },
  {
    title: "Uso responsável",
    paragraphs: [
      "O conteúdo entre vocês é íntimo. Não compartilhe screenshots, textos ou imagens do seu par sem consentimento explícito.",
      "O Tatarugas não substitui terapia, atendimento médico, orientação jurídica ou suporte emergencial.",
    ],
  },
  {
    title: "Suporte",
    paragraphs: [
      "Para dúvidas, bugs ou pedidos, fale com a gente em contato@tatarugas.com.br. Resposta em até 48h úteis.",
      "Versão 1.3, vigente desde 15 de maio de 2026.",
    ],
  },
];

export default function TermsPage() {
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
              Termos
            </p>
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-text-primary">
              Termos de <em className="text-ember">Uso.</em>
            </h1>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Como o Tatarugas funciona e quais combinados valem para usar o app.
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
                  {section.title === "EULA da Apple" ? (
                    <p>
                      <a
                        href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                        className="text-ember hover:text-[#F2B07B] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Termos Padrão da Apple
                      </a>
                    </p>
                  ) : null}
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
