"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  SERVICES,
  CURATED_PACKAGES,
  CATEGORY_LABELS,
  ServiceCategory,
  Service,
} from "@/lib/salon-data";
import { useRitual } from "@/context/RitualContext";

type SortOption = "default" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";

const ALL_CATEGORIES: ServiceCategory[] = [
  "taglio-styling",
  "colore-balayage",
  "trattamenti",
  "spose-eventi",
];

export default function ListinoPage() {
  const {
    selectedServices,
    toggleService,
    isServiceSelected,
    addPackage,
    totalPrice,
    totalDurationMinutes,
    openDrawer,
  } = useRitual();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"tutti" | ServiceCategory>("tutti");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [expandedServiceIds, setExpandedServiceIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedServiceIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter and sort services
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category filter
      if (selectedCategory !== "tutti" && service.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesCode = service.code.toLowerCase().includes(q);
        const matchesDesc = service.shortDescription.toLowerCase().includes(q);
        const matchesTech = service.technicalNotes.toLowerCase().includes(q);
        return matchesName || matchesCode || matchesDesc || matchesTech;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "duration-asc") return a.durationMinutes - b.durationMinutes;
      if (sortBy === "duration-desc") return b.durationMinutes - a.durationMinutes;
      return a.code.localeCompare(b.code);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Group filtered services by category
  const groupedServices = useMemo(() => {
    const groups: Partial<Record<ServiceCategory, Service[]>> = {};
    ALL_CATEGORIES.forEach((cat) => {
      groups[cat] = filteredServices.filter((s) => s.category === cat);
    });
    return groups;
  }, [filteredServices]);

  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes} min`;

  return (
    <div className="bg-[#F6F4F0] min-h-screen pb-32">
      {/* 1. EDITORIAL HEADER */}
      <section className="border-b border-[#DED9D0] bg-[#EFECE6] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-4 font-semibold">
              <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
              <span>CATALOGO UFFICIALE TARIFFE • TORINO 2026</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#141312] tracking-tight leading-none">
              Listino Prezzi &amp; Calcolatore Rituali
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-4 leading-relaxed">
              Trasparenza totale su tempi tecnici e investimenti. Esplora i protocolli singoli o seleziona un percorso completo. Clicca su ciascun rituale per svelarne le note tecniche e aggiungerlo al tuo appuntamento.
            </p>
          </div>

          {/* Search & Filter Tooling Strip */}
          <div className="mt-10 pt-8 border-t border-[#DED9D0] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca per nome, codice (es. CB-01) o tecnica..."
                className="w-full bg-[#F6F4F0] border border-[#DED9D0] px-4 py-3 font-sans text-xs text-[#141312] placeholder-[#5C5852]/60 focus:outline-hidden focus:border-[#8C5A3C] rounded-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#5C5852] hover:text-[#141312]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="md:col-span-5 flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedCategory("tutti")}
                className={`font-mono text-[11px] px-3 py-2 uppercase tracking-wider transition-colors border ${
                  selectedCategory === "tutti"
                    ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                    : "bg-[#F6F4F0] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
                }`}
              >
                Tutti ({SERVICES.length})
              </button>
              {ALL_CATEGORIES.map((cat) => {
                const count = SERVICES.filter((s) => s.category === cat).length;
                const info = CATEGORY_LABELS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-[11px] px-3 py-2 uppercase tracking-wider transition-colors border ${
                      selectedCategory === cat
                        ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                        : "bg-[#F6F4F0] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
                    }`}
                  >
                    {info.codePrefix} ({count})
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full bg-[#F6F4F0] border border-[#DED9D0] px-3 py-2.5 font-mono text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
              >
                <option value="default">Ordina: Codice</option>
                <option value="price-asc">Prezzo: Crescente</option>
                <option value="price-desc">Prezzo: Decrescente</option>
                <option value="duration-asc">Durata: Minore</option>
                <option value="duration-desc">Durata: Maggiore</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRESET CURATED PACKAGES ("PERCORSI COMPLETI RUSSO") */}
      <section className="py-14 border-b border-[#DED9D0] bg-[#F6F4F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-1">
                COMBINAZIONI D&apos;AUTORE A TARIFFA PRIVILEGIATA
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#141312]">
                Percorsi Completi Atelier Russo
              </h2>
            </div>
            <span className="font-mono text-xs text-[#5C5852]">
              1-CLICK: AGGIUNGI TUTTI I SERVIZI INSIEME
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 flex flex-col justify-between group hover:border-[#141312] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] font-semibold bg-[#F6F4F0] px-2 py-0.5 border border-[#DED9D0]">
                      {pkg.code}
                    </span>
                    <span className="font-mono text-xs text-[#5C5852] tabular-nums">
                      ⏱ {pkg.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#141312] leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#8C5A3C] uppercase tracking-wider mt-1 font-medium">
                    {pkg.subtitle}
                  </p>

                  <p className="font-sans text-xs text-[#5C5852] mt-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#DED9D0]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5852] block mb-1">
                      IDEALE PER:
                    </span>
                    <p className="font-sans text-xs italic text-[#141312]">
                      {pkg.idealFor}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DED9D0] flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#5C5852] line-through block tabular-nums">
                      €{pkg.totalPriceOriginal}
                    </span>
                    <span className="font-mono text-2xl font-semibold text-[#8C5A3C] tabular-nums">
                      €{pkg.packagePrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addPackage(pkg.id)}
                    className="bg-[#141312] text-[#F6F4F0] px-4 py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                  >
                    + Seleziona Pacchetto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FULL INTERACTIVE LEDGER */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {ALL_CATEGORIES.map((cat, catIdx) => {
            const catServices = groupedServices[cat] || [];
            if (catServices.length === 0) return null;
            const catInfo = CATEGORY_LABELS[cat];

            return (
              <div key={cat} className="space-y-6">
                {/* Architectural Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b-2 border-[#141312]">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold">
                      0{catIdx + 1} — DISCIPLINA ATELIER
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#141312] tracking-tight">
                      {catInfo.title}
                    </h2>
                  </div>
                  <p className="font-sans text-xs text-[#5C5852] max-w-md sm:text-right">
                    {catInfo.subtitle}
                  </p>
                </div>

                {/* Services Ledger Table */}
                <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
                  {catServices.map((service) => {
                    const isSelected = isServiceSelected(service.id);
                    const isExpanded = Boolean(expandedServiceIds[service.id]);

                    return (
                      <div
                        key={service.id}
                        className={`transition-colors ${
                          isSelected ? "bg-[#EFECE6]/80" : "hover:bg-[#EFECE6]/40"
                        }`}
                      >
                        {/* Primary Service Row */}
                        <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => toggleExpand(service.id)}
                          >
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="font-mono text-xs font-semibold text-[#8C5A3C] bg-[#EFECE6] px-2 py-0.5 border border-[#DED9D0]">
                                {service.code}
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#141312]">
                                {service.name}
                              </h3>
                              {service.featured && (
                                <span className="font-mono text-[9px] uppercase tracking-widest bg-[#8C5A3C] text-[#F6F4F0] px-1.5 py-0.5 font-medium">
                                  FIRMA
                                </span>
                              )}
                            </div>

                            <p className="font-sans text-xs sm:text-sm text-[#5C5852] leading-relaxed max-w-3xl">
                              {service.shortDescription}
                            </p>

                            <button
                              type="button"
                              className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] mt-2 inline-flex items-center gap-1 hover:underline"
                            >
                              <span>{isExpanded ? "▲ Nascondi protocollo tecnico" : "▼ Leggi protocollo tecnico & mantenimento"}</span>
                            </button>
                          </div>

                          {/* Price, Duration & Toggle CTA */}
                          <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#DED9D0]">
                            <div className="text-left lg:text-right font-mono">
                              <span className="text-xl sm:text-2xl font-semibold text-[#141312] tabular-nums block">
                                €{service.price}
                              </span>
                              <span className="text-xs text-[#5C5852] tabular-nums">
                                ⏱ {service.durationMinutes} min
                              </span>
                            </div>

                            <button
                              onClick={() => toggleService(service)}
                              className={`px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors border ${
                                isSelected
                                  ? "bg-[#8C5A3C] text-[#F6F4F0] border-[#8C5A3C] hover:bg-[#141312] hover:border-[#141312]"
                                  : "bg-[#141312] text-[#F6F4F0] border-[#141312] hover:bg-[#8C5A3C] hover:border-[#8C5A3C]"
                              }`}
                            >
                              {isSelected ? "✓ Selezionato" : "+ Seleziona"}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Technical Protocol Panel */}
                        {isExpanded && (
                          <div className="px-6 py-5 bg-[#EFECE6] border-t border-[#DED9D0] text-xs font-sans space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold">
                                NOTA TECNICA &amp; FORMULAZIONE:
                              </div>
                              <div className="md:col-span-9 text-[#141312] leading-relaxed">
                                {service.technicalNotes}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[#DED9D0]/60">
                              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
                                CONSIGLIO ATELIER:
                              </div>
                              <div className="md:col-span-9 text-[#5C5852] italic leading-relaxed">
                                Consigliamo di abbinare questo servizio a un trattamento di ricostruzione per prolungare la brillantezza delle cuticole e mantenere la fibra setosa nel clima torinese.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredServices.length === 0 && (
            <div className="py-20 text-center border border-[#DED9D0] bg-[#EFECE6] p-8">
              <span className="font-mono text-xs text-[#5C5852] uppercase tracking-widest block mb-2">
                [ NESSUN RISULTATO CORRISPONDENTE ]
              </span>
              <p className="font-serif text-2xl text-[#141312]">
                Nessun servizio trovato per &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("tutti");
                }}
                className="mt-6 inline-block bg-[#141312] text-[#F6F4F0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors"
              >
                Ripristina Filtri
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. STICKY BOTTOM SUMMARY BAR */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#141312] text-[#F6F4F0] border-t-2 border-[#8C5A3C] shadow-2xl py-3 sm:py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                  IL TUO RITUALE ({selectedServices.length})
                </span>
                <span className="font-serif text-base sm:text-lg text-[#F6F4F0] truncate max-w-xs block">
                  {selectedServices.map((s) => s.name).join(", ")}
                </span>
              </div>

              <div className="text-right sm:text-left border-l border-[#2A2826] pl-4 sm:pl-8">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#DED9D0]/60 block">
                  TEMPO: {formattedDuration}
                </span>
                <span className="font-mono text-lg sm:text-2xl font-semibold text-[#8C5A3C] tabular-nums">
                  €{totalPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={openDrawer}
                className="flex-1 sm:flex-none border border-[#2A2826] bg-[#1a1918] text-[#F6F4F0] px-4 py-3 font-mono text-xs uppercase tracking-wider hover:border-[#8C5A3C] transition-colors"
              >
                Vedi Dettaglio ↗
              </button>
              <Link
                href="/prenota"
                className="flex-1 sm:flex-none bg-[#8C5A3C] text-[#F6F4F0] px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] hover:bg-[#a66d4a] transition-colors text-center font-semibold"
              >
                Procedi alla Prenotazione →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
