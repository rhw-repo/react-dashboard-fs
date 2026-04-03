export type RawData = (string | number)[][];

export interface BurnUpChartOption {
  dataset: (
    | { id: string; source: RawData }
    | {
        id: string;
        fromDatasetId: string;
        transform: {
          type: string;
          config: { and: { dimension: string; '=': string }[] };
        };
      }
  )[];
  title: { text: string };
  tooltip: { trigger: string };
  xAxis: { type: string; name: string; nameLocation: string; nameGap: number };
  yAxis: { name: string; nameLocation: string; nameGap: number };
  series: {
    type: string;
    datasetId: string;
    showSymbol: boolean;
    smooth: boolean;
    encode: { x: string; y: string; itemName: string; tooltip: string[] };
    name: string;
  }[];
}

export function createOption(_rawData: RawData): BurnUpChartOption {
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
