import React, { useRef, useEffect } from 'react';
import { init, getInstanceByDom } from 'echarts';
import type { EChartsOption, EChartsInitOpts, SetOptionOpts } from 'echarts';

interface EChartProps {
  option: EChartsOption | null;
  chartSettings?: EChartsInitOpts;
  optionSettings?: SetOptionOpts;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const EChart: React.FC<EChartProps> = ({
  option,
  chartSettings,
  optionSettings,
  style = { width: '100%', height: '100%' },
  ...props
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Initialize chart on mount
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = init(chartRef.current, null, chartSettings);

    return () => {
      chart?.dispose();
    };
  }, [chartSettings]);

  
 // Update chart when option changes & handle resizing
useEffect(() => {
  if (!option || !chartRef.current) return;

  const chart = getInstanceByDom(chartRef.current);
  chart?.setOption(option, optionSettings);

 /*const resizeObserver = new ResizeObserver(() => {
      chart?.resize();
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
    };*/
    
}, [option, optionSettings]);

  return <div ref={chartRef} style={style} {...props} />;
};
