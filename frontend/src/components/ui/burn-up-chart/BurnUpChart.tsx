import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
/*import type { LineSeriesOption } from "echarts/charts";*/
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EChart } from '../EChart';
import { createOption, type RawData } from './burn-up-chart-options';
import type { EChartsOption } from 'echarts';
import EmptyLoadingSpinner from '@/components/ui/loading-fallback-ui/EmptyLoadingSpinner';

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
    queryFn: () => fetch('/data/asset/data/mock-burnup-chart-data.json').then((res) => res.json()),
    // TEMP to display the Spinner & Badge for styling
   /* queryFn: async () => {
      const response = await fetch('/data/asset/data/mock-burnup-chart-data.json');
      const data = await response.json();
      // Add artificial delay to see the Spinner
      await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 second delay
      return data;
    },*/
  });

  const option = useMemo(() => {
    if (!fetchedMockData) return null;
    return createOption(fetchedMockData) as unknown as EChartsOption;
  }, [fetchedMockData]);

  if (isPending) return <EmptyLoadingSpinner />

  if (error) return <div>An error has occurred: {error.message}</div>;

  return <EChart option={option} />;
}
