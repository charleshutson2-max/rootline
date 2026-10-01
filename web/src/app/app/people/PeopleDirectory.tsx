"use client";

import { useMemo, useState } from "react";
import type { LineTag, Person } from "@/data/sample";
import { PersonCard } from "@/components/PersonCard";
import { useTreeStore } from "@/lib/treeStore";

type Filter = "all" | LineTag | "honor";

export function PeopleDirectory({ people: seedPeople }: { people: Person[] }) {
  const tree = useTreeStore();
  const people = useMemo(() => {
    const fromStore = Object.values(tree.people).filter((p) => !p.isSample);
    return fromStore.length ? fromStore : seedPeople;
  }, [tree.people, seedPeople]);

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return people.filter((p) => {
      const hay = `${p.fullName} ${p.placeDisplay} ${p.roleNote ?? ""}`.toLowerCase();
      if (q && !hay.includes(q.toLowerCase())) return false;
      if (filter === "all") return true;
      if (filter === "honor") return Boolean(p.honor);
      if (filter === "both") return p.line === "both";
      if (filter === "allied_other") return p.line === "allied_other";
      return p.line === filter || p.line === "both";
    });
  }, [people, q, filter]);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "norwood", label: "Norwood" },
    { id: "hutson", label: "Hutson" },
    { id: "both", label: "Both" },
    { id: "allied_other", label: "Allied" },
    { id: "honor", label: "Honor Roll" },
  ];

  return (
    <>
      <div className="field">
        <label className="sr-only" htmlFor="q">
          Search people
        </label>
        <input
          id="q"
          type="search"
          placeholder="Search names…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="filter-row" role="group" aria-label="Line filters">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`filter-chip${filter === c.id ? " is-active" : ""}`}
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="card-list">
        {filtered.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
        {filtered.length === 0 ? (
          <div className="empty">
            <h3>No matches</h3>
            <p className="meta">Try another line filter or clear search.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
