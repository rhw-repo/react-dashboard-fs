import { describe, it, expect } from 'vitest';
import { createOption, type RawData } from '@/components/ui/burn-up-chart/burn-up-chart-options';

const validData: RawData = [
  ['Day', 'Metric', 'Count'],
  [1, 'Calls Completed', 12],
  [2, 'Calls Completed', 28],
  [1, 'People Contacted', 8],
  [2, 'People Contacted', 18],
];

describe('createOption', () => {
  it('returns a valid ECharts option with 3 datasets', () => {
    const option = createOption(validData);

    expect(option.dataset).toHaveLength(3);
  });

  it('sets the raw dataset source to the input data', () => {
    const option = createOption(validData);
    const datasets = option.dataset as { id: string; source?: RawData }[];

    expect(datasets[0].id).toBe('dataset_raw');
    expect(datasets[0].source).toBe(validData);
  });

  it('separates the raw data into 2 filtered datasets: dataset_calls_completed and dataset_people_contacted', () => {
    const option = createOption(validData);
    const datasets = option.dataset as { id: string; fromDatasetId?: string; transform?: { config: { and: { dimension: string; '=': string }[] } } }[];

    expect(datasets[1].id).toBe('dataset_calls_completed');
    expect(datasets[1].fromDatasetId).toBe('dataset_raw');
    expect(datasets[1].transform?.config.and[0]['=']).toBe('Calls Completed');

    expect(datasets[2].id).toBe('dataset_people_contacted');
    expect(datasets[2].fromDatasetId).toBe('dataset_raw');
    expect(datasets[2].transform?.config.and[0]['=']).toBe('People Contacted');
  });

  // A "series" in ECharts = one visual line/bar/element on the chart
  it('creates 2 visual lines on the chart (one for Calls Completed, referencing dataset_calls_completed and one for People Contacted referencing dataset_people_contacted)', () => {
    const option = createOption(validData);
    const series = option.series as { type: string; datasetId: string; name: string }[];

    expect(series).toHaveLength(2);
    expect(series[0]).toMatchObject({ type: 'line', datasetId: 'dataset_calls_completed', name: 'Calls Completed' });
    expect(series[1]).toMatchObject({ type: 'line', datasetId: 'dataset_people_contacted', name: 'People Contacted' });
  });

  it('sets chart title', () => {
    const option = createOption(validData);
    const title = option.title as { text: string };

    expect(title.text).toBe('Sprint Burnup Chart - Task Completion Progress');
  });

  it('handles an empty array without throwing an error or crash, creates 3 empty datasets when the raw dataset source is an empty array', () => {
    const option = createOption([]);

    expect(option.dataset).toHaveLength(3);
    const datasets = option.dataset as { id: string; source?: RawData }[];
    expect(datasets[0].source).toEqual([]);
  });

  it('handles header-only data (no data rows) without throwing an error, still creates 3 datasets', () => {
    const headerOnly: RawData = [['Day', 'Metric', 'Count']];
    const option = createOption(headerOnly);

    expect(option.dataset).toHaveLength(3);
  });

  it('handles data with only either dataset_calls_completed or dataset_people_contacted without throwing an error or a crash', () => {
    const singleMetric: RawData = [
      ['Day', 'Metric', 'Count'],
      [1, 'Calls Completed', 12],
    ];
    const option = createOption(singleMetric);

    expect(option.dataset).toHaveLength(3);
    expect(option.series).toHaveLength(2);
  });

  it('handles data with all zero values in the Count column without throwing an error or a crash', () => {
    const zeroData: RawData = [
      ['Day', 'Metric', 'Count'],
      [1, 'Calls Completed', 0],
      [1, 'People Contacted', 0],
    ];
    const option = createOption(zeroData);

    expect(option.dataset).toHaveLength(3);
  });

  it('configures tooltips to display Count values at each data point on the line', () => {
    const option = createOption(validData);
    const tooltip = option.tooltip as { trigger: string };
    const series = option.series as { encode: { tooltip: string[] } }[];

    expect(tooltip.trigger).toBe('axis');
    expect(series[0].encode.tooltip).toContain('Count');
    expect(series[1].encode.tooltip).toContain('Count');
  });

  it('displays non-empty labels on both axes', () => {
    const option = createOption(validData);
    const xAxisLabel = option.xAxis as { name: string };
    const yAxisLabel = option.yAxis as { name: string };

    expect(xAxisLabel.name).toBeDefined();
    expect(typeof xAxisLabel.name).toBe('string');
    expect(xAxisLabel.name.length).toBeGreaterThan(0);

    expect(yAxisLabel.name).toBeDefined();
    expect(typeof yAxisLabel.name).toBe('string');
    expect(yAxisLabel.name.length).toBeGreaterThan(0);
  });
});

