## Why

The app is used in classrooms and on large TV/projector displays, but the current UI was designed for desktop browsers at arm's length. Text is too small to read from across a room, the element grid is missing standard educational anatomy (period and group labels, lanthanide/actinide row markers), and the fullscreen mode blocks the entire table with a centered modal whenever an element is selected — making it difficult for a teacher to point at an element and explain it without losing the table context. Visual styling also relies on generic AI-generated patterns (gradient backgrounds, pill shapes, bouncy animations) that reduce legibility and look unprofessional on classroom displays.

## What Changes

- **Replace gradient background and font stack** with a high-contrast, solid dark theme (GitHub-dark palette) and a system sans-serif font stack — no Segoe UI, no gradient text, no pill borders
- **Remove transform-based hover and animation effects** — replace with border/brightness changes only; 150ms ease transitions
- **Add period labels (1–7)** as a left-side column in the grid
- **Add group labels (1–18)** as a top row in the grid
- **Make lanthanide and actinide row labels visible** — "57–71 Lanthanides" and "89–103 Actinides" inline with the f-block rows
- **Replace centered element modal with a right-side detail panel** — panel appears on click, table stays fully visible; closes with Escape or a close button
- **Keep search accessible in fullscreen/TV mode** — small persistent search bar at top of fullscreen layout
- **Add TV/large-screen breakpoints** (`1920px`, `3840px`) — larger symbols, names always visible, bigger hit targets
- **Refactor category filter** — remove pill styling; in fullscreen mode, show as an inline legend (color swatch + name) rather than interactive buttons that abbreviate
- **Increase element cell text scaling** — symbol floor raised so it remains readable at 10+ ft viewing distance

## Capabilities

### New Capabilities
- `grid-anatomy`: Period numbers column, group numbers row, and f-block row labels rendered as part of the CSS Grid layout
- `element-detail-panel`: Right-side pinned panel for element details (replaces centered modal in fullscreen; modal kept for standard view)
- `tv-classroom-mode`: Large-screen breakpoints and fullscreen layout optimized for TV/projector viewing — search accessible, category legend embedded, detail panel instead of modal

### Modified Capabilities
- None — no existing spec files to delta against

## Impact

- `src/App.css` — full visual overhaul: colors, typography, border radii, transitions, breakpoints
- `src/index.css` — reset font stack and base color
- `src/components/PeriodicTable.jsx` — add period label cells and group label cells to the grid render; add lanthanide/actinide row labels
- `src/components/Element.jsx` — remove inline transform styles on search match; rely on CSS only
- `src/components/ElementModal.jsx` — convert to a panel component that renders as right-side drawer in fullscreen, centered overlay in normal view
- `src/components/CategoryFilter.jsx` — remove pill radius; add legend variant for fullscreen
- `src/components/SearchBar.jsx` — expose in fullscreen layout; normalize input styling
- `src/App.jsx` — pass `isFullscreen` to modal/panel; adjust fullscreen layout structure to accommodate persistent search and panel
