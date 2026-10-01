"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  SUGGESTED_QUERIES,
  askRootline,
  type AskAnswer,
  type AskCitation,
} from "@/lib/ask";
import { fileResearchRequest, useSessionStore } from "@/lib/store";

type ChatMsg =
  | { role: "user"; text: string }
  | {
      role: "bot";
      answer: AskAnswer;
      researchFiled?: string | null;
    };

function Citations({ citations }: { citations: AskCitation[] }) {
  if (!citations.length) return null;
  return (
    <div className="cite">
      <div>Sources:</div>
      <ul style={{ margin: "0.35rem 0 0", paddingLeft: "1.1rem" }}>
        {citations.map((c) => (
          <li key={`${c.kind}-${c.id}`}>
            {c.href ? (
              <Link href={c.href}>{c.label}</Link>
            ) : (
              <span>{c.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnswerBody({ text }: { text: string }) {
  // Split on newlines; render **bold** segments safely as <strong>
  const paragraphs = text.split("\n");
  return (
    <>
      {paragraphs.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        return (
          <span key={i}>
            {i > 0 ? <br /> : null}
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j}>{part.slice(2, -2)}</strong>;
              }
              return <span key={j}>{part}</span>;
            })}
          </span>
        );
      })}
    </>
  );
}

export function AskClient() {
  const session = useSessionStore();
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [q, setQ] = useState("");
  const [banner, setBanner] = useState<string | null>(null);

  const proposals = session.proposals;

  function runAsk(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const answer = askRootline(trimmed, proposals);
    setMsgs((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "bot", answer, researchFiled: null },
    ]);
    setQ("");
    setBanner(null);
  }

  function onAsk(e: FormEvent) {
    e.preventDefault();
    runAsk(q);
  }

  function onFileResearch(msgIndex: number, answer: AskAnswer) {
    const topic = answer.researchQuery?.trim() || "Archive gap from Ask Rootline";
    const result = fileResearchRequest({ query: topic });
    setBanner(result.message);
    if (result.ok) {
      setMsgs((m) =>
        m.map((msg, i) =>
          i === msgIndex && msg.role === "bot"
            ? { ...msg, researchFiled: result.message }
            : msg
        )
      );
    }
  }

  const chips = useMemo(() => SUGGESTED_QUERIES, []);

  return (
    <>
      <div className="filter-row" aria-label="Suggested questions">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            className="filter-chip"
            onClick={() => runAsk(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="chat-log" id="chat">
        {msgs.length === 0 ? (
          <div className="bubble bubble-bot">
            Ask about the approved Hutson–Norwood SAMPLE archive. I only answer
            from approved records and will not invent ancestors, dates, or ranks.
            Try a suggested question above — or type your own.
            <div className="cite">
              Corpus · SAMPLE people, relationships, approved stories · voice only
              when Steward-attached and RAG-eligible
            </div>
          </div>
        ) : null}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="bubble bubble-user">
              {m.text}
            </div>
          ) : (
            <div key={i} className="bubble bubble-bot">
              <AnswerBody text={m.answer.answer} />
              <Citations citations={m.answer.citations} />
              {m.answer.offerResearchRequest ? (
                <div className="btn-row" style={{ margin: "0.75rem 0 0" }}>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    disabled={Boolean(m.researchFiled)}
                    onClick={() => onFileResearch(i, m.answer)}
                  >
                    {m.researchFiled
                      ? "Research request filed"
                      : "File a research request"}
                  </button>
                </div>
              ) : null}
              {m.researchFiled ? (
                <p className="meta" style={{ marginTop: "0.5rem" }}>
                  {m.researchFiled}
                </p>
              ) : null}
            </div>
          )
        )}
      </div>

      {banner ? <p className="notice">{banner}</p> : null}

      <form className="chat-compose" onSubmit={onAsk}>
        <label className="sr-only" htmlFor="askq">
          Ask a question
        </label>
        <input
          id="askq"
          type="text"
          placeholder="Ask about the approved archive…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Ask
        </button>
      </form>
    </>
  );
}
