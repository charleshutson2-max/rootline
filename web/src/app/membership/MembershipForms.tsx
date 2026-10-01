"use client";

import { useState } from "react";
import Link from "next/link";
import { SAMPLE_INVITE_CODE } from "@/data/sample";
import {
  redeemInvite,
  submitAccessClaim,
  useSessionStore,
} from "@/lib/store";

export function MembershipForms() {
  const session = useSessionStore();
  const [claimMsg, setClaimMsg] = useState<string | null>(null);
  const [inviteMsg, setInviteMsg] = useState<string | null>(null);
  const [code, setCode] = useState("");

  function onClaim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = submitAccessClaim({
      fullName: String(fd.get("fullName") ?? ""),
      assertedRelationship: String(fd.get("rel") ?? ""),
      voucherName: String(fd.get("voucher") ?? "") || undefined,
      docsNote: String(fd.get("docs") ?? "") || undefined,
    });
    setClaimMsg(result.message);
    if (result.ok) e.currentTarget.reset();
  }

  function onInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = redeemInvite(code);
    setInviteMsg(result.message);
  }

  return (
    <>
      {session.membershipStatus === "active" ? (
        <p className="notice" style={{ marginBottom: "1.25rem" }}>
          {session.membershipNote ??
            "Demo membership is active for this session."}{" "}
          <Link href="/app/tree">Open SAMPLE app</Link>
        </p>
      ) : null}

      <form className="card" onSubmit={onClaim} style={{ marginBottom: "1.25rem" }}>
        <p className="eyebrow">Path B · Claim</p>
        <h2 style={{ fontSize: "1.25rem" }}>Request access</h2>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="As you are known in the family"
          />
        </div>
        <div className="field">
          <label htmlFor="rel">Asserted relationship</label>
          <textarea
            id="rel"
            name="rel"
            required
            placeholder="e.g. Grandchild of SAMPLE Margaret Norwood Hutson on the Norwood side"
          />
        </div>
        <div className="field">
          <label htmlFor="voucher">Voucher relative (optional)</label>
          <input
            id="voucher"
            name="voucher"
            type="text"
            placeholder="Living member who can vouch"
          />
        </div>
        <div className="field">
          <label htmlFor="docs">Documents / photos (optional)</label>
          <input
            id="docs"
            name="docs"
            type="text"
            placeholder="Slice 1: file picker stub"
          />
          <p className="hint">
            Stewards review attachments privately. Do not upload unrelated
            people’s data.
          </p>
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn btn-primary" type="submit">
            Submit claim
          </button>
          <Link className="btn btn-ghost" href="/steward/claims">
            Steward claims desk
          </Link>
        </div>
        {claimMsg ? (
          <p className="notice" style={{ marginTop: "1rem" }}>
            {claimMsg}
          </p>
        ) : null}
      </form>

      <form className="card" id="invite" onSubmit={onInvite}>
        <p className="eyebrow">Path A · Invite</p>
        <h2 style={{ fontSize: "1.25rem" }}>I have an invite code</h2>
        <div className="field">
          <label htmlFor="code">Invite code</label>
          <input
            id="code"
            name="code"
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Try SAMPLE-JOIN"
            autoCapitalize="characters"
          />
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn btn-secondary" type="submit">
            Redeem code
          </button>
          <Link className="btn btn-ghost" href="/app/tree">
            Preview SAMPLE app
          </Link>
        </div>
        {inviteMsg ? (
          <p className="notice" style={{ marginTop: "1rem" }}>
            {inviteMsg}
          </p>
        ) : null}
        <p className="hint" style={{ marginTop: "0.75rem" }}>
          Demo code: <code>{SAMPLE_INVITE_CODE}</code> — Steward-issued,
          marks membership approved for this browser session.
        </p>
      </form>
    </>
  );
}
