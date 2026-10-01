"use client";

import { useState } from "react";
import Link from "next/link";
import { proposeMemory, useSessionStore } from "@/lib/store";
import { isOpenWorkflow } from "@/lib/models";

export function ProposeMemory() {
  const session = useSessionStore();
  const [msg, setMsg] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const myPending = session.proposals.filter(
    (p) =>
      p.kind === "story" &&
      p.proposerLabel === "SAMPLE Session Member" &&
      isOpenWorkflow(p.status)
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = proposeMemory({ title, body, personId: "charlie" });
    setMsg(result.message);
    if (result.ok) {
      setTitle("");
      setBody("");
    }
  }

  return (
    <div className="card" style={{ marginTop: "1.5rem" }} id="record">
      <p className="eyebrow">Propose</p>
      <h2 style={{ fontSize: "1.25rem" }}>Propose a memory</h2>
      <p className="meta">
        Creates a pending story proposal (SAMPLE). Visible in Steward Queue —
        not published until approved. Charlie’s living privacy stays ON; do not
        invent real family biography.
      </p>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="mem-title">Title</label>
          <input
            id="mem-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. SAMPLE kitchen table note"
          />
        </div>
        <div className="field">
          <label htmlFor="mem-body">Memory text</label>
          <textarea
            id="mem-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            placeholder="Placeholder prose only — fictional SAMPLE content."
          />
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn btn-primary" type="submit">
            Submit for review
          </button>
          <Link className="btn btn-ghost" href="/steward/queue">
            Steward queue
          </Link>
        </div>
      </form>
      {msg ? (
        <p className="notice" style={{ marginTop: "1rem" }}>
          {msg}
        </p>
      ) : null}
      {myPending.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <p className="hint">Your open SAMPLE proposals this session:</p>
          <ul>
            {myPending.map((p) => (
              <li key={p.id}>
                {p.title} · {p.status}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
