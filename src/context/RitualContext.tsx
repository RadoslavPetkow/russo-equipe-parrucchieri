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

export interface ClientCard {
  id: string;
  clientName: string;
  phone: string;
  email?: string;
  naturalBase: string;
  whiteHairPercent: string;
  formulaAbituale: string;
  scalpSensitivity: string;
  treatmentHistory: string;
  lastVisit: string;
  notes?: string;
}

export type InquiryType = "correzione_colore" | "sposa_cerimonia" | "richiamata" | "altro";

export interface SalonInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  requestType: InquiryType;
  preferredDate?: string;
  message: string;
  status: "nuova" | "gestita";
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

  // CRM Technical Cards
  clientCards: ClientCard[];
  addClientCard: (card: Omit<ClientCard, "id">) => ClientCard;
  updateClientCard: (id: string, card: Partial<ClientCard>) => void;
  deleteClientCard: (id: string) => void;

  // Inquiries / Desk Inbox
  inquiries: SalonInquiry[];
  addInquiry: (inquiry: Omit<SalonInquiry, "id" | "status" | "createdAt">) => SalonInquiry;
  updateInquiryStatus: (id: string, status: "nuova" | "gestita") => void;
  deleteInquiry: (id: string) => void;

  // Executive Tools
  resetDemoData: () => void;
  exportBookingsCSV: () => void;
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

const INITIAL_CLIENT_CARDS: ClientCard[] = [
  {
    id: "CL-101",
    clientName: "Giulia Ferrero",
    phone: "333 459 1284",
    email: "giulia.ferrero@gmail.com",
    naturalBase: "Livello 6 — Biondo Scuro Naturale",
    whiteHairPercent: "0%",
    formulaAbituale: "Balayage Sabbia Dorato a mano libera 20 vol + Gloss 9.13 con pH acido",
    scalpSensitivity: "Normale ed equilibrata",
    treatmentHistory: "Schiariture regolari da 3 anni, fibra sana e resistente",
    lastVisit: "2026-10-15",
    notes: "Predilige piega a onde morbide con finitura aria fredda e vaporizzazione leggera.",
  },
  {
    id: "CL-102",
    clientName: "Valentina Rossi",
    phone: "338 903 4412",
    email: "valentina.rossi@studiolegale.to.it",
    naturalBase: "Livello 4 — Castano Medio",
    whiteHairPercent: "25% perimetro frontale",
    formulaAbituale: "Colore Radice Bio 5.0 + 5.3 senza ammoniaca + Gloss Tonalizzante Nocciola",
    scalpSensitivity: "Sensibile (necessita olio protettivo cutaneo preliminare)",
    treatmentHistory: "Copertura mensile costante, mai decolorazione pesante",
    lastVisit: "2026-10-22",
    notes: "Utilizza shampoo lenitivo eudermico Davines a casa; evitare spazzole rigide.",
  },
  {
    id: "CL-103",
    clientName: "Chiara Monti",
    phone: "340 891 2240",
    email: "chiara.monti@polito.it",
    naturalBase: "Livello 5 — Castano Chiaro",
    whiteHairPercent: "5%",
    formulaAbituale: "Bob geometrico scalato + Bagno di Luce Miele Freddo 8.21",
    scalpSensitivity: "Equilibrata",
    treatmentHistory: "Taglio regolare ogni 8 settimane, perimetri netti",
    lastVisit: "2026-10-08",
    notes: "Tagliare sempre a capello asciutto per la rosetta sinistra sulla corona.",
  },
  {
    id: "CL-104",
    clientName: "Elena Galli",
    phone: "347 650 9182",
    email: "elena.galli@libero.it",
    naturalBase: "Livello 7 — Biondo Medio",
    whiteHairPercent: "0%",
    formulaAbituale: "Baby Highlights micro-tessuti corona + Gloss Perla 10.12",
    scalpSensitivity: "Normale",
    treatmentHistory: "Formazione schiariture con Patrizia Russo dal 2024",
    lastVisit: "2026-09-28",
    notes: "Esige riflessi nordici freddi senza viraggi caldi né ramati.",
  },
  {
    id: "CL-105",
    clientName: "Sofia Conti",
    phone: "329 118 7633",
    email: "s.conti@unito.it",
    naturalBase: "Livello 3 — Castano Scuro",
    whiteHairPercent: "40% diffusa",
    formulaAbituale: "Colore Radice Bio 4.0 + Tonalizzazione Cioccolato 5.35 su lunghezze",
    scalpSensitivity: "Cute secca disidratata",
    treatmentHistory: "Trattamento detox + cheratina effettuato periodicamente",
    lastVisit: "2026-10-10",
    notes: "Richiede sempre tempo per massaggio craniale digitopressione prolungato.",
  },
];

const INITIAL_INQUIRIES: SalonInquiry[] = [
  {
    id: "INQ-501",
    name: "Francesca B. (Torino Crocetta)",
    phone: "331 829 4401",
    email: "francesca.b@studiolegale.to.it",
    requestType: "sposa_cerimonia",
    preferredDate: "2027-06-12",
    message: "Cerco un atelier a Torino per acconciatura sposa e studio del velo. Matrimonio a Superga. Vorrei fissare una prova conoscitiva con Patrizia Russo.",
    status: "nuova",
    createdAt: "2026-10-28T10:15:00Z",
  },
  {
    id: "INQ-502",
    name: "Laura Marchesi (Torino Centro)",
    phone: "348 290 1198",
    email: "laura.marchesi@virgilio.it",
    requestType: "correzione_colore",
    preferredDate: "2026-11-05",
    message: "Ho fatto un balayage altrove ma è virato verso un aranciato a strisce. Ho bisogno urgente di una consulenza correttiva prima di un viaggio di lavoro.",
    status: "gestita",
    createdAt: "2026-10-27T16:30:00Z",
  },
];

const STORAGE_KEY_SERVICES = "russo_selected_services_v1";
const STORAGE_KEY_BOOKINGS = "russo_salon_bookings_v1";
const STORAGE_KEY_CLIENTS = "russo_salon_client_cards_v1";
const STORAGE_KEY_INQUIRIES = "russo_salon_inquiries_v1";

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

function getInitialClients(): ClientCard[] {
  if (typeof window === "undefined") return INITIAL_CLIENT_CARDS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CLIENTS);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(INITIAL_CLIENT_CARDS));
  } catch (e) {
    console.warn("Could not read clients from localStorage:", e);
  }
  return INITIAL_CLIENT_CARDS;
}

function getInitialInquiries(): SalonInquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  } catch (e) {
    console.warn("Could not read inquiries from localStorage:", e);
  }
  return INITIAL_INQUIRIES;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export function RitualProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Service[]>(getInitialServices);
  const [bookings, setBookings] = useState<Booking[]>(getInitialBookings);
  const [clientCards, setClientCards] = useState<ClientCard[]>(getInitialClients);
  const [inquiries, setInquiries] = useState<SalonInquiry[]>(getInitialInquiries);
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

  // Sync clients changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(clientCards));
    } catch (e) {
      console.warn("Could not save client cards to localStorage:", e);
    }
  }, [clientCards]);

  // Sync inquiries changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn("Could not save inquiries to localStorage:", e);
    }
  }, [inquiries]);

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

  const replaceServices = (services: Service[]) => {
    setSelectedServices(services);
  };

  const clearServices = () => {
    setSelectedServices([]);
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

  // Bookings CRUD
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

  // CRM Technical Cards CRUD
  const addClientCard = (cardData: Omit<ClientCard, "id">): ClientCard => {
    const newCard: ClientCard = {
      ...cardData,
      id: `CL-${Math.floor(200 + Math.random() * 800)}`,
    };
    setClientCards((prev) => [newCard, ...prev]);
    return newCard;
  };

  const updateClientCard = (id: string, updatedFields: Partial<ClientCard>) => {
    setClientCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteClientCard = (id: string) => {
    setClientCards((prev) => prev.filter((c) => c.id !== id));
  };

  // Inquiries CRUD
  const addInquiry = (inquiryData: Omit<SalonInquiry, "id" | "status" | "createdAt">): SalonInquiry => {
    const newInquiry: SalonInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(600 + Math.random() * 400)}`,
      status: "nuova",
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: "nuova" | "gestita") => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(INITIAL_CLIENT_CARDS));
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
    setBookings(INITIAL_BOOKINGS);
    setClientCards(INITIAL_CLIENT_CARDS);
    setInquiries(INITIAL_INQUIRIES);
  };

  // Export Bookings CSV
  const exportBookingsCSV = () => {
    const headers = ["Codice", "Cliente", "Telefono", "Email", "Stilista", "Servizi", "Data", "Ora", "DurataMin", "PrezzoEUR", "Stato"];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.clientName.replace(/"/g, '""')}"`,
      `"${b.clientPhone}"`,
      `"${b.clientEmail}"`,
      `"${b.stylistName}"`,
      `"${b.serviceNames.join(", ")}"`,
      b.date,
      b.time,
      b.totalDurationMinutes,
      b.totalPrice,
      b.status,
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `registro-appuntamenti-russo-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        clientCards,
        addClientCard,
        updateClientCard,
        deleteClientCard,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,

        resetDemoData,
        exportBookingsCSV,
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
