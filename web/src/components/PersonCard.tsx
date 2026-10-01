import Link from "next/link";
import type { Person } from "@/data/sample";
import { Avatar } from "./Avatar";
import { HonorChip, LineChip, PrivacyChip, SampleChip } from "./LineChip";

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link className="card person-card" href={`/app/people/${person.id}`}>
      <Avatar
        initials={person.initials}
        line={person.line}
        honor={Boolean(person.honor)}
      />
      <div>
        <div className="chip-row">
          {person.isSample ? <SampleChip /> : null}
          <LineChip line={person.line} />
          {person.honor ? (
            <HonorChip category={person.honor.category} title={person.honor.title} />
          ) : null}
          {person.privacyOn ? <PrivacyChip /> : null}
        </div>
        <h3>{person.fullName}</h3>
        <p className="meta">
          {person.yearsDisplay}
          {person.placeDisplay && person.placeDisplay !== "Not yet known"
            ? ` · ${person.placeDisplay}`
            : ""}
          {person.honor?.category === "military" ? ` · ${person.honor.title}` : ""}
          {person.migration ? ` · Migration: ${person.migration}` : ""}
          {person.roleNote ? ` · ${person.roleNote}` : ""}
        </p>
      </div>
    </Link>
  );
}
