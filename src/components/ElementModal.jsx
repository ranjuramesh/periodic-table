import { categories } from '../data/elements';
import BohrDiagram from './BohrDiagram';

function ElementModal({ element, onClose, mode = 'modal' }) {
  if (!element) return null;

  const category = categories[element.category] || categories['unknown'];
  const isPanel = mode === 'panel';

  const content = (
    <div
      className={isPanel ? 'detail-panel' : 'modal-content'}
      onClick={(e) => e.stopPropagation()}
      style={isPanel
        ? { borderLeftColor: category.color }
        : { borderColor: category.color }
      }
    >
      <button className="modal-close" onClick={onClose}>×</button>

      <div className="modal-header" style={{ backgroundColor: category.color }}>
        <span className="modal-atomic-number">{element.atomicNumber}</span>
        <span className="modal-symbol">{element.symbol}</span>
        <span className="modal-name">{element.name}</span>
      </div>

      <div className="modal-body">
          <BohrDiagram element={element} />
          <p className="element-description">{element.description}</p>
          
          <div className="element-properties">
            <div className="property">
              <span className="property-label">Category</span>
              <span className="property-value">{category.name}</span>
            </div>
            <div className="property">
              <span className="property-label">Atomic Mass</span>
              <span className="property-value">{element.atomicMass} u</span>
            </div>
            <div className="property">
              <span className="property-label">Electron Configuration</span>
              <span className="property-value">{element.electronConfig}</span>
            </div>
            <div className="property">
              <span className="property-label">Electronegativity</span>
              <span className="property-value">{element.electronegativity || 'N/A'}</span>
            </div>
            <div className="property">
              <span className="property-label">Density</span>
              <span className="property-value">{element.density ? `${element.density} g/cm³` : 'N/A'}</span>
            </div>
            <div className="property">
              <span className="property-label">Melting Point</span>
              <span className="property-value">{element.meltingPoint ? `${element.meltingPoint} °C` : 'N/A'}</span>
            </div>
            <div className="property">
              <span className="property-label">Boiling Point</span>
              <span className="property-value">{element.boilingPoint ? `${element.boilingPoint} °C` : 'N/A'}</span>
            </div>
            <div className="property">
              <span className="property-label">Discovered By</span>
              <span className="property-value">{element.discoveredBy}</span>
            </div>
            <div className="property">
              <span className="property-label">Year Discovered</span>
              <span className="property-value">{element.yearDiscovered || 'Ancient'}</span>
            </div>
            <div className="property">
              <span className="property-label">Group</span>
              <span className="property-value">{element.group || 'N/A'}</span>
            </div>
            <div className="property">
              <span className="property-label">Period</span>
              <span className="property-value">{element.period}</span>
            </div>
          </div>
        </div>
    </div>
  );

  if (isPanel) {
    return content;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {content}
    </div>
  );
}

export default ElementModal;
