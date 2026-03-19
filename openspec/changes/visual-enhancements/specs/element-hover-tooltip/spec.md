## ADDED Requirements

### Requirement: Hover tooltip appears on element cell
The system SHALL display a floating tooltip when the user hovers over any element cell. The tooltip SHALL show: element symbol (large), full name, atomic mass, electronegativity (or "—" if null), and standard state at room temperature (Solid/Liquid/Gas/Unknown derived from melting/boiling points).

#### Scenario: Tooltip appears on mouseenter
- **WHEN** the user moves the mouse pointer over an element cell
- **THEN** a tooltip appears near the cell containing the element's symbol, name, atomic mass, electronegativity, and phase

#### Scenario: Tooltip dismisses on mouseleave
- **WHEN** the user moves the mouse pointer away from an element cell
- **THEN** the tooltip disappears

#### Scenario: Tooltip stays within viewport on edge cells
- **WHEN** the user hovers over an element in column 1 (left edge) or column 18 (right edge)
- **THEN** the tooltip is positioned to remain fully visible within the viewport without overflowing

### Requirement: Tooltip is suppressed when modal is open
The system SHALL NOT show a hover tooltip when the element detail modal or panel is already open.

#### Scenario: No tooltip while modal is open
- **WHEN** an element detail modal or panel is open AND the user hovers over any element cell
- **THEN** no tooltip appears

### Requirement: Tooltip is suppressed during heatmap mode
The system SHALL NOT show a hover tooltip when heatmap mode is active, since element data is already communicated through cell color.

#### Scenario: No tooltip during heatmap
- **WHEN** heatmap mode is active AND the user hovers over an element cell
- **THEN** no tooltip appears
