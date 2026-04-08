import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
} from 'echarts/components';
/*import type {
 // DatasetComponentOption,
  //TitleComponentOption,
  //TooltipComponentOption,
  //GridComponentOption,
} from 'echarts/components';*/
import { LineChart } from 'echarts/charts';
/*import type { LineSeriesOption } from 'echarts/charts';*/
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EChart } from '../EChart';
import { createOption, type RawData } from './burn-up-chart-options';
import type { EChartsOption } from 'echarts';

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

export function BurnUpChart() {
  const {
    isPending,
    error,
    data: fetchedMockData,
  } = useQuery<RawData>({
    queryKey: ['burnupChartData'],
    queryFn: () => fetch('/data/asset/data/sprint-burnup-data.json').then((res) => res.json()),
  });

  const option = useMemo(() => {
    if (!fetchedMockData) return null;
    return createOption(fetchedMockData) as unknown as EChartsOption;
  }, [fetchedMockData]);

  if (isPending) return <div>Loading chart...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return <EChart option={option} />;
}
