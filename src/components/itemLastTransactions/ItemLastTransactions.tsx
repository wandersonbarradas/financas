import * as C from './ItemLastTransactions.styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
type Props = {
    item: NormalTansactionType | TransferTansactionType;
}
export const ItemLastTransactions = ({ item }: Props) => {
    const { state } = useContext(Context)
    const [color, setColor] = useState('')
    const [transfer, setTransfer] = useState<TransferTansactionType | null>(null)
    useEffect(() => {
        if (item.type === 'expense') {
            setColor(state.theme.theme.expenseColor)
        } else if (item.type === 'income') {
            setColor(state.theme.theme.incomeColor)
        } else {
            const transfer = item as TransferTansactionType
            setTransfer(transfer)
            setColor(state.theme.theme.transferColor)
        }
    }, []);

    return (
        <C.Container Theme={state.theme.theme} colorValue={color}>
            <div className='profile'>
                <AccountCircleIcon />
            </div>
            <div className='box-info'>
                <div className='info-transaction'>
                    <h5 className='title-transaction'>{item.description}</h5>
                    {transfer &&
                        <span className='categorie-transaction'>
                            {transfer.account.description + ' > ' + transfer.accountFor.description}
                        </span>
                    }
                    {item.type !== 'transfer' &&
                        <span className='categorie-transaction'>{item.category.name}</span>
                    }
                </div>
                <div className='value'>
                    R$ {item.value.toFixed(2)}
                </div>
            </div>
        </C.Container>
    )
}