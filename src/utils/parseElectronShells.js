// Map Unicode superscript digits to numeric values
const SUPERSCRIPT = {
  '\u00B9': 1, '\u00B2': 2, '\u00B3': 3,
  '\u2074': 4, '\u2075': 5, '\u2076': 6,
  '\u2077': 7, '\u2078': 8, '\u2079': 9,
  '\u2070': 0,
};

function parseSuperscript(str) {
  const digits = str.split('').map((c) => SUPERSCRIPT[c]);
  if (digits.some((d) => d === undefined)) return 0;
  return parseInt(digits.join(''), 10);
}

/**
 * Parse an electron configuration string into an array of per-shell electron counts.
 * e.g. "1s² 2s² 2p⁶ 3s¹" → [2, 8, 1]
 * Returns [] for null/empty input.
 */
// All Unicode superscript digit characters
const SUP_CHARS = '\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079\u2070';
const TOKEN_RE  = new RegExp(`(\\d)[spdf]([${SUP_CHARS}]+)`, 'g');

export function parseShells(electronConfig) {
  if (!electronConfig) return [];

  const shellMap = {};
  // Match tokens like: 1s², 2p⁶, 3d¹⁰, 4f¹⁴
  const regex = new RegExp(TOKEN_RE.source, 'g');
  let match;
  while ((match = regex.exec(electronConfig)) !== null) {
    const shell = parseInt(match[1], 10);
    const count = parseSuperscript(match[2]);
    if (count > 0) {
      shellMap[shell] = (shellMap[shell] || 0) + count;
    }
  }

  const keys = Object.keys(shellMap).map(Number);
  if (keys.length === 0) return [];
  const maxShell = Math.max(...keys);
  const shells = [];
  for (let i = 1; i <= maxShell; i++) {
    shells.push(shellMap[i] || 0);
  }
  return shells;
}
