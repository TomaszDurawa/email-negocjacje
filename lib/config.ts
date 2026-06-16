// ============================================================================
//  KONFIGURACJA — to jedyny plik, który edytujesz przed szkoleniem.
//  1) Wklej swój case (lub kilka) do CASES.
//  2) Wygeneruj 12 tokenów: `npm run gen` i wklej do PARTICIPANTS.
//  3) Wydrukuj karteczki (po 6 dla każdej strony) i rozdaj losowo.
// ============================================================================

export type Side = "A" | "B";

export interface Msg {
  side: Side;
  subject?: string;
  text: string;
  ts: number;
}

export interface Brief {
  roleLabel: string; // np. "Sprzedający", "Kupujący", "Mediowany 1"
  brief: string;     // POUFNE instrukcje tej strony (druga strona ich nie widzi)
}

export interface CaseDef {
  id: string;
  title: string;
  shared?: string;            // kontekst wspólny dla obu stron (opcjonalnie)
  briefs: Record<Side, Brief>;
}

export interface Participant {
  token: string;   // unikatowy klucz z karteczki
  pairId: string;  // "P1".."P6" — wiąże dwie osoby w parę
  side: Side;      // "A" albo "B"
  caseId: string;  // który case (możesz dać różne parom)
}

// ---------------------------------------------------------------------------
//  CASES — przykład; podmień na swój (ZOPA/BATNA itd.)
// ---------------------------------------------------------------------------
export const CASES: CaseDef[] = [
  {
    id: "furgonetka",
    title: "Sprzedaż używanej furgonetki",
    shared:
      "Negocjujecie cenę sprzedaży 6-letniej furgonetki dostawczej (przebieg 140 000 km, " +
      "stan dobry, świeży przegląd). Cała negocjacja odbywa się wyłącznie korespondencyjnie. " +
      "Nie znasz tożsamości drugiej strony. Macie 3 dni. Brak porozumienia jest dopuszczalnym wynikiem.",
    briefs: {
      A: {
        roleLabel: "Sprzedający",
        brief:
          "POUFNE — tylko dla Ciebie.\n\n" +
          "Sprzedajesz furgonetkę, bo kupujesz większy model. Pieniądze przydadzą się na zaliczkę, " +
          "ale nie palą Ci się ręce — możesz poczekać.\n\n" +
          "• Twoja cena wywoławcza w ogłoszeniu: 72 000 zł.\n" +
          "• Twoja realna cena minimalna (poniżej nie sprzedajesz): 58 000 zł.\n" +
          "• Masz drugiego zainteresowanego, który oferował 60 000 zł, ale jest niepewny (BATNA).\n" +
          "• Auto ma drobną rysę na drzwiach i wkrótce wymaga nowych opon (~3 000 zł) — kupujący może to wytknąć.\n\n" +
          "Nie ujawniaj ceny minimalnej ani drugiego kupca wprost.",
      },
      B: {
        roleLabel: "Kupujący",
        brief:
          "POUFNE — tylko dla Ciebie.\n\n" +
          "Potrzebujesz furgonetki do rozwijanej działalności. Ta pasuje idealnie, ale rynek ma kilka podobnych.\n\n" +
          "• Twój budżet maksymalny (powyżej nie kupujesz): 66 000 zł.\n" +
          "• Twoja cena docelowa: 60 000 zł.\n" +
          "• Widziałeś podobne auto za 64 000 zł, ale z większym przebiegiem (BATNA).\n" +
          "• Zależy Ci na czasie — chcesz zamknąć temat w ciągu tygodnia.\n\n" +
          "Nie ujawniaj budżetu maksymalnego. Masz prawo dopytywać o stan techniczny.",
      },
    },
  },
];

// ---------------------------------------------------------------------------
//  PARTICIPANTS — 6 par. Podmień tokeny na wygenerowane (`npm run gen`).
//  Strona A i B tej samej pary muszą mieć ten sam pairId i caseId.
// ---------------------------------------------------------------------------
export const PARTICIPANTS: Participant[] = [
  { token: "a1-PRZYKLAD", pairId: "P1", side: "A", caseId: "furgonetka" },
  { token: "b1-PRZYKLAD", pairId: "P1", side: "B", caseId: "furgonetka" },
  { token: "a2-PRZYKLAD", pairId: "P2", side: "A", caseId: "furgonetka" },
  { token: "b2-PRZYKLAD", pairId: "P2", side: "B", caseId: "furgonetka" },
  { token: "a3-PRZYKLAD", pairId: "P3", side: "A", caseId: "furgonetka" },
  { token: "b3-PRZYKLAD", pairId: "P3", side: "B", caseId: "furgonetka" },
  { token: "a4-PRZYKLAD", pairId: "P4", side: "A", caseId: "furgonetka" },
  { token: "b4-PRZYKLAD", pairId: "P4", side: "B", caseId: "furgonetka" },
  { token: "a5-PRZYKLAD", pairId: "P5", side: "A", caseId: "furgonetka" },
  { token: "b5-PRZYKLAD", pairId: "P5", side: "B", caseId: "furgonetka" },
  { token: "a6-PRZYKLAD", pairId: "P6", side: "A", caseId: "furgonetka" },
  { token: "b6-PRZYKLAD", pairId: "P6", side: "B", caseId: "furgonetka" },
];

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
