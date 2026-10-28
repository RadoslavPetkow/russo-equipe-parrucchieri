"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_PHOTOS } from "@/lib/salon-data";

interface LookItem {
  id: string;
  code: string;
  title: string;
  category: "balayage" | "taglio" | "eventi";
  categoryLabel: string;
  stylist: string;
  formulation: string;
  hairBase: string;
  image: string;
  aspect: string;
}

const LOOKS: LookItem[] = [
  {
    id: "look-01",
    code: "LOOK 01",
    title: "Balayage Miele Dorato & Onde Naturali",
    category: "balayage",
    categoryLabel: "Balayage & Schiariture",
    stylist: "Patrizia Russo",
    formulation: "Schiaritura a mano libera tono su tono + Gloss pH acido 9.13",
    hairBase: "Castano chiaro naturale, tessitura medio-spessa",
    image: EDITORIAL_PHOTOS.balayage,
    aspect: "aspect-3/4",
  },
  {
    id: "look-02",
    code: "LOOK 02",
    title: "Bob Geometrico & Rifinitura a Secco",
    category: "taglio",
    categoryLabel: "Taglio Architettonico",
    stylist: "Elena V.",
    formulation: "Taglio perimetrale dritto con scalatura interna invisibile",
    hairBase: "Liscio medio, densità elevata",
    image: EDITORIAL_PHOTOS.architecturalCut,
    aspect: "aspect-4/5",
  },
  {
    id: "look-03",
    code: "LOOK 03",
    title: "Rigenerazione Botanica & Texturizzazione",
    category: "balayage",
    categoryLabel: "Rituale & Cura",
    stylist: "Marco D.",
    formulation: "Impacco nutriente con oli essenziali + piega a spazzola naturale",
    hairBase: "Capelli decolorati sensibilizzati dal calore",
    image: EDITORIAL_PHOTOS.botanicalRitual,
    aspect: "aspect-3/4",
  },
  {
    id: "look-04",
    code: "LOOK 04",
    title: "Chignon Scultoreo Decostruito",
    category: "eventi",
    categoryLabel: "Spose & Haute Coiffure",
    stylist: "Patrizia Russo",
    formulation: "Punti di ancoraggio invisibili, finitura satinata anticrespo",
    hairBase: "Lungo scalato, volume morbido",
    image: EDITORIAL_PHOTOS.stylingFinish,
    aspect: "aspect-4/5",
  },
  {
    id: "look-05",
    code: "LOOK 05",
    title: "Atelier Mood & Spazio di Creazione",
    category: "balayage",
    categoryLabel: "Atelier Torino",
    stylist: "Equipe Russo",
    formulation: "Corso Lucio Quinzio Cincinnato 256, Torino",
    hairBase: "Atelier di acconciatura & colorimetria sartoriale",
    image: EDITORIAL_PHOTOS.hero,
    aspect: "aspect-16/9",
  },
];

export default function LookbookPage() {
  const [filter, setFilter] = useState<string>("all");

  const displayedLooks =
    filter === "all" ? LOOKS : LOOKS.filter((l) => l.category === filter);

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DED9D0]">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-2">
              ARCHIVIO VISIVO • COLLEZIONE PERMANENTE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#141312] tracking-tight">
              Archivio Look &amp; Texture
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-4 max-w-xl leading-relaxed">
              Una selezione curata di forme, geometrie e sfumature realizzate nel nostro atelier di Torino. Ciascun look risponde all&apos;unicità fisionomica della cliente.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`font-mono text-xs uppercase px-4 py-2 border transition-colors ${
                filter === "all"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
              }`}
            >
              Tutti i Look ({LOOKS.length})
            </button>
            <button
              onClick={() => setFilter("balayage")}
              className={`font-mono text-xs uppercase px-4 py-2 border transition-colors ${
                filter === "balayage"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
              }`}
            >
              Balayage
            </button>
            <button
              onClick={() => setFilter("taglio")}
              className={`font-mono text-xs uppercase px-4 py-2 border transition-colors ${
                filter === "taglio"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
              }`}
            >
              Tagli Geometrici
            </button>
            <button
              onClick={() => setFilter("eventi")}
              className={`font-mono text-xs uppercase px-4 py-2 border transition-colors ${
                filter === "eventi"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
              }`}
            >
              Eventi &amp; Spose
            </button>
          </div>
        </div>

        {/* Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {displayedLooks.map((look) => (
            <div
              key={look.id}
              className="border border-[#DED9D0] bg-[#EFECE6] flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 w-full bg-[#141312] overflow-hidden border-b border-[#DED9D0]">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  className="object-cover object-center filter sepia-[0.08] contrast-[1.04] group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-[#141312]/90 text-[#F6F4F0] px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-[#2A2826]">
                  {look.code}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block mb-1">
                    {look.categoryLabel} • STYLIST: {look.stylist.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#141312]">
                    {look.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs font-sans pt-2 border-t border-[#DED9D0]">
                  <p className="text-[#141312]">
                    <strong className="font-mono text-[10px] uppercase text-[#5C5852] block">
                      FORMULAZIONE / PROTOCOLLO:
                    </strong>
                    {look.formulation}
                  </p>
                  <p className="text-[#5C5852]">
                    <strong className="font-mono text-[10px] uppercase text-[#5C5852] block">
                      BASE DI PARTENZA:
                    </strong>
                    {look.hairBase}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DED9D0] flex items-center justify-between">
                  <Link
                    href={`/prenota?note=${encodeURIComponent(`Ispirato a ${look.code}: ${look.title}`)}`}
                    className="bg-[#141312] text-[#F6F4F0] px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors"
                  >
                    Richiedi questo Look →
                  </Link>
                  <Link
                    href="/listino"
                    className="font-mono text-xs text-[#5C5852] hover:text-[#141312] underline underline-offset-4"
                  >
                    Vedi Prezzo Listino
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
