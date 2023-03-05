import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { NormalTansactionType } from "../../types/TransactionType";
import DF from "../../helpers/DateFunctions";
import dayjs from "dayjs";

export const ChartReport = () => {
    const { state } = useContext(Context);
    const [firstMonth, setFirstMonth] = useState({
        month: "",
        expense: 0,
        income: 0,
    });
    const [secondMonth, setSecondMonth] = useState({
        month: "",
        expense: 0,
        income: 0,
    });
    const [thirdMonth, setThirdMonth] = useState({
        month: "",
        expense: 0,
        income: 0,
    });
    const [fourthMonth, setFourthMonth] = useState({
        month: "",
        expense: 0,
        income: 0,
    });

    useEffect(() => {
        searchLastFourMonths();
    }, [state.user.selectedDate, state.user.transactions]);

    const searchLastFourMonths = () => {
        const currentDate = state.user.selectedDate;
        const secondMonth = DF.getMonthAndYear(
            dayjs(currentDate).subtract(1, "month"),
        );
        const thirdMonth = DF.getMonthAndYear(
            dayjs(currentDate).subtract(2, "month"),
        );
        const fourthMonth = DF.getMonthAndYear(
            dayjs(currentDate).subtract(3, "month"),
        );
        setFirstMonth(getValuesMonth(currentDate));
        setSecondMonth(
            getValuesMonth(new Date(secondMonth.year, secondMonth.month)),
        );
        setThirdMonth(
            getValuesMonth(new Date(thirdMonth.year, thirdMonth.month)),
        );
        setFourthMonth(
            getValuesMonth(new Date(fourthMonth.year, fourthMonth.month)),
        );
    };

    const getValuesMonth = (mesRef: Date) => {
        const transactionsGeneral = state.user
            .transactions as NormalTansactionType[];
        const transactionsSelectedMonth = transactionsGeneral.filter((item) => {
            const date = item.date as { seconds: number; nanoseconds: number };
            const dateItem = new Date(date.seconds * 1000);
            if (
                dateItem.getMonth() === mesRef.getMonth() &&
                dateItem.getFullYear() === mesRef.getFullYear() &&
                item.type !== "transfer"
            ) {
                return item;
            }
        });
        const expense = transactionsSelectedMonth
            .filter((item) => item.type === "expense")
            .reduce(
                (previousValue, currentValue) =>
                    previousValue + currentValue.value,
                0,
            );
        const income = transactionsSelectedMonth
            .filter((item) => item.type === "income")
            .reduce(
                (previousValue, currentValue) =>
                    previousValue + currentValue.value,
                0,
            );
        return {
            month: DF.getMonthString(mesRef.getMonth()).slice(0, 3),
            expense,
            income,
        };
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    const labels = [
        fourthMonth.month,
        thirdMonth.month,
        secondMonth.month,
        firstMonth.month,
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Receitas",
                data: [
                    fourthMonth.income,
                    thirdMonth.income,
                    secondMonth.income,
                    firstMonth.income,
                ],
                backgroundColor: "#4FD18B",
                borderWidth: 2,
                borderRadius: 5,
            },
            {
                label: "Despesas",
                data: [
                    fourthMonth.expense,
                    thirdMonth.expense,
                    secondMonth.expense,
                    firstMonth.expense,
                ],
                backgroundColor: "#F02927",
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
                    color: state.theme.theme.colorBorder,
                },
            },
            x: {
                ticks: {
                    color: state.theme.theme.colorOpacity,
                },
                grid: {
                    color: state.theme.theme.colorBorder,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    color: state.theme.theme.colorOpacity,
                },
            },
            title: {
                display: false,
                text: "Relatório",
                color: state.theme.theme.colorOpacity,
            },
        },
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    );
};
