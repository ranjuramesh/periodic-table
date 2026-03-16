import { categories } from '../data/elements';

function CategoryFilter({ selectedCategory, onSelectCategory, isFullscreen }) {
  return (
    <div className={`category-filter ${isFullscreen ? 'fullscreen-filter' : ''}`}>
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
          {isFullscreen ? name.split(' ')[0] : name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
