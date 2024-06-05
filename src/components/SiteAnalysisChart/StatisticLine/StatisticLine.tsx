import React from 'react';
import { SVG_HEIGHT } from '../../../constants/constants';
import { ArrowHead, StatisticLinePath } from './LinePath/StatisticLinePath';
import { StatisticTitle } from './StatisticTitle/StatisticTitle';

interface StatisticLineProps {
  startHeight: number;
  endHeight: number;
  startX: number;
  endX: number;
  difference: string;
}

export const StatisticLine = ({
  startHeight,
  endHeight,
  startX,
  endX,
  difference,
}: StatisticLineProps) => {
  return (
    <g>
      <path
        d={StatisticLinePath(
          startX,
          SVG_HEIGHT - startHeight,
          endX,
          SVG_HEIGHT - endHeight,
        )}
        stroke="black"
        fill="transparent"
        strokeWidth="2"
      />
      {ArrowHead(endX, SVG_HEIGHT - endHeight - 5)}
      {StatisticTitle(startX, endX, difference)}
    </g>
  );
};
