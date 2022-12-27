import { useContext, useEffect, useState } from 'react';
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
import { NormalTansactionType } from '../../types/TransactionType';
import DF from '../../helpers/DateFunctions';

type Props = {
    months: {
        firstMonth: Date,
        secondMonth: Date,
        thirdMonth: Date,
        fourthMonth: Date
    } | null;
}

export const ChartReport = ({ months }: Props) => {
    const { state } = useContext(Context)
    const [firstMonth, setFirstMonth] = useState({ month: '', expense: 0, income: 0 })
    const [secondMonth, setSecondMonth] = useState({ month: '', expense: 0, income: 0 })
    const [thirdMonth, setThirdMonth] = useState({ month: '', expense: 0, income: 0 })
    const [fourthMonth, setFourthMonth] = useState({ month: '', expense: 0, income: 0 })

    useEffect(() => {
        if (months === null) {
            return
        }
        setFirstMonth(getValuesMonth(months.firstMonth))
        setSecondMonth(getValuesMonth(months.secondMonth))
        setThirdMonth(getValuesMonth(months.thirdMonth))
        setFourthMonth(getValuesMonth(months.fourthMonth))
    }, [months]);

    const getValuesMonth = (mesRef: Date) => {
        const transactionsGeneral = state.user.transactions as NormalTansactionType[];
        const transactionsSelectedMonth = transactionsGeneral.filter(item => {
            const date = item.date as { seconds: number; nanoseconds: number }
            const dateItem = new Date(date.seconds * 1000)
            if (dateItem.getMonth() === mesRef.getMonth() && dateItem.getFullYear() === mesRef.getFullYear() && item.type !== 'transfer') {
                return item;
            }
        })
        const expense = transactionsSelectedMonth.filter(item => item.type === 'expense' && item.done).reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
        const income = transactionsSelectedMonth.filter(item => item.type === 'income' && item.done).reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)

        return { month: DF.getMonthString(mesRef.getMonth()).slice(0, 3), expense, income }
    }


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    const labels = [fourthMonth.month, thirdMonth.month, secondMonth.month, firstMonth.month];

    const data = {
        labels,
        datasets: [
            {
                label: 'Receitas',
                data: [fourthMonth.income, thirdMonth.income, secondMonth.income, firstMonth.income],
                backgroundColor: '#4FD18B',
                borderWidth: 2,
                borderRadius: 5,
            },
            {
                label: 'Despesas',
                data: [fourthMonth.expense, thirdMonth.expense, secondMonth.expense, firstMonth.expense],
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