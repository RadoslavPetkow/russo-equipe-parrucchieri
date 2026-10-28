import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SignatureServicesMatrix from "@/components/home/SignatureServicesMatrix";
import MetodoRussoSection from "@/components/home/MetodoRussoSection";
import EquipeSection from "@/components/home/EquipeSection";
import DiagnosticBanner from "@/components/home/DiagnosticBanner";

export default function HomePage() {
  return (
    <>
      {/* 01. Architectural Editorial Hero */}
      <HeroSection />

      {/* 02. Interactive Signature Services Matrix */}
      <SignatureServicesMatrix />

      {/* 03. Il Metodo Russo (3-Pillar Editorial Breakdown) */}
      <MetodoRussoSection />

      {/* 04. L'Equipe & Direzione Artistica */}
      <EquipeSection />

      {/* 05. Interactive Diagnostic Banner */}
      <DiagnosticBanner />
    </>
  );
}
