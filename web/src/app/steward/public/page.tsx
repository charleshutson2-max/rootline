import { StewardNav } from "@/components/StewardNav";
import { PublicClient } from "./PublicClient";

export const metadata = { title: "Public site" };

export default function PublicTogglesPage() {
  return (
    <main className="rl-main rl-main--narrow rl-main--steward">
      <StewardNav active="public" />
      <p className="eyebrow">Steward desk</p>
      <h1>Public-site toggles</h1>
      <p className="lede">
        Visitors see the marketing front door. Optional public Honor Roll and
        Public History Mode stay off until a Steward enables them.
      </p>
      <PublicClient />
    </main>
  );
}
