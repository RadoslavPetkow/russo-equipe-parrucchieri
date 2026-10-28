# RUSSO Equipe Parrucchieri • Torino
### Atelier di Acconciatura & Colorimetria — Direzione Artistica Patrizia Russo
> **Sede:** Corso Lucio Quinzio Cincinnato, 256, 10151 Torino (TO) — Quartiere Lucento  
> **Telefono Atelier:** [`011 242 8978`](tel:+390112428978) | **WhatsApp:** [`+39 011 242 8978`](https://wa.me/390112428978)  
> **Orari d'Atelier (Europe/Rome):** Mar 10:00–18:00 | Gio 09:00–18:00 | Ven–Sab 09:00–19:00 | Lun, Mer, Dom: Chiuso

---

## 1. Executive Summary & Vision Commerciale

**RUSSO Equipe Parrucchieri** è una piattaforma digitale sartoriale di livello enterprise concepita per sostituire i generici gestionali e i siti vetrina convenzionali con un'esperienza ad altissimo impatto visivo e funzionale, ispirata all'editoria d'alta moda milanese e torinese (*Davines, Aesop, Vogue Italia*).

La piattaforma unisce l'eccellenza artigianale della colorimetria di Patrizia Russo a una suite commerciale interattiva che guida la cliente dalla diagnosi personalizzata fino alla gestione operativa dell'Atelier:

- **Estetica Anti-AI Craft:** Griglia svizzera con bordi hairlines da `1px solid` (`#DED9D0`), spigoli vivi squadrati (`rounded-none`), contrasto tipografico editoriale (*Cormorant Garamond*, *Plus Jakarta Sans*, *JetBrains Mono*) e superfici tattili alabastro/travertino.
- **Data Layer Centralizzato:** Calcolo in tempo reale dello stato d'apertura nel fuso orario di Torino (`Europe/Rome`), catalogo servizi con formulazioni tecniche, e database équipe dedicato.
- **Architettura Reattiva Client-Side:** Persistenza su `localStorage` con sincronizzazione reattiva immediata tra carrello del rituale, agenda appuntamenti, schede colore CRM e casella messaggi concierge.

---

## 2. Le 7 Rotte di Produzione

| Rotta | Modulo | Descrizione Operativa |
| :--- | :--- | :--- |
| **`/`** | **Atelier Home** | Hero editoriale ad alto impatto, Matrice dei Servizi Signature, Metodo Russo in 3 pilastri, dossier delle maestranze (`PR / 01`, `EV / 02`, `MD / 03`) e badge diagnostico. |
| **`/listino`** | **Menu Sartoriale** | Listino interattivo con filtro per categorie (`CB`, `TS`, `TR`, `SE`), ricerca istantanea, note tecniche espandibili, 3 percorsi esclusivi e carrello persistente del rituale. |
| **`/consulenza`** | **Diagnosi Capelli** | Motore diagnostico a 4 step che calcola in tempo reale la *Scheda Diagnostica Atelier Russo* (profilo tecnico, rischio porosità, servizi consigliati e specialista assegnato con motivazione). |
| **`/lookbook`** | **Archivio Look** | Galleria fotografica editoriale con filtro per stili e modal con scheda tecnica formulativa chimica (es. pH, volumi ossigeno, toner) e iniezione diretta nel rituale. |
| **`/prenota`** | **Prenotazione & Slot** | Calendario a 14 giorni con blocco dei giorni di chiusura, rilevamento conflitti di orario in tempo reale, voucher stampabile, link WhatsApp e download del file `.ics` (iCalendar). |
| **`/contatti`** | **Contatti & Quartiere Lucento** | Orario settimanale con evidenziazione del giorno odierno, stato aperto/chiuso reattivo, mappa interattiva con toggle monocromatico, indicazioni di transito e modulo di contatto collegato al CRM. |
| **`/gestione`** | **Suite Gestionale ERP & CRM** | Cruscotto direzionale completo per Patrizia Russo: metriche live (fatturato, scontrino medio, ore salone), agenda con azioni di stato e sollecito WhatsApp, CRM schede colore clienti, casella concierge, esportazione CSV e ripristino dati demo. |

---

## 3. Il Flusso di Vendita Live in 90 Secondi (Pitch per Agente Commerciale)

Questo flusso è studiato per chiudere la vendita durante la dimostrazione dal vivo con il titolare del salone (*Patrizia Russo* o responsabile atelier):

```
[1. Atelier Home /] ──> [2. Diagnosi /consulenza] ──> [3. Prenota /prenota] ──> [4. ERP /gestione]
```

1. **Step 1 — Impatto e Riconoscimento Locale (`/`):**
   - Mostra la barra superiore con l'indirizzo esatto (*Corso Cincinnato 256, Torino*) e l'indicatore verde/rosso con orario reale torinese.
   - Scorri la *Matrice dei Servizi*: clicca su un servizio (*Balayage Sartoriale Russo*) per mostrare il vassoio dinamico in alto a destra che calcola prezzo e minutaggio.

2. **Step 2 — La Diagnosi Interattiva ad Alto Valore (`/consulenza`):**
   - Guida il cliente attraverso i 4 step: fibra fine, capello sensibilizzato da precedenti decolorazioni, obiettivo luce balayage, mantenimento regolare.
   - Mostra la generazione immediata della **Scheda Diagnostica**: evidenzia il rischio di porosità calcolato e l'abbinamento automatico del protocollo protettivo.
   - Clicca sul pulsante d'azione: **"Applica Protocollo e Prenota Ora"**.

3. **Step 3 — Prenotazione Sartoriale Senza Attrito (`/prenota`):**
   - Nota come i servizi diagnostici sono già precaricati nel modulo con stilista assegnato (*Patrizia Russo*).
   - Mostra la disabilitazione automatica delle giornate di chiusura (Lunedì, Mercoledì, Domenica).
   - Seleziona data e orario (mostra il badge di slot disponibile / prevenzione conflitti).
   - Completa la prenotazione dimostrativa: mostra il **Voucher Sartoriale**, il pulsante di download del promemoria `.ics` per Apple/Google Calendar e l'anteprima del messaggio WhatsApp precompilato.

4. **Step 4 — Chiusura Commerciale nel Cruscotto Direzionale (`/gestione`):**
   - Accedi a `/gestione`: fai notare al titolare che l'appuntamento appena creato è già visibile nell'agenda, con fatturato e ore stimate aggiornati in tempo reale nella barra executive.
   - Mostra il pulsante **"Promemoria WhatsApp"** a 1 clic per confermare l'appuntamento alla cliente con testo professionale già redatto.
   - Apri il **Tab 02 (Schede Tecniche Clienti)** per mostrare lo storico formule colore (es. tonalizzazione 9.21 + 10.02 a 5 volumi su base naturale 6).
   - Dimostra il download immediato dell'archivio in **`.CSV`** per il commercialista o gestionale di cassa.

---

## 4. Protocollo Reset Dati Demo ("Ripristina Dati Demo")

Prima di ogni incontro commerciale o presentazione dal vivo, è fondamentale presentare l'agenda con dati coerenti e realistici:

1. Naviga su **`/gestione`**.
2. Nella barra executive superiore, individua il pulsante:
   ```
   [ ↺ RIPRISTINA DATI DEMO ]
   ```
3. Clicca sul pulsante e conferma l'azione.
4. L'applicazione ripristinerà istantaneamente il database locale con:
   - 5 appuntamenti realistici distribuiti tra Patrizia, Elena e Marco.
   - 5 schede colore storiche per clienti torinesi con formule chimiche dettagliate (`CL-101` a `CL-105`).
   - 2 richieste di conciergerie in attesa (`INQ-501` e `INQ-502`).
   - Carrello del rituale svuotato e pronto per una nuova simulazione.

---

## 5. Specifiche Tecniche & Stack Software

- **Framework:** [Next.js 16.4.3](https://nextjs.org/) con App Router e Turbopack.
- **Libreria UI:** React 19.3.0.
- **Motore di Stile:** Tailwind CSS v4.3 con `@tailwindcss/postcss` e isolamento strict in `@layer base` e `@layer utilities`.
- **Tipografia Ottimizzata:** `next/font/google` con *Cormorant Garamond* (Serif), *Plus Jakarta Sans* (Sans-serif) e *JetBrains Mono* (Monospace tabular).
- **Tipizzazione:** TypeScript 5 strict con modelli dati esaurienti in `src/lib/salon-data.ts`.
- **Stato Globale:** React Context API (`RitualContext`) con persistenza reattiva su `localStorage`.

---

## 6. Installazione, Build & Deploy

### Avvio in Locale

```bash
# 1. Clona la repository
git clone https://github.com/your-username/russo-equipe-parrucchieri.git
cd russo-equipe-parrucchieri

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà accessibile all'indirizzo: `http://localhost:3000`.

### Verifica e Build di Produzione

```bash
# Controllo linting (0 errori, 0 avvisi)
npm run lint

# Compilazione statica ottimizzata
npm run build

# Avvio server di produzione
npm run start
```

### Deploy Istantaneo su Vercel

Il progetto è nativo per [Vercel](https://vercel.com/):
1. Collega la repository GitHub `russo-equipe-parrucchieri`.
2. Il framework (`Next.js`) e il comando di build (`next build`) vengono rilevati automaticamente.
3. Clicca su **Deploy**. Non sono richieste variabili d'ambiente obbligatorie per il funzionamento base.

---

*RUSSO Equipe Parrucchieri — Atelier di Acconciatura & Colorimetria a Torino*  
*Direzione Artistica: Patrizia Russo*
