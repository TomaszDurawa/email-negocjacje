# Negocjacje korespondencyjne — sandbox

Asynchroniczna symulacja negocjacji „mailowych" dla 6 par (12 osób). Każdy wchodzi
przez indywidualny link z karteczki, widzi tylko swoją poufną rolę i wątek z drugą
stroną. **Nikt nie podaje maila ani nazwiska — tożsamość = wyłącznie karteczka.**
Losowe rozdanie karteczek = losowe pary i losowy przydział ról.

## Jak to działa (architektura)

- **Token = karteczka.** Każdy z 12 tokenów jest na stałe przypisany do pary
  (`P1`–`P6`) i strony (`A`/`B`) w `lib/config.ts`. Brak logiki parowania po stronie
  serwera — losowość bierze się z fizycznego rozdania.
- **Anonimowość.** Druga strona zawsze widnieje jako „Druga strona". Aplikacja nie
  zbiera żadnych danych osobowych. Mapowanie token → osoba trzymasz na papierze;
  ujawniasz je dopiero na debriefie („wiedziałam, że to Ania").
- **Asynchroniczność jest treścią, nie błędem.** Brak wymuszanego tempa, brak
  ponagleń. Cisza, spóźniona odpowiedź, mail o 2:00 — wszystko ląduje w panelu
  prowadzącego ze znacznikiem czasu.
- **Panel prowadzącego** (`/admin/<ADMIN_TOKEN>`) pokazuje wszystkie wątki, liczbę
  wiadomości, „ostatnio widziano" każdej strony (zielony/żółty/czerwony) i pełne
  transkrypty — gotowy materiał na debrief.

## Wdrożenie (Vercel + Upstash)

1. `git init && git add . && git commit -m "init"` → wypchnij do GitHuba → zaimportuj
   w Vercel (preset: **Next.js**).
2. W projekcie na Vercel: **Storage → Marketplace → Upstash → For Redis → Install**.
   Integracja sama wstrzyknie `KV_REST_API_URL` i `KV_REST_API_TOKEN`. Darmowy plan
   w zupełności wystarczy.
3. Dodaj zmienną środowiskową **`ADMIN_TOKEN`** (długa, losowa) → Redeploy.
4. Lokalnie (opcjonalnie): `vercel env pull .env.local`, potem `npm i && npm run dev`.

## Przygotowanie sesji

1. `npm run gen` → wklej wygenerowany blok `PARTICIPANTS` do `lib/config.ts`
   i ustaw `ADMIN_TOKEN` na Vercel. Commit + push.
2. Podmień przykładowy case w `CASES` na swój (poufne briefy `A`/`B`, ZOPA/BATNA itd.).
   Chcesz różne casy w różnych parach? Ustaw inny `caseId` przy danym `pairId`.
3. Wydrukuj 12 karteczek. Na każdej tylko adres:
   `https://twoja-app.vercel.app/n/<token>` (rola ujawnia się dopiero po wejściu —
   karteczka jej nie zdradza). Możesz dodać kod QR.
4. **Prowadź papierowy spis**: który token dałeś której osobie. To jedyne miejsce,
   gdzie istnieje powiązanie tożsamości.
5. Rozdaj karteczki losowo. 6 „stron A", 6 „stron B".

## W trakcie i na debriefie

- Panel: `https://twoja-app.vercel.app/admin/<ADMIN_TOKEN>` — odświeża się sam co 20 s.
- Sygnały do omówienia: kto wykonał pierwszy ruch, kotwiczenie, tempo i długość
  ciszy, wiadomości nocne, pary które utknęły (czerwona/żółta kropka), wzorce ustępstw.
- Reset między grupami: usuń klucze `msg:*` i `seen:*` w bazie Upstash (panel Upstash
  → Data Browser) albo wygeneruj nowe tokeny.

## Czego świadomie NIE ma

- **Powiadomień mailowych.** Sprawdzanie i zapominanie jest częścią ćwiczenia —
  ponaglenia bierzesz na siebie na sali. Gdybyś jednak chciał opcjonalne pingi,
  najprościej dołożyć Upstash QStash; powiem jak.
