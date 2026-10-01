import Link from "next/link";

export function MemberAppBar() {
  return (
    <div className="rl-app-bar">
      <Link className="rl-logo" href="/">
        Rootline <span>· Hutson–Norwood</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link className="rl-steward-link" href="/steward/queue">
          Steward desk
        </Link>
        <div className="rl-app-meta">
          Member view
          <br />
          Slice 1 · in-memory
        </div>
      </div>
    </div>
  );
}
