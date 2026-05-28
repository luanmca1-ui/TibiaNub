import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tibia Nub",
  description:
    "Guia para iniciantes no Tibia com vocações, equipamentos, hunts, runas e dicas simples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
