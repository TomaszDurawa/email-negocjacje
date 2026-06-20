// ============================================================================
//  lib/config.ts — case „Helios" (teksty pod nietechnicznych) + układy sali.
//  Aktywna OPCJA A (3 pary, wszystkie Kupujący vs Devkraft). B i C niżej,
//  zakomentowane — odkomentuj dokładnie JEDEN blok PARTICIPANTS.
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

// ===========================================================================
//  UKŁADY SALI — aktywny dokładnie JEDEN blok PARTICIPANTS.
// ===========================================================================

// --- OPCJA A: 3 PARY (6 osób) — wszystkie identyczne: Kupujący vs Devkraft --
//  P1  337634f7 = Kupujący | d7db6c8e = Devkraft
//  P2  9b3e447b = Kupujący | 12bd1a62 = Devkraft
//  P3  d4d0c6c8 = Kupujący | fd4626f2 = Devkraft
export const PARTICIPANTS: Participant[] = [
  { token: "337634f7", pairId: "P1", side: "A", caseId: "devy-tani" },
  { token: "d7db6c8e", pairId: "P1", side: "B", caseId: "devy-tani" },
  { token: "9b3e447b", pairId: "P2", side: "A", caseId: "devy-tani" },
  { token: "12bd1a62", pairId: "P2", side: "B", caseId: "devy-tani" },
  { token: "d4d0c6c8", pairId: "P3", side: "A", caseId: "devy-tani" },
  { token: "fd4626f2", pairId: "P3", side: "B", caseId: "devy-tani" },
];

// --- OPCJA B: 2 TRÓJKI (6 osób) — kupujący ma JEDNĄ kartę (konsola) -------
//  KARTY DO DRUKU (6): 00d8871e (Kupujący 1), 3b89575d, fdd7bfb1 (dostawcy 1),
//                      9dd52e3c (Kupujący 2), 7f267edd, c7f3f697 (dostawcy 2).
//  Tokeny *leg* (12ce3aaf/75aadaa4/5c8b22e8/929d0504) są WEWNĘTRZNE — NIE drukujesz;
//  konsola kupującego (niżej, CONSOLES) ogarnia oba wątki pod jednym tokenem.
// export const PARTICIPANTS: Participant[] = [
//   { token: "12ce3aaf", pairId: "T1a", side: "A", caseId: "devy-tani" },     // Kupujący 1 -> Dostawca 1
//   { token: "3b89575d", pairId: "T1a", side: "B", caseId: "devy-tani" },     // Dostawca 1 (Devkraft)
//   { token: "75aadaa4", pairId: "T1b", side: "A", caseId: "devy-solidny" },  // Kupujący 1 -> Dostawca 2
//   { token: "fdd7bfb1", pairId: "T1b", side: "B", caseId: "devy-solidny" },  // Dostawca 2 (Meridian)
//   { token: "5c8b22e8", pairId: "T2a", side: "A", caseId: "devy-tani" },     // Kupujący 2 -> Dostawca 1
//   { token: "7f267edd", pairId: "T2a", side: "B", caseId: "devy-tani" },     // Dostawca 1 (Devkraft)
//   { token: "929d0504", pairId: "T2b", side: "A", caseId: "devy-solidny" },  // Kupujący 2 -> Dostawca 2
//   { token: "c7f3f697", pairId: "T2b", side: "B", caseId: "devy-solidny" },  // Dostawca 2 (Meridian)
// ];

// --- OPCJA C: 1 TRÓJKA + 1 PARA (5 osób) -----------------------------------
//  KARTY DO DRUKU (5): f42e9dfc (Kupujący-trójka), 83308caf, 3f1edd92 (dostawcy),
//                      150d0653, 4552ff16 (para). Tokeny 5188e720/28ff4642 WEWNĘTRZNE.
// export const PARTICIPANTS: Participant[] = [
//   { token: "5188e720", pairId: "T1a", side: "A", caseId: "devy-tani" },     // Kupujący-trójka -> Dostawca 1
//   { token: "83308caf", pairId: "T1a", side: "B", caseId: "devy-tani" },     // Dostawca 1 (Devkraft)
//   { token: "28ff4642", pairId: "T1b", side: "A", caseId: "devy-solidny" },  // Kupujący-trójka -> Dostawca 2
//   { token: "3f1edd92", pairId: "T1b", side: "B", caseId: "devy-solidny" },  // Dostawca 2 (Meridian)
//   { token: "150d0653", pairId: "P1",  side: "A", caseId: "devy-tani" },     // Para: Kupujący
//   { token: "4552ff16", pairId: "P1",  side: "B", caseId: "devy-tani" },     // Para: Devkraft
// ];

// --- KONSOLE KUPUJĄCEGO (jeden token = dwie rozmowy) — dotyczą układów B/C ---
export const CONSOLES: BuyerConsole[] = [
  { token: "00d8871e", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "12ce3aaf", label: "Dostawca 1" }, { token: "75aadaa4", label: "Dostawca 2" }] },
  { token: "9dd52e3c", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "5c8b22e8", label: "Dostawca 1" }, { token: "929d0504", label: "Dostawca 2" }] },
  { token: "f42e9dfc", roleLabel: "Kupujący (Helios)", title: "Pilna dostawa zespołu — Helios Retail",
    shared: SHARED, brief: BUYER,
    legs: [{ token: "5188e720", label: "Dostawca 1" }, { token: "28ff4642", label: "Dostawca 2" }] },
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
