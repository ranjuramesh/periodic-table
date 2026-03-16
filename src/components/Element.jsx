import { categories } from '../data/elements';

function Element({ element, onClick, isHighlighted, isFiltered, isSearchMatch }) {
  const category = categories[element.category] || categories['unknown'];
  const textColor = category.textColor || '#1a1a2e';
  
  const style = {
    gridColumn: element.group || 'auto',
    gridRow: element.period + (element.category === 'lanthanide' ? 2 : element.category === 'actinide' ? 2 : 0),
    backgroundColor: isFiltered ? category.color : (isHighlighted ? category.color : `${category.color}40`),
    opacity: isFiltered ? 1 : (isHighlighted ? 1 : 0.4),
  };

  // Special positioning for lanthanides and actinides
  if (element.category === 'lanthanide') {
    style.gridRow = 9;
    style.gridColumn = element.atomicNumber - 54;
  } else if (element.category === 'actinide') {
    style.gridRow = 10;
    style.gridColumn = element.atomicNumber - 86;
  }

  // Add glow effect for search matches
  if (isSearchMatch) {
    style.boxShadow = `0 0 15px 5px ${category.color}, 0 0 30px 10px ${category.color}80`;
    style.transform = 'scale(1.1)';
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
