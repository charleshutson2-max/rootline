# ROOTLINE — Steward Runbook

**Deliverable I.** How Stewards approve work, export the archive, name successors, and keep the house standing after any one person is gone.

Tone: calm checklist. Every decision leaves a reason.

**Roles reminder:** Reviewers may approve media and stories only. Membership, merges, honor badges, exports, roles, and public toggles are **Steward** work. Founding Steward: Charlie Hutson (Houston). Aim for at least **two living Stewards** once past founding.

---

## 1. How to approve (with reason)

1. Open **Steward → Queue** (or **Members** for access claims).  
2. Open the item: read diff, media preview, citations, SAMPLE vs confirmed flags.  
3. Choose **Approve**, **Request changes**, or **Decline**.  
4. **Write a reason** (required). Examples: “Matches voucher and invite from Member M.” / “Need a clearer scan of the certificate.” / “Relationship conflicts with approved parents — see merge #…”  
5. If the item touches a **living adult**’s address, social links, or new photos: confirm consent gate is **granted**. If **awaiting**, do not publish — wait or request the owner act. You cannot override a living-adult **veto**.  
6. Minors: confirm **guardian** approved account and visibility before activating membership.  
7. Honor badges: confirm a **source** exists; otherwise Request changes or Decline.  
8. Voice memories: approving visibility ≠ RAG. Use **Attach** (person/event/story + reason) before Ask Rootline may use the transcript.  
9. Research-sandbox / unsourced theory: do not Approve onto the official tree.

Audit: `approvals` + `audit_events` store actor, capacity, decision, reason, timestamps.

---

## 2. Export GEDCOM + media + PDF

**Steward → Exports**

| Export | Contents | Use |
|--------|----------|-----|
| **GEDCOM** | Approved people, names, facts, relationships (uncertain dates preserved as the format allows) | Portability / other genealogy tools |
| **Media bundle** | Originals (and optionally display derivatives) referenced by approved media links | Offline vault |
| **PDF book** | Printable “book of the family” — dignified layout, SAMPLE watermark if any sample rows remain | Sharing with elders offline |
| **Full** | GEDCOM + media bundle + PDF together | Scheduled longevity pack |

**Steps**
1. Queue the export kind.  
2. Wait for status **ready** (background job).  
3. Download via short-lived signed URL.  
4. Store copies in **more than one** physical/cloud location (see backups).  
5. Optional: set cadence **monthly** (default reminder) or quarterly.

Never email living private media to a public list. Prefer Steward-controlled storage.

---

## 3. Name a successor

**Steward → Roles → Succession**

1. Ensure two living Stewards exist (or are being named) before calling the launch “past founding.”  
2. Add successor user, **order** (1, 2, …), and **named reason**.  
3. Ask the successor to accept in-product when that flow ships; until then, record acceptance offline and note it in the reason/audit.  
4. Offer Norwood-line Stewardship (spouse offerable) without assuming acceptance.  
5. Reassign **profile steward** for deceased people when next-of-kin changes — with audit reason.  
6. Revoke succession rows when someone steps down; do not leave a single point of failure undocumented.

---

## 4. Recover accounts

| Situation | Action |
|-----------|--------|
| Member forgot password | Magic link or password reset to verified email |
| Steward lost password but has email | Reset + **re-verify 2FA** before Steward desk mutations |
| Steward lost 2FA device | Second Steward verifies identity offline; then reset 2FA enrollment (audit reason). Document who verified. |
| Email account lost | Steward verifies identity via known relationship + optional video/call; change email with audit; prefer legal-entity recovery contacts when set |
| Disabled account | Steward re-enable with reason; do not silently restore declined claims |

Do not share passwords in chat. Prefer magic link.

---

## 5. Two-factor authentication (2FA)

- **Required for all Stewards** before Steward mutations.  
- Passkeys welcome in addition.  
- Reviewers: strongly encouraged; product may require later.  
- Roles desk shows 2FA status. A Steward without 2FA sees a blocking enroll screen on Queue/Members/Exports/Roles.

---

## 6. Two-Steward delete gate

There is **no** single-person god-mode delete of the archive.

To delete or irreversibly destroy the archive:

1. Steward A initiates with **typed confirmation** phrase.  
2. Steward B (different living Steward) submits a second approval with **reason**.  
3. Both actions land in audit.  
4. Prefer export + offline vault **before** any destructive action.

Membership removal or person merge is not archive delete — use those softer tools first.

---

## 7. Backup reminder

- Keep the latest **Full** export in at least two places Stewards control (e.g. encrypted drive + organizational cloud).  
- Monthly reminder default (configurable).  
- After large reunions or many approvals, run an extra Full export.  
- Verify a GEDCOM open in a second tool once per year.  
- Media originals live in object storage — exports are your escape hatch if a vendor fails.

---

## 8. Legal-entity credential checklist (offline)

Create the trust / LLC / nonprofit **offline** with counsel. In Steward settings, track whether credentials are titled to that entity:

| Credential | Held by entity? | Where documented (offline) | Last reviewed |
|------------|-----------------|----------------------------|---------------|
| Domain registrar (rootlinefamily.org / hutsonnorwood.org placeholders → real domain) | ☐ | | |
| DNS host | ☐ | | |
| Web / app hosting | ☐ | | |
| Object storage | ☐ | | |
| Email / transactional mail | ☐ | | |
| Apple Developer | ☐ | | |
| Google Play | ☐ | | |
| Model / AI provider contract | ☐ | | |
| Database backups | ☐ | | |
| Signing keys / passkey recovery | ☐ | | |

Update this checklist when Stewards change. Do not paste secrets into the app runbook fields — only **status** and **pointer** to the offline vault.

---

## 9. Public site toggles

- **Public Honor Roll:** default OFF. When ON, deceased honorees only; still sourced.  
- **Public History Mode:** future; default OFF — do not enable in v1 without Charlie + Steward Council agreement.  
- Marketing site never gets living private photos or addresses.

---

## 10. Quiet habits

- Prefer Request changes over Decline when a source would fix the item.  
- Label SAMPLE until Charlie confirms real identities.  
- Equal care for Norwood and Hutson entries in merges and honors.  
- Empty queues are fine; do not invent people to “fill” the tree.

---

*Document I of Rootline deliverables. The archive must remain usable after every current Steward is gone.*
