// ============================================================================
//  lib/config.ts — case „Helios” (teksty pod nietechnicznych).
//  AKTYWNY UKŁAD A — 3 pary (Kupujący vs Devkraft).
//  Zmiana układu = podmień CAŁY ten plik na config-A / config-B / config-C.
// ============================================================================

export type Side = "A" | "B";

export interface Msg {
  side: Side;
  subject?: string;
  text: string;
  ts: number;
}

export interface Brief {
  roleLabel: string;
  brief: string;
}

export interface CaseDef {
  id: string;
  title: string;
  shared?: string;
  briefs: Record<Side, Brief>;
}

export interface Participant {
  token: string;
  pairId: string;
  side: Side;
  caseId: string;
}

export interface ConsoleLeg { token: string; label: string; }
export interface BuyerConsole {
  token: string;
  roleLabel: string;
  title: string;
  shared?: string;
  brief: string;
  legs: ConsoleLeg[];
}

// ---------------------------------------------------------------------------
//  Treść case'a
// ---------------------------------------------------------------------------
const SHARED = `Helios Retail — szybko rosnący gracz e-commerce — podpisał umowę na uruchomienie platformy zakupowej, którą partner sprzeda pod własną marką (white-label). Partner przesunął datę startu do przodu: zostało 16 tygodni do twardego, umownego terminu z karami i szkodą dla Waszego wizerunku. Wewnętrzny zespół nie zdąży na czas — zarząd zdecydował: dokupić moce.

Helios potrzebuje ok. 10 developerów (mix senior/mid), osadzonych przy własnym zespole, na ~4 miesiące, startujących jak najszybciej. To zakup interwencyjny — nieplanowany, pod presją. Cała rozmowa toczy się wyłącznie mailowo i zdalnie; nie znasz tożsamości drugiej strony. Brak porozumienia jest dopuszczalnym wynikiem.

Na stole sześć kwestii: stawka za jednego developera za dzień (€/dev/dzień), skład zespołu (ilu seniorów), tempo rozruchu, gwarancje (wymiana słabych developerów w X h, okres próbny, kary), długość zobowiązania i wyjście, płatność (zaliczka vs po wykonaniu zadania).`;

const BUYER = `POUFNE — tylko dla Ciebie. Jesteś Dyrektorem Dostarczania w Helios Retail i osobiście odpowiadasz za termin.

• Budżet zatwierdzony przez zarząd: max €500/dev/dzień (uśredniona). Cel: ~€430. Przekroczenie €500 wymaga zgody CFO — zgadza się wolno i niechętnie; w ostateczności zgodzisz się na ~€540, jeśli jakość to uzasadni, ale kosztuje Cię to czas i Twoją opinię w oczach zarządu.
• Twarda potrzeba: min. 4 prawdziwych seniorów. Reszta mid (średnio-doświadczeni).
• Czas krytyczny — każdy tydzień zwłoki zjada bufor; chcesz pełny zespół w 2 tygodnie.
• Chcesz: wymianę słabego człowieka w 48 h, 2-tygodniowy okres próbny, punkt kontrolny w trakcie (sprawdzenie postępu). Wolisz płatność miesięcznie, po przepracowanym miesiącu.
• Twoja BATNA (czyli rozwiązanie zastępcze) jest słaba: możesz sklecić zespół z freelancerów albo nie dotrzymać terminu i zapłacić kary — NIE zdradzaj, jak bardzo.
• Jeśli prowadzisz dwóch dostawców równolegle: możesz powoływać się na warunki konkurenta, by wyciskać ustępstwa; masz też opcję podziału zespołu (np. 6+4) — to możliwość, nie obowiązek. W parze: skup się na domknięciu jednego dostawcy.`;

const DEVKRAFT = `POUFNE — tylko dla Ciebie. Reprezentujesz „Devkraft" — młodą, szybko rosnącą firmę programistyczną (software house).

• Potrzebujesz tego kontraktu: da Ci to solidny zastrzyk gotówki oraz referencje ze współpracy z Heliosem. Twoja BATNA (czyli rozwiązanie zastępcze) jest słaba — nie masz żadnych widoków na kontrakt poza Heliosem.
• Twój próg: €300/dev/dzień (poniżej tracisz). Zamierzasz zacząć od €380. Na cenie możesz zejść nisko, bo zależy Ci, żeby zdobyć ten kontrakt.
• Realia, które musisz umiejętnie kryć: 10 osób wystawisz szybko (start ~1 tydzień), ale tylko ~2 to prawdziwi seniorzy; reszta mid/junior (początkujący), część rekrutacji jeszcze niepotwierdzona — masz mało ludzi w zapasie (krótką ławkę). „4 seniorów" to dla Ciebie spory wysiłek, na granicy z niemożliwością.
• Boisz się twardych gwarancji (wymiana w 48 h, kary) — ale okres próbny możesz przyjąć, bo wierzysz w zaangażowanie swoich ludzi, którym liczysz nadrobić brak doświadczenia i tytułów.
• Chętnie weźmiesz dłuższe zobowiązanie (stabilność) i jakąś zaliczkę (poprawi Ci bieżącą gotówkę).`;

const MERIDIAN = `POUFNE — tylko dla Ciebie. Reprezentujesz „Meridian Software" — uznaną firmę konsultingową z najwyższej półki (premium).

• Masz mocną BATNA (rozwiązanie zastępcze) — pełen kalendarz zleceń i innych klientów; ten kontrakt jest „miło mieć", nie gonisz go ze stratą dla marki.
• Twój próg: €520/dev/dzień — poniżej psujesz marżę i pozycję marki z najwyższej półki; wolisz odejść. Zaczynasz od €620. Rabatujesz niechętnie i mało.
• Dajesz tanio (bo jesteś pewny): gwarancja wymiany w 48 h, referencje, 2-tygodniowy okres próbny, zespół z przewagą seniorów. Wystawisz 6 osób od ręki, pełne 10 w ~3 tygodnie (chronisz jakość ponad tempo).
• Wolisz: min. 4 miesiące zobowiązania, 30% zaliczki; nie lubisz dotkliwych kar (umiarkowane przyjmiesz).
• Jeśli wyczujesz tańszego konkurenta — nie wpadaj w wojnę cenową; uzasadnij wyższą cenę (pewność dostawy, niższe ryzyko) i handluj warunkami poza ceną.`;

export const CASES: CaseDef[] = [
  { id: "devy-tani", title: "Pilna dostawa zespołu — Helios Retail", shared: SHARED,
    briefs: { A: { roleLabel: "Kupujący (Helios)", brief: BUYER },
              B: { roleLabel: "Dostawca — Devkraft", brief: DEVKRAFT } } },
  { id: "devy-solidny", title: "Pilna dostawa zespołu — Helios Retail", shared: SHARED,
    briefs: { A: { roleLabel: "Kupujący (Helios)", brief: BUYER },
              B: { roleLabel: "Dostawca — Meridian", brief: MERIDIAN } } },
];

// ====== UKŁAD A: 3 PARY (6 osób) · rozdaj losowo ======
//  P1  8a814fbb=Kupujący  befca826=Devkraft
//  P2  28cef4da=Kupujący  79a42811=Devkraft
//  P3  b4e44168=Kupujący  9a08ea57=Devkraft
export const PARTICIPANTS: Participant[] = [
  { token: "8a814fbb", pairId: "P1", side: "A", caseId: "devy-tani" },
  { token: "befca826", pairId: "P1", side: "B", caseId: "devy-tani" },
  { token: "28cef4da", pairId: "P2", side: "A", caseId: "devy-tani" },
  { token: "79a42811", pairId: "P2", side: "B", caseId: "devy-tani" },
  { token: "b4e44168", pairId: "P3", side: "A", caseId: "devy-tani" },
  { token: "9a08ea57", pairId: "P3", side: "B", caseId: "devy-tani" },
];

// --- KONSOLE KUPUJĄCEGO (jeden token = dwie rozmowy) — dotyczą układów B/C ---
export const CONSOLES: BuyerConsole[] = [
  { token: "b01e316b", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "dd360e84", label: "Dostawca 1" }, { token: "e60835c2", label: "Dostawca 2" }] },
  { token: "43ec13c3", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "196d2f09", label: "Dostawca 1" }, { token: "f7a13afb", label: "Dostawca 2" }] },
  { token: "6c0da32e", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "379a47e5", label: "Dostawca 1" }, { token: "b3efdbe5", label: "Dostawca 2" }] },
];

// ---------------------------------------------------------------------------
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "zmien-mnie-admin";

export function findParticipant(token: string): Participant | undefined {
  return PARTICIPANTS.find((p) => p.token === token);
}

export function findCase(caseId: string): CaseDef | undefined {
  return CASES.find((c) => c.id === caseId);
}

export function findConsole(token: string): BuyerConsole | undefined {
  return CONSOLES.find((c) => c.token === token);
}

export function pairs(): { pairId: string; A?: Participant; B?: Participant }[] {
  const map = new Map<string, { pairId: string; A?: Participant; B?: Participant }>();
  for (const p of PARTICIPANTS) {
    const row = map.get(p.pairId) ?? { pairId: p.pairId };
    row[p.side] = p;
    map.set(p.pairId, row);
  }
  return [...map.values()].sort((a, b) => a.pairId.localeCompare(b.pairId));
}
