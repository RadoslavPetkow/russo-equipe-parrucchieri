import React from "react";
import Link from "next/link";
import { SALON_INFO } from "@/lib/salon-data";

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-[#F6F4F0] border-t border-[#2A2826] mt-auto">
      {/* Top Banner Grid */}
      <div className="border-b border-[#2A2826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Atelier Identity */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C5A3C] block font-semibold mb-2">
                  ATELIER DI BELLEZZA SARTORIALE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#F6F4F0] leading-none">
                  RUSSO
                </h3>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C5A3C] block mt-1.5 font-medium">
                  EQUIPE PARRUCCHIERI • TORINO
                </span>
              </div>

              <p className="font-serif italic text-base text-[#DED9D0]/70 max-w-md leading-relaxed">
                Dal cuore di Torino Lucento, una filosofia d&apos;acconciatura fondata sulla precisione geometrica del taglio e sulla colorimetria a mano libera. Nessun compromesso sulla salute del capello.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <a
                  href={SALON_INFO.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#2A2826] bg-[#1a1918] px-4 py-2 text-[#F6F4F0] hover:border-[#8C5A3C] hover:text-[#8C5A3C] transition-colors"
                >
                  <span>TEL:</span>
                  <span className="font-semibold">{SALON_INFO.phone}</span>
                </a>
                <a
                  href={SALON_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#2A2826] bg-[#1a1918] px-4 py-2 text-[#F6F4F0] hover:border-[#8C5A3C] hover:text-[#8C5A3C] transition-colors"
                >
                  <span>WHATSAPP ATELIER ↗</span>
                </a>
              </div>
            </div>

            {/* Complete Opening Hours Ledger */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#2A2826] pt-8 lg:pt-0 lg:pl-8">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-4">
                ORARI DI RICEVIMENTO
              </span>

              <div className="border border-[#2A2826] divide-y divide-[#2A2826] font-mono text-xs bg-[#1a1918]/60">
                {SALON_INFO.schedule.map((slot) => (
                  <div
                    key={slot.dayName}
                    className="flex items-center justify-between px-3.5 py-2.5"
                  >
                    <span className="text-[#DED9D0]/80 uppercase">{slot.dayName}</span>
                    <span
                      className={`tabular-nums ${
                        slot.isClosed
                          ? "text-[#5C5852] italic"
                          : "text-[#F6F4F0] font-medium"
                      }`}
                    >
                      {slot.isClosed ? "Chiuso" : `${slot.openTime} – ${slot.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 font-sans text-[11px] text-[#5C5852] leading-relaxed">
                Si riceve preferibilmente su appuntamento per garantire il tempo e l&apos;esclusività necessaria a ciascun rituale.
              </p>
            </div>

            {/* Quick Links & Location */}
            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#2A2826] pt-8 lg:pt-0 lg:pl-8 space-y-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-4">
                  INDICE ARCHITETTONICO
                </span>
                <ul className="space-y-2.5 font-mono text-xs">
                  <li>
                    <Link
                      href="/"
                      className="text-[#DED9D0]/70 hover:text-[#8C5A3C] transition-colors uppercase"
                    >
                      01 // Atelier
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/listino"
                      className="text-[#DED9D0]/70 hover:text-[#8C5A3C] transition-colors uppercase"
                    >
                      02 // Listino & Rituali
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/consulenza"
                      className="text-[#DED9D0]/70 hover:text-[#8C5A3C] transition-colors uppercase"
                    >
                      03 // Diagnosi Capelli
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lookbook"
                      className="text-[#DED9D0]/70 hover:text-[#8C5A3C] transition-colors uppercase"
                    >
                      04 // Archivio Look
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contatti"
                      className="text-[#DED9D0]/70 hover:text-[#8C5A3C] transition-colors uppercase"
                    >
                      05 // Contatti & Posizione
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gestione"
                      className="text-[#8C5A3C] hover:text-[#F6F4F0] transition-colors uppercase font-medium"
                    >
                      06 // Area Salone ↗
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-[#2A2826]">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#5C5852] block mb-1">
                  POSIZIONE ATELIER
                </span>
                <p className="font-sans text-xs text-[#DED9D0]/80 leading-relaxed">
                  {SALON_INFO.address}
                </p>
                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-mono text-[11px] text-[#8C5A3C] hover:underline"
                >
                  Indicazioni stradali su Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#5C5852]">
          <div>
            <span>© {new Date().getFullYear()} {SALON_INFO.name}. Tutti i diritti riservati.</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="block sm:inline mt-1 sm:mt-0">{SALON_INFO.subtitle}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="tracking-widest uppercase">C.F. / P.IVA REGISTRATA TORINO</span>
            <Link href="/gestione" className="hover:text-[#DED9D0] transition-colors">
              Accesso Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
