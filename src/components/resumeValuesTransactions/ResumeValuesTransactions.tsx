import * as C from "./ResumeValuesTransactions.styled";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { MetricItem } from "../metricItem/MetricItem";
import { currentMonthValueType } from "../../pages/dashbord/Dashboard";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import { NormalTansactionType } from "../../types/TransactionType";
import Calculation from "../../helpers/CalculationOfValues";
import DF from "../../helpers/DateFunctions";
import dayjs from "dayjs";
import formatted from "../../helpers/FormattedPrice";

type Props = {
    type: {
        name: "Transações" | "Receitas" | "Despesas" | "Transferências";
        color: string;
    };
};

export const ResumeValuesTransactions = ({ type }: Props) => {
    const { state } = useContext(Context);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [valuesCurrentMonth, setValuesCurrentMonth] =
        useState<currentMonthValueType>({
            valueExpense: 0,
            valueIncome: 0,
            valueExpensePending: 0,
            balance: 0,
        });
    const [valuesForType, setValuesForType] = useState({
        pending: 0,
        effected: 0,
    });

    useEffect(() => {
        if (type.name === "Transações" || type.name === "Transferências") {
            getValueTransactions();
        } else {
            getTransactionsForType(
                type.name === "Despesas" ? "expense" : "income",
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user.transactions, state.user.selectedDate, type]);

    const getValueTransactions = () => {
        if (!state.user.transactions) {
            return;
        }
        let transactions = state.user.transactions as NormalTansactionType[];
        setCurrentBalance(
            Calculation.getCurrentBalance(
                transactions,
                state.user.accounts ?? undefined,
            ),
        );
        transactions = DF.getTransactionsSelectDate(
            transactions,
            dayjs(new Date()),
        );
        const values = Calculation.getMonthlySummary(transactions);
        setValuesCurrentMonth(values);
    };

    const getTransactionsForType = (type: "expense" | "income") => {
        if (!state.user.transactions) {
            return;
        }
        const transactionsNormal = state.user
            .transactions as NormalTansactionType[];
        const transctionsMonth = DF.getTransactionsSelectDate(
            transactionsNormal,
            dayjs(state.user.selectedDate),
        );
        const effected = Calculation.getValuesForType(
            type,
            transctionsMonth,
            true,
        );
        const pending = Calculation.getValuesForType(
            type,
            transctionsMonth,
            false,
        );
        setValuesForType({ effected, pending });
    };

    return (
        <C.Container sideBar={state.general.sideBar} Theme={state.theme.theme}>
            {type.name !== "Despesas" && type.name !== "Receitas" && (
                <>
                    <div className="bottomLine">
                        <MetricItem
                            title="Saldo Atual"
                            value={currentBalance}
                            Icon={AccountBalanceOutlinedIcon}
                            bgIcon={state.theme.theme.transferColor}
                        />
                        <MetricItem
                            title="Receitas"
                            value={valuesCurrentMonth?.valueIncome}
                            Icon={ArrowUpwardOutlinedIcon}
                            bgIcon={state.theme.theme.incomeColor}
                        />
                        <MetricItem
                            title="Despesas"
                            value={valuesCurrentMonth?.valueExpense}
                            Icon={ArrowDownwardOutlinedIcon}
                            bgIcon={state.theme.theme.expenseColor}
                        />
                        <MetricItem
                            title="Balanço"
                            value={valuesCurrentMonth?.balance}
                            Icon={BalanceOutlinedIcon}
                            bgIcon="#26a69a"
                        />
                    </div>
                    <div className="bottomLineMobile">
                        <div className="resumeItem">
                            <div className="boxIcon">
                                <AccountBalanceOutlinedIcon />
                            </div>
                            <div className="valuesInfo">
                                <span>Saldo atual</span>
                                <div
                                    className={
                                        currentBalance >= 0
                                            ? "value more"
                                            : "value less"
                                    }
                                >
                                    {formatted.format(currentBalance)}
                                </div>
                            </div>
                        </div>
                        <div className="resumeItem">
                            <div className="boxIcon">
                                <BalanceOutlinedIcon />
                            </div>
                            <div className="valuesInfo">
                                <span>Balanço mensal</span>
                                <div
                                    className={
                                        valuesCurrentMonth.balance >= 0
                                            ? "value more"
                                            : "value less"
                                    }
                                >
                                    {formatted.format(
                                        valuesCurrentMonth.balance,
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {type.name !== "Transações" && type.name !== "Transferências" && (
                <>
                    <div className="bottomLine filtered">
                        <MetricItem
                            title={`${type.name} pendentes`}
                            value={valuesForType.pending}
                            Icon={ArrowUpwardOutlinedIcon}
                            bgIcon={type.color}
                        />
                        <MetricItem
                            title={`${type.name} ${
                                type.name === "Despesas" ? "Pagas" : "Recebidas"
                            }`}
                            value={valuesForType.effected}
                            Icon={ArrowDownwardOutlinedIcon}
                            bgIcon={type.color}
                        />
                        <MetricItem
                            title="Total"
                            value={
                                valuesForType.pending + valuesForType.effected
                            }
                            Icon={BalanceOutlinedIcon}
                            bgIcon={type.color}
                        />
                    </div>
                    <div className="bottomLineMobile">
                        <div className="resumeItem">
                            <div className="boxIcon">
                                <ArrowDownwardOutlinedIcon />
                            </div>
                            <div className="valuesInfo">
                                <span>Total pendente</span>
                                <div
                                    className={
                                        type.name === "Receitas"
                                            ? "value more"
                                            : "value less"
                                    }
                                >
                                    {formatted.format(valuesForType.pending)}
                                </div>
                            </div>
                        </div>
                        <div className="resumeItem">
                            <div className="boxIcon">
                                <ArrowUpwardOutlinedIcon />
                            </div>
                            <div className="valuesInfo">
                                <span>{`Total ${
                                    type.name === "Despesas"
                                        ? "pago"
                                        : "recebido"
                                }`}</span>
                                <div
                                    className={
                                        type.name === "Receitas"
                                            ? "value more"
                                            : "value less"
                                    }
                                >
                                    {formatted.format(valuesForType.effected)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </C.Container>
    );
};
