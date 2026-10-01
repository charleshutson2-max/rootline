# ROOTLINE — Information Architecture & User Journeys

**Product:** Rootline  
**Tree:** The Hutson–Norwood Tree  
**Tagline:** The Hutson–Norwood living archive.  
**Positioning:** Personal family house with a public front door.  
**Equal billing:** Norwood and Hutson are first-class in navigation, color, filters, Honor Roll, and search.

---

## 1. App information architecture

### Member tabs (primary chrome)

| Tab | Purpose |
|-----|---------|
| **Tree** | Zoomable canvas of The Hutson–Norwood Tree; focus person, expand/collapse, line filters (Hutson / Norwood / Both / All) |
| **People** | Directory, Honor Roll, search, How-are-we-related calculator; person profiles |
| **Stories** | Stories, letters, recipes, voice memories; propose new; timeline entry points |
| **Ask** | Ask Rootline chat (RAG over approved records only) |
| **Me** | Own living profile, privacy controls, notifications (birthday/remembrance opt-in), invites I can share, proposals I filed |

### Steward extras (visible when role ≥ Steward)

| Extra | Purpose |
|-------|---------|
| **Queue** | Pending proposals: people, relationships, photos, stories, voice, corrections, social links, honor badges, merges, access claims |
| **Members** | Memberships, invite codes, claims; Approve / Request changes / Decline with reason |
| **Merges** | Duplicate-person merge tool with preview and audit reason |
| **Exports** | GEDCOM, media bundle, printable PDF “book of the family”; scheduled export status |
| **Roles** | Stewards, Reviewers, Profile stewards, succession checklist; 2FA status for Stewards |

Reviewers see **Queue** (media/stories only), not Members / Roles / Merges / Exports membership controls.

---

## 2. Website sitemap

Working domains (until family purchase): `rootlinefamily.org` / `hutsonnorwood.org` — do not hard-code a purchased domain.

```
/                       Home — “Two families. One living archive.”
/archive                The Archive (what it is; color key plum=Norwood, teal=Hutson)
/membership             Membership / Request access (claim form + invite-code entry)
/honor-roll             Honor Roll (optional public; Steward toggle; deceased only)
/stewards               Stewards / contact
/privacy                Privacy
/download               Download — App Store, Play, Open in browser (web app)
```

**Public constraints:** No living people’s private photos or addresses. Teaser until approved: mission, optional public deceased Honor Roll, request form.

---

## 3. Role matrix

| Capability | Visitor | Account (unapproved) | Member | Living profile owner | Reviewer | Steward | Founding Steward |
|------------|---------|----------------------|--------|----------------------|----------|---------|------------------|
| Browse marketing site | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Public Honor Roll (if on) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Request access / enter invite | — | ✓ | — | — | — | — | — |
| View living-family records | — | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Propose people/media/stories | — | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit own living profile / veto | — | — | own | ✓ (self) | — | cannot override living adult veto | same |
| Approve media & stories | — | — | — | — | ✓ | ✓ | ✓ |
| Approve members / roles / merges / exports / honor | — | — | — | — | — | ✓ | ✓ |
| Name successors / longevity checklist | — | — | — | — | — | ✓ | ✓ |
| Audit reason on every approval | — | — | — | — | ✓ | ✓ | ✓ |

**Rules (from brief):**
- Minimum two living Stewards once launched past founding.
- Version history on every person and story; rollbacks allowed.
- No god-mode delete of the archive without typed confirmation **and** a second Steward.
- Profile steward = designated next-of-kin for a deceased person.
- Founding Steward: Charlie Hutson (Houston). Spouse is Norwood-line; offerable as Steward; co-voice on brand and Norwood representation.

---

## 4. Privacy summary

| Subject | Who can publish / change | Notes |
|---------|--------------------------|-------|
| Living adult profile (address, social links, new photos) | Owner veto required; Steward cannot publish without owner (or parent if minor) approval | Living profile owner controls self |
| Minor | Parent/guardian must approve account **and** child’s visibility | Guardian linked on claim/invite |
| Deceased | Profile steward + Steward | Sources for honor badges and contested facts |
| Social links | Living opt-in only | Never on public marketing site |
| Ask Rootline answers | Approved records only; respect privacy flags; no doxxing living people | Cite person/document; refuse unknowns |
| Public History Mode | Future flag; deceased generations only; **default OFF** | Steward setting |
| Unknown facts | UI shows **“Not yet known”** | Never invent dates for completeness |

---

## 5. Views & discovery

### Views
1. **Tree** — zoom canvas; line-colored rings (plum / teal / split); focus + path highlight  
2. **Directory** — searchable people list; filters by line, living/deceased, place, honor  
3. **Timeline** — events and stories by date (supports about / before / after / between)  
4. **Places** — map of born / lived / buried (feeds from person places)  
5. **How-are-we-related** — calculator: pick two people → plain-language kinship path (also via Ask Rootline)

### Honor Roll filters
**All | Military | Civic | Church | Educators | Firsts | Norwood | Hutson**

Gold medals/marks appear **only** for honor / military / notable — never as general chrome.

---

## 6. Person record (core object) — IA reminder

Names (preferred, birth, nicknames) · optional private sex/gender · dates with uncertainty · calculated age · portrait + gallery · relationships (parents, partners, children, siblings; blended families; chosen-family only if Steward enables) · occupation/education over time · places · military · public life · social links (living opt-in) · stories/letters/recipes/voice · sources · privacy flags · line tags: Hutson, Norwood, both, other allied.

---

## 7. Detailed user journeys

### Journey A — Visitor → Claim → Member

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| A1 | Website Home | Reads mission; sees plum/teal color key; Download / Request access CTAs | Browse Honor Roll? → A1b or continue |
| A1b | Honor Roll (public, if enabled) | Filters All/Military/…; SAMPLE deceased only | No living private data |
| A2 | Download | App Store / Play / Open in browser | Chooses platform |
| A3 | Create account | Email magic link or password | Account exists → sign in |
| A4 | Gate: teaser | Mission + request form + invite entry; **cannot** see living records | Path B Claim **or** Path A Invite (Journey B) |
| A5 | Claim form | Full name, asserted relationship, optional voucher relative, optional docs/photos | Submit → pending |
| A6 | Waiting state | “Claim under review”; notifications when Steward acts | — |
| A7 | Steward: Members / Queue | Reviews claim | **Approve** / **Request changes** / **Decline** (+ reason, audit) |
| A7a | Request changes | Claimant sees requested fields; resubmits | Loop to A7 |
| A7b | Decline | Reason shown; may re-claim later if Steward allows | End or retry |
| A8 | Approved → Member | Onboarding: Tree, Me privacy defaults, optional invite-to-share | Enter app tabs |

**Minor branch:** If claimant is under majority age, guardian must approve account **and** visibility before A8 completes (see Journey G).

---

### Journey B — Invite code → Member

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| B1 | Teaser / Membership | Enters invite code from Member or Steward | Invalid → error; valid → continue |
| B2 | Confirm identity | Name + relationship to inviter (light form) | Conflict with existing person → Steward queue |
| B3 | Auto or Steward gate | Steward-issued codes may auto-approve; Member-issued codes may require Steward confirm (product default: Steward confirm for Member-issued) | Approve / Request changes / Decline |
| B4 | Member onboarding | Same as A8 | — |

---

### Journey C — Member → Propose

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| C1 | Person / Stories / Tree | “Propose” on person, photo, story, relationship, correction, honor, merge suggestion | Choose type |
| C2 | Propose form | Fields + sources (required for honor / contested) | Living-adult fields → notify owner (Journey F) |
| C3 | My proposals (Me) | Status: Pending / Changes requested / Approved / Declined | Edit if changes requested |
| C4 | Steward/Reviewer Queue | Reviewer: media & stories only; Steward: all | Approve (+ reason) / Request changes / Decline |
| C5 | Live on tree | Version history entry; Ask Rootline may cite after approval | — |

Comments are **memories**, not a social feed. No likes-as-popularity. Research sandbox theories stay off the official tree until sourced.

---

### Journey D — Steward → Approve

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| D1 | Queue | Filter by type: claims, people, media, stories, honor, merges… | Pick item |
| D2 | Detail + audit | Diff / media preview / citations | Approve / Request changes / Decline — **reason required** |
| D3 | Living adult impact | If touches living adult sensitive fields | Wait for owner approval (cannot force-publish) |
| D4 | Merge tool | Select duplicates; preview surviving record | Confirm merge + reason |
| D5 | Roles / Exports / Public toggles | As needed | Second Steward for archive-level delete |

---

### Journey E — Elder → Record memory

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| E1 | Me or Stories | “Record a memory”; **large-type mode** available | Text **or** voice |
| E2 | Voice capture | Record; auto transcript marked **“needs Steward attach”** | Retry / keep |
| E3 | Attach targets | Link to people / places / events (optional; Steward can finish attach) | Submit as proposal |
| E4 | Queue | Reviewer or Steward approves | Live story; captions on audio for a11y |

Tone: warm, dignified; empty states teach (“No Norwood photos yet — record a memory”).

---

### Journey F — Living profile owner veto

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| F1 | Notification | “Proposed change to your profile” (photo, address, social, etc.) | Open |
| F2 | Me → Privacy / pending | Review proposal | **Approve** / **Edit** / **Veto** |
| F3 | Steward attempt to publish | Blocked until owner (or parent if minor) approves | Steward sees waiting state |
| F4 | Audit | Owner decision logged | — |

Stewards cannot publish a living adult’s social links, address, or new photos without that person’s (or parent’s, if minor) approval.

---

### Journey G — Minor + guardian

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| G1 | Claim or invite for minor | Guardian identified | Guardian account exists? |
| G2 | Guardian approval | Approve child’s **account** and **visibility** settings | Decline → no membership |
| G3 | Child Member (limited) | View tree per guardian visibility; Ask Rootline; propose with guardian co-notify | Sensitive fields gated |
| G4 | Ongoing | Changes to minor profile notify guardian | Guardian veto path mirrors Journey F |

---

### Journey H — Child → Ask Rootline

| Step | Screen | Actor actions | Decision points |
|------|--------|---------------|-----------------|
| H1 | Ask tab | Types or voice: e.g. “How am I related to SAMPLE Person?” | Age-appropriate UI; large tap targets |
| H2 | Retrieval | RAG over **approved** records only | Unknown → “The archive does not know yet” + “File a research request” |
| H3 | Answer | Plain-language kinship; citations to person/document | Privacy flags respected; no living doxxing |
| H4 | Follow-ups | Military, places, stories (“Read me the story about…”) | Never invent ancestors, dates, ranks, causes |

---

## 8. Content workflow (summary)

**Members PROPOSE. Stewards APPROVE.**  
Pending: new person, relationship link, photo, story, voice memory, correction, social link, honor badge, merge.  
Living-adult fields notify the owner. Deceased: Profile steward + Steward.

---

## 9. Screen inventory (maps to brief §10)

**Member:** onboarding, request access, invite code, tree canvas, person profile, people directory, honor roll, stories list, record-a-memory, timeline, places map, Ask Rootline chat, my privacy, notifications.

**Steward:** approval queue, member claims, merge tool, export, role manager, public-site toggles.

**Website:** hero + download + request access (+ sitemap pages above).

---

*Document A of Rootline deliverables. SAMPLE labels only — no invented real family biography.*
