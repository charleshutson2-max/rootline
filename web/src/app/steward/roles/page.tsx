import { StewardNav } from "@/components/StewardNav";
import { people } from "@/data/sample";

export const metadata = { title: "Roles" };

export default function RolesPage() {
  const charlie = people.charlie;
  const haven = people.haven;

  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="roles" />
      <p className="eyebrow">Steward desk</p>
      <h1>Roles &amp; succession</h1>
      <p className="lede">
        Sole Steward for now: Charlie (Founding Steward). Minimum two living
        Stewards once launched past founding.
      </p>
      <div className="card-list">
        <div className="card">
          <div className="chip-row">
            <span className="chip chip-hutson">Hutson</span>
            <span className="chip chip-privacy">Privacy ON</span>
          </div>
          <h3>{charlie.fullName}</h3>
          <p className="meta">Founding Steward · Houston · Living</p>
        </div>
        <div className="card">
          <div className="chip-row">
            <span className="chip chip-norwood">Norwood</span>
          </div>
          <h3>{haven.fullName}</h3>
          <p className="meta">
            Spouse · Norwood-line co-voice · offerable as a Steward (not granted
            yet).
          </p>
        </div>
      </div>
      <section className="section">
        <h2>Successor list</h2>
        <div className="empty">
          <h3>No successors named</h3>
          <p>
            Name the next Stewards before the founding seat is the only key.
            Grant reason required when roles are real.
          </p>
        </div>
      </section>
      <section className="section">
        <h2>Longevity checklist</h2>
        <ul className="meta" style={{ lineHeight: 1.7 }}>
          <li>Legal owner for accounts (trust / LLC / nonprofit) — offline</li>
          <li>Domain, Apple, Google, hosting, DNS credentials stored with that entity</li>
          <li>2FA required for Stewards (later slice)</li>
          <li>Archive delete needs typed confirmation and a second Steward</li>
        </ul>
      </section>
    </main>
  );
}
