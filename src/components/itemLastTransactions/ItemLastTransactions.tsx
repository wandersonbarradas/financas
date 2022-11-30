import * as C from './ItemLastTransactions.styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Context } from '../../context/context';
import { useContext } from 'react'
type Props = {
    value: number;
    title: string;
    categoria: string;
}
export const ItemLastTransactions = ({ value, title, categoria }: Props) => {
    const { state } = useContext(Context)
    return (
        <C.Container Theme={state.theme.theme} colorValue={value >= 0 ? '#4FD18B' : '#F02927'}>
            <div className='profile'>
                <AccountCircleIcon />
            </div>
            <div className='box-info'>
                <div className='info-transaction'>
                    <h5 className='title-transaction'>{title}</h5>
                    <span className='categorie-transaction'>{categoria}</span>
                </div>
                <div className='value'>
                    R$ {(value >= 0 ? +value : -Math.abs(value)).toFixed(2)}
                </div>
            </div>
        </C.Container>
    )
}