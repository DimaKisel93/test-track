import {
  BAR_GAP,
  BAR_WIDTH,
  CORNER_RADIUS,
  SVG_HEIGHT,
} from '../../../constants/constants';
import { SiteAnalysisData } from '../../../types/types';

import styles from './Bar.module.scss';

interface BarProps {
  totalHeight: number;
  siteAnalysisHeights: SiteAnalysisData;
  index: number;
}

export const Bar = ({ totalHeight, siteAnalysisHeights, index }: BarProps) => (
  <g
    className={styles.bar}
    transform={`translate(${index * (BAR_WIDTH + BAR_GAP)}, 0)`}
  >
    <rect
      x="0"
      y={SVG_HEIGHT - totalHeight}
      width={BAR_WIDTH}
      height={totalHeight}
      rx={CORNER_RADIUS}
      ry={CORNER_RADIUS}
      className={styles.barBackground}
    />
    <rect
      x="0"
      y={SVG_HEIGHT - siteAnalysisHeights.db}
      width={BAR_WIDTH}
      height={siteAnalysisHeights.db}
      className={styles.dbData}
    />
    <rect
      x="0"
      y={SVG_HEIGHT - siteAnalysisHeights.db - siteAnalysisHeights.back}
      className={styles.backData}
      height={siteAnalysisHeights.back}
      width={BAR_WIDTH}
    />
    <rect
      x="0"
      y={
        SVG_HEIGHT -
        siteAnalysisHeights.db -
        siteAnalysisHeights.back -
        siteAnalysisHeights.front
      }
      className={styles.frontData}
      height={siteAnalysisHeights.front}
      width={BAR_WIDTH}
    />
  </g>
);
