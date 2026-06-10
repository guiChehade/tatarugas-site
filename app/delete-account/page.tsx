import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Excluir conta | Tatarugas",
  description:
    "Como excluir sua conta Tatarugas pelo aplicativo ou pedir exclusao por email.",
};

const deletedItems = [
  "Sua identidade na plataforma, como nome, foto, email e preferencias.",
  "Suas respostas pessoais, diario, humor, reflexoes e memorias.",
  "Carinhos, mensagens, imagens e historico compartilhado do casal.",
  "O perfil ativo da Tuca sobre voce e o vinculo com o seu par.",
];

export default function DeleteAccountPage() {
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
              Excluir conta
            </p>
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-text-primary">
              Apagar <em className="text-ember">tudo.</em>
            </h1>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              A exclusao e definitiva. Ela remove sua conta, seus dados e encerra
              o vinculo com o seu par no Tatarugas.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="font-display text-2xl text-text-primary mb-4">
                Pelo aplicativo
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  O caminho mais rapido fica dentro do app:{" "}
                  <strong className="text-text-primary">
                    Perfil &gt; Conta &gt; Excluir conta
                  </strong>
                  .
                </p>
                <p>
                  A confirmacao acontece em duas etapas para evitar toque
                  acidental. Depois de confirmar, a exclusao comeca
                  imediatamente.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-text-primary mb-4">
                Por email
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Se voce nao tem mais acesso ao app, mande um email para{" "}
                  <a
                    href="mailto:contato@tatarugas.com.br?subject=Excluir%20conta"
                    className="text-ember hover:text-[#F2B07B] transition-colors"
                  >
                    contato@tatarugas.com.br
                  </a>{" "}
                  com o assunto <strong className="text-text-primary">Excluir conta</strong>{" "}
                  e o email usado para entrar.
                </p>
                <p>
                  A gente confirma a identidade pelo email cadastrado e processa
                  a exclusao em ate 30 dias, geralmente em ate 48 horas uteis.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-text-primary mb-4">
                O que e apagado
              </h2>
              <ul className="space-y-3 text-text-secondary leading-relaxed">
                {deletedItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-ember" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-text-primary mb-4">
                O que pode ser mantido
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Podemos manter registros minimos exigidos por lei, registros de
                  pagamento quando houver assinatura, logs de seguranca contra
                  fraude ou abuso e backups criptografados ate a rotacao final.
                </p>
                <p>
                  Esses dados sao mantidos pelo tempo necessario para cumprir
                  obrigacoes legais e operacionais, sem uso para publicidade.
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
