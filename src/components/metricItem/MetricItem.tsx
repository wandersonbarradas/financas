import * as C from './Metric.styled'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Context } from '../../context/context';
import { useContext } from 'react'
import FormattedPrice from '../../helpers/FormattedPrice'
type Props = {
    title: string,
    value: number,
    percentage: number
}

export const MetricItem = ({ title, value, percentage }: Props) => {
    const [valor, decimais] = value.toFixed(2).split('.')
    const { state } = useContext(Context)

    return (
        <C.Container Theme={state.theme.theme}>
            <span className='title'>{title}</span>
            <div className='value'>R$ {valor}<span>,{decimais}</span></div>
            {/* {percentage >= 0 &&
                <C.Percentagem background='#A9FFA7' color='#037400'>
                    <div>
                        <TrendingUpIcon /> +{FormattedPrice(percentage)}%
                    </div>
                </C.Percentagem>
            }{percentage < 0 &&
                <C.Percentagem background='#FFA7A7' color='#F02927'>
                    <div>
                        <TrendingDownIcon /> {FormattedPrice(percentage)}%
                    </div>
                </C.Percentagem>
            } */}
        </C.Container>
    )
}