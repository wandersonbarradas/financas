import * as C from './AlertAviso.styled'
import { useContext } from 'react'
import { Context } from '../../context/context'
type Props = {
    label: string;
    display: boolean;
    color: string;
}

export const AlertAviso = ({ label, display, color }: Props) => {
    const { state } = useContext(Context)
    return (
        <C.Container Theme={state.theme.theme} bg={color} className={display ? 'active' : ''}>
            <p>{label}</p>
        </C.Container>
    )
}