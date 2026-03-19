## ADDED Requirements

### Requirement: Bohr diagram shown in element detail view
The system SHALL render an SVG Bohr electron-shell diagram inside the element detail modal (standard view) and detail panel (fullscreen view) for every element. The diagram SHALL show: a central nucleus circle with the element symbol, concentric orbital rings (one per principal quantum number shell), and electron dots distributed evenly around each ring.

#### Scenario: Diagram renders for a simple element
- **WHEN** the user opens the detail view for Hydrogen (1 shell, 1 electron)
- **THEN** the diagram shows one ring with one electron dot

#### Scenario: Diagram renders for a complex element
- **WHEN** the user opens the detail view for Gold (6 shells: 2,8,18,32,18,1)
- **THEN** the diagram shows six concentric rings with the correct electron count on each

#### Scenario: Diagram renders for all 118 elements without error
- **WHEN** any element is selected
- **THEN** a Bohr diagram is displayed with no visual overflow or missing rings

### Requirement: Electron shell counts derived from configuration string
The system SHALL derive per-shell electron counts from the existing `electronConfig` field by summing the superscript electron counts per principal quantum number. The parse SHALL handle Unicode superscript digits (¹²³⁴⁵⁶⁷⁸⁹) used in the data.

#### Scenario: Correct shell count for Sodium
- **WHEN** Sodium's `electronConfig` is `1s² 2s² 2p⁶ 3s¹`
- **THEN** the diagram shows three shells with 2, 8, and 1 electrons respectively

#### Scenario: Null or missing config falls back gracefully
- **WHEN** an element has a null or empty `electronConfig`
- **THEN** the diagram renders the nucleus only with no rings shown
