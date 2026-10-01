import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Share screens" };

const screens = [
  {
    href: "/",
    title: "Marketing home",
    blurb:
      "Public front door — equal billing for Norwood and Hutson, request access and download paths.",
  },
  {
    href: "/app/tree",
    title: "Family tree",
    blurb:
      "Official Norwood–Hutson core on the tree canvas. Click any person for their profile.",
  },
  {
    href: "/share/couple",
    title: "Strong profile · Haven & Charlie",
    blurb:
      "Couple / family share view for Haven Nicole Norwood and Charles Sepe Tiaraju Hutson (Founding Steward).",
  },
  {
    href: "/steward/people",
    title: "Steward People admin",
    blurb:
      "Founding Steward desk — list, create, edit people and relationships with audit reasons.",
  },
];

export default function ShareIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="rl-main">
        <p className="eyebrow">Demo pack</p>
        <h1>Four share-ready screens</h1>
        <p className="lede">
          Deep links for Charlie to open on the box preview. No SAMPLE banners
          on real family people.
        </p>
        <div className="card-list">
          {screens.map((s) => (
            <Link key={s.href} className="card person-card" href={s.href}>
              <div>
                <h3>{s.title}</h3>
                <p className="meta">{s.blurb}</p>
                <p className="meta" style={{ marginTop: "0.5rem" }}>
                  <code>{s.href}</code>
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="footer-note">
          Also see <code>/app/people/haven</code>,{" "}
          <code>/app/people/charlie</code>, and{" "}
          <code>/app/people/carter-ii</code> for individual strong profiles.
        </p>
      </main>
    </>
  );
}
