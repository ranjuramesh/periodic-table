## ADDED Requirements

### Requirement: Large-screen breakpoints scale element text for TV viewing distance
At viewport widths ≥1920px, element symbol font size SHALL be at least 2rem. At ≥3840px (4K), symbol SHALL be at least 2.8rem. Element names SHALL remain visible (not `display: none`) at all widths ≥1024px in fullscreen mode.

#### Scenario: Symbol size at 1920px width in fullscreen
- **WHEN** the app is in fullscreen mode on a 1920px-wide display
- **THEN** element symbol text renders at ≥2rem (approximately 32px)

#### Scenario: Element names visible at 1920px in fullscreen
- **WHEN** the app is in fullscreen mode on a 1920px-wide display
- **THEN** element name text is visible (not hidden) for all elements

---

### Requirement: Background and surface colors are solid, high-contrast, and gradient-free
The app background SHALL use `#0d1117`. Surface/card colors (modals, panels, property cells) SHALL use `#161b22`. Border colors SHALL use `#30363d`. No gradient backgrounds or gradient text SHALL appear anywhere in the UI.

#### Scenario: Background is solid dark color
- **WHEN** the app renders in any mode
- **THEN** the background color is `#0d1117` with no gradient

#### Scenario: No gradient on the page title
- **WHEN** the app header is visible
- **THEN** the h1 text is plain `#c9d1d9` or white — no gradient clip-text effect

---

### Requirement: All interactive hover states use only border and brightness changes
Element cell hover SHALL change border color and apply `filter: brightness(1.15)`. No `transform: scale()` or `translateY()` SHALL be used on hover, search highlight, or animation states. All CSS transitions SHALL be ≤150ms ease.

#### Scenario: Hover does not scale or move elements
- **WHEN** the user hovers over an element cell
- **THEN** the cell brightens and its border becomes more visible, but the cell does not grow or shift position

#### Scenario: Search match highlight uses no scale transform
- **WHEN** a search term matches one or more elements
- **THEN** matching elements are visually highlighted (e.g., brighter border, full opacity) without any `transform: scale()` applied

---

### Requirement: Input and button border radii are ≤8px throughout
The search input, category filter buttons, fullscreen toggle button, and modal/panel close button SHALL all have `border-radius` of ≤8px. No pill shapes (border-radius ≥20px) or circular shapes (border-radius: 50%) SHALL be used.

#### Scenario: Search input is not pill-shaped
- **WHEN** the app renders
- **THEN** the search input has `border-radius` ≤8px

#### Scenario: Category filter buttons are not pill-shaped
- **WHEN** the category filter is visible
- **THEN** all filter buttons have `border-radius` ≤8px

---

### Requirement: Font stack uses system sans-serif, not Segoe UI or vendor-specific fonts
The `font-family` declaration SHALL use `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`. `Segoe UI`, `Tahoma`, `Trebuchet MS`, and `Verdana` SHALL NOT appear in any `font-family` declaration.

#### Scenario: System font is applied
- **WHEN** the app renders on macOS
- **THEN** the UI uses the system San Francisco font (via -apple-system)

---

### Requirement: Search input is accessible in fullscreen mode
The search bar SHALL be visible and functional in fullscreen mode. It SHALL be rendered in a top control bar alongside the fullscreen toggle button. Input SHALL accept keyboard text entry while the app is in fullscreen.

#### Scenario: Search is visible in fullscreen
- **WHEN** the app enters fullscreen mode
- **THEN** the search input is visible in the top bar (not hidden)

#### Scenario: Search filters elements in fullscreen
- **WHEN** the app is in fullscreen mode and the user types "gold" in the search bar
- **THEN** only Gold (Au) is highlighted/visible in the table, all others are dimmed

---

### Requirement: Category filter displays as a non-interactive legend in fullscreen mode
In fullscreen mode, the category filter SHALL render as a legend row: each category shown as a color swatch + full category name, with no click/active state. The legend SHALL not abbreviate category names.

#### Scenario: Legend shows full category names in fullscreen
- **WHEN** the app is in fullscreen mode
- **THEN** the category section shows "Alkali Metal", "Alkaline Earth Metal", etc. as label text (not abbreviated), each with a color swatch

#### Scenario: Legend items are not interactive in fullscreen
- **WHEN** the app is in fullscreen mode and the user clicks a legend item
- **THEN** no category filter is applied (legend is display-only)
