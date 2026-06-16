import { ADMIN_TOKEN, pairs, findCase } from "@/lib/config";
import { getThread, getSeen } from "@/lib/store";
import AutoRefresh from "./AutoRefresh";

export const dynamic = "force-dynamic";

function fmt(ts: number | null): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function freshness(seen: number | null): "live" | "cold" | "never" {
  if (!seen) return "never";
  const hours = (Date.now() - seen) / 36e5;
  return hours < 6 ? "live" : "cold";
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (token !== ADMIN_TOKEN) {
    return (
      <main className="wrap">
        <p className="eyebrow">Panel prowadzącego</p>
        <h1 className="case-title">Brak dostępu</h1>
      </main>
    );
  }

  const rows = pairs();

  const data = await Promise.all(
    rows.map(async (row) => {
      const thread = await getThread(row.pairId);
      const seenA = row.A ? await getSeen(row.A.token) : null;
      const seenB = row.B ? await getSeen(row.B.token) : null;
      const last = thread.length ? thread[thread.length - 1].ts : 0;
      return { row, thread, seenA, seenB, last };
    })
  );

  return (
    <main className="wrap">
      <AutoRefresh seconds={20} />
      <p className="eyebrow">Panel prowadzącego • odświeża się co 20 s</p>
      <h1 className="case-title">Przebieg negocjacji</h1>
      <p className="shared">
        Pełne transkrypty wszystkich par wraz ze znacznikami czasu i ostatnią
        aktywnością. Mapowanie klucz → osoba trzymasz u siebie (papierowy spis
        karteczek) — tu pojawia się dopiero na debriefie.
      </p>

      {data.map(({ row, thread, seenA, seenB, last }) => {
        const c = row.A ? findCase(row.A.caseId) : undefined;
        return (
          <section className="admin-pair" key={row.pairId}>
            <h3>
              {row.pairId} — {c?.title ?? "?"}
            </h3>
            <div className="hint">
              Wiadomości: {thread.length} • ostatnia: {fmt(last)}
            </div>

            <div className="sides">
              <div className="side-card">
                <div className="label">
                  <span className={`dot ${freshness(seenA)}`} />
                  A — {c?.briefs.A.roleLabel}
                </div>
                <div className="tok">{row.A?.token ?? "—"}</div>
                <div className="hint">widziano: {fmt(seenA)}</div>
              </div>
              <div className="side-card">
                <div className="label">
                  <span className={`dot ${freshness(seenB)}`} />
                  B — {c?.briefs.B.roleLabel}
                </div>
                <div className="tok">{row.B?.token ?? "—"}</div>
                <div className="hint">widziano: {fmt(seenB)}</div>
              </div>
            </div>

            <div className="admin-thread">
              {thread.length === 0 && <div className="hint">— cisza —</div>}
              {thread.map((m, i) => (
                <div className="admin-msg" key={i}>
                  <span className="tag">
                    [{m.side === "A" ? c?.briefs.A.roleLabel : c?.briefs.B.roleLabel} •{" "}
                    {fmt(m.ts)}]
                  </span>{" "}
                  {m.subject ? <strong>{m.subject} — </strong> : null}
                  {m.text}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
