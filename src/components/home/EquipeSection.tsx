import React from "react";
import Image from "next/image";
import Link from "next/link";
import { STYLISTS } from "@/lib/salon-data";

export default function EquipeSection() {
  return (
    <section className="py-20 sm:py-28 border-b border-[#DED9D0] bg-[#F6F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DED9D0]">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C5A3C] block font-semibold mb-2">
              MAESTRANZE &amp; VISIONE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141312] tracking-tight">
              L&apos;Equipe dell&apos;Atelier
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5C5852] mt-3 max-w-xl">
              Artigiani della forma e coloristi d&apos;esperienza guidati dalla visione di Patrizia Russo. Ciascun professionista unisce rigore geometrico ed estetica sartoriale.
            </p>
          </div>

          <div className="font-mono text-xs text-[#5C5852] flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#EFECE6] border border-[#DED9D0]">3 SPECIALISTI DEDICATI</span>
            <span>•</span>
            <span className="px-2.5 py-1 bg-[#EFECE6] border border-[#DED9D0]">FORMAZIONE MILANO &amp; PARIGI</span>
          </div>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
          {STYLISTS.map((stylist, index) => (
            <div
              key={stylist.id}
              className="border border-[#DED9D0] bg-[#EFECE6] flex flex-col justify-between group transition-shadow duration-300"
            >
              {/* Editorial Craft & Monogram Frame (strictly constrained, no generic faces) */}
              <div className="relative aspect-4/5 w-full max-h-[380px] bg-[#141312] overflow-hidden border-b border-[#DED9D0]">
                <Image
                  src={stylist.image}
                  alt={`${stylist.name} — ${stylist.role}`}
                  fill
                  className="object-cover object-center filter sepia-[0.08] contrast-[1.04] grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                
                {/* Monogram Badge Top Right */}
                <div className="absolute top-4 right-4 bg-[#141312]/90 text-[#F6F4F0] px-3 py-1.5 font-serif text-sm tracking-widest border border-[#2A2826] backdrop-blur-xs">
                  {stylist.monogram || `0${index + 1}`}
                </div>

                {/* Technical Metric Tag Top Left */}
                <div className="absolute top-4 left-4 bg-[#F6F4F0]/95 text-[#141312] px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-[#DED9D0]">
                  {stylist.experienceYears} ANNI ESPERIENZA
                </div>

                {/* Subtle Bottom Craft Description Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#141312] via-[#141312]/70 to-transparent">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#DED9D0] block">
                    DOSSIER TECNICO CRAFT • ATELIER RUSSO TORINO
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-normal text-[#141312] tracking-wide">
                      {stylist.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[#8C5A3C] uppercase tracking-widest font-semibold">
                      {stylist.monogram || `ST-0${index + 1}`}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#8C5A3C] font-semibold mt-1">
                    {stylist.role}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#DED9D0]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5852] block mb-1">
                      SPECIALIZZAZIONE DI FIRMA
                    </span>
                    <p className="font-sans text-xs font-medium text-[#141312] leading-snug">
                      {stylist.specialty}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-[#5C5852] leading-relaxed mt-3">
                    {stylist.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DED9D0]">
                  <Link
                    href={`/prenota?stylist=${stylist.id}`}
                    className="w-full block text-center bg-[#141312] text-[#F6F4F0] py-3 px-4 font-mono text-[11px] uppercase tracking-widest hover:bg-[#8C5A3C] transition-colors border border-[#141312]"
                  >
                    Prenota con {stylist.name.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
