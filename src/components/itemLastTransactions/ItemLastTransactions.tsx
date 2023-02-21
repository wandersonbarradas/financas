import * as C from './ItemLastTransactions.styled'
import { Context } from '../../context/context';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
import Formatted from '../../helpers/FormattedPrice'
type Props = {
    item: NormalTansactionType | TransferTansactionType;
}
export const ItemLastTransactions = ({ item }: Props) => {
    const { state, dispatch } = useContext(Context)
    const [color, setColor] = useState('')
    const [colorCategory, setColorCategory] = useState("");
    const [transfer, setTransfer] = useState<TransferTansactionType | null>(null)
    const navigate = useNavigate()

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

    const displayTransaction = () => {
        dispatch({
            type: 'setSelectedTransactions',
            payload: { selectedTransactions: item }
        })
        navigate('/transacoes')
    }

    return (
        <C.Container onClick={displayTransaction} Theme={state.theme.theme} colorCategory={colorCategory} colorValue={color}>
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