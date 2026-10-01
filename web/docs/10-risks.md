# ROOTLINE — Risks & Mitigations

**Deliverable J.** Main failure modes for a private, long-lived family archive — and how product rules push back. No hype; plain mitigations tied to Rootline rules already in the brief and docs D–I.

---

## 1. Privacy leaks

**Risk:** Living addresses, private photos, social links, or Ask answers expose living people (doxxing). Public site or signed URL leakage. Staffing mistake publishes a living adult’s field without consent.

**Mitigations (product rules)**
- Membership gate: living-family records only after Steward-approved invite or claim.  
- Default **hidden** address and social; living owner opt-in (`privacy_settings`).  
- Living-adult **veto** / consent gate — Stewards cannot force-publish address, social, or new photos.  
- Guardians for minors.  
- Ask Rootline: no living private contact/location; respect privacy flags (e.g. Charlie Hutson privacy ON); cite only approved records.  
- Public site: no living private photos or addresses; Public Honor Roll deceased-only when enabled; Public History Mode default OFF.  
- Media via **short-lived signed URLs**; RLS in production.  
- Audit reasons on approvals; Reviewer cannot approve membership.  
- Contractual: no training private family data on public models beyond contracted provider.

---

## 2. Duplicate people

**Risk:** Same ancestor entered twice under variant names → broken kinship, double honors, confused Ask answers.

**Mitigations**
- Steward **merge tool** with preview and required audit reason.  
- Claims that conflict with an existing person go to Steward queue (not silent create).  
- Proposals for `new_person` reviewed before official insert.  
- Directory search + line filters before creating.  
- GEDCOM import lands in review/proposals — never silent overwrite.  
- Version history and rollbacks on person records.  
- SAMPLE banner and `is_sample` until confirmation reduces “looks real so merge blindly” errors.

---

## 3. Invented AI facts

**Risk:** Ask Rootline fabricates ancestors, exact dates, military ranks, or causes of death; or indexes unapproved voice transcripts.

**Mitigations**
- RAG corpus = **approved** profiles, sourced stories, Steward-**attached** transcripts (`rag_eligible`), approved documents only.  
- Hard refusals: invent nothing; if unknown, say so + **File a research request**.  
- Citations required on answers.  
- Uncertain dates stay labeled; UI “Not yet known.”  
- Honor badges and contested facts require **sources**; decline unsourced ranks.  
- Voice default **needs Steward attach** before RAG.  
- Research sandbox cannot reach `approved`.  
- Automated tests for refusal examples (invented date, living address, unsourced rank, no records) — see doc F.  
- No auto-published AI biographies (v1 non-goal).

---

## 4. Single-admin bus factor

**Risk:** One Founding Steward holds every credential; illness, dispute, or lost 2FA orphans the archive and domains.

**Mitigations**
- Minimum **two living Stewards** once past founding.  
- **Steward succession** table: named successors with order and reason.  
- Norwood-line Steward **offerable** (co-voice) — broaden the council (target 3–7 when named).  
- **2FA** required for Stewards; second-Steward path for 2FA recovery.  
- **Two-Steward delete gate** for archive destruction.  
- Scheduled **GEDCOM + media + PDF** exports; multi-location backup reminder.  
- **Web app first-class** — not only app stores.  
- Legal-entity checklist (trust / LLC / nonprofit) for domain, Apple, Google, hosting, DNS — titled offline, tracked in Steward settings.  
- Passwords/magic link recovery documented in runbook; no single undocumented registrar login.

---

## 5. Related risks (shorter)

| Risk | Mitigation tie-in |
|------|-------------------|
| Unsourced Honor Roll / public embarrassment | Source required; public Honor Roll default OFF; Steward toggle |
| Member-issued invite abuse | Steward confirm before full access (assumption) |
| Elder exclusion | Large-type mode, voice memory, web app, captions/transcripts |
| Vendor lock-in | Relational Postgres + GEDCOM; originals in exportable object storage |
| Contested family narrative | Citations, contested flag, request changes, audit trail, no likes-as-popularity |
| Accidental real-bio invention in design/seed | SAMPLE-only policy; ask Charlie before removing labels |

---

## 6. Residual acceptance

No archive is risk-free. Rootline accepts remaining risk only where a Steward Council knowingly enables a toggle (e.g. public Honor Roll) after exports and dual Stewardship exist. When unsure of a **family fact**, ask — do not fill the gap.

---

*Document J of Rootline deliverables. Privacy, truthfulness, and succession are product features — not afterthoughts.*
