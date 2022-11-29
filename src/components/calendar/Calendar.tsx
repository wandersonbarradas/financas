import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; //
import { Calendar } from 'react-date-range';
import { useState, useContext } from 'react';
import { Context } from '../../context/context';
import { pt } from 'date-fns/locale';
import * as C from './Calendar.styled'

type Props = {
    handleModal: (value: 'open' | 'close') => void,
    dateValue: (value: Date) => void,
    value: Date,
}

export const Calendario = ({ handleModal, dateValue, value }: Props) => {
    const { state } = useContext(Context)
    const handleSelect = (date: Date) => {
        dateValue(date)
        handleModal('close') // native Date object
    }
    return (
        <C.Container Theme={state.theme.theme}>
            <Calendar
                className='calendar'
                locale={pt}
                color={state.theme.theme.colorPrimary}
                date={value}
                onChange={handleSelect}
            />
        </C.Container>
    )
}


