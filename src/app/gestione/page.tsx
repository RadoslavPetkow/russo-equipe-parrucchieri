"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRitual, BookingStatus } from "@/context/RitualContext";
import { getSalonCurrentStatus } from "@/lib/salon-data";
import SalonLiveIndicator from "@/components/SalonLiveIndicator";

export default function GestionePage() {
  const { bookings, updateBookingStatus, deleteBooking } = useRitual();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchClient, setSearchClient] = useState<string>("");

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (searchClient.trim()) {
      const q = searchClient.toLowerCase();
      return (
        b.clientName.toLowerCase().includes(q) ||
        b.clientPhone.includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.stylistName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== "annullato" ? b.totalPrice : 0), 0);
  const totalMinutes = bookings.reduce((sum, b) => sum + (b.status !== "annullato" ? b.totalDurationMinutes : 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "confermato").length;
  const pendingCount = bookings.filter((b) => b.status === "in_attesa").length;

  const currentSalonStatus = getSalonCurrentStatus();

  return (
    <div className="bg-[#F6F4F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DED9D0]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8C5A3C] uppercase mb-2 font-semibold">
              <span className="w-2.5 h-2.5 bg-[#8C5A3C]" />
              <span>GESTIONALE INTERNO • ATELIER RUSSO TORINO</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
              Registro Sedute &amp; Controllo Salone
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-2">
              Panoramica in tempo reale degli appuntamenti programmati, stato stilisti e metriche operative.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SalonLiveIndicator />
            <Link
              href="/prenota"
              className="bg-[#141312] text-[#F6F4F0] px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
            >
              + Nuovo Ingresso
            </Link>
          </div>
        </div>

        {/* 4 Architectural KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              APPUNTAMENTI TOTALI
            </span>
            <div className="font-mono text-3xl font-semibold text-[#141312] tabular-nums">
              {bookings.length}
            </div>
            <span className="font-mono text-[11px] text-[#8C5A3C] block">
              {confirmedCount} confermati • {pendingCount} in attesa
            </span>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              VALORE PORTAFOGLIO
            </span>
            <div className="font-mono text-3xl font-semibold text-[#8C5A3C] tabular-nums">
              €{totalRevenue}
            </div>
            <span className="font-mono text-[11px] text-[#5C5852] block">
              Media ~€{bookings.length ? Math.round(totalRevenue / bookings.length) : 0} per cliente
            </span>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              TEMPO OPERATIVO TOTALIZZATO
            </span>
            <div className="font-mono text-3xl font-semibold text-[#141312] tabular-nums">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </div>
            <span className="font-mono text-[11px] text-[#5C5852] block">
              Su 3 poltrone contemporanee
            </span>
          </div>

          <div className="border border-[#DED9D0] bg-[#EFECE6] p-6 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
              ORARI SALONE OGGI
            </span>
            <div className="font-mono text-lg font-semibold text-[#141312] mt-1">
              {currentSalonStatus.isOpen ? "APERTO AL PUBBLICO" : "CHIUSO"}
            </div>
            <span className="font-sans text-[11px] text-[#5C5852] block">
              {currentSalonStatus.statusText}
            </span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-colors ${
                statusFilter === "all"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0]"
              }`}
            >
              Tutti ({bookings.length})
            </button>
            <button
              onClick={() => setStatusFilter("confermato")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-colors ${
                statusFilter === "confermato"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0]"
              }`}
            >
              Confermati ({confirmedCount})
            </button>
            <button
              onClick={() => setStatusFilter("in_attesa")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-colors ${
                statusFilter === "in_attesa"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0]"
              }`}
            >
              In Attesa ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter("completato")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-colors ${
                statusFilter === "completato"
                  ? "bg-[#141312] text-[#F6F4F0] border-[#141312]"
                  : "bg-[#EFECE6] text-[#5C5852] border-[#DED9D0]"
              }`}
            >
              Completati
            </button>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              placeholder="Filtra per nome cliente, telefono o ID..."
              className="w-full bg-[#EFECE6] border border-[#DED9D0] px-3 py-2 font-mono text-xs text-[#141312] placeholder-[#5C5852]/60 focus:outline-hidden focus:border-[#8C5A3C] rounded-none"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
          {/* Header Row */}
          <div className="hidden lg:grid grid-cols-12 px-6 py-3.5 bg-[#EFECE6] font-mono text-[10px] uppercase tracking-widest text-[#5C5852]">
            <div className="col-span-2">CODICE &amp; STATO</div>
            <div className="col-span-3">OSPITE &amp; RECAPITO</div>
            <div className="col-span-3">SERVIZI &amp; STILISTA</div>
            <div className="col-span-2">DATA &amp; ORA</div>
            <div className="col-span-2 text-right">STIMA &amp; AZIONI</div>
          </div>

          {/* Rows */}
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-sm font-sans text-[#5C5852]">
              Nessun appuntamento corrisponde ai criteri di ricerca.
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-6 transition-colors hover:bg-[#EFECE6]/40"
              >
                {/* Desktop View */}
                <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                  {/* Code & Status */}
                  <div className="col-span-2 space-y-1.5">
                    <span className="font-mono text-xs font-semibold text-[#141312] bg-[#EFECE6] px-2 py-0.5 border border-[#DED9D0] inline-block">
                      {b.id}
                    </span>
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

                  {/* Client Info */}
                  <div className="col-span-3">
                    <strong className="font-serif text-lg text-[#141312] block">
                      {b.clientName}
                    </strong>
                    <div className="font-mono text-[11px] text-[#5C5852] space-y-0.5">
                      <a href={`tel:${b.clientPhone}`} className="hover:text-[#8C5A3C] block">
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
                      CON: {b.stylistName}
                    </span>
                    <p className="font-sans text-xs text-[#141312] line-clamp-2">
                      {b.serviceNames.join(", ")}
                    </p>
                    {b.notes && (
                      <p className="font-sans text-[11px] italic text-[#5C5852] line-clamp-1">
                        Nota: {b.notes}
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
                  <div className="col-span-2 text-right space-y-1.5">
                    <span className="font-mono text-lg font-semibold text-[#141312] tabular-nums block">
                      €{b.totalPrice}
                    </span>
                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="font-mono text-[10px] text-[#5C5852] hover:text-red-700 underline uppercase"
                    >
                      Elimina Scheda
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#141312] bg-[#EFECE6] px-2 py-0.5 border border-[#DED9D0]">
                      {b.id}
                    </span>
                    <span className="font-mono text-base font-semibold text-[#141312]">
                      €{b.totalPrice}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-[#141312]">{b.clientName}</h3>
                    <p className="font-mono text-xs text-[#5C5852]">{b.clientPhone} • {b.date} ore {b.time}</p>
                  </div>

                  <p className="font-sans text-xs text-[#141312]">
                    <strong className="text-[#8C5A3C] font-mono text-[10px] block uppercase">STILISTA: {b.stylistName}</strong>
                    {b.serviceNames.join(", ")}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#DED9D0]">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                      className="font-mono text-xs px-2 py-1 border border-[#DED9D0] bg-[#EFECE6]"
                    >
                      <option value="confermato">Confermato</option>
                      <option value="in_attesa">In Attesa</option>
                      <option value="completato">Completato</option>
                      <option value="annullato">Annullato</option>
                    </select>

                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="font-mono text-xs text-red-700 underline"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
