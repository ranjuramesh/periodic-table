import { elements } from '../data/elements';

// Properties available for heatmap mode
export const HEATMAP_PROPERTIES = [
  { key: 'electronegativity', label: 'Electronegativity', unit: '' },
  { key: 'density',           label: 'Density',           unit: 'g/cm³' },
  { key: 'meltingPoint',      label: 'Melting Point',     unit: '°C' },
  { key: 'boilingPoint',      label: 'Boiling Point',     unit: '°C' },
  { key: 'atomicMass',        label: 'Atomic Mass',       unit: 'u' },
];

// Returns { min, max } for a property across all non-null element values
export function getHeatmapStats(propertyKey) {
  const values = elements
    .map((el) => el[propertyKey])
    .filter((v) => v !== null && v !== undefined && !isNaN(v));
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

// Maps a value to a heatmap color.
// Returns a muted neutral for null values.
// Gradient: deep navy (min) → teal (mid) → warm amber (max)
export function getHeatmapColor(value, min, max) {
  if (value === null || value === undefined || isNaN(value)) {
    return 'rgba(255,255,255,0.06)'; // near-invisible neutral for null
  }
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const hue   = Math.round(220 - t * 190); // 220 (blue) → 30 (amber)
  const sat   = Math.round(55  + t * 22);  // 55% → 77%
  const light = Math.round(28  + t * 38);  // 28% → 66%
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

// CSS gradient string for the legend bar (matches getHeatmapColor ends)
export const HEATMAP_GRADIENT =
  'linear-gradient(to right, hsl(220,55%,28%), hsl(125,65%,47%), hsl(30,77%,66%))';
