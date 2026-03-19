// Determine the standard phase of an element at room temperature (~25°C)
export function getPhase(element) {
  if (element.meltingPoint === null || element.meltingPoint === undefined) {
    return 'Unknown';
  }
  if (element.meltingPoint > 25) return 'Solid';
  if (element.boilingPoint === null || element.boilingPoint === undefined) {
    return 'Unknown';
  }
  if (element.boilingPoint > 25) return 'Liquid';
  return 'Gas';
}

// Muted phase indicator colors matching the dark theme
export const PHASE_COLOR = {
  Solid:   '#4d7c9a',
  Liquid:  '#5a9c7a',
  Gas:     '#9c7a5a',
  Unknown: '#6b7280',
};
