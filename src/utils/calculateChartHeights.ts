import { InstanceData, Instances, TestData } from "../types/types";

const calculateScaledHeight = (
  value: number,
  totalValue: number,
  layoutHeight: number,
) => {
  return Math.round((value / totalValue) * layoutHeight);
};

const getTotalValues = (chartData: TestData): Record<Instances, number> => ({
  dev: chartData.dev.front + chartData.dev.back + chartData.dev.db,
  test: chartData.test.front + chartData.test.back + chartData.test.db,
  prod: chartData.prod.front + chartData.prod.back + chartData.prod.db,
});

const layoutHeights: Record<Instances, number> = {
  dev: 265,
  test: 234,
  prod: 245,
};

export const calculateHeightsForInstances = (
  chartData: TestData,
): Record<Instances, InstanceData> => {
  const total = getTotalValues(chartData);
  return {
    dev: {
      db: calculateScaledHeight(chartData.dev.db, total.dev, layoutHeights.dev),
      back: calculateScaledHeight(
        chartData.dev.back,
        total.dev,
        layoutHeights.dev,
      ),
      front: calculateScaledHeight(
        chartData.dev.front,
        total.dev,
        layoutHeights.dev,
      ),
    },
    test: {
      db: calculateScaledHeight(
        chartData.test.db,
        total.test,
        layoutHeights.test,
      ),
      back: calculateScaledHeight(
        chartData.test.back,
        total.test,
        layoutHeights.test,
      ),
      front: calculateScaledHeight(
        chartData.test.front,
        total.test,
        layoutHeights.test,
      ),
    },
    prod: {
      db: calculateScaledHeight(
        chartData.prod.db,
        total.prod,
        layoutHeights.prod,
      ),
      back: calculateScaledHeight(
        chartData.prod.back,
        total.prod,
        layoutHeights.prod,
      ),
      front: calculateScaledHeight(
        chartData.prod.front,
        total.prod,
        layoutHeights.prod,
      ),
    },
  };
};

export const getTotalHeight = (
  heightsForInstances: Record<Instances, InstanceData>,
  instance: Instances,
) => {
  return (
    heightsForInstances[instance].db +
    heightsForInstances[instance].back +
    heightsForInstances[instance].front
  );
};
