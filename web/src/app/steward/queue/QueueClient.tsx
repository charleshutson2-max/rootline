"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DecisionPanel } from "@/components/DecisionPanel";
import {
  isOpenWorkflow,
  workflowBadgeClass,
  workflowLabel,
  type DecisionAction,
  type Proposal,
} from "@/lib/models";
import {
  attachHonorSource,
  decideProposal,
  stewardAttachVoice,
  useSessionStore,
} from "@/lib/store";

function kindLabel(kind: Proposal["kind"], researchSandbox?: boolean): string {
  if (researchSandbox && kind === "correction") return "Research";
  if (kind === "honor_badge") return "Honor";
  if (kind === "voice_memory") return "Voice";
  if (kind === "story") return "Story";
  return kind.replace("_", " ");
}

function formatAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function QueueClient() {
  const session = useSessionStore();
  const [note, setNote] = useState<string | null>(null);

  const open = useMemo(
    () =>
      session.proposals.filter(
        (p) => isOpenWorkflow(p.status) && p.status !== "draft"
      ),
    [session.proposals]
  );

  const recentAudit = session.audit.slice(0, 5);

  function onDecide(id: string, action: DecisionAction, reason: string) {
    const result = decideProposal(id, action, reason);
    setNote(result.message);
  }

  return (
    <>
      {note ? <p className="notice">{note}</p> : null}
      <div className="card-list" style={{ marginTop: "1.25rem" }}>
        {open.map((item) => {
          const extras =
            item.kind === "honor_badge" && !item.hasSource
              ? [
                  {
                    id: "source",
                    label: "Attach SAMPLE source",
                    className: "btn btn-secondary",
                    onAction: (reason: string) => {
                      const result = attachHonorSource(
                        item.id,
                        "SAMPLE source · service record citation stub",
                        reason
                      );
                      setNote(result.message);
                    },
                  },
                ]
              : item.kind === "voice_memory" &&
                  item.voiceAttachStatus !== "attached"
                ? [
                    {
                      id: "attach",
                      label: "Steward attach → RAG",
                      className: "btn btn-secondary",
                      onAction: (reason: string) => {
                        const result = stewardAttachVoice(item.id, reason);
                        setNote(result.message);
                      },
                    },
                  ]
                : undefined;

          return (
            <div className="card queue-item" key={item.id}>
              <div style={{ flex: "1 1 16rem" }}>
                <span className={workflowBadgeClass(item.status)}>
                  {workflowLabel(item.status)} · {kindLabel(item.kind, item.researchSandbox)}
                </span>
                <h3 style={{ marginTop: "0.5rem" }}>{item.title}</h3>
                <p className="meta">{item.summary}</p>
                {item.kind === "honor_badge" ? (
                  <p className="hint">
                    {item.hasSource
                      ? `Source on file: ${item.sourceLabel ?? "yes"}`
                      : "No source yet — Approve stays blocked until a source is attached."}
                  </p>
                ) : null}
                {item.kind === "voice_memory" ? (
                  <p className="hint">
                    Attach: {item.voiceAttachStatus ?? "needs_steward_attach"} ·
                    RAG-eligible: {item.ragEligible ? "yes" : "no"}
                    {item.status === "approved" && !item.ragEligible
                      ? " — approved for members, not Ask-indexed yet."
                      : ""}
                  </p>
                ) : null}
                <DecisionPanel
                  entityLabel={item.id}
                  onDecide={(action, reason) => onDecide(item.id, action, reason)}
                  extras={extras}
                />
              </div>
            </div>
          );
        })}
        {open.length === 0 ? (
          <div className="empty">
            <h3>Queue clear</h3>
            <p>No pending SAMPLE proposals. Teaching empty state.</p>
          </div>
        ) : null}
      </div>

      <section style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ fontSize: "1.15rem", margin: 0 }}>Recent audit</h2>
          <Link className="btn btn-ghost" href="/steward/audit">
            Full audit log
          </Link>
        </div>
        {recentAudit.length === 0 ? (
          <p className="meta">No decisions yet this session.</p>
        ) : (
          <div className="card" style={{ marginTop: "0.75rem" }}>
            {recentAudit.map((a) => (
              <div className="audit-row" key={a.id}>
                <strong>
                  {a.action} · {a.entityType} · {a.entityId}
                </strong>
                <p className="meta" style={{ margin: 0 }}>
                  {a.actorLabel} ({a.actorCapacity}) · {formatAt(a.at)} CT
                </p>
                <p style={{ margin: 0 }}>{a.reason}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
