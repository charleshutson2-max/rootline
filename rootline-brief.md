# ROOTLINE — Product Brief (authoritative)

You are building ROOTLINE: a private, long-lived family archive for the Hutson–Norwood family, delivered as:
1) a public marketing website with iOS / Android download links and a web app,
2) a cross-platform member app (iOS, Android, and a first-class web app — the web app is not optional; it is the longevity path),
3) a Steward (admin) desk.

Do not invent real family biography. Use clearly labeled SAMPLE people until the Founding Steward supplies names. Never scrape or import living people’s data from the public internet into the official tree.

════════════════════════════════
1. PRODUCT
════════════════════════════════
Name: Rootline
Tree name inside the product: The Hutson–Norwood Tree
Tagline: The Hutson–Norwood living archive.
Positioning: personal family house with a public front door.
Anyone may download and create an account. Nobody sees living-family records until a Steward approves membership (invite code OR a relationship claim).

Equal billing: Norwood is not a footnote under Hutson. Both lines are first-class in navigation, color, filters, Honor Roll, and search.

The archive must still be usable after every current Steward is gone: exports, succession, a legal owner for accounts, and a web app that does not depend on app stores.

════════════════════════════════
2. BRAND
════════════════════════════════
Working domains until the family buys one: rootlinefamily.org / hutsonnorwood.org (do not hard-code a purchased domain).
Visual system:
- Parchment page #F6F1EA
- Ink text #16121F
- NORWOOD plum #3D2A5C (primary chrome, headers, primary buttons)
- NORWOOD wisteria #C9B6E4
- HUTSON teal #0E6E68 (secondary buttons, Hutson rings/chips)
- HUTSON sea glass #7EC8C3
- Honor gold #C6A15B (medals / Honor Roll only — do not use gold as general chrome)
Typography: elegant serif for names and headlines; clean humanist sans for UI.
Tone: warm, dignified, modern. Museum + product. Not dusty genealogy brown, not startup-playful, not cartoon trees.
Tree rings:
- Plum ring = Norwood
- Teal ring = Hutson
- Split plum/teal ring = both
- Gold mark = honor / military / notable only

Accessibility: large tap targets, large-type mode for elders, WCAG AA contrast, screen-reader labels, captions on audio.

════════════════════════════════
3. ROLES
════════════════════════════════
- Visitor: website only, public Honor Roll if enabled, request-access form.
- Account holder (unapproved): can request access or enter invite code. Cannot see living members.
- Member: view approved tree, propose people/photos/stories/corrections, record memories, use Ask Rootline, control their own living profile.
- Living profile owner: veto / edit anything about themselves. Stewards cannot publish a living adult’s social links, address, or new photos without that person’s (or a parent’s, if minor) approval.
- Reviewer: approve media and stories, not membership or roles.
- Steward: approve members, content, merges, honor badges, exports. Steward Council of 3–7 when named.
- Founding Steward: Charlie Hutson (Houston). Spouse is Norwood-line; treat her as co-voice on brand and Norwood representation. She should be offerable as a Steward.
- Profile steward: designated next-of-kin for a deceased person.
Rules:
- Minimum two living Stewards once launched past founding.
- Every approval leaves an audit reason.
- Version history on every person and story; rollbacks allowed.
- No god-mode delete of the archive without a typed confirmation and a second Steward.

════════════════════════════════
4. JOINING
════════════════════════════════
Path A: invite code from a Member or Steward.
Path B: claim — full name, asserted relationship, optional voucher relative, optional documents/photos.
Steward reviews: Approve / Request changes / Decline with reason.
Until approved: teaser only (mission, optional public deceased Honor Roll, request form).
Minors: parent/guardian must approve the account and the child’s visibility.

════════════════════════════════
5. INFORMATION ARCHITECTURE
════════════════════════════════
App tabs: Tree | People | Stories | Ask | Me
Steward extra: Queue | Members | Merges | Exports | Roles

Person record (core object):
- Names (preferred, birth, nicknames)
- Sex/gender fields optional and private
- Dates: birth, death, marriage; allow “about / before / after / between”; never invent a date to look complete
- Calculated age
- Photos: portrait + gallery
- Relationships: parents, partners, children, siblings; support blended families; optional chosen-family only if a Steward enables the rule
- Occupation and education over time
- Places: born / lived / buried (feeds map)
- Military: branch, years, unit if known, honors, sources
- Public life: church, civic, activism, education, “firsts”
- Social links: living people opt-in only
- Stories, letters, recipes, voice notes
- Sources required for honor badges and contested facts
- Privacy flags
- Line tags: Hutson, Norwood, both, other allied

Unknown is a valid state. UI must show “Not yet known” instead of fake completeness.

Honor Roll filters: All, Military, Civic, Church, Educators, Firsts, Norwood, Hutson.

Views: Tree (zoom canvas), Directory, Timeline, Places map, How-are-we-related calculator.

════════════════════════════════
6. CONTENT WORKFLOW
════════════════════════════════
Members PROPOSE. Stewards APPROVE.
Pending items: new person, relationship link, photo, story, voice memory, correction, social link, honor badge, merge.
Living-adult fields notify the owner.
Deceased: Profile steward + Steward.
Comments are “memories,” not a social feed. No likes-as-popularity.
Research sandbox: theories stay off the official tree until sourced.

════════════════════════════════
7. AI — “ASK ROOTLINE”
════════════════════════════════
RAG over APPROVED records only (profiles, sourced stories, approved transcripts, approved documents).
Hard rules:
- Never invent ancestors, dates, ranks, or causes.
- If the archive does not know, say so and offer “File a research request.”
- Cite the person record or document used.
- Explain kinship paths in plain language.
- Voice → text for elders; mark transcript “needs Steward attach.”
- Optional later: on-device face grouping, OCR of obituaries/programs. V1 can stub these.
- No training on private family data for any external public model beyond the family’s contracted provider.
- Safety: no doxxing living people in answers; respect privacy flags.

Useful queries to support:
- “How am I related to X?”
- “Who served in the military?”
- “Norwood people who lived in Texas”
- “Read me the story about San Marcos”
- “Photos from Los Angeles in the 1930s”

════════════════════════════════
8. LONGEVITY
════════════════════════════════
- GEDCOM import/export in v1 or immediately after v1 (do not skip the format).
- Scheduled export: GEDCOM + media bundle + printable PDF “book of the family.”
- Multi-location backup reminder for Stewards.
- Web app is full-featured, not a brochure.
- Domain, Apple, Google, hosting, and DNS credentials stored in a family trust / LLC / nonprofit — document this in Steward settings as a checklist, even if legal entity is created offline.
- Successor Stewards named in settings.
- Future flag: Public History Mode for deceased generations only. Default OFF.

════════════════════════════════
9. WEBSITE
════════════════════════════════
Pages: Home, The Archive (what it is), Membership / Request access, Honor Roll (optional public, Steward toggle), Stewards / contact, Privacy, Download (App Store, Play, Open in browser).
Home headline options: “Two families. One living archive.”
Color key on the page: plum = Norwood, teal = Hutson.
No living people’s private photos or addresses on the public site.

════════════════════════════════
10. SCREENS TO DESIGN AND BUILD (minimum)
════════════════════════════════
Member: onboarding, request access, invite code, tree canvas, person profile, people directory, honor roll, stories list, record-a-memory, timeline, places map, Ask Rootline chat, my privacy, notifications (birthday/remembrance opt-in).
Steward: approval queue, member claims, merge tool, export, role manager, public-site toggles.
Website: hero + download + request access.
Empty states should teach (“No Norwood photos yet — record a memory”).

════════════════════════════════
11. NON-GOALS FOR V1
════════════════════════════════
- DNA
- Open social network / strangers building other families (single tree: Hutson–Norwood)
- Public phone book of living people
- Auto-published AI biographies
- Crypto / blockchain

Nice-to-have after v1: reunion TV/big-screen mode, cookbook collection, print wall chart, Spanish UI if the family wants it, sandbox research mode polish.

════════════════════════════════
12. TECH GUIDANCE (choose boring and durable)
════════════════════════════════
Prefer: TypeScript; Next.js web + PWA; React Native or Flutter for stores; Postgres; object storage for media; background jobs for transcription/OCR; row-level security; 2FA required for Stewards; encryption at rest; signed URLs for media; audit log table.
Auth: email magic link + password + 2FA for Stewards. Passkeys welcome.
Do not lock data in a vendor-only graph format. Relational model + GEDCOM export.
Photo pipeline: originals kept; display derivatives generated.

════════════════════════════════
13. DATA MODEL (minimum tables)
════════════════════════════════
users, memberships, roles, invites, access_claims,
people, person_names, person_facts, relationships,
places, events, sources, citations,
media, media_links,
stories, story_links, voice_memories,
honor_badges,
proposals, approvals, audit_events,
privacy_settings, steward_succession,
exports.
Support uncertain dates and multiple citations per fact.

════════════════════════════════
14. SAMPLE SEED (FICTIONAL UNTIL CONFIRMED)
════════════════════════════════
Label every sample “SAMPLE.”
Include a few deceased historical-style people on both lines, one military honor, one civic/church honor, one migration Texas → elsewhere, and one living Member slot for Charlie Hutson with privacy ON. Do not claim WikiTree or census people are this family’s people unless Charlie confirms.

════════════════════════════════
15. WHAT TO DELIVER
════════════════════════════════
In order:
A. Information architecture + user journeys (Visitor → Claim → Member; Member → Propose; Steward → Approve; Elder → Record memory; Child → Ask Rootline).
B. Visual design system (plum/teal tokens, components).
C. Clickable or high-fidelity screen set matching the screens in section 10.
D. Schema + API outline.
E. Approval-state machine.
F. Ask Rootline retrieval rules and refusal examples.
G. Website sitemap and copy draft.
H. Implementation plan in slices (week-by-week), starting with auth, claims, person+relationship graph, tree view, approval queue, then media, then AI.
I. Steward runbook: how to approve, export, name a successor, recover accounts.
J. Risks: privacy leaks, duplicate people, invented AI facts, single-admin bus factor.

If you generate UI, use the plum/teal system. If you write copy, keep dignity. If you are unsure of a family fact, ask — do not fill the gap.

Begin with A and B, then C. Ask Charlie only when a decision is truly blocking.
