import { useContext } from 'react';
import { Context } from '../../context/context';
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ScriptableContext,
} from 'chart.js';

export const ChartReport = () => {
    const { state } = useContext(Context)



    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    const labels = ['SET', 'OUT', 'NOV', 'DEZ'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Receitas',
                data: [2000, 1500, 1633, 550],
                backgroundColor: '#4FD18B',
                borderWidth: 2,
                borderRadius: 5,
            },
            {
                label: 'Despesas',
                data: [5000, 300, 995, 1675.69],
                backgroundColor: '#F02927',
                borderWidth: 2,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    color: state.theme.theme.colorOpacity,
                },
                grid: {
                    color: state.theme.theme.colorBorder
                }
            },
            x: {
                ticks: {
                    color: state.theme.theme.colorOpacity
                },
                grid: {
                    color: state.theme.theme.colorBorder
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    color: state.theme.theme.colorOpacity,
                }
            },
            title: {
                display: false,
                text: 'Relatório',
                color: state.theme.theme.colorOpacity
            },
        },
    };

    let width: number, height: number, gradient: any;
    function getGradient(ctx: any, chartArea: any, color1: string, color2: string) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!gradient || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(1, color1);
            gradient.addColorStop(0.2, color1);
            gradient.addColorStop(0, '#4c49ed');
        }
        return gradient;
    }

    function teste(canvas: any, color1: string, color2: string) {
        const ctx = canvas.getContext('2d')
        const graditent = ctx.createGradient()

    }


    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}