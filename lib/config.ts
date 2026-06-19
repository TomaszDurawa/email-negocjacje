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

// --- OPCJA B: 2 TRÓJKI (6 osób) --------------------------------------------
//  Kupujący = JEDNA osoba z DWIEMA kartami (dwa wątki, dwie zakładki).
//  Trójka 1 — kupujący = eea56291 + c24aea22 | 471ca51e = Devkraft | 1afe4d2f = Meridian
//  Trójka 2 — kupujący = 188c6a62 + 35437b25 | 349b5a49 = Devkraft | 1610e034 = Meridian
// export const PARTICIPANTS: Participant[] = [
//   { token: "eea56291", pairId: "T1a", side: "A", caseId: "devy-tani" },
//   { token: "471ca51e", pairId: "T1a", side: "B", caseId: "devy-tani" },
//   { token: "c24aea22", pairId: "T1b", side: "A", caseId: "devy-solidny" },
//   { token: "1afe4d2f", pairId: "T1b", side: "B", caseId: "devy-solidny" },
//   { token: "188c6a62", pairId: "T2a", side: "A", caseId: "devy-tani" },
//   { token: "349b5a49", pairId: "T2a", side: "B", caseId: "devy-tani" },
//   { token: "35437b25", pairId: "T2b", side: "A", caseId: "devy-solidny" },
//   { token: "1610e034", pairId: "T2b", side: "B", caseId: "devy-solidny" },
// ];

// --- OPCJA C: 1 TRÓJKA + 1 PARA (5 osób) -----------------------------------
//  Trójka — kupujący = a3d2363c + c233c488 | f9221408 = Devkraft | 4a721ac3 = Meridian
//  Para   — ef10ccce = Kupujący | 598debb8 = Devkraft
// export const PARTICIPANTS: Participant[] = [
//   { token: "a3d2363c", pairId: "T1a", side: "A", caseId: "devy-tani" },
//   { token: "f9221408", pairId: "T1a", side: "B", caseId: "devy-tani" },
//   { token: "c233c488", pairId: "T1b", side: "A", caseId: "devy-solidny" },
//   { token: "4a721ac3", pairId: "T1b", side: "B", caseId: "devy-solidny" },
//   { token: "ef10ccce", pairId: "P1",  side: "A", caseId: "devy-tani" },
//   { token: "598debb8", pairId: "P1",  side: "B", caseId: "devy-tani" },
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
