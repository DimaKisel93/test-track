import { Instances, TestData } from "../../types/types";
import {
  calculateHeightsForInstances,
  getTotalHeight,
} from "../../utils/calculateChartHeights";
import {
  arrowGap,
  barGap,
  barWidth,
  cornerRadius,
  DEV,
  fixedY,
  PROD,
  svgHeight,
  TEST,
} from "../../constants/chatConstants";

import styles from "./chart.module.scss";

interface ChartData {
  chartData: TestData;
}

export const Chart = ({ chartData }: ChartData) => {
  if (!chartData) {
    return <div>Loading...</div>;
  }

  const heightsForInstances = calculateHeightsForInstances(chartData);
  const instances = Object.keys(heightsForInstances);

  const devBarHeight = getTotalHeight(heightsForInstances, DEV);
  const testBarHeight = getTotalHeight(heightsForInstances, TEST);
  const prodBarHeight = getTotalHeight(heightsForInstances, PROD);

  const arrowPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => {
    return `M${startX},${startY - arrowGap} V${fixedY} H${endX} V${endY - arrowGap}`;
  };

  const arrowHead = (x: number, y: number) => (
    <polygon
      points={`${x - 5},${y - 5} ${x + 5},${y - 5} ${x},${y + 5}`}
      fill="black"
    />
  );

  return (
    <div className={styles.container}>
      <h1>{chartData.title}</h1>
      <svg
        className={styles.chart}
        height={svgHeight}
        width={(barWidth + barGap) * instances.length - barGap}
      >
        {(["dev", "test", "prod"] as Instances[]).map((instance, index) => {
          const totalHeight = getTotalHeight(heightsForInstances, instance);
          return (
            <g
              key={instance}
              className={styles.bar}
              transform={`translate(${index * (barWidth + barGap)}, 0)`}
            >
              <rect
                x="0"
                y={svgHeight - totalHeight}
                width={barWidth}
                height={totalHeight}
                rx={cornerRadius}
                ry={cornerRadius}
                className={styles.barBackground}
              />
              <rect
                x="0"
                y={svgHeight - heightsForInstances[instance].db}
                width={barWidth}
                height={heightsForInstances[instance].db}
                className={styles.dbData}
              />
              <rect
                x="0"
                y={
                  svgHeight -
                  heightsForInstances[instance].db -
                  heightsForInstances[instance].back
                }
                className={styles.backData}
                height={heightsForInstances[instance].back}
                width={barWidth}
              />
              <rect
                x="0"
                y={
                  svgHeight -
                  heightsForInstances[instance].db -
                  heightsForInstances[instance].back -
                  heightsForInstances[instance].front
                }
                className={styles.frontData}
                height={heightsForInstances[instance].front}
                width={barWidth}
              />
            </g>
          );
        })}
        <path
          d={arrowPath(
            barWidth / 2,
            svgHeight - devBarHeight,
            barWidth + barGap + barWidth / 3,
            svgHeight - testBarHeight,
          )}
          stroke="black"
          fill="transparent"
          strokeWidth="2"
        />
        {arrowHead(
          barWidth + barGap + barWidth / 3,
          svgHeight - testBarHeight - 5,
        )}
        <path
          d={arrowPath(
            barWidth + barGap + (barWidth * 2) / 3,
            svgHeight - testBarHeight,
            2 * (barWidth + barGap) + barWidth / 2,
            svgHeight - prodBarHeight,
          )}
          stroke="black"
          fill="transparent"
          strokeWidth="2"
        />
        {arrowHead(
          2 * (barWidth + barGap) + barWidth / 2,
          svgHeight - prodBarHeight - 5,
        )}
      </svg>
    </div>
  );
};
