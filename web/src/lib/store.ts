/**
 * Session store for claims, proposals, membership, and audit.
 * Typed in-memory state + localStorage persistence (client).
 * No Postgres yet — SAMPLE data only.
 */

"use client";

import { useSyncExternalStore } from "react";
import {
  type AccessClaim,
  type ApprovalAction,
  type AuditEvent,
  type ConsentGate,
  type DecisionAction,
  type MembershipStatus,
  type Proposal,
  type WorkflowStatus,
  isOpenWorkflow,
} from "./models";
import { SAMPLE_INVITE_CODE } from "@/data/sample";

const STORAGE_KEY = "rootline.session.v1";

export interface SessionState {
  claims: AccessClaim[];
  proposals: Proposal[];
  audit: AuditEvent[];
  membershipStatus: MembershipStatus;
  membershipNote: string | null;
}

function isoNow(): string {
  return new Date().toISOString();
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function seedClaims(): AccessClaim[] {
  return [
    {
      id: "claim-1",
      fullName: "SAMPLE Applicant One",
      assertedRelationship:
        "Claims kinship on the Norwood side (demo Path B — not a real person)",
      voucherName: undefined,
      isMinor: false,
      status: "pending",
      consentGate: "not_required",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isSample: true,
    },
    {
      id: "claim-2",
      fullName: "SAMPLE Applicant Two",
      assertedRelationship: "Cousin on the Hutson line — voucher named (demo)",
      voucherName: "SAMPLE Member Voucher",
      isMinor: false,
      status: "changes_requested",
      consentGate: "not_required",
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isSample: true,
    },
  ];
}

function seedProposals(): Proposal[] {
  return [
    {
      id: "prop-1",
      kind: "story",
      title: "Proposed family memory (demo)",
      summary: "Proposed by Member · pending Steward review · demo queue item",
      proposerLabel: "SAMPLE Member",
      status: "pending",
      consentGate: "not_required",
      researchSandbox: false,
      hasSource: false,
      ragEligible: false,
      personId: "haven",
      body: "Demo proposal only — not family biography. Stewards approve with an audit reason.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isSample: true,
    },
    {
      id: "prop-2",
      kind: "honor_badge",
      title: "Honor badge proposal (demo)",
      summary: "Source attachment required before gold mark publishes",
      proposerLabel: "SAMPLE Member",
      status: "pending",
      consentGate: "not_required",
      researchSandbox: false,
      hasSource: false,
      ragEligible: false,
      personId: "carter-ii",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isSample: true,
    },
    {
      id: "prop-3",
      kind: "voice_memory",
      title: "Memory transcript (demo)",
      summary: "Needs Steward attach before Ask Rootline indexing",
      proposerLabel: "SAMPLE Elder",
      status: "pending",
      consentGate: "not_required",
      researchSandbox: false,
      hasSource: false,
      voiceAttachStatus: "needs_steward_attach",
      ragEligible: false,
      personId: "carol-anne",
      body: "Demo voice transcript stub — not indexed for Ask until Steward attach. Not biography.",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isSample: true,
    },
  ];
}

function seedState(): SessionState {
  return {
    claims: seedClaims(),
    proposals: seedProposals(),
    audit: [],
    membershipStatus: "none",
    membershipNote: null,
  };
}

const serverSnapshot: SessionState = seedState();
let state: SessionState = seedState();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
  persist();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — keep module state only */
  }
}

function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as SessionState;
    if (
      parsed &&
      Array.isArray(parsed.claims) &&
      Array.isArray(parsed.proposals) &&
      Array.isArray(parsed.audit)
    ) {
      state = {
        claims: parsed.claims,
        proposals: parsed.proposals,
        audit: parsed.audit,
        membershipStatus: parsed.membershipStatus ?? "none",
        membershipNote: parsed.membershipNote ?? null,
      };
    }
  } catch {
    /* ignore corrupt storage */
  }
}

function getSnapshot(): SessionState {
  hydrateFromStorage();
  return state;
}

function getServerSnapshot(): SessionState {
  return serverSnapshot;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSessionStore(): SessionState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function pushAudit(
  partial: Omit<AuditEvent, "id" | "at"> & { at?: string }
): void {
  const event: AuditEvent = {
    id: uid("audit"),
    at: partial.at ?? isoNow(),
    entityType: partial.entityType,
    entityId: partial.entityId,
    action: partial.action,
    actorLabel: partial.actorLabel,
    actorCapacity: partial.actorCapacity,
    reason: partial.reason,
  };
  state = { ...state, audit: [event, ...state.audit] };
}

export type StoreResult = { ok: true; message: string } | { ok: false; message: string };

export function submitAccessClaim(input: {
  fullName: string;
  assertedRelationship: string;
  voucherName?: string;
  docsNote?: string;
  isMinor?: boolean;
}): StoreResult {
  const claim: AccessClaim = {
    id: uid("claim"),
    fullName: input.fullName.trim(),
    assertedRelationship: input.assertedRelationship.trim(),
    voucherName: input.voucherName?.trim() || undefined,
    docsNote: input.docsNote?.trim() || undefined,
    isMinor: Boolean(input.isMinor),
    status: "pending",
    consentGate: input.isMinor ? "awaiting" : "not_required",
    submittedAt: isoNow(),
    isSample: true,
  };
  state = { ...state, claims: [claim, ...state.claims] };
  pushAudit({
    entityType: "access_claim",
    entityId: claim.id,
    action: "submit",
    actorLabel: claim.fullName,
    actorCapacity: "member",
    reason: "Claimant submitted Path B access claim (SAMPLE session).",
  });
  emit();
  return {
    ok: true,
    message: `Claim submitted as pending (SAMPLE). Steward Claims desk will see “${claim.fullName}”.`,
  };
}

export function redeemInvite(code: string): StoreResult {
  const normalized = code.trim().toUpperCase();
  if (normalized !== SAMPLE_INVITE_CODE) {
    return {
      ok: false,
      message: "That code is not recognized in the SAMPLE seed. Try SAMPLE-JOIN.",
    };
  }
  state = {
    ...state,
    membershipStatus: "active",
    membershipNote: `Demo membership approved via Steward-issued SAMPLE code ${SAMPLE_INVITE_CODE}.`,
  };
  pushAudit({
    entityType: "membership",
    entityId: "session-member",
    action: "redeem_invite",
    actorLabel: "SAMPLE Session Member",
    actorCapacity: "member",
    reason: `Redeemed invite code ${SAMPLE_INVITE_CODE}.`,
  });
  pushAudit({
    entityType: "membership",
    entityId: "session-member",
    action: "membership_approved",
    actorLabel: "SAMPLE Steward (auto)",
    actorCapacity: "steward",
    reason: `Steward-issued SAMPLE invite ${SAMPLE_INVITE_CODE} auto-approved membership for demo session.`,
  });
  emit();
  return {
    ok: true,
    message: `Accepted SAMPLE code ${SAMPLE_INVITE_CODE}. Membership marked approved for this demo session.`,
  };
}

function mapDecisionToStatus(action: DecisionAction): WorkflowStatus {
  if (action === "approve") return "approved";
  if (action === "decline") return "declined";
  return "changes_requested";
}

function mapDecisionToAudit(action: DecisionAction): ApprovalAction {
  if (action === "approve") return "approve";
  if (action === "decline") return "decline";
  return "request_changes";
}

export function decideClaim(
  claimId: string,
  action: DecisionAction,
  reason: string,
  actorLabel = "Charlie Hutson (Founding Steward)"
): StoreResult {
  const trimmed = reason.trim();
  if (!trimmed) {
    return { ok: false, message: "Audit reason required. Action cancelled." };
  }
  const claim = state.claims.find((c) => c.id === claimId);
  if (!claim) return { ok: false, message: "Claim not found." };
  if (!isOpenWorkflow(claim.status) || claim.status === "draft") {
    return { ok: false, message: "Claim is not open for Steward decision." };
  }
  if (action === "approve" && claim.consentGate === "awaiting") {
    return {
      ok: false,
      message: "Guardian consent still awaiting — cannot approve yet.",
    };
  }
  if (claim.consentGate === "vetoed") {
    return { ok: false, message: "Consent vetoed — claim cannot be approved." };
  }

  const nextStatus = mapDecisionToStatus(action);
  state = {
    ...state,
    claims: state.claims.map((c) =>
      c.id === claimId ? { ...c, status: nextStatus } : c
    ),
  };
  pushAudit({
    entityType: "access_claim",
    entityId: claimId,
    action: mapDecisionToAudit(action),
    actorLabel,
    actorCapacity: "steward",
    reason: trimmed,
  });
  emit();
  return {
    ok: true,
    message: `Claim ${nextStatus.replace("_", " ")} — “${trimmed}”.`,
  };
}

export function decideProposal(
  proposalId: string,
  action: DecisionAction,
  reason: string,
  actorLabel = "Charlie Hutson (Founding Steward)"
): StoreResult {
  const trimmed = reason.trim();
  if (!trimmed) {
    return { ok: false, message: "Audit reason required. Action cancelled." };
  }
  const proposal = state.proposals.find((p) => p.id === proposalId);
  if (!proposal) return { ok: false, message: "Proposal not found." };
  if (!isOpenWorkflow(proposal.status) || proposal.status === "draft") {
    return { ok: false, message: "Proposal is not open for decision." };
  }

  if (action === "approve") {
    if (proposal.researchSandbox) {
      return {
        ok: false,
        message: "Research-sandbox proposals cannot reach approved.",
      };
    }
    if (
      proposal.consentGate === "awaiting" ||
      proposal.consentGate === "vetoed"
    ) {
      return {
        ok: false,
        message:
          "Consent gate blocks approve (awaiting or vetoed). Living owner / guardian must grant first.",
      };
    }
    if (proposal.kind === "honor_badge" && !proposal.hasSource) {
      return {
        ok: false,
        message:
          "Honor badge cannot be approved without a source. Request changes or attach a source first.",
      };
    }
  }

  const nextStatus = mapDecisionToStatus(action);
  let next = { ...proposal, status: nextStatus };

  // Approving voice for member visibility does NOT flip RAG until attach.
  if (action === "approve" && proposal.kind === "voice_memory") {
    next = {
      ...next,
      ragEligible: false,
      voiceAttachStatus:
        proposal.voiceAttachStatus === "attached"
          ? "attached"
          : "needs_steward_attach",
    };
  }

  state = {
    ...state,
    proposals: state.proposals.map((p) => (p.id === proposalId ? next : p)),
  };
  pushAudit({
    entityType: "proposal",
    entityId: proposalId,
    action: mapDecisionToAudit(action),
    actorLabel,
    actorCapacity: "steward",
    reason: trimmed,
  });
  emit();

  let message = `Proposal ${nextStatus.replace("_", " ")} — “${trimmed}”.`;
  if (action === "approve" && proposal.kind === "voice_memory") {
    message +=
      " Voice remains not RAG-ready until Steward attach (separate action).";
  }
  return { ok: true, message };
}

/** Mark honor proposal as having a source (demo helper). */
export function attachHonorSource(
  proposalId: string,
  sourceLabel: string,
  reason: string,
  actorLabel = "Charlie Hutson (Founding Steward)"
): StoreResult {
  const trimmed = reason.trim();
  if (!trimmed) {
    return { ok: false, message: "Audit reason required." };
  }
  const label = sourceLabel.trim();
  if (!label) {
    return { ok: false, message: "Source label required." };
  }
  const proposal = state.proposals.find((p) => p.id === proposalId);
  if (!proposal || proposal.kind !== "honor_badge") {
    return { ok: false, message: "Honor proposal not found." };
  }
  state = {
    ...state,
    proposals: state.proposals.map((p) =>
      p.id === proposalId
        ? {
            ...p,
            hasSource: true,
            sourceLabel: label,
            summary: `Source on file: ${label}`,
          }
        : p
    ),
  };
  pushAudit({
    entityType: "proposal",
    entityId: proposalId,
    action: "attach",
    actorLabel,
    actorCapacity: "steward",
    reason: trimmed,
  });
  emit();
  return {
    ok: true,
    message: `Source attached (“${label}”). Honor may now be approved.`,
  };
}

/** Steward attach voice → RAG eligible. */
export function stewardAttachVoice(
  proposalId: string,
  reason: string,
  actorLabel = "Charlie Hutson (Founding Steward)"
): StoreResult {
  const trimmed = reason.trim();
  if (!trimmed) {
    return { ok: false, message: "Audit reason required for Steward attach." };
  }
  const proposal = state.proposals.find((p) => p.id === proposalId);
  if (!proposal || proposal.kind !== "voice_memory") {
    return { ok: false, message: "Voice proposal not found." };
  }
  state = {
    ...state,
    proposals: state.proposals.map((p) =>
      p.id === proposalId
        ? {
            ...p,
            voiceAttachStatus: "attached",
            ragEligible: true,
            summary: "Steward-attached · RAG-ready (SAMPLE)",
          }
        : p
    ),
  };
  pushAudit({
    entityType: "proposal",
    entityId: proposalId,
    action: "attach",
    actorLabel,
    actorCapacity: "steward",
    reason: trimmed,
  });
  emit();
  return {
    ok: true,
    message: `Voice Steward-attached — RAG-eligible. Reason: “${trimmed}”.`,
  };
}

export function proposeMemory(input: {
  title: string;
  body: string;
  personId?: string;
}): StoreResult {
  const title = input.title.trim();
  const body = input.body.trim();
  if (!title || !body) {
    return { ok: false, message: "Title and memory text are required." };
  }
  const proposal: Proposal = {
    id: uid("prop"),
    kind: "story",
    title,
    summary: "Proposed by Member · SAMPLE memory · pending Steward review",
    proposerLabel: "SAMPLE Session Member",
    status: "pending",
    consentGate: "not_required",
    researchSandbox: false,
    hasSource: false,
    ragEligible: false,
    personId: input.personId ?? "charlie",
    body,
    createdAt: isoNow(),
    isSample: true,
  };
  state = { ...state, proposals: [proposal, ...state.proposals] };
  pushAudit({
    entityType: "proposal",
    entityId: proposal.id,
    action: "submit",
    actorLabel: "SAMPLE Session Member",
    actorCapacity: "member",
    reason: "Member proposed a memory (SAMPLE session).",
  });
  emit();
  return {
    ok: true,
    message: `Memory “${title}” submitted as pending — visible in Steward Queue.`,
  };
}


export function fileResearchRequest(input: {
  query: string;
  note?: string;
}): StoreResult {
  const query = input.query.trim();
  if (!query) {
    return { ok: false, message: "Research request needs a question or topic." };
  }
  const title = query.toLowerCase().startsWith("research request")
    ? query.slice(0, 160)
    : `Research request: ${query}`.slice(0, 160);
  const proposal: Proposal = {
    id: uid("prop"),
    kind: "correction",
    title,
    summary:
      "Ask Rootline research request · pending Steward review (SAMPLE session)",
    proposerLabel: "SAMPLE Session Member",
    status: "pending",
    consentGate: "not_required",
    researchSandbox: true,
    hasSource: false,
    ragEligible: false,
    body: input.note?.trim() || query,
    createdAt: isoNow(),
    isSample: true,
  };
  state = { ...state, proposals: [proposal, ...state.proposals] };
  pushAudit({
    entityType: "proposal",
    entityId: proposal.id,
    action: "submit",
    actorLabel: "SAMPLE Session Member",
    actorCapacity: "member",
    reason: `Filed Ask Rootline research request: ${title}`,
  });
  emit();
  return {
    ok: true,
    message: `Research request filed as pending (“${title}”). Stewards will see it in the Queue.`,
  };
}

export function resetSessionStore(): void {
  state = seedState();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  emit();
}

/** Display helper — consent gate labels. */
export function consentLabel(gate: ConsentGate): string {
  switch (gate) {
    case "not_required":
      return "Consent not required";
    case "awaiting":
      return "Consent awaiting";
    case "granted":
      return "Consent granted";
    case "vetoed":
      return "Consent vetoed";
  }
}
