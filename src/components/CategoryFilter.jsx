import { categories } from '../data/elements';
import { HEATMAP_PROPERTIES, getHeatmapStats, HEATMAP_GRADIENT } from '../utils/heatmap';

function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  mode = 'filter',
  heatmapProperty,
  onHeatmapChange,
}) {
  const heatmapStats = heatmapProperty ? getHeatmapStats(heatmapProperty) : null;
  const activeProp   = HEATMAP_PROPERTIES.find((p) => p.key === heatmapProperty);

  // Shared heatmap selector rendered in both modes
  const heatmapSelector = (
    <div className="heatmap-selector">
      <span className="heatmap-label">Heatmap:</span>
      <select
        className="heatmap-select"
        value={heatmapProperty || ''}
        onChange={(e) => onHeatmapChange(e.target.value || null)}
      >
        <option value="">Off</option>
        {HEATMAP_PROPERTIES.map(({ key, label }) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );

  // Gradient legend shown when heatmap is active
  const gradientLegend = heatmapProperty && heatmapStats && (
    <div className="heatmap-legend">
      <div
        className="heatmap-gradient-bar"
        style={{ background: HEATMAP_GRADIENT }}
      />
      <div className="heatmap-legend-labels">
        <span>{Number(heatmapStats.min.toPrecision(4))}</span>
        <span className="heatmap-legend-title">
          {activeProp?.label}{activeProp?.unit ? ` (${activeProp.unit})` : ''}
        </span>
        <span>{Number(heatmapStats.max.toPrecision(4))}</span>
      </div>
    </div>
  );

  // Legend mode (fullscreen): swatches → replaced by gradient when heatmap active
  if (mode === 'legend') {
    return (
      <div className="category-legend">
        {heatmapSelector}
        {heatmapProperty ? gradientLegend : (
          Object.entries(categories).map(([key, { name, color }]) => (
            <div key={key} className="legend-item">
              <span className="legend-swatch" style={{ backgroundColor: color }} />
              {name}
            </div>
          ))
        )}
      </div>
    );
  }

  // Filter mode (standard): category buttons → hidden when heatmap active
  return (
    <div className="category-filter">
      {heatmapSelector}
      {heatmapProperty ? gradientLegend : (
        <>
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
                color: selectedCategory === key ? textColor : color,
              }}
              onClick={() => onSelectCategory(key)}
            >
              {name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default CategoryFilter;
