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
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../error-fallback-ui/ErrorBoundaryFallback';

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

function BurnUpChartContent () {
  const {
    isPending,
    //error,
    data: fetchedMockData,
  } = useQuery<RawData>({
    queryKey: ['burnupChartData'],
    queryFn: () => fetch('/data/asset/data/mock-burnup-chart-data.json').then((res) => {
      if (!res.ok) throw new Error("Network response error")
      return res.json();
    }
    )
   // TEMP to display Spinner & Badge followed by ErrorBoundaryFallbackUI 
/*queryFn: async () => {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate a failed network response
      throw new Error("500 Internal Server Error: Mock data service is down.");
    },
    throwOnError: true, 
    retry: false

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

  return <EChart option={option} />;
}

export function BurnUpChart() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <BurnUpChartContent />
    </ErrorBoundary>
  )
}