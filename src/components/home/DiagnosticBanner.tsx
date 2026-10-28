import React from "react";
import Link from "next/link";

export default function DiagnosticBanner() {
  return (
    <section className="bg-[#141312] text-[#F6F4F0] border-b border-[#2A2826] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border border-[#2A2826] bg-[#1a1918]/70 p-8 sm:p-14 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 8 cols: Editorial Pitch */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C]">
                <span className="w-2 h-2 bg-[#8C5A3C]" />
                <span>CONSULENZA PREVENTIVA GUIDATA</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F6F4F0] tracking-tight leading-tight">
                Indecisa tra Balayage, Tonalizzante o Ricostruzione?
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#DED9D0]/70 max-w-2xl leading-relaxed">
                In soli 2 minuti, il nostro test interattivo analizza la porosità del tuo capello, la presenza di trattamenti chimici pregressi e l&apos;armocromia del tuo incarnato, suggerendoti il rituale Russo più idoneo prima ancora di sederti in salone.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#2A2826] font-mono text-[11px] text-[#DED9D0]/80">
                <div>
                  <span className="text-[#8C5A3C] block font-semibold">01. STATO CUTE</span>
                  <span>Sensibilità &amp; Sebo</span>
                </div>
                <div>
                  <span className="text-[#8C5A3C] block font-semibold">02. POROSITÀ</span>
                  <span>Idratazione &amp; Danni</span>
                </div>
                <div>
                  <span className="text-[#8C5A3C] block font-semibold">03. OBIETTIVO</span>
                  <span>Luce vs Taglio</span>
                </div>
                <div>
                  <span className="text-[#8C5A3C] block font-semibold">04. FORMULA</span>
                  <span>Protocollo Custom</span>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Action Card */}
            <div className="lg:col-span-4 lg:border-l lg:border-[#2A2826] lg:pl-8 flex flex-col justify-center space-y-4">
              <div className="p-6 bg-[#141312] border border-[#2A2826] space-y-3">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#8C5A3C] block">
                  TEMPO: 2 MINUTI • 100% GRATUITO
                </span>
                <p className="font-serif text-lg text-[#F6F4F0] leading-snug">
                  Ricevi subito il tuo report tecnico con i servizi consigliati.
                </p>
                <Link
                  href="/consulenza"
                  className="w-full block text-center bg-[#8C5A3C] text-[#F6F4F0] py-3.5 px-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#a66d4a] transition-colors"
                >
                  Inizia la Diagnosi Capelli →
                </Link>
              </div>

              <div className="text-center">
                <Link
                  href="/prenota"
                  className="font-mono text-[11px] text-[#DED9D0]/60 hover:text-[#F6F4F0] underline underline-offset-4 tracking-wider uppercase transition-colors"
                >
                  Sai già cosa desideri? Prenota subito ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
