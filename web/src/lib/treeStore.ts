/**
 * Mutable people + relationships store for Steward admin.
 * Client: localStorage. Server durability: /api/tree → web/data/tree.json.
 */

"use client";

import { useSyncExternalStore } from "react";
import {
  UNKNOWN,
  cloneSeedPeople,
  cloneSeedRelationships,
  initialsFromName,
  type LineTag,
  type LivingStatus,
  type Person,
  type Relationship,
  type RelationshipKind,
} from "@/data/sample";

const STORAGE_KEY = "rootline.tree.v1";
const ACTOR = "Charlie Hutson (Founding Steward)";

export interface TreeAuditEvent {
  id: string;
  at: string;
  entityType: "person" | "relationship";
  entityId: string;
  action: "create" | "update" | "delete" | "add_relationship" | "remove_relationship";
  actorLabel: string;
  reason: string;
}

export interface TreeState {
  people: Record<string, Person>;
  relationships: Relationship[];
  audit: TreeAuditEvent[];
}

export type TreeResult = { ok: true; message: string } | { ok: false; message: string };

function isoNow(): string {
  return new Date().toISOString();
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function seedTree(): TreeState {
  return {
    people: cloneSeedPeople(),
    relationships: cloneSeedRelationships(),
    audit: [],
  };
}

const serverSnapshot: TreeState = seedTree();
let state: TreeState = seedTree();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
  persistLocal();
  persistRemote();
}

function persistLocal() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

let remoteTimer: ReturnType<typeof setTimeout> | null = null;
function persistRemote() {
  if (typeof window === "undefined") return;
  if (remoteTimer) clearTimeout(remoteTimer);
  remoteTimer = setTimeout(() => {
    void fetch("/api/tree", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    }).catch(() => {
      /* offline / build — localStorage still holds edits */
    });
  }, 250);
}

function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TreeState;
      if (parsed?.people && parsed?.relationships) {
        state = {
          people: parsed.people,
          relationships: parsed.relationships,
          audit: Array.isArray(parsed.audit) ? parsed.audit : [],
        };
        return;
      }
    }
  } catch {
    /* ignore */
  }
  // Try durable disk seed via API (async); seed stays until then
  void fetch("/api/tree")
    .then((r) => (r.ok ? r.json() : null))
    .then((data: TreeState | null) => {
      if (!data?.people || !data?.relationships) return;
      const local = window.localStorage.getItem(STORAGE_KEY);
      if (local) return; // local wins
      state = {
        people: data.people,
        relationships: data.relationships,
        audit: Array.isArray(data.audit) ? data.audit : [],
      };
      persistLocal();
      for (const l of listeners) l();
    })
    .catch(() => {
      /* ignore */
    });
}

function getSnapshot(): TreeState {
  hydrateFromStorage();
  return state;
}

function getServerSnapshot(): TreeState {
  return serverSnapshot;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTreeStore(): TreeState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getTreePeopleList(includeSample = false): Person[] {
  const s = getSnapshot();
  return Object.values(s.people).filter((p) => includeSample || !p.isSample);
}

export function getTreePerson(id: string): Person | undefined {
  return getSnapshot().people[id];
}

export function getTreeRelationships(): Relationship[] {
  return getSnapshot().relationships;
}

function pushAudit(
  partial: Omit<TreeAuditEvent, "id" | "at" | "actorLabel"> & { actorLabel?: string }
): void {
  const event: TreeAuditEvent = {
    id: uid("taudit"),
    at: isoNow(),
    entityType: partial.entityType,
    entityId: partial.entityId,
    action: partial.action,
    actorLabel: partial.actorLabel ?? ACTOR,
    reason: partial.reason,
  };
  state = { ...state, audit: [event, ...state.audit] };
}

function requireReason(reason: string): TreeResult | null {
  if (!reason.trim()) {
    return { ok: false, message: "Audit reason required. Action cancelled." };
  }
  return null;
}

export function createPerson(
  input: {
    fullName: string;
    preferredName?: string;
    livingStatus: LivingStatus;
    deathDisplay?: string;
    privacyOn?: boolean;
    line: LineTag;
    roleNote?: string;
  },
  reason: string
): TreeResult {
  const bad = requireReason(reason);
  if (bad) return bad;
  const fullName = input.fullName.trim();
  if (!fullName) return { ok: false, message: "Full name is required." };

  const preferredName = (input.preferredName?.trim() || fullName.split(/\s+/)[0]) ?? fullName;
  const id = uid("person");
  const living = input.livingStatus === "living";
  const person: Person = {
    id,
    preferredName,
    fullName,
    initials: initialsFromName(fullName),
    line: input.line,
    livingStatus: input.livingStatus,
    yearsDisplay: living
      ? "Living"
      : input.deathDisplay?.trim() || UNKNOWN,
    birthDisplay: UNKNOWN,
    deathDisplay: living ? "—" : input.deathDisplay?.trim() || UNKNOWN,
    placeDisplay: UNKNOWN,
    occupationDisplay: UNKNOWN,
    militaryDisplay: UNKNOWN,
    publicLifeDisplay: UNKNOWN,
    privacyOn: input.privacyOn ?? living,
    isSample: false,
    roleNote: input.roleNote?.trim() || undefined,
  };
  state = {
    ...state,
    people: { ...state.people, [id]: person },
  };
  pushAudit({
    entityType: "person",
    entityId: id,
    action: "create",
    reason: reason.trim(),
  });
  emit();
  return { ok: true, message: `Created ${fullName}.` };
}

export function updatePerson(
  id: string,
  patch: Partial<{
    fullName: string;
    preferredName: string;
    livingStatus: LivingStatus;
    deathDisplay: string;
    yearsDisplay: string;
    privacyOn: boolean;
    line: LineTag;
    roleNote: string;
    placeDisplay: string;
  }>,
  reason: string
): TreeResult {
  const bad = requireReason(reason);
  if (bad) return bad;
  const existing = state.people[id];
  if (!existing) return { ok: false, message: "Person not found." };

  const next: Person = { ...existing };
  if (patch.fullName !== undefined) {
    next.fullName = patch.fullName.trim();
    next.initials = initialsFromName(next.fullName);
  }
  if (patch.preferredName !== undefined) next.preferredName = patch.preferredName.trim();
  if (patch.livingStatus !== undefined) {
    next.livingStatus = patch.livingStatus;
    if (patch.livingStatus === "living") {
      next.yearsDisplay = "Living";
      next.deathDisplay = "—";
      if (patch.privacyOn === undefined) next.privacyOn = true;
    }
  }
  if (patch.deathDisplay !== undefined && next.livingStatus !== "living") {
    next.deathDisplay = patch.deathDisplay.trim() || UNKNOWN;
    next.yearsDisplay = patch.yearsDisplay?.trim() || next.deathDisplay;
  }
  if (patch.yearsDisplay !== undefined) next.yearsDisplay = patch.yearsDisplay.trim();
  if (patch.privacyOn !== undefined) next.privacyOn = patch.privacyOn;
  if (patch.line !== undefined) next.line = patch.line;
  if (patch.roleNote !== undefined) {
    next.roleNote = patch.roleNote.trim() || undefined;
  }
  if (patch.placeDisplay !== undefined) {
    next.placeDisplay = patch.placeDisplay.trim() || UNKNOWN;
  }

  state = {
    ...state,
    people: { ...state.people, [id]: next },
  };
  pushAudit({
    entityType: "person",
    entityId: id,
    action: "update",
    reason: reason.trim(),
  });
  emit();
  return { ok: true, message: `Updated ${next.fullName}.` };
}

export function addRelationship(
  input: { kind: RelationshipKind; fromId: string; toId: string },
  reason: string
): TreeResult {
  const bad = requireReason(reason);
  if (bad) return bad;
  if (!state.people[input.fromId] || !state.people[input.toId]) {
    return { ok: false, message: "Both people must exist." };
  }
  if (input.fromId === input.toId) {
    return { ok: false, message: "Cannot link a person to themselves." };
  }
  const dup = state.relationships.find(
    (r) =>
      r.kind === input.kind &&
      ((r.fromId === input.fromId && r.toId === input.toId) ||
        (r.kind !== "parent" &&
          r.fromId === input.toId &&
          r.toId === input.fromId))
  );
  if (dup) return { ok: false, message: "That relationship already exists." };

  const rel: Relationship = {
    id: uid("rel"),
    kind: input.kind,
    fromId: input.fromId,
    toId: input.toId,
    status: "approved",
    isSample: false,
  };
  state = { ...state, relationships: [...state.relationships, rel] };
  pushAudit({
    entityType: "relationship",
    entityId: rel.id,
    action: "add_relationship",
    reason: reason.trim(),
  });
  emit();
  return { ok: true, message: `Added ${input.kind} link.` };
}

export function removeRelationship(id: string, reason: string): TreeResult {
  const bad = requireReason(reason);
  if (bad) return bad;
  if (!state.relationships.some((r) => r.id === id)) {
    return { ok: false, message: "Relationship not found." };
  }
  state = {
    ...state,
    relationships: state.relationships.filter((r) => r.id !== id),
  };
  pushAudit({
    entityType: "relationship",
    entityId: id,
    action: "remove_relationship",
    reason: reason.trim(),
  });
  emit();
  return { ok: true, message: "Relationship removed." };
}

export function resetTreeStore(): void {
  state = seedTree();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  emit();
}

export function relationsFor(personId: string): {
  parents: Person[];
  children: Person[];
  spouses: Person[];
  fiances: Person[];
  siblings: Person[];
} {
  const s = getSnapshot();
  const parents: Person[] = [];
  const children: Person[] = [];
  const spouses: Person[] = [];
  const fiances: Person[] = [];
  const siblings: Person[] = [];
  for (const r of s.relationships) {
    if (r.status !== "approved") continue;
    if (r.kind === "parent") {
      if (r.toId === personId) {
        const p = s.people[r.fromId];
        if (p) parents.push(p);
      }
      if (r.fromId === personId) {
        const c = s.people[r.toId];
        if (c) children.push(c);
      }
    } else if (r.kind === "spouse") {
      const other =
        r.fromId === personId
          ? s.people[r.toId]
          : r.toId === personId
            ? s.people[r.fromId]
            : undefined;
      if (other) spouses.push(other);
    } else if (r.kind === "fiance") {
      const other =
        r.fromId === personId
          ? s.people[r.toId]
          : r.toId === personId
            ? s.people[r.fromId]
            : undefined;
      if (other) fiances.push(other);
    } else if (r.kind === "sibling") {
      const other =
        r.fromId === personId
          ? s.people[r.toId]
          : r.toId === personId
            ? s.people[r.fromId]
            : undefined;
      if (other) siblings.push(other);
    }
  }
  return { parents, children, spouses, fiances, siblings };
}
