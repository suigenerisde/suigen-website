import { Svg, Path, Circle, Text, G, Line } from '@react-pdf/renderer';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0-5
    maxValue: number;
  }[];
  size?: number;
  color?: string;
  backgroundColor?: string;
  gridColor?: string;
  labelColor?: string;
}

// Berechnet Punkt auf dem Radar für gegebenen Winkel und Radius
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Erstellt einen Polygon-Pfad aus Punkten
const createPolygonPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';
  const pathParts = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`);
  return pathParts.join(' ') + ' Z';
};

export function RadarChart({
  data,
  size = 200,
  color = '#14b8a6',
  backgroundColor = '#14b8a620',
  gridColor = '#8896a6',
  labelColor = '#8896a6',
}: RadarChartProps) {
  // ViewBox etwas größer für Label-Platz, aber Chart füllt Container besser
  const padding = 30; // Reduziertes Padding
  const viewBoxSize = size + padding * 2;
  const center = viewBoxSize / 2;
  const radius = size * 0.38; // Größerer Chart-Radius
  const labelRadius = size * 0.48; // Labels knapp außerhalb
  const numAxes = data.length;
  const angleStep = 360 / numAxes;

  // Grid-Ringe (5 Stufen für Werte 1-5)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Punkte für jeden Grid-Ring berechnen
  const gridPaths = gridLevels.map((level) => {
    const points = data.map((_, i) => {
      const angle = i * angleStep;
      return polarToCartesian(center, center, radius * level, angle);
    });
    return createPolygonPath(points);
  });

  // Achsenlinien
  const axisLines = data.map((_, i) => {
    const angle = i * angleStep;
    const endPoint = polarToCartesian(center, center, radius, angle);
    return { x1: center, y1: center, x2: endPoint.x, y2: endPoint.y };
  });

  // Datenpunkte berechnen
  const dataPoints = data.map((item, i) => {
    const angle = i * angleStep;
    const normalizedValue = item.value / item.maxValue;
    return polarToCartesian(center, center, radius * normalizedValue, angle);
  });
  const dataPath = createPolygonPath(dataPoints);

  // Label-Positionen
  const labelPositions = data.map((item, i) => {
    const angle = i * angleStep;
    const pos = polarToCartesian(center, center, labelRadius, angle);

    // Text-Anchor basierend auf Position
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    if (pos.x < center - 10) textAnchor = 'end';
    else if (pos.x > center + 10) textAnchor = 'start';

    return { ...pos, label: item.label, textAnchor, value: item.value };
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
      {/* Grid-Ringe */}
      <G>
        {gridPaths.map((path, i) => (
          <Path
            key={`grid-${i}`}
            d={path}
            fill="none"
            stroke={gridColor}
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
        ))}
      </G>

      {/* Achsenlinien */}
      <G>
        {axisLines.map((line, i) => (
          <Line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={gridColor}
            strokeWidth={0.5}
            strokeOpacity={0.4}
          />
        ))}
      </G>

      {/* Datenfläche */}
      <Path
        d={dataPath}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={2}
      />

      {/* Datenpunkte */}
      <G>
        {dataPoints.map((point, i) => (
          <Circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={color}
          />
        ))}
      </G>

      {/* Labels */}
      <G>
        {labelPositions.map((pos, i) => (
          <Text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y + 3}
            style={{
              fontSize: 8,
              fill: labelColor,
              textAnchor: pos.textAnchor,
            }}
          >
            {pos.label}
          </Text>
        ))}
      </G>

      {/* Werte an den Punkten */}
      <G>
        {dataPoints.map((point, i) => (
          <Text
            key={`value-${i}`}
            x={point.x}
            y={point.y - 8}
            style={{
              fontSize: 7,
              fill: color,
              textAnchor: 'middle',
              fontWeight: 'bold',
            }}
          >
            {data[i].value}
          </Text>
        ))}
      </G>
    </Svg>
  );
}
