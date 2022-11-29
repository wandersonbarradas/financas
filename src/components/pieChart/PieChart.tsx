import { useContext } from 'react';
import { Context } from '../../context/context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const PieChart = () => {
    const { state } = useContext(Context)

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Super Mercado', 'Wi-Fi', 'IPTV'],
        datasets: [
            {
                label: '# of Votes',
                data: [500.53, 99.90, 35,],
                backgroundColor: [
                    '#9D9BF4',
                    '#4C49ED',
                    '#4FD18B',
                ],
                borderColor: [
                    '#9D9BF4',
                    '#4C49ED',
                    '#4FD18B',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    color: state.theme.theme.colorTitle
                }
            },
        },
    };
    return (
        <div>
            <Doughnut options={options} data={data} />
        </div>
    )
}