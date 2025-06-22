import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend, Filler);
interface LineChartProps {
    labels: (string | null)[];
    lineData: (number | null)[];
    dataLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({ labels, lineData, dataLabel }) => {
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
        },
        responsive: true,
        scales: {
            xAxes: {
                categoryPercentage: 0.5,
                ticks: {
                    color: '#FFF',
                    font: {
                        family: 'Poppins',
                        size: 15,
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
                display: true,
                beginAtZero: false,
                ticks: {
                    display: true,
                    color: '#fff',
                    suggestedMin: 0,
                    suggestedMax: 10,
                    min: 0,
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                yAxisID: 'y',
                data: lineData,
                label: dataLabel,
                type: 'line' as const,
                fill: false,
                borderColor: '#68f37f',
                borderWidth: 3,
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#68f37f',
                pointBorderWidth: 1,
                pointRadius: 4,
                tension: 0.4,
            },
        ],
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
