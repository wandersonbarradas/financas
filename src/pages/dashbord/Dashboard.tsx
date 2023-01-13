import * as C from './Dashboard.styled'
import { ChartReport } from '../../components/chartReport/chartReport'
import { MetricItem } from '../../components/metricItem/MetricItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ItemLastTransactions } from '../../components/itemLastTransactions/ItemLastTransactions';
import { PieChart } from '../../components/pieChart/PieChart';
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NormalTansactionType } from '../../types/TransactionType';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dayjs from 'dayjs';
import DF from '../../helpers/DateFunctions';
import FormattedPrice from '../../helpers/FormattedPrice';
import { activeSidebarItem } from '../../helpers/helpers';

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
    const [expensePercentage, setExpensePercentage] = useState(0)
    const [incomePercentage, setIncomePercentage] = useState(0)
    const [balancePercentage, setBalancePercentage] = useState(0)
    const [pendingPercentage, setPendingPercentage] = useState(0)
    const [lastTransaction, setLastTransaction] = useState<NormalTansactionType | null>(null)
    const [lastTransactions, setLastTransactions] = useState<NormalTansactionType[]>([])
    const [amount, setAmount] = useState({ value: '0', decimals: '00' })
    const [lastMonth, setLastMonth] = useState<LastMonth | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        activeSidebarItem('activeLinkNavBar', 'dashboad')
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

    const sizeChartPie = () => {
        const canvas = document.querySelector('.chart-pie canvas') as any
        canvas.style = ''
        canvas.style.width = '100%'
    }

    const getValueTransactions = () => {
        const transactions = state.user.transactions as NormalTansactionType[];
        if (transactions.length > 0) {
            transactions.sort((a, b) => b.id - a.id)
            setLastTransactions(transactions.slice(0, 5))
            const transactionsFilt = transactions.filter(item => item.type !== 'transfer')
            setLastTransaction(transactionsFilt[0])
        }
        const allTheExpenses = getValuesForType('expense', true, transactions)
        const allTheIncome = getValuesForType('income', true, transactions)
        const [value, decimals] = FormattedPrice(allTheIncome - allTheExpenses).split(',')
        setAmount({ value, decimals })

        //Values SelectMonth
        const transactionsSelectedMonth = DF.getTransactionsSelectDate(transactions, dayjs(state.user.selectedDate))
        const valueExpense = getValuesForType('expense', true, transactionsSelectedMonth)
        setValueExpenseMonth(valueExpense)
        const valueIncome = getValuesForType('income', true, transactionsSelectedMonth)
        setValueIncomeMonth(valueIncome)
        setValueBalanceMonth(valueIncome - valueExpense)
        const valueExpensePending = getValuesForType('expense', false, transactionsSelectedMonth)
        setValuePendingMonth(valueExpensePending)

        //Values last month 
        const transactionsLastMonth = DF.getTransactionsSelectDate(transactions, dayjs(state.user.selectedDate).subtract(1, 'month'))
        const valueExpenseLastMonth = getValuesForType('expense', true, transactionsLastMonth)
        setExpensePercentage(valueExpenseLastMonth === 1 ? 0 : ((valueExpense / valueExpenseLastMonth - 1) * 100))
        const valueIncomeLastMonth = getValuesForType('income', true, transactionsLastMonth)
        setIncomePercentage(valueIncomeLastMonth === 1 ? 0 : ((valueIncome / valueIncomeLastMonth - 1) * 100))
        const valueExpensePedingLastMonth = getValuesForType('expense', false, transactionsLastMonth)
        setPendingPercentage(valueExpensePedingLastMonth === 0 ? 0 : ((valueExpensePending / valueExpensePedingLastMonth - 1) * 100))
        const balanceMonth = valueIncome - valueExpense;
        const balanceLastMonth = valueIncomeLastMonth - valueExpenseLastMonth;
        setBalancePercentage(balanceLastMonth === 0 ? 0 : ((balanceMonth / balanceLastMonth - 1) * 100))


    }

    const getValuesForType = (type: 'expense' | 'income', done: boolean, transactions: NormalTansactionType[]) => {
        const transactionsExpense = transactions.filter((item) => item.type === type && item.done === done)
        const valueExpense = transactionsExpense.reduce((previousValue: number, currentValue) => previousValue + currentValue.value, 0)
        return valueExpense;
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
                                    {lastTransaction.type === 'income' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                    R$ {FormattedPrice(lastTransaction.value)}
                                </div>
                            }{!lastTransaction &&
                                <div className="last-transaction-value po">R$ 0,00</div>
                            }
                            <div className='balance-text-info'>
                                Última Transação</div>
                        </div>
                        <div className={Number(amount.value) < 0 && Number(amount.decimals) < 0 ? 'balance-total ne' : 'balance-total po'}>
                            <div className="balance-value">
                                R$ {amount.value}<span>,{amount.decimals}</span>
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
                    <MetricItem title="Saldo Total" value={valueBalanceMonth} percentage={balancePercentage} />
                    <MetricItem title="Total Receitas" value={valueIncomeMonth} percentage={incomePercentage} />
                    <MetricItem title="Total Despesas" value={valueExpenseMonth} percentage={expensePercentage} />
                    <MetricItem title="Pendente" value={valuePendingMonth} percentage={pendingPercentage} />
                </div>
            </div>
            <div className='bottom-metrics'>
                <div className={state.general.sideBar ? 'row response' : 'row'}>
                    {lastTransactions.length > 0 &&
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
                    }
                    {valueExpenseMonth > 0 &&
                        <div className='chart-pie'>
                            <div className='header'>
                                <h4 className='title'>Gastos este mês</h4>
                                <div className='icon'>
                                    <MoreHorizIcon />
                                </div>
                            </div>
                            <PieChart />
                        </div>
                    }
                </div>
            </div>
        </C.Container>
    )
}
