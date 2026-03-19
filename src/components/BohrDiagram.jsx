import { parseShells } from '../utils/parseElectronShells';
import { categories } from '../data/elements';

const SIZE      = 200;
const CX        = SIZE / 2;
const CY        = SIZE / 2;
const NUCLEUS_R = 20;
const PADDING   = 10;
const ELECTRON_R = 3;

function BohrDiagram({ element }) {
  if (!element) return null;

  const shells = parseShells(element.electronConfig);
  const category = categories[element.category] || categories['unknown'];
  const nucleusColor = category.color;
  const textColor = category.textColor || '#ffffff';

  // Available radial space from nucleus edge to SVG edge minus padding
  const available = CX - NUCLEUS_R - PADDING;
  const step = shells.length > 0 ? available / shells.length : 0;

  return (
    <svg
      className="bohr-diagram"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Bohr model for ${element.name}`}
    >
      {/* Orbital rings */}
      {shells.map((_, i) => {
        const r = NUCLEUS_R + step * (i + 1);
        return (
          <circle
            key={`ring-${i}`}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
        );
      })}

      {/* Electron dots */}
      {shells.map((count, i) => {
        const r = NUCLEUS_R + step * (i + 1);
        if (count === 0) return null;
        return Array.from({ length: count }, (_, j) => {
          const angle = (2 * Math.PI * j) / count - Math.PI / 2;
          const ex = CX + r * Math.cos(angle);
          const ey = CY + r * Math.sin(angle);
          return (
            <circle
              key={`e-${i}-${j}`}
              cx={ex}
              cy={ey}
              r={ELECTRON_R}
              fill="rgba(255,255,255,0.72)"
            />
          );
        });
      })}

      {/* Nucleus */}
      <circle cx={CX} cy={CY} r={NUCLEUS_R} fill={nucleusColor} />
      <text
        x={CX}
        y={CY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={element.symbol.length > 2 ? '8' : '11'}
        fontWeight="700"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
        fill={textColor}
      >
        {element.symbol}
      </text>
    </svg>
  );
}

export default BohrDiagram;
