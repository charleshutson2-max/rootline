import { StewardNav } from "@/components/StewardNav";

export const metadata = { title: "Exports" };

export default function ExportsPage() {
  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="exports" />
      <p className="eyebrow">Steward desk</p>
      <h1>Exports</h1>
      <p className="lede">
        Longevity path: GEDCOM, media bundle, and a printable book of the
        family. Jobs are not wired yet — this desk shows the planned kinds.
      </p>
      <div className="card-list">
        <div className="card">
          <h3>GEDCOM</h3>
          <p className="meta">Approved people, relationships, and facts. Week 6 slice.</p>
          <button className="btn btn-ghost" type="button" disabled>
            Queue GEDCOM (later)
          </button>
        </div>
        <div className="card">
          <h3>Media bundle</h3>
          <p className="meta">Originals kept; display derivatives later.</p>
          <button className="btn btn-ghost" type="button" disabled>
            Queue media bundle (later)
          </button>
        </div>
        <div className="card">
          <h3>PDF book of the family</h3>
          <p className="meta">Printable archive. Scheduled monthly reminder default.</p>
          <button className="btn btn-ghost" type="button" disabled>
            Queue PDF (later)
          </button>
        </div>
      </div>
      <div className="notice" style={{ marginTop: "1.25rem" }}>
        Multi-location backup reminder for Stewards. Credentials for domain,
        Apple, Google, hosting, and DNS belong in a family trust / LLC /
        nonprofit — checklist lives on Roles.
      </div>
    </main>
  );
}
