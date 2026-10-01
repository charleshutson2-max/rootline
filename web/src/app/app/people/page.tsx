import { MemberTabBar } from "@/components/MemberTabBar";
import { peopleList } from "@/data/sample";
import { PeopleDirectory } from "./PeopleDirectory";

export const metadata = { title: "People" };

export default function PeoplePage() {
  return (
    <>
      <main className="rl-main">
        <p className="eyebrow">Directory</p>
        <h1>People</h1>
        <p className="meta" style={{ marginBottom: "1rem" }}>
          Official Hutson–Norwood core · equal Norwood / Hutson billing. Unknown
          fields stay “Not yet known.”
        </p>
        <PeopleDirectory people={peopleList} />
      </main>
      <MemberTabBar active="people" />
    </>
  );
}
