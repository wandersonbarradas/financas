import * as C from './ItemLastTransactions.styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
import Formatted from '../../helpers/FormattedPrice'
type Props = {
    item: NormalTansactionType | TransferTansactionType;
}
export const ItemLastTransactions = ({ item }: Props) => {
    const { state } = useContext(Context)
    const [color, setColor] = useState('')
    const [colorCategory, setColorCategory] = useState("");
    const [transfer, setTransfer] = useState<TransferTansactionType | null>(null)
    useEffect(() => {
        if (item.type === 'expense') {
            setColor(state.theme.theme.expenseColor)
            setColorCategory(item.category.color)
        } else if (item.type === 'income') {
            setColor(state.theme.theme.incomeColor)
            setColorCategory(item.category.color)
        } else {
            const transfer = item as TransferTansactionType;
            setColorCategory(state.theme.theme.transferColor)
            setTransfer(transfer)
            setColor(state.theme.theme.transferColor)
        }
    }, []);

    return (
        <C.Container Theme={state.theme.theme} colorCategory={colorCategory} colorValue={color}>
            <div className='profile'>

            </div>
            <div className='box-info'>
                <div className='info-transaction'>
                    <h5 className='title-transaction'>{item.description}</h5>
                    {transfer &&
                        <p className='categorie-transaction'>
                            {transfer.account.description + ' > ' + transfer.accountFor.description}
                        </p>
                    }
                    {item.type !== 'transfer' &&
                        <p className='categorie-transaction'>
                            {item.subcategory !== null ? item.subcategory.name : item.category.name}
                        </p>
                    }
                </div>
                <div className='value'>
                    {Formatted.format(item.value)}
                </div>
            </div>
        </C.Container>
    )
}