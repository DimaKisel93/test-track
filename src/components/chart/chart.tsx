import { Instances, TestData } from "../../types/types";
import {
  calculateHeightsForInstances,
  getTotalHeight,
} from "../../utils/calculateChartHeights";
import {
  arrowGap,
  arrowHeight,
  barGap,
  barWidth,
  cornerRadius,
  svgHeight,
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

  const devSum =
    heightsForInstances.dev.front +
    heightsForInstances.dev.back +
    heightsForInstances.dev.db;
  const testSum =
    heightsForInstances.test.front +
    heightsForInstances.test.back +
    heightsForInstances.test.db;
  const prodSum =
    heightsForInstances.prod.front +
    heightsForInstances.prod.back +
    heightsForInstances.prod.db;

  const arrowPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => {
    return `M${startX},${startY - arrowGap} V${startY - arrowHeight} H${endX} V${endY - arrowGap}`;
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
          console.log(totalHeight);
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
            svgHeight - devSum,
            barWidth + barGap + barWidth / 3,
            svgHeight - testSum,
          )}
          stroke="black"
          fill="transparent"
          strokeWidth="2"
        />
        {arrowHead(barWidth + barGap + barWidth / 3, svgHeight - testSum - 5)}
        <path
          d={arrowPath(
            barWidth + barGap + (barWidth * 2) / 3,
            svgHeight - devSum,
            2 * (barWidth + barGap) + barWidth / 2,
            svgHeight - prodSum,
          )}
          stroke="black"
          fill="transparent"
          strokeWidth="2"
        />
        {arrowHead(2 * (barWidth + barGap) + barWidth / 2, svgHeight - prodSum)}
      </svg>
    </div>
  );
};
