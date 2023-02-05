import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType'
import * as C from './TableTransactionsItem.styled'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DF from '../../helpers/DateFunctions'
import formatted from '../../helpers/FormattedPrice';
import { Modal } from '../modais/Modais';
import Api from '../../Api';

type Props = {
    item: NormalTansactionType;
    setTransaction: React.Dispatch<React.SetStateAction<NormalTansactionType | TransferTansactionType | null>>
}

export const TableTransactionsItem = ({ item, setTransaction }: Props) => {
    const { state } = useContext(Context)
    const [transfer, setTransfer] = useState<TransferTansactionType | null>(null)
    const [date, setDate] = useState('')

    useEffect(() => {
        checkTransaction()
        formatDate()
    }, [item, state.user.transactions, state.user.selectedDate]);

    const formatDate = () => {
        const d = item.date as { seconds: number; nanoseconds: number }
        setDate(DF.formateDate(new Date(d.seconds * 1000)))
    }

    const checkTransaction = () => {
        if (item.type === 'transfer') {
            const el = item as unknown as TransferTansactionType;
            setTransfer(el)
        }
    }

    const handleDelete = () => {
        setTransaction(item)
    }

    return (
        <C.Container categoryColor={item.type === 'transfer' ? state.theme.theme.transferColor : item.category.color} Theme={state.theme.theme}>
            <td className='done'>
                <div>
                    {item.done &&
                        <div className='icon center true'>
                            <CheckIcon fontSize='medium' />
                        </div>
                    }{!item.done &&
                        <div className='icon center false'>
                            <CloseIcon fontSize='medium' />
                        </div>
                    }
                </div>
            </td>
            <td className='date'><p className='text-nowrap'>{date}</p></td>
            <td className='description'>
                <p>{item.description}</p>
            </td>
            <td className='category'>
                <div>
                    {item.type === 'transfer' &&
                        <>
                            <span className='color'></span>
                            <p>Transferência</p>
                        </>
                    }{item.type !== 'transfer' &&
                        <>
                            <span className='color '></span>
                            <p >{item.subcategory ? item.subcategory.name : item.category.name}</p>
                        </>
                    }
                </div>
            </td>
            <td className='account'>
                <div>
                    {item.type === 'transfer' &&
                        <p >{transfer?.account.description + ' > ' + transfer?.accountFor.description}</p>
                    }{item.type !== 'transfer' &&
                        <>
                            <span className='color '></span>
                            <p>{item.account.description}</p>
                        </>
                    }
                </div>
            </td>
            <td className='value'>
                <p className={item.type + ' text-nowrap'}>{formatted.format(item.value)}</p>
            </td>
            <td className='actionArea'>
                <div>
                    <div className='icon center'><EditOutlinedIcon fontSize='small' /></div>
                    <div onClick={handleDelete} className='icon center'><DeleteOutlinedIcon fontSize='small' /></div>
                </div>
            </td>
        </C.Container>
    )
}