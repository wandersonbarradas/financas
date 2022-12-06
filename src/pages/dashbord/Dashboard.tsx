import * as C from './Dashboard.styled'
import { ChartReport } from '../../components/chartReport/chartReport'
import { MetricItem } from '../../components/metricItem/MetricItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ItemLastTransactions } from '../../components/itemLastTransactions/ItemLastTransactions';
import { PieChart } from '../../components/pieChart/PieChart';
import { Context } from '../../context/context';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type HandleModalType = {
    handleModal: (value?: boolean, type?: 'income' | 'expense' | 'transfer') => void
}

export const Dashboard = ({ handleModal }: HandleModalType) => {
    const { state, dispatch } = useContext(Context)
    const navigate = useNavigate()

    const handleExpense = () => {
        handleModal(true, 'expense')
    }

    useEffect(() => {
        navigate('/dashboard')
        dispatch({
            type: 'setSelectMonth',
            payload: { selectMonth: true }
        })
    }, [])

    return (
        <C.Container Menu={state.general.sideBar} Theme={state.theme.theme}>
            <div className='top-metrics'>
                <div className={state.general.sideBar ? 'row response balance-report' : 'row balance-report'}>
                    <div className='balance'>
                        <div className='balance-summary'>
                            <h4 className='balance-title'>Balanço Total</h4>
                            <div className='last-transaction-value'>+ R$28,55</div>
                            <div className='balance-text-info'>
                                Última Transação</div>
                        </div>
                        <div className='balance-total'>
                            <div className='balance-value'>R$ 20000<span>.58</span></div>
                            <div className='info'>SALDO ATUAL</div>
                        </div>
                        <div></div>
                    </div>
                    <div className='report'>
                        <h4 className='report-title'>Relatório</h4>
                        <ChartReport />
                    </div>
                </div>
                <div className={state.general.sideBar ? 'row response metric' : 'row metric'}>
                    <MetricItem title="Saldo Total" value={18532.52} percentage={11} />
                    <MetricItem title="Total Receitas" value={137.43} percentage={-8} />
                    <MetricItem title="Total Despesas" value={5000} percentage={8} />
                    <MetricItem title="Pendente" value={201.48} percentage={11.52} />
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
                            <ItemLastTransactions categoria='Supermercado' title='Compra em Mercadinho o Roberto' value={-500.63} />
                            <ItemLastTransactions categoria='Prefeitura Municipal' title='Salário' value={1121.10} />
                            <ItemLastTransactions categoria='IPTV' title='Assinatura IPTV' value={-35.00} />
                            <ItemLastTransactions categoria='Wi-Fi' title='Mensalidade Wi-Fi' value={-99.90} />
                            <ItemLastTransactions categoria='Lucas' title='Lucas Mensalidade Wi-fi' value={50} />
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
