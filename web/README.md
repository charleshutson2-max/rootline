# Rootline web (slice 1)

First implementation slice of **Rootline** — The Hutson–Norwood living archive.

Next.js App Router · TypeScript · Tailwind CSS v4 · PWA-ready shell.

This is **not** the finished product. Auth, Postgres, media, GEDCOM, and Ask Rootline RAG come in later slices (see `docs/08-implementation-plan.md`). Official people are the Founding Steward’s Norwood–Hutson core; Steward edits persist via localStorage + `data/tree.json`.

## Official core

- Carter McGrew Norwood II (living, widowed) · Carol Anne Norwood (deceased May 16, 2024)
- Children: Carter McGrew Norwood III, Carla Martine Norwood
- III ═ Sondra Yvonne Norwood → Haven Nicole Norwood, Sommer Michelle Norwood
- Haven ═ Charles Sepe Tiaraju Hutson (Founding Steward) · Sommer engaged to Derek Moreno
- Sondra’s mother: Brenda Parks (deceased, DOD Not yet known)

Living people default **privacy ON**. Unknown facts display **“Not yet known.”** Gold (`#C6A15B`) is used only for honor marks. Norwood (plum) and Hutson (teal) share equal billing.

Do not scrape living people from the public internet into this tree.

## Run

Requires Node 20+ and [pnpm](https://pnpm.io) (npm also works if you install from `package.json`).

```bash
cd web   # this directory: rootline/web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production-style check:

```bash
pnpm build
pnpm start
```

## Routes

| Path | What |
|------|------|
| `/` | Marketing home |
| `/download` | App Store / Play placeholders + open web app |
| `/membership` | Request access (Path B) + invite code (Path A, try `SAMPLE-JOIN`) |
| `/app/tree` | Tree canvas with line filters |
| `/app/people` | Directory, search, Norwood / Hutson / both / honor filters |
| `/app/people/[id]` | Person profile (e.g. `haven`, `charlie`, `carter-ii`) |
| `/steward/people` | Steward People admin |
| `/share` | Four share-screen index |
| `/share/couple` | Haven & Charlie couple share view |
| `/app/stories` | SAMPLE stories + teaching empty state |
| `/app/ask` | Ask Rootline keyword answers + refusal |
| `/app/me` | Living privacy toggles + elder large-type |
| `/steward/queue` | Approval queue (reason required) |
| `/steward/claims` | Membership claims |
| `/steward/merges` | Merge preview |
| `/steward/exports` | Export kinds (disabled until later) |
| `/steward/roles` | Roles, open Norwood co-voice seat, succession empty state |
| `/steward/public` | Public Honor Roll + Public History Mode (default OFF) |

## Repo layout inside this app

- `src/data/sample.ts` — typed SAMPLE seed
- `src/styles/design-tokens.css` — plum / teal / parchment / ink / honor gold
- `docs/` — product docs copied so this folder can be pushed alone
- `schema/001_init.sql` — Postgres DDL (not applied yet)

## Later slices

Week 1+ in `docs/08-implementation-plan.md`: magic-link auth, Steward 2FA, Postgres from `schema/001_init.sql`, then claims, graph, tree API, queue persistence, media, GEDCOM, and Ask Rootline last.
