import { ColorKey } from "@/components/ColorKey";
import { MemberTabBar } from "@/components/MemberTabBar";
import { TreeCanvas } from "./TreeCanvas";

export const metadata = { title: "Tree" };

export default function TreePage() {
  return (
    <>
      <main className="rl-main rl-main--wide">
        <p className="eyebrow">The Hutson–Norwood Tree</p>
        <h1>Tree canvas</h1>
        <p className="meta">
          Official core from Founding Steward facts. Click a person to open their
          profile. Filters treat Norwood and Hutson equally.
        </p>
        <TreeCanvas />
        <ColorKey />
      </main>
      <MemberTabBar active="tree" />
    </>
  );
}
