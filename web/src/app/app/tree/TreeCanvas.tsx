"use client";

import Link from "next/link";
import { useState } from "react";
import type { LineTag, Person } from "@/data/sample";
import { useTreeStore } from "@/lib/treeStore";

type Filter = "all" | Exclude<LineTag, "allied_other">;

function show(line: LineTag, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "both") return line === "both";
  return line === filter || line === "both";
}

function Node({
  person,
  cx,
  cy,
  r = 36,
}: {
  person: Person;
  cx: number;
  cy: number;
  r?: number;
}) {
  const stroke =
    person.line === "norwood"
      ? "#3d2a5c"
      : person.line === "hutson"
        ? "#0e6e68"
        : person.line === "both"
          ? "url(#bothRing)"
          : "#8a8496";
  const label =
    person.preferredName.length > 11
      ? `${person.preferredName.slice(0, 10)}…`
      : person.preferredName;
  let meta = "Living";
  if (person.livingStatus !== "living") {
    meta =
      person.deathDisplay && person.deathDisplay !== "Not yet known"
        ? person.deathDisplay.replace("May 16, 2024", "d. 2024")
        : "Deceased";
  } else if (person.privacyOn) {
    meta = "Privacy ON";
  }
  return (
    <Link href={`/app/people/${person.id}`}>
      <g className="tree-node">
        <circle cx={cx} cy={cy} r={r} fill="#fffbf7" stroke={stroke} strokeWidth="3" />
        <text className="node-label" x={cx} y={cy - 4} textAnchor="middle">
          {label}
        </text>
        <text className="node-meta" x={cx} y={cy + 11} textAnchor="middle">
          {meta}
        </text>
      </g>
    </Link>
  );
}

export function TreeCanvas() {
  const tree = useTreeStore();
  const [filter, setFilter] = useState<Filter>("all");
  const p = tree.people;

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All lines" },
    { id: "norwood", label: "Norwood" },
    { id: "hutson", label: "Hutson" },
    { id: "both", label: "Both" },
  ];

  function ok(id: string): Person | undefined {
    const person = p[id];
    if (!person || !show(person.line, filter)) return undefined;
    return person;
  }

  const ii = ok("carter-ii");
  const carol = ok("carol-anne");
  const iii = ok("carter-iii");
  const carla = ok("carla");
  const sondra = ok("sondra");
  const brenda = ok("brenda");
  const haven = ok("haven");
  const charlie = ok("charlie");
  const sommer = ok("sommer");
  const derek = ok("derek");

  return (
    <>
      <div className="tree-toolbar">
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
        <span className="meta" style={{ marginLeft: "auto" }}>
          Official core · equal billing
        </span>
      </div>
      <div className="tree-canvas" role="img" aria-label="Hutson–Norwood family tree">
        <svg className="tree-svg" viewBox="0 0 920 640" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bothRing" x1="0" x2="1">
              <stop offset="50%" stopColor="#3d2a5c" />
              <stop offset="50%" stopColor="#0e6e68" />
            </linearGradient>
          </defs>

          {/* Gen1 couple bar II ═ Carol */}
          {(ii || carol) && (
            <line x1="360" y1="90" x2="520" y2="90" stroke="#c9b6e4" strokeWidth="3" />
          )}
          {/* Drop to children */}
          <path
            d="M440 90 L440 140 L300 140 L300 180 M440 140 L580 140 L580 180"
            fill="none"
            stroke="#e4dcd0"
            strokeWidth="2"
          />
          {/* III ═ Sondra */}
          {(iii || sondra) && (
            <line x1="300" y1="220" x2="460" y2="220" stroke="#c9b6e4" strokeWidth="3" />
          )}
          {/* Brenda → Sondra */}
          {(brenda || sondra) && (
            <path
              d="M700 90 L700 180 L520 180 L520 220"
              fill="none"
              stroke="#e4dcd0"
              strokeWidth="2"
            />
          )}
          {/* III/Sondra → Haven & Sommer */}
          <path
            d="M380 220 L380 280 L240 280 L240 340 M380 280 L520 280 L520 340"
            fill="none"
            stroke="#e4dcd0"
            strokeWidth="2"
          />
          {/* Haven ═ Charlie */}
          {(haven || charlie) && (
            <line x1="520" y1="380" x2="700" y2="380" stroke="#7ec8c3" strokeWidth="3" />
          )}
          {/* Sommer ⟷ Derek (engaged, dashed) */}
          {(sommer || derek) && (
            <line
              x1="120"
              y1="380"
              x2="240"
              y2="380"
              stroke="#c9b6e4"
              strokeWidth="2.5"
              strokeDasharray="7 5"
            />
          )}

          {ii ? <Node person={ii} cx={360} cy={90} /> : null}
          {carol ? <Node person={carol} cx={520} cy={90} /> : null}
          {brenda ? <Node person={brenda} cx={700} cy={90} /> : null}

          {iii ? <Node person={iii} cx={300} cy={220} r={38} /> : null}
          {sondra ? <Node person={sondra} cx={460} cy={220} r={38} /> : null}
          {carla ? <Node person={carla} cx={620} cy={220} /> : null}

          {derek ? <Node person={derek} cx={120} cy={380} /> : null}
          {sommer ? <Node person={sommer} cx={240} cy={380} /> : null}
          {haven ? <Node person={haven} cx={520} cy={380} r={40} /> : null}
          {charlie ? <Node person={charlie} cx={700} cy={380} r={40} /> : null}

          <text
            x="460"
            y="500"
            textAnchor="middle"
            fill="#8a8496"
            fontSize="13"
            fontFamily="Source Sans 3, sans-serif"
          >
            Solid bar = spouse · dashed = engaged · plum = Norwood · teal = Hutson
          </text>
          <text
            x="460"
            y="525"
            textAnchor="middle"
            fill="#8a8496"
            fontSize="12"
            fontFamily="Source Sans 3, sans-serif"
          >
            Official Hutson–Norwood core (Founding Steward)
          </text>
        </svg>
      </div>
    </>
  );
}
