'use strict';

import { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CompetencyChart({ data, colors }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'donut',
    },
    stroke: {
      width: 0,
    },
    labels: data.map(item => item.name),
    colors: data.map(item => colors[item.name]),
    plotOptions: {
      pie: {
        spacing: 0,
        donut: {
          size: '80%',
          labels: {
            show: true,
            total: {
              show: true,
              formatter: () => data.length,
              label: 'Unique Competencies',
            },
            value: {
              formatter: () => data.length,
              offsetY: -25, 
            },
            name: {
              formatter: () => 'Unique Competencies',
              offsetY: 15,
            },
          },
        },
        expandOnClick: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false
    },
  });

  const series = data.map(item => item.courses);

  return <Chart options={chartOptions} series={series} type="donut" width='350' />;
}
