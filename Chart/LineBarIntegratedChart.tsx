import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarController,
    LineController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

interface BarChartProps {
    labels: string[];
    barData: number[];
    lineData: number[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    LineController,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const LineBarIntegratedChart: React.FC<BarChartProps> = ({ labels, barData, lineData }) => {
    const chartOptions = {
        maintainAspectRatio: false,
        stacked: false,
        fontColor: '#fff',
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                mode: 'index',
            },
            title: {
                display: false,
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
            reverse: true,
        },
        responsive: true,
        scales: {
            xAxes: {
                categoryPercentage: 0.5,
                ticks: {
                    color: '#FFF',
                    font: {
                        family: 'Poppins',
                        size: 14,
                    },
                },
                grid: {
                    color: '#68f37f',
                    drawOnChartArea: false,
                    paddingBottom: 10,
                },
            },
            x: {
                stacked: true,
                display: false,
                ticks: {
                    display: false,
                },
            },
            yAxes: {
                beginAtZero: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10,
                    min: 0,
                    display: false,
                },
                grid: {
                    color: ['#68f37f', ...Array(20).fill('transparent')],
                    drawTicks: false,
                    drawOnChartArea: true,
                    drawBorder: false,
                    lineWidth: 1,
                },
            },
            y: {
                display: false,
                beginAtZero: true,
                ticks: {
                    display: false,
                    suggestedMin: 0,
                    suggestedMax: 10,
                    min: 0,
                },
            },
            y1: {
                stacked: true,
                position: 'left' as const,
                display: false,
                beginAtZero: true,
                ticks: {
                    display: false,
                    suggestedMin: 0,
                    suggestedMax: 10,
                    min: 0,
                },
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                yAxisID: 'y',
                label: 'Ratio%',
                data: lineData,
                type: 'line' as const,
                fill: false,
                borderColor: '#fff',
                borderWidth: 2,
                pointBackgroundColor: '#68f37f',
                pointBorderColor: '#10a7ff',
                pointRadius: 5,
                tension: 0.4,
            },
            {
                yAxisID: 'y1',
                type: 'bar' as const,
                label: 'Round EGG',
                backgroundColor: '#0a1f2f',
                borderColor: '#68f37f',
                borderWidth: 2,
                hoverBackgroundColor: '#68f37f',
                data: barData,
            },
        ],
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return <Chart type="bar" data={chartData} options={chartOptions} style={{ borderBottom: '10px' }} />;
};

export default LineBarIntegratedChart;
