"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SalonLiveIndicator from "./SalonLiveIndicator";
import { useRitual } from "@/context/RitualContext";
import { SALON_INFO } from "@/lib/salon-data";

export default function Header() {
  const pathname = usePathname();
  const { selectedServices, totalPrice, openDrawer } = useRitual();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Atelier" },
    { href: "/listino", label: "Listino & Rituali" },
    { href: "/consulenza", label: "Diagnosi Capelli" },
    { href: "/lookbook", label: "Archivio Look" },
    { href: "/contatti", label: "Contatti & Orari" },
  ];

  const totalCount = selectedServices.length;

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4F0] border-b border-[#DED9D0]">
      {/* Top Architectural Status Bar */}
      <div className="border-b border-[#DED9D0] bg-[#EFECE6] px-4 sm:px-8 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#5C5852] tracking-wider uppercase">
            <span className="text-[#8C5A3C] font-semibold">VIA / INDIRIZZO:</span>
            <span>{SALON_INFO.address.replace(" — Quartiere Lucento", "")}</span>
          </div>

          <div className="flex items-center gap-4">
            <SalonLiveIndicator />
            <Link
              href="/gestione"
              className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#5C5852] hover:text-[#141312] border-l border-[#DED9D0] pl-3 uppercase"
            >
              Area Salone ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-stretch justify-between h-20">
          {/* Brand Lockup */}
          <Link
            href="/"
            className="flex flex-col justify-center py-2 pr-6 border-r border-[#DED9D0] group"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#141312] group-hover:text-[#8C5A3C] transition-colors leading-none">
              RUSSO
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#5C5852] mt-1.5 font-medium">
              EQUIPE PARRUCCHIERI • TORINO
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-stretch divide-x divide-[#DED9D0]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 xl:px-6 flex items-center font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-[#8C5A3C] font-semibold bg-[#EFECE6]/50"
                      : "text-[#141312] hover:text-[#8C5A3C] hover:bg-[#EFECE6]/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-stretch divide-x divide-[#DED9D0] border-l border-[#DED9D0]">
            {/* Interactive Tray Trigger */}
            <button
              onClick={openDrawer}
              className="px-3 sm:px-5 flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase hover:bg-[#EFECE6] transition-colors group relative"
              aria-label={`Visualizza rituale selezionato, ${totalCount} elementi`}
            >
              <div className="relative">
                <span className="w-5 h-5 border border-[#141312] flex items-center justify-center text-[10px] font-mono group-hover:border-[#8C5A3C] group-hover:text-[#8C5A3C]">
                  {totalCount}
                </span>
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8C5A3C]" />
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] leading-tight text-[#141312] group-hover:text-[#8C5A3C]">
                  Il Tuo Rituale
                </span>
                {totalCount > 0 ? (
                  <span className="text-[10px] text-[#8C5A3C] font-semibold tabular-nums">
                    €{totalPrice}
                  </span>
                ) : (
                  <span className="text-[10px] text-[#5C5852]">0 servizi</span>
                )}
              </div>
            </button>

            {/* Primary Book Appointment CTA */}
            <Link
              href="/prenota"
              className="hidden sm:flex items-center px-6 bg-[#141312] text-[#F6F4F0] font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors"
            >
              Prenota Appuntamento
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-4 flex items-center justify-center font-mono text-xs text-[#141312] hover:bg-[#EFECE6] transition-colors"
              aria-label="Apri menu principale"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? "CHIUDI ✕" : "MENU ☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Architectural Full-Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0]">
          <div className="px-6 py-4 bg-[#EFECE6]">
            <span className="font-mono text-[10px] tracking-widest text-[#8C5A3C] uppercase block font-semibold mb-1">
              NAVIGAZIONE ATELIER
            </span>
            <p className="font-serif italic text-sm text-[#5C5852]">
              Atelier di Acconciatura & Colorimetria a Torino
            </p>
          </div>

          <nav className="flex flex-col divide-y divide-[#DED9D0]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-4 font-serif text-xl tracking-wide flex items-center justify-between transition-colors ${
                    isActive
                      ? "text-[#8C5A3C] font-semibold bg-[#EFECE6]/40"
                      : "text-[#141312] hover:bg-[#EFECE6]/20"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#5C5852]">→</span>
                </Link>
              );
            })}
            <Link
              href="/gestione"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 font-mono text-xs tracking-widest text-[#5C5852] hover:text-[#141312] flex items-center justify-between uppercase"
            >
              <span>Area Riservata Salone</span>
              <span>↗</span>
            </Link>
          </nav>

          <div className="p-6 bg-[#EFECE6] space-y-3">
            <Link
              href="/prenota"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-[#141312] text-[#F6F4F0] text-center py-3.5 font-mono text-xs tracking-widest uppercase hover:bg-[#8C5A3C] transition-colors"
            >
              Prenota Appuntamento Ora
            </Link>
            <div className="pt-2 text-center">
              <a
                href={SALON_INFO.phoneHref}
                className="font-mono text-xs text-[#141312] hover:text-[#8C5A3C] underline underline-offset-4"
              >
                Chiama l&apos;Atelier: {SALON_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
