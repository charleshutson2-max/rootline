import { MemberTabBar } from "@/components/MemberTabBar";
import { AskClient } from "./AskClient";

export const metadata = { title: "Ask Rootline" };

export default function AskPage() {
  return (
    <>
      <main className="rl-main">
        <p className="eyebrow">AI · Approved records only</p>
        <h1>Ask Rootline</h1>
        <p className="meta">
          Deterministic retrieval over approved SAMPLE records — no external LLM.
          Never invents ancestors, dates, or ranks. Unknown → refuse + File a
          research request.
        </p>
        <AskClient />
      </main>
      <MemberTabBar active="ask" />
    </>
  );
}
