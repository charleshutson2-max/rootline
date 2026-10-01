import Link from "next/link";
import { MemberTabBar } from "@/components/MemberTabBar";
import { LineChip, SampleChip } from "@/components/LineChip";
import { getPerson, stories } from "@/data/sample";
import { ProposeMemory } from "./ProposeMemory";

export const metadata = { title: "Stories" };

export default function StoriesPage() {
  return (
    <>
      <main className="rl-main">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">Archive</p>
            <h1>Stories</h1>
            <p className="meta">
              No invented biography. Propose a memory for Steward review.
            </p>
          </div>
          <Link className="btn btn-primary" href="/app/stories#record">
            Propose a memory
          </Link>
        </div>
        <div className="card-list" style={{ marginTop: "1.25rem" }}>
          {stories.length === 0 ? (
            <div className="empty">
              <h3>No approved stories yet</h3>
              <p>
                The official tree starts without fictional vignettes. Record a
                memory so elders’ voices stay in the house.
              </p>
            </div>
          ) : (
            stories.map((s) => {
              const person = getPerson(s.personId);
              return (
                <article className="card" key={s.id}>
                  <div className="chip-row">
                    {s.isSample ? <SampleChip /> : null}
                    <LineChip line={s.line} />
                  </div>
                  <h3>{s.title}</h3>
                  <p className="meta">
                    Linked to {person?.fullName ?? "Unknown"} ·{" "}
                    {s.status === "approved" ? "Approved" : "Pending"}
                  </p>
                  <p>{s.body}</p>
                </article>
              );
            })
          )}
        </div>
        <ProposeMemory />
        <div className="empty" style={{ marginTop: "1.5rem" }}>
          <h3>No Norwood voice notes yet</h3>
          <p>
            Empty states teach: record a memory so elders’ voices stay in the
            house. Voice upload arrives in a later slice — text proposals work
            now.
          </p>
          <Link className="btn btn-secondary" href="/app/ask">
            Ask about approved records
          </Link>
        </div>
      </main>
      <MemberTabBar active="stories" />
    </>
  );
}
