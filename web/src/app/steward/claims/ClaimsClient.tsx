"use client";

import { useMemo, useState } from "react";
import { DecisionPanel } from "@/components/DecisionPanel";
import {
  isOpenWorkflow,
  workflowBadgeClass,
  workflowLabel,
  type DecisionAction,
} from "@/lib/models";
import { decideClaim, useSessionStore } from "@/lib/store";

function formatSubmitted(iso: string): string {
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

export function ClaimsClient() {
  const session = useSessionStore();
  const [note, setNote] = useState<string | null>(null);

  const openClaims = useMemo(
    () =>
      session.claims.filter(
        (c) => isOpenWorkflow(c.status) && c.status !== "draft"
      ),
    [session.claims]
  );

  function onDecide(id: string, action: DecisionAction, reason: string) {
    const result = decideClaim(id, action, reason);
    setNote(result.message);
  }

  return (
    <>
      {note ? <p className="notice">{note}</p> : null}
      <div className="card-list" style={{ marginTop: "1.25rem" }}>
        {openClaims.map((c) => (
          <div className="card queue-item" key={c.id}>
            <div style={{ flex: "1 1 16rem" }}>
              <span className={workflowBadgeClass(c.status)}>
                {workflowLabel(c.status)} claim
              </span>
              <h3 style={{ marginTop: "0.5rem" }}>{c.fullName}</h3>
              <p className="meta">
                {c.assertedRelationship}
                {c.voucherName ? ` · Voucher: ${c.voucherName}` : ""} · Submitted{" "}
                {formatSubmitted(c.submittedAt)} CT
              </p>
              {c.consentGate === "awaiting" ? (
                <p className="hint">Guardian consent awaiting — approve blocked.</p>
              ) : null}
              <DecisionPanel
                entityLabel={c.id}
                onDecide={(action, reason) => onDecide(c.id, action, reason)}
              />
            </div>
          </div>
        ))}
        {openClaims.length === 0 ? (
          <div className="empty">
            <h3>No open claims</h3>
            <p>Membership Path B claims will appear here.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
