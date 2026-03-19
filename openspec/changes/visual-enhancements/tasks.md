## 1. Dependency + State Setup

- [x] 1.1 Install `@floating-ui/react` and `@floating-ui/dom` packages
- [x] 1.2 Add `heatmapProperty` state (null | string) to `App.jsx`
- [x] 1.3 Pass `heatmapProperty` and `onHeatmapChange` props to `CategoryFilter`
- [x] 1.4 Pass `heatmapProperty` prop to `PeriodicTable` (which passes to each `Element`)
- [x] 1.5 Pass `selectedElement` boolean (isModalOpen) to `PeriodicTable` / `Element` for tooltip suppression

## 2. Property Heatmap — Data Utilities

- [x] 2.1 Add `HEATMAP_PROPERTIES` config array in `src/data/elements.js` (or a new `src/utils/heatmap.js`) with `{ key, label, unit }` for: electronegativity, density, meltingPoint, boilingPoint, atomicMass
- [x] 2.2 Implement `getHeatmapStats(property)` that returns `{ min, max }` across all non-null element values
- [x] 2.3 Implement `getHeatmapColor(value, min, max)` that returns an HSL color string (dark blue → light blue-white gradient); returns a muted neutral for null values

## 3. Property Heatmap — UI

- [x] 3.1 Add a compact `<select>` (or button row) to `CategoryFilter.jsx` with "Off" + 5 property options; selecting a property calls `onHeatmapChange`
- [x] 3.2 Conditionally hide the category filter buttons when `heatmapProperty` is not null
- [x] 3.3 Add a gradient legend bar component (inline in `CategoryFilter.jsx`) that appears when heatmap is active, showing property name + min/max labels
- [x] 3.4 Update `Element.jsx` to use `getHeatmapColor` for `backgroundColor` when `heatmapProperty` is set (non-null element values get gradient color; null values get muted neutral)
- [x] 3.5 Add heatmap selector to the fullscreen topbar (pass same props via `App.jsx` fullscreen branch)
- [x] 3.6 Add CSS for heatmap selector and gradient legend to `App.css`

## 4. Hover Tooltip — Component

- [x] 4.1 Create `src/components/HoverTooltip.jsx` using `@floating-ui/react` hooks (`useFloating`, `useHover`, `useInteractions`) — renders symbol, name, atomic mass, electronegativity, and phase
- [x] 4.2 Implement `getPhase(element)` helper (Solid/Liquid/Gas/Unknown based on meltingPoint/boilingPoint vs. 25°C)
- [x] 4.3 Configure Floating UI placement as `'top'` with `flip()` and `shift()` middleware for viewport collision avoidance
- [x] 4.4 Add tooltip suppression: do not render tooltip when `isModalOpen` is true or when `heatmapProperty` is not null
- [x] 4.5 Integrate `HoverTooltip` into `Element.jsx` — wrap the element div as the reference element
- [x] 4.6 Add tooltip CSS to `App.css` (dark surface, 1px border, compact layout, no animations beyond CSS opacity)

## 5. Bohr Shell Diagram — Parser

- [x] 5.1 Create `src/utils/parseElectronShells.js` — exports `parseShells(electronConfig)` that returns an array of electron counts per shell (e.g., `[2, 8, 1]` for Sodium)
- [x] 5.2 Handle Unicode superscript digits (¹²³⁴⁵⁶⁷⁸⁹⁰) in the regex — map to numeric values
- [x] 5.3 Handle edge cases: null/empty config returns `[]`; validate spot-checks: H=[1], Na=[2,8,1], Fe=[2,8,14,2], Au=[2,8,18,32,18,1]

## 6. Bohr Shell Diagram — SVG Component

- [x] 6.1 Create `src/components/BohrDiagram.jsx` — accepts `element` prop; renders an SVG with fixed viewBox (e.g., `0 0 200 200`)
- [x] 6.2 Render nucleus: filled circle at center with element symbol text
- [x] 6.3 Render orbital rings: one `<circle>` stroke per shell, spacing rings evenly from nucleus to SVG edge minus padding
- [x] 6.4 Render electron dots: for each shell, distribute N electrons evenly around the ring using `cx = cx + r*cos(θ)`, `cy = cy + r*sin(θ)` — small filled circles
- [x] 6.5 Scale ring radii dynamically based on shell count so all elements fit within the viewBox
- [x] 6.6 Add CSS class `bohr-diagram` to `App.css` — match dark theme (muted ring strokes, dim electron dots, element color accent on nucleus)

## 7. Integration + Validation

- [x] 7.1 Import and render `BohrDiagram` in `ElementModal.jsx` — below the modal header, above the property grid
- [x] 7.2 Verify the diagram renders without error for a small element (H), medium (Fe), and heavy element (Og, 118)
- [x] 7.3 Run `npm run lint` — fix any lint errors
- [x] 7.4 Run `npm run build` — confirm clean build with no warnings
