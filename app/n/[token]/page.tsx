import { findParticipant, findCase } from "@/lib/config";
import { getThread, markSeen } from "@/lib/store";
import Thread from "./Thread";

export const dynamic = "force-dynamic";

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
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

  // Zapis „ostatnio widziane" — sygnał dla prowadzącego na debrief.
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
