import { SiteAnalysisData, Instances, TestData } from '../types/types';

const calculateScaledHeight = (
  value: number,
  totalValue: number,
  layoutHeight: number,
) => {
  return Math.round((value / totalValue) * layoutHeight);
};

export const getTotalSiteAnalysisValues = (
  chartData: TestData,
): Record<Instances, number> => ({
  dev: chartData.dev.front + chartData.dev.back + chartData.dev.db,
  test: chartData.test.front + chartData.test.back + chartData.test.db,
  prod: chartData.prod.front + chartData.prod.back + chartData.prod.db,
});

const layoutHeights: Record<Instances, number> = {
  dev: 265,
  test: 234,
  prod: 245,
};

export const calculateHeightsForSiteData = (
  chartData: TestData,
): Record<Instances, SiteAnalysisData> => {
  const total = getTotalSiteAnalysisValues(chartData);
  const {
    dev: totalDevInstance,
    test: totalTestInstance,
    prod: totalProdInstance,
  } = total;

  return {
    dev: {
      db: calculateScaledHeight(
        chartData.dev.db,
        totalDevInstance,
        layoutHeights.dev,
      ),
      back: calculateScaledHeight(
        chartData.dev.back,
        totalDevInstance,
        layoutHeights.dev,
      ),
      front: calculateScaledHeight(
        chartData.dev.front,
        totalDevInstance,
        layoutHeights.dev,
      ),
    },
    test: {
      db: calculateScaledHeight(
        chartData.test.db,
        totalTestInstance,
        layoutHeights.test,
      ),
      back: calculateScaledHeight(
        chartData.test.back,
        totalTestInstance,
        layoutHeights.test,
      ),
      front: calculateScaledHeight(
        chartData.test.front,
        totalTestInstance,
        layoutHeights.test,
      ),
    },
    prod: {
      db: calculateScaledHeight(
        chartData.prod.db,
        totalProdInstance,
        layoutHeights.prod,
      ),
      back: calculateScaledHeight(
        chartData.prod.back,
        totalProdInstance,
        layoutHeights.prod,
      ),
      front: calculateScaledHeight(
        chartData.prod.front,
        totalProdInstance,
        layoutHeights.prod,
      ),
    },
  };
};

export const getTotalBarHeight = (
  heightsForInstances: Record<Instances, SiteAnalysisData>,
  instance: Instances,
) => {
  return (
    heightsForInstances[instance].db +
    heightsForInstances[instance].back +
    heightsForInstances[instance].front
  );
};

export const calculateStatisticDifference = (sum1: number, sum2: number) => {
  const diff = sum2 - sum1;
  const sign = diff > 0 ? '+' : '-';
  return `${sign}${Math.abs(diff)}`;
};
