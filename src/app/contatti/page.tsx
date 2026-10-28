"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SALON_INFO, getSalonCurrentStatus } from "@/lib/salon-data";
import SalonLiveIndicator from "@/components/SalonLiveIndicator";
import { useRitual, InquiryType, SalonInquiry } from "@/context/RitualContext";

export default function ContattiPage() {
  const { addInquiry } = useRitual();

  const [submittedInquiry, setSubmittedInquiry] = useState<SalonInquiry | null>(null);
  const [mapColorMode, setMapColorMode] = useState<boolean>(false);

  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [tipologia, setTipologia] = useState<InquiryType>("correzione_colore");
  const [dataOrientativa, setDataOrientativa] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const status = getSalonCurrentStatus();

  // Determine current day in Rome (0 Sun, 1 Mon, ..., 6 Sat)
  const todayDayIndex = useMemo(() => {
    const romeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Rome",
      weekday: "short",
    });
    const weekdayShort = romeFormatter.format(new Date());
    const dayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    return dayMap[weekdayShort] ?? new Date().getDay();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inq = addInquiry({
      name: nome,
      phone: telefono,
      email,
      requestType: tipologia,
      preferredDate: dataOrientativa,
      message: messaggio,
    });

    setSubmittedInquiry(inq);
  };

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl pb-10 border-b border-[#DED9D0]">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-4 font-semibold">
            <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
            <span>RECAPITI, ORARI &amp; SPORTELLO DIGITALE ATELIER</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#141312] tracking-tight">
            Contatti, Orari &amp; Posizione a Torino
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-3 leading-relaxed">
            Situato nel quartiere Lucento in Corso Lucio Quinzio Cincinnato 256. Riceviamo su appuntamento per riservare ad ogni cliente una postazione esclusiva senza attese.
          </p>
        </div>

        {/* 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (6 cols): Timetable & Arrival Guide */}
          <div className="lg:col-span-6 space-y-8">
            {/* Live Status Hero Card */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED9D0] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold">
                  STATO IN TEMPO REALE // EUROPE/ROME
                </span>
                <SalonLiveIndicator />
              </div>
              <p className="font-serif text-xl sm:text-2xl text-[#141312]">
                {status.statusText}
              </p>
              <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href={SALON_INFO.phoneHref}
                  className="bg-[#141312] text-[#F6F4F0] px-5 py-3 hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  Chiama l&apos;Atelier: {SALON_INFO.phone}
                </a>
                <a
                  href={SALON_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-[#141312] px-5 py-3 border border-[#DED9D0] hover:bg-[#F6F4F0] transition-colors"
                >
                  WhatsApp Reception ↗
                </a>
              </div>
            </div>

            {/* Complete Weekly Schedule Ledger with TODAY Highlight */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED9D0] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                  ORARI DI APERTURA ATELIER (SETTIMANALI)
                </span>
                <span className="font-mono text-[10px] text-[#5C5852] uppercase">
                  ORARIO CONTINUATO
                </span>
              </div>

              <div className="border border-[#DED9D0] divide-y divide-[#DED9D0] font-mono text-xs">
                {SALON_INFO.schedule.map((slot) => {
                  const isToday = slot.dayIndex === todayDayIndex;

                  return (
                    <div
                      key={slot.dayName}
                      className={`flex items-center justify-between p-3.5 transition-colors ${
                        isToday
                          ? "bg-[#141312] text-[#F6F4F0]"
                          : "hover:bg-[#EFECE6]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="uppercase font-medium tracking-wide">
                          {slot.dayName}
                        </span>
                        {isToday && (
                          <span className="bg-[#8C5A3C] text-[#F6F4F0] text-[9px] uppercase px-1.5 py-0.5 font-semibold">
                            OGGI
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`tabular-nums ${
                            slot.isClosed
                              ? isToday
                                ? "text-[#DED9D0]/70 italic"
                                : "text-[#5C5852] italic"
                              : isToday
                              ? "text-[#F6F4F0] font-semibold"
                              : "text-[#8C5A3C] font-semibold"
                          }`}
                        >
                          {slot.isClosed ? "Chiuso" : `${slot.openTime} – ${slot.closeTime}`}
                        </span>
                        {isToday && (
                          <span
                            className={`w-2 h-2 ${
                              status.isOpen ? "bg-[#2E7D32]" : "bg-[#8C5A3C]"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="font-sans text-[11px] text-[#5C5852] leading-relaxed italic">
                * Le aperture del giovedì, venerdì e sabato adottano orario continuato per agevolare rituali complessi di schiaritura e acconciature sposa.
              </p>
            </div>

            {/* Quartiere Lucento Urban Guide */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                GUIDA D&apos;ACCESSO URBANISTICO • TORINO LUCENTO
              </span>

              <div className="space-y-4 font-sans text-xs text-[#5C5852] leading-relaxed">
                <div>
                  <strong className="font-mono text-[11px] text-[#141312] uppercase block mb-0.5">
                    1. IN AUTOMOBILE (TANGENZIALE NORD &amp; CENTRO TORINO)
                  </strong>
                  Dalla Tangenziale Nord uscire a <em>Venaria Reale</em> o <em>Corso Regina Margherita</em>. Proseguire lungo Corso Lucio Quinzio Cincinnato fino al civico 256 (lato est). Ampia disponibilità di sosta gratuita lungo il controviale alberato antistante l&apos;Atelier.
                </div>

                <div>
                  <strong className="font-mono text-[11px] text-[#141312] uppercase block mb-0.5">
                    2. TRASPORTO PUBBLICO URBANO GTT
                  </strong>
                  Fermata <em>Cincinnato</em> a meno di 80 metri. Servita direttamente dalle linee tram/bus <strong>3</strong>, <strong>29</strong> e <strong>59</strong>. Collegamento diretto con la stazione ferroviaria di <strong>Torino Porta Susa</strong> in circa 18 minuti.
                </div>

                <div>
                  <strong className="font-mono text-[11px] text-[#141312] uppercase block mb-0.5">
                    3. PERCORSO DALLA REGGIA DI VENARIA
                  </strong>
                  A soli 7 minuti d&apos;auto dalla Reggia di Venaria, comodo per prove acconciatura di matrimoni e cerimonie celebrate nel polo monumentale sabaudo.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Interactive Map & Inquiry Desk */}
          <div className="lg:col-span-6 space-y-8">
            {/* Interactive Map with Monochrome/Color Toggle */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] overflow-hidden">
              <div className="p-4 bg-[#EFECE6] border-b border-[#DED9D0] flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#8C5A3C] font-semibold uppercase">
                    CORSO CINCINNATO 256, TORINO
                  </span>
                  <button
                    onClick={() => setMapColorMode(!mapColorMode)}
                    className="underline text-[#5C5852] hover:text-[#141312]"
                  >
                    {mapColorMode ? "[Vista Editoriale]" : "[Vista Colore]"}
                  </button>
                </div>
                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#141312] hover:text-[#8C5A3C] underline uppercase"
                >
                  Navigatore Google Maps ↗
                </a>
              </div>

              <div className="h-72 w-full bg-[#DED9D0] relative">
                <iframe
                  title="Posizione RUSSO Equipe Parrucchieri Torino"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.324391218529!2d7.653158776632426!3d45.10091877107056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886df70783935b%3A0xbdd3543d4cba7e7a!2sCorso%20Lucio%20Quinzio%20Cincinnato%2C%20256%2C%2010151%20Torino%20TO!5e0!3m2!1sit!2sit!4v1714000000000!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: mapColorMode
                      ? "none"
                      : "grayscale(1) contrast(1.2) sepia(0.1)",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Functional Concierge & Bridal/Color Inquiry Form */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#DED9D0] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                  SPORTELLO CONSULENZA DIRETTA &amp; CONCIERGE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#141312] mt-1">
                  Richiesta Tecnica o Preventivo Sposa
                </h3>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  Hai un caso di colore complesso, una richiesta per nozze o desideri essere richiamata da Patrizia Russo? Compila il modulo: la richiesta verrà trasmessa all&apos;agenda interna del salone.
                </p>
              </div>

              {submittedInquiry ? (
                <div className="p-6 bg-[#EFECE6] border-2 border-[#8C5A3C] space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#DED9D0] pb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8C5A3C] font-semibold">
                      ✓ RICHIESTA PROTOCOLLATA
                    </span>
                    <span className="font-mono text-xs text-[#141312] font-semibold">
                      {submittedInquiry.id}
                    </span>
                  </div>

                  <p className="font-serif text-xl text-[#141312]">
                    Grazie {submittedInquiry.name}. La tua richiesta è stata registrata nello sportello concierge dell&apos;Atelier.
                  </p>

                  <p className="font-sans text-xs text-[#5C5852] leading-relaxed">
                    Il nostro team prenderà in esame il tuo messaggio tecnico e ti ricontatterà al recapito <strong>{submittedInquiry.phone}</strong>.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/gestione"
                      className="bg-[#141312] text-[#F6F4F0] px-4 py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors text-center"
                    >
                      Verifica nel Registro Gestione →
                    </Link>
                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="border border-[#DED9D0] bg-transparent text-[#141312] px-4 py-2.5 font-mono text-xs uppercase hover:bg-[#F6F4F0]"
                    >
                      Invia Altro Messaggio
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Es. Valentina Moretti"
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                        Recapito Telefonico *
                      </label>
                      <input
                        type="tel"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Es. 333 4567890"
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs font-mono text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                        Indirizzo Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="es. valentina.moretti@email.it"
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                        Tipologia di Richiesta *
                      </label>
                      <select
                        value={tipologia}
                        onChange={(e) => setTipologia(e.target.value as InquiryType)}
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs font-mono text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                      >
                        <option value="correzione_colore">Correzione Colore Complessa</option>
                        <option value="sposa_cerimonia">Consulenza Sposa &amp; Cerimonia</option>
                        <option value="richiamata">Richiesta Richiamata Telefonica</option>
                        <option value="altro">Informazioni Generali / Altro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Data Preferita Orientativa (Opzionale)
                    </label>
                    <input
                      type="date"
                      value={dataOrientativa}
                      onChange={(e) => setDataOrientativa(e.target.value)}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs font-mono text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Messaggio Tecnico o Dettaglio Esigenza *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={messaggio}
                      onChange={(e) => setMessaggio(e.target.value)}
                      placeholder="Descrivi la lunghezza attuale dei tuoi capelli, trattamenti pregressi o data dell'evento..."
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2.5 text-xs text-[#141312] rounded-none focus:outline-hidden focus:border-[#8C5A3C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#141312] text-[#F6F4F0] py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                  >
                    Invia Richiesta allo Sportello Salone →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
