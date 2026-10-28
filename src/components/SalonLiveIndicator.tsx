"use client";

import React, { useState, useEffect } from "react";
import { getSalonCurrentStatus, SalonLiveStatus } from "@/lib/salon-data";

export default function SalonLiveIndicator() {
  const [status, setStatus] = useState<SalonLiveStatus>(() => getSalonCurrentStatus());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setStatus(getSalonCurrentStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
      <span
        className={`w-2 h-2 rounded-none shrink-0 ${
          status.isOpen ? "bg-[#2E7D32]" : "bg-[#8C5A3C]"
        }`}
        title={status.isOpen ? "Aperto in questo momento" : "Chiuso in questo momento"}
      />
      <span className={status.isOpen ? "text-[#141312] font-medium" : "text-[#5C5852]"}>
        {status.badgeLabel}
      </span>
      <span className="text-[#DED9D0] hidden lg:inline">|</span>
      <span className="text-[#5C5852] hidden lg:inline lowercase tracking-normal">
        {status.romeTimeFormatted} ora locale
      </span>
    </div>
  );
}
