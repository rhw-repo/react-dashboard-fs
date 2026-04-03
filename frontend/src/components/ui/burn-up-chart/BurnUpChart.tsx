import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts';
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

type RawData = (string | number)[][];

function createOption(_rawData: RawData): EChartsOption {
  return {
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData,
      },
      {
        id: 'dataset_calls_completed',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Metric', '=': 'Calls Completed' }],
          },
        },
      },
      {
        id: 'dataset_people_contacted',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Metric', '=': 'People Contacted' }],
          },
        },
      },
    ],
    title: {
      text: 'Sprint Burnup Chart - Task Completion Progress',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      name: 'Sprint Day',
      nameLocation: 'middle',
      nameGap: 25,
    },
    yAxis: {
      name: 'Cumulative Tasks',
      nameLocation: 'middle',
      nameGap: 50,
    },
    series: [
      {
        type: 'line',
        datasetId: 'dataset_calls_completed',
        showSymbol: true,
        smooth: true,
        encode: {
          x: 'Day',
          y: 'Count',
          itemName: 'Day',
          tooltip: ['Count'],
        },
        name: 'Calls Completed',
      },
      {
        type: 'line',
        datasetId: 'dataset_people_contacted',
        showSymbol: true,
        smooth: true,
        encode: {
          x: 'Day',
          y: 'Count',
          itemName: 'Day',
          tooltip: ['Count'],
        },
        name: 'People Contacted',
      },
    ],
  };
}

export function BurnUpChart() {
  const {
    isPending,
    error,
    data: _rawData,
  } = useQuery<RawData>({
    queryKey: ['burnupChartData'],
    queryFn: () => fetch('/data/asset/data/sprint-burnup-data.json').then((res) => res.json()),
  });

  const option = useMemo(() => {
    if (!_rawData) return null;
    return createOption(_rawData);
  }, [_rawData]);

  if (isPending) return <div>Loading chart...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return <EChart option={option} />;
}
