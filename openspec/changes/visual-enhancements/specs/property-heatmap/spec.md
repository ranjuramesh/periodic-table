## ADDED Requirements

### Requirement: Property heatmap mode toggle
The system SHALL provide a control that lets the user select a numeric property to visualise as a color gradient across all element cells. Available properties SHALL be: Electronegativity, Density, Melting Point, Boiling Point, and Atomic Mass. When a property is selected, the category-color filter SHALL be hidden and element cells SHALL be recolored by heatmap. When the user deselects (selects "Off"), category colors and the filter SHALL be restored.

#### Scenario: Activating heatmap
- **WHEN** the user selects a property from the heatmap selector
- **THEN** all element cells are recolored using a gradient from dark blue (minimum value) to light blue-white (maximum value), category filter buttons are hidden, and a gradient legend appears

#### Scenario: Deactivating heatmap
- **WHEN** the user selects "Off" or toggles off heatmap mode
- **THEN** element cells return to their category colors, the category filter is shown again, and the legend disappears

#### Scenario: Heatmap selector is present in both standard and fullscreen views
- **WHEN** the user is in either standard or fullscreen mode
- **THEN** the heatmap selector is accessible

### Requirement: Null values are handled gracefully in heatmap
The system SHALL display elements with null values for the selected property at their category color (not heatmap color) when heatmap mode is active, to avoid misleading visual encoding.

#### Scenario: Element with null property value in heatmap
- **WHEN** heatmap mode is active for Electronegativity AND the user views a Noble Gas element (which has null electronegativity)
- **THEN** the Noble Gas element is displayed at a neutral muted color rather than a heatmap gradient color

### Requirement: Gradient legend shows scale
The system SHALL display a horizontal gradient legend bar with the property name, minimum value, and maximum value labels when heatmap mode is active.

#### Scenario: Legend shows correct range
- **WHEN** heatmap is active for Melting Point
- **THEN** a gradient bar appears showing the lowest melting point on the left and highest on the right with numeric labels
