import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_PHOTOS } from "@/lib/salon-data";

export default function MetodoRussoSection() {
  const pillars = [
    {
      index: "01",
      title: "Diagnosi Morfologica & Cromatica",
      subtitle: "Ascolto empatico, analisi della struttura ossea e del fototipo",
      description:
        "Prima di avvicinare le forbici o il pennello, dedichiamo 15 minuti all'osservazione: studiamo i volumi del cranio, la rotazione delle rosette naturali, la carnagione e la routine quotidiana. Un taglio ben riuscito deve saper vivere naturalmente anche senza messa in piega forzata.",
      tags: ["Studio Fisionomico", "Test Porosità Fusto", "Armocromia Capillare"],
    },
    {
      index: "02",
      title: "Geometria a Mano Libera & Micro-Sfumature",
      subtitle: "Precisione chirurgica e gradazioni progressive senza stacchi",
      description:
        "Eseguiamo il taglio combinando la precisione a capello bagnato con la sbozzatura e rifinitura a capello asciutto. Le schiariture sono dipinte a mano libera ciocca per ciocca, modulando l'intensità della luce nei punti di massimo risalto volumetrico per evitare l'effetto ricrescita rigida.",
      tags: ["Balayage a Mano Libera", "Taglio su Capello Asciutto", "pH Acido Protettivo"],
    },
    {
      index: "03",
      title: "Prescrizione Rigenerativa & Cura a Casa",
      subtitle: "Protezione molecolare a lungo termine e longevità del risultato",
      description:
        "Il lavoro dell'Atelier non termina alla cassa. Ogni ospite riceve una guida sartoriale con gli attivi botanici specifici da applicare a casa, la temperatura corretta dell'acqua e gli intervalli consigliati per il mantenimento dei riflessi.",
      tags: ["Protocolli Davines", "Oli Termoattivi Biologici", "Check-up Trimestrale"],
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#DED9D0] bg-[#EFECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-2">
            FILOSOFIA ATELIER • DISCIPLINA TORINESE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight leading-tight">
            Il Metodo Russo: L&apos;Incontro tra Rigore e Naturalezza
          </h2>
          <p className="font-sans text-base text-[#5C5852] mt-4 leading-relaxed">
            Non crediamo alle mode passeggere né alle repliche seriali da catalogo. Il nostro metodo è un protocollo in tre atti progettato per dare vita a una bellezza autentica, raffinata e duratura.
          </p>
        </div>

        {/* 3 Pillars Grid with Asymmetric Editorial Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3 Pillars Ledger (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
            {pillars.map((pillar) => (
              <div key={pillar.index} className="p-8 sm:p-10">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-3xl font-light text-[#8C5A3C]">
                    {pillar.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
                    FASE // {pillar.index}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141312] mb-1">
                  {pillar.title}
                </h3>
                <p className="font-mono text-xs text-[#8C5A3C] uppercase tracking-wider mb-4">
                  {pillar.subtitle}
                </p>

                <p className="font-sans text-sm text-[#5C5852] leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider bg-[#EFECE6] border border-[#DED9D0] px-2.5 py-1 text-[#141312]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Editorial Images & Quote (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Top Frame */}
            <div className="relative border border-[#DED9D0] bg-[#141312] overflow-hidden min-h-[340px] flex-1 group">
              <Image
                src={EDITORIAL_PHOTOS.architecturalCut}
                alt="Studio del taglio architettonico — RUSSO Equipe"
                fill
                className="object-cover object-center filter sepia-[0.08] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#F6F4F0] border-t border-[#2A2826]/40">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C5A3C] block mb-1">
                  PRECISIONE STRUTTURALE
                </span>
                <p className="font-serif text-lg leading-snug">
                  Ogni forbiciata risponde a una linea di forza; nessun capello è lasciato al caso.
                </p>
              </div>
            </div>

            {/* Bottom Statement Card */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-8 space-y-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#8C5A3C] block font-semibold">
                DIREZIONE TECNICA
              </span>
              <blockquote className="font-serif italic text-xl text-[#141312] leading-relaxed">
                &ldquo;Il miglior colore è quello di cui nessuno sospetta l&apos;artificio: cattura la luce di Torino come se fosse nato con te.&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-[#DED9D0] flex items-center justify-between font-mono text-xs">
                <span className="font-medium text-[#141312]">Patrizia Russo</span>
                <Link
                  href="/consulenza"
                  className="text-[#8C5A3C] hover:text-[#141312] underline underline-offset-4"
                >
                  Fai la diagnosi online →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
