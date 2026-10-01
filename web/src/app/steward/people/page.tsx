import { StewardNav } from "@/components/StewardNav";
import { PeopleAdmin } from "./PeopleAdmin";

export const metadata = { title: "People admin" };

export default function StewardPeoplePage() {
  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="people" />
      <p className="eyebrow">Steward desk · Founding Steward</p>
      <h1>People</h1>
      <p className="lede">
        Edit the official Hutson–Norwood core. Every change needs an audit
        reason. Edits persist in this browser and on disk under{" "}
        <code>web/data/tree.json</code>.
      </p>
      <PeopleAdmin />
    </main>
  );
}
