import { StewardNav } from "@/components/StewardNav";
import { QueueClient } from "./QueueClient";

export const metadata = { title: "Approval queue" };

export default function QueuePage() {
  return (
    <main className="rl-main rl-main--wide rl-main--steward">
      <StewardNav active="queue" />
      <p className="eyebrow">Steward desk</p>
      <h1>Approval queue</h1>
      <p className="meta">
        Every approval leaves an audit reason. Members propose; Stewards approve.
      </p>
      <QueueClient />
    </main>
  );
}
