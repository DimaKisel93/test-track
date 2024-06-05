import {
  ELLIPSE_RX,
  ELLIPSE_RY,
  LINE_VERTICAL_LEVEL,
  FONT_SIZE,
} from '../../../../constants/constants';

export const StatisticTitle = (
  startX: number,
  endX: number,
  difference: string,
) => {
  const midX = (startX + endX) / 2;
  return (
    <g>
      <ellipse
        cx={midX}
        cy={LINE_VERTICAL_LEVEL}
        rx={ELLIPSE_RX}
        ry={ELLIPSE_RY}
        fill="white"
        stroke="black"
      />
      <text
        x={midX}
        y={LINE_VERTICAL_LEVEL + 3}
        textAnchor="middle"
        fontSize={FONT_SIZE}
      >
        {difference}
      </text>
    </g>
  );
};
