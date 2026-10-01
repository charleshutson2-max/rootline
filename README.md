# Rootline

Rootline is a private, long-lived family archive for the Hutson–Norwood family: a public front door, a member web app, and a Steward desk. Inside the product the tree is **The Hutson–Norwood Tree**. Norwood (plum) and Hutson (teal) have equal billing.

The primary app is the Next.js 15 project in `web/`. **Charlie Hutson** (Houston) is Founding Steward. The official core — Carter McGrew Norwood II, Carol Anne Norwood, Carter McGrew Norwood III, Sondra Yvonne Norwood, Haven Nicole Norwood, Sommer Michelle Norwood, Charlie, Carla Martine Norwood, Derek Moreno, and Brenda Parks — is real family data in this repo (`isSample: false` on those people). It is not the fictional SAMPLE archive.

Living people default to privacy on. Facts that are not yet known stay **Not yet known**.

A separate fictional SAMPLE set (Eleanor Mae Norwood, Samuel Hutson, Margaret Norwood Hutson) remains in code for design examples only. Those records are `isSample: true` and are hidden from the official tree. Demo queue items and the invite code `SAMPLE-JOIN` are labeled SAMPLE and are not biographies of the people above.

## Run the web app

Node.js 20+ and [pnpm](https://pnpm.io). From a fresh clone:

```bash
cd web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Share routes

| Path | Screen |
|------|--------|
| `/` | Marketing home |
| `/app/tree` | Family tree (official core) |
| `/share/couple` | Haven & Charlie couple share view |
| `/steward/people` | Steward People admin |

`/share` is an index of these four screens.

## Layout

- `web/` — Next.js 15 app (TypeScript, Tailwind CSS v4). Official seed: `web/src/data/sample.ts` and `web/data/tree.json`. Product docs are copied under `web/docs/` so this folder can stand alone.
- `docs/` — information architecture, design system, schema notes, steward runbook, and the rest of the product docs.
- `schema/001_init.sql` — Postgres DDL outline. The web app does not apply it yet.
- `design-tokens.css` — parchment, ink, Norwood plum, Hutson teal, honor gold.
- `preview/` — static brand and screen preview.
- `prototype/` — earlier HTML prototype.
- `mobile/` — Flutter slice: `lib/` and `pubspec.yaml` only. The archive did not include `android/` or `ios/` project folders, so this tree cannot produce store builds until those are added. The Dart seed lists the same official core as the web app. Some Flutter screen labels still say SAMPLE from an earlier shell.
- `rootline-brief.md` — product brief.

Auth, Postgres, media storage, and GEDCOM export are later slices. See `docs/08-implementation-plan.md`.

This repository does not include a JDK, an Android SDK, signing keys, environment files, or APK binaries.
