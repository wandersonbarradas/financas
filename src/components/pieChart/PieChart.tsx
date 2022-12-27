import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { NormalTansactionType } from '../../types/TransactionType';

type Cat = {
    name: string,
    value: number,
    color: string
}

export const PieChart = () => {
    const { state } = useContext(Context)
    const [cat, setCate] = useState<Cat[]>([])

    useEffect(() => {
        setCate([])
        getValues()
    }, [state.user.selectedDate, state.user.transactions]);

    const getValues = () => {
        const transactionsGeneral = state.user.transactions as NormalTansactionType[];
        const categories: Cat[] = []
        const transactions = transactionsGeneral.filter(item => {
            const date = item.date as { seconds: number; nanoseconds: number }
            const dateItem = new Date(date.seconds * 1000)
            if (dateItem.getMonth() === state.user.selectedDate.getMonth() && dateItem.getFullYear() === state.user.selectedDate.getFullYear() && item.type === 'expense' && item.done) {
                return item
            }
        })
        if (state.user.categories === null) {
            return;
        }
        state.user.categories.map(item => {
            const index = categories.findIndex(i => i.name === item.name)
            if (index < 0) {
                const transitionsCat = transactions.filter(el => el.category.id === item.id)
                if (transitionsCat.length > 0) {
                    const value = transitionsCat.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
                    categories.push({ name: item.name, value, color: item.color })
                }
            }
        })
        setCate(categories)
    }

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: cat.map(item => item.name),
        datasets: [
            {
                label: '# of Votes',
                data: cat.map(item => item.value),
                backgroundColor: cat.map(item => item.color),
                borderColor: cat.map(item => item.color),
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
                    color: state.theme.theme.colorOpacity
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

function useSate(): [any, any] {
    throw new Error('Function not implemented.');
}
