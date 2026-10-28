"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SERVICES, STYLISTS, Service, Stylist } from "@/lib/salon-data";
import { useRitual } from "@/context/RitualContext";

// Step 1 Options
type HairDiameter = "sottile" | "medio" | "spesso";
type HairTexture = "liscio" | "mosso" | "riccio";

// Step 2 Options
type ChemicalHistory = "vergine" | "colore_radice" | "schiariture_pregresse" | "sensibilizzato";
type ScalpCondition = "equilibrata" | "sensibile" | "seborroica";

// Step 3 Options
type PrimaryGoal = "balayage" | "degrade" | "copertura" | "taglio" | "ricostruzione";

// Step 4 Options
type MaintenanceHorizon = "basso" | "regolare" | "evento";

interface DiagnosticResult {
  dossierCode: string;
  porosityRisk: string;
  porosityLevel: "Basso" | "Medio" | "Elevato" | "Critico";
  fiberAnalysis: string;
  scalpProtocol: string;
  chromaticStrategy: string;
  recommendedServices: Service[];
  assignedStylist: Stylist;
  stylistRationale: string;
  totalDurationMinutes: number;
  totalPrice: number;
  maintenanceAdvice: string;
  homeCarePrescription: string;
}

// Module-level option definitions
const DIAMETER_OPTIONS: { id: HairDiameter; label: string; sub: string }[] = [
  {
    id: "sottile",
    label: "Sottile e Delicato",
    sub: "Tende ad appiattirsi alle radici, reagisce velocemente agli schiarenti, teme il calore eccessivo.",
  },
  {
    id: "medio",
    label: "Medio ed Equilibrato",
    sub: "Buona elasticità naturale, fibra versatile che mantiene bene sia piega che sfumature cromatiche.",
  },
  {
    id: "spesso",
    label: "Spesso e Corposo",
    sub: "Volume denso e vigoroso, necessita di idratazione profonda e di sezionamenti millimetrici nel taglio.",
  },
];

const TEXTURE_OPTIONS: { id: HairTexture; label: string; sub: string }[] = [
  { id: "liscio", label: "Liscio Naturale", sub: "Riflette la luce in modo uniforme; evidenzia geometrie e perimetri netti." },
  { id: "mosso", label: "Mosso Naturale / Onde", sub: "Movimento organico ideale per sfumature multilivello e giochi d'ombra." },
  { id: "riccio", label: "Riccio Definito o Afro", sub: "Struttura a spirale che richiede taglio tridimensionale su capello asciutto." },
];

const HISTORY_OPTIONS: { id: ChemicalHistory; label: string; sub: string }[] = [
  {
    id: "vergine",
    label: "Capello Vergine / Naturale",
    sub: "Nessun trattamento chimico o schiaritura negli ultimi 24 mesi. Massima purezza strutturale.",
  },
  {
    id: "colore_radice",
    label: "Colore Cosmetico in Radice",
    sub: "Tinte regolari per copertura bianchi con pigmento accumulato sulle lunghezze.",
  },
  {
    id: "schiariture_pregresse",
    label: "Schiariture / Balayage Pregresso",
    sub: "Punte e lunghezze già decolorate da tonalizzare o riarmonizzare alla radice naturale.",
  },
  {
    id: "sensibilizzato",
    label: "Capello Sensibilizzato o Decolorato",
    sub: "Fibra porosa, doppie punte, fusto sfibrato da piastre frequenti o decolorazioni forti.",
  },
];

const SCALP_OPTIONS: { id: ScalpCondition; label: string; sub: string }[] = [
  {
    id: "equilibrata",
    label: "Cute Equilibrata",
    sub: "Nessuna reattività o fastidio, lavaggi regolari ogni 3-4 giorni senza prurito.",
  },
  {
    id: "sensibile",
    label: "Cute Sensibile / Disidratata",
    sub: "Tendenza ad arrossamenti, pizzicore dopo shampoo o colorazioni. Esige formule dolci.",
  },
  {
    id: "seborroica",
    label: "Cute con Tendenza Seborroica",
    sub: "Eccesso di sebo dopo 24-48 ore, radici pesanti, necessità di ossigenazione e detox.",
  },
];

const GOAL_OPTIONS: { id: PrimaryGoal; label: string; sub: string; code: string }[] = [
  {
    id: "balayage",
    code: "LUCE SARTORIALE",
    label: "Schiaritura Sartoriale Luminosa — Balayage",
    sub: "Schiariture a mano libera con gradazione tridimensionale, massima naturalezza ed effetto solare diffuso.",
  },
  {
    id: "degrade",
    code: "SFUMATURA VERTICALE",
    label: "Sfumatura Naturale Morbida — Degradé",
    sub: "Contouring del viso, alternanza di tre cromie calde/fredde senza stacchi netti di ricrescita.",
  },
  {
    id: "copertura",
    code: "CROMIA & BRILLANTEZZA",
    label: "Copertura e Riflessatura Profonda",
    sub: "Pigmentazione ricrescita senza ammoniaca associata a bagno di luce acidificante specchiato.",
  },
  {
    id: "taglio",
    code: "FORMA ARCHITETTONICA",
    label: "Rivoluzione di Taglio Architettonico",
    sub: "Nuova geometria volumetrica calibrata sulla struttura ossea del viso, facile da gestire ogni giorno.",
  },
  {
    id: "ricostruzione",
    code: "SALUTE MOLECOLARE",
    label: "Ricostruzione Profonda e Disciplina",
    sub: "Riparazione integrale dei ponti disolfuro di cheratina, rigenerazione della corteccia e corpo setoso.",
  },
];

const MAINTENANCE_OPTIONS: { id: MaintenanceHorizon; label: string; sub: string; cadence: string }[] = [
  {
    id: "basso",
    label: "Basso Mantenimento: Ogni 3–4 Mesi",
    sub: "Desidero un look che cresca in modo armonioso e non mi vincoli a sedute frequenti.",
    cadence: "Visita stagionale ogni 12–16 settimane.",
  },
  {
    id: "regolare",
    label: "Mantenimento Regolare: Ogni 6–8 Settimane",
    sub: "Amo avere perimetri sempre impeccabili, brillantezza costante e riflessi mai opachi.",
    cadence: "Ritocco tonalizzante o radice ogni 6–8 settimane.",
  },
  {
    id: "evento",
    label: "Evento Speciale / Preparazione Immediata",
    sub: "Cerimonia, nozze o shooting imminente: cerco il massimo impatto visivo immediato.",
    cadence: "Protocollo express pre-evento + styling a tenuta.",
  },
];

export default function ConsulenzaPage() {
  const router = useRouter();
  const { replaceServices } = useRitual();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selections
  const [diameter, setDiameter] = useState<HairDiameter>("medio");
  const [texture, setTexture] = useState<HairTexture>("mosso");
  const [history, setHistory] = useState<ChemicalHistory>("schiariture_pregresse");
  const [scalp, setScalp] = useState<ScalpCondition>("equilibrata");
  const [goal, setGoal] = useState<PrimaryGoal>("balayage");
  const [maintenance, setMaintenance] = useState<MaintenanceHorizon>("basso");

  // Algorithmic Diagnostic Computation
  const diagnosticResult: DiagnosticResult = useMemo(() => {
    const serviceMap = new Map<string, Service>();
    SERVICES.forEach((s) => serviceMap.set(s.id, s));

    const selectedServiceList: Service[] = [];
    let assignedStylistId = "patrizia-russo";
    let stylistRationale = "";
    let porosityRisk = "Minimo — Fibra sana con cuticole compatte";
    let porosityLevel: "Basso" | "Medio" | "Elevato" | "Critico" = "Basso";
    let fiberAnalysis = "";
    let scalpProtocol = "Cute sana, detersione eudermica neutra.";
    let chromaticStrategy = "";
    let homeCare = "";

    // 1. Analyze Porosity & Scalp
    if (history === "sensibilizzato") {
      porosityRisk = "Critico / Elevato — Cuticole erose, ponti disolfuro indeboliti";
      porosityLevel = "Elevato";
      fiberAnalysis = "La fibra presenta porosità marcata con tendenza allo spezzamento sotto trazione meccanica o termica. È imperativo un pre-trattamento molecolare prima di ogni schiaritura.";
      const cheratina = serviceMap.get("rituale-ricostruzione-molecolare");
      if (cheratina) selectedServiceList.push(cheratina);
    } else if (history === "schiariture_pregresse") {
      porosityRisk = "Medio — Lunghezze demineralizzate, base naturale intatta";
      porosityLevel = "Medio";
      fiberAnalysis = "Le lunghezze mostrano un assorbimento rapido dell'umidità; la cuticola è parzialmente aperta sui perimetri esterni.";
      const gloss = serviceMap.get("bagno-luce-gloss");
      if (gloss) selectedServiceList.push(gloss);
    } else if (history === "colore_radice") {
      porosityRisk = "Medio-Basso — Sovraccarico di pigmento cosmetico";
      porosityLevel = "Medio";
      fiberAnalysis = "Stratificazione di colorazioni pregresse. Consigliata uniformazione cromatico-riflettente a pH acido senza sovraccaricare le lunghezze.";
    } else {
      porosityRisk = "Basso — Capello vergine ad alta resistenza strutturale";
      porosityLevel = "Basso";
      fiberAnalysis = "Condizione di partenza ideale: cuticole integre e reattività ottimale ai riflessi solari a mano libera.";
    }

    if (scalp === "sensibile") {
      scalpProtocol = "Cute reattiva: utilizzo tassativo di formulazioni senza ammoniaca e impacco lenitivo agli estratti vegetali calmanti.";
    } else if (scalp === "seborroica") {
      scalpProtocol = "Cute con ipersecrezione sebacea: raccomandato gommage detossinante con argille alpine e ossigenazione microcircolo craniale.";
      const detox = serviceMap.get("trattamento-detox-ossigenazione");
      if (detox && !selectedServiceList.some((s) => s.id === detox.id)) {
        selectedServiceList.push(detox);
      }
    }

    // 2. Goal Mapping & Primary Services
    if (goal === "balayage") {
      const balayage = serviceMap.get("balayage-sartoriale");
      const piega = serviceMap.get("piega-editoriale-texturizzazione");
      const gloss = serviceMap.get("bagno-luce-gloss");
      if (balayage) selectedServiceList.unshift(balayage);
      if (gloss && !selectedServiceList.some((s) => s.id === gloss.id)) selectedServiceList.push(gloss);
      if (piega) selectedServiceList.push(piega);

      chromaticStrategy = `Schiaritura sartoriale graduata con pennello a mano libera. Gradazione sfumata da base naturale verso riflessi ${diameter === "sottile" ? "chiari e luminosi per creare illusione di densità" : "profondi e caldi"}. Nessuno stacco orizzontale.`;
      assignedStylistId = "patrizia-russo";
      stylistRationale = "Patrizia Russo — Direttrice Artistica & Master Colorist. Massima autorità in atelier per il balayage a mano libera e lo studio cromatico delle ombre.";
      homeCare = "Shampoo idratante privo di solfati, maschera tonalizzante a pigmenti puri freddi/dorati ogni 10 giorni, termoprotettore spray prima del phon.";
    } else if (goal === "degrade") {
      const degrade = serviceMap.get("degrade-soleil");
      const piega = serviceMap.get("piega-editoriale-texturizzazione");
      if (degrade) selectedServiceList.unshift(degrade);
      if (piega) selectedServiceList.push(piega);

      chromaticStrategy = "Sfumatura verticale multilivello con sezioni diagonali studiate per incorniciare ed esaltare gli zigomi e l'incarnato naturale.";
      assignedStylistId = "marco-d";
      stylistRationale = "Marco D. — Specialista Schiariture & Tricologia. Esperto nella calibratura termica delle sfumature verticali e nel mantenimento dell'integrità del fusto.";
      homeCare = "Balsamo districante acidificante a risciacquo rapido, olio protettivo ai semi di lino sulle punte umide.";
    } else if (goal === "copertura") {
      const colore = serviceMap.get("colore-radice-bio");
      const gloss = serviceMap.get("bagno-luce-gloss");
      const piega = serviceMap.get("piega-editoriale-texturizzazione");
      if (colore) selectedServiceList.unshift(colore);
      if (gloss) selectedServiceList.push(gloss);
      if (piega) selectedServiceList.push(piega);

      chromaticStrategy = "Copertura integrale con pigmenti biologici micronizzati e bagno di luce gloss sigillante su lunghezze e punte per uniformare la riflessatura.";
      assignedStylistId = "patrizia-russo";
      stylistRationale = "Patrizia Russo — Oltre 25 anni di colorimetria avanzata e bilanciamento della copertura dermoprotettiva senza ammoniaca.";
      homeCare = "Maschera nutriente a base di burro di karitè e filtri anti-UV per prevenire l'ossidazione del colore causata dal sole e dallo smog.";
    } else if (goal === "taglio") {
      const taglio = serviceMap.get("taglio-architettonico-donna");
      const piega = serviceMap.get("piega-editoriale-texturizzazione");
      const impacco = serviceMap.get("impacco-idratante-olii-davines");
      if (taglio) selectedServiceList.unshift(taglio);
      if (impacco) selectedServiceList.push(impacco);
      if (piega) selectedServiceList.push(piega);

      chromaticStrategy = "Focus su taglio geometrico strutturato su capello umido e sbozzato a capello asciutto per assecondare la caduta fisiologica e la fisionomia facciale.";
      assignedStylistId = "elena-v";
      stylistRationale = "Elena V. — Senior Hair Stylist specializzata nella precisione geometrica dei volumi dinamici e tagli che si gestiscono da soli anche a casa.";
      homeCare = "Crema disciplinante termoattiva e spazzola in setole naturali di cinghiale per lucidare le cuticole durante l'asciugatura.";
    } else {
      // Ricostruzione
      const ric = serviceMap.get("rituale-ricostruzione-molecolare");
      const detox = serviceMap.get("trattamento-detox-ossigenazione");
      const piega = serviceMap.get("piega-editoriale-texturizzazione");
      if (ric) selectedServiceList.unshift(ric);
      if (detox && !selectedServiceList.some((s) => s.id === detox.id)) selectedServiceList.push(detox);
      if (piega) selectedServiceList.push(piega);

      chromaticStrategy = "Rigenerazione cellulare profonda dei legami interni di cheratina con attivazione termica delicata e chiusura delle cuticole esterne a pH acido.";
      assignedStylistId = "marco-d";
      stylistRationale = "Marco D. — Tricologo dell'Atelier, specializzato nell'analisi microscopica del capello e nei protocolli intensivi di rinascita molecolare.";
      homeCare = "Ciclo di shampoo ricostruttore delicato e fiale nutritive da applicare a casa con cadenza settimanale per 4 settimane consecutive.";
    }

    // Deduplicate services
    const uniqueServices: Service[] = [];
    selectedServiceList.forEach((s) => {
      if (!uniqueServices.some((u) => u.id === s.id)) uniqueServices.push(s);
    });

    const stylistObj = STYLISTS.find((s) => s.id === assignedStylistId) || STYLISTS[0];
    const totalDuration = uniqueServices.reduce((acc, s) => acc + s.durationMinutes, 0);
    const totalPrice = uniqueServices.reduce((acc, s) => acc + s.price, 0);

    const maintenanceAdvice = MAINTENANCE_OPTIONS.find((m) => m.id === maintenance)?.cadence || "Controllo trimestrale.";

    // Generate dossier code
    const hash = `${diameter.charAt(0)}${texture.charAt(0)}${history.charAt(0)}${goal.charAt(0)}`.toUpperCase();
    const dossierCode = `RUSSO-DX-${hash}-2026`;

    return {
      dossierCode,
      porosityRisk,
      porosityLevel,
      fiberAnalysis,
      scalpProtocol,
      chromaticStrategy,
      recommendedServices: uniqueServices,
      assignedStylist: stylistObj,
      stylistRationale,
      totalDurationMinutes: totalDuration,
      totalPrice,
      maintenanceAdvice,
      homeCarePrescription: homeCare,
    };
  }, [diameter, texture, history, scalp, goal, maintenance]);

  // Handle Apply & Book
  const handleApplyProtocolAndBook = () => {
    replaceServices(diagnosticResult.recommendedServices);
    const noteText = `Consulenza ${diagnosticResult.dossierCode}: ${diagnosticResult.recommendedServices.map((s) => s.name).join(" + ")}`;
    router.push(
      `/prenota?stylist=${diagnosticResult.assignedStylist.id}&from=consulenza&note=${encodeURIComponent(noteText)}`
    );
  };

  const hours = Math.floor(diagnosticResult.totalDurationMinutes / 60);
  const minutes = diagnosticResult.totalDurationMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes} min`;

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8C5A3C] uppercase font-semibold mb-3">
            <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
            <span>DIAGNOSI TRICOLOGICA &amp; COLORIMETRIA DIGITALE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
            Consultazione Sartoriale Guidata
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-3 leading-relaxed">
            Un percorso a 4 tappe formulato sulla metodologia di Patrizia Russo. Analizziamo diametro, porosità, chimica pregressa e aspirazioni di luce per generare la tua Scheda Diagnostica personalizzata.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="border border-[#DED9D0] bg-[#EFECE6] p-3 mb-10 grid grid-cols-4 font-mono text-[11px] text-center divide-x divide-[#DED9D0]">
          <button
            onClick={() => setStep(1)}
            className={`py-1.5 transition-colors uppercase ${
              step === 1 ? "bg-[#141312] text-[#F6F4F0] font-semibold" : step > 1 ? "text-[#8C5A3C] font-semibold hover:text-[#141312]" : "text-[#5C5852]"
            }`}
          >
            01. FIBRA
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-1.5 transition-colors uppercase ${
              step === 2 ? "bg-[#141312] text-[#F6F4F0] font-semibold" : step > 2 ? "text-[#8C5A3C] font-semibold hover:text-[#141312]" : "text-[#5C5852]"
            }`}
          >
            02. STORIA &amp; CUTE
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-1.5 transition-colors uppercase ${
              step === 3 ? "bg-[#141312] text-[#F6F4F0] font-semibold" : step > 3 ? "text-[#8C5A3C] font-semibold hover:text-[#141312]" : "text-[#5C5852]"
            }`}
          >
            03. OBIETTIVO
          </button>
          <button
            onClick={() => setStep(4)}
            className={`py-1.5 transition-colors uppercase ${
              step === 4 || step === 5 ? "bg-[#141312] text-[#F6F4F0] font-semibold" : "text-[#5C5852]"
            }`}
          >
            04. RITMO &amp; REPORT
          </button>
        </div>

        {/* INTERACTIVE QUESTIONNAIRE CONTAINER */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] shadow-sm">
          {/* STEP 1: ARCHITETTURA E FIBRA CAPILLARE */}
          {step === 1 && (
            <div className="p-6 sm:p-12 space-y-10">
              <div className="border-b border-[#DED9D0] pb-6">
                <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] font-semibold uppercase block">
                  FASE 01 // ARCHITETTURA DELLA MATERIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1 font-normal">
                  Diametro e Movimento Naturale della Fibra
                </h2>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  Seleziona sia la consistenza del singolo capello sia la texture al naturale prima di qualsiasi piega.
                </p>
              </div>

              {/* Sub-section A: Diametro */}
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#141312] font-semibold block">
                  A. Diametro della fibra capillare:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DIAMETER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDiameter(opt.id)}
                      className={`p-4 text-left border transition-all ${
                        diameter === opt.id
                          ? "bg-[#EFECE6] border-[#8C5A3C]"
                          : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong className="font-serif text-lg text-[#141312]">
                          {opt.label}
                        </strong>
                        <span className="font-mono text-xs text-[#8C5A3C]">
                          {diameter === opt.id ? "●" : "○"}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed">
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-section B: Texture */}
              <div className="space-y-4 pt-4 border-t border-[#DED9D0]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#141312] font-semibold block">
                  B. Struttura e movimento biologico:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TEXTURE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTexture(opt.id)}
                      className={`p-4 text-left border transition-all ${
                        texture === opt.id
                          ? "bg-[#EFECE6] border-[#8C5A3C]"
                          : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong className="font-serif text-lg text-[#141312]">
                          {opt.label}
                        </strong>
                        <span className="font-mono text-xs text-[#8C5A3C]">
                          {texture === opt.id ? "●" : "○"}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed">
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="pt-6 border-t border-[#DED9D0] flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  Prosegui alla Fase 02 →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STORIA CHIMICA E STATO CUTANEO */}
          {step === 2 && (
            <div className="p-6 sm:p-12 space-y-10">
              <div className="border-b border-[#DED9D0] pb-6">
                <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] font-semibold uppercase block">
                  FASE 02 // STORICO CHIMICO &amp; CONDROMETRIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1 font-normal">
                  Memoria dei Trattamenti &amp; Equilibrio del Cuoio Capelluto
                </h2>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  La reattività del colore e la resistenza del taglio dipendono dalla memoria chimica della fibra e dalla purezza dermica.
                </p>
              </div>

              {/* Sub-section A: Storia chimica */}
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#141312] font-semibold block">
                  A. Trattamenti chimici pregressi (ultimi 6–18 mesi):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HISTORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setHistory(opt.id)}
                      className={`p-4 text-left border transition-all ${
                        history === opt.id
                          ? "bg-[#EFECE6] border-[#8C5A3C]"
                          : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong className="font-serif text-lg text-[#141312]">
                          {opt.label}
                        </strong>
                        <span className="font-mono text-xs text-[#8C5A3C]">
                          {history === opt.id ? "●" : "○"}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed">
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-section B: Stato Cutaneo */}
              <div className="space-y-4 pt-4 border-t border-[#DED9D0]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#141312] font-semibold block">
                  B. Condizione cutanea percepita:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SCALP_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScalp(opt.id)}
                      className={`p-4 text-left border transition-all ${
                        scalp === opt.id
                          ? "bg-[#EFECE6] border-[#8C5A3C]"
                          : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <strong className="font-serif text-lg text-[#141312]">
                          {opt.label}
                        </strong>
                        <span className="font-mono text-xs text-[#8C5A3C]">
                          {scalp === opt.id ? "●" : "○"}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed">
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="pt-6 border-t border-[#DED9D0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-[#DED9D0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors"
                >
                  ← Fase 01
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  Prosegui alla Fase 03 →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OBIETTIVO DI LUCE E FORMA */}
          {step === 3 && (
            <div className="p-6 sm:p-12 space-y-8">
              <div className="border-b border-[#DED9D0] pb-6">
                <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] font-semibold uppercase block">
                  FASE 03 // VISIONE ESTETICA &amp; MORFOLOGIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1 font-normal">
                  Il Tuo Obiettivo di Luce, Colore o Taglio
                </h2>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  Qual è la priorità trasformativa per la tua prossima seduta in atelier?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id)}
                    className={`p-5 text-left border transition-all ${
                      goal === opt.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C5A3C] font-semibold bg-[#F6F4F0] px-2 py-0.5 border border-[#DED9D0]">
                          {opt.code}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl text-[#141312]">
                          {opt.label}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-[#8C5A3C]">
                        {goal === opt.id ? "●" : "○"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#5C5852] mt-1 leading-relaxed">
                      {opt.sub}
                    </p>
                  </button>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="pt-6 border-t border-[#DED9D0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-[#DED9D0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors"
                >
                  ← Fase 02
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  Prosegui alla Fase 04 →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORIZZONTE DI MANTENIMENTO */}
          {step === 4 && (
            <div className="p-6 sm:p-12 space-y-8">
              <div className="border-b border-[#DED9D0] pb-6">
                <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] font-semibold uppercase block">
                  FASE 04 // CADENZA TEMPORALE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1 font-normal">
                  Orizzonte di Mantenimento &amp; Tempo in Atelier
                </h2>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  In base al tuo stile di vita e alla frequenza con cui desideri recarti in atelier, adatteremo le sfumature e la tipologia di scalatura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MAINTENANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMaintenance(opt.id)}
                    className={`p-5 text-left border transition-all flex flex-col justify-between ${
                      maintenance === opt.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C5A3C] font-semibold">
                          ORIZZONTE
                        </span>
                        <span className="font-mono text-xs text-[#8C5A3C]">
                          {maintenance === opt.id ? "●" : "○"}
                        </span>
                      </div>
                      <strong className="font-serif text-lg text-[#141312] block mb-2 leading-snug">
                        {opt.label}
                      </strong>
                      <p className="font-sans text-xs text-[#5C5852] leading-relaxed">
                        {opt.sub}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DED9D0] font-mono text-[10px] text-[#8C5A3C] uppercase tracking-wider">
                      {opt.cadence}
                    </div>
                  </button>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="pt-6 border-t border-[#DED9D0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="border border-[#DED9D0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors"
                >
                  ← Fase 03
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="bg-[#8C5A3C] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#a66d4a] transition-colors font-semibold"
                >
                  Elabora Scheda Diagnostica →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: ALGORITHMIC DIAGNOSTIC DOSSIER OUTPUT */}
          {step === 5 && (
            <div className="p-6 sm:p-12 space-y-10 animate-fadeIn">
              {/* Dossier Header */}
              <div className="border-b border-[#DED9D0] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#8C5A3C] tracking-widest uppercase font-semibold mb-1">
                    <span>ATELIER RUSSO • PROTOCOLLO CERTIFICATO</span>
                    <span>/</span>
                    <span>TORINO</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#141312] font-normal">
                    Scheda Diagnostica Sartoriale
                  </h2>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] uppercase text-[#5C5852] tracking-wider block">
                    IDENTIFICATIVO DOSSIER
                  </span>
                  <span className="text-base font-semibold text-[#8C5A3C]">
                    {diagnosticResult.dossierCode}
                  </span>
                </div>
              </div>

              {/* 1. Profilo Tecnico Rilevato */}
              <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block border-b border-[#DED9D0] pb-2">
                  01 // PROFILO TECNICO RILEVATO
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#5C5852] block">RISCHIO POROSITÀ</span>
                    <span className="font-semibold text-[#141312] text-sm block">
                      Livello {diagnosticResult.porosityLevel}
                    </span>
                    <span className="text-[11px] text-[#5C5852] font-sans block mt-0.5">
                      {diagnosticResult.porosityRisk}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#5C5852] block">STRUTTURA &amp; TEXTURE</span>
                    <span className="font-semibold text-[#141312] text-sm block capitalize">
                      {diameter} • {texture}
                    </span>
                    <span className="text-[11px] text-[#5C5852] font-sans block mt-0.5">
                      {diagnosticResult.fiberAnalysis}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#5C5852] block">APPROCCIO DERMICO</span>
                    <span className="font-semibold text-[#141312] text-sm block capitalize">
                      Cute {scalp}
                    </span>
                    <span className="text-[11px] text-[#5C5852] font-sans block mt-0.5">
                      {diagnosticResult.scalpProtocol}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DED9D0] font-sans text-xs text-[#141312] leading-relaxed">
                  <strong className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] block mb-1">
                    STRATEGIA CROMATICA &amp; VOLUMETRICA:
                  </strong>
                  {diagnosticResult.chromaticStrategy}
                </div>
              </div>

              {/* 2. Protocollo Sartoriale Consigliato */}
              <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block border-b border-[#DED9D0] pb-2">
                  02 // PROTOCOLLO SARTORIALE CONSIGLIATO ({diagnosticResult.recommendedServices.length} SERVIZI)
                </span>

                <div className="divide-y divide-[#DED9D0]">
                  {diagnosticResult.recommendedServices.map((service, idx) => (
                    <div key={service.id} className="py-3.5 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] font-semibold text-[#8C5A3C] bg-[#EFECE6] px-1.5 py-0.5 border border-[#DED9D0]">
                            {service.code}
                          </span>
                          <span className="font-serif text-lg text-[#141312]">
                            {idx + 1}. {service.name}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-[#5C5852] leading-relaxed">
                          {service.shortDescription}
                        </p>
                        <p className="font-sans text-[11px] text-[#5C5852] italic mt-1 border-l-2 border-[#DED9D0] pl-2.5">
                          {service.technicalNotes}
                        </p>
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <span className="text-base font-semibold text-[#141312] block tabular-nums">
                          €{service.price}
                        </span>
                        <span className="text-xs text-[#5C5852] tabular-nums">
                          ⏱ {service.durationMinutes} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Specialista Assegnato & Rationale */}
              <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                  03 // STILISTA CONSIGLIATO PER QUESTO PROTOCOLLO
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#141312]">
                      {diagnosticResult.assignedStylist.name}
                    </h3>
                    <p className="font-mono text-xs text-[#8C5A3C] font-medium uppercase tracking-wider">
                      {diagnosticResult.assignedStylist.role} • {diagnosticResult.assignedStylist.experienceYears} anni d&apos;esperienza
                    </p>
                  </div>
                  <div className="font-mono text-xs text-[#5C5852] bg-[#F6F4F0] px-3 py-1.5 border border-[#DED9D0]">
                    SPECIALITÀ: {diagnosticResult.assignedStylist.specialty.split(",")[0]}
                  </div>
                </div>

                <p className="font-sans text-xs text-[#5C5852] leading-relaxed border-t border-[#DED9D0] pt-3 italic">
                  Motivazione assegnazione: &ldquo;{diagnosticResult.stylistRationale}&rdquo;
                </p>
              </div>

              {/* 4. Riepilogo Tecnico & Mantenimento */}
              <div className="border border-[#DED9D0] bg-[#141312] text-[#F6F4F0] p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs border-b border-[#2A2826] pb-6">
                  <div>
                    <span className="text-[10px] text-[#8C5A3C] uppercase tracking-widest block">
                      TEMPO TECNICO IN ATELIER
                    </span>
                    <span className="text-2xl font-semibold text-[#F6F4F0] block mt-1 tabular-nums">
                      {formattedDuration}
                    </span>
                    <span className="text-[11px] text-[#DED9D0]/60">Senza sovrapposizioni</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C5A3C] uppercase tracking-widest block">
                      INVESTIMENTO STIMATO
                    </span>
                    <span className="text-3xl font-semibold text-[#8C5A3C] block mt-1 tabular-nums">
                      €{diagnosticResult.totalPrice}
                    </span>
                    <span className="text-[11px] text-[#DED9D0]/60">Saldo in atelier post-seduta</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C5A3C] uppercase tracking-widest block">
                      CADENZA MANTENIMENTO
                    </span>
                    <span className="text-sm font-medium text-[#F6F4F0] block mt-1 font-sans">
                      {diagnosticResult.maintenanceAdvice}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block mb-1">
                    PRESCRIZIONE DI MANTENIMENTO A CASA:
                  </span>
                  <p className="font-sans text-xs text-[#DED9D0]/80 leading-relaxed">
                    {diagnosticResult.homeCarePrescription}
                  </p>
                </div>

                {/* 5. Primary CTAs */}
                <div className="pt-4 border-t border-[#2A2826] flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleApplyProtocolAndBook}
                    className="flex-1 bg-[#8C5A3C] text-[#F6F4F0] py-4 px-6 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#a66d4a] transition-colors text-center font-semibold"
                  >
                    Applica Protocollo e Prenota Ora →
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-[#2A2826] bg-[#1a1918] text-[#DED9D0] py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:border-[#8C5A3C] transition-colors text-center"
                  >
                    Ricalibra Diagnosi
                  </button>
                  <Link
                    href="/listino"
                    className="border border-[#2A2826] bg-[#1a1918] text-[#DED9D0] py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:border-[#8C5A3C] transition-colors text-center"
                  >
                    Vedi Listino
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
