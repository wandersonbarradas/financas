import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import { Calendario } from '../calendar/Calendar';
import * as C from './ModalExpense.styled'
import DF from '../../helpers/DateFunctions';
import dayjs from "dayjs";

type HandleModalType = {
    handleModal: (value?: boolean, type?: 'income' | 'expense' | 'transfer') => void
}

export const ModalExpense = ({ handleModal }: HandleModalType) => {
    const { state } = useContext(Context)
    const [valueExpense, setValueExpense] = useState(0)
    const [modalDatePicker, setModalDatePiker] = useState(false)
    const [dateExpense, setDateExpense] = useState<Date>(new Date())
    const [dateExtense, setDateExtense] = useState(false)

    useEffect(() => {
        switch (checkDate()) {
            case 'hoje':
                backgroundBtnDate(0)
                setDateExtense(false)
                break;
            case 'ontem':
                backgroundBtnDate(1)
                setDateExtense(false)
                break;
            case 'outros':
                backgroundBtnDate(2)
                setDateExtense(true)
        }
        console.log(dateExpense)
    }, [dateExpense])

    const closeModal = () => {
        handleModal()
    }

    const handleDateExpense = (date: Date) => {
        setDateExpense(date)
    }

    const handleModalDatePicker = (value: 'open' | 'close') => {
        if (value === 'open') {
            setModalDatePiker(true)
        } else {
            setModalDatePiker(false)
        }
    }

    const handleContainerDatePiker = (e: React.MouseEvent<HTMLElement>) => {
        const el = e.target as HTMLElement
        if (el.classList.contains('modalDatePicker')) {
            handleModalDatePicker('close')
        }
    }

    const handleFocusInputArea = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        if (element.classList.contains('focus')) {
            return;
        }
        document.querySelector('.input-area.focus')?.classList.remove('focus')
        element.classList.add('focus')
    }

    const handleBtnDate = (e: React.MouseEvent<HTMLElement>) => {
        handleFocusInputArea(e)
        let element = e.target as HTMLElement
        const ontem = dayjs().subtract(1, 'day')
        if (element.innerText === 'Hoje') {
            setDateExpense(new Date())
        } else if (element.innerText === 'Ontem') {
            setDateExpense(new Date(ontem.year(), ontem.month(), ontem.date()))
        } else {
            handleModalDatePicker('open')
        }
    }

    const checkDate = () => {
        const date = dayjs(dateExpense).format('DD/MM/YYY')
        const hj = dayjs(new Date()).format('DD/MM/YYY')
        const ontem = dayjs(new Date()).subtract(1, 'day').format('DD/MM/YYY')
        if (date === hj) {
            return 'hoje'
        } else if (date === ontem) {
            return 'ontem'
        } else {
            return 'outros'
        }
    }

    const backgroundBtnDate = (btnIndex: number) => {
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.btn-date')
        if (items.length <= 0) {
            return false
        }
        items.forEach((item, index) => {
            item.classList.remove('select-btn-date')
            if (btnIndex !== null && index === btnIndex) {
                item.classList.add('select-btn-date')
            }
        })
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueExpense(+e.currentTarget.value)
    }

    return (
        <C.Container extend={dateExtense} Theme={state.theme.theme}>
            {modalDatePicker &&
                <div className='modalDatePicker' onClick={handleContainerDatePiker}>
                    <Calendario value={dateExpense} dateValue={handleDateExpense} handleModal={handleModalDatePicker} />
                </div>
            }
            <div className='header'>
                <h3>Nova Despesa</h3>
                <div className='icon' onClick={closeModal}>
                    <CloseIcon />
                </div>
            </div>
            <div className='body'>
                <div className='left-side'>
                    <div className='input-area date' onClick={handleBtnDate}>
                        <div className='icon'>
                            <EventIcon />
                        </div>
                        <button className='btn-date' >Hoje</button>
                        <button className='btn-date' >Ontem</button>
                        <button className='btn-date' onClick={() => handleModalDatePicker('open')} >Outro...</button>
                        <span className='date-extense'>{DF.GetDateExtense(dateExpense)}</span>
                    </div>
                    <label htmlFor="input-value-expense">
                        <div className='input-area value' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <EventIcon />
                            </div>
                            <span>R$</span>
                            <input type="number" placeholder='0,00' id='input-value-expense'
                                onChange={handleValue} />
                        </div>
                    </label>
                    <label htmlFor="input-check-cat-expense">
                        <div className='input-area' onClick={handleFocusInputArea}>

                        </div>
                    </label>
                </div>
                <div className='right-side'>
                    <h4>right-side</h4>
                </div>
            </div>
        </C.Container>
    )
}