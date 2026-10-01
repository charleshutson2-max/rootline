import { StewardNav } from "@/components/StewardNav";
import { ClaimsClient } from "./ClaimsClient";

export const metadata = { title: "Member claims" };

export default function ClaimsPage() {
  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="claims" />
      <p className="eyebrow">Steward desk</p>
      <h1>Member claims</h1>
      <p className="meta">
        Path B relationship claims. Approve / request changes / decline with
        reason. Nobody sees living records until approved.
      </p>
      <ClaimsClient />
    </main>
  );
}
