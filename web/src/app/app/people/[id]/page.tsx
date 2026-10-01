import { MemberTabBar } from "@/components/MemberTabBar";
import { peopleList, getPerson } from "@/data/sample";
import { PersonProfile } from "./PersonProfile";

export function generateStaticParams() {
  return peopleList.map((p) => ({ id: p.id }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = getPerson(id);
  return {
    title: person
      ? person.isSample
        ? `${person.fullName} (SAMPLE)`
        : person.fullName
      : "Person",
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <main className="rl-main">
        <PersonProfile id={id} />
      </main>
      <MemberTabBar active="people" />
    </>
  );
}
