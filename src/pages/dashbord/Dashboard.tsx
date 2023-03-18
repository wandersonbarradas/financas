import * as C from "./Dashboard.styled";
import { ChartReport } from "../../components/chartReport/chartReport";
import { MetricItem } from "../../components/metricItem/MetricItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ItemLastTransactions } from "../../components/itemLastTransactions/ItemLastTransactions";
import { PieChart } from "../../components/pieChart/PieChart";
import { Context } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormalTansactionType } from "../../types/TransactionType";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import dayjs from "dayjs";
import DF from "../../helpers/DateFunctions";
import Formatted from "../../helpers/FormattedPrice";
import { activeSidebarItem } from "../../helpers/helpers";
import { Modal } from "../../components/modais/Modais";
import Calculation from "../../helpers/CalculationOfValues";

export type currentMonthValueType = {
    valueExpense: number;
    valueIncome: number;
    valueExpensePending: number;
    balance: number;
};

export const Dashboard = () => {
    const { state, dispatch } = useContext(Context);
    const [currentMonthValues, setCurrentMonthValues] =
        useState<currentMonthValueType>({
            valueExpense: 0,
            valueIncome: 0,
            valueExpensePending: 0,
            balance: 0,
        });
    const [lastTransaction, setLastTransaction] =
        useState<NormalTansactionType | null>(null);
    const [lastTransactions, setLastTransactions] = useState<
        NormalTansactionType[]
    >([]);
    const [amount, setAmount] = useState({ value: "0", decimals: "00" });
    const [cardPieChart, setCardPieChart] = useState(true);
    const [menuPieChart, setMenuPieChart] = useState(false);
    const [positionMenuPieChart, setPositionPieChart] = useState({
        top: 0,
        left: 0,
    });
    const [cardLastTransactions, setCardLastTransactions] = useState(true);
    const [menuLastTransactions, setMenuLastTransactions] = useState(false);
    const [positionMenuLastTransactions, setPositionMenuLastTransactions] =
        useState({
            top: 0,
            left: 0,
        });
    const navigate = useNavigate();

    useEffect(() => {
        activeSidebarItem("activeLinkNavBar", "dashboad");
        navigate("/dashboard");
        dispatch({
            type: "setSelectMonth",
            payload: { selectMonth: true },
        });
        dispatch({
            type: "setSelectedDate",
            payload: { selectedDate: new Date() },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getValueTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user.transactions, state.user.selectedDate]);

    const getValueTransactions = () => {
        const transactions = state.user.transactions as NormalTansactionType[];
        if (transactions.length > 0) {
            transactions.sort((a, b) => b.id - a.id);
            setLastTransactions(transactions.slice(0, 5));
            const transactionsFilt = transactions.filter(
                (item) => item.type !== "transfer",
            );
            setLastTransaction(transactionsFilt[0]);
        }
        const [value, decimals] = Formatted.format(
            Calculation.getCurrentBalance(
                transactions,
                state.user.accounts ?? undefined,
            ),
        ).split(",");
        setAmount({ value, decimals });

        //Values SelectMonth
        const transactionsSelectedMonth = DF.getTransactionsSelectDate(
            transactions,
            dayjs(state.user.selectedDate),
        );
        const newCurrentMonthValues = Calculation.getMonthlySummary(
            transactionsSelectedMonth,
        );
        setCurrentMonthValues(newCurrentMonthValues);
    };

    const handleShowMenuPieChart = (e: React.MouseEvent<HTMLDivElement>) => {
        const pos = e.currentTarget.getBoundingClientRect();
        console.log(
            "🚀 ~ file: Dashboard.tsx:143 ~ handleShowMenuPieChart ~ pos:",
            pos,
        );
        setPositionPieChart({
            top: pos.y + 30,
            left: pos.x - 120,
        });
        setMenuPieChart(true);
    };

    const ClosePieChart = () => {
        setCardPieChart(false);
        setMenuPieChart(false);
    };

    const handleShowMenuLastTransactions = (
        e: React.MouseEvent<HTMLDivElement>,
    ) => {
        const pos = e.currentTarget.getBoundingClientRect();
        setPositionMenuLastTransactions({
            top: pos.y + 30,
            left: pos.x - 120,
        });
        setMenuLastTransactions(true);
    };

    const CloseLastTransactions = () => {
        setCardLastTransactions(false);
        setMenuLastTransactions(false);
    };

    return (
        <C.Container Menu={state.general.sideBar} Theme={state.theme.theme}>
            <div className="top-metrics">
                <div
                    className={
                        state.general.sideBar
                            ? "row response balance-report"
                            : "row balance-report"
                    }
                >
                    <div className="balance">
                        <div className="balance-summary">
                            <h4 className="balance-title">Saldo Atual</h4>
                            {lastTransaction && (
                                <div
                                    className={
                                        lastTransaction.type === "income"
                                            ? "last-transaction-value po"
                                            : "last-transaction-value ne"
                                    }
                                >
                                    {lastTransaction.type === "income" ? (
                                        <TrendingUpIcon />
                                    ) : (
                                        <TrendingDownIcon />
                                    )}
                                    {Formatted.format(lastTransaction.value)}
                                </div>
                            )}
                            {!lastTransaction && (
                                <div className="last-transaction-value po">
                                    R$ 0,00
                                </div>
                            )}
                            <div className="balance-text-info">
                                Última Transação
                            </div>
                        </div>
                        <div
                            className={
                                Number(amount.value) < 0 &&
                                Number(amount.decimals) < 0
                                    ? "balance-total ne"
                                    : "balance-total po"
                            }
                        >
                            <div className="balance-value">
                                {amount.value}
                                <small>,{amount.decimals}</small>
                            </div>
                            <div className="info">SALDO ATUAL</div>
                        </div>
                        <div></div>
                    </div>
                    <div className="report">
                        <h4 className="report-title">Relatório</h4>
                        <ChartReport />
                    </div>
                </div>
                <div
                    className={
                        state.general.sideBar
                            ? "row response metric"
                            : "row metric"
                    }
                >
                    <MetricItem
                        title="Balanço Total"
                        value={currentMonthValues.balance}
                    />
                    <MetricItem
                        title="Total Receitas"
                        value={currentMonthValues.valueIncome}
                    />
                    <MetricItem
                        title="Total Despesas"
                        value={currentMonthValues.valueExpense}
                    />
                    <MetricItem
                        title="Pendente"
                        value={currentMonthValues.valueExpensePending}
                    />
                </div>
            </div>
            <div className="bottom-metrics">
                <div className={state.general.sideBar ? "row response" : "row"}>
                    {lastTransactions.length > 0 && cardLastTransactions && (
                        <div className="last-transactions">
                            <div className="header">
                                <h4 className="title">Últimas Transações</h4>
                                <div
                                    onClick={handleShowMenuLastTransactions}
                                    className="iconMore"
                                >
                                    <MoreHorizIcon />
                                </div>
                            </div>
                            <ul className="content">
                                {lastTransactions.map((item, index) => (
                                    <ItemLastTransactions
                                        key={index}
                                        item={item}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                    {currentMonthValues.valueExpense > 0 && cardPieChart && (
                        <div className="chart-pie">
                            <div className="header">
                                <h4 className="title">Gastos este mês</h4>
                                <div
                                    onClick={handleShowMenuPieChart}
                                    className="iconMore"
                                >
                                    <MoreHorizIcon />
                                </div>
                            </div>
                            <PieChart />
                        </div>
                    )}
                </div>
            </div>
            <Modal
                clickAway={true}
                modalOpacity={0}
                open={menuPieChart}
                setOpen={setMenuPieChart}
            >
                <C.MenuDrop
                    Theme={state.theme.theme}
                    position={positionMenuPieChart}
                >
                    <ul>
                        <li onClick={ClosePieChart}>Dispensar card</li>
                    </ul>
                </C.MenuDrop>
            </Modal>
            <Modal
                clickAway={true}
                modalOpacity={0}
                open={menuLastTransactions}
                setOpen={setMenuLastTransactions}
            >
                <C.MenuDrop
                    Theme={state.theme.theme}
                    position={positionMenuLastTransactions}
                >
                    <ul>
                        <li onClick={CloseLastTransactions}>Dispensar card</li>
                    </ul>
                </C.MenuDrop>
            </Modal>
        </C.Container>
    );
};
