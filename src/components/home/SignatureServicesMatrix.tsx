"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES, ServiceCategory } from "@/lib/salon-data";
import { useRitual } from "@/context/RitualContext";

type FilterTab = "tutti" | ServiceCategory;

export default function SignatureServicesMatrix() {
  const [activeTab, setActiveTab] = useState<FilterTab>("tutti");
  const { toggleService, isServiceSelected, openDrawer } = useRitual();

  const featuredServices = SERVICES.filter((s) => s.featured);

  const displayedServices =
    activeTab === "tutti"
      ? featuredServices
      : featuredServices.filter((s) => s.category === activeTab);

  const tabs: { id: FilterTab; label: string; code: string }[] = [
    { id: "tutti", label: "Tutte le Firme", code: "ALL" },
    { id: "colore-balayage", label: "Colore & Balayage", code: "CB" },
    { id: "taglio-styling", label: "Taglio & Styling", code: "TS" },
    { id: "trattamenti", label: "Rituali & Cura", code: "TR" },
    { id: "spose-eventi", label: "Spose & Eventi", code: "SE" },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-[#DED9D0] bg-[#F6F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#DED9D0]">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-2">
              SELEZIONE SIGNATURE • ATELIER RUSSO
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
              Matrice dei Servizi di Punta
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-3 max-w-xl">
              Ciascun rituale è codificato e realizzato con precisione artigianale. Seleziona i servizi per comporre in tempo reale il tuo piano d&apos;appuntamento.
            </p>
          </div>

          <Link
            href="/listino"
            className="font-mono text-xs text-[#141312] hover:text-[#8C5A3C] tracking-widest uppercase inline-flex items-center gap-2 group self-start md:self-end border-b border-[#141312] pb-1 hover:border-[#8C5A3C] transition-colors"
          >
            <span>Consulta l&apos;Intero Listino Prezzi</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-8 pb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-xs uppercase px-4 py-2.5 transition-colors border ${
                  isActive
                    ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                    : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312] hover:border-[#141312]"
                }`}
              >
                <span className="opacity-60 mr-1.5 text-[10px]">[{tab.code}]</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tabular Ledger Matrix */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
          {/* Matrix Header Row (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 px-6 py-3.5 bg-[#EFECE6] font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
            <div className="col-span-1">CODICE</div>
            <div className="col-span-4">SERVIZIO &amp; DISCIPLINA</div>
            <div className="col-span-4">PROTOCOLLO &amp; CARATTERISTICHE</div>
            <div className="col-span-1 text-center">TEMPO</div>
            <div className="col-span-1 text-right">PREZZO</div>
            <div className="col-span-1 text-right">RITUALE</div>
          </div>

          {/* Matrix Body Rows */}
          {displayedServices.map((service) => {
            const isSelected = isServiceSelected(service.id);
            return (
              <div
                key={service.id}
                className={`p-6 transition-colors ${
                  isSelected ? "bg-[#EFECE6]/70" : "hover:bg-[#EFECE6]/30"
                }`}
              >
                {/* Desktop View */}
                <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                  <div className="col-span-1">
                    <span className="font-mono text-xs font-semibold text-[#8C5A3C] bg-[#F6F4F0] px-2 py-1 border border-[#DED9D0]">
                      {service.code}
                    </span>
                  </div>

                  <div className="col-span-4 pr-4">
                    <h3 className="font-serif text-xl font-normal text-[#141312]">
                      {service.name}
                    </h3>
                    <p className="font-sans text-xs text-[#5C5852] mt-1 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="col-span-4 pr-4">
                    <p className="font-sans text-xs text-[#5C5852] italic leading-relaxed border-l-2 border-[#DED9D0] pl-3">
                      {service.technicalNotes}
                    </p>
                  </div>

                  <div className="col-span-1 text-center font-mono text-xs text-[#5C5852] tabular-nums">
                    {service.durationMinutes} min
                  </div>

                  <div className="col-span-1 text-right font-mono text-base font-semibold text-[#141312] tabular-nums">
                    €{service.price}
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => toggleService(service)}
                      className={`font-mono text-[11px] px-3 py-2 uppercase tracking-wider transition-colors border text-center w-full block ${
                        isSelected
                          ? "bg-[#8C5A3C] text-[#F6F4F0] border-[#8C5A3C] hover:bg-[#141312] hover:border-[#141312]"
                          : "bg-transparent text-[#141312] border-[#141312] hover:bg-[#141312] hover:text-[#F6F4F0]"
                      }`}
                      aria-label={`${isSelected ? "Rimuovi" : "Aggiungi"} ${service.name}`}
                    >
                      {isSelected ? "✓ Aggiunto" : "+ Seleziona"}
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] font-semibold text-[#8C5A3C] bg-[#F6F4F0] px-2 py-0.5 border border-[#DED9D0] inline-block mb-1.5">
                        {service.code}
                      </span>
                      <h3 className="font-serif text-xl font-normal text-[#141312]">
                        {service.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-lg font-semibold text-[#141312] tabular-nums block">
                        €{service.price}
                      </span>
                      <span className="font-mono text-xs text-[#5C5852] tabular-nums">
                        {service.durationMinutes} min
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#5C5852] leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <p className="font-sans text-[11px] text-[#5C5852] italic border-l-2 border-[#DED9D0] pl-3 py-0.5">
                    {service.technicalNotes}
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      onClick={() => toggleService(service)}
                      className={`flex-1 font-mono text-xs py-3 uppercase tracking-wider transition-colors border text-center ${
                        isSelected
                          ? "bg-[#8C5A3C] text-[#F6F4F0] border-[#8C5A3C]"
                          : "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                      }`}
                    >
                      {isSelected ? "✓ Nel Tuo Rituale (Modifica)" : "+ Aggiungi al Rituale"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-8 p-6 bg-[#EFECE6] border border-[#DED9D0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
            <p className="font-sans text-xs text-[#141312]">
              Hai composto il tuo percorso ideale? Controlla il tempo totale e prenota con il tuo orario di preferenza.
            </p>
          </div>
          <button
            onClick={openDrawer}
            className="font-mono text-xs uppercase tracking-widest text-[#8C5A3C] hover:text-[#141312] underline underline-offset-4 shrink-0 transition-colors"
          >
            Apri Vassoio Rituale →
          </button>
        </div>
      </div>
    </section>
  );
}
