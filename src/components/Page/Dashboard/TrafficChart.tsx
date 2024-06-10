'use client';

import useComputedStyle from '@/hooks/use-computed-style';
import useFetchMetrics from '@/hooks/useFetchMetrics';
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ZoomPluginOptions } from 'chartjs-plugin-zoom/types/options';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
  TimeScale,
  Legend,
  zoomPlugin
);

interface Temp {
  x: Date;
  y: number;
}
export default function TrafficChart() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const borderColor = useComputedStyle('--bs-border-color');
  const bodyColor = useComputedStyle('--bs-body-color');
  const [startdate, setStartdate] = useState('2024-06-10');
  const [enddate, setEnddate] = useState(`${year}-${month}-${day}`);
  const { data, loading, error } = useFetchMetrics(
    startdate,
    enddate
  );
  const cpuUsages: Temp[] = [];
  const ramUsages: Temp[] = [];
  const temperatures: Temp[] = [];
  const storageUsages: Temp[] = [];

  // data.forEach((item, i) => {
  //   cpuUsages.push(item.cpuUsage);
  //   ramUsages.push(item.ramUsage);
  //   temperatures.push(item.temperature);
  //   storageUsages.push(item.storageUsage);
  // });
  data.forEach((item, i) => {
    cpuUsages.push({
      x: new Date(item.timestamp),
      y: item.cpuUsage,
    });
    ramUsages.push({
      x: new Date(item.timestamp),
      y: item.ramUsage,
    });
    temperatures.push({
      x: new Date(item.timestamp),
      y: item.temperature,
    });
    storageUsages.push({
      x: new Date(item.timestamp),
      y: item.storageUsage,
    });
  });
  const zoomOptions: ZoomPluginOptions = {
    zoom: {
      wheel: {
        enabled: true,
      },
      pinch: {
        enabled: false,
      },
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  };
  const decimation = {
    enabled: false,
    algorithm: 'min-max',
  };

  const currentTime = new Date().valueOf();
  const tenMinutesAgo = currentTime - 10 * 60 * 10000;
  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    // parsing: false,
    plugins: {
      // decimation: decimation,
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: 'darkred' },
      },
      zoom: zoomOptions,
    },
    scales: {
      x: {
        position: 'bottom',
        // @ts-ignore
        type: 'time',
        min: tenMinutesAgo,
        max: currentTime,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 50,
          maxRotation: 0,
          maxTicksLimit: 20,
        },
        time: {
          displayFormats: {
            hour: 'HH:mm',
            minute: 'HH:mm',
            second: 'HH:mm:ss',
          },
        },
        // adapter: moment,
      },
      y: {
        beginAtZero: true,
        border: {
          color: borderColor,
        },
        grid: {
          color: borderColor,
        },
        min: 0,
        max: 120,
        ticks: {
          color: bodyColor,
          maxTicksLimit: 5,
          stepSize: Math.ceil(120 / 10),
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  };
  return (
    <Line
      data={{
        // labels: [...timestamps],
        datasets: [
          {
            label: 'CPU Usage',
            backgroundColor: 'rgba(255, 26, 104, 1)',
            borderColor: 'rgba(255, 26, 104, 1)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: cpuUsages,
            // fill: true,
          },
          {
            label: 'Ram Usage',
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: ramUsages,
          },
          {
            label: 'Temperature',
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 1)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            data: temperatures,
          },
          {
            label: 'Storage',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: storageUsages,
          },
        ],
      }}
      options={options}
    />
  );
}
