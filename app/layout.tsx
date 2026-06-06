import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tatarugas — Um lugar só de vocês dois",
  description:
    "Um espaço privado para casais conversarem melhor, guardarem memórias e cuidarem da relação no dia a dia.",
  openGraph: {
    title: "Tatarugas — Um lugar só de vocês dois",
    description:
      "Um lugar só de vocês dois, sem feed, sem plateia, com pequenos cuidados para a relação.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tatarugas — Um lugar só de vocês dois",
    description:
      "Um lugar só de vocês dois, sem feed, sem plateia, com pequenos cuidados para a relação.",
  },
  themeColor: "#0F0906",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
