import { Instances, TestData } from "../../types/types";
import {
  calculateHeightsForInstances,
  svgHeight,
} from "../../utils/calculateChartHeights";

import styles from "./chart.module.scss";

interface ChartData {
  chartData: TestData;
}

export const Chart = ({ chartData }: ChartData) => {
  if (!chartData) {
    return <div>Loading...</div>;
  }

  const heightsForInstances = calculateHeightsForInstances(chartData);

  return (
    <div className={styles.container}>
      <h1>{chartData.title}</h1>
      <div className={styles.chart}>
        {(["dev", "test", "prod"] as Instances[]).map((instance) => (
          <svg
            key={instance}
            className={styles.bar}
            height={svgHeight}
            width="100"
          >
            <rect
              x="0"
              y={svgHeight - heightsForInstances[instance].db}
              width="100"
              height={heightsForInstances[instance].db}
              fill="#2196F3"
            />
            <rect
              x="0"
              y={
                svgHeight -
                heightsForInstances[instance].db -
                heightsForInstances[instance].back
              }
              width="100"
              height={heightsForInstances[instance].back}
              fill="#4CAF50"
            />
            <rect
              x="0"
              y={
                svgHeight -
                heightsForInstances[instance].db -
                heightsForInstances[instance].back -
                heightsForInstances[instance].front
              }
              width="100"
              height={heightsForInstances[instance].front}
              fill="#FFC107"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};
