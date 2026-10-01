import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { LineChip, PrivacyChip } from "@/components/LineChip";
import { MemberTabBar } from "@/components/MemberTabBar";
import { SiteHeader } from "@/components/SiteHeader";
import { people } from "@/data/sample";

export const metadata = { title: "Haven & Charlie" };

export default function CoupleSharePage() {
  const haven = people.haven;
  const charlie = people.charlie;
  const ii = people["carter-ii"];
  const carol = people["carol-anne"];

  return (
    <>
      <SiteHeader />
      <main className="rl-main">
        <p className="eyebrow">Share profile · Hutson–Norwood bridge</p>
        <h1>Haven &amp; Charlie</h1>
        <p className="lede">
          Haven Nicole Norwood and Charles Sepe Tiaraju Hutson — legally
          married. Founding Steward voice with equal Norwood / Hutson billing.
        </p>

        <div className="couple-share-grid">
          <div className="card couple-half norwood-wash">
            <div className="chip-row">
              <LineChip line={haven.line} />
              {haven.privacyOn ? <PrivacyChip /> : null}
            </div>
            <Avatar initials={haven.initials} line={haven.line} size={72} />
            <h2>{haven.fullName}</h2>
            <p className="meta">{haven.yearsDisplay} · Norwood line</p>
            <p className="meta">{haven.roleNote}</p>
            <Link className="btn btn-ghost" href={`/app/people/${haven.id}`}>
              Full profile
            </Link>
          </div>
          <div className="card couple-half hutson-wash">
            <div className="chip-row">
              <LineChip line={charlie.line} />
              {charlie.privacyOn ? <PrivacyChip /> : null}
            </div>
            <Avatar initials={charlie.initials} line={charlie.line} size={72} />
            <h2>{charlie.fullName}</h2>
            <p className="meta">
              {charlie.yearsDisplay} · {charlie.placeDisplay} · Hutson line
            </p>
            <p className="meta">{charlie.roleNote}</p>
            <Link className="btn btn-ghost" href={`/app/people/${charlie.id}`}>
              Full profile
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Also in this generation’s parents</h2>
          <div className="grid-2">
            <Link className="card" href={`/app/people/${ii.id}`}>
              <div className="chip-row">
                <LineChip line={ii.line} />
                {ii.privacyOn ? <PrivacyChip /> : null}
              </div>
              <h3>{ii.fullName}</h3>
              <p className="meta">{ii.roleNote}</p>
            </Link>
            <Link className="card" href={`/app/people/${carol.id}`}>
              <div className="chip-row">
                <LineChip line={carol.line} />
              </div>
              <h3>{carol.fullName}</h3>
              <p className="meta">
                Deceased {carol.deathDisplay} · late wife of Carter II
              </p>
            </Link>
          </div>
        </section>

        <div className="btn-row">
          <Link className="btn btn-primary" href="/app/tree">
            Open tree
          </Link>
          <Link className="btn btn-secondary" href="/share">
            All share screens
          </Link>
        </div>
      </main>
      <MemberTabBar active="people" />
    </>
  );
}
