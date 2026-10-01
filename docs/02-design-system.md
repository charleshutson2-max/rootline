# ROOTLINE — Visual Design System

**Tone:** Warm, dignified, modern. Museum + product.  
**Not:** Dusty genealogy brown, startup-playful, cartoon trees.

Equal billing: Norwood plum and Hutson teal share visual weight across chrome, filters, Honor Roll, and search.

---

## 1. Color tokens

| Token | Hex | Role |
|-------|-----|------|
| `--rl-parchment` | `#F6F1EA` | Page background |
| `--rl-ink` | `#16121F` | Primary text |
| `--rl-plum` | `#3D2A5C` | **NORWOOD** — primary chrome, headers, primary buttons |
| `--rl-wisteria` | `#C9B6E4` | Norwood soft / chips / hover wash |
| `--rl-teal` | `#0E6E68` | **HUTSON** — secondary buttons, Hutson rings/chips |
| `--rl-sea-glass` | `#7EC8C3` | Hutson soft / chips / hover wash |
| `--rl-honor-gold` | `#C6A15B` | **Honor Roll / medals / notable only** — never general chrome |

### Supporting (derived, for UI polish)

| Token | Value | Role |
|-------|-------|------|
| `--rl-ink-muted` | `#16121F` at 68% opacity (or `#5C5668`) | Secondary text |
| `--rl-ink-subtle` | `#16121F` at 45% | Tertiary / empty labels |
| `--rl-surface` | `#FFFBF7` | Elevated cards on parchment |
| `--rl-border` | `#E4DCD0` | Dividers, card edges |
| `--rl-danger` | `#8B2E2E` | Decline / destructive (restrained, not neon) |
| `--rl-success` | `#2F5D4A` | Approved states |

### Color key (public + in-app)

- **Plum = Norwood**
- **Teal = Hutson**
- **Split plum/teal = both lines**
- **Gold = honor only**

---

## 2. Typography

| Use | Style | Notes |
|-----|-------|-------|
| Names & headlines | Elegant **serif** | Person names, page titles, Honor Roll titles, website hero |
| UI chrome | Clean **humanist sans** | Tabs, buttons, forms, Ask chat, Steward desk |
| Body | Humanist sans, comfortable measure | Stories; optional serif for long “letter” reading mode later |
| Elder large-type mode | Sans UI + serif names scaled ~125–140%; line-height ≥ 1.5 | Toggle in Me / system |

**Suggested stacks (implementation):**
- Serif: `"Source Serif 4", "Iowan Old Style", "Palatino Linotype", Palatino, "Times New Roman", serif`
- Sans: `"Source Sans 3", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif`

**Scale (rem @ 16px root):**
- Display / hero: 2.5–3rem serif  
- Page title: 1.75–2rem serif  
- Person name (card): 1.125–1.25rem serif  
- Section: 1.125rem sans semibold  
- Body: 1rem sans  
- Caption / meta: 0.875rem sans  
- Elder mode: multiply type scale by 1.25–1.4; tap targets still ≥ 44×44px

---

## 3. Tree rings

| Ring | Meaning |
|------|---------|
| **Plum** solid | Norwood line |
| **Teal** solid | Hutson line |
| **Split** plum/teal (half-and-half or vertical divide) | Both lines |
| **Gold mark** (medal / small badge on ring or card) | Honor / military / notable **only** |

Rules:
- Rings sit on portrait avatars and tree nodes (2–3px stroke on cards; slightly thicker on canvas).
- Never use gold as a fourth “line color.”
- Allied/other lines: ink-muted ring + “Allied” chip — not plum/teal/gold.
- Living vs deceased: same ring colors; deceased may show soft parchment vignette, not greyed-out disrespect.

---

## 4. Component specs

### 4.1 Buttons

| Variant | Background | Text | Border | Use |
|---------|------------|------|--------|-----|
| **Primary** | Plum `#3D2A5C` | Parchment `#F6F1EA` | none | Main CTAs (Request access, Approve, Submit proposal) |
| **Secondary** | Transparent / parchment | Teal `#0E6E68` | 1.5px teal | Secondary actions (Hutson-weighted, Cancel alternate, Filter) |
| **Tertiary / ghost** | Transparent | Ink | 1px border `#E4DCD0` | Low emphasis |
| **Honor** (rare) | Honor gold `#C6A15B` | Ink | none | “View Honor Roll” or award flows only — not every CTA |
| **Destructive** | Transparent | Danger | 1px danger | Decline / remove (confirm) |

- Min height: **44px**; padding 12×20; radius **8px** (product, not pill-startup).
- Hover: darken plum ~6% / teal wash with sea glass; focus ring: wisteria or sea glass 2px offset (WCAG visible).
- Disabled: 40% opacity; not recolored to grey-brown.

### 4.2 Chips / filters

- Height 32px (44px hit area with padding); radius 999px or 8px — prefer **8px** for museum calm.
- Line chips: Norwood = plum text on wisteria wash; Hutson = teal text on sea-glass wash; Both = split or dual chip; Honor = gold text/border on parchment (gold fill only when selected on Honor Roll).
- Honor Roll filter set: All, Military, Civic, Church, Educators, Firsts, Norwood, Hutson.

### 4.3 Person cards

```
┌─────────────────────────────────────────┐
│  [avatar + ring]  Name (serif)          │
│                   Meta: dates · place   │
│                   [Norwood] [Hutson]    │
│                   [★ honor gold medal]  │  ← only if honored
│                   Field: Not yet known  │  ← unknown state
└─────────────────────────────────────────┘
```

- Background: `--rl-surface`; border `--rl-border`; radius 12px; padding 16px.
- Avatar: 48–64px; ring 2.5px plum / teal / split.
- Honor: small gold medal glyph or ribbon mark — restrained, not cartoon.
- Living privacy: no address/social on card unless owner opted in and viewer authorized.

### 4.4 Empty states (teaching)

- Illustration: none or abstract parchment + single ring mark — **no cartoons**.
- Title (serif): short, calm.
- Body: teaches next action — e.g. *“No Norwood photos yet — record a memory.”*
- One primary button (plum) or secondary (teal) matching context.
- “Not yet known” for missing fields on profiles — valid state, not an error.

### 4.5 Elder large-type mode

- Toggle in **Me** (and respect OS font scaling).
- Increase base font; keep serif for names.
- Tap targets ≥ 44×44px; voice-first entry on Record memory and Ask.
- High contrast: ink on parchment; do not rely on gold-on-wisteria for text.

### 4.6 Forms & Steward desk

- Labels above fields; ink on parchment.
- Errors: danger text + border; never block without reason field for Steward decisions.
- Queue rows: type chip, SAMPLE name, age of proposal, actions Approve / Request changes / Decline.

### 4.7 Ask Rootline

- Chat bubbles: surface cards; citations as quiet links under answer.
- Refusal: plain — “The archive does not know yet” + File research request (secondary teal).

---

## 5. Accessibility (WCAG AA)

| Requirement | Spec |
|-------------|------|
| Contrast | Ink on parchment ≥ 7:1 (AAA for body); plum/parchment and teal/parchment buttons checked for AA (≥ 4.5:1 text) |
| Focus | Visible 2px focus ring (wisteria or sea glass); never remove outline without replacement |
| Targets | Min 44×44px |
| Screen readers | Labels on tabs, rings (“Norwood line”), honor medals (“Military honor”), buttons |
| Media | Captions on audio; transcripts for voice memories |
| Motion | Prefer reduced-motion: no decorative tree sway |
| Large type | Elder mode + OS scaling |

**Gold caution:** Honor gold on parchment for large text needs bold weight or ink companion label; do not use gold-on-wisteria for small text.

---

## 6. Tone guidance (copy + UI)

| Do | Don’t |
|----|-------|
| Warm, dignified, modern | Dusty “genealogy brown” nostalgia kitsch |
| Museum + product clarity | Startup playful / gamified likes |
| “Not yet known” | Fake completeness or invented dates |
| Teach in empty states | Blame the user for sparse archives |
| Equal Norwood / Hutson billing | Treat Norwood as a footnote |
| SAMPLE labels until confirmed | Invent real family biography |
| Memories, not a feed | Likes-as-popularity |

Website home headline option: **“Two families. One living archive.”**

---

## 7. Token file

Canonical CSS variables: `/workspace/rootline/design-tokens.css`  
Preview: `/workspace/rootline/preview/index.html`

---

*Document B of Rootline deliverables. Gold is honor-only.*
