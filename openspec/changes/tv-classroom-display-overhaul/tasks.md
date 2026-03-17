## 1. Visual Foundation (colors, fonts, base styles)

- [x] 1.1 Replace gradient background in `App.css` with solid `#0d1117`; remove `linear-gradient` from `.app`
- [x] 1.2 Replace `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` in `App.css` and `index.css` with `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`
- [x] 1.3 Remove gradient clip-text from `.app-header h1`; set plain color `#c9d1d9`
- [x] 1.4 Define CSS custom properties for the color system: `--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-muted`
- [x] 1.5 Update `.modal-content` and property cell backgrounds to use `--color-surface` (`#161b22`)

## 2. Remove transform animations and fix hover states

- [x] 2.1 Remove `transform: scale(1.15) translateY(-3px)` from `.element:hover`; replace with `filter: brightness(1.15)` and `border-color: rgba(255,255,255,0.5)`
- [x] 2.2 Remove `transform: scale(1.1)` and `box-shadow` glow from `Element.jsx` inline style for `isSearchMatch`; replace with CSS `border-color` highlight
- [x] 2.3 Remove `@keyframes pulse` and `animation: pulse` from `.element.search-match`
- [x] 2.4 Remove `transform: translateY(-2px)` from `.filter-btn:hover`
- [x] 2.5 Remove `transform: scale(1.1)` from `.fullscreen-btn:hover`
- [x] 2.6 Remove `@keyframes slideUp` and `animation: slideUp` from `.modal-content`; replace with simple `opacity` fade (150ms)
- [x] 2.7 Audit all remaining `transition` values and cap at 150ms ease

## 3. Fix border radii (remove pills)

- [x] 3.1 Change `.search-input` `border-radius: 50px` → `6px`; remove pill glow on focus, use simple border-color change
- [x] 3.2 Change `.filter-btn` `border-radius: 25px` → `6px`
- [x] 3.3 Change `.fullscreen-btn` from `border-radius: 50%` circular to `border-radius: 6px`; remove gradient background, use solid `#21262d` with `1px solid #30363d`
- [x] 3.4 Change `.modal-content` `border-radius: 16px` → `8px`
- [x] 3.5 Change `.category-filter` `border-radius: 16px` → `6px`
- [x] 3.6 Change `.element` `border-radius: 8px` → `4px`

## 4. Grid anatomy — period labels, group labels, f-block row labels

- [x] 4.1 Update `.periodic-table` CSS Grid definition from `repeat(18, 1fr)` / `repeat(10, 1fr)` to `repeat(19, 1fr)` / `repeat(11, 1fr)` (extra column for period labels, extra row for group labels)
- [x] 4.2 In `PeriodicTable.jsx`, render 18 group-label cells (numbers 1–18) at `gridColumn: n+1, gridRow: 1` before the element cells
- [x] 4.3 In `PeriodicTable.jsx`, render 7 period-label cells (numbers 1–7) at `gridColumn: 1, gridRow: n+1` alongside element rows
- [x] 4.4 In `Element.jsx`, increment all `gridColumn` values by 1 and `gridRow` values by 1 for the label offset
- [x] 4.5 In `Element.jsx`, update lanthanide override: `gridRow = 10`, `gridColumn = atomicNumber - 54 + 1` (shift +1)
- [x] 4.6 In `Element.jsx`, update actinide override: `gridRow = 11`, `gridColumn = atomicNumber - 86 + 1` (shift +1)
- [x] 4.7 In `PeriodicTable.jsx`, render a "Lanthanides" label cell at `gridColumn: 1, gridRow: 10` using lanthanide category color
- [x] 4.8 In `PeriodicTable.jsx`, render an "Actinides" label cell at `gridColumn: 1, gridRow: 11` using actinide category color
- [x] 4.9 Add CSS for `.grid-label` cells: muted text, no background, centered, `font-size: clamp(0.5rem, 1vw, 0.75rem)`, `font-weight: 600`
- [x] 4.10 Visually verify all 118 element positions are correct (spot-check H, He, Li, Ba, La, Ac, Og)

## 5. Element detail panel (fullscreen right-side panel)

- [x] 5.1 In `App.jsx`, add `isPanelMode` logic: when `isFullscreen` is true, render `ElementModal` in panel mode; when false, render as centered modal
- [x] 5.2 In `ElementModal.jsx`, accept a `mode` prop (`'modal'` | `'panel'`); add conditional className `modal-content` vs `detail-panel`
- [x] 5.3 Add `.detail-panel` CSS: `position: fixed; right: 0; top: 0; height: 100vh; width: 340px; background: #161b22; border-left: 1px solid #30363d; overflow-y: auto; z-index: 50`
- [x] 5.4 Remove the full-screen backdrop overlay when in panel mode (no `.modal-overlay` wrapper)
- [x] 5.5 In panel mode, pressing Escape should close the panel only (not exit fullscreen); add `stopPropagation` or priority check in `App.jsx` Escape key handler
- [x] 5.6 Verify panel updates correctly when user clicks a different element while panel is open (existing `setSelectedElement` flow should handle this)

## 6. Fullscreen mode layout — search, legend, TV breakpoints

- [x] 6.1 In `App.jsx`, move `SearchBar` outside the `{!isFullscreen}` conditional; render it in a `.fullscreen-topbar` div alongside the fullscreen button when `isFullscreen` is true
- [x] 6.2 Add `.fullscreen-topbar` CSS: `display: flex; align-items: center; gap: 12px; padding: 8px 16px; height: 48px`
- [x] 6.3 In `CategoryFilter.jsx`, accept a `mode` prop (`'filter'` | `'legend'`); in `'legend'` mode, render each category as `<span class="legend-swatch">` + full name text with no onClick and no active state
- [x] 6.4 Add `.legend-swatch` CSS: `display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px`
- [x] 6.5 In `App.jsx`, pass `mode={isFullscreen ? 'legend' : 'filter'}` to `CategoryFilter`
- [x] 6.6 Add `@media (min-width: 1920px)` breakpoint: symbol `clamp(1.4rem, 2.8vw, 2rem)`, name visible, atomic-mass visible, hit targets larger
- [x] 6.7 Add `@media (min-width: 3840px)` breakpoint: symbol `2.8rem`, name `1rem`, atomic number `1rem`, grid gap `6px`
- [x] 6.8 Remove the fullscreen abbreviation logic from `CategoryFilter.jsx` (the `name.split(' ')[0]` truncation)

## 7. Cleanup and lint

- [x] 7.1 Remove now-unused `.fullscreen-filter`, `.fullscreen-filter .filter-btn` CSS overrides
- [x] 7.2 Remove gradient overrides from `.app.fullscreen-mode .fullscreen-btn`
- [x] 7.3 Remove `.series-labels` CSS block (replaced by grid labels)
- [x] 7.4 Run `npm run lint` and fix any warnings
- [x] 7.5 Run `npm run build` and confirm no build errors
