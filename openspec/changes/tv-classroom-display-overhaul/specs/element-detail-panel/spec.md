## ADDED Requirements

### Requirement: Element detail renders as a right-side panel in fullscreen mode
When an element is selected while in fullscreen mode, the detail view SHALL appear as a panel anchored to the right edge of the viewport. The panel SHALL NOT obscure more than 25% of the table width. The table SHALL remain visible and interactive behind the panel.

#### Scenario: Panel opens on element click in fullscreen
- **WHEN** the user is in fullscreen mode and clicks an element
- **THEN** a right-side detail panel appears with the element's symbol, name, atomic number, and properties; the periodic table grid remains visible

#### Scenario: Panel closes via close button in fullscreen
- **WHEN** the detail panel is open in fullscreen mode and the user clicks the close button
- **THEN** the panel closes and no element is selected

#### Scenario: Panel closes via Escape key in fullscreen
- **WHEN** the detail panel is open in fullscreen mode and the user presses Escape
- **THEN** the panel closes (Escape does not also exit fullscreen while a panel is open)

#### Scenario: Panel updates when a different element is clicked
- **WHEN** the detail panel is open and the user clicks a different element
- **THEN** the panel updates to show the new element's details without closing and reopening

---

### Requirement: Element detail renders as a centered overlay modal in standard view
When an element is selected while NOT in fullscreen mode, the detail view SHALL appear as a centered overlay modal (existing behavior). The modal SHALL have a maximum width of 500px and a semi-transparent backdrop.

#### Scenario: Modal opens on element click in standard view
- **WHEN** the user is not in fullscreen mode and clicks an element
- **THEN** a centered overlay modal appears with the element's details

#### Scenario: Modal closes when backdrop is clicked
- **WHEN** the modal is open and the user clicks outside the modal content area
- **THEN** the modal closes and no element is selected

---

### Requirement: Detail view displays complete element properties
Both the panel and the modal SHALL display: symbol, name, atomic number, atomic mass, category, electron configuration, electronegativity, density, melting point, boiling point, discovered by, year discovered, group, period, and a brief description. Values that are null or unknown SHALL display as "N/A".

#### Scenario: Properties render for a standard element
- **WHEN** the user selects Hydrogen
- **THEN** the detail view shows symbol "H", name "Hydrogen", atomic number 1, atomic mass 1.008, category "Reactive Nonmetal", electron config "1s¹", and all other properties

#### Scenario: Missing properties render as N/A
- **WHEN** the user selects an element with null electronegativity (e.g., Helium)
- **THEN** the electronegativity field displays "N/A"

---

### Requirement: Detail view uses the element's category color as its accent
The header area of the detail view (both panel and modal) SHALL use the element's category color as its background. Text color SHALL use the category's `textColor` for legibility.

#### Scenario: Category color applied to panel/modal header
- **WHEN** the user selects an alkali metal (e.g., Lithium, category color #ff6b6b)
- **THEN** the detail view header background is #ff6b6b with text color #2d0a0a
