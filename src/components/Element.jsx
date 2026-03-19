import { useState } from 'react';
import {
  useFloating, useHover, useInteractions,
  FloatingPortal, flip, shift, offset,
} from '@floating-ui/react';
import { categories } from '../data/elements';
import { getHeatmapStats, getHeatmapColor } from '../utils/heatmap';
import { getPhase, PHASE_COLOR } from '../utils/elementUtils';

function Element({ element, onClick, isHighlighted, isFiltered, isSearchMatch, heatmapProperty, isModalOpen }) {
  const category = categories[element.category] || categories['unknown'];
  const textColor = category.textColor || '#1a1a2e';

  // ── Floating UI hover tooltip ────────────────────────────────────
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { refs: floatRefs, floatingStyles, context } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    placement: 'top',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });
  const hover = useHover(context, { delay: { open: 120, close: 0 } });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const suppressTooltip = isModalOpen || heatmapProperty !== null;
  const showTooltip = tooltipOpen && !suppressTooltip;
  const phase = getPhase(element);
  // Destructure callback refs outside JSX to satisfy react-hooks/refs rule
  const setReference = floatRefs.setReference;
  const setFloating  = floatRefs.setFloating;

  // ── Heatmap colour override ─────────────────────────────────────
  let bgColor;
  if (heatmapProperty) {
    const { min, max } = getHeatmapStats(heatmapProperty);
    bgColor = getHeatmapColor(element[heatmapProperty], min, max);
  } else {
    bgColor = isFiltered ? category.color : (isHighlighted ? category.color : `${category.color}40`);
  }

  // All positions shifted +1 on each axis to make room for period/group label cells
  const style = {
    gridColumn: element.group ? element.group + 1 : 'auto',
    gridRow: element.period + 1,
    backgroundColor: bgColor,
    opacity: heatmapProperty ? 1 : (isFiltered ? 1 : (isHighlighted ? 1 : 0.4)),
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

  // In heatmap mode, text contrast is overridden to white
  const heatTextStyle = heatmapProperty ? { color: '#e2e8f0' } : textStyle;
  const heatSecondaryStyle = heatmapProperty ? { color: '#e2e8f0', opacity: 0.8 } : secondaryTextStyle;

  return (
    <>
      <div
        ref={setReference} // eslint-disable-line react-hooks/refs
        className={`element ${isHighlighted ? 'highlighted' : ''} ${isSearchMatch ? 'search-match' : ''}`}
        style={style}
        onClick={() => onClick(element)}
        {...getReferenceProps()}
      >
        <span className="atomic-number" style={heatSecondaryStyle}>{element.atomicNumber}</span>
        <span className="symbol" style={heatTextStyle}>{element.symbol}</span>
        <span className="name" style={heatSecondaryStyle}>{element.name}</span>
        <span className="atomic-mass" style={heatSecondaryStyle}>{element.atomicMass}</span>
      </div>

      {showTooltip && (
        <FloatingPortal>
          <div
            ref={setFloating} // eslint-disable-line react-hooks/refs
            style={floatingStyles}
            className="element-tooltip"
            {...getFloatingProps()}
          >
            <span className="tooltip-symbol">{element.symbol}</span>
            <span className="tooltip-name">{element.name}</span>
            <div className="tooltip-row">
              <span className="tooltip-label">Mass</span>
              <span className="tooltip-value">{element.atomicMass} u</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">EN</span>
              <span className="tooltip-value">
                {element.electronegativity != null ? element.electronegativity : '—'}
              </span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Phase</span>
              <span className="tooltip-value" style={{ color: PHASE_COLOR[phase] }}>{phase}</span>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

export default Element;
