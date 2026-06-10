import { Suspense } from "react";
import type { Metadata } from "next";
import { ConviteContent } from "./ConviteContent";

// Pareamento por link: landing do convite enviado pelo app
// (`https://tatarugas.com.br/convite?codigo=X`). Quem tem o app
// instalado nem chega aqui (universal/app links abrem o app direto);
// esta página é o fallback — mostra o código, tenta abrir o app via
// deep link e aponta pras lojas.
//
// `useSearchParams` exige Suspense boundary no export estático, por
// isso o conteúdo vive em `ConviteContent` (client component).

export const metadata: Metadata = {
  title: "Convite — Tatarugas",
  description:
    "Seu par te chamou para um lugar só de vocês dois no Tatarugas. Abra o convite e conecte-se.",
  robots: { index: false },
};

export default function ConvitePage() {
  return (
    <Suspense fallback={null}>
      <ConviteContent />
    </Suspense>
  );
}
