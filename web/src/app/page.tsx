import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { ColorKey } from "@/components/ColorKey";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="rl-main">
        <section className="hero">
          <p className="eyebrow">The Hutson–Norwood living archive</p>
          <h1>Two families. One living archive.</h1>
          <p className="lede">
            Rootline is a private family house with a public front door — equal
            billing for Norwood and Hutson, built to outlast any single Steward.
          </p>
          <ColorKey />
          <div className="split-rings" aria-hidden="true">
            <div className="ring-demo n" title="Norwood" />
            <div className="ring-demo h" title="Hutson" />
            <div className="ring-demo b" title="Both" />
          </div>
          <div className="btn-row hero-actions">
            <Link className="btn btn-primary" href="/membership">
              Request access
            </Link>
            <Link className="btn btn-secondary" href="/download">
              Download / Open
            </Link>
            <Link className="btn btn-ghost" href="/membership#invite">
              I have an invite code
            </Link>
          </div>
        </section>

        <section className="section">
          <h2>Inside the house</h2>
          <div className="grid-2">
            <Link className="card" href="/app/tree">
              <h3>The tree</h3>
              <p className="meta">
                Official Norwood–Hutson core — relationships drawn with care.
                Unknown facts stay “Not yet known.”
              </p>
            </Link>
            <Link className="card" href="/share/couple">
              <h3>Haven &amp; Charlie</h3>
              <p className="meta">
                The living bridge: Haven Nicole Norwood and Charles Sepe
                Tiaraju Hutson, Founding Steward.
              </p>
            </Link>
            <div className="card">
              <h3>Stories &amp; voice</h3>
              <p className="meta">
                Letters, recipes, and recorded memories — proposed by members,
                approved with care. No invented biography.
              </p>
            </div>
            <div className="card">
              <h3>Ask Rootline</h3>
              <p className="meta">
                Answers from approved records only. If the archive does not
                know, it says so.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>For Charlie</h2>
          <div className="btn-row">
            <Link className="btn btn-secondary" href="/share">
              Four share screens
            </Link>
            <Link className="btn btn-ghost" href="/steward/people">
              Steward People admin
            </Link>
          </div>
        </section>

        <p className="footer-note">
          Working domains: rootlinefamily.org / hutsonnorwood.org — equal
          billing Norwood plum #3D2A5C / Hutson teal #0E6E68.
        </p>
      </main>
    </>
  );
}
