import { SiteHeader } from "@/components/SiteHeader";
import { MembershipForms } from "./MembershipForms";

export const metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <>
      <SiteHeader />
      <main className="rl-main rl-main--narrow">
        <p className="eyebrow">Join The Hutson–Norwood Tree</p>
        <h1>Membership</h1>
        <p className="lede">
          Path A: invite code from a Member or Steward. Path B: relationship
          claim. You will not see living records until a Steward approves.
        </p>
        <MembershipForms />
        <p className="meta" style={{ marginTop: "1rem" }}>
          Until approved: mission teaser only — no living-family peek. Auth is
          stubbed in this slice; forms stay on-device.
        </p>
      </main>
    </>
  );
}
