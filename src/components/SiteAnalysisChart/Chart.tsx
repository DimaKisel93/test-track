import { Instances, TestData } from '../../types/types';
import {
  calculateHeightsForSiteData,
  getTotalBarHeight,
  getTotalSiteAnalysisValues,
} from '../../utils/calculateChartValues';
import {
  BAR_GAP,
  BAR_WIDTH,
  DEV,
  PROD,
  SVG_HEIGHT,
  TEST,
} from '../../constants/constants';

import styles from './Chart.module.scss';
import { calculateStatisticDifference } from '../../utils/calculateChartValues';
import { Bar } from './Bar/Bar';
import { StatisticLine } from './StatisticLine/StatisticLine';

interface ChartData {
  chartData: TestData;
}

export const Chart = ({ chartData }: ChartData) => {
  if (!chartData) {
    return <div>Loading...</div>;
  }

  const heightsForSiteData = calculateHeightsForSiteData(chartData);
  const siteAnalysisValues = Object.keys(heightsForSiteData);

  const totalSiteData = getTotalSiteAnalysisValues(chartData);
  const {
    dev: totalDevSiteData,
    test: totalTestSiteData,
    prod: totalProdSiteData,
  } = totalSiteData;

  const devBarHeight = getTotalBarHeight(heightsForSiteData, DEV);
  const testBarHeight = getTotalBarHeight(heightsForSiteData, TEST);
  const prodBarHeight = getTotalBarHeight(heightsForSiteData, PROD);

  return (
    <div className={styles.container}>
      <h1>{chartData.title}</h1>
      <svg
        className={styles.chart}
        height={SVG_HEIGHT}
        width={(BAR_WIDTH + BAR_GAP) * siteAnalysisValues.length - BAR_GAP}
      >
        {(['dev', 'test', 'prod'] as Instances[]).map((instance, index) => {
          return (
            <Bar
              key={instance}
              totalHeight={getTotalBarHeight(heightsForSiteData, instance)}
              siteAnalysisHeights={heightsForSiteData[instance]}
              index={index}
            />
          );
        })}
        <StatisticLine
          startHeight={devBarHeight}
          endHeight={testBarHeight}
          startX={BAR_WIDTH / 2}
          endX={BAR_WIDTH + BAR_GAP + BAR_WIDTH / 3}
          difference={calculateStatisticDifference(
            totalDevSiteData,
            totalTestSiteData,
          )}
        />
        <StatisticLine
          startHeight={testBarHeight}
          endHeight={prodBarHeight}
          startX={BAR_WIDTH + BAR_GAP + (BAR_WIDTH * 2) / 3}
          endX={2 * (BAR_WIDTH + BAR_GAP) + BAR_WIDTH / 2}
          difference={calculateStatisticDifference(
            totalTestSiteData,
            totalProdSiteData,
          )}
        />
      </svg>
    </div>
  );
};
