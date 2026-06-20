import { findParticipant, findCase, findConsole } from "@/lib/config";
import { getThread, markSeen } from "@/lib/store";
import Thread from "./Thread";

export const dynamic = "force-dynamic";

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // --- Konsola kupującego: jeden token = dwie równoległe rozmowy ---
  const cons = findConsole(token);
  if (cons) {
    const legs = await Promise.all(
      cons.legs.map(async (leg) => {
        await markSeen(leg.token);
        const lp = findParticipant(leg.token);
        const initial = lp ? await getThread(lp.pairId) : [];
        return {
          label: leg.label,
          token: leg.token,
          side: (lp?.side ?? "A") as "A" | "B",
          initial,
        };
      })
    );

    return (
      <main className="wrap">
        <p className="eyebrow">Symulacja • korespondencja</p>
        <h1 className="case-title">{cons.title}</h1>
        <p className="role">Twoja rola: {cons.roleLabel}</p>

        {cons.shared && <p className="shared">{cons.shared}</p>}

        <div className="brief">
          <span className="stamp">P O U F N E</span>
          <pre>{cons.brief}</pre>
        </div>

        <p className="shared">
          Prowadzisz <strong>dwie równoległe rozmowy</strong> — z dwoma różnymi
          dostawcami. Każdy z nich widzi tylko swoją rozmowę z Tobą i nie wie o
          istnieniu drugiego.
        </p>

        {legs.map((l) => (
          <div key={l.token}>
            <div className="divider">{l.label}</div>
            <Thread
              token={l.token}
              side={l.side}
              roleLabel={cons.roleLabel}
              counterpartLabel={l.label}
              initial={l.initial}
              sticky={false}
            />
          </div>
        ))}
      </main>
    );
  }

  // --- Pojedyncza rola (para / dostawca) ---
  const p = findParticipant(token);

  if (!p) {
    return (
      <main className="wrap">
        <p className="eyebrow">Brak dostępu</p>
        <h1 className="case-title">Nieznany klucz</h1>
        <p className="shared">
          Ten link nie pasuje do żadnego uczestnika. Sprawdź, czy adres z karteczki
          został przepisany w całości.
        </p>
      </main>
    );
  }

  const c = findCase(p.caseId);
  if (!c) {
    return (
      <main className="wrap">
        <p className="eyebrow">Błąd konfiguracji</p>
        <h1 className="case-title">Brak case&apos;a</h1>
        <p className="shared">Skontaktuj się z prowadzącym.</p>
      </main>
    );
  }

  await markSeen(token);

  const brief = c.briefs[p.side];
  const initial = await getThread(p.pairId);

  return (
    <main className="wrap">
      <p className="eyebrow">Symulacja • korespondencja</p>
      <h1 className="case-title">{c.title}</h1>
      <p className="role">Twoja rola: {brief.roleLabel}</p>

      {c.shared && <p className="shared">{c.shared}</p>}

      <div className="brief">
        <span className="stamp">P O U F N E</span>
        <pre>{brief.brief}</pre>
      </div>

      <div className="divider">Korespondencja</div>

      <Thread
        token={p.token}
        side={p.side}
        roleLabel={brief.roleLabel}
        initial={initial}
      />
    </main>
  );
}
