# ROOTLINE — Screens index (prototype)

Clickable high-fidelity static prototype for brief §10 (deliverable C).

**Entry:** [`/workspace/rootline/prototype/index.html`](../prototype/index.html)

**How to open**

- File: open `prototype/index.html` in a browser (`file://` works; shared CSS/JS are relative).
- Or static server from the prototype folder:

```bash
cd /workspace/rootline/prototype && python3 -m http.server 8765
```

Then visit `http://127.0.0.1:8765/`.

All people are labeled **SAMPLE**. Unknowns render as **Not yet known**. Gold is honor-only.

---

## Website (Visitor)

| Path | Screen | Journey |
|------|--------|---------|
| `prototype/website/home.html` | Home — hero “Two families. One living archive.”, color key, request-access + download CTAs | Visitor → Claim → Member (A1) |
| `prototype/website/download.html` | Download teaser — App Store / Play placeholders + Open in browser | Visitor → Download (A2) |

Public Honor Roll, Archive explainer, Stewards/contact, and Privacy marketing pages are **not separate website pages** in this prototype (see gaps). Honor Roll lives in the member app; public visibility is a Steward toggle.

---

## Member app

Shared chrome: top bar (logo + Steward desk) and bottom tabs **Tree | People | Stories | Ask | Me**.

| Path | Screen | Tab | Journey |
|------|--------|-----|---------|
| `prototype/member/onboarding.html` | Onboarding teaser + teaching empty state | Me | Invite/Claim → Member (A8 / B4) |
| `prototype/member/request-access.html` | Request access (relationship claim form) | Me | Visitor → Claim (A5) |
| `prototype/member/invite-code.html` | Invite code (`SAMPLE-JOIN` continues to onboarding) | Me | Invite → Member (B1) |
| `prototype/member/tree.html` | Tree canvas — simplified SVG, SAMPLE nodes, click to profile | Tree | Member explore |
| `prototype/member/person.html` | Person profile (`?id=eleanor\|samuel\|margaret\|charlie`) | People | Member explore |
| `prototype/member/people.html` | People directory | People | Member explore |
| `prototype/member/honor-roll.html` | Honor Roll + filters + teaching empty (Educators) | People | Public/member Honor Roll |
| `prototype/member/stories.html` | Stories list + empty voice-notes state | Stories | Member → Propose |
| `prototype/member/record-memory.html` | Record a memory (propose) | Stories | Elder → Record memory |
| `prototype/member/timeline.html` | Timeline (uncertain dates) | People | Member explore |
| `prototype/member/places.html` | Places map stub (Texas, Houston, LA migration) | People | Member explore |
| `prototype/member/ask.html` | Ask Rootline chat stub — cited answer + **refusal** when unknown | Ask | Child / member → Ask |
| `prototype/member/me.html` | Me / privacy (Charlie Hutson, privacy ON, elder type) | Me | Living owner |
| `prototype/member/notifications.html` | Notifications stub (birthday / remembrance opt-in) | Me | Living owner |

**SAMPLE seed on these screens**

- Eleanor Mae Norwood — deceased, Norwood, civic/church honor (gold)
- Samuel “Sam” Hutson — deceased, Hutson, military honor (gold)
- Margaret Norwood Hutson — deceased, both lines, Texas → Los Angeles
- Charlie Hutson — living, Hutson, privacy ON

---

## Steward desk

Linked from the member app bar. Subnav: Queue | Claims | Merges | Exports | Roles | Public site.

| Path | Screen | Journey |
|------|--------|---------|
| `prototype/steward/queue.html` | Approval queue (story, honor, voice) | Steward → Approve |
| `prototype/steward/claims.html` | Member claims + audit reason | Visitor → Claim review |
| `prototype/steward/merge.html` | Merge tool stub | Steward data quality |
| `prototype/steward/export.html` | Export stub (GEDCOM, media, PDF, schedule) | Longevity |
| `prototype/steward/roles.html` | Role manager stub (Founding Steward, offerable spouse, succession) | Governance |
| `prototype/steward/public-toggles.html` | Public-site toggles (Honor Roll default off, Public History Mode future/off) | Website control |

---

## Screen count

**23** navigable HTML documents: hub (`index.html`) + 2 website + 14 member + 6 steward. Distinct §10 product screens excluding the hub: **22**.

---

## Gaps vs brief §10 / §9

Covered as clickable screens: onboarding, request access, invite code, tree canvas, person profile, people directory, honor roll, stories list, record-a-memory, timeline, places map stub, Ask Rootline (with refusal), my privacy, notifications; steward queue, claims, merge stub, export stub, role manager stub, public-site toggles; website hero + download + request access.

Not built as separate pages (intentional for this static pass):

- Full marketing set from §9: The Archive, Stewards/contact, Privacy policy page (privacy is in-app Me + a notice on download).
- How-are-we-related calculator (Ask stub covers kinship conceptually; no dedicated picker).
- Real map tiles, zoomable tree, live chat, file upload, or persistence — stubs and scripted responses only.
- Reviewer-only queue filter and waiting-state after claim submit (alert only).
