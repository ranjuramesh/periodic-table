import Element from './Element';
import { elements } from '../data/elements';

function PeriodicTable({ onElementClick, selectedCategory, searchTerm }) {
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

  return (
    <div className="periodic-table-container">
      <div className="periodic-table">
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
            />
          );
        })}
      </div>
      
      {/* Lanthanide/Actinide labels */}
      <div className="series-labels">
        <div className="series-label lanthanide-label">Lanthanides</div>
        <div className="series-label actinide-label">Actinides</div>
      </div>
    </div>
  );
}

export default PeriodicTable;
