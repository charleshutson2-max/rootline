import { StewardNav } from "@/components/StewardNav";
import { AuditClient } from "./AuditClient";

export const metadata = { title: "Audit log" };

export default function AuditPage() {
  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="audit" />
      <p className="eyebrow">Steward desk</p>
      <h1>Audit log</h1>
      <p className="meta">
        Append-only SAMPLE session trail — actor, action, reason, timestamp.
        Postgres audit_events comes later.
      </p>
      <AuditClient />
    </main>
  );
}
