"use client";

import React, { useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRitual, Booking } from "@/context/RitualContext";
import { STYLISTS, SERVICES, SALON_INFO, Service } from "@/lib/salon-data";

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
  const fromParam = searchParams.get("from");

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

  // Generate next 14 calendar days for interactive selection
  const calendarDays = useMemo(() => {
    const list: {
      dateStr: string;
      displayDayName: string;
      displayDayNumber: number;
      isOpen: boolean;
      hoursLabel: string;
    }[] = [];

    const now = new Date();
    const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const dayIdx = d.getDay();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const isOpen = dayIdx === 2 || dayIdx === 4 || dayIdx === 5 || dayIdx === 6;
      let hoursLabel = "Chiuso";
      if (dayIdx === 2) hoursLabel = "10:00–18:00";
      if (dayIdx === 4) hoursLabel = "09:00–18:00";
      if (dayIdx === 5 || dayIdx === 6) hoursLabel = "09:00–19:00";

      list.push({
        dateStr,
        displayDayName: dayNames[dayIdx],
        displayDayNumber: d.getDate(),
        isOpen,
        hoursLabel,
      });
    }

    return list;
  }, []);

  // Compute available time slots depending on day of week
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return ["10:30", "11:45", "14:00", "15:30", "17:00"];
    const d = new Date(selectedDate);
    const day = d.getDay();

    if (day === 2) {
      // Martedi: 10:00 - 18:00
      return ["10:00", "11:15", "12:30", "14:00", "15:15", "16:30"];
    } else if (day === 4) {
      // Giovedi: 09:00 - 18:00
      return ["09:30", "10:45", "12:00", "14:00", "15:15", "16:30"];
    } else if (day === 5 || day === 6) {
      // Venerdi & Sabato: 09:00 - 19:00
      return ["09:30", "11:00", "12:30", "14:00", "15:30", "16:45", "17:30"];
    }
    return ["10:30", "14:00", "16:00"];
  }, [selectedDate]);

  // Recommended quick add-on services that are not already selected
  const quickAddons: Service[] = useMemo(() => {
    const candidateIds = ["bagno-luce-gloss", "trattamento-detox-ossigenazione", "piega-editoriale-texturizzazione"];
    return candidateIds
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter((s): s is Service => Boolean(s))
      .filter((s) => !selectedServices.some((sel) => sel.id === s.id));
  }, [selectedServices]);

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
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="max-w-3xl pb-8 border-b border-[#DED9D0]">
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

      {/* From Consulenza Banner */}
      {fromParam === "consulenza" && !confirmedBooking && (
        <div className="mt-6 p-4 sm:p-5 bg-[#EFECE6] border border-[#8C5A3C] flex items-start gap-3">
          <span className="text-[#8C5A3C] font-mono text-base">✓</span>
          <div>
            <strong className="font-mono text-xs uppercase tracking-wider text-[#141312] block">
              Protocollo Diagnostico Applicato con Successo
            </strong>
            <p className="font-sans text-xs text-[#5C5852] mt-0.5">
              I servizi raccomandati e lo stilista designato sono stati pre-configurati in base alla tua Scheda Diagnostica. Puoi perfezionare data e orario preferito.
            </p>
          </div>
        </div>
      )}

      {confirmedBooking ? (
        /* Confirmation Ticket Voucher */
        <div className="mt-12 border-2 border-[#141312] bg-[#EFECE6] p-8 sm:p-12 text-[#141312] space-y-8 animate-fadeIn">
          {/* Voucher Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED9D0] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8C5A3C] font-semibold block mb-1">
                ✓ PRENOTAZIONE SARTORIALE REGISTRATA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141312]">
                Ti aspettiamo in Atelier, {confirmedBooking.clientName}
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono bg-[#F6F4F0] p-4 border border-[#DED9D0]">
              <span className="text-[10px] uppercase tracking-widest text-[#5C5852] block">
                CODICE ATELIER
              </span>
              <span className="text-2xl font-semibold text-[#8C5A3C]">
                {confirmedBooking.id}
              </span>
            </div>
          </div>

          {/* Core Info Triplet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                DATA &amp; ORA SEDUTA
              </span>
              <span className="font-medium text-lg text-[#141312] block">
                {confirmedBooking.date}
              </span>
              <span className="text-[#8C5A3C] font-semibold text-sm">
                Ore {confirmedBooking.time}
              </span>
            </div>

            <div className="p-5 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                STILISTA ASSEGNATO
              </span>
              <span className="font-medium text-lg text-[#141312] block">
                {confirmedBooking.stylistName}
              </span>
              <span className="text-[#5C5852]">Atelier Patrizia Russo</span>
            </div>

            <div className="p-5 bg-[#F6F4F0] border border-[#DED9D0]">
              <span className="text-[10px] text-[#5C5852] uppercase block tracking-wider mb-1">
                TEMPO &amp; INVESTIMENTO
              </span>
              <span className="font-medium text-lg text-[#8C5A3C] block">
                €{confirmedBooking.totalPrice}
              </span>
              <span className="text-[#5C5852]">
                Durata stimata: ~{confirmedBooking.totalDurationMinutes} min
              </span>
            </div>
          </div>

          {/* Services List */}
          <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
              PROTOCOLLO SERVIZI RISERVATI:
            </span>
            <ul className="divide-y divide-[#DED9D0] font-sans text-xs">
              {confirmedBooking.serviceNames.map((name, i) => (
                <li key={i} className="py-2.5 text-[#141312] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8C5A3C] font-mono font-medium">0{i + 1}.</span>
                    <span className="font-serif text-base">{name}</span>
                  </div>
                  <span className="font-mono text-[#5C5852]">Incluso</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Instructions */}
          <div className="p-6 bg-[#141312] text-[#F6F4F0] space-y-3 font-sans text-xs leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold block">
              INDICAZIONI LOGISTICHE ATELIER:
            </span>
            <p className="text-[#DED9D0]/90">
              L&apos;Atelier si trova in <strong>{SALON_INFO.address}</strong>. Ti accoglieremo con una tisana o caffè espresso e una consulenza preliminare di accoglienza prima di iniziare.
            </p>
            <p className="text-[#DED9D0]/70">
              In caso di variazioni o contrattempi, ti chiediamo la cortesia di avvisare la reception al numero <a href={SALON_INFO.phoneHref} className="text-[#8C5A3C] font-mono underline">{SALON_INFO.phone}</a> o via WhatsApp.
            </p>
          </div>

          {/* Voucher Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href={`https://wa.me/390112428978?text=${encodeURIComponent(`Buongiorno Atelier Russo, confermo la prenotazione ${confirmedBooking.id} a nome ${confirmedBooking.clientName} per il giorno ${confirmedBooking.date} alle ore ${confirmedBooking.time}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8C5A3C] text-[#F6F4F0] py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:bg-[#a66d4a] transition-colors text-center font-semibold"
            >
              Conferma via WhatsApp ↗
            </a>
            <Link
              href="/gestione"
              className="border border-[#141312] bg-[#141312] text-[#F6F4F0] py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors text-center"
            >
              Visualizza nel Registro Salone →
            </Link>
            <button
              onClick={() => window.print()}
              className="border border-[#DED9D0] bg-[#F6F4F0] text-[#141312] py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:bg-[#EFECE6] transition-colors text-center"
            >
              🖨 Stampa Promemoria
            </button>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="text-[#5C5852] font-mono text-xs uppercase hover:underline ml-auto"
            >
              Effettua Altra Prenotazione
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
                  01 // RITUALE SELEZIONATO ({selectedServices.length})
                </span>
                <Link
                  href="/listino"
                  className="font-mono text-[10px] text-[#5C5852] hover:text-[#141312] underline underline-offset-2 uppercase"
                >
                  + Sfoglia Listino Completo
                </Link>
              </div>

              {selectedServices.length === 0 ? (
                <div className="py-8 text-center border border-dashed border-[#DED9D0] p-6">
                  <p className="font-serif italic text-lg text-[#141312] mb-2">
                    Il tuo vassoio rituale è attualmente vuoto.
                  </p>
                  <p className="font-sans text-xs text-[#5C5852] mb-4">
                    Seleziona uno dei nostri servizi signature per iniziare:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SERVICES.slice(0, 4).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => addService(s)}
                        className="font-mono text-xs border border-[#141312] bg-[#EFECE6] px-3.5 py-2 hover:bg-[#141312] hover:text-[#F6F4F0] transition-colors"
                      >
                        + {s.name} (€{s.price})
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="divide-y divide-[#DED9D0]">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="py-3 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-[#8C5A3C] font-semibold mr-2 bg-[#EFECE6] px-1.5 py-0.5 border border-[#DED9D0]">
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
                            title="Rimuovi dal rituale"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Add-ons bar */}
                  {quickAddons.length > 0 && (
                    <div className="pt-3 border-t border-[#DED9D0]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#5C5852] block mb-2">
                        SUGGERITI IN ABBINAMENTO:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {quickAddons.map((addon) => (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => addService(addon)}
                            className="font-mono text-[11px] bg-[#EFECE6] border border-[#DED9D0] px-2.5 py-1 text-[#141312] hover:border-[#8C5A3C] hover:text-[#8C5A3C] transition-colors"
                          >
                            + {addon.name} (+€{addon.price})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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

            {/* 3. Interactive Date & Calendar Selection */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#DED9D0] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8C5A3C] font-semibold">
                  03 // CALENDARIO ATELIER &amp; FASCIA ORARIA
                </span>
                <span className="font-mono text-[10px] text-[#5C5852]">
                  LUN, MER, DOM: CHIUSO
                </span>
              </div>

              {/* 14-Day Calendar Strip */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-2">
                  Seleziona la data (prossimi 14 giorni):
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {calendarDays.map((cd) => {
                    const isSelected = selectedDate === cd.dateStr;
                    return (
                      <button
                        key={cd.dateStr}
                        type="button"
                        disabled={!cd.isOpen}
                        onClick={() => cd.isOpen && setSelectedDate(cd.dateStr)}
                        className={`p-2 text-center border font-mono transition-all ${
                          !cd.isOpen
                            ? "bg-[#EFECE6]/40 text-[#5C5852]/40 border-[#DED9D0]/60 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-[#141312] text-[#F6F4F0] border-[#141312] shadow-sm"
                            : "bg-[#EFECE6] text-[#141312] border-[#DED9D0] hover:border-[#8C5A3C]"
                        }`}
                      >
                        <span className="text-[10px] uppercase block opacity-80">{cd.displayDayName}</span>
                        <strong className="text-base block">{cd.displayDayNumber}</strong>
                        <span className="text-[9px] block mt-0.5 truncate">{cd.isOpen ? "Aperto" : "Chiuso"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Available Time Slots Grid */}
              <div className="pt-2">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5C5852] mb-2">
                  Fascia oraria per {selectedDate || "la data scelta"}:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableTimeSlots.map((time) => {
                    const isTimeSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 font-mono text-xs uppercase border transition-colors text-center ${
                          isTimeSelected
                            ? "bg-[#8C5A3C] text-[#F6F4F0] border-[#8C5A3C] font-semibold"
                            : "bg-[#EFECE6] text-[#141312] border-[#DED9D0] hover:border-[#141312]"
                        }`}
                      >
                        Ore {time}
                      </button>
                    );
                  })}
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
                * Nessun anticipo monetario richiesto. Il saldo avviene direttamente in atelier dopo l&apos;esecuzione del rituale.
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
