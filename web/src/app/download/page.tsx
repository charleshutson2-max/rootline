import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Download" };

export default function DownloadPage() {
  return (
    <>
      <SiteHeader />
      <main className="rl-main">
        <p className="eyebrow">Get Rootline</p>
        <h1>Download or open in browser</h1>
        <p className="lede">
          Anyone may create an account. Living-family records stay private until
          a Steward approves membership.
        </p>
        <div className="grid-2" style={{ margin: "1.5rem 0" }}>
          <div className="card">
            <h3>iOS</h3>
            <p className="meta">App Store link — placeholder until launch.</p>
            <button
              className="btn btn-primary"
              type="button"
              disabled
              style={{ opacity: 0.55, marginTop: "1rem" }}
            >
              App Store (soon)
            </button>
          </div>
          <div className="card">
            <h3>Android</h3>
            <p className="meta">Play Store link — placeholder until launch.</p>
            <button
              className="btn btn-primary"
              type="button"
              disabled
              style={{ opacity: 0.55, marginTop: "1rem" }}
            >
              Google Play (soon)
            </button>
          </div>
          <div className="card">
            <h3>Web app</h3>
            <p className="meta">
              First-class longevity path — full member experience in the
              browser. Installable as a PWA when ready.
            </p>
            <Link
              className="btn btn-secondary"
              href="/app/tree"
              style={{ marginTop: "1rem" }}
            >
              Open web app
            </Link>
          </div>
          <div className="card">
            <h3>Request access</h3>
            <p className="meta">
              No invite yet? File a relationship claim for Steward review.
            </p>
            <Link
              className="btn btn-ghost"
              href="/membership"
              style={{ marginTop: "1rem" }}
            >
              Request access
            </Link>
          </div>
        </div>
        <div className="notice">
          <strong>Privacy:</strong> The public site never shows living people’s
          private photos or addresses.
        </div>
      </main>
    </>
  );
}
