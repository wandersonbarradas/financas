import { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import * as C from './Categorias.styled'

export const Categorias = () => {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        dispatch({
            type: 'setSelectMonth',
            payload: { selectMonth: false }
        })
    }, []);

    return (
        <h1>Categorias</h1>
    )
}