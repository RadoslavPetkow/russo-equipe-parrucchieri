"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Service, SERVICES, CURATED_PACKAGES } from "@/lib/salon-data";

export type BookingStatus = "confermato" | "in_attesa" | "completato" | "annullato";

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  stylistId: string;
  stylistName: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  totalDurationMinutes: number;
  date: string;
  time: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

interface RitualContextType {
  selectedServices: Service[];
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: Service) => void;
  replaceServices: (services: Service[]) => void;
  clearServices: () => void;
  addPackage: (packageId: string) => void;
  isServiceSelected: (serviceId: string) => boolean;
  totalPrice: number;
  totalDurationMinutes: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  // Bookings management
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-2401",
    clientName: "Giulia Morante",
    clientPhone: "333 459 1284",
    clientEmail: "giulia.morante@gmail.com",
    stylistId: "patrizia-russo",
    stylistName: "Patrizia Russo",
    serviceIds: ["balayage-sartoriale", "piega-editoriale-texturizzazione"],
    serviceNames: ["Balayage Sartoriale Russo", "Piega Editoriale & Texturizzazione"],
    totalPrice: 120,
    totalDurationMinutes: 155,
    date: "2026-10-30",
    time: "10:30",
    notes: "Schiariture naturali tono su tono, capelli lunghi alle scapole. Desidera sfumatura sabbia dorato.",
    status: "confermato",
    createdAt: "2026-10-27T14:20:00Z",
  },
  {
    id: "BK-2402",
    clientName: "Chiara Ferretti",
    clientPhone: "340 891 2240",
    clientEmail: "c.ferretti@libero.it",
    stylistId: "elena-v",
    stylistName: "Elena V.",
    serviceIds: ["taglio-architettonico-donna", "bagno-luce-gloss"],
    serviceNames: ["Taglio Architettonico Donna", "Bagno di Luce & Gloss Tonalizzante"],
    totalPrice: 78,
    totalDurationMinutes: 85,
    date: "2026-10-30",
    time: "14:00",
    notes: "Bob geometrico scalato morbido, riflessi castano nocciola freddo. Prima visita in atelier.",
    status: "confermato",
    createdAt: "2026-10-27T16:45:00Z",
  },
  {
    id: "BK-2403",
    clientName: "Matteo Bellini",
    clientPhone: "349 712 3098",
    clientEmail: "matteo.bellini@polito.it",
    stylistId: "elena-v",
    stylistName: "Elena V.",
    serviceIds: ["taglio-sartoriale-uomo"],
    serviceNames: ["Taglio Sartoriale Uomo & Rifinitura"],
    totalPrice: 28,
    totalDurationMinutes: 30,
    date: "2026-10-31",
    time: "11:30",
    notes: "Rifinitura collo a forbice, sfumatura classica laterale, cliente abituale.",
    status: "confermato",
    createdAt: "2026-10-28T09:15:00Z",
  },
  {
    id: "BK-2404",
    clientName: "Silvia Castaldi",
    clientPhone: "328 114 9870",
    clientEmail: "castaldi.silvia@virgilio.it",
    stylistId: "marco-d",
    stylistName: "Marco D.",
    serviceIds: ["rituale-ricostruzione-molecolare", "piega-editoriale-texturizzazione"],
    serviceNames: ["Rituale Ricostruzione Molecolare Cheratina", "Piega Editoriale & Texturizzazione"],
    totalPrice: 80,
    totalDurationMinutes: 85,
    date: "2026-10-31",
    time: "15:00",
    notes: "Capelli sensibilizzati post-decolorazione chimica. Test porosità e ricostruzione termica.",
    status: "in_attesa",
    createdAt: "2026-10-28T11:00:00Z",
  },
  {
    id: "BK-2405",
    clientName: "Valentina Rossi",
    clientPhone: "338 903 4412",
    clientEmail: "valentina.rossi@studiolegale.to.it",
    stylistId: "patrizia-russo",
    stylistName: "Patrizia Russo",
    serviceIds: ["acconciatura-eventi-chignon"],
    serviceNames: ["Acconciatura Eventi & Chignon Scultoreo"],
    totalPrice: 65,
    totalDurationMinutes: 60,
    date: "2026-10-31",
    time: "17:00",
    notes: "Raccolto scultoreo basso per serata di gala al Teatro Regio di Torino. Richiede tenuta senza lacca pesante.",
    status: "confermato",
    createdAt: "2026-10-28T13:30:00Z",
  },
];

const STORAGE_KEY_SERVICES = "russo_selected_services_v1";
const STORAGE_KEY_BOOKINGS = "russo_salon_bookings_v1";

function getInitialServices(): Service[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SERVICES);
    if (stored) {
      const parsedIds: string[] = JSON.parse(stored);
      return parsedIds
        .map((id) => SERVICES.find((s) => s.id === id))
        .filter((s): s is Service => Boolean(s));
    }
  } catch (e) {
    console.warn("Could not read services from localStorage:", e);
  }
  return [];
}

function getInitialBookings(): Booking[] {
  if (typeof window === "undefined") return INITIAL_BOOKINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  } catch (e) {
    console.warn("Could not read bookings from localStorage:", e);
  }
  return INITIAL_BOOKINGS;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export function RitualProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Service[]>(getInitialServices);
  const [bookings, setBookings] = useState<Booking[]>(getInitialBookings);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync services changes to localStorage
  useEffect(() => {
    try {
      const ids = selectedServices.map((s) => s.id);
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(ids));
    } catch (e) {
      console.warn("Could not save services to localStorage:", e);
    }
  }, [selectedServices]);

  // Sync bookings changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn("Could not save bookings to localStorage:", e);
    }
  }, [bookings]);

  const addService = (service: Service) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeService = (serviceId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const clearServices = () => {
    setSelectedServices([]);
  };

  const replaceServices = (services: Service[]) => {
    setSelectedServices(services);
  };

  const addPackage = (packageId: string) => {
    const pkg = CURATED_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) return;

    const packageServices = pkg.serviceIds
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter((s): s is Service => Boolean(s));

    setSelectedServices((prev) => {
      const combined = [...prev];
      packageServices.forEach((serv) => {
        if (!combined.some((s) => s.id === serv.id)) {
          combined.push(serv);
        }
      });
      return combined;
    });

    setIsDrawerOpen(true);
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((acc, s) => acc + s.price, 0);
  }, [selectedServices]);

  const totalDurationMinutes = useMemo(() => {
    return selectedServices.reduce((acc, s) => acc + s.durationMinutes, 0);
  }, [selectedServices]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <RitualContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        toggleService,
        replaceServices,
        clearServices,
        addPackage,
        isServiceSelected,
        totalPrice,
        totalDurationMinutes,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
      }}
    >
      {children}
    </RitualContext.Provider>
  );
}

export function useRitual() {
  const context = useContext(RitualContext);
  if (!context) {
    throw new Error("useRitual must be used within a RitualProvider");
  }
  return context;
}
