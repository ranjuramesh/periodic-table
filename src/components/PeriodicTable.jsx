import Element from './Element';
import { elements, categories } from '../data/elements';

function PeriodicTable({ onElementClick, selectedCategory, searchTerm, heatmapProperty, isModalOpen }) {
  // Check if an element matches the search term
  const matchesSearch = (element) => {
    if (!searchTerm) return false;
    const term = searchTerm.toLowerCase();
    return (
      element.name.toLowerCase().includes(term) ||
      element.symbol.toLowerCase().includes(term) ||
      element.atomicNumber.toString() === term
    );
  };

  const hasSearchTerm = searchTerm.length > 0;

  // Group labels: 1–18 at gridRow 1, gridColumn 2–19
  const groupLabels = Array.from({ length: 18 }, (_, i) => (
    <div
      key={`group-${i + 1}`}
      className="grid-label"
      style={{ gridColumn: i + 2, gridRow: 1 }}
    >
      {i + 1}
    </div>
  ));

  // Period labels: 1–7 at gridColumn 1, gridRow 2–8
  const periodLabels = Array.from({ length: 7 }, (_, i) => (
    <div
      key={`period-${i + 1}`}
      className="grid-label"
      style={{ gridColumn: 1, gridRow: i + 2 }}
    >
      {i + 1}
    </div>
  ));

  const lanthanideColor = categories['lanthanide'].color;
  const actinideColor = categories['actinide'].color;

  return (
    <div className="periodic-table-container">
      <div className="periodic-table">
        {groupLabels}
        {periodLabels}

        {/* Lanthanide series label — col 1, row 10 */}
        <div
          className="grid-label series-label"
          style={{ gridColumn: 1, gridRow: 10, color: lanthanideColor }}
          title="Lanthanides (57–71)"
        >
          57–71
        </div>

        {/* Actinide series label — col 1, row 11 */}
        <div
          className="grid-label series-label"
          style={{ gridColumn: 1, gridRow: 11, color: actinideColor }}
          title="Actinides (89–103)"
        >
          89–103
        </div>

        {elements.map((element) => {
          const isSearchMatch = matchesSearch(element);
          return (
            <Element
              key={element.atomicNumber}
              element={element}
              onClick={onElementClick}
              isHighlighted={selectedCategory === null && !hasSearchTerm}
              isFiltered={
                hasSearchTerm
                  ? isSearchMatch
                  : selectedCategory === null || element.category === selectedCategory
              }
              isSearchMatch={isSearchMatch}
              heatmapProperty={heatmapProperty}
              isModalOpen={isModalOpen}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PeriodicTable;
