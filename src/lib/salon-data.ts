export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  image: string;
}

export type ServiceCategory = 'taglio-styling' | 'colore-balayage' | 'trattamenti' | 'spose-eventi';

export interface Service {
  id: string;
  code: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  shortDescription: string;
  technicalNotes: string;
  featured: boolean;
}

export interface CuratedPackage {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  serviceIds: string[];
  totalPriceOriginal: number;
  packagePrice: number;
  durationMinutes: number;
  idealFor: string;
}

export interface OpeningHourDay {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

export interface SalonInfo {
  name: string;
  subtitle: string;
  address: string;
  street: string;
  civic: string;
  cap: string;
  city: string;
  neighborhood: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  schedule: OpeningHourDay[];
}

export const SALON_INFO: SalonInfo = {
  name: "RUSSO Equipe Parrucchieri",
  subtitle: "Atelier di Acconciatura & Colorimetria — Direzione Artistica Patrizia Russo",
  address: "Corso Lucio Quinzio Cincinnato, 256, 10151 Torino (TO) — Quartiere Lucento",
  street: "Corso Lucio Quinzio Cincinnato",
  civic: "256",
  cap: "10151",
  city: "Torino (TO)",
  neighborhood: "Quartiere Lucento / Madonna di Campagna",
  phone: "011 242 8978",
  phoneHref: "tel:+390112428978",
  whatsappHref: "https://wa.me/390112428978",
  email: "atelier@russoequipe.it",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.324391218529!2d7.653158776632426!3d45.10091877107056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886df70783935b%3A0xbdd3543d4cba7e7a!2sCorso%20Lucio%20Quinzio%20Cincinnato%2C%20256%2C%2010151%20Torino%20TO!5e0!3m2!1sit!2sit!4v1714000000000!5m2!1sit!2sit",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Corso+Lucio+Quinzio+Cincinnato+256+10151+Torino",
  schedule: [
    { dayName: "Lunedì", dayIndex: 1, openTime: null, closeTime: null, isClosed: true },
    { dayName: "Martedì", dayIndex: 2, openTime: "10:00", closeTime: "18:00", isClosed: false },
    { dayName: "Mercoledì", dayIndex: 3, openTime: null, closeTime: null, isClosed: true },
    { dayName: "Giovedì", dayIndex: 4, openTime: "09:00", closeTime: "18:00", isClosed: false },
    { dayName: "Venerdì", dayIndex: 5, openTime: "09:00", closeTime: "19:00", isClosed: false },
    { dayName: "Sabato", dayIndex: 6, openTime: "09:00", closeTime: "19:00", isClosed: false },
    { dayName: "Domenica", dayIndex: 0, openTime: null, closeTime: null, isClosed: true },
  ],
};

export const CATEGORY_LABELS: Record<ServiceCategory, { title: string; subtitle: string; codePrefix: string }> = {
  'colore-balayage': {
    title: "Colore & Balayage",
    subtitle: "Colorimetria sartoriale a mano libera, schiariture sfumate e tonalizzazioni a pH acido.",
    codePrefix: "CB",
  },
  'taglio-styling': {
    title: "Taglio & Styling",
    subtitle: "Geometrie architettoniche su capello asciutto e umido, calibrate sui lineamenti del viso.",
    codePrefix: "TS",
  },
  'trattamenti': {
    title: "Rituali & Cura Tricologica",
    subtitle: "Protocolli biologici di rigenerazione molecolare, detox del cuoio capelluto e cheratina vegetale.",
    codePrefix: "TR",
  },
  'spose-eventi': {
    title: "Spose & Haute Coiffure",
    subtitle: "Architetture d'acconciatura per il giorno delle nozze, sfilate ed eventi esclusivi torinesi.",
    codePrefix: "SE",
  },
};

export const STYLISTS: Stylist[] = [
  {
    id: "patrizia-russo",
    name: "Patrizia Russo",
    role: "Direttrice Artistica & Master Colorist",
    specialty: "Balayage sartoriale, correzione colore complessa, taglio architettonico personalizzato",
    bio: "Fondata la propria visione sull'equilibrio tra la rigida disciplina geometrica e la morbidezza delle sfumature piemontesi, Patrizia guida l'Atelier con oltre 25 anni di dedizione alla bellezza su misura.",
    experienceYears: 26,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "elena-v",
    name: "Elena V.",
    role: "Senior Hair Stylist",
    specialty: "Taglio donna dinamico, piega editoriale, texturizzazione e styling naturale",
    bio: "Specializzata nelle forme fluide e nei volumi calibrati senza sforzo. Elena interpreta i trend contemporanei traducendoli in tagli pratici da gestire nella vita quotidiana con eleganza rilassata.",
    experienceYears: 12,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "marco-d",
    name: "Marco D.",
    role: "Specialista Schiariture & Tricologia",
    specialty: "Degradé soleil, biondi nordici e caldi, trattamenti di ricostruzione della fibra capillare",
    bio: "Profondo conoscitore della chimica del capello e dei protocolli rigenerativi molecolari. Marco progetta sfumature che mantengono intatta l'integrità strutturale del fusto capillare.",
    experienceYears: 9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
  },
];

export const SERVICES: Service[] = [
  // COLORE & BALAYAGE
  {
    id: "balayage-sartoriale",
    code: "CB-01",
    name: "Balayage Sartoriale Russo",
    category: "colore-balayage",
    price: 95,
    durationMinutes: 120,
    shortDescription: "Schiaritura a mano libera con gradazione millimetrica per un effetto luce tridimensionale, naturale e senza stacchi di ricrescita.",
    technicalNotes: "Polveri schiarenti arricchite con oli protettivi e legami rinforzati; include neutralizzazione alcalina e impacco nutriente. Mantenimento consigliato ogni 3-4 mesi.",
    featured: true,
  },
  {
    id: "degrade-soleil",
    code: "CB-02",
    name: "Degradé Soleil & Contouring Viso",
    category: "colore-balayage",
    price: 110,
    durationMinutes: 135,
    shortDescription: "Sfumatura verticale multilivello con sezioni diagonali studiate per incorniciare ed esaltare l'incarnato e gli zigomi.",
    technicalNotes: "Tre tonalità armoniche applicate in alternanza controllata. Consigliato per basi medie e scure alla ricerca di luminosità solare diffusa.",
    featured: true,
  },
  {
    id: "bagno-luce-gloss",
    code: "CB-03",
    name: "Bagno di Luce & Gloss Tonalizzante",
    category: "colore-balayage",
    price: 40,
    durationMinutes: 40,
    shortDescription: "Lucidatura cromatica a pH acido che sigilla le cuticole, ravviva i riflessi opacizzati e dona una brillantezza effetto specchio.",
    technicalNotes: "Formulazione acidificante priva di potere schiarente. Non intacca la base naturale; ideale tra un balayage e l'altro (ogni 4-6 settimane).",
    featured: true,
  },
  {
    id: "colore-radice-bio",
    code: "CB-04",
    name: "Colore Radice Senza Ammoniaca",
    category: "colore-balayage",
    price: 48,
    durationMinutes: 60,
    shortDescription: "Copertura totale e uniforme della ricrescita con pigmenti ad alta purezza arricchiti con estratti botanici calmanti per la cute.",
    technicalNotes: "Pigmenti micronizzati a rilascio progressivo. Massima delicatezza dermica senza odore irritante né sensibilizzazione del fusto.",
    featured: true,
  },
  {
    id: "baby-highlight-face-framing",
    code: "CB-05",
    name: "Schiariture Baby Highlight & Face Framing",
    category: "colore-balayage",
    price: 75,
    durationMinutes: 90,
    shortDescription: "Micro-intrecci ultra sottili focalizzati sul perimetro frontale e sulla corona per illuminare lo sguardo con delicatezza.",
    technicalNotes: "Spessore di tessitura inferiore a 2 millimetri; ideale per prime schiariture o rinfresco rapido primaverile/estivo.",
    featured: false,
  },
  {
    id: "correzione-colore-intensiva",
    code: "CB-06",
    name: "Correzione Colore & Neutralizzazione Pigmenti",
    category: "colore-balayage",
    price: 120,
    durationMinutes: 150,
    shortDescription: "Protocollo avanzato per eliminare barrature, viraggi aranciati/verdastri o sovraccaricamenti di colore sintetico pregresso.",
    technicalNotes: "Decappaggio selettivo non aggressivo seguito da doppia ripigmentazione calibrata con spettro cromatico correttivo.",
    featured: false,
  },

  // TAGLIO & STYLING
  {
    id: "taglio-architettonico-donna",
    code: "TS-01",
    name: "Taglio Architettonico Donna",
    category: "taglio-styling",
    price: 38,
    durationMinutes: 45,
    shortDescription: "Studio volumetrico su misura: sezionamento geometrico a capello umido e rifinitura a capello asciutto per un movimento che si autosostiene.",
    technicalNotes: "Forbici giapponesi a filo rasoio e texturizzatori a densità variabile. Mantiene la forma fino a 8-10 settimane dalla seduta.",
    featured: true,
  },
  {
    id: "piega-editoriale-texturizzazione",
    code: "TS-02",
    name: "Piega Editoriale & Texturizzazione",
    category: "taglio-styling",
    price: 25,
    durationMinutes: 35,
    shortDescription: "Asciugatura professionale a phon e spazzola in setole naturali con vaporizzazione termoattiva per onde morbide o liscio impeccabile.",
    technicalNotes: "Comprende shampoo specifico e maschera di idratazione rapida. Sigillatura finale a getto d'aria fredda per contrastare l'umidità di Torino.",
    featured: true,
  },
  {
    id: "taglio-sartoriale-uomo",
    code: "TS-03",
    name: "Taglio Sartoriale Uomo & Rifinitura",
    category: "taglio-styling",
    price: 28,
    durationMinutes: 30,
    shortDescription: "Graduazione millimetrica a forbice e pettine con ridefinizione del collo e delle basette in armonia con la fisionomia maschile.",
    technicalNotes: "Include lavaggio rinfrescante alla menta piperita e styling con cera opaca a base d'argilla.",
    featured: false,
  },
  {
    id: "taglio-trasformazione-styling",
    code: "TS-04",
    name: "Taglio Trasformazione & Styling Avanzato",
    category: "taglio-styling",
    price: 50,
    durationMinutes: 60,
    shortDescription: "Cambio look radicale (da lungo a bob strutturato o pixie cut) con consulenza morfologica preventiva e studio delle rosette.",
    technicalNotes: "Doppia sessione di sezionamento e coaching per la gestione dello styling a casa con gli strumenti personali della cliente.",
    featured: false,
  },

  // TRATTAMENTI
  {
    id: "rituale-ricostruzione-molecolare",
    code: "TR-01",
    name: "Rituale Ricostruzione Molecolare Cheratina",
    category: "trattamenti",
    price: 55,
    durationMinutes: 50,
    shortDescription: "Rigenerazione intensiva dei ponti disolfuro danneggiati da chimica o calore: restituisce corpo, elasticità e resistenza alla rottura.",
    technicalNotes: "Complesso peptidico a basso peso molecolare attivato a calore moderato infrarosso. Risultato visibile fin dalla prima seduta.",
    featured: true,
  },
  {
    id: "trattamento-detox-ossigenazione",
    code: "TR-02",
    name: "Trattamento Detox Cute & Ossigenazione",
    category: "trattamenti",
    price: 35,
    durationMinutes: 30,
    shortDescription: "Gommage purificante del cuoio capelluto con argille alpine ed oli essenziali per rimuovere residui di smog, sebo e forfora.",
    technicalNotes: "Include massaggio digitopressione craniale per riattivare la microcircolazione periferica e favorire la nascita di capelli sani.",
    featured: true,
  },
  {
    id: "impacco-idratante-olii-davines",
    code: "TR-03",
    name: "Impacco Nutriente Profondo Davines",
    category: "trattamenti",
    price: 42,
    durationMinutes: 40,
    shortDescription: "Bagno emolliente con burro di roucou e oli biologici per steli aridi, crespi o stressati dagli sbalzi termici urbani.",
    technicalNotes: "Tempo di posa sotto vapore umido ozonizzato per favorire la penetrazione lipidica fino al cuore del cortice.",
    featured: false,
  },
  {
    id: "rituale-anticaduta-stimolante",
    code: "TR-04",
    name: "Rituale Anticaduta & Rinforzo Fusto",
    category: "trattamenti",
    price: 45,
    durationMinutes: 45,
    shortDescription: "Fiale concentrate a base di cellule staminali vegetali e caffeina per energizzare il bulbo e prolungare la fase anagen di crescita.",
    technicalNotes: "Consigliato nei cambi stagionali (autunno/primavera) a cicli di 4-6 applicazioni bisettimanali.",
    featured: false,
  },

  // SPOSE & EVENTI
  {
    id: "acconciatura-sposa-haute-couture",
    code: "SE-01",
    name: "Acconciatura Sposa Alta Moda & Studio Stile",
    category: "spose-eventi",
    price: 180,
    durationMinutes: 120,
    shortDescription: "Creazione monumentale e duratura per il giorno delle nozze, calibrata sullo scollo dell'abito, sul velo e sul gioiello.",
    technicalNotes: "Include fissaggio a memoria di forma resistente a intemperie, umidità e abbracci; assistenza per l'ancoraggio del velo.",
    featured: true,
  },
  {
    id: "acconciatura-eventi-chignon",
    code: "SE-02",
    name: "Acconciatura Eventi & Chignon Scultoreo",
    category: "spose-eventi",
    price: 65,
    durationMinutes: 60,
    shortDescription: "Raccolto o semiraccolto sofisticato per serate di gala, teatro Regio, lauree ed eventi esclusivi torinesi.",
    technicalNotes: "Linee pulite o intrecci decostruiti a tenuta invisibile con spille brunite sartoriali.",
    featured: true,
  },
  {
    id: "prova-sposa-personalizzata",
    code: "SE-03",
    name: "Prova Acconciatura Sposa in Atelier",
    category: "spose-eventi",
    price: 80,
    durationMinutes: 75,
    shortDescription: "Sessione esplorativa con test di 2 variazioni di stile, report fotografico e verifica dei punti di ancoraggio per velo e tiara.",
    technicalNotes: "Richiede l'invio preventivo o la visione delle foto dell'abito per armonizzare la silhouette complessiva.",
    featured: false,
  },
];

export const CURATED_PACKAGES: CuratedPackage[] = [
  {
    id: "percorso-luce",
    code: "PK-01",
    name: "Percorso Luce Completa Russo",
    subtitle: "Balayage + Bagno di Luce Gloss + Taglio Architettonico + Piega",
    description: "L'esperienza trasformativa per eccellenza dell'Atelier Russo. Unisce la nostra tecnica di schiaritura signature a mano libera, la lucidatura gloss a pH acido, la purezza del taglio geometrico e la piega editoriale.",
    serviceIds: ["balayage-sartoriale", "bagno-luce-gloss", "taglio-architettonico-donna", "piega-editoriale-texturizzazione"],
    totalPriceOriginal: 198,
    packagePrice: 185,
    durationMinutes: 240,
    idealFor: "Chi desidera una metamorfosi radiosa, raffinata e completamente su misura per la stagione.",
  },
  {
    id: "percorso-rinascita",
    code: "PK-02",
    name: "Percorso Rinascita & Cura Molecolare",
    subtitle: "Detox Cute + Ricostruzione Cheratina + Taglio + Piega",
    description: "Un protocollo olistico di salute tricologica che parte dalla purificazione profonda del cuoio capelluto, prosegue con la riparazione molecolare dei legami interni del capello e si conclude con la forma sartoriale perfetta.",
    serviceIds: ["trattamento-detox-ossigenazione", "rituale-ricostruzione-molecolare", "taglio-architettonico-donna", "piega-editoriale-texturizzazione"],
    totalPriceOriginal: 153,
    packagePrice: 140,
    durationMinutes: 160,
    idealFor: "Capelli sensibilizzati, spenti o sfibrati che necessitano di nuova densità strutturale e vigore.",
  },
  {
    id: "percorso-sposa",
    code: "PK-03",
    name: "Percorso Sposa & Cerimonia Sublime",
    subtitle: "Acconciatura Sposa + Bagno di Luce Gloss + Rituale Ricostruzione",
    description: "La preparazione regale per il giorno più memorabile: fibra capillare rimpolpata a livello molecolare, lucentezza a specchio per gli scatti fotografici e tenuta scultorea impeccabile da mattina a notte.",
    serviceIds: ["rituale-ricostruzione-molecolare", "bagno-luce-gloss", "acconciatura-sposa-haute-couture"],
    totalPriceOriginal: 275,
    packagePrice: 250,
    durationMinutes: 210,
    idealFor: "Future spose ed invitate d'onore che esigono perfezione assoluta senza compromessi.",
  },
];

export const EDITORIAL_PHOTOS = {
  hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85",
  balayage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  architecturalCut: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
  botanicalRitual: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
  stylingFinish: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85",
};

export interface SalonLiveStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  nextEventText: string;
  currentDayName: string;
  romeTimeFormatted: string;
}

/**
 * Calculates real-time salon opening status in Europe/Rome timezone
 */
export function getSalonCurrentStatus(customDate?: Date): SalonLiveStatus {
  const now = customDate || new Date();

  // Convert to Europe/Rome time
  const romeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    hour12: false,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  });

  const parts = romeFormatter.formatToParts(now);
  let weekdayShort = "";
  let hour = 0;
  let minute = 0;

  for (const p of parts) {
    if (p.type === "weekday") weekdayShort = p.value;
    if (p.type === "hour") hour = parseInt(p.value, 10);
    if (p.type === "minute") minute = parseInt(p.value, 10);
  }

  // Day index mapping (0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat)
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayIndex = dayMap[weekdayShort] ?? now.getDay();
  const currentTotalMinutes = hour * 60 + minute;
  const timeFormatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  const todaySchedule = SALON_INFO.schedule.find((s) => s.dayIndex === dayIndex) || SALON_INFO.schedule[0];

  let isOpen = false;
  let statusText = "";
  let badgeLabel = "";
  let nextEventText = "";

  if (!todaySchedule.isClosed && todaySchedule.openTime && todaySchedule.closeTime) {
    const [openH, openM] = todaySchedule.openTime.split(":").map(Number);
    const [closeH, closeM] = todaySchedule.closeTime.split(":").map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
      isOpen = true;
      badgeLabel = `APERTO ORA • CHIUDE ALLE ${todaySchedule.closeTime}`;
      statusText = `Siamo aperti in Atelier. Chiudiamo alle ore ${todaySchedule.closeTime}.`;
      nextEventText = `Chiusura ore ${todaySchedule.closeTime}`;
    } else if (currentTotalMinutes < openMinutes) {
      isOpen = false;
      badgeLabel = `CHIUSO ORA • APRE ALLE ${todaySchedule.openTime}`;
      statusText = `Apertura odierna prevista per le ore ${todaySchedule.openTime}.`;
      nextEventText = `Oggi alle ore ${todaySchedule.openTime}`;
    } else {
      isOpen = false;
    }
  }

  // If currently closed and not opening later today, calculate next opening day
  if (!isOpen && !nextEventText) {
    // Find next open day in cyclic order
    let daysAhead = 1;
    let foundNextDay: OpeningHourDay | null = null;
    while (daysAhead <= 7) {
      const nextIdx = (dayIndex + daysAhead) % 7;
      const candidate = SALON_INFO.schedule.find((s) => s.dayIndex === nextIdx);
      if (candidate && !candidate.isClosed && candidate.openTime) {
        foundNextDay = candidate;
        break;
      }
      daysAhead++;
    }

    if (foundNextDay) {
      const when = daysAhead === 1 ? "Domani" : foundNextDay.dayName;
      badgeLabel = `CHIUSO ORA • PROSSIMA APERTURA: ${when.toUpperCase()} ${foundNextDay.openTime}`;
      statusText = `Atelier attualmente chiuso. Prossima apertura ${when} alle ore ${foundNextDay.openTime}.`;
      nextEventText = `${when} ore ${foundNextDay.openTime}`;
    } else {
      badgeLabel = `CHIUSO ORA • SU APPUNTAMENTO`;
      statusText = "Atelier attualmente chiuso al pubblico.";
      nextEventText = "Su appuntamento";
    }
  }

  return {
    isOpen,
    statusText,
    badgeLabel,
    nextEventText,
    currentDayName: todaySchedule.dayName,
    romeTimeFormatted: timeFormatted,
  };
}
