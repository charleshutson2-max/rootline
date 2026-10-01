"use client";

import { useState } from "react";
import type { DecisionAction } from "@/lib/models";

interface DecisionPanelProps {
  entityLabel: string;
  onDecide: (action: DecisionAction, reason: string) => void;
  /** Extra steward actions (e.g. attach source / attach voice). */
  extras?: Array<{
    id: string;
    label: string;
    className?: string;
    onAction: (reason: string) => void;
  }>;
  disabled?: boolean;
}

export function DecisionPanel({
  entityLabel,
  onDecide,
  extras,
  disabled,
}: DecisionPanelProps) {
  const [reason, setReason] = useState("");
  const ready = reason.trim().length > 0 && !disabled;

  return (
    <div className="decision-panel">
      <div className="field">
        <label htmlFor={`reason-${entityLabel}`}>
          Audit reason (required)
        </label>
        <textarea
          id={`reason-${entityLabel}`}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          placeholder="Why are you taking this action?"
          disabled={disabled}
        />
        <p className="hint">Primary buttons stay disabled until a reason is typed.</p>
      </div>
      <div className="btn-row" style={{ margin: 0 }}>
        <button
          className="btn btn-primary"
          type="button"
          disabled={!ready}
          onClick={() => onDecide("approve", reason)}
        >
          Approve
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          disabled={!ready}
          onClick={() => onDecide("request_changes", reason)}
        >
          Request changes
        </button>
        <button
          className="btn btn-danger"
          type="button"
          disabled={!ready}
          onClick={() => onDecide("decline", reason)}
        >
          Decline
        </button>
        {extras?.map((x) => (
          <button
            key={x.id}
            className={x.className ?? "btn btn-secondary"}
            type="button"
            disabled={!ready}
            onClick={() => x.onAction(reason)}
          >
            {x.label}
          </button>
        ))}
      </div>
    </div>
  );
}
