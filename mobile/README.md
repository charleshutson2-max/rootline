# ROOTLINE mobile (Flutter shell)

Minimal Flutter shell for **ROOTLINE** — The Hutson–Norwood living archive.

Mirrors member IA from the sibling Next.js app: **Tree | People | Stories | Ask | Me**, plus a Steward **Queue** stub.

> **Product docs source of truth:** [`../web`](../web) (Next.js) and [`../docs`](../docs) / [`../web/docs`](../web/docs).

## Official core

`lib/data/sample.dart` mirrors the web seed. These people are the Founding Steward’s core, not SAMPLE fiction: Carter II, Carol Anne, Carter III, Carla, Sondra, Haven, Sommer, Charlie (Founding Steward, privacy on), Derek, and Brenda. Unknown facts stay **Not yet known**.

Some screen copy in this slice still says SAMPLE (directory, stories, Ask, queue). That wording is leftover shell text. It does not reclassify the people above as fictional.

Honor gold (`#C6A15B`) is for honor marks only. Norwood plum and Hutson teal have equal billing.

## Prerequisites

- Flutter SDK (stable) on `PATH` (`flutter --version`).

- **Web:** Chrome or `web-server` (no extra SDK).
- **Android:** Android SDK / Studio (not installed in this box by default).
- **iOS:** Requires a Mac build pool / Xcode later — cannot build iOS archives on Linux.

## Run (web)

From this directory:

```bash
# Headless / CI-friendly web server
flutter run -d web-server --web-hostname 0.0.0.0 --web-port 8080

# Or Chrome if available
flutter run -d chrome
```

## Build web

```bash
flutter build web
# Output: build/web/
```

## Analyze

```bash
flutter analyze
```

## What’s in the shell

- Design tokens → `lib/theme/tokens.dart` / `app_theme.dart`
- Official core seed → `lib/data/sample.dart` (same people as `web/`)
- Bottom nav
- Person rings: plum (Norwood) / teal (Hutson) / split
- Ask chips: kinship / military / refuse living address (canned stubs, **no LLM**)
- Steward Queue from Me or app-bar inbox icon

## Gaps (intentional)

- No auth, Postgres, media, GEDCOM, or live Ask RAG
- Steward routes beyond Queue (claims, merges, exports, roles, public) are web-only for now
- `android/` and `ios/` platform folders are not in this repository yet
- Elder large-type toggle is a stub switch
