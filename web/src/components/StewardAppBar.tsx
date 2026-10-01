import Link from "next/link";

export function StewardAppBar() {
  return (
    <div className="rl-app-bar">
      <Link className="rl-logo" href="/">
        Rootline <span>· Steward</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link className="rl-steward-link" href="/app/tree">
          ← Member app
        </Link>
        <div className="rl-app-meta">
          Founding Steward
          <br />
          Founding Steward · tree admin
        </div>
      </div>
    </div>
  );
}
