"use client";

import { useEffect, useRef, useState } from "react";
import type { Msg, Side } from "@/lib/config";

function fmt(ts: number): string {
  if (!ts) return "";
  return new Date(ts).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Thread({
  token,
  side,
  roleLabel,
  initial,
}: {
  token: string;
  side: Side;
  roleLabel: string;
  initial: Msg[];
}) {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Odpytywanie o nowe wiadomości co 15 s.
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const r = await fetch(`/api/thread?token=${encodeURIComponent(token)}`, {
          cache: "no-store",
        });
        if (r.ok) {
          const data = (await r.json()) as { messages: Msg[] };
          setMessages(data.messages);
        }
      } catch {
        /* offline — spróbuje ponownie */
      }
    }, 15000);
    return () => clearInterval(id);
  }, [token]);

  async function send() {
    const body = text.trim();
    if (!body) return;
    setSending(true);
    setError("");
    try {
      const r = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, subject: subject.trim(), text: body }),
      });
      if (!r.ok) {
        setError("Nie udało się wysłać. Spróbuj ponownie za chwilę.");
        return;
      }
      const data = (await r.json()) as { messages: Msg[] };
      setMessages(data.messages);
      setSubject("");
      setText("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch {
      setError("Brak połączenia. Wiadomość nie została wysłana.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="thread">
        {messages.length === 0 && (
          <p className="empty">
            Jeszcze cisza. Pierwszy ruch należy do tego, kto się zdecyduje.
          </p>
        )}
        {messages.map((m, i) => {
          const mine = m.side === side;
          return (
            <div key={i} className={`msg ${mine ? "you" : ""}`}>
              <div className="meta">
                <span className={`who ${mine ? "you" : ""}`}>
                  {mine ? `Ty (${roleLabel})` : "Druga strona"}
                </span>
                <span className="when">{fmt(m.ts)}</span>
              </div>
              {m.subject && <div className="subject">{m.subject}</div>}
              <div className="body">{m.text}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="composer">
        <div className="box">
          <input
            type="text"
            placeholder="Temat (opcjonalnie)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Temat wiadomości"
          />
          <textarea
            placeholder="Treść wiadomości…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Treść wiadomości"
          />
          <div className="row">
            <span className="hint">
              {error || "Druga strona nie widzi, kim jesteś."}
            </span>
            <button onClick={send} disabled={sending || !text.trim()}>
              {sending ? "Wysyłanie…" : "Wyślij"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
