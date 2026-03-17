## ADDED Requirements

### Requirement: Group number labels are displayed across the top of the table
The grid SHALL render 18 group-number label cells (1–18) in the first row of the CSS Grid, one per column starting at column 2. Label cells SHALL be non-interactive, visually distinct from element cells (no background color, muted text), and sized to match element cell width.

#### Scenario: Group labels render in correct columns
- **WHEN** the periodic table is rendered
- **THEN** group label "1" appears at grid-column 2, grid-row 1 and group label "18" appears at grid-column 19, grid-row 1

#### Scenario: Group labels are not clickable
- **WHEN** a user clicks on a group label cell
- **THEN** no element is selected and no detail panel or modal opens

---

### Requirement: Period number labels are displayed along the left edge of the table
The grid SHALL render 7 period-number label cells (1–7) in the first column of the CSS Grid, one per row starting at row 2. Label cells SHALL be non-interactive, visually distinct from element cells, and sized to match element cell height.

#### Scenario: Period labels render in correct rows
- **WHEN** the periodic table is rendered
- **THEN** period label "1" appears at grid-column 1, grid-row 2 and period label "7" appears at grid-column 1, grid-row 8

#### Scenario: Period labels are not clickable
- **WHEN** a user clicks on a period label cell
- **THEN** no element is selected and no detail panel or modal opens

---

### Requirement: Element grid positions are offset to accommodate label column and row
All 118 element cells SHALL have their grid-column incremented by 1 and grid-row incremented by 1 to account for the period-label column (col 1) and group-label row (row 1).

#### Scenario: Hydrogen is in correct grid position
- **WHEN** the periodic table is rendered
- **THEN** Hydrogen (group 1, period 1) occupies grid-column 2, grid-row 2

#### Scenario: Helium is in correct grid position
- **WHEN** the periodic table is rendered
- **THEN** Helium (group 18, period 1) occupies grid-column 19, grid-row 2

#### Scenario: Lanthanide f-block positions are correct after offset
- **WHEN** the periodic table is rendered
- **THEN** Lanthanum (atomicNumber 57) occupies grid-column 4, grid-row 10 (shifted +1 from previous col 3, row 9)

#### Scenario: Actinide f-block positions are correct after offset
- **WHEN** the periodic table is rendered
- **THEN** Actinium (atomicNumber 89) occupies grid-column 4, grid-row 11 (shifted +1 from previous col 3, row 10)

---

### Requirement: Lanthanide and actinide series labels are visible in the grid
The grid SHALL render a "Lanthanides 57–71" label cell at grid-column 1, grid-row 10 and an "Actinides 89–103" label cell at grid-column 1, grid-row 11. Labels SHALL be rotated 90° or abbreviated to fit the cell, be non-interactive, and use the respective series color.

#### Scenario: Lanthanide label is visible
- **WHEN** the periodic table is rendered
- **THEN** a label reading "Lanthanides" or "57–71" is visible at the left edge of the lanthanide row

#### Scenario: Actinide label is visible
- **WHEN** the periodic table is rendered
- **THEN** a label reading "Actinides" or "89–103" is visible at the left edge of the actinide row
