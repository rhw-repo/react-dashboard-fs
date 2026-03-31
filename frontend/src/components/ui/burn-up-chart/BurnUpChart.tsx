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
        id: 'dataset_since_1950_of_germany',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1800 },
              { dimension: 'Country', '=': 'Germany' },
            ],
          },
        },
      },
      {
        id: 'dataset_since_1950_of_france',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1800 },
              { dimension: 'Country', '=': 'France' },
            ],
          },
        },
      },
    ],
    title: {
      text: 'SB Burn Up Chart',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {
      name: 'Income',
    },
    series: [
      {
        type: 'line',
        datasetId: 'dataset_since_1950_of_germany',
        showSymbol: false,
        encode: {
          x: 'Year',
          y: 'Income',
          itemName: 'Year',
          tooltip: ['Income'],
        },
      },
      {
        type: 'line',
        datasetId: 'dataset_since_1950_of_france',
        showSymbol: false,
        encode: {
          x: 'Year',
          y: 'Income',
          itemName: 'Year',
          tooltip: ['Income'],
        },
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
    queryFn: () => fetch('/data/asset/data/life-expectancy-table.json').then((res) => res.json()),
  });

  const option = useMemo(() => {
    if (!_rawData) return null;
    return createOption(_rawData);
  }, [_rawData]);

  if (isPending) return <div>Loading chart...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return <EChart option={option} />;
}
