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
}

export const TableTransactionsItem = ({ item }: Props) => {
    const { state, dispatch } = useContext(Context)
    const [transfer, setTransfer] = useState<TransferTansactionType | null>(null)
    const [date, setDate] = useState('')
    const [modalDelete, setModalDelete] = useState(false)
    const [color, setColor] = useState('')

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
        switch (item.type) {
            case 'expense':
                setColor(state.theme.theme.expenseColor)
                break;
            case 'income':
                setColor(state.theme.theme.incomeColor)
                break;
            case 'transfer':
                setColor(state.theme.theme.transferColor)
                break
        }
    }

    const handleDelete = () => {
        setModalDelete(true)
    }

    const deleteTransaction = async () => {
        if (state.user.data === null) {
            return
        }
        await Api.removeTransaction(state.user.data.id, item)
        const transactions = state.user.transactions as unknown as NormalTansactionType[];
        const arr = transactions.filter(el => el.id !== item.id)
        dispatch({
            type: 'setTransactions',
            payload: { transactions: arr }
        })
        setModalDelete(false)
    }

    return (
        <>
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
            <Modal open={modalDelete} setOpen={setModalDelete} clickAway={false} modalOpacity={.5}>
                <C.ContainerModalDelete Theme={state.theme.theme} Color={color}>
                    <h3>Deseja realmente deletar essa transação?</h3>
                    <div className='info'>
                        <div className='content'>
                            <p className='title'>Descrição</p>
                            <span>{item.description}</span>
                        </div>
                        <div className='content'>
                            <p className='title'>Valor</p>
                            <span>{formatted.format(item.value)}</span>
                        </div>
                    </div>
                    <div className='btnArea'>
                        <button onClick={() => setModalDelete(false)} className='btn cancelar'>Cancelar</button>
                        <button onClick={deleteTransaction} className='btn deletar'>Deletar</button>
                    </div>
                </C.ContainerModalDelete>
            </Modal>
        </>
    )
}