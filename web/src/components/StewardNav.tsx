import Link from "next/link";

const links = [
  { id: "people", label: "People", href: "/steward/people" },
  { id: "queue", label: "Queue", href: "/steward/queue" },
  { id: "claims", label: "Claims", href: "/steward/claims" },
  { id: "audit", label: "Audit", href: "/steward/audit" },
  { id: "merges", label: "Merges", href: "/steward/merges" },
  { id: "exports", label: "Exports", href: "/steward/exports" },
  { id: "roles", label: "Roles", href: "/steward/roles" },
  { id: "public", label: "Public site", href: "/steward/public" },
] as const;

export function StewardNav({
  active,
}: {
  active: (typeof links)[number]["id"];
}) {
  return (
    <nav className="rl-steward-nav" aria-label="Steward">
      {links.map((l) => (
        <Link
          key={l.id}
          href={l.href}
          className={active === l.id ? "is-active" : undefined}
          aria-current={active === l.id ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
