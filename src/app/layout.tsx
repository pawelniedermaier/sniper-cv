import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Paweł Niedermaier - Ekspert Wibroakustyki, Innowacji oraz AI",
  description: "CV Pawła Niedermaiera - eksperta w dziedzinie wibroakustyki, innowacji i sztucznej inteligencji",
  keywords: "wibroakustyka, NVH, inżynieria, AI, innowacje, Paweł Niedermaier",
  authors: [{ name: "Paweł Niedermaier" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
