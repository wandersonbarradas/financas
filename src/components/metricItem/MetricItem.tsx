import * as C from './Metric.styled'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Context } from '../../context/context';
import { useContext, useEffect } from 'react'

type Props = {
    title: string,
    value: number,
    percentage: number
}

export const MetricItem = ({ title, value, percentage }: Props) => {
    const [valor, decimais] = value.toFixed(2).toString().split('.')
    const { state } = useContext(Context)

    return (
        <C.Container Theme={state.theme.theme}>
            <span className='title'>{title}</span>
            <div className='value'>R$ {valor}.<span>{decimais}</span></div>
            {percentage >= 0 &&
                <C.Percentagem background='#DCF5E8' color='#4FD18B'>
                    <div>
                        <TrendingUpIcon /> +{percentage}%
                    </div>
                </C.Percentagem>
            }{percentage < 0 &&
                <C.Percentagem background='#F5DCDC' color='#D14F4F'>
                    <div>
                        <TrendingDownIcon /> {percentage}%
                    </div>
                </C.Percentagem>
            }
        </C.Container>
    )
}