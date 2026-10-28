"use client";

import React, { useState, useMemo } from "react";
import {
  useRitual,
  BookingStatus,
} from "@/context/RitualContext";
import { STYLISTS, SERVICES } from "@/lib/salon-data";
import SalonLiveIndicator from "@/components/SalonLiveIndicator";

type ActiveTab = "agenda" | "crm" | "inbox";

export default function GestionePage() {
  const {
    bookings,
    updateBookingStatus,
    deleteBooking,
    addBooking,
    clientCards,
    addClientCard,
    updateClientCard,
    deleteClientCard,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    resetDemoData,
    exportBookingsCSV,
  } = useRitual();

  const [activeTab, setActiveTab] = useState<ActiveTab>("agenda");

  // Tab 1 (Agenda) state
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stylistFilter, setStylistFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddBookingModal, setShowAddBookingModal] = useState<boolean>(false);

  // New Phone Booking Form State
  const [newBookClient, setNewBookClient] = useState("");
  const [newBookPhone, setNewBookPhone] = useState("");
  const [newBookEmail, setNewBookEmail] = useState("");
  const [newBookStylist, setNewBookStylist] = useState("patrizia-russo");
  const [newBookDate, setNewBookDate] = useState("2026-10-31");
  const [newBookTime, setNewBookTime] = useState("10:30");
  const [newBookServices, setNewBookServices] = useState<string[]>(["balayage-sartoriale"]);
  const [newBookNotes, setNewBookNotes] = useState("");

  // Tab 2 (CRM) state
  const [crmSearch, setCrmSearch] = useState<string>("");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedFormula, setEditedFormula] = useState<string>("");
  const [editedNotes, setEditedNotes] = useState<string>("");
  const [showNewCardModal, setShowNewCardModal] = useState<boolean>(false);

  // New Client Card Form State
  const [newCardName, setNewCardName] = useState("");
  const [newCardPhone, setNewCardPhone] = useState("");
  const [newCardEmail, setNewCardEmail] = useState("");
  const [newCardBase, setNewCardBase] = useState("Livello 6 — Castano Chiaro");
  const [newCardWhite, setNewCardWhite] = useState("10%");
  const [newCardFormula, setNewCardFormula] = useState("");
  const [newCardScalp, setNewCardScalp] = useState("Equilibrata");
  const [newCardHistory, setNewCardHistory] = useState("");
  const [newCardNotes, setNewCardNotes] = useState("");

  // Tab 3 (Inbox) state
  const [inboxStatusFilter, setInboxStatusFilter] = useState<"all" | "nuova" | "gestita">("all");

  // Executive Metrics (Live Computed)
  const executiveMetrics = useMemo(() => {
    const activeBookings = bookings.filter((b) => b.status !== "annullato");
    const totalRevenue = activeBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const avgTicket = activeBookings.length > 0 ? Math.round(totalRevenue / activeBookings.length) : 0;
    const totalMinutes = activeBookings.reduce((sum, b) => sum + b.totalDurationMinutes, 0);

    // Stylist workload distribution
    const patriziaCount = activeBookings.filter((b) => b.stylistId === "patrizia-russo").length;
    const elenaCount = activeBookings.filter((b) => b.stylistId === "elena-v").length;
    const marcoCount = activeBookings.filter((b) => b.stylistId === "marco-d").length;

    return {
      totalRevenue,
      avgTicket,
      totalMinutes,
      totalHours: Math.floor(totalMinutes / 60),
      remainingMinutes: totalMinutes % 60,
      patriziaCount,
      elenaCount,
      marcoCount,
      totalActive: activeBookings.length,
      newInquiriesCount: inquiries.filter((inq) => inq.status === "nuova").length,
    };
  }, [bookings, inquiries]);

  // Filtered Bookings for Tab 1
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (stylistFilter !== "all" && b.stylistId !== stylistFilter) return false;
      if (dateFilter && b.date !== dateFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.clientName.toLowerCase().includes(q) ||
          b.clientPhone.includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.stylistName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [bookings, statusFilter, stylistFilter, dateFilter, searchQuery]);

  // Filtered Client Cards for Tab 2
  const filteredClientCards = useMemo(() => {
    if (!crmSearch.trim()) return clientCards;
    const q = crmSearch.toLowerCase();
    return clientCards.filter(
      (c) =>
        c.clientName.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.formulaAbituale.toLowerCase().includes(q) ||
        c.naturalBase.toLowerCase().includes(q)
    );
  }, [clientCards, crmSearch]);

  // Filtered Inquiries for Tab 3
  const filteredInquiries = useMemo(() => {
    if (inboxStatusFilter === "all") return inquiries;
    return inquiries.filter((inq) => inq.status === inboxStatusFilter);
  }, [inquiries, inboxStatusFilter]);

  // Submit manual phone booking
  const handleCreatePhoneBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookServices.length === 0) {
      alert("Seleziona almeno un servizio per l'appuntamento.");
      return;
    }

    const stylistObj = STYLISTS.find((s) => s.id === newBookStylist);
    const resolvedServices = newBookServices
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter((s): s is (typeof SERVICES)[0] => Boolean(s));

    const price = resolvedServices.reduce((sum, s) => sum + s.price, 0);
    const duration = resolvedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

    addBooking({
      clientName: newBookClient,
      clientPhone: newBookPhone,
      clientEmail: newBookEmail || "prenotazione.telefonica@russoequipe.it",
      stylistId: newBookStylist,
      stylistName: stylistObj?.name || "Patrizia Russo",
      serviceIds: resolvedServices.map((s) => s.id),
      serviceNames: resolvedServices.map((s) => s.name),
      totalPrice: price,
      totalDurationMinutes: duration,
      date: newBookDate,
      time: newBookTime,
      notes: newBookNotes ? `[TELEFONICO 011 242 8978] ${newBookNotes}` : "[PRENOTAZIONE TELEFONICA SALONE]",
      status: "confermato",
    });

    setShowAddBookingModal(false);
    setNewBookClient("");
    setNewBookPhone("");
    setNewBookEmail("");
    setNewBookNotes("");
  };

  // Submit new client card in CRM
  const handleCreateClientCard = (e: React.FormEvent) => {
    e.preventDefault();
    addClientCard({
      clientName: newCardName,
      phone: newCardPhone,
      email: newCardEmail,
      naturalBase: newCardBase,
      whiteHairPercent: newCardWhite,
      formulaAbituale: newCardFormula,
      scalpSensitivity: newCardScalp,
      treatmentHistory: newCardHistory,
      lastVisit: new Date().toISOString().slice(0, 10),
      notes: newCardNotes,
    });

    setShowNewCardModal(false);
    setNewCardName("");
    setNewCardPhone("");
    setNewCardEmail("");
    setNewCardFormula("");
    setNewCardHistory("");
    setNewCardNotes("");
  };

  // Save inline formula edits
  const handleSaveInlineFormula = (cardId: string) => {
    updateClientCard(cardId, {
      formulaAbituale: editedFormula,
      notes: editedNotes,
    });
    setEditingCardId(null);
  };

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DED9D0]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-2 font-semibold">
              <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
              <span>AREA DIREZIONALE &amp; SALON ERP • TORINO</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
              Pannello Direzione Artistica
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-2">
              Gestione integrata appuntamenti, formule colorimetriche delle clienti e richieste concierge in tempo reale.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SalonLiveIndicator />
            <button
              onClick={exportBookingsCSV}
              className="bg-[#EFECE6] text-[#141312] hover:bg-[#141312] hover:text-[#F6F4F0] px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border border-[#DED9D0]"
              title="Esporta il registro in formato CSV compatibile Excel"
            >
              ↓ Esporta CSV
            </button>
            <button
              onClick={() => {
                if (confirm("Ripristinare i dati dimostrativi di Torino? Tutte le modifiche temporanee verranno resettate alle 5 prenotazioni e schede tecniche iniziali.")) {
                  resetDemoData();
                }
              }}
              className="bg-transparent text-[#8C5A3C] hover:text-[#141312] px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border border-[#DED9D0]"
              title="Resetta i dati demo"
            >
              ↺ Ripristina Demo
            </button>
          </div>
        </div>

        {/* TOP EXECUTIVE METRICS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              FATTURATO STIMATO ATTIVO
            </span>
            <div className="font-mono text-3xl font-semibold text-[#8C5A3C] tabular-nums">
              €{executiveMetrics.totalRevenue}
            </div>
            <span className="font-mono text-[11px] text-[#5C5852] block">
              Scontrino medio: ~€{executiveMetrics.avgTicket} / seduta
            </span>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              ORE ATELIER IMPEGNATE
            </span>
            <div className="font-mono text-3xl font-semibold text-[#141312] tabular-nums">
              {executiveMetrics.totalHours}h {executiveMetrics.remainingMinutes}m
            </div>
            <span className="font-mono text-[11px] text-[#5C5852] block">
              Su {executiveMetrics.totalActive} appuntamenti registrati
            </span>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              CARICO STILISTI (EQUIPE)
            </span>
            <div className="font-mono text-sm font-semibold text-[#141312] pt-1 space-y-0.5">
              <div className="flex justify-between">
                <span>Patrizia R.:</span>
                <span className="text-[#8C5A3C]">{executiveMetrics.patriziaCount} sedute</span>
              </div>
              <div className="flex justify-between">
                <span>Elena V.:</span>
                <span className="text-[#141312]">{executiveMetrics.elenaCount} sedute</span>
              </div>
              <div className="flex justify-between">
                <span>Marco D.:</span>
                <span className="text-[#141312]">{executiveMetrics.marcoCount} sedute</span>
              </div>
            </div>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              STATO SINCRONIZZAZIONE
            </span>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 bg-[#2E7D32]" />
              <span className="font-mono text-xs font-semibold text-[#141312]">
                LOCALSTORAGE SYNC ATTIVO
              </span>
            </div>
            <span className="font-sans text-[11px] text-[#5C5852] block pt-1">
              {executiveMetrics.newInquiriesCount > 0 ? (
                <span className="text-[#8C5A3C] font-semibold font-mono">
                  ● {executiveMetrics.newInquiriesCount} NUOVE RICHIESTE INBOX
                </span>
              ) : (
                "Tutte le richieste gestite"
              )}
            </span>
          </div>
        </div>

        {/* 3 OPERATIONAL TABS NAVIGATION */}
        <div className="border-b border-[#DED9D0] flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab("agenda")}
            className={`font-mono text-xs uppercase px-6 py-3.5 transition-colors border-t border-x ${
              activeTab === "agenda"
                ? "bg-[#141312] text-[#F6F4F0] border-[#141312] font-semibold"
                : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
            }`}
          >
            Tab 01 // Registro Appuntamenti &amp; Agenda ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("crm")}
            className={`font-mono text-xs uppercase px-6 py-3.5 transition-colors border-t border-x ${
              activeTab === "crm"
                ? "bg-[#141312] text-[#F6F4F0] border-[#141312] font-semibold"
                : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
            }`}
          >
            Tab 02 // Colorimetria &amp; Schede Tecniche CRM ({clientCards.length})
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`font-mono text-xs uppercase px-6 py-3.5 transition-colors border-t border-x relative ${
              activeTab === "inbox"
                ? "bg-[#141312] text-[#F6F4F0] border-[#141312] font-semibold"
                : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0] hover:text-[#141312]"
            }`}
          >
            <span>Tab 03 // Richieste Concierge &amp; Contatti ({inquiries.length})</span>
            {executiveMetrics.newInquiriesCount > 0 && (
              <span className="ml-2 w-2 h-2 bg-[#8C5A3C] inline-block" />
            )}
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 01: REGISTRO APPUNTAMENTI & AGENDA                         */}
        {/* ============================================================== */}
        {activeTab === "agenda" && (
          <div className="space-y-6">
            {/* Filter and Action Strip */}
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#F6F4F0] border border-[#DED9D0] px-3 py-2 font-mono text-xs text-[#141312] focus:outline-hidden rounded-none"
                >
                  <option value="all">Stato: Tutti</option>
                  <option value="confermato">Confermati</option>
                  <option value="in_attesa">In Attesa</option>
                  <option value="completato">Completati</option>
                  <option value="annullato">Annullati</option>
                </select>

                {/* Stylist Filter */}
                <select
                  value={stylistFilter}
                  onChange={(e) => setStylistFilter(e.target.value)}
                  className="bg-[#F6F4F0] border border-[#DED9D0] px-3 py-2 font-mono text-xs text-[#141312] focus:outline-hidden rounded-none"
                >
                  <option value="all">Stilista: Tutta l&apos;Equipe</option>
                  {STYLISTS.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-[#F6F4F0] border border-[#DED9D0] px-3 py-1.5 font-mono text-xs text-[#141312] focus:outline-hidden rounded-none"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="font-mono text-xs text-[#5C5852] hover:text-[#141312] underline"
                  >
                    Tutte le date
                  </button>
                )}
              </div>

              {/* Search & New Booking CTA */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca cliente, tel o ID..."
                  className="bg-[#F6F4F0] border border-[#DED9D0] px-3 py-2 font-sans text-xs text-[#141312] focus:outline-hidden rounded-none w-full sm:w-60"
                />
                <button
                  onClick={() => setShowAddBookingModal(true)}
                  className="bg-[#141312] text-[#F6F4F0] px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312] shrink-0"
                >
                  + Registra Telefonico
                </button>
              </div>
            </div>

            {/* Bookings Ledger Table */}
            <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
              {/* Header */}
              <div className="hidden lg:grid grid-cols-12 px-6 py-3.5 bg-[#EFECE6] font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
                <div className="col-span-2">ID &amp; STATO</div>
                <div className="col-span-3">CLIENTE &amp; RECAPITO</div>
                <div className="col-span-3">SERVIZI &amp; STILISTA</div>
                <div className="col-span-2">DATA &amp; ORA</div>
                <div className="col-span-2 text-right">PREZZO &amp; AZIONI</div>
              </div>

              {/* Rows */}
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center font-sans text-xs text-[#5C5852]">
                  Nessun appuntamento corrisponde ai filtri impostati.
                </div>
              ) : (
                filteredBookings.map((b) => {
                  const reminderMessage = `Gentile ${b.clientName}, le ricordiamo il Suo appuntamento presso RUSSO Equipe Parrucchieri (Corso Lucio Quinzio Cincinnato 256, Torino) per il giorno ${b.date} alle ore ${b.time} con ${b.stylistName}. A presto, Patrizia Russo & Team.`;
                  const cleanPhone = b.clientPhone.replace(/\s+/g, "");

                  return (
                    <div key={b.id} className="p-6 transition-colors hover:bg-[#EFECE6]/40">
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center gap-4">
                        {/* ID & Status */}
                        <div className="col-span-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-[#141312] bg-[#EFECE6] px-2 py-0.5 border border-[#DED9D0]">
                              {b.id}
                            </span>
                          </div>
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                            className={`block font-mono text-[10px] uppercase tracking-wider px-2 py-1 border rounded-none ${
                              b.status === "confermato"
                                ? "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/40"
                                : b.status === "in_attesa"
                                ? "bg-[#8C5A3C]/10 text-[#8C5A3C] border-[#8C5A3C]/40"
                                : b.status === "completato"
                                ? "bg-[#141312]/10 text-[#141312] border-[#141312]/40"
                                : "bg-red-500/10 text-red-600 border-red-500/30"
                            }`}
                          >
                            <option value="confermato">Confermato</option>
                            <option value="in_attesa">In Attesa</option>
                            <option value="completato">Completato</option>
                            <option value="annullato">Annullato</option>
                          </select>
                        </div>

                        {/* Client details */}
                        <div className="col-span-3">
                          <strong className="font-serif text-xl text-[#141312] block">
                            {b.clientName}
                          </strong>
                          <div className="font-mono text-[11px] text-[#5C5852] mt-0.5 space-y-0.5">
                            <a href={`tel:${cleanPhone}`} className="hover:text-[#8C5A3C] block">
                              📞 {b.clientPhone}
                            </a>
                            <span className="text-[10px] text-[#5C5852]/70 block truncate">
                              ✉ {b.clientEmail}
                            </span>
                          </div>
                        </div>

                        {/* Services & Stylist */}
                        <div className="col-span-3 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] block font-semibold">
                            STILISTA: {b.stylistName}
                          </span>
                          <p className="font-sans text-xs text-[#141312]">
                            {b.serviceNames.join(", ")}
                          </p>
                          {b.notes && (
                            <p className="font-sans text-[11px] italic text-[#5C5852] line-clamp-1 border-l border-[#DED9D0] pl-2 mt-1">
                              {b.notes}
                            </p>
                          )}
                        </div>

                        {/* Date & Time */}
                        <div className="col-span-2 font-mono text-xs">
                          <span className="text-[#141312] font-semibold block">{b.date}</span>
                          <span className="text-[#8C5A3C]">Ore {b.time}</span>
                          <span className="text-[10px] text-[#5C5852] block">
                            ~{b.totalDurationMinutes} min
                          </span>
                        </div>

                        {/* Price & Actions */}
                        <div className="col-span-2 flex flex-col items-start lg:items-end justify-between space-y-2">
                          <span className="font-mono text-xl font-semibold text-[#141312] tabular-nums">
                            €{b.totalPrice}
                          </span>

                          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                            <a
                              href={`https://wa.me/39${cleanPhone.replace(/^0/, "")}?text=${encodeURIComponent(reminderMessage)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2E7D32] hover:underline uppercase"
                              title="Invia promemoria WhatsApp al cliente"
                            >
                              💬 WhatsApp
                            </a>
                            <span className="text-[#DED9D0]">•</span>
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="text-red-700 hover:underline uppercase"
                            >
                              Elimina
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 02: ARCHIVIO SCHEDE TECNICHE & COLORIMETRIA (CRM)          */}
        {/* ============================================================== */}
        {activeTab === "crm" && (
          <div className="space-y-6">
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={crmSearch}
                  onChange={(e) => setCrmSearch(e.target.value)}
                  placeholder="Cerca per cliente, telefono o formula..."
                  className="w-full bg-[#F6F4F0] border border-[#DED9D0] px-3.5 py-2 font-sans text-xs text-[#141312] focus:outline-hidden rounded-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-mono text-xs text-[#5C5852]">
                  {filteredClientCards.length} SCHEDE ARCHIVIATE
                </span>
                <button
                  onClick={() => setShowNewCardModal(true)}
                  className="bg-[#141312] text-[#F6F4F0] px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                >
                  + Nuova Scheda Cliente
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredClientCards.map((card) => {
                const isEditing = editingCardId === card.id;

                return (
                  <div
                    key={card.id}
                    className="border border-[#DED9D0] bg-[#F6F4F0] p-6 space-y-4 relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between border-b border-[#DED9D0] pb-3">
                        <div>
                          <span className="font-mono text-[10px] text-[#8C5A3C] uppercase tracking-wider font-semibold block">
                            SCHEDA TECNICA // {card.id}
                          </span>
                          <h3 className="font-serif text-2xl text-[#141312]">
                            {card.clientName}
                          </h3>
                        </div>
                        <span className="font-mono text-xs text-[#5C5852]">
                          📞 {card.phone}
                        </span>
                      </div>

                      {/* Technical Specs */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-b border-[#DED9D0] font-mono text-[11px]">
                        <div>
                          <span className="text-[#5C5852] uppercase block text-[10px]">
                            BASE NATURALE:
                          </span>
                          <span className="text-[#141312] font-semibold">{card.naturalBase}</span>
                        </div>
                        <div>
                          <span className="text-[#5C5852] uppercase block text-[10px]">
                            % CAPELLI BIANCHI:
                          </span>
                          <span className="text-[#141312] font-semibold">{card.whiteHairPercent}</span>
                        </div>
                        <div>
                          <span className="text-[#5C5852] uppercase block text-[10px]">
                            SENSIBILITÀ CUTE:
                          </span>
                          <span className="text-[#141312]">{card.scalpSensitivity}</span>
                        </div>
                        <div>
                          <span className="text-[#5C5852] uppercase block text-[10px]">
                            ULTIMO PASSAGGIO:
                          </span>
                          <span className="text-[#8C5A3C]">{card.lastVisit}</span>
                        </div>
                      </div>

                      {/* Formula Box */}
                      <div className="pt-3 space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C5A3C] font-semibold block">
                          FORMULA COLORE / SCHIARITURA ABITUALE:
                        </span>
                        {isEditing ? (
                          <div className="space-y-2 pt-1">
                            <textarea
                              rows={2}
                              value={editedFormula}
                              onChange={(e) => setEditedFormula(e.target.value)}
                              className="w-full bg-[#EFECE6] border border-[#8C5A3C] p-2 font-mono text-xs text-[#141312] rounded-none focus:outline-hidden"
                            />
                            <textarea
                              rows={2}
                              value={editedNotes}
                              onChange={(e) => setEditedNotes(e.target.value)}
                              placeholder="Note accessorie..."
                              className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 font-sans text-xs text-[#141312] rounded-none focus:outline-hidden"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveInlineFormula(card.id)}
                                className="bg-[#141312] text-[#F6F4F0] px-3 py-1.5 font-mono text-[11px] uppercase"
                              >
                                Salva Modifiche
                              </button>
                              <button
                                onClick={() => setEditingCardId(null)}
                                className="border border-[#DED9D0] px-3 py-1.5 font-mono text-[11px] uppercase"
                              >
                                Annulla
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-[#EFECE6] border border-[#DED9D0] font-mono text-xs text-[#141312] leading-relaxed">
                            {card.formulaAbituale}
                          </div>
                        )}
                      </div>

                      {/* Treatment History & Notes */}
                      {!isEditing && (
                        <div className="pt-3 space-y-1 font-sans text-xs">
                          <p className="text-[#5C5852]">
                            <strong className="font-mono text-[10px] text-[#141312] uppercase block">
                              STORICO TRATTAMENTI:
                            </strong>
                            {card.treatmentHistory}
                          </p>
                          {card.notes && (
                            <p className="text-[#5C5852] italic pt-1">
                              Nota stilista: {card.notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    {!isEditing && (
                      <div className="pt-4 border-t border-[#DED9D0] flex items-center justify-between font-mono text-xs">
                        <button
                          onClick={() => {
                            setEditingCardId(card.id);
                            setEditedFormula(card.formulaAbituale);
                            setEditedNotes(card.notes || "");
                          }}
                          className="text-[#8C5A3C] hover:underline uppercase"
                        >
                          ✎ Modifica Formula
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Eliminare la scheda di ${card.clientName}?`)) {
                              deleteClientCard(card.id);
                            }
                          }}
                          className="text-red-700 hover:underline uppercase"
                        >
                          Elimina Scheda
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 03: RICHIESTE CONCIERGE & CONTATTI (INBOX)                 */}
        {/* ============================================================== */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div className="border border-[#DED9D0] bg-[#EFECE6] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setInboxStatusFilter("all")}
                  className={`font-mono text-xs uppercase px-3 py-1.5 border transition-colors ${
                    inboxStatusFilter === "all"
                      ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                      : "bg-[#F6F4F0] text-[#5C5852] border-[#DED9D0]"
                  }`}
                >
                  Tutte ({inquiries.length})
                </button>
                <button
                  onClick={() => setInboxStatusFilter("nuova")}
                  className={`font-mono text-xs uppercase px-3 py-1.5 border transition-colors ${
                    inboxStatusFilter === "nuova"
                      ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                      : "bg-[#F6F4F0] text-[#5C5852] border-[#DED9D0]"
                  }`}
                >
                  Nuove da Gestire ({inquiries.filter((i) => i.status === "nuova").length})
                </button>
                <button
                  onClick={() => setInboxStatusFilter("gestita")}
                  className={`font-mono text-xs uppercase px-3 py-1.5 border transition-colors ${
                    inboxStatusFilter === "gestita"
                      ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                      : "bg-[#F6F4F0] text-[#5C5852] border-[#DED9D0]"
                  }`}
                >
                  Gestite ({inquiries.filter((i) => i.status === "gestita").length})
                </button>
              </div>

              <span className="font-mono text-xs text-[#5C5852]">
                RICEVUTE DA SPORTELLO DIGITALE ATELIER
              </span>
            </div>

            <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center font-sans text-xs text-[#5C5852]">
                  Nessuna richiesta presente in questa vista.
                </div>
              ) : (
                filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/\s+/g, "");
                  const isNuova = inq.status === "nuova";

                  return (
                    <div
                      key={inq.id}
                      className={`p-6 transition-colors ${
                        isNuova ? "bg-[#EFECE6]/60" : "bg-[#F6F4F0]"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] font-semibold text-[#8C5A3C] bg-[#F6F4F0] px-2 py-0.5 border border-[#DED9D0]">
                              {inq.id}
                            </span>
                            <span
                              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 font-semibold ${
                                isNuova
                                  ? "bg-[#8C5A3C] text-[#F6F4F0]"
                                  : "bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30"
                              }`}
                            >
                              {isNuova ? "NUOVA RICHIESTA" : "GESTITA"}
                            </span>
                            <span className="font-mono text-xs text-[#5C5852]">
                              {new Date(inq.createdAt).toLocaleDateString("it-IT")}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-serif text-2xl text-[#141312]">
                              {inq.name}
                            </h3>
                            <div className="font-mono text-xs text-[#5C5852] mt-0.5 flex gap-4">
                              <span>📞 {inq.phone}</span>
                              <span>✉ {inq.email}</span>
                              {inq.preferredDate && <span>📅 Orientativa: {inq.preferredDate}</span>}
                            </div>
                          </div>

                          <div className="p-4 bg-[#F6F4F0] border border-[#DED9D0] text-xs font-sans text-[#141312] leading-relaxed">
                            <strong className="font-mono text-[10px] uppercase text-[#8C5A3C] block mb-1">
                              MESSAGGIO / ESIGENZA:
                            </strong>
                            {inq.message}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0 w-full lg:w-auto">
                          <button
                            onClick={() => updateInquiryStatus(inq.id, isNuova ? "gestita" : "nuova")}
                            className="bg-[#141312] text-[#F6F4F0] px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312] text-center"
                          >
                            {isNuova ? "Segna come Gestita ✓" : "Riporta a Nuova ↺"}
                          </button>

                          <a
                            href={`https://wa.me/39${cleanPhone.replace(/^0/, "")}?text=${encodeURIComponent(`Buongiorno ${inq.name}, La ringraziamo per aver contattato RUSSO Equipe Parrucchieri (Torino). In merito alla Sua richiesta...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#DED9D0] bg-[#EFECE6] text-[#141312] px-4 py-2 font-mono text-xs uppercase tracking-wider hover:border-[#8C5A3C] transition-colors text-center"
                          >
                            💬 Rispondi su WhatsApp
                          </a>

                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="text-red-700 hover:underline font-mono text-[11px] uppercase pt-1"
                          >
                            Elimina Richiesta
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL: REGISTRA APPUNTAMENTO TELEFONICO                        */}
        {/* ============================================================== */}
        {showAddBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-[#141312]/70 backdrop-blur-xs"
              onClick={() => setShowAddBookingModal(false)}
            />
            <div className="relative z-10 w-full max-w-xl bg-[#F6F4F0] border border-[#DED9D0] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="border-b border-[#DED9D0] pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold">
                    REGISTRAZIONE RAPIDA SALONE (011 242 8978)
                  </span>
                  <h3 className="font-serif text-2xl text-[#141312]">
                    Nuovo Appuntamento da Telefono o Banco
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddBookingModal(false)}
                  className="font-mono text-xs hover:text-[#8C5A3C]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreatePhoneBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Nome Cliente *
                    </label>
                    <input
                      type="text"
                      required
                      value={newBookClient}
                      onChange={(e) => setNewBookClient(e.target.value)}
                      placeholder="Es. Maria Rossi"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-sans rounded-none focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newBookPhone}
                      onChange={(e) => setNewBookPhone(e.target.value)}
                      placeholder="Es. 333 1234567"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Stilista
                    </label>
                    <select
                      value={newBookStylist}
                      onChange={(e) => setNewBookStylist(e.target.value)}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    >
                      {STYLISTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={newBookDate}
                      onChange={(e) => setNewBookDate(e.target.value)}
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Ora
                    </label>
                    <input
                      type="text"
                      required
                      value={newBookTime}
                      onChange={(e) => setNewBookTime(e.target.value)}
                      placeholder="10:30"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                    Servizi da eseguire
                  </label>
                  <div className="max-h-36 overflow-y-auto border border-[#DED9D0] bg-[#EFECE6] p-2 space-y-1.5">
                    {SERVICES.map((s) => {
                      const checked = newBookServices.includes(s.id);
                      return (
                        <label key={s.id} className="flex items-center gap-2 text-xs font-sans cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewBookServices([...newBookServices, s.id]);
                              } else {
                                setNewBookServices(newBookServices.filter((id) => id !== s.id));
                              }
                            }}
                          />
                          <span className="font-mono text-[10px] text-[#8C5A3C]">{s.code}</span>
                          <span>{s.name} (€{s.price})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                    Note interne o colore
                  </label>
                  <input
                    type="text"
                    value={newBookNotes}
                    onChange={(e) => setNewBookNotes(e.target.value)}
                    placeholder="Es. Richiesta tonalizzazione sabbia, cliente abituale..."
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-sans rounded-none focus:outline-hidden"
                  />
                </div>

                <div className="pt-4 border-t border-[#DED9D0] flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#141312] text-[#F6F4F0] py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors"
                  >
                    Registra e Conferma in Agenda →
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddBookingModal(false)}
                    className="border border-[#DED9D0] px-4 py-3 font-mono text-xs uppercase"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL: NUOVA SCHEDA TECNICA CLIENTE                            */}
        {/* ============================================================== */}
        {showNewCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-[#141312]/70 backdrop-blur-xs"
              onClick={() => setShowNewCardModal(false)}
            />
            <div className="relative z-10 w-full max-w-xl bg-[#F6F4F0] border border-[#DED9D0] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="border-b border-[#DED9D0] pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C5A3C] font-semibold">
                    REGISTRO COLORIMETRICO SARTORIALE
                  </span>
                  <h3 className="font-serif text-2xl text-[#141312]">
                    Crea Nuova Scheda Tecnica Cliente
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewCardModal(false)}
                  className="font-mono text-xs hover:text-[#8C5A3C]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateClientCard} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                      placeholder="Es. Laura Neri"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs rounded-none focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newCardPhone}
                      onChange={(e) => setNewCardPhone(e.target.value)}
                      placeholder="Es. 333 9988776"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Altezza di Tono Naturale *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCardBase}
                      onChange={(e) => setNewCardBase(e.target.value)}
                      placeholder="Es. Livello 5 — Castano Chiaro"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      % Capelli Bianchi
                    </label>
                    <input
                      type="text"
                      value={newCardWhite}
                      onChange={(e) => setNewCardWhite(e.target.value)}
                      placeholder="Es. 15% frontale"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                    Formula Colore o Decolorazione Consigliata *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newCardFormula}
                    onChange={(e) => setNewCardFormula(e.target.value)}
                    placeholder="Es. Balayage mano libera 30 vol + Tonalizzante Gloss 9.13 (1:2 a pH acido)"
                    className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs font-mono rounded-none focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Sensibilità Cutanea
                    </label>
                    <input
                      type="text"
                      value={newCardScalp}
                      onChange={(e) => setNewCardScalp(e.target.value)}
                      placeholder="Es. Cute reattiva con tendenza secca"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs rounded-none focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#5C5852] mb-1">
                      Storico Chimico / Note
                    </label>
                    <input
                      type="text"
                      value={newCardHistory}
                      onChange={(e) => setNewCardHistory(e.target.value)}
                      placeholder="Es. Trattamento cheratina pregresso, fusto medio"
                      className="w-full bg-[#EFECE6] border border-[#DED9D0] p-2 text-xs rounded-none focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DED9D0] flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#141312] text-[#F6F4F0] py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors"
                  >
                    Salva Scheda Tecnica CRM →
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCardModal(false)}
                    className="border border-[#DED9D0] px-4 py-3 font-mono text-xs uppercase"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
