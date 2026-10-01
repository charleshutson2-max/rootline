"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { LineChip, PrivacyChip } from "@/components/LineChip";
import { people } from "@/data/sample";

export function MeClient() {
  const charlie = people.charlie;
  const [profileMembers, setProfileMembers] = useState(true);
  const [address, setAddress] = useState(false);
  const [social, setSocial] = useState(false);
  const [elder, setElder] = useState(false);

  function toggleElder(next: boolean) {
    setElder(next);
    document.documentElement.classList.toggle("rl-elder-type", next);
  }

  return (
    <>
      <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <Avatar initials={charlie.initials} line={charlie.line} size={64} />
        <div>
          <div className="chip-row">
            <LineChip line={charlie.line} />
            <PrivacyChip />
          </div>
          <h3>{charlie.fullName}</h3>
          <p className="meta">Houston · Founding Steward · Living · Privacy ON</p>
        </div>
      </div>
      <div className="notice notice-privacy">
        You control address, social links, and new photos. Stewards cannot
        publish those without your approval.
      </div>
      <div className="card">
        <div className="toggle-row">
          <div>
            <strong>Show profile to Members</strong>
            <p className="hint">Name and approved public facts</p>
          </div>
          <button
            type="button"
            className={`toggle${profileMembers ? " on" : ""}`}
            aria-pressed={profileMembers}
            title={profileMembers ? "On" : "Off"}
            onClick={() => setProfileMembers((v) => !v)}
          />
        </div>
        <div className="toggle-row">
          <div>
            <strong>Address visible to Members</strong>
            <p className="hint">Default OFF for living adults</p>
          </div>
          <button
            type="button"
            className={`toggle${address ? " on" : ""}`}
            aria-pressed={address}
            onClick={() => setAddress((v) => !v)}
          />
        </div>
        <div className="toggle-row">
          <div>
            <strong>Social links opt-in</strong>
            <p className="hint">Never on the public marketing site</p>
          </div>
          <button
            type="button"
            className={`toggle${social ? " on" : ""}`}
            aria-pressed={social}
            onClick={() => setSocial((v) => !v)}
          />
        </div>
        <div className="toggle-row">
          <div>
            <strong>Elder large-type mode</strong>
            <p className="hint">~125% type · still ≥44px taps</p>
          </div>
          <button
            type="button"
            className={`toggle${elder ? " on" : ""}`}
            aria-pressed={elder}
            onClick={() => toggleElder(!elder)}
          />
        </div>
      </div>
      <div className="btn-row">
        <Link className="btn btn-primary" href="/app/stories#record">
          Propose a memory
        </Link>
        <Link className="btn btn-ghost" href="/app/people/charlie">
          View my SAMPLE profile
        </Link>
        <Link className="btn btn-secondary" href="/steward/queue">
          Steward desk
        </Link>
      </div>
    </>
  );
}
