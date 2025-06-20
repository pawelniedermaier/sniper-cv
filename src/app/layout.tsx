import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
