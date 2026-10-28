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
              Artigiani della forma e coloristi d&apos;esperienza guidati dalla visione di Patrizia Russo. Ciascun professionista apporta una specializzazione specifica a servizio del tuo benessere.
            </p>
          </div>

          <div className="font-mono text-xs text-[#5C5852]">
            <span>3 SPECIALISTI DEDICATI</span>
            <span className="mx-2">•</span>
            <span>FORMAZIONE CONTINUA MILANO &amp; PARIGI</span>
          </div>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
          {STYLISTS.map((stylist, index) => (
            <div
              key={stylist.id}
              className="border border-[#DED9D0] bg-[#EFECE6] flex flex-col justify-between group transition-shadow duration-300"
            >
              {/* Portrait Frame */}
              <div className="relative aspect-4/5 w-full bg-[#141312] overflow-hidden border-b border-[#DED9D0]">
                <Image
                  src={stylist.image}
                  alt={`${stylist.name} — ${stylist.role}`}
                  fill
                  className="object-cover object-top filter sepia-[0.08] contrast-[1.04] grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#141312]/90 text-[#F6F4F0] px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-[#2A2826]">
                  0{index + 1} — {stylist.experienceYears} ANNI ESPERIENZA
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#141312] tracking-wide">
                    {stylist.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#8C5A3C] font-semibold mt-1">
                    {stylist.role}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#DED9D0]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5852] block mb-1">
                      SPECIALIZZAZIONE ATELIER
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
