"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRitual, Booking } from "@/context/RitualContext";
import { STYLISTS, SERVICES, SALON_INFO } from "@/lib/salon-data";

function getInitialBookingDate(): string {
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const candidate = new Date();
    candidate.setDate(today.getDate() + i);
    const day = candidate.getDay();
    if (day === 2 || day === 4 || day === 5 || day === 6) {
      const yyyy = candidate.getFullYear();
      const mm = String(candidate.getMonth() + 1).padStart(2, "0");
      const dd = String(candidate.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
  }
  return "";
}

function PrenotaContent() {
  const searchParams = useSearchParams();
  const stylistParam = searchParams.get("stylist");
  const noteParam = searchParams.get("note");

  const {
    selectedServices,
    addService,
    removeService,
    totalPrice,
    totalDurationMinutes,
    clearServices,
    addBooking,
  } = useRitual();

  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    stylistParam || "patrizia-russo"
  );
  const [selectedDate, setSelectedDate] = useState<string>(getInitialBookingDate);
  const [selectedTime, setSelectedTime] = useState<string>("10:30");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>(noteParam || "");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const availableTimeSlots = [
    "09:30",
    "10:30",
    "11:45",
    "14:00",
    "15:30",
    "16:45",
    "17:30",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert("Seleziona almeno un servizio per procedere alla prenotazione.");
      return;
    }

    const stylistObj = STYLISTS.find((s) => s.id === selectedStylistId);
    const stylistName = stylistObj ? stylistObj.name : "Primo Stilista Disponibile";

    const newBooking = addBooking({
      clientName,
      clientPhone,
      clientEmail,
      stylistId: selectedStylistId,
      stylistName,
      serviceIds: selectedServices.map((s) => s.id),
      serviceNames: selectedServices.map((s) => s.name),
      totalPrice,
      totalDurationMinutes,
      date: selectedDate,
      time: selectedTime,
      notes,
      status: "confermato",
    });

    setConfirmedBooking(newBooking);
    clearServices();
  };

  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes} min`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="max-w-3xl pb-10 border-b border-[#DED9D0]">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-3 font-semibold">
          <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
          <span>SISTEMA PRENOTAZIONI SARTORIALI • TORINO</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
          Riserva il Tuo Rituale in Atelier
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-3 leading-relaxed">
          Per garantire ad ogni cliente il silenzio, il tempo e la meticolosità necessari, le sedute vengono pianificate con spazi orari generosi e senza sovrapposizioni.
        </p>
      </div>

      {confirmedBooking ? (
        /* Confirmation Ticket Card */
        <div className="mt-12 border border-[#8C5A3C] bg-[#EFECE6] p-8 sm:p-12 text-[#141312] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED9D0] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8C5A3C] font-semibold block">
                ✓ RITUALE PRENOTATO &amp; CONFERMATO
              </span>
              <h2 className="font-serif text-3xl text-[#141312] mt-1">
                Ti aspettiamo in Atelier, {confirmedBooking.clientName}
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#5C5852] block">
                CODICE CONFERMA
              </span>
              <span className="text-xl font-semibold text-[#8C5A3C]">
                {confirmedBooking.id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                DATA &amp; ORA
              </span>
              <span className="font-medium text-base text-[#141312] block">
                {confirmedBooking.date}
              </span>
              <span className="text-[#8C5A3C] font-semibold">
                Ore {confirmedBooking.time}
              </span>
            </div>

            <div className="p-4 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                STILISTA DEDICATO
              </span>
              <span className="font-medium text-base text-[#141312] block">
                {confirmedBooking.stylistName}
              </span>
              <span className="text-[#5C5852]">Atelier Patrizia Russo</span>
            </div>

            <div className="p-4 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                TEMPO &amp; INVESTIMENTO
              </span>
              <span className="font-medium text-base text-[#141312] block">
                €{confirmedBooking.totalPrice}
              </span>
              <span className="text-[#5C5852]">
                Durata: ~{confirmedBooking.totalDurationMinutes} min
              </span>
            </div>
          </div>

          <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
              SERVIZI INCLUSI NELLA SEDUTA:
            </span>
            <ul className="divide-y divide-[#DED9D0] font-sans text-xs">
              {confirmedBooking.serviceNames.map((name, i) => (
                <li key={i} className="py-2 text-[#141312] flex items-center gap-2">
                  <span className="text-[#8C5A3C] font-mono">0{i + 1}.</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#5C5852] leading-relaxed border-t border-[#DED9D0] pt-6">
            <p>
              <strong>Promemoria:</strong> L&apos;Atelier si trova in {SALON_INFO.address}. In caso di ritardo o necessità di posticipare l&apos;appuntamento, ti preghiamo di avvisare telefonicamente al numero <strong className="text-[#141312] font-mono">{SALON_INFO.phone}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/gestione"
              className="bg-[#141312] text-[#F6F4F0] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors text-center"
            >
              Visualizza nel Registro Salone →
            </Link>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="border border-[#DED9D0] bg-transparent text-[#141312] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#F6F4F0] transition-colors text-center"
            >
              Nuova Prenotazione
            </button>
          </div>
        </div>
      ) : (
        /* Multi-Step Reservation Grid */
        <form onSubmit={handleBookingSubmit} className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (7 cols): Configuration */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Services Tray Check */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED9D0] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8C5A3C] font-semibold">
                  01 // RITUALE SELEZIONATO
                </span>
                <Link
                  href="/listino"
                  className="font-mono text-[10px] text-[#5C5852] hover:text-[#141312] underline underline-offset-2 uppercase"
                >
                  + Modifica da Listino
                </Link>
              </div>

              {selectedServices.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="font-serif italic text-base text-[#5C5852] mb-3">
                    Nessun servizio nel vassoio. Scegli uno o più servizi di base:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SERVICES.slice(0, 4).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => addService(s)}
                        className="font-mono text-xs border border-[#DED9D0] bg-[#EFECE6] px-3 py-1.5 hover:border-[#141312] transition-colors"
                      >
                        + {s.name} (€{s.price})
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#DED9D0]">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono text-[10px] text-[#8C5A3C] font-semibold mr-2">
                          {service.code}
                        </span>
                        <span className="font-serif text-base text-[#141312]">
                          {service.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-medium text-[#141312]">
                          €{service.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="font-mono text-[#5C5852] hover:text-[#8C5A3C]"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Stylist Selection */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C5A3C] font-semibold block border-b border-[#DED9D0] pb-3">
                02 // SCELTA DELLO STILISTA
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STYLISTS.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`p-4 text-left border transition-all ${
                      selectedStylistId === st.id
                        ? "bg-[#EFECE6] border-[#8C5A3C]"
                        : "bg-[#F6F4F0] border-[#DED9D0] hover:border-[#141312]"
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C5A3C] block mb-1">
                      {st.id === "patrizia-russo" ? "DIREZIONE" : "SENIOR STYLIST"}
                    </span>
                    <strong className="font-serif text-lg text-[#141312] block">
                      {st.name}
                    </strong>
                    <span className="font-sans text-[11px] text-[#5C5852] line-clamp-2 mt-1 block">
                      {st.specialty}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date & Time Selection */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C5A3C] font-semibold block border-b border-[#DED9D0] pb-3">
                03 // DATA &amp; FASCIA ORARIA DESIDERATA
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                    Data Appuntamento (Mar, Gio, Ven, Sab) *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-mono text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                  />
                  <span className="text-[10px] text-[#5C5852] font-sans mt-1 block italic">
                    * Lunedì, Mercoledì e Domenica l&apos;atelier è chiuso.
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                    Fascia Oraria *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-mono text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                  >
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        Ore {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Client Contact Details */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C5A3C] font-semibold block border-b border-[#DED9D0] pb-3">
                04 // DATI DELL&apos;OSPITE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                    Nome &amp; Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Es. Silvia Rossi"
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                    Telefono Cellulare *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Es. 333 1234567"
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                  Indirizzo Email *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="es. silvia.rossi@gmail.com"
                  className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2.5 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-1">
                  Note Fisionomiche / Desiderata particolari
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Es. Desidero schiariture calde dorate, lunghezza alle spalle, capello fine..."
                  className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2 font-sans text-xs text-[#141312] focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Summary Ledger */}
          <div className="lg:col-span-5">
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 sm:p-8 space-y-6 sticky top-28">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block mb-1">
                  RIASSUNTO PRENOTAZIONE
                </span>
                <h3 className="font-serif text-2xl text-[#141312]">
                  Il Tuo Piano Seduta
                </h3>
              </div>

              <div className="space-y-3 border-t border-b border-[#DED9D0] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#5C5852]">STILISTA:</span>
                  <span className="text-[#141312] font-semibold">
                    {STYLISTS.find((s) => s.id === selectedStylistId)?.name || "Non specificato"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C5852]">DATA:</span>
                  <span className="text-[#141312]">{selectedDate || "Da selezionare"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C5852]">ORA:</span>
                  <span className="text-[#141312]">Ore {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C5852]">TEMPO TOTALE:</span>
                  <span className="text-[#141312]">{formattedDuration}</span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-[#DED9D0]">
                  <span className="text-[#141312] font-semibold">TOTALE STIMATO:</span>
                  <span className="text-[#8C5A3C] font-semibold text-xl">
                    €{totalPrice}
                  </span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#5C5852] italic leading-relaxed">
                * Nessun pagamento anticipato richiesto. Il saldo avviene direttamente in atelier dopo l&apos;esecuzione del rituale.
              </p>

              <button
                type="submit"
                disabled={selectedServices.length === 0}
                className={`w-full py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors border ${
                  selectedServices.length > 0
                    ? "bg-[#141312] text-[#F6F4F0] border-[#141312] hover:bg-[#8C5A3C] hover:border-[#8C5A3C]"
                    : "bg-[#DED9D0] text-[#5C5852] border-[#DED9D0] cursor-not-allowed"
                }`}
              >
                Conferma Prenotazione →
              </button>

              <div className="pt-2 text-center">
                <span className="font-mono text-[10px] text-[#5C5852] uppercase block">
                  HAI DUBBI SULLA PRENOTAZIONE?
                </span>
                <a
                  href={SALON_INFO.phoneHref}
                  className="font-mono text-xs text-[#8C5A3C] hover:underline"
                >
                  Chiama la Reception: {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function PrenotaPage() {
  return (
    <div className="bg-[#F6F4F0] min-h-screen py-14 sm:py-20">
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto px-4 py-20 text-center font-mono text-xs text-[#5C5852]">
            CARICAMENTO ATELIER DI PRENOTAZIONE...
          </div>
        }
      >
        <PrenotaContent />
      </Suspense>
    </div>
  );
}
