import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
} from 'echarts/components';
import type {
  DatasetComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import type { LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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

type EChartsOption = echarts.ComposeOption<
  DatasetComponentOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption
>;

const ROOT_PATH = 'https://echarts.apache.org/examples';

const chartDom = document.getElementById('main')!;
const myChart = echarts.init(chartDom);
let option: EChartsOption;

$.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json', function (_rawData) {
  run(_rawData);
});

function run(_rawData: any) {
  option = {
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
              { dimension: 'Year', gte: 1950 },
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
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Country', '=': 'France' },
            ],
          },
        },
      },
    ],
    title: {
      text: 'Income of Germany and France since 1950',
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

  myChart.setOption<echarts.EChartsOption>(option);
}

option && myChart.setOption(option);
