import { MemberTabBar } from "@/components/MemberTabBar";
import { MeClient } from "./MeClient";

export const metadata = { title: "Me · Privacy" };

export default function MePage() {
  return (
    <>
      <main className="rl-main">
        <p className="eyebrow">Living profile owner</p>
        <h1>Me · Privacy</h1>
        <MeClient />
      </main>
      <MemberTabBar active="me" />
    </>
  );
}
