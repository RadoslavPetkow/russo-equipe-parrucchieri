"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES, Service } from "@/lib/salon-data";
import { useRitual } from "@/context/RitualContext";

interface StepOption {
  id: string;
  label: string;
  detail: string;
}

export default function ConsulenzaPage() {
  const { addService, openDrawer } = useRitual();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCute, setSelectedCute] = useState<string>("normale");
  const [selectedHistory, setSelectedHistory] = useState<string>("balayage_pregresso");
  const [selectedGoal, setSelectedGoal] = useState<string>("luminosita");

  const cuteOptions: StepOption[] = [
    { id: "normale", label: "Cute Equilibrata / Normale", detail: "Nessun fastidio, lavaggi ogni 3-4 giorni, fibra sana." },
    { id: "sensibile", label: "Cute Sensibile o Reattiva", detail: "Tendenza ad arrossamenti, prurito, richiede attivi botanici lenitivi privi di ammoniaca." },
    { id: "grassa", label: "Cute a Tendenza Seborroica", detail: "Radici pesanti dopo 24-48 ore, necessita di detossinazione e ossigenazione." },
    { id: "secca", label: "Cute Secca con Fusto Arido", detail: "Mancanza di elasticità e film idrolipidico, fibra opaca esposta a rotture." },
  ];

  const historyOptions: StepOption[] = [
    { id: "vergine", label: "Capello Naturale / Vergine", detail: "Nessuna decolorazione né tinta negli ultimi 24 mesi. Reattività cromatica massima." },
    { id: "balayage_pregresso", label: "Schiariture o Balayage Pregresso", detail: "Presenza di sfumature chiare da rinnovare o armonizzare alle lunghezze." },
    { id: "tinta_frequente", label: "Copertura Ricrescita Frequente", detail: "Colorazioni chimiche regolari per mascherare i primi capelli bianchi." },
    { id: "sensibilizzato", label: "Fusto Trattato & Sensibilizzato", detail: "Capelli fragili, uso frequente di piastre calde, doppie punte evidenti." },
  ];

  const goalOptions: StepOption[] = [
    { id: "luminosita", label: "Massima Luce Multidimensionale", detail: "Balayage sartoriale a mano libera, contrasti solari sfumati senza stacco." },
    { id: "taglio_forma", label: "Nuova Architettura & Taglio", detail: "Ridefinizione dei volumi fisionomici, leggerezza dinamica facile da gestire." },
    { id: "riparazione", label: "Rinascita Tricologica & Cura", detail: "Ricostruzione profonda dei ponti di cheratina e lucidatura cuticolare." },
    { id: "evento_sposa", label: "Acconciatura per Evento / Sposa", detail: "Preparazione ad alta definizione per matrimoni, teatro o cerimonie importanti." },
  ];

  // Dynamic recommendation based on answers
  const recommendedServiceIds: string[] = React.useMemo(() => {
    if (selectedGoal === "luminosita") {
      return ["balayage-sartoriale", "bagno-luce-gloss", "piega-editoriale-texturizzazione"];
    } else if (selectedGoal === "taglio_forma") {
      return ["taglio-architettonico-donna", "piega-editoriale-texturizzazione", "impacco-idratante-olii-davines"];
    } else if (selectedGoal === "riparazione") {
      return ["rituale-ricostruzione-molecolare", "trattamento-detox-ossigenazione", "taglio-architettonico-donna"];
    } else {
      return ["acconciatura-sposa-haute-couture", "bagno-luce-gloss", "rituale-ricostruzione-molecolare"];
    }
  }, [selectedGoal]);

  const recommendedServices = recommendedServiceIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is Service => Boolean(s));

  const totalEstPrice = recommendedServices.reduce((sum, s) => sum + s.price, 0);
  const totalEstDuration = recommendedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const applyRecommendedServices = () => {
    recommendedServices.forEach((s) => addService(s));
    openDrawer();
  };

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-2">
            PROTOCOLLO DIAGNOSTICO ONLINE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
            Diagnosi Capelli &amp; Armocromia
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-4 leading-relaxed">
            Rispondi a 3 quesiti diagnostici per consentire alla direzione tecnica dell&apos;Atelier Russo di formulare il piano di trattamento ideale per il tuo stato capillare.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="border border-[#DED9D0] bg-[#EFECE6] p-4 mb-8 grid grid-cols-4 font-mono text-xs divide-x divide-[#DED9D0]">
          <div className={`px-3 py-1 ${currentStep >= 1 ? "text-[#8C5A3C] font-semibold" : "text-[#5C5852]"}`}>
            01. CUTE
          </div>
          <div className={`px-3 py-1 ${currentStep >= 2 ? "text-[#8C5A3C] font-semibold" : "text-[#5C5852]"}`}>
            02. STORICO
          </div>
          <div className={`px-3 py-1 ${currentStep >= 3 ? "text-[#8C5A3C] font-semibold" : "text-[#5C5852]"}`}>
            03. OBIETTIVO
          </div>
          <div className={`px-3 py-1 ${currentStep >= 4 ? "text-[#8C5A3C] font-semibold" : "text-[#5C5852]"}`}>
            04. REPORT
          </div>
        </div>

        {/* Questionnaire Form */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-12">
          {/* STEP 1: CUTE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                  FASE 01 DI 03
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1">
                  Qual è la condizione attuale del tuo cuoio capelluto?
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {cuteOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCute(opt.id)}
                    className={`p-5 text-left border transition-all ${
                      selectedCute === opt.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-lg text-[#141312] font-medium">
                        {opt.label}
                      </span>
                      <span className="font-mono text-xs text-[#8C5A3C]">
                        {selectedCute === opt.id ? "●" : "○"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#5C5852]">{opt.detail}</p>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-[#DED9D0] flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors"
                >
                  Continua alla Fase 02 →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STORICO */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                  FASE 02 DI 03
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1">
                  Quali trattamenti chimici o termici hai effettuato di recente?
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {historyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedHistory(opt.id)}
                    className={`p-5 text-left border transition-all ${
                      selectedHistory === opt.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-lg text-[#141312] font-medium">
                        {opt.label}
                      </span>
                      <span className="font-mono text-xs text-[#8C5A3C]">
                        {selectedHistory === opt.id ? "●" : "○"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#5C5852]">{opt.detail}</p>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-[#DED9D0] flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="border border-[#DED9D0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors"
                >
                  ← Torna Indietro
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors"
                >
                  Continua alla Fase 03 →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OBIETTIVO */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                  FASE 03 DI 03
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1">
                  Qual è il tuo obiettivo estetico primario per questa seduta?
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedGoal(opt.id)}
                    className={`p-5 text-left border transition-all ${
                      selectedGoal === opt.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-lg text-[#141312] font-medium">
                        {opt.label}
                      </span>
                      <span className="font-mono text-xs text-[#8C5A3C]">
                        {selectedGoal === opt.id ? "●" : "○"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#5C5852]">{opt.detail}</p>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-[#DED9D0] flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="border border-[#DED9D0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors"
                >
                  ← Torna Indietro
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="bg-[#8C5A3C] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#a66d4a] transition-colors font-semibold"
                >
                  Genera la Mia Prescrizione →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REPORT FINALE */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="border-b border-[#DED9D0] pb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                  REPORT DIAGNOSTICO SU MISURA
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#141312] mt-1">
                  La Prescrizione dell&apos;Atelier Russo
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-2">
                  In base al profilo indicato (cute {selectedCute}, storico {selectedHistory.replace("_", " ")}, focus {selectedGoal}), la nostra direzione artistica consiglia la seguente combinazione sinergica:
                </p>
              </div>

              {/* Recommended Services List */}
              <div className="border border-[#DED9D0] divide-y divide-[#DED9D0] bg-[#EFECE6]">
                {recommendedServices.map((service) => (
                  <div key={service.id} className="p-4 sm:p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-semibold text-[#8C5A3C] bg-[#F6F4F0] px-1.5 py-0.5 border border-[#DED9D0]">
                          {service.code}
                        </span>
                        <h4 className="font-serif text-lg text-[#141312]">
                          {service.name}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-[#5C5852]">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <span className="text-base font-semibold text-[#141312] block">
                        €{service.price}
                      </span>
                      <span className="text-xs text-[#5C5852]">
                        ⏱ {service.durationMinutes} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="p-6 bg-[#141312] text-[#F6F4F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block">
                    VALUTAZIONE COMPLESSIVA
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F6F4F0]">
                    Tempo: {Math.floor(totalEstDuration / 60)}h {totalEstDuration % 60}m • Stima: €{totalEstPrice}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={applyRecommendedServices}
                    className="bg-[#8C5A3C] text-[#F6F4F0] px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#a66d4a] transition-colors"
                  >
                    + Carica nel Vassoio Rituale
                  </button>
                  <Link
                    href="/prenota"
                    className="border border-[#2A2826] bg-[#1a1918] text-[#F6F4F0] px-4 py-3 font-mono text-xs uppercase tracking-wider hover:border-[#8C5A3C] transition-colors"
                  >
                    Prenota Subito →
                  </Link>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="font-mono text-xs text-[#5C5852] hover:text-[#141312] underline underline-offset-4"
                >
                  Ricomincia il test da capo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
