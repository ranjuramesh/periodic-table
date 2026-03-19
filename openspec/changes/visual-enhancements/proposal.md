## Why

The periodic table currently communicates all element data through text in a modal/panel. For classroom and TV display use cases, three high-impact visual features are missing: a rich hover experience that aids scanning on large screens, an interactive Bohr electron-shell diagram that is the canonical classroom visualization, and a property heatmap mode that lets teachers demonstrate periodic trends visually without leaving the page.

## What Changes

- Add a lightweight hover tooltip on each element cell showing key properties (symbol, name, mass, electronegativity, phase) — using `@floating-ui/react` for collision-safe positioning
- Add a Bohr electron-shell diagram (pure SVG, no dependency) to the element detail panel/modal, parsed from the existing `electronConfig` field
- Add a property heatmap mode toggle in the category filter area that recolors elements by a selected numeric property (electronegativity, density, melting point, boiling point, atomic mass) using a CSS-driven gradient scale with a legend

## Capabilities

### New Capabilities

- `element-hover-tooltip`: Floating tooltip on element hover showing symbol, name, atomic mass, electronegativity, and phase indicator; dismisses on mouse-leave; collision-aware (stays in viewport on grid edges)
- `bohr-shell-diagram`: SVG Bohr model diagram rendered inside the detail panel/modal, derived from element's shell electron counts; shows nucleus label, concentric rings, and electron dots
- `property-heatmap`: A mode toggle in the UI that recolors all element cells by a selected numeric property using a normalized color gradient; includes a gradient legend bar with min/max labels; toggles off to restore category colors

### Modified Capabilities

## Impact

- New dependency: `@floating-ui/react` (~0.6 KB gzipped) for hover tooltip positioning
- New component: `src/components/BohrDiagram.jsx`
- New component: `src/components/HoverTooltip.jsx`
- Modified: `src/components/Element.jsx` — wrap with Floating UI reference, add tooltip trigger
- Modified: `src/components/ElementModal.jsx` — add BohrDiagram below modal header
- Modified: `src/components/CategoryFilter.jsx` — add property heatmap toggle + property selector
- Modified: `src/App.jsx` — add `heatmapProperty` state (null | string), pass to Element and CategoryFilter
- Modified: `src/App.css` — add tooltip styles, heatmap legend styles
