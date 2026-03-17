import { categories } from '../data/elements';

function Element({ element, onClick, isHighlighted, isFiltered, isSearchMatch }) {
  const category = categories[element.category] || categories['unknown'];
  const textColor = category.textColor || '#1a1a2e';

  // All positions shifted +1 on each axis to make room for period/group label cells
  const style = {
    gridColumn: element.group ? element.group + 1 : 'auto',
    gridRow: element.period + 1,
    backgroundColor: isFiltered ? category.color : (isHighlighted ? category.color : `${category.color}40`),
    opacity: isFiltered ? 1 : (isHighlighted ? 1 : 0.4),
  };

  // Special positioning for lanthanides and actinides (f-block rows 10 & 11)
  if (element.category === 'lanthanide') {
    style.gridRow = 10;
    style.gridColumn = element.atomicNumber - 53; // was -54, +1 for label column
  } else if (element.category === 'actinide') {
    style.gridRow = 11;
    style.gridColumn = element.atomicNumber - 85; // was -86, +1 for label column
  }

  // Search match: rely on CSS class only — no inline transforms
  if (isSearchMatch) {
    style.zIndex = 5;
  }

  // Text style with proper contrast colors
  const textStyle = { color: textColor };
  const secondaryTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div 
      className={`element ${isHighlighted ? 'highlighted' : ''} ${isSearchMatch ? 'search-match' : ''}`}
      style={style}
      onClick={() => onClick(element)}
    >
      <span className="atomic-number" style={secondaryTextStyle}>{element.atomicNumber}</span>
      <span className="symbol" style={textStyle}>{element.symbol}</span>
      <span className="name" style={secondaryTextStyle}>{element.name}</span>
      <span className="atomic-mass" style={secondaryTextStyle}>{element.atomicMass}</span>
    </div>
  );
}

export default Element;
