import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RitualProvider } from "@/context/RitualContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RitualDrawer from "@/components/RitualDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RUSSO Equipe Parrucchieri | Atelier di Acconciatura & Colorimetria a Torino",
  description:
    "Atelier d'alta coiffure, balayage sartoriale, taglio architettonico e trattamenti tricologici molecolari a Torino (Corso Cincinnato 256). Direzione Artistica Patrizia Russo.",
  keywords: [
    "parrucchiere torino",
    "balayage torino",
    "russo equipe parrucchieri",
    "taglio architettonico torino",
    "atelier capelli torino cincinnato",
    "patrizia russo parrucchieri",
  ],
  authors: [{ name: "Patrizia Russo" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F4F0] text-[#141312] selection:bg-[#8C5A3C] selection:text-[#F6F4F0]">
        <RitualProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <RitualDrawer />
        </RitualProvider>
      </body>
    </html>
  );
}
