import { StewardNav } from "@/components/StewardNav";
import { MergeClient } from "./MergeClient";

export const metadata = { title: "Merges" };

export default function MergesPage() {
  return (
    <main className="rl-main rl-main--narrow rl-main--steward">
      <StewardNav active="merges" />
      <p className="eyebrow">Steward desk</p>
      <h1>Merge tool</h1>
      <p className="lede">
        Preview a duplicate merge. Nothing is written to a database in this
        slice — reason is required before a later slice can apply it.
      </p>
      <MergeClient />
    </main>
  );
}
