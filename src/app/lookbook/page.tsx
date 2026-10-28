"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_PHOTOS, SERVICES, Service } from "@/lib/salon-data";
import { useRitual } from "@/context/RitualContext";

interface LookItem {
  id: string;
  code: string;
  title: string;
  category: "balayage" | "taglio" | "trattamenti" | "spose";
  categoryLabel: string;
  stylistId: string;
  stylistName: string;
  formulation: string;
  hairBase: string;
  toneTarget: string;
  maintenanceWeeks: string;
  serviceIds: string[];
  image: string;
}

const LOOKS_DATA: LookItem[] = [
  {
    id: "look-01",
    code: "LOOK 01",
    title: "Balayage Miele Dorato & Onde Naturali",
    category: "balayage",
    categoryLabel: "Balayage & Schiariture",
    stylistId: "patrizia-russo",
    stylistName: "Patrizia Russo",
    formulation: "Schiaritura a mano libera con gradazione continua + Gloss tonalizzante pH acido 9.13 sabbia dorato.",
    hairBase: "Base naturale 6 (Castano Chiaro), tessitura medio-spessa, riflesso caldo naturale.",
    toneTarget: "Altezza 9 / 10 con micro-contrasti profondi alla radice.",
    maintenanceWeeks: "12–14 settimane (basso mantenimento)",
    serviceIds: ["balayage-sartoriale", "bagno-luce-gloss", "piega-editoriale-texturizzazione"],
    image: EDITORIAL_PHOTOS.balayage,
  },
  {
    id: "look-02",
    code: "LOOK 02",
    title: "Bob Geometrico & Rifinitura a Secco",
    category: "taglio",
    categoryLabel: "Taglio Architettonico",
    stylistId: "elena-v",
    stylistName: "Elena V.",
    formulation: "Taglio perimetrale dritto a forbice giapponese con scalatura interna invisibile e sbozzatura a secco.",
    hairBase: "Liscio naturale, densità elevata, lunghezza iniziale sotto la clavicola.",
    toneTarget: "Forma autosufficiente: si modella con solo getto d'aria e spazzola.",
    maintenanceWeeks: "7–9 settimane per preservare la geometria del collo",
    serviceIds: ["taglio-architettonico-donna", "piega-editoriale-texturizzazione"],
    image: EDITORIAL_PHOTOS.architecturalCut,
  },
  {
    id: "look-03",
    code: "LOOK 03",
    title: "Rigenerazione Botanica & Texturizzazione",
    category: "trattamenti",
    categoryLabel: "Rituale & Cura",
    stylistId: "marco-d",
    stylistName: "Marco D.",
    formulation: "Gommage detox all'argilla alpina + ricostruzione molecolare dei ponti di cheratina a calore infrarosso moderato.",
    hairBase: "Fusto decolorato chimicamente, punte assottigliate e aride esposte a umidità urbana.",
    toneTarget: "Chiusura cuticolare completa, elasticità ripristinata al 94%.",
    maintenanceWeeks: "Ciclo intensivo mensile o ad ogni cambio di stagione",
    serviceIds: ["trattamento-detox-ossigenazione", "rituale-ricostruzione-molecolare", "piega-editoriale-texturizzazione"],
    image: EDITORIAL_PHOTOS.botanicalRitual,
  },
  {
    id: "look-04",
    code: "LOOK 04",
    title: "Chignon Scultoreo Decostruito",
    category: "spose",
    categoryLabel: "Spose & Haute Coiffure",
    stylistId: "patrizia-russo",
    stylistName: "Patrizia Russo",
    formulation: "Intreccio architettonico asimmetrico con spille brunite invisibili e vaporizzazione termoattiva anticrespo.",
    hairBase: "Capello medio-lungo scalato, volume morbido naturale senza cotonature pesanti.",
    toneTarget: "Tenuta a memoria di forma certificata per 14 ore di cerimonia e foto.",
    maintenanceWeeks: "Sessione singola su appuntamento per evento o gala",
    serviceIds: ["acconciatura-eventi-chignon", "bagno-luce-gloss"],
    image: EDITORIAL_PHOTOS.stylingFinish,
  },
  {
    id: "look-05",
    code: "LOOK 05",
    title: "Degradé Soleil & Contouring Viso",
    category: "balayage",
    categoryLabel: "Balayage & Schiariture",
    stylistId: "marco-d",
    stylistName: "Marco D.",
    formulation: "Sezioni diagonali a tre sfumature cromatiche sovrapposte studiate per illuminare zigomi e contorno mandibolare.",
    hairBase: "Base castano scuro 4/5 con riflessature ramate preesistenti da neutralizzare.",
    toneTarget: "Contrasto armonico beige dorato senza stacco netto alla ricrescita.",
    maintenanceWeeks: "10–12 settimane",
    serviceIds: ["degrade-soleil", "bagno-luce-gloss", "piega-editoriale-texturizzazione"],
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "look-06",
    code: "LOOK 06",
    title: "Taglio Trasformazione & Styling Avanzato",
    category: "taglio",
    categoryLabel: "Taglio Architettonico",
    stylistId: "elena-v",
    stylistName: "Elena V.",
    formulation: "Passaggio da capello lungo uniforme a clavicut texturizzato con frangia a tendina su misura.",
    hairBase: "Ondulato naturale, forma del viso ovale allungata con fronte ampia.",
    toneTarget: "Ribilanciamento proporzioni fisionomiche con alleggerimento della massa.",
    maintenanceWeeks: "8–10 settimane",
    serviceIds: ["taglio-trasformazione-styling", "piega-editoriale-texturizzazione"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function LookbookPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedLook, setSelectedLook] = useState<LookItem | null>(null);
  const { replaceServices, openDrawer } = useRitual();

  const filteredLooks =
    activeFilter === "all"
      ? LOOKS_DATA
      : LOOKS_DATA.filter((item) => item.category === activeFilter);

  const filterTabs = [
    { id: "all", label: "Tutti i Look", count: LOOKS_DATA.length },
    { id: "balayage", label: "Balayage & Luce", count: LOOKS_DATA.filter((l) => l.category === "balayage").length },
    { id: "taglio", label: "Tagli Geometrici", count: LOOKS_DATA.filter((l) => l.category === "taglio").length },
    { id: "trattamenti", label: "Cura & Rigenerazione", count: LOOKS_DATA.filter((l) => l.category === "trattamenti").length },
    { id: "spose", label: "Spose & Haute Coiffure", count: LOOKS_DATA.filter((l) => l.category === "spose").length },
  ];

  // Resolve services for a look
  const getLookServices = (serviceIds: string[]): Service[] => {
    return serviceIds
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter((s): s is Service => Boolean(s));
  };

  const handleApplyFormula = (look: LookItem) => {
    const services = getLookServices(look.serviceIds);
    replaceServices(services);
    openDrawer();
  };

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DED9D0]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-3 font-semibold">
              <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
              <span>COLLEZIONE PERMANENTE • ARCHIVIO ATELIER TORINO</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#141312] tracking-tight">
              Archivio Look &amp; Texture
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-3 max-w-xl leading-relaxed">
              Ogni creazione è un documento di ricerca su fisionomia, colorimetria a mano libera e salute della fibra. Esplora le schede tecniche o applica direttamente la formula del look al tuo rituale.
            </p>
          </div>

          <Link
            href="/consulenza"
            className="font-mono text-xs text-[#141312] hover:text-[#8C5A3C] tracking-widest uppercase inline-flex items-center gap-2 group self-start md:self-end border-b border-[#141312] pb-1 hover:border-[#8C5A3C] transition-colors"
          >
            <span>Non sai quale look scegliere? Fai la diagnosi</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 pt-8 pb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-mono text-xs uppercase px-4 py-2.5 transition-colors border ${
                  isActive
                    ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                    : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312] hover:border-[#141312]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="opacity-60 ml-1.5 font-normal">({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Looks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLooks.map((look) => {
            const services = getLookServices(look.serviceIds);
            const totalPrice = services.reduce((acc, s) => acc + s.price, 0);
            const totalDuration = services.reduce((acc, s) => acc + s.durationMinutes, 0);

            return (
              <div
                key={look.id}
                className="border border-[#DED9D0] bg-[#EFECE6] flex flex-col justify-between group transition-all"
              >
                {/* Photo Frame */}
                <div
                  className="relative aspect-4/5 w-full bg-[#141312] overflow-hidden border-b border-[#DED9D0] cursor-pointer"
                  onClick={() => setSelectedLook(look)}
                >
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    className="object-cover object-center filter sepia-[0.08] contrast-[1.04] group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#141312]/90 text-[#F6F4F0] px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-[#2A2826]">
                    {look.code}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#F6F4F0]/90 backdrop-blur-xs text-[#141312] px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border border-[#DED9D0]">
                    🔍 Scheda Tecnica
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#8C5A3C] mb-1 font-semibold">
                      <span>{look.categoryLabel}</span>
                      <span>{look.stylistName}</span>
                    </div>

                    <h3
                      className="font-serif text-2xl font-normal text-[#141312] cursor-pointer hover:text-[#8C5A3C] transition-colors leading-snug"
                      onClick={() => setSelectedLook(look)}
                    >
                      {look.title}
                    </h3>

                    <p className="font-sans text-xs text-[#5C5852] mt-2 line-clamp-2 leading-relaxed">
                      {look.formulation}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#DED9D0] space-y-1.5 font-sans text-xs">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-[#5C5852] uppercase">INVESTIMENTO:</span>
                        <span className="font-semibold text-[#141312] tabular-nums">€{totalPrice}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-[#5C5852] uppercase">TEMPO TECNICO:</span>
                        <span className="text-[#141312] tabular-nums">~{totalDuration} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#DED9D0] space-y-2">
                    <button
                      type="button"
                      onClick={() => handleApplyFormula(look)}
                      className="w-full bg-[#141312] text-[#F6F4F0] py-3 px-4 font-mono text-[11px] uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                    >
                      + Carica Formula nel Rituale
                    </button>
                    <Link
                      href={`/prenota?stylist=${look.stylistId}&note=${encodeURIComponent(`Ispirato a ${look.code}: ${look.title}`)}`}
                      className="w-full block text-center bg-transparent text-[#141312] py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider hover:bg-[#F6F4F0] transition-colors border border-[#DED9D0]"
                    >
                      Prenota con {look.stylistName.split(" ")[0]} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE DETAIL MODAL */}
        {selectedLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-[#141312]/75 backdrop-blur-xs transition-opacity"
              onClick={() => setSelectedLook(null)}
            />

            <div
              className="relative z-10 w-full max-w-3xl bg-[#F6F4F0] border border-[#DED9D0] shadow-2xl max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="border-b border-[#DED9D0] px-6 py-4 bg-[#EFECE6] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#8C5A3C] font-semibold">
                    DOSSIER TECNICO LOOK // {selectedLook.code}
                  </span>
                  <h3 className="font-serif text-2xl text-[#141312] mt-0.5">
                    {selectedLook.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLook(null)}
                  className="w-9 h-9 border border-[#DED9D0] bg-[#F6F4F0] hover:bg-[#141312] hover:text-[#F6F4F0] flex items-center justify-center font-mono text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 relative aspect-4/5 w-full bg-[#141312] border border-[#DED9D0]">
                    <Image
                      src={selectedLook.image}
                      alt={selectedLook.title}
                      fill
                      className="object-cover object-center filter sepia-[0.08] contrast-[1.04]"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="border-b border-[#DED9D0] pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852] block">
                        DIREZIONE ESECUTIVA
                      </span>
                      <strong className="font-serif text-xl text-[#141312]">
                        {selectedLook.stylistName}
                      </strong>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      <div>
                        <strong className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] block mb-1">
                          FORMULAZIONE &amp; PROTOCOLLO:
                        </strong>
                        <p className="text-[#141312] leading-relaxed">
                          {selectedLook.formulation}
                        </p>
                      </div>

                      <div>
                        <strong className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] block mb-1">
                          BASE DI PARTENZA:
                        </strong>
                        <p className="text-[#5C5852] leading-relaxed">
                          {selectedLook.hairBase}
                        </p>
                      </div>

                      <div>
                        <strong className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] block mb-1">
                          OBIETTIVO CROMATICO:
                        </strong>
                        <p className="text-[#5C5852] leading-relaxed">
                          {selectedLook.toneTarget}
                        </p>
                      </div>

                      <div>
                        <strong className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] block mb-1">
                          CADENZA MANTENIMENTO:
                        </strong>
                        <p className="text-[#5C5852] leading-relaxed">
                          {selectedLook.maintenanceWeeks}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Ledger */}
                <div className="border border-[#DED9D0] bg-[#EFECE6] p-5 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                    SERVIZI ATELIER RICHIESTI PER REPLICARE QUESTO LOOK:
                  </span>
                  <div className="divide-y divide-[#DED9D0]">
                    {getLookServices(selectedLook.serviceIds).map((s) => (
                      <div key={s.id} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-semibold text-[#8C5A3C] bg-[#F6F4F0] px-1.5 py-0.5 border border-[#DED9D0]">
                            {s.code}
                          </span>
                          <span className="font-serif text-base text-[#141312]">{s.name}</span>
                        </div>
                        <div className="font-mono text-right">
                          <span className="font-semibold text-[#141312]">€{s.price}</span>
                          <span className="text-[#5C5852] ml-2">({s.durationMinutes}m)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleApplyFormula(selectedLook);
                      setSelectedLook(null);
                    }}
                    className="flex-1 bg-[#141312] text-[#F6F4F0] py-3.5 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors"
                  >
                    Applica al Rituale &amp; Apri Vassoio →
                  </button>
                  <Link
                    href={`/prenota?stylist=${selectedLook.stylistId}&note=${encodeURIComponent(`Ispirato a ${selectedLook.code}: ${selectedLook.title}`)}`}
                    onClick={() => setSelectedLook(null)}
                    className="flex-1 bg-[#8C5A3C] text-[#F6F4F0] py-3.5 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#a66d4a] transition-colors text-center font-semibold"
                  >
                    Prenota Questo Look Subito
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
