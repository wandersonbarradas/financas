import * as C from './ItemLastTransactions.styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
import FormattedPrice from '../../helpers/FormattedPrice'
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
                    <h5 className='title-transaction text-nowrap'>{item.description}</h5>
                    {transfer &&
                        <p className='categorie-transaction text-nowrap'>
                            {transfer.account.description + ' > ' + transfer.accountFor.description}
                        </p>
                    }
                    {item.type !== 'transfer' &&
                        <p className='categorie-transaction text-nowrap'>
                            {item.subcategory !== null ? item.subcategory.name : item.category.name}
                        </p>
                    }
                </div>
                <div className='value'>
                    R$ {FormattedPrice(item.value)}
                </div>
            </div>
        </C.Container>
    )
}