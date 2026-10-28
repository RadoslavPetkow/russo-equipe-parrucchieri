"use client";

import React, { useState } from "react";
import { SALON_INFO, getSalonCurrentStatus } from "@/lib/salon-data";
import SalonLiveIndicator from "@/components/SalonLiveIndicator";

export default function ContattiPage() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    email: "",
    messaggio: "",
    argomento: "informazioni",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const status = getSalonCurrentStatus();

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl pb-12 border-b border-[#DED9D0]">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-4 font-semibold">
            <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
            <span>RECAPITI &amp; LOCALIZZAZIONE ATELIER</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#141312] tracking-tight">
            Contatti &amp; Visita in Atelier
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-4 leading-relaxed">
            Situato in Corso Lucio Quinzio Cincinnato 256 a Torino, nel quartiere Lucento. Riceviamo su appuntamento per riservare a ciascun ospite la massima concentrazione tecnica e un ambiente ovattato.
          </p>
        </div>

        {/* 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Left Column (6 cols): Direct Channels & Hours */}
          <div className="lg:col-span-6 space-y-8">
            {/* Live Status Card */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED9D0] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold">
                  STATO IN TEMPO REALE
                </span>
                <SalonLiveIndicator />
              </div>
              <p className="font-serif text-xl text-[#141312]">
                {status.statusText}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <a
                  href={SALON_INFO.phoneHref}
                  className="bg-[#141312] text-[#F6F4F0] px-5 py-3 hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  Chiama Atelier: {SALON_INFO.phone}
                </a>
                <a
                  href={SALON_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-[#141312] px-5 py-3 border border-[#DED9D0] hover:bg-[#F6F4F0] transition-colors"
                >
                  Scrivi su WhatsApp ↗
                </a>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                TABELLA ORARI DI RICEVIMENTO
              </span>

              <div className="border border-[#DED9D0] divide-y divide-[#DED9D0] font-mono text-xs">
                {SALON_INFO.schedule.map((slot) => (
                  <div
                    key={slot.dayName}
                    className="flex items-center justify-between p-3"
                  >
                    <span className="uppercase text-[#141312] font-medium">{slot.dayName}</span>
                    <span
                      className={`tabular-nums ${
                        slot.isClosed ? "text-[#5C5852] italic" : "text-[#8C5A3C] font-semibold"
                      }`}
                    >
                      {slot.isClosed ? "Chiuso per riposo / aggiornamento" : `${slot.openTime} – ${slot.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Reach & Parking */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                COME RAGGIUNGERE L&apos;ATELIER A TORINO
              </span>
              <ul className="space-y-3 font-sans text-xs text-[#5C5852] leading-relaxed">
                <li>
                  <strong className="font-mono text-[11px] text-[#141312] block">IN AUTO DALLA TANGENZIALE NORD:</strong>
                  Uscita Venaria Reale o Corso Regina Margherita; proseguire lungo Corso Cincinnato verso Madonna di Campagna / Lucento. Ampia facilità di sosta su viale alberato.
                </li>
                <li>
                  <strong className="font-mono text-[11px] text-[#141312] block">MEZZI PUBBLICI GTT:</strong>
                  Linee 3, 29 e 59 con fermata a pochi passi dal civico 256. Collegamento rapido con la stazione ferroviaria di Torino Porta Susa (circa 18 minuti).
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (6 cols): Map & Inquiry Form */}
          <div className="lg:col-span-6 space-y-8">
            {/* Interactive Map Frame */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] overflow-hidden">
              <div className="p-4 bg-[#EFECE6] border-b border-[#DED9D0] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#8C5A3C] font-semibold uppercase">MAPPA DI TORINO LUCENTO</span>
                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#141312] hover:text-[#8C5A3C] underline"
                >
                  Apri in Google Maps ↗
                </a>
              </div>
              <div className="h-72 w-full bg-[#DED9D0] relative">
                <iframe
                  title="Posizione RUSSO Equipe Parrucchieri Torino"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.324391218529!2d7.653158776632426!3d45.10091877107056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886df70783935b%3A0xbdd3543d4cba7e7a!2sCorso%20Lucio%20Quinzio%20Cincinnato%2C%20256%2C%2010151%20Torino%20TO!5e0!3m2!1sit!2sit!4v1714000000000!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.6) contrast(1.1)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                  CONTATTO DIRETTO ALLA RECEPTION
                </span>
                <h3 className="font-serif text-2xl text-[#141312] mt-1">
                  Invia una Richiesta all&apos;Atelier
                </h3>
                <p className="font-sans text-xs text-[#5C5852] mt-1">
                  Per appuntamenti urgenti consigliamo sempre la chiamata telefonica diretta allo 011 242 8978.
                </p>
              </div>

              {formSent ? (
                <div className="p-6 bg-[#EFECE6] border border-[#8C5A3C] text-center space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                    ✓ MESSAGGIO TRASMESSO CON SUCCESSO
                  </span>
                  <p className="font-serif text-lg text-[#141312]">
                    Grazie {formData.nome}. La reception di Patrizia Russo ti ricontatterà entro la giornata lavorativa.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormData({ nome: "", telefono: "", email: "", messaggio: "", argomento: "informazioni" });
                    }}
                    className="font-mono text-xs text-[#8C5A3C] hover:underline"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                        Nome &amp; Cognome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                        placeholder="Es. Elena Rossi"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                        Recapito Telefonico *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                        placeholder="Es. 333 1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                      placeholder="es. elena.rossi@email.it"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                      Argomento della richiesta
                    </label>
                    <select
                      value={formData.argomento}
                      onChange={(e) => setFormData({ ...formData, argomento: e.target.value })}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-mono text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                    >
                      <option value="informazioni">Informazioni generali sui servizi</option>
                      <option value="balayage">Consulenza preliminare Balayage</option>
                      <option value="sposa">Servizio Sposa &amp; Acconciatura Nozze</option>
                      <option value="correzione">Correzione colore pregresso</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                      Note / Domande specifiche
                    </label>
                    <textarea
                      rows={3}
                      value={formData.messaggio}
                      onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                      placeholder="Descrivi la lunghezza attuale dei tuoi capelli o cosa desideri concordare..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#141312] text-[#F6F4F0] py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                  >
                    Invia Richiesta all&apos;Atelier →
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
