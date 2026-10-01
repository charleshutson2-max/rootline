/**
 * ROOTLINE workflow types — mirrors docs/05-approval-state-machine.md
 * and schema enums in docs/04-schema-and-api.md.
 * In-memory / session only until Postgres is wired.
 */

export type WorkflowStatus =
  | "draft"
  | "pending"
  | "changes_requested"
  | "approved"
  | "declined"
  | "withdrawn";

export type ConsentGate =
  | "not_required"
  | "awaiting"
  | "granted"
  | "vetoed";

export type ProposalKind =
  | "new_person"
  | "relationship"
  | "photo"
  | "story"
  | "voice_memory"
  | "correction"
  | "social_link"
  | "honor_badge"
  | "merge";

export type ApprovalAction =
  | "submit"
  | "request_changes"
  | "approve"
  | "decline"
  | "withdraw"
  | "veto"
  | "consent_grant"
  | "attach";

export type VoiceAttachStatus =
  | "pending_transcript"
  | "needs_steward_attach"
  | "attached"
  | "rejected";

export type ActorCapacity =
  | "member"
  | "steward"
  | "reviewer"
  | "owner"
  | "guardian";

export type MembershipStatus =
  | "none"
  | "pending"
  | "active"
  | "suspended"
  | "ended";

export interface AccessClaim {
  id: string;
  fullName: string;
  assertedRelationship: string;
  voucherName?: string;
  docsNote?: string;
  isMinor: boolean;
  status: WorkflowStatus;
  consentGate: ConsentGate;
  /** ISO timestamp */
  submittedAt: string;
  isSample: true;
}

export interface Proposal {
  id: string;
  kind: ProposalKind;
  title: string;
  summary: string;
  proposerLabel: string;
  status: WorkflowStatus;
  consentGate: ConsentGate;
  /** Research sandbox cannot reach approved. */
  researchSandbox: boolean;
  /**
   * Honor badges: Steward cannot approve without a source.
   * False for non-honor kinds (unused).
   */
  hasSource: boolean;
  sourceLabel?: string;
  /** Voice: RAG stays false until Steward attach. */
  voiceAttachStatus?: VoiceAttachStatus;
  ragEligible: boolean;
  personId?: string;
  /** Optional body for story / memory proposals. */
  body?: string;
  /** ISO timestamp */
  createdAt: string;
  isSample: true;
}

export interface AuditEvent {
  id: string;
  entityType: "access_claim" | "proposal" | "membership";
  entityId: string;
  action: ApprovalAction | "redeem_invite" | "membership_approved";
  actorLabel: string;
  actorCapacity: ActorCapacity;
  reason: string;
  /** ISO timestamp */
  at: string;
}

export type DecisionAction = "approve" | "request_changes" | "decline";

export function isOpenWorkflow(status: WorkflowStatus): boolean {
  return (
    status === "draft" ||
    status === "pending" ||
    status === "changes_requested"
  );
}

export function workflowBadgeClass(status: WorkflowStatus): string {
  switch (status) {
    case "pending":
      return "badge badge-pending";
    case "changes_requested":
      return "badge badge-changes";
    case "approved":
      return "badge badge-approved";
    case "declined":
      return "badge badge-declined";
    case "withdrawn":
      return "badge badge-withdrawn";
    default:
      return "badge badge-draft";
  }
}

export function workflowLabel(status: WorkflowStatus): string {
  switch (status) {
    case "changes_requested":
      return "Changes requested";
    case "draft":
      return "Draft";
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "declined":
      return "Declined";
    case "withdrawn":
      return "Withdrawn";
  }
}
