## Context

The app renders 118 chemical elements in an 18×10 CSS Grid. All state lives in `App.jsx`. The current fullscreen mode scales the grid but hides the header and search, and shows element details as a centered overlay modal that obscures the table. There are no period/group labels and the lanthanide/actinide row labels are `display: none`. Visual styling uses gradient backgrounds, pill-shaped inputs/buttons, and transform-based hover animations — patterns that hurt legibility at classroom viewing distance and are inconsistent with clean, functional design.

The target environment adds TV and projector displays (typically 55–85", 1080p–4K, viewed from 8–20 ft). At that distance the current symbol sizes (~18–22px effective) become marginal; atomic numbers and element names are unreadable. The table also lacks the structural labeling that makes it useful as a teaching reference.

## Goals / Non-Goals

**Goals:**
- Table is legible from 10+ ft on a 1080p display in fullscreen mode
- Period (1–7) and group (1–18) labels are visible in the grid at all times
- Lanthanide and actinide row labels are visible inline with the f-block rows
- Clicking an element in fullscreen opens a right-side detail panel — the table remains fully visible
- Search is accessible in fullscreen mode
- Category filter degrades to a legend (non-interactive) in fullscreen
- All interactive element styling uses border/brightness changes only — no transform animations
- Visual style: high-contrast solid dark background, system font, ≤8px border radii

**Non-Goals:**
- Keyboard navigation / arrow-key traversal between elements (separate concern)
- Touch / pointer gestures for TV remote or stylus input
- Offline mode or PWA capability
- Printing / PDF export
- Light mode / theme switching

## Decisions

### D1 — Right-side panel vs. persistent split layout for element detail

**Decision**: Render element detail as a slide-in panel anchored to the right edge in fullscreen mode; keep the existing centered modal in standard (non-fullscreen) view.

**Rationale**: A persistent split layout would require restructuring the grid sizing (the table needs to shrink ~30% to accommodate a fixed sidebar). That breaks the aspect-ratio constraint the table uses to fill the viewport. A panel that overlays the right edge of the table is simpler — it only obscures groups 16–18 of the table, and is dismissible. In a classroom the teacher controls when it's open.

**Alternative considered**: Full-width bottom drawer — rejected because it covers rows 7–10 (actinides/lanthanides), which are the most commonly misunderstood part of the table.

---

### D2 — Period/group labels as grid cells vs. absolute-positioned overlays

**Decision**: Render period and group labels as actual grid cells inside the CSS Grid, shifting the element column/row assignments by +1 each.

**Rationale**: Absolute positioning requires knowing the pixel size of each cell, which changes with viewport. Grid cells inherit the same sizing as element cells automatically. The data already has `group` (1–18) and `period` (1–7) on each element; we increment each by 1 for the offset.

**Alternative considered**: CSS `::before` pseudo-elements on row/column — not viable because CSS Grid pseudo-elements don't participate in grid placement.

**Impact**: `PeriodicTable.jsx` generates 18 group-label cells (row 1, col 2–19) and 7 period-label cells (col 1, rows 2–8) in addition to the 118 element cells. Grid is now 19 columns × 11 rows. Lanthanide/actinide labels render at col 1, rows 10–11.

---

### D3 — Fullscreen search visibility

**Decision**: In fullscreen mode, keep `SearchBar` rendered but move it into the top control bar alongside the category legend and fullscreen button. Use a compact variant (narrower, shorter).

**Rationale**: Teachers use search to demonstrate "find an element by name" to students. Hiding it in fullscreen removes that teaching tool. The current fullscreen bar has enough horizontal space to accommodate a compact search input to the left of the fullscreen toggle.

---

### D4 — Color system

**Decision**: Replace the blue gradient background with `#0d1117` (GitHub dark background) and `#161b22` (surface). Keep existing category `color` values in `elements.js` unchanged — they are vivid, distinct, and already work well. Text: `#c9d1d9`. Borders: `#30363d`.

**Rationale**: The category colors are the primary visual encoding. Keeping them intact preserves the app's educational value. The background just needs to be neutral and high-contrast so the category colors read clearly. The GitHub dark palette is well-tested for dark-mode readability and has no gradients.

---

### D5 — No transform animations

**Decision**: Remove all `transform: scale()` and `translateY()` from hover, search match, and modal entry states. Use `filter: brightness()` for hover feedback and `border-color` change for focus/selection. Transitions capped at 150ms ease.

**Rationale**: Scale transforms cause element cells to overflow their grid cells and obscure neighbors — especially noticeable on a large display where the table fills the full screen. Border-only feedback is sufficient and less visually noisy for a classroom audience watching one person navigate.

## Risks / Trade-offs

- **Grid column offset (D2)** → Lanthanide and actinide elements use hardcoded `gridColumn` overrides in `Element.jsx`. These must be incremented by 1 to account for the new period-label column. Risk: off-by-one positioning. Mitigation: verify all 32 f-block elements visually after implementation.
- **Right panel obscures groups 16–18** → When a noble gas or halogen is selected in fullscreen, the panel partially covers its neighbors. Mitigation: panel background is semi-transparent at the table edge, and the selected element is highlighted so context is preserved.
- **CSS specificity with fullscreen overrides** → `App.css` currently uses a mix of class selectors and descendant overrides for `.fullscreen-content`. Adding panel and legend variants may require refactoring these to avoid specificity conflicts. Mitigation: consolidate all fullscreen overrides under a single `.fullscreen-mode` parent scope.
- **No rollback complexity** — this is a pure CSS/JSX change with no data migration, no API changes, and no new dependencies. Reverting is a git revert.
