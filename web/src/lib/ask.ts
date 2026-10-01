/**
 * Ask Rootline — deterministic retrieval stub (no external LLM).
 * Answers ONLY from approved archive records + approved proposals.
 * Never invents facts.
 */

import {
  UNKNOWN,
  getPerson,
  people,
  peopleList,
  relationships,
  stories,
  type Person,
  type RelationshipKind,
  type Relationship,
  type Story,
} from "@/data/sample";
import type { Proposal } from "@/lib/models";

export interface AskCitation {
  kind: "person" | "story" | "honor" | "relationship" | "proposal";
  id: string;
  label: string;
  href?: string;
}

export interface AskAnswer {
  answer: string;
  citations: AskCitation[];
  offerResearchRequest: boolean;
  researchQuery?: string;
  refused: boolean;
}

export const SUGGESTED_QUERIES: string[] = [
  "How am I related to Carter II?",
  "Who is Haven married to?",
  "Who are Sommer’s parents?",
  "Tell me about Carol Anne",
  "Who is Brenda Parks?",
];

const ASKER_ID = "charlie";

function personLabel(p: Person): string {
  return p.isSample ? `SAMPLE ${p.fullName}` : p.fullName;
}

function citePerson(p: Person): AskCitation {
  return {
    kind: "person",
    id: p.id,
    label: `Person · ${personLabel(p)}`,
    href: `/app/people/${p.id}`,
  };
}

function citeStory(s: Story): AskCitation {
  return {
    kind: "story",
    id: s.id,
    label: `Story · ${s.title}`,
    href: "/app/stories",
  };
}


function citeRel(r: Relationship): AskCitation {
  const a = getPerson(r.fromId);
  const b = getPerson(r.toId);
  return {
    kind: "relationship",
    id: r.id,
    label: `Relationship · ${r.kind} · ${a?.preferredName ?? r.fromId} ↔ ${b?.preferredName ?? r.toId}`,
  };
}

function approvedStories(proposals: Proposal[]): Story[] {
  const seed = stories.filter((s) => s.status === "approved");
  const fromProps: Story[] = proposals
    .filter(
      (p) =>
        p.status === "approved" &&
        !p.researchSandbox &&
        (p.kind === "story" || p.kind === "voice_memory") &&
        (p.kind !== "voice_memory" || p.ragEligible) &&
        p.body &&
        p.title
    )
    .map((p) => ({
      id: p.id,
      title: p.title,
      body: p.body ?? "",
      kind: p.kind === "voice_memory" ? ("memory" as const) : ("story" as const),
      personId: p.personId ?? "charlie",
      line: "both" as const,
      status: "approved" as const,
      isSample: false,
    }));
  const seedIds = new Set(seed.map((s) => s.id));
  return [...seed, ...fromProps.filter((s) => !seedIds.has(s.id))];
}

function includesName(q: string, needle: string): boolean {
  const n = needle.toLowerCase().trim();
  if (n.length < 2) return false;
  const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, "i");
  return re.test(q);
}

const EXTRA_NEEDLES: Record<string, string[]> = {
  "carter-ii": [
    "carter ii",
    "carter mcgrew norwood ii",
    "carter norwood ii",
    "norwood ii",
  ],
  "carol-anne": [
    "carol anne",
    "carol anne norwood",
    "carol",
  ],
  "carter-iii": [
    "carter iii",
    "carter mcgrew norwood iii",
    "carter norwood iii",
    "norwood iii",
  ],
  carla: ["carla martine", "carla martine norwood", "carla norwood", "carla"],
  sondra: ["sondra yvonne", "sondra yvonne norwood", "sondra norwood", "sondra"],
  haven: ["haven nicole", "haven nicole norwood", "haven norwood", "haven"],
  sommer: [
    "sommer michelle",
    "sommer michelle norwood",
    "sommer norwood",
    "sommer",
  ],
  charlie: [
    "charles sepe tiaraju hutson",
    "charles hutson",
    "charlie hutson",
    "charlie",
  ],
  derek: ["derek moreno", "derek"],
  brenda: ["brenda parks", "brenda"],
};

function matchPerson(query: string): Person | undefined {
  const q = query.toLowerCase();
  const ranked = [...peopleList].sort(
    (a, b) => b.fullName.length - a.fullName.length
  );
  for (const p of ranked) {
    const needles = [
      p.fullName.toLowerCase(),
      p.preferredName.toLowerCase(),
      p.fullName.toLowerCase().replace(/["“”]/g, ""),
      ...(EXTRA_NEEDLES[p.id] ?? []),
    ];
    for (const n of needles) {
      if (includesName(q, n)) return p;
    }
  }
  return undefined;
}

type Edge = {
  otherId: string;
  kind: RelationshipKind;
  via: Relationship;
  direction: "up" | "down" | "side";
};

function edgesFrom(personId: string): Edge[] {
  const out: Edge[] = [];
  for (const r of relationships) {
    if (r.status !== "approved") continue;
    if (r.kind === "parent") {
      if (r.fromId === personId) {
        out.push({ otherId: r.toId, kind: "parent", via: r, direction: "down" });
      }
      if (r.toId === personId) {
        out.push({ otherId: r.fromId, kind: "parent", via: r, direction: "up" });
      }
    } else if (r.kind === "spouse" || r.kind === "fiance" || r.kind === "sibling") {
      if (r.fromId === personId) {
        out.push({ otherId: r.toId, kind: r.kind, via: r, direction: "side" });
      }
      if (r.toId === personId) {
        out.push({ otherId: r.fromId, kind: r.kind, via: r, direction: "side" });
      }
    }
  }
  return out;
}

interface PathStep {
  fromId: string;
  toId: string;
  direction: "up" | "down" | "side";
  kind: RelationshipKind;
  via: Relationship;
}

function findPath(fromId: string, toId: string): PathStep[] | null {
  if (fromId === toId) return [];
  const queue: { id: string; path: PathStep[] }[] = [{ id: fromId, path: [] }];
  const seen = new Set<string>([fromId]);
  while (queue.length) {
    const cur = queue.shift()!;
    for (const e of edgesFrom(cur.id)) {
      if (seen.has(e.otherId)) continue;
      const step: PathStep = {
        fromId: cur.id,
        toId: e.otherId,
        direction: e.direction,
        kind: e.kind,
        via: e.via,
      };
      const nextPath = [...cur.path, step];
      if (e.otherId === toId) return nextPath;
      seen.add(e.otherId);
      queue.push({ id: e.otherId, path: nextPath });
    }
  }
  return null;
}

function plainKinship(
  targetId: string
): { text: string; citations: AskCitation[] } | null {
  const target = getPerson(targetId);
  if (!target) return null;
  if (targetId === ASKER_ID) {
    return {
      text: `You are ${target.fullName} — Founding Steward of this archive.`,
      citations: [citePerson(target)],
    };
  }
  const path = findPath(ASKER_ID, targetId);
  if (!path) return null;

  const citations: AskCitation[] = [
    citePerson(people.charlie),
    citePerson(target),
  ];
  for (const step of path) citations.push(citeRel(step.via));

  if (targetId === "haven") {
    return {
      text: `${target.fullName} is your spouse (approved legal marriage on the tree).`,
      citations,
    };
  }
  if (targetId === "sommer") {
    return {
      text: `${target.fullName} is your sister-in-law — Haven’s sister (approved parent links to Carter III and Sondra).`,
      citations,
    };
  }
  if (targetId === "carter-iii") {
    return {
      text: `${target.fullName} is your father-in-law (Haven’s father).`,
      citations,
    };
  }
  if (targetId === "sondra") {
    return {
      text: `${target.fullName} is your mother-in-law (Haven’s mother).`,
      citations,
    };
  }
  if (targetId === "carter-ii") {
    return {
      text: `${target.fullName} is Haven’s paternal grandfather — your spouse’s grandfather.`,
      citations,
    };
  }
  if (targetId === "carol-anne") {
    return {
      text: `${target.fullName} is Haven’s paternal grandmother (deceased May 16, 2024) — your spouse’s grandmother.`,
      citations,
    };
  }
  if (targetId === "carla") {
    return {
      text: `${target.fullName} is Haven’s aunt (sister of Carter III).`,
      citations,
    };
  }
  if (targetId === "derek") {
    return {
      text: `${target.fullName} is engaged to Sommer Michelle Norwood (your sister-in-law).`,
      citations,
    };
  }
  if (targetId === "brenda") {
    return {
      text: `${target.fullName} is Sondra’s mother (deceased; date of death Not yet known) — Haven’s maternal grandmother.`,
      citations,
    };
  }

  const parts: string[] = [];
  for (const step of path) {
    const other = getPerson(step.toId);
    const name = other ? other.fullName : step.toId;
    if (step.direction === "up" && step.kind === "parent") parts.push(`${name} (parent)`);
    else if (step.direction === "down" && step.kind === "parent")
      parts.push(`${name} (child)`);
    else if (step.kind === "spouse") parts.push(`${name} (spouse)`);
    else if (step.kind === "fiance") parts.push(`${name} (fiancé)`);
    else parts.push(`${name} (${step.kind})`);
  }
  return {
    text: `On the approved tree, the path from you to ${target.fullName} is: you → ${parts.join(" → ")}.`,
    citations,
  };
}

function answerKinship(query: string): AskAnswer | null {
  const q = query.toLowerCase();
  const kinshipCue =
    q.includes("how am i related") ||
    q.includes("how are we related") ||
    q.includes("related to") ||
    q.includes("my relation") ||
    q.includes("kinship") ||
    q.includes("married to") ||
    (q.includes("who is") && (q.includes("wife") || q.includes("husband") || q.includes("spouse"))) ||
    (q.includes("parents") || q.includes("parent of") || q.includes("'s parents") || q.includes("’s parents"));
  if (!kinshipCue && !(q.includes("who are") && q.includes("parent"))) {
    // allow "who is X married to"
    if (!(q.includes("married") || q.includes("engaged"))) return null;
  }

  // Direct spouse / fiancé questions
  if (q.includes("married to") || (q.includes("who is") && q.includes("married"))) {
    const person = matchPerson(query);
    if (person) {
      const spouseEdge = relationships.find(
        (r) =>
          r.kind === "spouse" &&
          r.status === "approved" &&
          (r.fromId === person.id || r.toId === person.id)
      );
      if (spouseEdge) {
        const otherId =
          spouseEdge.fromId === person.id ? spouseEdge.toId : spouseEdge.fromId;
        const other = getPerson(otherId);
        if (other) {
          return {
            answer: `${person.fullName} is legally married to ${other.fullName}.`,
            citations: [citePerson(person), citePerson(other), citeRel(spouseEdge)],
            offerResearchRequest: false,
            refused: false,
          };
        }
      }
      return {
        answer: `No approved spouse link is on file for ${person.fullName} yet.`,
        citations: [citePerson(person)],
        offerResearchRequest: true,
        researchQuery: `Spouse of ${person.fullName}`,
        refused: true,
      };
    }
  }

  if (q.includes("parent")) {
    const person = matchPerson(query);
    if (person) {
      const parentRels = relationships.filter(
        (r) => r.kind === "parent" && r.toId === person.id && r.status === "approved"
      );
      const parents = parentRels
        .map((r) => getPerson(r.fromId))
        .filter((x): x is Person => Boolean(x));
      if (parents.length) {
        return {
          answer: `Approved parents of ${person.fullName}: ${parents.map((x) => x.fullName).join("; ")}.`,
          citations: [
            citePerson(person),
            ...parents.map(citePerson),
            ...parentRels.map(citeRel),
          ],
          offerResearchRequest: false,
          refused: false,
        };
      }
    }
  }

  if (
    !(
      q.includes("how am i related") ||
      q.includes("how are we related") ||
      q.includes("related to") ||
      q.includes("kinship")
    )
  ) {
    return null;
  }

  const person = matchPerson(query);
  if (!person) {
    return {
      answer:
        "I don’t find a matching person in the approved Hutson–Norwood archive for that kinship question yet. I won’t invent a relative. You can File a research request, or propose a new person with a source.",
      citations: [],
      offerResearchRequest: true,
      researchQuery: query,
      refused: true,
    };
  }
  const kin = plainKinship(person.id);
  if (!kin) {
    return {
      answer: `I have ${person.fullName} in the archive, but no approved relationship path from you (Charlie) is on file yet. I won’t invent one.`,
      citations: [citePerson(person), citePerson(people.charlie)],
      offerResearchRequest: true,
      researchQuery: `Relationship path: Charlie ↔ ${person.fullName}`,
      refused: true,
    };
  }
  return {
    answer: kin.text,
    citations: kin.citations,
    offerResearchRequest: false,
    refused: false,
  };
}

function answerAboutPerson(query: string): AskAnswer | null {
  const q = query.toLowerCase();
  if (!(q.includes("tell me about") || q.startsWith("who is ") || q.includes("who was "))) {
    return null;
  }
  const person = matchPerson(query);
  if (!person) return null;
  const bits = [
    `${person.fullName} is in the approved archive (${person.line} line · ${person.yearsDisplay}).`,
  ];
  if (person.roleNote) bits.push(person.roleNote + ".");
  if (person.placeDisplay !== UNKNOWN) {
    bits.push(`Place on file: ${person.placeDisplay}.`);
  }
  if (person.livingStatus === "deceased") {
    bits.push(
      `Death on file: ${person.deathDisplay === UNKNOWN ? "Not yet known" : person.deathDisplay}.`
    );
  }
  if (person.privacyOn) {
    bits.push("Privacy is ON for this living profile — private contact fields stay hidden.");
  }
  return {
    answer: bits.join(" "),
    citations: [citePerson(person)],
    offerResearchRequest: false,
    refused: false,
  };
}

function refuseLivingAddress(query: string): AskAnswer | null {
  const q = query.toLowerCase();
  const addressCue =
    q.includes("address") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("where does") ||
    q.includes("live at") ||
    q.includes("street");
  if (!addressCue) return null;

  const person = matchPerson(query);
  const target = person ?? (q.includes("charlie") ? people.charlie : undefined);
  if (!target) return null;

  if (target.livingStatus === "living") {
    return {
      answer: `I can’t share a living person’s private address, phone, or email through Ask Rootline. ${target.fullName}’s privacy settings keep that field private.`,
      citations: [citePerson(target)],
      offerResearchRequest: false,
      refused: true,
    };
  }
  return null;
}

function refuseExactDate(query: string): AskAnswer | null {
  const q = query.toLowerCase();
  const birthCue = q.includes("born") || q.includes("birth");
  const wantsExact =
    q.includes("exactly") ||
    q.includes("exact date") ||
    q.includes("what day") ||
    (q.includes("when") && birthCue && q.includes("exactly"));
  if (!wantsExact && !(q.includes("exactly") && birthCue)) return null;
  if (!birthCue && !q.includes("when exactly")) return null;

  const person = matchPerson(query);
  if (!person) {
    return {
      answer:
        "I don’t find that person in the approved archive, so I can’t give a birth date. I won’t invent one.",
      citations: [],
      offerResearchRequest: true,
      researchQuery: query,
      refused: true,
    };
  }
  const birth = person.birthDisplay;
  if (birth === UNKNOWN || birth === "—" || !birth) {
    return {
      answer: `The archive does not have a birth date for ${person.fullName} — it is labeled **Not yet known**. I will not invent a day or month.`,
      citations: [citePerson(person)],
      offerResearchRequest: true,
      researchQuery: `Exact birth date for ${person.fullName}`,
      refused: true,
    };
  }
  return {
    answer: `The archive does not have an exact birth date for ${person.fullName}. What we have is labeled **${birth}**. I will not invent a day or month.`,
    citations: [citePerson(person)],
    offerResearchRequest: true,
    researchQuery: `Exact birth date for ${person.fullName}`,
    refused: true,
  };
}

function refuseEmptyArchive(query: string): AskAnswer | null {
  const q = query.toLowerCase();
  if (
    q.includes("alaska") ||
    q.includes("great-aunt") ||
    q.includes("great aunt") ||
    (q.includes("tell me about") && matchPerson(query) === undefined)
  ) {
    const person = matchPerson(query);
    if (person) return null;
    return {
      answer:
        "I don’t find anyone matching that description in the approved Hutson–Norwood archive yet. You can File a research request, or if you have a source, propose a new person for Steward review. I won’t invent an ancestor to fill the gap.",
      citations: [],
      offerResearchRequest: true,
      researchQuery: query,
      refused: true,
    };
  }
  return null;
}

export function askRootline(query: string, proposals: Proposal[] = []): AskAnswer {
  const text = query.trim();
  if (!text) {
    return {
      answer: "Ask a question about the approved Hutson–Norwood archive.",
      citations: [],
      offerResearchRequest: false,
      refused: false,
    };
  }

  const living = refuseLivingAddress(text);
  if (living) return living;

  const exact = refuseExactDate(text);
  if (exact) return exact;

  const empty = refuseEmptyArchive(text);
  if (empty) return empty;

  const kin = answerKinship(text);
  if (kin) return kin;

  const about = answerAboutPerson(text);
  if (about) return about;

  // Story lookup (only if approved stories exist)
  const corp = approvedStories(proposals);
  const q = text.toLowerCase();
  if (corp.length && (q.includes("story") || q.includes("read"))) {
    const story = corp.find(
      (s) =>
        q.includes(s.title.toLowerCase().slice(0, 12)) ||
        s.body.toLowerCase().split(" ").some((w) => w.length > 5 && q.includes(w))
    );
    if (story) {
      const person = getPerson(story.personId);
      const citations: AskCitation[] = [citeStory(story)];
      if (person) citations.push(citePerson(person));
      return {
        answer: `Here’s the approved story “${story.title}”${person ? ` (linked to ${person.fullName})` : ""}:\n\n${story.body}`,
        citations,
        offerResearchRequest: false,
        refused: false,
      };
    }
  }

  const person = matchPerson(text);
  if (person) {
    const bits = [
      `${person.fullName} is in the approved archive (${person.line} line · ${person.yearsDisplay}).`,
    ];
    if (person.roleNote) bits.push(person.roleNote + ".");
    if (person.placeDisplay !== UNKNOWN) {
      bits.push(`Place on file: ${person.placeDisplay}.`);
    }
    if (person.privacyOn) {
      bits.push("Privacy is ON for this living profile — private contact fields stay hidden.");
    }
    return {
      answer: bits.join(" "),
      citations: [citePerson(person)],
      offerResearchRequest: false,
      refused: false,
    };
  }

  return {
    answer:
      "The archive does not yet know enough to answer that from approved records. I will not invent facts. You can File a research request for Steward review.",
    citations: [],
    offerResearchRequest: true,
    researchQuery: text,
    refused: true,
  };
}
