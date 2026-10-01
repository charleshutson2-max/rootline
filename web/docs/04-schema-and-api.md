# ROOTLINE — Schema & API Outline

**Deliverable D.** Relational Postgres model for The Hutson–Norwood Tree, plus a REST / tRPC-shaped API surface.

**Rules carried into the model**
- Uncertain dates: `exact` / `about` / `before` / `after` / `between` / `unknown`. Unknown is valid; never invent a date for completeness.
- Multiple citations may point at one fact (or event, story, honor badge, relationship).
- Line tags: Hutson, Norwood, both, allied/other.
- Privacy flags on facts, media, stories, relationships, and living profiles.
- Members propose; Stewards (and Reviewers for media/stories) approve. Every approval stores a reason.
- SAMPLE only in seeds and UI. Do not invent real family biography. `people.is_sample` stays true until the Founding Steward confirms.

Canonical DDL: [`/workspace/rootline/schema/001_init.sql`](../schema/001_init.sql)  
That file is valid Postgres CREATE TABLE DDL with PKs/FKs. It is **not** a full production migration (no RLS policies, no job workers, no seed data).

---

## 1. Enums (schema)

| Enum | Values | Purpose |
|------|--------|---------|
| `rl_date_qualifier` | exact, about, before, after, between, unknown | Uncertain dates on facts, events, relationships |
| `rl_line_tag` | hutson, norwood, both, allied_other | Equal billing for Norwood and Hutson |
| `rl_privacy` | public_deceased, members, stewards, owner_only, hidden | Field and media visibility |
| `rl_living` | living, deceased, unknown | Person living status |
| `rl_workflow` | draft, pending, changes_requested, approved, declined, withdrawn | Proposals and access claims |
| `rl_consent_gate` | not_required, awaiting, granted, vetoed | Living-adult / guardian / profile-steward consent |
| `rl_voice_attach` | pending_transcript, needs_steward_attach, attached, rejected | Voice → text before RAG |

---

## 2. Table map (brief §13)

### Identity & access

| Table | Purpose |
|-------|---------|
| **users** | Account: email, optional password hash, display name, 2FA flag. Magic link supported. |
| **memberships** | Link user → tree. Status pending/active/suspended/ended. One **active** membership per user (single tree). Optional link to a `people` row. |
| **roles** | member, reviewer, steward, founding_steward, profile_steward, guardian. Profile steward and guardian require `scope_person_id`. Grant always stores a reason. |
| **invites** | Invite codes. Member-issued codes cannot auto-approve; Steward-issued may (`auto_approve` only when `issuer_is_steward`). |
| **access_claims** | Path B join: full name, asserted relationship, optional voucher person, optional docs via proposals/media, minor + guardian fields. Workflow status + consent gate. |

### Graph & biography

| Table | Purpose |
|-------|---------|
| **people** | Core person. Living status, line_tags[], is_sample, optional private sex/gender + privacy, profile_steward_user_id, version counter. |
| **person_names** | preferred / birth / nickname / married / other. At most one preferred name per person. |
| **person_facts** | Birth, death, marriage, occupation, education, military, residence, burial, public life, social link, other. Uncertain dates; privacy; contested flag; version / supersede chain. |
| **relationships** | parent, partner, spouse, sibling, step/adoptive/half/step variants, chosen_family (only when Steward rule enabled at write time). Blended families supported. |
| **places** | Named locality for born / lived / buried / events; optional lat/lon for Places map. |
| **events** | Shared dated happenings (birth, marriage, migration, military, civic, church, education, …) with uncertain dates and privacy. |
| **sources** | Document, oral history, photograph, certificate, obituary, other — with citation text. |
| **citations** | Join source → one of: person_fact, event, story, honor_badge, relationship. **Many citations per fact.** |

### Media & narrative

| Table | Purpose |
|-------|---------|
| **media** | Object-storage keys for original + display derivative; mime; privacy; uploader. |
| **media_links** | Portrait / gallery / document / audio links to person, story, event, or place. |
| **stories** | story / letter / recipe / memory text; versioned; privacy. |
| **story_links** | Link story to person, event, and/or place. |
| **voice_memories** | Audio media + transcript. Default attach status **needs_steward_attach**. `rag_eligible` stays false until a Steward attaches. |
| **honor_badges** | military / civic / church / educators / firsts. **`source_id` NOT NULL** — no unsourced honor. |

### Governance & longevity

| Table | Purpose |
|-------|---------|
| **proposals** | Member proposals: new_person, relationship, photo, story, voice_memory, correction, social_link, honor_badge, merge. JSON payload; workflow + consent gate; research_sandbox cannot become approved. |
| **approvals** | Decision rows (submit, request_changes, approve, decline, withdraw, veto, consent_grant, attach) with **required reason** and actor capacity. |
| **audit_events** | Append-only log for entities; decision actions require a reason. |
| **privacy_settings** | Per-person: profile / address / social visibility; new photos need owner; Ask mention flag; hide from public site; birthday/remembrance opt-in (default off). |
| **steward_succession** | Named successors with order and reason; supports minimum two living Stewards past founding. |
| **exports** | gedcom / media_bundle / pdf_book / full; queued→ready; optional monthly/quarterly cadence. |

---

## 3. Design notes (dates, citations, privacy, lines)

### Uncertain dates
`date_qualifier` + `date_start` / `date_end` + optional `date_display` (human label such as “about 1920”).

| Qualifier | Constraints |
|-----------|-------------|
| unknown | both dates null — UI shows **Not yet known** |
| exact / about / before / after | `date_start` required; `date_end` null |
| between | both dates required; start ≤ end |

Applied on `person_facts`, `events`, and `relationships`.

### Multiple citations
`citations` is a junction with exactly one target column set. A contested military fact can carry several source rows. Honor badges additionally require `honor_badges.source_id`.

### Line tags
`people.line_tags` is a Postgres array of `rl_line_tag`. Empty means not yet known — do not invent Hutson or Norwood to fill a gap. Filters and tree rings read this field (plum = Norwood, teal = Hutson, split = both).

### Privacy
- Defaults for living address and social: **hidden** until owner opts in (`privacy_settings`).
- Ask Rootline must skip people with `mention_in_ask = false` and must never return living address/social when privacy forbids it.
- SAMPLE living slot (Charlie Hutson in prototypes): privacy ON — treat as `privacy_settings` with address/social hidden and public-site hide true.

### Voice & RAG
Voice transcripts are not Ask-indexable until `attach_status = attached` and `rag_eligible = true`. Reviewer may approve media/story text; Steward attach is required for RAG eligibility.

---

## 4. Entity relationship (summary)

```
users ──< memberships >── people
users ──< roles
users ──< invites ──< access_claims
people ──< person_names
people ──< person_facts >── places
people ──< relationships >── people
people ──< honor_badges >── sources
person_facts / events / stories / honor_badges / relationships ──< citations >── sources
media ──< media_links >── people / stories / events / places
stories ──< story_links
media ── voice_memories (rag gated)
users ──< proposals ──< approvals
users ──< audit_events
people ── privacy_settings
users ──< steward_succession
users ──< exports
```

---

## 5. API outline

Shape can be REST or tRPC procedures with the same resources. Auth is session/JWT after magic link or password; Stewards require 2FA before Steward desk mutations.

Base prefix: `/api/v1` (or tRPC router namespaces below).

### Auth — `auth.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /auth/magic-link` | Start email magic link |
| `POST /auth/magic-link/consume` | Complete magic link |
| `POST /auth/password/sign-in` | Password sign-in |
| `POST /auth/password/set` | Set/change password |
| `POST /auth/2fa/enroll` | Steward 2FA enroll |
| `POST /auth/2fa/verify` | Verify 2FA for Steward session |
| `POST /auth/passkey/*` | Optional passkeys |
| `GET /auth/me` | Current user, membership, roles |
| `POST /auth/sign-out` | End session |

### Claims & invites — `claims.*` / `invites.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /invites` | Steward or Member creates invite (Member: no auto_approve) |
| `POST /invites/redeem` | Redeem code → claim or membership path |
| `POST /access-claims` | Submit claim (name, relationship, voucher, docs) |
| `GET /access-claims/:id` | Claimant or Steward view |
| `POST /access-claims/:id/submit` | draft → pending |
| `POST /access-claims/:id/withdraw` | Claimant withdraw |
| `POST /steward/access-claims/:id/approve` | Steward approve + **reason** |
| `POST /steward/access-claims/:id/request-changes` | Steward + reason |
| `POST /steward/access-claims/:id/decline` | Steward + reason |
| `POST /access-claims/:id/guardian-consent` | Guardian grant for minor |

### People & relationships — `people.*` / `relationships.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `GET /people` | Directory; filters: line, living, place, honor; Members only for living |
| `GET /people/:id` | Person profile; privacy applied |
| `GET /people/:id/facts` | Facts with citations; unknowns as null + qualifier |
| `GET /people/:id/relationships` | Parents, partners, children, siblings |
| `GET /people/related` | How-are-we-related: `a`, `b` → plain-language path |
| `GET /tree` | Graph slice for canvas (approved relationships only) |
| `GET /places` | Places for map |
| `GET /timeline` | Events + facts by date (uncertain-aware) |
| `GET /honor-roll` | Filters All/Military/Civic/Church/Educators/Firsts/Norwood/Hutson |

Writes to official graph go through **proposals**, not direct PATCH (except living owner editing own non-sensitive fields per product rules).

### Proposals — `proposals.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /proposals` | Create draft (kind + payload) |
| `POST /proposals/:id/submit` | draft → pending (may set consent awaiting) |
| `PATCH /proposals/:id` | Edit while draft or changes_requested |
| `POST /proposals/:id/withdraw` | Proposer withdraw |
| `GET /proposals` | “My proposals” for Member |
| `GET /steward/queue` | Pending / changes_requested; Reviewer sees media/stories/voice only |
| `POST /steward/proposals/:id/approve` | Approve + reason (blocked if consent awaiting/vetoed or sandbox) |
| `POST /steward/proposals/:id/request-changes` | + reason |
| `POST /steward/proposals/:id/decline` | + reason |
| `POST /proposals/:id/owner-consent` | Living owner approve / veto |
| `POST /steward/voice/:id/attach` | Steward attach transcript targets → RAG eligible |

### Approvals & audit

| Method / procedure | Purpose |
|--------------------|---------|
| `GET /approvals?proposalId=` | Decision history |
| `GET /steward/audit` | Audit trail (Steward) |

### Media — signed URLs — `media.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /media/upload-url` | Signed PUT URL for original; returns `media` id |
| `POST /media/:id/complete` | Confirm upload; enqueue display derivative |
| `GET /media/:id/download-url` | Short-lived signed GET; privacy + membership checked |
| `POST /proposals` (kind=photo) | Propose attach to person/story |

Originals kept; display derivatives generated in background jobs (outside this DDL).

### Exports — `exports.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /steward/exports` | Queue gedcom / media_bundle / pdf_book / full |
| `GET /steward/exports` | List status |
| `GET /steward/exports/:id/download-url` | Signed URL when ready |
| `PUT /steward/exports/schedule` | Cadence reminder (monthly default) |

### Ask Rootline — `ask.*`

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /ask` | Query string (or voice→text). Retrieves **approved** records only. Returns answer + citations (person id and/or document/source id). Refuses invention; offers research request when unknown. |
| `POST /ask/research-requests` | File a research request when archive does not know |

Retrieval rules are authoritative in [`06-ask-rootline.md`](06-ask-rootline.md); workflow states in [`05-approval-state-machine.md`](05-approval-state-machine.md).

### Steward extras

| Method / procedure | Purpose |
|--------------------|---------|
| `POST /steward/merges` | Create merge proposal or execute approved merge |
| `GET/PUT /steward/roles` | Grant/revoke with reason; succession list |
| `PUT /steward/public-toggles` | Public Honor Roll on/off; Public History Mode flag (default off) |
| `POST /steward/archive-delete` | Requires typed confirmation + second Steward approval row |

---

## 6. Security notes (API)

- Row-level security in production should mirror `rl_privacy` + membership + living-owner rules (not in `001_init.sql`).
- Stewards: 2FA required for Steward desk mutations.
- Signed URLs only for media; never durable public URLs for living private media.
- Audit reason required on approve / decline / request_changes / veto / role grant / export create / archive delete.
- No scrape/import of living people from the public internet into the official tree.

---

## 7. SAMPLE seed policy

When seeding for demos, label every person `is_sample = true` and UI banner “SAMPLE.” Prototype people (Eleanor Mae Norwood, Samuel “Sam” Hutson, Margaret Norwood Hutson, Charlie Hutson with privacy ON) are fictional until confirmed — do not load WikiTree or census identities as this family.

---

*Document D of Rootline deliverables. Warm, precise; no invented biography.*
