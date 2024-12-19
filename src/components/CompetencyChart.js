'use strict';

import { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';

export default function CompetencyChart({ data, colors }) {

  const [chartOptions, setChartOptions] = useState({
    data: data.map(item => ({
      name: item.name,
      competency: item.name,
      amount: item.courses,
      course: item.courses
    })),
    series: [
      {
        type: 'donut',
          angleKey: 'amount',
          innerRadiusRatio: 0.8,
          fills: data.map(item => colors[item.name]),
          tooltip: {
            enabled: true,
            renderer: ( params ) => {
              const { datum } = params;
              return {
                title: datum.competency,
                content: `${datum.amount} courses`
              };
            }
          },
          innerLabels: [
            {
              text: data.length.toString(),
              spacing: 4,
              fontSize: 36,
              fontWeight: 'bold',
            },
            {
              text: 'Unique Competencies',
              spacing: 4,
              fontSize: 14,
              color: 'gray',
          },
        ],
      }],
      background: {
        fill: 'white',
      }
    });
    return <AgCharts options={chartOptions} />;
}