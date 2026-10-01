# ROOTLINE — Product Assumptions

Sensible defaults used for IA / design so work is not blocked.  
**Ask Charlie only if a decision is truly blocking** (listed at the bottom).

All people in seeds and previews are labeled **SAMPLE**. No real family biography invented.

---

## Non-blocking assumptions (proceed)

### Joining & membership
1. **Member-issued invite codes** require Steward confirmation before full access; **Steward-issued** codes may auto-approve membership (still audited).
2. Claimants who are declined may submit a new claim after 30 days unless a Steward sets a longer cool-down.
3. One active membership per user account on The Hutson–Norwood Tree (single-tree product).
4. “Account holder (unapproved)” can use the public site + request/invite flows only — no living-record peek via deep links.

### Minors & guardians
5. “Minor” = under 18 for v1 account rules (US default); guardian must approve account and visibility.
6. A guardian may manage multiple minor profiles; Ask Rootline for minors still respects privacy flags and guardian visibility.

### Roles
7. **Reviewer** can Approve / Request changes / Decline on media, stories, and voice transcripts only — not membership, roles, merges, exports, or honor badges.
8. Steward Council size target 3–7 when named; until then Founding Steward operates with a checklist to name a second living Steward before “past founding” launch gate.
9. Spouse (Norwood-line) is **offerable** as Steward in Roles UI; accepting is optional and not assumed in sample data.
10. Profile steward for a deceased person defaults to next-of-kin nominated at death-record creation; Steward can reassign with audit reason.

### Privacy & living profiles
11. Default for new living members: profile visible to Members; address and social links **hidden** until owner opts in.
12. Birthday/remembrance notifications are **opt-in** per member (default off).
13. Public Honor Roll toggle defaults to **OFF** until a Steward enables it; when on, deceased + honored only.
14. Public History Mode remains a future flag, default OFF — not built in v1 UI beyond a Steward “coming soon” note if needed.

### Content & unknown data
15. Missing dates/places show **“Not yet known”**; uncertain dates use about / before / after / between — never fabricated.
16. Chosen-family relationship type is **disabled** until a Steward enables the rule.
17. Research sandbox exists as a proposal flag “theory / unsourced” that cannot land on the official tree until sourced and approved.
18. Memories have no like counts; optional “I remember this” acknowledgment may wait until after v1.

### Ask Rootline
19. v1 answers only from approved profiles, sourced stories, approved transcripts, and approved documents; face grouping and OCR are stubs.
20. Voice → text for elders marks transcript **“needs Steward attach”** before it is RAG-indexable.
21. Model provider is a contracted family provider; no training on private data for public models (contractual assumption — legal entity offline).

### Design & brand
22. Working domains stay as brief placeholders; marketing copy does not hard-code a purchased domain.
23. Primary CTA chrome is **plum**; secondary actions **teal**; gold never used for general buttons.
24. Web app is first-class (PWA path); store apps follow the same IA.
25. Serif for names/headlines, humanist sans for UI; elder mode = 125% root by default when toggled.

### Longevity & exports
26. GEDCOM import/export is in v1 or the slice immediately after person+relationship graph — planned, not skipped.
27. Scheduled export cadence default: monthly Steward reminder (configurable).
28. Legal owner entity (trust / LLC / nonprofit) is documented as a Steward checklist; entity creation is offline.

### Tech (boring defaults)
29. TypeScript; Next.js web + PWA; Postgres; object storage; magic link + password; 2FA required for Stewards; passkeys welcome.
30. Native clients: React Native **or** Flutter — deferred choice; web IA is source of truth for v1 screens.

### Sample seed (when seeded later)
31. Include SAMPLE deceased on both lines, one military honor, one civic/church honor, one migration Texas → elsewhere, and one living Member slot labeled for Charlie Hutson with privacy ON — all clearly SAMPLE until confirmed.

---

## Ask Charlie only if blocking

Use this short list when a choice would reverse IA, legal posture, or brand:

1. **Minor age threshold** if the family wants something other than under-18 for account/guardian rules.
2. **Member-issued invite policy** if invites should auto-approve without Steward confirm.
3. **Public Honor Roll at launch** — on or off for the marketing site.
4. **Legal entity / account ownership** naming for longevity checklist (trust vs LLC vs nonprofit) when credentials must be titled.
5. **Confirmation of any real person** before removing SAMPLE labels or importing external genealogy sources.
6. **Chosen-family rule** enablement for the official tree.
7. **Native stack** (React Native vs Flutter) when store build sprint starts — not blocking for IA/design.
8. **Spanish UI** priority if the family wants it in v1 vs later.

If unsure of a **family fact**, ask — do not fill the gap.

---

*Assumptions document for Rootline early deliverables (A/B). Non-blocking items may be revised without scrapping the design system.*
