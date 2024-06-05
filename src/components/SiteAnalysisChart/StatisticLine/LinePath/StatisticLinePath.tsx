import {
  GAP_BETWEEN_LINE_AND_BAR,
  ARROW_SIZE,
  LINE_VERTICAL_LEVEL,
} from '../../../../constants/constants';

export const StatisticLinePath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): string => {
  return `M${startX},${startY - GAP_BETWEEN_LINE_AND_BAR} V${LINE_VERTICAL_LEVEL} H${endX} V${endY - GAP_BETWEEN_LINE_AND_BAR}`;
};

export const ArrowHead = (x: number, y: number) => (
  <polygon
    points={`${x - ARROW_SIZE},${y - ARROW_SIZE} ${x + ARROW_SIZE},${y - ARROW_SIZE} ${x},${y + ARROW_SIZE}`}
    fill="black"
  />
);
