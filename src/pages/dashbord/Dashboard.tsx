import * as C from './Dashboard.styled'
import { ChartReport } from '../../components/chartReport/chartReport'
import { MetricItem } from '../../components/metricItem/MetricItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ItemLastTransactions } from '../../components/itemLastTransactions/ItemLastTransactions';
import { PieChart } from '../../components/pieChart/PieChart';
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
import dayjs from 'dayjs';
import DF from '../../helpers/DateFunctions';

type LastMonth = {
    firstMonth: Date,
    secondMonth: Date,
    thirdMonth: Date,
    fourthMonth: Date
}

export const Dashboard = () => {
    const { state, dispatch } = useContext(Context)
    const [valueExpenseMonth, setValueExpenseMonth] = useState(0)
    const [valueIncomeMonth, setValueIncomeMonth] = useState(0)
    const [valueBalanceMonth, setValueBalanceMonth] = useState(0)
    const [valuePendingMonth, setValuePendingMonth] = useState(0)
    const [lastTransaction, setLastTransaction] = useState<NormalTansactionType | null>(null)
    const [lastTransactions, setLastTransactions] = useState<NormalTansactionType[]>([])
    const [amount, setAmount] = useState(0)
    const [lastMonth, setLastMonth] = useState<LastMonth | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')
        dispatch({
            type: 'setSelectMonth',
            payload: { selectMonth: true }
        })
        dispatch({
            type: 'setSelectedDate',
            payload: { selectedDate: new Date() }
        })
    }, [])

    useEffect(() => {
        getValueTransactions()
        valueCharts()
    }, [state.user.transactions, state.user.selectedDate])

    const getValueTransactions = () => {
        const transactions = state.user.transactions as NormalTansactionType[];
        console.log()
        const transactionsSelectedMonth = transactions.filter(item => {
            const date = item.date as { seconds: number; nanoseconds: number }
            const dateItem = new Date(date.seconds * 1000)
            if (dateItem.getMonth() === state.user.selectedDate.getMonth() && dateItem.getFullYear() === state.user.selectedDate.getFullYear()) {
                return item;
            }
        });
        const transactionsExpense = transactionsSelectedMonth.filter((item: NormalTansactionType) => item.type === 'expense' && item.done === true)
        const valueExpense = transactionsExpense.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.value, 0)
        setValueExpenseMonth(valueExpense)
        const transactionsIncome = transactionsSelectedMonth.filter((item: NormalTansactionType) => item.type === 'income' && item.done === true)
        const valueIncome = transactionsIncome.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
        setValueIncomeMonth(valueIncome)
        setValueBalanceMonth(valueIncome - valueExpense)
        const ExpensePending = transactionsSelectedMonth.filter(item => item.done === false && item.type === 'expense');
        const valueExpensePending = ExpensePending.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.value, 0)
        setValuePendingMonth(valueExpensePending)
        if (transactions.length > 0) {
            transactions.sort((a, b) => b.id - a.id)
            setLastTransactions(transactions.slice(0, 5))
            const transactionsFilt = transactions.filter(item => item.type !== 'transfer')
            setLastTransaction(transactionsFilt[0])
        }
        const allTheExpenses = transactions.filter(item => item.type === 'expense' && item.done).reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
        const allTheIncome = transactions.filter(item => item.type === 'income' && item.done).reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
        setAmount(allTheIncome - allTheExpenses)
    }

    const valueCharts = () => {
        const currentDate = state.user.selectedDate;
        const secondMonth = DF.getMonthAndYear(dayjs(currentDate).subtract(1, 'month'))
        const thirdMonth = DF.getMonthAndYear(dayjs(currentDate).subtract(2, 'month'))
        const fourthMonth = DF.getMonthAndYear(dayjs(currentDate).subtract(3, 'month'))
        const obj = {
            firstMonth: currentDate,
            secondMonth: new Date(secondMonth.year, secondMonth.month),
            thirdMonth: new Date(thirdMonth.year, thirdMonth.month),
            fourthMonth: new Date(fourthMonth.year, fourthMonth.month)
        }
        setLastMonth(obj)
    }

    return (
        <C.Container Menu={state.general.sideBar} Theme={state.theme.theme}>
            <div className='top-metrics'>
                <div className={state.general.sideBar ? 'row response balance-report' : 'row balance-report'}>
                    <div className='balance'>
                        <div className='balance-summary'>
                            <h4 className='balance-title'>Balanço Total</h4>
                            {lastTransaction &&
                                <div className={lastTransaction.type === 'income' ? 'last-transaction-value po' : 'last-transaction-value ne'}>
                                    R$
                                    {lastTransaction.type === 'income' ? ' +' : ' -'}
                                    {lastTransaction.value.toFixed(2)}
                                </div>
                            }{!lastTransaction &&
                                <div className="last-transaction-value po">R$ 0.00</div>
                            }
                            <div className='balance-text-info'>
                                Última Transação</div>
                        </div>
                        <div className={amount < 0 ? 'balance-total ne' : 'balance-total po'}>
                            <div className="balance-value">
                                R$ {amount.toFixed(2)}
                            </div>
                            <div className='info'>SALDO ATUAL</div>
                        </div>
                        <div></div>
                    </div>
                    <div className='report'>
                        <h4 className='report-title'>Relatório</h4>
                        <ChartReport months={lastMonth} />
                    </div>
                </div>
                <div className={state.general.sideBar ? 'row response metric' : 'row metric'}>
                    <MetricItem title="Saldo Total" value={valueBalanceMonth} percentage={11} />
                    <MetricItem title="Total Receitas" value={valueIncomeMonth} percentage={-8} />
                    <MetricItem title="Total Despesas" value={valueExpenseMonth} percentage={8} />
                    <MetricItem title="Pendente" value={valuePendingMonth} percentage={11.52} />
                </div>
            </div>
            <div className='bottom-metrics'>
                <div className={state.general.sideBar ? 'row response' : 'row'}>
                    <div className='last-transactions'>
                        <div className='header'>
                            <h4 className='title'>Últimas Transações</h4>
                            <div className='icon'>
                                <MoreHorizIcon />
                            </div>
                        </div>
                        <ul className='content'>
                            {lastTransactions.map((item, index) => (
                                <ItemLastTransactions key={index} item={item} />
                            ))}
                        </ul>
                    </div>
                    <div className='chart-pie'>
                        <div className='header'>
                            <h4 className='title'>Gastos este mês</h4>
                            <div className='icon'>
                                <MoreHorizIcon />
                            </div>
                        </div>
                        <PieChart />
                    </div>
                </div>
            </div>
        </C.Container>
    )
}
