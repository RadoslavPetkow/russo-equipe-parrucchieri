import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EDITORIAL_PHOTOS } from "@/lib/salon-data";

export default function HeroSection() {
  return (
    <section className="border-b border-[#DED9D0] bg-[#F6F4F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-8.5rem)]">
          {/* Left Column (7 cols): Editorial Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#DED9D0]">
            <div>
              {/* Index & Geolocation Tag */}
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-8">
                <span className="w-2.5 h-2.5 bg-[#8C5A3C] shrink-0" />
                <span className="font-semibold">ATELIER TORINO</span>
                <span className="text-[#DED9D0]">—</span>
                <span className="text-[#5C5852]">CORSO CINCINNATO 256</span>
              </div>

              {/* Monumental Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-[#141312] leading-[1.08] mb-8">
                L&apos;architettura del capello, scolpita sulla{" "}
                <span className="italic font-normal text-[#8C5A3C]">tua identità.</span>
              </h1>

              {/* Manifesto */}
              <p className="font-sans text-base sm:text-lg text-[#5C5852] max-w-xl leading-relaxed mb-10">
                A Torino, un atelier dove la precisione geometrica del taglio incontra la maestria della colorimetria sartoriale a mano libera. Non seguiamo formule seriali: ogni sfumatura e ogni perimetro sono progettati in armonia con la struttura ossea del tuo viso.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/prenota"
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#8C5A3C] transition-colors text-center border border-[#141312]"
                >
                  Prenota il Tuo Rituale
                </Link>
                <Link
                  href="/listino"
                  className="bg-transparent text-[#141312] px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#EFECE6] transition-colors text-center border border-[#DED9D0]"
                >
                  Esplora il Listino Interattivo →
                </Link>
              </div>
            </div>

            {/* Bottom 3-Metric Strip */}
            <div className="pt-12 mt-12 border-t border-[#DED9D0]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
                <div className="border-l-2 border-[#8C5A3C] pl-3">
                  <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider">
                    01 // GUIDA ARTISTICA
                  </span>
                  <span className="font-medium text-[#141312] mt-0.5 block">
                    PATRIZIA RUSSO
                  </span>
                  <span className="text-[11px] text-[#5C5852]">25+ Anni d&apos;Eccellenza</span>
                </div>

                <div className="border-l-2 border-[#DED9D0] pl-3">
                  <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider">
                    02 // COLORIMETRIA
                  </span>
                  <span className="font-medium text-[#141312] mt-0.5 block">
                    SARTORIALE A MANO
                  </span>
                  <span className="text-[11px] text-[#5C5852]">Senza Stacchi di Ricrescita</span>
                </div>

                <div className="border-l-2 border-[#DED9D0] pl-3">
                  <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider">
                    03 // FORMULAZIONI
                  </span>
                  <span className="font-medium text-[#141312] mt-0.5 block">
                    BIO & CHERATINA
                  </span>
                  <span className="text-[11px] text-[#5C5852]">Salute della Fibra al 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Framed Editorial Portrait with Technical Caption */}
          <div className="lg:col-span-5 relative bg-[#EFECE6] flex flex-col justify-end overflow-hidden group min-h-[500px] lg:min-h-auto">
            <div className="absolute inset-0">
              <Image
                src={EDITORIAL_PHOTOS.hero}
                alt="RUSSO Equipe Parrucchieri — Atelier Torino, balayage e taglio sartoriale"
                fill
                priority
                className="object-cover object-center filter sepia-[0.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-transparent to-black/10" />
            </div>

            {/* Technical Caption Overlay */}
            <div className="relative z-10 p-6 sm:p-8 m-4 sm:m-6 bg-[#141312]/90 backdrop-blur-xs border border-[#2A2826] text-[#F6F4F0]">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#8C5A3C] tracking-widest uppercase mb-1">
                <span>LOOK 04 — ARCHIVIO ATELIER</span>
                <span>TORINO 2026</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F6F4F0] leading-snug">
                Balayage Sartoriale &amp; Taglio Architettonico
              </h3>
              <p className="font-sans text-xs text-[#DED9D0]/70 mt-1 leading-relaxed">
                Tonalizzazione sabbia dorata con sfumatura radice e scalatura invisibile su perimetro medio.
              </p>
              <div className="mt-3 pt-3 border-t border-[#2A2826] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#DED9D0]/80">DURATA: 165 MIN</span>
                <span className="text-[#8C5A3C] font-semibold">COD: CB-01 + TS-01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
