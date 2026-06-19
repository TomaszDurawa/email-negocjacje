// ============================================================================
//  lib/config.ts — case „Helios" + trzy układy sali.
//  Aktywna jest OPCJA A (3 pary). Żeby przełączyć na B lub C: zakomentuj
//  aktywny blok PARTICIPANTS i odkomentuj wybrany (dokładnie JEDEN aktywny).
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

// ---------------------------------------------------------------------------
//  Treść case'a (briefy współdzielone między wariantami tani/solidny)
// ---------------------------------------------------------------------------
const SHARED = `Helios Retail — szybko rosnący gracz e-commerce — podpisał umowę na uruchomienie white-label'owej platformy zakupowej dla dużego partnera. Partner przesunął datę go-live do przodu: zostało 16 tygodni do twardego, umownego terminu z karami i ekspozycją wizerunkową. Wewnętrzny zespół nie wyrabia — zarząd zdecydował: dokupić moce.

Helios potrzebuje ok. 10 developerów (mix senior/mid), osadzonych przy własnym zespole, na ~4 miesiące, startujących jak najszybciej. To zakup interwencyjny — nieplanowany, pod presją. Cała rozmowa toczy się wyłącznie mailowo i zdalnie; nie znasz tożsamości drugiej strony. Brak porozumienia jest dopuszczalnym wynikiem.

Na stole sześć kwestii: stawka (€/dev/dzień), skład zespołu (ilu seniorów), tempo rozruchu, gwarancje (wymiana w X h, okres próbny, SLA/kary), długość zobowiązania i wyjście, płatność (zaliczka vs z dołu).`;

const BUYER = `POUFNE — tylko dla Ciebie. Jesteś Dyrektorem Dostarczania w Helios Retail i osobiście odpowiadasz za termin.

• Budżet zatwierdzony przez zarząd: max €500/dev/dzień (uśredniona). Cel: ~€430. Przekroczenie €500 wymaga zgody CFO — wolno i niechętnie; w ostateczności wypchniesz do ~€540, jeśli jakość to uzasadnia, ale kosztuje Cię to czas i kapitał polityczny.
• Twarda potrzeba: min. 4 prawdziwych seniorów. Reszta mid.
• Czas krytyczny — każdy tydzień zwłoki zjada bufor; chcesz pełny zespół w 2 tygodnie.
• Chcesz: wymianę słabego człowieka w 48 h, 2-tygodniowy okres próbny, checkpoint dostawy. Wolisz płatność miesięcznie z dołu.
• Twoja BATNA jest słaba (sklecanie freelancerów albo obsunięcie terminu z karami) — NIE zdradzaj, jak bardzo.
• Jeśli prowadzisz dwóch dostawców równolegle: możesz powoływać się na warunki konkurenta, by wyciskać ustępstwa; masz też opcję podziału zespołu (np. 6+4) — to możliwość, nie obowiązek. W parze: skup się na domknięciu jednego dostawcy.`;

const DEVKRAFT = `POUFNE — tylko dla Ciebie. Reprezentujesz „Devkraft" — młody, szybko rosnący software house.

• Potrzebujesz tego kontraktu: cash flow i marka referencyjna (logo Heliosa). Twoja BATNA słaba — pipeline cienki.
• Twój próg: €300/dev/dzień (poniżej tracisz). Otworzyłeś od €380. Na cenie możesz zejść nisko, by wygrać.
• Realia, które musisz umiejętnie kryć: 10 osób wystawisz szybko (start ~1 tydzień), ale tylko ~2 to prawdziwi seniorzy; reszta mid/junior, część rekrutacji jeszcze niepotwierdzona (cienka ławka). „4 seniorów" to dla Ciebie spore naciągnięcie.
• Boisz się twardych gwarancji (wymiana w 48 h, kary) — ale okres próbny możesz przyjąć, bo wierzysz w zaangażowanie, jeśli nie w same tytuły.
• Chętnie weźmiesz dłuższe zobowiązanie (stabilność) i jakąś zaliczkę (cash flow).`;

const MERIDIAN = `POUFNE — tylko dla Ciebie. Reprezentujesz „Meridian Software" — uznaną, premium'ową konsultację.

• Masz mocną BATNA — pełny pipeline i innych klientów; ten deal jest „miło mieć", nie gonisz go ze stratą dla marki.
• Twój próg: €520/dev/dzień — poniżej psujesz marżę i premium'owe pozycjonowanie; wolisz odejść. Otworzyłeś od €620. Rabatujesz niechętnie i mało.
• Dajesz tanio (bo jesteś pewny): gwarancja wymiany w 48 h, referencje, 2-tygodniowy okres próbny, zespół z przewagą seniorów. Wystawisz 6 osób od ręki, pełne 10 w ~3 tygodnie (chronisz jakość ponad tempo).
• Wolisz: min. 4 miesiące zobowiązania, 30% zaliczki; nie lubisz dotkliwych kar (umiarkowane przyjmiesz).
• Jeśli wyczujesz tańszego konkurenta — nie wpadaj w wojnę cenową; uzasadnij premię (pewność dostawy, niższe ryzyko) i handluj warunkami pozacenowymi.`;

export const CASES: CaseDef[] = [
  { id: "devy-tani", title: "Pilna dostawa zespołu — Helios Retail", shared: SHARED,
    briefs: { A: { roleLabel: "Kupujący (Helios)", brief: BUYER },
              B: { roleLabel: "Dostawca — Devkraft", brief: DEVKRAFT } } },
  { id: "devy-solidny", title: "Pilna dostawa zespołu — Helios Retail", shared: SHARED,
    briefs: { A: { roleLabel: "Kupujący (Helios)", brief: BUYER },
              B: { roleLabel: "Dostawca — Meridian", brief: MERIDIAN } } },
];

// ===========================================================================
//  UKŁADY SALI — aktywny jest dokładnie JEDEN blok PARTICIPANTS.
// ===========================================================================

// --- OPCJA A: 3 PARY (6 osób) — wszystkie identyczne: Kupujący vs Devkraft ---
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

// --- OPCJA B: 2 TRÓJKI (6 osób) --------------------------------------------
//  Każdy kupujący to JEDNA osoba z DWIEMA kartami (dwa wątki, dwie zakładki).
//  Trójka 1 — kupujący = eea56291 + c24aea22 (ta sama osoba)
//             471ca51e = Devkraft | 1afe4d2f = Meridian
//  Trójka 2 — kupujący = 188c6a62 + 35437b25 (ta sama osoba)
//             349b5a49 = Devkraft | 1610e034 = Meridian
// export const PARTICIPANTS: Participant[] = [
//   { token: "eea56291", pairId: "T1a", side: "A", caseId: "devy-tani" },     // kupujący 1 ↔ Devkraft
//   { token: "471ca51e", pairId: "T1a", side: "B", caseId: "devy-tani" },     // Devkraft
//   { token: "c24aea22", pairId: "T1b", side: "A", caseId: "devy-solidny" },  // kupujący 1 ↔ Meridian (druga karta)
//   { token: "1afe4d2f", pairId: "T1b", side: "B", caseId: "devy-solidny" },  // Meridian
//   { token: "188c6a62", pairId: "T2a", side: "A", caseId: "devy-tani" },     // kupujący 2 ↔ Devkraft
//   { token: "349b5a49", pairId: "T2a", side: "B", caseId: "devy-tani" },     // Devkraft
//   { token: "35437b25", pairId: "T2b", side: "A", caseId: "devy-solidny" },  // kupujący 2 ↔ Meridian (druga karta)
//   { token: "1610e034", pairId: "T2b", side: "B", caseId: "devy-solidny" },  // Meridian
// ];

// --- OPCJA C: 1 TRÓJKA + 1 PARA (5 osób) -----------------------------------
//  Trójka — kupujący = a3d2363c + c233c488 (ta sama osoba)
//           f9221408 = Devkraft | 4a721ac3 = Meridian
//  Para   — ef10ccce = Kupujący | 598debb8 = Devkraft
// export const PARTICIPANTS: Participant[] = [
//   { token: "a3d2363c", pairId: "T1a", side: "A", caseId: "devy-tani" },     // kupujący ↔ Devkraft
//   { token: "f9221408", pairId: "T1a", side: "B", caseId: "devy-tani" },     // Devkraft
//   { token: "c233c488", pairId: "T1b", side: "A", caseId: "devy-solidny" },  // kupujący ↔ Meridian (druga karta)
//   { token: "4a721ac3", pairId: "T1b", side: "B", caseId: "devy-solidny" },  // Meridian
//   { token: "ef10ccce", pairId: "P1",  side: "A", caseId: "devy-tani" },     // para: Kupujący
//   { token: "598debb8", pairId: "P1",  side: "B", caseId: "devy-tani" },     // para: Devkraft
// ];

// ---------------------------------------------------------------------------
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "zmien-mnie-admin";

export function findParticipant(token: string): Participant | undefined {
  return PARTICIPANTS.find((p) => p.token === token);
}

export function findCase(caseId: string): CaseDef | undefined {
  return CASES.find((c) => c.id === caseId);
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
