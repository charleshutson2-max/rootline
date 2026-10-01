"use client";

import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import {
  HonorChip,
  LineChip,
  PrivacyChip,
  SampleChip,
} from "@/components/LineChip";
import { UNKNOWN } from "@/data/sample";
import { relationsFor, useTreeStore } from "@/lib/treeStore";

export function PersonProfile({ id }: { id: string }) {
  const tree = useTreeStore();
  const p = tree.people[id];
  if (!p) {
    return (
      <div className="empty">
        <h3>Person not found</h3>
        <p className="meta">This ID is not in the official tree.</p>
        <Link className="btn btn-secondary" href="/app/people">
          Directory
        </Link>
      </div>
    );
  }

  const rel = relationsFor(id);
  const isCoupleFocus =
    id === "haven" ||
    id === "charlie" ||
    id === "carter-ii" ||
    id === "carol-anne";

  const partner =
    rel.spouses[0] ??
    (id === "haven"
      ? tree.people.charlie
      : id === "charlie"
        ? tree.people.haven
        : id === "carter-ii"
          ? tree.people["carol-anne"]
          : id === "carol-anne"
            ? tree.people["carter-ii"]
            : undefined);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Avatar
          initials={p.initials}
          line={p.line}
          honor={Boolean(p.honor)}
          size={88}
        />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="chip-row">
            {p.isSample ? <SampleChip /> : null}
            <LineChip line={p.line} />
            {p.honor ? (
              <HonorChip category={p.honor.category} title={p.honor.title} />
            ) : null}
            {p.privacyOn ? <PrivacyChip /> : null}
          </div>
          <h1 style={{ marginTop: "0.35rem" }}>{p.fullName}</h1>
          <p className="meta">
            {p.yearsDisplay}
            {p.placeDisplay !== UNKNOWN ? ` · ${p.placeDisplay}` : ""}
            {p.roleNote ? ` · ${p.roleNote}` : ""}
          </p>
        </div>
      </div>

      {isCoupleFocus && partner ? (
        <section className="card couple-card" style={{ marginTop: "1.25rem" }}>
          <p className="eyebrow">
            {rel.spouses.some((s) => s.id === partner.id) ||
            (id === "carter-ii" && partner.id === "carol-anne") ||
            (id === "carol-anne" && partner.id === "carter-ii")
              ? p.livingStatus === "living" && partner.livingStatus === "deceased"
                ? "Widowed · spouse"
                : partner.livingStatus === "living" && p.livingStatus === "deceased"
                  ? "Late spouse of"
                  : "Spouse"
              : "Partner"}
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Avatar initials={partner.initials} line={partner.line} size={56} />
            <div>
              <h3>{partner.fullName}</h3>
              <p className="meta">
                {partner.yearsDisplay}
                {partner.roleNote ? ` · ${partner.roleNote}` : ""}
              </p>
              <Link className="btn btn-ghost" href={`/app/people/${partner.id}`}>
                Open profile
              </Link>
            </div>
          </div>
          {(id === "haven" || id === "charlie") && (
            <p className="meta" style={{ marginTop: "0.75rem" }}>
              Haven Nicole Norwood and Charles Sepe Tiaraju Hutson — legally
              married. Equal billing: Norwood plum · Hutson teal.
            </p>
          )}
          {(id === "carter-ii" || id === "carol-anne") && (
            <p className="meta" style={{ marginTop: "0.75rem" }}>
              Carol Anne Norwood, late wife of Carter McGrew Norwood II,
              deceased May 16, 2024.
            </p>
          )}
        </section>
      ) : null}

      <hr className="divider" />
      <dl>
        <div className="fact-row">
          <dt>Preferred name</dt>
          <dd>{p.preferredName}</dd>
        </div>
        <div className="fact-row">
          <dt>Birth</dt>
          <dd>
            {p.livingStatus === "living" ? (
              <>
                <span className="unknown">{UNKNOWN}</span>{" "}
                <span className="meta">(owner privacy)</span>
              </>
            ) : (
              <span className={p.birthDisplay === UNKNOWN ? "unknown" : undefined}>
                {p.birthDisplay}
              </span>
            )}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Death</dt>
          <dd
            className={
              p.livingStatus !== "living" && p.deathDisplay === UNKNOWN
                ? "unknown"
                : undefined
            }
          >
            {p.livingStatus === "living" ? "—" : p.deathDisplay || UNKNOWN}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Places</dt>
          <dd className={p.placeDisplay === UNKNOWN ? "unknown" : undefined}>
            {p.placeDisplay}
            {p.migration ? (
              <>
                {" "}
                · <em>{p.migration}</em>
              </>
            ) : null}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Occupation</dt>
          <dd className={p.occupationDisplay === UNKNOWN ? "unknown" : undefined}>
            {p.occupationDisplay}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Military</dt>
          <dd className={p.militaryDisplay === UNKNOWN ? "unknown" : undefined}>
            {p.militaryDisplay}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Public life</dt>
          <dd className={p.publicLifeDisplay === UNKNOWN ? "unknown" : undefined}>
            {p.publicLifeDisplay}
          </dd>
        </div>
        <div className="fact-row">
          <dt>Address / social</dt>
          <dd className="unknown">
            {p.privacyOn ? "Hidden — living owner privacy ON" : UNKNOWN}
          </dd>
        </div>
      </dl>

      <section className="section">
        <h2>Family links</h2>
        <div className="grid-2">
          {rel.parents.length > 0 ? (
            <div className="card">
              <h3>Parents</h3>
              <ul className="rel-list">
                {rel.parents.map((x) => (
                  <li key={x.id}>
                    <Link href={`/app/people/${x.id}`}>{x.fullName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rel.spouses.length > 0 ? (
            <div className="card">
              <h3>Spouse</h3>
              <ul className="rel-list">
                {rel.spouses.map((x) => (
                  <li key={x.id}>
                    <Link href={`/app/people/${x.id}`}>{x.fullName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rel.fiances.length > 0 ? (
            <div className="card">
              <h3>Engaged to</h3>
              <ul className="rel-list">
                {rel.fiances.map((x) => (
                  <li key={x.id}>
                    <Link href={`/app/people/${x.id}`}>{x.fullName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rel.children.length > 0 ? (
            <div className="card">
              <h3>Children</h3>
              <ul className="rel-list">
                {rel.children.map((x) => (
                  <li key={x.id}>
                    <Link href={`/app/people/${x.id}`}>{x.fullName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rel.siblings.length > 0 ? (
            <div className="card">
              <h3>Siblings</h3>
              <ul className="rel-list">
                {rel.siblings.map((x) => (
                  <li key={x.id}>
                    <Link href={`/app/people/${x.id}`}>{x.fullName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rel.parents.length +
            rel.spouses.length +
            rel.fiances.length +
            rel.children.length +
            rel.siblings.length ===
          0 ? (
            <p className="meta">No approved relationships on file yet.</p>
          ) : null}
        </div>
      </section>

      {p.privacyOn ? (
        <div className="notice notice-privacy">
          <strong>Living profile:</strong> Stewards cannot publish address,
          social links, or new photos without this person’s approval.
        </div>
      ) : null}
      {p.honor ? (
        <div className="notice" style={{ background: "var(--rl-gold-wash)" }}>
          <strong>Honor (gold mark only):</strong> {p.honor.title}.{" "}
          {p.honor.summary} Source: {p.honor.sourceLabel}.
        </div>
      ) : null}

      <div className="btn-row">
        <Link className="btn btn-secondary" href="/app/tree">
          Back to tree
        </Link>
        <Link className="btn btn-ghost" href="/app/people">
          Directory
        </Link>
        <Link className="btn btn-ghost" href="/share/couple">
          Couple share view
        </Link>
      </div>
    </>
  );
}
