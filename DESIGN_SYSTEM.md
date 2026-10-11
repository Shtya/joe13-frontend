# JOE13 Black & Silver: design system

This is the master reference for the JOE13 site. The home page slider is the first full implementation. Every new or redesigned component should be built from what's here, and anything new should be added here.

> **Status:** the palette below is a *proposal pending approval*. It's applied to the home page only. Once it's approved, roll it out to other pages through the same tokens.

**Concept: polished metal on black.** JOE13 is presented as a precision instrument. The ground is deep, neutral black. Silver is the material: lines, type and controls look machined, and light only appears where something is *live* (a glint, a specular highlight, a travelling pulse). There's no colour accent, and hierarchy comes from contrast, weight and light.

| Where | What |
| --- | --- |
| `style/joe-system.css` | Tokens (`--jx-*`), primitives (`.jx-*`), hero aperture and chrome wordmark, the reveal contract, the scan transition, and the slide rail (scoped to `.jx-home`) |
| `components/jx/motion.js` | GSAP motion system (`useSceneMotion`, patterns) |
| `components/jx/primitives.jsx` | `JxScene`, `JxHeading`, `JxTag`, `JxButton`, copy helpers, slider navigation |
| `components/jx/UnitScene.jsx` | Shared composition for the six business-unit slides |
| `components/jx/UnitParts.jsx` | `FeatureRail`, `UnitLocator` |
| `components/jx/JxDossier.jsx` | Services overlay (the popup) |
| `components/jx/Glyphs.jsx` | Line-art glyph per business unit |
| `components/pages/home/Section*.jsx` | The 10 home slides |

---

## 1. Color

### Black ladder
| Token | Hex | Role |
| --- | --- | --- |
| `--jx-ink` | `#050506` | Page ground. Neutral-cool, never `#000` under imagery |
| `--jx-onyx` | `#0B0C0E` | Surfaces, panels |
| `--jx-graphite` | `#16181B` | Raised and hover surfaces |
| `--jx-gunmetal` | `#2B2E33` | Strong structure lines, pressed states |

### Silver ladder
| Token | Hex | Role |
| --- | --- | --- |
| `--jx-steel` | `#8C9199` | Muted metal: tertiary text, inactive marks |
| `--jx-silver` | `#C7CBD1` | The metal: lines, icons, tags, secondary text |
| `--jx-platinum` | `#EEF0F3` | Primary text, focus ring |
| `--jx-glint` | `#FFFFFF` | **Live state only**: current slide or unit, active node, light pulses |

### Metal gradients (the only gradients allowed)
| Token | Use |
| --- | --- |
| `--jx-chrome` | Text chrome (`.jx-accent`): the charged headline line and key numerals |
| `--jx-brushed` | Brushed-metal fill: primary buttons, hovered icon rings |
| `--jx-chrome-soft` | Soft vertical metal for future badges and large surfaces |
| `--jx-ink-fade` | Fading content into the ground |

Semantic aliases: `--jx-text` / `--jx-text-2` (74%) / `--jx-text-3` (52%), `--jx-line` (16% silver), `--jx-line-strong` (34%), `--jx-surface`, `--jx-surface-strong`, `--jx-focus`.

**Rules**
- Don't use blue or any other hue as an accent. The only colour on the page comes from content the brand doesn't control (partner logos on hover, the WhatsApp button).
- Glint appears at most a few times per screen. If everything glows, nothing does.
- **Photography is toned into the palette**: `grayscale(.82) contrast(1.08) brightness(.92)`, then a light ink veil plus a directional reading shade (`JxScene shade="start" | "center"`). Text always sits in a shaded zone.
- **Light theme.** `data-theme="light"` on a container remaps the semantic tokens (paper ground, ink text). It's for future content pages and forms, not the home slider.

## 2. Typography

| Role | Family | Why |
| --- | --- | --- |
| Arabic: display and text (`[dir=rtl]`) | **Almarai** (`--font-almarai`: 300 / 400 / 700 / 800) | Clean, balanced and widely used by Saudi brands. It holds up at 800 for headlines and stays crisp for body text on black. It was chosen after a side-by-side test on black against Tajawal, Noto Kufi, Noto Sans Arabic, Vazirmatn and Alexandria |
| Latin display (`.jx-display`) | **Alexandria** (`--font-alexandria`) | Geometric, echoes the square wordmark |
| Latin text (`.jx`) | **Inter** (`--font-inter`) | Neutral, legible |

The fonts are switched per direction through `--jx-font-display` / `--jx-font` in `style/joe-system.css`, so changing a font is a one-line edit. Almarai has no 500/600 weights, so use 400 / 700 / 800.

| Token | Range | Use |
| --- | --- | --- |
| `--jx-fs-mega` | 50→144px | One-word slide titles (`variant="mega"`) |
| `--jx-fs-5xl` | 40→84px | Short titles (lines of 14 characters or fewer) |
| `--jx-fs-4xl` | 35→64px | Longer titles, dossier title |
| `--jx-fs-3xl` | 30→48px | Titles above dense content |
| `--jx-fs-xl` / `lg` / `md` / `sm` | 27 / 21 / 17 / 14px (upper bounds) | Lede / body / small body / tags |

- In Tailwind, always write sizes as `text-[length:var(--jx-fs-*)]` (without `length:` the value is read as a color).
- **Arabic rules:** no letter-spacing (it breaks the joins, so it's enforced globally under `[dir=rtl] .jx`). Display line-height is 1.18 and body line-height is 1.8. Body text uses weight 400.
- **Headline grammar** (`JxHeading` + `splitTitle`): two lines split at a comma, `&`, "and" or "و", with the conjunction opening line 2. Line 1 is `light` (300) and the last line is `accent` (700 plus chrome). A single line is the accent. Never colour single words.
- **Tags** (`JxTag`) are sentence case with a glint dot. A list of single words gets hairline separators. A sentence that the CMS split into words is joined back automatically.

## 3. Space, shape, depth
- Space uses a 4px base: `--jx-s-1…9`. Gutter: `--jx-gutter` (20→112px).
- The slide rail is pinned to the **physical right** edge, and `.jx-scene-body` reserves `--jx-rail-safe` there.
- Radius scales with hierarchy: `hair` 2 / `sm` 8 / `md` 14 / `lg` 22 / `pill`.
- Depth tokens: `--jx-shadow-metal` (machined bevel), `--jx-shadow-panel`, `--jx-glow-sm`/`md` (white light, hover only), `--jx-glint-glow`.
- **Lines over cards.** Content sits on hairlines (feature rail, stats readout, services index). Only overlays get a full surface.

## 4. Components

**`JxButton`** is a brushed-metal capsule with an ink orb holding the icon.
- `primary` (brushed silver, ink text) is the one main action per screen.
- `ghost` (black glass on a silver hairline) is for secondary actions.
- On hover, a specular band sweeps across the metal and the orb nudges in the direction of travel (it rotates for `plus`).
- `icon`: `arrow` (navigate) | `plus` (open more in place) | `download`.

**`JxScene`** stacks these layers: toned photo (parallax, slow Ken Burns while active) → ink veil and reading shade → grain → glyph (with an ink halo) → body → optional `overlay` (above everything, for example the hero aperture).

**Hero lockup (slide 1).** A nameplate (what we are, 400, silver, between hairlines that stretch outward) sits over a statement (the proof, 700). The statement's number is a chrome numeral (800, 1.45em) that counts up.

**Chrome wordmark on a black mirror.** The logo is rendered three times: the image itself, a mask layer with a glint that sweeps every 7.5s, and a mask layer with a specular highlight that follows the pointer (`--jx-px/--jx-py`). It stands on a mirror:
- `.jx-stagelight`: a soft light behind the logo.
- `.jx-horizon` / `.jx-floor`: a silver horizon line that stretches out from the centre, with `.jx-floor-bead`, a slow travelling glint.
- `.jx-reflection`: a faint mirrored logo.

**Stats readout (slide 2).** Chrome numerals hang above nodes on an orbital arc. A pulse of light travels the arc, and the nodes ignite in sequence (`igniteNodes`). On phones it becomes a two-column readout on hairlines.

**Partners runway (slide 3).** Marks sit in 300×150 ledger cells on a plane tilted into depth, in two counter-moving lanes. They're monochrome silver and brighten with a glow on hover, and a lane pauses on hover. On entry the plane swings down from vertical and the lanes slide in from opposite sides (`landRunway`).

**Hub (slide 4).** JOE13 sits at the centre with its units as satellites, under a radar sweep (`.jx-radar`).
- On entry, the satellites launch from the core out to their orbit, one after another (`launchSatellites`).
- Hovering or focusing a unit lights its spoke, and clicking flies to that slide.
- Below `lg` it becomes a rail list.

**`FeatureRail`.** Four capabilities on a light rail. Icons are 64→80px, toned to silver chrome, and brighten and lift on hover. The hairline charges with light on hover.

**`UnitLocator`.** A mini orbit of the six units with the current one as a glint, followed by "Unit n of 6".

**`JxDossier` (popup).**
- It's a full-screen black stage that opens as an **iris from the button that was pressed**, with a silver ring bursting at that point.
- The start column holds the tag, a three-line title (`fullService` / **unit** / `solutions`), the lede and a chrome count of services. The unit's glyph draws in the corner.
- The end column is the services index on hairlines, with silver line icons in rings that turn to brushed metal on hover. It uses two columns when there are more than 8 items.
- It closes by collapsing back into the button. Esc works, Tab stays inside, the close button is focused on open and focus returns afterwards. The slider is frozen while it's open.

**Glyphs.** Line art in platinum light. Tones are `main` (100%), `mid` (75%) and `dim` (40%), with a stroke width of `--jx-sw` (1.25, raised on small canvases; never use `non-scaling-stroke`).
- Entrance: **bloom** (blur and scale) → **draw** → **pop** nodes.
- After that, each glyph has a behaviour that fits its subject. Behaviours run only while the slide is visible (`.jx-loop`), and origins are set with `--ox/--oy` in viewBox units:

| Unit | Behaviour | Class |
| --- | --- | --- |
| Marketing | Signal waves radiate from the source | `.jx-emit` |
| Software & AI | Neurons fire across the network, with data pulses on the links | `.jx-fire` + `.jx-comet` |
| Telecoms | Rings ripple out from the mast | `.jx-emit` |
| Manpower & HR | The circles of people sway together around a shared centre | `.jx-sway` |
| Events | The spotlight sweeps the stage | `.jx-sway` (around the apex) |
| Products | The inner cube levitates | `.jx-float` |

**Footer** (`components/molecules/Footer.jsx`, site-wide).
- An invitation band: tag, chrome headline, a brushed contact button and a ghost WhatsApp button.
- A directory below it: brand column (logo, description, silver social rings), products, services (expandable), and contact rows with line icons, plus branch chips.
- A signature bar: copyright, "connect — create — grow", and a back-to-top button (on the home slider it returns to slide 1).
- A faint oversized wordmark rests at the bottom.

**Side menu** (`components/molecules/Navbar.jsx` drawer, site-wide).
- A black-glass panel with the logo at the top and 48px rows with silver icons. The active page gets a glint bar and bold text.
- Submenus open inline as an accordion. Rows stagger in when the menu opens.
- At the bottom: a brushed-metal "Have a project in mind?" card, social rings and the tagline.

**Projects** (`app/[locale]/projects/*`, `components/jx/projects/*`). These are scrolling pages: wrap them in `.jx-page` so ambient loops always run, and use `useViewMotion` so each section plays its entrance when it scrolls into view.
- **Index hero:**
  - Chrome title with `weightMorph` (a light sweep, plus a weight morph on variable fonts).
  - A stats readout on hairlines with counting chrome numerals.
  - Brushed and ghost actions.
  - **`ProjectDeck`**, the signature: featured projects as plates fanned back into 3D depth. It auto-advances with a countdown hairline, pauses on hover or focus, supports arrow keys, and the front plate is the link. The deck is "dealt" in on entry.
- **`ProjectArchive`:**
  - A rail of departments with counts, where a brushed-metal indicator slides to the active filter.
  - Changing the filter re-deals the grid, and "show more" adds nine at a time.
- **`ProjectCard`:** a cinematic plate. The photo rests toned to silver and comes to life on hover (colour and slow zoom). A specular band crosses the card and the action orb turns to metal. It shows a department chip and a photo count.
- **Detail hero:** the project's photo becomes an **aura** (`JxScene aura`: heavy blur and darkening), while the sharp photo lives in the gallery. It holds the breadcrumb, chrome title, chips, actions and a value readout.
- **`ProjectGallery`:**
  - The frame unveils from its centre, the same gesture as the home wordmark.
  - Photos crossfade with a drift and a countdown hairline, with play/pause and thumbnails.
  - The full-screen viewer supports ← → and Esc, swipe, a focus trap and focus return.
- **About:** the full story (the first paragraph larger) beside a fixed info panel.
- **Related:** three projects from the same department, chosen on the server in `pickRelated`.

**Shades:** besides `start` and `center`, there's `deep`, for bright or busy photography such as white desks.

**`JxArchive`** (`components/jx/JxArchive.jsx`) is any filterable collection: tag and chrome title, a **`FilterRail`** (brushed indicator sliding between options with counts), a grid that re-deals its cards on every change, and "show more". It's used by projects and blogs, and cards must have a `[data-card]` root.

**Blog** (`app/[locale]/blogs/*`, `components/jx/blogs/*`):
- **Index hero:** chrome title, plus the **cover story** (the latest article) "printed" in with a wipe from the reading edge while its photo settles. Below it, an index of the next three stories with thumbnail, date and reading time.
- **`BlogCard`:** an editorial plate (photo toned to silver that comes alive on hover) with a dateline (date — reading time), headline, standfirst and a byline on a hairline.
- **Article:**
  - Editorial header over the cover's aura (centred breadcrumb, chrome headline, byline with author · date · reading time · views, and tags). The cover rises out of the page.
  - The body is a 68ch column whose first paragraph is set larger. Plain-text CMS bodies are split on blank lines; HTML bodies use `.jx-prose`.
  - A sticky **`ShareBar`** offers copy link, WhatsApp, LinkedIn and X, and a **`ReadingProgress`** hairline sits at the top of the screen.
  - "More articles" at the end, chosen on the server by `pickMore`.
- Helpers in `utils.js`: `readMinutes` (≈200 words/min) and `formatDate` (Western digits, UTC).

**Services** (`app/[locale]/services/*`, `components/jx/services/*`):
- **`/services` (new index):**
  - The hero has a chrome title, lede, a counting service total and actions.
  - The signature is **`ServiceTicker`**: every service name scrolling in two opposite columns like a departures board. It's masked top and bottom, pauses on hover or focus, every name is a link, and it's hidden below `lg`.
  - Below that, **`JxArchive`** with a **`ServiceCard`** per service. The server trims each document to slug, title, subtitle, image and `featureCount`.
- **`/services/[slug]`:**
  - The hero has an aura backdrop, breadcrumb, chrome title, lede, actions, the first four capabilities as chips, and the artwork in **`ProjectGallery`**, which unveils from its centre.
  - `ServiceSections.jsx` builds the rest from the CMS document: **Capabilities** (`hero.attr` as icon rings on hairlines, with a sticky header) → **Benefits** (checklist with brushed checks, plus the image) → **Impact** (counting chrome numerals) → **PartnersStrip** → **Faq** (accessible accordion with a +/× ring) → **Call** (closing panel).
- The side menu's services submenu starts with "كل الخدمات", the footer's services column ends with it, and the footer now also shows on service pages.

**`SafeImage`** (`components/jx/SafeImage.jsx`) is `next/image` that removes itself when a CMS file 404s, so frames show their own dark plate instead of a broken icon. Use it for any CMS-sourced image.

**`JxSlider`** (`components/jx/JxSlider.jsx`) is the full-screen scene slider engine: named rail, scan band, pointer depth and active-slide tracking. Use it for any slider page; pass `slides=[{ key, render: active => node, scrollable? }]` and `labels`. The About page uses it, while the home page still has the same logic inline.

**About** (`components/pages/aboutus/*`, slider):
- **Origin:** chrome title, tagline nameplate, and a **timeline** from the founding year (parsed from the CMS text, falling back to 2013) to the current year. The rail draws, each year's tick ignites, a glint travels the journey, and the present year counts up.
- **Team spotlight** (`Board.jsx`):
  - One member is shown large, with the portrait on brushed metal (`mix-blend-multiply` melts white studio backgrounds into the metal).
  - Name, role, bio and LinkedIn sit beside the portrait, with a counter and a countdown line.
  - The roster of faces selects a member. It auto-advances only while the slide is on stage and pauses on hover or focus. On mobile the roster becomes a strip.
- **`StatementScene`** (`components/jx/StatementScene.jsx`) is a belief stated plainly: tag, chrome title, a large lede, three pillars with silver line icons (`IconInnovation`, `IconGrowth`, `IconGlobe`, `IconTeam`, `IconAscend`, `IconMark`), a glyph and an optional closing line. It's used by:
  - **Vision**, with `HorizonGlyph`: perspective lines run to a vanishing point, a sun of arcs rises, and light travels toward the future.
  - **Mission**, with `CompassGlyph`: graduated rings counter-rotate and the arrow of purpose closes on the centre.
- `normalizePillars` ignores CMS placeholder list values (such as "list" or "1") and falls back to the translated pillars.

**Forms** (`style/joe-system.css` → Forms):
- **`.jx-label` + `.jx-field`** (with `.jx-field-icon`, and `.jx-field--area` for a textarea): graphite wells with a hairline. On focus the hairline turns silver and a chrome underline sweeps in from the reading edge. `data-invalid` gives an alert hairline, and errors use `.jx-error` (`--jx-alert`, `role="alert"`, linked with `aria-describedby`).
- Every field has a visible label. Placeholders show a format (`05XXXXXXXX`, `name@company.com`), never the label. Phone and email read LTR, aligned to the Arabic edge.
- **Legacy atoms** (`Input`, `InputNational`, `SelectValue`, `UploadFile`, `UploadFileField`) are re-skinned inside a `.jx-form`: pass `cnInput`/`cnSelect='jx-control'` and `cn='jx-upload'`.
  - The select dropdown becomes onyx.
  - Uploads become dashed drop wells.
  - An atom's `.error` turns its control's hairline red (`:has`).
  - Their bindings and validation are untouched.
- Submit buttons are `JxButton type='submit' motion={false}`, with `disabled` and `aria-busy` while sending.
- **`.jx-enter`**: a CSS entrance for content that arrives after a scene's timeline was built (e.g. `settings` from context), so the timeline never rebuilds and replays.

**Contact** (`app/[locale]/contact-us/ClientPage.jsx`): a front desk on a deep-shaded scene.
- The start side has the chrome title and lede. The three direct lines (office → Maps, mail, phone) are large dial rows whose ring turns brushed on hover.
- The end side is the message plate, which rises out of the floor (`raisePlate`).
- Beneath, the three promises sit on hairlines with silver icons, in place of the old PNG icons.

**Careers** (`app/[locale]/join-us/ClientPage.jsx`, `components/pages/join-us/WhyChooseUs.jsx`):
- The hero has a chrome title, the invitation, one action ("تقدم الآن"), four benefit pillars in silver rings, an engraved vertical JOE13 watermark, and a caption.
- The action opens the **application sheet** from the floor: an onyx sheet with a chrome hairline, a header bar and a round close button. It has Esc, a focus trap, focus return and a scroll lock.
- Inside the sheet, why JOE13 (value rings, then the culture as a list on hairlines, with any "1." numbering stripped) sits beside the application plate.

**Slide rail** (`.jx-home` only, so other pages keep their own rail). It uses ticks, a white fill up to your position, a glint thumb inside the autoplay ring, and slide names on hover or focus (`Jx.slides`).

## 5. Motion

| `data-jx` | Effect | Use for |
| --- | --- | --- |
| `line` | Rises out of its mask, `expo.out` 1.05s | Heading lines |
| `rise` | Fade, 26px lift and de-blur, 0.9s | Copy, tags, buttons, rows |
| `fade` | Opacity, 1.3s | Ambient layers |
| `pop` | Spring scale | Nodes, close button |
| `draw` | Stroke 0→1, 1.6s | SVG with `pathLength="1"` |
| `bloom` | Blur and scale surfacing, 1.5s | Glyphs, large illustrations |
| `stretch` | Grows on the x-axis, 1.3s | Rules, horizon lines |

- `useSceneMotion(active, { deps, start, extend })` builds one timeline per scene, replays it on every visit, and rewinds it after the scene leaves. `start` delays the declarative entrances so a bespoke opening (`extend`) can play first.
- `useViewMotion({ threshold, deps, start, extend })` is the same thing for scrolling pages: it plays once when the section enters the viewport.
- `weightMorph(tl, el)` is the shared title signature. It works with static fonts (the light sweep) and variable fonts (the weight morph).
- **Two tracks: decoration never delays reading.**
  - Anything inside `[data-jx-track="ambient"]` (glyph layers, the stats arc, the hub) runs on its own track from time 0 with a tight stagger.
  - Copy, buttons and data run on the content track.
  - The headline starts within about 0.1s of the slide settling, whatever the glyph is doing.
- **Signature moments** (one per scene, never more):
  - Hero aperture: slit → leaves part → wordmark unveils from its centre → horizon line stretches → reflection.
  - Marketing title: weight morph from 100 to 800.
  - Dossier iris.
- **Transitions:** a 1000ms slide change with a silver scan band sweeping in the direction of travel.
- **Contracts:**
  - Content hides only when JS runs, with a failsafe reveal at 2.5s.
  - Reduced motion jumps everything to its end state and disables loops, parallax, the aperture and the scan.
  - Animate only transform, opacity, stroke-dashoffset, clip-path and the entrance-only blur.

## 6. Interaction states
| State | Treatment |
| --- | --- |
| Hover | Specular sweep on metal, hairline charges with light, icon brightens and lifts |
| Focus-visible | 2px platinum outline, 4px offset |
| Pressed | 1px down, scale 0.985 |
| Current | Glint (rail thumb, locator node) plus `aria-current` |
| Disabled (future) | 40% opacity, no light, `not-allowed` |
| Loading | `aria-busy` plus an sr-only message |

## 7. Accessibility and performance
- Each slide is a `<section aria-labelledby>` with one heading (`h1` on the hero).
- Decorative layers are `aria-hidden`. Navigational nodes are real buttons with names.
- Only the hero photo is `priority`. Others are lazy, quality 72, AVIF/WebP.
- No new runtime libraries: GSAP was already in the project, and the grain is an inline SVG.

## 8. Redesigning another component
1. Pick its **one memorable thing**, and keep everything else quiet.
2. Build from tokens and primitives, using lines instead of cards and metal instead of colour.
3. Add a glyph for unit-related content.
4. Use `data-jx` marks with `useSceneMotion` (pass `true` to play once on mount on scrolling pages).
5. Check RTL and LTR, 375 / 768 / 1440 widths, keyboard use, reduced motion, and text over the brightest part of any photo.
