"use client";

import { useState, type FormEvent } from "react";
import { useTreeStore } from "@/lib/treeStore";

export function MergeClient() {
  const tree = useTreeStore();
  const peopleList = Object.values(tree.people).filter((p) => !p.isSample);
  const [keep, setKeep] = useState("haven");
  const [merge, setMerge] = useState("sommer");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState<string | null>(null);

  function preview(e: FormEvent) {
    e.preventDefault();
    if (keep === merge) {
      setNote("Cannot merge a person into themselves.");
      return;
    }
    if (!reason.trim()) {
      setNote("A merge reason is required (audit).");
      return;
    }
    const a = peopleList.find((p) => p.id === keep);
    const b = peopleList.find((p) => p.id === merge);
    setNote(
      `Preview only (not applied): keep ${a?.fullName}, fold ${b?.fullName}. Reason: “${reason.trim()}”.`
    );
  }

  return (
    <form className="card" onSubmit={preview}>
      <div className="field">
        <label htmlFor="keep">Keep this person</label>
        <select id="keep" value={keep} onChange={(e) => setKeep(e.target.value)}>
          {peopleList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="merge">Merge this duplicate into them</label>
        <select id="merge" value={merge} onChange={(e) => setMerge(e.target.value)}>
          {peopleList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="reason">Reason</label>
        <textarea
          id="reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Why these records are the same person"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Preview merge
      </button>
      {note ? <p className="notice" style={{ marginTop: "1rem" }}>{note}</p> : null}
    </form>
  );
}
