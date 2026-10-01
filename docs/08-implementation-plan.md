# ROOTLINE — Implementation Plan (Week-by-Week Slices)

**Deliverable H.** Boring, durable stack. **Web app first-class** (Next.js + PWA). Store apps follow the same IA; native stack choice (React Native vs Flutter) is deferred and non-blocking for early slices.

**Assumptions:** See [`ASSUMPTIONS.md`](ASSUMPTIONS.md). Called out again where they affect sequencing.

**Order (brief):** auth → claims → person+relationship graph → tree view → approval queue → media → AI. **GEDCOM** soon after the graph — do not skip.

SAMPLE data only until Founding Steward confirms. No scrape of living people from the public internet.

---

## Stack defaults (ASSUMPTIONS § tech)

- TypeScript · Next.js web + PWA · Postgres · object storage · background jobs  
- Auth: email magic link + password; **2FA required for Stewards**; passkeys welcome  
- Row-level security in production; signed URLs for media; audit log  
- Relational model + GEDCOM export — not a vendor-only graph lock-in  

---

## Week 1 — Foundation & Auth

**Goal:** Accounts exist; Stewards can sign in with 2FA; parchment/plum/teal shell.

- Repo, CI, Postgres from [`schema/001_init.sql`](../schema/001_init.sql) (then real migrations)  
- Design tokens into app chrome  
- Magic link + password sessions  
- Steward 2FA enroll/verify gate on Steward routes  
- `users`, session, basic `roles` grant for Founding Steward  

**Exit:** `/auth` flows work; unauthenticated users see marketing + teaser only.

---

## Week 2 — Membership & Claims

**Goal:** Path A invite + Path B claim; nobody sees living records until approved.

- `invites`, `access_claims`, `memberships`  
- Claim form + waiting state  
- Steward Members desk: Approve / Request changes / Decline **with reason**  
- Assumption: Member-issued invites need Steward confirm; Steward-issued may auto-approve  
- Minor + guardian consent fields  

**Exit:** Approved Member reaches empty Member shell; unapproved cannot deep-link living data.

---

## Week 3 — Person & Relationship Graph

**Goal:** Official people and relationships are relational and versionable.

- CRUD via **proposals** for writes; Steward apply to `people`, `person_names`, `person_facts`, `relationships`, `places`  
- Uncertain dates; line tags; privacy_settings defaults (address/social hidden)  
- Directory list API; person profile read with “Not yet known”  
- SAMPLE seed (is_sample=true): both lines, one military honor stub deferred until sources table wired, migration Texas→elsewhere, living Charlie Hutson privacy ON  

**Exit:** Members can browse approved SAMPLE people and relationships in list/profile form.

---

## Week 4 — Tree View & Kinship Calculator

**Goal:** Tree tab canvas + how-are-we-related.

- Graph slice API for canvas; plum/teal/split rings  
- Zoom/pan tree; focus person; line filters  
- How-are-we-related plain-language path (shared with later Ask)  

**Exit:** Tree tab usable on web; equal Norwood/Hutson filters.

---

## Week 5 — Approval Queue & Governance Core

**Goal:** Full proposal state machine in product UI.

- `proposals`, `approvals`, `audit_events` wired to queue  
- Reviewer role limited to media/stories (stubs OK if media not full yet — show empty teaching states)  
- Living-owner consent notifications for sensitive fields  
- Honor badge proposal blocked without source  
- Merge tool v1 (preview + reason)  
- Roles desk + succession list UI  

**Exit:** Member propose → Steward approve path live for people/relationships/corrections.

---

## Week 6 — GEDCOM (immediately after graph)

**Goal:** Longevity format not skipped.

- GEDCOM export of approved people/relationships/facts  
- GEDCOM import into **proposals** or Steward review sandbox (never silent overwrite of official tree)  
- Export job row in `exports`  

**Assumption:** Soft requirement “v1 or immediately after graph” — this week is that slice.

**Exit:** Steward can download a GEDCOM of the official tree.

---

## Week 7–8 — Media Pipeline

**Goal:** Photos and documents with signed URLs; originals kept.

- Object storage; `POST` upload URL + complete; display derivatives job  
- `media`, `media_links`; portrait + gallery on person  
- Proposal kinds photo + document; Reviewer can approve media  
- Privacy: living new photos need owner consent  

**Exit:** Approved portraits show on tree/profile; no durable public URLs for private media.

---

## Week 9 — Stories, Voice, Honor Roll

**Goal:** Narrative layer + sourced honors.

- Stories / story_links; record-a-memory (text)  
- Voice upload + transcript job; status **needs Steward attach**; RAG flag false until attach  
- Honor badges with required source; Honor Roll filters in app  
- Public Honor Roll toggle (default OFF)  

**Exit:** Elder can record text/voice memory; voice not in Ask until Steward attaches.

---

## Week 10 — Exports Bundle & Steward Longevity

**Goal:** Scheduled export discipline.

- Media bundle + printable PDF “book of the family”  
- Monthly reminder default (configurable)  
- Steward checklist UI: domain, Apple, Google, hosting, DNS, legal entity offline  
- Two-Steward archive-delete gate  

**Exit:** Steward runbook actions possible in product (see doc I).

---

## Week 11–12 — Ask Rootline (AI last)

**Goal:** RAG over approved corpus only.

- Index approved profiles, sourced stories, attached transcripts, approved documents  
- `/ask` with citations; refusal paths (unknown, living address, unsourced rank)  
- Research request filing  
- Privacy flags (Charlie Hutson privacy ON example in tests)  

**Exit:** Ask answers kinship/military/place/story queries without invention.

---

## Parallel / ongoing

| Track | Notes |
|-------|-------|
| Marketing website | Home, Archive, Membership, Honor Roll stub, Stewards, Privacy, Download — can start Week 1–2 |
| PWA | Installable web; elder large-type |
| Native stores | After web IA stable; ask Charlie only when sprint starts (RN vs Flutter) |
| RLS & pen-test | Before any real family data |
| Spanish UI | Nice-to-have after v1 unless Charlie prioritizes |

---

## Explicit non-goals in this plan (v1)

DNA · multi-family social network · public living phone book · auto-published AI biographies · crypto · chosen-family on official tree until Steward enables · Public History Mode (flag only).

---

## Assumption callouts (do not silently reverse)

1. Member-issued invites need Steward confirm.  
2. Minor = under 18 until Charlie says otherwise.  
3. Public Honor Roll default OFF.  
4. GEDCOM in Week 6 (right after graph), not deferred to “someday.”  
5. Web first-class; native follows.  
6. No real biography without confirmation — SAMPLE until then.

---

*Document H of Rootline deliverables. Ship the house before the chandelier (AI).*
