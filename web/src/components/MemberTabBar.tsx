import type { ReactNode } from "react";
import Link from "next/link";

const tabs = [
  { id: "tree", label: "Tree", href: "/app/tree" },
  { id: "people", label: "People", href: "/app/people" },
  { id: "stories", label: "Stories", href: "/app/stories" },
  { id: "ask", label: "Ask", href: "/app/ask" },
  { id: "me", label: "Me", href: "/app/me" },
] as const;

const icons: Record<string, ReactNode> = {
  tree: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v18M8 8l4-4 4 4M7 14l5-3 5 3M6 20h12" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5M14 14c2.5 0 5 1.5 5 4" />
    </svg>
  ),
  stories: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z" />
      <path d="M8 4v13" />
    </svg>
  ),
  ask: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18l-1 3 3-1h9a4 4 0 004-4V8a4 4 0 00-4-4H8a4 4 0 00-4 4v8a4 4 0 002 3z" />
      <path d="M9 10h.01M12 10h.01M15 10h.01" />
    </svg>
  ),
  me: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  ),
};

export function MemberTabBar({ active }: { active: (typeof tabs)[number]["id"] }) {
  return (
    <nav className="rl-tabbar" aria-label="Member tabs">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          className={`rl-tab${active === t.id ? " is-active" : ""}`}
          aria-current={active === t.id ? "page" : undefined}
        >
          {icons[t.id]}
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
