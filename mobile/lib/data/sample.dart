// ROOTLINE official seed — Hutson–Norwood core (Founding Steward facts).
// Mirrors web/src/data/sample.ts. Do not invent biography.
// Unknown fields must surface as "Not yet known".

const String kUnknown = 'Not yet known';
const String kTreeName = 'The Hutson–Norwood Tree';
const String kTagline = 'The Hutson–Norwood living archive.';

enum LineTag { norwood, hutson, both, alliedOther }

enum HonorCategory { military, civic, church, educators, firsts }

enum LivingStatus { living, deceased, unknown }

class HonorBadge {
  const HonorBadge({
    required this.category,
    required this.title,
    required this.summary,
    required this.sourceLabel,
  });

  final HonorCategory category;
  final String title;
  final String summary;
  final String sourceLabel;
}

class Person {
  const Person({
    required this.id,
    required this.preferredName,
    required this.fullName,
    required this.initials,
    required this.line,
    required this.livingStatus,
    required this.yearsDisplay,
    required this.birthDisplay,
    required this.deathDisplay,
    required this.placeDisplay,
    this.migration,
    required this.occupationDisplay,
    required this.militaryDisplay,
    required this.publicLifeDisplay,
    this.honor,
    required this.privacyOn,
    this.roleNote,
    this.isSample = false,
  });

  final String id;
  final String preferredName;
  final String fullName;
  final String initials;
  final LineTag line;
  final LivingStatus livingStatus;
  final String yearsDisplay;
  final String birthDisplay;
  final String deathDisplay;
  final String placeDisplay;
  final String? migration;
  final String occupationDisplay;
  final String militaryDisplay;
  final String publicLifeDisplay;
  final HonorBadge? honor;
  final bool privacyOn;
  final String? roleNote;
  final bool isSample;
}

class Story {
  const Story({
    required this.id,
    required this.title,
    required this.body,
    required this.kind,
    required this.personId,
    required this.line,
    required this.status,
    this.isSample = false,
  });

  final String id;
  final String title;
  final String body;
  final String kind;
  final String personId;
  final LineTag line;
  final String status;
  final bool isSample;
}

class QueueItem {
  const QueueItem({
    required this.id,
    required this.title,
    required this.kind,
    required this.status,
    required this.summary,
  });

  final String id;
  final String title;
  final String kind;
  final String status;
  final String summary;
}

const Person carterIi = Person(
  id: 'carter-ii',
  preferredName: 'Carter II',
  fullName: 'Carter McGrew Norwood II',
  initials: 'CN',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
  roleNote: 'Widowed · living',
);

const Person carolAnne = Person(
  id: 'carol-anne',
  preferredName: 'Carol Anne',
  fullName: 'Carol Anne Norwood',
  initials: 'CA',
  line: LineTag.norwood,
  livingStatus: LivingStatus.deceased,
  yearsDisplay: '– May 16, 2024',
  birthDisplay: kUnknown,
  deathDisplay: 'May 16, 2024',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: false,
  roleNote: 'Late wife of Carter McGrew Norwood II',
);

const Person carterIii = Person(
  id: 'carter-iii',
  preferredName: 'Carter III',
  fullName: 'Carter McGrew Norwood III',
  initials: 'C3',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
);

const Person carla = Person(
  id: 'carla',
  preferredName: 'Carla',
  fullName: 'Carla Martine Norwood',
  initials: 'CM',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
);

const Person sondra = Person(
  id: 'sondra',
  preferredName: 'Sondra',
  fullName: 'Sondra Yvonne Norwood',
  initials: 'SN',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
);

const Person haven = Person(
  id: 'haven',
  preferredName: 'Haven',
  fullName: 'Haven Nicole Norwood',
  initials: 'HN',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
  roleNote: 'Spouse of Founding Steward',
);

const Person sommer = Person(
  id: 'sommer',
  preferredName: 'Sommer',
  fullName: 'Sommer Michelle Norwood',
  initials: 'SM',
  line: LineTag.norwood,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
  roleNote: 'Engaged to Derek Moreno',
);

const Person charlie = Person(
  id: 'charlie',
  preferredName: 'Charlie',
  fullName: 'Charles Sepe Tiaraju Hutson',
  initials: 'CH',
  line: LineTag.hutson,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: 'Houston, Texas',
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
  roleNote: 'Founding Steward · legally married to Haven Nicole Norwood',
);

const Person derek = Person(
  id: 'derek',
  preferredName: 'Derek',
  fullName: 'Derek Moreno',
  initials: 'DM',
  line: LineTag.alliedOther,
  livingStatus: LivingStatus.living,
  yearsDisplay: 'Living',
  birthDisplay: kUnknown,
  deathDisplay: '—',
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: true,
  roleNote: 'Engaged to Sommer Michelle Norwood',
);

const Person brenda = Person(
  id: 'brenda',
  preferredName: 'Brenda',
  fullName: 'Brenda Parks',
  initials: 'BP',
  line: LineTag.alliedOther,
  livingStatus: LivingStatus.deceased,
  yearsDisplay: 'Deceased · DOD Not yet known',
  birthDisplay: kUnknown,
  deathDisplay: kUnknown,
  placeDisplay: kUnknown,
  occupationDisplay: kUnknown,
  militaryDisplay: kUnknown,
  publicLifeDisplay: kUnknown,
  privacyOn: false,
  roleNote: 'Mother of Sondra Yvonne Norwood',
);

const List<Person> peopleList = [
  carterIi,
  carolAnne,
  carterIii,
  carla,
  sondra,
  haven,
  sommer,
  charlie,
  derek,
  brenda,
];

Person? getPerson(String id) {
  for (final p in peopleList) {
    if (p.id == id) return p;
  }
  return null;
}

const List<Story> stories = [];

const List<QueueItem> sampleQueue = [
  QueueItem(
    id: 'q-1',
    title: 'Propose photo · Haven (demo)',
    kind: 'photo',
    status: 'pending',
    summary: 'Demo claim awaiting Steward review — reason required.',
  ),
  QueueItem(
    id: 'q-2',
    title: 'Correction · place (demo)',
    kind: 'correction',
    status: 'pending',
    summary: 'Demo correction stub — no invented biography.',
  ),
  QueueItem(
    id: 'q-3',
    title: 'Access claim · Path B (demo)',
    kind: 'access_claim',
    status: 'pending',
    summary: 'Demo membership request in queue.',
  ),
];
