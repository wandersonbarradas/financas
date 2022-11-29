import * as C from './MonthCalendar.styled'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context';
import dayjs from 'dayjs';

type Props = {
    dataCalendar: { display: boolean, left: number }
    Click: (date: Date) => void;
    dateCurrent: Date;
    closeModal: () => void;
}

export const MonthCalendar = ({ dataCalendar, Click, dateCurrent, closeModal }: Props) => {
    const { state } = useContext(Context)
    const [currentDate, setCurrentDate] = useState(dayjs(dateCurrent))
    const [month, setMonth] = useState(dayjs(dateCurrent).month())

    useEffect(() => {
        setMonthHtml()
    }, [currentDate, month])

    const setMonthHtml = () => {
        document.querySelector('.itemMonth.current')?.classList.remove('current')
        if (currentDate.year() === dayjs(dateCurrent).year()) {
            colorMonth()
        }
    }

    const colorMonth = () => {
        document.querySelector('.itemMonth.current')?.classList.remove('current')
        document.querySelectorAll('.itemMonth').forEach((item) => {
            if (+item.id === month) {
                item.classList.add('current')
            }
        })
    }

    const handleYear = (action: 'substract' | 'add') => {
        if (action === 'substract') {
            setCurrentDate(currentDate.subtract(1, 'year'))
        } else {
            setCurrentDate(currentDate.add(1, 'year'))
        }
    }

    const handleMonth = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        const m = +element.id
        setMonth(m)
        colorMonth()
        const date = new Date(currentDate.year(), m, 1)
        Click(date)
    }

    const handleCurrentMonth = () => {
        Click(new Date())
        closeModal()
    }

    return (
        <C.Container data={dataCalendar} Theme={state.theme.theme}>
            <div className='header'>
                <span onClick={() => handleYear('substract')} className='icon'><KeyboardArrowLeftIcon /></span>
                <span className='year'>{currentDate.year()}</span>
                <span onClick={() => handleYear('add')} className='icon'><KeyboardArrowRightIcon /></span>
            </div>
            <div className='body'>
                <span onClick={handleMonth} id='0' className='itemMonth'>JAN</span>
                <span onClick={handleMonth} id="1" className='itemMonth'>FEV</span>
                <span onClick={handleMonth} id="2" className='itemMonth'>MAR</span>
                <span onClick={handleMonth} id="3" className='itemMonth'>ABR</span>
                <span onClick={handleMonth} id="4" className='itemMonth'>MAI</span>
                <span onClick={handleMonth} id="5" className='itemMonth'>JUN</span>
                <span onClick={handleMonth} id="6" className='itemMonth'>JUL</span>
                <span onClick={handleMonth} id="7" className='itemMonth'>AGO</span>
                <span onClick={handleMonth} id="8" className='itemMonth'>SET</span>
                <span onClick={handleMonth} id="9" className='itemMonth'>OUT</span>
                <span onClick={handleMonth} id="10" className='itemMonth'>NOV</span>
                <span onClick={handleMonth} id="11" className='itemMonth'>DEZ</span>
            </div>
            <div className='footer'>
                <button onClick={closeModal}>CANCELAR</button>
                <button onClick={handleCurrentMonth}>MÊS ATUAL</button>
            </div>
        </C.Container>
    )
}