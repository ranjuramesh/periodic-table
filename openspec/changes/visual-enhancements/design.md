## Context

The app currently renders 118 element cells in a CSS Grid; interaction is click-to-open-modal only. Three enhancements add visual richness without breaking the existing layout or state model: a hover tooltip (requires a dependency for collision-safe positioning), a Bohr shell diagram (pure SVG, no dependency), and a property heatmap mode (pure CSS/JS). The element data already contains all necessary numeric fields (electronegativity, density, meltingPoint, boilingPoint, atomicMass) and the electron configuration string.

## Goals / Non-Goals

**Goals:**
- Hover tooltip that fires on mouseenter, positions safely near the element cell, and dismisses on mouseleave — no click required
- Bohr electron-shell diagram that correctly places electrons on concentric rings derived from a simplified electron-count-per-shell parse of `electronConfig`
- Property heatmap that normalises any chosen numeric property across all 118 elements (ignoring nulls) and maps it to a continuous two-stop color gradient, toggled from a compact selector next to the category filter

**Non-Goals:**
- Quantum orbital (s/p/d/f) accuracy in the Bohr diagram — simplified Bohr rings are sufficient for classroom use
- 3D or animated atomic visualisation
- Data fetching or external chemistry APIs
- Accessibility (ARIA) full compliance for tooltip (out of scope for this iteration)

## Decisions

### D1: `@floating-ui/react` for tooltip positioning (vs. CSS `position: absolute` alone)

`@floating-ui/react` is 0.6 KB gzipped and handles viewport collision automatically: edge cells (group 1, group 18) would overflow the screen with a naive absolute-positioned tooltip. The library flips/shifts the tooltip to stay in view. Alternative: pure CSS `position: fixed` with manual edge-detection logic in JavaScript — more code, more bugs, no benefit.

### D2: Bohr diagram as pure SVG React component, no library

All third-party Bohr/atomic visualisation packages are either unmaintained, Three.js-based (heavy), or opinionated about 3D. A 60-line SVG component using trigonometric electron placement is sufficient, maintainable, and matches the existing dark theme. The electron configuration string (e.g., `1s¹ 2s² 2p⁶`) is parsed to extract per-shell electron counts using a regex that sums electrons per principal quantum number.

### D3: Heatmap colour scale as inline `style` + CSS custom property, not a mapping library

Each element's heatmap color is computed at render time as `hsl(240, 60%, ${20 + normalised * 55}%)` — dark blue (cold) to light blue-white (hot). The normalised value is `(value - min) / (max - min)` across all non-null values in the dataset. This is three lines of JavaScript per element, zero dependency. The gradient legend is a CSS `linear-gradient` spanning the same stops.

### D4: `heatmapProperty` state lives in `App.jsx`

Consistent with the existing pattern where all filter state (`selectedCategory`, `searchTerm`) lives in `App.jsx`. A `null` value means "off" (category colors). A string value (e.g., `'electronegativity'`) means heatmap is active for that property. Passed down to `Element` (for cell color) and `CategoryFilter` (for toggle UI).

### D5: Tooltip shown only in non-heatmap mode, suppressed while modal is open

When a heatmap is active, element cells already communicate data through color — a tooltip reiterating the same property is redundant. When the modal/panel is open, a second tooltip would clutter the view. Both conditions suppress the tooltip.

## Risks / Trade-offs

- [Electron config parse complexity] Actinides and lanthanides have irregular configurations — the per-shell sum approach handles them correctly because it only counts principal quantum number totals, not orbital types → Verified by spot-checking Fe (2,8,14,2), Au (2,8,18,32,18,1)
- [Floating UI SSR] Not relevant — app is client-only (Vite SPA)
- [Bundle size] Adding `@floating-ui/react` + `@floating-ui/dom` adds ~8 KB uncompressed to the bundle — acceptable for the feature it enables
- [Heatmap with sparse data] Some properties have many null values (e.g., density for noble gases). Null elements stay at category color (not heatmap) so the table still reads correctly → handled by checking for null before applying heatmap color
