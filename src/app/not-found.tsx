import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#F6F4F0] min-h-[calc(100vh-14rem)] flex items-center justify-center py-20 px-4 sm:px-8">
      <div className="max-w-2xl w-full border border-[#DED9D0] bg-[#EFECE6] p-8 sm:p-14 text-center space-y-8">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8C5A3C] font-semibold block mb-3">
            404 // ERRORE DI INDIRIZZAMENTO ARCHITETTONICO
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight leading-tight">
            La pagina cercata non risiede nell&apos;Atelier.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5C5852] mt-4 leading-relaxed max-w-md mx-auto">
            Il percorso richiesto potrebbe essere stato archiviato o l&apos;indirizzo digitato contiene un refuso. Ti invitiamo a consultare le sezioni principali del nostro spazio torinese.
          </p>
        </div>

        {/* Directory Links Grid */}
        <div className="border border-[#DED9D0] bg-[#F6F4F0] divide-y divide-[#DED9D0] text-left font-mono text-xs">
          <Link
            href="/"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">01 // Pagina Principale (Atelier Russo)</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
          <Link
            href="/listino"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">02 // Listino Prezzi &amp; Calcolatore Rituali</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
          <Link
            href="/consulenza"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">03 // Diagnosi Capelli &amp; Armocromia</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
          <Link
            href="/lookbook"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">04 // Archivio Look &amp; Texture</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
          <Link
            href="/prenota"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">05 // Riserva il Tuo Rituale Online</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
          <Link
            href="/contatti"
            className="p-3.5 flex items-center justify-between hover:bg-[#EFECE6] transition-colors group"
          >
            <span className="text-[#141312] group-hover:text-[#8C5A3C]">06 // Orari &amp; Posizione a Torino Lucento</span>
            <span className="text-[#8C5A3C]">→</span>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-block bg-[#141312] text-[#F6F4F0] px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
          >
            Ritorna all&apos;Atelier Principale →
          </Link>
        </div>
      </div>
    </div>
  );
}
