"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LineTag, LivingStatus, RelationshipKind } from "@/data/sample";
import { LineChip, PrivacyChip, SampleChip } from "@/components/LineChip";
import {
  addRelationship,
  createPerson,
  removeRelationship,
  updatePerson,
  useTreeStore,
} from "@/lib/treeStore";

const LINE_OPTIONS: { value: LineTag; label: string }[] = [
  { value: "norwood", label: "Norwood" },
  { value: "hutson", label: "Hutson" },
  { value: "both", label: "Both" },
  { value: "allied_other", label: "Allied / other" },
];

const KIND_OPTIONS: { value: RelationshipKind; label: string }[] = [
  { value: "parent", label: "Parent → child" },
  { value: "spouse", label: "Spouse" },
  { value: "fiance", label: "Fiancé / fiancée" },
  { value: "sibling", label: "Sibling" },
];

export function PeopleAdmin() {
  const tree = useTreeStore();
  const people = useMemo(
    () =>
      Object.values(tree.people).sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      ),
    [tree.people]
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    people[0]?.id ?? null
  );
  const selected = selectedId ? tree.people[selectedId] : undefined;
  const [message, setMessage] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  // Edit form
  const [fullName, setFullName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [livingStatus, setLivingStatus] = useState<LivingStatus>("living");
  const [deathDisplay, setDeathDisplay] = useState("");
  const [privacyOn, setPrivacyOn] = useState(true);
  const [line, setLine] = useState<LineTag>("norwood");
  const [roleNote, setRoleNote] = useState("");

  // Create form
  const [creating, setCreating] = useState(false);
  const [cFull, setCFull] = useState("");
  const [cPref, setCPref] = useState("");
  const [cLiving, setCLiving] = useState<LivingStatus>("living");
  const [cDeath, setCDeath] = useState("");
  const [cLine, setCLine] = useState<LineTag>("norwood");
  const [cRole, setCRole] = useState("");
  const [cPrivacy, setCPrivacy] = useState(true);

  // Rel form
  const [relKind, setRelKind] = useState<RelationshipKind>("parent");
  const [relFrom, setRelFrom] = useState("");
  const [relTo, setRelTo] = useState("");

  function loadPerson(id: string) {
    const p = tree.people[id];
    if (!p) return;
    setSelectedId(id);
    setCreating(false);
    setFullName(p.fullName);
    setPreferredName(p.preferredName);
    setLivingStatus(p.livingStatus);
    setDeathDisplay(p.livingStatus === "living" ? "" : p.deathDisplay);
    setPrivacyOn(p.privacyOn);
    setLine(p.line);
    setRoleNote(p.roleNote ?? "");
    setMessage(null);
  }

  function flash(result: { ok: boolean; message: string }) {
    setMessage(result.message);
    if (result.ok) setReason("");
  }

  function onSave() {
    if (!selectedId) return;
    flash(
      updatePerson(
        selectedId,
        {
          fullName,
          preferredName,
          livingStatus,
          deathDisplay,
          privacyOn,
          line,
          roleNote,
        },
        reason
      )
    );
  }

  function onCreate() {
    const result = createPerson(
      {
        fullName: cFull,
        preferredName: cPref || undefined,
        livingStatus: cLiving,
        deathDisplay: cDeath || undefined,
        privacyOn: cPrivacy,
        line: cLine,
        roleNote: cRole || undefined,
      },
      reason
    );
    flash(result);
    if (result.ok) {
      setCreating(false);
      setCFull("");
      setCPref("");
      setCRole("");
      setCDeath("");
    }
  }

  function onAddRel() {
    flash(
      addRelationship(
        { kind: relKind, fromId: relFrom || selectedId || "", toId: relTo },
        reason
      )
    );
  }

  const personRels = useMemo(() => {
    if (!selectedId) return [];
    return tree.relationships.filter(
      (r) => r.fromId === selectedId || r.toId === selectedId
    );
  }, [tree.relationships, selectedId]);

  return (
    <div className="steward-people">
      <div className="steward-people-grid">
        <aside className="card steward-people-list">
          <div className="btn-row" style={{ marginBottom: "0.75rem" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setCreating(true);
                setSelectedId(null);
                setMessage(null);
              }}
            >
              Create person
            </button>
          </div>
          <ul className="admin-person-list">
            {people.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`admin-person-item${selectedId === p.id && !creating ? " is-active" : ""}`}
                  onClick={() => loadPerson(p.id)}
                >
                  <span className="admin-person-name">{p.fullName}</span>
                  <span className="meta">
                    {p.livingStatus} · {p.line}
                    {p.isSample ? " · SAMPLE" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="card">
          <div className="field">
            <label htmlFor="audit-reason">Audit reason (required for every mutation)</label>
            <textarea
              id="audit-reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you making this change?"
            />
            <p className="hint">Save / create / relationship buttons stay blocked until a reason is typed.</p>
          </div>
          {message ? <p className="notice">{message}</p> : null}

          {creating ? (
            <>
              <h2>Create person</h2>
              <div className="field">
                <label htmlFor="c-full">Full name</label>
                <input id="c-full" value={cFull} onChange={(e) => setCFull(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="c-pref">Preferred name</label>
                <input id="c-pref" value={cPref} onChange={(e) => setCPref(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="c-living">Living status</label>
                <select
                  id="c-living"
                  value={cLiving}
                  onChange={(e) => setCLiving(e.target.value as LivingStatus)}
                >
                  <option value="living">Living</option>
                  <option value="deceased">Deceased</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              {cLiving !== "living" ? (
                <div className="field">
                  <label htmlFor="c-death">Death display</label>
                  <input
                    id="c-death"
                    value={cDeath}
                    onChange={(e) => setCDeath(e.target.value)}
                    placeholder="Not yet known"
                  />
                </div>
              ) : null}
              <div className="field">
                <label htmlFor="c-line">Line</label>
                <select
                  id="c-line"
                  value={cLine}
                  onChange={(e) => setCLine(e.target.value as LineTag)}
                >
                  {LINE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-role">Role note</label>
                <input id="c-role" value={cRole} onChange={(e) => setCRole(e.target.value)} />
              </div>
              <label className="toggle-row" style={{ marginBottom: "1rem" }}>
                <div>
                  <strong>Privacy ON</strong>
                  <p className="hint">Default for living people</p>
                </div>
                <input
                  type="checkbox"
                  checked={cPrivacy}
                  onChange={(e) => setCPrivacy(e.target.checked)}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!reason.trim() || !cFull.trim()}
                onClick={onCreate}
              >
                Create
              </button>
            </>
          ) : selected ? (
            <>
              <div className="chip-row" style={{ marginBottom: "0.5rem" }}>
                {selected.isSample ? <SampleChip /> : null}
                <LineChip line={selected.line} />
                {selected.privacyOn ? <PrivacyChip /> : null}
                <Link className="btn btn-ghost" href={`/app/people/${selected.id}`}>
                  Open profile
                </Link>
              </div>
              <h2>Edit · {selected.fullName}</h2>
              <p className="meta">ID: {selected.id}</p>
              <div className="field">
                <label htmlFor="e-full">Full name</label>
                <input id="e-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="e-pref">Preferred name</label>
                <input
                  id="e-pref"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="e-living">Living status</label>
                <select
                  id="e-living"
                  value={livingStatus}
                  onChange={(e) => setLivingStatus(e.target.value as LivingStatus)}
                >
                  <option value="living">Living</option>
                  <option value="deceased">Deceased</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              {livingStatus !== "living" ? (
                <div className="field">
                  <label htmlFor="e-death">Death display / date</label>
                  <input
                    id="e-death"
                    value={deathDisplay}
                    onChange={(e) => setDeathDisplay(e.target.value)}
                    placeholder="Not yet known"
                  />
                </div>
              ) : null}
              <div className="field">
                <label htmlFor="e-line">Line tag</label>
                <select
                  id="e-line"
                  value={line}
                  onChange={(e) => setLine(e.target.value as LineTag)}
                >
                  {LINE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="e-role">Role note</label>
                <input id="e-role" value={roleNote} onChange={(e) => setRoleNote(e.target.value)} />
              </div>
              <label className="toggle-row" style={{ marginBottom: "1rem" }}>
                <div>
                  <strong>Privacy ON</strong>
                </div>
                <input
                  type="checkbox"
                  checked={privacyOn}
                  onChange={(e) => setPrivacyOn(e.target.checked)}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!reason.trim()}
                onClick={onSave}
              >
                Save changes
              </button>

              <hr className="divider" />
              <h3>Relationships</h3>
              <ul className="admin-rel-list">
                {personRels.map((r) => {
                  const otherId = r.fromId === selectedId ? r.toId : r.fromId;
                  const other = tree.people[otherId];
                  const label =
                    r.kind === "parent"
                      ? r.fromId === selectedId
                        ? `Parent of ${other?.preferredName ?? otherId}`
                        : `Child of ${other?.preferredName ?? otherId}`
                      : r.kind === "spouse"
                        ? `Spouse · ${other?.preferredName ?? otherId}`
                        : r.kind === "fiance"
                          ? `Fiancé · ${other?.preferredName ?? otherId}`
                          : `Sibling · ${other?.preferredName ?? otherId}`;
                  return (
                    <li key={r.id} className="admin-rel-row">
                      <span>{label}</span>
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={!reason.trim()}
                        onClick={() => flash(removeRelationship(r.id, reason))}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
                {personRels.length === 0 ? (
                  <li className="meta">No relationships on file.</li>
                ) : null}
              </ul>

              <h3 style={{ marginTop: "1.25rem" }}>Add relationship</h3>
              <div className="field">
                <label htmlFor="rel-kind">Kind</label>
                <select
                  id="rel-kind"
                  value={relKind}
                  onChange={(e) => setRelKind(e.target.value as RelationshipKind)}
                >
                  {KIND_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="rel-from">
                  {relKind === "parent" ? "Parent" : "Person A"}
                </label>
                <select
                  id="rel-from"
                  value={relFrom || selectedId || ""}
                  onChange={(e) => setRelFrom(e.target.value)}
                >
                  {people.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="rel-to">
                  {relKind === "parent" ? "Child" : "Person B"}
                </label>
                <select
                  id="rel-to"
                  value={relTo}
                  onChange={(e) => setRelTo(e.target.value)}
                >
                  <option value="">Select…</option>
                  {people.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!reason.trim() || !relTo}
                onClick={onAddRel}
              >
                Add relationship
              </button>
            </>
          ) : (
            <p className="meta">Select a person or create one.</p>
          )}
        </div>
      </div>

      {tree.audit.length > 0 ? (
        <section className="section">
          <h2>Recent tree audit</h2>
          <div className="card-list">
            {tree.audit.slice(0, 12).map((a) => (
              <div key={a.id} className="card">
                <p className="meta">
                  {new Date(a.at).toLocaleString()} · {a.action} · {a.entityType}{" "}
                  {a.entityId}
                </p>
                <p>
                  <strong>{a.actorLabel}</strong> — {a.reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
