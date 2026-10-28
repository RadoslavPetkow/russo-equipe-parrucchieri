"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRitual } from "@/context/RitualContext";
import { CATEGORY_LABELS } from "@/lib/salon-data";

export default function RitualDrawer() {
  const {
    selectedServices,
    removeService,
    clearServices,
    totalPrice,
    totalDurationMinutes,
    isDrawerOpen,
    closeDrawer,
  } = useRitual();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes} min`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-xl bg-[#F6F4F0] text-[#141312] border-l border-[#DED9D0] flex flex-col h-full shadow-2xl transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ritual-drawer-title"
      >
        {/* Header */}
        <div className="border-b border-[#DED9D0] px-6 py-5 flex items-center justify-between bg-[#EFECE6]">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-medium">
              Selezione Atelier • Torino
            </span>
            <h2
              id="ritual-drawer-title"
              className="font-serif text-2xl font-normal tracking-wide text-[#141312] mt-0.5"
            >
              Il Tuo Rituale Su Misura
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="w-10 h-10 border border-[#DED9D0] bg-[#F6F4F0] hover:bg-[#141312] hover:text-[#F6F4F0] flex items-center justify-center transition-colors text-xs font-mono"
            aria-label="Chiudi vassoio rituale"
          >
            ✕
          </button>
        </div>

        {/* Selected Services Ledger */}
        <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#DED9D0]">
          {selectedServices.length === 0 ? (
            <div className="py-16 text-center">
              <span className="font-mono text-xs text-[#5C5852] block tracking-widest uppercase mb-3">
                [ VASSOIO VUOTO ]
              </span>
              <p className="font-serif text-xl italic text-[#141312] max-w-sm mx-auto leading-relaxed mb-6">
                Nessun rituale selezionato al momento. Componi la tua esperienza sartoriale esplorando il listino.
              </p>
              <Link
                href="/listino"
                onClick={closeDrawer}
                className="inline-block border border-[#141312] bg-[#141312] text-[#F6F4F0] px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-[#8C5A3C] hover:border-[#8C5A3C] transition-colors"
              >
                Esplora il Listino
              </Link>
            </div>
          ) : (
            <>
              <div className="pb-3 flex justify-between items-center text-xs font-mono text-[#5C5852]">
                <span>{selectedServices.length} SERVIZI SELEZIONATI</span>
                <button
                  onClick={clearServices}
                  className="hover:text-[#8C5A3C] underline decoration-[#DED9D0] underline-offset-4 transition-colors"
                >
                  Svuota selezione
                </button>
              </div>

              {selectedServices.map((service) => {
                const categoryInfo = CATEGORY_LABELS[service.category];
                return (
                  <div key={service.id} className="py-4 flex items-start justify-between gap-4 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] tracking-wider text-[#8C5A3C] font-semibold bg-[#EFECE6] px-1.5 py-0.5 border border-[#DED9D0]">
                          {service.code}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-[#5C5852]">
                          {categoryInfo?.title}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#141312] leading-snug group-hover:text-[#8C5A3C] transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#5C5852] font-sans line-clamp-1 mt-0.5">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 mt-2 font-mono text-xs text-[#5C5852]">
                        <span>⏱ {service.durationMinutes} min</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end shrink-0">
                      <span className="font-mono text-base font-medium text-[#141312] tabular-nums">
                        €{service.price}
                      </span>
                      <button
                        onClick={() => removeService(service.id)}
                        className="mt-2 text-xs font-mono text-[#5C5852] hover:text-[#8C5A3C] underline underline-offset-2 transition-colors"
                        aria-label={`Rimuovi ${service.name}`}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Calculation Footer */}
        {selectedServices.length > 0 && (
          <div className="border-t border-[#DED9D0] bg-[#EFECE6] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#DED9D0]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852] block">
                  TEMPO STIMATO IN ATELIER
                </span>
                <span className="font-mono text-xl font-medium text-[#141312] tabular-nums">
                  {formattedDuration}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852] block">
                  INVESTIMENTO STIMATO
                </span>
                <span className="font-mono text-2xl font-semibold text-[#8C5A3C] tabular-nums">
                  €{totalPrice}
                </span>
              </div>
            </div>

            <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed italic">
              * Tariffe e durate possono subire minime variazioni su lunghezze eccezionali o trattamenti correttivi complessi, preventivamente concordati durante la consulenza iniziale.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                href="/prenota"
                onClick={closeDrawer}
                className="flex-1 bg-[#141312] text-[#F6F4F0] text-center py-3.5 px-4 font-mono text-xs tracking-widest uppercase hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
              >
                Procedi alla Prenotazione →
              </Link>
              <button
                onClick={closeDrawer}
                className="bg-transparent text-[#141312] text-center py-3 px-4 font-mono text-xs tracking-widest uppercase border border-[#DED9D0] hover:bg-[#F6F4F0] transition-colors"
              >
                Continua Listino
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
