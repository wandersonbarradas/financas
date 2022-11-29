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

    const labels = ['Setembro', 'Outubro', 'Novembro',];

    const data = {
        labels,
        datasets: [
            {
                label: 'Receitas',
                data: [2000, 1500, 1633],
                backgroundColor: '#4FD18B',
                borderWidth: 2,
                borderRadius: 5,
            },
            {
                label: 'Despesas',
                data: [5000, 300, 995],
                backgroundColor: '#D14F4F',
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
                    color: state.theme.theme.colorTitle,
                },
                grid: {
                    color: '#5B5D5E'
                }
            },
            x: {
                ticks: {
                    color: state.theme.theme.colorTitle
                },
                grid: {
                    color: '#5B5D5E'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    color: state.theme.theme.colorTitle,
                }
            },
            title: {
                display: true,
                text: 'Relatório',
                color: state.theme.theme.colorTitle
            },
        },
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}