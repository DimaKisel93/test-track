import { Instances, TestData } from "../../types/types";
import {
  calculateHeightsForInstances,
  getTotalHeight,
} from "../../utils/calculateChartHeights";
import {
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
      </svg>
    </div>
  );
};
