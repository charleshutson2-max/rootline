"use client";

import { useSessionStore } from "@/lib/store";

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

export function AuditClient() {
  const { audit } = useSessionStore();

  if (audit.length === 0) {
    return (
      <div className="empty" style={{ marginTop: "1.25rem" }}>
        <h3>No audit events yet</h3>
        <p>
          Approve, request changes, decline, invite redeem, and Steward attach
          actions will appear here with reasons.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: "1.25rem" }}>
      {audit.map((a) => (
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
  );
}
