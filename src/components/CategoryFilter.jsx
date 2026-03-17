import { categories } from '../data/elements';

function CategoryFilter({ selectedCategory, onSelectCategory, mode = 'filter' }) {
  // Legend mode: display-only color swatches, no interaction
  if (mode === 'legend') {
    return (
      <div className="category-legend">
        {Object.entries(categories).map(([key, { name, color }]) => (
          <div key={key} className="legend-item">
            <span className="legend-swatch" style={{ backgroundColor: color }} />
            {name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="category-filter">
      <button
        className={`filter-btn all-elements ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {Object.entries(categories).map(([key, { name, color, textColor }]) => (
        <button
          key={key}
          className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
          style={{
            backgroundColor: selectedCategory === key ? color : 'transparent',
            borderColor: color,
            color: selectedCategory === key ? textColor : color
          }}
          onClick={() => onSelectCategory(key)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
