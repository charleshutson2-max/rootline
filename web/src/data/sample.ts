/**
 * ROOTLINE official seed — Hutson–Norwood core supplied by Founding Steward.
 * Do not invent biography beyond these facts. Unknown → "Not yet known".
 * Legacy SAMPLE archive people are kept only under sampleArchive (UI hides by default).
 */

export type LineTag = "norwood" | "hutson" | "both" | "allied_other";

export type HonorCategory = "military" | "civic" | "church" | "educators" | "firsts";

export type LivingStatus = "living" | "deceased" | "unknown";

export interface HonorBadge {
  category: HonorCategory;
  title: string;
  summary: string;
  sourceLabel: string;
}

export interface Person {
  id: string;
  preferredName: string;
  fullName: string;
  initials: string;
  line: LineTag;
  livingStatus: LivingStatus;
  /** Display years or "Living". Never invent dates. */
  yearsDisplay: string;
  birthDisplay: string;
  deathDisplay: string;
  placeDisplay: string;
  migration?: string;
  occupationDisplay: string;
  militaryDisplay: string;
  publicLifeDisplay: string;
  honor?: HonorBadge;
  /** Living owner privacy — address/social hidden when true. */
  privacyOn: boolean;
  /** Real family people are false; fictional archive stubs are true. */
  isSample: boolean;
  /** Optional short role note for UI (e.g. Founding Steward). */
  roleNote?: string;
}

export interface Story {
  id: string;
  title: string;
  body: string;
  kind: "story" | "letter" | "recipe" | "memory";
  personId: string;
  line: LineTag;
  status: "approved" | "pending";
  isSample: boolean;
}

export const UNKNOWN = "Not yet known";

function livingPerson(
  partial: Omit<
    Person,
    | "livingStatus"
    | "yearsDisplay"
    | "deathDisplay"
    | "occupationDisplay"
    | "militaryDisplay"
    | "publicLifeDisplay"
    | "birthDisplay"
    | "placeDisplay"
    | "privacyOn"
    | "isSample"
  > &
    Partial<
      Pick<
        Person,
        | "birthDisplay"
        | "placeDisplay"
        | "occupationDisplay"
        | "militaryDisplay"
        | "publicLifeDisplay"
        | "privacyOn"
        | "isSample"
        | "roleNote"
        | "honor"
        | "migration"
      >
    >
): Person {
  return {
    birthDisplay: UNKNOWN,
    placeDisplay: UNKNOWN,
    occupationDisplay: UNKNOWN,
    militaryDisplay: UNKNOWN,
    publicLifeDisplay: UNKNOWN,
    privacyOn: true,
    isSample: false,
    livingStatus: "living",
    yearsDisplay: "Living",
    deathDisplay: "—",
    ...partial,
  };
}

function deceasedPerson(
  partial: Omit<
    Person,
    | "livingStatus"
    | "occupationDisplay"
    | "militaryDisplay"
    | "publicLifeDisplay"
    | "birthDisplay"
    | "placeDisplay"
    | "privacyOn"
    | "isSample"
  > &
    Partial<
      Pick<
        Person,
        | "birthDisplay"
        | "placeDisplay"
        | "occupationDisplay"
        | "militaryDisplay"
        | "publicLifeDisplay"
        | "privacyOn"
        | "isSample"
        | "roleNote"
        | "honor"
        | "migration"
        | "yearsDisplay"
      >
    >
): Person {
  const { yearsDisplay: yearsOverride, ...rest } = partial;
  return {
    birthDisplay: UNKNOWN,
    placeDisplay: UNKNOWN,
    occupationDisplay: UNKNOWN,
    militaryDisplay: UNKNOWN,
    publicLifeDisplay: UNKNOWN,
    privacyOn: false,
    isSample: false,
    livingStatus: "deceased",
    ...rest,
    yearsDisplay: yearsOverride ?? partial.deathDisplay,
  };
}

/** Official Hutson–Norwood core (Founding Steward facts). */
export const people: Record<string, Person> = {
  "carter-ii": livingPerson({
    id: "carter-ii",
    preferredName: "Carter II",
    fullName: "Carter McGrew Norwood II",
    initials: "CN",
    line: "norwood",
    roleNote: "Widowed · living",
  }),
  "carol-anne": deceasedPerson({
    id: "carol-anne",
    preferredName: "Carol Anne",
    fullName: "Carol Anne Norwood",
    initials: "CA",
    line: "norwood",
    deathDisplay: "May 16, 2024",
    yearsDisplay: "– May 16, 2024",
    roleNote: "Late wife of Carter McGrew Norwood II",
  }),
  "carter-iii": livingPerson({
    id: "carter-iii",
    preferredName: "Carter III",
    fullName: "Carter McGrew Norwood III",
    initials: "C3",
    line: "norwood",
  }),
  carla: livingPerson({
    id: "carla",
    preferredName: "Carla",
    fullName: "Carla Martine Norwood",
    initials: "CM",
    line: "norwood",
  }),
  sondra: livingPerson({
    id: "sondra",
    preferredName: "Sondra",
    fullName: "Sondra Yvonne Norwood",
    initials: "SN",
    line: "norwood",
  }),
  haven: livingPerson({
    id: "haven",
    preferredName: "Haven",
    fullName: "Haven Nicole Norwood",
    initials: "HN",
    line: "norwood",
    roleNote: "Spouse of Founding Steward",
  }),
  sommer: livingPerson({
    id: "sommer",
    preferredName: "Sommer",
    fullName: "Sommer Michelle Norwood",
    initials: "SM",
    line: "norwood",
    roleNote: "Engaged to Derek Moreno",
  }),
  charlie: livingPerson({
    id: "charlie",
    preferredName: "Charlie",
    fullName: "Charles Sepe Tiaraju Hutson",
    initials: "CH",
    line: "hutson",
    placeDisplay: "Houston, Texas",
    roleNote: "Founding Steward · legally married to Haven Nicole Norwood",
  }),
  derek: livingPerson({
    id: "derek",
    preferredName: "Derek",
    fullName: "Derek Moreno",
    initials: "DM",
    line: "allied_other",
    roleNote: "Engaged to Sommer Michelle Norwood",
  }),
  brenda: deceasedPerson({
    id: "brenda",
    preferredName: "Brenda",
    fullName: "Brenda Parks",
    initials: "BP",
    line: "allied_other",
    deathDisplay: UNKNOWN,
    yearsDisplay: "Deceased · DOD Not yet known",
    roleNote: "Mother of Sondra Yvonne Norwood",
  }),
};

/** Official tree people only (excludes SAMPLE archive). */
export const peopleList: Person[] = Object.values(people).filter((p) => !p.isSample);

export function getPerson(id: string): Person | undefined {
  return people[id] ?? sampleArchivePeople[id];
}

/** Fictional SAMPLE archive — not shown in official tree UI by default. */
export const sampleArchivePeople: Record<string, Person> = {
  eleanor: {
    id: "eleanor",
    preferredName: "Eleanor",
    fullName: "Eleanor Mae Norwood",
    initials: "EN",
    line: "norwood",
    livingStatus: "deceased",
    yearsDisplay: "1898–1974",
    birthDisplay: "1898",
    deathDisplay: "1974",
    placeDisplay: "San Marcos, Texas",
    occupationDisplay: UNKNOWN,
    militaryDisplay: UNKNOWN,
    publicLifeDisplay: "Church & civic leadership (SAMPLE honor)",
    honor: {
      category: "civic",
      title: "Church & civic",
      summary: "SAMPLE civic/church honor — not a verified biography.",
      sourceLabel: "SAMPLE source · church program citation stub",
    },
    privacyOn: false,
    isSample: true,
  },
  samuel: {
    id: "samuel",
    preferredName: "Samuel",
    fullName: 'Samuel "Sam" Hutson',
    initials: "SH",
    line: "hutson",
    livingStatus: "deceased",
    yearsDisplay: "1921–1998",
    birthDisplay: "1921",
    deathDisplay: "1998",
    placeDisplay: "Houston, Texas",
    occupationDisplay: UNKNOWN,
    militaryDisplay: "U.S. Army · WWII · SAMPLE honor badge",
    publicLifeDisplay: UNKNOWN,
    honor: {
      category: "military",
      title: "U.S. Army · WWII",
      summary: "SAMPLE military honor — source required before gold mark publishes.",
      sourceLabel: "SAMPLE source · service record citation stub",
    },
    privacyOn: false,
    isSample: true,
  },
  margaret: {
    id: "margaret",
    preferredName: "Margaret",
    fullName: "Margaret Norwood Hutson",
    initials: "MH",
    line: "both",
    livingStatus: "deceased",
    yearsDisplay: "1924–2009",
    birthDisplay: "1924",
    deathDisplay: "2009",
    placeDisplay: "Texas → Los Angeles",
    migration: "Texas → elsewhere (Los Angeles)",
    occupationDisplay: UNKNOWN,
    militaryDisplay: UNKNOWN,
    publicLifeDisplay: UNKNOWN,
    privacyOn: false,
    isSample: true,
  },
};

/** No fictional stories on the official tree — members may propose later. */
export const stories: Story[] = [];

export const SAMPLE_INVITE_CODE = "SAMPLE-JOIN";

export const TREE_NAME = "The Hutson–Norwood Tree";
export const TAGLINE = "The Hutson–Norwood living archive.";

export type RelationshipKind = "parent" | "spouse" | "sibling" | "fiance";

export interface Relationship {
  id: string;
  kind: RelationshipKind;
  fromId: string;
  toId: string;
  status: "approved";
  isSample: boolean;
}

/**
 * Official pedigree (Founding Steward facts):
 * Carter II ═ Carol Anne → Carter III, Carla
 * Carter III ═ Sondra → Haven, Sommer
 * Brenda → Sondra
 * Haven ═ Charlie (Hutson)
 * Sommer ⟷ Derek (fiancé)
 */
export const relationships: Relationship[] = [
  {
    id: "rel-carter-ii-carol-spouse",
    kind: "spouse",
    fromId: "carter-ii",
    toId: "carol-anne",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carter-ii-carter-iii",
    kind: "parent",
    fromId: "carter-ii",
    toId: "carter-iii",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carol-carter-iii",
    kind: "parent",
    fromId: "carol-anne",
    toId: "carter-iii",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carter-ii-carla",
    kind: "parent",
    fromId: "carter-ii",
    toId: "carla",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carol-carla",
    kind: "parent",
    fromId: "carol-anne",
    toId: "carla",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carter-iii-sondra-spouse",
    kind: "spouse",
    fromId: "carter-iii",
    toId: "sondra",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carter-iii-haven",
    kind: "parent",
    fromId: "carter-iii",
    toId: "haven",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-sondra-haven",
    kind: "parent",
    fromId: "sondra",
    toId: "haven",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-carter-iii-sommer",
    kind: "parent",
    fromId: "carter-iii",
    toId: "sommer",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-sondra-sommer",
    kind: "parent",
    fromId: "sondra",
    toId: "sommer",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-brenda-sondra",
    kind: "parent",
    fromId: "brenda",
    toId: "sondra",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-haven-charlie-spouse",
    kind: "spouse",
    fromId: "haven",
    toId: "charlie",
    status: "approved",
    isSample: false,
  },
  {
    id: "rel-sommer-derek-fiance",
    kind: "fiance",
    fromId: "sommer",
    toId: "derek",
    status: "approved",
    isSample: false,
  },
];

export function initialsFromName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function cloneSeedPeople(): Record<string, Person> {
  return structuredClone(people);
}

export function cloneSeedRelationships(): Relationship[] {
  return structuredClone(relationships);
}
